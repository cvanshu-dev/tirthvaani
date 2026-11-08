"use client";

import { useState } from "react";
import { savePostAction } from "@/app/admin/(panel)/posts/actions";
import { PageAssignmentPicker } from "@/components/admin/PageAssignmentPicker";

type EditorPost = {
  id: string;
  title: string;
  slug: string;
  template: PageTemplate;
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
  if (!value?.trim()) {
    return emptyContent();
  }

  try {
    const parsed: unknown = JSON.parse(value);

    if (
      parsed &&
      typeof parsed === "object" &&
      !Array.isArray(parsed) &&
      "format" in parsed &&
      parsed.format === "fixed-post-v1"
    ) {
      const content = parsed as Record<string, unknown>;
      const image =
        content.introImage &&
        typeof content.introImage === "object" &&
        !Array.isArray(content.introImage)
          ? (content.introImage as Record<string, unknown>)
          : {};

      return {
        format: "fixed-post-v1",
        introHeading:
          typeof content.introHeading === "string"
            ? content.introHeading
            : "",
        introText:
          typeof content.introText === "string" ? content.introText : "",
        introImage: {
          url: typeof image.url === "string" ? image.url : "",
          alt: typeof image.alt === "string" ? image.alt : "",
          caption: typeof image.caption === "string" ? image.caption : "",
        },
        body: typeof content.body === "string" ? content.body : "",
      };
    }

    if (
      parsed &&
      typeof parsed === "object" &&
      !Array.isArray(parsed) &&
      "format" in parsed &&
      parsed.format === "blocks-v1" &&
      "blocks" in parsed &&
      Array.isArray(parsed.blocks)
    ) {
      const blocks = parsed.blocks as Array<Record<string, unknown>>;
      const image = blocks.find((block) => block.type === "image");
      const paragraphText = blocks
        .filter(
          (block) =>
            block.type === "paragraph" && typeof block.text === "string",
        )
        .map((block) => String(block.text))
        .join("\n\n");

      return {
        format: "fixed-post-v1",
        introHeading: "",
        introText: paragraphText,
        introImage: {
          url: typeof image?.url === "string" ? image.url : "",
          alt: typeof image?.alt === "string" ? image.alt : "",
          caption: typeof image?.caption === "string" ? image.caption : "",
        },
        body: "",
      };
    }
  } catch {
    return {
      ...emptyContent(),
      introText: value,
    };
  }

  return {
    ...emptyContent(),
    introText: value,
  };
}

type PageTemplate = "STANDARD" | "ABOUT" | "DEV_RITUALS";

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
  const initialContent = parseContent(post?.body);

  const [paragraph, setParagraph] = useState(
    [initialContent.introText, initialContent.body]
      .filter(Boolean)
      .join("\n\n"),
  );
  const [imageUrl, setImageUrl] = useState(initialContent.introImage.url);
  const [imageAlt, setImageAlt] = useState(initialContent.introImage.alt);
  const [imageCaption, setImageCaption] = useState(
    initialContent.introImage.caption,
  );

  const serializedContent: FixedPostContent = {
    format: "fixed-post-v1",
    introHeading: "",
    introText: paragraph,
    introImage: {
      url: imageUrl,
      alt: imageAlt,
      caption: imageCaption,
    },
    body: "",
  };

  return (
    <form action={savePostAction} className="admin-editor-layout">
      {post && <input type="hidden" name="id" value={post.id} />}

      <input
        type="hidden"
        name="body"
        value={JSON.stringify(serializedContent)}
      />

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
              <p className="admin-kicker">POST TEMPLATE</p>
              <h2>Image and paragraph</h2>
            </div>

            <span className="admin-muted">
              Every post uses the same design
            </span>
          </div>

          <div className="fixed-post-image-fields">
            <label className="admin-field">
              <span>Image URL</span>
              <input
                className="admin-input"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                placeholder="/pitru-rituals.webp"
              />
            </label>

            {imageUrl && (
              <img
                className="fixed-post-image-preview"
                src={imageUrl}
                alt={imageAlt || "Post image"}
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
                placeholder="Optional caption"
              />
            </label>
          </div>

          <label className="admin-field">
            <span>Post paragraph</span>
            <textarea
              className="admin-input fixed-post-body-editor"
              value={paragraph}
              onChange={(event) => setParagraph(event.target.value)}
              placeholder="Write the complete post paragraph here..."
              rows={18}
              required
            />
          </label>

          <p className="admin-help-text">
            The image automatically appears beside the paragraph and the text
            continues below the image.
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