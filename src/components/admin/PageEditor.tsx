import { savePageAction } from "@/app/admin/(panel)/pages/actions";
import { PageSectionBuilder } from "@/components/admin/PageSectionBuilder";

type PageTemplate = "STANDARD" | "ABOUT" | "DEV_RITUALS";

type TemplateData = {
  heroImage?: string;
  heroTitle?: string;
  articleHeading?: string;
  articleText?: string;
  articleImage?: string;
  imageCaption?: string;
  showArticle?: boolean;
  showArticleImage?: boolean;
};

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

type PageEditorProps = {
  page?: {
    id: string;
    title: string;
    slug: string;
    template?: PageTemplate;
    templateData?: TemplateData | null;
    status: "DRAFT" | "PUBLISHED";
    showHeader: boolean;
    showFooter: boolean;
    breadcrumbs: boolean;
    seoTitle: string;
    seoDescription: string;
  };
  sections: Section[];
  error?: string;
};

export function PageEditor({
  page,
  sections,
  error,
}: PageEditorProps) {
  const templateData = page?.templateData ?? {};

  const isFixedTemplate =
    page?.template === "ABOUT" ||
    page?.template === "DEV_RITUALS";

  return (
    <form action={savePageAction} className="admin-page-editor">
      {page && <input type="hidden" name="id" value={page.id} />}

      {error && (
        <p className="admin-form-error" role="alert">
          {error}
        </p>
      )}

      <div className="admin-page-editor-grid">
        <div className="admin-editor-main">
          <section className="admin-panel admin-editor-card">
            <div className="admin-panel-heading">
              <div>
                <p className="admin-kicker">PAGE DETAILS</p>
                <h2>Page information</h2>
              </div>
            </div>

            <label className="admin-field">
              <span>Page title</span>
              <input
                className="admin-input admin-title-input"
                name="title"
                required
                minLength={2}
                maxLength={180}
                defaultValue={page?.title ?? ""}
                placeholder="About TirthVaani"
              />
            </label>

            <label className="admin-field">
              <span>Page template</span>
              <select
                className="admin-input"
                name="template"
                defaultValue={page?.template ?? "STANDARD"}
              >
                <option value="STANDARD">Standard page</option>
                <option value="ABOUT">About template</option>
                <option value="DEV_RITUALS">
                  Dev Rituals template
                </option>
              </select>
            </label>

            <div className="admin-field-row">
              <label className="admin-field">
                <span>URL path</span>
                <input
                  className="admin-input"
                  name="slug"
                  required
                  pattern="(?:[a-z0-9]+(-[a-z0-9]+)*(\/[a-z0-9]+(-[a-z0-9]+)*)*)?"
                  defaultValue={page?.slug ?? ""}
                  placeholder="about"
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

          {isFixedTemplate && (
            <section className="admin-panel admin-editor-card">
              <div className="admin-panel-heading">
                <div>
                  <p className="admin-kicker">FIXED TEMPLATE</p>
                  <h2>Hero and article content</h2>
                </div>
              </div>

              <label className="admin-field">
                <span>Hero image URL</span>
                <input
                  className="admin-input"
                  name="heroImage"
                  defaultValue={templateData.heroImage ?? ""}
                  placeholder="https://example.com/hero.jpg"
                />
              </label>

              <label className="admin-field">
                <span>Hero title</span>
                <input
                  className="admin-input"
                  name="heroTitle"
                  defaultValue={templateData.heroTitle ?? ""}
                  placeholder="Devakaryas in Varanasi"
                />
              </label>

              <label className="admin-field">
                <span>Article heading</span>
                <input
                  className="admin-input"
                  name="articleHeading"
                  defaultValue={templateData.articleHeading ?? ""}
                  placeholder="Traditions and sacred practices"
                />
              </label>

              <label className="admin-field">
                <span>Article text</span>
                <textarea
                  className="admin-input"
                  name="articleText"
                  rows={12}
                  defaultValue={templateData.articleText ?? ""}
                  placeholder="Write the page article here..."
                />
              </label>

              <label className="admin-field">
                <span>Article image URL</span>
                <input
                  className="admin-input"
                  name="articleImage"
                  defaultValue={templateData.articleImage ?? ""}
                  placeholder="https://example.com/article.jpg"
                />
              </label>

              <label className="admin-field">
                <span>Image caption</span>
                <input
                  className="admin-input"
                  name="imageCaption"
                  defaultValue={templateData.imageCaption ?? ""}
                  placeholder="Optional image caption"
                />
              </label>

              <div className="admin-page-flags">
                <label>
                  <input
                    type="checkbox"
                    name="showArticle"
                    defaultChecked={
                      templateData.showArticle ?? true
                    }
                  />{" "}
                  Show article
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="showArticleImage"
                    defaultChecked={
                      templateData.showArticleImage ?? true
                    }
                  />{" "}
                  Show article image
                </label>
              </div>

              <p className="admin-help-text">
                Clear any field or uncheck an option to remove that
                content from the public page.
              </p>
            </section>
          )}

          {!isFixedTemplate && (
            <section className="admin-panel admin-editor-card">
              <div className="admin-panel-heading">
                <div>
                  <p className="admin-kicker">PAGE BUILDER</p>
                  <h2>Sections</h2>
                </div>
              </div>

              <p className="admin-help-text">
                Add reusable sections and arrange them in page order.
              </p>

              <PageSectionBuilder initial={sections} />
            </section>
          )}
        </div>

        <aside className="admin-panel admin-editor-card">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-kicker">SEARCH</p>
              <h2>SEO metadata</h2>
            </div>
          </div>

          <label className="admin-field">
            <span>SEO title</span>
            <input
              className="admin-input"
              name="seoTitle"
              maxLength={180}
              defaultValue={page?.seoTitle ?? ""}
              placeholder="Defaults to page title"
            />
          </label>

          <label className="admin-field">
            <span>Meta description</span>
            <textarea
              className="admin-input admin-small-textarea"
              name="seoDescription"
              maxLength={320}
              defaultValue={page?.seoDescription ?? ""}
              placeholder="Describe this page for search engines"
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