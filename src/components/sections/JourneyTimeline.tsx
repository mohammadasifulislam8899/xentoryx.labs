"use client";

import { motion } from "framer-motion";
import { timelineData } from "@/data/timelineData";
import { Smartphone, Cpu, CreditCard, Bot, Rocket, Calendar, CheckCircle } from "lucide-react";

export default function JourneyTimeline() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Smartphone":
        return <Smartphone className="w-5 h-5 text-emerald-400" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-amber-400" />;
      case "CreditCard":
        return <CreditCard className="w-5 h-5 text-purple-400" />;
      case "Bot":
        return <Bot className="w-5 h-5 text-brand-red animate-pulse" />;
      case "Rocket":
        return <Rocket className="w-5 h-5 text-cyan-400" />;
      default:
        return <Calendar className="w-5 h-5 text-brand-red" />;
    }
  };

  return (
    <section id="journey" className="py-24 bg-[#0F1115] relative overflow-hidden">
      {/* Background glowing vertical line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-red text-xs font-mono text-brand-red font-semibold uppercase tracking-wider">
            MILESTONES & EVOLUTION
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Asif's Engineering <span className="text-gradient-red">Journey & Milestones</span>
          </h2>
          <p className="text-base text-brand-muted leading-relaxed">
            From writing native Android apps to designing custom hardware IoT devices and founding Xentoryx Labs.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative border-l-2 border-brand-red/30 ml-4 md:ml-32 space-y-12 pl-6 md:pl-10">
          {timelineData.map((milestone, idx) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline Node Point with Red Energy Ring */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#0F1115] border-2 border-brand-red flex items-center justify-center shadow-[0_0_15px_#DB4338] group-hover:scale-125 transition-transform">
                <div className="w-2 h-2 rounded-full bg-brand-red" />
              </div>

              {/* Year Pill on Left Desktop */}
              <div className="hidden md:block absolute -left-36 top-1 text-right w-24">
                <div className="font-display text-xl font-extrabold text-brand-red font-mono">
                  {milestone.year}
                </div>
                <div className="text-[10px] text-brand-muted font-mono uppercase">
                  {milestone.period}
                </div>
              </div>

              {/* Card Container */}
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-brand-red/40 transition-all space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-surface border border-white/10">
                      {getIcon(milestone.icon)}
                    </div>
                    <div>
                      <div className="md:hidden text-xs font-mono text-brand-red font-bold">
                        {milestone.year} • {milestone.period}
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-brand-red transition-colors">
                        {milestone.title}
                      </h3>
                      <div className="text-xs text-brand-muted font-mono">
                        {milestone.companyRole}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed">
                  {milestone.description}
                </p>

                {/* Key Highlights */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-mono text-brand-red uppercase tracking-wider font-semibold">
                    Key Achievements:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {milestone.highlights.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-brand-muted">
                        <CheckCircle className="w-3.5 h-3.5 text-brand-red shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                  {milestone.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-surface border border-white/10 text-gray-300"
                    >
                      {tech}
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
