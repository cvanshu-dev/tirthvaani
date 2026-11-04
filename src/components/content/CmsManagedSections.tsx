import Image from "next/image";
import Link from "next/link";
import { AssignedPosts } from "@/components/content/AssignedPosts";
import { CmsTestimonials } from "@/components/content/CmsTestimonials";
import { MarkdownContent } from "@/components/content/MarkdownContent";
import { getPrisma } from "@/lib/prisma";

function configOf(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}
function textOf(config: Record<string, unknown>, key: string) {
  return typeof config[key] === "string" ? (config[key] as string) : "";
}

export async function CmsManagedSections({
  pageSlug,
  excludeSlots = [],
}: {
  pageSlug: string;
  excludeSlots?: string[];
}) {
  const db = getPrisma();
  if (!db) return null;
  const page = await db.page.findFirst({
    where: { slug: pageSlug, status: "PUBLISHED" },
    include: {
      sections: { where: { visible: true }, orderBy: { position: "asc" } },
      assignments: { select: { slot: true } },
      faqs: { include: { faq: true }, orderBy: { faq: { position: "asc" } } },
    },
  });
  if (!page?.sections.length) return null;
  const faqs = page.faqs.filter(({ faq }) => faq.visible);
  const renderedSlots = new Set(
    page.sections
      .filter((section) => section.type === "posts")
      .map((section) => {
        const config = configOf(section.config);
        return textOf(config, "slot") || "after-hero";
      }),
  );
  const additionalSlots = [
    ...new Set(page.assignments.map((item) => item.slot)),
  ].filter(
    (slot) =>
      !renderedSlots.has(slot) &&
      !excludeSlots.includes("*") &&
      !excludeSlots.includes(slot),
  );
  const schema = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map(({ faq }) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;
  return (
    <div className="cms-managed-sections">
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      )}
      {page.sections.map((section) => {
        const config = configOf(section.config);
        const heading = textOf(config, "heading");
        const body = textOf(config, "body");
        if (section.type === "posts") {
          const slot = textOf(config, "slot") || "after-hero";
          if (excludeSlots.includes("*") || excludeSlots.includes(slot)) {
            return null;
          }
          return (
            <AssignedPosts key={section.id} pageSlug={pageSlug} slot={slot} />
          );
        }
        if (section.type === "hero")
          return (
            <section className="cms-page-hero" key={section.id}>
              <div className="cms-page-hero-inner">
                {heading && <h2>{heading}</h2>}
                {body && <MarkdownContent source={body} />}
              </div>
            </section>
          );
        if (section.type === "text" || section.type === "about")
          return (
            <section className="cms-page-section section-pad" key={section.id}>
              {heading && <h2>{heading}</h2>}
              <MarkdownContent source={body} />
            </section>
          );
        if (section.type === "image-text")
          return (
            <section
              className="cms-page-section cms-image-text section-pad"
              key={section.id}
            >
              {textOf(config, "image") && (
                <Image
                  src={textOf(config, "image")}
                  alt={heading || page.title}
                  width={1000}
                  height={700}
                  unoptimized
                />
              )}
              <div>
                {heading && <h2>{heading}</h2>}
                <MarkdownContent source={body} />
              </div>
            </section>
          );
        if (section.type === "services")
          return <CmsServices key={section.id} heading={heading} />;
        if (section.type === "faq")
          return faqs.length ? (
            <section className="cms-page-section section-pad" key={section.id}>
              <div className="cms-page-section-inner">
                <h2>{heading || "Frequently asked questions"}</h2>
                <div className="cms-faq-list">
                  {faqs.map(({ faq }) => (
                    <details key={faq.id}>
                      <summary>{faq.question}</summary>
                      <p>{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </section>
          ) : null;
        if (section.type === "testimonials")
          return (
            <CmsTestimonials
              key={section.id}
              heading={heading || "A few words from pilgrims"}
            />
          );
        if (section.type === "gallery")
          return (
            <section className="cms-page-section section-pad" key={section.id}>
              {heading && <h2>{heading}</h2>}
              <div className="cms-page-gallery">
                {body.split(/\r?\n/).map((line, index) => {
                  const [src, alt] = line
                    .split("|")
                    .map((value) => value.trim());
                  return src ? (
                    <figure key={`${src}-${index}`}>
                      <Image
                        src={src}
                        alt={alt || `${page.title} gallery image ${index + 1}`}
                        width={800}
                        height={600}
                        unoptimized
                      />
                      <figcaption>{alt}</figcaption>
                    </figure>
                  ) : null;
                })}
              </div>
            </section>
          );
        if (section.type === "statistics")
          return (
            <section
              className="cms-page-statistics section-pad"
              key={section.id}
            >
              {heading && <h2>{heading}</h2>}
              <div>
                {body.split(/\r?\n/).map((line, index) => {
                  const [number, label] = line
                    .split("|")
                    .map((value) => value.trim());
                  return number && label ? (
                    <article key={`${number}-${index}`}>
                      <strong>{number}</strong>
                      <span>{label}</span>
                    </article>
                  ) : null;
                })}
              </div>
            </section>
          );
        if (section.type === "contact" || section.type === "cta")
          return (
            <section className="cms-page-cta section-pad" key={section.id}>
              <div>
                <h2>{heading || "Let us help plan your journey"}</h2>
                <MarkdownContent source={body} />
                <Link
                  className="button button-primary"
                  href={textOf(config, "buttonHref") || "/contact"}
                >
                  {textOf(config, "buttonText") || "Contact TirthVaani"}
                </Link>
              </div>
            </section>
          );
        return null;
      })}
      {additionalSlots.map((slot) => (
        <AssignedPosts key={slot} pageSlug={pageSlug} slot={slot} />
      ))}
    </div>
  );
}

async function CmsServices({ heading }: { heading: string }) {
  const db = getPrisma();
  const services = db
    ? await db.service.findMany({
        where: { status: "PUBLISHED", publishedAt: { lte: new Date() } },
        select: { id: true, title: true, slug: true, summary: true },
        orderBy: { updatedAt: "desc" },
        take: 12,
      })
    : [];
  if (!services.length) return null;
  return (
    <section className="cms-page-section section-pad">
      <div className="cms-page-section-inner">
        <h2>{heading || "Our services"}</h2>
        <div className="cms-services-grid">
          {services.map((service) => (
            <Link key={service.id} href={`/services/${service.slug}`}>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <span>Explore service ↗</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
