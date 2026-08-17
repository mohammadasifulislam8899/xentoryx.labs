"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bot,
  Menu,
  X,
  Terminal,
  Sparkles,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  onOpenCmdk: () => void;
  onOpenAi: () => void;
  onTriggerConsole?: () => void;
}

export default function Navbar({ onOpenCmdk, onOpenAi, onTriggerConsole }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);
    if (newCount >= 5) {
      if (onTriggerConsole) onTriggerConsole();
      setLogoClickCount(0);
    }
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Labs", href: "/labs" },
    { label: "Console", href: "/labs/console", badge: "DEV" },
    { label: "Founder", href: "/founder", badge: "ASIF" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-50/90 dark:bg-[#07090C]/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-lg py-3"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2 group focus:outline-none shrink-0"
            title="Click 5 times for Developer Console"
          >
            <div className="relative h-8 sm:h-10 w-36 sm:w-48 transition-transform group-hover:scale-105">
              <Image
                src="/assets/logo-dark.png"
                alt="Xentoryx Labs Logo Dark"
                fill
                className="object-contain hidden dark:block"
                priority
              />
              <Image
                src="/assets/logo-light.png"
                alt="Xentoryx Labs Logo Light"
                fill
                className="object-contain block dark:hidden"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono font-bold">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? "text-brand-red font-bold"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  }`}
                >
                  {link.label === "Console" && (
                    <Terminal className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  )}
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-brand-red/20 text-brand-red border border-brand-red/40">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <ThemeToggle />

            {/* Search Trigger */}
            <button
              onClick={onOpenCmdk}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl glass-panel text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-2"
              title="Press Ctrl+K to open search"
            >
              <Search className="w-3.5 h-3.5 text-brand-red" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-slate-100 dark:bg-surface border border-slate-300 dark:border-white/10 text-[10px] font-mono text-slate-600 dark:text-gray-400">
                ⌘K
              </kbd>
            </button>

            {/* XenAI Button */}
            <button
              onClick={onOpenAi}
              className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full bg-brand-red/10 border border-brand-red/30 text-[10px] sm:text-[11px] font-mono font-bold text-brand-red hover:bg-brand-red hover:text-white transition-all flex items-center gap-1 sm:gap-1.5"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>XenAI</span>
            </button>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl glass-panel text-slate-900 dark:text-white hover:text-brand-red transition-colors shrink-0"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-brand-red" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-b border-slate-200 dark:border-white/10 bg-white/98 dark:bg-[#07090C]/98 backdrop-blur-2xl overflow-hidden shadow-2xl mt-2"
          >
            <div className="px-6 py-6 space-y-4">
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-mono font-bold text-slate-900 dark:text-white hover:text-brand-red dark:hover:text-brand-red transition-colors flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-white/5"
                  >
                    <span className="flex items-center gap-2">
                      {link.label === "Console" && (
                        <Terminal className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      )}
                      {link.label}
                    </span>
                    {link.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-brand-red/20 text-brand-red rounded-full border border-brand-red/40 font-bold">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
