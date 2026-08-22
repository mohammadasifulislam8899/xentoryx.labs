"use client";

import React, { useRef, useState, useEffect } from "react";

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const multiplier = window.innerWidth < 640 ? 0.2 : 0.3;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * multiplier;
      setScrollOffset(offset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Curated project previews and hardware renders
  const row1Items = [
    { title: "Dipannita ESP32 Companion", category: "Hardware IoT", tag: "GC9A01A Display", bg: "from-blue-900/40 to-purple-900/40" },
    { title: "Jetpack Compose UI Screen", category: "Android Mobile", tag: "Kotlin Native", bg: "from-emerald-900/40 to-teal-900/40" },
    { title: "MayaEyes Eye Animation", category: "Robotics TinyML", tag: "ESP32 C++", bg: "from-amber-900/40 to-red-900/40" },
    { title: "Shomoy Ghor Storefront", category: "Web Platform", tag: "Next.js 15", bg: "from-sky-900/40 to-indigo-900/40" },
    { title: "Xentoryx Labs Telemetry Hub", category: "Cloud Microservices", tag: "MQTT / Edge", bg: "from-violet-900/40 to-pink-900/40" },
  ];

  const row2Items = [
    { title: "ESP32 Sensor Matrix Node", category: "Embedded Firmware", tag: "BLE / WiFi", bg: "from-cyan-900/40 to-blue-900/40" },
    { title: "Dipannita Round Eye Render", category: "3D CAD Enclosure", tag: "Hardware Design", bg: "from-orange-900/40 to-amber-900/40" },
    { title: "bKash Payment Gateway Flow", category: "E-Commerce Fintech", tag: "PostgreSQL API", bg: "from-rose-900/40 to-red-900/40" },
    { title: "XenAI Intelligence Console", category: "Gemini AI Assistant", tag: "Edge AI API", bg: "from-purple-900/40 to-fuchsia-900/40" },
    { title: "Modern Portfolio Architecture", category: "Design System", tag: "React 19 / GSAP", bg: "from-teal-900/40 to-emerald-900/40" },
  ];

  const tripledRow1 = [...row1Items, ...row1Items, ...row1Items];
  const tripledRow2 = [...row2Items, ...row2Items, ...row2Items];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[var(--bg-primary)] pt-14 sm:pt-28 md:pt-36 pb-8 sm:pb-12 overflow-hidden select-none transition-colors duration-300"
    >
      <div className="flex flex-col gap-2.5 sm:gap-3">
        {/* Row 1: Moves RIGHT on scroll */}
        <div
          style={{
            transform: `translateX(${scrollOffset - 150}px)`,
            willChange: "transform",
          }}
          className="flex gap-2.5 sm:gap-3 whitespace-nowrap"
        >
          {tripledRow1.map((item, idx) => (
            <div
              key={idx}
              className={`w-[240px] h-[155px] xs:w-[260px] xs:h-[170px] sm:w-[360px] sm:h-[230px] md:w-[420px] md:h-[270px] rounded-2xl bg-gradient-to-br ${item.bg} border border-[var(--border-color)] bg-[var(--bg-card)] p-4 sm:p-6 flex flex-col justify-between shrink-0 shadow-lg relative overflow-hidden group`}
            >
              <div className="flex items-center justify-between z-10">
                <span className="text-[9px] sm:text-xs font-mono font-bold uppercase tracking-widest px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)]">
                  {item.category}
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-[var(--text-secondary)] uppercase">
                  {item.tag}
                </span>
              </div>

              <div className="z-10">
                <h3 className="font-sans font-bold text-sm xs:text-base sm:text-lg md:text-xl text-[var(--text-primary)] tracking-tight line-clamp-2">
                  {item.title}
                </h3>
              </div>

              {/* Decorative grid pattern in card */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(var(--text-primary)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Row 2: Moves LEFT on scroll */}
        <div
          style={{
            transform: `translateX(${-(scrollOffset - 150)}px)`,
            willChange: "transform",
          }}
          className="flex gap-2.5 sm:gap-3 whitespace-nowrap"
        >
          {tripledRow2.map((item, idx) => (
            <div
              key={idx}
              className={`w-[240px] h-[155px] xs:w-[260px] xs:h-[170px] sm:w-[360px] sm:h-[230px] md:w-[420px] md:h-[270px] rounded-2xl bg-gradient-to-br ${item.bg} border border-[var(--border-color)] bg-[var(--bg-card)] p-4 sm:p-6 flex flex-col justify-between shrink-0 shadow-lg relative overflow-hidden group`}
            >
              <div className="flex items-center justify-between z-10">
                <span className="text-[9px] sm:text-xs font-mono font-bold uppercase tracking-widest px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)]">
                  {item.category}
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-[var(--text-secondary)] uppercase">
                  {item.tag}
                </span>
              </div>

              <div className="z-10">
                <h3 className="font-sans font-bold text-sm xs:text-base sm:text-lg md:text-xl text-[var(--text-primary)] tracking-tight line-clamp-2">
                  {item.title}
                </h3>
              </div>

              {/* Decorative grid pattern */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(var(--text-primary)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
