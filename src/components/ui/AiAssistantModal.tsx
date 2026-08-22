"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage } from "@/types";
import { SUGGESTED_QUESTIONS } from "@/data/aiContext";
import { Bot, X, Send, RefreshCw, User, Sparkles, CornerDownLeft } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AiAssistantModal({ isOpen, onClose }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      sender: "asif-ai",
      text: "Welcome to the Xentoryx Studio Intelligence Interface. I am XenAI, trained on Founder Asif's engineering methodology, IoT telemetry architecture, Android systems, and research catalog. How can I assist your inquiry today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const messageText = textToSend || inputValue;
    if (!messageText.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "asif-ai",
        text: data.reply || "Unable to synthesize response. Please contact founder directly.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("AI Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "asif-ai",
          text: "Telemetry link interrupted. Please reach out directly to Asif via email: mohammadasifulislam8899@gmail.com",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl bg-[#F9F8F6] dark:bg-[#0A0B0E] border border-black/10 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[640px] max-h-[90vh] text-slate-900 dark:text-white"
        >
          {/* Editorial Masthead */}
          <div className="px-6 py-5 border-b border-black/10 dark:border-white/10 flex items-center justify-between bg-black/[0.02] dark:bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red">
                <Bot className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-base font-bold">XenAI Studio Companion</h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    ONLINE
                  </span>
                </div>
                <p className="text-[10px] font-mono text-slate-400">
                  Google Gemini Intelligence // Founder Asif Persona
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Dialogue Feed */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs font-mono">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col space-y-1.5 ${isUser ? "items-end" : "items-start"}`}
                >
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase font-bold">
                    <span>{isUser ? "You // Client" : "XenAI // Studio Core"}</span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div
                    className={`p-4 rounded-2xl max-w-[88%] sm:max-w-[80%] leading-relaxed ${
                      isUser
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-sans text-sm rounded-tr-none shadow-sm"
                        : "bg-black/[0.04] dark:bg-white/[0.04] border border-black/5 dark:border-white/5 text-slate-800 dark:text-slate-200 font-sans text-sm rounded-tl-none leading-relaxed"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 text-xs font-mono text-brand-red animate-pulse">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Synthesizing studio response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts Horizon */}
          <div className="px-6 py-2.5 bg-black/[0.02] dark:bg-white/[0.01] border-t border-black/10 dark:border-white/10 flex gap-2 overflow-x-auto no-scrollbar">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="px-3 py-1 rounded-full border border-black/10 dark:border-white/10 text-[10px] font-mono text-slate-600 dark:text-slate-400 hover:border-brand-red hover:text-brand-red dark:hover:text-brand-red whitespace-nowrap transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Form Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-4 border-t border-black/10 dark:border-white/10 flex items-center gap-2 bg-black/[0.02] dark:bg-white/[0.02]"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about IoT hardware architectures, Android builds, or tech stack..."
              className="flex-1 bg-white dark:bg-[#141720] px-4 py-3 rounded-2xl text-xs text-slate-900 dark:text-white border border-black/10 dark:border-white/10 focus:border-brand-red focus:outline-none placeholder:text-slate-400 font-mono"
            />
            <button
              type="submit"
              disabled={loading || !inputValue.trim()}
              className="p-3 rounded-2xl bg-brand-red text-white hover:bg-[#FF5E50] disabled:opacity-40 transition-all shrink-0"
              aria-label="Send message"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
