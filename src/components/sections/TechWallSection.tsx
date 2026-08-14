"use client";

import { motion } from "framer-motion";
import { Cpu, Smartphone, Server, Globe, Box, Terminal, Database, Layers } from "lucide-react";

export default function TechWallSection() {
  const topRow = [
    { name: "Android", icon: Smartphone, color: "text-emerald-500 dark:text-emerald-400" },
    { name: "Kotlin", icon: Cpu, color: "text-purple-500 dark:text-purple-400" },
    { name: "Jetpack Compose", icon: Layers, color: "text-cyan-500 dark:text-cyan-400" },
    { name: "Next.js 15", icon: Globe, color: "text-slate-900 dark:text-white" },
    { name: "React 19", icon: Globe, color: "text-sky-500 dark:text-sky-400" },
    { name: "TypeScript", icon: Terminal, color: "text-blue-500 dark:text-blue-400" },
    { name: "Tailwind CSS", icon: Layers, color: "text-teal-500 dark:text-teal-400" },
    { name: "GSAP Motion", icon: Box, color: "text-amber-500 dark:text-amber-400" },
  ];

  const bottomRow = [
    { name: "ESP32 MCU", icon: Cpu, color: "text-brand-red" },
    { name: "MQTT Protocol", icon: Cpu, color: "text-orange-500 dark:text-orange-400" },
    { name: "Node.js", icon: Server, color: "text-green-500 dark:text-green-400" },
    { name: "PostgreSQL", icon: Database, color: "text-blue-500 dark:text-blue-400" },
    { name: "MongoDB", icon: Database, color: "text-emerald-500 dark:text-emerald-400" },
    { name: "Redis", icon: Database, color: "text-red-500 dark:text-red-400" },
    { name: "Docker", icon: Box, color: "text-sky-500 dark:text-sky-400" },
    { name: "BLE Wireless", icon: Cpu, color: "text-indigo-500 dark:text-indigo-400" },
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-[#0B0D11] text-slate-900 dark:text-white relative overflow-hidden border-t border-b border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel-red text-xs font-mono text-brand-red font-semibold uppercase tracking-wider mb-3">
          TECH WALL & ENGINE
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Powered By <span className="text-gradient-red">Modern Engineering Stacks</span>
        </h2>
      </div>

      {/* Marquee Wrapper Top (Left-to-Right) */}
      <div className="relative w-full overflow-hidden mb-6 flex">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 dark:from-[#0B0D11] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 dark:from-[#0B0D11] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 animate-marquee-right whitespace-nowrap">
          {[...topRow, ...topRow, ...topRow].map((tech, idx) => {
            const IconComp = tech.icon;
            return (
              <div
                key={idx}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl glass-panel border border-slate-200 dark:border-white/10 hover:border-brand-red/40 transition-colors shrink-0"
              >
                <IconComp className={`w-4 h-4 ${tech.color}`} />
                <span className="font-mono text-sm font-semibold text-slate-900 dark:text-white">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Marquee Wrapper Bottom (Right-to-Left) */}
      <div className="relative w-full overflow-hidden flex">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 dark:from-[#0B0D11] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 dark:from-[#0B0D11] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 animate-marquee-left whitespace-nowrap">
          {[...bottomRow, ...bottomRow, ...bottomRow].map((tech, idx) => {
            const IconComp = tech.icon;
            return (
              <div
                key={idx}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl glass-panel border border-slate-200 dark:border-white/10 hover:border-brand-red/40 transition-colors shrink-0"
              >
                <IconComp className={`w-4 h-4 ${tech.color}`} />
                <span className="font-mono text-sm font-semibold text-slate-900 dark:text-white">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
