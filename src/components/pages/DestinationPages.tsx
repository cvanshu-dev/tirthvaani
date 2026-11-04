import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { CTASection } from "../sections/CTASection";
import { Eyebrow, SectionHeading, ImageBlock } from "../shared";

type DestinationService = {
  title: string;
  slug: string;
  description: string;
  location: string;
};

export function DestinationPage({
  name,
  data,
}: {
  name: string;
  data: {
    subtitle: string;
    intro: string;
    body: string;
    places: string[];
    services: DestinationService[];
  };
}) {
  const title = name[0].toUpperCase() + name.slice(1);

  return (
    <main>
      <section className="page-hero">
        <ImageBlock src="/hero.jpg" alt={`Sacred landscape in ${title}`} />
        <div className="hero-shade" />
        <div className="page-hero-copy">
          <Eyebrow>A SACRED PLACE · INDIA</Eyebrow>
          <h1>
            {title}
            <br />
            <em>{data.subtitle}</em>
          </h1>
          <p>{data.intro}</p>
        </div>
      </section>
      <div className="breadcrumbs">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/destinations">Destinations</Link>
        <span>/</span>
        {title}
      </div>
      <section className="destination-story section-pad">
        <div>
          <Eyebrow>THE SPIRIT OF {title.toUpperCase()}</Eyebrow>
          <h2>
            More than a place
            <br />
            on a <em>map.</em>
          </h2>
        </div>
        <p>{data.body}</p>
      </section>
      <section className="landmarks section-pad">
        <SectionHeading
          eyebrow="A FEW PLACES TO KNOW"
          title="Landmarks and sacred spaces."
        />
        <div className="landmark-grid">
          {data.places.map((p, i) => (
            <div key={p}>
              <span>0{i + 1}</span>
              <h3>{p}</h3>
              <p>
                Confirm current access, timings and local guidance before your
                visit.
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="travel-note">
        <Clock3 />
        <div>
          <h3>Plan with the day in mind.</h3>
          <p>
            Travel times, opening hours, river access and seasonal conditions
            can change. Check current local information before setting out.
          </p>
        </div>
      </section>
      <section className="services section-pad">
        <SectionHeading
          eyebrow="RITUALS IN THIS REGION"
          title="Ways to mark the moment."
        />
        <div className="service-list">
          {data.services.map((service, index) => (
            <Link
              href={`/services/${service.slug}`}
              className="service-row"
              key={service.slug}
            >
              <span className="service-index">0{index + 1}</span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
              <span className="service-place">{service.location}</span>
              <ArrowUpRight size={19} />
            </Link>
          ))}
        </div>
      </section>
      <CTASection />
    </main>
  );
}
