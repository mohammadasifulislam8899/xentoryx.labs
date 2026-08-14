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
    <div className="min-h-screen bg-[#07090C] text-white py-12 px-4 sm:px-6 lg:px-8 font-mono">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/labs"
            className="inline-flex items-center gap-2 text-xs text-brand-muted hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Research Labs</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
              DEVELOPER PLAYGROUND CONSOLE
            </span>
          </div>
        </div>

        {/* Terminal Window Box */}
        <div className="rounded-3xl glass-panel-red border border-brand-red/40 bg-[#0A0C10]/95 p-6 shadow-2xl space-y-6 min-h-[500px] flex flex-col justify-between">
          <div className="space-y-4">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs text-brand-muted ml-2">xentoryx-labs@asif-node:~</span>
              </div>
              <Terminal className="w-4 h-4 text-brand-red" />
            </div>

            {/* Terminal Logs Output */}
            <div className="space-y-4 text-xs">
              {history.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-2 text-brand-red">
                    <span>xentoryx-cli$&gt;</span>
                    <span className="text-white font-bold">{item.command}</span>
                  </div>
                  <div className="text-gray-300 pl-4">{item.response}</div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          </div>

          {/* Interactive Input Form */}
          <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 border-t border-white/10 pt-4">
            <span className="text-xs text-brand-red font-bold">xentoryx-cli$&gt;</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type 'help', 'status', 'stack', 'projects', or 'contact'..."
              className="flex-1 bg-transparent text-xs text-white focus:outline-none placeholder:text-gray-600"
              autoFocus
            />
            <button type="submit" className="text-brand-muted hover:text-white">
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
