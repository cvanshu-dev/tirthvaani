import type { Metadata } from "next";
import { DestinationsIndexPage } from "@/components/pages/DestinationsIndexPage";
import { CmsManagedSections } from "@/components/content/CmsManagedSections";

export const metadata: Metadata = {
  title: "Sacred destinations",
  description:
    "Explore Sacred destinations with TirthVaani. Thoughtful guidance for your sacred journey.",
};

export default function Page() {
  return (
    <>
      <DestinationsIndexPage />
      <CmsManagedSections pageSlug="destinations" />
    </>
  );
}
