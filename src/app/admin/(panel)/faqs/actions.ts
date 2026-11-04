"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

const schema = z.object({
  id: z.string().optional(),
  question: z.string().trim().min(5).max(300),
  answer: z.string().trim().min(1).max(10000),
  category: z.string().trim().max(100),
  visible: z.boolean(),
  position: z.number().int().min(0).max(10000),
  pageIds: z.array(z.string()).max(100),
  serviceIds: z.array(z.string()).max(100),
});
export async function saveFaqAction(formData: FormData) {
  const user = await requirePermission("pages:write");
  const parsed = schema.safeParse({
    id: formData.get("id") || undefined,
    question: formData.get("question"),
    answer: formData.get("answer"),
    category: formData.get("category") || "",
    visible: formData.get("visible") === "on",
    position: formData.get("position") || "0",
    pageIds: formData
      .getAll("pageIds")
      .filter((v): v is string => typeof v === "string"),
    serviceIds: formData
      .getAll("serviceIds")
      .filter((v): v is string => typeof v === "string"),
  });
  if (!parsed.success) redirect("/admin/faqs?error=validation");
  const db = getPrisma();
  if (!db) redirect("/admin?error=database");
  const data = parsed.data;
  const faq = await db.$transaction(async (tx) => {
    const saved = data.id
      ? await tx.faq.update({
          where: { id: data.id },
          data: {
            question: data.question,
            answer: data.answer,
            category: data.category || null,
            visible: data.visible,
            position: data.position,
          },
        })
      : await tx.faq.create({
          data: {
            question: data.question,
            answer: data.answer,
            category: data.category || null,
            visible: data.visible,
            position: data.position,
          },
        });
    await tx.pageFaq.deleteMany({ where: { faqId: saved.id } });
    await tx.serviceFaq.deleteMany({ where: { faqId: saved.id } });
    if (data.pageIds.length)
      await tx.pageFaq.createMany({
        data: [...new Set(data.pageIds)].map((pageId) => ({
          faqId: saved.id,
          pageId,
        })),
      });
    if (data.serviceIds.length)
      await tx.serviceFaq.createMany({
        data: [...new Set(data.serviceIds)].map((serviceId) => ({
          faqId: saved.id,
          serviceId,
        })),
      });
    await tx.activityLog.create({
      data: {
        userId: user.id,
        action: data.id ? "faq.update" : "faq.create",
        entityType: "faq",
        entityId: saved.id,
        summary: `${data.id ? "Updated" : "Created"} FAQ: ${saved.question}`,
      },
    });
    return saved;
  });
  void faq;
  revalidatePath("/", "layout");
  revalidatePath("/admin/faqs");
  redirect("/admin/faqs?saved=1");
}
export async function deleteFaqAction(formData: FormData) {
  const user = await requirePermission("pages:write");
  const id = String(formData.get("id") ?? "");
  const db = getPrisma();
  if (!db || !id) redirect("/admin/faqs");
  const faq = await db.faq.findUnique({ where: { id } });
  if (faq) {
    await db.faq.delete({ where: { id } });
    await db.activityLog.create({
      data: {
        userId: user.id,
        action: "faq.delete",
        entityType: "faq",
        entityId: id,
        summary: `Deleted FAQ: ${faq.question}`,
      },
    });
  }
  revalidatePath("/", "layout");
  redirect("/admin/faqs?saved=1");
}
