"use client";

import { motion } from "framer-motion";
import { Zap, Layers, HeartHandshake, Bot, CheckCircle2 } from "lucide-react";

export default function PhilosophySection() {
  const pillars = [
    {
      title: "Build Fast",
      subtitle: "Rapid Prototyping to Production",
      icon: Zap,
      color: "text-amber-400",
      borderColor: "border-amber-500/30",
      description:
        "Moving swiftly from initial architectural concept to clean, production-ready code without cutting engineering corners.",
      points: ["Modular Clean Architecture", "Iterative Sprint Deployment", "Zero Tech Debt Strategy"],
    },
    {
      title: "Think Scalable",
      subtitle: "Enterprise-Grade Performance",
      icon: Layers,
      color: "text-brand-red",
      borderColor: "border-brand-red/40",
      description:
        "Architecting software microservices and IoT hardware pipelines designed to effortlessly handle exponential user & data growth.",
      points: ["Offline-First Android Data Caching", "High-Throughput MQTT Brokers", "Database Indexing & Micro-caching"],
    },
    {
      title: "Design for Humans",
      subtitle: "Apple & Linear Level Polish",
      icon: HeartHandshake,
      color: "text-purple-400",
      borderColor: "border-purple-500/30",
      description:
        "Crafting intuitive user interfaces, buttery smooth animations, and ergonomic software designs that wow users at first glance.",
      points: ["Declarative Jetpack Compose & React 19", "Micro-interactions & Smooth Scroll", "Accessible & Dark Mode First"],
    },
    {
      title: "Automate Everything",
      subtitle: "Continuous Telemetry & OTA",
      icon: Bot,
      color: "text-emerald-400",
      borderColor: "border-emerald-500/30",
      description:
        "Automating build pipelines, hardware Over-The-Air (OTA) updates, cloud container deployments, and background monitoring.",
      points: ["OTA Wireless ESP32 Updating", "Dockerized Container Workflows", "Automated System Diagnostics"],
    },
  ];

  return (
    <section className="py-24 bg-[#0D0F14] relative overflow-hidden border-t border-white/5">
      {/* Subtle Red Core Background Element */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-red text-xs font-mono text-brand-red font-semibold uppercase tracking-wider">
            PHILOSOPHY & STANDARDS
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineering Principles That Drive <span className="text-gradient-red">Xentoryx Labs</span>
          </h2>
          <p className="text-base text-brand-muted leading-relaxed">
            Every product, Android application, IoT firmware driver, and web interface is built around four uncompromising core tenets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, idx) => {
            const IconComp = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`glass-panel p-8 rounded-3xl border ${pillar.borderColor} hover:border-brand-red/50 transition-all group relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none group-hover:bg-brand-red/10 transition-colors" />

                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-surface border border-white/10 flex items-center justify-center ${pillar.color} shadow-lg group-hover:scale-110 transition-transform`}>
                    <IconComp className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white group-hover:text-brand-red transition-colors">
                      {pillar.title}
                    </h3>
                    <div className="text-xs font-mono text-brand-muted uppercase tracking-wider">
                      {pillar.subtitle}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                  {pillar.description}
                </p>

                <ul className="space-y-2 border-t border-white/10 pt-4">
                  {pillar.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-xs text-brand-muted">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-red shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
