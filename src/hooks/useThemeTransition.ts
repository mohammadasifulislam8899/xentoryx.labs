"use client";

import { useCallback } from "react";
import gsap from "gsap";

export function useThemeTransition() {
  const triggerTransition = useCallback(
    (
      newTheme: "dark" | "light",
      event?: React.MouseEvent | { clientX: number; clientY: number },
      iconElement?: HTMLElement | null,
      onThemeApply?: () => void
    ): Promise<void> => {
      return new Promise((resolve) => {
        // Check for reduced motion preference
        if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          if (onThemeApply) onThemeApply();
          resolve();
          return;
        }

        const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
        const duration = isMobile ? 0.5 : 0.75;

        // 1. Calculate origin X and Y from click event or center of screen
        let originX = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
        let originY = typeof window !== "undefined" ? window.innerHeight / 2 : 0;

        if (event && "clientX" in event && "clientY" in event) {
          originX = event.clientX;
          originY = event.clientY;
        }

        // Animate icon rotation
        if (iconElement) {
          gsap.fromTo(
            iconElement,
            { rotate: 0, scale: 0.8 },
            { rotate: 360, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
          );
        }

        // 2. Determine incoming background color
        const incomingBg = newTheme === "light" ? "#F7F5F2" : "#0C0C0C";

        // 3. Create full-screen circular reveal overlay
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.inset = "0";
        overlay.style.zIndex = "99999";
        overlay.style.pointerEvents = "none";
        overlay.style.backgroundColor = incomingBg;
        overlay.style.clipPath = `circle(0px at ${originX}px ${originY}px)`;
        document.body.appendChild(overlay);

        // 4. Run GSAP circular expansion timeline
        let themeSwapped = false;
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.to(overlay, {
              opacity: 0,
              duration: 0.25,
              ease: "power2.out",
              onComplete: () => {
                overlay.remove();
                resolve();
              },
            });
          },
        });

        tl.to(overlay, {
          clipPath: `circle(150% at ${originX}px ${originY}px)`,
          duration: duration,
          ease: "power3.inOut",
          onUpdate: function () {
            if (this.progress() >= 0.4 && !themeSwapped) {
              themeSwapped = true;
              if (onThemeApply) onThemeApply();
            }
          },
        });
      });
    },
    []
  );

  return { triggerTransition };
}
