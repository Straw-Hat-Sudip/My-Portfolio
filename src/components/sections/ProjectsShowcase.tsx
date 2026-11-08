"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PROJECTS } from "@/lib/data";
import { sound } from "@/lib/audio";
import confetti from "canvas-confetti";
import {
  ExternalLink,
  CheckCircle2,
  CreditCard,
  Radio,
  FileText,
  Bot,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  TrendingUp,
  Globe,
  Terminal,
  Cpu,
  Layers,
  Copy,
  Check,
  Play,
  Zap,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";

type CategoryFilter = "All" | "Full Stack & AI" | "E-Commerce & FinTech" | "ECE Academic Bonus";
type ProjectTab = "architecture" | "simulator" | "source";

// ==========================================
// 1. HEALTHAI INTERACTIVE CLINICAL SIMULATOR
// ==========================================
function HealthAiSimulator() {
  const [selectedCase, setSelectedCase] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const sampleCases = [
    {
      label: "Case 1: Cardiac Assessment",
      text: "Patient (48M) presents with acute substernal chest pressure radiating to left arm. Blood pressure 148/94 mmHg, HR 102 bpm. Mild dyspnea on exertion. EKG shows non-specific ST changes.",
      vitals: ["BP: 148/94", "HR: 102 bpm", "SpO2: 97%"],
      triage: "URGENT // CARDIOLOGY REFERRAL",
      triageColor: "text-red-400 bg-red-950/40 border-red-500/40",
      findings: "High risk of Acute Coronary Syndrome (ACS). Immediate Troponin-I and 12-lead EKG serial monitoring recommended.",
      confidence: "98.4%",
    },
    {
      label: "Case 2: Metabolic Panel",
      text: "Patient (35F) routine follow-up: Fasting blood glucose 118 mg/dL, HbA1c 6.1%, total cholesterol 212 mg/dL, LDL 134 mg/dL. BMI 27.2. No acute symptoms reported.",
      vitals: ["Glucose: 118 mg/dL", "HbA1c: 6.1%", "BMI: 27.2"],
      triage: "ELEVATED // PRE-DIABETIC MONITORING",
      triageColor: "text-amber-400 bg-amber-950/40 border-amber-500/40",
      findings: "Impaired fasting glucose consistent with early pre-diabetes. Lifestyle intervention and 90-day repeat HbA1c advised.",
      confidence: "96.8%",
    },
    {
      label: "Case 3: Respiratory Infection",
      text: "Patient (24M) reports 4 days of productive cough with yellow sputum, low-grade fever 38.1°C, and mild wheezing. Lungs reveal bilateral rhonchi on auscultation.",
      vitals: ["Temp: 38.1°C", "Resp: 18/min", "SpO2: 98%"],
      triage: "PRIMARY CARE // ACUTE BRONCHITIS",
      triageColor: "text-emerald-400 bg-emerald-950/40 border-emerald-500/40",
      findings: "Clinical picture strongly points toward viral acute bronchitis. Hydration, antipyretics, and bronchodilator evaluation.",
      confidence: "95.2%",
    },
  ];

  const handleRunAnalysis = () => {
    sound.playClick();
    setIsAnalyzing(true);
    setAnalyzed(false);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzed(true);
      sound.playSuccess();
    }, 900);
  };

  const current = sampleCases[selectedCase];

  return (
    <div className="rounded-2xl bg-[#070709] border border-white/10 p-5 font-mono text-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-[#ff7043] font-semibold">
          <Bot className="w-4 h-4" />
          <span>GEMINI 1.5 MULTIMODAL CLINICAL PIPELINE</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ff7043]/10 border border-[#ff7043]/30 text-[#ff8a50] text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff7043] animate-pulse" />
          <span>STREAMING TOKEN SYNTHESIS</span>
        </div>
      </div>

      {/* Case Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
        {sampleCases.map((c, idx) => (
          <button
            key={idx}
            onClick={() => {
              sound.playClick();
              setSelectedCase(idx);
              setAnalyzed(false);
            }}
            className={`p-2.5 rounded-xl border text-left transition-all ${
              selectedCase === idx
                ? "bg-white/10 border-[#ff7043]/60 text-white shadow-sm"
                : "bg-black/40 border-white/5 text-slate-400 hover:text-white hover:border-white/20"
            }`}
          >
            <div className="font-semibold text-[11px] truncate">{c.label}</div>
            <div className="text-[10px] text-slate-500 truncate mt-0.5">Click to load record</div>
          </button>
        ))}
      </div>

      {/* Input Medical Report Record */}
      <div className="p-3.5 rounded-xl bg-black/60 border border-white/5 mb-4">
        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
          <span>Inbound Clinical Transcript</span>
          <span>FORMAT: UNSTRUCTURED TEXT</span>
        </div>
        <p className="text-slate-200 text-xs leading-relaxed font-sans">{current.text}</p>
      </div>

      {/* Action Trigger */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <button
          onClick={handleRunAnalysis}
          disabled={isAnalyzing}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff7043] to-[#ff5722] hover:from-[#ff8a50] hover:to-[#ff7043] text-white font-semibold flex items-center gap-2 transition-all shadow-md shadow-[#ff7043]/20 disabled:opacity-50"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing Clinical Tokens...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Run Gemini AI Diagnostic</span>
            </>
          )}
        </button>

        <span className="text-[10px] text-slate-500 hidden sm:inline">
          Average Response: ~180ms Latency
        </span>
      </div>

      {/* AI Synthesis Result */}
      {analyzed && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-[#0c1017] border border-[#ff7043]/30 space-y-3"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className={`px-2.5 py-1 rounded-md border text-[10px] font-bold ${current.triageColor}`}>
              {current.triage}
            </span>
            <span className="text-emerald-400 text-[11px] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Confidence: {current.confidence}</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {current.vitals.map((v, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 text-[10px]">
                {v}
              </span>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 text-slate-300 font-sans text-xs leading-relaxed">
            <strong className="text-white font-mono text-[11px]">DIAGNOSTIC SYNTHESIS: </strong>
            {current.findings}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ==========================================
// 2. EBOOK HUB INTERACTIVE COMMERCE SIMULATOR
// ==========================================
function EbookHubSimulator() {
  const [couponApplied, setCouponApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paid, setPaid] = useState(false);

  const basePrice = 499;
  const discount = couponApplied ? 100 : 0;
  const finalPrice = basePrice - discount;

  const handleCheckout = () => {
    sound.playClick();
    setIsProcessing(true);
    setPaid(false);
    setTimeout(() => {
      setIsProcessing(false);
      setPaid(true);
      sound.playSuccess();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#ff7043", "#4caf50", "#ffffff"],
        });
      } catch {
        // Safe fallback
      }
    }, 1100);
  };

  return (
    <div className="rounded-2xl bg-[#070709] border border-white/10 p-5 font-mono text-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold">
          <CreditCard className="w-4 h-4" />
          <span>RAZORPAY & JWT CHECKOUT PIPELINE</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>PRODUCTION LIVE ON VERCEL</span>
        </div>
      </div>

      {/* Cart Item Preview */}
      <div className="p-3.5 rounded-xl bg-black/60 border border-white/5 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#ff7043]/15 border border-[#ff7043]/30 flex items-center justify-center text-[#ff7043] shrink-0 font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-white font-semibold font-sans text-sm">
              Full Stack Web Architecture Handbook (2026 Edition)
            </div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">
              FORMAT: EPUB + DRM-FREE PDF • INSTANT ACCESS
            </div>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-white font-bold text-base">₹{basePrice}</div>
          {couponApplied && <div className="text-[10px] text-emerald-400">-₹100 (BUILDER10)</div>}
        </div>
      </div>

      {/* Coupon Control */}
      <div className="flex items-center justify-between gap-3 mb-4 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
        <span className="text-[11px] text-slate-400 flex items-center gap-2">
          <span>COUPON CODE:</span>
          <code className="text-[#ff8a50] font-bold">BUILDER10</code>
        </span>
        <button
          onClick={() => {
            sound.playClick();
            setCouponApplied(!couponApplied);
            setPaid(false);
          }}
          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] transition-colors"
        >
          {couponApplied ? "Remove Coupon" : "Apply -₹100"}
        </button>
      </div>

      {/* Checkout Terminal */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="text-slate-400 text-xs">
          Total Due: <span className="text-white font-bold text-base">₹{finalPrice}</span>
          <span className="text-[10px] text-slate-500 ml-2">(Webhook Verified)</span>
        </div>

        <button
          onClick={handleCheckout}
          disabled={isProcessing}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-semibold flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Verifying Razorpay Signature...</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Simulate Verified Payment</span>
            </>
          )}
        </button>
      </div>

      {paid && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="font-bold flex items-center gap-1.5 text-xs text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>PAYMENT CONFIRMED // SIGNATURE HMAC-SHA256 VALID</span>
            </span>
            <span className="text-[10px] text-emerald-500">AUTH: JWT COOKIE</span>
          </div>
          <div className="text-xs font-sans text-slate-300">
            Order <code className="text-white font-mono">#ORD-94827</code> settled. Instant download link authorized.
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ==========================================
// 3. STOCKFORECAST INTERACTIVE CHART SIMULATOR
// ==========================================
function StockForecastSimulator() {
  const [selectedTicker, setSelectedTicker] = useState("NVDA");
  const [showIndicators, setShowIndicators] = useState(true);

  const tickerData: Record<
    string,
    { name: string; price: number; change: string; rsi: number; direction: string; points: number[] }
  > = {
    NVDA: {
      name: "NVIDIA Corp",
      price: 138.45,
      change: "+5.8% (Bullish)",
      rsi: 64.2,
      direction: "ACCUMULATION",
      points: [118, 122, 120, 126, 124, 131, 135, 138, 142, 146],
    },
    AAPL: {
      name: "Apple Inc",
      price: 224.8,
      change: "+2.1% (Neutral-Bullish)",
      rsi: 54.8,
      direction: "CONSOLIDATION",
      points: [214, 216, 218, 215, 219, 222, 221, 224, 227, 229],
    },
    TSLA: {
      name: "Tesla Inc",
      price: 262.1,
      change: "+7.4% (Breakout)",
      rsi: 71.5,
      direction: "HIGH VOLATILITY",
      points: [230, 238, 235, 246, 242, 255, 250, 262, 271, 278],
    },
  };

  const curr = tickerData[selectedTicker];
  const maxPt = Math.max(...curr.points);
  const minPt = Math.min(...curr.points);
  const range = maxPt - minPt || 1;

  return (
    <div className="rounded-2xl bg-[#070709] border border-white/10 p-5 font-mono text-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-[#ff7043] font-semibold">
          <TrendingUp className="w-4 h-4" />
          <span>FASTAPI + PYTORCH LSTM TIME-SERIES ENGINE</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ff7043]/10 border border-[#ff7043]/30 text-[#ff8a50] text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff7043] animate-pulse" />
          <span>YFINANCE REAL-TIME INGESTION</span>
        </div>
      </div>

      {/* Ticker Selector */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex gap-2">
          {Object.keys(tickerData).map((ticker) => (
            <button
              key={ticker}
              onClick={() => {
                sound.playClick();
                setSelectedTicker(ticker);
              }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                selectedTicker === ticker
                  ? "bg-[#ff7043]/20 border-[#ff7043] text-white"
                  : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              {ticker}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            sound.playClick();
            setShowIndicators(!showIndicators);
          }}
          className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-slate-300 transition-colors"
        >
          {showIndicators ? "Hide Indicators" : "Show RSI / MACD"}
        </button>
      </div>

      {/* Chart Canvas Area */}
      <div className="p-4 rounded-xl bg-black/70 border border-white/5 mb-4">
        <div className="flex items-center justify-between mb-3 text-[11px]">
          <div>
            <span className="text-white font-bold text-sm mr-2">${curr.price}</span>
            <span className="text-emerald-400 font-semibold">{curr.change}</span>
          </div>
          <div className="text-slate-500 text-[10px]">
            HISTORICAL (7D) + LSTM PREDICTED (3D)
          </div>
        </div>

        {/* SVG Time Series Curve */}
        <div className="w-full h-32 relative">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 300 100">
            {/* Grid lines */}
            <line x1="0" y1="25" x2="300" y2="25" stroke="#ffffff0d" strokeDasharray="3 3" />
            <line x1="0" y1="50" x2="300" y2="50" stroke="#ffffff0d" strokeDasharray="3 3" />
            <line x1="0" y1="75" x2="300" y2="75" stroke="#ffffff0d" strokeDasharray="3 3" />

            {/* Prediction boundary line */}
            <line x1="210" y1="0" x2="210" y2="100" stroke="#ff704344" strokeDasharray="2 2" />

            {/* Polyline Path */}
            <polyline
              fill="none"
              stroke="#ff7043"
              strokeWidth="2.5"
              points={curr.points
                .map((pt, idx) => {
                  const x = (idx / (curr.points.length - 1)) * 300;
                  const y = 90 - ((pt - minPt) / range) * 80;
                  return `${x},${y}`;
                })
                .join(" ")}
            />

            {/* Data points */}
            {curr.points.map((pt, idx) => {
              const x = (idx / (curr.points.length - 1)) * 300;
              const y = 90 - ((pt - minPt) / range) * 80;
              const isPredicted = idx >= 7;
              return (
                <circle
                  key={idx}
                  cx={x}
                  cy={y}
                  r={isPredicted ? 3.5 : 2.5}
                  fill={isPredicted ? "#ffa726" : "#ffffff"}
                  stroke={isPredicted ? "#ff7043" : "#000000"}
                  strokeWidth="1.5"
                />
              );
            })}
          </svg>
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-white/5">
          <span>Day -7</span>
          <span>Day -3</span>
          <span className="text-[#ff7043] font-semibold">Today (T0)</span>
          <span className="text-[#ffa726] font-semibold">+3D LSTM Forecast</span>
        </div>
      </div>

      {/* Model Metrics HUD */}
      {showIndicators && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
            <div className="text-[10px] text-slate-500">RSI (14D)</div>
            <div className="font-bold text-white mt-0.5">{curr.rsi}</div>
          </div>
          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
            <div className="text-[10px] text-slate-500">SIGNAL</div>
            <div className="font-bold text-emerald-400 mt-0.5">{curr.direction}</div>
          </div>
          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
            <div className="text-[10px] text-slate-500">MSE LOSS</div>
            <div className="font-bold text-[#ff8a50] mt-0.5">0.0024</div>
          </div>
          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
            <div className="text-[10px] text-slate-500">DIRECTION ACCURACY</div>
            <div className="font-bold text-white mt-0.5">94.2%</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 4. SMART TRAIN TELEMETRY SIMULATOR
// ==========================================
function SmartTrainSimulator() {
  const [distance, setDistance] = useState(130);
  const isHazard = distance <= 50;

  const handleApproach = () => {
    sound.playClick();
    setDistance((d) => Math.max(20, d - 35));
    if (distance - 35 <= 50) {
      sound.playDecode();
    }
  };

  const handleReset = () => {
    sound.playClick();
    setDistance(140);
  };

  return (
    <div className="rounded-2xl bg-[#070709] border border-white/10 p-5 font-mono text-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold">
          <Radio className="w-4 h-4 animate-pulse" />
          <span>ESP32 WEBSOCKET RADAR & INTERLOCK SYSTEM</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleApproach}
            className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[10px] transition-colors"
          >
            Simulate Train Approach
          </button>
          <button
            onClick={handleReset}
            className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white text-[10px] transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Radar Distance Visualizer */}
      <div className="p-4 rounded-xl bg-black/70 border border-white/5 mb-4 space-y-3">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-400">Inter-Train Radar Clearance</span>
          <span className="font-bold text-white">{distance} Meters</span>
        </div>

        {/* Distance Range Meter */}
        <div className="relative w-full h-3 rounded-full bg-white/10 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              isHazard ? "bg-red-500 animate-pulse" : "bg-emerald-400"
            }`}
            style={{ width: `${Math.min(100, (distance / 150) * 100)}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-500">
          <span>0m (Collision)</span>
          <span className="text-red-400 font-semibold">50m (Failsafe Threshold)</span>
          <span>150m (Clear)</span>
        </div>
      </div>

      {/* Telemetry Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
          <div className="text-[10px] text-slate-500 uppercase">WebSocket Latency</div>
          <div className="text-base font-bold text-emerald-400 mt-1">14 ms</div>
        </div>

        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
          <div className="text-[10px] text-slate-500 uppercase">MCU Architecture</div>
          <div className="text-base font-bold text-white mt-1">ESP32 Dual-Core</div>
        </div>

        <div
          className={`p-3 rounded-xl border transition-colors ${
            isHazard
              ? "bg-red-950/40 border-red-500/50 text-red-300"
              : "bg-emerald-950/30 border-emerald-500/30 text-emerald-300"
          }`}
        >
          <div className="text-[10px] text-slate-400 uppercase">Servo Diverter</div>
          <div className="text-xs font-bold mt-1 flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                isHazard ? "bg-red-400 animate-ping" : "bg-emerald-400"
              }`}
            />
            <span>{isHazard ? "ENGAGED // TRACK DIVERTED" : "NORMAL // LOCKED"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// MAIN COMPONENT: INTERACTIVE ENGINEERING DOSSIER
// ==========================================
export default function ProjectsShowcase() {
  const [selectedFilter, setSelectedFilter] = useState<CategoryFilter>("All");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("ai-healthcare-assistant");
  const [activeTab, setActiveTab] = useState<ProjectTab>("architecture");
  const [copiedClone, setCopiedClone] = useState(false);

  const filteredProjects =
    selectedFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedFilter);

  // Fallback to first available project if current selection is filtered out
  const activeProject =
    filteredProjects.find((p) => p.id === selectedProjectId) || filteredProjects[0] || PROJECTS[0];

  const handleCopyClone = (url?: string) => {
    if (!url) return;
    sound.playClick();
    const cmd = `git clone ${url}.git`;
    navigator.clipboard.writeText(cmd);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  return (
    <section
      id="projects"
      className="relative py-28 sm:py-36 bg-[#030303] overflow-hidden border-b border-white/5"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 px-6 sm:px-10 lg:px-14 xl:px-16 grid grid-cols-6 pointer-events-none z-0">
        <div className="border-r border-white/[0.035]" />
        <div className="border-r border-white/[0.035]" />
        <div className="border-r border-white/[0.035]" />
        <div className="border-r border-white/[0.035]" />
        <div className="border-r border-white/[0.035]" />
        <div />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-xs sm:text-[13px] tracking-[0.16em] uppercase mb-3">
              <span className="w-2.5 h-2.5 bg-[#FF3E00] inline-block shrink-0 shadow-[0_0_8px_rgba(255,62,0,0.6)]" />
              <span className="text-[#FF3E00] font-medium">
                04 / PRODUCTION SYSTEMS
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f4efe6] tracking-tight font-serif-display">
              No Resume Theatre. <em className="italic font-normal text-[#ff7043]">Just What I&apos;ve Built.</em>
            </h2>

            <p className="mt-3 text-slate-400 text-sm sm:text-base font-sans max-w-2xl leading-relaxed">
              Four verified, full-stack systems engineered with production architectures, clean database schemas, and live testable telemetry.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {(
              [
                "All",
                "Full Stack & AI",
                "E-Commerce & FinTech",
                "ECE Academic Bonus",
              ] as CategoryFilter[]
            ).map((filter) => {
              const count =
                filter === "All"
                  ? PROJECTS.length
                  : PROJECTS.filter((p) => p.category === filter).length;

              return (
                <button
                  key={filter}
                  onClick={() => {
                    sound.playClick();
                    setSelectedFilter(filter);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 flex items-center gap-1.5 ${
                    selectedFilter === filter
                      ? "bg-[#eae6df] text-[#09090b] font-semibold shadow-sm"
                      : "bg-black/60 text-slate-400 hover:text-white border border-white/10"
                  }`}
                >
                  <span>{filter}</span>
                  <span className={`text-[10px] ${selectedFilter === filter ? "text-[#09090b]/70" : "text-slate-500"}`}>
                    [{count}]
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Split-Screen Interactive Dossier Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Project Selector Stack (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest px-2 mb-2 flex items-center justify-between">
              <span>SYSTEM DIRECTORY</span>
              <span>SELECT TO INSPECT //</span>
            </div>

            {filteredProjects.map((project) => {
              const isSelected = activeProject.id === project.id;

              return (
                <div
                  key={project.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedProjectId(project.id);
                  }}
                  className={`group relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer text-left ${
                    isSelected
                      ? "bg-[#0f0f13] border-[#ff7043]/60 shadow-lg shadow-black/60 pl-6"
                      : "bg-[#08080a] border-white/5 hover:border-white/20 hover:bg-[#0c0c10]"
                  }`}
                >
                  {/* Left accent bar on active */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeAccentBar"
                      className="absolute left-0 top-3 bottom-3 w-1.5 bg-[#ff7043] rounded-r-full"
                    />
                  )}

                  {/* Header Row */}
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[#ff7043] font-bold">{project.number} {"//"}</span>
                      <span className="text-slate-400 text-[11px] uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px]">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          project.liveUrl && !project.liveUrl.includes("github.com")
                            ? "bg-emerald-400 animate-pulse"
                            : project.githubUrl
                            ? "bg-[#ff7043]"
                            : "bg-amber-400"
                        }`}
                      />
                      <span
                        className={
                          project.liveUrl && !project.liveUrl.includes("github.com")
                            ? "text-emerald-400"
                            : project.githubUrl
                            ? "text-slate-400"
                            : "text-amber-400/90 font-medium"
                        }
                      >
                        {project.liveUrl && !project.liveUrl.includes("github.com")
                          ? "LIVE"
                          : project.githubUrl
                          ? "REPO"
                          : "LAB PROTO"}
                      </span>
                    </div>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-[#ff8a50] transition-colors">
                    {project.title}
                  </h3>

                  {/* Tech stack badge list */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-white/5 border border-white/5 font-mono text-[10px] text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono text-slate-500">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Highlight stat */}
                  {project.featuredStat && (
                    <div className="text-[11px] font-mono text-emerald-400/90 flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{project.featuredStat}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Interactive Project Stage Console (lg:col-span-7) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#09090c] border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* Background gradient flare */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff7043]/5 rounded-full blur-3xl pointer-events-none" />

              {/* Console Top Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#ff7043] mb-1">
                    <span>SYSTEM_{activeProject.number}</span>
                    <span>•</span>
                    <span className="text-slate-400 uppercase">{activeProject.category}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-serif-display">
                    {activeProject.title}
                  </h3>
                </div>

                {/* Direct Action Link Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
                      title="View GitHub Repository"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  {activeProject.liveUrl && !activeProject.liveUrl.includes("github.com") && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-semibold font-mono text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Live Site</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  {!activeProject.githubUrl &&
                    (!activeProject.liveUrl || activeProject.liveUrl.includes("github.com")) && (
                      <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-xs flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-amber-400" />
                        <span>Hardware Capstone (Lab Prototype)</span>
                      </span>
                    )}
                </div>
              </div>

              {/* Console Inspection Mode Tabs */}
              <div className="flex items-center gap-2 p-1.5 rounded-xl bg-black/60 border border-white/10 mb-6 font-mono text-xs overflow-x-auto">
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab("architecture");
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
                    activeTab === "architecture"
                      ? "bg-white/15 text-white font-semibold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Architecture & Specs</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab("simulator");
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
                    activeTab === "simulator"
                      ? "bg-[#ff7043] text-black font-bold shadow-md shadow-[#ff7043]/30"
                      : "text-slate-400 hover:text-[#ff8a50]"
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Live Interactive Demo</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab("source");
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
                    activeTab === "source"
                      ? "bg-white/15 text-white font-semibold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {activeProject.githubUrl ? (
                    <>
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Terminal & Clone</span>
                    </>
                  ) : (
                    <>
                      <Cpu className="w-3.5 h-3.5" />
                      <span>Firmware Architecture</span>
                    </>
                  )}
                </button>
              </div>

              {/* Dynamic Console Stage Content */}
              <AnimatePresence mode="wait">
                {activeTab === "architecture" && (
                  <motion.div
                    key="architecture"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    {/* Role & Context Banner */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-[#ff7043] font-bold">ROLE:</span>
                        <span className="text-white">{activeProject.role}</span>
                      </div>
                      <div className="text-slate-500">PRODUCTION TIMELINE: {activeProject.period}</div>
                    </div>

                    {activeProject.contextNote && (
                      <div className="p-3.5 rounded-xl bg-[#ff7043]/10 border border-[#ff7043]/20 text-[#ffab91] text-xs font-mono leading-relaxed">
                        ⚡ {activeProject.contextNote}
                      </div>
                    )}

                    {/* Bullet Highlights */}
                    <div>
                      <div className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-3">
                        ENGINEERING HIGHLIGHTS & ARCHITECTURE:
                      </div>
                      <ul className="space-y-3">
                        {activeProject.highlights.map((hl, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ff7043] mt-2 shrink-0" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Full Stack Tech Pills */}
                    <div>
                      <div className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-2.5">
                        PRODUCTION DEPENDENCIES & TECHNOLOGIES:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-md bg-white/5 text-slate-200 font-mono text-xs border border-white/10"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "simulator" && (
                  <motion.div
                    key="simulator"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    {activeProject.id === "ai-healthcare-assistant" && <HealthAiSimulator />}
                    {activeProject.id === "digital-ebook-store" && <EbookHubSimulator />}
                    {activeProject.id === "stock-forecast-engine" && <StockForecastSimulator />}
                    {activeProject.id === "smart-train-collision-system" && <SmartTrainSimulator />}
                  </motion.div>
                )}

                {activeTab === "source" && (
                  <motion.div
                    key="source"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4 font-mono text-xs"
                  >
                    {/* Terminal Window Box */}
                    <div className="rounded-2xl bg-black border border-white/10 p-5 space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10 text-slate-500">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                          <span className="ml-2 text-slate-400 text-[11px]">bash — terminal</span>
                        </div>
                        <span>UTF-8</span>
                      </div>

                      {/* Clone command snippet or Hardware Firmware Status */}
                      {activeProject.githubUrl ? (
                        <div>
                          <div className="text-[11px] text-slate-400 mb-2"># Clone verified codebase locally:</div>
                          <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/10">
                            <code className="text-[#ff8a50] select-all truncate">
                              git clone {activeProject.githubUrl}.git
                            </code>
                            <button
                              onClick={() => handleCopyClone(activeProject.githubUrl)}
                              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors shrink-0 text-xs"
                            >
                              {copiedClone ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  <span className="text-emerald-400">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-slate-300 space-y-2">
                          <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
                            <Cpu className="w-4 h-4" />
                            <span>Academic Hardware Prototype &bull; Embedded Microcontroller Firmware</span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            This capstone project runs embedded C++ firmware flashed directly to an ESP32 microcontroller and NodeMCU unit with custom ultrasonic telemetry circuits. There is no public GitHub repository; the full interactive telemetry demo is available in the Live Demo tab.
                          </p>
                        </div>
                      )}

                      {/* Architecture file structure preview */}
                      <div className="pt-2">
                        <div className="text-[11px] text-slate-400 mb-2">
                          {activeProject.githubUrl ? "# Key Module Layout:" : "# Embedded Firmware & Telemetry Architecture:"}
                        </div>
                        {activeProject.githubUrl ? (
                          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-slate-400 space-y-1 text-[11px]">
                            <div>├── /client &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-600"># Frontend Web Architecture</span></div>
                            <div>├── /server &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-600"># REST / API Engine</span></div>
                            <div>├── /controllers &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-600"># Business & Algorithm Logic</span></div>
                            <div>├── /middleware &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-600"># Auth & Security Handlers</span></div>
                            <div>└── /models &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-600"># Data Persistence Schemas</span></div>
                          </div>
                        ) : (
                          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-slate-400 space-y-1 text-[11px]">
                            <div>├── /firmware/esp32_radar_tx.ino &nbsp;&nbsp;<span className="text-slate-600"># Ultrasonic Ping &amp; WebSocket Telemetry</span></div>
                            <div>├── /firmware/nodemcu_brake_rx.ino &nbsp;<span className="text-slate-600"># Track Interlock &amp; Servo Diverter</span></div>
                            <div>├── /dashboard/ws_telemetry.js &nbsp;&nbsp;&nbsp;<span className="text-slate-600"># Sub-50ms WebSocket Radar Visualizer</span></div>
                            <div>└── /schematics/circuit_pinout.pdf &nbsp;<span className="text-slate-600"># Voltage Divider &amp; Sensor Pinout</span></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
