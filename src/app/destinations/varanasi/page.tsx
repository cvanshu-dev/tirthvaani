import type { Metadata } from "next";
import { VaranasiPage } from "@/components/pages/destinations/VaranasiPage";
import { CmsManagedSections } from "@/components/content/CmsManagedSections";

export const metadata: Metadata = {
  title: "Varanasi",
  description:
    "Explore Varanasi with TirthVaani. Thoughtful guidance for your sacred journey.",
};

export default function Page() {
  return (
    <>
      <VaranasiPage />
      <CmsManagedSections pageSlug="destinations/varanasi" />
    </>
  );
}
