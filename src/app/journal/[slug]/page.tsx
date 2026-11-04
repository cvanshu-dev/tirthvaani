import type { Metadata } from "next";
import { connection } from "next/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CmsStandalonePage } from "@/components/content/CmsStandalonePage";
import {
  extractMarkdownHeadings,
  MarkdownContent,
} from "@/components/content/MarkdownContent";
import { Contact } from "@/components/pages/ContactPage";
import { Article } from "@/components/pages/JournalPages";
import { getPrisma } from "@/lib/prisma";

const articles = [
  {
    slug: "first-visit-varanasi",
    title: "A first visit to Varanasi: what to know",
  },
  {
    slug: "pind-daan-meaning",
    title: "Pind Daan: meaning, setting and preparation",
  },
  {
    slug: "triveni-sangam",
    title: "The quiet significance of the Triveni Sangam",
  },
];

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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseFixedContent(value: unknown): FixedPostContent | null {
  if (!isRecord(value) || value.format !== "fixed-post-v1") {
    return null;
  }

  const image = isRecord(value.introImage) ? value.introImage : {};

  return {
    format: "fixed-post-v1",
    introHeading:
      typeof value.introHeading === "string" ? value.introHeading : "",
    introText: typeof value.introText === "string" ? value.introText : "",
    introImage: {
      url: typeof image.url === "string" ? image.url : "",
      alt: typeof image.alt === "string" ? image.alt : "",
      caption: typeof image.caption === "string" ? image.caption : "",
    },
    body: typeof value.body === "string" ? value.body : "",
  };
}

function getLegacyText(value: unknown) {
  if (!isRecord(value) || typeof value.text !== "string") {
    return "";
  }

  return value.text;
}

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  await connection();

  const { slug } = await params;
  const now = new Date();
  const db = getPrisma();

  const managed = db
    ? await db.post.findFirst({
        where: {
          slug,
          status: "PUBLISHED",
          publishedAt: { lte: now },
        },
        include: { seo: true },
      })
    : null;

  if (managed) {
    const canonical =
      managed.seo?.canonicalUrl ||
      `${process.env.NEXT_PUBLIC_SITE_URL || "https://tirthvaani.com"}/journal/${managed.slug}`;

    return {
      title: managed.seo?.title || managed.title,
      description: managed.seo?.description || managed.excerpt,
      alternates: { canonical },
      robots: {
        index: managed.seo?.robotsIndex ?? true,
        follow: managed.seo?.robotsFollow ?? true,
      },
      openGraph: {
        title:
          managed.seo?.openGraphTitle || managed.seo?.title || managed.title,
        description:
          managed.seo?.openGraphText ||
          managed.seo?.description ||
          managed.excerpt,
        images: managed.seo?.openGraphImage
          ? [managed.seo.openGraphImage]
          : undefined,
        type: "article",
      },
      twitter: {
        card:
          managed.seo?.twitterCard === "summary"
            ? "summary"
            : "summary_large_image",
        title: managed.seo?.openGraphTitle || managed.title,
        description: managed.seo?.openGraphText || managed.excerpt,
        images: managed.seo?.openGraphImage
          ? [managed.seo.openGraphImage]
          : undefined,
      },
    };
  }

  const page = db
    ? await db.page.findFirst({
        where: {
          slug: `journal/${slug}`,
          status: "PUBLISHED",
        },
        include: { seo: true },
      })
    : null;

  if (page) {
    return {
      title: page.seo?.title || page.title,
      description: page.seo?.description || undefined,
      alternates: {
        canonical:
          page.seo?.canonicalUrl ||
          `${process.env.NEXT_PUBLIC_SITE_URL || "https://tirthvaani.com"}/journal/${slug}`,
      },
      robots: {
        index: page.seo?.robotsIndex ?? true,
        follow: page.seo?.robotsFollow ?? true,
      },
    };
  }

  const article = articles.find((item) => item.slug === slug);

  return {
    title: article?.title ?? "Journal article",
    description:
      "Useful context and thoughtful reading for your sacred journey.",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await connection();

  const { slug } = await params;
  const now = new Date();
  const db = getPrisma();

  const post = db
    ? await db.post.findFirst({
        where: {
          slug,
          status: "PUBLISHED",
          publishedAt: { lte: now },
        },
        include: {
          featuredMedia: true,
          author: { select: { name: true } },
        },
      })
    : null;

  if (post) {
    const fixedContent = parseFixedContent(post.content);
    const legacyContent = getLegacyText(post.content);
    const articleBody = fixedContent?.body || legacyContent;

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedAt?.toISOString(),
      dateModified: post.updatedAt.toISOString(),
      author: {
        "@type": "Person",
        name: post.author.name,
      },
      mainEntityOfPage: `${
        process.env.NEXT_PUBLIC_SITE_URL || "https://tirthvaani.com"
      }/journal/${post.slug}`,
    };

    const headings = extractMarkdownHeadings(articleBody).filter(
      (heading) => heading.depth === 2,
    );

    return (
      <>
        <main className="simple-post-page">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
            }}
          />

          <div className="simple-post-breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/journal">Journal</Link>
            <span>/</span>
            <span>{post.title}</span>
          </div>

          <article className="simple-post">
            <header className="simple-post-header">
              <h1>{post.title}</h1>

              <div className="simple-post-divider">
                <span />
                <span>✦</span>
                <span />
              </div>
            </header>

            <div className="simple-post-content">
              {fixedContent?.introImage.url && (
                <figure className="simple-post-image">
                  <Image
                    src={fixedContent.introImage.url}
                    alt={fixedContent.introImage.alt || post.title}
                    width={700}
                    height={700}
                    unoptimized
                    priority
                  />

                  {fixedContent.introImage.caption && (
                    <figcaption>{fixedContent.introImage.caption}</figcaption>
                  )}
                </figure>
              )}

              <div className="simple-post-body">
                {fixedContent?.introHeading && (
                  <h2>{fixedContent.introHeading}</h2>
                )}

                {fixedContent?.introText && (
                  <MarkdownContent source={fixedContent.introText} />
                )}

                {articleBody && <MarkdownContent source={articleBody} />}
              </div>
            </div>

            {headings.length > 0 && (
              <div className="sr-only">
                {headings.map((heading) => (
                  <span key={heading.id}>{heading.title}</span>
                ))}
              </div>
            )}
          </article>
        </main>

        <Contact hideHero />
      </>
    );
  }

  const cmsPage = db
    ? await db.page.findFirst({
        where: {
          slug: `journal/${slug}`,
          status: "PUBLISHED",
        },
      })
    : null;

  if (cmsPage) {
    return (
      <>
        <CmsStandalonePage pageSlug={`journal/${slug}`} />
        <Contact hideHero />
      </>
    );
  }

  if (!articles.some((article) => article.slug === slug)) {
    notFound();
  }

  return <Article slug={slug} />;
}