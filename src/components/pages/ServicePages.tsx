import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { CTASection } from "../sections/CTASection";
import { Eyebrow, SectionHeading, ImageBlock, PhotoCard } from "../shared";

type ServiceDetail = {
  title: string;
  kicker: string;
  lead: string;
  image: string;
  place: string;
  significance: string;
  procedure: string;
  prepare: string;
  faqs: string[];
};

type RelatedService = {
  title: string;
  slug: string;
};

export function Listing({
  title,
  intro,
  items,
  base,
  kicker,
}: {
  title: string;
  intro: string;
  items: {
    title: string;
    slug: string;
    image: string;
    desc?: string;
    place?: string;
    kicker?: string;
  }[];
  base: string;
  kicker: string;
}) {
  return (
    <main>
      <section className="page-hero">
        <ImageBlock src="/hero.jpg" alt={title} />
        <div className="hero-shade" />
        <div className="page-hero-copy">
          <Eyebrow>{kicker}</Eyebrow>
          <h1>
            {title.split(" ").slice(0, -1).join(" ")}
            <br />
            <em>{title.split(" ").at(-1)}</em>
          </h1>
          <p>{intro}</p>
        </div>
      </section>
      <section className="listing section-pad">
        <SectionHeading eyebrow="EXPLORE" title="A place to begin." />
        <div className="listing-grid">
          {items.map((item) => (
            <PhotoCard key={item.slug} item={item} base={base} />
          ))}
        </div>
      </section>
      <CTASection />
    </main>
  );
}
export function DetailPage({
  data,
  related,
}: {
  data: ServiceDetail;
  related: RelatedService[];
}) {
  return (
    <main>
      <section className="page-hero">
        <ImageBlock src={data.image} alt={data.title} />
        <div className="hero-shade" />
        <div className="page-hero-copy">
          <Eyebrow>{data.kicker}</Eyebrow>
          <h1>
            {data.title.split(" ")[0]}
            <br />
            <em>{data.title.split(" ").slice(1).join(" ")}</em>
          </h1>
          <p>{data.lead}</p>
        </div>
      </section>
      <div className="breadcrumbs">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/services">Rituals</Link>
        <span>/</span>
        {data.title}
      </div>
      <section className="detail-intro section-pad">
        <Eyebrow>THE MEANING</Eyebrow>
        <h2>{data.significance}</h2>
        <div className="detail-aside">
          <MapPin size={17} />
          <span>
            Often observed in
            <br />
            <strong>{data.place}</strong>
          </span>
        </div>
      </section>
      <section className="detail-body section-pad">
        <div>
          <Eyebrow>WHAT TO EXPECT</Eyebrow>
          <h2>
            A moment shaped
            <br />
            by <em>your tradition.</em>
          </h2>
        </div>
        <div className="detail-copy">
          <h3>The observance</h3>
          <p>{data.procedure}</p>
          <h3>Before you travel</h3>
          <p>{data.prepare}</p>
          <h3>A note on tradition</h3>
          <p>
            Practices differ by family, community and priest. This guide offers
            general context, not a substitute for advice from your family’s own
            spiritual guide.
          </p>
        </div>
      </section>
      <section className="faq section-pad">
        <SectionHeading
          eyebrow="QUESTIONS YOU MAY HAVE"
          title="A few things to consider."
        />
        <div className="faq-list">
          {data.faqs.map((q, i) => (
            <details key={q}>
              <summary>
                <span>0{i + 1}</span>
                {q}
                <span>+</span>
              </summary>
              <p>
                Practices and arrangements vary by family and location. Share
                your circumstances and any traditions you wish to follow with
                the priest before confirming details.
              </p>
            </details>
          ))}
        </div>
      </section>
      <section className="related section-pad">
        <SectionHeading
          eyebrow="CONTINUE EXPLORING"
          title="Other observances."
        />
        <div className="related-list">
          {related.slice(0, 2).map((o) => (
            <Link href={`/services/${o.slug}`} key={o.slug}>
              <span>{o.title}</span>
              <ArrowUpRight />
            </Link>
          ))}
        </div>
      </section>
      <CTASection />
    </main>
  );
}
