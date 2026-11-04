import { notFound } from "next/navigation";
import { deleteTestimonialAction } from "@/app/admin/(panel)/testimonials/actions";
import { DeleteRecordButton } from "@/components/admin/DeleteRecordButton";
import { TestimonialEditor } from "@/components/admin/TestimonialEditor";
import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
export const metadata = {
  title: "Edit testimonial",
  robots: { index: false, follow: false },
};
export default async function EditTestimonialPage({
  params,
}: PageProps<"/admin/testimonials/[id]">) {
  await requirePermission("pages:write");
  const { id } = await params;
  const db = getPrisma();
  if (!db)
    return (
      <p className="admin-empty-state">
        Connect the database to edit testimonials.
      </p>
    );
  const item = await db.testimonial.findUnique({ where: { id } });
  if (!item) notFound();
  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-kicker">REUSABLE CONTENT / TESTIMONIAL</p>
          <h1>Edit testimonial</h1>
        </div>
        <DeleteRecordButton
          action={deleteTestimonialAction}
          id={id}
          label="Delete testimonial"
          confirmation="Delete this testimonial?"
        />
      </div>
      <TestimonialEditor
        item={{
          id: item.id,
          name: item.name,
          location: item.location ?? "",
          quote: item.quote,
          rating: item.rating,
          imageUrl: item.imageUrl ?? "",
          featured: item.featured,
          visible: item.visible,
          position: item.position,
        }}
      />
    </div>
  );
}
