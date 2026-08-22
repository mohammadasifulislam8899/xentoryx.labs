"use client";

import { motion } from "framer-motion";
import { useCMS } from "@/hooks/useCMS";
import { timelineData } from "@/data/timelineData";
import SectionTickerDivider from "@/components/layout/SectionTickerDivider";

export default function JourneyTimeline() {
  const { data } = useCMS();
  const cmsTimeline = data?.timeline || timelineData;

  const items = cmsTimeline.map((item) => ({
    year: item.year,
    period: item.period || "Engineering Era",
    role: item.companyRole || item.title,
    organization: item.title?.includes("Xentoryx") ? "Xentoryx Labs" : "Engineering Studio",
    description: item.description,
    highlights: item.highlights || [],
    tech: item.technologies || [],
  }));

  return (
    <section id="experience" className="relative bg-[#0A0A0A] text-[#F5F1E8] py-24 sm:py-32 transition-colors duration-400">
      <SectionTickerDivider word="journey" className="mb-16" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="font-mono text-xs text-[#D9A648] font-bold uppercase tracking-widest">
            [ 005 // CHRONOLOGICAL MILESTONES ]
          </div>
          <h2 className="font-display font-black text-5xl sm:text-7xl tracking-tighter lowercase leading-tight">
            milestones
          </h2>
          <p className="text-sm font-sans opacity-80 leading-relaxed max-w-xl">
            A chronological progression of technical leadership, mobile application engineering, hardware IoT research, and founding Xentoryx Labs.
          </p>
        </div>

        {/* Timeline Chronicle */}
        <div className="relative border-l border-[#F5F1E8]/15 ml-4 sm:ml-28 space-y-12">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-8 sm:pl-12"
            >
              {/* Dot */}
              <div className="absolute -left-[7px] top-2.5 w-3.5 h-3.5 rounded-full bg-[#D9A648]" />

              {/* Year Label */}
              <div className="hidden sm:block absolute -left-32 top-1 text-right w-24">
                <span className="text-xs font-mono font-bold text-[#D9A648]">
                  {item.year}
                </span>
              </div>

              {/* Card */}
              <div className="p-8 rounded-[32px] bg-[#141414] border border-[#F5F1E8]/10 hover:border-[#D9A648] transition-colors space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#F5F1E8]/10 pb-4">
                  <div>
                    <span className="sm:hidden inline-block text-xs font-mono text-[#D9A648] font-bold mb-1">
                      {item.year}
                    </span>
                    <h3 className="font-display font-black text-2xl text-[#F5F1E8]">
                      {item.role}
                    </h3>
                    <p className="text-xs font-mono text-[#D9A648] mt-0.5 font-bold">
                      {item.organization} &bull; {item.period}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-sans opacity-85 leading-relaxed">
                  {item.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2 pt-2">
                  {item.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2.5 text-xs font-mono text-[#F5F1E8]/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D9A648]" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#F5F1E8]/10">
                  {item.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full text-[10px] font-mono bg-[#F5F1E8]/5 border border-[#F5F1E8]/10 text-[#F5F1E8] font-bold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
