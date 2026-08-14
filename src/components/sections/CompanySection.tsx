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
    <section id="company" className="py-24 bg-slate-50 dark:bg-[#0F1115] text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Red ambient core */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel-red text-xs font-mono text-brand-red font-semibold uppercase tracking-wider">
            ABOUT {companyName.toUpperCase()}
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {compData.headline}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto font-sans">
            {compData.description}
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel-red p-8 sm:p-10 rounded-3xl border border-brand-red/30 space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-red/20 border border-brand-red/40 flex items-center justify-center text-brand-red">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Our Mission</h3>
            <p className="text-xs font-mono text-slate-700 dark:text-slate-300 leading-relaxed">
              {compData.mission}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-surface border border-slate-200 dark:border-white/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Our Vision</h3>
            <p className="text-xs font-mono text-slate-700 dark:text-slate-300 leading-relaxed">
              {compData.vision}
            </p>
          </motion.div>
        </div>

        {/* Core Values Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {compData.values.map((val, idx) => {
            const icons = [ShieldCheck, Zap, Compass];
            const IconComp = icons[idx % icons.length];
            return (
              <div key={val.title} className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-white/10 space-y-3">
                <IconComp className="w-5 h-5 text-brand-red" />
                <h4 className="font-display text-lg font-bold text-slate-900 dark:text-white">{val.title}</h4>
                <p className="text-xs font-mono text-slate-600 dark:text-slate-400 leading-relaxed">{val.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
