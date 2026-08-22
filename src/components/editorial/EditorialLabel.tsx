import React from "react";

interface Props {
  children: React.ReactNode;
  variant?: "vermilion" | "muted" | "amber" | "outline";
  className?: string;
  size?: "xs" | "sm";
}

export default function EditorialLabel({
  children,
  variant = "vermilion",
  className = "",
  size = "xs",
}: Props) {
  const sizeClasses = size === "xs" ? "text-[10px] px-2.5 py-0.5 tracking-widest" : "text-xs px-3 py-1 tracking-wider";

  const variantStyles = {
    vermilion:
      "bg-brand-red/10 text-brand-red border border-brand-red/30 dark:bg-brand-red/15 dark:border-brand-red/40",
    amber:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30",
    muted:
      "bg-black/[0.04] dark:bg-white/[0.06] text-slate-600 dark:text-slate-400 border border-black/10 dark:border-white/10",
    outline:
      "bg-transparent text-slate-700 dark:text-slate-300 border border-black/15 dark:border-white/15",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-mono font-bold uppercase ${sizeClasses} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
