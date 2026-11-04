import {
  createTaxonomyAction,
  deleteTaxonomyAction,
} from "@/app/admin/(panel)/taxonomy/actions";
import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

export const metadata = {
  title: "Categories and tags",
  robots: { index: false, follow: false },
};

export default async function TaxonomyPage() {
  await requirePermission("posts:read");
  const db = getPrisma();
  if (!db)
    return (
      <p className="admin-empty-state">
        Connect the database to manage categories and tags.
      </p>
    );
  const [categories, tags] = await Promise.all([
    db.category.findMany({
      include: {
        parent: { select: { name: true } },
        _count: { select: { posts: true } },
      },
      orderBy: { name: "asc" },
    }),
    db.tag.findMany({
      include: { _count: { select: { posts: true } } },
      orderBy: { name: "asc" },
    }),
  ]);
  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-kicker">EDITORIAL</p>
          <h1>Categories & tags</h1>
          <p>Organize articles with reusable taxonomies.</p>
        </div>
      </div>
      <div className="admin-taxonomy-grid">
        <section className="admin-panel admin-editor-card">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-kicker">TAXONOMY</p>
              <h2>Categories</h2>
            </div>
          </div>
          <form action={createTaxonomyAction} className="admin-taxonomy-form">
            <input type="hidden" name="type" value="category" />
            <label className="admin-field">
              <span>Name</span>
              <input
                className="admin-input"
                name="name"
                required
                maxLength={80}
              />
            </label>
            <label className="admin-field">
              <span>Slug (optional)</span>
              <input className="admin-input" name="slug" maxLength={100} />
            </label>
            <label className="admin-field">
              <span>Parent category</span>
              <select className="admin-input" name="parentId">
                <option value="">No parent</option>
                {categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="admin-field">
              <span>Description</span>
              <textarea
                className="admin-input admin-small-textarea"
                name="description"
                maxLength={500}
              />
            </label>
            <button className="admin-primary-button" type="submit">
              Add category
            </button>
          </form>
          <div className="admin-taxonomy-list">
            {categories.map((category) => (
              <div className="admin-taxonomy-row" key={category.id}>
                <span>
                  <strong>{category.name}</strong>
                  <small>
                    {category.parent
                      ? `Child of ${category.parent.name} · `
                      : ""}
                    {category._count.posts} posts · /{category.slug}
                  </small>
                </span>
                <form action={deleteTaxonomyAction}>
                  <input type="hidden" name="type" value="category" />
                  <input type="hidden" name="id" value={category.id} />
                  <button
                    aria-label={`Delete ${category.name}`}
                    className="admin-delete-text"
                  >
                    Delete
                  </button>
                </form>
              </div>
            ))}
          </div>
        </section>
        <section className="admin-panel admin-editor-card">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-kicker">TAXONOMY</p>
              <h2>Tags</h2>
            </div>
          </div>
          <form action={createTaxonomyAction} className="admin-taxonomy-form">
            <input type="hidden" name="type" value="tag" />
            <label className="admin-field">
              <span>Name</span>
              <input
                className="admin-input"
                name="name"
                required
                maxLength={80}
              />
            </label>
            <label className="admin-field">
              <span>Slug (optional)</span>
              <input className="admin-input" name="slug" maxLength={100} />
            </label>
            <button className="admin-primary-button" type="submit">
              Add tag
            </button>
          </form>
          <div className="admin-taxonomy-list">
            {tags.map((tag) => (
              <div className="admin-taxonomy-row" key={tag.id}>
                <span>
                  <strong>{tag.name}</strong>
                  <small>
                    {tag._count.posts} posts · /{tag.slug}
                  </small>
                </span>
                <form action={deleteTaxonomyAction}>
                  <input type="hidden" name="type" value="tag" />
                  <input type="hidden" name="id" value={tag.id} />
                  <button
                    aria-label={`Delete ${tag.name}`}
                    className="admin-delete-text"
                  >
                    Delete
                  </button>
                </form>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
