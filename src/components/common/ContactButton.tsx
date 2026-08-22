"use client";

import React from "react";
import Link from "next/link";
import Magnet from "@/components/common/Magnet";

interface ContactButtonProps {
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function ContactButton({
  href = "#contact",
  className = "",
  children = "Contact Me",
}: ContactButtonProps) {
  const buttonElement = (
    <Magnet padding={120} strength={4} className="inline-block">
      <button
        style={{
          background: "var(--accent-gradient)",
          boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
          outline: "2px solid white",
          outlineOffset: "-3px",
        }}
        className={`rounded-full px-5 py-2.5 sm:px-8 sm:py-3.5 md:px-10 md:py-4 text-white font-medium uppercase tracking-widest text-[11px] sm:text-xs md:text-sm hover:scale-105 active:scale-95 transition-all duration-300 select-none cursor-pointer shadow-xl ${className}`}
      >
        {children}
      </button>
    </Magnet>
  );

  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="inline-block">
        {buttonElement}
      </a>
    );
  }

  return (
    <Link href={href} className="inline-block">
      {buttonElement}
    </Link>
  );
}
