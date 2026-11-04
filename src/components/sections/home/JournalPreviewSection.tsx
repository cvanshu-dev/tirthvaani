import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow, SectionHeading, ImageBlock } from "../../shared";

const articles = [
  {
    title: "A first visit to Varanasi: what to know",
    slug: "first-visit-varanasi",
    category: "Travel notes",
    readingTime: "6 min read",
    image: "/hero.jpg",
  },
  {
    title: "Pind Daan: meaning, setting and preparation",
    slug: "pind-daan-meaning",
    category: "Ritual & remembrance",
    readingTime: "7 min read",
    image: "/hero.jpg",
  },
  {
    title: "The quiet significance of the Triveni Sangam",
    slug: "triveni-sangam",
    category: "Sacred places",
    readingTime: "5 min read",
    image: "/hero.jpg",
  },
];

export function JournalPreviewSection() {
  return (
    <section className="journal-preview section-pad">
      <div className="split-heading">
        <SectionHeading
          eyebrow="NOTES FOR THE JOURNEY"
          title="A little more to know."
          copy="Practical context and thoughtful reading for the road ahead."
        />
        <Link className="text-link" href="/journal">
          Visit the journal <ArrowUpRight size={15} />
        </Link>
      </div>
      <div className="article-grid">
        {articles.map((article) => (
          <Link
            className="article-card"
            href={`/journal/${article.slug}`}
            key={article.slug}
          >
            <ImageBlock src={article.image} alt={article.title} />
            <Eyebrow>{article.category}</Eyebrow>
            <h3>{article.title}</h3>
            <span>
              {article.readingTime} <ArrowUpRight size={14} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
