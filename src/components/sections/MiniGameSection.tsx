"use client";

import React, { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import { sound } from "@/lib/audio";
import { PERSONAL_INFO, PROJECTS } from "@/lib/data";
import {
  Terminal as TerminalIcon,
  Sparkles,
  Trash2,
  Bug,
  Award,
  Send,
  CheckCircle2,
  Palette,
} from "lucide-react";

interface HistoryEntry {
  id: string;
  type: "input" | "output" | "error" | "success" | "banner";
  command?: string;
  content: React.ReactNode;
  timestamp: string;
}

interface BugQuestion {
  id: number;
  scenario: string;
  code: string[];
  correctLine: number;
  explanation: string;
}

const BUG_QUESTIONS: BugQuestion[] = [
  {
    id: 1,
    scenario: "CRITICAL: Async MongoDB query returning pending Promise instead of documents.",
    code: [
      "1: export async function fetchUserOrders(userId: string) {",
      "2:   const orders = OrderModel.find({ user: userId }); // <-- Bug here!",
      "3:   return { success: true, count: orders.length, orders };",
      "4: }",
    ],
    correctLine: 2,
    explanation: "Line 2 is missing 'await'. Without await, OrderModel.find returns an unresolved Query/Promise.",
  },
  {
    id: 2,
    scenario: "SECURITY ALERT: JWT authentication cookie vulnerable to Client-side XSS extraction.",
    code: [
      "1: const sessionToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);",
      "2: res.cookie('authToken', sessionToken, { httpOnly: false, secure: true });",
      "3: return res.status(200).json({ success: true, profile: user });",
    ],
    correctLine: 2,
    explanation: "Line 2 sets httpOnly: false! In production, httpOnly MUST be true so document.cookie cannot be hijacked by malicious scripts.",
  },
  {
    id: 3,
    scenario: "FINTECH ISSUE: Razorpay webhook signature verification vulnerability.",
    code: [
      "1: const generatedSignature = crypto.createHmac('sha256', secret)",
      "2:   .update(orderId + '|' + paymentId).digest('hex');",
      "3: if (generatedSignature !== razorpaySignature) throw new Error('Tampered');",
    ],
    correctLine: 3,
    explanation: "Line 3 uses standard string inequality !==. In production payments, use crypto.timingSafeEqual() to prevent side-channel timing attacks.",
  },
];

type ThemeMode = "ember" | "matrix" | "cyber";

export default function MiniGameSection() {
  const [inputVal, setInputVal] = useState("");
  const [theme, setTheme] = useState<ThemeMode>("ember");
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      id: "banner-init",
      type: "banner",
      timestamp: "10:00:00",
      content: (
        <div className="space-y-3 font-mono text-xs sm:text-[13px] leading-relaxed">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-slate-300">
            <div className="text-amber-400 font-bold mb-1 tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SUDIP-CLI (ZSH WORKSTATION v2.6.4) — LIVE ARCHITECTURAL TERMINAL</span>
            </div>
            <div className="text-slate-400 text-xs">
              Singur, WB, India • Kernel: Linux 6.8.0-arch1 • Node.js v22 • MERN &amp; AI Engine Active
            </div>
            <div className="mt-2 text-slate-300">
              Welcome to Sudip Patra&apos;s interactive telemetry console. Type <span className="text-[#ff7043] font-bold">&quot;help&quot;</span> or tap any quick-action chip below to query system metrics, inspect production builds, or hunt runtime bugs.
            </div>
          </div>
        </div>
      ),
    },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [isBugHunting, setIsBugHunting] = useState(false);
  const [bugIndex, setBugIndex] = useState(0);

  // References to guarantee zero stale closures during multi-round interactive game
  const bugIndexRef = useRef(0);
  const bugScoreRef = useRef(0);
  const isBugHuntingRef = useRef(false);

  const terminalBodyRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const getTimestamp = () => {
    const d = new Date();
    return d.toTimeString().split(" ")[0];
  };

  // Helper to extract a line number from various user inputs: "2", "[2]", "line 2", "option 2"
  const extractLineNumber = (input: string): number | null => {
    const trimmed = input.trim();
    const match = trimmed.match(/\[?([1-9])\]?/);
    if (match) {
      return parseInt(match[1], 10);
    }
    return null;
  };

  // Auto-scroll ONLY inside the terminal container itself (never scroll browser page)
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history, isBugHunting, bugIndex]);

  // Submit a guess in the Bug Hunt Game (called by button clicks or keyboard input)
  const submitBugGuess = (guess: string | number, fromRound?: number) => {
    // If called from an already-answered round, ignore
    if (fromRound !== undefined && fromRound !== bugIndexRef.current + 1) {
      return;
    }

    const time = getTimestamp();
    const rawStr = String(guess).trim().toLowerCase();

    // Check for exit
    if (rawStr === "q" || rawStr === "quit" || rawStr === "exit") {
      isBugHuntingRef.current = false;
      setIsBugHunting(false);
      setHistory((prev) => [
        ...prev,
        {
          id: `bug-exit-${Date.now()}`,
          type: "output",
          command: String(guess),
          timestamp: time,
          content: <div className="text-slate-400 font-mono text-xs">Bug hunt aborted. Returned to standard shell.</div>,
        },
      ]);
      return;
    }

    const currentIdx = bugIndexRef.current;
    if (currentIdx >= BUG_QUESTIONS.length) return;

    const currentQ = BUG_QUESTIONS[currentIdx];
    const guessedLine = typeof guess === "number" ? guess : extractLineNumber(rawStr);

    if (!guessedLine) {
      setHistory((prev) => [
        ...prev,
        {
          id: `bug-invalid-${Date.now()}`,
          type: "error",
          command: String(guess),
          timestamp: time,
          content: (
            <div className="text-amber-400 font-mono text-xs">
              Invalid input: &quot;{String(guess)}&quot;. Please select a line number between 1 and {currentQ.code.length}, or &apos;q&apos; to quit.
            </div>
          ),
        },
      ]);
      return;
    }

    const isCorrect = guessedLine === currentQ.correctLine;
    const newScore = isCorrect ? bugScoreRef.current + 1 : bugScoreRef.current;
    bugScoreRef.current = newScore;

    if (isCorrect) {
      try { sound.playSuccess(); } catch {}
    } else {
      try { sound.playDecode(); } catch {}
    }

    const nextIndex = currentIdx + 1;
    bugIndexRef.current = nextIndex;
    setBugIndex(nextIndex);

    if (nextIndex < BUG_QUESTIONS.length) {
      setHistory((prev) => [
        ...prev,
        {
          id: `bug-res-${Date.now()}`,
          type: isCorrect ? "success" : "error",
          command: `Selected Line [${guessedLine}]`,
          timestamp: time,
          content: (
            <div className="space-y-3 font-mono text-xs">
              <div className={isCorrect ? "text-emerald-400 font-bold" : "text-red-400 font-bold"}>
                {isCorrect ? "✓ BUG SQUASHED! (+1 POINT)" : `✗ MISSED! The correct line was [${currentQ.correctLine}].`}
              </div>
              <div className="text-slate-300 text-[11px] bg-white/[0.02] p-2.5 rounded border border-white/5">
                {currentQ.explanation}
              </div>

              {/* Next Question Card */}
              {renderBugCard(BUG_QUESTIONS[nextIndex], nextIndex + 1)}
            </div>
          ),
        },
      ]);
    } else {
      // Game Complete!
      isBugHuntingRef.current = false;
      setIsBugHunting(false);
      bugIndexRef.current = 0;
      bugScoreRef.current = 0;

      try {
        if (newScore >= 2) {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
            colors: ["#10b981", "#3b82f6", "#ffffff"],
          });
        }
      } catch {}

      setHistory((prev) => [
        ...prev,
        {
          id: `bug-finish-${Date.now()}`,
          type: "success",
          command: `Selected Line [${guessedLine}]`,
          timestamp: time,
          content: (
            <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 space-y-2 font-mono text-xs">
              <div className="text-emerald-400 font-bold text-sm flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>CHALLENGE COMPLETE — FINAL SCORE: {newScore} / 3</span>
              </div>
              <p className="text-slate-200">
                {newScore === 3
                  ? "Flawless score! You have proven deep code-auditing prowess. Ready to build production systems together?"
                  : newScore === 2
                  ? "Great job! Strong technical instincts on production JS/Node security & async handling."
                  : "Good effort! Production software is all about catching these subtle edge cases before shipping."}
              </p>
              <div className="pt-2 text-slate-400 text-[11px]">
                Type <span className="text-[#ff7043] font-bold">&quot;sudo hire-sudip&quot;</span> or click the chip to connect with Sudip directly.
              </div>
            </div>
          ),
        },
      ]);
    }

    setInputVal("");
  };

  // Render question card with clickable code lines and quick-select buttons
  const renderBugCard = (q: BugQuestion, roundNum: number) => (
    <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 font-mono text-xs space-y-3">
      <div className="flex items-center justify-between gap-2 border-b border-amber-500/20 pb-2">
        <div className="text-amber-400 font-bold text-sm flex items-center gap-2">
          <Bug className="w-4 h-4 animate-bounce shrink-0" />
          <span>INTERACTIVE BUG HUNT (ROUND {roundNum} / {BUG_QUESTIONS.length})</span>
        </div>
        <span className="text-[11px] text-amber-400/80 uppercase font-medium">Click line or type below</span>
      </div>

      <p className="text-slate-200 text-xs sm:text-[13px] leading-relaxed">
        {q.scenario}
      </p>

      {/* Interactive Code Lines: Clickable Rows */}
      <div className="space-y-1.5 my-2">
        {q.code.map((line, idx) => {
          const lineNum = idx + 1;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => submitBugGuess(lineNum, roundNum)}
              className="w-full text-left p-2.5 sm:p-3 rounded-xl bg-black/80 hover:bg-amber-500/15 border border-white/10 hover:border-amber-400/60 transition-all font-mono text-xs flex items-center justify-between group cursor-pointer active:scale-[0.99]"
            >
              <span className="text-emerald-400 group-hover:text-amber-300 transition-colors font-medium break-all">
                {line}
              </span>
              <span className="opacity-0 group-hover:opacity-100 text-[10px] text-amber-400 font-bold shrink-0 ml-2 hidden sm:inline">
                CLICK TO SELECT LINE {lineNum} ⏎
              </span>
            </button>
          );
        })}
      </div>

      {/* Quick Select Buttons */}
      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-amber-500/20">
        <span className="text-[11px] text-slate-400 font-medium">Quick Select:</span>
        {q.code.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => submitBugGuess(idx + 1, roundNum)}
            className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/40 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-sm"
          >
            Line {idx + 1}
          </button>
        ))}
        <button
          type="button"
          onClick={() => submitBugGuess("q", roundNum)}
          className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white font-mono text-xs cursor-pointer ml-auto transition-colors"
        >
          Quit (q)
        </button>
      </div>
    </div>
  );

  // Command handlers
  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    try { sound.playClick(); } catch {}

    // Add to command history
    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);

    const time = getTimestamp();

    // 1. If currently in interactive bug hunt mode, delegate to submitBugGuess
    if (isBugHuntingRef.current) {
      submitBugGuess(trimmed);
      setInputVal("");
      return;
    }

    const [commandName, ...args] = trimmed.split(" ");
    const lowerCmd = commandName.toLowerCase();
    const query = args.join(" ").trim();

    // 2. Clear command
    if (lowerCmd === "clear" || lowerCmd === "cls") {
      setHistory([]);
      setInputVal("");
      isBugHuntingRef.current = false;
      setIsBugHunting(false);
      return;
    }

    // Standard Commands
    let outputContent: React.ReactNode = null;
    let entryType: HistoryEntry["type"] = "output";

    switch (lowerCmd) {
      case "help":
        outputContent = (
          <div className="space-y-2.5 font-mono text-xs">
            <div className="text-[#ff7043] font-bold mb-1.5 flex items-center gap-2">
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>AVAILABLE COMMAND PROTOCOLS:</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-300">
              <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                <span className="text-emerald-400 font-semibold">cat resume.json</span>
                <p className="text-slate-400 text-[11px] mt-0.5">Dumps structured candidate profile, telemetry &amp; specs.</p>
              </div>
              <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                <span className="text-emerald-400 font-semibold">cat skills</span>
                <p className="text-slate-400 text-[11px] mt-0.5">Visual capacity telemetry across MERN, AI, APIs &amp; databases.</p>
              </div>
              <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                <span className="text-emerald-400 font-semibold">cat projects</span>
                <p className="text-slate-400 text-[11px] mt-0.5">Summary of high-impact deployed systems with direct links.</p>
              </div>
              <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                <span className="text-amber-400 font-semibold">ask &lt;query&gt;</span>
                <p className="text-slate-400 text-[11px] mt-0.5">Simulate AI query engine (e.g. &apos;ask notice&apos;, &apos;ask stack&apos;).</p>
              </div>
              <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                <span className="text-cyan-400 font-semibold">play bug-hunt</span>
                <p className="text-slate-400 text-[11px] mt-0.5">Interactive 3-round production code debugging challenge.</p>
              </div>
              <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                <span className="text-[#ff7043] font-semibold">sudo hire-sudip</span>
                <p className="text-slate-400 text-[11px] mt-0.5">Confetti celebration + auto-route to Contact Command center.</p>
              </div>
              <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                <span className="text-slate-300 font-semibold">theme &lt;ember|matrix|cyber&gt;</span>
                <p className="text-slate-400 text-[11px] mt-0.5">Switches workstation CRT aesthetic palette on the fly.</p>
              </div>
              <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                <span className="text-slate-300 font-semibold">contact</span>
                <p className="text-slate-400 text-[11px] mt-0.5">Prints verified links for Phone, WhatsApp &amp; Gmail.</p>
              </div>
            </div>
          </div>
        );
        break;

      case "cat":
        if (query === "resume" || query === "resume.json") {
          outputContent = (
            <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 font-mono text-xs space-y-2">
              <div className="text-slate-400 text-[11px] uppercase tracking-wider">{"// PAYLOAD: RESUME_SPEC.JSON"}</div>
              <pre className="text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
{`{
  "name": "${PERSONAL_INFO.name}",
  "role": "${PERSONAL_INFO.role}",
  "location": "${PERSONAL_INFO.location}",
  "status": "Available Immediately for Full-Time Roles",
  "remote_and_relocation": true,
  "specialties": [
    "End-to-End Scalable MERN Architecture",
    "Production Google Gemini AI Workflows",
    "Razorpay HMAC SHA256 Webhook Payment Pipelines",
    "FastAPI + LSTM Deep Learning Services"
  ],
  "verified_contact": {
    "email": "${PERSONAL_INFO.email}",
    "calling_phone": "${PERSONAL_INFO.phone}",
    "whatsapp": "${PERSONAL_INFO.whatsapp}",
    "github": "${PERSONAL_INFO.github}",
    "linkedin": "${PERSONAL_INFO.linkedin}"
  }
}`}
              </pre>
            </div>
          );
        } else if (query === "skills") {
          outputContent = (
            <div className="space-y-3 font-mono text-xs">
              <div className="text-emerald-400 font-bold mb-1">{"// SYSTEM CAPACITY TELEMETRY:"}</div>
              <div className="space-y-2">
                {[
                  { name: "React.js & Next.js 15 (Kinetic & SSR)", score: 96, bar: "████████████████████" },
                  { name: "Node.js & Express.js REST Architecture", score: 94, bar: "███████████████████░" },
                  { name: "MongoDB & Mongoose Schema Design", score: 92, bar: "██████████████████░░" },
                  { name: "Google Gemini AI & Multimodal Pipelines", score: 90, bar: "██████████████████░░" },
                  { name: "Razorpay FinTech Payment Workflows", score: 95, bar: "███████████████████░" },
                  { name: "Python, FastAPI & LSTM Deep Learning", score: 85, bar: "█████████████████░░░" },
                  { name: "Tailwind CSS & Architectural Systems", score: 98, bar: "████████████████████" },
                ].map((s, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2 rounded bg-white/[0.02] border border-white/5">
                    <span className="text-slate-300 font-medium">{s.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-mono text-[11px] tracking-widest">{s.bar}</span>
                      <span className="text-white font-bold text-[11px] w-8 text-right">{s.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        } else if (query === "projects") {
          outputContent = (
            <div className="space-y-3 font-mono text-xs">
              <div className="text-[#ff7043] font-bold mb-1">{"// PRODUCTION WORK RECORD:"}</div>
              <div className="grid grid-cols-1 gap-2.5">
                {PROJECTS.map((p, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-black/60 border border-white/10 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold text-sm">
                        {p.number}. {p.title}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-slate-300">{p.category}</span>
                    </div>
                    <div className="text-slate-400 text-xs">{p.role} • {p.highlights[0]}</div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {p.tech.slice(0, 5).map((t, ti) => (
                        <span key={ti} className="text-[10px] text-[#ff8a50] bg-[#ff7043]/10 px-1.5 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        } else {
          outputContent = (
            <div className="text-amber-400 font-mono text-xs">
              Target not found: &apos;{query}&apos;. Try: <span className="text-white font-bold">cat resume.json</span>, <span className="text-white font-bold">cat skills</span>, or <span className="text-white font-bold">cat projects</span>.
            </div>
          );
        }
        break;

      case "ask":
        const askPrompt = query.toLowerCase();
        let answer = "";

        if (askPrompt.includes("why") || askPrompt.includes("hire") || askPrompt.includes("value")) {
          answer = "Sudip delivers end-to-end full-stack velocity. From responsive React/Tailwind frontends to secure Node/Express backends, robust REST APIs, and Razorpay payment checkout, he builds production software with zero fluff and high engineering rigor.";
        } else if (askPrompt.includes("notice") || askPrompt.includes("start") || askPrompt.includes("when")) {
          answer = "Available immediately with zero days notice period. Can onboard and start committing code on day one.";
        } else if (askPrompt.includes("relocate") || askPrompt.includes("location") || askPrompt.includes("city")) {
          answer = "Based in Singur, West Bengal, India. 100% open to full-time remote roles worldwide and open to on-site relocation for the right opportunity.";
        } else if (askPrompt.includes("salary") || askPrompt.includes("compensation") || askPrompt.includes("ctc")) {
          answer = "Competitive and aligned with industry standards for high-impact Full-Stack MERN & AI software engineering roles.";
        } else if (askPrompt.includes("stack") || askPrompt.includes("tech")) {
          answer = "Core stack: MongoDB, Express.js, React.js, Node.js (MERN), Next.js 15, Tailwind CSS, Google Gemini API, Razorpay Payment Gateway, Python, and FastAPI.";
        } else {
          answer = `Query acknowledged: "${query}". Sudip is a dedicated MERN & AI engineer with working shipped code, solid problem-solving skills, and a relentless drive for building scalable software systems. Reach out via Email or WhatsApp to speak with him directly!`;
        }

        outputContent = (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 font-mono text-xs space-y-1.5">
            <div className="text-emerald-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI KNOWLEDGE RESPONSE:</span>
            </div>
            <p className="text-slate-200 leading-relaxed">{answer}</p>
          </div>
        );
        break;

      case "play":
      case "game":
      case "bug-hunt":
        bugIndexRef.current = 0;
        bugScoreRef.current = 0;
        isBugHuntingRef.current = true;
        setIsBugHunting(true);
        setBugIndex(0);
        outputContent = renderBugCard(BUG_QUESTIONS[0], 1);
        break;

      case "sudo":
        if (query === "hire" || query === "hire-sudip") {
          try {
            sound.playSuccess();
            confetti({
              particleCount: 70,
              spread: 70,
              origin: { y: 0.7 },
              colors: ["#ff7043", "#ff8a50", "#10b981", "#ffffff"],
            });
          } catch {}

          outputContent = (
            <div className="p-4 rounded-xl bg-[#ff7043]/15 border border-[#ff7043]/40 font-mono text-xs space-y-2">
              <div className="text-[#ff8a50] font-bold text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>ROOT PERMISSION GRANTED: HIRING DISPATCH ACTIVATED!</span>
              </div>
              <p className="text-slate-200">
                Congratulations! You have triggered the VIP recruiter uplink. Scroll down to Chapter 06 Contact Command Center to initiate contact!
              </p>
            </div>
          );
        } else {
          outputContent = (
            <div className="text-amber-400 font-mono text-xs">
              Sudo target invalid. Try: <span className="text-white font-bold">sudo hire-sudip</span>
            </div>
          );
        }
        break;

      case "theme":
        if (query === "matrix" || query === "ember" || query === "cyber") {
          setTheme(query as ThemeMode);
          outputContent = (
            <div className="font-mono text-xs text-emerald-400">
              Workstation visual theme changed to: <strong>{query.toUpperCase()}</strong>.
            </div>
          );
        } else {
          outputContent = (
            <div className="font-mono text-xs text-slate-400">
              Available themes: <strong>ember</strong> (default warm), <strong>matrix</strong> (hacker green), <strong>cyber</strong> (neon cyan).
            </div>
          );
        }
        break;

      case "contact":
        outputContent = (
          <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 font-mono text-xs space-y-2">
            <div className="text-[#ff7043] font-bold">{"// DIRECT COMMUNICATIONS ROUTE:"}</div>
            <div className="space-y-1 text-slate-300">
              <div>• <strong>Primary Email:</strong> {PERSONAL_INFO.email}</div>
              <div>• <strong>Voice Line:</strong> {PERSONAL_INFO.phone} (Calling only)</div>
              <div>• <strong>WhatsApp Chat:</strong> +91 8274020133 (Instant messaging)</div>
              <div>• <strong>GitHub:</strong> {PERSONAL_INFO.github}</div>
              <div>• <strong>LinkedIn:</strong> {PERSONAL_INFO.linkedin}</div>
            </div>
          </div>
        );
        break;

      case "whoami":
        outputContent = (
          <div className="font-mono text-xs text-slate-300">
            visitor@portfolio-terminal • Guest Authenticated (SSL 256-bit) • Status: Recruiter / Engineer
          </div>
        );
        break;

      case "date":
        outputContent = (
          <div className="font-mono text-xs text-slate-300">
            {new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST (Singur, West Bengal, India)
          </div>
        );
        break;

      default:
        entryType = "error";
        outputContent = (
          <div className="font-mono text-xs text-red-400">
            Command not recognized: &apos;{trimmed}&apos;. Type <span className="text-white font-bold underline cursor-pointer" onClick={() => handleCommand("help")}>&quot;help&quot;</span> or click any quick-action chip above.
          </div>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}-${Math.random()}`,
        type: entryType,
        command: trimmed,
        timestamp: time,
        content: outputContent,
      },
    ]);

    setInputVal("");
  };

  // Keyboard navigation for history
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Handled by form onSubmit to ensure mobile virtual keyboards trigger properly
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInputVal(cmdHistory[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdHistory.length === 0 || historyIdx === -1) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= cmdHistory.length) {
        setHistoryIdx(-1);
        setInputVal("");
      } else {
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const common = ["help", "cat resume.json", "cat skills", "cat projects", "play bug-hunt", "sudo hire-sudip", "clear", "contact"];
      const match = common.find((c) => c.startsWith(inputVal.trim().toLowerCase()));
      if (match) setInputVal(match);
    }
  };

  // Quick chips
  const QUICK_COMMANDS = [
    { label: "💼 cat resume.json", cmd: "cat resume.json" },
    { label: "⚡ cat skills", cmd: "cat skills" },
    { label: "🚀 cat projects", cmd: "cat projects" },
    { label: "🤖 ask 'why hire you?'", cmd: "ask why hire you?" },
    { label: "🐛 play bug-hunt", cmd: "play bug-hunt" },
    { label: "💎 sudo hire-sudip", cmd: "sudo hire-sudip" },
    { label: "🧹 clear", cmd: "clear" },
  ];

  // Theme styles
  const themeColors = {
    ember: {
      border: "border-[#ff7043]/30",
      glow: "shadow-[0_0_50px_rgba(255,112,67,0.12)]",
      prompt: "text-[#ff7043]",
      headerDot: "bg-[#ff7043]",
      badge: "text-[#ff8a50] bg-[#ff7043]/10 border-[#ff7043]/30",
    },
    matrix: {
      border: "border-emerald-500/30",
      glow: "shadow-[0_0_50px_rgba(16,185,129,0.12)]",
      prompt: "text-emerald-400",
      headerDot: "bg-emerald-400",
      badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    },
    cyber: {
      border: "border-cyan-500/30",
      glow: "shadow-[0_0_50px_rgba(6,182,212,0.12)]",
      prompt: "text-cyan-400",
      headerDot: "bg-cyan-400",
      badge: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    },
  }[theme];

  return (
    <section id="terminal" className="relative py-24 sm:py-32 bg-[#030303] overflow-hidden text-[#f4efe6]">
      {/* 6-Column Architectural Grid Lines */}
      <div className="absolute inset-0 px-6 sm:px-10 lg:px-14 xl:px-16 grid grid-cols-6 pointer-events-none z-0">
        <div className="border-r border-white/[0.035]" />
        <div className="border-r border-white/[0.035]" />
        <div className="border-r border-white/[0.035]" />
        <div className="border-r border-white/[0.035]" />
        <div className="border-r border-white/[0.035]" />
        <div />
      </div>

      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[350px] bg-[#ff7043]/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-xs sm:text-[13px] tracking-[0.16em] uppercase mb-3">
              <span className="w-2.5 h-2.5 bg-[#FF3E00] inline-block shrink-0 shadow-[0_0_8px_rgba(255,62,0,0.6)]" />
              <span className="text-[#FF3E00] font-medium">
                LAB // SUDIP-CLI v2.6.4
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f4efe6] tracking-tight font-serif-display">
              Interactive Engineering Terminal. <em className="italic font-normal text-[#ff7043]">Live CLI Uplink.</em>
            </h2>

            <p className="mt-3 text-slate-400 text-sm sm:text-base font-sans max-w-2xl leading-relaxed">
              Explore developer telemetry, query technical capabilities, hunt real production bugs, or execute live system commands directly inside the browser shell.
            </p>
          </div>

          {/* Quick Theme Switcher Chips */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-black/60 border border-white/10 shrink-0 font-mono text-xs">
            <span className="text-slate-500 text-[10px] uppercase px-2 flex items-center gap-1">
              <Palette className="w-3 h-3" />
              <span>THEME:</span>
            </span>
            {(["ember", "matrix", "cyber"] as ThemeMode[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  try { sound.playClick(); } catch {}
                  setTheme(t);
                }}
                className={`px-2.5 py-1 rounded-xl text-[11px] capitalize transition-all cursor-pointer ${
                  theme === t
                    ? "bg-white/15 text-white font-bold shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Command Chips Toolbar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2 font-mono text-xs text-slate-500 uppercase tracking-wider">
            <span>FAST-ACCESS COMMAND PROTOCOLS:</span>
            <span className="text-[10px] hidden sm:inline">CLICK TO AUTO-EXECUTE</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {QUICK_COMMANDS.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleCommand(item.cmd)}
                className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-mono text-xs transition-all cursor-pointer active:scale-95 flex items-center gap-1.5 shadow-sm"
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Terminal Window Container */}
        <div
          className={`rounded-3xl bg-[#070709] border ${themeColors.border} ${themeColors.glow} overflow-hidden shadow-2xl transition-all`}
        >
          {/* Terminal Window Top Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-black/70 border-b border-white/10 font-mono text-xs select-none">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
              </div>
              <span className="text-slate-300 font-semibold tracking-wide flex items-center gap-2">
                <TerminalIcon className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">sudip@workstation:~ (sudip-cli — zsh)</span>
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11px]">
              <span className={`px-2.5 py-0.5 rounded-full border ${themeColors.badge} font-medium flex items-center gap-1.5`}>
                <span className={`w-1.5 h-1.5 rounded-full ${themeColors.headerDot} animate-pulse`} />
                <span>ONLINE // 256-BIT</span>
              </span>
            </div>
          </div>

          {/* Terminal Content Screen */}
          <div
            ref={terminalBodyRef}
            className="p-4 sm:p-6 lg:p-7 min-h-[380px] max-h-[520px] overflow-y-auto space-y-4 font-mono select-text custom-scrollbar"
          >
            {history.map((entry) => (
              <div key={entry.id} className="space-y-1.5">
                {entry.command && (
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <span className={`${themeColors.prompt} font-bold`}>
                      {isBugHunting ? "bug-hunt:$" : "sudip@arch:~$"}
                    </span>
                    <span className="text-white font-medium">{entry.command}</span>
                    <span className="text-slate-600 text-[10px] ml-auto">{entry.timestamp}</span>
                  </div>
                )}
                <div>{entry.content}</div>
              </div>
            ))}

            {/* Live Interactive Input Line with Native Form Submission */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCommand(inputVal);
              }}
              className="flex items-center gap-2 text-xs sm:text-sm pt-2"
            >
              <span className={`${themeColors.prompt} font-bold shrink-0 font-mono`}>
                {isBugHunting ? `bug-hunt [R${bugIndex + 1}/3]:$` : "sudip@arch:~$"}
              </span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  isBugHunting
                    ? "Click any line above or type line number (1-4)..."
                    : "Type 'help', 'cat skills', 'play bug-hunt'..."
                }
                className="w-full bg-transparent outline-none text-white font-mono placeholder-slate-600 caret-amber-400 selection:bg-white/20"
                autoComplete="off"
                spellCheck="false"
              />
              <button
                type="submit"
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all cursor-pointer shrink-0 flex items-center gap-1 font-mono text-xs"
                title="Execute command"
              >
                <span>Send</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
          </div>

          {/* Terminal Footer Status Bar */}
          <div className="px-5 py-2.5 bg-black/80 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-slate-500">
            <div className="flex items-center gap-3">
              <span>UTF-8</span>
              <span>•</span>
              <span>ZSH 5.9</span>
              <span>•</span>
              <span className="text-slate-400">Press [Tab] to Autocomplete</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCommand("clear");
                }}
                className="hover:text-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
                title="Clear screen buffer"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
