import type { Metadata } from "next";
import { PindDaanPage } from "@/components/pages/services/PindDaanPage";
import { CmsManagedSections } from "@/components/content/CmsManagedSections";
import { CmsServiceOverride } from "@/components/content/CmsServiceOverride";

export const metadata: Metadata = {
  title: "Pind Daan",
  description:
    "Explore Pind Daan with TirthVaani. Thoughtful guidance for your sacred journey.",
};

export default function Page() {
  return (
    <CmsServiceOverride
      slug="pind-daan"
      fallback={
        <>
          <PindDaanPage />
          <CmsManagedSections pageSlug="services/pind-daan" />
        </>
      }
    />
  );
}
