"use client";

import Link from "next/link";
import { ArrowUp, Github, Linkedin, Twitter, Mail } from "lucide-react";
import CornerDecorations from "./CornerDecorations";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { label: "gh", href: "https://github.com/mohammadasifulislam8899", icon: Github, title: "GitHub" },
    { label: "li", href: "https://linkedin.com/in/mohammadasifulislam", icon: Linkedin, title: "LinkedIn" },
    { label: "x", href: "https://twitter.com", icon: Twitter, title: "Twitter / X" },
    { label: "mail", href: "mailto:contact@xentoryxlabs.site", icon: Mail, title: "Email" },
  ];

  return (
    <footer className="relative bg-[var(--bg-primary)] text-[var(--text-primary)] border-t border-[var(--border-color)] overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-20 relative">
        <CornerDecorations />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 items-start">
          
          {/* Col 1: Studio Monograph */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-display font-black text-2xl sm:text-3xl tracking-tight text-[var(--text-primary)]">
                XENTORYX LABS
              </span>
            </Link>
            <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] leading-relaxed max-w-sm">
              Engineering studio dedicated to autonomous IoT hardware devices, real-time firmware, and scalable microservices.
            </p>
            <div className="flex items-center gap-2 pt-2">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[10px] font-mono font-bold lowercase text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all cursor-pointer"
                  title={item.title}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6 text-xs font-mono uppercase tracking-wider">
            <div className="space-y-2.5">
              <span className="text-[10px] text-[var(--text-muted)] block">Exhibitions</span>
              <div><Link href="/" className="hover:text-amber-400 transition-colors">Hero Node</Link></div>
              <div><Link href="/projects" className="hover:text-amber-400 transition-colors">Portfolio</Link></div>
              <div><Link href="/labs" className="hover:text-amber-400 transition-colors">Hardware Labs</Link></div>
            </div>

            <div className="space-y-2.5">
              <span className="text-[10px] text-[var(--text-muted)] block">Studio</span>
              <div><Link href="/founder" className="hover:text-amber-400 transition-colors">Founder Monograph</Link></div>
              <div><Link href="/admin" className="hover:text-amber-400 transition-colors">Control Room</Link></div>
              <div><a href="#contact" className="hover:text-amber-400 transition-colors">Inquiries</a></div>
            </div>
          </div>

          {/* Col 3: Back to top & Node Status */}
          <div className="md:col-span-3 flex flex-col md:items-end justify-between h-full space-y-6">
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all cursor-pointer self-start md:self-end"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>

            <div className="space-y-1 text-left md:text-right">
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">
                [ STUDIO NODE // 2026 ]
              </span>
              <span className="text-[11px] font-mono text-[var(--text-secondary)]">
                Dhaka &bull; Madrid &bull; Manchester
              </span>
            </div>
          </div>

        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[var(--text-muted)]">
          <div>&copy; {new Date().getFullYear()} Xentoryx Labs. All rights reserved.</div>
          <div>Mohammad Asiful Islam &bull; Architecture &amp; Firmware</div>
        </div>
      </div>
    </footer>
  );
}
