import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/content/MarkdownContent";
import { getPrisma } from "@/lib/prisma";
import { CmsStandalonePage } from "@/components/content/CmsStandalonePage";

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const db = getPrisma();
  const service = db
    ? await db.service.findFirst({
        where: { slug, status: "PUBLISHED", publishedAt: { lte: new Date() } },
        include: { seo: true },
      })
    : null;
  if (!service) {
    const page = await db?.page.findFirst({
      where: { slug: `services/${slug}`, status: "PUBLISHED" },
      include: { seo: true },
    });
    if (page)
      return {
        title: page.seo?.title || page.title,
        description: page.seo?.description || undefined,
        alternates: {
          canonical:
            page.seo?.canonicalUrl ||
            `${process.env.NEXT_PUBLIC_SITE_URL || "https://tirthvaani.com"}/services/${slug}`,
        },
        robots: {
          index: page.seo?.robotsIndex ?? true,
          follow: page.seo?.robotsFollow ?? true,
        },
      };
    return { title: "Service not found" };
  }
  return {
    title: service.seo?.title || service.title,
    description: service.seo?.description || service.summary,
    alternates: {
      canonical:
        service.seo?.canonicalUrl ||
        `${process.env.NEXT_PUBLIC_SITE_URL || "https://tirthvaani.com"}/services/${service.slug}`,
    },
    robots: {
      index: service.seo?.robotsIndex ?? true,
      follow: service.seo?.robotsFollow ?? true,
    },
    openGraph: {
      title: service.seo?.openGraphTitle || service.title,
      description: service.seo?.openGraphText || service.summary,
      images: service.seo?.openGraphImage
        ? [service.seo.openGraphImage]
        : undefined,
      type: "website",
    },
    twitter: {
      card:
        service.seo?.twitterCard === "summary"
          ? "summary"
          : "summary_large_image",
      title: service.seo?.openGraphTitle || service.title,
      description: service.seo?.openGraphText || service.summary,
      images: service.seo?.openGraphImage
        ? [service.seo.openGraphImage]
        : undefined,
    },
  };
}

export default async function CmsServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const db = getPrisma();
  const service = db
    ? await db.service.findFirst({
        where: { slug, status: "PUBLISHED", publishedAt: { lte: new Date() } },
        include: {
          featuredMedia: true,
          faqs: {
            include: { faq: true },
            orderBy: { faq: { position: "asc" } },
          },
        },
      })
    : null;
  if (!service) {
    const page = await db?.page.findFirst({
      where: { slug: `services/${slug}`, status: "PUBLISHED" },
    });
    if (page) return <CmsStandalonePage pageSlug={`services/${slug}`} />;
    notFound();
  }
  const body =
    service.description &&
    typeof service.description === "object" &&
    !Array.isArray(service.description) &&
    "text" in service.description
      ? String(service.description.text)
      : "";
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    areaServed: service.location || "Varanasi, Gaya and Prayagraj",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://tirthvaani.com"}/services/${service.slug}`,
  };
  const visibleFaqs = service.faqs.filter(({ faq }) => faq.visible);
  const faqSchema = visibleFaqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: visibleFaqs.map(({ faq }) => ({
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
        {visibleFaqs.length > 0 && (
          <section className="cms-service-faq">
            <h2>Frequently asked questions</h2>
            {visibleFaqs.map(({ faq }) => (
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
