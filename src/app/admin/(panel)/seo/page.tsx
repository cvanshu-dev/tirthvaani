import Link from "next/link";
import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

export const metadata = {
  title: "SEO manager",
  robots: { index: false, follow: false },
};
export default async function SeoManagerPage() {
  await requirePermission("seo:manage");
  const db = getPrisma();
  if (!db)
    return (
      <p className="admin-empty-state">
        Connect the database to manage SEO metadata.
      </p>
    );
  const [pages, posts, services] = await Promise.all([
    db.page.findMany({
      where: { status: "PUBLISHED" },
      include: { seo: true },
      orderBy: { title: "asc" },
      take: 200,
    }),
    db.post.findMany({
      where: { status: "PUBLISHED" },
      include: { seo: true },
      orderBy: { title: "asc" },
      take: 200,
    }),
    db.service.findMany({
      where: { status: "PUBLISHED" },
      include: { seo: true },
      orderBy: { title: "asc" },
      take: 200,
    }),
  ]);
  const rows = [
    ...pages.map((item) => ({
      type: "page",
      id: item.id,
      title: item.title,
      path: `/${item.slug}`,
      seo: item.seo,
    })),
    ...posts.map((item) => ({
      type: "post",
      id: item.id,
      title: item.title,
      path: `/journal/${item.slug}`,
      seo: item.seo,
    })),
    ...services.map((item) => ({
      type: "service",
      id: item.id,
      title: item.title,
      path: `/services/${item.slug}`,
      seo: item.seo,
    })),
  ];
  const needsAttention = rows.filter(
    (item) =>
      !item.seo?.title || !item.seo?.description || !item.seo?.canonicalUrl,
  ).length;
  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-kicker">DISCOVERABILITY</p>
          <h1>SEO manager</h1>
          <p>Review metadata for every published page, article and service.</p>
        </div>
      </div>
      <section className="admin-metric-grid admin-seo-metrics">
        <article className="admin-metric-card">
          <p>Published URLs</p>
          <strong>{rows.length}</strong>
        </article>
        <article className="admin-metric-card">
          <p>Need metadata</p>
          <strong>{needsAttention}</strong>
        </article>
      </section>
      <section className="admin-panel">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Content</th>
                <th>Type</th>
                <th>SEO title</th>
                <th>Description</th>
                <th>Index</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => (
                <tr key={`${item.type}-${item.id}`}>
                  <td>
                    <Link
                      className="admin-table-title"
                      href={`/admin/seo/${item.type}/${item.id}`}
                    >
                      {item.title}
                    </Link>
                    <small>{item.path}</small>
                  </td>
                  <td>{item.type}</td>
                  <td>
                    {item.seo?.title || (
                      <span className="admin-seo-missing">Missing</span>
                    )}
                  </td>
                  <td>
                    {item.seo?.description ? (
                      `${item.seo.description.slice(0, 60)}${item.seo.description.length > 60 ? "…" : ""}`
                    ) : (
                      <span className="admin-seo-missing">Missing</span>
                    )}
                  </td>
                  <td>{item.seo?.robotsIndex === false ? "No" : "Yes"}</td>
                  <td>
                    <Link
                      className="admin-row-action"
                      href={`/admin/seo/${item.type}/${item.id}`}
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
