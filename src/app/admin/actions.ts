"use server";

import { redirect } from "next/navigation";
import { destroyAdminSession, getCurrentUser } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

export async function logoutAction() {
  const user = await getCurrentUser();
  const db = getPrisma();

  if (user && db) {
    await db.activityLog.create({
      data: {
        userId: user.id,
        action: "auth.logout",
        entityType: "user",
        entityId: user.id,
        summary: "Signed out of the CMS",
      },
    });
  }

  await destroyAdminSession();
  redirect("/admin/login");
}
