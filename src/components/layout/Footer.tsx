"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Github, Linkedin, Mail, ShieldCheck } from "lucide-react";
import { useCMS } from "@/hooks/useCMS";

export default function Footer() {
  const { email, founderName, companyName, tagline, settings } = useCMS();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#0B0D11] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Background Red Glow Circle Ambient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/logo-dark.png"
                alt="Xentoryx Labs"
                width={36}
                height={36}
                className="w-9 h-9 object-contain"
              />
              <div>
                <span className="font-display text-xl font-bold tracking-tight text-white">
                  {companyName.split(" ")[0]}
                </span>
                <span className="ml-1 text-xs uppercase tracking-widest font-mono text-brand-red font-semibold">
                  {companyName.split(" ").slice(1).join(" ") || "LABS"}
                </span>
              </div>
            </div>
            <p className="text-sm text-brand-muted max-w-sm leading-relaxed">
              {tagline}. Founded by {founderName}.
            </p>

            {/* System Uptime Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>All Systems Operational // {settings?.uptimeMetric || "99.98%"} Uptime</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-brand-red font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-brand-muted">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Overview (Home)
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Featured Projects Catalog
                </Link>
              </li>
              <li>
                <Link href="/labs" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Xentoryx Labs Hub</span>
                  <span className="text-[9px] font-mono px-1 py-0.2 bg-brand-red/20 text-brand-red rounded">
                    R&D
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Services & Solutions
                </Link>
              </li>
              <li>
                <Link href="/#company" className="hover:text-white transition-colors">
                  Company Vision
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Socials */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-brand-red font-semibold">
              Connect & Reach Out
            </h4>
            <p className="text-xs text-brand-muted">
              Interested in collaborating or discussing IoT hardware & software architectures? Let's connect.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={settings?.githubUrl || "https://github.com/Xentoryx"}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl glass-panel text-white hover:text-brand-red hover:border-brand-red/40 transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={settings?.linkedinUrl || "https://linkedin.com"}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl glass-panel text-white hover:text-brand-red hover:border-brand-red/40 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${email}`}
                className="p-2.5 rounded-xl glass-panel text-white hover:text-brand-red hover:border-brand-red/40 transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
          <div>
            © {new Date().getFullYear()} {companyName}. All rights reserved. Architected by{" "}
            <span className="text-white font-semibold">{founderName}</span>.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel hover:border-brand-red/40 hover:text-white transition-all group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-brand-red group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
