
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
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

function parseOptions(value: unknown): DisplayOptions {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as DisplayOptions;
}

export async function AssignedPosts({
  pageSlug,
  slot,
  editorial,
}: AssignedPostsProps) {
  const db = getPrisma();

  if (!db) return null;

  // =========================================
  // EXISTING CMS / PRISMA QUERY
  // =========================================

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
          lte: new Date(),
        },
      },
    },
    include: {
      post: {
        include: {
          author: {
            select: {
              name: true,
            },
          },
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

  // Remove duplicate assignments
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

  // =========================================
  // CMS DISPLAY OPTIONS
  // =========================================

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
  } else if (options.sort === "oldest") {
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

  // =========================================
  // SECTION
  // =========================================

  return (
    <section
      aria-labelledby={
        editorial ? "pitru-articles-heading" : undefined
      }
      className={[
        "assigned-posts",
        "assigned-posts-heritage",
        `assigned-posts-${options.cardStyle ?? "editorial"}`,
        editorial ? "assigned-posts-featured" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      id={editorial ? "pitru-articles" : undefined}
    >
      <div className="assigned-posts-inner">

        {/* =================================
            SECTION HEADER
        ================================= */}

        <header className="heritage-posts-heading">
          {editorial?.eyebrow && (
            <div className="heritage-eyebrow">
              <span className="heritage-eyebrow-line" />
              <span className="heritage-eyebrow-star">✦</span>
              <span>{editorial.eyebrow}</span>
              <span className="heritage-eyebrow-star">✦</span>
              <span className="heritage-eyebrow-line" />
            </div>
          )}

          {heading && (
            <h2 id={editorial ? "pitru-articles-heading" : undefined}>
              {heading}
            </h2>
          )}

          {description && (
            <p className="heritage-posts-description">
              {description}
            </p>
          )}

          <div className="heritage-heading-ornament">
            <span />
            <i>✥</i>
            <span />
          </div>
        </header>

        {/* =================================
            BLOG CARDS
        ================================= */}

        {posts.length > 0 ? (
          <div className="heritage-posts-grid">
            {posts.map(({ post }, index) => {
              const category = post.categories[0]?.category;

              const publishedDate = post.publishedAt
                ? post.publishedAt.toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    },
                  )
                : null;

              const readingTime = post.readingMinutes;

              return (
                <article
                  className="heritage-post-card"
                  key={post.id}
                >
                  <div className="heritage-post-card-frame">

                    {/* Decorative corners */}
                    <span className="heritage-corner heritage-tl" />
                    <span className="heritage-corner heritage-tr" />
                    <span className="heritage-corner heritage-bl" />
                    <span className="heritage-corner heritage-br" />

                    {/* Featured Image */}
                    {options.showImage !== false && (
                      <Link
                        href={`/journal/${post.slug}`}
                        className="heritage-post-image"
                        aria-label={`Read ${post.title}`}
                      >
                        {post.featuredMedia ? (
                          <Image
                            src={post.featuredMedia.url}
                            alt={
                              post.featuredMedia.alt ||
                              post.title
                            }
                            width={900}
                            height={650}
                            unoptimized
                            className="heritage-post-photo"
                          />
                        ) : (
                          <div className="heritage-image-placeholder">
                            <span>ॐ</span>
                            <p>TIRTHVAANI</p>
                          </div>
                        )}

                        <div className="heritage-image-shade" />

                        <span className="heritage-image-index">
                          <small>ARTICLE</small>
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        {options.showCategory !== false &&
                          category && (
                            <span className="heritage-image-category">
                              <span>✦</span>
                              {category.name}
                            </span>
                          )}
                      </Link>
                    )}

                    {/* Card Content */}
                    <div className="heritage-post-content">

                      {/* Category */}
                      {options.showCategory !== false &&
                        category &&
                        options.showImage === false && (
                          <span className="heritage-content-category">
                            ✦ {category.name}
                          </span>
                        )}

                      {/* Title */}
                      <h3>
                        <Link href={`/journal/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="heritage-post-excerpt">
                        {post.excerpt ||
                          "Discover the significance, traditions and sacred practices behind this ancient ritual."}
                      </p>

                      {/* Decorative divider */}
                      <div className="heritage-card-divider">
                        <span />
                        <i>✦</i>
                        <span />
                      </div>

                      {/* Metadata */}
                      <div className="heritage-post-meta">
                        <div className="heritage-post-meta-info">

                          {options.showDate !== false &&
                            publishedDate && (
                              <time
                                dateTime={post.publishedAt!.toISOString()}
                              >
                                {publishedDate}
                              </time>
                            )}

                          {readingTime > 0 && (
                            <span className="heritage-reading-time">
                              <Clock3 size={12} />
                              {readingTime} min read
                            </span>
                          )}

                          {options.showAuthor &&
                            post.author?.name && (
                              <span>
                                By {post.author.name}
                              </span>
                            )}
                        </div>
                      </div>

                      {/* Read Article */}
                      <Link
                        href={`/journal/${post.slug}`}
                        className="heritage-read-link"
                      >
                        <span>EXPLORE ARTICLE</span>

                        <span className="heritage-read-arrow">
                          <ArrowUpRight size={17} />
                        </span>
                      </Link>

                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="heritage-empty-state">
            <span className="heritage-empty-symbol">✥</span>

            <h3>Stories of Tradition Await</h3>

            <p>
              {editorial?.emptyMessage}
            </p>
          </div>
        )}

        {/* =================================
            VIEW ALL ARTICLES
        ================================= */}

        {uniqueAssignments.length > posts.length &&
          viewAllHref &&
          viewAllLabel && (
            <div className="heritage-view-all">
              <Link href={viewAllHref}>
                {viewAllLabel}
                <ArrowUpRight size={16} />
              </Link>
            </div>
          )}

        {/* Bottom Ornament */}
        <div className="heritage-bottom-ornament">
          <span />
          <i>✥</i>
          <span />
        </div>

      </div>
    </section>
  );
}
