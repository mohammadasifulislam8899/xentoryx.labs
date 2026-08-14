"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, FlaskConical, Terminal, MessageSquare } from "lucide-react";

export default function MobileBottomNav({
  onOpenAi,
}: {
  onOpenAi?: () => void;
}) {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Projects", href: "/projects", icon: Briefcase },
    { label: "Labs", href: "/labs", icon: FlaskConical },
    { label: "Console", href: "/labs/console", icon: Terminal },
    { label: "Contact", href: "/#contact", icon: MessageSquare },
  ];

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 max-w-lg mx-auto">
      <nav className="glass-panel p-2 rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl backdrop-blur-2xl bg-white/90 dark:bg-[#0A0C10]/90 flex items-center justify-around">
        {navItems.map((item) => {
          const IconComp = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href) && item.href !== "/#contact";

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl text-[10px] font-mono font-bold transition-all relative ${
                isActive
                  ? "text-brand-red dark:text-brand-red bg-brand-red/10 border border-brand-red/20 scale-105"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <IconComp className={`w-4 h-4 ${isActive ? "animate-pulse" : ""}`} />
              <span>{item.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red absolute -top-1 shadow-glow-red" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
