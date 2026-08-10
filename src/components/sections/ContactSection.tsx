"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Mail, Github, Linkedin, MapPin, Sparkles } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Android Development",
    budget: "$5,000 - $10,000",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const projectTypes = [
    "Android Development",
    "IoT & Hardware Systems",
    "Fullstack Web App",
    "Backend Microservices",
    "Technical Consulting",
  ];

  const budgetOptions = ["$2,000 - $5,000", "$5,000 - $10,000", "$10,000+"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      // Trigger Confetti Celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#DB4338", "#FF5E50", "#FFFFFF"],
      });
    }, 800);
  };

  return (
    <section id="contact" className="py-24 bg-[#0B0D11] relative overflow-hidden border-t border-white/5">
      {/* Background Red Ambient Circle */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Contact Information & Pitch */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-red text-xs font-mono text-brand-red font-semibold uppercase tracking-wider">
              LET'S BUILD TOGETHER
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Start Your Project With <span className="text-gradient-red">Xentoryx Labs</span>
            </h2>

            <p className="text-base text-brand-muted leading-relaxed">
              Have a native Android application, embedded IoT system, scalable backend architecture, or modern web platform in mind? Reach out directly to Founder Asif.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl glass-panel border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-brand-red/20 border border-brand-red/40 flex items-center justify-center text-brand-red">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-brand-muted uppercase">DIRECT EMAIL</div>
                  <a href="mailto:asif@xentoryx.com" className="text-sm font-bold text-white hover:text-brand-red transition-colors">
                    asif@xentoryx.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl glass-panel border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-brand-muted uppercase">HEADQUARTERS</div>
                  <div className="text-sm font-bold text-white">Xentoryx Labs Headquarters</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/Xentoryx"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl glass-panel text-white hover:text-brand-red hover:border-brand-red/40 transition-all flex items-center gap-2 text-xs font-mono"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repos</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl glass-panel text-white hover:text-brand-red hover:border-brand-red/40 transition-all flex items-center gap-2 text-xs font-mono"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </div>

          {/* Right Side: Professional Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel-red p-8 sm:p-10 rounded-3xl border border-brand-red/30 bg-[#10131B]/95 shadow-2xl relative">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">Inquiry Received!</h3>
                  <p className="text-sm text-brand-muted max-w-md mx-auto">
                    Thank you for reaching out to Xentoryx Labs. Asif will review your project parameters and respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl glass-panel text-xs font-mono text-white hover:text-brand-red"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-brand-muted uppercase">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Mercer"
                        className="w-full bg-surface px-4 py-3 rounded-xl text-sm text-white focus:outline-none focus:border-brand-red border border-white/10"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-brand-muted uppercase">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. alex@company.com"
                        className="w-full bg-surface px-4 py-3 rounded-xl text-sm text-white focus:outline-none focus:border-brand-red border border-white/10"
                      />
                    </div>
                  </div>

                  {/* Project Type Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-brand-muted uppercase">Project Scope / Category</label>
                    <div className="flex flex-wrap gap-2">
                      {projectTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, projectType: type })}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                            formData.projectType === type
                              ? "bg-brand-red text-white font-semibold shadow-glow-red"
                              : "bg-surface border border-white/10 text-brand-muted hover:text-white"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-brand-muted uppercase">Project Budget</label>
                    <div className="flex flex-wrap gap-2">
                      {budgetOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: opt })}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                            formData.budget === opt
                              ? "bg-brand-red text-white font-semibold shadow-glow-red"
                              : "bg-surface border border-white/10 text-brand-muted hover:text-white"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-brand-muted uppercase">Project Details / Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your project goals, timelines, and technical requirements..."
                      className="w-full bg-surface px-4 py-3 rounded-xl text-sm text-white focus:outline-none focus:border-brand-red border border-white/10 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-red via-[#FF5E50] to-brand-red text-white font-bold text-sm shadow-glow-red hover:shadow-glow-red-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? "Sending Message..." : "Submit Project Inquiry"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
