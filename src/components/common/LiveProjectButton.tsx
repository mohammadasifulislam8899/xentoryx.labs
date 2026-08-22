"use client";

import React from "react";
import Link from "next/link";

interface LiveProjectButtonProps {
  href?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function LiveProjectButton({
  href,
  className = "",
  children = "Live Project",
  onClick,
}: LiveProjectButtonProps) {
  const content = (
    <button
      onClick={onClick}
      className={`min-h-[44px] rounded-full border-2 border-[var(--border-color)] text-[var(--text-primary)] font-medium uppercase tracking-widest px-5 py-2.5 sm:px-8 sm:py-3 md:px-10 md:py-3.5 text-[11px] sm:text-xs md:text-sm hover:bg-[var(--btn-ghost-hover)] active:scale-95 transition-all duration-300 inline-flex items-center justify-center select-none cursor-pointer shadow-sm touch-manipulation ${className}`}
    >
      {children}
    </button>
  );

  if (href && href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="inline-block">
        {content}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return content;
}
