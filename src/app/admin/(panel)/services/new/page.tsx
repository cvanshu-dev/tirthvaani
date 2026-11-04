import { ServiceEditor } from "@/components/admin/ServiceEditor";
import { requirePermission } from "@/lib/auth";

export const metadata = {
  title: "New service",
  robots: { index: false, follow: false },
};
export default async function NewServicePage({
  searchParams,
}: PageProps<"/admin/services/new">) {
  await requirePermission("services:write");
  const params = await searchParams;
  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-kicker">OFFERINGS</p>
          <h1>New service</h1>
          <p>Add a service and publish it to the website.</p>
        </div>
      </div>
      <ServiceEditor
        error={
          params.error
            ? "Review the service name, slug and detailed description."
            : undefined
        }
      />
    </div>
  );
}
