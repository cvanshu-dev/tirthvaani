
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";

type RitualBlogCardProps = {
  href: string;
  image?: string | null;
  category?: string;
  title: string;
  excerpt?: string | null;
  date?: string | null;
  readingTime?: number | null;
  index: number;
};

export function RitualBlogCard({
  href,
  image,
  category = "RITUALS & TRADITIONS",
  title,
  excerpt,
  date,
  readingTime,
  index,
}: RitualBlogCardProps) {
  return (
    <Link href={href} className="ritual-card">
      <article className="ritual-card-inner">

        {/* Ornamental border */}
        <span className="ritual-frame-corner corner-tl" />
        <span className="ritual-frame-corner corner-tr" />
        <span className="ritual-frame-corner corner-bl" />
        <span className="ritual-frame-corner corner-br" />

        {/* Image */}
        <div className="ritual-card-image">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1050px) 50vw, 33vw"
              className="ritual-card-photo"
            />
          ) : (
            <div className="ritual-card-placeholder">
              <span>ॐ</span>
              <p>TIRTHVAANI</p>
            </div>
          )}

          <div className="ritual-image-overlay" />

          <div className="ritual-card-number">
            <span>ARTICLE</span>
            <strong>{String(index).padStart(2, "0")}</strong>
          </div>

          <span className="ritual-image-category">{category}</span>
        </div>

        {/* Content */}
        <div className="ritual-card-body">

          <div className="ritual-card-heading">
            <span className="ritual-title-ornament">✦</span>
            <h3>{title}</h3>
            <span className="ritual-title-ornament">✦</span>
          </div>

          <p className="ritual-card-excerpt">
            {excerpt ||
              "Discover the significance, traditions and sacred practices behind this ancient ritual."}
          </p>

          <div className="ritual-card-bottom">
            <div className="ritual-card-details">
              {date && <span>{date}</span>}

              {date && readingTime && <span className="ritual-meta-dot">·</span>}

              {readingTime && (
                <span className="ritual-reading-time">
                  <Clock3 size={12} />
                  {readingTime} MIN
                </span>
              )}
            </div>

            <span className="ritual-card-link">
              EXPLORE ARTICLE
              <span className="ritual-card-arrow">
                <ArrowUpRight size={16} />
              </span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
