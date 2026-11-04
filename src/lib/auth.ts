import "server-only";

import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPrisma } from "@/lib/prisma";

const SESSION_COOKIE = "tirthvaani_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createAdminSession(userId: string) {
  const db = getPrisma();
  if (!db) throw new Error("Database is not configured.");

  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

  await db.session.create({
    data: {
      tokenHash: hashToken(token),
      userId,
      expiresAt,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function getCurrentUser() {
  const db = getPrisma();
  if (!db) return null;

  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await db.session.findUnique({
    where: { tokenHash: hashToken(token) },
    include: {
      user: {
        include: {
          role: {
            include: {
              permissions: {
                include: { permission: true },
              },
            },
          },
        },
      },
    },
  });

  if (!session || session.expiresAt <= new Date() || !session.user.active) {
    if (session) {
      await db.session.delete({ where: { id: session.id } });
    }

    cookieStore.delete(SESSION_COOKIE);
    return null;
  }

  return session.user;
}

export async function destroyAdminSession() {
  const db = getPrisma();
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (db && token) {
    await db.session.deleteMany({ where: { tokenHash: hashToken(token) } });
  }

  cookieStore.delete(SESSION_COOKIE);
}

export async function requirePermission(permissionKey?: string) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/admin/login");
  }

  if (user.role.key === "SUPER_ADMIN") {
    return user;
  }

  if (
    permissionKey &&
    user.role.permissions.some(
      ({ permission }) => permission.key === permissionKey,
    )
  ) {
    return user;
  }

  redirect("/admin?error=forbidden");
}
