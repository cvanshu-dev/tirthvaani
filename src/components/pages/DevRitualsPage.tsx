
import Image from "next/image";
import Link from "next/link";

import { AssignedPosts } from "@/components/content/AssignedPosts";

const devRitualImage =
  "https://www.tirthpurohit.org/public/upload/1774603663_WhatsApp-Image-2021-05-18-at-23.00.13_(1).jpeg";

export function DevRitualsPage() {
  return (
    <main className="pitru-page dev-page">

      {/* =====================================
          01. SIMPLE CINEMATIC HERO
      ===================================== */}

      <section
        className="pitru-hero-v2 dev-hero-simple"
        aria-labelledby="dev-hero-title"
      >
        <Image
          src="/hero.jpg"
          alt="Sacred Hindu worship and spiritual ceremonies in Varanasi"
          fill
          priority
          sizes="100vw"
          className="pitru-hero-v2-image"
        />

        <div className="pitru-hero-v2-overlay" />

        <div className="dev-hero-simple-content">
          <h1 id="dev-hero-title">
            Devakaryas <em>in Varanasi</em>
          </h1>
        </div>
      </section>


      {/* =====================================
          02. DEVAKARYAS INTRODUCTION
      ===================================== */}

      <section
        className="pitru-introduction"
        aria-labelledby="dev-intro-heading"
      >
        <div className="pitru-introduction-container">

          {/* Section Heading */}

          <header className="pitru-introduction-heading">

            <span className="pitru-introduction-eyebrow">
              THE PATH OF DEVOTION &amp; DIVINE WORSHIP
            </span>

            <h2 id="dev-intro-heading">
              Devakaryas in Varanasi
            </h2>

            {/* Architectural Divider */}

            <div className="pitru-heading-divider">
              <span className="pitru-divider-line" />
              <span className="pitru-divider-diamond" />
              <span className="pitru-divider-line" />
            </div>

          </header>


          {/* Main Content */}

          <div className="pitru-introduction-grid">

            <div className="pitru-introduction-copy">

              <p className="pitru-opening-paragraph">
                <strong>Devakaryas</strong> is an act of religious
                devotion usually directed to one or more deities
                in Hindu religion. A sense of <strong>Bhakti</strong>,
                or devotional love, is generally invoked. This
                term Bhakti is the most prominent aspect of
                Hinduism.
              </p>

              <p>
                Devakaryas in Varanasi are performed in order
                to receive blessings from the gods and to achieve
                goodwill for the self, family, community, and
                society as a whole. In fact, Hindus believe in
                the notion of <strong>Vasudhaiva Kutumbakam</strong>,
                that the entire world is one family.
              </p>

              <p>
                Worship is not confined to any place of worship;
                it also incorporates personal reflection, art
                forms, and group devotion.
              </p>

              <p>
                Hindus usually perform worship to achieve some
                specific end or to integrate the body, the mind,
                and the spirit in order to help the performer
                evolve into a higher being. At TirthVaani, we
                strive to connect devotees with experienced
                pandits for Devakaryas in Varanasi, ensuring
                traditional practices and attentive services.
              </p>

              <p>
                Within Hinduism, a large number of personal
                gods (<strong>Ishta Devatas</strong>) are worshipped
                as idols. These beings may be the supreme
                Brahman, Tridevas, Devis, or significantly
                powerful entities known as Devas.
              </p>

              <p>
                You can worship and offer your prayers to these
                deities by performing Homam with experienced
                priests through our{" "}
                <Link href="/book-pandits-for-puja-and-homam-in-varanasi">
                  Homam services in Varanasi
                </Link>
                . The exact nature of belief regarding each
                deity varies between different philosophies.
              </p>

              <p>
                These deities may be different, but they are
                generally considered forms of the one God
                (<strong>Brahman</strong>). These deities and
                their Pujas provide one of the ways to
                communicate with this divine presence.
              </p>

              <p>
                Devakaryas in religious and sacred Tirthas
                are considered even more fruitful because
                these places are believed to be blessed with
                divinity all around. Devakaryas should be
                performed by every person, from whichever
                part of the country they belong to.
              </p>

              <p>
                At TirthVaani, we make sure you receive the
                services you are looking for. We provide
                experienced purohits for Devakaryas in
                Varanasi, along with other{" "}
                <Link href="/pandits-for-rituals-in-kashi">
                  rituals in Kashi
                </Link>
                {" "}and religious services.
              </p>

            </div>


            {/* Ritual Photograph */}

            <aside className="pitru-introduction-aside">

              <figure className="pitru-introduction-image-wrap">

                <div className="pitru-image-inner-frame">

                  <Image
                    src={devRitualImage}
                    alt="Traditional Hindu Devakarya worship performed in Varanasi"
                    width={600}
                    height={800}
                    unoptimized
                    className="pitru-introduction-image"
                  />

                </div>

                <figcaption>
                  Devotion and worship in the sacred city of Kashi.
                </figcaption>

              </figure>


              {/* Devotional Note */}

              <div className="pitru-image-note">

                <span className="pitru-note-symbol">
                  ॥
                </span>

                <p>
                  Through Bhakti, devotees seek a deeper
                  connection with the divine.
                </p>

              </div>

            </aside>

          </div>


          {/* =====================================
              03. DEVOTIONAL CALLOUT
          ===================================== */}

          <div className="dev-sacred-callout">

            <span className="dev-callout-eyebrow">
              THE SPIRIT OF HINDU TRADITION
            </span>

            <h3>
              Vasudhaiva Kutumbakam
            </h3>

            <p>
              The entire world is one family.
            </p>

            <div className="dev-callout-divider">
              <span />
              <i />
              <span />
            </div>

            <span className="dev-callout-caption">
              A timeless expression of unity, compassion and
              universal goodwill.
            </span>

          </div>

        </div>
      </section>


      {/* =====================================
          04. DYNAMIC DEVAKARYA BLOG ARTICLES
      ===================================== */}

      <AssignedPosts
        pageSlug="dev-rituals"
        editorial={{
          eyebrow: "KNOWLEDGE & DIVINE TRADITIONS",
          heading: "Explore the World of Devakaryas",
          description:
            "Discover Hindu traditions, sacred ceremonies, deities, pujas and the spiritual significance of worship in Kashi.",
          emptyMessage:
            "New articles and guides about Devakaryas will appear here as they are published and assigned to this page.",
          viewAllHref: "/journal",
          viewAllLabel: "View all articles",
        }}
      />

    </main>
  );
}
