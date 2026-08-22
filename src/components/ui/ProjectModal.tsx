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
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl bg-[#F9F8F6] dark:bg-[#0A0B0E] border border-black/10 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl text-slate-900 dark:text-white my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-black/10 dark:border-white/10 flex items-start justify-between bg-black/[0.02] dark:bg-white/[0.02]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-brand-red font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-brand-red/10 border border-brand-red/30">
                  {project.category}
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-widest">
                  BLUEPRINT ARCHIVE
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
                {project.title}
              </h2>
              <p className="text-xs text-brand-red font-mono font-bold">{project.subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1 font-sans">
            <div className="space-y-2">
              <div className="text-[10px] font-mono text-brand-red font-bold uppercase tracking-widest">
                01 // PROJECT OVERVIEW
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                {project.description}
              </p>
            </div>

            {/* Core Capabilities */}
            <div className="space-y-3 pt-2">
              <div className="text-[10px] font-mono text-brand-red font-bold uppercase tracking-widest">
                02 // SYSTEM CAPABILITIES & DELIVERABLES
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white dark:bg-[#12141A] border border-black/5 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 font-mono">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architectural Topology */}
            <div className="space-y-3 pt-2">
              <div className="text-[10px] font-mono text-brand-red font-bold uppercase tracking-widest">
                03 // ARCHITECTURAL TOPOLOGY
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {project.architecture.frontend && (
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#12141A] border border-black/5 dark:border-white/5 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white font-mono">
                      <Layers className="w-4 h-4 text-brand-red" />
                      <span>Frontend Layer</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{project.architecture.frontend}</p>
                  </div>
                )}

                {project.architecture.backend && (
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#12141A] border border-black/5 dark:border-white/5 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white font-mono">
                      <Server className="w-4 h-4 text-emerald-500" />
                      <span>Backend &amp; API</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{project.architecture.backend}</p>
                  </div>
                )}

                {project.architecture.hardware && (
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#12141A] border border-black/5 dark:border-white/5 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white font-mono">
                      <Cpu className="w-4 h-4 text-amber-500" />
                      <span>Hardware &amp; MCU</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{project.architecture.hardware}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tech Stack Badges */}
            <div className="space-y-2 pt-2">
              <div className="text-[10px] font-mono text-brand-red font-bold uppercase tracking-widest">
                04 // TECHNOLOGIES DEPLOYED
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-full text-xs font-mono bg-white dark:bg-[#12141A] border border-black/10 dark:border-white/10 text-slate-800 dark:text-slate-200 font-bold">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer CTAs */}
          <div className="p-6 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 bg-black/[0.02] dark:bg-white/[0.02]">
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 hover:border-brand-red text-slate-900 dark:text-white text-xs font-mono font-bold flex items-center gap-2 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-brand-red text-white text-xs font-mono font-bold flex items-center gap-2 hover:bg-[#FF5E50] shadow-glow-red transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live Build</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Close Blueprint [ESC]
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
