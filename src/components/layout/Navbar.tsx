"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import CommandPalette from "./CommandPalette";
import AiAssistantModal from "@/components/ui/AiAssistantModal";
import EngineeringConsoleModal from "./EngineeringConsoleModal";

interface NavbarProps {
  onOpenCmdk?: () => void;
  onOpenAi?: () => void;
  onTriggerConsole?: () => void;
}

export default function Navbar({ onOpenCmdk, onOpenAi, onTriggerConsole }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    const newCount = logoClicks + 1;
    setLogoClicks(newCount);
    if (newCount >= 5) {
      if (onTriggerConsole) {
        onTriggerConsole();
      } else {
        setConsoleOpen(true);
      }
      setLogoClicks(0);
    }
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/founder" },
    { label: "Portfolio", href: "/projects" },
    { label: "Exhibitions", href: "/labs" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
        <nav
          className={`pointer-events-auto flex items-center justify-between w-full max-w-5xl px-6 py-2.5 rounded-full transition-all duration-300 ${
            isScrolled
              ? "bg-[#FFFFFF]/95 dark:bg-[#141414]/95 backdrop-blur-md shadow-card border border-[#0A0A0A]/10"
              : "bg-[#FFFFFF] dark:bg-[#141414] shadow-card border border-[#0A0A0A]/8"
          }`}
        >
          {/* Far Left: Minimal Logo */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              onClick={handleLogoClick}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="relative h-6 w-24 sm:w-28">
                <Image
                  src="/assets/logo-light.png"
                  alt="Xentoryx Logo Light"
                  fill
                  className="object-contain block dark:hidden"
                  priority
                />
                <Image
                  src="/assets/logo-dark.png"
                  alt="Xentoryx Logo Dark"
                  fill
                  className="object-contain hidden dark:block"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Center: Nav Links */}
          <div className="hidden md:flex items-center gap-7 text-[13px] font-sans font-medium text-[#0A0A0A] dark:text-[#F5F1E8]">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`transition-colors py-1 hover:text-[#0A0A0A] ${
                    isActive ? "font-bold text-[#0A0A0A] dark:text-[#F5F1E8]" : "opacity-75 hover:opacity-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Far Right: Clean Profile / Status Chip */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F1E8] dark:bg-[#202020] text-[12px] font-sans text-[#0A0A0A] dark:text-[#F5F1E8] border border-[#0A0A0A]/5">
              <span className="w-2 h-2 rounded-full bg-[#D9A648]" />
              <span className="font-medium text-[#0A0A0A]/80 dark:text-[#F5F1E8]/90">Sala Canal, 22 Nov 23</span>
              <div className="relative w-4 h-4 rounded-full overflow-hidden ml-0.5">
                <Image
                  src="/assets/founder-asif.jpg"
                  alt="Avatar"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-full text-[#0A0A0A] dark:text-[#F5F1E8]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0A0A0A]/90 backdrop-blur-md md:hidden pt-24 px-6 pb-12 flex flex-col justify-between">
          <div className="space-y-4">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-2xl font-display font-black text-[#F5F1E8] hover:text-[#D9A648] py-2 border-b border-[#F5F1E8]/10"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Background Modals preserved */}
      {!onOpenCmdk && (
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          onOpenAi={() => setAiAssistantOpen(true)}
          onOpenConsole={() => setConsoleOpen(true)}
        />
      )}

      {!onOpenAi && (
        <AiAssistantModal
          isOpen={aiAssistantOpen}
          onClose={() => setAiAssistantOpen(false)}
        />
      )}

      {!onTriggerConsole && (
        <EngineeringConsoleModal
          isOpen={consoleOpen}
          onClose={() => setConsoleOpen(false)}
        />
      )}
    </>
  );
}
