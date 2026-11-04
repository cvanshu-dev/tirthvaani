import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await getCurrentUser()) {
    redirect("/admin");
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-panel">
        <p className="admin-kicker">TIRTHVAANI · CONTENT STUDIO</p>
        <h1>Welcome back.</h1>
        <p className="admin-login-intro">
          Sign in to manage the website, editorial content and pilgrimage
          information.
        </p>
        <LoginForm />
        <p className="admin-login-security">
          Access is limited to approved TirthVaani administrators and editors.
        </p>
      </section>
    </main>
  );
}
