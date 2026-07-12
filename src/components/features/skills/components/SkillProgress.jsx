import { useState, useEffect, useCallback, useMemo, useRef, useReducer } from "react";

// ═════════════════════════════════════════════════════════════════════════════
//  SkillProgress.jsx
//  Principal Engineer · 50 + years · Ultra FAANG Level
//  Tracks: technical skill mastery · project achievements · academic credentials
//  LeetCode 500+ · Google AI & Automation · BSc + AI Degree (Univ. of London)
//  Architecture: constants → data → utils → hooks → atoms → molecules → panels → root
// ═════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const CAREER_START   = 1975;
const NOW_YEAR       = new Date().getFullYear();
const YRS_EXP        = NOW_YEAR - CAREER_START;
const LEETCODE_SOLVED= 500;
const TOTAL_SKILLS   = 55;

const PROGRESS_TABS = [
  { id: "overview",   label: "Overview",         icon: "🏠" },
  { id: "skills",     label: "Skill Mastery",    icon: "⚡" },
  { id: "projects",   label: "Projects",          icon: "🚀" },
  { id: "academic",   label: "Academic",          icon: "🎓" },
  { id: "leetcode",   label: "LeetCode",          icon: "💻" },
  { id: "prisma",     label: "Prisma Infra",      icon: "🗃️" },
  { id: "certs",      label: "Certifications",    icon: "🏆" },
];

const DIFFICULTY_META = Object.freeze({
  easy  : { label: "Easy",   color: "#22c55e", bg: "bg-green-500/20",  text: "text-green-300",  border: "border-green-500/30"  },
  medium: { label: "Medium", color: "#f59e0b", bg: "bg-amber-500/20",  text: "text-amber-300",  border: "border-amber-500/30"  },
  hard  : { label: "Hard",   color: "#ef4444", bg: "bg-red-500/20",    text: "text-red-300",    border: "border-red-500/30"    },
});

const MASTERY_LEVELS = Object.freeze([
  { min: 97, label: "Legendary",  color: "from-emerald-500 to-teal-400",   badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"  },
  { min: 90, label: "Expert",     color: "from-cyan-500 to-blue-400",      badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"            },
  { min: 80, label: "Advanced",   color: "from-violet-500 to-purple-400",  badge: "bg-violet-500/20 text-violet-300 border-violet-500/30"      },
  { min:  0, label: "Proficient", color: "from-amber-500 to-yellow-400",   badge: "bg-amber-500/20 text-amber-300 border-amber-500/30"         },
]);

const getLevel = (pct) => MASTERY_LEVELS.find((l) => pct >= l.min) ?? MASTERY_LEVELS.at(-1);

// ─────────────────────────────────────────────────────────────────────────────
// SKILL MASTERY DATA — 55 skills, 7 domains
// ─────────────────────────────────────────────────────────────────────────────
const SKILL_MASTERY = [
  // ── Frontend ──────────────────────────────────────────────────────────────
  { id:"f1",  domain:"Frontend",     icon:"⚛️",  name:"React.js",           pct:99, yrs:12, since:2013, progress:[60,72,83,90,96,99,99], streak:365, note:"Core hooks architect · Fiber internals"        },
  { id:"f2",  domain:"Frontend",     icon:"▲",   name:"Next.js",            pct:99, yrs: 9, since:2019, progress:[55,70,85,93,97,99,99], streak:340, note:"ISR RFC contributor · App Router expert"       },
  { id:"f3",  domain:"Frontend",     icon:"🔮",  name:"Redux.js",           pct:98, yrs:10, since:2015, progress:[50,65,78,88,94,97,98], streak:300, note:"RTK · sagas · thunks · redux-observable"       },
  { id:"f4",  domain:"Frontend",     icon:"🎨",  name:"Tailwind CSS",       pct:99, yrs: 6, since:2020, progress:[70,83,92,97,99,99,99], streak:365, note:"Design system architect · JIT plugin author"   },
  { id:"f5",  domain:"Frontend",     icon:"🔷",  name:"TypeScript",         pct:98, yrs:10, since:2016, progress:[45,60,75,86,92,96,98], streak:330, note:"Advanced generics · conditional types"         },
  { id:"f6",  domain:"Frontend",     icon:"✏️",  name:"UI / UX Design",     pct:95, yrs:20, since:2004, progress:[40,55,68,78,86,91,95], streak:280, note:"Figma · WCAG 2.2 AA · design systems"         },
  { id:"f7",  domain:"Frontend",     icon:"⚡",  name:"Web Performance",    pct:97, yrs:18, since:2006, progress:[45,58,70,80,89,93,97], streak:310, note:"Core Web Vitals · Lighthouse 100/100"          },
  { id:"f8",  domain:"Frontend",     icon:"🎞️",  name:"Framer Motion",      pct:93, yrs: 5, since:2020, progress:[55,68,78,85,90,93,93], streak:200, note:"Spring physics · gesture animations"          },

  // ── Backend ───────────────────────────────────────────────────────────────
  { id:"b1",  domain:"Backend",      icon:"🟢",  name:"Node.js",            pct:99, yrs:16, since:2009, progress:[55,68,78,87,93,97,99], streak:365, note:"v0.1.x early adopter · event loop expert"     },
  { id:"b2",  domain:"Backend",      icon:"🚄",  name:"Express.js",         pct:99, yrs:14, since:2011, progress:[50,65,76,86,93,97,99], streak:360, note:"Middleware architect · security hardening"     },
  { id:"b3",  domain:"Backend",      icon:"🐍",  name:"Django",             pct:97, yrs: 8, since:2017, progress:[55,68,79,88,93,96,97], streak:280, note:"DRF · async views · Celery · Channels"        },
  { id:"b4",  domain:"Backend",      icon:"🔌",  name:"REST API Design",    pct:99, yrs:25, since:2000, progress:[60,72,82,89,94,97,99], streak:365, note:"HATEOAS · OpenAPI 3.1 · versioning"           },
  { id:"b5",  domain:"Backend",      icon:"⬡",   name:"GraphQL",            pct:95, yrs: 8, since:2017, progress:[50,63,74,83,89,93,95], streak:250, note:"Apollo · DataLoader · subscriptions"          },
  { id:"b6",  domain:"Backend",      icon:"🔁",  name:"WebSockets",         pct:97, yrs:12, since:2013, progress:[50,63,74,84,90,95,97], streak:310, note:"Socket.io · backpressure · horizontal scale"  },
  { id:"b7",  domain:"Backend",      icon:"📡",  name:"gRPC",               pct:91, yrs: 7, since:2017, progress:[40,52,63,73,82,87,91], streak:180, note:"Protobuf · bidirectional streaming"           },
  { id:"b8",  domain:"Backend",      icon:"📬",  name:"Message Queues",     pct:93, yrs:10, since:2014, progress:[42,55,66,76,84,89,93], streak:220, note:"Kafka · RabbitMQ · SQS · DLQs"               },

  // ── Database & ORM ────────────────────────────────────────────────────────
  { id:"d1",  domain:"Database",     icon:"🗃️",  name:"Prisma ORM",         pct:99, yrs: 5, since:2020, progress:[70,82,91,96,99,99,99], streak:365, note:"Expert certified · all 5 projects"           },
  { id:"d2",  domain:"Database",     icon:"🐘",  name:"PostgreSQL",         pct:98, yrs:14, since:2010, progress:[55,68,78,87,93,96,98], streak:355, note:"JSONB · partitioning · EXPLAIN ANALYZE"       },
  { id:"d3",  domain:"Database",     icon:"🐬",  name:"MySQL",              pct:97, yrs:16, since:2008, progress:[55,67,77,86,91,95,97], streak:340, note:"InnoDB internals · replication · indexing"    },
  { id:"d4",  domain:"Database",     icon:"🔴",  name:"Redis",              pct:94, yrs:11, since:2013, progress:[45,58,69,79,86,91,94], streak:270, note:"Pub/Sub · streams · Lua scripting"            },
  { id:"d5",  domain:"Database",     icon:"🍃",  name:"MongoDB",            pct:91, yrs:10, since:2014, progress:[40,53,64,74,82,87,91], streak:210, note:"Aggregation pipelines · Atlas Search"         },
  { id:"d6",  domain:"Database",     icon:"🔍",  name:"Elasticsearch",      pct:90, yrs: 8, since:2016, progress:[38,50,62,72,80,86,90], streak:190, note:"Full-text search · ELK · ILM"                 },
  { id:"d7",  domain:"Database",     icon:"📦",  name:"SQLite",             pct:90, yrs:15, since:2009, progress:[40,52,63,72,79,85,90], streak:200, note:"WAL mode · FTS5 · embedded"                   },
  { id:"d8",  domain:"Database",     icon:"🧮",  name:"Vector Databases",   pct:88, yrs: 3, since:2022, progress:[50,62,72,80,85,88,88], streak:150, note:"Pinecone · pgvector · RAG pipelines"          },

  // ── Cloud & DevOps ────────────────────────────────────────────────────────
  { id:"c1",  domain:"Cloud",        icon:"🐳",  name:"Docker",             pct:99, yrs:11, since:2014, progress:[55,68,78,87,93,97,99], streak:365, note:"Multi-stage · rootless · compose"             },
  { id:"c2",  domain:"Cloud",        icon:"☸️",  name:"Kubernetes",         pct:97, yrs: 9, since:2016, progress:[50,63,74,84,90,94,97], streak:320, note:"CKAD cert · operators · service mesh"         },
  { id:"c3",  domain:"Cloud",        icon:"☁️",  name:"AWS (Pro)",          pct:98, yrs:14, since:2011, progress:[55,68,78,87,93,96,98], streak:350, note:"SAA + DOP certified · 50+ services"           },
  { id:"c4",  domain:"Cloud",        icon:"🌐",  name:"GCP",                pct:94, yrs: 9, since:2015, progress:[45,58,69,79,86,91,94], streak:260, note:"ACE certified · GKE · BigQuery · Run"         },
  { id:"c5",  domain:"Cloud",        icon:"🪟",  name:"Azure",              pct:93, yrs: 8, since:2017, progress:[43,56,67,77,84,89,93], streak:240, note:"AZ-900 + AZ-204 certified"                    },
  { id:"c6",  domain:"Cloud",        icon:"🏗️",  name:"Terraform",          pct:95, yrs: 8, since:2017, progress:[48,61,72,82,88,93,95], streak:280, note:"Modules · workspaces · remote state"          },
  { id:"c7",  domain:"Cloud",        icon:"⛵",  name:"Helm Charts",        pct:93, yrs: 7, since:2018, progress:[45,58,69,79,86,90,93], streak:230, note:"Library charts · hooks · CRDs"                },
  { id:"c8",  domain:"Cloud",        icon:"🤖",  name:"GitHub Actions",     pct:98, yrs: 6, since:2019, progress:[60,73,83,90,95,97,98], streak:340, note:"Matrix builds · OIDC · reusable workflows"    },

  // ── AI / ML ───────────────────────────────────────────────────────────────
  { id:"a1",  domain:"AI / ML",      icon:"🧠",  name:"GPT-4 / OpenAI",     pct:95, yrs: 4, since:2021, progress:[60,72,82,88,92,95,95], streak:290, note:"Fine-tuning · evals · cost optimisation"     },
  { id:"a2",  domain:"AI / ML",      icon:"🔗",  name:"LangChain",          pct:93, yrs: 3, since:2022, progress:[55,68,78,85,90,93,93], streak:250, note:"Agents · LCEL · memory · tools"              },
  { id:"a3",  domain:"AI / ML",      icon:"📚",  name:"RAG Pipelines",      pct:92, yrs: 3, since:2022, progress:[50,63,74,82,88,92,92], streak:240, note:"Chunking · reranking · hybrid search"        },
  { id:"a4",  domain:"AI / ML",      icon:"✍️",  name:"Prompt Engineering", pct:96, yrs: 4, since:2021, progress:[60,72,82,88,93,96,96], streak:300, note:"CoT · few-shot · constitutional AI"           },
  { id:"a5",  domain:"AI / ML",      icon:"🤗",  name:"Hugging Face",       pct:88, yrs: 3, since:2022, progress:[48,60,70,78,84,88,88], streak:180, note:"LoRA · PEFT · transformers"                  },
  { id:"a6",  domain:"AI / ML",      icon:"📡",  name:"SSE Streaming",      pct:95, yrs: 4, since:2021, progress:[58,70,80,87,92,95,95], streak:280, note:"Token streaming · backpressure · abort"      },
  { id:"a7",  domain:"AI / ML",      icon:"🐍",  name:"Python / MLOps",     pct:91, yrs: 8, since:2016, progress:[40,53,64,74,82,87,91], streak:220, note:"scikit · MLflow · model serving"             },

  // ── Testing & QA ──────────────────────────────────────────────────────────
  { id:"t1",  domain:"Testing",      icon:"🃏",  name:"Jest",               pct:98, yrs: 8, since:2016, progress:[55,68,78,87,93,96,98], streak:340, note:"Unit · integration · mocking · coverage"     },
  { id:"t2",  domain:"Testing",      icon:"⚡",  name:"Vitest",             pct:97, yrs: 3, since:2022, progress:[65,76,85,91,95,97,97], streak:290, note:"Vite-native · browser mode · snapshots"      },
  { id:"t3",  domain:"Testing",      icon:"🌲",  name:"Cypress E2E",        pct:96, yrs: 6, since:2018, progress:[50,63,74,83,89,93,96], streak:310, note:"Component · visual diff · CI cloud"          },
  { id:"t4",  domain:"Testing",      icon:"🎭",  name:"Playwright",         pct:95, yrs: 4, since:2021, progress:[55,68,78,85,90,93,95], streak:270, note:"Multi-browser · trace viewer · sharding"     },
  { id:"t5",  domain:"Testing",      icon:"🧪",  name:"React Testing Lib",  pct:97, yrs: 6, since:2018, progress:[52,65,76,85,91,95,97], streak:320, note:"RTL · a11y queries · user-event v14"         },
  { id:"t6",  domain:"Testing",      icon:"📊",  name:"k6 Load Testing",    pct:90, yrs: 4, since:2020, progress:[45,57,68,77,83,87,90], streak:200, note:"Scripted load · thresholds · cloud exec"     },
  { id:"t7",  domain:"Testing",      icon:"📖",  name:"Storybook",          pct:94, yrs: 5, since:2019, progress:[48,61,72,81,87,91,94], streak:240, note:"CSF3 · interactions · a11y addon"            },
  { id:"t8",  domain:"Testing",      icon:"🚀",  name:"Supertest",          pct:93, yrs: 7, since:2017, progress:[45,58,69,78,85,89,93], streak:230, note:"HTTP assertions · auth flow testing"         },

  // ── Architecture ──────────────────────────────────────────────────────────
  { id:"ar1", domain:"Architecture", icon:"🔬",  name:"Microservices",      pct:99, yrs:20, since:2004, progress:[55,68,78,87,93,97,99], streak:365, note:"40+ service migration · zero downtime"       },
  { id:"ar2", domain:"Architecture", icon:"⚡",  name:"Event-Driven",       pct:97, yrs:18, since:2006, progress:[50,63,74,84,90,94,97], streak:340, note:"CQRS · Event Sourcing · Saga · Outbox"       },
  { id:"ar3", domain:"Architecture", icon:"🏛️",  name:"DDD",                pct:96, yrs:15, since:2009, progress:[48,61,72,82,88,93,96], streak:320, note:"Bounded contexts · aggregates · DDD"         },
  { id:"ar4", domain:"Architecture", icon:"📐",  name:"System Design",      pct:99, yrs:35, since:1989, progress:[60,72,82,89,94,97,99], streak:365, note:"Interviewer-level · URL shortener → CDN"     },
  { id:"ar5", domain:"Architecture", icon:"🌐",  name:"Distributed Sys",    pct:96, yrs:20, since:2004, progress:[50,63,74,84,90,93,96], streak:330, note:"CAP · Paxos · Raft · consensus"              },
  { id:"ar6", domain:"Architecture", icon:"🔐",  name:"Security Arch",      pct:95, yrs:22, since:2002, progress:[48,61,72,82,88,92,95], streak:310, note:"OWASP · zero-trust · SAST/DAST"              },
  { id:"ar7", domain:"Architecture", icon:"👁️",  name:"Observability",      pct:94, yrs:15, since:2009, progress:[45,58,69,79,86,90,94], streak:290, note:"OpenTelemetry · Prometheus · Grafana"        },
  { id:"ar8", domain:"Architecture", icon:"🔌",  name:"API Design",         pct:99, yrs:28, since:1996, progress:[58,70,80,87,93,97,99], streak:365, note:"REST · GraphQL · gRPC · standards author"    },
];

// ─────────────────────────────────────────────────────────────────────────────
// LEETCODE PROGRESS DATA
// ─────────────────────────────────────────────────────────────────────────────
const LEETCODE_DATA = {
  totalSolved   : 523,
  target        : 600,
  streak        : 87,
  maxStreak     : 142,
  ranking       : "Top 3%",
  contestRating : 1842,
  badge         : "Knight",
  byDifficulty  : [
    { level: "easy",   solved: 198, total: 760,  pct: 26  },
    { level: "medium", solved: 267, total: 1580, pct: 17  },
    { level: "hard",   solved:  58, total:  650, pct:  9  },
  ],
  topicsMastered: [
    { topic: "Dynamic Programming",  solved: 82,  icon: "🧩" },
    { topic: "Graph Algorithms",      solved: 68,  icon: "🕸️" },
    { topic: "Binary Search",         solved: 54,  icon: "🔎" },
    { topic: "Tree Traversals",       solved: 71,  icon: "🌳" },
    { topic: "Sliding Window",        solved: 45,  icon: "🪟" },
    { topic: "Backtracking",          solved: 38,  icon: "↩️"  },
    { topic: "System Design",         solved: 30,  icon: "📐" },
    { topic: "Two Pointers",          solved: 49,  icon: "👆" },
  ],
  recentSolves  : [
    { title:"Hard: Median of Two Sorted Arrays",           diff:"hard",   time:"18 min" },
    { title:"Medium: LRU Cache",                           diff:"medium", time:"22 min" },
    { title:"Hard: Trapping Rain Water",                   diff:"hard",   time:"25 min" },
    { title:"Medium: Word Search II",                      diff:"medium", time:"30 min" },
    { title:"Hard: Regular Expression Matching",           diff:"hard",   time:"35 min" },
    { title:"Medium: Course Schedule II",                  diff:"medium", time:"20 min" },
    { title:"Easy: Valid Parentheses",                     diff:"easy",   time:"8 min"  },
    { title:"Hard: Serialize & Deserialize Binary Tree",   diff:"hard",   time:"28 min" },
  ],
  weeklyProgress: [45, 52, 67, 71, 82, 90, 87],
};

// ─────────────────────────────────────────────────────────────────────────────
// ACADEMIC CREDENTIALS
// ─────────────────────────────────────────────────────────────────────────────
const ACADEMIC_DATA = {
  degrees: [
    {
      id         : "bsc-cs",
      title      : "BSc Computer Science",
      institution: "University of London",
      logo       : "🎓",
      status     : "Completed",
      statusCls  : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      year       : 2022,
      grade      : "First Class Honours",
      gradeCls   : "text-emerald-400",
      gradient   : "from-blue-600/20 via-indigo-600/10 to-violet-600/20",
      border     : "border-blue-500/30",
      subjects   : ["Algorithms & Data Structures", "Operating Systems", "Distributed Systems", "Software Engineering", "Computer Architecture", "Machine Learning Foundations"],
      highlight  : "Thesis: Scalable Microservices Architecture in Cloud-Native Environments",
      progress   : 100,
    },
    {
      id         : "ai-degree",
      title      : "BSc Artificial Intelligence",
      institution: "University of London (Online)",
      logo       : "🤖",
      status     : "In Progress",
      statusCls  : "bg-amber-500/20 text-amber-300 border-amber-500/30",
      year       : 2025,
      grade      : "On Track — Distinction",
      gradeCls   : "text-amber-400",
      gradient   : "from-violet-600/20 via-purple-600/10 to-fuchsia-600/20",
      border     : "border-violet-500/30",
      subjects   : ["Deep Learning", "NLP & Transformers", "Computer Vision", "Reinforcement Learning", "AI Ethics & Safety", "MLOps & Deployment"],
      highlight  : "Research Track: LLM Fine-tuning with LoRA on Domain-Specific Datasets",
      progress   : 78,
    },
  ],
  googleCertifications: [
    {
      id        : "google-ai",
      name      : "Google AI Essentials",
      issuer    : "Google",
      logo      : "🌐",
      year      : 2024,
      badge     : "bg-blue-500/20 text-blue-300 border-blue-500/30",
      gradient  : "from-blue-500 to-cyan-400",
      topics    : ["Prompt Engineering","Gemini","Responsible AI","AI Tools"],
      pct       : 100,
    },
    {
      id        : "google-automation",
      name      : "Google IT Automation with Python",
      issuer    : "Google",
      logo      : "🌐",
      year      : 2023,
      badge     : "bg-green-500/20 text-green-300 border-green-500/30",
      gradient  : "from-green-500 to-emerald-400",
      topics    : ["Python Scripting","Git","Linux","Debugging","Cloud Automation"],
      pct       : 100,
    },
    {
      id        : "google-data",
      name      : "Google Data Analytics Professional",
      issuer    : "Google",
      logo      : "🌐",
      year      : 2023,
      badge     : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      gradient  : "from-yellow-500 to-amber-400",
      topics    : ["SQL","Tableau","R","BigQuery","Data Storytelling"],
      pct       : 100,
    },
  ],
  continuousLearning: [
    { platform:"freeCodeCamp",    courses:12, icon:"🔥",  note:"Full Stack · Algorithms · APIs"         },
    { platform:"Coursera",        courses:18, icon:"📘",  note:"ML Specialisation · Cloud Computing"    },
    { platform:"Udemy",           courses:24, icon:"🎯",  note:"React · Node · AWS · Docker · DevOps"   },
    { platform:"Frontend Masters",courses: 8, icon:"🎓",  note:"Advanced React · TypeScript · Perf"    },
    { platform:"The Odin Project", courses: 5, icon:"⚔️", note:"Full-stack foundations deep dive"       },
    { platform:"MIT OpenCourseWare",courses:6,icon:"🏛️",  note:"6.006 Algorithms · 6.824 Dist Systems"  },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS DATA
// ─────────────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id        : "ecommerce",
    title     : "Fullstack E-Commerce Platform",
    emoji     : "🛒",
    year      : 2023,
    status    : "Production",
    statusCls : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    gradient  : "from-emerald-600/20 via-teal-600/10 to-cyan-600/20",
    border    : "border-emerald-500/30",
    accentCls : "text-emerald-400",
    completion: 100,
    techScore : 98,
    desc      : "Enterprise multi-vendor platform with AI recommendations, real-time inventory, multi-currency checkout, and multi-region deployment.",
    tech      : ["React.js","Next.js","Redux.js","Prisma","Django","PostgreSQL","MySQL","Docker","AWS","Tailwind CSS","REST API","UI/UX"],
    metrics   : [{ label:"DAU", value:"120K+" }, { label:"Uptime", value:"99.99%" }, { label:"Revenue", value:"$4M+" }, { label:"API P99", value:"<80ms" }],
    highlights: ["12-service K8s mesh · zero-downtime","Django AI recs · +22% CTR","Stripe + PayPal + crypto checkout","CloudFront CDN · 94% cache hit"],
  },
  {
    id        : "portfolio",
    title     : "Portfolio Platform",
    emoji     : "🎨",
    year      : 2024,
    status    : "Live",
    statusCls : "bg-blue-500/20 text-blue-300 border-blue-500/30",
    gradient  : "from-blue-600/20 via-indigo-600/10 to-violet-600/20",
    border    : "border-blue-500/30",
    accentCls : "text-blue-400",
    completion: 100,
    techScore : 97,
    desc      : "Principal-level developer portfolio with SSR+ISR hybrid, CMS-driven content, Lighthouse 100/100, and i18n in 6 languages.",
    tech      : ["React.js","Next.js","Redux.js","Prisma","Node.js","Express.js","PostgreSQL","MySQL","Docker","Cloud","Tailwind CSS","REST API","UI/UX"],
    metrics   : [{ label:"Lighthouse", value:"100/100" }, { label:"Load Time", value:"<1.2s" }, { label:"Bounce ↓", value:"42%" }, { label:"Conversions ↑", value:"67%" }],
    highlights: ["SSR + ISR hybrid rendering","Headless CMS zero-redeploy","WCAG 2.2 AA certified","A/B testing with significance engine"],
  },
  {
    id        : "dashboard",
    title     : "Analytics Dashboard App",
    emoji     : "📊",
    year      : 2023,
    status    : "Production",
    statusCls : "bg-violet-500/20 text-violet-300 border-violet-500/30",
    gradient  : "from-violet-600/20 via-purple-600/10 to-pink-600/20",
    border    : "border-violet-500/30",
    accentCls : "text-violet-400",
    completion: 100,
    techScore : 99,
    desc      : "Multi-tenant SaaS BI dashboard with drag-and-drop widgets, row-level security, 50K events/sec WebSocket feed, and scheduled reports.",
    tech      : ["React.js","Next.js","Redux.js","Prisma","Node.js","Express.js","PostgreSQL","MySQL","Docker","Cloud","Tailwind CSS","REST API","UI/UX"],
    metrics   : [{ label:"Tenants", value:"500+" }, { label:"Events/Sec", value:"50K+" }, { label:"Query P99", value:"<200ms" }, { label:"Data", value:"10M+ rows" }],
    highlights: ["40+ chart types drag-and-drop","Row-level Postgres RLS","PDF + Excel + CSV export","RBAC 12 permission scopes"],
  },
  {
    id        : "chat",
    title     : "Real-Time Chat Application",
    emoji     : "💬",
    year      : 2022,
    status    : "Production",
    statusCls : "bg-pink-500/20 text-pink-300 border-pink-500/30",
    gradient  : "from-pink-600/20 via-rose-600/10 to-red-600/20",
    border    : "border-pink-500/30",
    accentCls : "text-pink-400",
    completion: 100,
    techScore : 98,
    desc      : "Slack-inspired chat with E2E Signal Protocol encryption, WebRTC group video, enterprise SSO, and 200K concurrent users.",
    tech      : ["React.js","Next.js","Redux.js","Prisma","Node.js","Express.js","PostgreSQL","MySQL","Docker","Cloud","Tailwind CSS","REST API","UI/UX"],
    metrics   : [{ label:"Concurrent", value:"200K+" }, { label:"Messages/Day", value:"5M+" }, { label:"WS Latency", value:"<15ms" }, { label:"Uptime", value:"99.97%" }],
    highlights: ["Signal Protocol E2E encryption","WebRTC SFU group video","SAML 2.0 + OAuth 2.0 SSO","ES full-text message search"],
  },
  {
    id        : "ai-app",
    title     : "AI + Fullstack Application",
    emoji     : "🤖",
    year      : 2024,
    status    : "Production",
    statusCls : "bg-amber-500/20 text-amber-300 border-amber-500/30",
    gradient  : "from-amber-600/20 via-yellow-600/10 to-orange-600/20",
    border    : "border-amber-500/30",
    accentCls : "text-amber-400",
    completion: 100,
    techScore : 97,
    desc      : "LLM-powered platform with GPT-4, RAG pipeline, autonomous LangChain agents, LoRA fine-tuning, 1M+ daily inferences, ↓60% token cost.",
    tech      : ["React.js","Next.js","Redux.js","Prisma","Django","PostgreSQL","MySQL","Docker","Cloud","Tailwind CSS","REST API","UI/UX"],
    metrics   : [{ label:"Inferences/Day", value:"1M+" }, { label:"Accuracy", value:"94.7%" }, { label:"Cost Saved", value:"↓60%" }, { label:"Satisfaction", value:"4.9/5" }],
    highlights: ["RAG · Pinecone semantic re-ranking","LangChain agents · tool use · reflection","LoRA fine-tune on proprietary data","HITL feedback continuous improvement"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PRISMA INFRA
// ─────────────────────────────────────────────────────────────────────────────
const PRISMA_DATA = {
  mastery  : 99,
  yrs      : 5,
  since    : 2020,
  certified: true,
  desc     : "Prisma ORM expert across all 5 production projects. Schema architecture, migration pipelines, advanced relations, performance tuning, raw query escape hatches.",
  features : [
    { icon:"📐", name:"Schema Design",      pct:99, desc:"Multi-model, self-referential, polymorphic, composite constraints, advanced indexes"  },
    { icon:"🔄", name:"Migrations",          pct:99, desc:"Versioned pipeline, shadow DBs, squashing, rollback, legacy baseline"                },
    { icon:"🔗", name:"Relations",           pct:98, desc:"All relation types, nested writes, connect/disconnect, referential integrity"         },
    { icon:"⚡", name:"Query Optimisation",  pct:97, desc:"DataLoader batching, N+1 elimination, projection, EXPLAIN ANALYZE guidance"          },
    { icon:"🔐", name:"Transactions",        pct:98, desc:"$transaction API, interactive transactions, isolation levels, OCC"                    },
    { icon:"🗃️", name:"Raw SQL Escape Hatch",pct:96, desc:"$queryRaw · $executeRaw · parameterised inputs · injection prevention"               },
    { icon:"🌱", name:"Seeding & Testing",   pct:97, desc:"Factory patterns, deterministic seeds, DB reset in CI/CD, test isolation"             },
    { icon:"🔭", name:"Prisma Studio",       pct:95, desc:"Visual browser, live record editing, relationship traversal in all 5 dev workflows"   },
  ],
  projects : [
    { name:"E-Commerce",      models:15, migrations:52, highlight:"Multi-vendor catalogue · order saga · inventory events"    },
    { name:"Portfolio",        models: 8, migrations:18, highlight:"CMS · contact forms · analytics events"                    },
    { name:"Dashboard",        models:12, migrations:40, highlight:"Multi-tenant RLS · RBAC · 40+ migrations"                  },
    { name:"Chat App",         models:10, migrations:28, highlight:"Messages · threads · workspaces · presence"                },
    { name:"AI App",           models:10, migrations:24, highlight:"Conversation history · feedback · RAG store"               },
  ],
  dbs: [
    { name:"PostgreSQL", icon:"🐘", pct:99, note:"Primary — all 5 projects"       },
    { name:"MySQL",      icon:"🐬", pct:97, note:"Secondary — 3 projects"          },
    { name:"SQLite",     icon:"📦", pct:90, note:"Dev + E2E test isolation"        },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// CERTIFICATIONS
// ─────────────────────────────────────────────────────────────────────────────
const CERTS = [
  { id:"c1",  issuer:"AWS",       logo:"☁️",  name:"Solutions Architect – Associate",   year:2021, gradient:"from-orange-500 to-amber-500",  badge:"bg-orange-500/20 text-orange-300 border-orange-500/30",  topics:["EC2","S3","RDS","Lambda","VPC"]          },
  { id:"c2",  issuer:"AWS",       logo:"☁️",  name:"DevOps Engineer – Professional",    year:2022, gradient:"from-orange-600 to-red-500",    badge:"bg-red-500/20 text-red-300 border-red-500/30",           topics:["ECS","EKS","CodePipeline","CloudWatch"]  },
  { id:"c3",  issuer:"Google",    logo:"🌐",  name:"Associate Cloud Engineer",          year:2020, gradient:"from-blue-500 to-cyan-400",     badge:"bg-blue-500/20 text-blue-300 border-blue-500/30",        topics:["GKE","BigQuery","Pub/Sub","Cloud Run"]   },
  { id:"c4",  issuer:"Microsoft", logo:"🪟",  name:"Azure Fundamentals AZ-900",         year:2021, gradient:"from-sky-500 to-blue-600",      badge:"bg-sky-500/20 text-sky-300 border-sky-500/30",           topics:["AKS","App Service","Cosmos DB"]          },
  { id:"c5",  issuer:"Microsoft", logo:"🪟",  name:"Azure Developer Associate AZ-204",  year:2022, gradient:"from-indigo-500 to-sky-600",    badge:"bg-indigo-500/20 text-indigo-300 border-indigo-500/30",  topics:["Functions","Service Bus","Key Vault"]    },
  { id:"c6",  issuer:"IBM",       logo:"🔷",  name:"Cloud Application Developer",       year:2020, gradient:"from-blue-700 to-blue-500",     badge:"bg-blue-700/20 text-blue-200 border-blue-700/30",        topics:["OpenShift","Kafka","Db2","Watson"]       },
  { id:"c7",  issuer:"Meta",      logo:"🔵",  name:"Back-End Developer Professional",   year:2023, gradient:"from-blue-400 to-indigo-500",   badge:"bg-blue-400/20 text-blue-200 border-blue-400/30",        topics:["Django","DRF","MySQL","JWT"]             },
  { id:"c8",  issuer:"Meta",      logo:"🔵",  name:"Front-End Developer Professional",  year:2023, gradient:"from-cyan-400 to-blue-500",     badge:"bg-cyan-400/20 text-cyan-200 border-cyan-400/30",        topics:["React","Redux","A11y","Figma"]           },
  { id:"c9",  issuer:"Prisma",    logo:"🗃️",  name:"ORM Expert Certification",          year:2022, gradient:"from-teal-500 to-emerald-400",  badge:"bg-teal-500/20 text-teal-300 border-teal-500/30",        topics:["Schema","Migrations","Relations","SQL"]  },
  { id:"c10", issuer:"CNCF",      logo:"☸️",  name:"Kubernetes App Developer (CKAD)",   year:2021, gradient:"from-violet-500 to-purple-600", badge:"bg-violet-500/20 text-violet-300 border-violet-500/30",  topics:["Pods","Helm","ConfigMaps","Services"]    },
];

// ─────────────────────────────────────────────────────────────────────────────
// ASYNC DATA LAYER
// ─────────────────────────────────────────────────────────────────────────────
const tick = (ms) => new Promise((res) => setTimeout(res, ms));

const loadProgressData = () =>
  Promise.all([
    tick(80 ).then(() => ({ skills   : SKILL_MASTERY })),
    tick(100).then(() => ({ projects : PROJECTS      })),
    tick(60 ).then(() => ({ leetcode : LEETCODE_DATA })),
    tick(70 ).then(() => ({ academic : ACADEMIC_DATA })),
    tick(50 ).then(() => ({ prisma   : PRISMA_DATA   })),
    tick(90 ).then(() => ({ certs    : CERTS         })),
  ]).then((slices) => slices.reduce((acc, s) => ({ ...acc, ...s }), {}));

const deriveSummary = (skills) =>
  new Promise((resolve) => {
    const domains   = [...new Set(skills.map((s) => s.domain))];
    const byDomain  = domains.map((d) => {
      const items  = skills.filter((s) => s.domain === d);
      const avg    = Math.round(items.reduce((a, s) => a + s.pct, 0) / items.length);
      const top    = [...items].sort((a, b) => b.pct - a.pct)[0]?.name ?? "";
      return { domain: d, avg, count: items.length, top };
    });
    const avgMastery = Math.round(skills.reduce((a, s) => a + s.pct, 0) / skills.length);
    const legendary  = skills.filter((s) => s.pct >= 97).length;
    resolve({ byDomain, avgMastery, legendary, total: skills.length });
  });

// ─────────────────────────────────────────────────────────────────────────────
// UI REDUCER
// ─────────────────────────────────────────────────────────────────────────────
const ACTS = Object.freeze({
  SET_TAB       : "SET_TAB",
  SET_DOMAIN    : "SET_DOMAIN",
  SET_QUERY     : "SET_QUERY",
  TOGGLE_PROJ   : "TOGGLE_PROJ",
  RESET         : "RESET",
});

const initState = {
  activeTab    : "overview",
  domainFilter : "All",
  searchQuery  : "",
  expandedProjs: {},
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTS.SET_TAB      : return { ...state, activeTab: payload, searchQuery: "" };
    case ACTS.SET_DOMAIN   : return { ...state, domainFilter: payload };
    case ACTS.SET_QUERY    : return { ...state, searchQuery: payload };
    case ACTS.TOGGLE_PROJ  : return { ...state, expandedProjs: { ...state.expandedProjs, [payload]: !state.expandedProjs[payload] } };
    case ACTS.RESET        : return { ...initState };
    default                : return state;
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────────────────────
const useProgress = () => {
  const [data,    setData   ] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError  ] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const loaded = await loadProgressData();
        if (!alive) return;
        setData(loaded);
        const s = await deriveSummary(loaded.skills);
        if (!alive) return;
        setSummary(s);
      } catch (e) {
        if (alive) setError(e?.message ?? "Load failed.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  return { data, summary, loading, error };
};

const useEntryAnim = (margin = "-50px") => {
  const ref  = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setSeen(true); return; }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } },
      { rootMargin: margin, threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return { ref, seen };
};

const useDebounce = (val, ms = 250) => {
  const [dv, setDv] = useState(val);
  useEffect(() => {
    const t = setTimeout(() => setDv(val), ms);
    return () => clearTimeout(t);
  }, [val, ms]);
  return dv;
};

// ═════════════════════════════════════════════════════════════════════════════
//  ATOMS
// ═════════════════════════════════════════════════════════════════════════════

const Badge = ({ label, cls }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${cls}`}>{label}</span>
);

const Pill = ({ label, cls = "bg-slate-700/70 text-slate-300 border-slate-600/50" }) => (
  <span className={`inline-block text-xs px-2 py-0.5 rounded-full border mr-1.5 mb-1.5 ${cls}`}>{label}</span>
);

const KpiTile = ({ icon, label, value, sub, accentCls = "text-white" }) => (
  <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4 text-center hover:border-slate-500/60 transition-colors">
    <div className="text-2xl mb-1">{icon}</div>
    <div className={`text-2xl font-black ${accentCls}`}>{value}</div>
    <div className="text-xs font-semibold text-slate-300 mt-0.5">{label}</div>
    {sub && <div className="text-xs text-slate-500 mt-0.5">{sub}</div>}
  </div>
);

const SectionTitle = ({ icon, title, sub }) => (
  <div className="text-center mb-10">
    <div className="text-4xl mb-3">{icon}</div>
    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">{title}</h2>
    {sub && <p className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed">{sub}</p>}
  </div>
);

const Skeleton = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-52 bg-slate-800/60 rounded-3xl" />
    <div className="flex gap-2 flex-wrap">
      {[1,2,3,4,5,6,7].map((n) => <div key={n} className="h-10 w-28 bg-slate-800/60 rounded-xl" />)}
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[1,2,3,4,5,6,7,8].map((n) => <div key={n} className="h-28 bg-slate-800/60 rounded-2xl" />)}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {[1,2,3,4].map((n) => <div key={n} className="h-64 bg-slate-800/60 rounded-2xl" />)}
    </div>
  </div>
);

// Animated progress bar
const ProgressBar = ({ pct, seen, height = "h-2", extra = "" }) => {
  const ref = useRef(null);
  const lv  = getLevel(pct);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.width      = seen ? `${pct}%` : "0%";
    el.style.transition = seen ? "width 1.2s cubic-bezier(0.4,0,0.2,1)" : "none";
  }, [seen, pct]);
  return (
    <div className={`${height} bg-slate-700/50 rounded-full overflow-hidden ${extra}`}>
      <div ref={ref} style={{ width: 0 }} className={`h-full rounded-full bg-gradient-to-r ${lv.color}`} />
    </div>
  );
};

// Circular ring meter (SVG)
const RingMeter = ({ pct, size = 52, stroke = 5, color = "#8b5cf6" }) => {
  const r    = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const dash = circ - (pct / 100) * circ;
  return (
    <div className="relative inline-flex items-center justify-center shrink-0">
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle cx={size/2} cy={size/2} r={r} fill="none" strokeWidth={stroke} className="stroke-slate-700/50" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={dash}
          stroke={color} style={{ transition:"stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }} />
      </svg>
      <span className="absolute text-xs font-black text-white">{pct}</span>
    </div>
  );
};

// Sparkline from progress array
const Sparkline = ({ data, color = "#8b5cf6", height = 32 }) => {
  const W = 120, H = height;
  const min  = Math.min(...data);
  const max  = Math.max(...data);
  const norm = (v) => H - ((v - min) / (max - min || 1)) * H;
  const step = W / (data.length - 1);
  const pts  = data.map((v, i) => `${i * step},${norm(v)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height }} aria-hidden="true">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      {data.map((v, i) => (
        <circle key={i} cx={i * step} cy={norm(v)} r="2.5" fill={color} />
      ))}
    </svg>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
//  PANEL: OVERVIEW
// ═════════════════════════════════════════════════════════════════════════════
const OverviewPanel = ({ summary, data }) => {
  const heroStats = useMemo(() => [
    { icon:"⏳", label:"Years Experience",    value:`${YRS_EXP}+`,           accentCls:"text-violet-300",   sub:"Since 1975"               },
    { icon:"⚡", label:"Technologies",        value:`${TOTAL_SKILLS}+`,      accentCls:"text-cyan-300",     sub:`Avg ${summary?.avgMastery ?? 95}% mastery` },
    { icon:"🏆", label:"Legendary Skills",    value:`${summary?.legendary ?? 22}`,accentCls:"text-emerald-300",sub:"97%+ mastery"            },
    { icon:"💻", label:"LeetCode Solved",     value:`${LEETCODE_SOLVED}+`,   accentCls:"text-amber-300",    sub:"Top 3% ranking"           },
    { icon:"🚀", label:"Production Projects", value:"5",                     accentCls:"text-pink-300",     sub:"All deployed & live"      },
    { icon:"🏅", label:"Certifications",      value:`${CERTS.length}`,       accentCls:"text-orange-300",   sub:"Google·AWS·MS·IBM·Meta"   },
    { icon:"🎓", label:"Degrees",             value:"2",                     accentCls:"text-blue-300",     sub:"BSc CS + BSc AI · Univ. of London" },
    { icon:"🌱", label:"Continuous Learning", value:"50+",                   accentCls:"text-teal-300",     sub:"Courses completed"        },
  ], [summary]);

  return (
    <div className="space-y-10">
      <SectionTitle
        icon="🏠"
        title="Progress Overview"
        sub={`${YRS_EXP}+ years of compounded expertise. Principal-level mastery from mainframes to production AI systems.`}
      />

      {/* Hero KPI grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {heroStats.map((s) => (
          <KpiTile key={s.label} icon={s.icon} label={s.label} value={s.value} sub={s.sub} accentCls={s.accentCls} />
        ))}
      </div>

      {/* Domain mastery strips */}
      {summary && (
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-3xl p-6">
          <h3 className="text-lg font-black text-white mb-5 flex items-center gap-2">
            <span>📊</span> Domain Mastery Breakdown
          </h3>
          <div className="space-y-4">
            {summary.byDomain.map((d) => (
              <div key={d.domain} className="flex items-center gap-4">
                <div className="w-32 shrink-0">
                  <span className="text-sm font-semibold text-slate-300">{d.domain}</span>
                  <span className="text-xs text-slate-500 block">{d.count} skills</span>
                </div>
                <div className="flex-1">
                  <ProgressBar pct={d.avg} seen={true} height="h-3" />
                </div>
                <div className="w-10 shrink-0 text-right">
                  <span className="text-sm font-black text-white">{d.avg}%</span>
                </div>
                <Badge label={getLevel(d.avg).label} cls={getLevel(d.avg).badge} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick cert badges */}
      <div>
        <h3 className="text-base font-black text-slate-200 mb-4 flex items-center gap-2">
          <span>🏅</span> Certified By
        </h3>
        <div className="flex flex-wrap gap-3">
          {["Google","AWS","Microsoft","IBM","Meta","Prisma","CNCF"].map((issuer) => {
            const cert = CERTS.find((c) => c.issuer === issuer);
            if (!cert) return null;
            return (
              <div key={issuer} className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/40 rounded-xl px-3.5 py-2">
                <span className="text-lg">{cert.logo}</span>
                <div>
                  <div className="text-xs font-bold text-white">{issuer}</div>
                  <div className="text-xs text-slate-500">{CERTS.filter((c) => c.issuer === issuer).length} cert{CERTS.filter((c) => c.issuer === issuer).length > 1 ? "s" : ""}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
//  PANEL: SKILL MASTERY
// ═════════════════════════════════════════════════════════════════════════════
const SkillRow = ({ skill, seen }) => {
  const lv = getLevel(skill.pct);
  return (
    <div className="mb-4 group/row">
      <div className="flex items-center justify-between gap-2 mb-1">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-base shrink-0">{skill.icon}</span>
          <div className="min-w-0">
            <span className="text-sm font-semibold text-slate-300 truncate block">{skill.name}</span>
            <span className="text-xs text-slate-600">Since {skill.since} · {skill.yrs}yr</span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden group-hover/row:flex items-center gap-1">
            <span className="text-xs text-slate-500 italic truncate max-w-[180px]">{skill.note}</span>
          </div>
          <Badge label={lv.label} cls={lv.badge} />
          <span className="text-xs font-black text-slate-300 w-8 text-right">{skill.pct}%</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <ProgressBar pct={skill.pct} seen={seen} />
        </div>
        <div className="w-24 shrink-0">
          <Sparkline data={skill.progress} color={skill.pct >= 97 ? "#34d399" : skill.pct >= 90 ? "#22d3ee" : "#a78bfa"} height={20} />
        </div>
        <span className="text-xs text-slate-600 shrink-0 w-16 text-right">🔥{skill.streak}d</span>
      </div>
    </div>
  );
};

const SkillsPanel = ({ skills, state, dispatch }) => {
  const dq       = useDebounce(state.searchQuery);
  const { ref, seen } = useEntryAnim();

  const domains  = useMemo(() => ["All", ...new Set(skills.map((s) => s.domain))], [skills]);

  const filtered = useMemo(() => {
    let list = state.domainFilter === "All"
      ? skills
      : skills.filter((s) => s.domain === state.domainFilter);
    if (dq) {
      const q = dq.toLowerCase();
      list = list.filter((s) => s.name.toLowerCase().includes(q) || s.domain.toLowerCase().includes(q) || s.note.toLowerCase().includes(q));
    }
    return [...list].sort((a, b) => b.pct - a.pct);
  }, [skills, state.domainFilter, dq]);

  // Group by domain for display
  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach((s) => {
      if (!map[s.domain]) map[s.domain] = [];
      map[s.domain].push(s);
    });
    return map;
  }, [filtered]);

  return (
    <div className="space-y-8">
      <SectionTitle icon="⚡" title="Skill Mastery Progress"
        sub="Animated proficiency bars · sparkline growth trends · streak tracking across 55 technologies." />

      {/* Domain filter */}
      <div className="flex flex-wrap gap-2">
        {domains.map((d) => (
          <button key={d}
            onClick={() => dispatch({ type: ACTS.SET_DOMAIN, payload: d })}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              state.domainFilter === d
                ? "bg-violet-600 text-white shadow-lg shadow-violet-500/25"
                : "bg-slate-800/60 border border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700/60"
            }`}
          >{d}</button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">🔍</span>
        <input type="text" placeholder="Search skill, domain, note…" value={state.searchQuery}
          onChange={(e) => dispatch({ type: ACTS.SET_QUERY, payload: e.target.value })}
          className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/60 transition-all" />
      </div>

      {/* Results */}
      <div ref={ref} className="space-y-8">
        {Object.keys(grouped).length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-slate-400">No skills match "{dq}"</p>
            <button onClick={() => dispatch({ type: ACTS.RESET })} className="mt-4 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold rounded-xl transition-colors">Reset</button>
          </div>
        ) : (
          Object.entries(grouped).map(([domain, items]) => (
            <div key={domain} className="bg-slate-800/30 border border-slate-700/40 rounded-2xl p-5">
              <h3 className="text-base font-black text-white mb-4 flex items-center gap-2">
                <span>{items[0]?.icon}</span>{domain}
                <Badge label={`${items.length} skills`} cls="bg-slate-700/60 text-slate-400 border-slate-600/40" />
                <span className="ml-auto text-sm text-slate-400 font-normal">avg {Math.round(items.reduce((s,i)=>s+i.pct,0)/items.length)}%</span>
              </h3>
              {items.map((sk) => <SkillRow key={sk.id} skill={sk} seen={seen} />)}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
//  PANEL: PROJECTS
// ═════════════════════════════════════════════════════════════════════════════
const ProjectCard = ({ project, isExpanded, onToggle }) => {
  const { ref, seen } = useEntryAnim();
  return (
    <div ref={ref} className={`rounded-3xl border overflow-hidden bg-gradient-to-br ${project.gradient} ${project.border} hover:border-white/20 transition-all duration-300`}>
      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-3">
            <span className="text-4xl leading-none">{project.emoji}</span>
            <div>
              <Badge label={project.status} cls={project.statusCls} />
              <h3 className="text-lg font-black text-white leading-tight mt-1">{project.title}</h3>
            </div>
          </div>
          <span className="text-slate-500 text-sm font-semibold shrink-0">{project.year}</span>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed mb-3">{project.desc}</p>

        {/* Progress meters */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-slate-800/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-slate-400">Completion</span>
              <span className={`text-xs font-black ${project.accentCls}`}>{project.completion}%</span>
            </div>
            <ProgressBar pct={project.completion} seen={seen} />
          </div>
          <div className="bg-slate-800/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-slate-400">Tech Depth</span>
              <span className={`text-xs font-black ${project.accentCls}`}>{project.techScore}%</span>
            </div>
            <ProgressBar pct={project.techScore} seen={seen} />
          </div>
        </div>

        {/* Tech pills */}
        <div className="flex flex-wrap">
          {project.tech.map((t) => <Pill key={t} label={t} />)}
        </div>
      </div>

      {/* Metrics */}
      <div className="px-5 pb-3 grid grid-cols-2 md:grid-cols-4 gap-2">
        {project.metrics.map((m) => (
          <div key={m.label} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-2.5 text-center">
            <div className={`text-sm font-black ${project.accentCls}`}>{m.value}</div>
            <div className="text-xs text-slate-400">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Expand */}
      <div className="px-5 pb-5">
        <button onClick={() => onToggle(project.id)} aria-expanded={isExpanded}
          className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-700/60 transition-all">
          <span>{isExpanded ? "Hide" : "Show"} Architecture Highlights</span>
          <span className={`text-xs transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>▼</span>
        </button>
        {isExpanded && (
          <div className="mt-3 space-y-2">
            {project.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2.5 bg-slate-800/40 rounded-xl p-3 border border-slate-700/40">
                <span className={`shrink-0 text-sm mt-0.5 ${project.accentCls}`}>◆</span>
                <span className="text-sm text-slate-300">{h}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ProjectsPanel = ({ projects, state, dispatch }) => (
  <div className="space-y-8">
    <SectionTitle icon="🚀" title="Production Projects"
      sub="5 battle-tested fullstack systems · all production-deployed · certified stack across every project." />
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p}
          isExpanded={!!state.expandedProjs[p.id]}
          onToggle={(id) => dispatch({ type: ACTS.TOGGLE_PROJ, payload: id })} />
      ))}
    </div>
  </div>
);

// ═════════════════════════════════════════════════════════════════════════════
//  PANEL: ACADEMIC CREDENTIALS
// ═════════════════════════════════════════════════════════════════════════════
const AcademicPanel = ({ academic }) => {
  const { ref, seen } = useEntryAnim();
  return (
    <div className="space-y-10" ref={ref}>
      <SectionTitle icon="🎓" title="Academic Credentials"
        sub="BSc Computer Science · BSc Artificial Intelligence · Google AI · Google Automation · University of London" />

      {/* Degrees */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {academic.degrees.map((deg) => (
          <div key={deg.id} className={`rounded-3xl border overflow-hidden bg-gradient-to-br ${deg.gradient} ${deg.border} p-6`}>
            <div className="flex items-start gap-3 mb-4">
              <span className="text-4xl">{deg.logo}</span>
              <div>
                <Badge label={deg.status} cls={deg.statusCls} />
                <h3 className="text-xl font-black text-white mt-1">{deg.title}</h3>
                <p className="text-slate-400 text-sm mt-0.5">{deg.institution}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Completion</span>
              <span className={`text-sm font-black ${deg.gradeCls}`}>{deg.progress}%</span>
            </div>
            <ProgressBar pct={deg.progress} seen={seen} height="h-3" extra="mb-4" />

            <div className="bg-slate-800/40 rounded-xl p-3 mb-4">
              <p className="text-xs text-slate-400 italic">{deg.highlight}</p>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-400 mb-2">Core Subjects</p>
              <div className="flex flex-wrap">
                {deg.subjects.map((s) => <Pill key={s} label={s} />)}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className={`text-sm font-bold ${deg.gradeCls}`}>{deg.grade}</span>
              <span className="text-sm text-slate-500">{deg.year}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Google Certifications */}
      <div>
        <h3 className="text-lg font-black text-white mb-5 flex items-center gap-2">
          <span>🌐</span> Google Professional Certifications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {academic.googleCertifications.map((cert) => (
            <div key={cert.id} className="rounded-2xl border border-slate-700/50 bg-slate-800/50 overflow-hidden hover:border-slate-500/60 hover:scale-[1.02] transition-all duration-300 group">
              <div className={`h-1.5 w-full bg-gradient-to-r ${cert.gradient}`} />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{cert.logo}</span>
                  <div>
                    <Badge label={`${cert.issuer} · ${cert.year}`} cls="bg-blue-500/20 text-blue-300 border-blue-500/30" />
                    <h4 className="text-sm font-black text-white mt-1 leading-snug group-hover:text-violet-300 transition-colors">{cert.name}</h4>
                  </div>
                </div>
                <ProgressBar pct={cert.pct} seen={seen} extra="mb-3" />
                <div className="flex flex-wrap gap-1">
                  {cert.topics.map((t) => <Pill key={t} label={t} />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Continuous learning platforms */}
      <div>
        <h3 className="text-lg font-black text-white mb-5 flex items-center gap-2">
          <span>📚</span> Continuous Learning Platforms
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {academic.continuousLearning.map((item) => (
            <div key={item.platform} className="bg-slate-800/50 border border-slate-700/40 rounded-2xl p-4 hover:border-slate-500/60 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="text-sm font-black text-white">{item.platform}</div>
                  <div className="text-xs text-slate-400">{item.courses} courses completed</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic">{item.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
//  PANEL: LEETCODE
// ═════════════════════════════════════════════════════════════════════════════
const LeetCodePanel = ({ lc }) => {
  const { ref, seen } = useEntryAnim();
  const pct = Math.round((lc.totalSolved / lc.target) * 100);

  return (
    <div className="space-y-8" ref={ref}>
      <SectionTitle icon="💻" title="LeetCode Progress"
        sub={`${lc.totalSolved}+ problems solved · Top 3% global ranking · ${lc.streak}-day active streak`} />

      {/* Hero stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon:"✅", label:"Problems Solved",   value:`${lc.totalSolved}+`,     accentCls:"text-emerald-300" },
          { icon:"🏅", label:"Global Ranking",    value:lc.ranking,               accentCls:"text-amber-300"  },
          { icon:"🔥", label:"Current Streak",    value:`${lc.streak} days`,      accentCls:"text-orange-300" },
          { icon:"🏆", label:"Contest Rating",    value:lc.contestRating,         accentCls:"text-violet-300" },
        ].map((s) => (
          <KpiTile key={s.label} icon={s.icon} label={s.label} value={s.value} accentCls={s.accentCls} />
        ))}
      </div>

      {/* Overall progress toward 600 goal */}
      <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-slate-300">Progress to {lc.target} Problems</span>
          <span className="text-sm font-black text-violet-300">{lc.totalSolved} / {lc.target} ({pct}%)</span>
        </div>
        <ProgressBar pct={pct} seen={seen} height="h-4" />
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs text-slate-500">Badge: <span className="text-amber-300 font-bold">{lc.badge}</span></span>
          <span className="text-xs text-slate-500">Max streak: <span className="text-orange-300 font-bold">{lc.maxStreak} days</span></span>
        </div>
      </div>

      {/* By difficulty */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {lc.byDifficulty.map((d) => {
          const meta = DIFFICULTY_META[d.level];
          const dpct = Math.round((d.solved / d.total) * 100);
          return (
            <div key={d.level} className={`rounded-2xl border ${meta.border} ${meta.bg} p-5`}>
              <div className="flex items-center justify-between mb-3">
                <Badge label={meta.label} cls={`${meta.bg} ${meta.text} ${meta.border}`} />
                <span className={`text-2xl font-black ${meta.text}`}>{d.solved}</span>
              </div>
              <ProgressBar pct={dpct} seen={seen} extra="mb-2" />
              <div className="flex justify-between text-xs text-slate-500">
                <span>{dpct}% of {d.total}</span>
                <span>+{d.solved} solved</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Topics mastered */}
      <div className="bg-slate-800/30 border border-slate-700/40 rounded-2xl p-5">
        <h3 className="text-base font-black text-white mb-4 flex items-center gap-2">
          <span>🧩</span> Topics Mastered
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {lc.topicsMastered.map((t) => {
            const maxSolved = Math.max(...lc.topicsMastered.map((x) => x.solved));
            const tpct = Math.round((t.solved / maxSolved) * 100);
            return (
              <div key={t.topic} className="flex items-center gap-3">
                <span className="text-xl shrink-0">{t.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold text-slate-300 truncate">{t.topic}</span>
                    <span className="text-xs font-bold text-slate-400 shrink-0 ml-2">{t.solved}</span>
                  </div>
                  <ProgressBar pct={tpct} seen={seen} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent solves */}
      <div>
        <h3 className="text-base font-black text-white mb-4 flex items-center gap-2">
          <span>⏱️</span> Recent Solves
        </h3>
        <div className="space-y-2">
          {lc.recentSolves.map((s, i) => {
            const meta = DIFFICULTY_META[s.diff];
            return (
              <div key={i} className="flex items-center justify-between gap-3 bg-slate-800/40 border border-slate-700/40 rounded-xl px-4 py-2.5 hover:border-slate-600/60 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-lg">💡</span>
                  <span className="text-sm font-semibold text-slate-300 truncate">{s.title}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge label={meta.label} cls={`${meta.bg} ${meta.text} ${meta.border}`} />
                  <span className="text-xs text-slate-500">⏱️ {s.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly sparkline */}
      <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5">
        <h3 className="text-sm font-black text-slate-300 mb-3">Weekly Activity (submissions)</h3>
        <Sparkline data={lc.weeklyProgress} color="#8b5cf6" height={48} />
        <div className="flex justify-between text-xs text-slate-600 mt-1">
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => <span key={d}>{d}</span>)}
        </div>
      </div>
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
//  PANEL: PRISMA INFRA
// ═════════════════════════════════════════════════════════════════════════════
const PrismaPanel = ({ prisma }) => {
  const { ref, seen } = useEntryAnim();
  return (
    <div className="space-y-8" ref={ref}>
      <SectionTitle icon="🗃️" title="Prisma ORM — Expert Level"
        sub="Production Prisma across all 5 projects. Schema design, migrations, relations, raw queries, and performance tuning." />

      {/* Hero mastery */}
      <div className="bg-gradient-to-br from-teal-600/20 via-emerald-600/10 to-cyan-600/20 border border-teal-500/30 rounded-3xl p-6">
        <div className="flex items-start gap-4 mb-5">
          <span className="text-5xl">🗃️</span>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-2xl font-black text-white">Prisma ORM</h3>
              <Badge label={prisma.certified ? "Expert Certified ✓" : "Certified"} cls="bg-teal-500/20 text-teal-300 border-teal-500/30" />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">{prisma.desc}</p>
            <div className="flex items-center gap-4 mt-3">
              <span className="text-sm text-slate-400">Since <span className="text-teal-300 font-bold">{prisma.since}</span></span>
              <span className="text-sm text-slate-400"><span className="text-teal-300 font-bold">{prisma.yrs} years</span> production use</span>
              <span className="text-sm text-slate-400">Mastery: <span className="text-teal-300 font-black">{prisma.mastery}%</span></span>
            </div>
          </div>
          <div className="shrink-0">
            <RingMeter pct={prisma.mastery} size={64} stroke={6} color="#2dd4bf" />
          </div>
        </div>
        <ProgressBar pct={prisma.mastery} seen={seen} height="h-3" />
      </div>

      {/* Feature breakdown */}
      <div>
        <h3 className="text-base font-black text-white mb-4 flex items-center gap-2">
          <span>⚙️</span> Feature Mastery Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prisma.features.map((f) => (
            <div key={f.name} className="bg-slate-800/50 border border-slate-700/40 rounded-2xl p-4 hover:border-teal-500/30 transition-colors group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{f.icon}</span>
                  <span className="text-sm font-black text-white">{f.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge label={getLevel(f.pct).label} cls={getLevel(f.pct).badge} />
                  <span className="text-xs font-black text-slate-300">{f.pct}%</span>
                </div>
              </div>
              <ProgressBar pct={f.pct} seen={seen} extra="mb-2" />
              <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Used in projects */}
      <div>
        <h3 className="text-base font-black text-white mb-4 flex items-center gap-2">
          <span>🚀</span> Used in All 5 Projects
        </h3>
        <div className="space-y-3">
          {prisma.projects.map((p) => (
            <div key={p.name} className="flex items-center gap-4 bg-slate-800/40 border border-slate-700/40 rounded-xl p-4 hover:border-teal-500/30 transition-colors">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-2 h-2 bg-teal-400 rounded-full shrink-0" />
                <div>
                  <span className="text-sm font-bold text-white">{p.name}</span>
                  <p className="text-xs text-slate-500 mt-0.5">{p.highlight}</p>
                </div>
              </div>
              <div className="flex gap-3 shrink-0">
                <div className="text-center">
                  <div className="text-sm font-black text-teal-300">{p.models}</div>
                  <div className="text-xs text-slate-500">models</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-black text-emerald-300">{p.migrations}</div>
                  <div className="text-xs text-slate-500">migrations</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Supported DBs */}
      <div>
        <h3 className="text-base font-black text-white mb-4 flex items-center gap-2">
          <span>🗄️</span> Database Adapters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {prisma.dbs.map((db) => (
            <div key={db.name} className="bg-slate-800/50 border border-slate-700/40 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{db.icon}</span>
                <span className="text-sm font-black text-white">{db.name}</span>
              </div>
              <ProgressBar pct={db.pct} seen={seen} extra="mb-2" />
              <p className="text-xs text-slate-500">{db.note}</p>
              <span className="text-xs font-black text-slate-300">{db.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
//  PANEL: CERTIFICATIONS
// ═════════════════════════════════════════════════════════════════════════════
const CertsPanel = ({ certs }) => {
  const grouped = useMemo(() =>
    certs.reduce((acc, c) => {
      acc[c.issuer] = [...(acc[c.issuer] || []), c];
      return acc;
    }, {}), [certs]);

  const order = ["AWS","Google","Microsoft","IBM","Meta","Prisma","CNCF"];
  const sorted = order.filter((k) => grouped[k]);

  return (
    <div className="space-y-10">
      <SectionTitle icon="🏆" title="Professional Certifications"
        sub="Google · Microsoft · IBM · Meta · AWS · Prisma · CNCF — validated expertise across every major platform." />

      {/* Issuer summary */}
      <div className="flex flex-wrap gap-3 justify-center">
        {sorted.map((issuer) => (
          <div key={issuer} className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 rounded-xl px-3.5 py-2">
            <span className="text-lg">{grouped[issuer][0].logo}</span>
            <div>
              <div className="text-xs font-black text-white">{issuer}</div>
              <div className="text-xs text-slate-500">{grouped[issuer].length} cert{grouped[issuer].length > 1 ? "s" : ""}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Grouped cert cards */}
      {sorted.map((issuer) => (
        <div key={issuer}>
          <h3 className="text-base font-black text-slate-200 mb-4 flex items-center gap-2">
            <span>{grouped[issuer][0].logo}</span>
            {issuer} Certifications
            <Badge label={`${grouped[issuer].length}`} cls="bg-slate-700/60 text-slate-400 border-slate-600/40" />
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {grouped[issuer].map((cert) => (
              <div key={cert.id} className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 hover:border-slate-500/60 hover:scale-[1.02] transition-all duration-300 group">
                <div className={`h-1.5 w-full bg-gradient-to-r ${cert.gradient}`} />
                <div className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-3xl">{cert.logo}</span>
                    <div>
                      <Badge label={`${cert.issuer} · ${cert.year}`} cls={cert.badge} />
                      <h4 className="text-sm font-black text-white mt-1 leading-snug group-hover:text-violet-300 transition-colors">{cert.name}</h4>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {cert.topics.map((t) => <Pill key={t} label={t} />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
//  HERO BANNER
// ═════════════════════════════════════════════════════════════════════════════
const HeroBanner = () => (
  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-900/60 via-slate-900 to-cyan-900/40 border border-violet-500/20 p-8 mb-10">
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
    </div>
    <div className="relative z-10 text-center">
      <div className="inline-flex items-center gap-2 bg-violet-500/20 border border-violet-500/30 text-violet-300 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
        <span>⭐</span> Principal Engineer · Ultra FAANG Level · {YRS_EXP}+ Years
      </div>
      <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none mb-3">
        Skill{" "}
        <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
          Progress
        </span>
      </h1>
      <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-5">
        LeetCode 500+ · Google AI & Automation · BSc CS + BSc AI (Univ. of London) ·
        AWS · Microsoft · IBM · Meta · Prisma · CNCF Certified
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {[
          { label:`${YRS_EXP}+ yrs XP`,    icon:"⏳" },
          { label:"LeetCode 500+",          icon:"💻" },
          { label:"Google AI Certified",    icon:"🌐" },
          { label:"BSc CS · BSc AI",        icon:"🎓" },
          { label:"10 Certs",               icon:"🏅" },
          { label:"5 Live Projects",        icon:"🚀" },
        ].map((b) => (
          <span key={b.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/50 text-xs font-semibold text-slate-300">
            <span>{b.icon}</span>{b.label}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// ═════════════════════════════════════════════════════════════════════════════
//  ROOT COMPONENT
// ═════════════════════════════════════════════════════════════════════════════
const SkillProgress = () => {
  const { data, summary, loading, error } = useProgress();
  const [state, dispatch] = useReducer(reducer, initState);
  const containerRef = useRef(null);

  const handleTabChange = useCallback((id) => {
    dispatch({ type: ACTS.SET_TAB, payload: id });
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Resolve active panel from loaded data
  const activePanel = useMemo(() => {
    if (!data) return null;
    const map = {
      overview : <OverviewPanel  summary={summary} data={data} />,
      skills   : <SkillsPanel    skills={data.skills} state={state} dispatch={dispatch} />,
      projects : <ProjectsPanel  projects={data.projects} state={state} dispatch={dispatch} />,
      academic : <AcademicPanel  academic={data.academic} />,
      leetcode : <LeetCodePanel  lc={data.leetcode} />,
      prisma   : <PrismaPanel    prisma={data.prisma} />,
      certs    : <CertsPanel     certs={data.certs} />,
    };
    return map[state.activeTab] ?? null;
  }, [state.activeTab, data, summary, state, dispatch]);

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-8 text-center max-w-md">
          <div className="text-4xl mb-3">⚠️</div>
          <h2 className="text-xl font-bold text-white mb-2">Failed to load progress</h2>
          <p className="text-red-400 text-sm mb-4">{error}</p>
          <button onClick={() => window.location.reload()}
            className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-bold rounded-xl transition-colors">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white" style={{ fontFamily:"'Inter','system-ui',sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? <Skeleton /> : (
          <>
            {/* Hero */}
            <HeroBanner />

            {/* Tab navigation */}
            <div
              className="sticky top-4 z-30 bg-slate-950/80 backdrop-blur-xl border border-slate-800/60 rounded-2xl p-2 mb-10 shadow-2xl"
              role="tablist" aria-label="Skill progress sections"
            >
              <div className="flex gap-1.5 overflow-x-auto" style={{ scrollbarWidth:"none" }}>
                {PROGRESS_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    role="tab"
                    aria-selected={state.activeTab === tab.id}
                    className={`
                      flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
                      transition-all duration-200 whitespace-nowrap
                      ${state.activeTab === tab.id
                        ? "bg-violet-600 text-white shadow-lg shadow-violet-500/25"
                        : "text-slate-400 hover:text-white hover:bg-slate-700/60"}
                    `}
                  >
                    <span>{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Panel */}
            <div
              ref={containerRef}
              role="tabpanel"
              aria-label={PROGRESS_TABS.find((t) => t.id === state.activeTab)?.label}
              className="min-h-[60vh]"
            >
              {activePanel}
            </div>

            {/* Footer */}
            <footer className="mt-20 pt-8 border-t border-slate-800/60 text-center">
              <p className="text-slate-500 text-sm">
                {CAREER_START} – {NOW_YEAR} · {YRS_EXP}+ years · Principal Engineer · Ultra FAANG Level
              </p>
              <p className="text-slate-600 text-xs mt-1">
                BSc CS · BSc AI (Univ. of London) · Google AI & Automation · LeetCode 500+ ·
                AWS · Microsoft · IBM · Meta · Prisma · CNCF
              </p>
            </footer>
          </>
        )}
      </div>
    </div>
  );
};

export default SkillProgress;
