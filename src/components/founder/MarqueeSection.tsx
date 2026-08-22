"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setScrollOffset(offset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Curated project previews and hardware renders
  const row1Items = [
    { title: "Dipannita ESP32 Companion", category: "Hardware IoT", tag: "GC9A01A Display", bg: "from-blue-900/50 to-purple-900/50" },
    { title: "Jetpack Compose UI Screen", category: "Android Mobile", tag: "Kotlin Native", bg: "from-emerald-900/50 to-teal-900/50" },
    { title: "MayaEyes Eye Animation", category: "Robotics TinyML", tag: "ESP32 C++", bg: "from-amber-900/50 to-red-900/50" },
    { title: "Shomoy Ghor Storefront", category: "Web Platform", tag: "Next.js 15", bg: "from-sky-900/50 to-indigo-900/50" },
    { title: "Xentoryx Labs Telemetry Hub", category: "Cloud Microservices", tag: "MQTT / Edge", bg: "from-violet-900/50 to-pink-900/50" },
  ];

  const row2Items = [
    { title: "ESP32 Sensor Matrix Node", category: "Embedded Firmware", tag: "BLE / WiFi", bg: "from-cyan-900/50 to-blue-900/50" },
    { title: "Dipannita Round Eye Render", category: "3D CAD Enclosure", tag: "Hardware Design", bg: "from-orange-900/50 to-amber-900/50" },
    { title: "bKash Payment Gateway Flow", category: "E-Commerce Fintech", tag: "PostgreSQL API", bg: "from-rose-900/50 to-red-900/50" },
    { title: "XenAI Intelligence Console", category: "Gemini AI Assistant", tag: "Edge AI API", bg: "from-purple-900/50 to-fuchsia-900/50" },
    { title: "Modern Portfolio Architecture", category: "Design System", tag: "React 19 / GSAP", bg: "from-teal-900/50 to-emerald-900/50" },
  ];

  const tripledRow1 = [...row1Items, ...row1Items, ...row1Items];
  const tripledRow2 = [...row2Items, ...row2Items, ...row2Items];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden select-none"
    >
      <div className="flex flex-col gap-3">
        {/* Row 1: Moves RIGHT on scroll */}
        <div
          style={{
            transform: `translateX(${scrollOffset - 200}px)`,
            willChange: "transform",
          }}
          className="flex gap-3 whitespace-nowrap"
        >
          {tripledRow1.map((item, idx) => (
            <div
              key={idx}
              className={`w-[320px] h-[200px] sm:w-[420px] sm:h-[270px] rounded-2xl bg-gradient-to-br ${item.bg} border border-[#D7E2EA]/10 p-6 flex flex-col justify-between shrink-0 shadow-lg relative overflow-hidden group`}
            >
              <div className="flex items-center justify-between z-10">
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#0C0C0C]/80 text-[#D7E2EA] border border-[#D7E2EA]/20">
                  {item.category}
                </span>
                <span className="text-[10px] font-mono text-[#D7E2EA]/60 uppercase">
                  {item.tag}
                </span>
              </div>

              <div className="z-10">
                <h3 className="font-sans font-bold text-lg sm:text-xl text-white tracking-tight">
                  {item.title}
                </h3>
              </div>

              {/* Decorative grid pattern in card */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D7E2EA_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Row 2: Moves LEFT on scroll */}
        <div
          style={{
            transform: `translateX(${-(scrollOffset - 200)}px)`,
            willChange: "transform",
          }}
          className="flex gap-3 whitespace-nowrap"
        >
          {tripledRow2.map((item, idx) => (
            <div
              key={idx}
              className={`w-[320px] h-[200px] sm:w-[420px] sm:h-[270px] rounded-2xl bg-gradient-to-br ${item.bg} border border-[#D7E2EA]/10 p-6 flex flex-col justify-between shrink-0 shadow-lg relative overflow-hidden group`}
            >
              <div className="flex items-center justify-between z-10">
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#0C0C0C]/80 text-[#D7E2EA] border border-[#D7E2EA]/20">
                  {item.category}
                </span>
                <span className="text-[10px] font-mono text-[#D7E2EA]/60 uppercase">
                  {item.tag}
                </span>
              </div>

              <div className="z-10">
                <h3 className="font-sans font-bold text-lg sm:text-xl text-white tracking-tight">
                  {item.title}
                </h3>
              </div>

              {/* Decorative grid pattern */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D7E2EA_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
