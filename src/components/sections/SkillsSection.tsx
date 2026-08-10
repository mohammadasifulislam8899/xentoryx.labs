"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillsData } from "@/data/skillsData";
import { Smartphone, Server, Globe, Cpu, Check, Code, Sparkles } from "lucide-react";

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<"ANDROID" | "BACKEND" | "WEB" | "IOT">("ANDROID");

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "ANDROID":
        return <Smartphone className="w-4 h-4" />;
      case "BACKEND":
        return <Server className="w-4 h-4" />;
      case "WEB":
        return <Globe className="w-4 h-4" />;
      case "IOT":
        return <Cpu className="w-4 h-4" />;
      default:
        return <Code className="w-4 h-4" />;
    }
  };

  const currentCategoryData = skillsData.find((c) => c.category === activeCategory) || skillsData[0];

  return (
    <section id="skills" className="py-24 bg-[#0D0F14] relative overflow-hidden border-t border-white/5">
      {/* Background Red Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-red text-xs font-mono text-brand-red font-semibold uppercase tracking-wider">
            TECHNICAL MATRIX
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Specialized <span className="text-gradient-red">Engineering Skills</span>
          </h2>
          <p className="text-base text-brand-muted leading-relaxed">
            Deep technical capability across Mobile Systems, Embedded IoT Hardware, Scalable Cloud Backends, and Modern Web Architecture.
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {skillsData.map((cat) => {
            const isActive = activeCategory === cat.category;
            return (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-2 transition-all ${
                  isActive
                    ? "text-white shadow-glow-red"
                    : "text-brand-muted hover:text-white glass-panel border-white/10"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute inset-0 bg-gradient-to-r from-brand-red to-[#FF5E50] rounded-full z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {getCategoryIcon(cat.category)}
                  <span>{cat.category}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Category Description */}
        <div className="text-center max-w-xl mx-auto mb-10 text-xs font-mono text-brand-muted">
          {currentCategoryData.description}
        </div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {currentCategoryData.skills.map((skill, idx) => (
              <div
                key={skill.name}
                className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-brand-red/40 transition-all hover:scale-[1.02] group relative overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-brand-red transition-colors flex items-center gap-2">
                      <span>{skill.name}</span>
                    </h3>
                    <span className="text-[10px] font-mono text-brand-muted">
                      Exp: {skill.experience}
                    </span>
                  </div>

                  {skill.badge && (
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-brand-red/20 text-brand-red border border-brand-red/40 font-semibold">
                      {skill.badge}
                    </span>
                  )}
                </div>

                {/* Level Progress Laser Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-mono text-brand-muted">
                    <span>MASTERY LEVEL</span>
                    <span className="text-white font-bold">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.05 }}
                      className="h-full bg-gradient-to-r from-brand-red to-[#FF5E50] shadow-[0_0_12px_#DB4338]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
