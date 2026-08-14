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
  Database,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Sliders,
  Check,
  MessageSquare,
  Activity,
  Globe,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/layout/ThemeToggle";

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

  // Login Authentication View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-[#07090C] text-slate-900 dark:text-white transition-colors duration-300">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md p-8 rounded-3xl bg-white/90 dark:bg-[#0E1118]/90 border border-slate-200 dark:border-white/10 backdrop-blur-2xl shadow-2xl space-y-6 relative overflow-hidden"
        >
          {/* Ambient red core glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-red/20 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center space-y-3">
            <div className="relative w-48 h-10 mx-auto mb-2">
              <Image
                src="/assets/logo-dark.png"
                alt="Xentoryx Logo Dark"
                fill
                className="object-contain hidden dark:block"
              />
              <Image
                src="/assets/logo-light.png"
                alt="Xentoryx Logo Light"
                fill
                className="object-contain block dark:hidden"
              />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/30 text-[10px] font-mono text-brand-red font-bold uppercase tracking-wider">
              FOUNDER CONTROL CENTER
            </div>
            <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              Admin Authentication
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Enter secure credentials to unlock Xentoryx CMS Engine
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-slate-600 dark:text-slate-400 uppercase font-bold tracking-wider">
                Founder Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-100 dark:bg-[#141824] pl-10 pr-4 py-3 rounded-xl text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:border-brand-red border border-slate-200 dark:border-white/10 transition-colors"
                  autoFocus
                />
              </div>
            </div>

            {authError && (
              <div className="text-xs text-brand-red font-mono text-center bg-brand-red/10 border border-brand-red/30 py-2.5 rounded-xl font-bold">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-red to-[#FF5E50] text-white font-bold text-xs uppercase font-mono shadow-glow-red hover:shadow-glow-red-lg transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Unlock Admin Console</span>
            </button>
          </form>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10">
            <Link
              href="/"
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-brand-red transition-colors flex items-center gap-1 font-mono font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Site</span>
            </Link>
            <ThemeToggle />
          </div>
        </motion.div>
      </div>
    );
  }

  if (!cmsData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#07090C] text-slate-900 dark:text-white font-mono text-xs">
        <RefreshCw className="w-6 h-6 text-brand-red animate-spin mr-2" />
        <span>Initializing Xentoryx CMS Control Plane...</span>
      </div>
    );
  }

  const statItems = [
    { label: "Total Projects", value: cmsData.projects?.length || 0, icon: Briefcase, color: "text-brand-red" },
    { label: "R&D Prototypes", value: cmsData.labs?.length || 0, icon: FlaskConical, color: "text-cyan-500" },
    { label: "Skill Categories", value: cmsData.skills?.length || 0, icon: Cpu, color: "text-purple-500" },
    { label: "Journey Milestones", value: cmsData.timeline?.length || 0, icon: Calendar, color: "text-emerald-500" },
    { label: "Client Inquiries", value: cmsData.inquiries?.length || 0, icon: Mail, color: "text-amber-500" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090C] text-slate-900 dark:text-white transition-colors duration-300 pb-20">
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#0A0C10]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative h-9 w-44">
                <Image
                  src="/assets/logo-dark.png"
                  alt="Xentoryx Logo Dark"
                  fill
                  className="object-contain hidden dark:block"
                />
                <Image
                  src="/assets/logo-light.png"
                  alt="Xentoryx Logo Light"
                  fill
                  className="object-contain block dark:hidden"
                />
              </div>

              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>CMS CLOUD CONNECTED</span>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-3">
              <ThemeToggle />

              <Link
                href="/"
                target="_blank"
                className="px-3.5 py-2 rounded-xl glass-panel text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors border-slate-200 dark:border-white/10 font-bold"
              >
                <Eye className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span className="hidden sm:inline">Preview Public Site</span>
              </Link>

              <button
                onClick={() => handleSaveAll()}
                disabled={saving}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-red to-[#FF5E50] text-white text-xs font-mono font-bold flex items-center gap-2 shadow-glow-red hover:shadow-glow-red-lg transition-all"
              >
                {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>{saving ? "Saving..." : "Save All Changes"}</span>
              </button>

              {saveSuccess && (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1 font-bold animate-fade-in">
                  <CheckCircle2 className="w-4 h-4" /> Saved!
                </span>
              )}

              <button
                onClick={() => {
                  sessionStorage.removeItem("xentoryx-admin-token");
                  setIsAuthenticated(false);
                }}
                className="p-2 rounded-xl glass-panel text-slate-600 dark:text-slate-400 hover:text-brand-red transition-colors"
                title="Lock Session"
              >
                <Unlock className="w-4 h-4 text-brand-red" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Telemetry Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {statItems.map((st) => {
            const IconC = st.icon;
            return (
              <div
                key={st.label}
                className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-white/10 space-y-2 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">
                    {st.label}
                  </span>
                  <IconC className={`w-4 h-4 ${st.color}`} />
                </div>
                <div className="font-display text-2xl font-black text-slate-900 dark:text-white">
                  {st.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Tabs Pill Bar */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-white/10 pb-4">
          {[
            { id: "projects", label: "Projects Catalog", icon: Briefcase, count: cmsData.projects?.length },
            { id: "labs", label: "Labs R&D", icon: FlaskConical, count: cmsData.labs?.length },
            { id: "skills", label: "Skills Matrix", icon: Cpu, count: cmsData.skills?.length },
            { id: "timeline", label: "Career Timeline", icon: Calendar, count: cmsData.timeline?.length },
            { id: "services", label: "Services", icon: Zap, count: cmsData.settings.services?.length },
            { id: "heroCompany", label: "Hero & Company", icon: Target },
            { id: "inquiries", label: "Client Inbox", icon: Mail, count: cmsData.inquiries?.length },
            { id: "settings", label: "Global & Gemini Config", icon: Settings },
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
                    : "glass-panel text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: PROJECTS CATALOG */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                  Manage Projects Catalog ({cmsData.projects?.length || 0})
                </h2>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                  Directly edit titles, cover images, GitHub URLs, Play Store links, categories, and featured status.
                </p>
              </div>

              <button
                onClick={() => {
                  const newP: Project = {
                    id: `proj-${Date.now()}`,
                    title: "New Architectural Build",
                    subtitle: "Fullstack Systems",
                    tagline: "High-performance software",
                    description: "Detailed production engineering project pitch...",
                    category: "Android",
                    featured: true,
                    image: "/assets/projects/dipannita.jpg",
                    techStack: ["Kotlin", "Jetpack Compose", "Next.js"],
                    features: ["Feature 1"],
                    architecture: { frontend: "Native Android" },
                    githubUrl: "https://github.com/mohammadasifulislam8899",
                    liveUrl: "https://xentoryx.com",
                    stats: [{ label: "Status", value: "Active" }],
                  };
                  const updated = { ...cmsData, projects: [newP, ...(cmsData.projects || [])] };
                  setCmsData(updated);
                  handleSaveAll(updated);
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-mono font-bold flex items-center gap-2 hover:bg-brand-red dark:hover:bg-brand-red dark:hover:text-white transition-all shadow-md"
              >
                <Plus className="w-4 h-4 text-brand-red dark:text-brand-red" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cmsData.projects?.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4 hover:border-brand-red/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Header bar */}
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-brand-red text-white uppercase shadow-md">
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
                          className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold transition-all ${
                            proj.featured
                              ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40"
                              : "bg-slate-100 dark:bg-surface text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10"
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
                          className="p-1.5 rounded-lg text-slate-400 hover:text-brand-red transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">
                          Project Title
                        </label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => {
                            const updated = { ...cmsData };
                            updated.projects[idx].title = e.target.value;
                            setCmsData(updated);
                          }}
                          className="w-full bg-slate-100 dark:bg-surface px-3.5 py-2 rounded-xl text-sm font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">
                            Category
                          </label>
                          <select
                            value={proj.category}
                            onChange={(e) => {
                              const updated = { ...cmsData };
                              updated.projects[idx].category = e.target.value as any;
                              setCmsData(updated);
                            }}
                            className="w-full bg-slate-100 dark:bg-surface px-3 py-2 rounded-xl text-xs text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none font-mono"
                          >
                            <option value="Android">Android</option>
                            <option value="Web">Web</option>
                            <option value="Backend">Backend</option>
                            <option value="IoT">IoT</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">
                            Cover Image Path / URL
                          </label>
                          <input
                            type="text"
                            value={proj.image}
                            onChange={(e) => {
                              const updated = { ...cmsData };
                              updated.projects[idx].image = e.target.value;
                              setCmsData(updated);
                            }}
                            className="w-full bg-slate-100 dark:bg-surface px-3 py-2 rounded-xl text-xs font-mono text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">
                            GitHub Repository Link
                          </label>
                          <input
                            type="text"
                            value={proj.githubUrl || ""}
                            onChange={(e) => {
                              const updated = { ...cmsData };
                              updated.projects[idx].githubUrl = e.target.value;
                              setCmsData(updated);
                            }}
                            placeholder="https://github.com/..."
                            className="w-full bg-slate-100 dark:bg-surface px-3 py-2 rounded-xl text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">
                            Live Demo / Play Store Link
                          </label>
                          <input
                            type="text"
                            value={proj.liveUrl || ""}
                            onChange={(e) => {
                              const updated = { ...cmsData };
                              updated.projects[idx].liveUrl = e.target.value;
                              setCmsData(updated);
                            }}
                            placeholder="https://play.google.com/..."
                            className="w-full bg-slate-100 dark:bg-surface px-3 py-2 rounded-xl text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">
                          Description
                        </label>
                        <textarea
                          rows={3}
                          value={proj.description}
                          onChange={(e) => {
                            const updated = { ...cmsData };
                            updated.projects[idx].description = e.target.value;
                            setCmsData(updated);
                          }}
                          className="w-full bg-slate-100 dark:bg-surface px-3 py-2 rounded-xl text-xs text-slate-900 dark:text-gray-300 border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">
                          Tech Stack Tags (comma separated)
                        </label>
                        <input
                          type="text"
                          value={proj.techStack?.join(", ") || ""}
                          onChange={(e) => {
                            const updated = { ...cmsData };
                            updated.projects[idx].techStack = e.target.value.split(",").map((s) => s.trim());
                            setCmsData(updated);
                          }}
                          className="w-full bg-slate-100 dark:bg-surface px-3 py-2 rounded-xl text-xs font-mono text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none font-bold"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: LABS R&D EXPERIMENTS */}
        {activeTab === "labs" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                  Manage Hardware & R&D Prototypes ({cmsData.labs?.length || 0})
                </h2>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                  Configure experimental microcontroller firmware telemetry, ESP32 prototypes, and systems.
                </p>
              </div>

              <button
                onClick={() => {
                  const newLab: LabExperiment = {
                    id: `lab-${Date.now()}`,
                    title: "New Hardware Prototype",
                    description: "Experimental research description...",
                    category: "Hardware",
                    status: "Prototype",
                    date: "2026",
                    metrics: [{ label: "Throughput", value: "100 Mbps" }],
                    tags: ["ESP32", "MQTT"],
                  };
                  const updated = { ...cmsData, labs: [newLab, ...(cmsData.labs || [])] };
                  setCmsData(updated);
                  handleSaveAll(updated);
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-mono font-bold flex items-center gap-2 hover:bg-brand-red dark:hover:bg-brand-red dark:hover:text-white transition-all shadow-md"
              >
                <Plus className="w-4 h-4 text-brand-red dark:text-brand-red" />
                <span>Add Lab Prototype</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cmsData.labs?.map((lab, idx) => (
                <div key={lab.id} className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/40 uppercase">
                      {lab.category} // {lab.status}
                    </span>

                    <button
                      onClick={() => {
                        const updated = { ...cmsData };
                        updated.labs.splice(idx, 1);
                        setCmsData(updated);
                        handleSaveAll(updated);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-brand-red"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">
                      Prototype Title
                    </label>
                    <input
                      type="text"
                      value={lab.title}
                      onChange={(e) => {
                        const updated = { ...cmsData };
                        updated.labs[idx].title = e.target.value;
                        setCmsData(updated);
                      }}
                      className="w-full bg-slate-100 dark:bg-surface px-3 py-2 rounded-xl text-sm text-slate-900 dark:text-white font-bold border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={lab.description}
                      onChange={(e) => {
                        const updated = { ...cmsData };
                        updated.labs[idx].description = e.target.value;
                        setCmsData(updated);
                      }}
                      className="w-full bg-slate-100 dark:bg-surface px-3 py-2 rounded-xl text-xs text-slate-900 dark:text-gray-300 border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none"
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
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                  Manage Skills Matrix ({cmsData.skills?.length || 0} Categories)
                </h2>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                  Update proficiency levels (0-100%) across Android, Backend, Web, and IoT hardware categories.
                </p>
              </div>

              <button
                onClick={() => {
                  const newSkillCat: SkillCategory = {
                    category: "ANDROID",
                    iconName: "Cpu",
                    description: "Android engineering skills",
                    skills: [
                      { name: "New Skill", level: 90, experience: "Advanced" },
                    ],
                  };
                  const updated = { ...cmsData, skills: [newSkillCat, ...(cmsData.skills || [])] };
                  setCmsData(updated);
                  handleSaveAll(updated);
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-mono font-bold flex items-center gap-2 hover:bg-brand-red dark:hover:bg-brand-red dark:hover:text-white transition-all shadow-md"
              >
                <Plus className="w-4 h-4 text-brand-red dark:text-brand-red" />
                <span>Add Skill Category</span>
              </button>
            </div>

            <div className="space-y-6">
              {cmsData.skills?.map((cat, catIdx) => (
                <div key={catIdx} className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={cat.category}
                      onChange={(e) => {
                        const updated = { ...cmsData };
                        updated.skills[catIdx].category = e.target.value as any;
                        setCmsData(updated);
                      }}
                      className="bg-transparent text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none uppercase font-mono"
                    />
                    <button
                      onClick={() => {
                        const updated = { ...cmsData };
                        updated.skills.splice(catIdx, 1);
                        setCmsData(updated);
                        handleSaveAll(updated);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-brand-red"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {cat.skills?.map((sk, skIdx) => (
                      <div key={skIdx} className="p-3.5 rounded-2xl bg-slate-100 dark:bg-surface border border-slate-200 dark:border-white/10 flex items-center gap-3">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={sk.name}
                            onChange={(e) => {
                              const updated = { ...cmsData };
                              updated.skills[catIdx].skills[skIdx].name = e.target.value;
                              setCmsData(updated);
                            }}
                            className="w-full bg-transparent text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
                          />
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[10px] font-mono text-brand-red font-bold">{sk.level}%</span>
                            <input
                              type="range"
                              min="50"
                              max="100"
                              value={sk.level}
                              onChange={(e) => {
                                const updated = { ...cmsData };
                                updated.skills[catIdx].skills[skIdx].level = parseInt(e.target.value);
                                setCmsData(updated);
                              }}
                              className="w-full h-1.5 bg-slate-300 dark:bg-slate-700 rounded-lg accent-brand-red cursor-pointer"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            const updated = { ...cmsData };
                            updated.skills[catIdx].skills.splice(skIdx, 1);
                            setCmsData(updated);
                            handleSaveAll(updated);
                          }}
                          className="text-slate-400 hover:text-brand-red"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CAREER TIMELINE */}
        {activeTab === "timeline" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                  Manage Journey Milestones ({cmsData.timeline?.length || 0})
                </h2>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                  Directly edit role titles (e.g. Founder & Lead Architect), organization, period, descriptions, highlights, and tech tags.
                </p>
              </div>

              <button
                onClick={() => {
                  const newM: Milestone = {
                    year: "2026",
                    period: "Future Era",
                    title: "New Architectural Role",
                    companyRole: "Founder & Lead Architect",
                    description: "Milestone engineering description...",
                    highlights: ["Achievement 1", "Achievement 2"],
                    technologies: ["Kotlin", "ESP32", "Next.js"],
                    icon: "Rocket",
                  };
                  const updated = { ...cmsData };
                  if (!updated.timeline) updated.timeline = [];
                  updated.timeline.unshift(newM);
                  setCmsData(updated);
                  handleSaveAll(updated);
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-mono font-bold flex items-center gap-2 hover:bg-brand-red dark:hover:bg-brand-red dark:hover:text-white transition-all shadow-md"
              >
                <Plus className="w-4 h-4 text-brand-red dark:text-brand-red" />
                <span>Add Milestone</span>
              </button>
            </div>

            <div className="space-y-6">
              {cmsData.timeline?.map((m, idx) => (
                <div key={idx} className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-brand-red/20 text-brand-red border border-brand-red/40 font-bold uppercase">
                      Milestone #{idx + 1}
                    </span>
                    <button
                      onClick={() => {
                        const updated = { ...cmsData };
                        updated.timeline.splice(idx, 1);
                        setCmsData(updated);
                        handleSaveAll(updated);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-brand-red"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">Years / Duration</label>
                      <input
                        type="text"
                        value={m.year}
                        onChange={(e) => {
                          const updated = { ...cmsData };
                          updated.timeline[idx].year = e.target.value;
                          setCmsData(updated);
                        }}
                        placeholder="2024 - Present"
                        className="w-full bg-slate-100 dark:bg-surface px-3.5 py-2 rounded-xl text-xs font-mono font-bold text-brand-red border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">Role Title (e.g. Founder & Lead Architect)</label>
                      <input
                        type="text"
                        value={m.companyRole || m.title}
                        onChange={(e) => {
                          const updated = { ...cmsData };
                          updated.timeline[idx].companyRole = e.target.value;
                          updated.timeline[idx].title = e.target.value;
                          setCmsData(updated);
                        }}
                        placeholder="Founder & Lead Architect"
                        className="w-full bg-slate-100 dark:bg-surface px-3.5 py-2 rounded-xl text-xs font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">Organization & Era</label>
                      <input
                        type="text"
                        value={m.period}
                        onChange={(e) => {
                          const updated = { ...cmsData };
                          updated.timeline[idx].period = e.target.value;
                          setCmsData(updated);
                        }}
                        placeholder="Xentoryx Labs • Present Era"
                        className="w-full bg-slate-100 dark:bg-surface px-3.5 py-2 rounded-xl text-xs font-mono text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none font-bold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">Milestone Description</label>
                    <textarea
                      rows={2}
                      value={m.description}
                      onChange={(e) => {
                        const updated = { ...cmsData };
                        updated.timeline[idx].description = e.target.value;
                        setCmsData(updated);
                      }}
                      className="w-full bg-slate-100 dark:bg-surface px-3.5 py-2 rounded-xl text-xs text-slate-900 dark:text-gray-300 border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">Highlights Bullets (comma separated)</label>
                      <input
                        type="text"
                        value={m.highlights?.join(", ") || ""}
                        onChange={(e) => {
                          const updated = { ...cmsData };
                          updated.timeline[idx].highlights = e.target.value.split(",").map((h) => h.trim());
                          setCmsData(updated);
                        }}
                        placeholder="Built Dipannita, Engineered Wireless ESP32..."
                        className="w-full bg-slate-100 dark:bg-surface px-3.5 py-2 rounded-xl text-xs font-mono text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">Tech Stack Tags (comma separated)</label>
                      <input
                        type="text"
                        value={m.technologies?.join(", ") || ""}
                        onChange={(e) => {
                          const updated = { ...cmsData };
                          updated.timeline[idx].technologies = e.target.value.split(",").map((t) => t.trim());
                          setCmsData(updated);
                        }}
                        placeholder="Kotlin, ESP32, Next.js, MongoDB..."
                        className="w-full bg-slate-100 dark:bg-surface px-3.5 py-2 rounded-xl text-xs font-mono text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none font-bold"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SERVICES */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                  Manage Services ({cmsData.settings.services?.length || 0})
                </h2>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                  Configure specialized engineering offerings and deliverables lists.
                </p>
              </div>

              <button
                onClick={() => {
                  const newSvc: ServiceData = {
                    title: "New Engineering Service",
                    description: "Service details...",
                    deliverables: ["Deliverable 1", "Deliverable 2"],
                  };
                  const updated = { ...cmsData };
                  if (!updated.settings.services) updated.settings.services = [];
                  updated.settings.services.push(newSvc);
                  setCmsData(updated);
                  handleSaveAll(updated);
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-mono font-bold flex items-center gap-2 hover:bg-brand-red dark:hover:bg-brand-red dark:hover:text-white transition-all shadow-md"
              >
                <Plus className="w-4 h-4 text-brand-red dark:text-brand-red" />
                <span>Add Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cmsData.settings.services?.map((svc, idx) => (
                <div key={idx} className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-brand-red font-bold">SERVICE 0{idx + 1}</span>
                    <button
                      onClick={() => {
                        const updated = { ...cmsData };
                        updated.settings.services.splice(idx, 1);
                        setCmsData(updated);
                        handleSaveAll(updated);
                      }}
                      className="text-slate-400 hover:text-brand-red"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">Service Title</label>
                    <input
                      type="text"
                      value={svc.title}
                      onChange={(e) => {
                        const updated = { ...cmsData };
                        updated.settings.services[idx].title = e.target.value;
                        setCmsData(updated);
                      }}
                      className="w-full bg-slate-100 dark:bg-surface px-3.5 py-2 rounded-xl text-sm text-slate-900 dark:text-white font-bold border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">Description</label>
                    <textarea
                      rows={2}
                      value={svc.description}
                      onChange={(e) => {
                        const updated = { ...cmsData };
                        updated.settings.services[idx].description = e.target.value;
                        setCmsData(updated);
                      }}
                      className="w-full bg-slate-100 dark:bg-surface px-3.5 py-2 rounded-xl text-xs text-slate-900 dark:text-gray-300 border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: HERO & COMPANY */}
        {activeTab === "heroCompany" && (
          <div className="space-y-8 max-w-4xl">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4">
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">Hero Section Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">Status Pill Badge</label>
                  <input
                    type="text"
                    value={cmsData.settings.hero?.statusPill || "NEXT-GEN R&D SOFTWARE & HARDWARE LAB"}
                    onChange={(e) => {
                      setCmsData({
                        ...cmsData,
                        settings: {
                          ...cmsData.settings,
                          hero: { ...(cmsData.settings.hero || {}), statusPill: e.target.value } as any,
                        },
                      });
                    }}
                    className="w-full bg-slate-100 dark:bg-surface px-3.5 py-2 rounded-xl text-xs text-slate-900 dark:text-white font-bold border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">Main Headline</label>
                  <input
                    type="text"
                    value={cmsData.settings.hero?.headline || "Building Scalable Software, IoT Systems & Intelligent Technologies"}
                    onChange={(e) => {
                      setCmsData({
                        ...cmsData,
                        settings: {
                          ...cmsData.settings,
                          hero: { ...(cmsData.settings.hero || {}), headline: e.target.value } as any,
                        },
                      });
                    }}
                    className="w-full bg-slate-100 dark:bg-surface px-3.5 py-2 rounded-xl text-xs text-slate-900 dark:text-white font-bold border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">Founder Pitch / Sub-description</label>
                  <textarea
                    rows={3}
                    value={cmsData.settings.hero?.description || "Engineering native Android apps, hardware IoT systems, and production web platforms."}
                    onChange={(e) => {
                      setCmsData({
                        ...cmsData,
                        settings: {
                          ...cmsData.settings,
                          hero: { ...(cmsData.settings.hero || {}), description: e.target.value } as any,
                        },
                      });
                    }}
                    className="w-full bg-slate-100 dark:bg-surface px-3.5 py-2 rounded-xl text-xs text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSaveAll()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-red to-[#FF5E50] text-white font-bold text-xs uppercase font-mono shadow-glow-red"
            >
              Save Hero & Company Config
            </button>
          </div>
        )}

        {/* TAB 7: CLIENT INBOX */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                  Client Inquiries Inbox ({cmsData.inquiries?.length || 0})
                </h2>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                  Direct messages submitted by clients through the Initiate Collaboration contact section.
                </p>
              </div>
            </div>

            {(!cmsData.inquiries || cmsData.inquiries.length === 0) ? (
              <div className="glass-panel p-12 text-center text-slate-500 font-mono text-xs rounded-3xl">
                No client project inquiries in inbox.
              </div>
            ) : (
              <div className="space-y-4">
                {cmsData.inquiries.map((inq, idx) => (
                  <div key={inq.id || idx} className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-sm text-slate-900 dark:text-white">{inq.name}</span>
                        <a href={`mailto:${inq.email}`} className="text-xs font-mono text-brand-red ml-3 font-bold hover:underline">
                          {inq.email}
                        </a>
                      </div>
                      <button
                        onClick={() => {
                          const updated = { ...cmsData };
                          updated.inquiries.splice(idx, 1);
                          setCmsData(updated);
                          handleSaveAll(updated);
                        }}
                        className="text-slate-400 hover:text-brand-red"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex gap-3 text-[10px] font-mono text-slate-600 dark:text-slate-400">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-surface border border-slate-200 dark:border-white/10 font-bold">Scope: {inq.projectType}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-surface border border-slate-200 dark:border-white/10 font-bold text-emerald-600 dark:text-emerald-400">Budget: {inq.budget}</span>
                    </div>

                    <p className="text-xs font-mono text-slate-800 dark:text-slate-300 leading-relaxed bg-slate-100 dark:bg-surface p-4 rounded-2xl border border-slate-200 dark:border-white/10">
                      {inq.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 8: GLOBAL BRAND & GEMINI AI CONFIG */}
        {activeTab === "settings" && (
          <div className="glass-panel p-8 rounded-3xl border border-slate-200 dark:border-white/10 space-y-6 max-w-3xl">
            <div>
              <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">Global Brand & Gemini AI Config</h2>
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                Configure founder identity, company name, tagline, email, and Gemini AI assistant system instructions.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">Founder Name</label>
                  <input
                    type="text"
                    value={cmsData.settings.founderName}
                    onChange={(e) => {
                      setCmsData({
                        ...cmsData,
                        settings: { ...cmsData.settings, founderName: e.target.value },
                      });
                    }}
                    className="w-full bg-slate-100 dark:bg-surface px-4 py-2.5 rounded-xl text-xs text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">Company Name</label>
                  <input
                    type="text"
                    value={cmsData.settings.companyName}
                    onChange={(e) => {
                      setCmsData({
                        ...cmsData,
                        settings: { ...cmsData.settings, companyName: e.target.value },
                      });
                    }}
                    className="w-full bg-slate-100 dark:bg-surface px-4 py-2.5 rounded-xl text-xs text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">Company Tagline</label>
                <input
                  type="text"
                  value={cmsData.settings.tagline}
                  onChange={(e) => {
                    setCmsData({
                      ...cmsData,
                      settings: { ...cmsData.settings, tagline: e.target.value },
                    });
                  }}
                  className="w-full bg-slate-100 dark:bg-surface px-4 py-2.5 rounded-xl text-xs text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">GitHub Profile URL</label>
                  <input
                    type="text"
                    value={cmsData.settings.githubUrl || ""}
                    onChange={(e) => {
                      setCmsData({
                        ...cmsData,
                        settings: { ...cmsData.settings, githubUrl: e.target.value },
                      });
                    }}
                    placeholder="https://github.com/..."
                    className="w-full bg-slate-100 dark:bg-surface px-4 py-2.5 rounded-xl text-xs text-cyan-600 dark:text-cyan-400 font-mono font-bold border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">LinkedIn Profile URL</label>
                  <input
                    type="text"
                    value={cmsData.settings.linkedinUrl || ""}
                    onChange={(e) => {
                      setCmsData({
                        ...cmsData,
                        settings: { ...cmsData.settings, linkedinUrl: e.target.value },
                      });
                    }}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full bg-slate-100 dark:bg-surface px-4 py-2.5 rounded-xl text-xs text-sky-600 dark:text-sky-400 font-mono font-bold border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">Twitter / X Profile URL</label>
                <input
                  type="text"
                  value={cmsData.settings.twitterUrl || ""}
                  onChange={(e) => {
                    setCmsData({
                      ...cmsData,
                      settings: { ...cmsData.settings, twitterUrl: e.target.value },
                    });
                  }}
                  placeholder="https://x.com/..."
                  className="w-full bg-slate-100 dark:bg-surface px-4 py-2.5 rounded-xl text-xs text-slate-900 dark:text-white font-mono font-bold border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">Contact Email Address</label>
                <input
                  type="email"
                  value={cmsData.settings.email}
                  onChange={(e) => {
                    setCmsData({
                      ...cmsData,
                      settings: { ...cmsData.settings, email: e.target.value },
                    });
                  }}
                  className="w-full bg-slate-100 dark:bg-surface px-4 py-2.5 rounded-xl text-xs text-brand-red font-mono border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">Gemini AI Persona Prompt</label>
                <textarea
                  rows={4}
                  value={cmsData.settings.aiPrompt}
                  onChange={(e) => {
                    setCmsData({
                      ...cmsData,
                      settings: { ...cmsData.settings, aiPrompt: e.target.value },
                    });
                  }}
                  className="w-full bg-slate-100 dark:bg-surface px-4 py-2.5 rounded-xl text-xs text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none font-mono"
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
