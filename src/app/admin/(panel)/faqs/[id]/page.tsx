import { notFound } from "next/navigation";
import { deleteFaqAction } from "@/app/admin/(panel)/faqs/actions";
import { DeleteRecordButton } from "@/components/admin/DeleteRecordButton";
import { FaqEditor } from "@/components/admin/FaqEditor";
import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
export const metadata = {
  title: "Edit FAQ",
  robots: { index: false, follow: false },
};
export default async function EditFaqPage({
  params,
}: PageProps<"/admin/faqs/[id]">) {
  await requirePermission("pages:write");
  const { id } = await params;
  const db = getPrisma();
  if (!db)
    return (
      <p className="admin-empty-state">Connect the database to edit FAQs.</p>
    );
  const [faq, pages, services] = await Promise.all([
    db.faq.findUnique({
      where: { id },
      include: { pages: true, services: true },
    }),
    db.page.findMany({
      select: { id: true, title: true },
      orderBy: { title: "asc" },
    }),
    db.service.findMany({
      select: { id: true, title: true },
      orderBy: { title: "asc" },
    }),
  ]);
  if (!faq) notFound();
  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-kicker">REUSABLE CONTENT / FAQ</p>
          <h1>Edit FAQ</h1>
        </div>
        <DeleteRecordButton
          action={deleteFaqAction}
          id={id}
          label="Delete FAQ"
          confirmation="Delete this FAQ and remove its page/service assignments?"
        />
      </div>
      <FaqEditor
        faq={{
          id: faq.id,
          question: faq.question,
          answer: faq.answer,
          category: faq.category ?? "",
          visible: faq.visible,
          position: faq.position,
          pageIds: faq.pages.map((x) => x.pageId),
          serviceIds: faq.services.map((x) => x.serviceId),
        }}
        pages={pages}
        services={services}
      />
    </div>
  );
}
