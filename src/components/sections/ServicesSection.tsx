"use client";

import { motion } from "framer-motion";
import { Smartphone, Cpu, Server, Globe, Cloud, Code, CheckCircle2, ArrowRight } from "lucide-react";
import { useCMS } from "@/hooks/useCMS";

export default function ServicesSection() {
  const { settings } = useCMS();
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
  ];

  const icons = [Smartphone, Cpu, Server, Globe, Cloud, Code];

  return (
    <section id="services" className="py-24 bg-slate-50 dark:bg-[#07090C] text-slate-900 dark:text-white relative border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-red text-xs font-mono text-brand-red font-semibold uppercase tracking-wider">
            SERVICES & SOLUTIONS
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineering <span className="text-gradient-red">Capabilities</span>
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
            Specialized engineering services offering end-to-end mobile applications, hardware microcontroller firmware, and scalable web architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((svc, idx) => {
            const IconComponent = icons[idx % icons.length];
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel p-8 rounded-3xl space-y-5 hover:border-brand-red/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-brand-red/10 border border-brand-red/30 text-brand-red flex items-center justify-center">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-brand-red uppercase">
                      SERVICE 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                    {svc.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-mono">
                    {svc.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-white/10">
                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold mb-2">
                    Key Deliverables:
                  </div>
                  {svc.deliverables?.map((d, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs font-mono text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{d}</span>
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
