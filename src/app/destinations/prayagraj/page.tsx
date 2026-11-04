import type { Metadata } from "next";
import { PrayagrajPage } from "@/components/pages/destinations/PrayagrajPage";
import { CmsManagedSections } from "@/components/content/CmsManagedSections";

export const metadata: Metadata = {
  title: "Prayagraj",
  description:
    "Explore Prayagraj with TirthVaani. Thoughtful guidance for your sacred journey.",
};

export default function Page() {
  return (
    <>
      <PrayagrajPage />
      <CmsManagedSections pageSlug="destinations/prayagraj" />
    </>
  );
}
