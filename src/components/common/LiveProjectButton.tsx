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
      className={`rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 active:scale-95 transition-all duration-300 inline-flex items-center justify-center select-none cursor-pointer ${className}`}
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
