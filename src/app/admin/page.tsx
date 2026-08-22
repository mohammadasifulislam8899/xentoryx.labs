"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  LogOut,
  Save,
  Plus,
  Trash2,
  Layers,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  FolderKanban,
  Images,
  Sparkles,
  Film,
  User,
  Settings,
  Copy,
  Check,
  Eye,
  GripVertical,
  X,
  Loader2,
  Menu,
} from "lucide-react";
import FadeIn from "@/components/common/FadeIn";
import CloudinaryDropzone from "@/components/admin/CloudinaryDropzone";
import ThemeToggle from "@/components/common/ThemeToggle";

type SectionTab = "hero" | "marquee" | "about" | "services" | "projects" | "media" | "settings";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<SectionTab>("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);
  const [errorToast, setErrorToast] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
  }>({
    open: false,
    title: "",
    description: "",
    onConfirm: () => {},
  });

  // Media Library State
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaFilter, setMediaFilter] = useState("all");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [selectedMediaPreview, setSelectedMediaPreview] = useState<any | null>(null);

  // Full CMS State
  const [cms, setCms] = useState<any>({
    hero: {
      headline: "Hi, i'm asif",
      description: "founder building scalable software, intelligent iot hardware, and modern web experiences at xentoryx labs",
      portraitImage: "/assets/asif-hero.png",
      navLinks: [
        { label: "About", href: "#about" },
        { label: "Services", href: "#services" },
        { label: "Projects", href: "#projects" },
        { label: "Contact", href: "#contact" },
      ],
    },
    marquee: [
      { id: "m-1", title: "Dipannita ESP32 Companion", image: "/assets/projects/dipannita.jpg", row: 1 },
      { id: "m-2", title: "Jetpack Compose UI Screen", image: "/assets/founder-asif.jpg", row: 1 },
      { id: "m-3", title: "MayaEyes Eye Animation", image: "/assets/asif-workstation-3d.png", row: 1 },
      { id: "m-4", title: "Shomoy Ghor Storefront", image: "/assets/asif-avatar-3d.png", row: 2 },
      { id: "m-5", title: "XenAI Intelligence Hub", image: "/assets/asif-hero.png", row: 2 },
    ],
    about: {
      heading: "About me",
      paragraph: "I'm a solo developer building end-to-end products -- from esp32 firmware and android apps to backend architecture and web platforms. through xentoryx labs, i design intelligent iot devices, scalable microservices, and modern digital experiences. let's build something incredible together!",
      icons: {
        topLeft: "/assets/asif-workstation-3d.png",
        bottomLeft: "/assets/asif-avatar-3d.png",
        topRight: "/assets/asif-avatar.png",
        bottomRight: "/assets/founder-asif.jpg",
      },
    },
    services: [
      {
        num: "01",
        name: "Android Development",
        description: "Native Android apps built with Kotlin, Jetpack Compose, and MVVM architecture, from concept to production.",
      },
      {
        num: "02",
        name: "IoT & Embedded Systems",
        description: "ESP32 firmware, sensor integration, MQTT connectivity, and real-time device-to-cloud communication.",
      },
      {
        num: "03",
        name: "Backend Architecture",
        description: "Scalable microservice backends using Ktor, Express.js, PostgreSQL, Redis, and Docker with CI/CD pipelines.",
      },
      {
        num: "04",
        name: "AI Integration",
        description: "Embedding AI capabilities like Gemini into products, from smart assistants to automated content workflows.",
      },
      {
        num: "05",
        name: "Web Development",
        description: "Modern, SEO-optimized web platforms built with Next.js, focused on performance and clean user experience.",
      },
    ],
    projects: [
      {
        id: "proj-1",
        num: "01",
        name: "Dipannita",
        category: "Product",
        slug: "dipannita",
        liveUrl: "https://github.com/mohammadasifulislam8899",
        col1Top: { title: "GC9A01A Round Display", subtitle: "ESP32 C++ Custom Eye Animation Drivers", image: "" },
        col1Bottom: { title: "Jetpack Compose App", subtitle: "Native Android Companion & BLE", image: "" },
        col2: { title: "Autonomous Companion Device", subtitle: "End-to-end wearable IoT architecture integrating 3D CAD enclosure.", image: "" },
      },
      {
        id: "proj-2",
        num: "02",
        name: "MayaEyes",
        category: "Product",
        slug: "mayaeyes",
        liveUrl: "https://github.com/mohammadasifulislam8899",
        col1Top: { title: "Pixel Animation Frames", subtitle: "Aseprite Vector State Machine Engine", image: "" },
        col1Bottom: { title: "GC9A01A Dual Round Screen", subtitle: "Synchronous SPI Bus Refresh", image: "" },
        col2: { title: "Expressive Robot Eye Telemetry", subtitle: "Low-latency embedded animation controller for robotic companions.", image: "" },
      },
      {
        id: "proj-3",
        num: "03",
        name: "Shomoy Ghor",
        category: "Client",
        slug: "shomoy-ghor",
        liveUrl: "https://xentoryx.com",
        col1Top: { title: "Bengali Watch Storefront", subtitle: "Next.js 15 App Router & SEO Architecture", image: "" },
        col1Bottom: { title: "bKash & Nagad Checkout", subtitle: "Automated Payment Webhook Pipeline", image: "" },
        col2: { title: "High-Conversion Retail Experience", subtitle: "Production e-commerce platform built for extreme speed.", image: "" },
      },
    ],
    settings: {
      siteTitle: "Asif -- Founder & IoT Engineer | Xentoryx Labs",
      siteDescription: "Founder building scalable software, intelligent IoT hardware, and modern web experiences at Xentoryx Labs.",
      ogImage: "/assets/founder-asif.jpg",
      favicon: "/favicon.ico",
      email: "contact@xentoryxlabs.site",
      contactButtonText: "Contact Me",
      contactButtonLink: "#contact",
      socials: {
        github: "https://github.com/mohammadasifulislam8899",
        linkedin: "https://linkedin.com/in/mohammadasifulislam",
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
      },
      seo: {
        keywords: "Asif, Founder, IoT Engineer, Mohammad Asiful Islam, Xentoryx Labs, ESP32, Android Developer, Kotlin, Next.js",
      },
    },
  });

  useEffect(() => {
    const storedAuth = sessionStorage.getItem("xentoryx_admin_key");
    if (storedAuth) {
      setAuthPassword(storedAuth);
      fetchCMS(storedAuth);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCMS = async (key: string) => {
    try {
      const res = await fetch("/api/admin/data", {
        headers: { Authorization: `Bearer ${key}` },
      });
      if (res.ok) {
        const payload = await res.json();
        if (payload && Object.keys(payload).length > 0) {
          setCms((prev: any) => ({
            ...prev,
            ...payload,
            hero: { ...prev.hero, ...(payload.hero || payload.settings?.hero || {}) },
            about: { ...prev.about, ...(payload.about || {}) },
            marquee: payload.marquee && payload.marquee.length > 0 ? payload.marquee : prev.marquee,
            services: payload.services && payload.services.length > 0 ? payload.services : prev.services,
            projects: payload.projects && payload.projects.length > 0 ? payload.projects : prev.projects,
            settings: { ...prev.settings, ...(payload.settings || {}) },
          }));
        }
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error("Failed to load CMS:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMediaLibrary = async () => {
    setMediaLoading(true);
    try {
      const res = await fetch(`/api/admin/upload?folder=${mediaFilter}`);
      const data = await res.json();
      if (data.success && data.resources) {
        setMediaItems(data.resources);
      }
    } catch (err) {
      console.error("Failed to fetch media library", err);
    } finally {
      setMediaLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && activeTab === "media") {
      fetchMediaLibrary();
    }
  }, [isAuthenticated, activeTab, mediaFilter]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: authPassword }),
      });

      const resData = await res.json();
      if (res.ok && resData.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem("xentoryx_admin_key", authPassword);
        fetchCMS(authPassword);
      } else {
        setAuthError(resData.message || "Invalid Admin Password");
        setLoading(false);
      }
    } catch (err) {
      setAuthError("Authentication connection failed");
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("xentoryx_admin_key");
    setIsAuthenticated(false);
    setAuthPassword("");
  };

  const handleSave = async () => {
    setSaving(true);
    setErrorToast(null);
    setSaveToast(null);

    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authPassword}`,
        },
        body: JSON.stringify({
          type: "updateAll",
          data: cms,
        }),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setSaveToast("Changes successfully saved to MongoDB & Cloudinary!");
        setHasUnsavedChanges(false);
        setTimeout(() => setSaveToast(null), 4000);
      } else {
        setErrorToast(result.error || "Failed to commit changes");
      }
    } catch (err: any) {
      setErrorToast(err.message || "Network error while publishing");
    } finally {
      setSaving(false);
    }
  };

  const updateSection = (section: string, field: string, value: any) => {
    setCms((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    setHasUnsavedChanges(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[var(--border-color)] border-t-[var(--text-heading-gradient-end)] rounded-full animate-spin" />
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-heading-gradient-end)]">
            Opening Xentoryx Admin Console...
          </span>
        </div>
      </div>
    );
  }

  // ==========================================
  // 1. LOGIN SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex items-center justify-center p-4 selection:bg-[var(--text-heading-gradient-end)] selection:text-[var(--bg-primary)] font-sans transition-colors duration-300">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-[28px] sm:rounded-[32px] p-6 sm:p-10 shadow-2xl space-y-6 sm:space-y-8"
        >
          <div className="text-center space-y-2">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[var(--border-subtle)] border border-[var(--border-color)] flex items-center justify-center mx-auto text-[var(--text-heading-gradient-end)]">
              <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h1 className="hero-heading font-black text-2xl sm:text-4xl uppercase tracking-tight">
              Admin Access
            </h1>
            <p className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">
              Xentoryx Labs // Content Management System
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-heading-gradient-end)] block">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="Enter Master Password..."
                  className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-full px-5 py-3.5 text-sm text-[var(--text-primary)] font-sans focus:outline-none focus:border-[var(--text-heading-gradient-end)] transition-colors"
                  required
                />
                <Lock className="w-4 h-4 text-[var(--text-muted)] absolute right-5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {authError && (
              <div className="flex items-center gap-2 text-rose-400 text-xs font-mono">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              style={{
                background: "var(--accent-gradient)",
                boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
                outline: "2px solid white",
                outlineOffset: "-3px",
              }}
              className="w-full py-3.5 sm:py-4 rounded-full text-white font-medium uppercase tracking-widest text-xs hover:scale-102 active:scale-98 transition-all cursor-pointer shadow-xl"
            >
              Enter Dashboard
            </button>
          </form>

          <div className="text-center pt-2 flex items-center justify-between">
            <Link
              href="/"
              className="text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              &larr; Return to Public Website
            </Link>

            <ThemeToggle size="sm" />
          </div>
        </motion.div>
      </div>
    );
  }

  // ==========================================
  // 2. DASHBOARD SHELL
  // ==========================================
  const navItems: { id: SectionTab; label: string; icon: any }[] = [
    { id: "hero", label: "Hero Section", icon: Sparkles },
    { id: "marquee", label: "Marquee Gallery", icon: Film },
    { id: "about", label: "About Section", icon: User },
    { id: "services", label: "Services List", icon: Layers },
    { id: "projects", label: "Projects Archive", icon: FolderKanban },
    { id: "media", label: "Media Library", icon: Images },
    { id: "settings", label: "Site Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--text-heading-gradient-end)] selection:text-[var(--bg-primary)] font-sans flex flex-col md:flex-row transition-colors duration-300">
      
      {/* MOBILE TOP BAR (md:hidden) with Hamburger Drawer Trigger */}
      <div className="md:hidden sticky top-0 z-40 bg-[var(--bg-primary)]/95 backdrop-blur-md border-b border-[var(--border-color)] px-4 py-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(true)}
          className="p-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] active:scale-95"
          aria-label="Open navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link href="/" className="flex items-center gap-1.5">
          <span className="font-black tracking-tighter text-lg text-[var(--text-primary)]">XENTORYX</span>
          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[var(--border-subtle)] text-[var(--text-heading-gradient-end)] border border-[var(--border-color)]">
            CMS
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle size="sm" />
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              background: "var(--accent-gradient)",
              boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
              outline: "2px solid white",
              outlineOffset: "-3px",
            }}
            className="px-3.5 py-1.5 rounded-full text-white text-[11px] font-medium uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* MOBILE SLIDE-IN DRAWER */}
      {mobileDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex">
          <div className="w-[280px] bg-[var(--bg-primary)] border-r border-[var(--border-color)] p-5 flex flex-col justify-between h-full animate-in slide-in-from-left duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
                <div className="flex items-center gap-2">
                  <span className="font-black text-lg text-[var(--text-primary)]">XENTORYX</span>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[var(--border-subtle)] text-[var(--text-heading-gradient-end)]">
                    CMS
                  </span>
                </div>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1.5 rounded-lg border border-[var(--border-color)] text-[var(--text-primary)]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileDrawerOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium uppercase tracking-wider transition-all ${
                        isActive
                          ? "bg-[var(--bg-secondary)] text-[var(--text-primary)] border-l-4 border-l-[#B600A8] font-bold shadow-sm"
                          : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]/50"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? "text-[var(--text-heading-gradient-end)]" : "text-[var(--text-muted)]"}`} />
                        <span>{item.label}</span>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between">
              <Link href="/" target="_blank" className="text-xs font-mono text-[var(--text-secondary)] flex items-center gap-1">
                <span>Live Site</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-rose-400 hover:bg-rose-950/30"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileDrawerOpen(false)} />
        </div>
      )}

      {/* DESKTOP SIDEBAR (Fixed w-64, hidden on mobile) */}
      <aside className="hidden md:flex w-64 bg-[var(--bg-primary)] border-r border-[var(--border-color)] p-6 flex-col justify-between shrink-0 h-screen sticky top-0">
        <div className="space-y-8">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-black tracking-tighter text-xl text-[var(--text-primary)]">
              XENTORYX
            </span>
            <span className="text-[10px] font-mono font-bold tracking-widest px-1.5 py-0.5 rounded bg-[var(--border-subtle)] text-[var(--text-heading-gradient-end)] border border-[var(--border-color)]">
              CMS
            </span>
          </Link>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? "bg-[var(--bg-secondary)] text-[var(--text-primary)] border-l-4 border-l-[#B600A8] font-bold shadow-md"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-[var(--text-heading-gradient-end)]" : "text-[var(--text-muted)]"}`} />
                    <span>{item.label}</span>
                  </div>
                  {hasUnsavedChanges && isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#D9A648] animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-[var(--border-color)] flex items-center justify-between">
          <div className="text-[11px] font-mono text-[var(--text-muted)]">
            Cloudinary Active
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded-xl text-[var(--text-secondary)] hover:text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-h-screen">
        
        {/* DESKTOP TOP BAR (hidden on mobile) */}
        <header className="hidden md:flex sticky top-0 z-30 bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border-color)] px-6 sm:px-10 py-4 items-center justify-between">
          <div>
            <h2 className="hero-heading font-black text-xl sm:text-2xl uppercase tracking-tight">
              {navItems.find((n) => n.id === activeTab)?.label}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="rounded-full border-2 border-[var(--border-color)] text-[var(--text-primary)] px-5 py-2 text-xs font-medium uppercase tracking-widest hover:bg-[var(--btn-ghost-hover)] transition-colors items-center gap-1.5 inline-flex"
            >
              <span>View Live Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <ThemeToggle size="md" />

            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                background: "var(--accent-gradient)",
                boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
                outline: "2px solid white",
                outlineOffset: "-3px",
              }}
              className="px-6 py-2.5 rounded-full text-white text-xs font-medium uppercase tracking-widest flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* TOAST ALERTS */}
        <AnimatePresence>
          {saveToast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-16 sm:top-20 right-4 sm:right-6 z-50 p-4 rounded-2xl bg-[var(--bg-secondary)] border-l-4 border-l-emerald-500 border border-[var(--border-color)] shadow-2xl flex items-center gap-3 text-xs font-mono text-emerald-400"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{saveToast}</span>
            </motion.div>
          )}

          {errorToast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-16 sm:top-20 right-4 sm:right-6 z-50 p-4 rounded-2xl bg-[var(--bg-secondary)] border-l-4 border-l-rose-500 border border-[var(--border-color)] shadow-2xl flex items-center gap-3 text-xs font-mono text-rose-400"
            >
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorToast}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MAIN BODY CONTAINER */}
        <main className="flex-1 px-4 sm:px-8 md:px-10 py-6 sm:py-10 max-w-5xl w-full mx-auto space-y-6 sm:space-y-10">
          
          {/* ========================================== */}
          {/* 1. HERO EDITOR */}
          {/* ========================================== */}
          {activeTab === "hero" && (
            <FadeIn delay={0.05} className="space-y-6 sm:space-y-8">
              <div className="bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 space-y-6 shadow-2xl">
                <div className="space-y-1">
                  <h3 className="hero-heading font-black text-xl sm:text-2xl uppercase tracking-tight">
                    Hero Section Configuration
                  </h3>
                  <p className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">
                    Edit the main landing viewport headline, description, and high-res portrait.
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-heading-gradient-end)] block">
                      Main Headline Text
                    </label>
                    <input
                      type="text"
                      value={cms.hero?.headline || ""}
                      onChange={(e) => updateSection("hero", "headline", e.target.value)}
                      className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-2xl px-4 py-3 text-sm text-[var(--text-primary)] font-sans focus:outline-none focus:border-[var(--text-heading-gradient-end)]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-heading-gradient-end)] block">
                      Description Monograph
                    </label>
                    <textarea
                      rows={3}
                      value={cms.hero?.description || ""}
                      onChange={(e) => updateSection("hero", "description", e.target.value)}
                      className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-2xl p-4 text-sm text-[var(--text-primary)] font-sans focus:outline-none focus:border-[var(--text-heading-gradient-end)] leading-relaxed"
                    />
                  </div>

                  <CloudinaryDropzone
                    label="Hero Portrait Photo (Cloudinary Direct Upload)"
                    folder="xentoryx/hero"
                    aspect="aspect-[4/3] max-w-md mx-auto"
                    value={cms.hero?.portraitImage || ""}
                    onChange={(url) => updateSection("hero", "portraitImage", url)}
                    helpText="Auto-optimized format: WebP / AVIF"
                  />
                </div>
              </div>
            </FadeIn>
          )}

          {/* ========================================== */}
          {/* 2. MARQUEE EDITOR */}
          {/* ========================================== */}
          {activeTab === "marquee" && (
            <FadeIn delay={0.05} className="space-y-6 sm:space-y-8">
              <div className="bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 space-y-6 shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="hero-heading font-black text-xl sm:text-2xl uppercase tracking-tight">
                      Marquee Parallax Gallery
                    </h3>
                    <p className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">
                      Manage tiles scrolling across Row 1 (Right) and Row 2 (Left).
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const newTile = {
                        id: `m-${Date.now()}`,
                        title: "New Hardware Prototype",
                        image: "/assets/asif-hero.png",
                        row: 1,
                      };
                      setCms({ ...cms, marquee: [...(cms.marquee || []), newTile] });
                      setHasUnsavedChanges(true);
                    }}
                    className="px-4 py-2.5 rounded-full border-2 border-[var(--border-color)] hover:bg-[var(--btn-ghost-hover)] text-xs font-medium uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Marquee Tile</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {(cms.marquee || []).map((item: any, idx: number) => (
                    <div
                      key={item.id || idx}
                      className="bg-[var(--bg-input)] border border-[var(--border-color)] rounded-[20px] sm:rounded-[24px] p-4 sm:p-5 space-y-4 relative shadow-lg"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-[var(--text-heading-gradient-end)]">
                          #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...cms.marquee];
                              updated[idx].row = updated[idx].row === 1 ? 2 : 1;
                              setCms({ ...cms, marquee: updated });
                              setHasUnsavedChanges(true);
                            }}
                            className="px-3 py-1 rounded-full text-[10px] font-mono uppercase bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)]"
                          >
                            Row {item.row || 1}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setConfirmModal({
                                open: true,
                                title: "Delete Marquee Tile?",
                                description: `Are you sure you want to remove "${item.title}" from the marquee?`,
                                onConfirm: () => {
                                  const updated = [...cms.marquee];
                                  updated.splice(idx, 1);
                                  setCms({ ...cms, marquee: updated });
                                  setHasUnsavedChanges(true);
                                },
                              });
                            }}
                            className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <CloudinaryDropzone
                        folder="xentoryx/marquee"
                        aspect="aspect-video"
                        value={item.image || ""}
                        onChange={(url) => {
                          const updated = [...cms.marquee];
                          updated[idx].image = url;
                          setCms({ ...cms, marquee: updated });
                          setHasUnsavedChanges(true);
                        }}
                      />

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-[var(--text-secondary)]">
                          Tile Caption Title
                        </label>
                        <input
                          type="text"
                          value={item.title || ""}
                          onChange={(e) => {
                            const updated = [...cms.marquee];
                            updated[idx].title = e.target.value;
                            setCms({ ...cms, marquee: updated });
                            setHasUnsavedChanges(true);
                          }}
                          className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-2 text-xs text-[var(--text-primary)] font-sans focus:outline-none focus:border-[var(--text-heading-gradient-end)]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          {/* ========================================== */}
          {/* 3. ABOUT EDITOR */}
          {/* ========================================== */}
          {activeTab === "about" && (
            <FadeIn delay={0.05} className="space-y-6 sm:space-y-8">
              <div className="bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 space-y-6 shadow-2xl">
                <div className="space-y-1">
                  <h3 className="hero-heading font-black text-xl sm:text-2xl uppercase tracking-tight">
                    About Section Configuration
                  </h3>
                  <p className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">
                    Edit the animated character-reveal monograph and 4 corner tech badge icons.
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-heading-gradient-end)] block">
                      Heading Title
                    </label>
                    <input
                      type="text"
                      value={cms.about?.heading || "About me"}
                      onChange={(e) => updateSection("about", "heading", e.target.value)}
                      className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-2xl px-4 py-3 text-sm text-[var(--text-primary)] font-sans focus:outline-none focus:border-[var(--text-heading-gradient-end)]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-heading-gradient-end)] block">
                      Animated Reveal Paragraph
                    </label>
                    <textarea
                      rows={5}
                      value={cms.about?.paragraph || ""}
                      onChange={(e) => updateSection("about", "paragraph", e.target.value)}
                      className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-2xl p-4 text-sm text-[var(--text-primary)] font-sans focus:outline-none focus:border-[var(--text-heading-gradient-end)] leading-relaxed"
                    />
                  </div>

                  <div className="pt-4 space-y-3">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-heading-gradient-end)] block">
                      4 Corner Tech Badge Icons
                    </label>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                      <div>
                        <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase block mb-1.5">Top-Left</span>
                        <CloudinaryDropzone
                          folder="xentoryx/about"
                          aspect="aspect-square"
                          value={cms.about?.icons?.topLeft || ""}
                          onChange={(url) => {
                            setCms({
                              ...cms,
                              about: { ...cms.about, icons: { ...(cms.about?.icons || {}), topLeft: url } },
                            });
                            setHasUnsavedChanges(true);
                          }}
                        />
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase block mb-1.5">Top-Right</span>
                        <CloudinaryDropzone
                          folder="xentoryx/about"
                          aspect="aspect-square"
                          value={cms.about?.icons?.topRight || ""}
                          onChange={(url) => {
                            setCms({
                              ...cms,
                              about: { ...cms.about, icons: { ...(cms.about?.icons || {}), topRight: url } },
                            });
                            setHasUnsavedChanges(true);
                          }}
                        />
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase block mb-1.5">Bottom-Left</span>
                        <CloudinaryDropzone
                          folder="xentoryx/about"
                          aspect="aspect-square"
                          value={cms.about?.icons?.bottomLeft || ""}
                          onChange={(url) => {
                            setCms({
                              ...cms,
                              about: { ...cms.about, icons: { ...(cms.about?.icons || {}), bottomLeft: url } },
                            });
                            setHasUnsavedChanges(true);
                          }}
                        />
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase block mb-1.5">Bottom-Right</span>
                        <CloudinaryDropzone
                          folder="xentoryx/about"
                          aspect="aspect-square"
                          value={cms.about?.icons?.bottomRight || ""}
                          onChange={(url) => {
                            setCms({
                              ...cms,
                              about: { ...cms.about, icons: { ...(cms.about?.icons || {}), bottomRight: url } },
                            });
                            setHasUnsavedChanges(true);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          )}

          {/* ========================================== */}
          {/* 4. SERVICES EDITOR */}
          {/* ========================================== */}
          {activeTab === "services" && (
            <FadeIn delay={0.05} className="space-y-6 sm:space-y-8">
              <div className="bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 space-y-6 shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="hero-heading font-black text-xl sm:text-2xl uppercase tracking-tight">
                      Services & Engineering Capabilities
                    </h3>
                    <p className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">
                      Repeatable engineering practices listed with bold numbered indexes.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const nextNum = (cms.services?.length || 0) + 1;
                      const formattedNum = nextNum < 10 ? `0${nextNum}` : `${nextNum}`;
                      const newSvc = {
                        num: formattedNum,
                        name: "New Discipline Architecture",
                        description: "High-performance specialized software and hardware engineering solution.",
                      };
                      setCms({ ...cms, services: [...(cms.services || []), newSvc] });
                      setHasUnsavedChanges(true);
                    }}
                    className="px-4 py-2.5 rounded-full border-2 border-[var(--border-color)] hover:bg-[var(--btn-ghost-hover)] text-xs font-medium uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Service</span>
                  </button>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {(cms.services || []).map((svc: any, idx: number) => (
                    <div
                      key={idx}
                      className="bg-[var(--bg-input)] border border-[var(--border-color)] rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 space-y-3 sm:space-y-4 shadow-lg"
                    >
                      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                        <div className="flex items-center gap-3">
                          <GripVertical className="w-4 h-4 text-[var(--text-muted)]" />
                          <span className="font-mono text-base sm:text-lg font-black text-[var(--text-heading-gradient-end)]">
                            {svc.num || `0${idx + 1}`}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setConfirmModal({
                              open: true,
                              title: "Delete Service Discipline?",
                              description: `Are you sure you want to delete "${svc.name}"?`,
                              onConfirm: () => {
                                const updated = [...cms.services];
                                updated.splice(idx, 1);
                                setCms({ ...cms, services: updated });
                                setHasUnsavedChanges(true);
                              },
                            });
                          }}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase text-[var(--text-secondary)]">Service Name</label>
                          <input
                            type="text"
                            value={svc.name || ""}
                            onChange={(e) => {
                              const updated = [...cms.services];
                              updated[idx].name = e.target.value;
                              setCms({ ...cms, services: updated });
                              setHasUnsavedChanges(true);
                            }}
                            className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-3.5 py-2 text-xs text-[var(--text-primary)]"
                          />
                        </div>

                        <div className="sm:col-span-2 space-y-1">
                          <label className="text-[10px] font-mono uppercase text-[var(--text-secondary)]">Detailed Description</label>
                          <input
                            type="text"
                            value={svc.description || ""}
                            onChange={(e) => {
                              const updated = [...cms.services];
                              updated[idx].description = e.target.value;
                              setCms({ ...cms, services: updated });
                              setHasUnsavedChanges(true);
                            }}
                            className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-3.5 py-2 text-xs text-[var(--text-primary)]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          {/* ========================================== */}
          {/* 5. PROJECTS EDITOR */}
          {/* ========================================== */}
          {activeTab === "projects" && (
            <FadeIn delay={0.05} className="space-y-6 sm:space-y-8">
              <div className="bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 space-y-6 shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="hero-heading font-black text-xl sm:text-2xl uppercase tracking-tight">
                      Projects & Sticky Cards
                    </h3>
                    <p className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">
                      Configure fullstack products, 3 image slots, and live repository links.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const nextNum = (cms.projects?.length || 0) + 1;
                      const formattedNum = nextNum < 10 ? `0${nextNum}` : `${nextNum}`;
                      const newProj = {
                        id: `proj-${Date.now()}`,
                        num: formattedNum,
                        name: "New Architectural System",
                        category: "Product",
                        slug: `project-${Date.now()}`,
                        liveUrl: "https://github.com/mohammadasifulislam8899",
                        col1Top: { title: "Hardware Driver", subtitle: "ESP32 C++ Custom Architecture", image: "" },
                        col1Bottom: { title: "Mobile Companion", subtitle: "Jetpack Compose Native Android", image: "" },
                        col2: { title: "Full System Deployment", subtitle: "End-to-end wearable IoT architecture.", image: "" },
                      };
                      setCms({ ...cms, projects: [...(cms.projects || []), newProj] });
                      setHasUnsavedChanges(true);
                    }}
                    className="px-4 py-2.5 rounded-full border-2 border-[var(--border-color)] hover:bg-[var(--btn-ghost-hover)] text-xs font-medium uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Project Card</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {(cms.projects || []).map((proj: any, idx: number) => (
                    <div
                      key={proj.id || idx}
                      className="bg-[var(--bg-input)] border border-[var(--border-color)] rounded-[20px] sm:rounded-[28px] p-5 sm:p-8 space-y-5 shadow-xl relative"
                    >
                      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-lg font-black text-[var(--text-heading-gradient-end)]">
                            {proj.num || `0${idx + 1}`}
                          </span>
                          <h4 className="font-bold text-base sm:text-lg text-[var(--text-primary)]">{proj.name}</h4>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setConfirmModal({
                              open: true,
                              title: "Delete Project?",
                              description: `Are you sure you want to remove project "${proj.name}"?`,
                              onConfirm: () => {
                                const updated = [...cms.projects];
                                updated.splice(idx, 1);
                                setCms({ ...cms, projects: updated });
                                setHasUnsavedChanges(true);
                              },
                            });
                          }}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase text-[var(--text-secondary)]">Project Title</label>
                          <input
                            type="text"
                            value={proj.name || ""}
                            onChange={(e) => {
                              const updated = [...cms.projects];
                              updated[idx].name = e.target.value;
                              setCms({ ...cms, projects: updated });
                              setHasUnsavedChanges(true);
                            }}
                            className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-3.5 py-2 text-xs text-[var(--text-primary)]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase text-[var(--text-secondary)]">Category</label>
                          <select
                            value={proj.category || "Product"}
                            onChange={(e) => {
                              const updated = [...cms.projects];
                              updated[idx].category = e.target.value;
                              setCms({ ...cms, projects: updated });
                              setHasUnsavedChanges(true);
                            }}
                            className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-3.5 py-2 text-xs text-[var(--text-primary)]"
                          >
                            <option value="Product">Product</option>
                            <option value="Client">Client</option>
                            <option value="Personal">Personal</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase text-[var(--text-secondary)]">Live URL</label>
                          <input
                            type="text"
                            value={proj.liveUrl || ""}
                            onChange={(e) => {
                              const updated = [...cms.projects];
                              updated[idx].liveUrl = e.target.value;
                              setCms({ ...cms, projects: updated });
                              setHasUnsavedChanges(true);
                            }}
                            className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-3.5 py-2 text-xs text-[var(--text-primary)]"
                          />
                        </div>
                      </div>

                      <div className="space-y-3 pt-2">
                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-heading-gradient-end)] block">
                          3 Project Visuals (Cloudinary Upload Slots)
                        </label>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase block">Slot 1: Col 1 Top</span>
                            <CloudinaryDropzone
                              folder={`xentoryx/projects/${proj.slug || "project"}`}
                              aspect="aspect-video"
                              value={proj.col1Top?.image || ""}
                              onChange={(url) => {
                                const updated = [...cms.projects];
                                updated[idx].col1Top = { ...(updated[idx].col1Top || {}), image: url };
                                setCms({ ...cms, projects: updated });
                                setHasUnsavedChanges(true);
                              }}
                            />
                            <input
                              type="text"
                              placeholder="Title"
                              value={proj.col1Top?.title || ""}
                              onChange={(e) => {
                                const updated = [...cms.projects];
                                updated[idx].col1Top = { ...(updated[idx].col1Top || {}), title: e.target.value };
                                setCms({ ...cms, projects: updated });
                                setHasUnsavedChanges(true);
                              }}
                              className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg px-3 py-1 text-xs text-[var(--text-primary)]"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase block">Slot 2: Col 1 Bottom</span>
                            <CloudinaryDropzone
                              folder={`xentoryx/projects/${proj.slug || "project"}`}
                              aspect="aspect-video"
                              value={proj.col1Bottom?.image || ""}
                              onChange={(url) => {
                                const updated = [...cms.projects];
                                updated[idx].col1Bottom = { ...(updated[idx].col1Bottom || {}), image: url };
                                setCms({ ...cms, projects: updated });
                                setHasUnsavedChanges(true);
                              }}
                            />
                            <input
                              type="text"
                              placeholder="Title"
                              value={proj.col1Bottom?.title || ""}
                              onChange={(e) => {
                                const updated = [...cms.projects];
                                updated[idx].col1Bottom = { ...(updated[idx].col1Bottom || {}), title: e.target.value };
                                setCms({ ...cms, projects: updated });
                                setHasUnsavedChanges(true);
                              }}
                              className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg px-3 py-1 text-xs text-[var(--text-primary)]"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase block">Slot 3: Col 2 Tall Feature</span>
                            <CloudinaryDropzone
                              folder={`xentoryx/projects/${proj.slug || "project"}`}
                              aspect="aspect-video"
                              value={proj.col2?.image || ""}
                              onChange={(url) => {
                                const updated = [...cms.projects];
                                updated[idx].col2 = { ...(updated[idx].col2 || {}), image: url };
                                setCms({ ...cms, projects: updated });
                                setHasUnsavedChanges(true);
                              }}
                            />
                            <input
                              type="text"
                              placeholder="Title"
                              value={proj.col2?.title || ""}
                              onChange={(e) => {
                                const updated = [...cms.projects];
                                updated[idx].col2 = { ...(updated[idx].col2 || {}), title: e.target.value };
                                setCms({ ...cms, projects: updated });
                                setHasUnsavedChanges(true);
                              }}
                              className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg px-3 py-1 text-xs text-[var(--text-primary)]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          {/* ========================================== */}
          {/* 6. MEDIA LIBRARY */}
          {/* ========================================== */}
          {activeTab === "media" && (
            <FadeIn delay={0.05} className="space-y-6 sm:space-y-8">
              <div className="bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 space-y-6 shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="hero-heading font-black text-xl sm:text-2xl uppercase tracking-tight">
                      Cloudinary Media Library
                    </h3>
                    <p className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">
                      Browse and manage all assets stored in Cloudinary ({mediaItems.length} items).
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {["all", "hero", "marquee", "about", "projects"].map((f) => (
                      <button
                        key={f}
                        onClick={() => setMediaFilter(f === "all" ? "all" : `xentoryx/${f}`)}
                        className={`px-3 py-1 rounded-full text-[11px] font-mono uppercase transition-all ${
                          mediaFilter === f || mediaFilter === `xentoryx/${f}`
                            ? "bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold"
                            : "bg-[var(--bg-input)] text-[var(--text-secondary)]"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-input)] border border-[var(--border-color)]">
                  <CloudinaryDropzone
                    label="Upload New Media File Directly to Cloudinary"
                    folder="xentoryx/general"
                    aspect="aspect-[5/1]"
                    value=""
                    onChange={() => fetchMediaLibrary()}
                  />
                </div>

                {mediaLoading ? (
                  <div className="py-16 flex flex-col items-center justify-center gap-3">
                    <Loader2 className="w-8 h-8 animate-spin text-[var(--text-heading-gradient-end)]" />
                    <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
                      Syncing with Cloudinary API...
                    </span>
                  </div>
                ) : mediaItems.length === 0 ? (
                  <div className="p-10 text-center bg-[var(--bg-input)] rounded-2xl border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-muted)]">
                    No media items found in this Cloudinary folder.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                    {mediaItems.map((item) => (
                      <div
                        key={item.public_id}
                        className="group relative bg-[var(--bg-input)] border border-[var(--border-color)] rounded-2xl overflow-hidden aspect-square shadow-md flex flex-col justify-end"
                      >
                        <Image
                          src={item.secure_url}
                          alt={item.public_id}
                          fill
                          unoptimized
                          className="object-cover"
                        />

                        <div className="absolute inset-0 bg-[var(--bg-primary)]/90 opacity-0 group-hover:opacity-100 transition-opacity p-2 sm:p-3 flex flex-col justify-between backdrop-blur-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-mono text-[var(--text-heading-gradient-end)] truncate max-w-[75%]">
                              {item.format?.toUpperCase()}
                            </span>
                            <button
                              onClick={() => {
                                setConfirmModal({
                                  open: true,
                                  title: "Delete from Cloudinary?",
                                  description: `Permanently remove "${item.public_id}"?`,
                                  onConfirm: async () => {
                                    await fetch("/api/admin/upload", {
                                      method: "DELETE",
                                      headers: { "Content-Type": "application/json" },
                                      body: JSON.stringify({ public_id: item.public_id }),
                                    });
                                    fetchMediaLibrary();
                                  },
                                });
                              }}
                              className="p-1 rounded text-rose-400"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => copyToClipboard(item.secure_url)}
                              className="flex-1 py-1.5 rounded-lg bg-[var(--border-subtle)] text-[10px] font-mono font-bold uppercase flex items-center justify-center gap-1"
                            >
                              {copiedUrl === item.secure_url ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedUrl === item.secure_url ? "Copied" : "Copy"}</span>
                            </button>
                            <button
                              onClick={() => setSelectedMediaPreview(item)}
                              className="p-1.5 rounded-lg bg-[var(--border-subtle)]"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </FadeIn>
          )}

          {/* ========================================== */}
          {/* 7. SETTINGS PAGE */}
          {/* ========================================== */}
          {activeTab === "settings" && (
            <FadeIn delay={0.05} className="space-y-6 sm:space-y-8">
              <div className="bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 space-y-6 shadow-2xl">
                <div className="space-y-1">
                  <h3 className="hero-heading font-black text-xl sm:text-2xl uppercase tracking-tight">
                    Site Settings & SEO Engine
                  </h3>
                  <p className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">
                    Configure global metadata, OpenGraph preview cards, and social URLs.
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-heading-gradient-end)] block">
                        Page Title
                      </label>
                      <input
                        type="text"
                        value={cms.settings?.siteTitle || ""}
                        onChange={(e) => updateSection("settings", "siteTitle", e.target.value)}
                        className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-2xl px-4 py-2.5 text-sm text-[var(--text-primary)]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-heading-gradient-end)] block">
                        Contact Email
                      </label>
                      <input
                        type="text"
                        value={cms.settings?.email || ""}
                        onChange={(e) => updateSection("settings", "email", e.target.value)}
                        className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-2xl px-4 py-2.5 text-sm text-[var(--text-primary)]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-heading-gradient-end)] block">
                      SEO Description
                    </label>
                    <textarea
                      rows={2}
                      value={cms.settings?.siteDescription || ""}
                      onChange={(e) => updateSection("settings", "siteDescription", e.target.value)}
                      className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-2xl p-4 text-sm text-[var(--text-primary)]"
                    />
                  </div>

                  <CloudinaryDropzone
                    label="OpenGraph Social Banner Image"
                    folder="xentoryx/seo"
                    aspect="aspect-[1.91/1] max-w-md"
                    value={cms.settings?.ogImage || ""}
                    onChange={(url) => updateSection("settings", "ogImage", url)}
                  />

                  <div className="pt-3 space-y-3">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-heading-gradient-end)] block">
                      Social Network Profiles
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase block">GitHub</span>
                        <input
                          type="text"
                          value={cms.settings?.socials?.github || ""}
                          onChange={(e) => {
                            setCms({
                              ...cms,
                              settings: { ...cms.settings, socials: { ...(cms.settings?.socials || {}), github: e.target.value } },
                            });
                            setHasUnsavedChanges(true);
                          }}
                          className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl px-3.5 py-2 text-xs text-[var(--text-primary)]"
                        />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase block">LinkedIn</span>
                        <input
                          type="text"
                          value={cms.settings?.socials?.linkedin || ""}
                          onChange={(e) => {
                            setCms({
                              ...cms,
                              settings: { ...cms.settings, socials: { ...(cms.settings?.socials || {}), linkedin: e.target.value } },
                            });
                            setHasUnsavedChanges(true);
                          }}
                          className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl px-3.5 py-2 text-xs text-[var(--text-primary)]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          )}

        </main>
      </div>

      {/* CONFIRMATION MODAL */}
      {confirmModal.open && (
        <div className="fixed inset-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h4 className="font-bold text-base sm:text-lg text-[var(--text-primary)]">{confirmModal.title}</h4>
            <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
              {confirmModal.description}
            </p>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setConfirmModal({ ...confirmModal, open: false })}
                className="px-4 py-2 rounded-full border border-[var(--border-color)] text-xs font-mono uppercase text-[var(--text-primary)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  confirmModal.onConfirm();
                  setConfirmModal({ ...confirmModal, open: false });
                }}
                className="px-4 py-2 rounded-full bg-rose-600 text-white text-xs font-mono uppercase font-bold"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULL SIZE MEDIA PREVIEW MODAL */}
      {selectedMediaPreview && (
        <div
          onClick={() => setSelectedMediaPreview(null)}
          className="fixed inset-0 z-50 bg-[var(--bg-primary)]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <div className="relative max-w-4xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center">
            <button
              onClick={() => setSelectedMediaPreview(null)}
              className="absolute top-0 right-0 p-2 text-[var(--text-primary)]"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full h-full max-h-[75vh]">
              <Image
                src={selectedMediaPreview.secure_url}
                alt="Full preview"
                fill
                unoptimized
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
