import Image from "next/image";
import { getPrisma } from "@/lib/prisma";

export async function CmsTestimonials({
  heading = "A few words from pilgrims",
}: {
  heading?: string;
}) {
  const db = getPrisma();
  if (!db) return null;
  const items = await db.testimonial.findMany({
    where: { visible: true },
    orderBy: [{ featured: "desc" }, { position: "asc" }, { createdAt: "desc" }],
    take: 6,
  });
  if (!items.length) return null;
  return (
    <section className="cms-testimonials section-pad">
      <div className="cms-testimonials-heading">
        <p className="eyebrow">
          <i />
          PILGRIM STORIES
        </p>
        <h2>{heading}</h2>
      </div>
      <div className="cms-testimonials-grid">
        {items.map((item) => (
          <blockquote key={item.id}>
            {item.rating && (
              <span
                className="cms-testimonial-rating"
                aria-label={`${item.rating} out of 5 stars`}
              >
                {"★".repeat(item.rating)}
              </span>
            )}
            <p>“{item.quote}”</p>
            <footer>
              {item.imageUrl && (
                <Image
                  src={item.imageUrl}
                  alt=""
                  width={42}
                  height={42}
                  unoptimized
                />
              )}
              <span>
                <strong>{item.name}</strong>
                {item.location && <small>{item.location}</small>}
              </span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
