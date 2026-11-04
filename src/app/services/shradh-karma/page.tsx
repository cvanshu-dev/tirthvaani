import type { Metadata } from "next";
import { ShradhKarmaPage } from "@/components/pages/services/ShradhKarmaPage";
import { CmsManagedSections } from "@/components/content/CmsManagedSections";
import { CmsServiceOverride } from "@/components/content/CmsServiceOverride";

export const metadata: Metadata = {
  title: "Shradh Karma",
  description:
    "Explore Shradh Karma with TirthVaani. Thoughtful guidance for your sacred journey.",
};

export default function Page() {
  return (
    <CmsServiceOverride
      slug="shradh-karma"
      fallback={
        <>
          <ShradhKarmaPage />
          <CmsManagedSections pageSlug="services/shradh-karma" />
        </>
      }
    />
  );
}
