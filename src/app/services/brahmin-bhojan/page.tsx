import type { Metadata } from "next";
import { BrahminBhojanPage } from "@/components/pages/services/BrahminBhojanPage";
import { CmsManagedSections } from "@/components/content/CmsManagedSections";
import { CmsServiceOverride } from "@/components/content/CmsServiceOverride";

export const metadata: Metadata = {
  title: "Brahmin Bhojan",
  description:
    "Explore Brahmin Bhojan with TirthVaani. Thoughtful guidance for your sacred journey.",
};

export default function Page() {
  return (
    <CmsServiceOverride
      slug="brahmin-bhojan"
      fallback={
        <>
          <BrahminBhojanPage />
          <CmsManagedSections pageSlug="services/brahmin-bhojan" />
        </>
      }
    />
  );
}
