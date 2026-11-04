"use client";

import { useRef } from "react";
import { savePostAction } from "@/app/admin/(panel)/posts/actions";
import { PageAssignmentPicker } from "@/components/admin/PageAssignmentPicker";

const tools = [
  ["H2", "\n## ", ""],
  ["H3", "\n### ", ""],
  ["Bold", "**", "**"],
  ["Italic", "_", "_"],
  ["Quote", "\n> ", ""],
  ["List", "\n- ", ""],
  ["Link", "[", "](https://)"],
] as const;

export function PostEditor({
  post,
  pages,
  categories,
  tags,
  error,
}: {
  post?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    body: string;
    status: "DRAFT" | "PUBLISHED" | "SCHEDULED" | "ARCHIVED";
    featured: boolean;
    scheduledAt: string;
    assignments: {
      pageId: string;
      slot: string;
      displayOverride?: Record<string, unknown>;
    }[];
    categoryIds: string[];
    tagIds: string[];
    seoTitle: string;
    seoDescription: string;
  };
  pages: { id: string; title: string; slug: string }[];
  categories: { id: string; name: string }[];
  tags: { id: string; name: string }[];
  error?: string;
}) {
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  function insert(before: string, after: string) {
    const textarea = bodyRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selection = textarea.value.slice(start, end) || "text";
    const updated = `${textarea.value.slice(0, start)}${before}${selection}${after}${textarea.value.slice(end)}`;
    const setter = Object.getOwnPropertyDescriptor(
      HTMLTextAreaElement.prototype,
      "value",
    )?.set;
    setter?.call(textarea, updated);
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
    textarea.focus();
    textarea.setSelectionRange(
      start + before.length,
      start + before.length + selection.length,
    );
  }

  return (
    <form action={savePostAction} className="admin-editor-layout">
      {post && <input type="hidden" name="id" value={post.id} />}
      {error && (
        <p className="admin-form-error" role="alert">
          {error}
        </p>
      )}
      <div className="admin-editor-main">
        <section className="admin-panel admin-editor-card">
          <label className="admin-field-label" htmlFor="post-title">
            Title
          </label>
          <input
            id="post-title"
            name="title"
            className="admin-input admin-title-input"
            required
            minLength={3}
            maxLength={180}
            defaultValue={post?.title}
            placeholder="Give this article a clear title"
          />
          <div className="admin-field-row">
            <label className="admin-field">
              <span>URL slug</span>
              <input
                className="admin-input"
                name="slug"
                required
                pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                defaultValue={post?.slug}
                placeholder="article-url-slug"
              />
            </label>
            <label className="admin-field">
              <span>Status</span>
              <select
                className="admin-input"
                name="status"
                defaultValue={post?.status ?? "DRAFT"}
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="SCHEDULED">Scheduled</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </label>
          </div>
          <label className="admin-field">
            <span>Excerpt</span>
            <textarea
              className="admin-input admin-small-textarea"
              name="excerpt"
              maxLength={500}
              defaultValue={post?.excerpt}
              placeholder="A short introduction for cards and search results"
            />
          </label>
        </section>

        <section className="admin-panel admin-editor-card">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-kicker">ARTICLE</p>
              <h2>Content</h2>
            </div>
            <span className="admin-muted">Markdown supported</span>
          </div>
          <div className="admin-editor-toolbar" aria-label="Formatting tools">
            {tools.map(([label, before, after]) => (
              <button
                type="button"
                key={label}
                onClick={() => insert(before, after)}
              >
                {label}
              </button>
            ))}
          </div>
          <textarea
            ref={bodyRef}
            className="admin-input admin-body-editor"
            name="body"
            required
            maxLength={100000}
            defaultValue={post?.body}
            placeholder={
              "Write your article here…\n\nUse ## for headings, **text** for bold, - for lists, and > for quotations."
            }
          />
          <p className="admin-help-text">
            Safe text and Markdown are stored as structured content. Raw HTML
            and scripts are not accepted.
          </p>
        </section>

        <section className="admin-panel admin-editor-card">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-kicker">DISPLAY & PAGE ASSIGNMENT</p>
              <h2>Show this post on pages</h2>
            </div>
          </div>
          <p className="admin-help-text">
            The post stays in one central record. Choose the pages and named
            placement slots where it should appear.
          </p>
          <PageAssignmentPicker
            pages={pages}
            initial={post?.assignments ?? []}
          />
        </section>

        <section className="admin-panel admin-editor-card">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-kicker">ORGANIZATION</p>
              <h2>Categories & tags</h2>
            </div>
          </div>
          <p className="admin-help-text">
            Select existing taxonomy terms. Manage them from Categories & tags.
          </p>
          <div className="admin-page-checkboxes">
            {categories.map((category) => (
              <label key={category.id}>
                <input
                  type="checkbox"
                  name="categories"
                  value={category.id}
                  defaultChecked={post?.categoryIds.includes(category.id)}
                />
                <span>{category.name}</span>
              </label>
            ))}
          </div>
          <div className="admin-page-checkboxes admin-tags-checkboxes">
            {tags.map((tag) => (
              <label key={tag.id}>
                <input
                  type="checkbox"
                  name="tags"
                  value={tag.id}
                  defaultChecked={post?.tagIds.includes(tag.id)}
                />
                <span>{tag.name}</span>
              </label>
            ))}
          </div>
        </section>
      </div>

      <aside className="admin-editor-aside">
        <section className="admin-panel admin-editor-card">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-kicker">PUBLISH</p>
              <h2>Visibility</h2>
            </div>
          </div>
          <label className="admin-field">
            <span>Schedule date</span>
            <input
              className="admin-input"
              type="datetime-local"
              name="scheduledAt"
              defaultValue={post?.scheduledAt}
            />
          </label>
          <label className="admin-check-label">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={post?.featured}
            />{" "}
            Feature this post
          </label>
          <button
            className="admin-primary-button admin-submit-button"
            type="submit"
          >
            Save post
          </button>
          {post && (
            <a
              className="admin-secondary-button admin-preview-link"
              href={`/journal/${post.slug}`}
              target="_blank"
              rel="noreferrer"
            >
              Preview public page
            </a>
          )}
        </section>
        <section className="admin-panel admin-editor-card">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-kicker">SEARCH</p>
              <h2>SEO details</h2>
            </div>
          </div>
          <label className="admin-field">
            <span>SEO title</span>
            <input
              className="admin-input"
              name="seoTitle"
              maxLength={180}
              defaultValue={post?.seoTitle}
              placeholder="Defaults to post title"
            />
          </label>
          <label className="admin-field">
            <span>Meta description</span>
            <textarea
              className="admin-input admin-small-textarea"
              name="seoDescription"
              maxLength={320}
              defaultValue={post?.seoDescription}
              placeholder="Describe this page in search results"
            />
          </label>
        </section>
      </aside>
    </form>
  );
}
