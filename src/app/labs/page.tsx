"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCMS } from "@/hooks/useCMS";
import { labsData } from "@/data/labsData";
import { ArrowLeft, FlaskConical, Cpu, Activity, Zap, Play, CheckCircle2, Github } from "lucide-react";

export default function LabsPage() {
  const { data } = useCMS();
  const labs = data?.labs || labsData;

  const [activeSimulation, setActiveSimulation] = useState<string | null>(null);
  const [simMetrics, setSimMetrics] = useState({
    frequency: 100,
    vibration: "0.02g",
    signal: "Optimal",
    powerDraw: "12mA",
  });

  const runSimulation = (labId: string) => {
    setActiveSimulation(labId);
    const interval = setInterval(() => {
      setSimMetrics({
        frequency: Math.floor(Math.random() * 50) + 80,
        vibration: `${(Math.random() * 0.05).toFixed(3)}g`,
        signal: Math.random() > 0.1 ? "Optimal" : "Syncing",
        powerDraw: `${(Math.random() * 5 + 10).toFixed(1)}mA`,
      });
    }, 400);

    setTimeout(() => {
      clearInterval(interval);
      setActiveSimulation(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-slate-50 dark:bg-[#07090C] text-slate-900 dark:text-white relative transition-colors duration-300">
      {/* Red ambient core */}
      <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="px-4 py-2 rounded-full glass-panel text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 transition-colors border-slate-200 dark:border-white/10"
          >
            <ArrowLeft className="w-4 h-4 text-brand-red" />
            <span>Back to Overview</span>
          </Link>
        </div>

        {/* Title */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel-red text-xs font-mono text-brand-red font-semibold uppercase tracking-wider">
            XENTORYX LABS // R&D EXPERIMENTS
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Innovation & <span className="text-gradient-red">Experimental Hardware Hub</span>
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
            Exploratory R&D prototypes, TinyML edge model quantization on ESP32 microcontrollers, high-frequency MQTT brokers, and adaptive low-power drivers designed at Xentoryx Labs.
          </p>
        </div>

        {/* Experiments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {labs.map((lab, idx) => (
            <motion.div
              key={lab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-panel p-8 rounded-3xl border border-slate-200 dark:border-white/10 flex flex-col justify-between group hover:border-brand-red/40 transition-all shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-brand-red/10 dark:bg-brand-red/20 text-brand-red border border-brand-red/30">
                    {lab.status}
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-bold">{lab.date}</span>
                </div>

                <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white group-hover:text-brand-red transition-colors">
                  {lab.title}
                </h2>
                <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold">
                  {lab.category}
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-mono">
                  {lab.description}
                </p>

                {/* Metrics */}
                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-white/10">
                  <div className="text-[10px] font-mono text-brand-red uppercase font-bold">
                    Telemetry Metrics:
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {lab.metrics.map((m) => (
                      <div key={m.label} className="p-2 rounded-xl bg-slate-100 dark:bg-surface border border-slate-200 dark:border-white/10 text-center">
                        <div className="text-[9px] text-slate-500 dark:text-slate-400 font-mono font-bold">{m.label}</div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white font-mono mt-0.5">{m.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {lab.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-slate-100 dark:bg-surface text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interactive Telemetry Simulation Widget */}
              <div className="pt-6 mt-6 border-t border-slate-200 dark:border-white/10 space-y-3">
                <button
                  onClick={() => runSimulation(lab.id)}
                  disabled={activeSimulation === lab.id}
                  className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-surface border border-brand-red/40 hover:bg-brand-red hover:text-white dark:hover:bg-brand-red text-xs font-mono text-slate-900 dark:text-white font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  {activeSimulation === lab.id ? (
                    <>
                      <Activity className="w-4 h-4 text-brand-red animate-spin" />
                      <span>Simulating Stream telemetry...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 text-brand-red" />
                      <span>Trigger Hardware Telemetry Test</span>
                    </>
                  )}
                </button>

                {/* Simulation Output Dashboard */}
                {activeSimulation === lab.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-3 rounded-xl bg-slate-900 dark:bg-[#090B0E] border border-brand-red/30 font-mono text-[11px] text-emerald-400 space-y-1"
                  >
                    <div>[SIM] Sampling Rate: {simMetrics.frequency} Hz</div>
                    <div>[SIM] Signal State: {simMetrics.signal}</div>
                    <div>[SIM] Sensor Vibration: {simMetrics.vibration}</div>
                    <div>[SIM] Power Consumption: {simMetrics.powerDraw}</div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
