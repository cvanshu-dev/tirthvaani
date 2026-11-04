import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { getPrisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://tirthvaani.com";
  const db = getPrisma();
  const now = new Date();
  const routes: MetadataRoute.Sitemap = [
    "",
    "about",
    "services",
    "destinations",
    "journal",
    "contact",
    "pitru-rituals",
    "dev-rituals",
    "travel-assistance",
  ].map((path) => ({
    url: `${baseUrl}/${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
  if (!db) return routes;
  const [pages, posts, services] = await Promise.all([
    db.page.findMany({
      where: {
        status: "PUBLISHED",
        OR: [{ publishedAt: null }, { publishedAt: { lte: now } }],
        slug: { not: "" },
      },
      select: { slug: true, updatedAt: true },
    }),
    db.post.findMany({
      where: { status: "PUBLISHED", publishedAt: { lte: now } },
      select: { slug: true, updatedAt: true },
    }),
    db.service.findMany({
      where: { status: "PUBLISHED", publishedAt: { lte: now } },
      select: { slug: true, updatedAt: true },
    }),
  ]);
  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...pages.map(({ slug, updatedAt }) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...posts.map(({ slug, updatedAt }) => ({
      url: `${baseUrl}/journal/${slug}`,
      lastModified: updatedAt,
      changeFrequency: "yearly" as const,
      priority: 0.55,
    })),
    ...services.map(({ slug, updatedAt }) => ({
      url: `${baseUrl}/services/${slug}`,
      lastModified: updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];
  const unique = new Map(
    [...routes, ...dynamicRoutes].map((entry) => [entry.url, entry]),
  );
  return [...unique.values()];
}
