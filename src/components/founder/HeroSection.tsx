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
  const portraitImageUrl = "/assets/asif-hero.png";

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* ================= MOBILE HERO (below sm: 640px) ================= */}
      <section
        className="flex sm:hidden flex-col h-[100dvh] overflow-hidden bg-[#0C0C0C] select-none"
      >
        {/* Mobile Top Navbar */}
        <nav className="shrink-0 flex items-center justify-between px-5 pt-4 pb-1">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black tracking-tight text-white">XENTORYX</span>
            <span className="text-[10px] font-medium bg-[#151515] text-[#D7E2EA] border border-[#D7E2EA]/20 rounded px-2 py-0.5">
              LABS
            </span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle size="sm" />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-[#D7E2EA]/20 text-[#D7E2EA] active:scale-95 transition-transform"
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>

        {/* Big Punchy Heading */}
        <div className="shrink-0 px-4 pt-1 pb-0.5 text-center">
          <h1 className="hero-heading font-black uppercase leading-[0.9] tracking-tight text-[15.5vw] whitespace-nowrap">
            Hi, i&apos;m asif
          </h1>
        </div>

        {/* FULL PORTRAIT CONTAINER — Shifted Up and to the Right */}
        <div className="relative flex-1 min-h-0 w-full overflow-hidden flex items-end justify-center">
          <img
            src={portraitImageUrl}
            alt="Asif"
            className="w-full h-full object-contain object-bottom"
            style={{
              transform: "scale(1.85) translate(3.5%, -7%)",
              transformOrigin: "center 75%",
              opacity: 1,
              filter: "none",
            }}
          />

          {/* Gradient Scrim for readable text */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
            style={{
              height: "48%",
              background:
                "linear-gradient(to top, rgba(12,12,12,1) 0%, rgba(12,12,12,0.85) 35%, rgba(12,12,12,0.2) 75%, transparent 100%)",
            }}
          />

          {/* Text + Contact Button Overlay — Shifted slightly downward */}
          <div className="absolute bottom-0 left-0 right-0 z-20 px-5 pb-[calc(1.15rem+env(safe-area-inset-bottom))] flex flex-col items-center gap-2.5 text-center">
            <p className="text-[#D7E2EA] uppercase text-xs sm:text-sm tracking-wide leading-snug max-w-[310px] font-normal drop-shadow-md">
              founder building scalable software, intelligent iot hardware, and modern web experiences at xentoryx labs
            </p>
            <ContactButton href="#contact" />
          </div>
        </div>
      </section>

      {/* ================= MOBILE FULL-SCREEN MENU OVERLAY ================= */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-0 z-50 bg-[#0C0C0C]/98 backdrop-blur-2xl flex flex-col justify-between p-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-[#D7E2EA]/20 pb-4">
            <div className="flex items-center gap-1.5">
              <span className="font-sans font-black tracking-tighter text-lg text-[#D7E2EA]">
                XENTORYX
              </span>
              <span className="text-[9px] font-mono font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#151515] text-[#D7E2EA] border border-[#D7E2EA]/20">
                LABS
              </span>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle size="sm" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[#D7E2EA]/20 bg-[#151515] text-[#D7E2EA] cursor-pointer active:scale-95"
                aria-label="Close navigation menu"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-8 my-auto">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{ animationDelay: `${idx * 50}ms` }}
                className="text-3xl font-bold uppercase tracking-tight text-[#D7E2EA] hover:text-amber-400 active:scale-95 transition-all text-center"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="text-center pt-4 border-t border-[#D7E2EA]/20 text-[11px] font-mono text-[#D7E2EA]/60">
            Mohammad Asiful Islam &bull; IoT Engineer &amp; Founder
          </div>
        </div>
      )}

      {/* ================= DESKTOP/TABLET HERO (sm: 640px and up) ================= */}
      <section className="hidden sm:flex relative flex-col justify-between h-[100dvh] w-full overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] px-6 md:px-10 select-none transition-colors duration-300">
        
        {/* Desktop Navbar */}
        <FadeIn delay={0} y={-20} className="w-full pt-6 md:pt-8 z-40 relative">
          <nav className="w-full flex items-center justify-between">
            <Link href="/" className="flex items-center gap-1.5 group cursor-pointer">
              <span className="font-sans font-black tracking-tighter text-xl md:text-2xl text-[var(--text-primary)] group-hover:opacity-80 transition-opacity">
                XENTORYX
              </span>
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest px-1.5 py-0.5 rounded bg-[var(--border-subtle)] text-[var(--text-heading-gradient-end)] border border-[var(--border-color)]">
                LABS
              </span>
            </Link>

            <div className="flex items-center gap-6 md:gap-10 lg:gap-14">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm md:text-base lg:text-[1.3rem] font-medium uppercase tracking-wider text-[var(--text-primary)] hover:opacity-70 transition-opacity duration-200"
                >
                  {link.label}
                </a>
              ))}

              <ThemeToggle size="md" />
            </div>
          </nav>
        </FadeIn>

        {/* Desktop Heading */}
        <div className="w-full overflow-hidden text-center z-0 mt-2 md:-mt-2">
          <FadeIn delay={0.15} y={40} className="w-full">
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
              Hi, i&apos;m asif
            </h1>
          </FadeIn>
        </div>

        {/* Desktop Massive Portrait Image with Magnet */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-10 w-[98vw] max-w-[1900px] h-[95vh] lg:h-[125vh] xl:h-[135vh] pointer-events-none flex justify-center items-end overflow-visible">
          <FadeIn delay={0.2} y={40} className="w-full h-full flex justify-center items-end">
            <Magnet
              padding={350}
              strength={7}
              activeTransition="transform 0.25s ease-out"
              inactiveTransition="transform 0.6s ease-in-out"
              className="w-full h-full relative flex items-end justify-center pointer-events-auto origin-bottom scale-[1.85] lg:scale-[2.55] xl:scale-[2.75] 2xl:scale-[3.0]"
            >
              <div className="relative w-full h-full">
                <Image
                  src={portraitImageUrl}
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

        {/* Desktop Bottom Bar */}
        <div className="w-full flex justify-between items-end pb-8 md:pb-10 z-30 pointer-events-auto">
          <FadeIn delay={0.35} y={20}>
            <p
              style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
              className="text-[var(--text-primary)] font-light uppercase tracking-wide leading-snug max-w-[220px] md:max-w-[280px]"
            >
              founder building scalable software, intelligent iot hardware, and modern web experiences at xentoryx labs
            </p>
          </FadeIn>

          <FadeIn delay={0.5} y={20}>
            <ContactButton href="#contact" />
          </FadeIn>
        </div>

      </section>
    </>
  );
}
