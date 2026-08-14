"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, Compass, RefreshCw, CheckCircle2 } from "lucide-react";
import { useCMS } from "@/hooks/useCMS";

export default function PhilosophySection() {
  const { settings } = useCMS();
  const pillars = settings?.philosophy || [
    {
      title: "Build Fast",
      subtitle: "Rapid Prototyping to Production",
      description: "Moving swiftly from initial architectural concept to clean, production-ready code without cutting engineering corners.",
      points: ["Modular Clean Architecture", "Iterative Sprint Deployment", "Zero Tech Debt Strategy"],
    },
    {
      title: "Think Scalable",
      subtitle: "Enterprise-Grade Performance",
      description: "Architecting software microservices and IoT hardware pipelines designed to effortlessly handle exponential user & data growth.",
      points: ["Offline-First Android Data Caching", "High-Throughput MQTT Brokers", "Database Indexing & Micro-caching"],
    },
    {
      title: "Design for Humans",
      subtitle: "Apple & Linear Level Polish",
      description: "Crafting intuitive user interfaces, buttery smooth animations, and ergonomic software designs that wow users at first glance.",
      points: ["Declarative Jetpack Compose & React 19", "Micro-interactions & Smooth Scroll", "Accessible & Dark Mode First"],
    },
    {
      title: "Automate Everything",
      subtitle: "Continuous Telemetry & OTA",
      description: "Automating build pipelines, hardware Over-The-Air (OTA) updates, cloud container deployments, and background monitoring.",
      points: ["OTA Wireless ESP32 Updating", "Dockerized Container Workflows", "Automated System Diagnostics"],
    },
  ];

  const icons = [Zap, ShieldCheck, Compass, RefreshCw];

  return (
    <section id="philosophy" className="py-24 bg-slate-50 dark:bg-[#07090C] text-slate-900 dark:text-white relative border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-red text-xs font-mono text-brand-red font-semibold uppercase tracking-wider">
            ENGINEERING PHILOSOPHY
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How We <span className="text-gradient-red">Architect Systems</span>
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
            Core engineering principles guiding every software application, microservices API, and hardware IoT prototype built by Founder Asif at Xentoryx Labs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, idx) => {
            const IconComponent = icons[idx % icons.length];
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel p-8 sm:p-10 rounded-3xl space-y-5 hover:border-brand-red/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-brand-red/10 border border-brand-red/30 text-brand-red flex items-center justify-center">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold text-brand-red uppercase tracking-widest">
                    PILLAR 0{idx + 1}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-mono text-brand-red font-bold">
                    {pillar.subtitle}
                  </p>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-mono">
                  {pillar.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-white/10">
                  {pillar.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-xs font-mono text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
