import type { Metadata } from "next";
import { About } from "@/components/pages/AboutPage";
import { CmsManagedSections } from "@/components/content/CmsManagedSections";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "Explore Our story with TirthVaani. Thoughtful guidance for your sacred journey.",
};

export default function Page() {
  return (
    <>
      <About />
      <CmsManagedSections pageSlug="about" />
    </>
  );
}
