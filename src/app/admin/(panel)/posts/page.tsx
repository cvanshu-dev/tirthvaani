import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

export const metadata = {
  title: "Blog posts",
  robots: { index: false, follow: false },
};

export default async function PostsPage({
  searchParams,
}: PageProps<"/admin/posts">) {
  const user = await requirePermission("posts:read");
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim() : "";
  const status = typeof params.status === "string" ? params.status : "";
  const db = getPrisma();
  if (!db)
    return (
      <section className="admin-panel">
        <h1>Blog posts</h1>
        <p>Connect the database to manage editorial content.</p>
      </section>
    );

  const where = {
    ...(status &&
    ["DRAFT", "PUBLISHED", "SCHEDULED", "ARCHIVED"].includes(status)
      ? { status: status as "DRAFT" | "PUBLISHED" | "SCHEDULED" | "ARCHIVED" }
      : {}),
    ...(query
      ? {
          OR: [
            { title: { contains: query, mode: "insensitive" as const } },
            { slug: { contains: query, mode: "insensitive" as const } },
          ],
        }
      : {}),
    ...(user.role.key === "AUTHOR" ? { authorId: user.id } : {}),
  };
  const posts = await db.post.findMany({
    where,
    include: {
      author: { select: { name: true } },
      assignments: { include: { page: { select: { title: true } } } },
    },
    orderBy: [{ updatedAt: "desc" }, { id: "asc" }],
    take: 50,
  });

  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-kicker">EDITORIAL</p>
          <h1>Blog posts</h1>
          <p>Create, edit and place articles across the site.</p>
        </div>
        <Link className="admin-primary-button" href="/admin/posts/new">
          <Plus size={16} /> New post
        </Link>
      </div>
      <section className="admin-panel">
        <form className="admin-filter-bar">
          <label className="admin-search-field">
            <Search size={16} />
            <input
              name="q"
              defaultValue={query}
              placeholder="Search titles or slugs"
            />
          </label>
          <select
            className="admin-input"
            name="status"
            defaultValue={status}
            aria-label="Filter by status"
          >
            <option value="">All statuses</option>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="ARCHIVED">Archived</option>
          </select>
          <button className="admin-secondary-button" type="submit">
            Filter
          </button>
        </form>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Page placements</th>
                <th>Author</th>
                <th>Updated</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <Link
                      className="admin-table-title"
                      href={`/admin/posts/${post.id}`}
                    >
                      {post.title}
                    </Link>
                    <small>/{post.slug}</small>
                  </td>
                  <td>
                    <span
                      className={`admin-status status-${post.status.toLowerCase()}`}
                    >
                      {post.status.toLowerCase()}
                    </span>
                  </td>
                  <td>
                    {post.assignments.length
                      ? post.assignments
                          .map((entry) => entry.page.title)
                          .join(", ")
                      : "—"}
                  </td>
                  <td>{post.author.name}</td>
                  <td>{post.updatedAt.toLocaleDateString()}</td>
                  <td>
                    <Link
                      className="admin-row-action"
                      href={`/admin/posts/${post.id}`}
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {posts.length === 0 && (
            <p className="admin-empty-state">
              No posts found. Create your first article to get started.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
