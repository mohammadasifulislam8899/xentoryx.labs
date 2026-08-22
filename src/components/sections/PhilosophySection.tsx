"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import CornerDecorations from "@/components/layout/CornerDecorations";
import { useCMS } from "@/hooks/useCMS";

export default function PhilosophySection() {
  const { settings } = useCMS();
  const pillars = settings?.philosophy || [
    {
      title: "Android Architecture",
      subtitle: "Madrid Gallery, Spain, 21 Nov 2023",
      description: "Native Kotlin & Jetpack Compose",
    },
    {
      title: "Embedded IoT Firmware",
      subtitle: "Manchester Museum, UK, 20 Nov 2023",
      description: "ESP32 C++ & Telemetry Engine",
    },
  ];

  return (
    <section id="philosophy" className="relative bg-[#0A0A0A] text-[#F5F1E8] overflow-hidden py-16 sm:py-24">
      {/* 7. Corner Decorations on Dark Section: Reticle icons top-left/right, Plus icons bottom-left/right */}
      <div className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <CornerDecorations />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Centerpiece Monochrome Visual */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-72 h-80 sm:w-96 sm:h-[420px] rounded-[32px] overflow-hidden border border-[#F5F1E8]/15 bg-[#141414] shadow-card-dark group">
              <Image
                src="/assets/founder-asif.jpg"
                alt="Architecture Monograph"
                fill
                className="object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <span className="font-mono text-xs text-[#D9A648] font-bold uppercase tracking-widest">
                  [ 001 // GALLERY ]
                </span>
                <span className="text-[10px] font-mono text-[#F5F1E8]/60 uppercase">
                  Hardware &amp; Software
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Exhibition Rows with Pill Buttons ("Buy Ticket" style) */}
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-1 mb-4">
              <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-[-0.04em] lowercase leading-tight text-[#F5F1E8]">
                exhibitions
              </h2>
            </div>

            <div className="space-y-3">
              {pillars.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-4 py-4 border-b border-[#F5F1E8]/10"
                >
                  <div className="space-y-0.5">
                    <span className="text-sm font-sans text-[#F5F1E8]/90 font-medium block">
                      {item.subtitle || item.description}
                    </span>
                  </div>

                  <Link
                    href="/projects"
                    className="px-5 py-2 rounded-full border border-[#F5F1E8]/30 hover:border-[#D9A648] text-xs font-sans font-medium text-[#F5F1E8] hover:text-[#0A0A0A] hover:bg-[#D9A648] transition-all shrink-0"
                  >
                    Buy Ticket
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
