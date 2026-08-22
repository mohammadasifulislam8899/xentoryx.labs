"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Cpu, Server, Activity, ShieldCheck, CornerDownLeft } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function EngineeringConsoleModal({ isOpen, onClose }: Props) {
  const [inputVal, setInputVal] = useState("");
  const [logs, setLogs] = useState<string[]>([
    "ARCHIVE SYSTEM INITIALIZED: XENTORYX FIELD OS v4.2.0-STABLE",
    "FOUNDER NODE: MOHAMMAD ASIFUL ISLAM [AUTHENTICATED]",
    "SYSTEM TELEMETRY: 100% OPERATIONAL // BUFFER: ACTIVE",
    "Type 'help' for available archival CLI commands.",
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let reply = "";
    switch (cmd) {
      case "help":
        reply = "Available commands: status, stack, founder, projects, contact, clear, exit";
        break;
      case "status":
        reply = "[OK] Telemetry Latency: 12ms | Heap: 42.8 MB | CPU Load: 0.4% | Security: TLS 1.3 Strict";
        break;
      case "stack":
        reply = "Architecture: Next.js 15, React 19, TypeScript, Tailwind CSS, GSAP, Framer Motion, Lenis, ESP32 C++, Node.js";
        break;
      case "founder":
        reply = "Founder: Asif | Discipline: Native Android, Embedded IoT Microcontrollers, Scalable Cloud APIs & Systems";
        break;
      case "projects":
        reply = "Flagship Catalog: 01. Dipannita (Telemetry/Android) | 02. Expensey (Finance/Android) | 03. Reelo (Media Engine)";
        break;
      case "contact":
        reply = "Direct Channel: mohammadasifulislam8899@gmail.com | Studio: Xentoryx Labs";
        break;
      case "clear":
        setLogs([]);
        setInputVal("");
        return;
      case "exit":
        onClose();
        return;
      default:
        reply = `Unknown field command: '${cmd}'. Type 'help' for directory.`;
    }

    setLogs((prev) => [...prev, `xentoryx-cli$> ${inputVal}`, reply]);
    setInputVal("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl bg-[#F9F8F6] dark:bg-[#0A0B0E] border border-black/10 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden text-xs font-mono text-slate-900 dark:text-white"
          >
            {/* Header bar */}
            <div className="px-6 py-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between bg-black/[0.02] dark:bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold uppercase tracking-wider text-slate-900 dark:text-white">SYSTEM / 001 — Archival Console</span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] bg-brand-red/10 text-brand-red border border-brand-red/30 font-bold">
                      FOUNDER NODE
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400">Telemetry Stream &amp; Diagnostics</div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Telemetry Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 sm:p-6 border-b border-black/10 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01]">
              <div className="p-3 rounded-2xl bg-white dark:bg-[#12141A] border border-black/5 dark:border-white/5 space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>PING</span>
                  <Activity className="w-3.5 h-3.5 text-brand-red" />
                </div>
                <div className="text-base font-bold text-slate-900 dark:text-white font-mono">12 ms</div>
              </div>

              <div className="p-3 rounded-2xl bg-white dark:bg-[#12141A] border border-black/5 dark:border-white/5 space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>LOAD</span>
                  <Cpu className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <div className="text-base font-bold text-slate-900 dark:text-white font-mono">0.4%</div>
              </div>

              <div className="p-3 rounded-2xl bg-white dark:bg-[#12141A] border border-black/5 dark:border-white/5 space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>HEAP</span>
                  <Server className="w-3.5 h-3.5 text-cyan-500" />
                </div>
                <div className="text-base font-bold text-slate-900 dark:text-white font-mono">42.8 MB</div>
              </div>

              <div className="p-3 rounded-2xl bg-white dark:bg-[#12141A] border border-black/5 dark:border-white/5 space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>SECURITY</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div className="text-base font-bold text-slate-900 dark:text-white font-mono">TLS 1.3</div>
              </div>
            </div>

            {/* Terminal Buffer */}
            <div className="p-6 h-64 overflow-y-auto space-y-2 text-xs font-mono bg-white dark:bg-[#07080B]">
              {logs.map((log, idx) => (
                <div
                  key={idx}
                  className={
                    log.startsWith("xentoryx-cli$>")
                      ? "text-brand-red font-bold"
                      : log.includes("AUTHENTICATED") || log.includes("[OK]")
                      ? "text-emerald-600 dark:text-emerald-400 font-medium"
                      : "text-slate-700 dark:text-slate-300"
                  }
                >
                  {log}
                </div>
              ))}
            </div>

            {/* CLI Input */}
            <form onSubmit={handleCommand} className="p-4 border-t border-black/10 dark:border-white/10 flex items-center gap-3 bg-black/[0.02] dark:bg-white/[0.02]">
              <span className="text-brand-red font-bold">xentoryx-cli$&gt;</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type 'status', 'stack', 'projects', 'contact' or 'help'..."
                className="flex-1 bg-transparent text-slate-900 dark:text-white focus:outline-none font-mono text-xs placeholder:text-slate-400 font-bold"
                autoFocus
              />
              <button type="submit" className="text-slate-400 hover:text-brand-red transition-colors">
                <CornerDownLeft className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
