"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage } from "@/types";
import { SUGGESTED_QUESTIONS } from "@/data/aiContext";
import { Bot, X, Send, Sparkles, RefreshCw, User } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AiAssistantModal({ isOpen, onClose }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      sender: "asif-ai",
      text: "✨ Hello! I am **XenAI**, the official intelligent digital assistant for Founder Asif & Xentoryx Labs. Ask me anything about our Android & IoT engineering capabilities, or flagship projects like Dipannita and Expensey!",
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
        text: data.reply || "Sorry, I couldn't process that request right now.",
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
          text: "I am experiencing network connectivity issues. Please try again or reach out directly at asif@xentoryx.com.",
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
      <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          className="w-full max-w-lg glass-panel-red rounded-3xl overflow-hidden shadow-2xl border border-brand-red/40 bg-[#0E1015]/95 text-white flex flex-col h-[600px] max-h-[85vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-[#141720] border-b border-brand-red/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-brand-red/20 border border-brand-red/50 flex items-center justify-center text-brand-red">
                  <Bot className="w-5 h-5 animate-pulse" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#141720]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-base font-bold text-white">XenAI Assistant</h3>
                </div>
                <p className="text-[10px] text-brand-muted font-mono">
                  Powered by XenAI Engine // Xentoryx Labs
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-brand-muted hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat History */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                    msg.sender === "user"
                      ? "bg-surface border border-white/20 text-white"
                      : "bg-brand-red/20 border border-brand-red/40 text-brand-red"
                  }`}
                >
                  {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className="space-y-1 max-w-[80%]">
                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-brand-red text-white font-medium rounded-tr-none"
                        : "glass-panel text-gray-200 rounded-tl-none border-white/10"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div className="text-[9px] font-mono text-brand-muted text-right">
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 items-center text-xs text-brand-muted font-mono">
                <RefreshCw className="w-4 h-4 text-brand-red animate-spin" />
                <span>Asif AI is analyzing response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Questions Chips */}
          <div className="px-4 py-2 bg-[#101218] border-t border-white/5 flex gap-2 overflow-x-auto no-scrollbar">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="px-3 py-1 rounded-full bg-surface border border-white/10 hover:border-brand-red/40 text-[10px] font-mono text-brand-muted hover:text-white shrink-0 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#0c0e13] border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Asif about IoT, Android, Next.js..."
              className="flex-1 bg-surface px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-brand-red border border-white/10 placeholder:text-gray-500 font-sans"
            />
            <button
              type="submit"
              disabled={loading || !inputValue.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-brand-red to-[#FF5E50] text-white disabled:opacity-50 hover:shadow-glow-red transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
