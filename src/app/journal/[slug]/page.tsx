import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Article } from "@/components/pages/JournalPages";
import {
  extractMarkdownHeadings,
  MarkdownContent,
} from "@/components/content/MarkdownContent";
import { getPrisma } from "@/lib/prisma";
import { CmsStandalonePage } from "@/components/content/CmsStandalonePage";

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

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const db = getPrisma();
  const managed = db
    ? await db.post.findFirst({
        where: { slug, status: "PUBLISHED", publishedAt: { lte: new Date() } },
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
        where: { slug: `journal/${slug}`, status: "PUBLISHED" },
        include: { seo: true },
      })
    : null;
  if (page)
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
  const { slug } = await params;
  const db = getPrisma();
  const post = db
    ? await db.post.findFirst({
        where: { slug, status: "PUBLISHED", publishedAt: { lte: new Date() } },
        include: {
          featuredMedia: true,
          author: { select: { name: true } },
          categories: { include: { category: true } },
        },
      })
    : null;
  if (post) {
    const content =
      post.content &&
      typeof post.content === "object" &&
      !Array.isArray(post.content) &&
      "text" in post.content
        ? String(post.content.text)
        : "";
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedAt?.toISOString(),
      dateModified: post.updatedAt.toISOString(),
      author: { "@type": "Person", name: post.author.name },
      mainEntityOfPage: `${process.env.NEXT_PUBLIC_SITE_URL || "https://tirthvaani.com"}/journal/${post.slug}`,
    };
    const headings = extractMarkdownHeadings(content).filter(
      (heading) => heading.depth === 2,
    );
    const category = post.categories[0]?.category.name;
    return (
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
          }}
        />
        <div className="breadcrumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/journal">Journal</Link>
          <span>/</span>
          {post.title}
        </div>
        <article className="article-page cms-article-page">
          <header>
            {category && (
              <span className="cms-article-category">{category}</span>
            )}
            <h1>{post.title}</h1>
            {post.excerpt && <p>{post.excerpt}</p>}
            <div className="cms-article-byline">
              <span>Words by {post.author.name}</span>
              <span aria-hidden="true" />
              <span>{post.readingMinutes} minute read</span>
            </div>
          </header>
          {post.featuredMedia && (
            <figure className="cms-article-cover-wrap">
              <Image
                className="article-cover"
                src={post.featuredMedia.url}
                alt={post.featuredMedia.alt || post.title}
                width={1400}
                height={850}
                unoptimized
                priority
              />
              {post.featuredMedia.caption && (
                <figcaption>{post.featuredMedia.caption}</figcaption>
              )}
            </figure>
          )}
          <div className="cms-article-layout">
            {headings.length > 1 && (
              <nav aria-label="In this article" className="cms-article-toc">
                <span>IN THIS GUIDE</span>
                <ol>
                  {headings.map((heading, index) => (
                    <li key={heading.id}>
                      <a href={`#${heading.id}`}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        {heading.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <div className="article-body">
              <MarkdownContent source={content} />
            </div>
          </div>
          <footer className="cms-article-endcap">
            <div>
              <span>CONTINUE YOUR JOURNEY</span>
              <h2>Thoughtful guidance for your time in Kashi.</h2>
            </div>
            <div className="cms-article-endcap-links">
              <Link href="/pitru-rituals">Explore Pitru Karya ↗</Link>
              <Link href="/contact">Speak with a guide ↗</Link>
            </div>
          </footer>
        </article>
      </main>
    );
  }
  const cmsPage = db
    ? await db.page.findFirst({
        where: { slug: `journal/${slug}`, status: "PUBLISHED" },
      })
    : null;
  if (cmsPage) return <CmsStandalonePage pageSlug={`journal/${slug}`} />;
  if (!articles.some((article) => article.slug === slug)) notFound();
  return <Article slug={slug} />;
}
