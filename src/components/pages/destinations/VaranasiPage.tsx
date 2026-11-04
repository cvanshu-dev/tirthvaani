import { DestinationPage } from "../DestinationPages";

const varanasi = {
  subtitle: "Kashi",
  intro:
    "At dawn, the river gathers the city into a single, unhurried view. Varanasi is lived as much as it is visited—a place of daily worship, learning, music and departure.",
  body: "Kashi, as the city is also known, holds a singular place in Hindu life. Its ghats are active public spaces, and a visit is best approached with patience and respect for residents and worshippers. Customs for rituals depend on family practice.",
  places: [
    "Dashashwamedh Ghat",
    "Assi Ghat",
    "Manikarnika Ghat",
    "Kashi Vishwanath Temple",
  ],
  services: [
    {
      title: "Asthi Visarjan",
      slug: "asthi-visarjan",
      description:
        "A considered farewell by sacred waters, with practical support for the family.",
      location: "Varanasi · Prayagraj",
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

export function VaranasiPage() {
  return <DestinationPage name="varanasi" data={varanasi} />;
}
