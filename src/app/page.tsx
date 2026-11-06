import { CTASection } from "@/components/sections/CTASection";
import { AssignedPosts } from "@/components/content/AssignedPosts";
import { CmsTestimonials } from "@/components/content/CmsTestimonials";
import { CmsManagedSections } from "@/components/content/CmsManagedSections";
import { RitualServices } from "@/components/sections/home/RitualServices";
import { Pitru } from "@/components/sections/home/Pitru";
import { QuickServices } from "@/components/sections/home/QuickServices";
import { Destinations } from "@/components/sections/home/Destinations";
import { WhyChooseUs } from "@/components/sections/home/WhyChooseUs";

import {
  HeroSection,
  About,
  Kashi,

  JournalPreviewSection,
} from "@/components/sections/home-sections";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <QuickServices />
       <About />
       < Destinations />
      <WhyChooseUs />
      <AssignedPosts pageSlug="" slot="after-hero" />
      <RitualServices />
      <Kashi />
     
      <Pitru />
   

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
