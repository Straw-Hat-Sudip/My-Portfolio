"use client";

import React, { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { sound } from "@/lib/audio";

export default function AudioToggle() {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsMuted(sound.getMuted());
    });
  }, []);

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
    if (!next) {
      sound.playClick();
    }
  };

  return (
    <button
      onClick={toggleSound}
      title={isMuted ? "Enable sound effects" : "Mute sound effects"}
      aria-label="Toggle UI Audio"
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors duration-200 group"
    >
      {isMuted ? (
        <VolumeX className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-400 transition-colors" />
      ) : (
        <Volume2 className="w-3.5 h-3.5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      )}
      <span className="font-mono text-[11px] text-slate-300 group-hover:text-white transition-colors">
        {isMuted ? "SFX: OFF" : "SFX: ON"}
      </span>
      {!isMuted && (
        <span className="flex items-end gap-0.5 h-2.5">
          <span className="w-0.5 h-full bg-cyan-400 rounded-full animate-pulse" />
          <span className="w-0.5 h-2/3 bg-cyan-400 rounded-full animate-pulse delay-75" />
          <span className="w-0.5 h-4/5 bg-cyan-400 rounded-full animate-pulse delay-150" />
        </span>
      )}
    </button>
  );
}
