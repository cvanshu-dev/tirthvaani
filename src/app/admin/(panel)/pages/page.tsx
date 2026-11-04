import Link from "next/link";
import { Plus } from "lucide-react";
import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

export const metadata = {
  title: "Pages",
  robots: { index: false, follow: false },
};

export default async function PagesPage() {
  await requirePermission("pages:read");
  const db = getPrisma();
  if (!db)
    return (
      <p className="admin-empty-state">Connect the database to manage pages.</p>
    );
  const pages = await db.page.findMany({
    include: { _count: { select: { sections: true, assignments: true } } },
    orderBy: { updatedAt: "desc" },
    take: 100,
  });
  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-kicker">WEBSITE</p>
          <h1>Pages</h1>
          <p>
            Build landing pages from reusable sections and assigned content.
          </p>
        </div>
        <Link className="admin-primary-button" href="/admin/pages/new">
          <Plus size={16} /> New page
        </Link>
      </div>
      <section className="admin-panel">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Page</th>
                <th>Status</th>
                <th>Sections</th>
                <th>Assigned posts</th>
                <th>Updated</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page.id}>
                  <td>
                    <Link
                      className="admin-table-title"
                      href={`/admin/pages/${page.id}`}
                    >
                      {page.title}
                    </Link>
                    <small>/{page.slug}</small>
                  </td>
                  <td>
                    <span
                      className={`admin-status status-${page.status.toLowerCase()}`}
                    >
                      {page.status.toLowerCase()}
                    </span>
                  </td>
                  <td>{page._count.sections}</td>
                  <td>{page._count.assignments}</td>
                  <td>{page.updatedAt.toLocaleDateString()}</td>
                  <td>
                    <Link
                      className="admin-row-action"
                      href={`/admin/pages/${page.id}`}
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {pages.length === 0 && (
            <p className="admin-empty-state">No pages found.</p>
          )}
        </div>
      </section>
    </div>
  );
}
