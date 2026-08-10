"use client";

import { motion } from "framer-motion";
import { Target, Compass, ShieldCheck, Zap } from "lucide-react";

export default function CompanySection() {
  const values = [
    {
      title: "Engineering Excellence",
      description: "We write clean, typed, modular code built to last for decades.",
      icon: ShieldCheck,
    },
    {
      title: "Pioneering Innovation",
      description: "Pushing boundaries in Edge AI microcontrollers and hardware telemetry.",
      icon: Zap,
    },
    {
      title: "Human-Centric UX",
      description: "Combining raw technical power with Apple-level visual craftsmanship.",
      icon: Compass,
    },
  ];

  return (
    <section id="company" className="py-24 bg-[#0F1115] relative overflow-hidden">
      {/* Red ambient core */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-red text-xs font-mono text-brand-red font-semibold uppercase tracking-wider">
            ABOUT XENTORYX LABS
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Engineering Tomorrow's <br />
            <span className="text-gradient-red">Digital Experiences</span>
          </h2>

          <p className="text-lg text-brand-muted leading-relaxed max-w-2xl mx-auto">
            Xentoryx Labs develops scalable software, IoT products, backend systems, and intelligent digital experiences designed for the future. Founded by Asif.
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
            <h3 className="font-display text-2xl font-bold text-white">Our Mission</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              To bridge the gap between physical hardware microcontrollers and cloud software systems by engineering resilient, low-latency IoT hardware and elegant mobile/web applications.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-surface border border-white/10 flex items-center justify-center text-cyan-400">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white">Our Vision</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              To become a globally recognized technology lab where hardware engineering meets modern web design and AI intelligence, delivering software that empowers millions.
            </p>
          </motion.div>
        </div>

        {/* Core Values Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((val) => {
            const IconComp = val.icon;
            return (
              <div key={val.title} className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
                <IconComp className="w-5 h-5 text-brand-red" />
                <h4 className="font-display text-lg font-bold text-white">{val.title}</h4>
                <p className="text-xs text-brand-muted leading-relaxed">{val.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
