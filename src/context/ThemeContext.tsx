"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useThemeTransition } from "@/hooks/useThemeTransition";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (event?: React.MouseEvent, iconRef?: React.RefObject<HTMLElement | null>) => Promise<void>;
  setTheme: (theme: Theme) => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { triggerTransition } = useThemeTransition();

  // Initialize theme from DOM or localStorage on client mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("xentoryx-theme") as Theme | null;
    if (savedTheme === "light" || savedTheme === "dark") {
      setThemeState(savedTheme);
      applyThemeToDOM(savedTheme);
    } else {
      const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
      const initial = prefersLight ? "light" : "dark";
      setThemeState(initial);
      applyThemeToDOM(initial);
    }
  }, []);

  const applyThemeToDOM = (t: Theme) => {
    const root = document.documentElement;
    root.setAttribute("data-theme", t);
    if (t === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  };

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    localStorage.setItem("xentoryx-theme", t);
    applyThemeToDOM(t);
  }, []);

  const toggleTheme = useCallback(
    async (event?: React.MouseEvent, iconRef?: React.RefObject<HTMLElement | null>) => {
      if (isTransitioning) return;
      setIsTransitioning(true);

      const nextTheme: Theme = theme === "dark" ? "light" : "dark";

      try {
        await triggerTransition(
          nextTheme,
          event,
          iconRef?.current || null,
          () => {
            setThemeState(nextTheme);
            localStorage.setItem("xentoryx-theme", nextTheme);
            applyThemeToDOM(nextTheme);
          }
        );
      } catch (err) {
        // Fallback in case of animation interruption
        setTheme(nextTheme);
      } finally {
        setIsTransitioning(false);
      }
    },
    [theme, isTransitioning, triggerTransition, setTheme]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
