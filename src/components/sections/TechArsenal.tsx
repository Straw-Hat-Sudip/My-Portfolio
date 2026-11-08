"use client";

import React from "react";
import { sound } from "@/lib/audio";
import {
  CreditCard,
  Lock,
  Globe,
  ArrowLeftRight,
  Database,
  Smartphone,
  Box,
  Coffee,
  GitBranch,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";

// Custom SVG Icons for exact 1:1 fidelity with Canva design
function ReactIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} fill="none">
      <circle cx="0" cy="0" r="2.05" fill="#00d8ff" />
      <g stroke="#00d8ff" strokeWidth="1">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function NextjsIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 180" className={className} fill="none">
      <mask id="mask0_next" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180" style={{ maskType: "alpha" }}>
        <circle cx="90" cy="90" r="90" fill="black" />
      </mask>
      <g mask="url(#mask0_next)">
        <circle cx="90" cy="90" r="90" fill="#111" stroke="#fff" strokeWidth="6" />
        <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="white" />
        <rect x="115" y="54" width="12" height="72" fill="white" />
      </g>
    </svg>
  );
}

function TailwindIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path
        d="M12 6c-3 0-4.5 1.5-6 4.5 1.5-1.5 3-2 4.5-1.5 1 0.3 1.8 1.1 2.5 1.9C14.2 12.1 15.6 13.5 18 13.5c3 0 4.5-1.5 6-4.5-1.5 1.5-3 2-4.5 1.5-1-0.3-1.8-1.1-2.5-1.9C15.8 7.4 14.4 6 12 6zm-6 6c-3 0-4.5 1.5-6 4.5 1.5-1.5 3-2 4.5-1.5 1 0.3 1.8 1.1 2.5 1.9C8.2 18.1 9.6 19.5 12 19.5c3 0 4.5-1.5 6-4.5-1.5 1.5-3 2-4.5 1.5-1-0.3-1.8-1.1-2.5-1.9C9.8 13.4 8.4 12 6 12z"
        fill="#38bdf8"
        stroke="none"
      />
    </svg>
  );
}

function JavascriptIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <div className={`${className} bg-[#f7df1e] text-black font-bold text-[9px] rounded flex items-center justify-center font-mono leading-none shrink-0`}>
      JS
    </div>
  );
}

function HtmlIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <div className={`${className} bg-[#e34f26] text-white font-black text-[9px] rounded flex items-center justify-center font-mono leading-none shrink-0`}>
      5
    </div>
  );
}

function CssIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <div className={`${className} bg-[#1572b6] text-white font-black text-[9px] rounded flex items-center justify-center font-mono leading-none shrink-0`}>
      3
    </div>
  );
}

function NodejsIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="#68a063">
      <path d="M16 2.5L3.5 9.7v14.5L16 31.4l12.5-7.2V9.7L16 2.5zm0 3.2l9.8 5.6v11.3L16 28.3 6.2 22.6V11.3L16 5.7z" />
    </svg>
  );
}

function ExpressIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <span className={`${className} font-mono font-bold text-[10px] text-slate-300 tracking-tighter flex items-center justify-center shrink-0`}>
      ex
    </span>
  );
}

function PythonIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M11.927 0C5.372 0 5.78 2.84 5.78 2.84l.008 2.946h6.24v.882H3.74S0 6.242 0 12.827c0 6.586 3.264 6.368 3.264 6.368h1.948v-2.736s-.106-3.264 3.208-3.264h5.502s3.082.054 3.082-2.996V3.082S17.433 0 11.927 0zM8.56 1.834a1.05 1.05 0 110 2.1 1.05 1.05 0 010-2.1z" fill="#3776ab" />
      <path d="M12.073 24c6.555 0 6.147-2.84 6.147-2.84l-.008-2.946h-6.24v-.882h8.288s3.74.426 3.74-6.159c0-6.586-3.264-6.368-3.264-6.368h-1.948v2.736s.106 3.264-3.208 3.264H10.34s-3.082-.054-3.082 2.996v7.106s-.431 3.082 5.075 3.082zm3.367-1.834a1.05 1.05 0 110-2.1 1.05 1.05 0 010 2.1z" fill="#ffd438" />
    </svg>
  );
}

function MongodbIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#13aa52">
      <path d="M12 0C11.5 2 7 6 7 13c0 4 2.5 7 5 11 2.5-4 5-7 5-11 0-7-4.5-11-5-13z" />
    </svg>
  );
}

function VscodeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#007acc">
      <path d="M23.15 2.587L18.21.21a1.494 1.494 0 00-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 00-1.276.057L.327 7.276a.999.999 0 00-.07 1.486l4.185 3.955L.257 16.673a.999.999 0 00.07 1.486l1.322 1.217a.999.999 0 001.276.057l4.12-3.128 9.46 8.63c.477.435 1.15.55 1.705.29l4.94-2.377A1.5 1.5 0 0024 21.49V3.954a1.5 1.5 0 00-.85-1.367z" />
    </svg>
  );
}

function PostmanIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <div className={`${className} rounded-full bg-[#ff6c37] flex items-center justify-center text-white font-bold text-[9px] shrink-0`}>
      P
    </div>
  );
}

function NpmIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <span className={`${className} font-mono font-bold text-[9px] bg-[#cb3837] text-white px-1 rounded flex items-center justify-center shrink-0`}>
      npm
    </span>
  );
}

function VercelIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 1L24 22H0L12 1Z" />
    </svg>
  );
}

function JwtIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center text-[#ff7043] shrink-0`}>
      <Lock className="w-3.5 h-3.5" />
    </div>
  );
}

function CloudinaryIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" fill="#38bdf8" fillOpacity="0.2" />
    </svg>
  );
}

interface SkillCardProps {
  label: string;
  icon: React.ReactNode;
  activeGlow?: boolean;
  compact?: boolean;
}

function SkillCard({ label, icon, activeGlow = false, compact = false }: SkillCardProps) {
  return (
    <div
      onMouseEnter={() => sound.playHover()}
      className={`group relative rounded-xl flex items-center transition-all duration-300 cursor-default select-none min-w-0 ${
        compact
          ? "px-2 py-2 sm:px-2.5 sm:py-2.5 gap-1.5"
          : "px-3 py-2.5 sm:px-3.5 sm:py-3 gap-2.5 sm:gap-3"
      } ${
        activeGlow
          ? "bg-[#1a120e] border border-[#ff7043] shadow-[0_0_16px_rgba(255,112,67,0.3)] text-white"
          : "bg-[#131316] hover:bg-[#18181c] border border-white/15 hover:border-[#ff7043]/60 text-[#e0e0e0] hover:text-white hover:shadow-[0_0_16px_rgba(255,112,67,0.2)] hover:-translate-y-0.5 shadow-sm"
      }`}
    >
      <div className={`shrink-0 flex items-center justify-center ${compact ? "w-3.5 h-3.5" : "w-4 sm:w-5 h-4 sm:h-5"} group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <span className={`font-sans font-medium tracking-wide truncate ${compact ? "text-[11px] sm:text-xs" : "text-xs sm:text-[13px]"}`}>
        {label}
      </span>
    </div>
  );
}

export default function TechArsenal() {
  return (
    <section
      id="arsenal"
      className="relative py-24 sm:py-32 bg-[#030303] text-[#f4efe6] overflow-hidden border-b border-white/5"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Architectural Border Frame matching Canva Design */}
        <div className="rounded-3xl border border-white/10 bg-[#070709]/80 backdrop-blur-xl p-4 sm:p-8 lg:p-10 shadow-2xl">
          
          {/* Top Half: Title & Schematic (Left) vs Sections 01 & 02 (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* Top-Left Column: Title + Interactive Schematic Canvas */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* Eyebrow */}
                <div className="flex items-center gap-2.5 font-mono text-xs sm:text-[13px] tracking-[0.16em] uppercase mb-3">
                  <span className="w-2.5 h-2.5 bg-[#FF3E00] inline-block shrink-0 shadow-[0_0_8px_rgba(255,62,0,0.6)]" />
                  <span className="text-[#FF3E00] font-medium">
                    03 / TECHNICAL ARSENAL
                  </span>
                </div>

                {/* Big Editorial Serif Title */}
                <h2 className="font-serif-display text-5xl sm:text-6xl lg:text-7xl font-normal text-[#f4efe6] tracking-tight leading-[0.92] mb-8">
                  Technical
                  <br />
                  <em className="italic font-normal">Arsenal.</em>
                </h2>
              </div>

              {/* Schematic Flow Area */}
              <div className="relative rounded-2xl bg-[#0a0a0d] border border-white/10 p-4 sm:p-6 overflow-hidden mt-4 shadow-xl">
                {/* Circuit crosshairs */}
                <span className="absolute top-2.5 left-2.5 font-mono text-[9px] text-white/20 select-none">+</span>
                <span className="absolute top-2.5 right-2.5 font-mono text-[9px] text-white/20 select-none">+</span>
                <span className="absolute bottom-2.5 left-2.5 font-mono text-[9px] text-white/20 select-none">+</span>
                <span className="absolute bottom-2.5 right-2.5 font-mono text-[9px] text-white/20 select-none">+</span>

                {/* Desktop/Tablet Schematic Node Layout (sm:flex) - 100% UNCHANGED for laptop */}
                <div className="relative hidden sm:flex items-center justify-between gap-2 sm:gap-4 my-2">
                  
                  {/* Left Column: Frontend Inputs */}
                  <div className="flex flex-col gap-4 z-10">
                    <div className="px-3.5 py-2.5 rounded-xl bg-[#141416] border border-white/15 flex items-center gap-2 text-xs font-sans text-white shadow-md">
                      <ReactIcon className="w-4 h-4" />
                      <span>React.js</span>
                    </div>
                    <div className="px-3.5 py-2.5 rounded-xl bg-[#141416] border border-white/15 flex items-center gap-2 text-xs font-sans text-white shadow-md">
                      <NextjsIcon className="w-4 h-4" />
                      <span>Next.js</span>
                    </div>
                  </div>

                  {/* SVG Connecting Flow Lines (Left to Center) */}
                  <div className="flex-1 h-24 relative pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 80" preserveAspectRatio="none">
                      <path
                        d="M 0 20 C 50 20, 50 40, 100 40"
                        fill="none"
                        stroke="#ff7043"
                        strokeWidth="2"
                        strokeOpacity="0.8"
                      />
                      <path
                        d="M 0 60 C 50 60, 50 40, 100 40"
                        fill="none"
                        stroke="#ff7043"
                        strokeWidth="2"
                        strokeOpacity="0.8"
                      />
                      <circle cx="50" cy="40" r="3" fill="#ff7043" className="animate-ping" />
                    </svg>
                  </div>

                  {/* Center Column: Core Hub (Node & Express) with Orange Glow */}
                  <div className="z-10 px-4 py-3 rounded-2xl bg-[#1a120e] border-2 border-[#ff7043] shadow-[0_0_24px_rgba(255,112,67,0.35)] flex items-center gap-2.5 text-xs font-sans text-white font-medium text-center">
                    <NodejsIcon className="w-5 h-5 shrink-0" />
                    <span className="leading-snug">
                      Node.js &<br />Express.js
                    </span>
                  </div>

                  {/* SVG Connecting Flow Lines (Center to Right) */}
                  <div className="flex-1 h-24 relative pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 80" preserveAspectRatio="none">
                      <path
                        d="M 0 40 C 50 40, 50 20, 100 20"
                        fill="none"
                        stroke="#ff7043"
                        strokeWidth="2"
                        strokeOpacity="0.8"
                      />
                      <path
                        d="M 0 40 C 50 40, 50 60, 100 60"
                        fill="none"
                        stroke="#ff7043"
                        strokeWidth="2"
                        strokeOpacity="0.8"
                      />
                      <circle cx="50" cy="40" r="3" fill="#ff7043" className="animate-ping" />
                    </svg>
                  </div>

                  {/* Right Column: APIs & Payment Outputs */}
                  <div className="flex flex-col gap-4 z-10">
                    <div className="px-3.5 py-2.5 rounded-xl bg-[#171210] border border-[#ff7043]/60 shadow-[0_0_12px_rgba(255,112,67,0.2)] flex items-center gap-2 text-xs font-sans text-white">
                      <CreditCard className="w-4 h-4 text-[#ff7043]" />
                      <span>Payment Gateway</span>
                    </div>
                    <div className="px-3.5 py-2.5 rounded-xl bg-[#171210] border border-[#ff7043]/60 shadow-[0_0_12px_rgba(255,112,67,0.2)] flex items-center gap-2 text-xs font-sans text-white">
                      <Globe className="w-4 h-4 text-[#ff7043]" />
                      <span>REST API & JWT Auth</span>
                    </div>
                  </div>

                </div>

                {/* Mobile Responsive Vertical Schematic Layout (sm:hidden) */}
                <div className="relative flex sm:hidden flex-col items-center gap-2 my-1">
                  {/* Top: Frontend Inputs */}
                  <div className="w-full grid grid-cols-2 gap-2 z-10">
                    <div className="px-3 py-2 rounded-xl bg-[#141416] border border-white/15 flex items-center justify-center gap-2 text-xs font-sans text-white shadow-md">
                      <ReactIcon className="w-4 h-4" />
                      <span>React.js</span>
                    </div>
                    <div className="px-3 py-2 rounded-xl bg-[#141416] border border-white/15 flex items-center justify-center gap-2 text-xs font-sans text-white shadow-md">
                      <NextjsIcon className="w-4 h-4" />
                      <span>Next.js</span>
                    </div>
                  </div>

                  {/* SVG Connecting Flow Lines (Top to Center) */}
                  <div className="w-full h-6 relative pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                      <path
                        d="M 25 0 C 25 20, 50 10, 50 30"
                        fill="none"
                        stroke="#ff7043"
                        strokeWidth="2"
                        strokeOpacity="0.8"
                      />
                      <path
                        d="M 75 0 C 75 20, 50 10, 50 30"
                        fill="none"
                        stroke="#ff7043"
                        strokeWidth="2"
                        strokeOpacity="0.8"
                      />
                      <circle cx="50" cy="15" r="2.5" fill="#ff7043" className="animate-ping" />
                    </svg>
                  </div>

                  {/* Center: Core Hub (Node & Express) with Orange Glow */}
                  <div className="w-full z-10 px-4 py-2.5 rounded-2xl bg-[#1a120e] border-2 border-[#ff7043] shadow-[0_0_24px_rgba(255,112,67,0.35)] flex items-center justify-center gap-2.5 text-xs font-sans text-white font-medium text-center">
                    <NodejsIcon className="w-4 h-4 shrink-0" />
                    <span>Node.js & Express.js</span>
                  </div>

                  {/* SVG Connecting Flow Lines (Center to Bottom) */}
                  <div className="w-full h-6 relative pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                      <path
                        d="M 50 0 C 50 20, 25 10, 25 30"
                        fill="none"
                        stroke="#ff7043"
                        strokeWidth="2"
                        strokeOpacity="0.8"
                      />
                      <path
                        d="M 50 0 C 50 20, 75 10, 75 30"
                        fill="none"
                        stroke="#ff7043"
                        strokeWidth="2"
                        strokeOpacity="0.8"
                      />
                      <circle cx="50" cy="15" r="2.5" fill="#ff7043" className="animate-ping" />
                    </svg>
                  </div>

                  {/* Bottom: APIs & Payment Outputs */}
                  <div className="w-full grid grid-cols-2 gap-2 z-10">
                    <div className="px-2.5 py-2 rounded-xl bg-[#171210] border border-[#ff7043]/60 shadow-[0_0_12px_rgba(255,112,67,0.2)] flex items-center justify-center gap-1.5 text-[11px] font-sans text-white text-center">
                      <CreditCard className="w-3.5 h-3.5 text-[#ff7043] shrink-0" />
                      <span className="truncate">Payment Gateway</span>
                    </div>
                    <div className="px-2.5 py-2 rounded-xl bg-[#171210] border border-[#ff7043]/60 shadow-[0_0_12px_rgba(255,112,67,0.2)] flex items-center justify-center gap-1.5 text-[11px] font-sans text-white text-center">
                      <Globe className="w-3.5 h-3.5 text-[#ff7043] shrink-0" />
                      <span className="truncate">REST API & Auth</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top-Right Column: Sections 01 & 02 with glowing vertical orange divider */}
            <div className="lg:col-span-6 relative flex flex-col justify-between pl-0 lg:pl-8 lg:border-l lg:border-white/10">
              
              {/* Glowing Vertical Orange Accent Line */}
              <div className="hidden lg:block absolute -left-px top-2 bottom-2 w-[2px] bg-gradient-to-b from-transparent via-[#ff7043] to-transparent shadow-[0_0_18px_rgba(255,112,67,0.85)]" />

              {/* 01 / FRONTEND DEVELOPMENT */}
              <div className="mb-6">
                <div className="flex items-center gap-2 font-mono text-xs tracking-[0.16em] uppercase mb-3.5">
                  <span className="w-2 h-2 bg-[#FF3E00] inline-block shrink-0 shadow-[0_0_6px_rgba(255,62,0,0.6)]" />
                  <span className="text-[#FF3E00] font-medium">01 / FRONTEND DEVELOPMENT</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  {/* Col 1 */}
                  <div className="flex flex-col gap-2.5">
                    <SkillCard label="React.js" icon={<ReactIcon className="w-4 h-4" />} />
                    <SkillCard label="JavaScript (ES6+)" icon={<JavascriptIcon className="w-4 h-4" />} />
                  </div>
                  {/* Col 2 */}
                  <div className="flex flex-col gap-2.5">
                    <SkillCard label="Next.js" icon={<NextjsIcon className="w-4 h-4" />} />
                    <div className="grid grid-cols-2 gap-2">
                      <SkillCard label="HTML5" icon={<HtmlIcon className="w-3.5 h-3.5" />} compact />
                      <SkillCard label="CSS3" icon={<CssIcon className="w-3.5 h-3.5" />} compact />
                    </div>
                  </div>
                  {/* Col 3 */}
                  <div className="flex flex-col gap-2.5">
                    <SkillCard label="Tailwind CSS" icon={<TailwindIcon className="w-4 h-4" />} />
                    <SkillCard label="Responsive Web Design" icon={<Smartphone className="w-4 h-4 text-[#38bdf8]" />} />
                  </div>
                </div>
              </div>

              {/* Horizontal Divider Line */}
              <div className="h-px bg-white/10 my-4" />

              {/* 02 / BACKEND & APIS */}
              <div>
                <div className="flex items-center gap-2 font-mono text-xs tracking-[0.16em] uppercase mb-3.5">
                  <span className="w-2 h-2 bg-[#FF3E00] inline-block shrink-0 shadow-[0_0_6px_rgba(255,62,0,0.6)]" />
                  <span className="text-[#FF3E00] font-medium">02 / BACKEND & APIS</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  <SkillCard label="Node.js" icon={<NodejsIcon className="w-4 h-4" />} activeGlow />
                  <SkillCard label="Express.js" icon={<ExpressIcon className="w-4 h-4" />} />
                  <SkillCard label="REST API" icon={<Globe className="w-4 h-4 text-[#ff7043]" />} />
                  <SkillCard label="JWT Authentication" icon={<JwtIcon className="w-4 h-4" />} />
                  <SkillCard label="Payment Gateway" icon={<CreditCard className="w-4 h-4 text-[#ff8a50]" />} />
                  <SkillCard label="WebSockets" icon={<ArrowLeftRight className="w-4 h-4 text-[#ffa726]" />} />
                </div>
              </div>

            </div>

          </div>

          {/* Horizontal Full-Width Divider Line between Top & Bottom Halves */}
          <div className="h-px bg-white/10 my-8 sm:my-10" />

          {/* Bottom Row Grid: Sections 03, 04, 05 all on ONE LEVEL ROW */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* 03 / PROGRAMMING LANGUAGES */}
            <div className="lg:col-span-3 lg:border-r lg:border-white/10 lg:pr-6">
              <div className="flex items-center gap-2 font-mono text-xs tracking-[0.16em] uppercase mb-4">
                <span className="w-2 h-2 bg-[#FF3E00] inline-block shrink-0 shadow-[0_0_6px_rgba(255,62,0,0.6)]" />
                <span className="text-[#FF3E00] font-medium">03 / PROGRAMMING LANGUAGES</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <SkillCard label="Java" icon={<Coffee className="w-4 h-4 text-[#ea2d2e]" />} />
                <SkillCard label="Python" icon={<PythonIcon className="w-4 h-4" />} />
                <SkillCard label="C" icon={<span className="font-mono font-bold text-sm text-[#a8b9cc] px-1">C</span>} />
              </div>
            </div>

            {/* 04 / DATABASES */}
            <div className="lg:col-span-3 lg:border-r lg:border-white/10 lg:pr-6">
              <div className="flex items-center gap-2 font-mono text-xs tracking-[0.16em] uppercase mb-4">
                <span className="w-2 h-2 bg-[#FF3E00] inline-block shrink-0 shadow-[0_0_6px_rgba(255,62,0,0.6)]" />
                <span className="text-[#FF3E00] font-medium">04 / DATABASES</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <SkillCard label="MongoDB" icon={<MongodbIcon className="w-4 h-4" />} />
                <SkillCard label="Mongoose ODM" icon={<span className="font-mono font-bold text-xs text-[#e74c3c]">mgo</span>} />
                <SkillCard label="MySQL" icon={<Database className="w-4 h-4 text-[#00758f]" />} />
              </div>
            </div>

            {/* 05 / TOOLS & PLATFORMS - Spans 6 Columns with all 8 Cards cleanly inside */}
            <div className="lg:col-span-6 pl-0 lg:pl-2">
              <div className="flex items-center gap-2 font-mono text-xs tracking-[0.16em] uppercase mb-4">
                <span className="w-2 h-2 bg-[#FF3E00] inline-block shrink-0 shadow-[0_0_6px_rgba(255,62,0,0.6)]" />
                <span className="text-[#FF3E00] font-medium">05 / TOOLS & PLATFORMS</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {/* Row 1 */}
                <SkillCard label="Git" icon={<GitBranch className="w-4 h-4 text-[#f05032]" />} />
                <SkillCard label="GitHub" icon={<GithubIcon className="w-4 h-4 text-white" />} />
                <SkillCard label="VS.Code" icon={<VscodeIcon className="w-4 h-4" />} />
                <SkillCard label="Postman" icon={<PostmanIcon className="w-4 h-4" />} />
                
                {/* Row 2 */}
                <SkillCard label="npm" icon={<NpmIcon className="w-4 h-4" />} />
                <SkillCard label="Vercel" icon={<VercelIcon className="w-4 h-4 text-white" />} />
                <SkillCard label="Render" icon={<Box className="w-4 h-4 text-[#46e3b7]" />} />
                <SkillCard label="Cloudinary" icon={<CloudinaryIcon className="w-4 h-4" />} />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
