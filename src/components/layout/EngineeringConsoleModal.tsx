"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Cpu, Server, Activity, ShieldCheck } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function EngineeringConsoleModal({ isOpen, onClose }: Props) {
  const [inputVal, setInputVal] = useState("");
  const [logs, setLogs] = useState<string[]>([
    "System Initialized: Xentoryx OS v4.2.0-Production",
    "Founder Node: ASIF [AUTHENTICATED]",
    "System Status: 100% OPERATIONAL // PING: 12ms",
    "Type 'help' or 'status' for active commands.",
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
        reply = "[OK] Node Latency: 12ms | Memory: 42MB | Core CPU: 0.4% | Security: Encrypted TLS 1.3";
        break;
      case "stack":
        reply = "Stack: Next.js 15, React 19, TypeScript, Tailwind CSS, GSAP, Framer Motion, Lenis, ESP32, Node.js";
        break;
      case "founder":
        reply = "Founder: Asif | Focus: Android, Embedded IoT Systems, Scalable Backends & Web Applications";
        break;
      case "projects":
        reply = "Active Projects: Dipannita (AI IoT Companion), Expensey (Android App), Reelo (Media Engine)";
        break;
      case "contact":
        reply = "Direct Email: asif@xentoryx.com | Company: Xentoryx Labs";
        break;
      case "clear":
        setLogs([]);
        setInputVal("");
        return;
      case "exit":
        onClose();
        return;
      default:
        reply = `Command not recognized: '${cmd}'. Type 'help' for options.`;
    }

    setLogs((prev) => [...prev, `> ${inputVal}`, reply]);
    setInputVal("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-3xl glass-panel-red rounded-2xl overflow-hidden shadow-2xl border border-brand-red/40 bg-[#0B0D11]/95 text-xs font-mono"
          >
            {/* Header bar */}
            <div className="px-4 py-3 bg-[#13161C] border-b border-brand-red/30 flex items-center justify-between">
              <div className="flex items-center gap-2 text-brand-red font-bold uppercase tracking-wider">
                <Terminal className="w-4 h-4 text-brand-red animate-pulse" />
                <span>Xentoryx Labs — Engineering Console</span>
                <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] bg-brand-red/20 text-brand-red border border-brand-red/40">
                  SECRET ACCESS
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-md text-brand-muted hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Telemetry stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-[#111319] border-b border-white/5">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-surface/80 border border-white/5">
                <Activity className="w-4 h-4 text-brand-red" />
                <div>
                  <div className="text-[10px] text-brand-muted">PING</div>
                  <div className="text-white font-bold">12ms</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-surface/80 border border-white/5">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="text-[10px] text-brand-muted">CPU LOAD</div>
                  <div className="text-white font-bold">0.4%</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-surface/80 border border-white/5">
                <Server className="w-4 h-4 text-blue-400" />
                <div>
                  <div className="text-[10px] text-brand-muted">MEMORY</div>
                  <div className="text-white font-bold">42.8 MB</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-surface/80 border border-white/5">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <div>
                  <div className="text-[10px] text-brand-muted">SECURITY</div>
                  <div className="text-white font-bold">VERIFIED</div>
                </div>
              </div>
            </div>

            {/* Terminal logs */}
            <div className="p-4 h-64 overflow-y-auto font-mono space-y-1.5 text-gray-300">
              {logs.map((log, idx) => (
                <div
                  key={idx}
                  className={
                    log.startsWith(">")
                      ? "text-brand-red font-semibold"
                      : log.includes("AUTHENTICATED") || log.includes("VERIFIED")
                      ? "text-emerald-400"
                      : "text-gray-300"
                  }
                >
                  {log}
                </div>
              ))}
            </div>

            {/* Terminal input form */}
            <form onSubmit={handleCommand} className="p-3 bg-[#0e1015] border-t border-white/10 flex items-center gap-2">
              <span className="text-brand-red font-bold">&gt;</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type 'help' for options..."
                className="flex-1 bg-transparent text-white focus:outline-none font-mono text-xs placeholder:text-gray-600"
                autoFocus
              />
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
