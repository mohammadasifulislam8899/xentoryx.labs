"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ParticleGridCanvas from "@/components/canvas/ParticleGridCanvas";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CommandPalette from "@/components/layout/CommandPalette";
import EngineeringConsoleModal from "@/components/layout/EngineeringConsoleModal";
import AiAssistantModal from "@/components/ui/AiAssistantModal";

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

      {/* Floating Gemini AI Assistant Button Badge */}
      <button
        onClick={() => setAiOpen(true)}
        className="fixed bottom-6 right-6 z-[999] px-4 py-3 rounded-full bg-gradient-to-r from-brand-red to-[#FF5E50] text-white text-xs font-bold font-mono shadow-glow-red hover:shadow-glow-red-lg transition-all flex items-center gap-2 hover:scale-105 active:scale-95 group"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        <span>Gemini AI</span>
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
