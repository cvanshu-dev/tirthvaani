import { saveServiceAction } from "@/app/admin/(panel)/services/actions";

type ServiceRecord = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  body: string;
  status: "DRAFT" | "PUBLISHED";
  durationMinutes: number | null;
  location: string;
  bookingCta: string;
  seoTitle: string;
  seoDescription: string;
};

export function ServiceEditor({
  service,
  error,
}: {
  service?: ServiceRecord;
  error?: string;
}) {
  return (
    <form action={saveServiceAction} className="admin-editor-layout">
      {service && <input type="hidden" name="id" value={service.id} />}
      {error && <p className="admin-form-error">{error}</p>}
      <div className="admin-editor-main">
        <section className="admin-panel admin-editor-card">
          <label className="admin-field-label" htmlFor="service-title">
            Service name
          </label>
          <input
            className="admin-input admin-title-input"
            id="service-title"
            name="title"
            required
            minLength={2}
            maxLength={160}
            defaultValue={service?.title}
          />
          <div className="admin-field-row">
            <label className="admin-field">
              <span>URL slug</span>
              <input
                className="admin-input"
                name="slug"
                required
                pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                defaultValue={service?.slug}
              />
            </label>
            <label className="admin-field">
              <span>Status</span>
              <select
                className="admin-input"
                name="status"
                defaultValue={service?.status ?? "DRAFT"}
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </label>
          </div>
          <label className="admin-field">
            <span>Short description</span>
            <textarea
              className="admin-input admin-small-textarea"
              name="summary"
              maxLength={500}
              defaultValue={service?.summary}
            />
          </label>
          <label className="admin-field">
            <span>Detailed description (Markdown supported)</span>
            <textarea
              className="admin-input admin-body-editor"
              name="body"
              required
              defaultValue={service?.body}
            />
          </label>
        </section>
        <section className="admin-panel admin-editor-card">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-kicker">RITUAL INFORMATION</p>
              <h2>Service details</h2>
            </div>
          </div>
          <div className="admin-field-row">
            <label className="admin-field">
              <span>Duration (minutes)</span>
              <input
                className="admin-input"
                name="durationMinutes"
                type="number"
                min={1}
                max={10080}
                defaultValue={service?.durationMinutes ?? ""}
              />
            </label>
            <label className="admin-field">
              <span>Location</span>
              <input
                className="admin-input"
                name="location"
                maxLength={160}
                defaultValue={service?.location}
              />
            </label>
          </div>
          <label className="admin-field">
            <span>Booking CTA URL</span>
            <input
              className="admin-input"
              name="bookingCta"
              maxLength={300}
              defaultValue={service?.bookingCta}
              placeholder="/contact"
            />
          </label>
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
            maxLength={180}
            defaultValue={service?.seoTitle}
          />
        </label>
        <label className="admin-field">
          <span>Meta description</span>
          <textarea
            className="admin-input admin-small-textarea"
            name="seoDescription"
            maxLength={320}
            defaultValue={service?.seoDescription}
          />
        </label>
        <button
          className="admin-primary-button admin-submit-button"
          type="submit"
        >
          Save service
        </button>
        {service && (
          <a
            className="admin-secondary-button admin-preview-link"
            href={`/services/${service.slug}`}
            target="_blank"
            rel="noreferrer"
          >
            Preview public page
          </a>
        )}
      </aside>
    </form>
  );
}
