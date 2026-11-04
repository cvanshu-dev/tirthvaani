import { TestimonialEditor } from "@/components/admin/TestimonialEditor";
import { requirePermission } from "@/lib/auth";
export const metadata = {
  title: "New testimonial",
  robots: { index: false, follow: false },
};
export default async function NewTestimonialPage() {
  await requirePermission("pages:write");
  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-kicker">REUSABLE CONTENT</p>
          <h1>New testimonial</h1>
        </div>
      </div>
      <TestimonialEditor />
    </div>
  );
}
