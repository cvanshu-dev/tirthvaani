"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function createTaxonomyAction(formData: FormData) {
  const user = await requirePermission("posts:write");
  const parsed = z
    .object({
      type: z.enum(["category", "tag"]),
      name: z.string().trim().min(1).max(80),
      slug: z.string().trim().max(100).optional(),
      description: z.string().trim().max(500).optional(),
      parentId: z.string().optional(),
    })
    .safeParse({
      type: formData.get("type"),
      name: formData.get("name"),
      slug: formData.get("slug") || undefined,
      description: formData.get("description") || undefined,
      parentId: formData.get("parentId") || undefined,
    });
  if (!parsed.success) redirect("/admin/taxonomy?error=validation");
  const db = getPrisma();
  if (!db) redirect("/admin?error=database");
  const slug = makeSlug(parsed.data.slug || parsed.data.name);
  if (!slug) redirect("/admin/taxonomy?error=validation");
  if (parsed.data.type === "category")
    await db.category.create({
      data: {
        name: parsed.data.name,
        slug,
        description: parsed.data.description ?? "",
        parentId: parsed.data.parentId || null,
      },
    });
  else await db.tag.create({ data: { name: parsed.data.name, slug } });
  await db.activityLog.create({
    data: {
      userId: user.id,
      action: `${parsed.data.type}.create`,
      entityType: parsed.data.type,
      summary: `Created ${parsed.data.type}: ${parsed.data.name}`,
    },
  });
  revalidatePath("/journal");
  redirect("/admin/taxonomy?saved=1");
}

export async function deleteTaxonomyAction(formData: FormData) {
  const user = await requirePermission("posts:write");
  const parsed = z
    .object({ type: z.enum(["category", "tag"]), id: z.string().min(1) })
    .safeParse({ type: formData.get("type"), id: formData.get("id") });
  if (!parsed.success) redirect("/admin/taxonomy");
  const db = getPrisma();
  if (!db) redirect("/admin?error=database");
  const record =
    parsed.data.type === "category"
      ? await db.category.findUnique({ where: { id: parsed.data.id } })
      : await db.tag.findUnique({ where: { id: parsed.data.id } });
  if (!record) redirect("/admin/taxonomy");
  if (parsed.data.type === "category")
    await db.category.delete({ where: { id: parsed.data.id } });
  else await db.tag.delete({ where: { id: parsed.data.id } });
  await db.activityLog.create({
    data: {
      userId: user.id,
      action: `${parsed.data.type}.delete`,
      entityType: parsed.data.type,
      entityId: parsed.data.id,
      summary: `Deleted ${parsed.data.type}: ${record.name}`,
    },
  });
  redirect("/admin/taxonomy?deleted=1");
}
