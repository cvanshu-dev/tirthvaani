import type { Metadata } from "next";
import { AsthiVisarjanPage } from "@/components/pages/services/AsthiVisarjanPage";
import { CmsManagedSections } from "@/components/content/CmsManagedSections";
import { CmsServiceOverride } from "@/components/content/CmsServiceOverride";

export const metadata: Metadata = {
  title: "Asthi Visarjan",
  description:
    "Explore Asthi Visarjan with TirthVaani. Thoughtful guidance for your sacred journey.",
};

export default function Page() {
  return (
    <CmsServiceOverride
      slug="asthi-visarjan"
      fallback={
        <>
          <AsthiVisarjanPage />
          <CmsManagedSections pageSlug="services/asthi-visarjan" />
        </>
      }
    />
  );
}
