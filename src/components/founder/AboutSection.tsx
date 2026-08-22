"use client";

import React from "react";
import { Cpu, Terminal, Cloud, Radio, Code2, Server, Layers } from "lucide-react";
import FadeIn from "@/components/common/FadeIn";
import AnimatedText from "@/components/common/AnimatedText";
import ContactButton from "@/components/common/ContactButton";

export default function AboutSection() {
  const aboutText =
    "I'm a solo developer building end-to-end products -- from esp32 firmware and android apps to backend architecture and web platforms. through xentoryx labs, i design intelligent iot devices, scalable microservices, and modern digital experiences. let's build something incredible together!";

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 py-20 overflow-hidden select-none"
    >
      {/* Corner Tech Decorative Illustrations */}
      {/* 1. Top-Left: Circuit Board Icon Illustration */}
      <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none opacity-20 hover:opacity-40 transition-opacity">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <div className="aspect-square rounded-3xl bg-[#D7E2EA]/5 border border-[#D7E2EA]/10 p-6 flex flex-col items-center justify-center">
            <Cpu className="w-full h-full text-[#BBCCD7]" />
            <span className="text-[10px] font-mono mt-2 tracking-widest uppercase opacity-60">CIRCUIT.IO</span>
          </div>
        </FadeIn>
      </div>

      {/* 2. Bottom-Left: Microchip / ESP32 Icon */}
      <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px] pointer-events-none opacity-20 hover:opacity-40 transition-opacity">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <div className="aspect-square rounded-3xl bg-[#D7E2EA]/5 border border-[#D7E2EA]/10 p-5 flex flex-col items-center justify-center">
            <Radio className="w-full h-full text-[#BBCCD7]" />
            <span className="text-[10px] font-mono mt-2 tracking-widest uppercase opacity-60">ESP32.MCU</span>
          </div>
        </FadeIn>
      </div>

      {/* 3. Top-Right: Code-Bracket Icon */}
      <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none opacity-20 hover:opacity-40 transition-opacity">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <div className="aspect-square rounded-3xl bg-[#D7E2EA]/5 border border-[#D7E2EA]/10 p-6 flex flex-col items-center justify-center">
            <Code2 className="w-full h-full text-[#BBCCD7]" />
            <span className="text-[10px] font-mono mt-2 tracking-widest uppercase opacity-60">&lt;DEV /&gt;</span>
          </div>
        </FadeIn>
      </div>

      {/* 4. Bottom-Right: Cloud / Server Icon */}
      <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px] pointer-events-none opacity-20 hover:opacity-40 transition-opacity">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <div className="aspect-square rounded-3xl bg-[#D7E2EA]/5 border border-[#D7E2EA]/10 p-6 flex flex-col items-center justify-center">
            <Server className="w-full h-full text-[#BBCCD7]" />
            <span className="text-[10px] font-mono mt-2 tracking-widest uppercase opacity-60">CLOUD.API</span>
          </div>
        </FadeIn>
      </div>

      {/* Main Centered Content */}
      <div className="w-full max-w-4xl flex flex-col items-center text-center z-10 space-y-10 sm:space-y-14 md:space-y-16">
        
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
            className="hero-heading font-black uppercase leading-none tracking-tight"
          >
            About me
          </h2>
        </FadeIn>

        {/* Animated Paragraph with character-by-character scroll opacity */}
        <FadeIn delay={0.2} y={30}>
          <AnimatedText
            text={aboutText}
            style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" } as any}
            className="text-[#D7E2EA] font-medium leading-relaxed max-w-[560px] mx-auto text-center"
          />
        </FadeIn>

        {/* Contact Button */}
        <FadeIn delay={0.4} y={30} className="pt-6 sm:pt-10 md:pt-12">
          <ContactButton href="#contact" />
        </FadeIn>

      </div>
    </section>
  );
}
