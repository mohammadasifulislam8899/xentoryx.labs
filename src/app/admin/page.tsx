"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CMSData, SiteSettings, PhilosophyPillar, ServiceData } from "@/lib/cms/store";
import { Project, LabExperiment, Milestone, SkillCategory } from "@/types";
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
  Layers,
  Sparkles,
  Zap,
  Target,
  Compass,
  X,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<
    "projects" | "labs" | "skills" | "timeline" | "services" | "heroCompany" | "inquiries" | "settings"
  >("projects");

  const [cmsData, setCmsData] = useState<CMSData | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Edit Modals State
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const [editingLab, setEditingLab] = useState<Partial<LabExperiment> | null>(null);
  const [isLabModalOpen, setIsLabModalOpen] = useState(false);

  const [editingMilestone, setEditingMilestone] = useState<Partial<Milestone> | null>(null);
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);

  useEffect(() => {
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
        body: JSON.stringify({ password }),
      });

      const result = await res.json();

      if (result.success) {
        sessionStorage.setItem("xentoryx-admin-token", result.token);
        setIsAuthenticated(true);
        fetchCMSData();
      } else {
        setAuthError("Incorrect Admin Password.");
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
        cache: "no-store",
        body: JSON.stringify({
          type: "updateAll",
          data: payload,
        }),
      });

      const resData = await res.json();
      if (res.ok && resData.data) {
        setCmsData(resData.data);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Failed to save CMS data:", err);
    } finally {
      setSaving(false);
    }
  };

  // Login View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#07090C] text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md glass-panel-red p-8 rounded-3xl border border-brand-red/40 bg-[#0E1118]/95 space-y-6 shadow-2xl"
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
              <label className="text-xs font-mono text-brand-muted uppercase">Enter Founder Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Admin Password"
                className="w-full bg-surface px-4 py-3 rounded-xl text-sm text-white focus:outline-none focus:border-brand-red border border-white/10 text-center font-mono text-base"
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
      <div className="min-h-screen flex items-center justify-center bg-[#07090C] text-white font-mono text-xs">
        <RefreshCw className="w-6 h-6 text-brand-red animate-spin mr-2" />
        <span>Loading Xentoryx Complete CMS Engine...</span>
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
                  FOUNDER ADMIN PORTAL (FULL CONTROL)
                </span>
              </div>
              <h1 className="font-display text-2xl font-bold text-white mt-0.5">
                Xentoryx Labs Complete Control Center
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
        {/* Dashboard Nav Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4 mb-8">
          {[
            { id: "projects", label: "Projects", icon: Briefcase, count: cmsData.projects.length },
            { id: "labs", label: "Labs R&D", icon: FlaskConical, count: cmsData.labs.length },
            { id: "skills", label: "Skills Matrix", icon: Cpu, count: cmsData.skills.length },
            { id: "timeline", label: "Timeline", icon: Calendar, count: cmsData.timeline.length },
            { id: "services", label: "Services", icon: Zap, count: cmsData.settings.services.length },
            { id: "heroCompany", label: "Hero & Company", icon: Target },
            { id: "inquiries", label: "Inquiries Inbox", icon: Mail, count: cmsData.inquiries.length },
            { id: "settings", label: "Gemini AI & Config", icon: Settings },
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
                  const newP: Project = {
                    id: `proj-${Date.now()}`,
                    title: "New Project",
                    subtitle: "Subtitle",
                    tagline: "Tagline",
                    description: "Description...",
                    category: "Android",
                    featured: true,
                    image: "/assets/projects/dipannita.jpg",
                    techStack: ["Kotlin", "Jetpack Compose"],
                    features: ["Feature 1"],
                    architecture: { frontend: "Native Android" },
                    githubUrl: "https://github.com/Xentoryx",
                    liveUrl: "https://xentoryx.com",
                    stats: [{ label: "Status", value: "Active" }],
                  };
                  const updated = { ...cmsData, projects: [newP, ...cmsData.projects] };
                  setCmsData(updated);
                  handleSaveAll(updated);
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
                          handleSaveAll(updated);
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
                          handleSaveAll(updated);
                        }}
                        className="p-1.5 rounded-lg text-brand-muted hover:text-brand-red transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-brand-muted uppercase">Project Title</label>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => {
                        const updated = { ...cmsData };
                        updated.projects[idx].title = e.target.value;
                        setCmsData(updated);
                      }}
                      className="w-full bg-surface px-3 py-1.5 rounded-lg text-sm text-white font-bold border border-white/10 focus:border-brand-red focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-brand-muted uppercase">Subtitle</label>
                    <input
                      type="text"
                      value={proj.subtitle}
                      onChange={(e) => {
                        const updated = { ...cmsData };
                        updated.projects[idx].subtitle = e.target.value;
                        setCmsData(updated);
                      }}
                      className="w-full bg-surface px-3 py-1.5 rounded-lg text-xs text-brand-red font-mono border border-white/10 focus:border-brand-red focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono text-brand-muted uppercase">App Category</label>
                      <select
                        value={proj.category}
                        onChange={(e) => {
                          const updated = { ...cmsData };
                          updated.projects[idx].category = e.target.value as any;
                          setCmsData(updated);
                        }}
                        className="w-full bg-surface px-3 py-1.5 rounded-lg text-xs text-white border border-white/10 focus:border-brand-red focus:outline-none"
                      >
                        <option value="Android">Android</option>
                        <option value="Web">Web</option>
                        <option value="Backend">Backend</option>
                        <option value="IoT">IoT</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-brand-muted uppercase">App Cover Image URL</label>
                      <input
                        type="text"
                        value={proj.image}
                        onChange={(e) => {
                          const updated = { ...cmsData };
                          updated.projects[idx].image = e.target.value;
                          setCmsData(updated);
                        }}
                        className="w-full bg-surface px-3 py-1.5 rounded-lg text-xs text-white border border-white/10 focus:border-brand-red focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono text-brand-muted uppercase">GitHub / Source Code Link</label>
                      <input
                        type="text"
                        value={proj.githubUrl || ""}
                        onChange={(e) => {
                          const updated = { ...cmsData };
                          updated.projects[idx].githubUrl = e.target.value;
                          setCmsData(updated);
                        }}
                        placeholder="https://github.com/..."
                        className="w-full bg-surface px-3 py-1.5 rounded-lg text-xs text-cyan-400 border border-white/10 focus:border-brand-red focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-brand-muted uppercase">Live Demo / Play Store Link</label>
                      <input
                        type="text"
                        value={proj.liveUrl || ""}
                        onChange={(e) => {
                          const updated = { ...cmsData };
                          updated.projects[idx].liveUrl = e.target.value;
                          setCmsData(updated);
                        }}
                        placeholder="https://play.google.com/..."
                        className="w-full bg-surface px-3 py-1.5 rounded-lg text-xs text-emerald-400 border border-white/10 focus:border-brand-red focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-brand-muted uppercase">Description</label>
                    <textarea
                      rows={3}
                      value={proj.description}
                      onChange={(e) => {
                        const updated = { ...cmsData };
                        updated.projects[idx].description = e.target.value;
                        setCmsData(updated);
                      }}
                      className="w-full bg-surface px-3 py-1.5 rounded-lg text-xs text-gray-300 border border-white/10 focus:border-brand-red focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-brand-muted uppercase">Tech Stack (comma separated)</label>
                    <input
                      type="text"
                      value={proj.techStack.join(", ")}
                      onChange={(e) => {
                        const updated = { ...cmsData };
                        updated.projects[idx].techStack = e.target.value.split(",").map((s) => s.trim());
                        setCmsData(updated);
                      }}
                      className="w-full bg-surface px-3 py-1.5 rounded-lg text-xs font-mono text-white border border-white/10 focus:border-brand-red focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: LABS MANAGER */}
        {activeTab === "labs" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-display text-white">Manage Labs Experiments ({cmsData.labs.length})</h2>
              <button
                onClick={() => {
                  const newLab: LabExperiment = {
                    id: `lab-${Date.now()}`,
                    title: "New Hardware Prototype",
                    status: "Prototype",
                    date: "Q3 2026",
                    category: "Edge AI",
                    description: "Experimental description...",
                    tags: ["ESP32", "TinyML"],
                    metrics: [{ label: "Metric", value: "100%" }],
                  };
                  const updated = { ...cmsData, labs: [newLab, ...cmsData.labs] };
                  setCmsData(updated);
                  handleSaveAll(updated);
                }}
                className="px-4 py-2 rounded-xl bg-surface border border-brand-red/40 hover:bg-brand-red/20 text-xs font-mono text-white flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-brand-red" />
                <span>Add New Prototype</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cmsData.labs.map((lab, idx) => (
                <div key={lab.id} className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded text-[10px] font-mono bg-brand-red/20 text-brand-red border border-brand-red/40 font-bold">
                      {lab.status}
                    </span>
                    <button
                      onClick={() => {
                        const updated = { ...cmsData };
                        updated.labs.splice(idx, 1);
                        setCmsData(updated);
                        handleSaveAll(updated);
                      }}
                      className="p-1.5 rounded-lg text-brand-muted hover:text-brand-red"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-brand-muted uppercase">Prototype Title</label>
                    <input
                      type="text"
                      value={lab.title}
                      onChange={(e) => {
                        const updated = { ...cmsData };
                        updated.labs[idx].title = e.target.value;
                        setCmsData(updated);
                      }}
                      className="w-full bg-surface px-3 py-1.5 rounded-lg text-sm text-white font-bold border border-white/10 focus:border-brand-red focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-brand-muted uppercase">Description</label>
                    <textarea
                      rows={3}
                      value={lab.description}
                      onChange={(e) => {
                        const updated = { ...cmsData };
                        updated.labs[idx].description = e.target.value;
                        setCmsData(updated);
                      }}
                      className="w-full bg-surface px-3 py-1.5 rounded-lg text-xs text-gray-300 border border-white/10 focus:border-brand-red focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SKILLS MATRIX */}
        {activeTab === "skills" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-display text-white">Manage Skills & Mastery Levels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cmsData.skills.map((cat, catIdx) => (
                <div key={cat.category} className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
                  <h3 className="text-sm font-mono font-bold text-brand-red uppercase">{cat.category} Skills</h3>
                  <div className="space-y-3">
                    {cat.skills.map((skill, skillIdx) => (
                      <div key={skill.name} className="p-3 rounded-xl bg-surface/60 border border-white/5 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => {
                              const updated = { ...cmsData };
                              updated.skills[catIdx].skills[skillIdx].name = e.target.value;
                              setCmsData(updated);
                            }}
                            className="bg-transparent text-xs font-bold text-white border-b border-white/10 focus:border-brand-red focus:outline-none"
                          />
                          <div className="flex items-center gap-1 text-xs font-mono text-brand-red">
                            <input
                              type="number"
                              min={0}
                              max={100}
                              value={skill.level}
                              onChange={(e) => {
                                const updated = { ...cmsData };
                                updated.skills[catIdx].skills[skillIdx].level = parseInt(e.target.value) || 0;
                                setCmsData(updated);
                              }}
                              className="w-12 bg-surface px-1 py-0.5 rounded text-center border border-white/10 focus:border-brand-red focus:outline-none text-white"
                            />
                            <span>%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TIMELINE */}
        {activeTab === "timeline" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-display text-white">Manage Journey Milestones ({cmsData.timeline.length})</h2>
              <button
                onClick={() => {
                  const newM: Milestone = {
                    year: "2026",
                    period: "Present",
                    title: "New Achievement",
                    companyRole: "Engineering Role",
                    description: "Milestone description...",
                    highlights: ["Achievement 1"],
                    technologies: ["Kotlin", "ESP32"],
                    icon: "Rocket",
                  };
                  const updated = { ...cmsData, timeline: [newM, ...cmsData.timeline] };
                  setCmsData(updated);
                  handleSaveAll(updated);
                }}
                className="px-4 py-2 rounded-xl bg-surface border border-brand-red/40 hover:bg-brand-red/20 text-xs font-mono text-white flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-brand-red" />
                <span>Add Milestone</span>
              </button>
            </div>

            <div className="space-y-4">
              {cmsData.timeline.map((m, idx) => (
                <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={m.year}
                        onChange={(e) => {
                          const updated = { ...cmsData };
                          updated.timeline[idx].year = e.target.value;
                          setCmsData(updated);
                        }}
                        className="w-20 bg-surface px-2 py-1 rounded text-xs font-mono font-bold text-brand-red border border-white/10 text-center"
                      />
                      <input
                        type="text"
                        value={m.title}
                        onChange={(e) => {
                          const updated = { ...cmsData };
                          updated.timeline[idx].title = e.target.value;
                          setCmsData(updated);
                        }}
                        className="bg-transparent text-sm font-bold text-white border-b border-white/10 focus:border-brand-red focus:outline-none"
                      />
                    </div>
                    <button
                      onClick={() => {
                        const updated = { ...cmsData };
                        updated.timeline.splice(idx, 1);
                        setCmsData(updated);
                        handleSaveAll(updated);
                      }}
                      className="p-1.5 rounded-lg text-brand-muted hover:text-brand-red"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <textarea
                    rows={2}
                    value={m.description}
                    onChange={(e) => {
                      const updated = { ...cmsData };
                      updated.timeline[idx].description = e.target.value;
                      setCmsData(updated);
                    }}
                    className="w-full bg-surface px-3 py-1.5 rounded-lg text-xs text-gray-300 border border-white/10 focus:border-brand-red focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SERVICES MANAGER */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-display text-white">
                Manage Company Services ({cmsData.settings.services?.length || 0})
              </h2>
              <button
                onClick={() => {
                  const newService: ServiceData = {
                    title: "New Service Offering",
                    description: "High-level description of engineering service...",
                    deliverables: ["Deliverable 1", "Deliverable 2"],
                  };
                  const updated = { ...cmsData };
                  if (!updated.settings.services) updated.settings.services = [];
                  updated.settings.services.push(newService);
                  setCmsData(updated);
                  handleSaveAll(updated);
                }}
                className="px-4 py-2 rounded-xl bg-surface border border-brand-red/40 hover:bg-brand-red/20 text-xs font-mono text-white flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-brand-red" />
                <span>Add New Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cmsData.settings.services?.map((svc, idx) => (
                <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded text-[10px] font-mono bg-brand-red/20 text-brand-red border border-brand-red/40 font-bold uppercase">
                      Service #{idx + 1}
                    </span>
                    <button
                      onClick={() => {
                        const updated = { ...cmsData };
                        updated.settings.services.splice(idx, 1);
                        setCmsData(updated);
                        handleSaveAll(updated);
                      }}
                      className="p-1.5 rounded-lg text-brand-muted hover:text-brand-red"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-brand-muted uppercase">Service Title</label>
                    <input
                      type="text"
                      value={svc.title}
                      onChange={(e) => {
                        const updated = { ...cmsData };
                        updated.settings.services[idx].title = e.target.value;
                        setCmsData(updated);
                      }}
                      className="w-full bg-surface px-3 py-1.5 rounded-lg text-sm text-white font-bold border border-white/10 focus:border-brand-red focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-brand-muted uppercase">Service Description</label>
                    <textarea
                      rows={3}
                      value={svc.description}
                      onChange={(e) => {
                        const updated = { ...cmsData };
                        updated.settings.services[idx].description = e.target.value;
                        setCmsData(updated);
                      }}
                      className="w-full bg-surface px-3 py-1.5 rounded-lg text-xs text-gray-300 border border-white/10 focus:border-brand-red focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-brand-muted uppercase">Deliverables List (comma separated)</label>
                    <input
                      type="text"
                      value={svc.deliverables?.join(", ") || ""}
                      onChange={(e) => {
                        const updated = { ...cmsData };
                        updated.settings.services[idx].deliverables = e.target.value.split(",").map((d) => d.trim());
                        setCmsData(updated);
                      }}
                      className="w-full bg-surface px-3 py-1.5 rounded-lg text-xs font-mono text-emerald-400 border border-white/10 focus:border-brand-red focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: HERO & COMPANY VISION */}
        {activeTab === "heroCompany" && (
          <div className="space-y-8 max-w-4xl">
            {/* HERO SETTINGS */}
            <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4">
              <h2 className="text-xl font-bold font-display text-white">Hero Section Editor</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-brand-muted uppercase">Status Pill</label>
                  <input
                    type="text"
                    value={cmsData.settings.hero?.statusPill || ""}
                    onChange={(e) => {
                      const updated = { ...cmsData };
                      updated.settings.hero.statusPill = e.target.value;
                      setCmsData(updated);
                    }}
                    className="w-full bg-surface px-3 py-2 rounded-xl text-xs text-white border border-white/10 focus:border-brand-red focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-brand-muted uppercase">Main Headline Name</label>
                  <input
                    type="text"
                    value={cmsData.settings.hero?.headline || ""}
                    onChange={(e) => {
                      const updated = { ...cmsData };
                      updated.settings.hero.headline = e.target.value;
                      setCmsData(updated);
                    }}
                    className="w-full bg-surface px-3 py-2 rounded-xl text-xs text-white border border-white/10 focus:border-brand-red focus:outline-none font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-brand-muted uppercase">Auto-typing Subheadline Roles (comma separated)</label>
                <input
                  type="text"
                  value={cmsData.settings.hero?.roles?.join(", ") || ""}
                  onChange={(e) => {
                    const updated = { ...cmsData };
                    updated.settings.hero.roles = e.target.value.split(",").map((r) => r.trim());
                    setCmsData(updated);
                  }}
                  className="w-full bg-surface px-3 py-2 rounded-xl text-xs text-brand-red font-mono border border-white/10 focus:border-brand-red focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-brand-muted uppercase">Hero Description Pitch</label>
                <textarea
                  rows={3}
                  value={cmsData.settings.hero?.description || ""}
                  onChange={(e) => {
                    const updated = { ...cmsData };
                    updated.settings.hero.description = e.target.value;
                    setCmsData(updated);
                  }}
                  className="w-full bg-surface px-3 py-2 rounded-xl text-xs text-gray-300 border border-white/10 focus:border-brand-red focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-mono text-brand-muted uppercase">Years Metric</label>
                  <input
                    type="text"
                    value={cmsData.settings.hero?.yearsMetric || "4+"}
                    onChange={(e) => {
                      const updated = { ...cmsData };
                      updated.settings.hero.yearsMetric = e.target.value;
                      setCmsData(updated);
                    }}
                    className="w-full bg-surface px-3 py-2 rounded-xl text-xs text-white border border-white/10 font-mono text-center"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-brand-muted uppercase">Tech Nodes Metric</label>
                  <input
                    type="text"
                    value={cmsData.settings.hero?.techNodesMetric || "15+"}
                    onChange={(e) => {
                      const updated = { ...cmsData };
                      updated.settings.hero.techNodesMetric = e.target.value;
                      setCmsData(updated);
                    }}
                    className="w-full bg-surface px-3 py-2 rounded-xl text-xs text-white border border-white/10 font-mono text-center"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-brand-muted uppercase">Uptime Metric</label>
                  <input
                    type="text"
                    value={cmsData.settings.hero?.uptimeMetric || "99.9%"}
                    onChange={(e) => {
                      const updated = { ...cmsData };
                      updated.settings.hero.uptimeMetric = e.target.value;
                      setCmsData(updated);
                    }}
                    className="w-full bg-surface px-3 py-2 rounded-xl text-xs text-white border border-white/10 font-mono text-center"
                  />
                </div>
              </div>
            </div>

            {/* COMPANY VISION SETTINGS */}
            <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4">
              <h2 className="text-xl font-bold font-display text-white">Company Vision Editor</h2>

              <div>
                <label className="text-xs font-mono text-brand-muted uppercase">Company Headline</label>
                <input
                  type="text"
                  value={cmsData.settings.company?.[0]?.headline || ""}
                  onChange={(e) => {
                    const updated = { ...cmsData };
                    if (!updated.settings.company?.[0]) updated.settings.company = [{} as any];
                    updated.settings.company[0].headline = e.target.value;
                    setCmsData(updated);
                  }}
                  className="w-full bg-surface px-3 py-2 rounded-xl text-xs text-white border border-white/10 font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-brand-muted uppercase">Mission Statement</label>
                <textarea
                  rows={2}
                  value={cmsData.settings.company?.[0]?.mission || ""}
                  onChange={(e) => {
                    const updated = { ...cmsData };
                    if (!updated.settings.company?.[0]) updated.settings.company = [{} as any];
                    updated.settings.company[0].mission = e.target.value;
                    setCmsData(updated);
                  }}
                  className="w-full bg-surface px-3 py-2 rounded-xl text-xs text-gray-300 border border-white/10"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-brand-muted uppercase">Vision Statement</label>
                <textarea
                  rows={2}
                  value={cmsData.settings.company?.[0]?.vision || ""}
                  onChange={(e) => {
                    const updated = { ...cmsData };
                    if (!updated.settings.company?.[0]) updated.settings.company = [{} as any];
                    updated.settings.company[0].vision = e.target.value;
                    setCmsData(updated);
                  }}
                  className="w-full bg-surface px-3 py-2 rounded-xl text-xs text-gray-300 border border-white/10"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: INQUIRIES INBOX */}
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
                            handleSaveAll(updated);
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

        {/* TAB 8: GEMINI AI & BRAND CONFIG */}
        {activeTab === "settings" && (
          <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6 max-w-3xl">
            <h2 className="text-xl font-bold font-display text-white">Global Brand & Gemini AI Config</h2>

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
                <label className="text-xs font-mono text-brand-muted uppercase">Contact Email Address</label>
                <input
                  type="email"
                  value={cmsData.settings.email}
                  onChange={(e) => {
                    setCmsData({
                      ...cmsData,
                      settings: { ...cmsData.settings, email: e.target.value },
                    });
                  }}
                  className="w-full bg-surface px-4 py-2.5 rounded-xl text-xs text-brand-red font-mono border border-white/10 focus:border-brand-red focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-brand-muted uppercase">Gemini AI Persona Prompt</label>
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
