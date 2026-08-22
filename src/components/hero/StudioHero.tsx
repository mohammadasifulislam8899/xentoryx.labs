"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Globe } from "lucide-react";
import { useCMS } from "@/hooks/useCMS";
import SectionTickerDivider from "@/components/layout/SectionTickerDivider";

export default function StudioHero() {
  const { settings } = useCMS();

  const heroConfig = settings?.hero || {
    headline: "visual\npoetry",
    description: "Welcome to a visual journey that transcends time and space. Discover the artistry of moments captured in motion.",
    yearsMetric: "+250k",
    yearsCaption: "Videos that reaching a wide audience and give lasting impression",
    uptimeMetric: "+800k",
    uptimeCaption: "Hours watched, engaging storytelling that captivates viewers",
  };

  const socialPills = [
    { label: "yt", href: "https://youtube.com", title: "YouTube" },
    { label: "ig", href: "https://instagram.com", title: "Instagram" },
    { label: "fb", href: "https://facebook.com", title: "Facebook" },
    { label: "x", href: "https://twitter.com", title: "Twitter / X" },
  ];

  return (
    <div className="relative bg-[#F5F1E8] text-[#0A0A0A]">
      {/* Hero Section Content */}
      <section className="pt-24 pb-8 sm:pt-28 sm:pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Ultra-Bold Tight Headline & Compact Content */}
          <div className="lg:col-span-6 space-y-4 text-left">
            {/* 1. Tight 2-line condensed headline */}
            <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[7.4rem] tracking-[-0.055em] leading-[0.82] text-[#0A0A0A] lowercase select-none">
              visual<br />poetry
            </h1>

            {/* 2. Short description with small text */}
            <p className="text-[13px] sm:text-[14px] font-sans text-[#0A0A0A]/85 max-w-[380px] leading-relaxed pt-1">
              {heroConfig.description}
            </p>

            {/* 3. Small circular social link pills (yt, ig, fb, x) */}
            <div className="flex items-center gap-1.5 pt-1">
              {socialPills.map((pill) => (
                <a
                  key={pill.label}
                  href={pill.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-full border border-[#0A0A0A]/40 flex items-center justify-center text-[10px] font-sans font-medium lowercase text-[#0A0A0A] hover:bg-[#D9A648] hover:border-[#D9A648] hover:text-[#0A0A0A] transition-all"
                  title={pill.title}
                >
                  {pill.label}
                </a>
              ))}
            </div>

            {/* 4. Two Stat Blocks Side-by-Side (NO horizontal divider above) */}
            <div className="grid grid-cols-2 gap-4 pt-3 max-w-[420px]">
              <div className="space-y-0.5">
                <div className="font-display font-black text-3xl sm:text-4xl text-[#0A0A0A] tracking-[-0.04em] leading-tight">
                  {heroConfig.yearsMetric || "+250k"}
                </div>
                <div className="text-[11px] font-sans text-[#0A0A0A]/70 leading-tight">
                  {(heroConfig as any).yearsCaption || "Videos that reaching a wide audience and give lasting impression"}
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="font-display font-black text-3xl sm:text-4xl text-[#0A0A0A] tracking-[-0.04em] leading-tight">
                  {heroConfig.uptimeMetric || "+800k"}
                </div>
                <div className="text-[11px] font-sans text-[#0A0A0A]/70 leading-tight">
                  {(heroConfig as any).uptimeCaption || "Hours watched, engaging storytelling that captivates viewers"}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Single Full-bleed Portrait in Rounded Mustard Card */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] h-[460px] sm:h-[500px] rounded-[32px] sm:rounded-[36px] bg-[#D9A648] p-5 shadow-mustard overflow-hidden flex flex-col justify-between group">
              
              {/* Top Row: Cursive Signature & Globe Icon */}
              <div className="flex items-start justify-between z-20">
                <div className="font-serif italic text-3xl sm:text-4xl text-white/95 font-normal select-none tracking-wide">
                  Quantum
                </div>

                <Link
                  href="/projects"
                  className="w-9 h-9 rounded-full bg-[#0A0A0A] text-[#F5F1E8] flex items-center justify-center hover:scale-105 transition-transform shadow-md"
                  title="Explore Archive"
                >
                  <Globe className="w-4 h-4" />
                </Link>
              </div>

              {/* Single Full-bleed Portrait Filling the Card */}
              <div className="absolute inset-x-0 bottom-0 top-10 overflow-hidden">
                <Image
                  src="/assets/founder-asif.jpg"
                  alt="Creative Portrait"
                  fill
                  priority
                  className="object-cover object-top filter contrast-110 group-hover:scale-102 transition-transform duration-700"
                />
              </div>

              {/* Floating Side Circles on Left Edge (Thumbnail Photos + Diagonal Arrow) */}
              <div className="absolute left-4 bottom-5 z-20 flex flex-col gap-2">
                {/* Thumbnail Photo 1 */}
                <div className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm">
                  <Image
                    src="/assets/projects/dipannita.jpg"
                    alt="Gallery Preview 1"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Thumbnail Photo 2 */}
                <div className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm">
                  <Image
                    src="/assets/founder-asif.jpg"
                    alt="Gallery Preview 2"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Black Circular Diagonal Arrow Button (↗) */}
                <Link
                  href="/founder"
                  className="w-9 h-9 rounded-full bg-[#0A0A0A] text-[#F5F1E8] flex items-center justify-center hover:bg-white hover:text-[#0A0A0A] transition-colors shadow-md"
                  title="View Profile"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Section Divider Band: 120-150px Black Band with "about . about . about ." */}
      <SectionTickerDivider word="about" className="h-28 sm:h-36 flex items-center" />
    </div>
  );
}
