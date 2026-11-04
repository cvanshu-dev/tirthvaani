import { DetailPage } from "../ServicePages";

const asthiVisarjan = {
  title: "Asthi Visarjan",
  kicker: "A FAREWELL BY SACRED WATERS",
  lead: "A family’s final offering, approached with reverence, practical clarity and room for each person to grieve in their own way.",
  image: "/hero.jpg",
  place: "Varanasi and Prayagraj",
  significance:
    "Asthi visarjan is the immersion of a loved one’s ashes in a sacred river. Families often choose the Ganga or the confluence at Prayagraj. The observance and its meaning are personal; customs differ across communities.",
  procedure:
    "Families gather at the river with a priest who guides the prayers and immersion according to their custom. The exact steps, timing and what to bring are best confirmed beforehand. River conditions can change, so local guidance matters.",
  prepare:
    "Keep the ashes secure during travel, carry relevant travel documents, and let your family know if anyone needs step-free access or extra assistance. Ask about current river access and weather before setting out.",
  faqs: [
    "Where can the immersion take place?",
    "What should we carry?",
    "Can older family members join?",
  ],
};

const relatedServices = [
  { title: "Pind Daan", slug: "pind-daan" },
  { title: "Shradh Karma", slug: "shradh-karma" },
];

export function AsthiVisarjanPage() {
  return <DetailPage data={asthiVisarjan} related={relatedServices} />;
}
