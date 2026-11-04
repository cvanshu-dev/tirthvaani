import { PageEditor } from "@/components/admin/PageEditor";
import { requirePermission } from "@/lib/auth";

export const metadata = {
  title: "New page",
  robots: { index: false, follow: false },
};
export default async function NewPage({
  searchParams,
}: PageProps<"/admin/pages/new">) {
  await requirePermission("pages:write");
  const params = await searchParams;
  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-kicker">WEBSITE / PAGE BUILDER</p>
          <h1>Create a page</h1>
          <p>
            Assemble a new destination or landing page without editing source
            code.
          </p>
        </div>
      </div>
      <PageEditor
        sections={[]}
        error={
          params.error === "validation"
            ? "Review the page title, URL path and section details."
            : undefined
        }
      />
    </div>
  );
}
