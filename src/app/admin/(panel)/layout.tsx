import { redirect } from "next/navigation";
import { connection } from "next/server";
import { AdminShell } from "@/components/admin/AdminShell";
import { getCurrentUser } from "@/lib/auth";

export default async function AdminPanelLayout({
  children,
}: LayoutProps<"/admin">) {
  await connection();
  const user = await getCurrentUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <AdminShell name={user.name} role={user.role.key}>
      {children}
    </AdminShell>
  );
}
