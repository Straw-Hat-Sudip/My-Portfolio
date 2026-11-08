"use client";

import React from "react";
import { MARQUEE_TAGS } from "@/lib/data";

export default function SlashMarquee() {
  const repeatedTags = [...MARQUEE_TAGS, ...MARQUEE_TAGS, ...MARQUEE_TAGS];

  return (
    <div className="relative w-full py-4 bg-[#0a0a0c] border-y border-white/10 overflow-hidden select-none">
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0c] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0c] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
        {repeatedTags.map((tag, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 px-4 group cursor-default"
          >
            <span className="font-mono text-[#ff7043] font-bold text-sm tracking-wider">
              /
            </span>
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-slate-300 group-hover:text-white transition-colors duration-200">
              {tag}
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
