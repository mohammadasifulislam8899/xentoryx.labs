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
      className="relative min-h-[90vh] sm:min-h-screen w-full flex flex-col items-center justify-center bg-[var(--bg-primary)] text-[var(--text-primary)] px-4 sm:px-8 md:px-10 py-16 sm:py-20 overflow-hidden select-none transition-colors duration-300"
    >
      {/* Corner Tech Decorative Illustrations - Hidden on small mobile to prevent text clash */}
      {/* 1. Top-Left: Circuit Board Icon */}
      <div className="hidden md:block absolute top-[4%] left-[2%] lg:left-[4%] w-[140px] lg:w-[200px] pointer-events-none opacity-20 hover:opacity-40 transition-opacity">
        <FadeIn delay={0.1} x={-60} y={0} duration={0.9}>
          <div className="aspect-square rounded-3xl bg-[var(--border-subtle)] border border-[var(--border-color)] p-6 flex flex-col items-center justify-center">
            <Cpu className="w-full h-full text-[var(--text-heading-gradient-end)]" />
            <span className="text-[10px] font-mono mt-2 tracking-widest uppercase opacity-60">CIRCUIT.IO</span>
          </div>
        </FadeIn>
      </div>

      {/* 2. Bottom-Left: Microchip / ESP32 Icon */}
      <div className="hidden md:block absolute bottom-[8%] left-[4%] lg:left-[8%] w-[120px] lg:w-[170px] pointer-events-none opacity-20 hover:opacity-40 transition-opacity">
        <FadeIn delay={0.25} x={-60} y={0} duration={0.9}>
          <div className="aspect-square rounded-3xl bg-[var(--border-subtle)] border border-[var(--border-color)] p-5 flex flex-col items-center justify-center">
            <Radio className="w-full h-full text-[var(--text-heading-gradient-end)]" />
            <span className="text-[10px] font-mono mt-2 tracking-widest uppercase opacity-60">ESP32.MCU</span>
          </div>
        </FadeIn>
      </div>

      {/* 3. Top-Right: Code-Bracket Icon */}
      <div className="hidden md:block absolute top-[4%] right-[2%] lg:right-[4%] w-[140px] lg:w-[200px] pointer-events-none opacity-20 hover:opacity-40 transition-opacity">
        <FadeIn delay={0.15} x={60} y={0} duration={0.9}>
          <div className="aspect-square rounded-3xl bg-[var(--border-subtle)] border border-[var(--border-color)] p-6 flex flex-col items-center justify-center">
            <Code2 className="w-full h-full text-[var(--text-heading-gradient-end)]" />
            <span className="text-[10px] font-mono mt-2 tracking-widest uppercase opacity-60">&lt;DEV /&gt;</span>
          </div>
        </FadeIn>
      </div>

      {/* 4. Bottom-Right: Cloud / Server Icon */}
      <div className="hidden md:block absolute bottom-[8%] right-[4%] lg:right-[8%] w-[130px] lg:w-[190px] pointer-events-none opacity-20 hover:opacity-40 transition-opacity">
        <FadeIn delay={0.3} x={60} y={0} duration={0.9}>
          <div className="aspect-square rounded-3xl bg-[var(--border-subtle)] border border-[var(--border-color)] p-6 flex flex-col items-center justify-center">
            <Server className="w-full h-full text-[var(--text-heading-gradient-end)]" />
            <span className="text-[10px] font-mono mt-2 tracking-widest uppercase opacity-60">CLOUD.API</span>
          </div>
        </FadeIn>
      </div>

      {/* Main Centered Content */}
      <div className="w-full max-w-3xl flex flex-col items-center text-center z-10 space-y-8 sm:space-y-12 md:space-y-16">
        
        {/* Heading */}
        <FadeIn delay={0} y={30}>
          <h2
            style={{ fontSize: "clamp(2.5rem, 10vw, 140px)" }}
            className="hero-heading font-black uppercase leading-none tracking-tight"
          >
            About me
          </h2>
        </FadeIn>

        {/* Animated Paragraph */}
        <FadeIn delay={0.2} y={20}>
          <AnimatedText
            text={aboutText}
            style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.3rem)" } as any}
            className="text-[var(--text-primary)] font-medium leading-relaxed max-w-[540px] mx-auto text-center px-2"
          />
        </FadeIn>

        {/* Contact Button */}
        <FadeIn delay={0.4} y={20} className="pt-2 sm:pt-6">
          <ContactButton href="#contact" />
        </FadeIn>

      </div>
    </section>
  );
}
