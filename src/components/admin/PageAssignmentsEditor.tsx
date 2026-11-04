"use client";

import { useState } from "react";
import { savePageAssignmentsAction } from "@/app/admin/(panel)/pages/actions";

const slots = [
  "top-of-page",
  "after-hero",
  "before-services",
  "after-services",
  "between-sections",
  "before-testimonials",
  "before-footer",
];

type Assignment = {
  postId: string;
  slot: string;
  position: number;
  visible: boolean;
  displayOverride?: Record<string, unknown> | null;
};

export function PageAssignmentsEditor({
  pageId,
  pageSlug,
  posts,
  initial,
}: {
  pageId: string;
  pageSlug: string;
  posts: { id: string; title: string; slug: string; status: string }[];
  initial: Assignment[];
}) {
  const [assignments, setAssignments] = useState(initial);
  const selected = new Map(assignments.map((item) => [item.postId, item]));

  function toggle(postId: string, checked: boolean) {
    setAssignments((current) => {
      if (checked) {
        if (current.some((item) => item.postId === postId)) return current;
        return [
          ...current,
          {
            postId,
            slot: "after-hero",
            position: current.length,
            visible: true,
            displayOverride: {
              heading: "",
              description: "",
              cardStyle: "editorial",
              limit: 6,
              sort: "manual",
              showImage: true,
              showCategory: true,
              showDate: true,
              showAuthor: false,
              ctaText: "",
              ctaHref: "",
            },
          },
        ];
      }
      return current.filter((item) => item.postId !== postId);
    });
  }

  function update(postId: string, values: Partial<Assignment>) {
    setAssignments((current) =>
      current.map((item) =>
        item.postId === postId ? { ...item, ...values } : item,
      ),
    );
  }

  function move(index: number, amount: -1 | 1) {
    setAssignments((current) => {
      const nextIndex = index + amount;
      if (nextIndex < 0 || nextIndex >= current.length) return current;
      const next = [...current];
      [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
      return next.map((item, position) => ({ ...item, position }));
    });
  }

  return (
    <section className="admin-panel admin-editor-card admin-page-assignments">
      <div className="admin-panel-heading">
        <div>
          <p className="admin-kicker">PAGE CONTENT</p>
          <h2>Assigned posts</h2>
        </div>
        <a
          className="admin-secondary-button"
          href={pageSlug ? `/${pageSlug}` : "/"}
          target="_blank"
          rel="noreferrer"
        >
          Preview page
        </a>
      </div>
      <p className="admin-help-text">
        Add or remove central posts, choose a position on this page, and order
        them. Use the post editor for per-placement display settings.
      </p>
      <form action={savePageAssignmentsAction}>
        <input type="hidden" name="pageId" value={pageId} />
        <input
          type="hidden"
          name="assignments"
          value={JSON.stringify(assignments)}
        />
        <div className="admin-post-assignment-options">
          {posts.map((post) => {
            const item = selected.get(post.id);
            const index = assignments.findIndex(
              (entry) => entry.postId === post.id,
            );
            return (
              <div
                className={`admin-post-assignment-row ${item ? "is-selected" : ""}`}
                key={post.id}
              >
                <label className="admin-post-assignment-title">
                  <input
                    type="checkbox"
                    checked={Boolean(item)}
                    onChange={(event) => toggle(post.id, event.target.checked)}
                  />
                  <span>
                    {post.title}
                    <small>
                      {post.status.toLowerCase()} · /journal/{post.slug}
                    </small>
                  </span>
                </label>
                {item && (
                  <div className="admin-post-assignment-controls">
                    <select
                      aria-label={`Placement for ${post.title}`}
                      value={item.slot}
                      onChange={(event) =>
                        update(post.id, { slot: event.target.value })
                      }
                    >
                      {slots.map((slot) => (
                        <option value={slot} key={slot}>
                          {slot.replaceAll("-", " ")}
                        </option>
                      ))}
                      {!slots.includes(item.slot) && (
                        <option value={item.slot}>{item.slot}</option>
                      )}
                    </select>
                    <label className="admin-assignment-visible">
                      <input
                        type="checkbox"
                        checked={item.visible}
                        onChange={(event) =>
                          update(post.id, { visible: event.target.checked })
                        }
                      />
                      Visible
                    </label>
                    <button
                      className="admin-icon-action"
                      type="button"
                      aria-label={`Move ${post.title} up`}
                      disabled={index === 0}
                      onClick={() => move(index, -1)}
                    >
                      ↑
                    </button>
                    <button
                      className="admin-icon-action"
                      type="button"
                      aria-label={`Move ${post.title} down`}
                      disabled={index === assignments.length - 1}
                      onClick={() => move(index, 1)}
                    >
                      ↓
                    </button>
                    <a
                      className="admin-row-action"
                      href={`/admin/posts/${post.id}`}
                    >
                      Edit display
                    </a>
                  </div>
                )}
              </div>
            );
          })}
          {posts.length === 0 && (
            <p className="admin-empty-state">
              Create a post before adding content to this page.
            </p>
          )}
        </div>
        <button className="admin-primary-button" type="submit">
          Save page placements
        </button>
      </form>
    </section>
  );
}
