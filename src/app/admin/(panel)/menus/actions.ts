"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

const safeHref = z
  .string()
  .trim()
  .min(1)
  .max(500)
  .refine(
    (value) =>
      (value.startsWith("/") && !value.startsWith("//")) ||
      /^https?:\/\//i.test(value),
    "Use a local path or an http(s) URL.",
  );

export async function createMenuAction(formData: FormData) {
  const user = await requirePermission("menus:manage");
  const parsed = z
    .object({
      name: z.string().trim().min(2).max(100),
      location: z.enum(["header", "footer"]),
    })
    .safeParse({
      name: formData.get("name"),
      location: formData.get("location"),
    });
  if (!parsed.success) redirect("/admin/menus?error=validation");
  const db = getPrisma();
  if (!db) redirect("/admin?error=database");
  const menu = await db.menu.create({ data: parsed.data });
  await db.activityLog.create({
    data: {
      userId: user.id,
      action: "menu.create",
      entityType: "menu",
      entityId: menu.id,
      summary: `Created ${menu.location} menu`,
    },
  });
  revalidatePath("/", "layout");
  redirect("/admin/menus?saved=1");
}

export async function saveMenuItemAction(formData: FormData) {
  const user = await requirePermission("menus:manage");
  const parsed = z
    .object({
      id: z.string().optional(),
      menuId: z.string().min(1),
      parentId: z.string().optional(),
      label: z.string().trim().min(1).max(100),
      href: safeHref,
      target: z.enum(["_self", "_blank"]),
      enabled: z.boolean(),
    })
    .safeParse({
      id: formData.get("id") || undefined,
      menuId: formData.get("menuId"),
      parentId: formData.get("parentId") || undefined,
      label: formData.get("label"),
      href: formData.get("href"),
      target: formData.get("target"),
      enabled: formData.get("enabled") === "on",
    });
  if (!parsed.success) redirect("/admin/menus?error=validation");
  const db = getPrisma();
  if (!db) redirect("/admin?error=database");
  const data = parsed.data;
  if (data.parentId) {
    const parent = await db.menuItem.findUnique({
      where: { id: data.parentId },
      select: { menuId: true, id: true, parentId: true },
    });
    if (
      !parent ||
      parent.menuId !== data.menuId ||
      parent.id === data.id ||
      parent.parentId !== null
    )
      redirect("/admin/menus?error=parent");
  }
  if (data.id)
    await db.menuItem.update({
      where: { id: data.id },
      data: {
        label: data.label,
        href: data.href,
        target: data.target,
        enabled: data.enabled,
        parentId: data.parentId || null,
      },
    });
  else {
    const max = await db.menuItem.aggregate({
      where: { menuId: data.menuId, parentId: data.parentId || null },
      _max: { position: true },
    });
    await db.menuItem.create({
      data: {
        menuId: data.menuId,
        parentId: data.parentId || null,
        label: data.label,
        href: data.href,
        target: data.target,
        enabled: data.enabled,
        position: (max._max.position ?? -1) + 1,
      },
    });
  }
  await db.activityLog.create({
    data: {
      userId: user.id,
      action: data.id ? "menu-item.update" : "menu-item.create",
      entityType: "menu",
      entityId: data.menuId,
      summary: `${data.id ? "Updated" : "Added"} navigation link: ${data.label}`,
    },
  });
  revalidatePath("/", "layout");
  redirect("/admin/menus?saved=1");
}

export async function deleteMenuItemAction(formData: FormData) {
  const user = await requirePermission("menus:manage");
  const id = String(formData.get("id") ?? "");
  const db = getPrisma();
  if (!db || !id) redirect("/admin/menus");
  const item = await db.menuItem.findUnique({ where: { id } });
  if (!item) redirect("/admin/menus");
  await db.menuItem.delete({ where: { id } });
  await db.activityLog.create({
    data: {
      userId: user.id,
      action: "menu-item.delete",
      entityType: "menu",
      entityId: item.menuId,
      summary: `Removed navigation link: ${item.label}`,
    },
  });
  revalidatePath("/", "layout");
  redirect("/admin/menus?saved=1");
}

export async function moveMenuItemAction(formData: FormData) {
  await requirePermission("menus:manage");
  const id = String(formData.get("id") ?? "");
  const direction = formData.get("direction") === "up" ? -1 : 1;
  const db = getPrisma();
  if (!db || !id) redirect("/admin/menus");
  const item = await db.menuItem.findUnique({ where: { id } });
  if (!item) redirect("/admin/menus");
  const adjacent = await db.menuItem.findFirst({
    where: {
      menuId: item.menuId,
      parentId: item.parentId,
      position: direction < 0 ? { lt: item.position } : { gt: item.position },
    },
    orderBy: { position: direction < 0 ? "desc" : "asc" },
  });
  if (adjacent)
    await db.$transaction([
      db.menuItem.update({
        where: { id: item.id },
        data: { position: adjacent.position },
      }),
      db.menuItem.update({
        where: { id: adjacent.id },
        data: { position: item.position },
      }),
    ]);
  revalidatePath("/", "layout");
  redirect("/admin/menus?saved=1");
}
