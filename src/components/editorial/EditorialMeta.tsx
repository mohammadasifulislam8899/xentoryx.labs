import React from "react";

interface Props {
  label: string;
  value: React.ReactNode;
  className?: string;
}

export default function EditorialMeta({ label, value, className = "" }: Props) {
  return (
    <div className={`space-y-1 ${className}`}>
      <div className="text-[10px] font-mono font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
        {label}
      </div>
      <div className="text-xs sm:text-sm font-mono font-bold text-slate-900 dark:text-slate-200">
        {value}
      </div>
    </div>
  );
}
