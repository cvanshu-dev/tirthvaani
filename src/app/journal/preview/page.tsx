import Image from "next/image";
import Link from "next/link";
import { Contact } from "@/components/pages/ContactPage";

export default function JournalPreviewPage() {
  return (
    <>
      <main className="heritage-post-page">
        <div className="heritage-post-orbit heritage-post-orbit-one" />
        <div className="heritage-post-orbit heritage-post-orbit-two" />

        <nav className="heritage-post-breadcrumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/journal">Journal</Link>
          <span>/</span>
          <span>Pitrukaryas in Varanasi</span>
        </nav>

        <article className="heritage-post">
          <header className="heritage-post-header">
            <p className="heritage-post-eyebrow">
              OUR HERITAGE <span>·</span> OUR FAITH
            </p>

            <h1>
              Pitrukaryas in
              <em> Varanasi.</em>
            </h1>

            <div className="heritage-post-divider">
              <span />
              <b>◆</b>
              <span />
            </div>

            <p className="heritage-post-intro">
              A thoughtful guide to ancestral remembrance, sacred observances,
              and the timeless spiritual character of Kashi.
            </p>
          </header>

<section className="heritage-post-feature">
  <div className="heritage-post-flow">
    <div className="heritage-post-feature-image">
      <Image
        src="/pitru-rituals.webp"
        alt="Pitru Karya ritual being performed in Varanasi"
        width={1000}
        height={1100}
        priority
      />
    </div>

    <p>
      For many Hindu families, Pitru Karya is a way to remember ancestors and
      express gratitude for the generations before them. Varanasi, also known
      as Kashi, has been an important place of pilgrimage for centuries.
      Families come to the city to perform ancestral observances by the Ganga
      and to seek guidance from a priest familiar with their tradition. The
      customs followed can vary by region, family, community, and occasion.
      This guide offers general context and does not replace guidance from your
      family priest. Kashi holds a special place in many religious traditions
      as a city of pilgrimage and liberation. Families visit the river and
      ghats to honour their ancestors. Beliefs and practices differ, so every
      family may approach the observance in its own way. Pind Daan is an
      offering made in remembrance of ancestors, while Shraddha is an
      observance of respect and remembrance. Every family follows its own
      tradition, so guidance from a trusted priest remains important.
      For many Hindu families, Pitru Karya is a way to remember ancestors and
      express gratitude for the generations before them. Varanasi, also known
      as Kashi, has been an important place of pilgrimage for centuries.
      Families come to the city to perform ancestral observances by the Ganga
      and to seek guidance from a priest familiar with their tradition. The
      customs followed can vary by region, family, community, and occasion.
      This guide offers general context and does not replace guidance from your
      family priest. Kashi holds a special place in many religious traditions
      as a city of pilgrimage and liberation. Families visit the river and
      ghats to honour their ancestors. Beliefs and practices differ, so every
      family may approach the observance in its own way. Pind Daan is an
      offering made in remembrance of ancestors, while Shraddha is an
      observance of respect and remembrance. Every family follows its own
      tradition, so guidance from 
    </p>
  </div>
</section>

   
         
        </article>
      </main>

      <Contact hideHero />
    </>
  );
}