import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type PhotoCardItem = {
  title: string;
  slug: string;
  image: string;
  desc?: string;
  place?: string;
  description?: string;
  location?: string;
  kicker?: string;
};

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="eyebrow">
      <i />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="section-heading">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

export function ImageBlock({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`image-block ${className}`}
      style={{ backgroundImage: `url('${src}')` }}
      role="img"
      aria-label={alt}
    />
  );
}

export function PhotoCard({
  item,
  base,
}: {
  item: PhotoCardItem;
  base: string;
}) {
  return (
    <Link className="photo-card" href={`${base}/${item.slug}`}>
      <ImageBlock src={item.image} alt={`${item.title} in India`} />
      <span className="photo-shade" />
      <div className="photo-content">
        <Eyebrow>
          {item.location || item.place || item.kicker || "EXPLORE"}
        </Eyebrow>
        <h3>{item.title}</h3>
        {(item.description || item.desc) && (
          <p>{item.description || item.desc}</p>
        )}
        <span className="circle-arrow">
          <ArrowUpRight size={18} />
        </span>
      </div>
    </Link>
  );
}
