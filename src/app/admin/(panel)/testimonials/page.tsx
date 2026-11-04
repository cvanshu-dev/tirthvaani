import Link from "next/link";
import { Plus } from "lucide-react";
import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
export const metadata = {
  title: "Testimonials",
  robots: { index: false, follow: false },
};
export default async function TestimonialsPage() {
  await requirePermission("pages:read");
  const db = getPrisma();
  if (!db)
    return (
      <p className="admin-empty-state">
        Connect the database to manage testimonials.
      </p>
    );
  const items = await db.testimonial.findMany({
    orderBy: [{ position: "asc" }, { updatedAt: "desc" }],
  });
  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-kicker">REUSABLE CONTENT</p>
          <h1>Testimonials</h1>
          <p>Manage and feature customer stories across the site.</p>
        </div>
        <Link className="admin-primary-button" href="/admin/testimonials/new">
          <Plus size={16} /> New testimonial
        </Link>
      </div>
      <section className="admin-panel">
        <div className="admin-list">
          {items.map((item) => (
            <Link
              className="admin-list-row"
              href={`/admin/testimonials/${item.id}`}
              key={item.id}
            >
              <span>
                <strong>
                  {item.name}
                  {item.location ? ` · ${item.location}` : ""}
                </strong>
                <small>
                  {item.quote.slice(0, 140)}
                  {item.quote.length > 140 ? "…" : ""} ·{" "}
                  {item.visible ? "Visible" : "Hidden"}
                  {item.featured ? " · Featured" : ""}
                </small>
              </span>
              <span className="admin-row-action">Edit</span>
            </Link>
          ))}
        </div>
        {items.length === 0 && (
          <p className="admin-empty-state">No testimonials yet.</p>
        )}
      </section>
    </div>
  );
}
