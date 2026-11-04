import Link from "next/link";
import { MarkdownContent } from "@/components/content/MarkdownContent";
import { getPrisma } from "@/lib/prisma";

export async function CmsServiceOverride({
  slug,
  fallback,
}: {
  slug: string;
  fallback: React.ReactNode;
}) {
  const db = getPrisma();
  const service = db
    ? await db.service.findFirst({
        where: { slug, status: "PUBLISHED", publishedAt: { lte: new Date() } },
        include: {
          faqs: {
            include: { faq: true },
            orderBy: { faq: { position: "asc" } },
          },
        },
      })
    : null;
  if (!service) return fallback;
  const body =
    service.description &&
    typeof service.description === "object" &&
    !Array.isArray(service.description) &&
    "text" in service.description
      ? String(service.description.text)
      : "";
  const faqs = service.faqs.filter(({ faq }) => faq.visible);
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    areaServed: service.location || "Varanasi, Gaya and Prayagraj",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://tirthvaani.com"}/services/${service.slug}`,
  };
  const faqSchema = faqs.length
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
    <main className="cms-service-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c"),
        }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <div className="breadcrumbs">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/services">Services</Link>
        <span>/</span>
        {service.title}
      </div>
      <section className="cms-service-hero">
        <p className="cms-article-meta">SACRED SERVICES</p>
        <h1>{service.title}</h1>
        {service.summary && <p>{service.summary}</p>}
        {service.location && <span>{service.location}</span>}
      </section>
      <article className="cms-service-body">
        <MarkdownContent source={body} />
        {service.durationMinutes && (
          <p>
            <strong>Approximate duration:</strong> {service.durationMinutes}{" "}
            minutes
          </p>
        )}
        {faqs.length > 0 && (
          <section className="cms-service-faq">
            <h2>Frequently asked questions</h2>
            {faqs.map(({ faq }) => (
              <details key={faq.id}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </section>
        )}
        <Link
          className="button button-primary"
          href={
            service.bookingCta?.startsWith("/")
              ? service.bookingCta
              : "/contact"
          }
        >
          Ask about this service
        </Link>
      </article>
    </main>
  );
}
