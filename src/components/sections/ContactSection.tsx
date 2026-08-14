"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Mail, MessageSquare, DollarSign, Briefcase } from "lucide-react";
import { useCMS } from "@/hooks/useCMS";

export default function ContactSection() {
  const { email } = useCMS();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Android App",
    budget: "$2,000 - $5,000",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "inquiry",
          ...formData,
        }),
      });

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        projectType: "Android App",
        budget: "$2,000 - $5,000",
        message: "",
      });
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-[#07090C] text-slate-900 dark:text-white relative border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left info column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-red text-xs font-mono text-brand-red font-semibold uppercase tracking-wider">
              INITIATE COLLABORATION
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Let's Build Something <span className="text-gradient-red">Extraordinary</span>
            </h2>

            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              Have a native Android application, IoT hardware system, or fullstack web platform in mind? Reach out directly to Founder Asif to initiate technical consultation.
            </p>

            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-red/10 border border-brand-red/30 text-brand-red flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">Direct Email</div>
                  <a href={`mailto:${email}`} className="text-sm font-mono text-brand-red hover:underline font-bold">
                    {email || "asif@xentoryx.com"}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right form column */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl space-y-6">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                  <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                    Inquiry Received!
                  </h3>
                  <p className="text-xs font-mono text-slate-600 dark:text-slate-300">
                    Thank you. Founder Asif will review your message and reply shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-brand-red text-white text-xs font-mono font-bold uppercase"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-600 dark:text-slate-400 uppercase font-bold">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-slate-100 dark:bg-surface px-4 py-3 rounded-xl text-xs text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-600 dark:text-slate-400 uppercase font-bold">Your Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-slate-100 dark:bg-surface px-4 py-3 rounded-xl text-xs text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-600 dark:text-slate-400 uppercase font-bold">Project Scope</label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full bg-slate-100 dark:bg-surface px-4 py-3 rounded-xl text-xs text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none"
                      >
                        <option value="Android App">Native Android App</option>
                        <option value="IoT Systems">IoT Hardware System</option>
                        <option value="Web Platform">Fullstack Web Platform</option>
                        <option value="Consulting">Technical Audit & Strategy</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-600 dark:text-slate-400 uppercase font-bold">Estimated Budget</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-slate-100 dark:bg-surface px-4 py-3 rounded-xl text-xs text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none"
                      >
                        <option value="<$2,000">&lt; $2,000</option>
                        <option value="$2,000 - $5,000">$2,000 - $5,000</option>
                        <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                        <option value="$10,000+">$10,000+</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-600 dark:text-slate-400 uppercase font-bold">Message Details</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your project requirements..."
                      className="w-full bg-slate-100 dark:bg-surface px-4 py-3 rounded-xl text-xs text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 focus:border-brand-red focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-red to-[#FF5E50] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-glow-red hover:shadow-glow-red-lg transition-all flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <span>Sending Inquiry...</span>
                    ) : (
                      <>
                        <span>Submit Project Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
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
