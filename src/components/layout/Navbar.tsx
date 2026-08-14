"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Command as CommandIcon, Menu, X, Sparkles, Terminal } from "lucide-react";

interface Props {
  onOpenCmdk: () => void;
  onOpenAi: () => void;
  onTriggerConsole: () => void;
}

export default function Navbar({ onOpenCmdk, onOpenAi, onTriggerConsole }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    const nextCount = logoClickCount + 1;
    setLogoClickCount(nextCount);
    if (nextCount >= 5) {
      setLogoClickCount(0);
      onTriggerConsole();
    }
  };

  const navLinks = [
    { label: "Overview", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Labs", href: "/labs", badge: "R&D" },
    { label: "Services", href: "/#services" },
    { label: "Company", href: "/#company" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-[#0F1115]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Secret Easter Egg trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogoClick}
            className="group relative flex items-center gap-2 text-left focus:outline-none"
            title="Click 5 times for Engineering Console"
          >
            <div className="relative w-8 h-8 flex items-center justify-center">
              <Image
                src="/assets/logo-dark.png"
                alt="Xentoryx Labs"
                width={32}
                height={32}
                className="w-8 h-8 object-contain transition-transform group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 rounded-full bg-brand-red/20 blur-sm group-hover:bg-brand-red/40 transition-colors" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-lg font-bold tracking-tight text-white group-hover:text-brand-red transition-colors">
                  Xentoryx
                </span>
                <span className="text-xs uppercase tracking-widest font-mono text-brand-red font-semibold">
                  LABS
                </span>
              </div>
              <span className="text-[9px] text-brand-muted hidden sm:block tracking-wide">
                ESTD. 2026 // ASIF
              </span>
            </div>
          </button>

          {/* Secret Counter Toast Feedback */}
          {logoClickCount > 0 && logoClickCount < 5 && (
            <span className="text-[10px] font-mono text-brand-red bg-brand-red/10 border border-brand-red/30 px-1.5 py-0.5 rounded animate-pulse">
              Console: {5 - logoClickCount} clicks remaining
            </span>
          )}
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border-white/10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-brand-muted hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBg"
                    className="absolute inset-0 bg-brand-red/20 border border-brand-red/40 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {link.label}
                  {link.badge && (
                    <span className="text-[9px] font-mono px-1 py-0.2 bg-brand-red/30 text-brand-red rounded border border-brand-red/50">
                      {link.badge}
                    </span>
                  )}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Action Controls & AI Button */}
        <div className="flex items-center gap-3">
          {/* Cmd+K trigger button */}
          <button
            onClick={onOpenCmdk}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg glass-panel text-xs text-brand-muted hover:text-white hover:border-brand-red/40 transition-all group"
          >
            <CommandIcon className="w-3.5 h-3.5 text-brand-red group-hover:rotate-12 transition-transform" />
            <span className="font-mono text-[11px]">Ctrl+K</span>
          </button>

          {/* Gemini AI Button */}
          <button
            onClick={onOpenAi}
            className="relative group px-3.5 py-1.5 rounded-full bg-gradient-to-r from-brand-red to-[#FF5E50] text-white text-xs font-semibold shadow-glow-red hover:shadow-glow-red-lg transition-all flex items-center gap-2 overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <Bot className="w-3.5 h-3.5 text-white animate-pulse" />
            <span>Gemini AI</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg glass-panel text-white hover:text-brand-red transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-b border-white/10 bg-[#0F1115]/95 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-gray-300 hover:text-brand-red flex items-center justify-between font-medium py-1"
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 bg-brand-red/20 text-brand-red rounded border border-brand-red/40">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCmdk();
                  }}
                  className="w-full py-2.5 rounded-xl glass-panel text-xs text-white flex items-center justify-center gap-2"
                >
                  <CommandIcon className="w-4 h-4 text-brand-red" />
                  <span>Search & Commands (Ctrl+K)</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onTriggerConsole();
                  }}
                  className="w-full py-2.5 rounded-xl bg-surface border border-emerald-500/30 text-xs text-emerald-400 flex items-center justify-center gap-2 font-mono"
                >
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>Launch Secret Console</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
