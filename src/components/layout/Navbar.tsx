"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Command as CommandIcon, Menu, X, Terminal, Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useCMS } from "@/hooks/useCMS";

interface Props {
  onOpenCmdk?: () => void;
  onOpenConsole?: () => void;
  onTriggerConsole?: () => void;
  onOpenAi?: () => void;
}

export default function Navbar({ onOpenCmdk, onOpenConsole, onTriggerConsole, onOpenAi }: Props) {
  const pathname = usePathname();
  const { founderName, companyName } = useCMS();

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
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);
    if (newCount >= 5) {
      if (onTriggerConsole) onTriggerConsole();
      if (onOpenConsole) onOpenConsole();
      setLogoClickCount(0);
    }
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Labs", href: "/labs" },
    { label: "Console", href: "/labs/console", badge: "DEV" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#F8FAFC]/90 dark:bg-[#0A0C10]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Official Brand Logo */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-3 group focus:outline-none"
            title="Click 5 times for Developer Console"
          >
            <div className="relative h-10 w-44 sm:w-48 transition-transform group-hover:scale-105">
              <Image
                src="/assets/logo-dark.png"
                alt="Xentoryx Labs Logo Dark"
                fill
                priority
                className="object-contain hidden dark:block"
              />
              <Image
                src="/assets/logo-light.png"
                alt="Xentoryx Labs Logo Light"
                fill
                priority
                className="object-contain block dark:hidden"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
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
                  {link.label === "Console" && <Terminal className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />}
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

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <button
              onClick={onOpenCmdk}
              className="px-3 py-1.5 rounded-xl glass-panel text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-2"
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
              className="px-3 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/30 text-[11px] font-mono font-bold text-brand-red hover:bg-brand-red hover:text-white transition-all flex items-center gap-1.5"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>XenAI</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
