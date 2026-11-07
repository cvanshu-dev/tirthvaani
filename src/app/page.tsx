import { CTASection } from "@/components/sections/CTASection";
import { AssignedPosts } from "@/components/content/AssignedPosts";
import { CmsTestimonials } from "@/components/content/CmsTestimonials";
import { CmsManagedSections } from "@/components/content/CmsManagedSections";
import { RitualServices } from "@/components/sections/home/RitualServices";

import { QuickServices } from "@/components/sections/home/QuickServices";
import { Destinations } from "@/components/sections/home/Destinations";
import { WhyChooseUs } from "@/components/sections/home/WhyChooseUs";
import { HowItWorks } from "@/components/sections/home/HowItWorks";
import { BookingCTA } from "@/components/sections/home/BookingCTA";
import {
  GallerySection,
  TestimonialsSection,
} from "@/components/sections/home/GallerySection"

import {
  HeroSection,
  About,
 

  JournalPreviewSection,
} from "@/components/sections/home-sections";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <QuickServices />
       <About />
       < Destinations />
        <RitualServices />
      <WhyChooseUs />
      <HowItWorks />
      <GallerySection />
      <TestimonialsSection />
      <BookingCTA />
      <AssignedPosts pageSlug="" slot="after-hero" />
     
     
     
     
   

      <AssignedPosts pageSlug="" slot="before-footer" />
      <CmsTestimonials />
      <CmsManagedSections
        pageSlug=""
        excludeSlots={["after-hero", "before-footer"]}
      />
    
    </main>
  );
}
