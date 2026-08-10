"use client";

import { useState } from "react";
import Preloader from "@/components/sections/Preloader";
import FounderHero from "@/components/hero/FounderHero";
import PhilosophySection from "@/components/sections/PhilosophySection";
import JourneyTimeline from "@/components/sections/JourneyTimeline";
import SkillsSection from "@/components/sections/SkillsSection";
import FeaturedProjectsSection from "@/components/sections/FeaturedProjectsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TechWallSection from "@/components/sections/TechWallSection";
import CompanySection from "@/components/sections/CompanySection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#0F1115] text-white">
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      <FounderHero onOpenAi={() => {
        document.dispatchEvent(new CustomEvent("open-ai-assistant"));
      }} />

      <PhilosophySection />

      <JourneyTimeline />

      <SkillsSection />

      <FeaturedProjectsSection />

      <TechWallSection />

      <ServicesSection />

      <CompanySection />

      <ContactSection />
    </main>
  );
}
