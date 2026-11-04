"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

const path = z
  .string()
  .trim()
  .min(1)
  .max(2048)
  .refine((value) => value.startsWith("/") && !value.startsWith("//"));
export async function saveRedirectAction(formData: FormData) {
  const user = await requirePermission("seo:manage");
  const parsed = z
    .object({
      id: z.string().optional(),
      source: path,
      target: z.string().trim().min(1).max(2048),
      status: z.enum(["MOVED_PERMANENTLY", "FOUND"]),
      enabled: z.boolean(),
    })
    .safeParse({
      id: formData.get("id") || undefined,
      source: formData.get("source"),
      target: formData.get("target"),
      status: formData.get("status"),
      enabled: formData.get("enabled") === "on",
    });
  if (!parsed.success) redirect("/admin/redirects?error=validation");
  if (
    !parsed.data.target.startsWith("/") ||
    parsed.data.target.startsWith("//")
  ) {
    try {
      const target = new URL(parsed.data.target);
      if (!["http:", "https:"].includes(target.protocol))
        redirect("/admin/redirects?error=validation");
    } catch {
      redirect("/admin/redirects?error=validation");
    }
  }
  if (parsed.data.source === parsed.data.target) {
    redirect("/admin/redirects?error=validation");
  }
  const db = getPrisma();
  if (!db) redirect("/admin?error=database");
  const data = parsed.data;
  const item = data.id
    ? await db.redirect.update({ where: { id: data.id }, data })
    : await db.redirect.create({ data });
  await db.activityLog.create({
    data: {
      userId: user.id,
      action: data.id ? "redirect.update" : "redirect.create",
      entityType: "redirect",
      entityId: item.id,
      summary: `${data.id ? "Updated" : "Created"} redirect: ${item.source} → ${item.target}`,
    },
  });
  revalidatePath("/", "layout");
  redirect("/admin/redirects?saved=1");
}
export async function deleteRedirectAction(formData: FormData) {
  const user = await requirePermission("seo:manage");
  const id = String(formData.get("id") ?? "");
  const db = getPrisma();
  if (!db || !id) redirect("/admin/redirects");
  const item = await db.redirect.findUnique({ where: { id } });
  if (item) {
    await db.redirect.delete({ where: { id } });
    await db.activityLog.create({
      data: {
        userId: user.id,
        action: "redirect.delete",
        entityType: "redirect",
        entityId: id,
        summary: `Deleted redirect for ${item.source}`,
      },
    });
  }
  revalidatePath("/", "layout");
  redirect("/admin/redirects?saved=1");
}
