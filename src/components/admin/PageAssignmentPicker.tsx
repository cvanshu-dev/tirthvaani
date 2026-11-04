"use client";

import { useState } from "react";

const placements = [
  ["top-of-page", "Top of page"],
  ["after-hero", "After hero"],
  ["before-services", "Before services"],
  ["after-services", "After services"],
  ["between-sections", "Between sections"],
  ["before-testimonials", "Before testimonials"],
  ["before-footer", "Before footer"],
] as const;

export function PageAssignmentPicker({
  pages,
  initial,
}: {
  pages: { id: string; title: string; slug: string }[];
  initial: {
    pageId: string;
    slot: string;
    displayOverride?: Record<string, unknown>;
  }[];
}) {
  type Assignment = {
    slot: string;
    heading: string;
    description: string;
    cardStyle: "editorial" | "compact";
    limit: number;
    sort: "manual" | "newest" | "oldest";
    showImage: boolean;
    showCategory: boolean;
    showDate: boolean;
    showAuthor: boolean;
    ctaText: string;
    ctaHref: string;
  };
  const defaults = (): Assignment => ({
    slot: "after-hero",
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
  });
  const [selected, setSelected] = useState<Record<string, Assignment>>(
    Object.fromEntries(
      initial.map((item) => {
        const override = item.displayOverride ?? {};
        return [
          item.pageId,
          {
            ...defaults(),
            slot: item.slot,
            ...Object.fromEntries(
              Object.entries(override).filter(([key]) => key in defaults()),
            ),
          },
        ];
      }),
    ),
  );
  const assignmentConfig = Object.entries(selected).map(
    ([pageId, options], position) => ({
      pageId,
      slot: options.slot,
      position,
      displayOverride: options,
    }),
  );
  function update(
    pageId: string,
    key: keyof Assignment,
    value: string | number | boolean,
  ) {
    setSelected((current) => ({
      ...current,
      [pageId]: { ...current[pageId], [key]: value },
    }));
  }
  return (
    <>
      <input
        type="hidden"
        name="assignmentConfig"
        value={JSON.stringify(assignmentConfig)}
      />
      <div className="admin-assignment-list">
        {pages.map((page) => {
          const checked = page.id in selected;
          return (
            <div
              className={`admin-assignment-row ${checked ? "is-selected" : ""}`}
              key={page.id}
            >
              <label>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(event) =>
                    setSelected((current) => {
                      const next = { ...current };
                      if (event.target.checked) next[page.id] = defaults();
                      else delete next[page.id];
                      return next;
                    })
                  }
                />
                <span>
                  {page.title}
                  <small>/{page.slug}</small>
                </span>
              </label>
              {checked && (
                <div className="admin-assignment-controls">
                  <select
                    aria-label={`Placement on ${page.title}`}
                    value={selected[page.id].slot}
                    onChange={(event) =>
                      update(page.id, "slot", event.target.value)
                    }
                  >
                    {placements.map(([value, label]) => (
                      <option value={value} key={value}>
                        {label}
                      </option>
                    ))}
                    {!placements.some(
                      ([value]) => value === selected[page.id].slot,
                    ) && (
                      <option value={selected[page.id].slot}>
                        {selected[page.id].slot}
                      </option>
                    )}
                  </select>
                  <details>
                    <summary>Display settings</summary>
                    <label>
                      Heading
                      <input
                        value={selected[page.id].heading}
                        onChange={(event) =>
                          update(page.id, "heading", event.target.value)
                        }
                        maxLength={120}
                      />
                    </label>
                    <label>
                      Description
                      <input
                        value={selected[page.id].description}
                        onChange={(event) =>
                          update(page.id, "description", event.target.value)
                        }
                        maxLength={300}
                      />
                    </label>
                    <div className="admin-assignment-options">
                      <label>
                        Style
                        <select
                          value={selected[page.id].cardStyle}
                          onChange={(event) =>
                            update(page.id, "cardStyle", event.target.value)
                          }
                        >
                          <option value="editorial">Editorial</option>
                          <option value="compact">Compact</option>
                        </select>
                      </label>
                      <label>
                        Posts
                        <input
                          type="number"
                          min={1}
                          max={24}
                          value={selected[page.id].limit}
                          onChange={(event) =>
                            update(page.id, "limit", Number(event.target.value))
                          }
                        />
                      </label>
                      <label>
                        Sort
                        <select
                          value={selected[page.id].sort}
                          onChange={(event) =>
                            update(page.id, "sort", event.target.value)
                          }
                        >
                          <option value="manual">Manual</option>
                          <option value="newest">Newest</option>
                          <option value="oldest">Oldest</option>
                        </select>
                      </label>
                    </div>
                    <div className="admin-assignment-flags">
                      {(
                        [
                          ["showImage", "Image"],
                          ["showCategory", "Category"],
                          ["showDate", "Date"],
                          ["showAuthor", "Author"],
                        ] as const
                      ).map(([key, label]) => (
                        <label key={key}>
                          <input
                            type="checkbox"
                            checked={selected[page.id][key]}
                            onChange={(event) =>
                              update(page.id, key, event.target.checked)
                            }
                          />
                          {label}
                        </label>
                      ))}
                    </div>
                    <div className="admin-assignment-options">
                      <label>
                        CTA label
                        <input
                          value={selected[page.id].ctaText}
                          onChange={(event) =>
                            update(page.id, "ctaText", event.target.value)
                          }
                          maxLength={80}
                        />
                      </label>
                      <label>
                        CTA URL
                        <input
                          value={selected[page.id].ctaHref}
                          onChange={(event) =>
                            update(page.id, "ctaHref", event.target.value)
                          }
                          maxLength={300}
                        />
                      </label>
                    </div>
                  </details>
                </div>
              )}
            </div>
          );
        })}
        {pages.length === 0 && (
          <p className="admin-help-text">
            Create or publish page records before assigning posts.
          </p>
        )}
      </div>
    </>
  );
}
