import type { Metadata } from "next";
import { ServicesIndexPage } from "@/components/pages/ServicesIndexPage";
import { CmsServiceEntries } from "@/components/content/CmsServiceEntries";
import { CmsManagedSections } from "@/components/content/CmsManagedSections";

export const metadata: Metadata = {
  title: "Rituals & remembrance",
  description:
    "Explore Rituals & remembrance with TirthVaani. Thoughtful guidance for your sacred journey.",
};

export default function Page() {
  return (
    <>
      <ServicesIndexPage />
      <CmsServiceEntries />
      <CmsManagedSections pageSlug="services" />
    </>
  );
}
