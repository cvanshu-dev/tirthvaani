import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

export const metadata = {
  title: "Activity logs",
  robots: { index: false, follow: false },
};
export default async function ActivityPage({
  searchParams,
}: PageProps<"/admin/activity">) {
  await requirePermission("activity:read");
  const query = await searchParams;
  const page = Math.max(1, Number(query.page) || 1);
  const db = getPrisma();
  if (!db)
    return (
      <p className="admin-empty-state">
        Connect the database to view activity.
      </p>
    );
  const [entries, count] = await Promise.all([
    db.activityLog.findMany({
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * 50,
      take: 50,
    }),
    db.activityLog.count(),
  ]);
  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-kicker">ADMINISTRATION</p>
          <h1>Activity log</h1>
          <p>Changes and access events recorded by the CMS.</p>
        </div>
      </div>
      <section className="admin-panel">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Activity</th>
                <th>User</th>
                <th>Content</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td className="admin-activity-summary">
                    {entry.summary}
                    <small>{entry.action}</small>
                  </td>
                  <td>
                    {entry.user?.name ?? "System"}
                    <small>{entry.user?.email ?? ""}</small>
                  </td>
                  <td>
                    {entry.entityType}
                    {entry.entityId ? ` · ${entry.entityId}` : ""}
                  </td>
                  <td>{entry.createdAt.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {entries.length === 0 && (
            <p className="admin-empty-state">No activity recorded yet.</p>
          )}
        </div>
        <p className="admin-pagination">
          Showing {entries.length ? (page - 1) * 50 + 1 : 0}–
          {Math.min(page * 50, count)} of {count}
          {page > 1 && <a href={`?page=${page - 1}`}>Previous</a>}
          {page * 50 < count && <a href={`?page=${page + 1}`}>Next</a>}
        </p>
      </section>
    </div>
  );
}
