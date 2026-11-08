"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { BUILDER_DNA } from "@/lib/data";
import { sound } from "@/lib/audio";
import { Code, Cpu, Terminal, ArrowUpRight, Activity } from "lucide-react";
import BuilderDnaHelix3D from "../3d/BuilderDnaHelix3D";

const DNA_ICONS = [Code, Cpu, Terminal];

const MODE_LABELS = [
  "MODE 01 // ARCHITECTURAL LATTICE",
  "MODE 02 // NEURAL & FINTECH PULSE",
  "MODE 03 // PRODUCTION VELOCITY",
];

export default function BuilderDnaSection() {
  const [activeMode, setActiveMode] = useState<number>(0);

  const handleCardHover = (index: number) => {
    if (activeMode !== index) {
      sound.playHover();
      setActiveMode(index);
    }
  };

  const handleModeClick = (index: number) => {
    sound.playClick();
    setActiveMode(index);
  };

  return (
    <section
      id="dna"
      className="relative py-24 sm:py-32 bg-[#030303] overflow-hidden border-b border-white/5 select-none"
    >
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[500px] bg-[#ff7043]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-xs sm:text-[13px] tracking-[0.16em] uppercase mb-3">
              <span className="w-2.5 h-2.5 bg-[#FF3E00] inline-block shrink-0 shadow-[0_0_8px_rgba(255,62,0,0.6)]" />
              <span className="text-[#FF3E00] font-medium">
                02 / THE BUILDER DNA
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              The Builder DNA.
            </h2>
          </div>
          <p className="font-mono text-xs text-slate-400 max-w-sm">
            Three immutable principles synthesized into every repository, microservice, and user interface.
          </p>
        </div>

        {/* Cinematic Split Layout: 3D Kinetic DNA Helix Console + Interactive Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* ================= LEFT: 3D DNA DOUBLE-HELIX CONSOLE ================= */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="relative rounded-2xl bg-[#08080b]/90 border border-white/10 p-5 sm:p-6 flex flex-col justify-between h-full shadow-2xl shadow-black/80 overflow-hidden group">
              {/* Top HUD Telemetry Bar */}
              <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/10 font-mono text-[10px] text-slate-400 tracking-wider shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ff7043] animate-pulse" />
                  <span className="text-white font-semibold uppercase">
                    KINETIC_DNA // 3D
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Activity className="w-3.5 h-3.5 text-[#ff7043]" />
                  <span>2,422 NODES</span>
                </div>
              </div>

              {/* Center Interactive Three.js DNA Helix Canvas (stretches to fill full vertical space) */}
              <div className="relative flex-1 w-full my-3 min-h-[360px] sm:min-h-[440px] overflow-hidden">
                <BuilderDnaHelix3D activeMode={activeMode} className="w-full h-full" />

                {/* Subtle corner tech coordinates */}
                <div className="absolute top-2 left-0 font-mono text-[9px] text-slate-600 tracking-widest pointer-events-none">
                  HELIX_RADIUS: 1.15
                </div>
                <div className="absolute top-2 right-0 font-mono text-[9px] text-slate-600 tracking-widest pointer-events-none">
                  PITCH: 3.4nm
                </div>
              </div>

              {/* Bottom Mode Indicator & Clickable Switches */}
              <div className="relative z-10 pt-3 border-t border-white/10 shrink-0">
                <div className="font-mono text-[10px] text-[#ff7043] tracking-widest uppercase mb-2 flex items-center justify-between">
                  <span>{MODE_LABELS[activeMode]}</span>
                  <span className="text-slate-500 text-[9px]">INTERACTIVE</span>
                </div>

                <div className="grid grid-cols-3 gap-1.5">
                  {["01 LATTICE", "02 NEURAL", "03 VELOCITY"].map((label, idx) => {
                    const isSelected = activeMode === idx;
                    return (
                      <button
                        key={label}
                        onClick={() => handleModeClick(idx)}
                        type="button"
                        className={`py-1.5 px-2 rounded font-mono text-[9px] tracking-wider transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#ff7043]/20 border border-[#ff7043]/60 text-white font-semibold"
                            : "bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT: 3 BUILDER DNA CARDS ================= */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4 sm:gap-5">
            {BUILDER_DNA.map((item, idx) => {
              const Icon = DNA_ICONS[idx % DNA_ICONS.length];
              const isCurrent = activeMode === idx;

              return (
                <motion.div
                  key={item.tag}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  onMouseEnter={() => handleCardHover(idx)}
                  onClick={() => handleModeClick(idx)}
                  className={`group relative rounded-2xl bg-[#08080b] border p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 overflow-hidden cursor-pointer ${
                    isCurrent
                      ? "border-[#ff7043]/60 shadow-[0_0_28px_rgba(255,112,67,0.18)]"
                      : "border-white/10 hover:border-white/25"
                  }`}
                >
                  {/* Background Gradient Wash */}
                  <div
                    className={`absolute -inset-full bg-gradient-to-br ${item.accent} ${
                      isCurrent ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                    } transition-opacity duration-500 blur-2xl pointer-events-none`}
                  />

                  {/* Top Bar: Tag & Live Indicator */}
                  <div className="relative z-10 flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff7043]" />
                      <span className="font-mono text-xs text-[#ff7043] font-bold tracking-wider">
                        {item.tag}
                      </span>
                    </div>
                    <div className="relative flex items-center justify-center w-4 h-4">
                      <span className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400/50 animate-ping" />
                      <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </div>
                  </div>

                  {/* Content: Icon + Headline + Description */}
                  <div className="relative z-10 flex items-start gap-4 sm:gap-5">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isCurrent
                          ? "bg-[#ff7043]/20 border border-[#ff7043]/50 text-white scale-105"
                          : "bg-white/5 border border-white/10 text-[#ff7043] group-hover:scale-105"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1">
                      <h3
                        className={`text-lg sm:text-xl font-bold mb-2 tracking-tight transition-colors ${
                          isCurrent ? "text-white" : "text-[#EDEDED] group-hover:text-white"
                        }`}
                      >
                        {item.headline}
                      </h3>

                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Telemetry Stamp */}
                  <div className="relative z-10 mt-5 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-slate-500">
                    <span className={isCurrent ? "text-[#ff8a50] font-medium" : "text-slate-400"}>
                      {item.stats}
                    </span>
                    <div className="flex items-center gap-1 text-[#ff7043] font-mono text-[10px]">
                      <span>INSPECT STRAND</span>
                      <ArrowUpRight
                        className={`w-3.5 h-3.5 transition-transform ${
                          isCurrent ? "translate-x-0.5 -translate-y-0.5" : ""
                        }`}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
