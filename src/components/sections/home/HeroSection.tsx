import Link from "next/link";
import {
  ArrowUpRight,
  ClipboardCheck,
  HandHeart,
  ReceiptText,
  UsersRound,
} from "lucide-react";
import { Eyebrow, ImageBlock } from "../../shared";

const trustPoints = [
  {
    title: "Gotra-Specific Purohit",
    description:
      "Experienced purohits selected for your family’s Gotra, traditions and ritual needs.",
    Icon: UsersRound,
  },
  {
    title: "No Hidden Charges",
    description:
      "See a clear breakdown of every expense before you confirm.",
    Icon: ReceiptText,
  },
  {
    title: "End-to-End Support",
    description:
      "Assistance from your first consultation through booking and ritual completion.",
    Icon: HandHeart,
  },
  {
    title: "Dedicated Ritual Monitoring",
    description:
      "Supervision throughout the ceremony to keep each step correct and on time.",
    Icon: ClipboardCheck,
  },
];

export function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <ImageBlock
        src="/hero.jpg"
        alt="The Ganga and the ghats of Varanasi at first light"
      />

      <div className="hero-shade" />

      <div className="hero-copy">
        <Eyebrow>A MORE THOUGHTFUL PILGRIMAGE</Eyebrow>

        <h1 id="hero-title">
          Tirth<em>Vaani</em>
        </h1>

        <p>
          Thoughtful guidance for the moments, places and rituals that bring us
          closer to what matters.
        </p>

        <Link href="/destinations" className="button button-light">
          Find your sacred place
          <ArrowUpRight size={16} />
        </Link>
      </div>

      <div className="hero-trust" aria-label="How we support your pilgrimage">
        {trustPoints.map(({ title, description, Icon }) => (
          <article className="hero-trust-item" key={title}>
            <div className="hero-trust-heading">
              <Icon size={17} strokeWidth={1.5} aria-hidden="true" />
              <h2>{title}</h2>
            </div>
            <p>{description}</p>
          </article>
        ))}
      </div>

      <div className="hero-side">वाराणसी&nbsp; · &nbsp;काशी</div>

    

     
    </section>
  );
}
