"use client";

import { useMemo, useState } from "react";
import { savePostAction } from "@/app/admin/(panel)/posts/actions";
import { PageAssignmentPicker } from "@/components/admin/PageAssignmentPicker";

type EditorPost = {
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

type FixedPostContent = {
  format: "fixed-post-v1";
  introHeading: string;
  introText: string;
  introImage: {
    url: string;
    alt: string;
    caption: string;
  };
  body: string;
};

function emptyContent(): FixedPostContent {
  return {
    format: "fixed-post-v1",
    introHeading: "",
    introText: "",
    introImage: {
      url: "",
      alt: "",
      caption: "",
    },
    body: "",
  };
}

function parseContent(value?: string): FixedPostContent {
  if (!value?.trim()) return emptyContent();

  try {
    const parsed = JSON.parse(value);

    if (parsed?.format === "fixed-post-v1") {
      return {
        format: "fixed-post-v1",
        introHeading:
          typeof parsed.introHeading === "string" ? parsed.introHeading : "",
        introText: typeof parsed.introText === "string" ? parsed.introText : "",
        introImage: {
          url:
            typeof parsed.introImage?.url === "string"
              ? parsed.introImage.url
              : "",
          alt:
            typeof parsed.introImage?.alt === "string"
              ? parsed.introImage.alt
              : "",
          caption:
            typeof parsed.introImage?.caption === "string"
              ? parsed.introImage.caption
              : "",
        },
        body: typeof parsed.body === "string" ? parsed.body : "",
      };
    }

    if (parsed?.format === "blocks-v1" && Array.isArray(parsed.blocks)) {
      const firstImage = parsed.blocks.find(
        (block: { type?: string }) => block.type === "image",
      );
      const paragraphs = parsed.blocks
        .filter(
          (block: { type?: string; text?: string }) =>
            block.type === "paragraph" && typeof block.text === "string",
        )
        .map((block: { text?: string }) => block.text ?? "");

      return {
        format: "fixed-post-v1",
        introHeading:
          parsed.blocks.find(
            (block: { type?: string; text?: string }) =>
              block.type === "heading" && typeof block.text === "string",
          )?.text ?? "",
        introText: paragraphs.slice(0, 2).join("\n\n"),
        introImage: {
          url: firstImage?.url ?? "",
          alt: firstImage?.alt ?? "",
          caption: firstImage?.caption ?? "",
        },
        body: paragraphs.slice(2).join("\n\n"),
      };
    }
  } catch {
    return {
      ...emptyContent(),
      body: value,
    };
  }

  return {
    ...emptyContent(),
    body: value,
  };
}

export function PostEditor({
  post,
  pages,
  categories,
  tags,
  error,
}: {
  post?: EditorPost;
  pages: { id: string; title: string; slug: string }[];
  categories: { id: string; name: string }[];
  tags: { id: string; name: string }[];
  error?: string;
}) {
  const initialContent = useMemo(
    () => parseContent(post?.body),
    [post?.body],
  );

  const [introHeading, setIntroHeading] = useState(
    initialContent.introHeading,
  );
  const [introText, setIntroText] = useState(initialContent.introText);
  const [imageUrl, setImageUrl] = useState(initialContent.introImage.url);
  const [imageAlt, setImageAlt] = useState(initialContent.introImage.alt);
  const [imageCaption, setImageCaption] = useState(
    initialContent.introImage.caption,
  );
  const [body, setBody] = useState(initialContent.body);

  const serializedContent = JSON.stringify({
    format: "fixed-post-v1",
    introHeading,
    introText,
    introImage: {
      url: imageUrl,
      alt: imageAlt,
      caption: imageCaption,
    },
    body,
  } satisfies FixedPostContent);

  return (
    <form action={savePostAction} className="admin-editor-layout">
      {post && <input type="hidden" name="id" value={post.id} />}

      <input type="hidden" name="body" value={serializedContent} />

      {error && (
        <p className="admin-form-error" role="alert">
          {error}
        </p>
      )}

      <div className="admin-editor-main">
        <section className="admin-panel admin-editor-card">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-kicker">POST DETAILS</p>
              <h2>Article information</h2>
            </div>
          </div>

          <label className="admin-field">
            <span>Post title</span>
            <input
              className="admin-input admin-title-input"
              name="title"
              required
              minLength={3}
              maxLength={180}
              defaultValue={post?.title}
              placeholder="Pitrukaryas in Varanasi"
            />
          </label>

          <div className="admin-field-row">
            <label className="admin-field">
              <span>URL slug</span>
              <input
                className="admin-input"
                name="slug"
                required
                pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                defaultValue={post?.slug}
                placeholder="pitrukaryas-in-varanasi"
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
              placeholder="Short description shown on cards and search results"
            />
          </label>
        </section>

        <section className="admin-panel admin-editor-card fixed-post-editor">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-kicker">FIXED ARTICLE TEMPLATE</p>
              <h2>Design your article</h2>
            </div>
            <span className="admin-muted">
              Every post uses the same public layout
            </span>
          </div>

          <label className="admin-field">
            <span>Intro heading</span>
            <input
              className="admin-input"
              value={introHeading}
              onChange={(event) => setIntroHeading(event.target.value)}
              placeholder="Pitru Karya in Kashi: a guide to remembrance"
            />
          </label>

          <label className="admin-field">
            <span>Intro paragraphs</span>
            <textarea
              className="admin-input fixed-post-intro-editor"
              value={introText}
              onChange={(event) => setIntroText(event.target.value)}
              placeholder="Write the introduction. Leave one blank line between paragraphs."
              rows={8}
            />
          </label>

          <div className="fixed-post-image-fields">
            <div>
              <p className="admin-kicker">INTRO IMAGE</p>
              <h3>Image displayed beside the introduction</h3>
            </div>

            <label className="admin-field">
              <span>Image URL</span>
              <input
                className="admin-input"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </label>

            {imageUrl && (
              <img
                className="fixed-post-image-preview"
                src={imageUrl}
                alt={imageAlt || "Article introduction"}
              />
            )}

            <label className="admin-field">
              <span>Image alt text</span>
              <input
                className="admin-input"
                value={imageAlt}
                onChange={(event) => setImageAlt(event.target.value)}
                placeholder="Describe the image"
              />
            </label>

            <label className="admin-field">
              <span>Image caption</span>
              <input
                className="admin-input"
                value={imageCaption}
                onChange={(event) => setImageCaption(event.target.value)}
                placeholder="Optional image caption"
              />
            </label>
          </div>

          <label className="admin-field">
            <span>Article content</span>
            <textarea
              className="admin-input fixed-post-body-editor"
              value={body}
              onChange={(event) => setBody(event.target.value)}
              placeholder={`## Why do families perform Pitru Karya in Varanasi?

Write your article paragraphs here.

## Common ancestral observances

Use Markdown headings with ## and separate paragraphs with a blank line.`}
              rows={24}
            />
          </label>

          <p className="admin-help-text">
            The public page automatically applies the fixed design: centered
            title, divider, image beside the introduction, and full-width
            article content below.
          </p>
        </section>

        <section className="admin-panel admin-editor-card">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-kicker">DISPLAY</p>
              <h2>Show this post on pages</h2>
            </div>
          </div>

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