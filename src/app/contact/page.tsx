import type { Metadata } from "next";
import { Contact } from "@/components/pages/ContactPage";
import { CmsManagedSections } from "@/components/content/CmsManagedSections";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Explore Contact with TirthVaani. Thoughtful guidance for your sacred journey.",
};

export default function Page() {
  return (
    <>
      <Contact />
      <CmsManagedSections pageSlug="contact" />
    </>
  );
}
