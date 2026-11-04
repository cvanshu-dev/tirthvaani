"use server";

import { randomUUID } from "node:crypto";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { getObjectStorage } from "@/lib/storage";

const MAX_IMAGE_BYTES = 20 * 1024 * 1024;
const MAX_DOCUMENT_BYTES = 25 * 1024 * 1024;
const MAX_VIDEO_BYTES = 100 * 1024 * 1024;
const allowedImages = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);
const allowedVideos = new Set(["video/mp4", "video/webm"]);
const allowedDocuments = new Set(["application/pdf"]);
function safeFilename(name: string) {
  return (
    name
      .normalize("NFKD")
      .replace(/[^a-zA-Z0-9._-]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(-100) || "upload"
  );
}

export async function uploadMediaAction(formData: FormData) {
  const user = await requirePermission("media:manage");
  const db = getPrisma();
  const storage = getObjectStorage();
  if (!db || !storage) redirect("/admin/media?error=storage");
  const file = formData.get("file");
  const alt = String(formData.get("alt") ?? "")
    .trim()
    .slice(0, 300);
  const caption = String(formData.get("caption") ?? "")
    .trim()
    .slice(0, 500);
  const folder =
    String(formData.get("folder") ?? "/")
      .split("/")
      .filter(Boolean)
      .map((part) => part.replace(/[^a-zA-Z0-9_-]/g, "-"))
      .filter((part) => part && part !== "." && part !== "..")
      .join("/")
      .slice(0, 120) || "/";
  if (!(file instanceof File) || file.size === 0)
    redirect("/admin/media?error=file");
  const isImage = allowedImages.has(file.type);
  const isVideo = allowedVideos.has(file.type);
  const isDocument = allowedDocuments.has(file.type);
  const limit = isImage
    ? MAX_IMAGE_BYTES
    : isVideo
      ? MAX_VIDEO_BYTES
      : isDocument
        ? MAX_DOCUMENT_BYTES
        : 0;
  if (!limit || file.size > limit) redirect("/admin/media?error=file");

  let body = Buffer.from(await file.arrayBuffer());
  let mimeType = file.type;
  let filename = safeFilename(file.name);
  let width: number | null = null;
  let height: number | null = null;
  if (isImage) {
    try {
      const image = sharp(body, {
        limitInputPixels: 50_000_000,
        failOn: "error",
      }).rotate();
      const info = await image.metadata();
      if (!info.width || !info.height) redirect("/admin/media?error=image");
      ({ width, height } = info);
      body = await image
        .resize({
          width: 2400,
          height: 2400,
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality: 84 })
        .toBuffer();
      mimeType = "image/webp";
      filename = `${filename.replace(/\.[^.]+$/, "")}.webp`;
    } catch {
      redirect("/admin/media?error=image");
    }
  } else if (isDocument && body.subarray(0, 5).toString("ascii") !== "%PDF-") {
    redirect("/admin/media?error=file");
  } else if (
    isVideo &&
    !(
      (file.type === "video/mp4" &&
        body.subarray(4, 8).toString("ascii") === "ftyp") ||
      (file.type === "video/webm" &&
        body.subarray(0, 4).equals(Buffer.from([0x1a, 0x45, 0xdf, 0xa3])))
    )
  ) {
    redirect("/admin/media?error=file");
  }

  const kind = isImage ? "IMAGE" : isVideo ? "VIDEO" : "DOCUMENT";
  const replaceId = String(formData.get("replaceId") ?? "");
  const replace = replaceId
    ? await db.mediaAsset.findUnique({ where: { id: replaceId } })
    : null;
  if (replaceId && (!replace || replace.kind !== kind))
    redirect("/admin/media?error=replace");
  const key =
    replace?.key ??
    `${folder === "/" ? "" : `${folder}/`}${randomUUID()}-${filename}`;
  await storage.client.send(
    new PutObjectCommand({
      Bucket: storage.bucket,
      Key: key,
      Body: body,
      ContentType: mimeType,
      ContentLength: body.byteLength,
      CacheControl: "public, max-age=31536000, immutable",
    }),
  );
  const url = `${storage.publicUrl}/${key.split("/").map(encodeURIComponent).join("/")}`;
  try {
    if (replace)
      await db.mediaAsset.update({
        where: { id: replace.id },
        data: {
          filename,
          mimeType,
          bytes: BigInt(body.byteLength),
          width,
          height,
          alt: alt || replace.alt,
          caption: caption || replace.caption,
          folder,
        },
      });
    else
      await db.mediaAsset.create({
        data: {
          key,
          url,
          filename,
          mimeType,
          kind,
          bytes: BigInt(body.byteLength),
          width,
          height,
          alt,
          caption,
          folder,
          uploadedById: user.id,
        },
      });
    await db.activityLog.create({
      data: {
        userId: user.id,
        action: replace ? "media.replace" : "media.upload",
        entityType: "media",
        entityId: replace?.id,
        summary: `${replace ? "Replaced" : "Uploaded"} media: ${filename}`,
      },
    });
  } catch (error) {
    if (!replace)
      await storage.client.send(
        new DeleteObjectCommand({ Bucket: storage.bucket, Key: key }),
      );
    throw error;
  }
  revalidatePath("/admin/media");
  redirect(`/admin/media?${replace ? "replaced" : "uploaded"}=1`);
}

export async function updateMediaAction(formData: FormData) {
  const user = await requirePermission("media:manage");
  const parsed = z
    .object({
      id: z.string().min(1),
      filename: z.string().trim().min(1).max(120),
      alt: z.string().trim().max(300),
      caption: z.string().trim().max(500),
      folder: z.string().trim().min(1).max(120),
    })
    .safeParse({
      id: formData.get("id"),
      filename: formData.get("filename"),
      alt: formData.get("alt") || "",
      caption: formData.get("caption") || "",
      folder: formData.get("folder") || "/",
    });
  if (!parsed.success) redirect("/admin/media?error=validation");
  const db = getPrisma();
  if (!db) redirect("/admin?error=database");
  const media = await db.mediaAsset.update({
    where: { id: parsed.data.id },
    data: {
      filename: parsed.data.filename,
      alt: parsed.data.alt,
      caption: parsed.data.caption,
      folder: parsed.data.folder.replace(/^\/*/, "").replace(/\/*$/, "") || "/",
    },
  });
  await db.activityLog.create({
    data: {
      userId: user.id,
      action: "media.update",
      entityType: "media",
      entityId: media.id,
      summary: `Updated media details: ${media.filename}`,
    },
  });
  revalidatePath("/admin/media");
  redirect("/admin/media?saved=1");
}

export async function deleteMediaAction(formData: FormData) {
  const user = await requirePermission("media:manage");
  const id = String(formData.get("id") ?? "");
  const db = getPrisma();
  const storage = getObjectStorage();
  if (!db || !storage || !id) redirect("/admin/media");
  const media = await db.mediaAsset.findUnique({ where: { id } });
  if (!media) redirect("/admin/media");
  await storage.client.send(
    new DeleteObjectCommand({ Bucket: storage.bucket, Key: media.key }),
  );
  await db.mediaAsset.delete({ where: { id } });
  await db.activityLog.create({
    data: {
      userId: user.id,
      action: "media.delete",
      entityType: "media",
      entityId: id,
      summary: `Deleted media: ${media.filename}`,
    },
  });
  revalidatePath("/admin/media");
  redirect("/admin/media?deleted=1");
}
