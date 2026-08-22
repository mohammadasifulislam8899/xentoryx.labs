"use client";

import React from "react";
import { Cpu, Server } from "lucide-react";
import FadeIn from "@/components/common/FadeIn";
import AnimatedText from "@/components/common/AnimatedText";
import ContactButton from "@/components/common/ContactButton";

export default function AboutSection() {
  const aboutText =
    "I'm a solo developer building end-to-end products -- from esp32 firmware and android apps to backend architecture and web platforms. through xentoryx labs, i design intelligent iot devices, scalable microservices, and modern digital experiences. let's build something incredible together!";

  return (
    <section
      id="about"
      className="relative min-h-[85vh] sm:min-h-screen w-full flex flex-col items-center justify-center bg-[var(--bg-primary)] text-[var(--text-primary)] px-4 sm:px-8 md:px-10 py-14 sm:py-20 overflow-hidden select-none transition-colors duration-300"
    >
      {/* Decorative Subtle Badges - Scaled down for mobile, non-intrusive */}
      {/* 1. Top-Left: Circuit Board */}
      <div className="absolute top-[2%] left-[2%] sm:top-[4%] sm:left-[4%] w-[65px] xs:w-[80px] sm:w-[130px] md:w-[180px] pointer-events-none opacity-20 hover:opacity-40 transition-opacity">
        <FadeIn delay={0.1} x={-40} y={0} duration={0.8}>
          <div className="aspect-square rounded-2xl sm:rounded-3xl bg-[var(--border-subtle)] border border-[var(--border-color)] p-2.5 sm:p-5 flex flex-col items-center justify-center">
            <Cpu className="w-full h-full text-[var(--text-heading-gradient-end)]" />
            <span className="text-[7px] sm:text-[10px] font-mono mt-1 tracking-widest uppercase opacity-60">CIRCUIT</span>
          </div>
        </FadeIn>
      </div>

      {/* 2. Bottom-Right: Server/Cloud */}
      <div className="absolute bottom-[4%] right-[2%] sm:bottom-[6%] sm:right-[6%] w-[65px] xs:w-[80px] sm:w-[130px] md:w-[180px] pointer-events-none opacity-20 hover:opacity-40 transition-opacity">
        <FadeIn delay={0.25} x={40} y={0} duration={0.8}>
          <div className="aspect-square rounded-2xl sm:rounded-3xl bg-[var(--border-subtle)] border border-[var(--border-color)] p-2.5 sm:p-5 flex flex-col items-center justify-center">
            <Server className="w-full h-full text-[var(--text-heading-gradient-end)]" />
            <span className="text-[7px] sm:text-[10px] font-mono mt-1 tracking-widest uppercase opacity-60">CLOUD</span>
          </div>
        </FadeIn>
      </div>

      {/* Main Centered Content */}
      <div className="w-full max-w-3xl flex flex-col items-center text-center z-10 space-y-6 xs:space-y-8 sm:space-y-12 md:space-y-16">
        
        {/* Heading */}
        <FadeIn delay={0} y={25}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[7rem]"
          >
            About me
          </h2>
        </FadeIn>

        {/* Animated Paragraph with character-by-character scroll opacity */}
        <FadeIn delay={0.2} y={20}>
          <AnimatedText
            text={aboutText}
            className="text-[var(--text-primary)] font-medium leading-relaxed max-w-[90vw] sm:max-w-[560px] mx-auto text-center text-xs xs:text-sm sm:text-base md:text-lg px-2"
          />
        </FadeIn>

        {/* Contact Button */}
        <FadeIn delay={0.4} y={20} className="pt-2 sm:pt-4">
          <ContactButton href="#contact" />
        </FadeIn>

      </div>
    </section>
  );
}
