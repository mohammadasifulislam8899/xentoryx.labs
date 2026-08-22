"use client";

import { motion } from "framer-motion";
import { Target, Compass, ShieldCheck, Zap } from "lucide-react";
import { useCMS } from "@/hooks/useCMS";

export default function CompanySection() {
  const { settings, companyName, founderName } = useCMS();

  const compData = settings?.company?.[0] || {
    headline: "Engineering Tomorrow's Digital Experiences",
    description: `${companyName} develops scalable software, IoT products, backend systems, and intelligent digital experiences designed for the future. Founded by ${founderName}.`,
    mission: "To bridge the gap between physical hardware microcontrollers and cloud software systems by engineering resilient, low-latency IoT hardware and elegant mobile/web applications.",
    vision: "To become a globally recognized technology lab where hardware engineering meets modern web design and AI intelligence, delivering software that empowers millions.",
    values: [
      { title: "Engineering Excellence", description: "We write clean, typed, modular code built to last for decades." },
      { title: "Pioneering Innovation", description: "Pushing boundaries in Edge AI microcontrollers and hardware telemetry." },
      { title: "Human-Centric UX", description: "Combining raw technical power with Apple-level visual craftsmanship." },
    ],
  };

  return (
    <section id="company" className="relative bg-[#F5F1E8] dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-[#F5F1E8] py-24 sm:py-32 transition-colors duration-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl space-y-4 mb-16">
          <div className="font-mono text-xs text-[#D9A648] font-bold uppercase tracking-widest">
            [ 006 // ORGANIZATION &amp; ETHOS ]
          </div>
          <h2 className="font-display font-black text-5xl sm:text-7xl tracking-tighter lowercase leading-tight">
            mission &amp; vision
          </h2>
          <p className="text-base sm:text-lg opacity-85 leading-relaxed font-sans max-w-2xl">
            {compData.description}
          </p>
        </div>

        {/* Double Card Spread */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Mission */}
          <div className="p-8 sm:p-12 rounded-[36px] bg-[#FFFFFF] dark:bg-[#141414] border border-[#0A0A0A]/10 dark:border-[#F5F1E8]/10 shadow-card space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#D9A648] uppercase tracking-widest">
                  MANIFESTO 01
                </span>
                <Target className="w-5 h-5 text-[#D9A648]" />
              </div>
              <h3 className="font-display font-black text-3xl text-[#0A0A0A] dark:text-[#F5F1E8]">
                Our Mission
              </h3>
              <p className="text-sm font-sans opacity-85 leading-relaxed">
                {compData.mission}
              </p>
            </div>
            <div className="text-[10px] font-mono opacity-50 uppercase tracking-widest pt-4 border-t border-[#0A0A0A]/5 dark:border-[#F5F1E8]/5">
              XENTORYX LABS &bull; HARDWARE &amp; SOFTWARE BRIDGE
            </div>
          </div>

          {/* Vision */}
          <div className="p-8 sm:p-12 rounded-[36px] bg-[#D9A648] text-[#0A0A0A] shadow-mustard space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#0A0A0A] uppercase tracking-widest">
                  MANIFESTO 02
                </span>
                <Compass className="w-5 h-5 text-[#0A0A0A]" />
              </div>
              <h3 className="font-display font-black text-3xl text-[#0A0A0A]">
                Our Vision
              </h3>
              <p className="text-sm font-sans text-[#0A0A0A]/90 leading-relaxed font-medium">
                {compData.vision}
              </p>
            </div>
            <div className="text-[10px] font-mono text-[#0A0A0A]/60 uppercase tracking-widest pt-4 border-t border-[#0A0A0A]/10">
              GLOBAL R&amp;D LAB &bull; LONG-TERM HORIZON
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {compData.values.map((val, idx) => (
            <div
              key={val.title}
              className="p-6 sm:p-8 rounded-[28px] bg-[#FFFFFF] dark:bg-[#141414] border border-[#0A0A0A]/10 dark:border-[#F5F1E8]/10 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#D9A648]">0{idx + 1}</span>
                <ShieldCheck className="w-4 h-4 text-[#D9A648]" />
              </div>
              <h4 className="font-display font-bold text-lg text-[#0A0A0A] dark:text-[#F5F1E8]">{val.title}</h4>
              <p className="text-xs font-sans opacity-75 leading-relaxed">{val.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
