"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { Prisma } from "@/generated/prisma/client";
import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

const sectionSchema = z.object({
  id: z.string(),
  type: z.enum([
    "hero",
    "text",
    "image-text",
    "services",
    "posts",
    "faq",
    "testimonials",
    "gallery",
    "statistics",
    "contact",
    "cta",
  ]),
  visible: z.boolean(),
  config: z.object({
    heading: z.string().max(180),
    body: z.string().max(10000),
    image: z.string().max(2048),
    slot: z.string().max(80),
    buttonText: z.string().max(80),
    buttonHref: z.string().max(300),
  }),
});

const templateDataSchema = z.object({
  heroImage: z.string().max(2048),
  heroTitle: z.string().max(180),
  articleHeading: z.string().max(180),
  articleText: z.string().max(20000),
  articleImage: z.string().max(2048),
  imageCaption: z.string().max(500),
  showArticle: z.boolean(),
  showArticleImage: z.boolean(),
});

const pageSchema = z.object({
  id: z.string().optional(),

  title: z.string().trim().min(2).max(180),

  slug: z
    .string()
    .trim()
    .max(200)
    .refine(
      (value) =>
        value === "" ||
        /^(?:[a-z0-9]+(?:-[a-z0-9]+)*)(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/.test(
          value,
        ),
    ),

  template: z.enum(["STANDARD", "ABOUT", "DEV_RITUALS"]),

  templateData: templateDataSchema,

  status: z.enum(["DRAFT", "PUBLISHED"]),

  showHeader: z.boolean(),
  showFooter: z.boolean(),
  breadcrumbs: z.boolean(),

  seoTitle: z.string().max(180),
  seoDescription: z.string().max(320),

  sections: z.array(sectionSchema).max(40),
});

export async function savePageAction(formData: FormData) {
  const user = await requirePermission("pages:write");

  let parsedSections: unknown;

  try {
    parsedSections = JSON.parse(
      String(formData.get("sections") ?? "[]"),
    );
  } catch {
    redirect("/admin/pages/new?error=sections");
  }

  const parsed = pageSchema.safeParse({
    id: formData.get("id") || undefined,

    title: formData.get("title"),

    slug: formData.get("slug"),

    template: formData.get("template") || "STANDARD",

    templateData: {
      heroImage: String(formData.get("heroImage") ?? ""),
      heroTitle: String(formData.get("heroTitle") ?? ""),
      articleHeading: String(
        formData.get("articleHeading") ?? "",
      ),
      articleText: String(formData.get("articleText") ?? ""),
      articleImage: String(formData.get("articleImage") ?? ""),
      imageCaption: String(
        formData.get("imageCaption") ?? "",
      ),
      showArticle: formData.get("showArticle") === "on",
      showArticleImage:
        formData.get("showArticleImage") === "on",
    },

    status: formData.get("status"),

    showHeader: formData.get("showHeader") === "on",
    showFooter: formData.get("showFooter") === "on",
    breadcrumbs: formData.get("breadcrumbs") === "on",

    seoTitle: formData.get("seoTitle") || "",
    seoDescription: formData.get("seoDescription") || "",

    sections: parsedSections,
  });

  if (!parsed.success) {
    redirect("/admin/pages/new?error=validation");
  }

  const db = getPrisma();

  if (!db) {
    redirect("/admin?error=database");
  }

  const data = parsed.data;

  const previous = data.id
    ? await db.page.findUnique({
        where: {
          id: data.id,
        },
        include: {
          sections: true,
        },
      })
    : null;

  if (data.id && !previous) {
    redirect("/admin/pages?error=missing");
  }

  if (!data.slug && previous?.slug !== "") {
    redirect("/admin/pages/new?error=validation");
  }

  const status = data.status;

  await db.$transaction(async (tx) => {
    const saved = previous
      ? await tx.page.update({
          where: {
            id: previous.id,
          },
          data: {
            title: data.title,
            slug: data.slug,
            template: data.template,
            templateData: data.templateData,
            status,
            showHeader: data.showHeader,
            showFooter: data.showFooter,
            breadcrumbs: data.breadcrumbs,
            publishedAt:
              status === "PUBLISHED"
                ? previous.publishedAt ?? new Date()
                : null,
          },
        })
      : await tx.page.create({
          data: {
            title: data.title,
            slug: data.slug,
            template: data.template,
            templateData: data.templateData,
            status,
            showHeader: data.showHeader,
            showFooter: data.showFooter,
            breadcrumbs: data.breadcrumbs,
            publishedAt:
              status === "PUBLISHED" ? new Date() : null,
          },
        });

    await tx.pageSection.deleteMany({
      where: {
        pageId: saved.id,
      },
    });

    if (data.sections.length > 0) {
      await tx.pageSection.createMany({
        data: data.sections.map((section, position) => ({
          type: section.type,
          config: section.config,
          visible: section.visible,
          position,
          pageId: saved.id,
        })),
      });
    }

    await tx.seoMetadata.upsert({
      where: {
        pageId: saved.id,
      },
      create: {
        ownerType: "page",
        ownerId: saved.id,
        pageId: saved.id,
        title: data.seoTitle || null,
        description: data.seoDescription || null,
      },
      update: {
        title: data.seoTitle || null,
        description: data.seoDescription || null,
      },
    });

    if (previous) {
      await tx.revision.create({
        data: {
          type: "page",
          contentId: previous.id,
          userId: user.id,
          snapshot: {
            title: previous.title,
            slug: previous.slug,
            template: previous.template,
            templateData: previous.templateData,
            status: previous.status,
            sections: previous.sections.map((section) => ({
              type: section.type,
              config: section.config,
              visible: section.visible,
              position: section.position,
            })),
          },
          note: "Saved from page builder",
        },
      });
    }

    await tx.activityLog.create({
      data: {
        userId: user.id,
        action: previous ? "page.update" : "page.create",
        entityType: "page",
        entityId: saved.id,
        summary: `${previous ? "Updated" : "Created"} page: ${
          saved.title
        }`,
      },
    });
  });

  revalidatePath(data.slug ? `/${data.slug}` : "/");

  redirect("/admin/pages?saved=1");
}

export async function savePageAssignmentsAction(
  formData: FormData,
) {
  const user = await requirePermission("pages:write");

  let parsedItems: unknown;

  try {
    parsedItems = JSON.parse(
      String(formData.get("assignments") ?? "[]"),
    );
  } catch {
    redirect("/admin/pages?error=assignments");
  }

  const parsed = z
    .object({
      pageId: z.string().min(1),
      items: z
        .array(
          z.object({
            postId: z.string().min(1),
            slot: z.string().min(1).max(80),
            position: z.number().int().min(0).max(10000),
            visible: z.boolean(),
          }),
        )
        .max(100),
    })
    .safeParse({
      pageId: formData.get("pageId"),
      items: parsedItems,
    });

  if (!parsed.success) {
    redirect("/admin/pages?error=assignments");
  }

  const db = getPrisma();

  if (!db) {
    redirect("/admin?error=database");
  }

  const page = await db.page.findUnique({
    where: {
      id: parsed.data.pageId,
    },
    select: {
      id: true,
      slug: true,
    },
  });

  if (!page) {
    redirect("/admin/pages");
  }

  const items = parsed.data.items;

  await db.$transaction(async (tx) => {
    const existing = await tx.contentAssignment.findMany({
      where: {
        pageId: page.id,
      },
      select: {
        postId: true,
        displayOverride: true,
      },
    });

    await tx.contentAssignment.deleteMany({
      where: {
        pageId: page.id,
      },
    });

    if (items.length > 0) {
      await tx.contentAssignment.createMany({
        data: items.map((item) => {
          const previous = existing.find(
            (entry) => entry.postId === item.postId,
          );

          return {
            ...item,
            pageId: page.id,
            displayOverride:
              previous?.displayOverride &&
              typeof previous.displayOverride === "object"
                ? (previous.displayOverride as Prisma.InputJsonValue)
                : Prisma.JsonNull,
          };
        }),
      });
    }

    await tx.activityLog.create({
      data: {
        userId: user.id,
        action: "page.assignments.update",
        entityType: "page",
        entityId: page.id,
        summary: `Updated post placements on ${
          page.slug || "the homepage"
        }`,
      },
    });
  });

  revalidatePath(page.slug ? `/${page.slug}` : "/");

  redirect(`/admin/pages/${page.id}?assignments=saved`);
}