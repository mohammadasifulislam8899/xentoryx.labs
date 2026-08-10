"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollPercentage(currentProgress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-[100] pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-brand-red via-[#FF5E50] to-brand-red shadow-[0_0_12px_#DB4338] transition-all duration-75"
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  );
}
