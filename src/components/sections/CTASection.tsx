import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow, ImageBlock } from "../shared";

export function CTASection() {
  return (
    <section className="cta">
      <ImageBlock src="/hero.webp" alt="Evening light along the Ganga" />
      <div className="cta-copy">
        <Eyebrow>BEGIN WITH A CONVERSATION</Eyebrow>
        <h2>Every meaningful journey begins with listening.</h2>
        <p>
          Tell us what brings you here. We’ll help you understand the next
          steps.
        </p>
        <Link href="/contact" className="button button-light">
          Speak with us
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
