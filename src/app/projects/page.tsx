"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { projectsData } from "@/data/projectsData";
import { Project } from "@/types";
import ProjectModal from "@/components/ui/ProjectModal";
import { ArrowLeft, ExternalLink, Github, Sparkles, Filter } from "lucide-react";

export default function ProjectsPage() {
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    categoryFilter === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === categoryFilter);

  const categories = ["All", "Android", "IoT", "Fullstack"];

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#0F1115] text-white relative">
      {/* Background ambient glow */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Header Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="px-4 py-2 rounded-full glass-panel text-xs font-mono text-brand-muted hover:text-white flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-brand-red" />
            <span>Back to Overview</span>
          </Link>
        </div>

        {/* Page Title */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-red text-xs font-mono text-brand-red font-semibold uppercase tracking-wider">
            PROJECT CATALOG & CASE STUDIES
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Engineering <span className="text-gradient-red">Showcase</span>
          </h1>
          <p className="text-base text-brand-muted leading-relaxed">
            Detailed breakdown of production software applications, native Android platforms, and embedded IoT hardware companion devices engineered by Asif.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-6">
          <Filter className="w-4 h-4 text-brand-red mr-2" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all ${
                categoryFilter === cat
                  ? "bg-brand-red text-white shadow-glow-red"
                  : "glass-panel text-brand-muted hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-brand-red/40 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-brand-red/20 text-brand-red border border-brand-red/40">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-brand-muted">
                    {project.stats[0]?.label}: {project.stats[0]?.value}
                  </span>
                </div>

                <h2 className="font-display text-3xl font-bold text-white group-hover:text-brand-red transition-colors">
                  {project.title}
                </h2>
                <div className="text-xs font-mono text-brand-red font-semibold">
                  {project.subtitle}
                </div>

                <p className="text-sm text-gray-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-surface border border-white/10 text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-mono font-bold text-white hover:text-brand-red flex items-center gap-2 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-brand-red" />
                  <span>Inspect Architecture</span>
                </button>

                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl glass-panel text-white hover:text-brand-red transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-brand-red text-white hover:shadow-glow-red transition-all"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
