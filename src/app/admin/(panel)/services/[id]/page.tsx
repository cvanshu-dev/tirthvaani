import { notFound } from "next/navigation";
import { ServiceEditor } from "@/components/admin/ServiceEditor";
import { DeleteServiceButton } from "@/components/admin/DeleteServiceButton";
import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

export const metadata = {
  title: "Edit service",
  robots: { index: false, follow: false },
};
export default async function EditServicePage({
  params,
}: PageProps<"/admin/services/[id]">) {
  await requirePermission("services:write");
  const { id } = await params;
  const db = getPrisma();
  if (!db)
    return (
      <p className="admin-empty-state">
        Connect the database to edit services.
      </p>
    );
  const service = await db.service.findUnique({
    where: { id },
    include: { seo: true },
  });
  if (!service) notFound();
  const body =
    service.description &&
    typeof service.description === "object" &&
    !Array.isArray(service.description) &&
    "text" in service.description
      ? String(service.description.text)
      : "";
  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-kicker">OFFERINGS / EDIT</p>
          <h1>Edit {service.title}</h1>
        </div>
        <DeleteServiceButton id={service.id} />
      </div>
      <ServiceEditor
        service={{
          id: service.id,
          title: service.title,
          slug: service.slug,
          summary: service.summary,
          body,
          status: service.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
          durationMinutes: service.durationMinutes,
          location: service.location ?? "",
          bookingCta: service.bookingCta ?? "",
          seoTitle: service.seo?.title ?? "",
          seoDescription: service.seo?.description ?? "",
        }}
      />
    </div>
  );
}
