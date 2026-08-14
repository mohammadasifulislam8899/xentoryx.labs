"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Search,
  Home,
  Briefcase,
  FlaskConical,
  MessageSquare,
  FileText,
  Github,
  Mail,
  Terminal,
  X,
  Code2,
} from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenAi: () => void;
  onOpenConsole: () => void;
}

export default function CommandPalette({ isOpen, onClose, onOpenAi, onOpenConsole }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        isOpen ? onClose() : null;
        if (!isOpen) {
          // Open palette handler in parent layout
          document.dispatchEvent(new CustomEvent("open-command-palette"));
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const runAction = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="w-full max-w-xl glass-panel-red rounded-2xl overflow-hidden shadow-2xl border border-brand-red/30 bg-[#12141A]/95 text-white"
        >
          <Command className="w-full" label="Command Palette">
            <div className="flex items-center px-4 border-b border-white/10">
              <Search className="w-4 h-4 text-brand-red mr-3" />
              <Command.Input
                value={search}
                onValueChange={setSearch}
                placeholder="Type a command or search sections..."
                className="w-full py-4 bg-transparent text-sm text-white focus:outline-none placeholder:text-gray-500 font-sans"
              />
              <button
                onClick={onClose}
                className="p-1 text-brand-muted hover:text-white rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <Command.List className="max-h-80 overflow-y-auto p-2 space-y-1 text-sm">
              <Command.Empty className="p-4 text-center text-xs text-brand-muted">
                No matching results found.
              </Command.Empty>

              <Command.Group heading="Navigation" className="text-[11px] font-semibold text-brand-red uppercase tracking-wider px-2 py-1">
                <Command.Item
                  onSelect={() => runAction(() => router.push("/"))}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-brand-red/20 hover:text-white transition-colors aria-selected:bg-brand-red/20 aria-selected:text-white"
                >
                  <Home className="w-4 h-4 text-brand-muted" />
                  <span>Go to Overview (Home)</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => runAction(() => router.push("/projects"))}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-brand-red/20 hover:text-white transition-colors aria-selected:bg-brand-red/20 aria-selected:text-white"
                >
                  <Briefcase className="w-4 h-4 text-brand-muted" />
                  <span>Explore Featured Projects Catalog</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => runAction(() => router.push("/labs"))}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-brand-red/20 hover:text-white transition-colors aria-selected:bg-brand-red/20 aria-selected:text-white"
                >
                  <FlaskConical className="w-4 h-4 text-brand-muted" />
                  <span>Visit Xentoryx Labs Innovation Hub</span>
                </Command.Item>
              </Command.Group>

              <Command.Group heading="Actions & AI" className="text-[11px] font-semibold text-brand-red uppercase tracking-wider px-2 py-1 mt-2">
                <Command.Item
                  onSelect={() => runAction(onOpenAi)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-brand-red/20 hover:text-white transition-colors aria-selected:bg-brand-red/20 aria-selected:text-white"
                >
                  <MessageSquare className="w-4 h-4 text-brand-red animate-pulse" />
                  <span className="font-semibold text-brand-red">Launch "XenAI" Assistant</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => runAction(onOpenConsole)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-brand-red/20 hover:text-white transition-colors aria-selected:bg-brand-red/20 aria-selected:text-white"
                >
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>Open Engineering Console Easter Egg</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => runAction(() => window.open("/assets/founder-asif.jpg", "_blank"))}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-brand-red/20 hover:text-white transition-colors aria-selected:bg-brand-red/20 aria-selected:text-white"
                >
                  <FileText className="w-4 h-4 text-brand-muted" />
                  <span>Download Asif's Technical Resume</span>
                </Command.Item>
              </Command.Group>

              <Command.Group heading="External & Social" className="text-[11px] font-semibold text-brand-red uppercase tracking-wider px-2 py-1 mt-2">
                <Command.Item
                  onSelect={() => runAction(() => window.open("https://github.com/Xentoryx", "_blank"))}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-brand-red/20 hover:text-white transition-colors aria-selected:bg-brand-red/20 aria-selected:text-white"
                >
                  <Github className="w-4 h-4 text-brand-muted" />
                  <span>Open Xentoryx GitHub Repositories</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => runAction(() => {
                    router.push("/#contact");
                    const el = document.getElementById("contact");
                    el?.scrollIntoView({ behavior: "smooth" });
                  })}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-brand-red/20 hover:text-white transition-colors aria-selected:bg-brand-red/20 aria-selected:text-white"
                >
                  <Mail className="w-4 h-4 text-brand-muted" />
                  <span>Contact Asif & Xentoryx Labs</span>
                </Command.Item>
              </Command.Group>
            </Command.List>

            <div className="px-4 py-2 bg-[#0d0f14] border-t border-white/10 flex items-center justify-between text-[11px] text-brand-muted">
              <span>Use <kbd className="px-1.5 py-0.5 rounded bg-surface border border-white/10 text-white">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-surface border border-white/10 text-white">↓</kbd> to navigate</span>
              <span>Press <kbd className="px-1.5 py-0.5 rounded bg-surface border border-white/10 text-white">ESC</kbd> to close</span>
            </div>
          </Command>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
