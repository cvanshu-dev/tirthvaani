import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { connection } from "next/server";

import { getPrisma } from "@/lib/prisma";

type DisplayOptions = {
  heading?: string;
  description?: string;
  cardStyle?: "editorial" | "compact";
  limit?: number;
  sort?: "manual" | "newest" | "oldest";
  showImage?: boolean;
  showCategory?: boolean;
  showDate?: boolean;
  showAuthor?: boolean;
  ctaText?: string;
  ctaHref?: string;
};

type AssignedPostsProps = {
  pageSlug: string;
  slot?: string;
  editorial?: {
    eyebrow: string;
    heading: string;
    description: string;
    emptyMessage: string;
    viewAllHref: string;
    viewAllLabel: string;
  };
};

type PostImage = {
  url: string;
  alt: string;
};

function parseOptions(value: unknown): DisplayOptions {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as DisplayOptions;
}

function getPostContentImage(content: unknown): PostImage | null {
  if (
    !content ||
    typeof content !== "object" ||
    Array.isArray(content)
  ) {
    return null;
  }

  const data = content as {
    introImage?: {
      url?: unknown;
      alt?: unknown;
    };
  };

  const url =
    typeof data.introImage?.url === "string"
      ? data.introImage.url
      : "";

  if (!url) {
    return null;
  }

  return {
    url,
    alt:
      typeof data.introImage?.alt === "string"
        ? data.introImage.alt
        : "",
  };
}

export async function AssignedPosts({
  pageSlug,
  slot,
  editorial,
}: AssignedPostsProps) {
  await connection();

  const db = getPrisma();

  if (!db) {
    return null;
  }

  const now = new Date();

  const assignments = await db.contentAssignment.findMany({
    where: {
      visible: true,
      ...(slot ? { slot } : {}),
      page: {
        slug: pageSlug,
        status: "PUBLISHED",
      },
      post: {
        status: "PUBLISHED",
        publishedAt: {
          lte: now,
        },
      },
    },
    include: {
      post: {
        include: {
          categories: {
            include: {
              category: true,
            },
          },
          featuredMedia: true,
        },
      },
    },
    orderBy: {
      position: "asc",
    },
    take: 60,
  });

  const uniqueAssignments = Array.from(
    new Map(
      assignments.map((assignment) => [
        assignment.post.id,
        assignment,
      ]),
    ).values(),
  );

  if (!uniqueAssignments.length && !editorial) {
    return null;
  }

  const options = parseOptions(
    assignments[0]?.displayOverride,
  );

  const sortedAssignments = [...uniqueAssignments];

  if (options.sort === "newest") {
    sortedAssignments.sort(
      (left, right) =>
        (right.post.publishedAt?.getTime() ?? 0) -
        (left.post.publishedAt?.getTime() ?? 0),
    );
  }

  if (options.sort === "oldest") {
    sortedAssignments.sort(
      (left, right) =>
        (left.post.publishedAt?.getTime() ?? 0) -
        (right.post.publishedAt?.getTime() ?? 0),
    );
  }

  const limit = Math.min(
    Math.max(options.limit ?? 6, 1),
    24,
  );

  const posts = sortedAssignments.slice(0, limit);

  const heading = options.heading || editorial?.heading;
  const description =
    options.description || editorial?.description;
  const viewAllHref =
    options.ctaHref || editorial?.viewAllHref;
  const viewAllLabel =
    options.ctaText || editorial?.viewAllLabel;

  return (
    <section
      id={editorial ? "pitru-articles" : undefined}
      aria-labelledby={
        editorial ? "pitru-articles-heading" : undefined
      }
      className="w-full bg-[#f7f3ec] px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
    >
      <div className="mx-auto max-w-[1240px]">
        <header className="mx-auto mb-12 max-w-3xl text-center">
          {editorial?.eyebrow && (
            <div className="mb-5 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#a97945]">
              <span className="h-px w-10 bg-[#c6a477]" />
              <span>✦</span>
              <span>{editorial.eyebrow}</span>
              <span>✦</span>
              <span className="h-px w-10 bg-[#c6a477]" />
            </div>
          )}

          {heading && (
            <h2
              id={
                editorial
                  ? "pitru-articles-heading"
                  : undefined
              }
              className="m-0 font-serif text-4xl font-normal leading-tight tracking-[-0.04em] text-[#302018] sm:text-5xl"
            >
              {heading}
            </h2>
          )}

          {description && (
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#786b60] sm:text-base">
              {description}
            </p>
          )}

          <div className="mx-auto mt-7 flex max-w-xs items-center justify-center gap-3 text-[#b3834d]">
            <span className="h-px flex-1 bg-[#d6b98f]" />
            <span className="text-lg">✥</span>
            <span className="h-px flex-1 bg-[#d6b98f]" />
          </div>
        </header>

        {posts.length > 0 ? (
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {posts.map(({ post }) => {
              const category =
                post.categories[0]?.category;

              const contentImage = getPostContentImage(
                post.content,
              );

              const thumbnailUrl =
                post.featuredMedia?.url ||
                contentImage?.url ||
                "";

              const thumbnailAlt =
                post.featuredMedia?.alt ||
                contentImage?.alt ||
                post.title;

              return (
                <article
                  key={post.id}
                  className="group relative flex min-h-full flex-col overflow-hidden border border-[#d8c5aa] bg-[#fffdf9] shadow-[0_12px_30px_rgba(68,43,25,0.07)] transition duration-300 hover:-translate-y-2 hover:border-[#aa7b4a] hover:shadow-[0_22px_42px_rgba(68,43,25,0.15)]"
                >
                  <span className="pointer-events-none absolute left-3 top-3 z-10 h-5 w-5 border-l border-t border-[#d0a873]" />
                  <span className="pointer-events-none absolute right-3 top-3 z-10 h-5 w-5 border-r border-t border-[#d0a873]" />
                  <span className="pointer-events-none absolute bottom-3 left-3 z-10 h-5 w-5 border-b border-l border-[#d0a873]" />
                  <span className="pointer-events-none absolute bottom-3 right-3 z-10 h-5 w-5 border-b border-r border-[#d0a873]" />

                  {options.showImage !== false && (
                    <Link
                      href={`/journal/${post.slug}`}
                      aria-label={`Read ${post.title}`}
                      className="relative block aspect-[16/10] overflow-hidden bg-[#2c211a]"
                    >
                      {thumbnailUrl ? (
                        <Image
                          src={thumbnailUrl}
                          alt={thumbnailAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          unoptimized
                          className="object-cover transition duration-700 ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center bg-[#33251c] text-[#d6b27d]">
                          <span className="font-serif text-5xl">
                            ॐ
                          </span>
                          <span className="mt-2 text-[10px] font-bold tracking-[0.3em]">
                            TIRTHVAANI
                          </span>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-[#1c110b]/80 via-[#1c110b]/10 to-transparent" />

                      {options.showCategory !== false &&
                        category && (
                          <span className="absolute bottom-5 left-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#fff8ed]">
                            <span className="text-[#e2bb82]">
                              ✦
                            </span>
                            {category.name}
                          </span>
                        )}
                    </Link>
                  )}

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    {options.showCategory !== false &&
                      category &&
                      options.showImage === false && (
                        <span className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#a97945]">
                          ✦ {category.name}
                        </span>
                      )}

                    <h3 className="m-0 font-serif text-[26px] font-normal leading-tight tracking-[-0.025em] text-[#302018]">
                      <Link
                        href={`/journal/${post.slug}`}
                        className="transition-colors hover:text-[#9a6a3b]"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#75685d]">
                      {post.excerpt ||
                        "Discover the significance, traditions and sacred practices behind this ancient ritual."}
                    </p>

                    <div className="mt-6 flex items-center gap-3 text-[#c5a276]">
                      <span className="h-px flex-1 bg-[#ddcbb1]" />
                      <span className="text-sm">✦</span>
                      <span className="h-px flex-1 bg-[#ddcbb1]" />
                    </div>

                    <Link
                      href={`/journal/${post.slug}`}
                      className="mt-7 inline-flex w-fit items-center gap-3 border-b border-[#a97945] pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6f482d] transition-colors hover:text-[#a97945]"
                    >
                      <span>Read more</span>
                      <ArrowUpRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mx-auto max-w-xl border border-[#d8c5aa] bg-[#fffdf9] px-6 py-14 text-center">
            <span className="font-serif text-4xl text-[#b3834d]">
              ✥
            </span>

            <h3 className="mt-4 font-serif text-3xl font-normal text-[#302018]">
              Stories of Tradition Await
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#786b60]">
              {editorial?.emptyMessage}
            </p>
          </div>
        )}

        {uniqueAssignments.length > posts.length &&
          viewAllHref &&
          viewAllLabel && (
            <div className="mt-12 flex justify-center">
              <Link
                href={viewAllHref}
                className="inline-flex items-center gap-3 border border-[#a97945] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6f482d] transition-colors hover:bg-[#6f482d] hover:text-[#fffaf2]"
              >
                {viewAllLabel}
                <ArrowUpRight size={16} />
              </Link>
            </div>
          )}

        <div className="mx-auto mt-16 flex max-w-xs items-center justify-center gap-3 text-[#b3834d]">
          <span className="h-px flex-1 bg-[#d6b98f]" />
          <span className="text-lg">✥</span>
          <span className="h-px flex-1 bg-[#d6b98f]" />
        </div>
      </div>
    </section>
  );
}