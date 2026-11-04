import type { Metadata } from "next";
import { Travel } from "@/components/pages/TravelPage";
import { CmsManagedSections } from "@/components/content/CmsManagedSections";

export const metadata: Metadata = {
  title: "Travel assistance",
  description:
    "Explore Travel assistance with TirthVaani. Thoughtful guidance for your sacred journey.",
};

export default function Page() {
  return (
    <>
      <Travel />
      <CmsManagedSections pageSlug="travel-assistance" />
    </>
  );
}
