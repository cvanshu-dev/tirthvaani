"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

const urlOrPath = z
  .string()
  .trim()
  .max(2048)
  .refine(
    (value) =>
      !value ||
      (value.startsWith("/") && !value.startsWith("//")) ||
      /^https?:\/\//i.test(value),
  );
const schema = z.object({
  siteName: z.string().trim().min(1).max(100),
  tagline: z.string().trim().max(180),
  phone: z.string().trim().max(40),
  whatsapp: z.string().trim().max(40),
  email: z.string().trim().max(254),
  address: z.string().trim().max(400),
  googleMapsUrl: urlOrPath,
  logoUrl: urlOrPath,
  faviconUrl: urlOrPath,
  socialInstagram: urlOrPath,
  socialFacebook: urlOrPath,
  socialYoutube: urlOrPath,
  socialX: urlOrPath,
  businessHours: z.string().trim().max(300),
  copyright: z.string().trim().max(200),
  defaultSeoTitle: z.string().trim().max(180),
  defaultSeoDescription: z.string().trim().max(320),
  defaultSocialImage: urlOrPath,
  primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  fontFamily: z.enum(["Manrope", "Arial", "Georgia"]),
  maintenanceMode: z.boolean(),
});

export async function saveSettingsAction(formData: FormData) {
  const user = await requirePermission("settings:manage");
  const input = Object.fromEntries(
    [
      "siteName",
      "tagline",
      "phone",
      "whatsapp",
      "email",
      "address",
      "googleMapsUrl",
      "logoUrl",
      "faviconUrl",
      "socialInstagram",
      "socialFacebook",
      "socialYoutube",
      "socialX",
      "businessHours",
      "copyright",
      "defaultSeoTitle",
      "defaultSeoDescription",
      "defaultSocialImage",
      "primaryColor",
      "accentColor",
      "fontFamily",
    ].map((key) => [key, formData.get(key) ?? ""]),
  );
  const parsed = schema.safeParse({
    ...input,
    maintenanceMode: formData.get("maintenanceMode") === "on",
  });
  if (!parsed.success) redirect("/admin/settings?error=validation");
  const db = getPrisma();
  if (!db) redirect("/admin?error=database");
  const existing = await db.globalSettings.findUnique({
    where: { id: "global" },
  });
  const next = {
    ...(existing?.data &&
    typeof existing.data === "object" &&
    !Array.isArray(existing.data)
      ? (existing.data as Record<string, unknown>)
      : {}),
    ...parsed.data,
  };
  await db.globalSettings.upsert({
    where: { id: "global" },
    create: { id: "global", data: next },
    update: { data: next },
  });
  await db.activityLog.create({
    data: {
      userId: user.id,
      action: "settings.update",
      entityType: "settings",
      entityId: "global",
      summary: "Updated global website settings",
    },
  });
  revalidatePath("/", "layout");
  redirect("/admin/settings?saved=1");
}
