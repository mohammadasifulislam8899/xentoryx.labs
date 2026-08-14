"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Bot, Cpu, Smartphone, Server, Globe, Sparkles, Activity } from "lucide-react";
import { useCMS } from "@/hooks/useCMS";

export default function FounderHero({ onOpenAi }: { onOpenAi: () => void }) {
  const { settings, founderName, companyName } = useCMS();
  const [roleIndex, setRoleIndex] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement | null>(null);

  const roles = settings?.hero?.roles || [
    "Android Developer",
    "IoT Systems Engineer",
    "Backend Architect",
    "Modern Web Specialist",
    `Founder of ${companyName}`,
  ];

  // Auto-rotate subheadline roles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [roles.length]);

  // Mouse tilt tracking for 2.5D perspective
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const techBadges = [
    { label: "Android", icon: Smartphone, color: "text-emerald-400" },
    { label: "Kotlin", icon: Cpu, color: "text-purple-400" },
    { label: "ESP32", icon: Cpu, color: "text-red-400" },
    { label: "Next.js", icon: Globe, color: "text-cyan-400" },
    { label: "Node.js", icon: Server, color: "text-green-400" },
    { label: "PostgreSQL", icon: Server, color: "text-blue-400" },
    { label: "Docker", icon: Server, color: "text-sky-400" },
    { label: "MQTT", icon: Cpu, color: "text-amber-400" },
  ];

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-[#0F1115]"
    >
      {/* Red Energy Core Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Pitch */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-red border border-brand-red/30 text-xs">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-ping" />
              <span className="font-mono text-brand-red font-semibold uppercase tracking-wider">
                {settings?.hero?.statusPill || "FOUNDER & PRINCIPAL ENGINEER"}
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-white uppercase">
                {settings?.hero?.headline || founderName}<span className="text-brand-red">.</span>
              </h1>

              {/* Cycling Role Subheadline */}
              <div className="h-10 sm:h-12 overflow-hidden flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={roleIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="font-display text-xl sm:text-2xl lg:text-3xl font-semibold text-gradient-red"
                  >
                    {roles[roleIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-brand-muted max-w-xl leading-relaxed">
              {settings?.hero?.description || `Building scalable software products, intelligent IoT hardware systems, high-throughput backend architectures, and modern web experiences through ${companyName}.`}
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/projects"
                className="group relative px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-red via-[#FF5E50] to-brand-red text-white font-semibold text-sm shadow-glow-red hover:shadow-glow-red-lg transition-all flex items-center gap-2 overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/#contact"
                className="px-6 py-3.5 rounded-xl glass-panel text-white font-semibold text-sm hover:border-brand-red/40 hover:text-brand-red transition-all flex items-center gap-2"
              >
                <span>Contact Asif</span>
              </Link>

              <button
                onClick={onOpenAi}
                className="px-4 py-3.5 rounded-xl glass-panel text-brand-red border border-brand-red/30 hover:bg-brand-red/10 text-xs font-semibold font-mono flex items-center gap-2 transition-colors"
              >
                <Bot className="w-4 h-4 animate-bounce" />
                <span>Gemini AI Assistant</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 max-w-md">
              <div>
                <div className="text-2xl font-bold font-display text-white">{settings?.hero?.yearsMetric || "4+"}</div>
                <div className="text-xs text-brand-muted">Years Engineering</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-display text-brand-red">{settings?.hero?.techNodesMetric || "15+"}</div>
                <div className="text-xs text-brand-muted">Tech Stack Nodes</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-display text-white">{settings?.hero?.uptimeMetric || "99.9%"}</div>
                <div className="text-xs text-brand-muted">System Uptime</div>
              </div>
            </div>
          </div>

          {/* Right Column: Performance Founder Hero Avatar Matrix */}
          <div className="lg:col-span-6 flex justify-center relative">
            <motion.div
              style={{
                rotateX: -mouseOffset.y,
                rotateY: mouseOffset.x,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative w-full max-w-md aspect-square flex items-center justify-center"
            >
              {/* Outer Rotating Red Holographic Energy Ring */}
              <div className="absolute inset-0 rounded-full border border-brand-red/40 animate-orbit-spin shadow-[0_0_40px_rgba(219,67,56,0.3)]" />
              <div className="absolute inset-4 rounded-full border border-dashed border-white/20 animate-orbit-reverse" />

              {/* Red Energy Core Ring Behind Photo */}
              <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-brand-red/40 to-transparent blur-2xl animate-pulse-glow" />

              {/* Founder Avatar Frame */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-2 bg-gradient-to-b from-brand-red via-surface to-brand-red/30 shadow-2xl overflow-hidden z-10">
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 bg-[#14171F]">
                  <Image
                    src="/assets/founder-asif.jpg"
                    alt="Founder Asif — Xentoryx Labs"
                    fill
                    sizes="(max-width: 768px) 256px, 320px"
                    className="object-cover object-top hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  {/* Futuristic Overlay Shader Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-transparent to-transparent opacity-60" />
                </div>
              </div>

              {/* Orbiting Technology Badges around Avatar */}
              <div className="absolute inset-0 pointer-events-none">
                {techBadges.slice(0, 4).map((badge, idx) => {
                  const angles = [0, 90, 180, 270];
                  const angle = angles[idx];
                  const rad = (angle * Math.PI) / 180;
                  const radius = 175;
                  const x = Math.cos(rad) * radius;
                  const y = Math.sin(rad) * radius;

                  const IconComp = badge.icon;

                  return (
                    <motion.div
                      key={badge.label}
                      animate={{
                        y: [0, -8, 0],
                      }}
                      transition={{
                        duration: 3,
                        delay: idx * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                      className="absolute top-1/2 left-1/2 -ml-12 -mt-5 px-3 py-1.5 rounded-full glass-panel-red border border-brand-red/40 flex items-center gap-1.5 shadow-lg pointer-events-auto hover:scale-110 transition-transform"
                    >
                      <IconComp className={`w-3.5 h-3.5 ${badge.color}`} />
                      <span className="text-[11px] font-mono font-semibold text-white">
                        {badge.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Floating Real-time Telemetry Card */}
              <div className="absolute -bottom-4 -left-4 glass-panel p-3 rounded-2xl border border-white/10 shadow-xl z-20 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-brand-red/20 border border-brand-red/40 flex items-center justify-center text-brand-red">
                  <Activity className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <div className="text-[10px] text-brand-muted font-mono uppercase">IoT Control Mesh</div>
                  <div className="text-xs font-bold text-white">Active // 12ms Ping</div>
                </div>
              </div>

              {/* Floating Engineering Badge */}
              <div className="absolute -top-2 -right-2 glass-panel px-3 py-1.5 rounded-xl border border-brand-red/30 z-20 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-red" />
                <span className="text-[11px] font-mono font-bold text-white">Xentoryx Architecture</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
