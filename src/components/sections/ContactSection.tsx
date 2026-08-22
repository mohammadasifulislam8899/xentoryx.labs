"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, CornerDownLeft, Mail } from "lucide-react";
import { useCMS } from "@/hooks/useCMS";
import SectionTickerDivider from "@/components/layout/SectionTickerDivider";

export default function ContactSection() {
  const { email, companyName, founderName } = useCMS();
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
    <section id="contact" className="relative bg-[#0A0A0A] text-[#F5F1E8] py-24 sm:py-32 transition-colors duration-400">
      <SectionTickerDivider word="contact" className="mb-16" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="font-mono text-xs text-[#D9A648] font-bold uppercase tracking-widest">
                [ 007 // COLLABORATION DOCKET ]
              </div>
              <h2 className="font-display font-black text-5xl sm:text-7xl tracking-tighter lowercase leading-tight">
                get in touch
              </h2>
              <p className="text-sm font-sans opacity-85 leading-relaxed max-w-md">
                Have a native Android application, embedded IoT hardware telemetry system, or scalable web platform in mind? Submit your brief directly to Founder Asif.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#F5F1E8]/10">
              <div className="p-6 rounded-[28px] bg-[#141414] border border-[#F5F1E8]/10 space-y-2">
                <div className="text-[10px] font-mono text-[#D9A648] uppercase font-bold tracking-widest">
                  Direct Founder Dispatch
                </div>
                <a
                  href={`mailto:${email || "mohammadasifulislam8899@gmail.com"}`}
                  className="text-sm sm:text-base font-mono text-[#F5F1E8] hover:text-[#D9A648] font-bold break-all block transition-colors"
                >
                  {email || "mohammadasifulislam8899@gmail.com"}
                </a>
              </div>

              <div className="p-6 rounded-[28px] bg-[#141414] border border-[#F5F1E8]/10 text-xs font-mono opacity-80 space-y-1">
                <div className="font-bold text-[#F5F1E8] uppercase tracking-wider">
                  Location &bull; Availability
                </div>
                <div>Bangladesh &bull; Global Remote Technical Partnerships</div>
              </div>
            </div>
          </div>

          {/* Right Column: Rounded Form Card */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-[36px] bg-[#141414] border border-[#F5F1E8]/10 shadow-card-dark space-y-6">
              <div className="border-b border-[#F5F1E8]/10 pb-4 flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#D9A648] font-bold uppercase tracking-widest">
                  PROJECT INTAKE DOCKET
                </span>
                <span className="text-[10px] font-mono opacity-60">
                  EST. RESPONSE &lt; 24H
                </span>
              </div>

              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-[#D9A648] mx-auto" />
                  <h3 className="font-display font-bold text-2xl text-[#F5F1E8]">
                    Inquiry Docket Transmitted.
                  </h3>
                  <p className="text-xs font-mono opacity-80 max-w-sm mx-auto">
                    Thank you. Founder Asif has received your technical brief and will follow up shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full border border-[#F5F1E8]/20 hover:border-[#D9A648] text-[#F5F1E8] text-xs font-mono font-bold uppercase transition-colors"
                  >
                    Submit Another Docket
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono opacity-60 uppercase font-bold tracking-wider">
                        Client / Founder Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Sarah Connor"
                        className="w-full bg-[#0A0A0A] px-4 py-3 rounded-2xl text-xs text-[#F5F1E8] border border-[#F5F1E8]/10 focus:border-[#D9A648] focus:outline-none font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono opacity-60 uppercase font-bold tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@venture.io"
                        className="w-full bg-[#0A0A0A] px-4 py-3 rounded-2xl text-xs text-[#F5F1E8] border border-[#F5F1E8]/10 focus:border-[#D9A648] focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono opacity-60 uppercase font-bold tracking-wider">
                        Discipline / Scope
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full bg-[#0A0A0A] px-4 py-3 rounded-2xl text-xs text-[#F5F1E8] border border-[#F5F1E8]/10 focus:border-[#D9A648] focus:outline-none font-mono"
                      >
                        <option value="Android App">Native Android Application</option>
                        <option value="IoT Systems">Embedded IoT Hardware System</option>
                        <option value="Web Platform">Fullstack Web Platform</option>
                        <option value="Consulting">Technical Architecture Consulting</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono opacity-60 uppercase font-bold tracking-wider">
                        Target Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-[#0A0A0A] px-4 py-3 rounded-2xl text-xs text-[#F5F1E8] border border-[#F5F1E8]/10 focus:border-[#D9A648] focus:outline-none font-mono"
                      >
                        <option value="<$2,000">&lt; $2,000 USD</option>
                        <option value="$2,000 - $5,000">$2,000 - $5,000 USD</option>
                        <option value="$5,000 - $10,000">$5,000 - $10,000 USD</option>
                        <option value="$10,000+">$10,000+ USD</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono opacity-60 uppercase font-bold tracking-wider">
                      Technical Requirements &bull; Objective
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Detail your system architecture requirements, hardware components, or target milestone dates..."
                      className="w-full bg-[#0A0A0A] px-4 py-3 rounded-2xl text-xs text-[#F5F1E8] border border-[#F5F1E8]/10 focus:border-[#D9A648] focus:outline-none font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-full bg-[#D9A648] text-[#0A0A0A] text-xs font-mono font-bold uppercase tracking-widest hover:bg-[#E5B65A] shadow-mustard transition-all flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <span>Transmitting Docket...</span>
                    ) : (
                      <>
                        <span>Submit Collaboration Brief</span>
                        <CornerDownLeft className="w-4 h-4" />
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
