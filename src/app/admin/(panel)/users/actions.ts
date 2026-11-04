"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requirePermission } from "@/lib/auth";
import { hashPassword } from "@/lib/password";
import { getPrisma } from "@/lib/prisma";

export async function createUserAction(formData: FormData) {
  const actor = await requirePermission("users:manage");
  const parsed = z
    .object({
      name: z.string().trim().min(2).max(100),
      email: z.string().trim().email().max(254),
      roleId: z.string().min(1),
      password: z.string().min(14).max(256),
    })
    .safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      roleId: formData.get("roleId"),
      password: formData.get("password"),
    });
  if (!parsed.success) redirect("/admin/users?error=validation");
  const db = getPrisma();
  if (!db) redirect("/admin?error=database");
  const passwordHash = await hashPassword(parsed.data.password);
  const user = await db.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      roleId: parsed.data.roleId,
      passwordHash,
    },
  });
  await db.activityLog.create({
    data: {
      userId: actor.id,
      action: "user.create",
      entityType: "user",
      entityId: user.id,
      summary: `Created CMS user: ${user.email}`,
    },
  });
  revalidatePath("/admin/users");
  redirect("/admin/users?saved=1");
}

export async function setUserActiveAction(formData: FormData) {
  const actor = await requirePermission("users:manage");
  const parsed = z
    .object({ id: z.string().min(1), active: z.enum(["true", "false"]) })
    .safeParse({ id: formData.get("id"), active: formData.get("active") });
  if (!parsed.success || parsed.data.id === actor.id)
    redirect("/admin/users?error=invalid");
  const db = getPrisma();
  if (!db) redirect("/admin?error=database");
  const user = await db.user.update({
    where: { id: parsed.data.id },
    data: { active: parsed.data.active === "true" },
  });
  if (!user.active) await db.session.deleteMany({ where: { userId: user.id } });
  await db.activityLog.create({
    data: {
      userId: actor.id,
      action: user.active ? "user.activate" : "user.deactivate",
      entityType: "user",
      entityId: user.id,
      summary: `${user.active ? "Activated" : "Deactivated"} CMS user: ${user.email}`,
    },
  });
  revalidatePath("/admin/users");
  redirect("/admin/users?saved=1");
}

export async function createRoleAction(formData: FormData) {
  const actor = await requirePermission("users:manage");
  const parsed = z
    .object({
      name: z.string().trim().min(2).max(80),
      key: z
        .string()
        .trim()
        .toUpperCase()
        .regex(/^[A-Z][A-Z0-9_]{1,39}$/),
      description: z.string().trim().max(200),
    })
    .safeParse({
      name: formData.get("name"),
      key: formData.get("key"),
      description: formData.get("description") || "",
    });
  if (!parsed.success) redirect("/admin/users?error=validation");
  const db = getPrisma();
  if (!db) redirect("/admin?error=database");
  const role = await db.role.create({ data: parsed.data });
  await db.activityLog.create({
    data: {
      userId: actor.id,
      action: "role.create",
      entityType: "role",
      entityId: role.id,
      summary: `Created role: ${role.name}`,
    },
  });
  revalidatePath("/admin/users");
  redirect("/admin/users?saved=1");
}

export async function saveRolePermissionsAction(formData: FormData) {
  const actor = await requirePermission("users:manage");
  const roleId = String(formData.get("roleId") ?? "");
  const permissionIds = formData
    .getAll("permissionIds")
    .filter((value): value is string => typeof value === "string");
  const db = getPrisma();
  if (!db || !roleId) redirect("/admin/users");
  const role = await db.role.findUnique({ where: { id: roleId } });
  if (!role || role.key === "SUPER_ADMIN")
    redirect("/admin/users?error=invalid");
  await db.$transaction(async (tx) => {
    await tx.rolePermission.deleteMany({ where: { roleId } });
    if (permissionIds.length)
      await tx.rolePermission.createMany({
        data: [...new Set(permissionIds)].map((permissionId) => ({
          roleId,
          permissionId,
        })),
      });
    await tx.activityLog.create({
      data: {
        userId: actor.id,
        action: "role.permissions.update",
        entityType: "role",
        entityId: roleId,
        summary: `Updated permissions for ${role.name}`,
      },
    });
  });
  revalidatePath("/admin/users");
  redirect("/admin/users?saved=1");
}
