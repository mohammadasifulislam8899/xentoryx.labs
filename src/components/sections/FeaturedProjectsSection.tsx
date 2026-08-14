"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, Layers, Smartphone, Globe, Cpu, CheckCircle2 } from "lucide-react";
import { useCMS } from "@/hooks/useCMS";
import ProjectModal from "@/components/ui/ProjectModal";
import { Project } from "@/types";

import { projectsData } from "@/data/projectsData";

export default function FeaturedProjectsSection() {
  const { data } = useCMS();
  const projects = data?.projects || projectsData;
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 bg-slate-50 dark:bg-[#0A0C10] text-slate-900 dark:text-white relative border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-red text-xs font-mono text-brand-red font-semibold uppercase tracking-wider">
              FEATURED ENGINEERING BUILDS
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Production <span className="text-gradient-red">Showcase</span>
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              Hand-picked Android applications, IoT hardware telemetry planes, and fullstack web platforms engineered by Founder Asif.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-mono font-bold uppercase tracking-wider hover:bg-brand-red dark:hover:bg-brand-red dark:hover:text-white transition-all shadow-md"
          >
            <span>View Catalog ({projects.length})</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel rounded-3xl overflow-hidden space-y-6 hover:border-brand-red/40 transition-all group flex flex-col justify-between p-6 sm:p-8"
            >
              {/* Image Preview Container */}
              <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10">
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-brand-red text-white uppercase shadow-md">
                    {proj.category}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white group-hover:text-brand-red transition-colors">
                    {proj.title}
                  </h3>
                  <span className="text-xs font-mono text-brand-red font-bold">
                    {proj.subtitle}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-mono line-clamp-3">
                  {proj.description}
                </p>
              </div>

              {/* Tech Badges & Actions */}
              <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  {proj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-surface border border-slate-200 dark:border-white/10 text-slate-700 dark:text-cyan-400 font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="px-4 py-2 rounded-xl glass-panel text-xs font-mono text-slate-900 dark:text-white hover:text-brand-red font-bold transition-colors flex items-center gap-1.5"
                  >
                    <span>Inspect Blueprint</span>
                    <Layers className="w-3.5 h-3.5 text-brand-red" />
                  </button>

                  <div className="flex items-center gap-2">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl glass-panel text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
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
                        className="p-2 rounded-xl glass-panel text-brand-red hover:text-brand-red transition-colors"
                        title="Live Demo"
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
    </section>
  );
}
