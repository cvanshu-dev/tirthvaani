import type { Metadata } from "next";
import { Journal } from "@/components/pages/JournalPages";
import { CmsJournalEntries } from "@/components/content/CmsJournalEntries";
import { CmsManagedSections } from "@/components/content/CmsManagedSections";

export const metadata: Metadata = {
  title: "The journal",
  description:
    "Explore The journal with TirthVaani. Thoughtful guidance for your sacred journey.",
};

export default function Page() {
  return (
    <>
      <Journal />
      <CmsJournalEntries />
      <CmsManagedSections pageSlug="journal" />
    </>
  );
}
