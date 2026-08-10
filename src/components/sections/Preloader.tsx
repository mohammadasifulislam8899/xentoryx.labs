"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: Props) {
  const [count, setCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 3;
        return Math.min(100, prev + increment);
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-[#0F1115] text-white"
        >
          {/* Subtle Ambient Red Glow */}
          <div className="absolute w-[500px] h-[500px] bg-brand-red/15 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

          {/* Logo Reveal & Red Circle Pulsing Energy Core */}
          <div className="relative mb-8">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <Image
                src="/assets/logo-dark.png"
                alt="Xentoryx Labs Logo"
                width={96}
                height={96}
                className="w-24 h-24 object-contain z-10"
                priority
              />
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.9, 0.4],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-brand-red/30 blur-xl z-0"
              />
            </div>
          </div>

          {/* Company Title */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="font-display text-2xl font-bold tracking-tight text-white">
              Xentoryx
            </span>
            <span className="text-xs uppercase tracking-widest font-mono text-brand-red font-semibold">
              LABS
            </span>
          </motion.div>

          {/* Percentage Counter */}
          <div className="w-64 space-y-2 text-center">
            <div className="flex justify-between items-center text-xs font-mono text-brand-muted">
              <span>INITIALIZING SYSTEM...</span>
              <span className="text-brand-red font-bold">{count}%</span>
            </div>
            {/* Progress Laser Bar */}
            <div className="h-1 w-full bg-surface-hover rounded-full overflow-hidden border border-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-red via-[#FF5E50] to-brand-red shadow-[0_0_15px_#DB4338]"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>

          <div className="absolute bottom-10 text-[10px] font-mono text-brand-muted uppercase tracking-widest">
            FOUNDER: ASIF // ESTD. 2026
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
