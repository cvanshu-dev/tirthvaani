import type { Metadata } from "next";
import { DevRitualsPage } from "@/components/pages/DevRitualsPage";
import { CmsManagedSections } from "@/components/content/CmsManagedSections";

export const metadata: Metadata = {
  title: "Dev Rituals",
  description:
    "Explore Dev Rituals with TirthVaani. Thoughtful guidance for your sacred journey.",
};

export default function Page() {
  return (
    <>
      <DevRitualsPage />
      <CmsManagedSections pageSlug="dev-rituals" />
    </>
  );
}
