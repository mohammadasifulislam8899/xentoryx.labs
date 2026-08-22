import React from "react";

interface Props {
  label?: string;
  className?: string;
}

export default function EditorialDivider({ label, className = "" }: Props) {
  if (label) {
    return (
      <div className={`relative flex items-center justify-between py-6 ${className}`}>
        <div className="flex-1 border-t border-black/10 dark:border-white/10" />
        <span className="px-4 text-[10px] font-mono font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
          {label}
        </span>
        <div className="flex-1 border-t border-black/10 dark:border-white/10" />
      </div>
    );
  }

  return (
    <hr className={`border-0 border-t border-black/10 dark:border-white/10 my-8 transition-colors duration-300 ${className}`} />
  );
}
