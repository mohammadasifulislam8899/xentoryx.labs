"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Layers, Radio, Activity, Terminal, ExternalLink } from "lucide-react";
import { useCMS } from "@/hooks/useCMS";

const Hero3DCanvas = dynamic(() => import("./Hero3DCanvas"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 pointer-events-none" />,
});

export default function StudioHero() {
  const { companyName } = useCMS();

  const studioRoles = [
    "Software & Hardware Studio",
    "Embedded IoT Infrastructure",
    "Native Android Architectures",
    "Intelligent Cloud Platforms",
  ];

  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % studioRoles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      {/* 3D Background Canvas */}
      <Hero3DCanvas />

      {/* Ambient Red Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-brand-red/12 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          {/* Left Column: Studio Pitch */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel-red border border-brand-red/30">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-ping" />
              <span className="text-xs font-mono font-bold text-brand-red uppercase tracking-wider">
                SOFTWARE & HARDWARE R&amp;D STUDIO
              </span>
            </div>

            {/* Main Studio Title */}
            <div className="space-y-3">
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black tracking-tight dark:text-white text-gray-900 leading-[1.05]">
                {companyName || "XENTORYX LABS"}
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
                  {studioRoles[roleIndex]}
                </motion.span>
              </div>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg dark:text-slate-300 text-slate-700 max-w-2xl leading-relaxed font-sans font-normal">
              Designing high-performance native Android applications, embedded IoT telemetry hardware, and scalable web infrastructure built for resilience and speed.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/projects"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-red to-[#FF5E50] text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 shadow-glow-red hover:shadow-glow-red-lg transition-all"
              >
                <span>Studio Projects</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <Link
                href="/labs"
                className="px-6 py-3.5 rounded-2xl glass-panel text-slate-900 dark:text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>R&amp;D Labs Hub</span>
              </Link>
            </div>

            {/* Studio Metrics Row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-white/10 max-w-md">
              <div>
                <div className="text-2xl font-display font-bold text-slate-900 dark:text-white">15+</div>
                <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">R&amp;D Deployments</div>
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-slate-900 dark:text-white">100%</div>
                <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">Native Architecture</div>
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-slate-900 dark:text-white">99.9%</div>
                <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">Telemetry Target</div>
              </div>
            </div>

            {/* Personal Founder Profile Link Banner */}
            <div className="pt-2">
              <Link
                href="/founder"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-600 dark:text-slate-300 hover:text-brand-red dark:hover:text-brand-red transition-colors"
              >
                <span>Looking for Founder Asif&apos;s Personal Portfolio?</span>
                <span className="font-bold text-brand-red flex items-center gap-1">
                  Visit Profile <ExternalLink className="w-3 h-3" />
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column: Studio Logo & Live Telemetry Badge */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
              {/* Outer Energy Ring */}
              <div className="absolute inset-0 rounded-full border border-brand-red/40 animate-spin-slow" />
              <div className="absolute -inset-4 rounded-full border border-brand-red/20 blur-sm" />

              {/* Studio Logo Container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-brand-red/60 shadow-2xl p-6 bg-[#07090C] flex items-center justify-center">
                <Image
                  src="/assets/logo-dark.png"
                  alt="Xentoryx Labs Brand Logo"
                  width={240}
                  height={240}
                  priority
                  className="object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Minimal Telemetry Status Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-2xl glass-panel-red border border-brand-red/40 flex items-center gap-2 shadow-2xl z-20 whitespace-nowrap"
              >
                <Activity className="w-4 h-4 text-brand-red animate-pulse" />
                <span className="text-xs font-mono text-white font-bold">
                  Studio Active // Telemetry Online
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
