"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Server, Globe, Cpu, Sparkles, Code2, CheckCircle2 } from "lucide-react";

interface TechNode {
  id: string;
  name: string;
  category: "Android" | "Backend" | "Web" | "IoT";
  level: number;
  experience: string;
  description: string;
  color: string;
  glowColor: string;
}

export default function SkillsGalaxySection() {
  const [selectedNode, setSelectedNode] = useState<TechNode | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const nodes: TechNode[] = [
    // Android
    { id: "kotlin", name: "Kotlin", category: "Android", level: 95, experience: "4+ Years", description: "Primary native language for Android software engineering and coroutines async pipelines.", color: "text-emerald-400", glowColor: "rgba(52, 211, 153, 0.4)" },
    { id: "compose", name: "Jetpack Compose", category: "Android", level: 92, experience: "3+ Years", description: "Modern declarative UI toolkit for native Android apps with reactive state management.", color: "text-cyan-400", glowColor: "rgba(34, 211, 238, 0.4)" },
    { id: "room", name: "Room DB", category: "Android", level: 90, experience: "3+ Years", description: "Offline-first SQLite abstraction layer for persistent local transaction caching.", color: "text-blue-400", glowColor: "rgba(96, 165, 250, 0.4)" },

    // Backend
    { id: "nodejs", name: "Node.js", category: "Backend", level: 92, experience: "4+ Years", description: "High-throughput asynchronous runtime engine for microservices and API gateways.", color: "text-green-400", glowColor: "rgba(74, 222, 128, 0.4)" },
    { id: "postgres", name: "PostgreSQL", category: "Backend", level: 88, experience: "3+ Years", description: "Relational database indexing, schema migrations, and Prisma ORM integration.", color: "text-sky-400", glowColor: "rgba(56, 189, 248, 0.4)" },
    { id: "redis", name: "Redis", category: "Backend", level: 84, experience: "2+ Years", description: "In-memory caching layer, rate limiting, and pub/sub message brokers.", color: "text-red-400", glowColor: "rgba(248, 113, 113, 0.4)" },

    // Web
    { id: "nextjs", name: "Next.js 15", category: "Web", level: 94, experience: "3+ Years", description: "Fullstack App Router architecture, Server Components, SSR, and dynamic routes.", color: "text-white", glowColor: "rgba(255, 255, 255, 0.4)" },
    { id: "react", name: "React 19", category: "Web", level: 95, experience: "4+ Years", description: "Declarative component architecture, custom hooks, and concurrent features.", color: "text-sky-400", glowColor: "rgba(56, 189, 248, 0.4)" },
    { id: "gsap", name: "GSAP Motion", category: "Web", level: 90, experience: "2+ Years", description: "ScrollTrigger timelines, pinned storytelling, and perspective reveals.", color: "text-amber-400", glowColor: "rgba(251, 191, 36, 0.4)" },

    // IoT
    { id: "esp32", name: "ESP32 MCU", category: "IoT", level: 92, experience: "3+ Years", description: "Embedded C++ drivers for dual-core 240MHz microcontrollers and sensors.", color: "text-brand-red", glowColor: "rgba(219, 67, 56, 0.5)" },
    { id: "mqtt", name: "MQTT Broker", category: "IoT", level: 90, experience: "3+ Years", description: "Low-overhead telemetry messaging protocol over TLS & WebSockets.", color: "text-orange-400", glowColor: "rgba(251, 146, 60, 0.4)" },
    { id: "ble", name: "BLE Protocol", category: "IoT", level: 88, experience: "3+ Years", description: "Bluetooth Low Energy wireless provisioning and sensor payload parsing.", color: "text-purple-400", glowColor: "rgba(192, 132, 252, 0.4)" },
  ];

  const filteredNodes = activeFilter === "All" ? nodes : nodes.filter((n) => n.category === activeFilter);

  return (
    <section id="galaxy" className="py-24 bg-[#0F1115] dark:bg-[#0A0C10] text-white relative overflow-hidden border-t border-white/5">
      {/* Red ambient core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-red text-xs font-mono text-brand-red font-semibold uppercase tracking-wider">
            INTERACTIVE TECH GALAXY
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineering <span className="text-gradient-red">Stack Galaxy</span>
          </h2>
          <p className="text-base text-brand-muted leading-relaxed">
            Click any node in the galaxy to inspect mastery levels, real-world experience, and technical implementation details.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {["All", "Android", "Backend", "Web", "IoT"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all ${
                activeFilter === cat
                  ? "bg-brand-red text-white shadow-glow-red"
                  : "glass-panel text-brand-muted hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Galaxy Nodes Grid (Responsive Mobile Fallback) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredNodes.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            return (
              <motion.button
                key={node.id}
                onClick={() => setSelectedNode(isSelected ? null : node)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`p-5 rounded-2xl text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? "glass-panel-red border-brand-red shadow-glow-red"
                    : "glass-panel border-white/10 hover:border-brand-red/40"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-mono font-bold ${node.color}`}>
                    {node.name}
                  </span>
                  <span className="text-[10px] font-mono text-brand-muted">
                    {node.level}%
                  </span>
                </div>

                <div className="text-[10px] font-mono text-brand-muted uppercase">
                  {node.category} • {node.experience}
                </div>

                {/* Progress bar */}
                <div className="mt-3 h-1 w-full bg-surface rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-red to-[#FF5E50]"
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 p-6 rounded-3xl glass-panel-red border border-brand-red/40 max-w-2xl mx-auto space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-red" />
                  <h3 className="font-display text-xl font-bold text-white">
                    {selectedNode.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-brand-red/20 text-brand-red font-bold">
                    {selectedNode.category}
                  </span>
                </div>
                <span className="text-xs font-mono text-brand-muted">
                  Experience: {selectedNode.experience}
                </span>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed font-mono">
                {selectedNode.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
