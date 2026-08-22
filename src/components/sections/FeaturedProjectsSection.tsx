"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, Layers } from "lucide-react";
import { useCMS } from "@/hooks/useCMS";
import ProjectModal from "@/components/ui/ProjectModal";
import { Project } from "@/types";
import { projectsData } from "@/data/projectsData";
import SectionTickerDivider from "@/components/layout/SectionTickerDivider";

export default function FeaturedProjectsSection() {
  const { data } = useCMS();
  const projects = data?.projects || projectsData;
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Alternating card themes (Mustard, Black, White)
  const cardThemes = [
    { bg: "bg-[#FFFFFF] dark:bg-[#141414]", text: "text-[#0A0A0A] dark:text-[#F5F1E8]", border: "border-[#0A0A0A]/10 dark:border-[#F5F1E8]/10" },
    { bg: "bg-[#D9A648]", text: "text-[#0A0A0A]", border: "border-transparent" },
    { bg: "bg-[#0A0A0A]", text: "text-[#F5F1E8]", border: "border-[#F5F1E8]/15" },
    { bg: "bg-[#FFFFFF] dark:bg-[#141414]", text: "text-[#0A0A0A] dark:text-[#F5F1E8]", border: "border-[#0A0A0A]/10 dark:border-[#F5F1E8]/10" },
  ];

  return (
    <section id="projects" className="relative bg-[#F5F1E8] dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-[#F5F1E8] transition-colors duration-400">
      {/* Ticker Divider */}
      <SectionTickerDivider word="portfolio" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="font-mono text-xs text-[#D9A648] font-bold uppercase tracking-widest">
              [ 003 // SELECTED WORKS ARCHIVE ]
            </div>
            <h2 className="font-display font-black text-5xl sm:text-7xl tracking-tighter lowercase leading-tight">
              portfolio
            </h2>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A0A0A] text-[#F5F1E8] dark:bg-[#F5F1E8] dark:text-[#0A0A0A] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#D9A648] hover:text-[#0A0A0A] dark:hover:bg-[#D9A648] dark:hover:text-[#0A0A0A] transition-all shadow-sm"
          >
            <span>All Projects ({projects.length})</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Alternating Rounded Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((proj, idx) => {
            const theme = cardThemes[idx % cardThemes.length];
            const isMustard = theme.bg.includes("#D9A648");
            const isBlack = theme.bg.includes("#0A0A0A");

            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-6 sm:p-8 rounded-[32px] ${theme.bg} ${theme.text} ${theme.border} border shadow-card flex flex-col justify-between space-y-6 group`}
              >
                <div className="space-y-4">
                  {/* Media Preview */}
                  <div
                    onClick={() => setSelectedProject(proj)}
                    className="relative w-full h-56 sm:h-64 rounded-[24px] overflow-hidden cursor-pointer bg-black/5"
                  >
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      className="object-cover filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#0A0A0A] text-[#F5F1E8] uppercase tracking-widest shadow-sm">
                        {proj.category}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 pt-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-black text-2xl sm:text-3xl tracking-tight">
                        {proj.title}
                      </h3>
                      <span className={`text-xs font-mono font-bold ${isMustard ? "text-[#0A0A0A]" : "text-[#D9A648]"}`}>
                        {proj.subtitle}
                      </span>
                    </div>

                    <p className={`text-xs leading-relaxed font-sans line-clamp-3 ${isMustard ? "text-[#0A0A0A]/85" : "opacity-80"}`}>
                      {proj.description}
                    </p>
                  </div>
                </div>

                {/* Tech Tags & Action Row */}
                <div className="space-y-4 pt-4 border-t border-black/10 dark:border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold ${
                          isMustard
                            ? "bg-[#0A0A0A]/10 text-[#0A0A0A]"
                            : "bg-black/5 dark:bg-white/10 opacity-90"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                        isMustard
                          ? "bg-[#0A0A0A] text-[#F5F1E8] hover:bg-white hover:text-[#0A0A0A]"
                          : isBlack
                          ? "bg-[#D9A648] text-[#0A0A0A] hover:bg-white"
                          : "bg-[#0A0A0A] text-[#F5F1E8] dark:bg-[#F5F1E8] dark:text-[#0A0A0A] hover:bg-[#D9A648] hover:text-[#0A0A0A]"
                      }`}
                    >
                      <span>Blueprint</span>
                      <Layers className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2.5 rounded-full border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                          title="GitHub Repository"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2.5 rounded-full bg-[#D9A648] text-[#0A0A0A] hover:bg-white transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
}
