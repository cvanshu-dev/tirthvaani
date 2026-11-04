import {
  deleteRedirectAction,
  saveRedirectAction,
} from "@/app/admin/(panel)/redirects/actions";
import { DeleteRecordButton } from "@/components/admin/DeleteRecordButton";
import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
export const metadata = {
  title: "Redirect manager",
  robots: { index: false, follow: false },
};
export default async function RedirectsPage() {
  await requirePermission("seo:manage");
  const db = getPrisma();
  if (!db)
    return (
      <p className="admin-empty-state">
        Connect the database to manage redirects.
      </p>
    );
  const redirects = await db.redirect.findMany({
    orderBy: { updatedAt: "desc" },
    take: 200,
  });
  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-kicker">DISCOVERABILITY</p>
          <h1>Redirect manager</h1>
          <p>Create 301 or 302 redirects. Source paths must be site-local.</p>
        </div>
      </div>
      <section className="admin-panel admin-editor-card">
        <form action={saveRedirectAction} className="admin-menu-add">
          <label>
            <span>Source path</span>
            <input
              className="admin-input"
              name="source"
              required
              placeholder="/old-page"
            />
          </label>
          <label>
            <span>Destination path or URL</span>
            <input
              className="admin-input"
              name="target"
              required
              placeholder="/new-page"
            />
          </label>
          <label>
            <span>Redirect type</span>
            <select className="admin-input" name="status">
              <option value="MOVED_PERMANENTLY">301 · Permanent</option>
              <option value="FOUND">302 · Temporary</option>
            </select>
          </label>
          <label className="admin-check-label">
            <input type="checkbox" name="enabled" defaultChecked />
            Enabled
          </label>
          <button className="admin-primary-button" type="submit">
            Add redirect
          </button>
        </form>
        <p className="admin-help-text">
          Redirects for CMS-managed dynamic URLs are applied when no page or
          service matches. Static route redirects require a hosting-level
          redirect rule.
        </p>
        <div className="admin-taxonomy-list">
          {redirects.map((item) => (
            <div className="admin-redirect-row" key={item.id}>
              <form action={saveRedirectAction}>
                <input type="hidden" name="id" value={item.id} />
                <label>
                  <span>From</span>
                  <input
                    className="admin-input"
                    name="source"
                    defaultValue={item.source}
                    required
                  />
                </label>
                <label>
                  <span>To</span>
                  <input
                    className="admin-input"
                    name="target"
                    defaultValue={item.target}
                    required
                  />
                </label>
                <select
                  className="admin-input"
                  name="status"
                  defaultValue={item.status}
                >
                  <option value="MOVED_PERMANENTLY">301</option>
                  <option value="FOUND">302</option>
                </select>
                <label className="admin-check-label">
                  <input
                    type="checkbox"
                    name="enabled"
                    defaultChecked={item.enabled}
                  />
                  Enabled
                </label>
                <button className="admin-secondary-button" type="submit">
                  Save
                </button>
              </form>
              <DeleteRecordButton
                action={deleteRedirectAction}
                id={item.id}
                label="Delete"
                confirmation={`Delete redirect from ${item.source}?`}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
