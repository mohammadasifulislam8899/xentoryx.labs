"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Globe, Camera, Cpu } from "lucide-react";
import { useCMS } from "@/hooks/useCMS";

export default function FounderHero() {
  const { founderName, tagline, settings } = useCMS();
  const heroConfig = settings?.hero || {
    headline: "asif\nfounder",
    description: "Building scalable native Android applications, embedded IoT microcontrollers, high-throughput backend microservices, and modern web architectures through Xentoryx Labs.",
    yearsMetric: "+250k",
    yearsCaption: "Lines of typed code across production architectures",
    uptimeMetric: "+800k",
    uptimeCaption: "IoT telemetry packets delivered with real-time accuracy",
  };

  const socialPills = [
    { label: "gh", href: "https://github.com/mohammadasifulislam8899", title: "GitHub" },
    { label: "li", href: "https://linkedin.com/in/mohammadasifulislam", title: "LinkedIn" },
    { label: "fb", href: "https://facebook.com", title: "Facebook" },
    { label: "x", href: "https://twitter.com", title: "Twitter / X" },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 sm:pt-36 sm:pb-24 bg-[#F5F1E8] dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-[#F5F1E8] transition-colors duration-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          
          {/* LEFT COLUMN: Ultra-Bold Headline & Stats */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="space-y-1">
              <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] tracking-tighter leading-[0.88] text-[#0A0A0A] dark:text-[#F5F1E8] lowercase">
                founder<br />monograph
              </h1>
            </div>

            <p className="text-xs sm:text-sm font-sans opacity-80 max-w-md leading-relaxed">
              {heroConfig.description || tagline}
            </p>

            {/* Social link pills */}
            <div className="flex items-center gap-2 pt-1">
              {socialPills.map((pill) => (
                <a
                  key={pill.label}
                  href={pill.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full border border-[#0A0A0A]/30 dark:border-[#F5F1E8]/30 flex items-center justify-center text-[10px] font-mono font-bold lowercase text-[#0A0A0A] dark:text-[#F5F1E8] hover:bg-[#D9A648] hover:border-[#D9A648] hover:text-[#0A0A0A] transition-all"
                  title={pill.title}
                >
                  {pill.label}
                </a>
              ))}
            </div>

            {/* Stat Blocks */}
            <div className="grid grid-cols-2 gap-6 pt-4 max-w-lg border-t border-[#0A0A0A]/10 dark:border-[#F5F1E8]/10">
              <div className="space-y-1">
                <div className="font-display font-black text-3xl sm:text-4xl tracking-tight">
                  {heroConfig.yearsMetric || "4+ Years"}
                </div>
                <div className="text-[11px] font-sans opacity-70 leading-snug">
                  {(heroConfig as any).yearsCaption || "Engineering Experience"}
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-display font-black text-3xl sm:text-4xl tracking-tight">
                  {heroConfig.uptimeMetric || "99.9%"}
                </div>
                <div className="text-[11px] font-sans opacity-70 leading-snug">
                  {(heroConfig as any).uptimeCaption || "Production Uptime Target"}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Rounded Mustard Card with Founder Visual */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[440px] h-[480px] sm:h-[520px] rounded-[36px] bg-[#D9A648] p-6 shadow-mustard flex flex-col justify-between overflow-hidden group">
              <div className="flex items-start justify-between z-20">
                <div className="font-serif italic text-2xl sm:text-3xl text-white/90 font-light select-none tracking-wide">
                  Asif
                </div>

                <Link
                  href="/projects"
                  className="w-10 h-10 rounded-full bg-[#0A0A0A] text-[#F5F1E8] flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                  title="Explore Project Archive"
                >
                  <Globe className="w-5 h-5" />
                </Link>
              </div>

              <div className="absolute inset-x-6 bottom-0 top-12 rounded-t-[28px] overflow-hidden">
                <Image
                  src="/assets/founder-asif.jpg"
                  alt="Founder Asif — Xentoryx Labs"
                  fill
                  priority
                  className="object-cover object-center filter grayscale contrast-115 group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="absolute left-6 bottom-6 z-20 flex flex-col gap-2">
                <div className="w-8 h-8 rounded-full bg-white/90 border border-white p-0.5 shadow-sm flex items-center justify-center">
                  <Camera className="w-4 h-4 text-[#0A0A0A]" />
                </div>
                <div className="w-8 h-8 rounded-full bg-white/90 border border-white p-0.5 shadow-sm flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-[#0A0A0A]" />
                </div>
                <Link
                  href="/#contact"
                  className="w-9 h-9 rounded-full bg-[#0A0A0A] text-[#F5F1E8] flex items-center justify-center hover:bg-white hover:text-[#0A0A0A] transition-colors shadow-md"
                  title="Contact Founder"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
