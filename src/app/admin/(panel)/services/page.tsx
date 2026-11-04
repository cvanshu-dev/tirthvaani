import Link from "next/link";
import { Plus } from "lucide-react";
import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

export const metadata = {
  title: "Services",
  robots: { index: false, follow: false },
};
export default async function ServicesPage() {
  await requirePermission("services:read");
  const db = getPrisma();
  if (!db)
    return (
      <p className="admin-empty-state">
        Connect the database to manage services.
      </p>
    );
  const services = await db.service.findMany({
    include: { _count: { select: { faqs: true } } },
    orderBy: { updatedAt: "desc" },
    take: 100,
  });
  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-kicker">OFFERINGS</p>
          <h1>Services</h1>
          <p>Manage ritual details, publishing and search metadata.</p>
        </div>
        <Link className="admin-primary-button" href="/admin/services/new">
          <Plus size={16} /> New service
        </Link>
      </div>
      <section className="admin-panel">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Status</th>
                <th>Location</th>
                <th>Updated</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td>
                    <Link
                      className="admin-table-title"
                      href={`/admin/services/${service.id}`}
                    >
                      {service.title}
                    </Link>
                    <small>/{service.slug}</small>
                  </td>
                  <td>
                    <span
                      className={`admin-status status-${service.status.toLowerCase()}`}
                    >
                      {service.status.toLowerCase()}
                    </span>
                  </td>
                  <td>{service.location || "—"}</td>
                  <td>{service.updatedAt.toLocaleDateString()}</td>
                  <td>
                    <Link
                      className="admin-row-action"
                      href={`/admin/services/${service.id}`}
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {services.length === 0 && (
            <p className="admin-empty-state">No services yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
