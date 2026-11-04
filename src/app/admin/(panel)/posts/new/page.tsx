import { PostEditor } from "@/components/admin/PostEditor";
import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
export const instant = false;
export const metadata = {
  title: "New post",
  robots: { index: false, follow: false },
};

export default async function NewPostPage({
  searchParams,
}: PageProps<"/admin/posts/new">) {
  await requirePermission("posts:write");
  const params = await searchParams;
  const db = getPrisma();
  if (!db)
    return (
      <p className="admin-empty-state">
        Connect the database before creating posts.
      </p>
    );
  const [pages, categories, tags] = await Promise.all([
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
  const error =
    params.error === "schedule"
      ? "Choose a future date and time for scheduled publication."
      : params.error === "validation"
        ? "Check the title, slug and article content, then try again."
        : undefined;
  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-kicker">EDITORIAL</p>
          <h1>New post</h1>
          <p>Draft a new article and decide where it belongs.</p>
        </div>
      </div>
      <PostEditor
        pages={pages}
        categories={categories}
        tags={tags}
        error={error}
      />
    </div>
  );
}
