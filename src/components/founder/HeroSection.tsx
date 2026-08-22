"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import FadeIn from "@/components/common/FadeIn";
import Magnet from "@/components/common/Magnet";
import ContactButton from "@/components/common/ContactButton";
import ThemeToggle from "@/components/common/ThemeToggle";

export default function HeroSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <section className="relative min-h-[100dvh] h-[100dvh] w-full flex flex-col justify-between overflow-x-clip bg-[var(--bg-primary)] text-[var(--text-primary)] px-4 sm:px-6 md:px-10 select-none transition-colors duration-300">
      
      {/* 1. TOP CONTAINER: Navbar + Hero Heading together */}
      <div className="w-full flex flex-col pt-4 sm:pt-6 md:pt-8 z-40 gap-3 sm:gap-4 md:gap-2">
        {/* Navbar */}
        <FadeIn delay={0} y={-20} className="w-full">
          <nav className="w-full flex items-center justify-between">
            {/* Logo / Wordmark */}
            <Link href="/" className="flex items-center gap-1.5 group cursor-pointer">
              <span className="font-sans font-black tracking-tighter text-lg sm:text-2xl text-[var(--text-primary)] group-hover:opacity-80 transition-opacity">
                XENTORYX
              </span>
              <span className="text-[9px] sm:text-xs font-mono font-bold tracking-widest px-1.5 py-0.5 rounded bg-[var(--border-subtle)] text-[var(--text-heading-gradient-end)] border border-[var(--border-color)]">
                LABS
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden sm:flex items-center gap-5 md:gap-9 lg:gap-14">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs sm:text-sm md:text-base lg:text-[1.3rem] font-medium uppercase tracking-wider text-[var(--text-primary)] hover:opacity-70 transition-opacity duration-200"
                >
                  {link.label}
                </a>
              ))}

              {/* GSAP Powered Dark/Light Theme Toggle */}
              <ThemeToggle size="md" />
            </div>

            {/* Mobile Right Controls: ThemeToggle + Hamburger */}
            <div className="flex sm:hidden items-center gap-2">
              <ThemeToggle size="sm" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] cursor-pointer shadow-sm"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </nav>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="sm:hidden absolute top-16 left-0 right-0 mx-4 p-5 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-2xl flex flex-col gap-4 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium uppercase tracking-wider text-[var(--text-primary)] hover:text-amber-400 py-1 border-b border-[var(--border-subtle)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </FadeIn>

        {/* Hero Heading: Right under Navbar without large empty void */}
        <div className="w-full overflow-hidden text-center mt-1 sm:mt-0">
          <FadeIn delay={0.15} y={30} className="w-full">
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[13.5vw] sm:text-[14.5vw] md:text-[16vw] lg:text-[17.5vw]">
              Hi, i&apos;m asif
            </h1>
          </FadeIn>
        </div>
      </div>

      {/* 2. Hero Portrait: Bold Anchored Cutout */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-10 w-full max-w-[1900px] h-[64vh] sm:h-[75vh] md:h-[95vh] lg:h-[115vh] xl:h-[130vh] pointer-events-none flex justify-center items-end overflow-visible">
        <FadeIn delay={0.2} y={40} className="w-full h-full flex justify-center items-end">
          <Magnet
            padding={350}
            strength={7}
            activeTransition="transform 0.25s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full h-full relative flex items-end justify-center pointer-events-auto origin-bottom scale-[1.15] sm:scale-[1.4] md:scale-[1.85] lg:scale-[2.3] xl:scale-[2.65]"
          >
            <div className="relative w-full h-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-none">
              <Image
                src="/assets/asif-hero.png"
                alt="Asif -- Founder & IoT Engineer"
                fill
                priority
                unoptimized
                quality={100}
                sizes="100vw"
                className="object-contain object-bottom filter contrast-[1.03] brightness-[1.02] drop-shadow-[0_25px_80px_var(--shadow-color)]"
              />
            </div>
          </Magnet>
        </FadeIn>
      </div>

      {/* 3. Bottom Bar */}
      <div className="w-full flex justify-between items-end pb-5 sm:pb-8 md:pb-10 z-30 pointer-events-auto gap-3">
        {/* Left: Description */}
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[var(--text-primary)] font-light uppercase tracking-wide leading-snug text-[10px] sm:text-xs md:text-sm lg:text-base max-w-[150px] sm:max-w-[200px] md:max-w-[260px] drop-shadow-md"
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
