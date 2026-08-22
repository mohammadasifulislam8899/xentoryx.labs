"use client";

import React from "react";
import { Cpu, Radio, Code2, Server } from "lucide-react";
import FadeIn from "@/components/common/FadeIn";
import AnimatedText from "@/components/common/AnimatedText";
import ContactButton from "@/components/common/ContactButton";

export default function AboutSection() {
  const aboutText =
    "I'm a solo developer building end-to-end products -- from esp32 firmware and android apps to backend architecture and web platforms. through xentoryx labs, i design intelligent iot devices, scalable microservices, and modern digital experiences. let's build something incredible together!";

  return (
    <section
      id="about"
      className="relative min-h-[90dvh] sm:min-h-screen w-full flex flex-col items-center justify-center bg-[var(--bg-primary)] text-[var(--text-primary)] px-4 sm:px-8 md:px-10 py-16 sm:py-24 md:py-32 overflow-hidden select-none transition-colors duration-300"
    >
      {/* 1. Top-Left Badge (Visible on all screens) */}
      <div className="absolute top-[3%] left-[2%] sm:left-[3%] md:left-[4%] w-[75px] sm:w-[120px] md:w-[180px] pointer-events-none opacity-25 sm:opacity-20 hover:opacity-40 transition-opacity">
        <FadeIn delay={0.1} x={-40} y={0} duration={0.9}>
          <div className="aspect-square rounded-2xl sm:rounded-3xl bg-[var(--border-subtle)] border border-[var(--border-color)] p-3.5 sm:p-5 md:p-6 flex flex-col items-center justify-center">
            <Cpu className="w-full h-full text-[var(--text-heading-gradient-end)]" />
            <span className="text-[8px] sm:text-[10px] font-mono mt-1 sm:mt-2 tracking-widest uppercase opacity-60">CIRCUIT</span>
          </div>
        </FadeIn>
      </div>

      {/* 2. Bottom-Right Badge (Visible on all screens) */}
      <div className="absolute bottom-[4%] right-[2%] sm:right-[3%] md:right-[6%] w-[75px] sm:w-[120px] md:w-[180px] pointer-events-none opacity-25 sm:opacity-20 hover:opacity-40 transition-opacity">
        <FadeIn delay={0.3} x={40} y={0} duration={0.9}>
          <div className="aspect-square rounded-2xl sm:rounded-3xl bg-[var(--border-subtle)] border border-[var(--border-color)] p-3.5 sm:p-5 md:p-6 flex flex-col items-center justify-center">
            <Server className="w-full h-full text-[var(--text-heading-gradient-end)]" />
            <span className="text-[8px] sm:text-[10px] font-mono mt-1 sm:mt-2 tracking-widest uppercase opacity-60">CLOUD</span>
          </div>
        </FadeIn>
      </div>

      {/* 3. Bottom-Left Badge (Desktop/Tablet only) */}
      <div className="hidden sm:block absolute bottom-[6%] left-[4%] md:left-[8%] w-[120px] md:w-[170px] pointer-events-none opacity-20 hover:opacity-40 transition-opacity">
        <FadeIn delay={0.25} x={-40} y={0} duration={0.9}>
          <div className="aspect-square rounded-3xl bg-[var(--border-subtle)] border border-[var(--border-color)] p-5 flex flex-col items-center justify-center">
            <Radio className="w-full h-full text-[var(--text-heading-gradient-end)]" />
            <span className="text-[10px] font-mono mt-2 tracking-widest uppercase opacity-60">ESP32</span>
          </div>
        </FadeIn>
      </div>

      {/* 4. Top-Right Badge (Desktop/Tablet only) */}
      <div className="hidden sm:block absolute top-[4%] right-[4%] md:right-[6%] w-[120px] md:w-[170px] pointer-events-none opacity-20 hover:opacity-40 transition-opacity">
        <FadeIn delay={0.15} x={40} y={0} duration={0.9}>
          <div className="aspect-square rounded-3xl bg-[var(--border-subtle)] border border-[var(--border-color)] p-5 flex flex-col items-center justify-center">
            <Code2 className="w-full h-full text-[var(--text-heading-gradient-end)]" />
            <span className="text-[10px] font-mono mt-2 tracking-widest uppercase opacity-60">&lt;DEV/&gt;</span>
          </div>
        </FadeIn>
      </div>

      {/* Main Centered Content */}
      <div className="w-full max-w-4xl flex flex-col items-center text-center z-10 space-y-8 sm:space-y-12 md:space-y-16 px-2 sm:px-4">
        
        {/* Heading */}
        <FadeIn delay={0} y={30}>
          <h2
            style={{ fontSize: "clamp(2.75rem, 11vw, 150px)" }}
            className="hero-heading font-black uppercase leading-none tracking-tight"
          >
            About me
          </h2>
        </FadeIn>

        {/* Animated Paragraph */}
        <FadeIn delay={0.2} y={20}>
          <AnimatedText
            text={aboutText}
            style={{ fontSize: "clamp(0.95rem, 1.9vw, 1.35rem)" } as any}
            className="text-[var(--text-primary)] font-medium leading-relaxed max-w-[90vw] sm:max-w-[560px] mx-auto text-center"
          />
        </FadeIn>

        {/* Contact Button */}
        <FadeIn delay={0.4} y={20} className="pt-3 sm:pt-8">
          <ContactButton href="#contact" />
        </FadeIn>

      </div>
    </section>
  );
}
