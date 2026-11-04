import Link from "next/link";
import { getPrisma } from "@/lib/prisma";

export async function CmsJournalEntries() {
  const db = getPrisma();
  if (!db) return null;
  const posts = await db.post.findMany({
    where: { status: "PUBLISHED", publishedAt: { lte: new Date() } },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      publishedAt: true,
    },
    orderBy: { publishedAt: "desc" },
    take: 24,
  });
  if (!posts.length) return null;
  return (
    <section
      className="cms-journal-list section-pad"
      aria-label="Latest articles"
    >
      <div className="article-grid">
        {posts.map((post) => (
          <Link
            className="article-card"
            href={`/journal/${post.slug}`}
            key={post.id}
          >
            <span className="cms-journal-date">
              {post.publishedAt?.toLocaleDateString()}
            </span>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <span>Read article ↗</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
