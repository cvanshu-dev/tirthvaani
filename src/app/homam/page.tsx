import type { Metadata } from "next";
import { CmsManagedSections } from "@/components/content/CmsManagedSections";
import { HomamPage } from "@/components/pages/HomamPage";

export const metadata: Metadata = {
  title: "Homam",
  description:
    "Arrange traditional Homam and Havan ceremonies in Varanasi with TirthVaani.",
};

export default function Page() {
  return (
    <>
      <HomamPage />
      <CmsManagedSections pageSlug="homam" />
    </>
  );
}
