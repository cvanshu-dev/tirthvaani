import { saveTestimonialAction } from "@/app/admin/(panel)/testimonials/actions";
type TestimonialForm = {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number | null;
  imageUrl: string;
  featured: boolean;
  visible: boolean;
  position: number;
};
export function TestimonialEditor({ item }: { item?: TestimonialForm }) {
  return (
    <form
      action={saveTestimonialAction}
      className="admin-panel admin-editor-card admin-faq-editor"
    >
      {item && <input type="hidden" name="id" value={item.id} />}
      <div className="admin-field-row">
        <label className="admin-field">
          <span>Customer name</span>
          <input
            className="admin-input"
            name="name"
            required
            minLength={2}
            maxLength={120}
            defaultValue={item?.name}
          />
        </label>
        <label className="admin-field">
          <span>Location</span>
          <input
            className="admin-input"
            name="location"
            maxLength={120}
            defaultValue={item?.location}
          />
        </label>
      </div>
      <label className="admin-field">
        <span>Testimonial</span>
        <textarea
          className="admin-input admin-body-editor"
          name="quote"
          required
          minLength={10}
          maxLength={3000}
          defaultValue={item?.quote}
        />
      </label>
      <div className="admin-field-row">
        <label className="admin-field">
          <span>Rating (optional)</span>
          <select
            className="admin-input"
            name="rating"
            defaultValue={item?.rating ?? ""}
          >
            <option value="">No rating</option>
            {[5, 4, 3, 2, 1].map((v) => (
              <option value={v} key={v}>
                {v} / 5
              </option>
            ))}
          </select>
        </label>
        <label className="admin-field">
          <span>Display order</span>
          <input
            className="admin-input"
            type="number"
            min={0}
            name="position"
            defaultValue={item?.position ?? 0}
          />
        </label>
      </div>
      <label className="admin-field">
        <span>Image URL (optional)</span>
        <input
          className="admin-input"
          name="imageUrl"
          maxLength={2048}
          defaultValue={item?.imageUrl}
        />
      </label>
      <div className="admin-page-flags">
        <label>
          <input
            type="checkbox"
            name="visible"
            defaultChecked={item?.visible ?? true}
          />{" "}
          Visible
        </label>
        <label>
          <input
            type="checkbox"
            name="featured"
            defaultChecked={item?.featured ?? false}
          />{" "}
          Featured
        </label>
      </div>
      <button
        className="admin-primary-button admin-submit-button"
        type="submit"
      >
        Save testimonial
      </button>
    </form>
  );
}
