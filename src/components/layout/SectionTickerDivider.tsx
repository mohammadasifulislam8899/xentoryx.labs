import React from "react";

interface SectionTickerProps {
  word?: string;
  className?: string;
}

export default function SectionTickerDivider({ word = "about", className = "" }: SectionTickerProps) {
  const repeated = `${word} • ${word} • ${word} • ${word} • ${word} • ${word} • ${word} • ${word} • `;

  return (
    <div className={`w-full bg-[#0A0A0A] h-28 sm:h-36 overflow-hidden flex items-center border-y border-[#F5F1E8]/10 select-none ${className}`}>
      <div className="flex whitespace-nowrap animate-marquee-left items-center w-full">
        <span className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-[-0.05em] text-[#F5F1E8]/30 lowercase mr-8">
          {repeated}
        </span>
        <span className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-[-0.05em] text-[#F5F1E8]/30 lowercase mr-8">
          {repeated}
        </span>
      </div>
    </div>
  );
}
