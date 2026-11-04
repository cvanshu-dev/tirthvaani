"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

const schema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(2).max(120),
  location: z.string().trim().max(120),
  quote: z.string().trim().min(10).max(3000),
  rating: z.number().int().min(1).max(5).nullable(),
  imageUrl: z.string().trim().max(2048),
  featured: z.boolean(),
  visible: z.boolean(),
  position: z.number().int().min(0).max(10000),
});
export async function saveTestimonialAction(formData: FormData) {
  const user = await requirePermission("pages:write");
  const parsed = schema.safeParse({
    id: formData.get("id") || undefined,
    name: formData.get("name"),
    location: formData.get("location") || "",
    quote: formData.get("quote"),
    rating: formData.get("rating") ? Number(formData.get("rating")) : null,
    imageUrl: formData.get("imageUrl") || "",
    featured: formData.get("featured") === "on",
    visible: formData.get("visible") === "on",
    position: formData.get("position") || "0",
  });
  if (!parsed.success) redirect("/admin/testimonials?error=validation");
  const db = getPrisma();
  if (!db) redirect("/admin?error=database");
  const data = parsed.data;
  const entry = data.id
    ? await db.testimonial.update({
        where: { id: data.id },
        data: {
          name: data.name,
          location: data.location || null,
          quote: data.quote,
          rating: data.rating,
          imageUrl: data.imageUrl || null,
          featured: data.featured,
          visible: data.visible,
          position: data.position,
        },
      })
    : await db.testimonial.create({
        data: {
          name: data.name,
          location: data.location || null,
          quote: data.quote,
          rating: data.rating,
          imageUrl: data.imageUrl || null,
          featured: data.featured,
          visible: data.visible,
          position: data.position,
        },
      });
  await db.activityLog.create({
    data: {
      userId: user.id,
      action: data.id ? "testimonial.update" : "testimonial.create",
      entityType: "testimonial",
      entityId: entry.id,
      summary: `${data.id ? "Updated" : "Created"} testimonial by ${entry.name}`,
    },
  });
  revalidatePath("/", "layout");
  redirect("/admin/testimonials?saved=1");
}
export async function deleteTestimonialAction(formData: FormData) {
  const user = await requirePermission("pages:write");
  const id = String(formData.get("id") ?? "");
  const db = getPrisma();
  if (!db || !id) redirect("/admin/testimonials");
  const item = await db.testimonial.findUnique({ where: { id } });
  if (item) {
    await db.testimonial.delete({ where: { id } });
    await db.activityLog.create({
      data: {
        userId: user.id,
        action: "testimonial.delete",
        entityType: "testimonial",
        entityId: id,
        summary: `Deleted testimonial by ${item.name}`,
      },
    });
  }
  revalidatePath("/", "layout");
  redirect("/admin/testimonials?saved=1");
}
