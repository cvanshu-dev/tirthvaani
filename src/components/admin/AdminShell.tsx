"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Blocks,
  BookOpenText,
  ChevronLeft,
  FileText,
  Globe2,
  Image,
  LayoutDashboard,
  Menu,
  MessageCircle,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  Tags,
  WandSparkles,
  X,
} from "lucide-react";
import { logoutAction } from "@/app/admin/actions";

const navigation = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { label: "Pages", href: "/admin/pages", icon: FileText },
      { label: "Blog posts", href: "/admin/posts", icon: BookOpenText },
      { label: "Categories & tags", href: "/admin/taxonomy", icon: Tags },
      { label: "Services", href: "/admin/services", icon: Blocks },
      { label: "Media library", href: "/admin/media", icon: Image },
      { label: "FAQs", href: "/admin/faqs", icon: MessageCircle },
      { label: "Testimonials", href: "/admin/testimonials", icon: Star },
    ],
  },
  {
    label: "Website",
    items: [
      { label: "Page builder", href: "/admin/pages", icon: WandSparkles },
      { label: "Navigation", href: "/admin/menus", icon: SlidersHorizontal },
      { label: "SEO manager", href: "/admin/seo", icon: Globe2 },
      { label: "Redirects", href: "/admin/redirects", icon: ArrowUpRight },
    ],
  },
  {
    label: "Administration",
    items: [
      { label: "Activity logs", href: "/admin/activity", icon: Activity },
      { label: "Users & roles", href: "/admin/users", icon: ShieldCheck },
      { label: "Settings", href: "/admin/settings", icon: Settings2 },
    ],
  },
];

export function AdminShell({
  children,
  name,
  role,
}: {
  children: React.ReactNode;
  name: string;
  role: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="admin-shell">
      {menuOpen && (
        <button
          className="admin-sidebar-scrim"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside className={`admin-sidebar ${menuOpen ? "is-open" : ""}`}>
        <Link className="admin-brand" href="/admin">
          <span className="admin-brand-mark">T</span>
          <span>
            TirthVaani
            <small>CONTENT STUDIO</small>
          </span>
          <button
            className="admin-sidebar-close"
            aria-label="Close navigation"
            onClick={() => setMenuOpen(false)}
          >
            <X size={18} />
          </button>
        </Link>

        <nav className="admin-navigation" aria-label="Admin navigation">
          {navigation.map((group) => (
            <section className="admin-nav-group" key={group.label}>
              <h2>{group.label}</h2>
              {group.items.map(({ label, href, icon: Icon }) => (
                <Link
                  className="admin-nav-link"
                  href={href}
                  key={label}
                  onClick={() => setMenuOpen(false)}
                >
                  <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
                  {label}
                </Link>
              ))}
            </section>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <Link href="/" target="_blank" className="admin-view-site">
            <span>View public website</span>
            <ArrowUpRight size={15} />
          </Link>
          <div className="admin-account">
            <span className="admin-avatar">
              {name.slice(0, 1).toUpperCase()}
            </span>
            <span className="admin-account-name">
              {name}
              <small>{role.replaceAll("_", " ")}</small>
            </span>
            <form action={logoutAction}>
              <button className="admin-logout" aria-label="Sign out">
                <ChevronLeft size={17} />
              </button>
            </form>
          </div>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button
            className="admin-menu-button"
            aria-label="Open navigation"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={20} />
          </button>
          <span className="admin-topbar-label">TirthVaani / Admin</span>
          <span className="admin-topbar-user">{name}</span>
        </header>
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
