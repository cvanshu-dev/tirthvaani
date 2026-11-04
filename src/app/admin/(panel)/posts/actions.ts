"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

const schema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(3).max(180),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(180)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  excerpt: z.string().trim().max(500),
  body: z.string().trim().min(1).max(100_000),
  status: z.enum(["DRAFT", "PUBLISHED", "SCHEDULED", "ARCHIVED"]),
  scheduledAt: z.string().optional(),
  featured: z.boolean(),
  assignments: z
    .array(
      z.object({
        pageId: z.string(),
        slot: z.string().min(1).max(80),
        position: z.number().int().min(0),
        displayOverride: z.object({
          heading: z.string().max(120),
          description: z.string().max(300),
          cardStyle: z.enum(["editorial", "compact"]),
          limit: z.number().int().min(1).max(24),
          sort: z.enum(["manual", "newest", "oldest"]),
          showImage: z.boolean(),
          showCategory: z.boolean(),
          showDate: z.boolean(),
          showAuthor: z.boolean(),
          ctaText: z.string().max(80),
          ctaHref: z.string().max(300),
        }),
      }),
    )
    .max(50),
  categories: z.array(z.string()).max(30),
  tags: z.array(z.string()).max(50),
  seoTitle: z.string().trim().max(180),
  seoDescription: z.string().trim().max(320),
});

export async function savePostAction(formData: FormData) {
  const user = await requirePermission("posts:write");
  const parsed = schema.safeParse({
    id: formData.get("id") || undefined,
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt") ?? "",
    body: formData.get("body"),
    status: formData.get("status"),
    scheduledAt: formData.get("scheduledAt") || undefined,
    featured: formData.get("featured") === "on",
    assignments: (() => {
      try {
        return JSON.parse(String(formData.get("assignmentConfig") ?? "[]"));
      } catch {
        return null;
      }
    })(),
    categories: formData
      .getAll("categories")
      .filter((value): value is string => typeof value === "string"),
    tags: formData
      .getAll("tags")
      .filter((value): value is string => typeof value === "string"),
    seoTitle: formData.get("seoTitle") || "",
    seoDescription: formData.get("seoDescription") || "",
  });

  if (!parsed.success) {
    redirect(`/admin/posts/new?error=validation`);
  }

  const db = getPrisma();
  if (!db) redirect("/admin?error=database");
  const values = parsed.data;
  const status = values.status;
  const scheduledAt = values.scheduledAt ? new Date(values.scheduledAt) : null;
  if (status === "SCHEDULED" && (!scheduledAt || scheduledAt <= new Date())) {
    redirect("/admin/posts/new?error=schedule");
  }

  const previous = values.id
    ? await db.post.findUnique({
        where: { id: values.id },
        include: { categories: true, tags: true },
      })
    : null;
  if (values.id && !previous) redirect("/admin/posts?error=missing");
  if (previous && user.role.key === "AUTHOR" && previous.authorId !== user.id) {
    redirect("/admin?error=forbidden");
  }
  if (
    (status === "PUBLISHED" || status === "SCHEDULED") &&
    user.role.key === "AUTHOR"
  ) {
    redirect("/admin?error=forbidden");
  }
  const publishedAt =
    status === "PUBLISHED" ? (previous?.publishedAt ?? new Date()) : null;
  const body = { format: "plain-text-v1", text: values.body };

  const post = await db.$transaction(async (tx) => {
    const saved = previous
      ? await tx.post.update({
          where: { id: previous.id },
          data: {
            title: values.title,
            slug: values.slug,
            excerpt: values.excerpt,
            content: body,
            status,
            scheduledAt: status === "SCHEDULED" ? scheduledAt : null,
            publishedAt,
            featured: values.featured,
          },
        })
      : await tx.post.create({
          data: {
            title: values.title,
            slug: values.slug,
            excerpt: values.excerpt,
            content: body,
            status,
            scheduledAt: status === "SCHEDULED" ? scheduledAt : null,
            publishedAt,
            featured: values.featured,
            authorId: user.id,
          },
        });

    await tx.contentAssignment.deleteMany({ where: { postId: saved.id } });
    await tx.postCategory.deleteMany({ where: { postId: saved.id } });
    await tx.postTag.deleteMany({ where: { postId: saved.id } });
    if (values.categories.length)
      await tx.postCategory.createMany({
        data: [...new Set(values.categories)].map((categoryId) => ({
          postId: saved.id,
          categoryId,
        })),
      });
    if (values.tags.length)
      await tx.postTag.createMany({
        data: [...new Set(values.tags)].map((tagId) => ({
          postId: saved.id,
          tagId,
        })),
      });
    if (values.assignments.length) {
      await tx.contentAssignment.createMany({
        data: values.assignments.map(
          ({ pageId, slot, position, displayOverride }) => ({
            pageId,
            postId: saved.id,
            slot,
            position,
            visible: true,
            displayOverride,
          }),
        ),
      });
    }

    await tx.seoMetadata.upsert({
      where: { postId: saved.id },
      create: {
        ownerType: "post",
        ownerId: saved.id,
        postId: saved.id,
        title: values.seoTitle || null,
        description: values.seoDescription || null,
      },
      update: {
        title: values.seoTitle || null,
        description: values.seoDescription || null,
      },
    });

    if (previous) {
      await tx.revision.create({
        data: {
          type: "post",
          contentId: previous.id,
          postId: previous.id,
          userId: user.id,
          snapshot: {
            title: previous.title,
            slug: previous.slug,
            excerpt: previous.excerpt,
            content: previous.content,
            status: previous.status,
            featured: previous.featured,
            scheduledAt: previous.scheduledAt,
            publishedAt: previous.publishedAt,
          },
          note: "Saved from post editor",
        },
      });
    }

    await tx.activityLog.create({
      data: {
        userId: user.id,
        action: previous ? "post.update" : "post.create",
        entityType: "post",
        entityId: saved.id,
        summary: `${previous ? "Updated" : "Created"} post: ${saved.title}`,
        changes: { status: { from: previous?.status ?? null, to: status } },
      },
    });
    return saved;
  });

  revalidatePath("/journal");
  revalidatePath(`/journal/${post.slug}`);
  for (const { pageId } of values.assignments) {
    const page = await db.page.findUnique({
      where: { id: pageId },
      select: { slug: true },
    });
    if (page) revalidatePath(page.slug ? `/${page.slug}` : "/");
  }
  redirect("/admin/posts?saved=1");
}

export async function deletePostAction(formData: FormData) {
  const user = await requirePermission("posts:write");
  const id = String(formData.get("id") ?? "");
  const db = getPrisma();
  if (!db || !id) redirect("/admin/posts");
  const post = await db.post.findUnique({
    where: { id },
    select: { id: true, title: true, authorId: true },
  });
  if (!post) redirect("/admin/posts");
  if (user.role.key === "AUTHOR" && post.authorId !== user.id)
    redirect("/admin?error=forbidden");
  await db.post.delete({ where: { id } });
  await db.activityLog.create({
    data: {
      userId: user.id,
      action: "post.delete",
      entityType: "post",
      entityId: id,
      summary: `Deleted post: ${post.title}`,
    },
  });
  revalidatePath("/journal");
  redirect("/admin/posts?deleted=1");
}

export async function restorePostRevisionAction(formData: FormData) {
  const user = await requirePermission("posts:write");
  const revisionId = String(formData.get("revisionId") ?? "");
  const db = getPrisma();
  if (!db || !revisionId) redirect("/admin/posts");
  const revision = await db.revision.findUnique({
    where: { id: revisionId },
    include: { post: true },
  });
  if (!revision?.post || revision.type !== "post") redirect("/admin/posts");
  const current = revision.post;
  if (user.role.key === "AUTHOR" && current.authorId !== user.id) {
    redirect("/admin?error=forbidden");
  }
  const snapshot = revision.snapshot;
  if (!snapshot || typeof snapshot !== "object" || Array.isArray(snapshot)) {
    redirect(`/admin/posts/${current.id}?error=revision`);
  }
  const values = snapshot as Record<string, unknown>;
  const statuses = ["DRAFT", "PUBLISHED", "SCHEDULED", "ARCHIVED"];
  if (
    typeof values.title !== "string" ||
    typeof values.slug !== "string" ||
    typeof values.excerpt !== "string" ||
    !statuses.includes(String(values.status))
  ) {
    redirect(`/admin/posts/${current.id}?error=revision`);
  }
  if (values.status !== "DRAFT" && user.role.key === "AUTHOR") {
    await requirePermission("posts:publish");
  }

  await db.$transaction(async (tx) => {
    await tx.revision.create({
      data: {
        type: "post",
        contentId: current.id,
        postId: current.id,
        userId: user.id,
        snapshot: {
          title: current.title,
          slug: current.slug,
          excerpt: current.excerpt,
          content: current.content,
          status: current.status,
          featured: current.featured,
          scheduledAt: current.scheduledAt,
          publishedAt: current.publishedAt,
        },
        note: "Backup before revision restore",
      },
    });
    await tx.post.update({
      where: { id: current.id },
      data: {
        title: values.title as string,
        slug: values.slug as string,
        excerpt: values.excerpt as string,
        content:
          values.content && typeof values.content === "object"
            ? values.content
            : {},
        status: values.status as
          "DRAFT" | "PUBLISHED" | "SCHEDULED" | "ARCHIVED",
        featured: values.featured === true,
        scheduledAt:
          typeof values.scheduledAt === "string"
            ? new Date(values.scheduledAt)
            : null,
        publishedAt:
          typeof values.publishedAt === "string"
            ? new Date(values.publishedAt)
            : null,
      },
    });
    await tx.activityLog.create({
      data: {
        userId: user.id,
        action: "post.revision.restore",
        entityType: "post",
        entityId: current.id,
        summary: `Restored a previous revision of ${values.title}`,
      },
    });
  });
  revalidatePath("/journal");
  revalidatePath(`/journal/${current.slug}`);
  revalidatePath(`/journal/${values.slug}`);
  redirect(`/admin/posts/${current.id}?restored=1`);
}

export async function duplicatePostAction(formData: FormData) {
  const user = await requirePermission("posts:write");
  const id = String(formData.get("id") ?? "");
  const db = getPrisma();
  if (!db || !id) redirect("/admin/posts");
  const source = await db.post.findUnique({
    where: { id },
    include: { categories: true, tags: true },
  });
  if (!source) redirect("/admin/posts");
  if (user.role.key === "AUTHOR" && source.authorId !== user.id) {
    redirect("/admin?error=forbidden");
  }
  const copy = await db.$transaction(async (tx) => {
    const created = await tx.post.create({
      data: {
        title: `${source.title} (copy)`.slice(0, 180),
        slug: `${source.slug}-copy-${randomUUID().slice(0, 8)}`,
        excerpt: source.excerpt,
        content: source.content ?? {},
        featured: false,
        status: "DRAFT",
        authorId: user.id,
        featuredMediaId: source.featuredMediaId,
        readingMinutes: source.readingMinutes,
      },
    });
    if (source.categories.length) {
      await tx.postCategory.createMany({
        data: source.categories.map((entry) => ({
          postId: created.id,
          categoryId: entry.categoryId,
        })),
      });
    }
    if (source.tags.length) {
      await tx.postTag.createMany({
        data: source.tags.map((entry) => ({
          postId: created.id,
          tagId: entry.tagId,
        })),
      });
    }
    await tx.activityLog.create({
      data: {
        userId: user.id,
        action: "post.duplicate",
        entityType: "post",
        entityId: created.id,
        summary: `Duplicated post: ${source.title}`,
      },
    });
    return created;
  });
  redirect(`/admin/posts/${copy.id}`);
}
