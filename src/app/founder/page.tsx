"use client";

import FounderHero from "@/components/hero/FounderHero";
import PhilosophySection from "@/components/sections/PhilosophySection";
import JourneyTimeline from "@/components/sections/JourneyTimeline";
import SkillsGalaxySection from "@/components/sections/SkillsGalaxySection";
import ContactSection from "@/components/sections/ContactSection";

export default function FounderPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-brand-red selection:text-white transition-colors duration-300">
      {/* Founder Personal Hero */}
      <FounderHero />

      {/* Engineering Philosophy */}
      <PhilosophySection />

      {/* Experience & Journey Timeline */}
      <JourneyTimeline />

      {/* Interactive Tech Stack Galaxy */}
      <SkillsGalaxySection />

      {/* Direct Contact */}
      <ContactSection />
    </main>
  );
}
