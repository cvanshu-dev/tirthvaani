import { notFound } from "next/navigation";
import { saveSeoAction } from "@/app/admin/(panel)/seo/actions";
import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

export const metadata = {
  title: "Edit SEO metadata",
  robots: { index: false, follow: false },
};
export default async function EditSeoPage({
  params,
}: PageProps<"/admin/seo/[type]/[id]">) {
  await requirePermission("seo:manage");
  const { type, id } = await params;
  if (!["page", "post", "service"].includes(type)) notFound();
  const db = getPrisma();
  if (!db)
    return (
      <p className="admin-empty-state">
        Connect the database to edit SEO settings.
      </p>
    );
  const [seo, item] = await Promise.all([
    db.seoMetadata.findUnique({ where: { ownerId: id } }),
    type === "page"
      ? db.page.findUnique({
          where: { id },
          select: { title: true, slug: true },
        })
      : type === "post"
        ? db.post.findUnique({
            where: { id },
            select: { title: true, slug: true },
          })
        : db.service.findUnique({
            where: { id },
            select: { title: true, slug: true },
          }),
  ]);
  if (!item) notFound();
  const path =
    type === "page"
      ? `/${item.slug}`
      : type === "post"
        ? `/journal/${item.slug}`
        : `/services/${item.slug}`;
  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-kicker">SEARCH / {type.toUpperCase()}</p>
          <h1>SEO: {item.title}</h1>
          <p>
            Public URL:{" "}
            <a href={path} target="_blank" rel="noreferrer">
              {path}
            </a>
          </p>
        </div>
      </div>
      <form action={saveSeoAction} className="admin-panel admin-seo-editor">
        <input type="hidden" name="type" value={type} />
        <input type="hidden" name="id" value={id} />
        <label className="admin-field">
          <span>SEO title</span>
          <input
            className="admin-input"
            name="title"
            maxLength={180}
            defaultValue={seo?.title ?? ""}
          />
        </label>
        <label className="admin-field">
          <span>Meta description</span>
          <textarea
            className="admin-input admin-small-textarea"
            name="description"
            maxLength={320}
            defaultValue={seo?.description ?? ""}
          />
        </label>
        <label className="admin-field">
          <span>Canonical URL</span>
          <input
            className="admin-input"
            type="url"
            name="canonicalUrl"
            maxLength={2048}
            defaultValue={seo?.canonicalUrl ?? ""}
          />
        </label>
        <div className="admin-panel-heading">
          <div>
            <p className="admin-kicker">SOCIAL SHARING</p>
            <h2>Open Graph</h2>
          </div>
        </div>
        <label className="admin-field">
          <span>Social title</span>
          <input
            className="admin-input"
            name="openGraphTitle"
            maxLength={180}
            defaultValue={seo?.openGraphTitle ?? ""}
          />
        </label>
        <label className="admin-field">
          <span>Social description</span>
          <textarea
            className="admin-input admin-small-textarea"
            name="openGraphText"
            maxLength={320}
            defaultValue={seo?.openGraphText ?? ""}
          />
        </label>
        <label className="admin-field">
          <span>Social image URL</span>
          <input
            className="admin-input"
            name="openGraphImage"
            maxLength={2048}
            defaultValue={seo?.openGraphImage ?? ""}
          />
        </label>
        <div className="admin-page-flags">
          <label>
            <input
              type="checkbox"
              name="robotsIndex"
              defaultChecked={seo?.robotsIndex ?? true}
            />{" "}
            Index this URL
          </label>
          <label>
            <input
              type="checkbox"
              name="robotsFollow"
              defaultChecked={seo?.robotsFollow ?? true}
            />{" "}
            Follow links
          </label>
        </div>
        <button
          className="admin-primary-button admin-submit-button"
          type="submit"
        >
          Save SEO settings
        </button>
        <div className="admin-search-preview">
          <small>SEARCH PREVIEW</small>
          <strong>{seo?.title || item.title}</strong>
          <span>
            {seo?.description ||
              "Add a concise description to preview how this page may appear in search."}
          </span>
          <em>
            {process.env.NEXT_PUBLIC_SITE_URL || "https://tirthvaani.com"}
            {path}
          </em>
        </div>
      </form>
    </div>
  );
}
