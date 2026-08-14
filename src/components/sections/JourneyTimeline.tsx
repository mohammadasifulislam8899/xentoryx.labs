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

export default function JourneyTimeline() {
  const items: TimelineItem[] = [
    {
      year: "2024 - Present",
      period: "Present Era",
      role: "Founder & Lead Architect",
      organization: "Xentoryx Labs",
      description:
        "Established Xentoryx Labs as an R&D software & hardware engineering studio building native Android apps, IoT telemetry infrastructure, and modern web platforms.",
      highlights: [
        "Built Dipannita Android Blood Donation Network",
        "Engineered Wireless ESP32 MQTT Firmware Engine",
        "Architected Next.js 15 Fullstack Web Applications",
      ],
      tech: ["Kotlin", "ESP32", "Next.js", "MongoDB", "MQTT"],
      icon: Rocket,
    },
    {
      year: "2023 - 2024",
      period: "System Architecture Era",
      role: "Senior IoT & Backend Specialist",
      organization: "Autonomous Client Systems",
      description:
        "Designed high-throughput REST microservices, offline-first SQLite synchronization engines, and low-latency Bluetooth Low Energy hardware provisioning.",
      highlights: [
        "Implemented WorkManager Background Data Sync",
        "Designed Redis Pub/Sub Caching Layers",
        "Configured TLS-Encrypted Hardware Communication",
      ],
      tech: ["Node.js", "PostgreSQL", "Redis", "BLE", "Docker"],
      icon: Cpu,
    },
    {
      year: "2021 - 2023",
      period: "Foundational Era",
      role: "Native Android Software Developer",
      organization: "Mobile & Systems Engineering",
      description:
        "Mastered Kotlin Coroutines, Jetpack Compose declarative UI, Room local database persistence, and Clean Architecture pattern implementation.",
      highlights: [
        "Developed Enterprise Mobile Applications",
        "Reduced App Cold Start Latency by 40%",
        "Maintained 99.9% Crash-free Session Rate",
      ],
      tech: ["Kotlin", "Jetpack Compose", "Room DB", "MVVM"],
      icon: Code,
    },
  ];

  return (
    <section id="experience" className="py-24 bg-[#0B0D11] dark:bg-[#07090C] text-white relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-red text-xs font-mono text-brand-red font-semibold uppercase tracking-wider">
            CAREER & MILESTONES
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineering <span className="text-gradient-red">Experience Timeline</span>
          </h2>
          <p className="text-base text-brand-muted leading-relaxed">
            A chronological timeline of technical leadership, mobile application engineering, hardware IoT research, and founding Xentoryx Labs.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-brand-red/30 ml-4 sm:ml-32 space-y-12">
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
                <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#0A0C10] border-2 border-brand-red text-brand-red flex items-center justify-center shadow-glow-red">
                  <IconComponent className="w-4 h-4" />
                </div>

                {/* Left Year Label (for larger screens) */}
                <div className="hidden sm:block absolute -left-36 top-2 text-right w-28">
                  <span className="text-xs font-mono font-bold text-brand-red bg-brand-red/10 px-2 py-1 rounded border border-brand-red/30">
                    {item.year}
                  </span>
                </div>

                {/* Content Card */}
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4 hover:border-brand-red/40 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                    <div>
                      <span className="sm:hidden inline-block text-[10px] font-mono text-brand-red font-bold mb-1">
                        {item.year}
                      </span>
                      <h3 className="font-display text-xl font-bold text-white">
                        {item.role}
                      </h3>
                      <p className="text-xs font-mono text-brand-red">
                        {item.organization} • {item.period}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed font-mono">
                    {item.description}
                  </p>

                  {/* Highlights List */}
                  <div className="space-y-2 pt-2">
                    {item.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs font-mono text-gray-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-surface border border-white/10 text-cyan-400 font-bold"
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
