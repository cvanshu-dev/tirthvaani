import type { Metadata } from "next";
import { GayaPage } from "@/components/pages/destinations/GayaPage";
import { CmsManagedSections } from "@/components/content/CmsManagedSections";

export const metadata: Metadata = {
  title: "Gaya",
  description:
    "Explore Gaya with TirthVaani. Thoughtful guidance for your sacred journey.",
};

export default function Page() {
  return (
    <>
      <GayaPage />
      <CmsManagedSections pageSlug="destinations/gaya" />
    </>
  );
}
