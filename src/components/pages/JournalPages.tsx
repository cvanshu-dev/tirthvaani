import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { JournalBrowser } from "@/components/site";
import { CTASection } from "../sections/CTASection";
import { Eyebrow, SectionHeading, ImageBlock } from "../shared";

const articles = [
  {
    title: "A first visit to Varanasi: what to know",
    slug: "first-visit-varanasi",
    category: "Travel notes",
    time: "6 min read",
    image: "/hero.jpg",
  },
  {
    title: "Pind Daan: meaning, setting and preparation",
    slug: "pind-daan-meaning",
    category: "Ritual & remembrance",
    time: "7 min read",
    image: "/hero.jpg",
  },
  {
    title: "The quiet significance of the Triveni Sangam",
    slug: "triveni-sangam",
    category: "Sacred places",
    time: "5 min read",
    image: "/hero.jpg",
  },
];

export function Journal() {
  return (
    <main>
      <section className="journal-hero section-pad">
        <Eyebrow>NOTES FOR THE JOURNEY</Eyebrow>
        <h1>
          A little more
          <br />
          <em>to know.</em>
        </h1>
        <p>
          Context for the places we visit, the rituals we observe and the
          questions that travel with us.
        </p>
      </section>
      <section className="featured-article section-pad">
        <Link href={`/journal/${articles[0].slug}`} className="featured-card">
          <ImageBlock src="/hero.jpg" alt={articles[0].title} />
          <div>
            <Eyebrow>FEATURED · {articles[0].category}</Eyebrow>
            <h2>{articles[0].title}</h2>
            <p>
              A gentle, practical introduction to the river city: its rhythms,
              its spaces and a few useful things to consider before you arrive.
            </p>
            <span>
              {articles[0].time} <ArrowUpRight size={14} />
            </span>
          </div>
        </Link>
      </section>
      <section className="all-articles section-pad">
        <SectionHeading
          eyebrow="THE JOURNAL"
          title="Stories and useful context."
        />
        <JournalBrowser articles={articles} />
      </section>
      <CTASection />
    </main>
  );
}
export function Article({ slug }: { slug: string }) {
  const post = articles.find((article) => article.slug === slug) || articles[0];
  const intro =
    slug === "pind-daan-meaning"
      ? "Pind daan is a ritual of remembrance, observed in different ways across families and regions. Understanding the setting and the questions to ask can make it easier to approach with care."
      : slug === "triveni-sangam"
        ? "The Sangam is a meeting of rivers and of many kinds of journeys. For pilgrims, the confluence at Prayagraj holds a deep spiritual significance."
        : "Varanasi can feel at once intimate and immense. A little context helps visitors arrive with curiosity, patience and respect for a city that is very much alive.";
  return (
    <main>
      <div className="breadcrumbs">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/journal">Journal</Link>
        <span>/</span>
        {post.title}
      </div>
      <article className="article-page">
        <header>
          <Eyebrow>
            {post.category.toUpperCase()} · {post.time.toUpperCase()}
          </Eyebrow>
          <h1>{post.title}</h1>
          <p>{intro}</p>
        </header>
        <ImageBlock
          src="/hero.jpg"
          alt={post.title}
          className="article-cover"
        />
        <div className="article-layout">
          <aside>
            <span>IN THIS NOTE</span>
            <a href="#context">A little context</a>
            <a href="#before">Before you go</a>
            <a href="#respect">A note on respect</a>
          </aside>
          <div className="article-body">
            <section id="context">
              <h2>A little context</h2>
              <p>
                {intro} These places and observances hold different meanings for
                different people. No single account can speak for every family
                or community, and local guidance remains important.
              </p>
              <p>
                Take time to learn the setting and the customs relevant to your
                visit. If your family follows a particular tradition, a trusted
                family priest is the right person to confirm the details.
              </p>
            </section>
            <section id="before">
              <h2>Before you go</h2>
              <p>
                Check travel timings, access and local conditions close to your
                visit. Leave room for delays, bring what you need for the day,
                and make sure the people travelling with you know the plan.
              </p>
              <p>
                When arranging a ritual, ask what is included, who will guide
                it, how long to allow and what your family should bring. Clear
                questions make it easier to plan with confidence.
              </p>
            </section>
            <section id="respect">
              <h2>A note on respect</h2>
              <p>
                Ghats, temples and riverfronts are active places of worship and
                everyday life. Follow posted guidance, ask before photographing
                people or ceremonies, and respect areas where photography is not
                permitted.
              </p>
            </section>
          </div>
        </div>
      </article>
      <section className="related section-pad">
        <SectionHeading eyebrow="MORE TO READ" title="Continue the journey." />
        <div className="article-grid">
          {articles
            .filter((article) => article.slug !== slug)
            .map((article) => (
              <Link
                className="article-card"
                href={`/journal/${article.slug}`}
                key={article.slug}
              >
                <ImageBlock src="/hero.jpg" alt={article.title} />
                <Eyebrow>{article.category}</Eyebrow>
                <h3>{article.title}</h3>
                <span>
                  {article.time} <ArrowUpRight size={14} />
                </span>
              </Link>
            ))}
        </div>
      </section>
      <CTASection />
    </main>
  );
}
