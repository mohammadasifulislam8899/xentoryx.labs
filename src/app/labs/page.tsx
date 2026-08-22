"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCMS } from "@/hooks/useCMS";
import { labsData } from "@/data/labsData";
import { ArrowLeft, Activity, Play, Terminal, Cpu, Radio, ShieldCheck } from "lucide-react";
import SectionTickerDivider from "@/components/layout/SectionTickerDivider";

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

  const apiEndpoints = [
    { method: "GET", path: "/api/devices/firmware/latest", desc: "Delivers latest Over-The-Air (OTA) binary payloads to ESP32 microcontrollers" },
    { method: "POST", path: "/api/devices", desc: "Registers new edge hardware nodes and parses active MQTT sensor telemetry streams" },
    { method: "POST", path: "/api/chat", desc: "Processes streaming XenAI dialogue powered by Google Gemini AI runtime" },
    { method: "GET / POST", path: "/api/admin/data", desc: "Fetches CMS configuration, syncs to MongoDB Atlas, and handles client inquiry dockets" },
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#F5F1E8] dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-[#F5F1E8] relative transition-colors duration-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Navigation & Header */}
        <div className="space-y-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono opacity-70 hover:opacity-100 hover:text-[#D9A648] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Studio Overview</span>
          </Link>

          <div className="max-w-3xl space-y-4 border-b border-[#0A0A0A]/10 dark:border-[#F5F1E8]/10 pb-10">
            <div className="font-mono text-xs text-[#D9A648] font-bold uppercase tracking-widest">
              [ 001 // R&amp;D HARDWARE &amp; FIRMWARE LAB ]
            </div>
            <h1 className="font-display font-black text-5xl sm:text-7xl tracking-tighter lowercase leading-tight">
              laboratory
            </h1>
            <p className="text-sm font-sans opacity-80 leading-relaxed max-w-xl">
              Exploratory R&amp;D prototypes, TinyML edge model quantization on ESP32 microcontrollers, high-frequency MQTT brokers, and adaptive low-power telemetry drivers.
            </p>
          </div>
        </div>

        {/* Experiments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {labs.map((lab, idx) => (
            <motion.div
              key={lab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-8 rounded-[32px] bg-white dark:bg-[#141414] border border-[#0A0A0A]/10 dark:border-[#F5F1E8]/10 shadow-card flex flex-col justify-between group hover:border-[#D9A648] transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-[#D9A648] text-[#0A0A0A]">
                    {lab.status}
                  </span>
                  <span className="text-xs font-mono opacity-60 font-bold">{lab.date}</span>
                </div>

                <h2 className="font-display font-black text-2xl tracking-tight text-[#0A0A0A] dark:text-[#F5F1E8] group-hover:text-[#D9A648] transition-colors">
                  {lab.title}
                </h2>
                <div className="text-xs font-mono text-[#D9A648] font-bold">
                  {lab.category}
                </div>

                <p className="text-xs opacity-80 leading-relaxed font-sans">
                  {lab.description}
                </p>

                {/* Metrics */}
                <div className="space-y-2 pt-2 border-t border-[#0A0A0A]/5 dark:border-[#F5F1E8]/5">
                  <div className="text-[10px] font-mono text-[#D9A648] uppercase font-bold tracking-widest">
                    Telemetry Specifications:
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {lab.metrics.map((m) => (
                      <div key={m.label} className="p-2.5 rounded-2xl bg-[#F5F1E8] dark:bg-[#1C1C1C] text-center">
                        <div className="text-[9px] opacity-60 font-mono font-bold">{m.label}</div>
                        <div className="text-xs font-bold text-[#0A0A0A] dark:text-[#F5F1E8] font-mono mt-0.5">{m.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {lab.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-black/5 dark:bg-white/10 opacity-90 font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Simulation Trigger */}
              <div className="pt-6 mt-6 border-t border-[#0A0A0A]/5 dark:border-[#F5F1E8]/5 space-y-3">
                <button
                  onClick={() => runSimulation(lab.id)}
                  disabled={activeSimulation === lab.id}
                  className="w-full py-3 rounded-full bg-[#0A0A0A] text-[#F5F1E8] dark:bg-[#F5F1E8] dark:text-[#0A0A0A] hover:bg-[#D9A648] hover:text-[#0A0A0A] dark:hover:bg-[#D9A648] dark:hover:text-[#0A0A0A] text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {activeSimulation === lab.id ? (
                    <>
                      <Activity className="w-4 h-4 text-[#D9A648] animate-spin" />
                      <span>Simulating Telemetry Stream...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 text-[#D9A648]" />
                      <span>Trigger Simulation</span>
                    </>
                  )}
                </button>

                {activeSimulation === lab.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#D9A648] font-mono text-[11px] text-[#D9A648] space-y-1"
                  >
                    <div>[SIM] Sampling Rate: {simMetrics.frequency} Hz</div>
                    <div>[SIM] Signal State: {simMetrics.signal}</div>
                    <div>[SIM] Vibration Sensor: {simMetrics.vibration}</div>
                    <div>[SIM] Power Draw: {simMetrics.powerDraw}</div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* API DOCUMENTATION SECTION (as specified in prompt) */}
        <div className="space-y-6 pt-12 border-t border-[#0A0A0A]/10 dark:border-[#F5F1E8]/10">
          <div className="space-y-2">
            <div className="font-mono text-xs text-[#D9A648] font-bold uppercase tracking-widest">
              [ 002 // REST &amp; OTA FIRMWARE API DIRECTORY ]
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl tracking-tight lowercase">
              api endpoints
            </h2>
            <p className="text-xs font-sans opacity-70">
              Live serverless microservices powering hardware provisioning, over-the-air firmware binaries, and Gemini AI companion dialogue.
            </p>
          </div>

          <div className="space-y-3">
            {apiEndpoints.map((ep, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-[24px] bg-white dark:bg-[#141414] border border-[#0A0A0A]/10 dark:border-[#F5F1E8]/10 shadow-sm hover:border-[#D9A648] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-[#D9A648] text-[#0A0A0A] text-[10px] font-mono font-bold">
                    {ep.method}
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-[#0A0A0A] dark:text-[#F5F1E8]">
                    {ep.path}
                  </span>
                </div>

                <span className="text-xs font-sans opacity-75 max-w-md">
                  {ep.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
