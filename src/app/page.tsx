"use client";

import StudioHero from "@/components/hero/StudioHero";
import CompanySection from "@/components/sections/CompanySection";
import ServicesSection from "@/components/sections/ServicesSection";
import FeaturedProjectsSection from "@/components/sections/FeaturedProjectsSection";
import TechWallSection from "@/components/sections/TechWallSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-brand-red selection:text-white transition-colors duration-300">
      {/* 1. Xentoryx Labs Studio Hero */}
      <StudioHero />

      {/* 2. Studio Vision & R&D Principles */}
      <CompanySection />

      {/* 3. Client Services & Engineering Solutions */}
      <ServicesSection />

      {/* 4. Featured Studio Projects */}
      <FeaturedProjectsSection />

      {/* 5. Core Technology Stack Wall */}
      <TechWallSection />

      {/* 6. Studio Contact & Scope Selector */}
      <ContactSection />
    </main>
  );
}
