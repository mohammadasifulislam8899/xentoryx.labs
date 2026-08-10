"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { projectsData } from "@/data/projectsData";
import { Project } from "@/types";
import ProjectModal from "@/components/ui/ProjectModal";
import { ArrowRight, ExternalLink, Github, Sparkles, Layers, Cpu } from "lucide-react";

export default function FeaturedProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const featuredProjects = projectsData.filter((p) => p.featured);

  return (
    <section id="projects" className="py-24 bg-[#0F1115] relative overflow-hidden">
      {/* Background ambient red lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-red text-xs font-mono text-brand-red font-semibold uppercase tracking-wider">
              FEATURED ENGINEERING PROTOTYPES
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Flagship Software & <span className="text-gradient-red">Hardware Products</span>
            </h2>
            <p className="text-base text-brand-muted leading-relaxed">
              Explore high-performance native Android apps, embedded IoT ecosystems, and web platforms created by Asif and Xentoryx Labs.
            </p>
          </div>

          <Link
            href="/projects"
            className="group px-5 py-2.5 rounded-full glass-panel-red border border-brand-red/40 text-xs font-mono font-bold text-white hover:bg-brand-red hover:text-white transition-all flex items-center gap-2"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-brand-red/50 transition-all group flex flex-col justify-between"
            >
              {/* Top Banner & Category */}
              <div className="p-6 sm:p-8 space-y-4 flex-1">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-brand-red/20 text-brand-red border border-brand-red/40">
                    {project.category}
                  </span>
                  <span className="text-[11px] font-mono text-brand-muted">
                    {project.stats[0]?.label}: {project.stats[0]?.value}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white group-hover:text-brand-red transition-colors">
                  {project.title}
                </h3>
                <div className="text-xs font-mono text-brand-red font-semibold">
                  {project.subtitle}
                </div>

                <p className="text-xs text-brand-muted leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-surface border border-white/5 text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-2 py-1 rounded-md text-[10px] font-mono bg-surface text-brand-muted">
                      +{project.techStack.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="p-6 bg-[#111318] border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-mono font-bold text-white hover:text-brand-red flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-brand-red" />
                  <span>Architecture Details</span>
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg glass-panel text-brand-muted hover:text-white transition-colors"
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
                      className="p-2 rounded-lg bg-brand-red/20 text-brand-red border border-brand-red/40 hover:bg-brand-red hover:text-white transition-all"
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

      {/* Architecture Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
