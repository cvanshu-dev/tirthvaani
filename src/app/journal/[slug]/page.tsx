import type { Metadata } from "next";
import { connection } from "next/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CmsStandalonePage } from "@/components/content/CmsStandalonePage";
import {
  extractMarkdownHeadings,
} from "@/components/content/MarkdownContent";
import { Contact } from "@/components/pages/ContactPage";

import { getPrisma } from "@/lib/prisma";



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

function getLegacyText(value: unknown): string {
  if (!isRecord(value) || typeof value.text !== "string") {
    return "";
  }

  return value.text;
}



export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  await connection();

  const { slug } = await params;
  const db = getPrisma();
  const now = new Date();

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
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://tirthvaani.com";

    const canonical =
      managed.seo?.canonicalUrl || `${siteUrl}/journal/${managed.slug}`;

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
          managed.seo?.openGraphTitle ||
          managed.seo?.title ||
          managed.title,
        description:
          managed.seo?.openGraphText ||
          managed.seo?.description ||
          managed.excerpt,
        images: managed.seo?.openGraphImage
          ? [managed.seo.openGraphImage]
          : undefined,
        type: "article",
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
          `${
            process.env.NEXT_PUBLIC_SITE_URL || "https://tirthvaani.com"
          }/journal/${slug}`,
      },
    };
  }

return {
  title: "Journal article",
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
  const db = getPrisma();
  const now = new Date();

  const post = db
    ? await db.post.findFirst({
        where: {
          slug,
          status: "PUBLISHED",
          publishedAt: { lte: now },
        },
        include: {
          featuredMedia: true,
          author: {
            select: {
              name: true,
            },
          },
        },
      })
    : null;

  if (post) {
    const fixedContent = parseFixedContent(post.content);
    const legacyContent = getLegacyText(post.content);

    const articleBody =
      fixedContent?.introText ||
      fixedContent?.body ||
      legacyContent ||
      post.excerpt;

    const articleImageUrl =
      fixedContent?.introImage.url ||
      post.featuredMedia?.url ||
      "/hero.jpg";

    const articleImageAlt =
      fixedContent?.introImage.alt ||
      post.featuredMedia?.alt ||
      post.title;

    const heroImageUrl =
      post.featuredMedia?.url ||
      fixedContent?.introImage.url ||
      "/hero.jpg";

    const heroImageAlt =
      post.featuredMedia?.alt ||
      fixedContent?.introImage.alt ||
      post.title;

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      image: heroImageUrl,
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
        <main className="heritage-post-page">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
            }}
          />

         <section
  className="pitru-hero-v2 blog-post-hero"
  aria-labelledby="blog-post-title"
>
  <Image
    src={heroImageUrl}
    alt={heroImageAlt}
    fill
    priority
    sizes="100vw"
    unoptimized
    className="pitru-hero-v2-image"
  />

  <div className="pitru-hero-v2-overlay" />

  <div className="dev-hero-simple-content">
    <h1 id="blog-post-title">{post.title}</h1>
  </div>
</section>


          <article className="heritage-post">
            <section className="heritage-post-feature">
              <div className="heritage-post-flow">
                <div className="heritage-post-feature-image">
                  <Image
                    src={articleImageUrl}
                    alt={articleImageAlt}
                    width={900}
                    height={1000}
                    unoptimized
                  />

                  {fixedContent?.introImage.caption && (
                    <small>{fixedContent.introImage.caption}</small>
                  )}
                </div>

                <div className="heritage-post-feature-copy">
                  <p>{articleBody}</p>
                </div>
              </div>
            </section>

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

notFound();
}