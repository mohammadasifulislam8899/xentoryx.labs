"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Github, Linkedin, Mail, Heart } from "lucide-react";
import { useCMS } from "@/hooks/useCMS";

export default function Footer() {
  const { founderName, companyName, tagline, email, githubUrl, linkedinUrl } = useCMS();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-100 dark:bg-[#07090C] text-slate-900 dark:text-white border-t border-slate-200 dark:border-white/10 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-white/10">
          <div className="space-y-2 text-center md:text-left">
            <div className="relative h-10 w-48 mx-auto md:mx-0">
              <Image
                src="/assets/logo-dark.png"
                alt="Xentoryx Labs Logo Dark"
                fill
                className="object-contain hidden dark:block"
              />
              <Image
                src="/assets/logo-light.png"
                alt="Xentoryx Labs Logo Light"
                fill
                className="object-contain block dark:hidden"
              />
            </div>
            <p className="text-xs font-mono text-slate-600 dark:text-slate-400 max-w-md">
              {tagline || "Building Scalable Software, IoT Systems and Intelligent Technologies"}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl glass-panel text-slate-700 dark:text-slate-300 hover:text-brand-red transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl glass-panel text-slate-700 dark:text-slate-300 hover:text-brand-red transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${email}`}
              className="p-2.5 rounded-xl glass-panel text-slate-700 dark:text-slate-300 hover:text-brand-red transition-colors"
              title="Direct Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl glass-panel text-brand-red hover:text-white hover:bg-brand-red transition-all"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} {companyName || "Xentoryx Labs"}. Architected by {founderName || "Asif"}.
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>All Systems Operational // 99.98% Uptime</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
