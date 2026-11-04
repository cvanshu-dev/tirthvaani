import { notFound } from "next/navigation";
import { DeletePostButton } from "@/components/admin/DeletePostButton";
import { DuplicatePostButton } from "@/components/admin/DuplicatePostButton";
import { PostEditor } from "@/components/admin/PostEditor";
import { PostRevisionHistory } from "@/components/admin/PostRevisionHistory";
import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

export const metadata = {
  title: "Edit post",
  robots: { index: false, follow: false },
};

export default async function EditPostPage({
  params,
  searchParams,
}: PageProps<"/admin/posts/[id]">) {
  const user = await requirePermission("posts:read");
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const db = getPrisma();
  if (!db)
    return (
      <p className="admin-empty-state">Connect the database to edit posts.</p>
    );
  const [post, pages, categories, tags] = await Promise.all([
    db.post.findUnique({
      where: { id },
      include: {
        assignments: true,
        seo: true,
        categories: true,
        tags: true,
        revisions: { orderBy: { createdAt: "desc" }, take: 10 },
      },
    }),
    db.page.findMany({
      select: { id: true, title: true, slug: true },
      orderBy: { title: "asc" },
    }),
    db.category.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
    db.tag.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);
  if (!post || (user.role.key === "AUTHOR" && post.authorId !== user.id))
    notFound();
  const body =
    post.content &&
    typeof post.content === "object" &&
    !Array.isArray(post.content) &&
    "text" in post.content
      ? String(post.content.text)
      : "";
  const editorPost = {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    body,
    status: post.status,
    featured: post.featured,
    scheduledAt: post.scheduledAt
      ? new Date(
          post.scheduledAt.getTime() -
            post.scheduledAt.getTimezoneOffset() * 60000,
        )
          .toISOString()
          .slice(0, 16)
      : "",
    assignments: post.assignments.map((assignment) => ({
      pageId: assignment.pageId,
      slot: assignment.slot,
      displayOverride:
        assignment.displayOverride &&
        typeof assignment.displayOverride === "object" &&
        !Array.isArray(assignment.displayOverride)
          ? (assignment.displayOverride as Record<string, unknown>)
          : {},
    })),
    categoryIds: post.categories.map((entry) => entry.categoryId),
    tagIds: post.tags.map((entry) => entry.tagId),
    seoTitle: post.seo?.title ?? "",
    seoDescription: post.seo?.description ?? "",
  };
  const error =
    query.error === "validation"
      ? "Check the title, slug and article content, then try again."
      : undefined;
  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-kicker">EDITORIAL / EDIT</p>
          <h1>Edit post</h1>
          <p>Changes update the central article and all of its placements.</p>
        </div>
        <div className="admin-heading-actions">
          <DuplicatePostButton id={post.id} />
          <DeletePostButton id={post.id} />
        </div>
      </div>
      <PostEditor
        post={editorPost}
        pages={pages}
        categories={categories}
        tags={tags}
        error={error}
      />
      <PostRevisionHistory revisions={post.revisions} />
    </div>
  );
}
