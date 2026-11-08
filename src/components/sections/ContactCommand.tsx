"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PERSONAL_INFO } from "@/lib/data";
import { sound } from "@/lib/audio";
import confetti from "canvas-confetti";
import {
  Mail,
  Copy,
  Check,
  Phone,
  MapPin,
  Send,
  Terminal,
  ExternalLink,
  Download,
  Clock,
  ArrowUp,
  Sparkles,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/BrandIcons";

const INQUIRY_PRESETS = [
  { id: "fulltime", label: "💼 Full-Time Role", subject: "Full-Time Software Engineering Opportunity" },
  { id: "ai-mern", label: "⚡ AI / Full-Stack Project", subject: "AI & Full-Stack MERN Collaboration" },
  { id: "contract", label: "🤝 Contract / Consulting", subject: "Contract Engineering Engagement" },
  { id: "coffee", label: "☕ Quick Technical Chat", subject: "Technical Discussion & Connect" },
];

export default function ContactCommand() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string>("fulltime");
  const [currentTime, setCurrentTime] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Full-Time Software Engineering Opportunity",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "transmitting" | "delivered">("idle");

  // Real-time Live Indian Standard Time (IST) Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setCurrentTime(formatter.format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    try { sound.playClick(); } catch {}
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(PERSONAL_INFO.email);
    }
    setCopiedEmail(true);
    try { sound.playSuccess(); } catch {}
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleCopyPhone = () => {
    try { sound.playClick(); } catch {}
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(PERSONAL_INFO.phoneClean);
    }
    setCopiedPhone(true);
    try { sound.playSuccess(); } catch {}
    setTimeout(() => setCopiedPhone(false), 2400);
  };

  const handleCopyWhatsApp = () => {
    try { sound.playClick(); } catch {}
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("8274020133");
    }
    setCopiedWhatsApp(true);
    try { sound.playSuccess(); } catch {}
    setTimeout(() => setCopiedWhatsApp(false), 2400);
  };

  const handleCallClick = () => {
    try { sound.playClick(); } catch {}
  };

  const handleSelectPreset = (preset: typeof INQUIRY_PRESETS[0]) => {
    sound.playClick();
    setSelectedPreset(preset.id);
    setFormData((prev) => ({ ...prev, subject: preset.subject }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sound.playClick();
    setFormStatus("transmitting");

    setTimeout(() => {
      setFormStatus("delivered");
      sound.playSuccess();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#ff7043", "#ff8a50", "#ffa726", "#10b981", "#ffffff"],
        });
      } catch {
        // Fallback gracefully if canvas-confetti is not loaded
      }
    }, 1200);
  };

  const handleReset = () => {
    sound.playClick();
    setFormStatus("idle");
    setFormData({
      name: "",
      email: "",
      subject: "Full-Time Software Engineering Opportunity",
      message: "",
    });
  };

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 lg:py-36 bg-[#030303] overflow-hidden text-[#f4efe6] select-none"
    >
      {/* 6-Column Architectural Grid Lines */}
      <div className="absolute inset-0 px-6 sm:px-10 lg:px-14 xl:px-16 grid grid-cols-6 pointer-events-none z-0">
        <div className="border-r border-white/[0.035]" />
        <div className="border-r border-white/[0.035]" />
        <div className="border-r border-white/[0.035]" />
        <div className="border-r border-white/[0.035]" />
        <div className="border-r border-white/[0.035]" />
        <div />
      </div>

      {/* Background ambient ember glows */}
      <div className="absolute bottom-0 left-1/4 -translate-x-1/2 w-[700px] h-[400px] bg-[#ff7043]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[350px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-xs sm:text-[13px] tracking-[0.16em] uppercase mb-3">
              <span className="w-2.5 h-2.5 bg-[#FF3E00] inline-block shrink-0 shadow-[0_0_8px_rgba(255,62,0,0.6)]" />
              <span className="text-[#FF3E00] font-medium">
                06 / INITIATE CONTACT
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f4efe6] tracking-tight font-serif-display">
              Contact Command Center. <em className="italic font-normal text-[#ff7043]">Direct Uplink.</em>
            </h2>

            <p className="mt-3 text-slate-400 text-sm sm:text-base font-sans max-w-2xl leading-relaxed">
              Have a high-impact engineering role, scalable MERN system, or AI pipeline to discuss? Reach out through any verified channel below.
            </p>
          </div>

          {/* Quick Availability Badge */}
          <div className="px-4 py-2 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs flex items-center gap-2.5 shrink-0 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-medium">AVAILABLE FOR FULL-TIME ROLES</span>
          </div>
        </div>

        {/* Command Station Grid: Left Matrix (5 Cols) vs Right Dispatch Console (7 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT COLUMN: DIRECT TELEMETRY MATRIX (5 Cols) ================= */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Operator Telemetry Card */}
            <div className="p-6 rounded-3xl bg-[#08080b] border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs mb-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white font-bold tracking-wider">OPERATOR: SUDIP PATRA</span>
                </div>
                <span className="text-[11px] text-emerald-400 font-medium">ONLINE</span>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="text-[10px] text-slate-500 uppercase flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#ff7043]" />
                    <span>LOCAL TIME (IST)</span>
                  </div>
                  <div className="text-slate-200 font-semibold tracking-wide">
                    {currentTime || "19:30 IST"}
                  </div>
                  <div className="text-[10px] text-slate-500">UTC+05:30 • Singur, WB</div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="text-[10px] text-slate-500 uppercase flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>LOCATION / WORK</span>
                  </div>
                  <div className="text-slate-200 font-semibold truncate">
                    Singur, WB, India
                  </div>
                  <div className="text-[10px] text-emerald-400/90 truncate">Remote & Relocation</div>
                </div>
              </div>
            </div>

            {/* CHANNEL 01: PRIMARY INBOX (EMAIL) */}
            <div className="p-6 rounded-3xl bg-[#09090c] border border-[#ff7043]/30 shadow-2xl relative overflow-hidden group hover:border-[#ff7043]/50 transition-colors">
              <div className="flex items-center justify-between mb-3 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[#ff7043] font-bold">01 //</span>
                  <span className="text-slate-300 font-semibold uppercase tracking-wider">
                    PRIMARY INBOX (EMAIL)
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">REPLY: &lt; 24H</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/70 border border-white/10 mb-3 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 truncate min-w-0">
                  <Mail className="w-4 h-4 text-[#ff7043] shrink-0" />
                  <span className="font-mono text-sm text-white select-all truncate font-medium">
                    {PERSONAL_INFO.email}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-mono text-xs transition-colors cursor-pointer flex items-center gap-1"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 text-[11px]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Copy</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${PERSONAL_INFO.email}?subject=Software%20Engineering%20Inquiry%20via%20Portfolio`}
                    onClick={() => {
                      try { sound.playClick(); } catch {}
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[#ff7043]/20 hover:bg-[#ff7043]/30 border border-[#ff7043]/40 text-[#ff8a50] font-mono text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>Mail App</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Direct Web Actions for PC */}
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-slate-400 pt-1">
                <span className="text-[11px] text-slate-500">PC / Laptop 1-click option:</span>
                
                <div className="flex items-center gap-3">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${PERSONAL_INFO.email}&su=Software%20Engineering%20Inquiry%20via%20Portfolio`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      try { sound.playClick(); } catch {}
                    }}
                    className="text-[#ff7043] hover:text-[#ff8a50] flex items-center gap-1 transition-colors underline underline-offset-4 cursor-pointer text-xs"
                    title="Opens Gmail compose directly in browser"
                  >
                    <span>Open in Gmail (Browser)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* CHANNEL 02: INSTANT WHATSAPP UPLINK */}
            <div className="p-6 rounded-3xl bg-[#09090c] border border-emerald-500/30 shadow-2xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
              <div className="flex items-center justify-between mb-3 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">02 //</span>
                  <span className="text-slate-300 font-semibold uppercase tracking-wider">
                    INSTANT WHATSAPP CHAT
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>FASTEST RESPONSE</span>
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/70 border border-white/10 mb-3 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 truncate min-w-0">
                  <WhatsappIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-mono text-sm text-white select-all truncate font-medium">
                    +91 8274020133
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyWhatsApp}
                    className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-mono text-xs transition-colors cursor-pointer flex items-center gap-1"
                    title="Copy WhatsApp number"
                  >
                    {copiedWhatsApp ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 text-[11px]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Copy</span>
                      </>
                    )}
                  </button>

                  {/* Guaranteed WhatsApp deep link: wa.me opens native mobile app directly */}
                  <a
                    href="https://wa.me/918274020133?text=Hi%20Sudip,%20I%20reviewed%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you!"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      try { sound.playClick(); } catch {}
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                  >
                    <span>Chat on WhatsApp</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Direct Web Actions for PC */}
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-slate-400 pt-1">
                <span className="text-[11px] text-slate-500">PC / Laptop 1-click option:</span>
                
                <a
                  href="https://web.whatsapp.com/send?phone=918274020133&text=Hi%20Sudip,%20I%20reviewed%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you!"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    try { sound.playClick(); } catch {}
                  }}
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors underline underline-offset-4 cursor-pointer text-xs"
                  title="Opens WhatsApp Web directly in your browser"
                >
                  <span>Open WhatsApp Web (Browser)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* CHANNEL 03: DIRECT VOICE LINE (CALLING) */}
            <div className="p-6 rounded-3xl bg-[#08080b] border border-white/10 shadow-2xl relative overflow-hidden group hover:border-white/20 transition-colors">
              <div className="flex items-center justify-between mb-3 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-bold">03 //</span>
                  <span className="text-slate-300 font-semibold uppercase tracking-wider">
                    DIRECT VOICE LINE (CALLING)
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">VOICE ONLY</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/70 border border-white/10 mb-3 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 truncate min-w-0">
                  <Phone className="w-4 h-4 text-[#ff8a50] shrink-0" />
                  <span className="font-mono text-sm text-white select-all truncate font-medium">
                    +91 9073881923
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-mono text-xs transition-colors flex items-center gap-1 cursor-pointer"
                    title="Copy phone number"
                  >
                    {copiedPhone ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 text-[11px]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Copy</span>
                      </>
                    )}
                  </button>

                  {/* Native <a> Tag: Works 100% on iOS & Android dialers, and copies to clipboard on PC */}
                  <a
                    href="tel:+919073881923"
                    onClick={handleCallClick}
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Call Now</span>
                    <Phone className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <p className="font-mono text-[11px] text-slate-500 leading-relaxed">
                Primary voice number for phone interviews. <span className="text-slate-400">(Note: For WhatsApp chat, please use the WhatsApp Uplink above).</span>
              </p>
            </div>

            {/* QUICK LINKS: CV DOWNLOAD & SOCIAL HUBS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs pt-1">
              {/* Resume Download */}
              <a
                href={PERSONAL_INFO.resumePath}
                download="Sudip_Patra_CV.pdf"
                onClick={() => sound.playClick()}
                className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-200 hover:text-white flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-[#ff7043]" />
                  <span>Resume CV</span>
                </div>
                <span className="text-[10px] text-slate-500 group-hover:text-slate-300">PDF</span>
              </a>

              {/* LinkedIn */}
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-200 hover:text-white flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2">
                  <LinkedinIcon className="w-4 h-4 text-[#ff8a50]" />
                  <span>LinkedIn</span>
                </div>
                <ExternalLink className="w-3 h-3 opacity-40" />
              </a>

              {/* GitHub */}
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-200 hover:text-white flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2">
                  <GithubIcon className="w-4 h-4 text-slate-200" />
                  <span>GitHub</span>
                </div>
                <ExternalLink className="w-3 h-3 opacity-40" />
              </a>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: INTERACTIVE DISPATCH TERMINAL (7 Cols) ================= */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#09090c] border border-white/10 shadow-2xl relative overflow-hidden">
              
              {/* Background gradient blur */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff7043]/5 rounded-full blur-3xl pointer-events-none" />

              {/* Terminal Window Header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                  </div>
                  <span className="text-slate-400 font-semibold tracking-wider flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[#ff7043]" />
                    <span>TRANSMIT_MESSAGE.SH</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400/90 font-medium">SSL 256-BIT</span>
                  <span>•</span>
                  <span>UTF-8</span>
                </div>
              </div>

              {/* Interactive Inquiry Presets Bar */}
              <div className="mb-6">
                <div className="font-mono text-xs text-slate-400 mb-2.5 uppercase tracking-wider flex items-center justify-between">
                  <span>SELECT INQUIRY TOPIC:</span>
                  <span className="text-slate-500 text-[10px]">CLICK PRESET TO AUTO-FILL</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {INQUIRY_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all ${
                        selectedPreset === preset.id
                          ? "bg-[#eae6df] text-[#09090b] font-bold shadow-md shadow-white/10"
                          : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5 hover:border-white/15"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form or Success State */}
              <AnimatePresence mode="wait">
                {formStatus === "delivered" ? (
                  <motion.div
                    key="delivered"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="p-8 rounded-2xl bg-black/70 border border-emerald-500/30 text-center space-y-4 my-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-emerald-500/10">
                      <Check className="w-7 h-7" />
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-white font-serif-display mb-1">
                        Transmission Dispatched Successfully
                      </h4>
                      <p className="font-mono text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                        Your packet was processed. A notification has been routed to <span className="text-white font-semibold">sudippatra550@gmail.com</span>. Sudip will respond shortly.
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={handleReset}
                        className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center gap-2 mx-auto transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Send Another Transmission</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {/* Identity & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[11px] text-slate-400 mb-1.5 uppercase tracking-wider">
                          01 // YOUR NAME / IDENTITY <span className="text-[#ff7043]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alex Vance"
                          className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 focus:border-[#ff7043] focus:ring-1 focus:ring-[#ff7043] text-white placeholder-slate-600 font-mono text-xs sm:text-sm outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[11px] text-slate-400 mb-1.5 uppercase tracking-wider">
                          02 // YOUR EMAIL / RETURN ROUTE <span className="text-[#ff7043]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. alex@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 focus:border-[#ff7043] focus:ring-1 focus:ring-[#ff7043] text-white placeholder-slate-600 font-mono text-xs sm:text-sm outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Subject Line */}
                    <div>
                      <label className="block font-mono text-[11px] text-slate-400 mb-1.5 uppercase tracking-wider">
                        03 // TRANSMISSION SUBJECT
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 focus:border-[#ff7043] focus:ring-1 focus:ring-[#ff7043] text-white placeholder-slate-600 font-mono text-xs sm:text-sm outline-none transition-all"
                      />
                    </div>

                    {/* Message Body */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block font-mono text-[11px] text-slate-400 uppercase tracking-wider">
                          04 // MESSAGE PAYLOAD <span className="text-[#ff7043]">*</span>
                        </label>
                        <span className="font-mono text-[10px] text-slate-500">
                          {formData.message.length} CHARS
                        </span>
                      </div>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Describe your project, team opportunity, tech stack, or proposed timeline..."
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 focus:border-[#ff7043] focus:ring-1 focus:ring-[#ff7043] text-white placeholder-slate-600 font-mono text-xs sm:text-sm outline-none transition-all resize-none leading-relaxed"
                      />
                    </div>

                    {/* Submit Dispatch Action */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={formStatus === "transmitting"}
                        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#ff7043] via-[#ff8a50] to-[#ffa726] hover:from-[#ff8a50] hover:to-[#ffb74d] text-black font-mono text-xs sm:text-sm font-bold shadow-xl shadow-[#ff7043]/20 hover:shadow-[#ff7043]/35 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                      >
                        {formStatus === "transmitting" ? (
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            <span>ENCRYPTING &amp; DISPATCHING PACKET...</span>
                          </div>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>DISPATCH TRANSMISSION</span>
                            <span className="opacity-60 text-xs">→</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Bottom Guarantee Note */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#ff7043]" />
                  <span>No spam. Direct route to Sudip&apos;s personal inbox.</span>
                </span>
                <span className="hidden sm:inline text-slate-600">STATUS: READY</span>
              </div>

            </div>
          </div>

        </div>

        {/* Global Editorial Footer */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500">
          <div>
            © 2026 SUDIP PATRA • ENGINEERED WITH NEXT.JS 15, THREE.JS, GSAP &amp; TAILWIND CSS
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-[#ff7043]">SINGUR, WB, INDIA</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
