import { saveFaqAction } from "@/app/admin/(panel)/faqs/actions";

type FaqFormData = {
  id: string;
  question: string;
  answer: string;
  category: string;
  visible: boolean;
  position: number;
  pageIds: string[];
  serviceIds: string[];
};
export function FaqEditor({
  faq,
  pages,
  services,
}: {
  faq?: FaqFormData;
  pages: { id: string; title: string }[];
  services: { id: string; title: string }[];
}) {
  return (
    <form
      action={saveFaqAction}
      className="admin-panel admin-editor-card admin-faq-editor"
    >
      {faq && <input type="hidden" name="id" value={faq.id} />}
      <label className="admin-field">
        <span>Question</span>
        <input
          className="admin-input"
          name="question"
          required
          minLength={5}
          maxLength={300}
          defaultValue={faq?.question}
        />
      </label>
      <label className="admin-field">
        <span>Answer</span>
        <textarea
          className="admin-input admin-body-editor"
          name="answer"
          required
          maxLength={10000}
          defaultValue={faq?.answer}
        />
      </label>
      <div className="admin-field-row">
        <label className="admin-field">
          <span>Category</span>
          <input
            className="admin-input"
            name="category"
            maxLength={100}
            defaultValue={faq?.category}
          />
        </label>
        <label className="admin-field">
          <span>Display order</span>
          <input
            className="admin-input"
            type="number"
            min={0}
            max={10000}
            name="position"
            defaultValue={faq?.position ?? 0}
          />
        </label>
      </div>
      <label className="admin-check-label">
        <input
          type="checkbox"
          name="visible"
          defaultChecked={faq?.visible ?? true}
        />{" "}
        Visible on public pages
      </label>
      <div className="admin-taxonomy-grid">
        <div>
          <h3>Assign to pages</h3>
          <div className="admin-page-checkboxes">
            {pages.map((page) => (
              <label key={page.id}>
                <input
                  type="checkbox"
                  name="pageIds"
                  value={page.id}
                  defaultChecked={faq?.pageIds.includes(page.id)}
                />
                <span>{page.title}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3>Assign to services</h3>
          <div className="admin-page-checkboxes">
            {services.map((service) => (
              <label key={service.id}>
                <input
                  type="checkbox"
                  name="serviceIds"
                  value={service.id}
                  defaultChecked={faq?.serviceIds.includes(service.id)}
                />
                <span>{service.title}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <button
        className="admin-primary-button admin-submit-button"
        type="submit"
      >
        Save FAQ
      </button>
    </form>
  );
}
