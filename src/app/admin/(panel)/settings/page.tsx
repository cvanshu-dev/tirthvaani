import { saveSettingsAction } from "@/app/admin/(panel)/settings/actions";
import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

export const metadata = {
  title: "Website settings",
  robots: { index: false, follow: false },
};
const defaultValues: Record<string, string | boolean> = {
  siteName: "TirthVaani",
  tagline: "Where Sacred Journeys Find Their Meaning",
  phone: "",
  whatsapp: "",
  email: "",
  address: "Varanasi · Gaya · Prayagraj",
  googleMapsUrl: "",
  logoUrl: "",
  faviconUrl: "",
  socialInstagram: "",
  socialFacebook: "",
  socialYoutube: "",
  socialX: "",
  businessHours: "",
  copyright: "Created with care, for journeys that matter.",
  defaultSeoTitle: "TirthVaani — Where Sacred Journeys Find Their Meaning",
  defaultSeoDescription:
    "Thoughtful guidance for meaningful pilgrimages to Varanasi, Gaya and Prayagraj.",
  defaultSocialImage: "",
  primaryColor: "#382f24",
  accentColor: "#a58b61",
  fontFamily: "Manrope",
  maintenanceMode: false,
};
function stringValue(data: Record<string, unknown>, key: string) {
  return typeof data[key] === "string"
    ? (data[key] as string)
    : String(defaultValues[key] ?? "");
}

export default async function SettingsPage() {
  await requirePermission("settings:manage");
  const db = getPrisma();
  if (!db)
    return (
      <p className="admin-empty-state">
        Connect the database to manage website settings.
      </p>
    );
  const record = await db.globalSettings.findUnique({
    where: { id: "global" },
  });
  const data =
    record?.data &&
    typeof record.data === "object" &&
    !Array.isArray(record.data)
      ? (record.data as Record<string, unknown>)
      : {};
  const textField = (
    key: string,
    label: string,
    type = "text",
    maxLength = 300,
  ) => (
    <label className="admin-field" key={key}>
      <span>{label}</span>
      <input
        className="admin-input"
        name={key}
        type={type}
        maxLength={maxLength}
        defaultValue={stringValue(data, key)}
      />
    </label>
  );
  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-kicker">WEBSITE</p>
          <h1>Global settings</h1>
          <p>Shared contact details, branding and default metadata.</p>
        </div>
      </div>
      <form action={saveSettingsAction} className="admin-settings-form">
        <section className="admin-panel admin-editor-card">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-kicker">IDENTITY</p>
              <h2>Brand and contact</h2>
            </div>
          </div>
          <div className="admin-field-row">
            {textField("siteName", "Website name", "text", 100)}
            {textField("tagline", "Tagline", "text", 180)}
          </div>
          <div className="admin-field-row">
            {textField("phone", "Contact number", "tel", 40)}
            {textField("whatsapp", "WhatsApp number", "tel", 40)}
          </div>
          <div className="admin-field-row">
            {textField("email", "Email", "email", 254)}
            {textField("googleMapsUrl", "Google Maps URL", "url", 2048)}
          </div>
          <label className="admin-field">
            <span>Address</span>
            <textarea
              className="admin-input admin-small-textarea"
              name="address"
              maxLength={400}
              defaultValue={stringValue(data, "address")}
            />
          </label>
          {textField("businessHours", "Business hours", "text", 300)}
          {textField("copyright", "Footer line", "text", 200)}
        </section>
        <section className="admin-panel admin-editor-card">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-kicker">BRANDING</p>
              <h2>Assets and social profiles</h2>
            </div>
          </div>
          <div className="admin-field-row">
            {textField("logoUrl", "Logo path or URL", "text", 2048)}
            {textField("faviconUrl", "Favicon path or URL", "text", 2048)}
          </div>
          <div className="admin-field-row">
            {textField("socialInstagram", "Instagram URL", "url", 2048)}
            {textField("socialFacebook", "Facebook URL", "url", 2048)}
          </div>
          <div className="admin-field-row">
            {textField("socialYoutube", "YouTube URL", "url", 2048)}
            {textField("socialX", "X URL", "url", 2048)}
          </div>
          <div className="admin-field-row">
            <label className="admin-field">
              <span>Primary color</span>
              <input
                className="admin-input"
                type="color"
                name="primaryColor"
                defaultValue={stringValue(data, "primaryColor")}
              />
            </label>
            <label className="admin-field">
              <span>Accent color</span>
              <input
                className="admin-input"
                type="color"
                name="accentColor"
                defaultValue={stringValue(data, "accentColor")}
              />
            </label>
          </div>
          <label className="admin-field">
            <span>Website font</span>
            <select
              className="admin-input"
              name="fontFamily"
              defaultValue={stringValue(data, "fontFamily")}
            >
              <option>Manrope</option>
              <option>Arial</option>
              <option>Georgia</option>
            </select>
          </label>
        </section>
        <section className="admin-panel admin-editor-card">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-kicker">SEARCH</p>
              <h2>Default metadata</h2>
            </div>
          </div>
          {textField("defaultSeoTitle", "Default SEO title", "text", 180)}
          <label className="admin-field">
            <span>Default SEO description</span>
            <textarea
              className="admin-input admin-small-textarea"
              name="defaultSeoDescription"
              maxLength={320}
              defaultValue={stringValue(data, "defaultSeoDescription")}
            />
          </label>
          {textField(
            "defaultSocialImage",
            "Default social image URL",
            "text",
            2048,
          )}
          <label className="admin-check-label">
            <input
              type="checkbox"
              name="maintenanceMode"
              defaultChecked={data.maintenanceMode === true}
            />{" "}
            Maintenance mode flag
          </label>
          <p className="admin-help-text">
            Maintenance mode returns a temporary 503 page to public visitors.
            Admin pages and APIs remain available.
          </p>
          <button className="admin-primary-button" type="submit">
            Save website settings
          </button>
        </section>
      </form>
    </div>
  );
}
