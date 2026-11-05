import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import {
  notFound,
  permanentRedirect,
  redirect,
} from "next/navigation";

import { AssignedPosts } from "@/components/content/AssignedPosts";
import { CmsTestimonials } from "@/components/content/CmsTestimonials";
import { FixedPageTemplate } from "@/components/content/FixedPageTemplate";
import { MarkdownContent } from "@/components/content/MarkdownContent";
import { getPrisma } from "@/lib/prisma";

type SectionData = {
  id: string;
  type: string;
  config: Record<string, unknown>;
};

type FixedTemplateData = {
  heroImage: string;
  heroTitle: string;
  articleHeading: string;
  articleText: string;
  articleImage: string;
  imageCaption: string;
  showArticle: boolean;
  showArticleImage: boolean;
};

function readConfig(value: unknown): Record<string, unknown> {
  return value &&
    typeof value === "object" &&
    !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function text(
  config: Record<string, unknown>,
  key: string,
): string {
  return typeof config[key] === "string" ? config[key] : "";
}

function readTemplateData(value: unknown): FixedTemplateData {
  const data = readConfig(value);

  return {
    heroImage: text(data, "heroImage"),
    heroTitle: text(data, "heroTitle"),
    articleHeading: text(data, "articleHeading"),
    articleText: text(data, "articleText"),
    articleImage: text(data, "articleImage"),
    imageCaption: text(data, "imageCaption"),
    showArticle: data.showArticle !== false,
    showArticleImage: data.showArticleImage !== false,
  };
}

export async function generateMetadata({
  params,
}: PageProps<"/[...cms]">): Promise<Metadata> {
  await connection();

  const { cms } = await params;
  const slug = cms.join("/");
  const db = getPrisma();

  const page = db
    ? await db.page.findFirst({
        where: {
          slug,
          status: "PUBLISHED",
        },
        include: {
          seo: true,
        },
      })
    : null;

  if (!page) {
    return {
      title: "Page not found",
    };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://tirthvaani.com";

  const canonical =
    page.seo?.canonicalUrl || `${siteUrl}/${slug}`;

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || undefined,
    alternates: {
      canonical,
    },
    robots: {
      index: page.seo?.robotsIndex ?? true,
      follow: page.seo?.robotsFollow ?? true,
    },
    openGraph: {
      title:
        page.seo?.openGraphTitle ||
        page.seo?.title ||
        page.title,
      description:
        page.seo?.openGraphText ||
        page.seo?.description ||
        undefined,
      images: page.seo?.openGraphImage
        ? [page.seo.openGraphImage]
        : undefined,
    },
  };
}

export default async function CmsPublicPage({
  params,
}: PageProps<"/[...cms]">) {
  await connection();

  const { cms } = await params;
  const slug = cms.join("/");
  const now = new Date();
  const db = getPrisma();

  const page = db
    ? await db.page.findFirst({
        where: {
          slug,
          status: "PUBLISHED",
          OR: [
            { publishedAt: null },
            { publishedAt: { lte: now } },
          ],
        },
        include: {
          sections: {
            where: {
              visible: true,
            },
            orderBy: {
              position: "asc",
            },
          },
          assignments: {
            select: {
              slot: true,
            },
          },
          faqs: {
            include: {
              faq: true,
            },
            orderBy: {
              faq: {
                position: "asc",
              },
            },
          },
        },
      })
    : null;

  if (!page) {
    const redirectRecord = await db?.redirect.findFirst({
      where: {
        source: `/${slug}`,
        enabled: true,
      },
    });

    if (redirectRecord) {
      if (redirectRecord.status === "MOVED_PERMANENTLY") {
        permanentRedirect(redirectRecord.target);
      }

      redirect(redirectRecord.target);
    }

    notFound();
  }

  /*
   * ABOUT and DEV_RITUALS use the same editable fixed template.
   * Their content comes from Page.templateData.
   */
  if (
    page.template === "ABOUT" ||
    page.template === "DEV_RITUALS"
  ) {
    return (
      <>
        <FixedPageTemplate
          data={readTemplateData(page.templateData)}
        />

        <AssignedPosts pageSlug={slug} />
      </>
    );
  }

  const sections = page.sections as unknown as SectionData[];
  const allFaqs = page.faqs.filter(({ faq }) => faq.visible);

  const renderedSlots = new Set(
    page.sections
      .filter((section) => section.type === "posts")
      .map((section) => {
        const config = readConfig(section.config);
        return text(config, "slot") || "after-hero";
      }),
  );

  const additionalSlots = [
    ...new Set(page.assignments.map((item) => item.slot)),
  ].filter((slot) => !renderedSlots.has(slot));

  const faqSchema = allFaqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: allFaqs.map(({ faq }) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <main className="cms-page-content">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />
      )}

      {page.breadcrumbs && (
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>{page.title}</span>
        </nav>
      )}

      {sections.map((section) => {
        const config = readConfig(section.config);
        const heading = text(config, "heading");
        const body = text(config, "body");

        if (section.type === "posts") {
          return (
            <AssignedPosts
              key={section.id}
              pageSlug={slug}
              slot={text(config, "slot") || "after-hero"}
            />
          );
        }

        if (section.type === "hero") {
          return (
            <section
              className="cms-page-hero"
              key={section.id}
            >
              <div className="cms-page-hero-inner">
                {heading && <h1>{heading}</h1>}
                {body && <MarkdownContent source={body} />}
              </div>
            </section>
          );
        }

        if (section.type === "text") {
          return (
            <section
              className="cms-page-section section-pad"
              key={section.id}
            >
              {heading && <h2>{heading}</h2>}
              <MarkdownContent source={body} />
            </section>
          );
        }

        if (section.type === "image-text") {
          return (
            <section
              className="cms-page-section cms-image-text section-pad"
              key={section.id}
            >
              {text(config, "image") && (
                <Image
                  src={text(config, "image")}
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
        }

        if (section.type === "services") {
          return (
            <CmsServiceSection
              key={section.id}
              heading={heading}
            />
          );
        }

        if (section.type === "gallery") {
          return (
            <section
              className="cms-page-section section-pad"
              key={section.id}
            >
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
                        alt={
                          alt ||
                          `${page.title} gallery image ${
                            index + 1
                          }`
                        }
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
        }

        if (section.type === "statistics") {
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
        }

        if (section.type === "contact") {
          return (
            <section
              className="cms-page-cta section-pad"
              key={section.id}
            >
              <div>
                <h2>
                  {heading ||
                    "Let us help plan your journey"}
                </h2>

                <MarkdownContent source={body} />

                <Link
                  className="button button-primary"
                  href="/contact"
                >
                  Contact TirthVaani
                </Link>
              </div>
            </section>
          );
        }

        if (section.type === "faq") {
          return allFaqs.length ? (
            <section
              className="cms-page-section section-pad"
              key={section.id}
            >
              <div className="cms-page-section-inner">
                <h2>
                  {heading ||
                    "Frequently asked questions"}
                </h2>

                <div className="cms-faq-list">
                  {allFaqs.map(({ faq }) => (
                    <details key={faq.id}>
                      <summary>{faq.question}</summary>
                      <p>{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </section>
          ) : null;
        }

        if (section.type === "testimonials") {
          return (
            <CmsTestimonials
              key={section.id}
              heading={
                heading || "A few words from pilgrims"
              }
            />
          );
        }

        if (section.type === "cta") {
          const buttonText = text(config, "buttonText");
          const buttonHref = text(config, "buttonHref");

          return (
            <section
              className="cms-page-cta section-pad"
              key={section.id}
            >
              <div>
                <h2>{heading}</h2>

                <MarkdownContent source={body} />

                {buttonText && buttonHref && (
                  <Link
                    className="button button-primary"
                    href={buttonHref}
                  >
                    {buttonText}
                  </Link>
                )}
              </div>
            </section>
          );
        }

        return null;
      })}

      {additionalSlots.map((slot) => (
        <AssignedPosts
          key={slot}
          pageSlug={slug}
          slot={slot}
        />
      ))}
    </main>
  );
}

async function CmsServiceSection({
  heading,
}: {
  heading: string;
}) {
  const db = getPrisma();

  if (!db) {
    return null;
  }

  const now = new Date();

  const services = await db.service.findMany({
    where: {
      status: "PUBLISHED",
      publishedAt: {
        lte: now,
      },
    },
    select: {
      id: true,
      title: true,
      slug: true,
      summary: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 12,
  });

  if (!services.length) {
    return null;
  }

  return (
    <section className="cms-page-section section-pad">
      <div className="cms-page-section-inner">
        <h2>{heading || "Our services"}</h2>

        <div className="cms-services-grid">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
            >
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