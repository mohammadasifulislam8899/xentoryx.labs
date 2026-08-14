"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CMSData, SiteSettings } from "@/lib/cms/store";
import { Project, LabExperiment, Milestone } from "@/types";
import {
  Lock,
  Unlock,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  Briefcase,
  FlaskConical,
  Cpu,
  Calendar,
  Mail,
  Bot,
  Settings,
  ArrowLeft,
  RefreshCw,
  Eye,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<"projects" | "labs" | "skills" | "timeline" | "inquiries" | "settings">("projects");

  const [cmsData, setCmsData] = useState<CMSData | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New Project Form Modal State
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // New Lab Form State
  const [editingLab, setEditingLab] = useState<Partial<LabExperiment> | null>(null);
  const [isLabModalOpen, setIsLabModalOpen] = useState(false);

  useEffect(() => {
    // Check if token exists in session
    const token = sessionStorage.getItem("xentoryx-admin-token");
    if (token) {
      setIsAuthenticated(true);
      fetchCMSData();
    }
  }, []);

  const fetchCMSData = async () => {
    try {
      const res = await fetch("/api/admin/data");
      const data = await res.json();
      setCmsData(data);
    } catch (err) {
      console.error("Failed to load CMS data:", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });

      const result = await res.json();

      if (result.success) {
        sessionStorage.setItem("xentoryx-admin-token", result.token);
        setIsAuthenticated(true);
        fetchCMSData();
      } else {
        setAuthError("Incorrect Admin PIN. (Default: 2026)");
      }
    } catch (err) {
      setAuthError("Authentication error occurred");
    }
  };

  const handleSaveAll = async (updatedData?: CMSData) => {
    const payload = updatedData || cmsData;
    if (!payload) return;

    setSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "updateAll",
          data: payload,
        }),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Failed to save CMS data:", err);
    } finally {
      setSaving(false);
    }
  };

  // Login Gate View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#0F1115] text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md glass-panel-red p-8 rounded-3xl border border-brand-red/40 bg-[#12141C]/95 space-y-6 shadow-2xl"
        >
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-brand-red/20 border border-brand-red/50 text-brand-red flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7 animate-pulse" />
            </div>
            <h1 className="font-display text-2xl font-bold text-white">
              Founder Admin CMS
            </h1>
            <p className="text-xs text-brand-muted font-mono">
              Xentoryx Labs Management Control Plane
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-mono text-brand-muted uppercase">Enter Security PIN</label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter PIN (Default: 2026)"
                className="w-full bg-surface px-4 py-3 rounded-xl text-sm text-white focus:outline-none focus:border-brand-red border border-white/10 text-center font-mono tracking-widest text-lg"
                autoFocus
              />
            </div>

            {authError && (
              <div className="text-xs text-brand-red font-mono text-center bg-brand-red/10 border border-brand-red/30 py-2 rounded-lg">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-red to-[#FF5E50] text-white font-bold text-xs uppercase font-mono shadow-glow-red hover:shadow-glow-red-lg transition-all"
            >
              Authenticate & Unlock Dashboard
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-brand-muted hover:text-white flex items-center justify-center gap-1 font-mono">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!cmsData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F1115] text-white font-mono text-xs">
        <RefreshCw className="w-6 h-6 text-brand-red animate-spin mr-2" />
        <span>Loading Xentoryx CMS Engine...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090C] text-white py-8">
      {/* Standalone Admin Navbar Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-3xl bg-[#0E1118] border border-white/10 shadow-2xl gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-red/20 border border-brand-red/50 text-brand-red flex items-center justify-center font-bold text-sm font-mono">
              XL
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-mono text-brand-red font-bold uppercase tracking-wider">
                  FOUNDER ADMIN PORTAL (ISOLATED)
                </span>
              </div>
              <h1 className="font-display text-2xl font-bold text-white mt-0.5">
                Xentoryx Labs Management Control Plane
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 rounded-xl glass-panel text-xs font-mono text-gray-300 hover:text-white flex items-center gap-2 transition-colors border-white/10"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>View Public Live Site</span>
            </Link>

            <button
              onClick={() => handleSaveAll()}
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-red to-[#FF5E50] text-white text-xs font-mono font-bold flex items-center gap-2 shadow-glow-red hover:shadow-glow-red-lg transition-all"
            >
              {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{saving ? "Saving Changes..." : "Save All Changes"}</span>
            </button>

            {saveSuccess && (
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Saved!
              </span>
            )}

            <button
              onClick={() => {
                sessionStorage.removeItem("xentoryx-admin-token");
                setIsAuthenticated(false);
              }}
              className="p-2.5 rounded-xl glass-panel text-brand-muted hover:text-white transition-colors"
              title="Lock Admin Session"
            >
              <Unlock className="w-4 h-4 text-brand-red" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4 mb-8">
          {[
            { id: "projects", label: "Projects", icon: Briefcase, count: cmsData.projects.length },
            { id: "labs", label: "Labs & Hardware", icon: FlaskConical, count: cmsData.labs.length },
            { id: "skills", label: "Skills Matrix", icon: Cpu, count: cmsData.skills.length },
            { id: "timeline", label: "Timeline", icon: Calendar, count: cmsData.timeline.length },
            { id: "inquiries", label: "Client Inquiries", icon: Mail, count: cmsData.inquiries.length },
            { id: "settings", label: "Site & AI Config", icon: Settings },
          ].map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                  isActive
                    ? "bg-brand-red text-white shadow-glow-red"
                    : "glass-panel text-brand-muted hover:text-white"
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-white/20 text-white">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: PROJECTS MANAGER */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-display text-white">Manage Projects ({cmsData.projects.length})</h2>
              <button
                onClick={() => {
                  setEditingProject({
                    id: `proj-${Date.now()}`,
                    title: "New Product",
                    subtitle: "Product Subtitle",
                    category: "Android",
                    featured: true,
                    description: "Product description...",
                    techStack: ["Kotlin", "Next.js"],
                    features: ["Feature 1"],
                    architecture: { frontend: "Native Android" },
                    stats: [{ label: "Status", value: "Active" }],
                  });
                  setIsProjectModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-surface border border-brand-red/40 hover:bg-brand-red/20 text-xs font-mono text-white flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-brand-red" />
                <span>Add New Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cmsData.projects.map((proj, idx) => (
                <div key={proj.id} className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded text-[10px] font-mono bg-brand-red/20 text-brand-red border border-brand-red/40 font-bold">
                      {proj.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const updated = { ...cmsData };
                          updated.projects[idx].featured = !updated.projects[idx].featured;
                          setCmsData(updated);
                        }}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                          proj.featured ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" : "bg-surface text-brand-muted"
                        }`}
                      >
                        {proj.featured ? "★ Featured" : "Standard"}
                      </button>
                      <button
                        onClick={() => {
                          const updated = { ...cmsData };
                          updated.projects.splice(idx, 1);
                          setCmsData(updated);
                        }}
                        className="p-1.5 rounded-lg text-brand-muted hover:text-brand-red transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display text-lg font-bold text-white">{proj.title}</h3>
                    <p className="text-xs text-brand-muted">{proj.subtitle}</p>
                  </div>

                  <p className="text-xs text-gray-300 line-clamp-2">{proj.description}</p>

                  <div className="flex flex-wrap gap-1">
                    {proj.techStack.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: INQUIRIES INBOX */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-display text-white">Client Project Inquiries ({cmsData.inquiries.length})</h2>
            {cmsData.inquiries.length === 0 ? (
              <div className="text-center py-12 glass-panel rounded-2xl text-xs text-brand-muted font-mono">
                No incoming project inquiries yet.
              </div>
            ) : (
              <div className="space-y-4">
                {cmsData.inquiries.map((inq, idx) => (
                  <div key={inq.id} className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-red/20 text-brand-red flex items-center justify-center font-bold text-xs font-mono">
                          {inq.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-white">{inq.name}</div>
                          <a href={`mailto:${inq.email}`} className="text-xs text-brand-red hover:underline font-mono">
                            {inq.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs font-mono">
                        <span className="px-2.5 py-1 rounded bg-surface border border-white/10 text-cyan-400">
                          {inq.projectType}
                        </span>
                        <span className="px-2.5 py-1 rounded bg-brand-red/20 text-brand-red">
                          {inq.budget}
                        </span>
                        <button
                          onClick={() => {
                            const updated = { ...cmsData };
                            updated.inquiries.splice(idx, 1);
                            setCmsData(updated);
                          }}
                          className="p-1.5 rounded-lg text-brand-muted hover:text-brand-red"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-gray-300 bg-surface/60 p-3 rounded-xl leading-relaxed">
                      "{inq.message}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 6: SETTINGS & AI CONFIG */}
        {activeTab === "settings" && (
          <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6 max-w-3xl">
            <h2 className="text-xl font-bold font-display text-white">Global Site & AI Settings</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-brand-muted uppercase">Founder Name</label>
                  <input
                    type="text"
                    value={cmsData.settings.founderName}
                    onChange={(e) => {
                      setCmsData({
                        ...cmsData,
                        settings: { ...cmsData.settings, founderName: e.target.value },
                      });
                    }}
                    className="w-full bg-surface px-4 py-2.5 rounded-xl text-xs text-white border border-white/10 focus:border-brand-red focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-brand-muted uppercase">Company Name</label>
                  <input
                    type="text"
                    value={cmsData.settings.companyName}
                    onChange={(e) => {
                      setCmsData({
                        ...cmsData,
                        settings: { ...cmsData.settings, companyName: e.target.value },
                      });
                    }}
                    className="w-full bg-surface px-4 py-2.5 rounded-xl text-xs text-white border border-white/10 focus:border-brand-red focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-brand-muted uppercase">Company Tagline</label>
                <input
                  type="text"
                  value={cmsData.settings.tagline}
                  onChange={(e) => {
                    setCmsData({
                      ...cmsData,
                      settings: { ...cmsData.settings, tagline: e.target.value },
                    });
                  }}
                  className="w-full bg-surface px-4 py-2.5 rounded-xl text-xs text-white border border-white/10 focus:border-brand-red focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-brand-muted uppercase">Ask Asif AI Persona Prompt</label>
                <textarea
                  rows={4}
                  value={cmsData.settings.aiPrompt}
                  onChange={(e) => {
                    setCmsData({
                      ...cmsData,
                      settings: { ...cmsData.settings, aiPrompt: e.target.value },
                    });
                  }}
                  className="w-full bg-surface px-4 py-2.5 rounded-xl text-xs text-white border border-white/10 focus:border-brand-red focus:outline-none font-mono"
                />
              </div>
            </div>

            <button
              onClick={() => handleSaveAll()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-red to-[#FF5E50] text-white font-bold text-xs uppercase font-mono shadow-glow-red"
            >
              Save Configuration
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
