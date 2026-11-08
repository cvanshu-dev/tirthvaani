import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CTASection } from "../sections/CTASection";
import { Eyebrow } from "../shared";

type RitualCategory = {
  title: string;
  subtitle: string;
  description: string;
  imageAlt: string;
  rituals: string[];
};

export function RitualCategoryPage({
  category,
}: {
  category: RitualCategory;
}) {
  return (
    <main>
      <section className="ritual-listing-hero">
        <Image
          src="/hero.webp"
          alt={category.imageAlt}
          fill
          priority
          sizes="100vw"
          className="ritual-listing-image"
        />
        <div className="ritual-listing-shade" />
        <div className="ritual-listing-copy">
          <Eyebrow>{category.subtitle}</Eyebrow>
          <h1>{category.title}</h1>
          <p>{category.description}</p>
        </div>
      </section>

      <section className="ritual-listing-content section-pad">
        <Eyebrow>RITUALS IN THIS CATEGORY</Eyebrow>
        <h2>Find the observance that feels right for your family.</h2>
        <ul>
          {category.rituals.map((ritual) => (
            <li key={ritual}>{ritual}</li>
          ))}
        </ul>
        <p className="ritual-listing-note">
          Ritual names and procedures can vary by family and tradition. Speak
          with a knowledgeable purohit about the observance that is right for
          your circumstances.
        </p>
        <Link className="button button-dark" href="/contact">
          Ask us about a ritual
          <ArrowUpRight size={16} />
        </Link>
      </section>

      <CTASection />
    </main>
  );
}
