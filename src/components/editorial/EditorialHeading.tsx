import React from "react";

interface Props {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4;
  className?: string;
  asymmetric?: boolean;
}

export default function EditorialHeading({
  children,
  level = 2,
  className = "",
  asymmetric = false,
}: Props) {
  const baseClasses = "font-display font-black tracking-tight text-slate-900 dark:text-[#ECECEE] transition-colors duration-300";

  if (level === 1) {
    return (
      <h1 className={`${baseClasses} text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] ${asymmetric ? "-ml-0.5 sm:-ml-1" : ""} ${className}`}>
        {children}
      </h1>
    );
  }

  if (level === 2) {
    return (
      <h2 className={`${baseClasses} text-3xl sm:text-5xl md:text-6xl leading-[1.02] ${className}`}>
        {children}
      </h2>
    );
  }

  if (level === 3) {
    return (
      <h3 className={`${baseClasses} text-2xl sm:text-3xl md:text-4xl leading-snug ${className}`}>
        {children}
      </h3>
    );
  }

  return (
    <h4 className={`${baseClasses} text-xl sm:text-2xl font-bold leading-snug ${className}`}>
      {children}
    </h4>
  );
}
