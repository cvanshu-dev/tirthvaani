import { DestinationPage } from "../DestinationPages";

const gaya = {
  subtitle: "Bodh Gaya",
  intro:
    "Gaya is a city of pilgrimage and remembrance, where families come to perform rites for ancestors across a landscape shaped by centuries of devotion.",
  body: "The Vishnupad Temple and the Falgu River are central to Gaya’s sacred geography. For many families, the city is closely associated with pind daan. Local practice can differ, so discuss the sequence with a knowledgeable priest before travel.",
  places: [
    "Vishnupad Temple",
    "Falgu River",
    "Akshayavat",
    "Bodh Gaya (nearby)",
  ],
  services: [
    {
      title: "Pind Daan",
      slug: "pind-daan",
      description:
        "A time-honoured offering made in remembrance of ancestors, guided with care and clarity.",
      location: "Gaya · Varanasi · Prayagraj",
    },
    {
      title: "Shradh Karma",
      slug: "shradh-karma",
      description:
        "Annual remembrance observed with attention to family tradition and individual need.",
      location: "Across our sacred destinations",
    },
    {
      title: "Brahmin Bhojan",
      slug: "brahmin-bhojan",
      description:
        "A traditional act of offering, discussed and arranged around the occasion.",
      location: "By arrangement",
    },
  ],
};

export function GayaPage() {
  return <DestinationPage name="gaya" data={gaya} />;
}
