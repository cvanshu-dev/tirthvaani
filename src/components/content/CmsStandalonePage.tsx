import Link from "next/link";
import { notFound } from "next/navigation";
import { CmsManagedSections } from "@/components/content/CmsManagedSections";
import { getPrisma } from "@/lib/prisma";

export async function CmsStandalonePage({ pageSlug }: { pageSlug: string }) {
  const db = getPrisma();
  const page = db
    ? await db.page.findFirst({
        where: {
          slug: pageSlug,
          status: "PUBLISHED",
          OR: [{ publishedAt: null }, { publishedAt: { lte: new Date() } }],
        },
        select: { title: true, breadcrumbs: true },
      })
    : null;
  if (!page) notFound();
  return (
    <main className="cms-page-content">
      {page.breadcrumbs && (
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          {page.title}
        </nav>
      )}
      <CmsManagedSections pageSlug={pageSlug} />
    </main>
  );
}
