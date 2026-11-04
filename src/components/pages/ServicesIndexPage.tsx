import { Listing } from "./ServicePages";

const serviceCards = [
  {
    title: "Pind Daan",
    slug: "pind-daan",
    image: "/hero.jpg",
    place: "Gaya · Varanasi · Prayagraj",
    desc: "A time-honoured offering made in remembrance of ancestors, guided with care and clarity.",
  },
  {
    title: "Asthi Visarjan",
    slug: "asthi-visarjan",
    image: "/hero.jpg",
    place: "Varanasi · Prayagraj",
    desc: "A considered farewell by sacred waters, with practical support for the family.",
  },
  {
    title: "Shradh Karma",
    slug: "shradh-karma",
    image: "/hero.jpg",
    place: "Across our sacred destinations",
    desc: "Annual remembrance observed with attention to family tradition and individual need.",
  },
  {
    title: "Brahmin Bhojan",
    slug: "brahmin-bhojan",
    image: "/hero.jpg",
    place: "By arrangement",
    desc: "A traditional act of offering, discussed and arranged around the occasion.",
  },
];

export function ServicesIndexPage() {
  return (
    <Listing
      title="Rituals & remembrance"
      intro="Sacred observances are personal. We offer clear information so you can understand the traditions, the practical details and the questions to ask."
      items={serviceCards}
      base="/services"
      kicker="A THOUGHTFUL GUIDE"
    />
  );
}
