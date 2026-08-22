"use client";

import { Smartphone, Cpu, Server, Globe, Box, Terminal, Database, Layers } from "lucide-react";
import SectionTickerDivider from "@/components/layout/SectionTickerDivider";

export default function TechWallSection() {
  const topRow = [
    { name: "Android", icon: Smartphone },
    { name: "Kotlin", icon: Cpu },
    { name: "Jetpack Compose", icon: Layers },
    { name: "Next.js 15", icon: Globe },
    { name: "React 19", icon: Globe },
    { name: "TypeScript", icon: Terminal },
    { name: "Tailwind CSS", icon: Layers },
  ];

  const bottomRow = [
    { name: "ESP32 MCU", icon: Cpu },
    { name: "MQTT Telemetry", icon: Cpu },
    { name: "Node.js", icon: Server },
    { name: "PostgreSQL", icon: Database },
    { name: "MongoDB", icon: Database },
    { name: "Redis Cache", icon: Database },
    { name: "BLE Wireless", icon: Cpu },
  ];

  return (
    <section className="relative bg-[#0A0A0A] text-[#F5F1E8] py-20 overflow-hidden border-t border-[#F5F1E8]/10">
      <SectionTickerDivider word="iot" className="mb-12" />

      {/* Marquee Top Row */}
      <div className="relative w-full overflow-hidden mb-4 flex">
        <div className="flex gap-3 animate-marquee-right whitespace-nowrap">
          {[...topRow, ...topRow, ...topRow].map((tech, idx) => {
            const IconComp = tech.icon;
            return (
              <div
                key={idx}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-[#F5F1E8]/15 bg-[#141414] hover:border-[#D9A648] hover:bg-[#D9A648] hover:text-[#0A0A0A] transition-colors shrink-0 shadow-sm text-xs font-mono font-bold"
              >
                <IconComp className="w-4 h-4 text-[#D9A648]" />
                <span>{tech.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Marquee Bottom Row */}
      <div className="relative w-full overflow-hidden flex">
        <div className="flex gap-3 animate-marquee-left whitespace-nowrap">
          {[...bottomRow, ...bottomRow, ...bottomRow].map((tech, idx) => {
            const IconComp = tech.icon;
            return (
              <div
                key={idx}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-[#F5F1E8]/15 bg-[#141414] hover:border-[#D9A648] hover:bg-[#D9A648] hover:text-[#0A0A0A] transition-colors shrink-0 shadow-sm text-xs font-mono font-bold"
              >
                <IconComp className="w-4 h-4 text-[#D9A648]" />
                <span>{tech.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
