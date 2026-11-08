
import Image from "next/image";
import Link from "next/link";

import { AssignedPosts } from "@/components/content/AssignedPosts";

const devRitualImage = "/varanasi.webp";

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
          src="/pitru.webp"
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
                <strong>Devakaryas</strong> are sacred acts of
                worship performed to honour Hindu deities and
                seek their blessings. Rooted in the traditions
                of Sanatana Dharma, these ceremonies are an
                expression of <strong>Bhakti</strong> (devotion),
                faith, and gratitude towards the divine.
              </p>

              <p>
                In Hindu tradition, worship is an important
                part of everyday life. Devotees perform various
                pujas and religious ceremonies to seek divine
                blessings for good health, prosperity, peace,
                and the well-being of their families. These
                practices also offer an opportunity to express
                gratitude and strengthen one's spiritual
                connection.
              </p>

              <p>
                <strong>Varanasi, also known as Kashi</strong>,
                holds a special place in Hindu religious
                traditions. Considered one of the oldest
                continuously inhabited sacred cities, Kashi
                is home to numerous temples, shrines, and
                places of worship. Devotees from across the
                country visit this holy city to offer prayers
                and perform religious ceremonies.
              </p>

              <p>
                Hindu worship takes many forms, from simple
                daily prayers and traditional pujas to
                elaborate ceremonies performed on special
                occasions. Depending on the purpose of worship,
                devotees may offer prayers to their
                <strong> Ishta Devata</strong> (chosen deity),
                seek blessings from different forms of the
                divine, or observe specific religious rituals
                according to their family traditions.
              </p>

              <p>
                Some of the important forms of Devakarya
                include <strong>Rudrabhishek</strong>,
                <strong> Shiva Puja</strong>,
                <strong> Satyanarayan Katha</strong>,
                <strong> Ganesh Puja</strong>, and various
                other traditional ceremonies. Each puja
                has its own significance, procedure, and
                purpose, depending on the deity being
                worshipped and the devotee's requirements.
              </p>

              <p>
                Another important part of Hindu worship
                is <strong>Havan and Homam</strong>, in
                which sacred offerings are made into the
                consecrated fire while Vedic mantras are
                chanted. These ceremonies are traditionally
                performed to offer prayers, express devotion,
                and seek divine blessings. You can arrange
                these ceremonies through our{" "}
                <Link href="/book-pandits-for-puja-and-homam-in-varanasi">
                  Homam services in Varanasi
                </Link>
                .
              </p>

              <p>
                Performing Devakaryas in a sacred
                pilgrimage destination like Kashi holds
                special significance for many devotees.
                The city's spiritual atmosphere, ancient
                temples, and long-standing religious
                traditions make it an important destination
                for those wishing to perform pujas and
                seek the blessings of their chosen deities.
              </p>

              <p>
                At <strong>Tirthvaani</strong>, we help
                devotees arrange traditional Devakaryas
                in Varanasi by connecting them with
                experienced pandits and purohits. Whether
                you are planning a personal puja, a family
                ceremony, or a special religious occasion,
                we assist you in finding the right guidance
                and making the necessary arrangements.
              </p>

              <p>
                From selecting the appropriate ceremony
                to arranging the pandit and required
                samagri, our aim is to make your worship
                experience simple and convenient while
                respecting your religious beliefs and
                family traditions.
              </p>

              <p>
                Explore our other{" "}
                <Link href="/pandits-for-rituals-in-kashi">
                  religious rituals and services in Kashi
                </Link>
                {" "}and let Tirthvaani assist you in
                planning your sacred journey.
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
            "Discover Hindu traditions, sacred ceremonies, different forms of worship, pujas and the spiritual significance of performing rituals in Kashi.",
          emptyMessage:
            "New articles and guides about Devakaryas will appear here as they are published and assigned to this page.",
          viewAllHref: "/journal",
          viewAllLabel: "View all articles",
        }}
      />

    </main>
  );
}
