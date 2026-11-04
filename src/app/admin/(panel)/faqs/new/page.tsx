import { FaqEditor } from "@/components/admin/FaqEditor";
import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
export const metadata = {
  title: "New FAQ",
  robots: { index: false, follow: false },
};
export default async function NewFaqPage() {
  await requirePermission("pages:write");
  const db = getPrisma();
  if (!db)
    return (
      <p className="admin-empty-state">
        Connect the database to create an FAQ.
      </p>
    );
  const [pages, services] = await Promise.all([
    db.page.findMany({
      select: { id: true, title: true },
      orderBy: { title: "asc" },
    }),
    db.service.findMany({
      select: { id: true, title: true },
      orderBy: { title: "asc" },
    }),
  ]);
  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-kicker">REUSABLE CONTENT</p>
          <h1>New FAQ</h1>
        </div>
      </div>
      <FaqEditor pages={pages} services={services} />
    </div>
  );
}
