import Link from "next/link";
import { Plus } from "lucide-react";
import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

export const metadata = {
  title: "FAQs",
  robots: { index: false, follow: false },
};
export default async function FaqsPage() {
  await requirePermission("pages:read");
  const db = getPrisma();
  if (!db)
    return (
      <p className="admin-empty-state">Connect the database to manage FAQs.</p>
    );
  const faqs = await db.faq.findMany({
    include: {
      pages: { include: { page: { select: { title: true } } } },
      services: { include: { service: { select: { title: true } } } },
    },
    orderBy: [{ position: "asc" }, { updatedAt: "desc" }],
  });
  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-kicker">REUSABLE CONTENT</p>
          <h1>FAQs</h1>
          <p>Manage answers and reuse them on pages and services.</p>
        </div>
        <Link className="admin-primary-button" href="/admin/faqs/new">
          <Plus size={16} /> New FAQ
        </Link>
      </div>
      <section className="admin-panel">
        <div className="admin-list">
          {faqs.map((faq) => (
            <Link
              className="admin-list-row"
              href={`/admin/faqs/${faq.id}`}
              key={faq.id}
            >
              <span>
                <strong>{faq.question}</strong>
                <small>
                  {faq.category || "General"} ·{" "}
                  {faq.visible ? "Visible" : "Hidden"} ·{" "}
                  {faq.pages.length + faq.services.length} placements
                </small>
              </span>
              <span className="admin-row-action">Edit</span>
            </Link>
          ))}
        </div>
        {faqs.length === 0 && <p className="admin-empty-state">No FAQs yet.</p>}
      </section>
    </div>
  );
}
