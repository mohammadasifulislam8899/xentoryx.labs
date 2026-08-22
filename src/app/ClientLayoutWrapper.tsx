"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CommandPalette from "@/components/layout/CommandPalette";
import EngineeringConsoleModal from "@/components/layout/EngineeringConsoleModal";
import AiAssistantModal from "@/components/ui/AiAssistantModal";
import { Bot } from "lucide-react";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const isHomeRoute = pathname === "/";

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

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] transition-colors duration-300">
        {children}
      </div>
    );
  }

  return (
    <SmoothScroll>
      <ScrollProgress />
      <CustomCursor />

      {!isHomeRoute && (
        <Navbar
          onOpenCmdk={() => setCmdkOpen(true)}
          onOpenAi={() => setAiOpen(true)}
          onTriggerConsole={() => setConsoleOpen(true)}
        />
      )}

      {children}

      <Footer />

      {/* Floating XenAI Assistant Button Badge - Mobile optimized */}
      <button
        onClick={() => setAiOpen(true)}
        style={{
          background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
          boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
          outline: "2px solid white",
          outlineOffset: "-3px",
        }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 p-2.5 sm:px-4 sm:py-2.5 rounded-full text-white text-xs font-mono font-bold flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all group shadow-2xl cursor-pointer"
        aria-label="Open XenAI Assistant"
        title="Open XenAI Assistant"
      >
        <Bot className="w-4 h-4 animate-bounce" />
        <span className="hidden sm:inline">XenAI</span>
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
