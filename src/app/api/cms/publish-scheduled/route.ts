import { timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

function authorized(request: Request) {
  const expected = process.env.CMS_CRON_SECRET;
  const supplied =
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!expected || supplied.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(supplied), Buffer.from(expected));
}

export async function POST(request: Request) {
  if (!authorized(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = getPrisma();
  if (!db)
    return NextResponse.json(
      { error: "CMS database is not configured" },
      { status: 503 },
    );
  const now = new Date();
  const result = await db.$transaction(async (tx) => {
    const [duePosts, dueServices, duePages] = await Promise.all([
      tx.post.findMany({
        where: { status: "SCHEDULED", scheduledAt: { lte: now } },
        select: { slug: true },
      }),
      tx.service.findMany({
        where: { status: "SCHEDULED", publishedAt: { lte: now } },
        select: { slug: true },
      }),
      tx.page.findMany({
        where: { status: "SCHEDULED", publishedAt: { lte: now } },
        select: { slug: true },
      }),
    ]);
    const posts = await tx.post.updateMany({
      where: { status: "SCHEDULED", scheduledAt: { lte: now } },
      data: { status: "PUBLISHED", publishedAt: now },
    });
    const services = await tx.service.updateMany({
      where: { status: "SCHEDULED", publishedAt: { lte: now } },
      data: { status: "PUBLISHED", publishedAt: now },
    });
    const pages = await tx.page.updateMany({
      where: { status: "SCHEDULED", publishedAt: { lte: now } },
      data: { status: "PUBLISHED", publishedAt: now },
    });
    if (posts.count + services.count + pages.count)
      await tx.activityLog.create({
        data: {
          action: "content.scheduled.publish",
          entityType: "system",
          summary: `Automatically published ${posts.count} posts, ${services.count} services and ${pages.count} pages`,
        },
      });
    return {
      posts: posts.count,
      services: services.count,
      pages: pages.count,
      postSlugs: duePosts.map((post) => post.slug),
      serviceSlugs: dueServices.map((service) => service.slug),
      pageSlugs: duePages.map((page) => page.slug),
    };
  });
  revalidatePath("/journal");
  revalidatePath("/services");
  revalidatePath("/sitemap.xml");
  for (const slug of result.postSlugs) revalidatePath(`/journal/${slug}`);
  for (const slug of result.serviceSlugs) revalidatePath(`/services/${slug}`);
  for (const slug of result.pageSlugs) revalidatePath(slug ? `/${slug}` : "/");
  delete (result as Partial<typeof result>).postSlugs;
  delete (result as Partial<typeof result>).serviceSlugs;
  delete (result as Partial<typeof result>).pageSlugs;
  return NextResponse.json({ published: result });
}
