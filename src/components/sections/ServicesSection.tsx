"use client";

import { motion } from "framer-motion";
import { Smartphone, Cpu, Server, Globe, Cloud, ShieldAlert, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useCMS } from "@/hooks/useCMS";

export default function ServicesSection() {
  const { settings, companyName } = useCMS();

  const icons = [Smartphone, Cpu, Server, Globe, Cloud, ShieldAlert];
  const colors = ["text-emerald-400", "text-brand-red", "text-purple-400", "text-cyan-400", "text-amber-400", "text-sky-400"];

  const services = settings?.services || [
    {
      title: "Android Development",
      description: "High-performance native Android applications built with Jetpack Compose, Kotlin Coroutines, and offline-first Room DB.",
      deliverables: ["Declarative Jetpack Compose UI", "Offline-First Room Architecture", "WorkManager Background Sync", "App Store Deployment"],
    },
    {
      title: "IoT & Hardware Systems",
      description: "Embedded C++ firmware for ESP32 microcontrollers, low-power BLE provisioning, MQTT real-time streaming, and OTA updates.",
      deliverables: ["Custom ESP32 C++ Drivers", "MQTT & WebSocket Telemetry", "Bluetooth Low Energy (BLE)", "Wireless OTA Firmware Engine"],
    },
    {
      title: "Backend API Engineering",
      description: "Distributed RESTful & GraphQL microservices built with Node.js, Express, PostgreSQL, Prisma, Redis, and JWT security.",
      deliverables: ["Scalable REST & WebSocket APIs", "PostgreSQL Relational Schemas", "Redis Micro-Caching Layer", "JWT & OAuth2 Auth Pipelines"],
    },
    {
      title: "Modern Web Platforms",
      description: "Production-ready, cinematic web applications built with Next.js 15 App Router, TypeScript, GSAP, and Framer Motion.",
      deliverables: ["Apple/Linear Level Visual Polish", "GSAP ScrollTrigger Storytelling", "SEO & OpenGraph Optimization", "Lighthouse 90+ Guaranteed"],
    },
    {
      title: "Cloud & DevOps",
      description: "Containerized deployment pipelines, Docker orchestration, and cloud infrastructure setup for high availability.",
      deliverables: ["Docker Containerization", "Automated CI/CD Workflows", "SSL/TLS TLS Certification", "Cloud Infrastructure Setup"],
    },
    {
      title: "Technical Consulting",
      description: "Architecture audits, tech stack strategy, performance optimization, and IoT hardware feasibility assessments.",
      deliverables: ["Codebase Quality Audit", "System Architecture Blueprint", "IoT Hardware Feasibility", "Performance Tuning"],
    },
  ];

  return (
    <section id="services" className="py-24 bg-[#0D0F14] relative overflow-hidden border-t border-white/5">
      {/* Background Red Ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-red/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-red text-xs font-mono text-brand-red font-semibold uppercase tracking-wider">
            SERVICES & SOLUTIONS
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            How <span className="text-gradient-red">Xentoryx Labs</span> Can Help
          </h2>
          <p className="text-base text-brand-muted leading-relaxed">
            Enterprise-grade software development, hardware system design, and technical consulting tailored for high-growth tech ventures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const IconComp = icons[idx % icons.length];
            const colorClass = colors[idx % colors.length];

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-brand-red/40 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-2xl bg-surface border border-white/10 ${colorClass} group-hover:scale-110 transition-transform`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <Link
                      href="/#contact"
                      className="p-2 rounded-full glass-panel text-brand-muted hover:text-white hover:border-brand-red/40 transition-colors"
                      aria-label="Inquire"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white group-hover:text-brand-red transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-brand-muted leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-white/10">
                    <div className="text-[10px] font-mono text-brand-red uppercase font-semibold">
                      Deliverables:
                    </div>
                    <ul className="space-y-1">
                      {service.deliverables.map((item) => (
                        <li key={item} className="text-[11px] text-gray-300 flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-brand-red" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
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
