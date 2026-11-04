
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { AssignedPosts } from "@/components/content/AssignedPosts";

const ritualImage =
  "https://www.tirthpurohit.org/public/upload/1774603598_WhatsApp-Image-2021-05-18-at-21.54.47-300x400.jpeg";

export function PitruRitualsPage() {
  return (
    <main className="pitru-page">

      {/* =====================================
          01. CINEMATIC HERO
      ===================================== */}

      <section className="pitru-hero-v2">

        <Image
          src="/hero.jpg"
          alt="Sacred spiritual rituals being performed in Varanasi"
          fill
          priority
          sizes="100vw"
          className="pitru-hero-v2-image"
        />

        <div className="pitru-hero-v2-overlay" />

        <div className="pitru-hero-v2-content">

          <span className="pitru-hero-v2-eyebrow">
            SACRED RITES OF ANCESTORS
          </span>

          <h1>
            Pitru Karya
            <em>in Varanasi</em>
          </h1>

          <p>
            Honour the souls of your ancestors through sacred
            Vedic rituals in the holy land of Kashi.
          </p>

          <Link
            href="/contact?interest=pitru-karya"
            className="pitru-hero-v2-button"
          >
            CONTACT NOW
            <ArrowUpRight size={17} />
          </Link>

        </div>
      </section>


      {/* =====================================
          02. PITRUKARYAS IN VARANASI
      ===================================== */}

      <section
        className="pitru-introduction"
        aria-labelledby="pitru-intro-heading"
      >

        <div className="pitru-introduction-container">

          {/* Editorial Section Heading */}

          <header className="pitru-introduction-heading">

            <span className="pitru-introduction-eyebrow">
              THE SACRED TRADITION OF ANCESTRAL WORSHIP
            </span>

            <h2 id="pitru-intro-heading">
              Pitrukaryas in Varanasi
            </h2>

            {/* Architectural Divider */}
            <div className="pitru-heading-divider">
              <span className="pitru-divider-line" />
              <span className="pitru-divider-diamond" />
              <span className="pitru-divider-line" />
            </div>

          </header>


          {/* Main Introduction */}

          <div className="pitru-introduction-grid">

            <div className="pitru-introduction-copy">

              <p className="pitru-opening-paragraph">
                It is said in <strong>Brahmavaivarta Puran</strong>{" "}
                that pitrukaryas (worship of ancestors) is considered
                to be more special in nature than devakaryas
                (worship of God). Hence, before performing{" "}
                <Link href="/dev-rituals">
                  devakaryas in Varanasi
                </Link>
                , one must first satisfy one&apos;s dead parents
                and ancestors.
              </p>

              <p>
                TirthVaani ensures the provision of experienced
                pandits for Pitru Karya in Varanasi. Having more
                than 500 years of experience in the field, we
                treat every devotee with importance and provide
                guidance rooted in traditional Vedic practices.
              </p>

              <p>
                In the sacred traditions of Sanatana Dharma,
                honoring one&apos;s ancestors is not merely a ritual
                but a sacred duty (<strong>Rina</strong>) that every
                individual carries from birth. The performance
                of Pitru Karya is believed to bring peace to the
                departed souls and remove ancestral obstacles
                (<strong>Pitru Dosha</strong>) from the lives of
                their descendants.
              </p>

              <p>
                When these rites are performed in the holy land
                of Varanasi, on the banks of the divine River
                Ganga, their spiritual potency is believed to
                multiply many times.
              </p>

              <p>
                Varanasi, also known as Kashi, is regarded as
                the city of liberation where countless sages,
                saints, and devotees have performed ancestral
                rites for thousands of years. Scriptures state
                that offerings made here reach the ancestors
                directly and help them attain higher realms
                and ultimate salvation.
              </p>

              <p>
                This is why pilgrims from across the country
                visit Kashi specifically for <strong>Pind Daan</strong>,
                <strong> Shraddha</strong>, <strong>Tarpanam</strong>,
                and other Pitru rituals.
              </p>

            </div>


            {/* Ritual Image */}

            <aside className="pitru-introduction-aside">

              <figure className="pitru-introduction-image-wrap">

                <div className="pitru-image-inner-frame">

                  <Image
                    src={ritualImage}
                    alt="Traditional ancestral rituals being performed in Varanasi"
                    width={600}
                    height={800}
                    unoptimized
                    className="pitru-introduction-image"
                  />

                </div>

                <figcaption>
                  <span className="pitru-caption-line" />
                  Sacred offerings performed in remembrance
                  <span className="pitru-caption-line" />
                </figcaption>

              </figure>

              <div className="pitru-image-note">
                <span className="pitru-note-symbol">॥</span>

                <p>
                  A sacred tradition passed through generations.
                </p>
              </div>

            </aside>

          </div>


          {/* =====================================
              SANSKRIT VERSE
          ===================================== */}

          <blockquote className="pitru-sacred-verse">

            <div className="pitru-verse-topline">
              <span />
              <span />
            </div>

            <span className="pitru-verse-label">
              FROM THE SACRED SCRIPTURES
            </span>

            <p className="pitru-verse-first">
              Devakaryadapi sada
              <br />
              pitrukaryam vishishyate
            </p>

            <p className="pitru-verse-second">
              Devatabhyo hi purvam
              <br />
              pitrunamapyayanam varam
            </p>

            <cite>
              — Brahmavaivarta Puran
            </cite>

            <div className="pitru-verse-bottomline">
              <span />
              <span />
            </div>

          </blockquote>

        </div>
      </section>


      {/* =====================================
          03. DYNAMIC BLOG ARTICLES
      ===================================== */}

      <AssignedPosts
        pageSlug="pitru-rituals"
      />

    </main>
  );
}
