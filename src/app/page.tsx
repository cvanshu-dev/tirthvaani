import { CTASection } from "@/components/sections/CTASection";
import { AssignedPosts } from "@/components/content/AssignedPosts";
import { CmsTestimonials } from "@/components/content/CmsTestimonials";
import { CmsManagedSections } from "@/components/content/CmsManagedSections";
import { RitualServices } from "@/components/sections/home/RitualServices";
import { Pitru } from "@/components/sections/home/Pitru";
import {
  HeroSection,
  About,
  Kashi,
  DestinationsSection,
  JournalPreviewSection,
} from "@/components/sections/home-sections";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AssignedPosts pageSlug="" slot="after-hero" />
      <RitualServices />
      <Kashi />
      <About />
      <Pitru />
      <DestinationsSection />

      <JournalPreviewSection />
      <AssignedPosts pageSlug="" slot="before-footer" />
      <CmsTestimonials />
      <CmsManagedSections
        pageSlug=""
        excludeSlots={["after-hero", "before-footer"]}
      />
      <CTASection />
    </main>
  );
}
