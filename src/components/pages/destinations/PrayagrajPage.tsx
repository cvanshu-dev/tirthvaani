import { DestinationPage } from "../DestinationPages";

const prayagraj = {
  subtitle: "Sangam",
  intro:
    "Where the Ganga, Yamuna and the traditionally understood Saraswati meet, Prayagraj offers a powerful landscape for pilgrimage and reflection.",
  body: "The Triveni Sangam is the city’s defining sacred site, receiving pilgrims throughout the year and on major bathing occasions. River access, boat operations and conditions can vary; confirm the day’s arrangements locally.",
  places: [
    "Triveni Sangam",
    "Allahabad Fort (exterior area)",
    "Hanuman Mandir",
    "Anand Bhavan",
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
  ],
};

export function PrayagrajPage() {
  return <DestinationPage name="prayagraj" data={prayagraj} />;
}
