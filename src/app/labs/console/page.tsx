"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal, ArrowLeft, Cpu, Activity, ShieldCheck, CornerDownLeft } from "lucide-react";
import Link from "next/link";

interface CommandOutput {
  command: string;
  response: string | React.ReactNode;
}

export default function DeveloperPlaygroundConsolePage() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: "sysinfo",
      response: "Xentoryx Engineering Console v2.5.0 // Founder Asif Node. Type 'help' for available CLI commands.",
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let response: React.ReactNode = "";

    switch (cmd) {
      case "help":
        response = (
          <div className="space-y-1 text-xs font-mono text-cyan-400">
            <div>Available Commands:</div>
            <div>• <span className="text-emerald-400">status</span> : Inspect live system uptime & telemetry metrics</div>
            <div>• <span className="text-emerald-400">stack</span> : View technical architecture stack breakdown</div>
            <div>• <span className="text-emerald-400">projects</span> : List featured engineering builds</div>
            <div>• <span className="text-emerald-400">contact</span> : Get direct communication channels</div>
            <div>• <span className="text-emerald-400">clear</span> : Reset terminal buffer</div>
          </div>
        );
        break;

      case "status":
        response = (
          <div className="space-y-1 text-xs font-mono text-emerald-400">
            <div>[OK] Telemetry Stream: Active (12ms latency)</div>
            <div>[OK] ESP32 Microcontroller MQTT Gateway: Connected</div>
            <div>[OK] Next.js 15 Server Components: 100% Operational</div>
            <div>[OK] System Memory Heap: 42.1 MB / 1024 MB</div>
          </div>
        );
        break;

      case "stack":
        response = (
          <div className="space-y-1 text-xs font-mono text-amber-400">
            <div>• Native Android: Kotlin, Jetpack Compose, Room DB, Coroutines</div>
            <div>• IoT Systems: ESP32 C++, MQTT, BLE, Wireless OTA Engine</div>
            <div>• Web Core: Next.js 15 App Router, TypeScript, Tailwind CSS</div>
            <div>• Motion & 3D: GSAP ScrollTrigger, Framer Motion, R3F Three.js</div>
            <div>• Cloud Store: MongoDB Atlas, Vercel Edge Serverless</div>
          </div>
        );
        break;

      case "projects":
        response = (
          <div className="space-y-1 text-xs font-mono text-purple-400">
            <div>1. Dipannita — Blood Donation & Telemetry Network (Android)</div>
            <div>2. Expensey — AI Financial Telemetry & Budget Platform</div>
            <div>3. Reelo — Intelligent Short-form Video & Media Engine</div>
            <div>4. Xentoryx Control Plane — Microcontroller MQTT Telemetry Hub</div>
          </div>
        );
        break;

      case "contact":
        response = (
          <div className="space-y-1 text-xs font-mono text-sky-400">
            <div>Email: asif@xentoryx.com</div>
            <div>GitHub: https://github.com/mohammadasifulislam8899</div>
            <div>Location: Bangladesh // Global Remote Available</div>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        response = `Command not recognized: '${cmd}'. Type 'help' for available CLI commands.`;
    }

    setHistory((prev) => [...prev, { command: input, response }]);
    setInput("");
  };

  return (
    <div className="min-h-screen pt-28 pb-32 bg-slate-50 dark:bg-[#07090C] text-slate-900 dark:text-white relative transition-colors duration-300">
      {/* Red ambient core */}
      <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/labs"
            className="px-4 py-2 rounded-full glass-panel text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 transition-colors border-slate-200 dark:border-white/10 font-bold"
          >
            <ArrowLeft className="w-4 h-4 text-brand-red" />
            <span>Return to Labs R&D</span>
          </Link>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
              DEVELOPER PLAYGROUND CONSOLE
            </span>
          </div>
        </div>

        {/* Terminal Window Box */}
        <div className="rounded-3xl glass-panel border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#0A0C10]/95 p-6 shadow-2xl space-y-6 min-h-[500px] flex flex-col justify-between">
          <div className="space-y-4">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-bold ml-2">xentoryx-labs@asif-node:~</span>
              </div>
              <Terminal className="w-4 h-4 text-brand-red" />
            </div>

            {/* Terminal Logs Output */}
            <div className="space-y-4 text-xs font-mono">
              {history.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-2 text-brand-red font-bold">
                    <span>xentoryx-cli$&gt;</span>
                    <span className="text-slate-900 dark:text-white font-bold">{item.command}</span>
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 pl-4">{item.response}</div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          </div>

          {/* Interactive Input Form */}
          <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 border-t border-slate-200 dark:border-white/10 pt-4 font-mono">
            <span className="text-xs text-brand-red font-bold">xentoryx-cli$&gt;</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type 'help', 'status', 'stack', 'projects', or 'contact'..."
              className="flex-1 bg-transparent text-xs text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400 font-mono font-bold"
              autoFocus
            />
            <button type="submit" className="text-slate-500 dark:text-slate-400 hover:text-brand-red transition-colors">
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
