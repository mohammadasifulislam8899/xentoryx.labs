"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeIn from "@/components/common/FadeIn";
import LiveProjectButton from "@/components/common/LiveProjectButton";

interface ProjectData {
  num: string;
  name: string;
  category: string;
  liveUrl?: string;
  col1Top: { title: string; subtitle: string; bg: string; iconText: string };
  col1Bottom: { title: string; subtitle: string; bg: string; iconText: string };
  col2: { title: string; subtitle: string; bg: string; iconText: string };
}

function Card({
  project,
  index,
  totalCards,
}: {
  project: ProjectData;
  index: number;
  totalCards: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.025;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="min-h-[480px] sm:min-h-[540px] md:h-[85vh] flex items-center justify-center sticky top-14 sm:top-20 md:top-28"
    >
      <motion.div
        style={{
          scale,
          top: `calc(${index * 16}px)`,
        }}
        className="w-full h-auto md:h-full md:max-h-[720px] rounded-[24px] sm:rounded-[36px] md:rounded-[56px] border-2 border-[var(--border-color)] bg-[var(--bg-primary)] p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-colors duration-300 gap-3 sm:gap-4"
      >
        {/* Top Row: Number, Category, Title, Live Project Button */}
        <div className="flex flex-row items-center justify-between gap-2 pb-2.5 sm:pb-4 border-b border-[var(--border-color)] z-10">
          <div className="flex items-center gap-2.5 sm:gap-6 min-w-0">
            <span
              className="font-black text-[var(--text-primary)] leading-none tracking-tighter text-2xl xs:text-3xl sm:text-4xl md:text-5xl shrink-0"
            >
              {project.num}
            </span>
            <div className="min-w-0">
              <span className="text-[8px] xs:text-[9px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[var(--text-heading-gradient-end)] block truncate">
                {project.category}
              </span>
              <h3
                className="font-black uppercase tracking-tight text-[var(--text-primary)] leading-none mt-0.5 text-sm xs:text-base sm:text-xl md:text-2xl truncate"
              >
                {project.name}
              </h3>
            </div>
          </div>

          <div className="shrink-0">
            <LiveProjectButton href={project.liveUrl || "#"} />
          </div>
        </div>

        {/* Bottom Row: 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-4 flex-1">
          
          {/* Left Column (Desktop 40% / 5 cols): Stacked Cards */}
          <div className="md:col-span-5 flex flex-col gap-2.5 sm:gap-4">
            {/* Left Top Card */}
            <div
              className={`w-full h-[100px] xs:h-[115px] sm:h-[140px] md:h-[180px] rounded-[18px] sm:rounded-[28px] md:rounded-[36px] bg-gradient-to-br ${project.col1Top.bg} border border-[var(--border-color)] bg-[var(--bg-card)] p-3.5 sm:p-5 flex flex-col justify-between relative overflow-hidden shadow-md`}
            >
              <div className="text-[8px] xs:text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[var(--text-primary)] font-bold">
                {project.col1Top.iconText}
              </div>
              <div>
                <h4 className="font-bold text-xs xs:text-sm md:text-base text-white">{project.col1Top.title}</h4>
                <p className="text-[9px] xs:text-[10px] sm:text-xs text-white/70 font-light truncate">{project.col1Top.subtitle}</p>
              </div>
            </div>

            {/* Left Bottom Card */}
            <div className={`hidden sm:flex w-full flex-1 min-h-[120px] rounded-[18px] sm:rounded-[28px] md:rounded-[36px] bg-gradient-to-br ${project.col1Bottom.bg} border border-[var(--border-color)] bg-[var(--bg-card)] p-3.5 sm:p-5 flex-col justify-between relative overflow-hidden shadow-md`}>
              <div className="text-[8px] xs:text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[var(--text-primary)] font-bold">
                {project.col1Bottom.iconText}
              </div>
              <div>
                <h4 className="font-bold text-xs xs:text-sm md:text-base text-white">{project.col1Bottom.title}</h4>
                <p className="text-[9px] xs:text-[10px] sm:text-xs text-white/70 font-light truncate">{project.col1Bottom.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Right Column (Desktop 60% / 7 cols): Tall Featured Card */}
          <div className="md:col-span-7">
            <div className={`w-full h-[160px] xs:h-[180px] sm:h-full min-h-[160px] rounded-[18px] sm:rounded-[28px] md:rounded-[36px] bg-gradient-to-br ${project.col2.bg} border border-[var(--border-color)] bg-[var(--bg-card)] p-4 sm:p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shadow-md`}>
              <div className="text-[8px] xs:text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[var(--text-primary)] font-bold">
                {project.col2.iconText}
              </div>
              <div>
                <h4 className="font-bold text-sm xs:text-base sm:text-lg md:text-2xl text-white">{project.col2.title}</h4>
                <p className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm text-white/80 font-light mt-1 max-w-md line-clamp-2 sm:line-clamp-none">
                  {project.col2.subtitle}
                </p>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  const projects: ProjectData[] = [
    {
      num: "01",
      name: "Dipannita",
      category: "Product & Hardware IoT",
      liveUrl: "https://github.com/mohammadasifulislam8899",
      col1Top: {
        title: "GC9A01A Round Display",
        subtitle: "ESP32 C++ Custom Eye Animation Drivers",
        bg: "from-blue-950/80 via-slate-900 to-indigo-950/80",
        iconText: "HARDWARE • FIRMWARE",
      },
      col1Bottom: {
        title: "Jetpack Compose App",
        subtitle: "Native Android Companion & Bluetooth Low Energy",
        bg: "from-slate-900 via-indigo-950/70 to-purple-950/80",
        iconText: "MOBILE • KOTLIN",
      },
      col2: {
        title: "Autonomous Companion Device",
        subtitle: "End-to-end wearable IoT architecture integrating 3D CAD enclosure, offline telemetry storage, and real-time cloud sync.",
        bg: "from-purple-950/80 via-slate-900 to-blue-950/90",
        iconText: "FULL PRODUCT • 3D ENCLOSURE",
      },
    },
    {
      num: "02",
      name: "MayaEyes",
      category: "Robotics & Microcontroller",
      liveUrl: "https://github.com/mohammadasifulislam8899",
      col1Top: {
        title: "Pixel Animation Frames",
        subtitle: "Aseprite Vector State Machine Engine",
        bg: "from-amber-950/80 via-slate-900 to-orange-950/80",
        iconText: "ANIMATION • STATES",
      },
      col1Bottom: {
        title: "GC9A01A Dual Round Screen",
        subtitle: "Synchronous SPI Bus Microsecond Refresh",
        bg: "from-red-950/80 via-slate-900 to-amber-950/80",
        iconText: "HARDWARE • SPI BUS",
      },
      col2: {
        title: "Expressive Robot Eye Telemetry",
        subtitle: "Low-latency embedded animation controller for robotic companions with emotion transitions and interactive capacitive touch.",
        bg: "from-orange-950/80 via-slate-900 to-rose-950/90",
        iconText: "ROBOTICS • INTERACTIVE",
      },
    },
    {
      num: "03",
      name: "Shomoy Ghor",
      category: "Client E-Commerce Platform",
      liveUrl: "https://xentoryx.com",
      col1Top: {
        title: "Bengali Watch Storefront",
        subtitle: "Next.js 15 App Router & SEO Architecture",
        bg: "from-emerald-950/80 via-slate-900 to-teal-950/80",
        iconText: "E-COMMERCE • WEB",
      },
      col1Bottom: {
        title: "bKash & Nagad Checkout",
        subtitle: "Automated Payment Webhook Pipeline",
        bg: "from-teal-950/80 via-slate-900 to-sky-950/80",
        iconText: "FINTECH • WEBHOOKS",
      },
      col2: {
        title: "High-Conversion Retail Experience",
        subtitle: "Production e-commerce platform built for extreme speed, high mobile conversion, and seamless automated inventory management.",
        bg: "from-sky-950/80 via-slate-900 to-emerald-950/90",
        iconText: "FULLSTACK • PRODUCTION",
      },
    },
  ];

  return (
    <section
      id="projects"
      className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] rounded-t-[32px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-6 sm:-mt-12 md:-mt-14 pt-14 sm:pt-24 pb-20 sm:pb-32 px-3 sm:px-6 md:px-10 relative z-10 select-none transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto w-full space-y-8 sm:space-y-16">
        
        {/* Heading */}
        <FadeIn delay={0} y={30} className="text-center">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[7rem]"
          >
            Project
          </h2>
        </FadeIn>

        {/* Sticky Stacking Cards */}
        <div className="space-y-6 sm:space-y-12 pb-6">
          {projects.map((proj, idx) => (
            <Card
              key={proj.num}
              project={proj}
              index={idx}
              totalCards={projects.length}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
