import Link from "next/link";
import { ArrowRight, FilePenLine, Globe2, Image, Plus } from "lucide-react";
import { getPrisma } from "@/lib/prisma";

export const metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

function formatBytes(bytes: bigint | null) {
  if (!bytes) return "0 MB";
  return `${(Number(bytes) / (1024 * 1024)).toFixed(1)} MB`;
}

function SetupNotice({ message }: { message: string }) {
  return (
    <div className="admin-setup-notice" role="status">
      <h2>Connect the CMS database</h2>
      <p>{message}</p>
      <p>
        Copy <code>.env.example</code> to <code>.env</code>, set your PostgreSQL
        connection, then run <code>npm run db:migrate</code> and
        <code> npm run db:seed</code>.
      </p>
    </div>
  );
}

async function loadDashboardData(
  db: NonNullable<ReturnType<typeof getPrisma>>,
) {
  return Promise.all([
    db.post.count({ where: { status: "PUBLISHED" } }),
    db.post.count({ where: { status: "DRAFT" } }),
    db.post.count({ where: { status: "SCHEDULED" } }),
    db.page.count(),
    db.service.count(),
    db.mediaAsset.aggregate({ _count: true, _sum: { bytes: true } }),
    db.post.findMany({
      where: { status: "PUBLISHED" },
      include: { author: { select: { name: true } } },
      orderBy: { publishedAt: "desc" },
      take: 4,
    }),
    db.activityLog.findMany({
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    db.page.count({ where: { status: "PUBLISHED", seo: { is: null } } }),
    db.post.count({ where: { status: "PUBLISHED", seo: { is: null } } }),
  ]);
}

export default async function AdminDashboardPage() {
  const db = getPrisma();

  if (!db) {
    return (
      <div>
        <div className="admin-page-heading">
          <div>
            <p className="admin-kicker">CONTENT STUDIO</p>
            <h1>Dashboard</h1>
            <p>Manage your website from one calm, clear workspace.</p>
          </div>
        </div>
        <SetupNotice message="DATABASE_URL is not set. CMS records are not available until a PostgreSQL database is connected." />
      </div>
    );
  }

  let dashboardData: Awaited<ReturnType<typeof loadDashboardData>>;
  try {
    dashboardData = await loadDashboardData(db);
  } catch {
    return (
      <div>
        <div className="admin-page-heading">
          <div>
            <p className="admin-kicker">CONTENT STUDIO</p>
            <h1>Dashboard</h1>
          </div>
        </div>
        <SetupNotice message="The database connection is not ready or its migrations have not been applied. No sample or placeholder content is shown." />
      </div>
    );
  }

  const [
    publishedPosts,
    draftPosts,
    scheduledPosts,
    pageCount,
    serviceCount,
    media,
    recentPosts,
    activity,
    pagesNeedSeo,
    postsNeedSeo,
  ] = dashboardData;

  const metrics = [
    { label: "Published posts", value: publishedPosts, icon: FilePenLine },
    { label: "Drafts", value: draftPosts, icon: FilePenLine },
    { label: "Scheduled", value: scheduledPosts, icon: FilePenLine },
    { label: "Website pages", value: pageCount, icon: Globe2 },
    { label: "Services", value: serviceCount, icon: Globe2 },
    {
      label: "Media library",
      value: `${media._count} · ${formatBytes(media._sum.bytes)}`,
      icon: Image,
    },
  ];

  return (
    <div>
      <div className="admin-page-heading admin-dashboard-heading">
        <div>
          <p className="admin-kicker">TIRTHVAANI CONTENT STUDIO</p>
          <h1>Dashboard</h1>
          <p>Good work starts with a clear view of what needs attention.</p>
        </div>
        <div className="admin-quick-actions">
          <Link className="admin-secondary-button" href="/admin/pages/new">
            <Plus size={16} /> New page
          </Link>
          <Link className="admin-primary-button" href="/admin/posts/new">
            <Plus size={16} /> New post
          </Link>
        </div>
      </div>

      <section className="admin-metric-grid" aria-label="Content overview">
        {metrics.map(({ label, value, icon: Icon }) => (
          <article className="admin-metric-card" key={label}>
            <span className="admin-metric-icon">
              <Icon size={17} />
            </span>
            <p>{label}</p>
            <strong>{value}</strong>
          </article>
        ))}
      </section>

      {(pagesNeedSeo > 0 || postsNeedSeo > 0) && (
        <Link href="/admin/seo" className="admin-attention-banner">
          <span>
            <strong>SEO needs attention</strong>
            <small>
              {pagesNeedSeo + postsNeedSeo} published items need SEO metadata.
            </small>
          </span>
          <ArrowRight size={18} />
        </Link>
      )}

      <div className="admin-dashboard-grid">
        <section className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-kicker">LATEST</p>
              <h2>Recently published</h2>
            </div>
            <Link href="/admin/posts">All posts</Link>
          </div>
          {recentPosts.length ? (
            <div className="admin-list">
              {recentPosts.map((post) => (
                <Link
                  href={`/admin/posts/${post.id}`}
                  className="admin-list-row"
                  key={post.id}
                >
                  <span>
                    <strong>{post.title}</strong>
                    <small>By {post.author.name}</small>
                  </span>
                  <span className="admin-row-date">
                    {post.publishedAt?.toLocaleDateString() ?? "Published"}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="admin-empty-state">
              No published posts yet. Draft a useful guide for the journey.
            </p>
          )}
        </section>

        <section className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-kicker">RECENT CHANGES</p>
              <h2>Activity</h2>
            </div>
            <Link href="/admin/activity">View log</Link>
          </div>
          {activity.length ? (
            <div className="admin-list">
              {activity.map((entry) => (
                <div className="admin-list-row" key={entry.id}>
                  <span>
                    <strong>{entry.summary}</strong>
                    <small>{entry.user?.name ?? "System"}</small>
                  </span>
                  <span className="admin-row-date">
                    {entry.createdAt.toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="admin-empty-state">
              Activity will appear here as content is created and updated.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
