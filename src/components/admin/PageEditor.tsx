import { savePageAction } from "@/app/admin/(panel)/pages/actions";
import { PageSectionBuilder } from "@/components/admin/PageSectionBuilder";

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

export function PageEditor({
  page,
  sections,
  error,
}: {
  page?: {
    id: string;
    title: string;
    slug: string;
    status: "DRAFT" | "PUBLISHED";
    showHeader: boolean;
    showFooter: boolean;
    breadcrumbs: boolean;
    seoTitle: string;
    seoDescription: string;
  };
  sections: Section[];
  error?: string;
}) {
  return (
    <form action={savePageAction} className="admin-page-editor">
      {page && <input type="hidden" name="id" value={page.id} />}
      {error && <p className="admin-form-error">{error}</p>}
      <div className="admin-page-editor-grid">
        <div className="admin-editor-main">
          <section className="admin-panel admin-editor-card">
            <label className="admin-field-label" htmlFor="page-title">
              Page title
            </label>
            <input
              className="admin-input admin-title-input"
              id="page-title"
              name="title"
              required
              minLength={2}
              maxLength={180}
              defaultValue={page?.title}
            />
            <div className="admin-field-row">
              <label className="admin-field">
                <span>URL path (without leading slash)</span>
                <input
                  className="admin-input"
                  name="slug"
                  pattern="(?:[a-z0-9]+(-[a-z0-9]+)*(\/[a-z0-9]+(-[a-z0-9]+)*)*)?"
                  defaultValue={page?.slug}
                  placeholder="about-our-rituals"
                />
              </label>
              <label className="admin-field">
                <span>Status</span>
                <select
                  className="admin-input"
                  name="status"
                  defaultValue={page?.status ?? "DRAFT"}
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                </select>
              </label>
            </div>
            <div className="admin-page-flags">
              <label>
                <input
                  type="checkbox"
                  name="showHeader"
                  defaultChecked={page?.showHeader ?? true}
                />{" "}
                Show header
              </label>
              <label>
                <input
                  type="checkbox"
                  name="showFooter"
                  defaultChecked={page?.showFooter ?? true}
                />{" "}
                Show footer
              </label>
              <label>
                <input
                  type="checkbox"
                  name="breadcrumbs"
                  defaultChecked={page?.breadcrumbs ?? true}
                />{" "}
                Show breadcrumbs
              </label>
            </div>
          </section>
          <section className="admin-panel admin-editor-card">
            <div className="admin-panel-heading">
              <div>
                <p className="admin-kicker">PAGE BUILDER</p>
                <h2>Sections</h2>
              </div>
            </div>
            <p className="admin-help-text">
              Add reusable sections and arrange them in page order. Content is
              rendered from safe, predefined components.
            </p>
            <PageSectionBuilder initial={sections} />
          </section>
        </div>
        <aside className="admin-panel admin-editor-card">
          <p className="admin-kicker">SEARCH</p>
          <h2>SEO metadata</h2>
          <label className="admin-field">
            <span>SEO title</span>
            <input
              className="admin-input"
              name="seoTitle"
              defaultValue={page?.seoTitle}
              maxLength={180}
            />
          </label>
          <label className="admin-field">
            <span>Meta description</span>
            <textarea
              className="admin-input admin-small-textarea"
              name="seoDescription"
              defaultValue={page?.seoDescription}
              maxLength={320}
            />
          </label>
          <button
            className="admin-primary-button admin-submit-button"
            type="submit"
          >
            Save page
          </button>
          {page && (
            <a
              className="admin-secondary-button admin-preview-link"
              href={`/${page.slug}`}
              target="_blank"
              rel="noreferrer"
            >
              Preview public page
            </a>
          )}
        </aside>
      </div>
    </form>
  );
}
