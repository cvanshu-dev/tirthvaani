import { DetailPage } from "../ServicePages";

const shradhKarma = {
  title: "Shradh Karma",
  kicker: "KEEPING MEMORY CLOSE",
  lead: "A recurring act of remembrance that gives families a moment to pause, offer gratitude and honour those whose lives shaped their own.",
  image: "/hero.jpg",
  place: "Varanasi, Gaya and Prayagraj",
  significance:
    "Shradh is a set of observances performed in remembrance of ancestors, often on an annual death anniversary or during Pitru Paksha. The form of the observance is shaped by family tradition and regional practice.",
  procedure:
    "A priest may guide prayers, offerings and a meal or charitable act as observed by the family. The timing follows the family calendar and custom. It is useful to discuss the occasion and any family-specific details ahead of time.",
  prepare:
    "Bring the date and relevant family details, and share any specific customs you wish to observe. If you are unsure about timing, consult a trusted family priest before making travel plans.",
  faqs: [
    "When is Shradh observed?",
    "Can the ritual be arranged away from home?",
    "How do customs differ?",
  ],
};

const relatedServices = [
  { title: "Pind Daan", slug: "pind-daan" },
  { title: "Brahmin Bhojan", slug: "brahmin-bhojan" },
];

export function ShradhKarmaPage() {
  return <DetailPage data={shradhKarma} related={relatedServices} />;
}
