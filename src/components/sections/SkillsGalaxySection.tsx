"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import EditorialHeading from "@/components/editorial/EditorialHeading";
import EditorialSectionNumber from "@/components/editorial/EditorialSectionNumber";

interface TechNode {
  id: string;
  name: string;
  category: "Android" | "Backend" | "Web" | "IoT";
  level: number;
  experience: string;
  description: string;
}

export default function SkillsGalaxySection() {
  const [selectedNode, setSelectedNode] = useState<TechNode | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const nodes: TechNode[] = [
    // Android
    { id: "kotlin", name: "Kotlin", category: "Android", level: 95, experience: "4+ Years", description: "Primary native language for Android software engineering and coroutines async pipelines." },
    { id: "compose", name: "Jetpack Compose", category: "Android", level: 92, experience: "3+ Years", description: "Modern declarative UI toolkit for native Android apps with reactive state management." },
    { id: "room", name: "Room DB", category: "Android", level: 90, experience: "3+ Years", description: "Offline-first SQLite abstraction layer for persistent local transaction caching." },

    // Backend
    { id: "nodejs", name: "Node.js", category: "Backend", level: 92, experience: "4+ Years", description: "High-throughput asynchronous runtime engine for microservices and API gateways." },
    { id: "postgres", name: "PostgreSQL", category: "Backend", level: 88, experience: "3+ Years", description: "Relational database indexing, schema migrations, and Prisma ORM integration." },
    { id: "redis", name: "Redis", category: "Backend", level: 84, experience: "2+ Years", description: "In-memory caching layer, rate limiting, and pub/sub message brokers." },

    // Web
    { id: "nextjs", name: "Next.js 15", category: "Web", level: 94, experience: "3+ Years", description: "Fullstack App Router architecture, Server Components, SSR, and dynamic routes." },
    { id: "react", name: "React 19", category: "Web", level: 95, experience: "4+ Years", description: "Declarative component architecture, custom hooks, and concurrent features." },
    { id: "gsap", name: "GSAP Motion", category: "Web", level: 90, experience: "2+ Years", description: "ScrollTrigger timelines, pinned storytelling, and perspective reveals." },

    // IoT
    { id: "esp32", name: "ESP32 MCU", category: "IoT", level: 92, experience: "3+ Years", description: "Embedded C++ drivers for dual-core 240MHz microcontrollers and sensors." },
    { id: "mqtt", name: "MQTT Broker", category: "IoT", level: 90, experience: "3+ Years", description: "Low-overhead telemetry messaging protocol over TLS & WebSockets." },
    { id: "ble", name: "BLE Protocol", category: "IoT", level: 88, experience: "3+ Years", description: "Bluetooth Low Energy wireless provisioning and sensor payload parsing." },
  ];

  const filteredNodes = activeFilter === "All" ? nodes : nodes.filter((n) => n.category === activeFilter);

  return (
    <section id="galaxy" className="py-24 sm:py-32 bg-[var(--bg-primary)] text-[var(--text-primary)] relative overflow-hidden border-t border-black/[0.08] dark:border-white/[0.08] transition-colors duration-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <EditorialSectionNumber number="03" title="SKILLS & PROFICIENCY MATRIX" className="mb-8" />

        <div className="max-w-3xl mb-12 space-y-4">
          <EditorialHeading level={2}>
            Engineering Mastery
          </EditorialHeading>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-sans font-normal">
            Click any technical discipline node to inspect proficiency index, experience duration, and production implementation details.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {["All", "Android", "Backend", "Web", "IoT"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold transition-all ${
                activeFilter === cat
                  ? "bg-brand-red text-white shadow-glow-red"
                  : "border border-black/10 dark:border-white/10 bg-white dark:bg-[#0E1015] text-slate-700 dark:text-slate-300 hover:border-brand-red"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Nodes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredNodes.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            return (
              <motion.button
                key={node.id}
                onClick={() => setSelectedNode(isSelected ? null : node)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-3xl text-left transition-all border ${
                  isSelected
                    ? "border-brand-red bg-white dark:bg-[#12141C] shadow-editorial dark:shadow-editorial-dark"
                    : "border-black/10 dark:border-white/10 bg-white dark:bg-[#0E1015] hover:border-brand-red/40"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-display font-bold text-slate-900 dark:text-white">
                    {node.name}
                  </span>
                  <span className="text-xs font-mono font-bold text-brand-red">
                    {node.level}%
                  </span>
                </div>

                <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">
                  {node.category} &bull; {node.experience}
                </div>

                {/* Progress bar */}
                <div className="mt-4 h-1 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-red transition-all duration-500"
                    style={{ width: `${node.level}%` }}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Node Details Drawer */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="mt-8 p-6 sm:p-8 rounded-3xl border border-brand-red/30 bg-white dark:bg-[#0E1015] max-w-2xl mx-auto space-y-3 shadow-editorial dark:shadow-editorial-dark"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-red" />
                  <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                    {selectedNode.name}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-brand-red/10 text-brand-red font-bold">
                    {selectedNode.category}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                  {selectedNode.experience}
                </span>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-mono">
                {selectedNode.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
