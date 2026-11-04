import type { Metadata } from "next";
import { PitruRitualsPage } from "@/components/pages/PitruRitualsPage";
import { CmsManagedSections } from "@/components/content/CmsManagedSections";

export const metadata: Metadata = {
  title: "Pitru Karya & Ancestral Rituals in Varanasi",
  description:
    "Perform traditional Pitru Karya in Varanasi with experienced Vedic priests. Explore Pind Daan, Shraddha, Tarpanam, and ancestral rites with TirthVaani.",
};

export default function Page() {
  return (
    <>
      <PitruRitualsPage />
      <CmsManagedSections pageSlug="pitru-rituals" excludeSlots={["*"]} />
    </>
  );
}
