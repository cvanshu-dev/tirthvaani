import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Flower2 } from "lucide-react";

export function RitualServices() {
  return (
    <section
      className="ritual-showcase"
      aria-label="Pandit and Purohit Services"
    >
      <div className="ritual-showcase-decoration ritual-decoration-top" />
      <div className="ritual-showcase-decoration ritual-decoration-bottom" />

      <div className="ritual-showcase-center">
        <span className="ritual-center-diamond" />
        <span className="ritual-center-line" />
        <span className="ritual-center-diamond ritual-center-diamond-bottom" />
      </div>

      <div className="ritual-showcase-leaf ritual-leaf-left" />
      <div className="ritual-showcase-leaf ritual-leaf-right" />

      <div className="ritual-layout-shell">
      <header className="ritual-layout-heading">
  <h2>
    <span>Best Pandit &amp; Purohit</span>
    <em>Services</em>
  </h2>

  <p>Varanasi (Kashi) · Gaya · Prayagraj</p>
</header>
        <div className="ritual-layout-grid">
          {/* Pitru Rituals Card */}
          <article className="ritual-showcase-card ritual-card-pitru">
            <div className="ritual-showcase-copy">
              <div className="ritual-showcase-symbol">
                <Flower2 size={43} strokeWidth={1.15} />
              </div>

              <div className="ritual-small-divider">
                <span />
                <i />
                <span />
              </div>

              <h3>
                <span>Pitru</span>
                <em>Rituals</em>
              </h3>

              <p>
                Sacred rites for the peace, liberation and blessings of our
                ancestors.
              </p>

              <Link
                href="/pitru-rituals"
                className="ritual-showcase-button"
              >
                <span>Explore Pitru Rituals</span>
                <ArrowUpRight size={20} strokeWidth={1.6} />
              </Link>

              <div className="ritual-copy-leaf" />
            </div>

            <Link
              href="/pitru-rituals"
              className="ritual-showcase-image"
              aria-label="Explore Pitru Rituals"
            >
              <Image
                src="/pitru-rituals.png"
                alt="Traditional Pitru rituals beside the River Ganga"
                fill
                sizes="(max-width: 850px) 100vw, 50vw"
                priority
              />

              <span className="ritual-showcase-image-shade" />
            </Link>
          </article>

          {/* Dev Rituals Card */}
          <article className="ritual-showcase-card ritual-card-dev">
            <div className="ritual-showcase-copy">
              <div className="ritual-showcase-symbol">
                <span className="ritual-om-symbol">ॐ</span>
              </div>

              <div className="ritual-small-divider">
                <span />
                <i />
                <span />
              </div>

              <h3>
                <span>Dev</span>
                <em>Rituals</em>
              </h3>

              <p>
                Vedic worship and sacred ceremonies to seek the grace of the
                divine.
              </p>

              <Link href="/dev-rituals" className="ritual-showcase-button">
                <span>Explore Dev Rituals</span>
                <ArrowUpRight size={20} strokeWidth={1.6} />
              </Link>

              <div className="ritual-copy-leaf" />
            </div>

            <Link
              href="/dev-rituals"
              className="ritual-showcase-image"
              aria-label="Explore Dev Rituals"
            >
              <Image
                src="/dev-rituals.jpg"
                alt="Traditional Hindu temple during the golden hour"
                fill
                sizes="(max-width: 850px) 100vw, 50vw"
                priority
              />

              <span className="ritual-showcase-image-shade" />
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}