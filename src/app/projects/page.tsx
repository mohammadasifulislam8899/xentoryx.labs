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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090C] text-slate-900 dark:text-white pt-28 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-brand-red transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home Overview</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-white/10 pb-8">
            <div className="space-y-2">
              <span className="text-xs font-mono text-brand-red font-bold uppercase tracking-wider">
                ENGINEERING PORTFOLIO
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                All Projects & <span className="text-gradient-red">Applications</span>
              </h1>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects or tech..."
                className="w-full bg-white dark:bg-surface px-4 py-2.5 pl-10 rounded-xl text-xs text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none font-mono"
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
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all ${
                activeCategory === cat
                  ? "bg-brand-red text-white shadow-glow-red"
                  : "glass-panel text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="glass-panel rounded-3xl overflow-hidden space-y-5 hover:border-brand-red/40 transition-all flex flex-col justify-between p-6"
            >
              <div className="space-y-4">
                <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-brand-red text-white uppercase shadow">
                    {proj.category}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                    {proj.title}
                  </h3>
                  <p className="text-xs font-mono text-brand-red font-bold">
                    {proj.subtitle}
                  </p>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-mono line-clamp-3">
                  {proj.description}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-white/10">
                <div className="flex flex-wrap gap-1">
                  {proj.techStack.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[9px] font-mono bg-slate-100 dark:bg-surface border border-slate-200 dark:border-white/10 text-slate-700 dark:text-cyan-400 font-bold"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="px-3.5 py-1.5 rounded-xl glass-panel text-xs font-mono text-slate-900 dark:text-white hover:text-brand-red font-bold transition-colors flex items-center gap-1.5"
                  >
                    <span>Blueprint</span>
                    <Layers className="w-3.5 h-3.5 text-brand-red" />
                  </button>

                  <div className="flex items-center gap-2">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl glass-panel text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl glass-panel text-brand-red hover:text-brand-red"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
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
