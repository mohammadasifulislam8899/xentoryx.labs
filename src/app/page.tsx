"use client";

import HeroSection from "@/components/founder/HeroSection";
import MarqueeSection from "@/components/founder/MarqueeSection";
import AboutSection from "@/components/founder/AboutSection";
import ServicesSection from "@/components/founder/ServicesSection";
import ProjectsSection from "@/components/founder/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="main-wrapper w-full bg-[#0C0C0C] text-[#D7E2EA] overflow-x-clip">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Marquee Section */}
      <MarqueeSection />

      {/* 3. About Section */}
      <AboutSection />

      {/* 4. Services Section */}
      <ServicesSection />

      {/* 5. Projects Section (Sticky Stacking Cards) */}
      <ProjectsSection />

      {/* Contact Section Anchor */}
      <ContactSection />
    </main>
  );
}
