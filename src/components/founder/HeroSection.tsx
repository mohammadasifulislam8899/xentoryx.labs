"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/common/FadeIn";
import Magnet from "@/components/common/Magnet";
import ContactButton from "@/components/common/ContactButton";
import ThemeToggle from "@/components/common/ThemeToggle";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full flex flex-col justify-between overflow-x-clip bg-[var(--bg-primary)] text-[var(--text-primary)] px-6 md:px-10 select-none transition-colors duration-300">
      
      {/* 1. Top Navbar */}
      <FadeIn delay={0} y={-20} className="w-full pt-6 md:pt-8 z-40">
        <nav className="w-full flex items-center justify-between">
          {/* Logo / Wordmark */}
          <Link href="/" className="flex items-center gap-1.5 group cursor-pointer">
            <span className="font-sans font-black tracking-tighter text-lg sm:text-2xl text-[var(--text-primary)] group-hover:opacity-80 transition-opacity">
              XENTORYX
            </span>
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest px-1.5 py-0.5 rounded bg-[var(--border-subtle)] text-[var(--text-heading-gradient-end)] border border-[var(--border-color)]">
              LABS
            </span>
          </Link>

          {/* 4 Nav Links + Theme Toggle */}
          <div className="flex items-center gap-4 sm:gap-7 md:gap-10 lg:gap-14">
            <a
              href="#about"
              className="text-xs sm:text-sm md:text-lg lg:text-[1.4rem] font-medium uppercase tracking-wider text-[var(--text-primary)] hover:opacity-70 transition-opacity duration-200"
            >
              About
            </a>
            <a
              href="#services"
              className="text-xs sm:text-sm md:text-lg lg:text-[1.4rem] font-medium uppercase tracking-wider text-[var(--text-primary)] hover:opacity-70 transition-opacity duration-200"
            >
              Services
            </a>
            <a
              href="#projects"
              className="text-xs sm:text-sm md:text-lg lg:text-[1.4rem] font-medium uppercase tracking-wider text-[var(--text-primary)] hover:opacity-70 transition-opacity duration-200"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-xs sm:text-sm md:text-lg lg:text-[1.4rem] font-medium uppercase tracking-wider text-[var(--text-primary)] hover:opacity-70 transition-opacity duration-200"
            >
              Contact
            </a>

            {/* GSAP Powered Dark/Light Theme Toggle */}
            <ThemeToggle size="md" />
          </div>
        </nav>
      </FadeIn>

      {/* 2. Hero Heading */}
      <div className="w-full overflow-hidden text-center z-0 mt-6 sm:mt-4 md:-mt-5">
        <FadeIn delay={0.15} y={40} className="w-full">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
            Hi, i&apos;m asif
          </h1>
        </FadeIn>
      </div>

      {/* 3. Hero Portrait: 1.5x Massive Scaled Portrait */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-10 w-[98vw] max-w-[1900px] h-[95vh] sm:h-[105vh] md:h-[115vh] lg:h-[125vh] xl:h-[135vh] pointer-events-none flex justify-center items-end overflow-visible">
        <FadeIn delay={0.2} y={40} className="w-full h-full flex justify-center items-end">
          <Magnet
            padding={350}
            strength={7}
            activeTransition="transform 0.25s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full h-full relative flex items-end justify-center pointer-events-auto origin-bottom scale-[1.85] sm:scale-[2.1] md:scale-[2.35] lg:scale-[2.55] xl:scale-[2.75] 2xl:scale-[3.0]"
          >
            <div className="relative w-full h-full">
              <Image
                src="/assets/asif-hero.png"
                alt="Asif -- Founder & IoT Engineer"
                fill
                priority
                unoptimized
                quality={100}
                sizes="100vw"
                className="object-contain object-bottom filter contrast-[1.03] brightness-[1.02] drop-shadow-[0_45px_120px_var(--shadow-color)]"
              />
            </div>
          </Magnet>
        </FadeIn>
      </div>

      {/* 4. Bottom Bar */}
      <div className="w-full flex justify-between items-end pb-7 sm:pb-8 md:pb-10 z-30 pointer-events-auto">
        {/* Left: Description */}
        <FadeIn delay={0.35} y={20}>
          <p
            style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
            className="text-[var(--text-primary)] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[280px]"
          >
            founder building scalable software, intelligent iot hardware, and modern web experiences at xentoryx labs
          </p>
        </FadeIn>

        {/* Right: Contact Button */}
        <FadeIn delay={0.5} y={20}>
          <ContactButton href="#contact" />
        </FadeIn>
      </div>

    </section>
  );
}
