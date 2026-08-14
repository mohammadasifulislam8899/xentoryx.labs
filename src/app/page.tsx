"use client";

import FounderHero from "@/components/hero/FounderHero";
import PhilosophySection from "@/components/sections/PhilosophySection";
import JourneyTimeline from "@/components/sections/JourneyTimeline";
import SkillsGalaxySection from "@/components/sections/SkillsGalaxySection";
import FeaturedProjectsSection from "@/components/sections/FeaturedProjectsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TechWallSection from "@/components/sections/TechWallSection";
import CompanySection from "@/components/sections/CompanySection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0C10] text-white selection:bg-brand-red selection:text-white">
      {/* 1. Founder Hero Section */}
      <FounderHero />

      {/* 2. Engineering Philosophy */}
      <PhilosophySection />

      {/* 3. Experience Timeline */}
      <JourneyTimeline />

      {/* 4. Interactive Tech Stack Galaxy */}
      <SkillsGalaxySection />

      {/* 5. Featured Projects Showcase */}
      <FeaturedProjectsSection />

      {/* 6. Technology Wall Marquee */}
      <TechWallSection />

      {/* 7. Services & Solutions */}
      <ServicesSection />

      {/* 8. Company Vision */}
      <CompanySection />

      {/* 9. Contact & Scope Selector */}
      <ContactSection />
    </main>
  );
}
