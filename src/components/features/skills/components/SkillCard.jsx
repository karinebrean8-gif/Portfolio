import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useReducer,
} from "react";

// ═════════════════════════════════════════════════════════════════════════════
//  SkillCard.jsx
//  Principal Engineer · 50 + years · Ultra FAANG Level
//  Architecture: data → hooks → atoms → molecules → organisms → page
// ═════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const CAREER_ORIGIN = 1975;
const NOW_YEAR      = new Date().getFullYear();
const YRS_EXP       = NOW_YEAR - CAREER_ORIGIN;

const LEVEL_THRESHOLDS = Object.freeze({
  LEGENDARY : 97,
  EXPERT    : 90,
  ADVANCED  : 80,
  PROFICIENT: 70,
});

const LEVEL_META = Object.freeze({
  LEGENDARY : { label: "Legendary",  ring: "stroke-emerald-400",  glow: "shadow-emerald-500/40", badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" },
  EXPERT    : { label: "Expert",     ring: "stroke-cyan-400",     glow: "shadow-cyan-500/40",    badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"         },
  ADVANCED  : { label: "Advanced",   ring: "stroke-violet-400",   glow: "shadow-violet-500/40",  badge: "bg-violet-500/20 text-violet-300 border-violet-500/40"   },
  PROFICIENT: { label: "Proficient", ring: "stroke-amber-400",    glow: "shadow-amber-500/40",   badge: "bg-amber-500/20 text-amber-300 border-amber-500/40"      },
});

const resolveLevel = (pct) => {
  if (pct >= LEVEL_THRESHOLDS.LEGENDARY)  return "LEGENDARY";
  if (pct >= LEVEL_THRESHOLDS.EXPERT)     return "EXPERT";
  if (pct >= LEVEL_THRESHOLDS.ADVANCED)   return "ADVANCED";
  return "PROFICIENT";
};

// ─────────────────────────────────────────────────────────────────────────────
// TAB REGISTRY
// ─────────────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "skills",    label: "Skill Domains",  icon: "⚡",  shortLabel: "Skills"   },
  { id: "projects",  label: "Projects",        icon: "🚀",  shortLabel: "Projects" },
  { id: "mastery",   label: "Mastery Map",     icon: "🗺️", shortLabel: "Mastery"  },
  { id: "certs",     label: "Certifications",  icon: "🏆",  shortLabel: "Certs"    },
  { id: "infra",     label: "Infra & Testing", icon: "🧪",  shortLabel: "Infra"    },
];

// ─────────────────────────────────────────────────────────────────────────────
// SKILL DOMAINS DATA
// ─────────────────────────────────────────────────────────────────────────────
const SKILL_DOMAINS = [
  {
    id        : "frontend",
    domain    : "Frontend Engineering",
    icon      : "⚛️",
    gradient  : "from-cyan-600/25 via-blue-600/15 to-indigo-600/25",
    border    : "border-cyan-500/30",
    accent    : "text-cyan-400",
    glow      : "shadow-cyan-500/10",
    yearsDeep : 30,
    tagline   : "Pixel-perfect UIs shipped at any scale",
    skills: [
      { name: "React.js",         pct: 99, yrs: 12, note: "Core contributor era, hooks architect"    },
      { name: "Next.js",          pct: 99, yrs:  9, note: "ISR RFC contributor, App Router expert"   },
      { name: "Redux.js",         pct: 98, yrs: 10, note: "RTK, sagas, thunks, redux-observable"     },
      { name: "Tailwind CSS",     pct: 99, yrs:  6, note: "Design system architect, JIT expert"      },
      { name: "TypeScript",       pct: 98, yrs: 10, note: "Advanced generics, conditional types"     },
      { name: "UI / UX Design",   pct: 95, yrs: 20, note: "Figma, design systems, WCAG 2.2 AA"       },
      { name: "Web Performance",  pct: 97, yrs: 18, note: "Core Web Vitals, Lighthouse 100/100"       },
      { name: "Framer Motion",    pct: 93, yrs:  5, note: "Complex gesture & spring animations"       },
    ],
  },
  {
    id        : "backend",
    domain    : "Backend Engineering",
    icon      : "🔧",
    gradient  : "from-green-600/25 via-emerald-600/15 to-teal-600/25",
    border    : "border-green-500/30",
    accent    : "text-green-400",
    glow      : "shadow-green-500/10",
    yearsDeep : 35,
    tagline   : "APIs that survive internet-scale chaos",
    skills: [
      { name: "Node.js",        pct: 99, yrs: 16, note: "v0.1.x early adopter, core patterns author" },
      { name: "Express.js",     pct: 99, yrs: 14, note: "Middleware architect, security hardening"    },
      { name: "Django",         pct: 97, yrs:  8, note: "DRF, channels, Celery, async views"         },
      { name: "REST API Design",pct: 99, yrs: 25, note: "HATEOAS, versioning, rate limiting"         },
      { name: "GraphQL",        pct: 95, yrs:  8, note: "Apollo, DataLoader, subscriptions"          },
      { name: "WebSockets",     pct: 97, yrs: 12, note: "Socket.io, ws, backpressure management"     },
      { name: "gRPC",           pct: 91, yrs:  7, note: "Protobuf, streaming RPCs"                   },
      { name: "Message Queues", pct: 93, yrs: 10, note: "RabbitMQ, Kafka, SQS"                       },
    ],
  },
  {
    id        : "data",
    domain    : "Data & ORM Layer",
    icon      : "🗄️",
    gradient  : "from-teal-600/25 via-cyan-600/15 to-sky-600/25",
    border    : "border-teal-500/30",
    accent    : "text-teal-400",
    glow      : "shadow-teal-500/10",
    yearsDeep : 30,
    tagline   : "Schema design that outlives every framework",
    skills: [
      { name: "Prisma ORM",    pct: 99, yrs:  5, note: "Expert cert · schema design, migrations"  },
      { name: "PostgreSQL",    pct: 98, yrs: 14, note: "Partitioning, JSONB, EXPLAIN ANALYZE"      },
      { name: "MySQL",         pct: 97, yrs: 16, note: "InnoDB internals, replication, indexing"   },
      { name: "Redis",         pct: 94, yrs: 11, note: "Pub/Sub, streams, Lua scripting"           },
      { name: "MongoDB",       pct: 91, yrs: 10, note: "Aggregation pipelines, Atlas Search"       },
      { name: "Elasticsearch", pct: 90, yrs:  8, note: "Full-text search, ELK stack"               },
      { name: "SQLite",        pct: 90, yrs: 15, note: "Embedded, WAL mode, FTS5"                  },
      { name: "Pinecone / VDB",pct: 88, yrs:  3, note: "Vector similarity search, RAG pipelines"   },
    ],
  },
  {
    id        : "cloud",
    domain    : "Cloud & DevOps",
    icon      : "☁️",
    gradient  : "from-orange-600/25 via-amber-600/15 to-yellow-600/25",
    border    : "border-orange-500/30",
    accent    : "text-orange-400",
    glow      : "shadow-orange-500/10",
    yearsDeep : 14,
    tagline   : "Multi-cloud certified — any platform, any scale",
    skills: [
      { name: "Docker",           pct: 99, yrs: 11, note: "Multi-stage builds, security hardening"   },
      { name: "Kubernetes / K8s", pct: 97, yrs:  9, note: "CKAD cert · production since early days"  },
      { name: "AWS (Pro)",        pct: 98, yrs: 14, note: "SAA + DOP certified · 50+ services"       },
      { name: "GCP",              pct: 94, yrs:  9, note: "ACE certified · GKE, BigQuery, Run"       },
      { name: "Azure",            pct: 93, yrs:  8, note: "AZ-900 + AZ-204 certified"                },
      { name: "Terraform",        pct: 95, yrs:  8, note: "Modules, workspaces, remote state"        },
      { name: "Helm Charts",      pct: 93, yrs:  7, note: "Library charts, hooks, crds"              },
      { name: "GitHub Actions",   pct: 98, yrs:  6, note: "Matrix builds, custom actions, OIDC"     },
    ],
  },
  {
    id        : "ai",
    domain    : "AI / ML Integration",
    icon      : "🤖",
    gradient  : "from-violet-600/25 via-purple-600/15 to-fuchsia-600/25",
    border    : "border-violet-500/30",
    accent    : "text-violet-400",
    glow      : "shadow-violet-500/10",
    yearsDeep :  6,
    tagline   : "LLM-powered products at production scale",
    skills: [
      { name: "LangChain",       pct: 93, yrs: 3, note: "Agents, chains, tools, memory"            },
      { name: "OpenAI / GPT-4",  pct: 95, yrs: 4, note: "Function calling, fine-tuning, evals"     },
      { name: "RAG Pipelines",   pct: 92, yrs: 3, note: "Chunking strategies, re-ranking"           },
      { name: "Prompt Engineering",pct:96,yrs: 4, note: "CoT, few-shot, constitutional AI"          },
      { name: "Vector Databases",pct: 90, yrs: 3, note: "Pinecone, Weaviate, pgvector"              },
      { name: "Hugging Face",    pct: 88, yrs: 3, note: "PEFT, LoRA, inference pipelines"           },
      { name: "SSE Streaming",   pct: 95, yrs: 4, note: "Token streaming, backpressure"             },
      { name: "Python / ML Ops", pct: 91, yrs: 8, note: "scikit-learn, MLflow, model serving"       },
    ],
  },
  {
    id        : "architecture",
    domain    : "Software Architecture",
    icon      : "🏛️",
    gradient  : "from-slate-600/25 via-zinc-600/15 to-gray-600/25",
    border    : "border-slate-500/30",
    accent    : "text-slate-300",
    glow      : "shadow-slate-500/10",
    yearsDeep : 40,
    tagline   : "System design at Google / Meta / Amazon scale",
    skills: [
      { name: "Microservices",     pct: 99, yrs: 20, note: "40+ service migration, zero downtime"  },
      { name: "Event-Driven Arch", pct: 97, yrs: 18, note: "CQRS, Event Sourcing, Saga pattern"    },
      { name: "Domain-Driven Design",pct:96,yrs: 15, note: "Bounded contexts, aggregates"           },
      { name: "System Design",     pct: 99, yrs: 35, note: "Interviewer-level: URL shortener → CDN" },
      { name: "API Design",        pct: 99, yrs: 28, note: "REST, GraphQL, gRPC standards setter"   },
      { name: "Distributed Systems",pct:96,yrs: 20, note: "CAP theorem, consensus, Paxos / Raft"    },
      { name: "Security Architecture",pct:95,yrs:22, note: "OWASP Top 10, zero-trust, SAST/DAST"    },
      { name: "Observability",     pct: 94, yrs: 15, note: "OpenTelemetry, Prometheus, Grafana"     },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT SHOWCASE DATA
// ─────────────────────────────────────────────────────────────────────────────
const PROJECT_SHOWCASE = [
  {
    id       : "ecommerce",
    title    : "Fullstack E-Commerce Platform",
    emoji    : "🛒",
    year     : 2023,
    category : "E-Commerce",
    status   : "Production",
    statusCls: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    gradient : "from-emerald-600/20 via-teal-600/10 to-cyan-600/20",
    border   : "border-emerald-500/30",
    accentCls: "text-emerald-400",
    ringCls  : "ring-emerald-500/20",
    desc     : "Enterprise multi-vendor e-commerce with real-time inventory, AI recommendations, multi-currency checkout, and multi-region cloud deployment handling $4M+ revenue.",
    tech: [
      { name: "React.js",    cls: "bg-cyan-500/20 text-cyan-300"    },
      { name: "Next.js",     cls: "bg-gray-500/20 text-gray-300"    },
      { name: "Redux.js",    cls: "bg-purple-500/20 text-purple-300"},
      { name: "Prisma",      cls: "bg-teal-500/20 text-teal-300"    },
      { name: "Django",      cls: "bg-green-500/20 text-green-300"  },
      { name: "PostgreSQL",  cls: "bg-blue-500/20 text-blue-300"    },
      { name: "MySQL",       cls: "bg-orange-500/20 text-orange-300"},
      { name: "Docker",      cls: "bg-sky-500/20 text-sky-300"      },
      { name: "AWS Cloud",   cls: "bg-amber-500/20 text-amber-300"  },
      { name: "Tailwind CSS",cls: "bg-teal-400/20 text-teal-200"   },
      { name: "REST API",    cls: "bg-pink-500/20 text-pink-300"    },
      { name: "UI/UX",       cls: "bg-violet-500/20 text-violet-300"},
    ],
    metrics: [
      { label: "Daily Active Users", value: "120K+"   },
      { label: "Uptime SLA",         value: "99.99%"  },
      { label: "API Response",       value: "< 80ms"  },
      { label: "Revenue Processed",  value: "$4M+"    },
    ],
    highlights: [
      "Microservices on Docker + Kubernetes — 12-service mesh",
      "Real-time WebSocket inventory sync across 5 warehouses",
      "Django ML service: AI product recommendations (+22% CTR)",
      "Multi-currency checkout — Stripe + PayPal + crypto gateway",
      "AWS CloudFront CDN image pipeline — 94% cache hit rate",
      "Postgres + Redis cache layer: P99 query time < 40ms",
    ],
    architecture: ["Microservices", "CQRS", "Event-Driven", "CDN", "Multi-region"],
  },
  {
    id       : "portfolio",
    title    : "Portfolio Platform",
    emoji    : "🎨",
    year     : 2024,
    category : "Portfolio",
    status   : "Live",
    statusCls: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    gradient : "from-blue-600/20 via-indigo-600/10 to-violet-600/20",
    border   : "border-blue-500/30",
    accentCls: "text-blue-400",
    ringCls  : "ring-blue-500/20",
    desc     : "Principal-level developer portfolio with SSR+ISR hybrid rendering, CMS-driven content, interactive skill trees, A/B tested CTAs, and Lighthouse 100 across all metrics.",
    tech: [
      { name: "React.js",    cls: "bg-cyan-500/20 text-cyan-300"    },
      { name: "Next.js",     cls: "bg-gray-500/20 text-gray-300"    },
      { name: "Redux.js",    cls: "bg-purple-500/20 text-purple-300"},
      { name: "Prisma",      cls: "bg-teal-500/20 text-teal-300"    },
      { name: "Node.js",     cls: "bg-green-500/20 text-green-300"  },
      { name: "Express.js",  cls: "bg-gray-400/20 text-gray-200"    },
      { name: "PostgreSQL",  cls: "bg-blue-500/20 text-blue-300"    },
      { name: "MySQL",       cls: "bg-orange-500/20 text-orange-300"},
      { name: "Docker",      cls: "bg-sky-500/20 text-sky-300"      },
      { name: "Cloud",       cls: "bg-amber-500/20 text-amber-300"  },
      { name: "Tailwind CSS",cls: "bg-teal-400/20 text-teal-200"   },
      { name: "REST API",    cls: "bg-pink-500/20 text-pink-300"    },
      { name: "UI/UX",       cls: "bg-violet-500/20 text-violet-300"},
    ],
    metrics: [
      { label: "Lighthouse Score",    value: "100/100" },
      { label: "Load Time",           value: "< 1.2s"  },
      { label: "Bounce Rate Reduced", value: "↓ 42%"   },
      { label: "Contact Conversions", value: "↑ 67%"   },
    ],
    highlights: [
      "SSR + ISR hybrid — static speed with dynamic freshness",
      "Headless CMS architecture — zero redeploy content updates",
      "Interactive 3D skill graph (Three.js + React Three Fiber)",
      "A/B testing framework with statistical significance engine",
      "i18n support across 6 languages via next-intl",
      "WCAG 2.2 AA — tested with NVDA, JAWS, VoiceOver",
    ],
    architecture: ["SSR", "ISR", "Headless CMS", "JAMstack", "i18n"],
  },
  {
    id       : "dashboard",
    title    : "Analytics Dashboard App",
    emoji    : "📊",
    year     : 2023,
    category : "Dashboard",
    status   : "Production",
    statusCls: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    gradient : "from-violet-600/20 via-purple-600/10 to-pink-600/20",
    border   : "border-violet-500/30",
    accentCls: "text-violet-400",
    ringCls  : "ring-violet-500/20",
    desc     : "Real-time BI dashboard with drag-and-drop widget system, RBAC, row-level multi-tenant isolation, 10M+ row rendering, and scheduled report delivery.",
    tech: [
      { name: "React.js",    cls: "bg-cyan-500/20 text-cyan-300"    },
      { name: "Next.js",     cls: "bg-gray-500/20 text-gray-300"    },
      { name: "Redux.js",    cls: "bg-purple-500/20 text-purple-300"},
      { name: "Prisma",      cls: "bg-teal-500/20 text-teal-300"    },
      { name: "Node.js",     cls: "bg-green-500/20 text-green-300"  },
      { name: "Express.js",  cls: "bg-gray-400/20 text-gray-200"    },
      { name: "PostgreSQL",  cls: "bg-blue-500/20 text-blue-300"    },
      { name: "MySQL",       cls: "bg-orange-500/20 text-orange-300"},
      { name: "Docker",      cls: "bg-sky-500/20 text-sky-300"      },
      { name: "Cloud",       cls: "bg-amber-500/20 text-amber-300"  },
      { name: "Tailwind CSS",cls: "bg-teal-400/20 text-teal-200"   },
      { name: "REST API",    cls: "bg-pink-500/20 text-pink-300"    },
      { name: "UI/UX",       cls: "bg-violet-500/20 text-violet-300"},
    ],
    metrics: [
      { label: "Active Tenants",  value: "500+"     },
      { label: "Events / Sec",    value: "50K+"     },
      { label: "Query P99",       value: "< 200ms"  },
      { label: "Data Rendered",   value: "10M+ rows"},
    ],
    highlights: [
      "Drag-and-drop widget builder — 40+ chart types via Recharts",
      "WebSocket live KPI — sub-100ms update latency at 500 tenants",
      "RBAC: 12 permission scopes with attribute-based overrides",
      "Row-level security in Postgres — zero cross-tenant data bleed",
      "Export pipeline: PDF (Puppeteer) + Excel (exceljs) + CSV",
      "Scheduled report engine with cron, timezone-aware delivery",
    ],
    architecture: ["Multi-tenant", "RBAC", "WebSocket", "CQRS", "Event Sourcing"],
  },
  {
    id       : "chat",
    title    : "Real-Time Chat Application",
    emoji    : "💬",
    year     : 2022,
    category : "Real-Time",
    status   : "Production",
    statusCls: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    gradient : "from-pink-600/20 via-rose-600/10 to-red-600/20",
    border   : "border-pink-500/30",
    accentCls: "text-pink-400",
    ringCls  : "ring-pink-500/20",
    desc     : "Slack-inspired platform with E2E encryption, WebRTC video, multi-workspace support, file sharing, full-text message search, and enterprise SSO — 200K concurrent users.",
    tech: [
      { name: "React.js",    cls: "bg-cyan-500/20 text-cyan-300"    },
      { name: "Next.js",     cls: "bg-gray-500/20 text-gray-300"    },
      { name: "Redux.js",    cls: "bg-purple-500/20 text-purple-300"},
      { name: "Prisma",      cls: "bg-teal-500/20 text-teal-300"    },
      { name: "Node.js",     cls: "bg-green-500/20 text-green-300"  },
      { name: "Express.js",  cls: "bg-gray-400/20 text-gray-200"    },
      { name: "PostgreSQL",  cls: "bg-blue-500/20 text-blue-300"    },
      { name: "MySQL",       cls: "bg-orange-500/20 text-orange-300"},
      { name: "Docker",      cls: "bg-sky-500/20 text-sky-300"      },
      { name: "Cloud",       cls: "bg-amber-500/20 text-amber-300"  },
      { name: "Tailwind CSS",cls: "bg-teal-400/20 text-teal-200"   },
      { name: "REST API",    cls: "bg-pink-500/20 text-pink-300"    },
      { name: "UI/UX",       cls: "bg-violet-500/20 text-violet-300"},
    ],
    metrics: [
      { label: "Concurrent Users",    value: "200K+"   },
      { label: "Messages / Day",      value: "5M+"     },
      { label: "WebSocket Latency",   value: "< 15ms"  },
      { label: "Uptime",              value: "99.97%"  },
    ],
    highlights: [
      "E2E encryption via Signal Protocol — double ratchet algorithm",
      "WebRTC P2P video/audio — SFU architecture for group calls",
      "Persistent history with Elasticsearch full-text search",
      "S3 + CloudFront file storage — virus scan on every upload",
      "Enterprise SSO: SAML 2.0 + OAuth 2.0 + OIDC",
      "FCM + APNS push — delivery receipts, read receipts",
    ],
    architecture: ["WebSocket", "WebRTC", "E2E Encryption", "SFU", "SSO"],
  },
  {
    id       : "ai-app",
    title    : "AI + Fullstack Application",
    emoji    : "🤖",
    year     : 2024,
    category : "AI / ML",
    status   : "Production",
    statusCls: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    gradient : "from-amber-600/20 via-yellow-600/10 to-orange-600/20",
    border   : "border-amber-500/30",
    accentCls: "text-amber-400",
    ringCls  : "ring-amber-500/20",
    desc     : "LLM-powered platform integrating GPT-4, RAG pipeline, vector databases, autonomous agents, SSE token streaming, and a Django + Next.js production backend serving 1M+ daily calls.",
    tech: [
      { name: "React.js",    cls: "bg-cyan-500/20 text-cyan-300"    },
      { name: "Next.js",     cls: "bg-gray-500/20 text-gray-300"    },
      { name: "Redux.js",    cls: "bg-purple-500/20 text-purple-300"},
      { name: "Prisma",      cls: "bg-teal-500/20 text-teal-300"    },
      { name: "Django",      cls: "bg-green-500/20 text-green-300"  },
      { name: "PostgreSQL",  cls: "bg-blue-500/20 text-blue-300"    },
      { name: "MySQL",       cls: "bg-orange-500/20 text-orange-300"},
      { name: "Docker",      cls: "bg-sky-500/20 text-sky-300"      },
      { name: "Cloud",       cls: "bg-amber-500/20 text-amber-300"  },
      { name: "Tailwind CSS",cls: "bg-teal-400/20 text-teal-200"   },
      { name: "REST API",    cls: "bg-pink-500/20 text-pink-300"    },
      { name: "UI/UX",       cls: "bg-violet-500/20 text-violet-300"},
    ],
    metrics: [
      { label: "Inference Calls/Day", value: "1M+"     },
      { label: "Model Accuracy",      value: "94.7%"   },
      { label: "Token Cost Saved",    value: "↓ 60%"   },
      { label: "User Satisfaction",   value: "4.9 / 5" },
    ],
    highlights: [
      "RAG pipeline: Pinecone vector DB + semantic re-ranking",
      "LangChain autonomous agents — tool use, reflection, memory",
      "SSE token streaming — perceived latency < 200ms",
      "Fine-tuned domain model on proprietary dataset (LoRA)",
      "HITL feedback loop — continuous model improvement system",
      "Cost-optimized model router: GPT-4 → 3.5 → local fallback",
    ],
    architecture: ["RAG", "LangChain Agents", "SSE Streaming", "LoRA", "HITL"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CERTIFICATION VAULT DATA
// ─────────────────────────────────────────────────────────────────────────────
const CERTIFICATION_VAULT = [
  {
    id        : "aws-saa",
    issuer    : "AWS",
    issuerLogo: "☁️",
    name      : "Solutions Architect – Associate",
    year      : 2021,
    credId    : "AWS-SAA-XXXXXXX",
    gradient  : "from-orange-500 to-amber-500",
    badge     : "bg-orange-500/20 text-orange-300 border-orange-500/30",
    stripe    : "bg-gradient-to-r from-orange-500 to-amber-500",
    topics    : ["EC2", "S3", "RDS", "Lambda", "CloudFormation", "VPC", "Route53"],
  },
  {
    id        : "aws-dop",
    issuer    : "AWS",
    issuerLogo: "☁️",
    name      : "DevOps Engineer – Professional",
    year      : 2022,
    credId    : "AWS-DOP-XXXXXXX",
    gradient  : "from-orange-600 to-red-500",
    badge     : "bg-red-500/20 text-red-300 border-red-500/30",
    stripe    : "bg-gradient-to-r from-orange-600 to-red-500",
    topics    : ["CodePipeline", "CodeDeploy", "ECS", "EKS", "CloudWatch", "OpsWorks"],
  },
  {
    id        : "gcp-ace",
    issuer    : "Google",
    issuerLogo: "🌐",
    name      : "Associate Cloud Engineer",
    year      : 2020,
    credId    : "GCP-ACE-XXXXXXX",
    gradient  : "from-blue-500 to-cyan-400",
    badge     : "bg-blue-500/20 text-blue-300 border-blue-500/30",
    stripe    : "bg-gradient-to-r from-blue-500 to-cyan-400",
    topics    : ["GKE", "BigQuery", "Pub/Sub", "Cloud Run", "Firestore", "IAM"],
  },
  {
    id        : "ms-az900",
    issuer    : "Microsoft",
    issuerLogo: "🪟",
    name      : "Azure Fundamentals AZ-900",
    year      : 2021,
    credId    : "MS-AZ900-XXXXXXX",
    gradient  : "from-sky-500 to-blue-600",
    badge     : "bg-sky-500/20 text-sky-300 border-sky-500/30",
    stripe    : "bg-gradient-to-r from-sky-500 to-blue-600",
    topics    : ["Azure AD", "AKS", "App Service", "Cosmos DB", "DevOps", "Monitor"],
  },
  {
    id        : "ms-az204",
    issuer    : "Microsoft",
    issuerLogo: "🪟",
    name      : "Azure Developer Associate AZ-204",
    year      : 2022,
    credId    : "MS-AZ204-XXXXXXX",
    gradient  : "from-indigo-500 to-sky-600",
    badge     : "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    stripe    : "bg-gradient-to-r from-indigo-500 to-sky-600",
    topics    : ["Azure Functions", "Service Bus", "APIM", "Key Vault", "Blob Storage"],
  },
  {
    id        : "ibm-cad",
    issuer    : "IBM",
    issuerLogo: "🔷",
    name      : "Cloud Application Developer",
    year      : 2020,
    credId    : "IBM-CAD-XXXXXXX",
    gradient  : "from-blue-700 to-blue-500",
    badge     : "bg-blue-700/20 text-blue-200 border-blue-700/30",
    stripe    : "bg-gradient-to-r from-blue-700 to-blue-500",
    topics    : ["OpenShift", "Kubernetes", "Kafka", "Db2", "Cloud Foundry", "Watson"],
  },
  {
    id        : "meta-be",
    issuer    : "Meta",
    issuerLogo: "🔵",
    name      : "Back-End Developer Professional",
    year      : 2023,
    credId    : "META-BE-XXXXXXX",
    gradient  : "from-blue-400 to-indigo-500",
    badge     : "bg-blue-400/20 text-blue-200 border-blue-400/30",
    stripe    : "bg-gradient-to-r from-blue-400 to-indigo-500",
    topics    : ["Django", "DRF", "MySQL", "REST API", "JWT Auth", "Version Control"],
  },
  {
    id        : "meta-fe",
    issuer    : "Meta",
    issuerLogo: "🔵",
    name      : "Front-End Developer Professional",
    year      : 2023,
    credId    : "META-FE-XXXXXXX",
    gradient  : "from-cyan-400 to-blue-500",
    badge     : "bg-cyan-400/20 text-cyan-200 border-cyan-400/30",
    stripe    : "bg-gradient-to-r from-cyan-400 to-blue-500",
    topics    : ["React", "Redux", "Accessibility", "UI/UX", "Figma", "Bootstrap"],
  },
  {
    id        : "prisma-exp",
    issuer    : "Prisma",
    issuerLogo: "🗃️",
    name      : "ORM Expert Certification",
    year      : 2022,
    credId    : "PRISMA-EXP-XXXXXXX",
    gradient  : "from-teal-500 to-emerald-400",
    badge     : "bg-teal-500/20 text-teal-300 border-teal-500/30",
    stripe    : "bg-gradient-to-r from-teal-500 to-emerald-400",
    topics    : ["Schema Design", "Migrations", "Relations", "PostgreSQL", "MySQL", "Transactions"],
  },
  {
    id        : "cncf-ckad",
    issuer    : "CNCF",
    issuerLogo: "☸️",
    name      : "Kubernetes Application Developer (CKAD)",
    year      : 2021,
    credId    : "CKAD-XXXXXXX",
    gradient  : "from-violet-500 to-purple-600",
    badge     : "bg-violet-500/20 text-violet-300 border-violet-500/30",
    stripe    : "bg-gradient-to-r from-violet-500 to-purple-600",
    topics    : ["Pods", "Deployments", "Services", "ConfigMaps", "Secrets", "Helm"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TECH MASTERY MAP  (used by Mastery Map tab — radar-style breakdown)
// ─────────────────────────────────────────────────────────────────────────────
const TECH_MASTERY_MAP = [
  {
    layer    : "Frontend Stack",
    icon     : "⚛️",
    colorBar : "bg-gradient-to-r from-cyan-500 to-blue-500",
    colorText: "text-cyan-400",
    items: [
      { tech: "React.js",    mastery: 99, since: 2013 },
      { tech: "Next.js",     mastery: 99, since: 2019 },
      { tech: "Redux.js",    mastery: 98, since: 2015 },
      { tech: "Tailwind CSS",mastery: 99, since: 2020 },
      { tech: "TypeScript",  mastery: 98, since: 2016 },
      { tech: "UI/UX",       mastery: 95, since: 2004 },
    ],
  },
  {
    layer    : "Backend Stack",
    icon     : "🔧",
    colorBar : "bg-gradient-to-r from-green-500 to-emerald-500",
    colorText: "text-green-400",
    items: [
      { tech: "Node.js",    mastery: 99, since: 2009 },
      { tech: "Express.js", mastery: 99, since: 2011 },
      { tech: "Django",     mastery: 97, since: 2017 },
      { tech: "REST API",   mastery: 99, since: 2000 },
      { tech: "GraphQL",    mastery: 95, since: 2017 },
      { tech: "WebSockets", mastery: 97, since: 2013 },
    ],
  },
  {
    layer    : "Database Layer",
    icon     : "🗄️",
    colorBar : "bg-gradient-to-r from-teal-500 to-cyan-500",
    colorText: "text-teal-400",
    items: [
      { tech: "Prisma ORM",  mastery: 99, since: 2020 },
      { tech: "PostgreSQL",  mastery: 98, since: 2010 },
      { tech: "MySQL",       mastery: 97, since: 2008 },
      { tech: "Redis",       mastery: 94, since: 2013 },
      { tech: "MongoDB",     mastery: 91, since: 2014 },
      { tech: "Elasticsearch",mastery:90, since: 2016 },
    ],
  },
  {
    layer    : "Cloud & DevOps",
    icon     : "☁️",
    colorBar : "bg-gradient-to-r from-orange-500 to-amber-500",
    colorText: "text-orange-400",
    items: [
      { tech: "Docker",       mastery: 99, since: 2014 },
      { tech: "Kubernetes",   mastery: 97, since: 2016 },
      { tech: "AWS",          mastery: 98, since: 2011 },
      { tech: "GCP",          mastery: 94, since: 2015 },
      { tech: "Azure",        mastery: 93, since: 2017 },
      { tech: "Terraform",    mastery: 95, since: 2017 },
    ],
  },
  {
    layer    : "AI / ML Stack",
    icon     : "🤖",
    colorBar : "bg-gradient-to-r from-violet-500 to-purple-500",
    colorText: "text-violet-400",
    items: [
      { tech: "GPT-4 / OpenAI", mastery: 95, since: 2021 },
      { tech: "LangChain",      mastery: 93, since: 2022 },
      { tech: "RAG Pipelines",  mastery: 92, since: 2022 },
      { tech: "Pinecone",       mastery: 90, since: 2022 },
      { tech: "Hugging Face",   mastery: 88, since: 2022 },
      { tech: "SSE Streaming",  mastery: 95, since: 2020 },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// INFRA & TESTING DATA
// ─────────────────────────────────────────────────────────────────────────────
const INFRA_TESTING_DATA = [
  {
    category  : "ORM & Database",
    icon      : "🗄️",
    gradient  : "from-teal-500/20 to-emerald-500/20",
    borderCls : "border-teal-500/30",
    barCls    : "bg-gradient-to-r from-teal-500 to-emerald-400",
    items: [
      { name: "Prisma ORM",  level: 99, yrs: 5  },
      { name: "PostgreSQL",  level: 98, yrs: 14 },
      { name: "MySQL",       level: 97, yrs: 16 },
      { name: "Redis",       level: 94, yrs: 11 },
      { name: "MongoDB",     level: 91, yrs: 10 },
      { name: "SQLite",      level: 90, yrs: 15 },
    ],
  },
  {
    category  : "Testing & QA",
    icon      : "🧪",
    gradient  : "from-pink-500/20 to-rose-500/20",
    borderCls : "border-pink-500/30",
    barCls    : "bg-gradient-to-r from-pink-500 to-rose-400",
    items: [
      { name: "Jest",                   level: 98, yrs: 8 },
      { name: "Vitest",                 level: 97, yrs: 3 },
      { name: "Cypress E2E",            level: 96, yrs: 6 },
      { name: "Playwright",             level: 95, yrs: 4 },
      { name: "React Testing Library",  level: 97, yrs: 6 },
      { name: "Supertest",              level: 93, yrs: 7 },
      { name: "k6 Load Testing",        level: 90, yrs: 4 },
      { name: "Storybook",              level: 94, yrs: 5 },
    ],
  },
  {
    category  : "DevOps & CI/CD",
    icon      : "⚙️",
    gradient  : "from-orange-500/20 to-amber-500/20",
    borderCls : "border-orange-500/30",
    barCls    : "bg-gradient-to-r from-orange-500 to-amber-400",
    items: [
      { name: "Docker",               level: 99, yrs: 11 },
      { name: "Kubernetes / K8s",     level: 97, yrs:  9 },
      { name: "Terraform",            level: 95, yrs:  8 },
      { name: "GitHub Actions CI/CD", level: 98, yrs:  6 },
      { name: "Nginx",                level: 96, yrs: 14 },
      { name: "Helm Charts",          level: 93, yrs:  7 },
      { name: "Prometheus + Grafana", level: 92, yrs:  6 },
      { name: "ELK Stack",            level: 90, yrs:  7 },
    ],
  },
  {
    category  : "Todo App Architecture",
    icon      : "✅",
    gradient  : "from-lime-500/20 to-green-500/20",
    borderCls : "border-lime-500/30",
    barCls    : "bg-gradient-to-r from-lime-500 to-green-400",
    items: [
      { name: "XState Machines",        level: 96, yrs: 5 },
      { name: "Optimistic UI + Rollback",level:99, yrs: 8 },
      { name: "Offline-first SW",       level: 95, yrs: 6 },
      { name: "dnd-kit D&D",            level: 94, yrs: 4 },
      { name: "CRDT Collaboration",     level: 91, yrs: 4 },
      { name: "IndexedDB Cache",        level: 92, yrs: 6 },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ASYNC UTILITIES  — Promise-based data loading
// ─────────────────────────────────────────────────────────────────────────────

/** Tiny delay returning a Promise — simulates network/compute latency */
const wait = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * Parallel fetch of all SkillCard data slices.
 * Each slice resolves independently; results merged via reduce.
 */
const fetchSkillCardData = () =>
  Promise.all([
    wait(120).then(() => ({ domains       : SKILL_DOMAINS       })),
    wait(90 ).then(() => ({ projects      : PROJECT_SHOWCASE     })),
    wait(150).then(() => ({ certs         : CERTIFICATION_VAULT  })),
    wait(100).then(() => ({ masteryMap    : TECH_MASTERY_MAP     })),
    wait(80 ).then(() => ({ infraTesting  : INFRA_TESTING_DATA   })),
  ]).then((slices) => slices.reduce((acc, s) => ({ ...acc, ...s }), {}));

/**
 * Derives aggregate stats from loaded data — runs in a Promise so it
 * doesn't block the initial render.
 */
const deriveStats = (data) =>
  new Promise((resolve) => {
    const totalSkills = data.domains.reduce(
      (n, d) => n + d.skills.length, 0
    );
    const avgMastery =
      data.domains.flatMap((d) => d.skills.map((s) => s.pct))
        .reduce((sum, v, _, arr) => sum + v / arr.length, 0);

    const certsByIssuer = data.certs.reduce((acc, c) => {
      acc[c.issuer] = (acc[c.issuer] || 0) + 1;
      return acc;
    }, {});

    const techFingerprint = data.projects
      .flatMap((p) => p.tech.map((t) => t.name))
      .reduce((acc, name) => {
        acc[name] = (acc[name] || 0) + 1;
        return acc;
      }, {});

    resolve({ totalSkills, avgMastery, certsByIssuer, techFingerprint });
  });

// ─────────────────────────────────────────────────────────────────────────────
// REDUCER — centralised UI state machine
// ─────────────────────────────────────────────────────────────────────────────
const UI_ACTIONS = Object.freeze({
  SET_TAB      : "SET_TAB",
  SET_FILTER   : "SET_FILTER",
  SET_QUERY    : "SET_QUERY",
  TOGGLE_EXPAND: "TOGGLE_EXPAND",
  RESET_FILTERS: "RESET_FILTERS",
});

const uiInitialState = {
  activeTab   : "skills",
  domainFilter: "all",
  searchQuery : "",
  expandedIds : {},
};

const uiReducer = (state, action) => {
  switch (action.type) {
    case UI_ACTIONS.SET_TAB:
      return { ...state, activeTab: action.payload, searchQuery: "" };
    case UI_ACTIONS.SET_FILTER:
      return { ...state, domainFilter: action.payload };
    case UI_ACTIONS.SET_QUERY:
      return { ...state, searchQuery: action.payload };
    case UI_ACTIONS.TOGGLE_EXPAND: {
      const id = action.payload;
      return {
        ...state,
        expandedIds: { ...state.expandedIds, [id]: !state.expandedIds[id] },
      };
    }
    case UI_ACTIONS.RESET_FILTERS:
      return { ...state, domainFilter: "all", searchQuery: "" };
    default:
      return state;
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOM HOOKS
// ─────────────────────────────────────────────────────────────────────────────

/** Loads all SkillCard data and derived stats asynchronously */
const useSkillData = () => {
  const [data,    setData   ] = useState(null);
  const [stats,   setStats  ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError  ] = useState(null);

  useEffect(() => {
    let active = true;

    const run = async () => {
      try {
        setLoading(true);
        const loaded = await fetchSkillCardData();
        if (!active) return;
        setData(loaded);

        const derived = await deriveStats(loaded);
        if (!active) return;
        setStats(derived);
      } catch (err) {
        if (active) setError(err?.message ?? "Data load failed.");
      } finally {
        if (active) setLoading(false);
      }
    };

    run();
    return () => { active = false; };
  }, []);

  return { data, stats, loading, error };
};

/**
 * Fires `onEnter` once when the observed element enters the viewport.
 * Used to trigger skill-bar animations.
 */
const useEnterAnimation = (rootMargin = "0px") => {
  const ref       = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true); // Fallback for SSR / unsupported envs
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin, threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  return { ref, visible };
};

/** Debounces a value — prevents excessive re-renders on search input */
const useDebounce = (value, delay = 280) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
};

// ═════════════════════════════════════════════════════════════════════════════
//  PART 3 — ATOMIC SUB-COMPONENTS
//  GlowBadge · MasteryRing · TechPill · MetricStat · CategoryHeader
//  SkillBar · SectionHeader · LoadingSkeleton · EmptyState · ErrorState
// ═════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// GlowBadge — coloured pill with optional glow shadow
// ─────────────────────────────────────────────────────────────────────────────
const GlowBadge = ({ label, cls, glowCls = "" }) => (
  <span
    className={`
      inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full
      text-xs font-bold border tracking-wide
      ${cls} ${glowCls}
    `}
  >
    {label}
  </span>
);

// ─────────────────────────────────────────────────────────────────────────────
// LevelBadge — derives colour from mastery percentage automatically
// ─────────────────────────────────────────────────────────────────────────────
const LevelBadge = ({ pct }) => {
  const key  = resolveLevel(pct);
  const meta = LEVEL_META[key];
  return <GlowBadge label={meta.label} cls={meta.badge} />;
};

// ─────────────────────────────────────────────────────────────────────────────
// MasteryRing — SVG circular progress indicator
// ─────────────────────────────────────────────────────────────────────────────
const MasteryRing = ({ pct, size = 56, stroke = 5 }) => {
  const r          = (size - stroke * 2) / 2;
  const circ       = 2 * Math.PI * r;
  const dashOffset = circ - (pct / 100) * circ;
  const key        = resolveLevel(pct);
  const meta       = LEVEL_META[key];

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          strokeWidth={stroke}
          className="stroke-slate-700/60"
        />
        {/* Progress */}
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={dashOffset}
          className={`${meta.ring} transition-all duration-1000`}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }}
        />
      </svg>
      <span className="absolute text-xs font-black text-white">{pct}</span>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// TechPill — technology badge used on project cards
// ─────────────────────────────────────────────────────────────────────────────
const TechPill = ({ name, cls }) => (
  <span
    className={`
      inline-flex items-center px-2.5 py-0.5 rounded-full
      text-xs font-semibold border border-transparent
      ${cls} mr-1.5 mb-1.5
    `}
  >
    {name}
  </span>
);

// ─────────────────────────────────────────────────────────────────────────────
// MetricStat — single numeric KPI tile
// ─────────────────────────────────────────────────────────────────────────────
const MetricStat = ({ label, value, accentCls = "text-white" }) => (
  <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3 text-center">
    <div className={`text-lg font-black leading-tight ${accentCls}`}>{value}</div>
    <div className="text-xs text-slate-400 mt-0.5 leading-tight">{label}</div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// CategoryHeader — icon + title header for domain / category cards
// ─────────────────────────────────────────────────────────────────────────────
const CategoryHeader = ({ icon, title, subtitle, accentCls = "text-slate-300" }) => (
  <div className="flex items-start gap-3 mb-5">
    <span className="text-2xl leading-none mt-0.5">{icon}</span>
    <div>
      <h3 className={`text-base font-black ${accentCls}`}>{title}</h3>
      {subtitle && (
        <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
      )}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SkillBar — animated horizontal progress bar
// ─────────────────────────────────────────────────────────────────────────────
const SkillBar = ({ name, pct, yrs, note, visible, barCls }) => {
  const barRef = useRef(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    if (visible) {
      el.style.transition = "width 1.2s cubic-bezier(0.4,0,0.2,1)";
      el.style.width      = `${pct}%`;
    } else {
      el.style.width = "0%";
    }
  }, [visible, pct]);

  const defaultBarCls = useMemo(() => {
    const lvl = resolveLevel(pct);
    const map  = {
      LEGENDARY : "bg-gradient-to-r from-emerald-500 to-teal-400",
      EXPERT    : "bg-gradient-to-r from-cyan-500 to-blue-400",
      ADVANCED  : "bg-gradient-to-r from-violet-500 to-purple-400",
      PROFICIENT: "bg-gradient-to-r from-amber-500 to-yellow-400",
    };
    return map[lvl];
  }, [pct]);

  return (
    <div className="mb-3.5 group/bar">
      <div className="flex justify-between items-center mb-1 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-semibold text-slate-300 truncate">{name}</span>
          {yrs && (
            <span className="text-xs text-slate-600 shrink-0">{yrs}yr</span>
          )}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <LevelBadge pct={pct} />
          <span className="text-xs font-black text-slate-400">{pct}%</span>
        </div>
      </div>

      {note && (
        <p className="text-xs text-slate-600 mb-1 opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200">
          {note}
        </p>
      )}

      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
        <div
          ref={barRef}
          style={{ width: 0 }}
          className={`h-full rounded-full ${barCls ?? defaultBarCls}`}
        />
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SectionHeader — large centred heading for each panel
// ─────────────────────────────────────────────────────────────────────────────
const SectionHeader = ({ icon, title, subtitle }) => (
  <div className="text-center mb-10">
    <div className="text-4xl mb-3">{icon}</div>
    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
      {title}
    </h2>
    {subtitle && (
      <p className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// LoadingSkeleton — pulsing placeholder while data resolves
// ─────────────────────────────────────────────────────────────────────────────
const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-6 py-4">
    <div className="h-52 bg-slate-800/60 rounded-3xl" />
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((n) => (
        <div key={n} className="h-10 w-28 bg-slate-800/60 rounded-xl" />
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <div key={n} className="h-64 bg-slate-800/60 rounded-2xl" />
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// EmptyState — shown when search yields no results
// ─────────────────────────────────────────────────────────────────────────────
const EmptyState = ({ onReset }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="text-5xl mb-4">🔍</div>
    <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
    <p className="text-slate-400 text-sm mb-5">
      Try a different search term or reset your filters.
    </p>
    <button
      onClick={onReset}
      className="px-5 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold rounded-xl transition-colors"
    >
      Reset Filters
    </button>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// ErrorState — shown on data load failure
// ─────────────────────────────────────────────────────────────────────────────
const ErrorState = ({ message }) => (
  <div className="min-h-[60vh] flex items-center justify-center p-6">
    <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-8 text-center max-w-md">
      <div className="text-4xl mb-3">⚠️</div>
      <h2 className="text-xl font-bold text-white mb-2">Failed to load skills</h2>
      <p className="text-red-400 text-sm mb-4">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-bold rounded-xl transition-colors"
      >
        Retry
      </button>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// HighlightDot — bullet point used in project architecture lists
// ─────────────────────────────────────────────────────────────────────────────
const HighlightDot = ({ text, accentCls = "text-violet-400" }) => (
  <div className="flex items-start gap-2.5 bg-slate-800/40 rounded-xl p-3 border border-slate-700/40">
    <span className={`shrink-0 mt-0.5 text-sm ${accentCls}`}>◆</span>
    <span className="text-sm text-slate-300 leading-snug">{text}</span>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// ArchitecturePill — small tag chip for architectural patterns
// ─────────────────────────────────────────────────────────────────────────────
const ArchitecturePill = ({ label }) => (
  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/70 text-slate-300 border border-slate-600/50 mr-1.5 mb-1.5 inline-block">
    {label}
  </span>
);

// ═════════════════════════════════════════════════════════════════════════════
//  PART 4 — MOLECULE & ORGANISM COMPONENTS
//  SkillDomainCard · ProjectShowcaseCard · CertVaultCard
//  MasteryRadarSection · InfraTestingCard · TodoDeepDive
// ═════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// SkillDomainCard — one domain card (Frontend / Backend / Data / Cloud / AI)
// ─────────────────────────────────────────────────────────────────────────────
const SkillDomainCard = ({ domain, searchQuery }) => {
  const { ref, visible } = useEnterAnimation("-60px");
  const [showAll, setShowAll] = useState(false);

  // Filter skills by search query
  const filteredSkills = useMemo(() => {
    if (!searchQuery) return domain.skills;
    const q = searchQuery.toLowerCase();
    return domain.skills.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        (s.note && s.note.toLowerCase().includes(q))
    );
  }, [domain.skills, searchQuery]);

  const visibleSkills = showAll ? filteredSkills : filteredSkills.slice(0, 5);
  const hasMore       = filteredSkills.length > 5;

  const avgPct = useMemo(
    () =>
      Math.round(
        domain.skills.reduce((sum, s) => sum + s.pct, 0) / domain.skills.length
      ),
    [domain.skills]
  );

  return (
    <div
      ref={ref}
      className={`
        relative rounded-2xl border overflow-hidden
        bg-gradient-to-br ${domain.gradient} ${domain.border}
        hover:border-white/20 hover:shadow-xl ${domain.glow}
        transition-all duration-300
      `}
    >
      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3 mb-3">
          <CategoryHeader
            icon={domain.icon}
            title={domain.domain}
            subtitle={domain.tagline}
            accentCls={domain.accent}
          />
          <div className="shrink-0 flex flex-col items-end gap-1.5">
            <MasteryRing pct={avgPct} size={52} stroke={5} />
            <span className="text-xs text-slate-500">avg mastery</span>
          </div>
        </div>

        {/* Domain meta pills */}
        <div className="flex items-center gap-2 mb-4">
          <GlowBadge
            label={`${domain.yearsDeep}yr deep`}
            cls="bg-slate-700/60 text-slate-300 border-slate-600/40"
          />
          <GlowBadge
            label={`${domain.skills.length} skills`}
            cls="bg-slate-700/60 text-slate-300 border-slate-600/40"
          />
        </div>
      </div>

      {/* Skill bars */}
      <div className="px-5 pb-2">
        {filteredSkills.length === 0 ? (
          <p className="text-sm text-slate-500 italic py-2">
            No skills match your search.
          </p>
        ) : (
          visibleSkills.map((skill) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              pct={skill.pct}
              yrs={skill.yrs}
              note={skill.note}
              visible={visible}
            />
          ))
        )}
      </div>

      {/* Show more / less toggle */}
      {hasMore && (
        <div className="px-5 pb-5">
          <button
            onClick={() => setShowAll((v) => !v)}
            className={`
              w-full text-xs font-bold py-2 px-3 rounded-xl
              bg-slate-800/50 border border-slate-700/50
              ${domain.accent} hover:bg-slate-700/60
              transition-colors duration-200
            `}
          >
            {showAll
              ? "Show less ▲"
              : `+${filteredSkills.length - 5} more skills ▼`}
          </button>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// ProjectShowcaseCard — full project card with expand/collapse highlights
// ─────────────────────────────────────────────────────────────────────────────
const ProjectShowcaseCard = ({ project, isExpanded, onToggle }) => (
  <div
    className={`
      relative rounded-3xl border overflow-hidden
      bg-gradient-to-br ${project.gradient} ${project.border}
      hover:border-white/20 transition-all duration-300
    `}
  >
    {/* Top accent stripe */}
    <div className={`h-1 w-full bg-gradient-to-r ${project.gradient.replace("/20","").replace("via-","via-")}`} />

    {/* Card header */}
    <div className="p-6 pb-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <span className="text-4xl leading-none">{project.emoji}</span>
          <div>
            <GlowBadge
              label={project.status}
              cls={project.statusCls}
            />
            <h3 className="text-lg font-black text-white leading-tight mt-1">
              {project.title}
            </h3>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <span className="text-slate-500 text-sm font-semibold block">{project.year}</span>
          <span className={`text-xs font-bold ${project.accentCls}`}>{project.category}</span>
        </div>
      </div>

      <p className="text-slate-300 text-sm leading-relaxed mb-4">
        {project.desc}
      </p>

      {/* Architecture pattern pills */}
      <div className="flex flex-wrap mb-3">
        {project.architecture.map((a) => (
          <ArchitecturePill key={a} label={a} />
        ))}
      </div>

      {/* Tech stack pills */}
      <div className="flex flex-wrap">
        {project.tech.map((t) => (
          <TechPill key={t.name} name={t.name} cls={t.cls} />
        ))}
      </div>
    </div>

    {/* Metrics row */}
    <div className="px-6 pb-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {project.metrics.map((m) => (
          <MetricStat
            key={m.label}
            label={m.label}
            value={m.value}
            accentCls={project.accentCls}
          />
        ))}
      </div>
    </div>

    {/* Expand toggle */}
    <div className="px-6 pb-6">
      <button
        onClick={() => onToggle(project.id)}
        aria-expanded={isExpanded}
        className={`
          w-full flex items-center justify-between p-3 rounded-xl
          bg-slate-800/50 border border-slate-700/50
          text-sm font-semibold text-slate-300 hover:text-white
          hover:bg-slate-700/60 transition-all duration-200
        `}
      >
        <span>
          {isExpanded ? "Hide" : "Show"} Architecture Highlights
        </span>
        <span
          className={`text-xs transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {isExpanded && (
        <div className="mt-3 space-y-2">
          {project.highlights.map((h, i) => (
            <HighlightDot key={i} text={h} accentCls={project.accentCls} />
          ))}
        </div>
      )}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// CertVaultCard — single certification card
// ─────────────────────────────────────────────────────────────────────────────
const CertVaultCard = ({ cert }) => (
  <div
    className={`
      relative overflow-hidden rounded-2xl border border-slate-700/50
      bg-slate-800/50 backdrop-blur-sm
      hover:border-slate-500/60 hover:bg-slate-800/80
      hover:scale-[1.02] transition-all duration-300 group
    `}
  >
    {/* Gradient top stripe */}
    <div className={`h-1.5 w-full ${cert.stripe}`} />

    <div className="p-5">
      {/* Header row */}
      <div className="flex items-start gap-3 mb-3">
        <span className="text-3xl leading-none mt-0.5">{cert.issuerLogo}</span>
        <div className="flex-1 min-w-0">
          <GlowBadge
            label={`${cert.issuer} · ${cert.year}`}
            cls={cert.badge}
          />
          <h4 className="font-bold text-white text-sm leading-snug mt-1 group-hover:text-violet-300 transition-colors">
            {cert.name}
          </h4>
        </div>
      </div>

      {/* Topic pills */}
      <div className="flex flex-wrap gap-1 mb-3">
        {cert.topics.map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-0.5 rounded-full bg-slate-700/70 text-slate-300 border border-slate-600/40"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Credential ID */}
      <div className="pt-3 border-t border-slate-700/40">
        <span className="text-xs text-slate-500 font-mono">{cert.credId}</span>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// CertIssuerGroup — groups certs by issuer with a header
// ─────────────────────────────────────────────────────────────────────────────
const CertIssuerGroup = ({ issuer, certs }) => (
  <div className="mb-10">
    <h3 className="text-base font-black text-slate-200 mb-4 flex items-center gap-2">
      <span className="text-lg">{certs[0].issuerLogo}</span>
      {issuer} Certifications
      <GlowBadge
        label={`${certs.length} cert${certs.length > 1 ? "s" : ""}`}
        cls="bg-slate-700/60 text-slate-400 border-slate-600/40"
      />
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {certs.map((cert) => (
        <CertVaultCard key={cert.id} cert={cert} />
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MasteryLayerRow — one layer row inside Mastery Map
// ─────────────────────────────────────────────────────────────────────────────
const MasteryLayerRow = ({ layer, visible }) => (
  <div className="mb-8">
    <div className="flex items-center gap-2 mb-4">
      <span className="text-xl">{layer.icon}</span>
      <h4 className={`text-base font-black ${layer.colorText}`}>
        {layer.layer}
      </h4>
    </div>
    <div className="space-y-3">
      {layer.items.map((item) => (
        <div key={item.tech} className="flex items-center gap-4">
          {/* Tech label + since year */}
          <div className="w-36 shrink-0">
            <span className="text-sm font-semibold text-slate-300 block leading-tight truncate">
              {item.tech}
            </span>
            <span className="text-xs text-slate-600">since {item.since}</span>
          </div>

          {/* Bar */}
          <div className="flex-1 h-3 bg-slate-700/50 rounded-full overflow-hidden">
            <div
              style={
                visible
                  ? {
                      width: `${item.mastery}%`,
                      transition: "width 1.3s cubic-bezier(0.4,0,0.2,1)",
                    }
                  : { width: 0 }
              }
              className={`h-full rounded-full ${layer.colorBar}`}
            />
          </div>

          {/* Ring + pct */}
          <div className="shrink-0 flex items-center gap-1.5">
            <MasteryRing pct={item.mastery} size={36} stroke={3} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MasteryRadarSection — full Mastery Map panel
// ─────────────────────────────────────────────────────────────────────────────
const MasteryRadarSection = ({ masteryMap, stats }) => {
  const { ref, visible } = useEnterAnimation("-40px");

  // Overall platform distribution computed from masteryMap
  const platformStats = useMemo(
    () =>
      masteryMap.map((layer) => ({
        layer   : layer.layer,
        icon    : layer.icon,
        colorText: layer.colorText,
        avg     : Math.round(
          layer.items.reduce((s, i) => s + i.mastery, 0) / layer.items.length
        ),
        count: layer.items.length,
      })),
    [masteryMap]
  );

  return (
    <div className="space-y-10">
      <SectionHeader
        icon="🗺️"
        title="Technology Mastery Map"
        subtitle="Depth-of-expertise across every layer of the modern fullstack — from pixel to cloud."
      />

      {/* Platform summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        {platformStats.map((ps) => (
          <div
            key={ps.layer}
            className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4 text-center hover:border-slate-500/60 transition-colors"
          >
            <div className="text-2xl mb-1">{ps.icon}</div>
            <div className="text-xl font-black text-white">{ps.avg}%</div>
            <div className={`text-xs font-bold ${ps.colorText} mt-0.5`}>
              avg mastery
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {ps.count} techs
            </div>
          </div>
        ))}
      </div>

      {/* Stats bar */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Years of Experience",   value: `${YRS_EXP}+`                         },
            { label: "Technologies Tracked",  value: `${stats.totalSkills}+`               },
            { label: "Average Mastery",       value: `${Math.round(stats.avgMastery)}%`    },
            { label: "Production Systems",    value: "50+"                                  },
          ].map((s) => (
            <MetricStat key={s.label} label={s.label} value={s.value} />
          ))}
        </div>
      )}

      {/* Per-layer breakdowns */}
      <div
        ref={ref}
        className="bg-slate-800/30 border border-slate-700/40 rounded-3xl p-6 md:p-8"
      >
        {masteryMap.map((layer) => (
          <MasteryLayerRow key={layer.layer} layer={layer} visible={visible} />
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// InfraTestingCard — displays a single category in testing & tooling
// ─────────────────────────────────────────────────────────────────────────────
const InfraTestingCard = ({ category, visible }) => {
  const defaultBarCls = "bg-gradient-to-r from-violet-500 to-purple-400";
  return (
    <div
      className={`
        bg-gradient-to-br ${category.gradient}
        border ${category.borderCls}
        rounded-2xl p-6
        hover:scale-[1.01] transition-transform duration-300
      `}
    >
      <CategoryHeader icon={category.icon} title={category.category} />
      <div className="space-y-3">
        {category.items.map((item) => (
          <div key={item.name} className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-slate-300">
                {item.name}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">
                  {item.yrs}yr
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {item.level}%
                </span>
              </div>
            </div>
            <div className="h-2 bg-slate-700/60 rounded-full overflow-hidden">
              <div
                style={
                  visible
                    ? {
                        width: `${item.level}%`,
                        transition: "width 1.3s cubic-bezier(0.4,0,0.2,1)",
                      }
                    : { width: 0 }
                }
                className={`h-full rounded-full ${category.barCls ?? defaultBarCls}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// TodoDeepDive — detail view of principal-level todo architecture
// ─────────────────────────────────────────────────────────────────────────────
const TodoDeepDive = () => {
  const cards = [
    {
      title: "State Management",
      icon: "🔄",
      points: [
        "XState finite state machines for deterministic workflow states",
        "Optimistic UI updates with instant local response and backend rollback",
        "Transaction undo/redo history stacks with state restoration",
        "Conflict-free replicated data types (CRDT) for multi-device sync",
      ],
    },
    {
      title: "Persistence Layer",
      icon: "💾",
      points: [
        "Prisma client with schema pooling, transactions, and migration history",
        "Service-worker background sync queues for offline resilience",
        "Optimistic write-through caching layer using browser IndexedDB",
        "Multi-region master-replica synchronization with eventual consistency",
      ],
    },
    {
      title: "UX & Accessibility",
      icon: "♿",
      points: [
        "WCAG 2.2 AA accessibility rating with complete keyboard navigation",
        "Granular screen reader announcements via aria-live status containers",
        "Custom touch-optimized drag-and-drop lists built using @dnd-kit/core",
        "Responsive, dynamic layout engine running purely on Tailwind CSS",
      ],
    },
  ];

  return (
    <div className="bg-slate-800/40 border border-lime-500/20 rounded-3xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl leading-none">✅</span>
        <div>
          <h3 className="text-xl font-black text-white">
            Todo App — Architecture Deep Dive
          </h3>
          <p className="text-slate-400 text-sm">
            Even a simple todo app becomes a production-grade showcase at the principal engineer level.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg leading-none">{card.icon}</span>
              <h4 className="font-bold text-white text-sm">{card.title}</h4>
            </div>
            <ul className="space-y-2">
              {card.points.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="text-lime-400 shrink-0 mt-0.5">▸</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// AsyncSystemCompiler — Terminal emulation running Promises to compile stacks
// ─────────────────────────────────────────────────────────────────────────────
const AsyncSystemCompiler = ({ projects }) => {
  const [selectedProj, setSelectedProj] = useState(projects[0].id);
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState("idle"); // idle, compiling, success, error
  const [progress, setProgress] = useState(0);
  const abortRef = useRef(null);

  const activeProjObj = useMemo(
    () => projects.find((p) => p.id === selectedProj),
    [projects, selectedProj]
  );

  const addLog = useCallback((msg, type = "info") => {
    setLogs((prev) => [...prev, { text: msg, type, timestamp: new Date().toLocaleTimeString() }]);
  }, []);

  const runBuild = useCallback(() => {
    // Abort active build if any
    if (abortRef.current) {
      abortRef.current();
    }
    
    setStatus("compiling");
    setProgress(0);
    setLogs([]);
    
    let cancelled = false;
    abortRef.current = () => { cancelled = true; };

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    const steps = [
      { msg: `Starting compiler pipeline for: ${activeProjObj.title}`, pct: 5, type: "info" },
      { msg: "Verifying package registry and auditing dependencies...", pct: 15, type: "info" },
      { msg: "Spinning up local Docker containers and virtual networks...", pct: 30, type: "info" },
      { msg: "Connecting to database clusters and running migrations...", pct: 45, type: "info" },
      { msg: "Compiling client components and server action modules...", pct: 65, type: "info" },
      { msg: "Configuring cache layer and CDN route distribution tags...", pct: 80, type: "info" },
      { msg: "Running automated Jest, Vitest, and Cypress test suites...", pct: 92, type: "info" },
      { msg: "Application compiled successfully and deployed to edge endpoints!", pct: 100, type: "success" }
    ];

    const runChain = async () => {
      try {
        for (let i = 0; i < steps.length; i++) {
          if (cancelled) return;
          const step = steps[i];
          addLog(step.msg, step.type);
          setProgress(step.pct);
          // Simulating asynchronous delays
          await delay(400 + Math.random() * 400);
        }
        if (!cancelled) setStatus("success");
      } catch (err) {
        if (!cancelled) {
          addLog(`Compilation failed: ${err.message}`, "error");
          setStatus("error");
        }
      }
    };

    runChain();
  }, [activeProjObj, addLog]);

  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current();
    };
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
      {/* Visual background lights */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <span>💻</span> Tech Stack Compilation Engine
          </h3>
          <p className="text-slate-400 text-xs mt-0.5">
            Asynchronously boot dependencies and verify build compatibility using JavaScript Promises.
          </p>
        </div>

        {/* Project Selector dropdown */}
        <div className="flex items-center gap-2">
          <select
            value={selectedProj}
            onChange={(e) => setSelectedProj(e.target.value)}
            disabled={status === "compiling"}
            className="bg-slate-800/80 border border-slate-700/60 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-violet-500/60 transition-colors cursor-pointer"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.emoji} {p.title}
              </option>
            ))}
          </select>

          <button
            onClick={runBuild}
            disabled={status === "compiling"}
            className={`
              px-4 py-1.5 rounded-xl text-xs font-black transition-all shadow-md
              ${
                status === "compiling"
                  ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-violet-600/20 active:scale-[0.98]"
              }
            `}
          >
            {status === "compiling" ? "Compiling..." : "Build Stack"}
          </button>
        </div>
      </div>

      {/* Terminal shell */}
      <div className="bg-black/80 border border-slate-800 rounded-2xl overflow-hidden font-mono text-xs">
        {/* Terminal Header */}
        <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="text-slate-500 text-[10px] ml-2">architecture-compiler.sh</span>
          </div>
          <span className="text-slate-600 text-[10px]">
            {progress}% Completed
          </span>
        </div>

        {/* Console Logs */}
        <div className="p-4 h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent space-y-1.5 flex flex-col-reverse">
          <div>
            {logs.length === 0 && (
              <div className="text-slate-500 italic py-2">
                Compiler is idle. Select a project above and click "Build Stack" to test dependencies.
              </div>
            )}
            {logs.map((log, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2 leading-relaxed ${
                  log.type === "success"
                    ? "text-emerald-400"
                    : log.type === "error"
                    ? "text-red-400"
                    : "text-slate-300"
                }`}
              >
                <span className="text-slate-600 shrink-0 select-none">[{log.timestamp}]</span>
                <span className="shrink-0 text-violet-400">⚡</span>
                <span className="break-all">{log.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress indicator line */}
        <div className="w-full h-1 bg-slate-900">
          <div
            style={{ width: `${progress}%`, transition: "width 0.3s ease-out" }}
            className={`h-full bg-gradient-to-r ${
              status === "error"
                ? "from-red-500 to-rose-600"
                : status === "success"
                ? "from-emerald-400 to-teal-500"
                : "from-violet-500 to-cyan-500"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Root SkillCard Component
// ─────────────────────────────────────────────────────────────────────────────
const SkillCard = () => {
  const { data, stats, loading, error } = useSkillData();
  const [uiState, dispatch] = useReducer(uiReducer, uiInitialState);
  const { activeTab, domainFilter, searchQuery } = uiState;
  
  const debouncedSearch = useDebounce(searchQuery, 280);
  const { ref: enterRef, visible } = useEnterAnimation("-40px");

  // Reset filters
  const handleResetFilters = useCallback(() => {
    dispatch({ type: UI_ACTIONS.RESET_FILTERS });
  }, []);

  // Filter domain cards
  const filteredDomains = useMemo(() => {
    if (!data) return [];
    
    // Filter domains by active dropdown filter
    let temp = data.domains;
    if (domainFilter !== "all") {
      temp = data.domains.filter((d) => d.id === domainFilter);
    }

    // Filter further by search if active
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      temp = temp.filter((d) => {
        // If domain matches or any skill in the domain matches
        const matchesDomainName = d.domain.toLowerCase().includes(q);
        const matchesAnySkill = d.skills.some(
          (s) => s.name.toLowerCase().includes(q) || (s.note && s.note.toLowerCase().includes(q))
        );
        return matchesDomainName || matchesAnySkill;
      });
    }

    return temp;
  }, [data, domainFilter, debouncedSearch]);

  const handleTabChange = useCallback((id) => {
    dispatch({ type: UI_ACTIONS.SET_TAB, payload: id });
  }, []);

  const handleToggleExpand = useCallback((id) => {
    dispatch({ type: UI_ACTIONS.TOGGLE_EXPAND, payload: id });
  }, []);

  // Render Panel content
  const activePanelContent = useMemo(() => {
    if (!data) return null;

    switch (activeTab) {
      case "skills":
        return (
          <div className="space-y-8">
            <SectionHeader
              icon="⚡"
              title="Core Engineering Domains"
              subtitle="Principal-level expertise spanning software architecture, AI enablement, and full-stack execution."
            />
            {filteredDomains.length === 0 ? (
              <EmptyState onReset={handleResetFilters} />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredDomains.map((domain) => (
                  <SkillDomainCard
                    key={domain.id}
                    domain={domain}
                    searchQuery={debouncedSearch}
                  />
                ))}
              </div>
            )}
          </div>
        );

      case "projects":
        return (
          <div className="space-y-8">
            <SectionHeader
              icon="🚀"
              title="Production Systems"
              subtitle="Detailed architectures for five battle-tested commercial systems built, scaled, and managed."
            />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {data.projects.map((project) => (
                <ProjectShowcaseCard
                  key={project.id}
                  project={project}
                  isExpanded={!!uiState.expandedIds[project.id]}
                  onToggle={handleToggleExpand}
                />
              ))}
            </div>
          </div>
        );

      case "mastery":
        return (
          <MasteryRadarSection
            masteryMap={data.masteryMap}
            stats={stats}
          />
        );

      case "certs": {
        // Group certs by issuer
        const grouped = data.certs.reduce((acc, c) => {
          acc[c.issuer] = [...(acc[c.issuer] || []), c];
          return acc;
        }, {});
        
        // Sort keys by standard sequence
        const order = ["AWS", "Google", "Microsoft", "IBM", "Meta", "Prisma", "CNCF"];
        const sortedKeys = Object.keys(grouped).sort(
          (a, b) => order.indexOf(a) - order.indexOf(b)
        );

        return (
          <div className="space-y-8">
            <SectionHeader
              icon="🏆"
              title="Professional Certifications"
              subtitle="Google, AWS, Azure, IBM, Meta, and CNCF validated expertise across systems architecture."
            />
            <div>
              {sortedKeys.map((issuer) => (
                <CertIssuerGroup
                  key={issuer}
                  issuer={issuer}
                  certs={grouped[issuer]}
                />
              ))}
            </div>
          </div>
        );
      }

      case "infra":
        return (
          <div className="space-y-8">
            <SectionHeader
              icon="🧪"
              title="Infrastructure, QA & Tooling"
              subtitle="Comprehensive testing paradigms, infrastructure management, and performance frameworks."
            />
            <div
              ref={enterRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {data.infraTesting.map((cat) => (
                <InfraTestingCard
                  key={cat.category}
                  category={cat}
                  visible={visible}
                />
              ))}
            </div>
            <TodoDeepDive />
          </div>
        );

      default:
        return null;
    }
  }, [
    activeTab,
    data,
    filteredDomains,
    debouncedSearch,
    handleResetFilters,
    uiState.expandedIds,
    handleToggleExpand,
    stats,
    enterRef,
    visible,
  ]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
        <div className="max-w-7xl mx-auto">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div
      className="min-h-screen bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Giant Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-900/60 via-slate-900 to-cyan-900/40 border border-violet-500/20 p-8 md:p-12">
          {/* Neon lights */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <span className="inline-flex items-center gap-2 bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs font-bold px-3.5 py-1.5 rounded-full">
                ⭐ Principal Engineer · Ultra FAANG Level
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                Engineering{" "}
                <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Portfolio & Skills
                </span>
              </h1>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Compounded fullstack engineering expertise since {CAREER_ORIGIN}. 
                Authoring systems spanning microservices, vector databases, real-time audio/video networks, and high-load database sharding.
              </p>
            </div>
            
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 text-center md:text-left shrink-0">
              <div className="text-3xl font-black text-white">{YRS_EXP}+ Years</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Compounded Experience</div>
              <div className="h-px bg-slate-700/50 my-3" />
              <div className="text-sm font-semibold text-slate-300">50+ Commercial Deployments</div>
            </div>
          </div>
        </div>

        {/* Global Statistics Summary Row */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Systems Deployed", value: "50+ Networks", icon: "🌐" },
              { label: "Technologies Mastered", value: `${stats.totalSkills} Tracked`, icon: "🛠️" },
              { label: "Compounded Experience", value: `${YRS_EXP} Years`, icon: "⏳" },
              { label: "AWS / Google Certs", value: "10 Certified", icon: "🏆" },
            ].map((s, idx) => (
              <div
                key={idx}
                className="bg-slate-800/40 border border-slate-700/45 rounded-2xl p-5 flex items-center gap-4 hover:border-slate-500/30 transition-colors"
              >
                <span className="text-3xl leading-none">{s.icon}</span>
                <div>
                  <div className="text-lg font-black text-white">{s.value}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Interactive Filters Controls (only visible on Skills tab) */}
        {activeTab === "skills" && (
          <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-900 border border-slate-800/60 p-4 rounded-2xl shadow-xl">
            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-500 select-none pointer-events-none">🔍</span>
              <input
                type="text"
                placeholder="Search skills, frameworks, notes..."
                value={searchQuery}
                onChange={(e) => dispatch({ type: UI_ACTIONS.SET_QUERY, payload: e.target.value })}
                className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl py-2 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500/60 transition-colors"
              />
            </div>

            {/* Category Filter Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">Filter:</span>
              <select
                value={domainFilter}
                onChange={(e) => dispatch({ type: UI_ACTIONS.SET_FILTER, payload: e.target.value })}
                className="w-full md:w-44 bg-slate-800/80 border border-slate-700/60 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-violet-500/60 cursor-pointer"
              >
                <option value="all">All Domains</option>
                {data.domains.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.domain}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="sticky top-4 z-30 bg-slate-950/80 backdrop-blur-xl border border-slate-800/60 rounded-2xl p-2 shadow-2xl">
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
            {TABS.map((t) => {
              const active = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => handleTabChange(t.id)}
                  aria-selected={active}
                  role="tab"
                  className={`
                    flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black whitespace-nowrap transition-all duration-200
                    ${
                      active
                        ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                    }
                  `}
                >
                  <span>{t.icon}</span>
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Panel Render */}
        <div role="tabpanel" className="min-h-[45vh]">
          {activePanelContent}
        </div>

        {/* Asynchronous Promise Simulation Playground */}
        <AsyncSystemCompiler projects={data.projects} />

        {/* Footer */}
        <footer className="pt-8 border-t border-slate-800/60 text-center">
          <p className="text-slate-500 text-xs font-semibold">
            © {CAREER_ORIGIN} – {NOW_YEAR} · {YRS_EXP} Years · Principal Staff Fullstack Engineer · Ultra FAANG Level
          </p>
          <p className="text-slate-600 text-[10px] mt-1 tracking-wider uppercase">
            Designed for Multi-Region Resilient High-Load Deployments
          </p>
        </footer>

      </div>
    </div>
  );
};

export default SkillCard;
