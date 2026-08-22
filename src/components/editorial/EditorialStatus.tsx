import React from "react";

interface Props {
  text?: string;
  status?: "active" | "standby" | "alert";
  className?: string;
}

export default function EditorialStatus({
  text = "ACTIVE",
  status = "active",
  className = "",
}: Props) {
  const dotStyles = {
    active: "bg-emerald-500",
    standby: "bg-amber-500",
    alert: "bg-brand-red",
  };

  const textColors = {
    active: "text-emerald-600 dark:text-emerald-400",
    standby: "text-amber-600 dark:text-amber-400",
    alert: "text-brand-red",
  };

  return (
    <div className={`inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider ${className}`}>
      <span className="relative flex h-2 w-2">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotStyles[status]}`}
        />
        <span className={`relative inline-flex rounded-full h-2 w-2 ${dotStyles[status]}`} />
      </span>
      <span className={textColors[status]}>{text}</span>
    </div>
  );
}
