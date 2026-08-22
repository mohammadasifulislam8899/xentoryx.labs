import React from "react";

interface Props {
  number: string;
  title?: string;
  className?: string;
}

export default function EditorialSectionNumber({ number, title, className = "" }: Props) {
  return (
    <div className={`flex items-baseline gap-3 select-none ${className}`}>
      <span className="font-mono text-xs font-black tracking-widest text-brand-red">
        /{number}
      </span>
      {title && (
        <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
          {title}
        </span>
      )}
    </div>
  );
}
