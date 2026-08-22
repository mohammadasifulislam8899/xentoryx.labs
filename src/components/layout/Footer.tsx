"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Github, Linkedin, Mail, Globe, Twitter, Facebook, Youtube, Send } from "lucide-react";
import CornerDecorations from "./CornerDecorations";
import { useCMS } from "@/hooks/useCMS";

export default function Footer() {
  const { founderName, companyName, tagline, socialLinks } = useCMS();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "github":
        return Github;
      case "linkedin":
        return Linkedin;
      case "twitter":
      case "x":
        return Twitter;
      case "mail":
      case "email":
        return Mail;
      case "facebook":
        return Facebook;
      case "youtube":
        return Youtube;
      case "telegram":
      case "send":
        return Send;
      default:
        return Globe;
    }
  };

  const activeLinks = socialLinks?.filter((l) => l.active) || [];

  return (
    <footer className="relative bg-[#0A0A0A] text-[#F5F1E8] border-t border-[#F5F1E8]/10 py-16 transition-colors duration-400 overflow-hidden">
      <CornerDecorations />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pb-12 border-b border-[#F5F1E8]/10">
          <div className="space-y-4 max-w-md">
            <div className="relative h-8 w-36">
              <Image
                src="/assets/logo-dark.png"
                alt="Xentoryx Labs Logo Dark"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-xs font-mono opacity-70 leading-relaxed">
              {tagline || "Building Scalable Software, IoT Systems and Intelligent Technologies"}
            </p>
          </div>

          {/* Social Channels in Pill Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {activeLinks.map((link) => {
              const IconComp = getSocialIcon(link.icon || link.name);
              return (
                <a
                  key={link.id || link.name}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full border border-[#F5F1E8]/20 hover:border-[#D9A648] hover:bg-[#D9A648] hover:text-[#0A0A0A] text-[#F5F1E8] transition-all flex items-center gap-2 text-xs font-mono font-bold bg-[#141414]"
                  title={link.name}
                >
                  <IconComp className="w-3.5 h-3.5 text-[#D9A648]" />
                  <span>{link.name}</span>
                </a>
              );
            })}

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full border border-[#F5F1E8]/20 hover:border-[#D9A648] hover:bg-[#D9A648] text-[#D9A648] hover:text-[#0A0A0A] transition-colors bg-[#141414]"
              title="Back to Top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono opacity-60 gap-4">
          <div>
            &copy; {new Date().getFullYear()} {companyName || "Xentoryx Labs"}. Architected by {founderName || "Asif"}.
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D9A648] animate-ping" />
            <span>Telemetry Online // 99.98% System Uptime</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
