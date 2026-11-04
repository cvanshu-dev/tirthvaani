"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

export async function saveSeoAction(formData: FormData) {
  const user = await requirePermission("seo:manage");
  const parsed = z
    .object({
      type: z.enum(["page", "post", "service"]),
      id: z.string().min(1),
      title: z.string().trim().max(180),
      description: z.string().trim().max(320),
      canonicalUrl: z.string().trim().max(2048),
      openGraphTitle: z.string().trim().max(180),
      openGraphText: z.string().trim().max(320),
      openGraphImage: z.string().trim().max(2048),
      robotsIndex: z.boolean(),
      robotsFollow: z.boolean(),
    })
    .safeParse({
      type: formData.get("type"),
      id: formData.get("id"),
      title: formData.get("title") || "",
      description: formData.get("description") || "",
      canonicalUrl: formData.get("canonicalUrl") || "",
      openGraphTitle: formData.get("openGraphTitle") || "",
      openGraphText: formData.get("openGraphText") || "",
      openGraphImage: formData.get("openGraphImage") || "",
      robotsIndex: formData.get("robotsIndex") === "on",
      robotsFollow: formData.get("robotsFollow") === "on",
    });
  if (!parsed.success) redirect("/admin/seo?error=validation");
  const db = getPrisma();
  if (!db) redirect("/admin?error=database");
  const data = parsed.data;
  const relation =
    data.type === "page"
      ? { pageId: data.id }
      : data.type === "post"
        ? { postId: data.id }
        : { serviceId: data.id };
  await db.seoMetadata.upsert({
    where: { ownerId: data.id },
    create: {
      ownerType: data.type,
      ownerId: data.id,
      ...relation,
      title: data.title || null,
      description: data.description || null,
      canonicalUrl: data.canonicalUrl || null,
      openGraphTitle: data.openGraphTitle || null,
      openGraphText: data.openGraphText || null,
      openGraphImage: data.openGraphImage || null,
      robotsIndex: data.robotsIndex,
      robotsFollow: data.robotsFollow,
    },
    update: {
      title: data.title || null,
      description: data.description || null,
      canonicalUrl: data.canonicalUrl || null,
      openGraphTitle: data.openGraphTitle || null,
      openGraphText: data.openGraphText || null,
      openGraphImage: data.openGraphImage || null,
      robotsIndex: data.robotsIndex,
      robotsFollow: data.robotsFollow,
    },
  });
  await db.activityLog.create({
    data: {
      userId: user.id,
      action: "seo.update",
      entityType: data.type,
      entityId: data.id,
      summary: `Updated SEO metadata for ${data.type}`,
    },
  });
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/seo");
  redirect("/admin/seo?saved=1");
}
