"use client";

import React, { useState, useEffect } from "react";
import { ArrowDown, ArrowUpRight, Pause, Play } from "lucide-react";
import ParticlePortrait3D from "../3d/ParticlePortrait3D";
import { sound } from "@/lib/audio";

export default function HeroSection() {
  const [motionActive, setMotionActive] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const spacerRef = React.useRef<HTMLDivElement | null>(null);
  const [portraitPos, setPortraitPos] = useState<{ top: number; width: number; height: number } | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const syncPos = () => {
      if (spacerRef.current) {
        const rect = spacerRef.current.getBoundingClientRect();
        setPortraitPos({
          top: rect.top + window.scrollY,
          width: rect.width,
          height: rect.height,
        });
      }
    };

    syncPos();
    requestAnimationFrame(() => setHasMounted(true));
    window.addEventListener("resize", syncPos);
    return () => window.removeEventListener("resize", syncPos);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight || 800;
      // Normalizes progress from 0 to 1 as the hero section scrolls
      const p = Math.min(1, Math.max(0, scrollY / (heroHeight * 0.75)));
      setScrollProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    sound.playClick();
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    sound.playClick();
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const toggleMotion = () => {
    sound.playClick();
    setMotionActive((prev) => !prev);
  };

  return (
    <>
      {/* Fixed Portrait Backdrop: Visible, fixed in place on screen, disperses particles & slowly disappears on scroll */}
      <div
        className={`fixed left-1/2 -translate-x-1/2 pointer-events-none z-10 ${
          hasMounted ? "transition-[top,width,height] duration-150" : ""
        }`}
        style={{
          top: portraitPos ? `${portraitPos.top}px` : "124px",
          width: portraitPos ? `${portraitPos.width}px` : "min(540px, 45vw)",
          height: portraitPos ? `${portraitPos.height}px` : "min(438px, 48vh)",
          opacity: !portraitPos || scrollProgress > 0.95 ? 0 : 1,
          visibility: !portraitPos || scrollProgress > 0.95 ? "hidden" : "visible",
        }}
      >
        <ParticlePortrait3D
          motionActive={motionActive}
          scrollProgress={scrollProgress}
        />
      </div>

      <section
        id="hero"
        className="relative h-[100dvh] w-full flex flex-col justify-between pt-[108px] sm:pt-[116px] pb-3 sm:pb-4 px-4 sm:px-10 lg:px-14 xl:px-16 overflow-hidden bg-transparent text-[#f4efe6] select-none"
      >
        {/* 6-Column Architectural Grid Lines (1:1 with reference) */}
        <div className="absolute inset-0 px-6 sm:px-10 lg:px-14 xl:px-16 grid grid-cols-6 pointer-events-none z-0">
          <div className="border-r border-white/[0.035]" />
          <div className="border-r border-white/[0.035]" />
          <div className="border-r border-white/[0.035]" />
          <div className="border-r border-white/[0.035]" />
          <div className="border-r border-white/[0.035]" />
          <div />
        </div>

        {/* Topline Telemetry Header */}
        <div className="relative z-20 w-full flex items-center justify-between text-[9px] sm:text-[10px] font-mono tracking-[1.5px] text-[#707070] shrink-0 mb-1 sm:mb-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff7043] animate-pulse" />
            <span className="uppercase text-[#888888]">ENGINEER. ARCHITECT. BUILDER.</span>
          </div>
          <div className="uppercase text-[#888888]">
            BASED IN INDIA • THINKING BEYOND
          </div>
        </div>

        {/* Left-side Vertical HUD Side Note (Column 1) */}
        <div className="hidden lg:flex flex-col gap-4 absolute left-6 sm:left-10 lg:left-14 xl:left-16 top-1/2 -translate-y-1/2 font-mono text-[9px] tracking-[2px] text-[#606060] z-20 pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#FF3E00] inline-block shrink-0 shadow-[0_0_6px_rgba(255,62,0,0.6)]" />
            <span className="text-[#FF3E00] font-medium tracking-[0.16em]">01 / PRESENCE</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[#ff7043] text-sm font-bold leading-none">+</span>
            <span className="text-[#888888]">ENGINEERING</span>
            <span className="text-[#888888]">MERN STACK</span>
            <span className="text-[#888888]">AI ARCHITECTURE</span>
          </div>
        </div>

        {/* Centerpiece Hero Composition: Fits seamlessly inside 100vh with zero overflow */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center w-full max-w-6xl mx-auto text-center min-h-0 pt-1 sm:pt-2">
          {/* Top group: Portrait spacer, Kicker, Giant Name, and Bio Subtitle */}
          <div className="flex flex-col items-center w-full">
            {/* Spacer that reserves exact dimensions of the portrait in document flow */}
            <div
              ref={spacerRef}
              className="w-[clamp(340px,45vw,540px)] h-[clamp(280px,48vh,438px)] mx-auto pointer-events-none -mb-[52px] sm:-mb-[64px] md:-mb-[78px]"
            />

            {/* Monospace Kicker: Nestled cleanly at base of collar, inside reference box */}
            <div className="relative z-20 font-mono text-[8px] sm:text-[9.5px] tracking-[0.28em] text-[#a0a0a0] uppercase mt-1 mb-1 sm:mb-1.5">
              A HUMAN PERSPECTIVE ON TECHNOLOGY
            </div>

            {/* Giant Editorial Serif Title: Sudip Patra (Spans across the red bracket width) */}
            <h1 className="relative z-20 font-serif-display text-center text-[clamp(62px,11.5vw,138px)] font-normal text-[#f4efe6] leading-[0.88] tracking-[-0.04em] drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
              Sudip <em className="italic font-normal">Patra</em>
            </h1>

            {/* Centered Bio Subtitle (Wider, matching the blue bracket span) */}
            <p className="relative z-20 mt-3.5 sm:mt-4.5 md:mt-5.5 text-[#a8a29e] text-xs sm:text-[14px] md:text-[15.5px] max-w-xl sm:max-w-2xl mx-auto leading-relaxed font-sans px-4 ">
              I build scalable web apps, engineer AI pipelines,
              <br className="hidden sm:inline" /> and turn complex ideas into production software.
            </p>
          </div>
        </div>

        {/* Bottom Status Bar: Left (Scroll to discover), Center (Action Buttons), Right (Exploration & Motion) all on the same axis */}
        <div className="relative z-20 w-full flex items-center justify-between text-[9px] sm:text-[10px] font-mono tracking-[1.5px] text-[#606060] shrink-0 pt-2 pb-2">
          {/* Left: Scroll to discover */}
          <div className="flex-1 flex items-center justify-start">
            <a
              href="#manifesto"
              className="flex items-center gap-1.5 text-[#707070] hover:text-[#d0d0d0] transition-colors"
            >
              <span className="w-3 h-[1px] bg-[#555555] inline-block" />
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[1.5px] whitespace-nowrap">
                <span className="sm:hidden">SCROLL ↓</span>
                <span className="hidden sm:inline">SCROLL TO DISCOVER ↓</span>
              </span>
            </a>
          </div>

          {/* Center: Explore my work & Start a conversation (Same Horizontal Axis) */}
          <div className="flex items-center justify-center gap-4 sm:gap-9 md:gap-11">
            <a
              href="#projects"
              onClick={scrollToProjects}
              className="group inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-[#111113] hover:bg-[#18181b] border border-white/15 hover:border-white/30 text-[#e0e0e0] hover:text-white font-dm-sans text-xs sm:text-[13px] tracking-wide transition-all duration-300 shadow-md shadow-black/50 whitespace-nowrap"
            >
              <span>Explore my work</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform text-[#909090] group-hover:text-white" />
            </a>

            <a
              href="#contact"
              onClick={scrollToContact}
              className="hidden sm:inline-flex items-center gap-1.5 font-dm-sans text-xs sm:text-[13px] tracking-wide text-[#909090] hover:text-white transition-colors duration-300 pb-0.5 border-b border-white/20 hover:border-white whitespace-nowrap"
            >
              <span>Start a conversation</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#909090] hover:text-white" />
            </a>
          </div>

          {/* Right: Exploration tag + Motion Toggle */}
          <div className="flex-1 flex items-center justify-end gap-3 font-mono">
            <span className="hidden md:inline text-[#666666] tracking-[1.5px]">
              AN ONGOING EXPLORATION • 2026
            </span>

            <button
              onClick={toggleMotion}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded bg-[#111111] border border-white/10 text-[9px] font-mono text-[#999999] hover:text-white transition-colors cursor-pointer shrink-0"
            >
              {motionActive ? (
                <>
                  <Pause className="w-2.5 h-2.5" />
                  <span>MOTION ON</span>
                </>
              ) : (
                <>
                  <Play className="w-2.5 h-2.5" />
                  <span>MOTION OFF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
