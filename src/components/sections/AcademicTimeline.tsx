"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ACADEMIC_STEPS } from "@/lib/data";
import { GraduationCap, MapPin, Calendar } from "lucide-react";

export default function AcademicTimeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const beamRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !beamRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        beamRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="academic"
      ref={containerRef}
      className="relative py-28 sm:py-36 bg-[#030303] overflow-hidden border-b border-white/5"
    >
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-xs sm:text-[13px] tracking-[0.16em] uppercase mb-3">
              <span className="w-2.5 h-2.5 bg-[#FF3E00] inline-block shrink-0 shadow-[0_0_8px_rgba(255,62,0,0.6)]" />
              <span className="text-[#FF3E00] font-medium">
                05 / ACADEMIC FOUNDATION
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Academic Foundation & Evolution.
            </h2>
          </div>
          <p className="font-mono text-xs text-slate-400 max-w-xs">
            Synthesizing core Electronics & Communication Engineering with advanced MERN stack & AI engineering.
          </p>
        </div>

        {/* Timeline with GSAP progress beam */}
        <div className="relative pl-6 sm:pl-10 space-y-16">
          {/* Static Track Line */}
          <div className="absolute left-0 sm:left-3 top-2 bottom-4 w-[2px] bg-white/10" />

          {/* GSAP Scroll-drawn progress beam */}
          <div
            ref={beamRef}
            className="absolute left-0 sm:left-3 top-2 bottom-4 w-[2px] bg-gradient-to-b from-[#ff7043] via-[#ff8a50] to-[#ffa726] origin-top shadow-[0_0_14px_rgba(255,112,67,0.8)]"
          />

          {ACADEMIC_STEPS.map((step) => (
            <div key={step.step} className="relative group">
              {/* Monospace Indicator Node */}
              <div className="absolute -left-[30px] sm:-left-[39px] top-1.5 w-7 h-7 rounded-full bg-[#0a0a0d] border-2 border-[#ff7043] flex items-center justify-center font-mono text-[10px] font-bold text-[#ff8a50] shadow-[0_0_15px_rgba(255,112,67,0.4)]">
                {step.step}
              </div>

              {/* Card Container */}
              <div className="p-8 rounded-2xl bg-[#0a0a0d] border border-white/10 hover:border-[#ff7043]/40 transition-all duration-300 shadow-xl group-hover:shadow-[0_0_30px_rgba(255,112,67,0.12)]">
                {/* Monospace Eyebrow */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-white/10 font-mono text-xs">
                  <span className="text-[#ff7043] font-bold tracking-wider">
                    {step.tag}
                  </span>
                  <div className="flex items-center gap-4 text-slate-400 text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {step.timeline}
                    </span>
                    <span className="flex items-center gap-1.5 hidden sm:flex">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {step.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 mb-2">
                  <GraduationCap className="w-6 h-6 text-[#ff7043] shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {step.title}
                    </h3>
                    <div className="font-mono text-sm text-[#ff8a50] mt-0.5">
                      {step.institution}
                    </div>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed my-4">
                  {step.description}
                </p>

                {/* Sub-Focus Badges */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                  {step.pills.map((pill) => (
                    <span
                      key={pill}
                      className="px-2.5 py-1 rounded-md bg-white/5 text-slate-300 font-mono text-xs border border-white/5"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
