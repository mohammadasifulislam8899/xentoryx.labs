"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AmbientGradientsCanvas() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = (clientX / window.innerWidth - 0.5) * 40;
      const moveY = (clientY / window.innerHeight - 0.5) * 40;
      setMousePos({ x: moveX, y: moveY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* Primary Xentoryx Red Ambient Glow Orb (Top Left) */}
      <motion.div
        animate={{
          x: mousePos.x * 0.8,
          y: mousePos.y * 0.8,
          scale: [1, 1.08, 1],
        }}
        transition={{
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 0.5, ease: "easeOut" },
          y: { duration: 0.5, ease: "easeOut" },
        }}
        className="absolute -top-32 -left-32 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full bg-gradient-to-br from-brand-red/15 via-[#FF5E50]/10 to-transparent blur-[140px] opacity-70 dark:opacity-80"
      />

      {/* Secondary Electric Cyan Accent Glow Orb (Middle Right) */}
      <motion.div
        animate={{
          x: -mousePos.x * 1.2,
          y: -mousePos.y * 1.2,
          scale: [1, 1.12, 1],
        }}
        transition={{
          scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 0.6, ease: "easeOut" },
          y: { duration: 0.6, ease: "easeOut" },
        }}
        className="absolute top-1/3 -right-32 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full bg-gradient-to-bl from-cyan-500/10 via-sky-500/5 to-transparent blur-[150px] opacity-60 dark:opacity-75"
      />

      {/* Tertiary Deep Crimson Core Aura (Bottom Center) */}
      <motion.div
        animate={{
          x: mousePos.x * 0.5,
          y: mousePos.y * 0.5,
          scale: [1, 1.05, 1],
        }}
        transition={{
          scale: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 0.7, ease: "easeOut" },
          y: { duration: 0.7, ease: "easeOut" },
        }}
        className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] sm:w-[850px] sm:h-[850px] rounded-full bg-gradient-to-tr from-brand-red/12 via-purple-600/5 to-transparent blur-[160px] opacity-65 dark:opacity-80"
      />

      {/* Subtle Noise Texture Overlay for Studio Polish */}
      <div className="absolute inset-0 bg-radial-vignette opacity-40 dark:opacity-60" />
    </div>
  );
}
