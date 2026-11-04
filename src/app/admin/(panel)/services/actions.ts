"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

const serviceSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(2).max(160),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(180)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  summary: z.string().trim().max(500),
  body: z.string().trim().min(1).max(50000),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  durationMinutes: z.coerce.number().int().positive().max(10080).optional(),
  location: z.string().trim().max(160),
  bookingCta: z.string().trim().max(300),
  seoTitle: z.string().trim().max(180),
  seoDescription: z.string().trim().max(320),
});

export async function saveServiceAction(formData: FormData) {
  const user = await requirePermission("services:write");
  const parsed = serviceSchema.safeParse({
    id: formData.get("id") || undefined,
    title: formData.get("title"),
    slug: formData.get("slug"),
    summary: formData.get("summary") || "",
    body: formData.get("body"),
    status: formData.get("status"),
    durationMinutes: formData.get("durationMinutes") || undefined,
    location: formData.get("location") || "",
    bookingCta: formData.get("bookingCta") || "",
    seoTitle: formData.get("seoTitle") || "",
    seoDescription: formData.get("seoDescription") || "",
  });
  if (!parsed.success) redirect("/admin/services/new?error=validation");
  const db = getPrisma();
  if (!db) redirect("/admin?error=database");
  const data = parsed.data;
  const previous = data.id
    ? await db.service.findUnique({ where: { id: data.id } })
    : null;
  if (data.id && !previous) redirect("/admin/services?error=missing");
  const service = await db.$transaction(async (tx) => {
    const saved = previous
      ? await tx.service.update({
          where: { id: previous.id },
          data: {
            title: data.title,
            slug: data.slug,
            summary: data.summary,
            description: { format: "plain-text-v1", text: data.body },
            status: data.status,
            publishedAt:
              data.status === "PUBLISHED"
                ? (previous.publishedAt ?? new Date())
                : null,
            durationMinutes: data.durationMinutes ?? null,
            location: data.location || null,
            bookingCta: data.bookingCta || null,
          },
        })
      : await tx.service.create({
          data: {
            title: data.title,
            slug: data.slug,
            summary: data.summary,
            description: { format: "plain-text-v1", text: data.body },
            status: data.status,
            publishedAt: data.status === "PUBLISHED" ? new Date() : null,
            durationMinutes: data.durationMinutes ?? null,
            location: data.location || null,
            bookingCta: data.bookingCta || null,
          },
        });
    await tx.seoMetadata.upsert({
      where: { serviceId: saved.id },
      create: {
        ownerType: "service",
        ownerId: saved.id,
        serviceId: saved.id,
        title: data.seoTitle || null,
        description: data.seoDescription || null,
      },
      update: {
        title: data.seoTitle || null,
        description: data.seoDescription || null,
      },
    });
    if (previous)
      await tx.revision.create({
        data: {
          type: "service",
          contentId: previous.id,
          userId: user.id,
          snapshot: {
            title: previous.title,
            slug: previous.slug,
            summary: previous.summary,
            description: previous.description,
            status: previous.status,
          },
          note: "Saved from service editor",
        },
      });
    await tx.activityLog.create({
      data: {
        userId: user.id,
        action: previous ? "service.update" : "service.create",
        entityType: "service",
        entityId: saved.id,
        summary: `${previous ? "Updated" : "Created"} service: ${saved.title}`,
      },
    });
    return saved;
  });
  revalidatePath("/services");
  revalidatePath(`/services/${service.slug}`);
  redirect("/admin/services?saved=1");
}

export async function deleteServiceAction(formData: FormData) {
  const user = await requirePermission("services:write");
  const id = String(formData.get("id") ?? "");
  const db = getPrisma();
  if (!db || !id) redirect("/admin/services");
  const service = await db.service.findUnique({
    where: { id },
    select: { id: true, title: true },
  });
  if (!service) redirect("/admin/services");
  await db.service.delete({ where: { id } });
  await db.activityLog.create({
    data: {
      userId: user.id,
      action: "service.delete",
      entityType: "service",
      entityId: id,
      summary: `Deleted service: ${service.title}`,
    },
  });
  revalidatePath("/services");
  redirect("/admin/services?deleted=1");
}
