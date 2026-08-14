"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ParticleGridCanvas from "@/components/canvas/ParticleGridCanvas";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import CommandPalette from "@/components/layout/CommandPalette";
import EngineeringConsoleModal from "@/components/layout/EngineeringConsoleModal";
import AiAssistantModal from "@/components/ui/AiAssistantModal";
import { Bot } from "lucide-react";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  const [cmdkOpen, setCmdkOpen] = useState(false);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  useEffect(() => {
    const handleOpenCmdk = () => setCmdkOpen(true);
    const handleOpenAi = () => setAiOpen(true);
    const handleOpenConsole = () => setConsoleOpen(true);

    document.addEventListener("open-command-palette", handleOpenCmdk);
    document.addEventListener("open-ai-assistant", handleOpenAi);
    document.addEventListener("open-engineering-console", handleOpenConsole);

    return () => {
      document.removeEventListener("open-command-palette", handleOpenCmdk);
      document.removeEventListener("open-ai-assistant", handleOpenAi);
      document.removeEventListener("open-engineering-console", handleOpenConsole);
    };
  }, []);

  // Completely isolated Admin Page without any client/visitor navbar, footer, cursor, or canvas
  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-brand-red selection:text-white transition-colors duration-300">
        {children}
      </div>
    );
  }

  return (
    <SmoothScroll>
      <ScrollProgress />
      <CustomCursor />
      <ParticleGridCanvas />

      <Navbar
        onOpenCmdk={() => setCmdkOpen(true)}
        onOpenAi={() => setAiOpen(true)}
        onTriggerConsole={() => setConsoleOpen(true)}
      />

      {children}

      <Footer />

      {/* Mobile Bottom Navigation Bar (< md) */}
      <MobileBottomNav onOpenAi={() => setAiOpen(true)} />

      {/* Floating XenAI Assistant Button Badge */}
      <button
        onClick={() => setAiOpen(true)}
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-30 px-4 py-2.5 rounded-full bg-gradient-to-r from-brand-red to-[#FF5E50] text-white text-xs font-mono font-bold flex items-center gap-2 shadow-glow-red hover:shadow-glow-red-lg hover:scale-105 transition-all group"
      >
        <Bot className="w-4 h-4 animate-bounce" />
        <span>XenAI</span>
      </button>

      {/* Modals */}
      <CommandPalette
        isOpen={cmdkOpen}
        onClose={() => setCmdkOpen(false)}
        onOpenAi={() => setAiOpen(true)}
        onOpenConsole={() => setConsoleOpen(true)}
      />

      <EngineeringConsoleModal
        isOpen={consoleOpen}
        onClose={() => setConsoleOpen(false)}
      />

      <AiAssistantModal
        isOpen={aiOpen}
        onClose={() => setAiOpen(false)}
      />
    </SmoothScroll>
  );
}
