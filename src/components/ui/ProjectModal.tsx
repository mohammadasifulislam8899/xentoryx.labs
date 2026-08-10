"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types";
import { X, ExternalLink, Github, Layers, Cpu, Server, CheckCircle2 } from "lucide-react";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-4xl glass-panel-red rounded-3xl overflow-hidden shadow-2xl border border-brand-red/30 bg-[#0E1016]/95 text-white my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 bg-[#13161F] border-b border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-brand-red font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-red/20 border border-brand-red/40">
                {project.category}
              </span>
              <h2 className="font-display text-2xl font-bold text-white mt-1">
                {project.title}
              </h2>
              <p className="text-xs text-brand-muted font-mono">{project.subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full glass-panel text-brand-muted hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
            <p className="text-sm text-gray-300 leading-relaxed">
              {project.description}
            </p>

            {/* Key Features */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase text-brand-red font-semibold tracking-wider">
                Core System Capabilities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-surface/80 border border-white/5 text-xs text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Details */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-mono uppercase text-brand-red font-semibold tracking-wider">
                Technical Architecture Blueprint
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {project.architecture.frontend && (
                  <div className="p-3.5 rounded-xl bg-surface border border-white/10 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      <Layers className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Frontend Layer</span>
                    </div>
                    <p className="text-[11px] text-brand-muted">{project.architecture.frontend}</p>
                  </div>
                )}

                {project.architecture.backend && (
                  <div className="p-3.5 rounded-xl bg-surface border border-white/10 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      <Server className="w-3.5 h-3.5 text-green-400" />
                      <span>Backend & API</span>
                    </div>
                    <p className="text-[11px] text-brand-muted">{project.architecture.backend}</p>
                  </div>
                )}

                {project.architecture.hardware && (
                  <div className="p-3.5 rounded-xl bg-surface border border-white/10 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      <Cpu className="w-3.5 h-3.5 text-brand-red" />
                      <span>Hardware & MCU</span>
                    </div>
                    <p className="text-[11px] text-brand-muted">{project.architecture.hardware}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tech Stack Badges */}
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-mono uppercase text-brand-red font-semibold tracking-wider">
                Technology Badges
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-lg text-xs font-mono bg-surface border border-white/10 text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer CTAs */}
          <div className="p-6 bg-[#111319] border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl glass-panel text-white hover:text-brand-red text-xs font-mono font-semibold flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repo</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-red to-[#FF5E50] text-white text-xs font-mono font-semibold flex items-center gap-2 shadow-glow-red"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Production Demo</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl glass-panel text-brand-muted hover:text-white text-xs font-mono"
            >
              Close Window
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
