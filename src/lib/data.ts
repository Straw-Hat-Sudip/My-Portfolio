export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: "Full Stack & AI" | "E-Commerce & FinTech" | "ECE Academic Bonus";
  period: string;
  role: string;
  contextNote?: string;
  tech: string[];
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  featuredStat?: string;
  accentColor: string;
}

export const PERSONAL_INFO = {
  name: "Sudip Patra",
  role: "Full Stack MERN Developer",
  subtitles: [
    "Full Stack MERN Developer",
    "AI-Powered Web Builder",
    "E-Commerce & Payment Systems Engineer",
  ],
  location: "Singur, West Bengal, India",
  email: "sudippatra550@gmail.com",
  phone: "+91 9073881923",
  phoneClean: "+919073881923",
  whatsapp: "+91 8274020133",
  whatsappClean: "918274020133",
  whatsappUrl: "https://wa.me/918274020133",
  linkedin: "https://www.linkedin.com/in/sudip-patra-2b4366318",
  github: "https://github.com/Straw-Hat-Sudip",
  resumePath: "/Sudip_Patra_CV.pdf",
  summary:
    "Passionate Full Stack MERN Developer skilled in architecting modern web applications with React, Next.js & Node.js, AI integration, and seamless payment systems. Experienced in turning complex ideas into scalable, production-ready software while continuously pushing technical boundaries.",
  status: "AVAILABLE FOR FULL-STACK MERN & AI ROLES • SINGUR, INDIA",
};

export const MARQUEE_TAGS = [
  "Full Stack MERN",
  "AI Integration",
  "Razorpay Payment Gateway",
  "Google Gemini API",
  "REST APIs & JWT",
  "React & Next.js",
  "Node & Express",
  "MongoDB",
  "Ship Fast",
  "Real-World Systems",
];

export const BUILDER_DNA = [
  {
    tag: "x100 // End-to-End MERN Architecture",
    headline: "Scalable Full-Stack Engineering",
    description:
      "Architects responsive React.js & Tailwind CSS frontends backed by scalable Node.js, Express.js, MongoDB, and secure JWT authentication. Zero fluff, fully typed, production-ready.",
    accent: "from-orange-500/20 to-amber-500/20",
    borderGlow: "rgba(255, 112, 67, 0.4)",
    badge: "MERN ARCHITECTURE",
    stats: "0ms Cold Auth • RESTful",
  },
  {
    tag: "x100 // AI & Payment Integrations",
    headline: "Production AI & FinTech Workflows",
    description:
      "Integrates production APIs including Google Gemini AI for intelligent multimodal workflows and Razorpay Payment Gateway for real-world digital commerce with verified webhooks.",
    accent: "from-amber-500/20 to-orange-600/20",
    borderGlow: "rgba(255, 138, 80, 0.4)",
    badge: "GEMINI + RAZORPAY",
    stats: "100% Verified Signatures",
  },
  {
    tag: "x100 // Speaks in Prompts & GitHub Links",
    headline: "No Resume Theatre. Shipped Code.",
    description:
      "No theoretical claims or corporate buzzwords—just working full-stack products deployed live on Vercel and Render with clean commits, modular codebases, and responsive UI.",
    accent: "from-orange-600/20 to-amber-600/20",
    borderGlow: "rgba(255, 112, 67, 0.4)",
    badge: "SHIPPED & DEPLOYED",
    stats: "Active Commits • Vercel & Render",
  },
];

export const TECHNICAL_SKILLS = [
  {
    category: "Programming Languages",
    code: "01",
    description: "Core algorithmic foundations & language engines",
    skills: ["JavaScript (ES6+)", "Java", "Python", "C", "HTML5", "CSS3"],
  },
  {
    category: "Frontend Development",
    code: "02",
    description: "Modern component architectures & kinetic UI",
    skills: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Bootstrap",
      "Responsive Web Design",
    ],
  },
  {
    category: "Backend & APIs",
    code: "03",
    description: "Robust services, auth protocols & payment bridges",
    skills: [
      "Node.js",
      "Express.js",
      "REST API",
      "JWT Authentication",
      "Razorpay Payment Gateway",
      "Google Gemini API",
      "WebSockets",
    ],
  },
  {
    category: "Databases",
    code: "04",
    description: "Data modeling, schemas & persistence layers",
    skills: ["MongoDB", "Mongoose ODM", "MySQL"],
  },
  {
    category: "Tools & Platforms",
    code: "05",
    description: "Developer tooling, CI/CD & cloud runtime hosts",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "npm",
      "Vercel",
      "Render",
      "Cloudinary",
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "ai-healthcare-assistant",
    number: "01",
    title: "AI Healthcare Assistant",
    category: "Full Stack & AI",
    period: "2026 – Present",
    role: "Full Stack MERN & AI Developer",
    accentColor: "#ff7043",
    githubUrl: "https://github.com/Straw-Hat-Sudip/HealthAi",
    liveUrl: "https://github.com/Straw-Hat-Sudip/HealthAi",
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Google Gemini API",
      "JWT",
      "Tailwind CSS",
      "Cloudinary",
      "NodeMailer",
    ],
    highlights: [
      "Developed an AI-powered healthcare assistant web platform using the complete MERN stack.",
      "Implemented secure user authentication with JWT and encrypted credential persistence.",
      "Enabled users to upload complex medical reports with automatic AI-driven simplification into clear, accessible language.",
      "Engineered automated medicine reminder schedules, an interactive symptom triage checker, and personalized diet recommendations.",
      "Designed a responsive analytics dashboard with modern glassmorphism UI and cloud-based medical document storage via Cloudinary.",
    ],
  },
  {
    id: "digital-ebook-store",
    number: "02",
    title: "Ebook Hub — Digital E-Book Store & E-Commerce Platform",
    category: "E-Commerce & FinTech",
    period: "2026 – Present",
    role: "Full Stack MERN Developer",
    featuredStat: "Live on Vercel",
    accentColor: "#ff8a50",
    liveUrl: "https://ebook-hub-sooty.vercel.app/",
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Razorpay Gateway",
      "JWT Auth",
      "REST API",
      "Tailwind CSS",
    ],
    highlights: [
      "Engineered a full-stack e-commerce web application dedicated to browsing, previewing, and purchasing digital e-books.",
      "Integrated the Razorpay Payment Gateway for secure, seamless online checkout, HMAC SHA256 signature verification, and automated order generation.",
      "Engineered user authentication with JWT, reactive shopping cart state, and instant post-purchase digital library unlock.",
      "Created an administrative catalog management workflow for publishing books, tracking orders, and viewing real-time sales telemetry.",
      "Designed a fluid storefront optimized with high-performance responsive layouts for mobile and desktop readers alike.",
    ],
  },
  {
    id: "stock-forecast-engine",
    number: "03",
    title: "AI-Powered Stock Market Forecasting",
    category: "Full Stack & AI",
    period: "2026 – Present",
    role: "Full Stack & Deep Learning Engineer",
    accentColor: "#ff5722",
    githubUrl: "https://github.com/Straw-Hat-Sudip/StockForecast",
    liveUrl: "https://github.com/Straw-Hat-Sudip/StockForecast",
    tech: [
      "React (Vite)",
      "FastAPI",
      "Python",
      "TensorFlow/Keras",
      "LSTM",
      "yfinance",
      "Tailwind CSS",
      "Recharts",
      "Scikit-learn",
    ],
    highlights: [
      "Engineered a production-quality stock market forecasting web platform pairing a React (Vite) frontend with a high-performance Python FastAPI backend.",
      "Trained an LSTM (Long Short-Term Memory) deep learning neural network on-demand to predict future stock prices over 7, 14, 30, or 60-day horizons.",
      "Built an abstracted market data ingestion engine utilizing yfinance for real-time OHLCV equity streaming, historical data, and company metrics.",
      "Implemented technical indicator analytics calculating SMA, EMA, RSI, MACD, and Bollinger Bands with multi-stock comparison capabilities.",
      "Enforced rigorous time-series methodology preventing data leakage via chronological lookback windows and isolated MinMaxScaler preprocessing.",
    ],
  },
  {
    id: "smart-train-collision-system",
    number: "04",
    title: "Smart Train Collision Detection System",
    category: "ECE Academic Bonus",
    period: "2026 – Present",
    role: "Real-Time Web Dashboard & ECE Systems Developer",
    contextNote:
      "Engineered as an academic capstone for B.Tech Electronics & Communication Engineering (ECE), showcasing full-stack real-time WebSocket web dashboard architecture connected to hardware telemetry.",
    featuredStat: "Sub-50ms WebSocket Telemetry",
    accentColor: "#ffa726",
    tech: [
      "WebSocket",
      "JavaScript",
      "HTML5",
      "CSS3",
      "ESP32",
      "NodeMCU",
      "Arduino C++",
      "IR & Ultrasonic Sensors",
      "Servo Motors",
    ],
    highlights: [
      "Engineered a real-time web monitoring dashboard with bidirectional WebSocket data streaming to visualize live train positions.",
      "Built an IoT railway safety prototype detecting potential train collisions using ESP32 and NodeMCU wireless inter-train communication.",
      "Integrated ultrasonic rangefinders and IR sensors for obstacle detection with millisecond-accuracy telemetry transmission.",
      "Implemented automated safety interlocks and track-switching servo actuators triggered automatically upon critical distance thresholds.",
      "Showcases the synergy between core ECE hardware systems and modern full-stack web telemetry frontends.",
    ],
  },
];

export const ACADEMIC_STEPS = [
  {
    step: "01",
    tag: "FOUNDATION // 2023",
    title: "B.Tech in Electronics & Communication Engineering",
    institution: "Techno International New Town (TINT)",
    timeline: "2023 – 2027 (Pursuing)",
    location: "Kolkata, West Bengal",
    description:
      "Deep-diving into signal processing, microcontrollers, embedded systems, computer networks, and algorithmic problem-solving. Bridged hardware logic to high-level computing.",
    pills: ["Data Structures & Algorithms", "Microcontrollers", "Network Protocols", "Signal Processing"],
  },
  {
    step: "02",
    tag: "SPECIALIZATION // 2024 – 2025",
    title: "Full-Stack MERN Mastery & Cloud Architectures",
    institution: "Self-Directed Engineering & Hands-on Production",
    timeline: "Continuous Mastery",
    location: "Remote / India",
    description:
      "Mastered the full modern JavaScript ecosystem: React.js component architectures, Node.js asynchronous event loops, Express.js REST API middleware, MongoDB aggregation pipelines, and secure JWT auth flows.",
    pills: ["React & Component Lifecycle", "Node.js REST APIs", "MongoDB / Mongoose", "JWT & Security"],
  },
  {
    step: "03",
    tag: "FRONTIER // 2026 – FUTURE",
    title: "AI Integration, FinTech Workflows & Real-World Products",
    institution: "Production Deployments & Innovative Builds",
    timeline: "Active & Shipping",
    location: "Singur, West Bengal / Global Remote",
    description:
      "Pushing forward into production-grade AI applications using Google Gemini API, robust digital payment infrastructures with Razorpay, and low-latency WebSocket interfaces for real-world utility.",
    pills: ["Google Gemini Multimodal API", "Razorpay Payment Gateways", "WebSockets", "Cloud Deployments"],
  },
];
