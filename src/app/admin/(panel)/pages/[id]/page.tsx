import { notFound } from "next/navigation";

import { PageEditor } from "@/components/admin/PageEditor";
import { PageAssignmentsEditor } from "@/components/admin/PageAssignmentsEditor";
import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

export const metadata = {
  title: "Edit page",
  robots: { index: false, follow: false },
};

export const instant = false;

type Section = {
  id: string;
  type:
    | "hero"
    | "text"
    | "image-text"
    | "services"
    | "posts"
    | "faq"
    | "testimonials"
    | "gallery"
    | "statistics"
    | "contact"
    | "cta";
  visible: boolean;
  config: {
    heading: string;
    body: string;
    image: string;
    slot: string;
    buttonText: string;
    buttonHref: string;
  };
};

function toSection(section: {
  id: string;
  type: string;
  visible: boolean;
  config: unknown;
}): Section | null {
  const types = [
    "hero",
    "text",
    "image-text",
    "services",
    "posts",
    "faq",
    "testimonials",
    "gallery",
    "statistics",
    "contact",
    "cta",
  ] as const;

  if (!types.includes(section.type as (typeof types)[number])) {
    return null;
  }

  const config =
    section.config &&
    typeof section.config === "object" &&
    !Array.isArray(section.config)
      ? (section.config as Record<string, unknown>)
      : {};

  const stringValue = (key: string, fallback = "") =>
    typeof config[key] === "string" ? config[key] : fallback;

  return {
    id: section.id,
    type: section.type as Section["type"],
    visible: section.visible,
    config: {
      heading: stringValue("heading"),
      body: stringValue("body"),
      image: stringValue("image"),
      slot: stringValue("slot", "after-hero"),
      buttonText: stringValue("buttonText"),
      buttonHref: stringValue("buttonHref"),
    },
  };
}

export default async function EditPage({
  params,
}: PageProps<"/admin/pages/[id]">) {
  await requirePermission("pages:write");

  const { id } = await params;
  const db = getPrisma();

  if (!db) {
    return (
      <p className="admin-empty-state">
        Connect the database to edit pages.
      </p>
    );
  }

  const [page, posts] = await Promise.all([
    db.page.findUnique({
      where: { id },
      include: {
        sections: {
          orderBy: { position: "asc" },
        },
        seo: true,
        assignments: {
          orderBy: { position: "asc" },
        },
      },
    }),

    db.post.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
      },
      orderBy: { title: "asc" },
      take: 500,
    }),
  ]);

  if (!page) {
    notFound();
  }

  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-kicker">WEBSITE / PAGE BUILDER</p>
          <h1>Edit {page.title}</h1>
          <p>Manage page sections, SEO and assigned posts from this page.</p>
        </div>
      </div>

      <PageAssignmentsEditor
        pageId={page.id}
        pageSlug={page.slug}
        posts={posts}
        initial={page.assignments.map((assignment) => ({
          postId: assignment.postId,
          slot: assignment.slot,
          position: assignment.position,
          visible: assignment.visible,
          displayOverride:
            assignment.displayOverride &&
            typeof assignment.displayOverride === "object" &&
            !Array.isArray(assignment.displayOverride)
              ? (assignment.displayOverride as Record<string, unknown>)
              : null,
        }))}
      />

     <PageEditor
  page={{
    id: page.id,
    title: page.title,
    slug: page.slug,
    template: page.template,
    templateData:
      page.templateData &&
      typeof page.templateData === "object" &&
      !Array.isArray(page.templateData)
        ? {
            heroImage:
              typeof page.templateData.heroImage === "string"
                ? page.templateData.heroImage
                : "",
            heroTitle:
              typeof page.templateData.heroTitle === "string"
                ? page.templateData.heroTitle
                : "",
            articleHeading:
              typeof page.templateData.articleHeading === "string"
                ? page.templateData.articleHeading
                : "",
            articleText:
              typeof page.templateData.articleText === "string"
                ? page.templateData.articleText
                : "",
            articleImage:
              typeof page.templateData.articleImage === "string"
                ? page.templateData.articleImage
                : "",
            imageCaption:
              typeof page.templateData.imageCaption === "string"
                ? page.templateData.imageCaption
                : "",
            showArticle: page.templateData.showArticle !== false,
            showArticleImage:
              page.templateData.showArticleImage !== false,
          }
        : {},
    status:
      page.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
    showHeader: page.showHeader,
    showFooter: page.showFooter,
    breadcrumbs: page.breadcrumbs,
    seoTitle: page.seo?.title ?? "",
    seoDescription: page.seo?.description ?? "",
  }}
  sections={page.sections
    .map(toSection)
    .filter((item): item is Section => Boolean(item))}
/>
    </div>
  );
}