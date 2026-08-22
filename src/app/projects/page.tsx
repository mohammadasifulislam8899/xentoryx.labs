"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Layers, Search } from "lucide-react";
import { useCMS } from "@/hooks/useCMS";
import ProjectModal from "@/components/ui/ProjectModal";
import { Project } from "@/types";
import { projectsData } from "@/data/projectsData";
import SectionTickerDivider from "@/components/layout/SectionTickerDivider";

export default function ProjectsPage() {
  const { data } = useCMS();
  const projects = data?.projects || projectsData;
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ["All", "Android", "Web", "Backend", "IoT"];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const cardThemes = [
    { bg: "bg-[#FFFFFF] dark:bg-[#141414]", text: "text-[#0A0A0A] dark:text-[#F5F1E8]", border: "border-[#0A0A0A]/10 dark:border-[#F5F1E8]/10" },
    { bg: "bg-[#D9A648]", text: "text-[#0A0A0A]", border: "border-transparent" },
    { bg: "bg-[#0A0A0A]", text: "text-[#F5F1E8]", border: "border-[#F5F1E8]/15" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F1E8] dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-[#F5F1E8] pt-28 pb-24 transition-colors duration-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Navigation & Header */}
        <div className="space-y-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono opacity-70 hover:opacity-100 hover:text-[#D9A648] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Studio Overview</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#0A0A0A]/10 dark:border-[#F5F1E8]/10 pb-10">
            <div className="space-y-3">
              <div className="font-mono text-xs text-[#D9A648] font-bold uppercase tracking-widest">
                [ 001 // FULL ENGINEERING REPOSITORY ]
              </div>
              <h1 className="font-display font-black text-5xl sm:text-7xl tracking-tighter lowercase leading-tight">
                portfolio archive
              </h1>
              <p className="text-sm font-sans opacity-80 max-w-xl">
                Comprehensive repository of native Android applications, embedded IoT telemetry firmware, and production web platforms.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 opacity-40 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search archive or tech..."
                className="w-full bg-white dark:bg-[#141414] px-4 py-3 pl-11 rounded-full text-xs text-[#0A0A0A] dark:text-[#F5F1E8] border border-[#0A0A0A]/10 dark:border-[#F5F1E8]/10 focus:border-[#D9A648] focus:outline-none font-mono shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold transition-all ${
                activeCategory === cat
                  ? "bg-[#D9A648] text-[#0A0A0A] shadow-mustard"
                  : "border border-[#0A0A0A]/10 dark:border-[#F5F1E8]/10 bg-white dark:bg-[#141414] text-[#0A0A0A] dark:text-[#F5F1E8] hover:border-[#D9A648]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj, idx) => {
            const theme = cardThemes[idx % cardThemes.length];
            const isMustard = theme.bg.includes("#D9A648");
            const isBlack = theme.bg.includes("#0A0A0A");

            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`p-6 sm:p-8 rounded-[32px] ${theme.bg} ${theme.text} ${theme.border} border shadow-card flex flex-col justify-between space-y-6 group`}
              >
                <div className="space-y-4">
                  <div
                    onClick={() => setSelectedProject(proj)}
                    className="relative w-full h-52 rounded-[24px] overflow-hidden cursor-pointer bg-black/5"
                  >
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      className="object-cover filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#0A0A0A] text-[#F5F1E8] uppercase tracking-wider shadow-sm">
                      {proj.category}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-display font-black text-2xl tracking-tight">
                      {proj.title}
                    </h3>
                    <p className={`text-xs font-mono font-bold ${isMustard ? "text-[#0A0A0A]" : "text-[#D9A648]"}`}>
                      {proj.subtitle}
                    </p>
                  </div>

                  <p className={`text-xs leading-relaxed font-sans line-clamp-3 ${isMustard ? "text-[#0A0A0A]/85" : "opacity-80"}`}>
                    {proj.description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-black/10 dark:border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.techStack.map((t) => (
                      <span
                        key={t}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          isMustard ? "bg-[#0A0A0A]/10 text-[#0A0A0A]" : "bg-black/5 dark:bg-white/10 opacity-90"
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
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
                          className="p-2 rounded-full border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
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
                          className="p-2 rounded-full bg-[#D9A648] text-[#0A0A0A] hover:bg-white transition-colors"
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
    </div>
  );
}
