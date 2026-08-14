"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Terminal, Sparkles, Cpu, Layers, Radio, Activity } from "lucide-react";
import { useCMS } from "@/hooks/useCMS";

// Lazy load 3D R3F Canvas & Interactive 3D Character for 95+ Lighthouse Performance
const Hero3DCanvas = dynamic(() => import("./Hero3DCanvas"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 pointer-events-none" />,
});

const Interactive3DCharacter = dynamic(() => import("../canvas/Interactive3DCharacter"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center font-mono text-xs text-brand-red animate-pulse">
      Initializing 3D Character Mesh...
    </div>
  ),
});

export default function FounderHero() {
  const { founderName, tagline, settings } = useCMS();
  const heroConfig = settings?.hero || {
    statusPill: "FOUNDER & PRINCIPAL ENGINEER",
    headline: "ASIF",
    roles: ["Android Developer", "IoT Systems Engineer", "Backend Architect", "Modern Web Specialist"],
    description: "Building scalable software products, intelligent IoT hardware systems, high-throughput backend architectures, and modern web experiences through Xentoryx Labs.",
    yearsMetric: "4+",
    techNodesMetric: "15+",
    uptimeMetric: "99.9%",
    telemetryCardText: "Active // 12ms Ping",
  };

  const [roleIndex, setRoleIndex] = useState(0);
  const roles = heroConfig.roles && heroConfig.roles.length > 0 ? heroConfig.roles : ["Software Engineer", "Founder"];

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [roles.length]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Lazy-Loaded R3F 3D Scene Background */}
      <Hero3DCanvas />

      {/* Red ambient core glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-brand-red/12 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          {/* Left Column: Headline & Pitch */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel-red border border-brand-red/30">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-ping" />
              <span className="text-xs font-mono font-bold text-brand-red uppercase tracking-wider">
                {heroConfig.statusPill}
              </span>
            </div>

            {/* Main Title */}
            <div className="space-y-3">
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black tracking-tight dark:text-white text-gray-900 leading-[1.05]">
                {heroConfig.headline || founderName.toUpperCase()}
              </h1>
              <div className="h-10 flex items-center text-xl sm:text-2xl font-mono text-brand-red font-bold">
                <span className="mr-2">&gt;</span>
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {roles[roleIndex]}
                </motion.span>
              </div>
            </div>

            {/* Description Pitch */}
            <p className="text-base sm:text-lg dark:text-slate-300 text-slate-700 max-w-2xl leading-relaxed font-sans font-normal">
              {heroConfig.description || tagline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/projects"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-red to-[#FF5E50] text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 shadow-glow-red hover:shadow-glow-red-lg transition-all"
              >
                <span>Explore Projects</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <Link
                href="/#contact"
                className="px-6 py-3.5 rounded-2xl glass-panel text-slate-900 dark:text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all"
              >
                <span>Initiate Contact</span>
              </Link>
            </div>

            {/* Minimal Metrics Row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-white/10 max-w-md">
              <div>
                <div className="text-2xl font-display font-bold text-slate-900 dark:text-white">{heroConfig.yearsMetric}</div>
                <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">Experience</div>
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-slate-900 dark:text-white">{heroConfig.techNodesMetric}</div>
                <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">Tech Stack Nodes</div>
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-slate-900 dark:text-white">{heroConfig.uptimeMetric}</div>
                <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">Uptime Target</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive WebGL 3D Character Scene */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full h-[450px] sm:h-[500px]">
              {/* Purple/Red Ambient Stage Lighting */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-brand-red/10 via-purple-600/10 to-transparent blur-3xl pointer-events-none" />

              {/* 3D WebGL Canvas */}
              <Interactive3DCharacter />

              {/* Minimal Telemetry Status Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 px-4 py-2 rounded-2xl glass-panel-red border border-brand-red/40 flex items-center gap-2 shadow-2xl z-20 whitespace-nowrap"
              >
                <Activity className="w-4 h-4 text-brand-red animate-pulse" />
                <span className="text-xs font-mono text-white font-bold">
                  {heroConfig.telemetryCardText}
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
