import Link from "next/link";
import { notFound } from "next/navigation";

import { CmsManagedSections } from "@/components/content/CmsManagedSections";
import { FixedPageTemplate } from "@/components/content/FixedPageTemplate";
import { getPrisma } from "@/lib/prisma";

function isObject(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

export async function CmsStandalonePage({
  pageSlug,
}: {
  pageSlug: string;
}) {
  const db = getPrisma();

  const page = db
    ? await db.page.findFirst({
        where: {
          slug: pageSlug,
          status: "PUBLISHED",
          OR: [
            { publishedAt: null },
            { publishedAt: { lte: new Date() } },
          ],
        },
        select: {
          title: true,
          breadcrumbs: true,
          template: true,
          templateData: true,
        },
      })
    : null;

  if (!page) {
    notFound();
  }

  if (
    page.template === "ABOUT" ||
    page.template === "DEV_RITUALS"
  ) {
    return (
      <FixedPageTemplate
        data={isObject(page.templateData) ? page.templateData : {}}
      />
    );
  }

  return (
    <main className="cms-page-content">
      {page.breadcrumbs && (
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>{page.title}</span>
        </nav>
      )}

      <CmsManagedSections pageSlug={pageSlug} />
    </main>
  );
}