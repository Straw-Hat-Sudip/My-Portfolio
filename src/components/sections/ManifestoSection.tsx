"use client";

import React, { useState } from "react";
import { sound } from "@/lib/audio";
import FibonacciSphere3D from "../3d/FibonacciSphere3D";
import { motion, AnimatePresence } from "motion/react";

interface PillarData {
  id: string;
  index: string;
  badge: string;
  subIndex: string;
  hud: {
    upperTitle: string;
    upperText: string;
    lowerTitle: string;
    lowerText: string;
  };
  sphereLabel: string;
  narrative: {
    lead: string;
    body: string;
  };
}

const PILLARS: PillarData[] = [
  {
    id: "about",
    index: "01",
    badge: "About",
    subIndex: "01 / 03",
    hud: {
      upperTitle: "01 / ABOUT ME",
      upperText:
        "Sudip Patra — Full Stack MERN Developer based in Singur, West Bengal • B.Tech in ECE at Techno International New Town (2023–2027).",
      lowerTitle: "02 / SPECIALIZATION",
      lowerText:
        "Focused on modern full-stack web architecture, scalable backend APIs, reactive UIs, and robust database design.",
    },
    sphereLabel: "S T R U C T U R E",
    narrative: {
      lead: "I connect full-stack engineering, intelligent APIs, and real-world product design.",
      body: "Passionate Full Stack MERN Developer from West Bengal, India, skilled in architecting modern web applications with React, Next.js & Node.js while continuously pushing technical boundaries.",
    },
  },
  {
    id: "build",
    index: "02",
    badge: "Build",
    subIndex: "02 / 03",
    hud: {
      upperTitle: "01 / CORE STACK",
      upperText:
        "React.js, Next.js, Node.js, Express.js & MongoDB • TypeScript, Tailwind CSS, REST APIs & WebSockets.",
      lowerTitle: "02 / WHAT I BUILD",
      lowerText:
        "Architecting scalable web applications, AI Healthcare Assistant with Gemini, and digital e-commerce stores with Payment Gateway & JWT.",
    },
    sphereLabel: "R I P P L E S",
    narrative: {
      lead: "I build scalable MERN applications, AI workflows, and seamless payment systems.",
      body: "From an AI Healthcare Assistant that simplifies medical reports to a full-stack Digital E-Book Store with Payment Gateway checkout, I turn complex ideas into production-ready software.",
    },
  },
  {
    id: "connect",
    index: "03",
    badge: "Connect",
    subIndex: "03 / 03",
    hud: {
      upperTitle: "01 / DIRECT REACH",
      upperText:
        "sudippatra550@gmail.com • +91 9073881923 (Call) • +91 8274020133 (WhatsApp) • Singur, WB, India.",
      lowerTitle: "02 / CHANNELS",
      lowerText:
        "github.com/Strraw-HatSudip • linkedin.com/in/sudip-patra-2b4366318 • Open for Full-Stack MERN opportunities.",
    },
    sphereLabel: "C O N S T E L L A T I O N",
    narrative: {
      lead: "Available for Full-Stack MERN & software engineering opportunities.",
      body: "Looking for an engineer who ships clean code from database schema to interactive UI? Let's build something exceptional together.",
    },
  },
];

export default function ManifestoSection() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index: number) => {
    if (index === activeTab) return;
    sound.playClick();
    setActiveTab(index);
  };

  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    sound.playClick();
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const currentPillar = PILLARS[activeTab];

  return (
    <section
      id="manifesto"
      className="relative py-20 sm:py-28 lg:py-32 bg-[#050505] text-[#f4efe6] overflow-hidden border-t border-b border-white/[0.08] select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14">
        {/* 1. TOP HEADER BAR */}
        <div className="flex items-center justify-between font-mono text-xs sm:text-[13px] tracking-[0.16em] uppercase">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 bg-[#FF3E00] inline-block shrink-0 shadow-[0_0_8px_rgba(255,62,0,0.6)]" />
            <span className="text-[#FF3E00] font-medium">
              01 / THE PERSON BEHIND THE WORK
            </span>
          </div>
          <div className="text-[#71717A] text-[10px] sm:text-xs tracking-[0.2em]">
            A FULL-STACK PERSPECTIVE
          </div>
        </div>

        {/* Thin Header Divider */}
        <div className="w-full h-px bg-white/10 mt-4 mb-8 sm:mb-12" />

        {/* 2. SPLIT-SCREEN 2-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            {/* Top Sub-bar */}
            <div className="border-t border-white/15 pt-3 pb-2 flex items-center justify-between font-mono text-[10px] sm:text-[11px] tracking-[0.22em] text-[#888888] uppercase">
              <span>THREE PILLARS. ONE PERSPECTIVE.</span>
              <span className="text-[#f4efe6] font-semibold">
                {currentPillar.subIndex}
              </span>
            </div>

            {/* Center Visual Canvas Area (HUD + Dotted 3D Fibonacci Particle Sphere) */}
            <div className="relative my-4 sm:my-6 min-h-[360px] sm:min-h-[400px] flex items-center justify-center overflow-hidden">
              {/* Left HUD Overlays with Connecting Bracket */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-[165px] sm:w-[195px] pointer-events-none">
                <div className="relative pl-3.5 border-l border-white/20 flex flex-col gap-6 sm:gap-7 py-1">
                  {/* Horizontal notch branch in the middle */}
                  <div className="absolute -left-px top-1/2 -translate-y-1/2 w-3.5 h-px bg-white/30" />

                  {/* Upper HUD Item */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`upper-${currentPillar.id}`}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 6 }}
                      transition={{ duration: 0.22 }}
                    >
                      <span className="font-mono text-[9px] sm:text-[10px] text-[#FF3E00] font-semibold tracking-wider uppercase block mb-1">
                        {currentPillar.hud.upperTitle}
                      </span>
                      <p className="text-[10.5px] sm:text-[11px] text-[#A1A1AA] leading-relaxed font-sans">
                        {currentPillar.hud.upperText}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Lower HUD Item */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`lower-${currentPillar.id}`}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 6 }}
                      transition={{ duration: 0.22, delay: 0.04 }}
                    >
                      <span className="font-mono text-[9px] sm:text-[10px] text-[#FF3E00] font-semibold tracking-wider uppercase block mb-1">
                        {currentPillar.hud.lowerTitle}
                      </span>
                      <p className="text-[10.5px] sm:text-[11px] text-[#A1A1AA] leading-relaxed font-sans">
                        {currentPillar.hud.lowerText}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* 3D Fibonacci Particle Sphere */}
              <div className="w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] md:w-[390px] md:h-[390px] ml-auto relative">
                <FibonacciSphere3D activeTab={activeTab} />

                {/* Sub-label Below the Sphere */}
                <div className="absolute bottom-1 left-0 right-0 text-center pointer-events-none">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentPillar.sphereLabel}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-[#71717A] uppercase inline-block"
                    >
                      {currentPillar.sphereLabel}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Bottom 3 Sharp Tab Buttons */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
              {PILLARS.map((pillar, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={pillar.id}
                    onClick={() => handleTabChange(idx)}
                    type="button"
                    className={`h-11 sm:h-12 rounded-none flex items-center justify-center gap-1.5 font-dm-sans text-xs sm:text-[13px] tracking-wide transition-all duration-200 select-none cursor-pointer ${
                      isActive
                        ? "bg-[#EAE6DF] text-[#09090B] font-semibold shadow-md shadow-black/40"
                        : "bg-[#050505] text-[#909090] hover:text-[#f4efe6] border border-white/20 hover:border-white/40"
                    }`}
                  >
                    <span>{pillar.badge}</span>
                    <span className="text-[11px]">↗</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="lg:col-span-6 flex flex-col justify-between pl-0 lg:pl-6 xl:pl-8">
            <div className="flex-1 flex flex-col justify-center">
              {/* Editorial 3-Line Serif Headline */}
              <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl lg:text-[62px] xl:text-[68px] font-normal text-[#F4EFE6] leading-[1.04] tracking-[-0.035em]">
                Clean code is
                <br />
                the starting point.
                <br />
                <em className="italic font-normal text-[#FAF6ED] block mt-1">
                  Impact is the point.
                </em>
              </h2>

              {/* Dynamic Narrative Copy with Smooth Crossfade */}
              <div className="min-h-[140px] sm:min-h-[150px] mt-6 sm:mt-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPillar.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="flex flex-col gap-3 sm:gap-4"
                  >
                    <p className="text-lg sm:text-xl md:text-2xl font-normal text-[#EDEDED] leading-snug tracking-[-0.01em]">
                      {currentPillar.narrative.lead}
                    </p>
                    <p className="text-sm sm:text-[15px] font-normal text-[#9A9A9A] leading-relaxed max-w-xl">
                      {currentPillar.narrative.body}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Action Link: Explore my work */}
              <div className="mt-6 sm:mt-8">
                <a
                  href="#projects"
                  onClick={handleExploreClick}
                  className="inline-flex items-center gap-1.5 font-dm-sans text-xs sm:text-sm text-[#EAE6DF] hover:text-white pb-1 border-b border-white/30 hover:border-white transition-all cursor-pointer"
                >
                  <span>Explore my work</span>
                  <span className="text-xs">↗</span>
                </a>
              </div>
            </div>

            {/* Micro-footer */}
            <div className="mt-10 sm:mt-14 pt-4 border-t border-white/[0.08] flex items-center justify-between font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[#71717A] uppercase">
              <span>FULL-STACK MIND.</span>
              <span>API & AI ARCHITECT.</span>
              <span>BUILDER&apos;S AMBITION.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
