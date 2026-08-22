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
  ArrowRight,
  User,
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
      <div className="fixed inset-0 z-[10000] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: -10 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl bg-[#F9F8F6] dark:bg-[#0E1015] rounded-3xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
        >
          <Command className="w-full" label="Editorial Command Index">
            {/* Search Input Bar */}
            <div className="flex items-center px-6 py-4 border-b border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
              <Search className="w-4 h-4 text-brand-red mr-3 shrink-0" />
              <Command.Input
                value={search}
                onValueChange={setSearch}
                placeholder="Search studio index, projects, protocols, or actions..."
                className="w-full py-2 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 font-mono"
                autoFocus
              />
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <Command.List className="max-h-96 overflow-y-auto p-4 space-y-3 text-xs font-mono">
              <Command.Empty className="p-8 text-center text-xs text-slate-400 font-mono">
                No matching catalog entries or commands found.
              </Command.Empty>

              {/* Group 1: Navigation Index */}
              <Command.Group
                heading="01 // STUDIO INDEX"
                className="text-[10px] font-bold text-brand-red uppercase tracking-widest px-3 py-1.5"
              >
                <Command.Item
                  onSelect={() => runAction(() => router.push("/"))}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors aria-selected:bg-black/5 dark:aria-selected:bg-white/5 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 font-mono text-[10px]">01</span>
                    <Home className="w-4 h-4 text-slate-400 group-hover:text-brand-red transition-colors" />
                    <span className="font-bold">Overview // Studio Home</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </Command.Item>

                <Command.Item
                  onSelect={() => runAction(() => router.push("/founder"))}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors aria-selected:bg-black/5 dark:aria-selected:bg-white/5 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 font-mono text-[10px]">02</span>
                    <User className="w-4 h-4 text-slate-400 group-hover:text-brand-red transition-colors" />
                    <span className="font-bold">Founder Profile // Asif</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </Command.Item>

                <Command.Item
                  onSelect={() => runAction(() => router.push("/projects"))}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors aria-selected:bg-black/5 dark:aria-selected:bg-white/5 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 font-mono text-[10px]">03</span>
                    <Briefcase className="w-4 h-4 text-slate-400 group-hover:text-brand-red transition-colors" />
                    <span className="font-bold">Project Archive Catalog</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </Command.Item>

                <Command.Item
                  onSelect={() => runAction(() => router.push("/labs"))}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors aria-selected:bg-black/5 dark:aria-selected:bg-white/5 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 font-mono text-[10px]">04</span>
                    <FlaskConical className="w-4 h-4 text-slate-400 group-hover:text-brand-red transition-colors" />
                    <span className="font-bold">R&amp;D Hardware Laboratory</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </Command.Item>
              </Command.Group>

              {/* Group 2: Systems & AI Assistant */}
              <Command.Group
                heading="02 // ACTIONS & SYSTEM"
                className="text-[10px] font-bold text-brand-red uppercase tracking-widest px-3 py-1.5 mt-2"
              >
                <Command.Item
                  onSelect={() => runAction(onOpenAi)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer hover:bg-brand-red/10 transition-colors aria-selected:bg-brand-red/10 group"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4 text-brand-red animate-pulse" />
                    <span className="font-bold text-brand-red">Consult XenAI Studio Assistant</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-red/20 text-brand-red font-bold">
                    ONLINE
                  </span>
                </Command.Item>

                <Command.Item
                  onSelect={() => runAction(onOpenConsole)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors aria-selected:bg-black/5 dark:aria-selected:bg-white/5 group"
                >
                  <div className="flex items-center gap-3">
                    <Terminal className="w-4 h-4 text-emerald-500" />
                    <span className="font-bold">Engineering Field Console Overlay</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">CLI</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => runAction(() => window.open("/assets/founder-asif.jpg", "_blank"))}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors aria-selected:bg-black/5 dark:aria-selected:bg-white/5 group"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-slate-400" />
                    <span>Download Founder Curriculum Vitae</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">PDF</span>
                </Command.Item>
              </Command.Group>

              {/* Group 3: External */}
              <Command.Group
                heading="03 // EXTERNAL CHANNELS"
                className="text-[10px] font-bold text-brand-red uppercase tracking-widest px-3 py-1.5 mt-2"
              >
                <Command.Item
                  onSelect={() => runAction(() => window.open("https://github.com/mohammadasifulislam8899", "_blank"))}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors aria-selected:bg-black/5 dark:aria-selected:bg-white/5 group"
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-4 h-4 text-slate-400" />
                    <span>GitHub Repositories &amp; Source</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">↗</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => runAction(() => {
                    router.push("/#contact");
                    const el = document.getElementById("contact");
                    el?.scrollIntoView({ behavior: "smooth" });
                  })}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors aria-selected:bg-black/5 dark:aria-selected:bg-white/5 group"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>Initiate Studio Collaboration</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">DOCKET</span>
                </Command.Item>
              </Command.Group>
            </Command.List>

            {/* Footer Status Bar */}
            <div className="px-6 py-3 bg-black/[0.03] dark:bg-white/[0.02] border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <div className="flex items-center gap-3">
                <span>Navigate <kbd className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-slate-700 dark:text-slate-200">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-slate-700 dark:text-slate-200">↓</kbd></span>
                <span>Select <kbd className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-slate-700 dark:text-slate-200">↵</kbd></span>
              </div>
              <span>Close <kbd className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-slate-700 dark:text-slate-200">ESC</kbd></span>
            </div>
          </Command>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
