import Link from "next/link";
import { getPrisma } from "@/lib/prisma";

export async function CmsServiceEntries() {
  const db = getPrisma();
  if (!db) return null;
  const services = await db.service.findMany({
    where: { status: "PUBLISHED", publishedAt: { lte: new Date() } },
    select: { id: true, title: true, slug: true, summary: true },
    orderBy: { updatedAt: "desc" },
    take: 50,
  });
  if (!services.length) return null;
  return (
    <section className="cms-service-entries section-pad">
      <div className="article-grid">
        {services.map((service) => (
          <Link
            className="article-card"
            href={`/services/${service.slug}`}
            key={service.id}
          >
            <h3>{service.title}</h3>
            <p>{service.summary}</p>
            <span>Explore service ↗</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
