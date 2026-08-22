import React from "react";

interface Props {
  number?: string;
  title: string;
  category?: string;
  year?: string;
  meta?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function EditorialRow({
  number,
  title,
  category,
  year,
  meta,
  children,
  onClick,
  className = "",
}: Props) {
  return (
    <div
      onClick={onClick}
      className={`group relative border-b border-black/10 dark:border-white/10 py-6 sm:py-8 transition-colors duration-300 ${
        onClick ? "cursor-pointer hover:bg-black/[0.015] dark:hover:bg-white/[0.02]" : ""
      } ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-4 sm:gap-6">
          {number && (
            <span className="font-mono text-xs sm:text-sm font-bold text-brand-red select-none">
              {number}
            </span>
          )}
          <div className="space-y-1">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#ECECEE] group-hover:text-brand-red transition-colors">
              {title}
            </h3>
            {category && (
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {category}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-6 sm:gap-8 font-mono text-xs text-slate-500 dark:text-slate-400">
          {meta}
          {year && <span className="font-bold text-slate-900 dark:text-white">{year}</span>}
        </div>
      </div>

      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
