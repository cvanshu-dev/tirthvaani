"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";

type JournalItem = {
  title: string;
  slug: string;
  category: string;
  time: string;
  image: string;
};
export function JournalBrowser({ articles }: { articles: JournalItem[] }) {
  const [category, setCategory] = useState("All stories"),
    [query, setQuery] = useState("");
  const categories = [
    "All stories",
    "Travel notes",
    "Ritual & remembrance",
    "Sacred places",
  ];
  const visible = articles.filter(
    (a) =>
      (category === "All stories" || a.category === category) &&
      a.title.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="journal-filters">
        {categories.map((c) => (
          <button
            type="button"
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
            key={c}
          >
            {c}
          </button>
        ))}
        <label className="search-label">
          Search articles
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the journal"
          />
        </label>
      </div>
      <div className="article-grid">
        {visible.map((a) => (
          <Link
            className="article-card"
            href={`/journal/${a.slug}`}
            key={a.slug}
          >
            <div
              className="image-block"
              role="img"
              aria-label={a.title}
              style={{ backgroundImage: `url('${a.image}')` }}
            />
            <span className="eyebrow">
              <i />
              {a.category}
            </span>
            <h3>{a.title}</h3>
            <span>
              {a.time} <ArrowUpRight size={14} />
            </span>
          </Link>
        ))}
      </div>
      {visible.length === 0 && (
        <p className="empty-search">
          No articles match that search. Try another phrase.
        </p>
      )}
    </>
  );
}

export function Gallery({ items }: { items: { src: string; alt: string }[] }) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <>
      <div className="gallery-grid">
        {items.map((item, i) => (
          <button
            className="gallery-item"
            key={item.src}
            onClick={() => setActive(i)}
            aria-label={`View image: ${item.alt}`}
            style={{ backgroundImage: `url('${item.src}')` }}
          />
        ))}
      </div>
      {active !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={items[active].alt}
          onClick={() => setActive(null)}
        >
          <button
            className="lightbox-close"
            onClick={() => setActive(null)}
            aria-label="Close image"
          >
            ×
          </button>
          <Image
            src={items[active].src}
            alt={items[active].alt}
            width={1800}
            height={1200}
            unoptimized
          />
          <p>{items[active].alt}</p>
        </div>
      )}
    </>
  );
}

export type NavigationLink = {
  label: string;
  href: string;
  target?: string;
  children?: { label: string; href: string; target?: string }[];
};

const defaultNavigation: NavigationLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Ritual Services",
    href: "/services",
    children: [
      { label: "Pitru Karyas in Varanasi", href: "/pitru-rituals" },
      { label: "Dev Karyas in Varanasi", href: "/dev-rituals" },
    ],
  },
  { label: "Contact Us", href: "/contact" },
];

export function Navigation({
  items,
  brandName = "TirthVaani",
  logoUrl = "",
}: {
  items?: NavigationLink[];
  brandName?: string;
  logoUrl?: string;
}) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navigationItems = items?.length ? items : defaultNavigation;

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="nav" ref={headerRef}>
   <Link className="brand" href="/">
  {logoUrl ? (
    <Image
      src={logoUrl}
      alt={brandName}
      width={160}
      height={48}
      unoptimized
      className="site-logo"
    />
  ) : (
    <span className="brand-wordmark">
      <span className="brand-main">
        {brandName.replace(/Vaani$/i, "")}
      </span>
      <span className="brand-accent">
        {brandName.match(/Vaani$/i)?.[0] ?? ""}
      </span>
    </span>
  )}
</Link>
      <nav className="nav-links">
        {navigationItems.map((item) =>
          item.children?.length ? (
            <div
              className={`nav-group${servicesOpen ? " is-open" : ""}`}
              key={item.href + item.label}
            >
              <button
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                aria-controls="ritual-services-menu"
                className="nav-dropdown-trigger"
                onClick={() => setServicesOpen((isOpen) => !isOpen)}
                type="button"
              >
                {item.label}
                <ChevronDown
                  aria-hidden="true"
                  className="nav-chevron"
                  size={14}
                />
              </button>
              <div
                className="nav-dropdown"
                data-open={servicesOpen}
                id="ritual-services-menu"
              >
                <span className="nav-dropdown-kicker">SACRED RITUALS</span>
                {item.children.map((child) => (
                  <Link
                    key={child.href + child.label}
                    href={child.href}
                    target={child.target}
                    onClick={() => setServicesOpen(false)}
                  >
                    {child.label}
                    <ArrowUpRight size={13} />
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link
              className={
                item.label === "Contact Us" ? "nav-contact" : undefined
              }
              href={item.href}
              key={item.href + item.label}
              target={item.target}
            >
              {item.label}
            </Link>
          ),
        )}
      </nav>
      <button
        className="menu-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        type="button"
      >
        {open ? <X /> : <Menu />}
      </button>
      {open && (
        <>
          <button
            aria-label="Close navigation menu"
            className="mobile-nav-backdrop"
            onClick={() => setOpen(false)}
            tabIndex={-1}
            type="button"
          />
          <nav aria-label="Mobile navigation" className="mobile-nav">
            <p className="mobile-nav-kicker">EXPLORE TIRTHVAANI</p>
            {navigationItems.map((item) => (
              <div className="mobile-nav-group" key={item.href + item.label}>
                {item.children?.length ? (
                  <>
                    <button
                      aria-expanded={servicesOpen}
                      className="mobile-nav-parent"
                      onClick={() => setServicesOpen((isOpen) => !isOpen)}
                      type="button"
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={
                          servicesOpen ? "nav-chevron is-open" : "nav-chevron"
                        }
                        size={18}
                      />
                    </button>
                    {servicesOpen ? (
                      <div className="mobile-nav-children">
                        {item.children.map((child) => (
                          <Link
                            key={child.href + child.label}
                            onClick={() => {
                              setOpen(false);
                              setServicesOpen(false);
                            }}
                            href={child.href}
                            target={child.target}
                          >
                            <span>{child.label}</span>
                            <ArrowUpRight size={15} />
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </>
                ) : (
                  <Link
                    className={
                      item.label === "Contact Us"
                        ? "mobile-nav-contact"
                        : undefined
                    }
                    onClick={() => setOpen(false)}
                    href={item.href}
                    target={item.target}
                  >
                    {item.label}
                    <ArrowUpRight size={17} />
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </>
      )}
    </header>
  );
}

export function EnquiryForm() {
  const [sent, setSent] = useState(false);
  return (
    <form
      className="enquiry-form"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <label>
        Your name
        <input required name="name" placeholder="How shall we address you?" />
      </label>
      <label>
        Email address
        <input
          required
          type="email"
          name="email"
          placeholder="you@example.com"
        />
      </label>
  
      <label>
        Your message
        <textarea
          required
          rows={3}
          placeholder="Tell us a little about the journey you are planning."
        />
      </label>
      <button className="button button-dark" type="submit">
        {sent ? "Thank you for reaching out" : "Send an enquiry"}
        <ArrowUpRight size={16} />
      </button>
      <p className="form-note" role="status">
        {sent
          ? "Demo only: your enquiry has not been sent or stored. Please contact us directly via WhatsApp."
          : "This form is a preview. Enquiries are not sent or stored in this phase."}
      </p>
    </form>
  );
}
