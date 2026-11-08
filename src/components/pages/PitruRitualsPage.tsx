
import Image from "next/image";
import Link from "next/link";

import { AssignedPosts } from "@/components/content/AssignedPosts";

const pitruRitualImage = "/pitru-rituals.webp";

export function PitruRitualsPage() {
  return (
    <main className="pitru-page">

      {/* =====================================
          01. SIMPLE CINEMATIC HERO
      ===================================== */}

      <section
        className="pitru-hero-v2 dev-hero-simple"
        aria-labelledby="pitru-hero-title"
      >
        <Image
          src="/pitru.webp"
          alt="Sacred ancestral rituals performed on the banks of the Ganga in Varanasi"
          fill
          priority
          sizes="100vw"
          className="pitru-hero-v2-image"
        />

        <div className="pitru-hero-v2-overlay" />

        <div className="dev-hero-simple-content">
          <h1 id="pitru-hero-title">
            Pitru Karya <em>in Varanasi</em>
          </h1>
        </div>
      </section>


      {/* =====================================
          02. PITRU KARYA INTRODUCTION
      ===================================== */}

      <section
        className="pitru-introduction"
        aria-labelledby="pitru-intro-heading"
      >
        <div className="pitru-introduction-container">

          {/* Section Heading */}

          <header className="pitru-introduction-heading">

            <span className="pitru-introduction-eyebrow">
              HONOURING ANCESTORS &amp; PRESERVING TRADITIONS
            </span>

            <h2 id="pitru-intro-heading">
              Pitru Karya in Varanasi
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
    <strong>Pitru Karya</strong> refers to the sacred rituals
    performed in remembrance of departed parents and ancestors.
    In Sanatana Dharma, honouring one's ancestors is considered
    an important duty. These rituals express gratitude for
    those who came before us and are performed with prayers
    for the peace and well-being of their souls.
  </p>

  <p>
    <strong>Varanasi, also known as Kashi</strong>, holds a
    special place in the performance of ancestral rituals.
    Situated along the holy River Ganga, this ancient city
    has been a sacred destination for devotees who come
    to perform Pitru Karya and fulfil their family traditions.
  </p>

  <p>
    According to Hindu beliefs, performing ancestral rituals
    in Kashi is considered especially auspicious. Devotees
    believe that these ceremonies help bring peace to
    departed souls and seek their blessings for future
    generations.
  </p>

  <p>
    In Hindu tradition, every individual carries a
    responsibility towards their ancestors, known as
    <strong> Pitru Rina</strong>. Performing Pitru Karya
    is one way of acknowledging this responsibility
    through prayers, offerings, and remembrance.
    These rituals are also traditionally associated
    with addressing <strong>Pitru Dosha</strong>.
  </p>

  <p>
    Some of the important ancestral ceremonies performed
    in Varanasi include <strong>Pind Daan</strong>,
    <strong> Shraddha</strong>, <strong>Tarpan</strong>,
    and <strong>Tripindi Shraddha</strong>. Each ritual
    has its own religious significance and is performed
    according to specific customs and family traditions.
  </p>

  <p>
    These ceremonies involve sacred offerings, prayers,
    and Vedic rituals performed under the guidance of
    experienced pandits. The procedures may differ
    depending on the ceremony, family traditions,
    and individual requirements.
  </p>

  <p>
    At <strong>Tirthvaani</strong>, we help devotees
    arrange Pitru Karya in Varanasi by connecting them
    with experienced pandits. We assist with understanding
    your requirements and arranging the necessary rituals
    so that you can focus on the spiritual purpose
    of your visit.
  </p>

  <p>
    Whether you wish to perform Pind Daan, Shraddha,
    Tarpan, or other ancestral ceremonies, Tirthvaani
    helps make the process simple and convenient,
    while respecting your family's religious traditions.
  </p>

  <p>
    You can also explore our{" "}
    <Link href="/dev-rituals">
      Devakarya services in Varanasi
    </Link>
    {" "}for other sacred Hindu worship and ceremonies
    in Kashi.
  </p>

</div>



            {/* Ritual Photograph */}

            <aside className="pitru-introduction-aside">

              <figure className="pitru-introduction-image-wrap">

                <div className="pitru-image-inner-frame">

                  <Image
                    src={pitruRitualImage}
                    alt="Traditional Pind Daan offerings with flowers and sacred vessels in Varanasi"
                    width={600}
                    height={800}
                    className="pitru-introduction-image"
                  />

                </div>

                <figcaption>
                  Ancestral offerings in the sacred city of Kashi.
                </figcaption>

              </figure>


              {/* Devotional Note */}

              <div className="pitru-image-note">

                <span className="pitru-note-symbol">
                  ॥
                </span>

                <p>
                  Remembering our ancestors with gratitude,
                  devotion, and sacred traditions.
                </p>

              </div>

            </aside>

          </div>


          {/* =====================================
              03. SACRED CALLOUT
          ===================================== */}

          <div className="dev-sacred-callout">

            <span className="dev-callout-eyebrow">
              THE SPIRIT OF PITRU KARYA
            </span>

            <h3>
              Pitru Devo Bhava
            </h3>

            <p>
              Honour those who came before us.
            </p>

            <div className="dev-callout-divider">
              <span />
              <i />
              <span />
            </div>

            <span className="dev-callout-caption">
              A timeless tradition of gratitude, remembrance,
              and respect for our ancestors.
            </span>

          </div>

        </div>
      </section>


      {/* =====================================
          04. DYNAMIC PITRU KARYA BLOG ARTICLES
      ===================================== */}

      <AssignedPosts
        pageSlug="pitru-rituals"
        editorial={{
          eyebrow: "ANCESTRAL RITUALS & SACRED TRADITIONS",
          heading: "Explore the World of Pitru Karya",
          description:
            "Learn about Pind Daan, Shraddha, Tarpan and other ancestral rituals, their significance and the traditions followed in the sacred city of Kashi.",
          emptyMessage:
            "New articles and guides about Pitru Karya will appear here as they are published and assigned to this page.",
          viewAllHref: "/journal",
          viewAllLabel: "View all articles",
        }}
      />

    </main>
  );
}
