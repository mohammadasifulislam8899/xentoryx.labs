"use client";

import React, { useRef } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function ThemeToggle({ className = "", size = "md" }: ThemeToggleProps) {
  const { theme, toggleTheme, isTransitioning } = useTheme();
  const iconRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: "w-8 h-8 p-1.5",
    md: "w-9 h-9 sm:w-10 sm:h-10 p-2",
    lg: "w-11 h-11 p-2.5",
  }[size];

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-4 h-4 sm:w-5 sm:h-5",
    lg: "w-5 h-5",
  }[size];

  const handleClick = (e: React.MouseEvent) => {
    toggleTheme(e, iconRef);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isTransitioning}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={`rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:border-[var(--text-primary)] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer shadow-sm disabled:pointer-events-none ${sizeClasses} ${className}`}
    >
      <div ref={iconRef} className="flex items-center justify-center">
        {theme === "dark" ? (
          <Sun className={`${iconSizes} text-[#BBCCD7] hover:text-amber-400 transition-colors`} />
        ) : (
          <Moon className={`${iconSizes} text-[#2E3338] hover:text-indigo-600 transition-colors`} />
        )}
      </div>
    </button>
  );
}
