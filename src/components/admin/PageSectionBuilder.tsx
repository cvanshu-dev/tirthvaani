"use client";

import { useEffect, useState } from "react";

type SectionType =
  | "hero"
  | "text"
  | "image-text"
  | "services"
  | "posts"
  | "faq"
  | "testimonials"
  | "gallery"
  | "statistics"
  | "contact"
  | "cta";
type Section = {
  id: string;
  type: SectionType;
  visible: boolean;
  config: {
    heading: string;
    body: string;
    image: string;
    slot: string;
    buttonText: string;
    buttonHref: string;
  };
};
const labels: Record<SectionType, string> = {
  hero: "Hero",
  text: "Text section",
  "image-text": "Image and text",
  services: "Services",
  posts: "Assigned posts",
  faq: "FAQs",
  testimonials: "Testimonials",
  gallery: "Gallery",
  statistics: "Statistics",
  contact: "Contact",
  cta: "Call to action",
};

function createSection(type: SectionType): Section {
  return {
    id: crypto.randomUUID(),
    type,
    visible: true,
    config: {
      heading: "",
      body: "",
      image: "",
      slot: "after-hero",
      buttonText: "",
      buttonHref: "",
    },
  };
}

export function PageSectionBuilder({ initial }: { initial: Section[] }) {
  const [sections, setSections] = useState(initial);
  function update(id: string, key: keyof Section["config"], value: string) {
    setSections((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, config: { ...item.config, [key]: value } }
          : item,
      ),
    );
  }
  function move(index: number, offset: number) {
    setSections((items) => {
      const target = index + offset;
      if (target < 0 || target >= items.length) return items;
      const next = [...items];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }
  return (
    <div className="admin-section-builder">
      <input type="hidden" name="sections" value={JSON.stringify(sections)} />
      {sections.map((section, index) => (
        <article
          className={`admin-section-item ${section.visible ? "" : "is-hidden"}`}
          key={section.id}
        >
          <header>
            <strong>{labels[section.type]}</strong>
            <span>Section {index + 1}</span>
            <div className="admin-section-tools">
              <button
                type="button"
                onClick={() => move(index, -1)}
                aria-label="Move section up"
                disabled={index === 0}
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                aria-label="Move section down"
                disabled={index === sections.length - 1}
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() =>
                  setSections((items) =>
                    items.map((item) =>
                      item.id === section.id
                        ? { ...item, visible: !item.visible }
                        : item,
                    ),
                  )
                }
              >
                {section.visible ? "Hide" : "Show"}
              </button>
              <button
                type="button"
                onClick={() =>
                  setSections((items) =>
                    items.filter((item) => item.id !== section.id),
                  )
                }
              >
                Remove
              </button>
            </div>
          </header>
          {section.type !== "posts" &&
            section.type !== "faq" &&
            section.type !== "testimonials" &&
            section.type !== "services" && (
              <label className="admin-field">
                <span>Heading</span>
                <input
                  className="admin-input"
                  value={section.config.heading}
                  onChange={(event) =>
                    update(section.id, "heading", event.target.value)
                  }
                  maxLength={180}
                />
              </label>
            )}
          {section.type !== "posts" &&
            section.type !== "faq" &&
            section.type !== "testimonials" &&
            section.type !== "services" && (
              <label className="admin-field">
                <span>
                  {section.type === "hero"
                    ? "Subtitle and description"
                    : section.type === "gallery"
                      ? "Image URLs, one per line. Optional: URL | alt text"
                      : section.type === "statistics"
                        ? "One statistic per line: number | label"
                        : "Content (Markdown supported)"}
                </span>
                <textarea
                  className="admin-input admin-small-textarea"
                  value={section.config.body}
                  onChange={(event) =>
                    update(section.id, "body", event.target.value)
                  }
                  maxLength={10000}
                />
              </label>
            )}
          {section.type === "image-text" && (
            <label className="admin-field">
              <span>Image URL</span>
              <input
                className="admin-input"
                value={section.config.image}
                onChange={(event) =>
                  update(section.id, "image", event.target.value)
                }
                placeholder="/hero.jpg"
              />
            </label>
          )}
          {section.type === "posts" && (
            <>
              <label className="admin-field">
                <span>Assignment slot</span>
                <input
                  className="admin-input"
                  value={section.config.slot}
                  onChange={(event) =>
                    update(section.id, "slot", event.target.value)
                  }
                />
              </label>
              <p className="admin-help-text">
                Posts assigned to this page and slot appear here automatically.
              </p>
            </>
          )}
          {section.type === "cta" && (
            <div className="admin-field-row">
              <label className="admin-field">
                <span>Button label</span>
                <input
                  className="admin-input"
                  value={section.config.buttonText}
                  onChange={(event) =>
                    update(section.id, "buttonText", event.target.value)
                  }
                />
              </label>
              <label className="admin-field">
                <span>Button destination</span>
                <input
                  className="admin-input"
                  value={section.config.buttonHref}
                  onChange={(event) =>
                    update(section.id, "buttonHref", event.target.value)
                  }
                />
              </label>
            </div>
          )}
        </article>
      ))}
      <div className="admin-add-section">
        <strong>Add section</strong>
        <div>
          {(Object.keys(labels) as SectionType[]).map((type) => (
            <button
              type="button"
              key={type}
              onClick={() =>
                setSections((items) => [...items, createSection(type)])
              }
            >
              + {labels[type]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
