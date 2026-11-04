import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading, PhotoCard } from "../../shared";

const destinations = [
  {
    title: "Varanasi",
    slug: "varanasi",
    image: "/hero.jpg",
    kicker: "THE CITY OF LIGHT",
  },
  {
    title: "Gaya",
    slug: "gaya",
    image: "/hero.jpg",
    kicker: "A PLACE OF REMEMBRANCE",
  },
  {
    title: "Prayagraj",
    slug: "prayagraj",
    image: "/hero.jpg",
    kicker: "AT THE CONFLUENCE",
  },
];

export function DestinationsSection() {
  return (
    <section className="destinations section-pad">
      <div className="split-heading">
        <SectionHeading
          eyebrow="THREE SACRED CITIES"
          title="Each place holds its own story."
        />
        <Link className="text-link" href="/destinations">
          Explore all destinations <ArrowUpRight size={15} />
        </Link>
      </div>
      <div className="destination-grid">
        {destinations.map((destination) => (
          <PhotoCard
            key={destination.slug}
            item={destination}
            base="/destinations"
          />
        ))}
      </div>
    </section>
  );
}
