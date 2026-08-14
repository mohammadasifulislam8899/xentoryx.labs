"use client";

import { motion } from "framer-motion";
import { Briefcase, Rocket, Code, Cpu, Calendar, CheckCircle2, Trophy } from "lucide-react";

interface TimelineItem {
  year: string;
  period: string;
  role: string;
  organization: string;
  description: string;
  highlights: string[];
  tech: string[];
  icon: typeof Briefcase;
}

import { useCMS } from "@/hooks/useCMS";
import { timelineData } from "@/data/timelineData";

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
    icon: Rocket,
  }));

  return (
    <section id="experience" className="py-24 bg-slate-50 dark:bg-[#07090C] text-slate-900 dark:text-white relative border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel-red text-xs font-mono text-brand-red font-semibold uppercase tracking-wider">
            CAREER & MILESTONES
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineering <span className="text-gradient-red">Experience Timeline</span>
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
            A chronological timeline of technical leadership, mobile application engineering, hardware IoT research, and founding Xentoryx Labs.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-brand-red/40 ml-4 sm:ml-32 space-y-12">
          {items.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-8 sm:pl-12"
              >
                {/* Timeline Dot Marker */}
                <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-white dark:bg-[#0A0C10] border-2 border-brand-red text-brand-red flex items-center justify-center shadow-glow-red z-10">
                  <IconComponent className="w-4 h-4" />
                </div>

                {/* Left Year Label (for larger screens) */}
                <div className="hidden sm:block absolute -left-36 top-2 text-right w-28">
                  <span className="text-xs font-mono font-bold text-brand-red bg-brand-red/10 px-2.5 py-1 rounded border border-brand-red/30">
                    {item.year}
                  </span>
                </div>

                {/* Content Card */}
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4 hover:border-brand-red/40 transition-all shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-white/10 pb-4">
                    <div>
                      <span className="sm:hidden inline-block text-[10px] font-mono text-brand-red font-bold mb-1">
                        {item.year}
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                        {item.role}
                      </h3>
                      <p className="text-xs font-mono font-bold text-brand-red mt-0.5">
                        {item.organization} • {item.period}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-mono font-normal">
                    {item.description}
                  </p>

                  {/* Highlights List */}
                  <div className="space-y-2 pt-2">
                    <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">
                      Key Highlights:
                    </div>
                    {item.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs font-mono text-slate-800 dark:text-slate-300 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200 dark:border-white/10">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded text-[10px] font-mono bg-slate-100 dark:bg-surface border border-slate-200 dark:border-white/10 text-slate-800 dark:text-cyan-400 font-bold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
