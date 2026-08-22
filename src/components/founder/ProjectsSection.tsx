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

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-[85vh] flex items-center justify-center sticky top-24 md:top-32"
    >
      <motion.div
        style={{
          scale,
          top: `calc(${index * 28}px)`,
        }}
        className="w-full h-full max-h-[720px] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden"
      >
        {/* Top Row: Number, Category, Title, Live Project Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D7E2EA]/15 z-10">
          <div className="flex items-center gap-4 sm:gap-6">
            <span
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
              className="font-black text-[#D7E2EA] leading-none tracking-tighter"
            >
              {project.num}
            </span>
            <div>
              <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#BBCCD7] block">
                {project.category}
              </span>
              <h3
                style={{ fontSize: "clamp(1.2rem, 3vw, 2.5rem)" }}
                className="font-black uppercase tracking-tight text-white leading-none mt-0.5"
              >
                {project.name}
              </h3>
            </div>
          </div>

          <LiveProjectButton href={project.liveUrl || "#"} />
        </div>

        {/* Bottom Row: 2-Column Image Grid (40% left, 60% right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 flex-1 pt-4 min-h-0">
          
          {/* Left Column (40% / 5 cols): 2 Stacked Cards */}
          <div className="md:col-span-5 flex flex-col gap-3 sm:gap-4 h-full">
            {/* Left Top Card */}
            <div
              style={{ height: "clamp(120px, 16vw, 220px)" }}
              className={`w-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px] bg-gradient-to-br ${project.col1Top.bg} border border-[#D7E2EA]/15 p-5 flex flex-col justify-between relative overflow-hidden shadow-md`}
            >
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#D7E2EA]/80 font-bold">
                {project.col1Top.iconText}
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-white">{project.col1Top.title}</h4>
                <p className="text-xs text-[#D7E2EA]/60 font-light">{project.col1Top.subtitle}</p>
              </div>
            </div>

            {/* Left Bottom Card */}
            <div className={`w-full flex-1 min-h-[140px] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] bg-gradient-to-br ${project.col1Bottom.bg} border border-[#D7E2EA]/15 p-5 flex flex-col justify-between relative overflow-hidden shadow-md`}>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#D7E2EA]/80 font-bold">
                {project.col1Bottom.iconText}
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-white">{project.col1Bottom.title}</h4>
                <p className="text-xs text-[#D7E2EA]/60 font-light">{project.col1Bottom.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Right Column (60% / 7 cols): 1 Tall Card */}
          <div className="md:col-span-7 h-full">
            <div className={`w-full h-full min-h-[220px] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] bg-gradient-to-br ${project.col2.bg} border border-[#D7E2EA]/15 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-md`}>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#D7E2EA]/80 font-bold">
                {project.col2.iconText}
              </div>
              <div>
                <h4 className="font-bold text-lg sm:text-2xl text-white">{project.col2.title}</h4>
                <p className="text-xs sm:text-sm text-[#D7E2EA]/70 font-light mt-1 max-w-md">
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
      className="w-full bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-20 sm:pt-28 pb-32 px-4 sm:px-6 md:px-10 relative z-10 select-none"
    >
      <div className="max-w-6xl mx-auto w-full space-y-16 sm:space-y-24">
        
        {/* Heading */}
        <FadeIn delay={0} y={40} className="text-center">
          <h2
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
            className="hero-heading font-black uppercase leading-none tracking-tight"
          >
            Project
          </h2>
        </FadeIn>

        {/* Sticky Stacking Cards */}
        <div className="space-y-12 pb-12">
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
