import { DetailPage } from "../ServicePages";

const brahminBhojan = {
  title: "Brahmin Bhojan",
  kicker: "AN OFFERING OF HOSPITALITY",
  lead: "Food offered in a spirit of generosity and remembrance, with thought given to the occasion, the guests and the family’s own tradition.",
  image: "/hero.jpg",
  place: "By arrangement in our sacred destinations",
  significance:
    "Brahmin bhojan is part of observances in which a meal is offered as an act of respect and giving. Its place and form vary between family and regional traditions, so it is worth discussing how it is understood in your home.",
  procedure:
    "Families may include the offering as part of Shradh or another observance. Menu, number of guests, timing and setting should be agreed in advance with the priest and the people preparing the meal.",
  prepare:
    "Discuss dietary practices, guest numbers, accessibility and timing before confirming a meal. We can help you understand what to ask while arrangements remain subject to local availability and owner confirmation.",
  faqs: [
    "Can dietary requirements be accommodated?",
    "Is this always part of Shradh?",
    "How early should we ask?",
  ],
};

const relatedServices = [
  { title: "Shradh Karma", slug: "shradh-karma" },
  { title: "Pind Daan", slug: "pind-daan" },
];

export function BrahminBhojanPage() {
  return <DetailPage data={brahminBhojan} related={relatedServices} />;
}
