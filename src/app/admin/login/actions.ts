"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createAdminSession } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";

export type LoginState = {
  error?: string;
};

const loginSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(1).max(256),
});

const DUMMY_PASSWORD_HASH =
  "$2a$12$C6UzMDM.H6dfI/f/IKcEe.5F5C5uZCJx0aOnS0oK0kjw5lNq3Yl6K";

function throttleKey(email: string, ipAddress: string) {
  return createHash("sha256")
    .update(`${email.toLowerCase()}:${ipAddress}`)
    .digest("hex");
}

export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Enter a valid email and password." };
  }

  const db = getPrisma();
  if (!db) {
    return {
      error:
        "Admin sign-in is unavailable until DATABASE_URL is configured and the database is migrated.",
    };
  }

  const requestHeaders = await headers();
  const ipAddress =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const key = throttleKey(parsed.data.email, ipAddress);
  const now = new Date();
  const windowStart = new Date(now.getTime() - 15 * 60 * 1000);
  let attempt = await db.loginThrottle.findUnique({ where: { key } });

  if (attempt?.blockedTo && attempt.blockedTo > now) {
    return { error: "Too many sign-in attempts. Try again in 15 minutes." };
  }

  if (attempt && attempt.windowAt < windowStart) {
    attempt = await db.loginThrottle.update({
      where: { key },
      data: { attempts: 0, windowAt: now, blockedTo: null },
    });
  }

  const user = await db.user.findUnique({
    where: { email: parsed.data.email.toLowerCase() },
  });
  const validPassword = await verifyPassword(
    parsed.data.password,
    user?.passwordHash ?? DUMMY_PASSWORD_HASH,
  );

  if (!user || !user.active || !validPassword) {
    const updated = await db.loginThrottle.upsert({
      where: { key },
      create: { key, attempts: 1, windowAt: now },
      update: { attempts: { increment: 1 } },
    });

    if (updated.attempts >= 5) {
      await db.loginThrottle.update({
        where: { key },
        data: { blockedTo: new Date(now.getTime() + 15 * 60 * 1000) },
      });
    }

    return { error: "Email or password is incorrect." };
  }

  await db.loginThrottle.deleteMany({ where: { key } });
  await createAdminSession(user.id);
  await db.activityLog.create({
    data: {
      userId: user.id,
      action: "auth.login",
      entityType: "user",
      entityId: user.id,
      summary: "Signed in to the CMS",
      ipAddress,
    },
  });

  redirect("/admin");
}
