import { DetailPage } from "../ServicePages";

const pindDaan = {
  title: "Pind Daan",
  kicker: "A RITUAL OF REMEMBRANCE",
  lead: "An ancient offering, made with a living intention: to honour those who came before us, and to carry their memory with care.",
  image: "/hero.jpg",
  place: "Gaya, Varanasi and Prayagraj",
  significance:
    "In Hindu tradition, pind daan is an offering made for the peace and onward journey of departed ancestors. Families may undertake it following a bereavement or at a time of remembrance. Customs vary by family, region and lineage.",
  procedure:
    "The observance commonly includes sankalpa (a statement of intention), offerings of pindas and prayers guided by a purohit. The sequence and materials depend on the family’s custom and the chosen location. Speak with your family priest if you follow a specific tradition.",
  prepare:
    "Share the family’s intention, preferred location and any customary practices when making arrangements. Comfortable modest clothing, time for the observance and space for quiet reflection are helpful. Confirm dietary and access needs in advance.",
  faqs: [
    "Which place should our family choose?",
    "How long should we allow?",
    "What should we bring?",
  ],
};

const relatedServices = [
  { title: "Shradh Karma", slug: "shradh-karma" },
  { title: "Brahmin Bhojan", slug: "brahmin-bhojan" },
];

export function PindDaanPage() {
  return <DetailPage data={pindDaan} related={relatedServices} />;
}
