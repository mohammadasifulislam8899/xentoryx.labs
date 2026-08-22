"use client";

import { motion } from "framer-motion";
import { Smartphone, Cpu, Server, Globe, CheckCircle2 } from "lucide-react";
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

  const icons = [Smartphone, Cpu, Server, Globe];

  return (
    <section id="services" className="relative bg-[#F5F1E8] dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-[#F5F1E8] py-24 sm:py-32 transition-colors duration-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="font-mono text-xs text-[#D9A648] font-bold uppercase tracking-widest">
            [ 004 // PRACTICE &amp; SOLUTIONS ]
          </div>
          <h2 className="font-display font-black text-5xl sm:text-7xl tracking-tighter lowercase leading-tight">
            capabilities
          </h2>
          <p className="text-sm font-sans opacity-80 leading-relaxed max-w-xl">
            Specialized technical disciplines offering end-to-end native Android apps, embedded hardware firmware, and scalable microservices architectures.
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
                className="p-8 sm:p-10 rounded-[32px] bg-[#FFFFFF] dark:bg-[#141414] border border-[#0A0A0A]/10 dark:border-[#F5F1E8]/10 shadow-card space-y-6 flex flex-col justify-between hover:border-[#D9A648] transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#D9A648] uppercase tracking-widest">
                      /SERVICE 0{idx + 1}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#F5F1E8] dark:bg-[#202020] flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-[#D9A648]" />
                    </div>
                  </div>

                  <h3 className="font-display font-black text-2xl sm:text-3xl text-[#0A0A0A] dark:text-[#F5F1E8] tracking-tight">
                    {svc.title}
                  </h3>

                  <p className="text-xs font-sans opacity-80 leading-relaxed">
                    {svc.description}
                  </p>
                </div>

                <div className="space-y-2.5 pt-6 border-t border-[#0A0A0A]/5 dark:border-[#F5F1E8]/10">
                  <div className="text-[10px] font-mono text-[#D9A648] uppercase font-bold tracking-wider mb-2">
                    Key Deliverables:
                  </div>
                  {svc.deliverables?.map((d, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2.5 text-xs font-mono text-[#0A0A0A] dark:text-[#F5F1E8]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D9A648]" />
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
