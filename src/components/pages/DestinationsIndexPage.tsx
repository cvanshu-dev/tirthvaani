import { Listing } from "./ServicePages";

const destinationCards = [
  {
    title: "Varanasi",
    slug: "varanasi",
    image: "/hero.jpg",
    kicker: "THE CITY OF LIGHT",
  },
  {
    title: "Gaya",
    slug: "gaya",
    image: "/hero.jpg",
    kicker: "A PLACE OF REMEMBRANCE",
  },
  {
    title: "Prayagraj",
    slug: "prayagraj",
    image: "/hero.jpg",
    kicker: "AT THE CONFLUENCE",
  },
];

export function DestinationsIndexPage() {
  return (
    <Listing
      title="Places that hold meaning"
      intro="Three cities, each with a distinct place in India’s sacred geography. Explore their character and what to consider as you plan a visit."
      items={destinationCards}
      base="/destinations"
      kicker="THREE SACRED CITIES"
    />
  );
}
