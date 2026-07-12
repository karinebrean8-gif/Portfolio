import { useState, useEffect, useCallback, useMemo, useRef, useReducer } from "react";

// ═════════════════════════════════════════════════════════════════════════════
//  SkillCategory.jsx
//  Principal Engineer · 50 + years · Ultra FAANG Level
//  Architecture: constants → data → utilities → hooks → atoms → organisms → root
// ═════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const CAREER_START    = 1975;
const CURRENT_YEAR    = new Date().getFullYear();
const YEARS_EXP       = CURRENT_YEAR - CAREER_START;

const FILTER_ALL      = "all";

const VIEW_MODES = Object.freeze({
  GRID : "grid",
  LIST : "list",
});

const SORT_OPTIONS = Object.freeze({
  MASTERY : "mastery",
  ALPHA   : "alpha",
  YEARS   : "years",
});

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY REGISTRY — drives the filter bar
// ─────────────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "all",          label: "All Skills",       icon: "🌐" },
  { id: "frontend",     label: "Frontend",          icon: "⚛️"  },
  { id: "backend",      label: "Backend",           icon: "🔧" },
  { id: "database",     label: "Database & ORM",    icon: "🗄️" },
  { id: "cloud",        label: "Cloud & DevOps",    icon: "☁️" },
  { id: "ai",           label: "AI / ML",           icon: "🤖" },
  { id: "testing",      label: "Testing & QA",      icon: "🧪" },
  { id: "architecture", label: "Architecture",       icon: "🏛️" },
];

// ─────────────────────────────────────────────────────────────────────────────
// MASTER SKILL DATASET
// Every skill: { id, name, category, pct, yrs, since, icon, note, tags }
// ─────────────────────────────────────────────────────────────────────────────
const ALL_SKILLS = [
  // ── Frontend ──────────────────────────────────────────────────────────────
  { id:"s01", name:"React.js",         category:"frontend",     pct:99, yrs:12, since:2013, icon:"⚛️",  note:"Core hooks architect, custom renderers, Fiber internals",         tags:["React","JSX","Hooks","Suspense"]           },
  { id:"s02", name:"Next.js",          category:"frontend",     pct:99, yrs: 9, since:2019, icon:"▲",   note:"ISR RFC contributor, App Router, edge middleware",                tags:["SSR","ISR","App Router","Vercel"]          },
  { id:"s03", name:"Redux.js",         category:"frontend",     pct:98, yrs:10, since:2015, icon:"🔮",  note:"RTK, sagas, thunks, redux-observable, devtools author",           tags:["RTK","Saga","Thunk","State"]               },
  { id:"s04", name:"Tailwind CSS",     category:"frontend",     pct:99, yrs: 6, since:2020, icon:"🎨",  note:"Design system architect, JIT, custom plugins, CLI watcher",      tags:["CSS","JIT","Design System","Responsive"]  },
  { id:"s05", name:"TypeScript",       category:"frontend",     pct:98, yrs:10, since:2016, icon:"🔷",  note:"Advanced generics, conditional types, decorators, type guards",  tags:["Types","Generics","DX","Safety"]           },
  { id:"s06", name:"UI / UX Design",   category:"frontend",     pct:95, yrs:20, since:2004, icon:"✏️",  note:"Figma, design systems, WCAG 2.2 AA, A11y audits",                tags:["Figma","A11y","WCAG","Design"]             },
  { id:"s07", name:"Framer Motion",    category:"frontend",     pct:93, yrs: 5, since:2020, icon:"🎞️",  note:"Complex gesture animations, spring physics, layout transitions", tags:["Animation","Gesture","Spring","Motion"]   },
  { id:"s08", name:"Web Performance",  category:"frontend",     pct:97, yrs:18, since:2006, icon:"⚡",  note:"Core Web Vitals, Lighthouse 100/100, lazy loading, code split",  tags:["CWV","LCP","FID","Perf"]                  },

  // ── Backend ───────────────────────────────────────────────────────────────
  { id:"s09", name:"Node.js",          category:"backend",      pct:99, yrs:16, since:2009, icon:"🟢",  note:"v0.1.x early adopter, event loop expert, cluster mode",           tags:["Node","V8","Event Loop","Streams"]         },
  { id:"s10", name:"Express.js",       category:"backend",      pct:99, yrs:14, since:2011, icon:"🚄",  note:"Middleware architect, security hardening, rate limiting",         tags:["REST","Middleware","Router","Auth"]         },
  { id:"s11", name:"Django",           category:"backend",      pct:97, yrs: 8, since:2017, icon:"🐍",  note:"DRF, async views, Channels, Celery, signals",                     tags:["Python","DRF","Celery","ORM"]              },
  { id:"s12", name:"REST API Design",  category:"backend",      pct:99, yrs:25, since:2000, icon:"🔌",  note:"HATEOAS, versioning, rate limiting, OpenAPI 3.1",                 tags:["REST","OpenAPI","Versioning","HATEOAS"]    },
  { id:"s13", name:"GraphQL",          category:"backend",      pct:95, yrs: 8, since:2017, icon:"⬡",   note:"Apollo, DataLoader, subscriptions, persisted queries",            tags:["GraphQL","Apollo","DataLoader","Schema"]   },
  { id:"s14", name:"WebSockets",       category:"backend",      pct:97, yrs:12, since:2013, icon:"🔁",  note:"Socket.io, ws, backpressure, horizontal scaling",                 tags:["WS","Real-Time","Socket.io","SSE"]         },
  { id:"s15", name:"gRPC",             category:"backend",      pct:91, yrs: 7, since:2017, icon:"📡",  note:"Protobuf, streaming RPCs, bidirectional",                         tags:["gRPC","Protobuf","RPC","Streaming"]        },
  { id:"s16", name:"Message Queues",   category:"backend",      pct:93, yrs:10, since:2014, icon:"📬",  note:"RabbitMQ, Kafka, SQS, dead-letter queues",                        tags:["Kafka","RabbitMQ","SQS","Async"]           },

  // ── Database & ORM ────────────────────────────────────────────────────────
  { id:"s17", name:"Prisma ORM",       category:"database",     pct:99, yrs: 5, since:2020, icon:"🗃️",  note:"Expert cert · schema design, migrations, relations, raw queries", tags:["Prisma","ORM","Schema","Migrations"]       },
  { id:"s18", name:"PostgreSQL",       category:"database",     pct:98, yrs:14, since:2010, icon:"🐘",  note:"Partitioning, JSONB, window functions, EXPLAIN ANALYZE",          tags:["PostgreSQL","SQL","JSONB","Partitioning"]  },
  { id:"s19", name:"MySQL",            category:"database",     pct:97, yrs:16, since:2008, icon:"🐬",  note:"InnoDB internals, replication, index optimisation",               tags:["MySQL","SQL","Replication","Index"]        },
  { id:"s20", name:"Redis",            category:"database",     pct:94, yrs:11, since:2013, icon:"🔴",  note:"Pub/Sub, streams, Lua scripting, cluster mode",                   tags:["Redis","Cache","Pub/Sub","Streams"]        },
  { id:"s21", name:"MongoDB",          category:"database",     pct:91, yrs:10, since:2014, icon:"🍃",  note:"Aggregation pipelines, Atlas Search, change streams",             tags:["MongoDB","NoSQL","Atlas","Aggregation"]    },
  { id:"s22", name:"Elasticsearch",    category:"database",     pct:90, yrs: 8, since:2016, icon:"🔍",  note:"Full-text search, ELK stack, index lifecycle management",         tags:["ES","Full-Text","ELK","Kibana"]            },
  { id:"s23", name:"SQLite",           category:"database",     pct:90, yrs:15, since:2009, icon:"📦",  note:"WAL mode, FTS5, embedded databases",                              tags:["SQLite","Embedded","WAL","FTS5"]           },
  { id:"s24", name:"Vector Databases", category:"database",     pct:88, yrs: 3, since:2022, icon:"🧮",  note:"Pinecone, pgvector, Weaviate — RAG pipelines",                   tags:["Pinecone","pgvector","RAG","Vector"]       },

  // ── Cloud & DevOps ────────────────────────────────────────────────────────
  { id:"s25", name:"Docker",           category:"cloud",        pct:99, yrs:11, since:2014, icon:"🐳",  note:"Multi-stage builds, security hardening, compose, rootless",      tags:["Docker","Container","Compose","Registry"]  },
  { id:"s26", name:"Kubernetes",       category:"cloud",        pct:97, yrs: 9, since:2016, icon:"☸️",  note:"CKAD cert · production since early days, operator patterns",      tags:["K8s","CKAD","Helm","Operators"]            },
  { id:"s27", name:"AWS (Pro)",        category:"cloud",        pct:98, yrs:14, since:2011, icon:"☁️",  note:"SAA + DOP certified · 50+ services, multi-region",               tags:["AWS","EC2","Lambda","CloudFormation"]      },
  { id:"s28", name:"GCP",              category:"cloud",        pct:94, yrs: 9, since:2015, icon:"🌐",  note:"ACE certified · GKE, BigQuery, Cloud Run, Firestore",            tags:["GCP","GKE","BigQuery","Cloud Run"]         },
  { id:"s29", name:"Azure",            category:"cloud",        pct:93, yrs: 8, since:2017, icon:"🪟",  note:"AZ-900 + AZ-204 certified · Functions, Service Bus, AKS",        tags:["Azure","AKS","Functions","Service Bus"]    },
  { id:"s30", name:"Terraform",        category:"cloud",        pct:95, yrs: 8, since:2017, icon:"🏗️",  note:"Modules, workspaces, remote state, CDK",                         tags:["Terraform","IaC","CDK","Modules"]          },
  { id:"s31", name:"Helm Charts",      category:"cloud",        pct:93, yrs: 7, since:2018, icon:"⛵",  note:"Library charts, hooks, CRDs, chart testing",                     tags:["Helm","K8s","Charts","Release"]            },
  { id:"s32", name:"GitHub Actions",   category:"cloud",        pct:98, yrs: 6, since:2019, icon:"🤖",  note:"Matrix builds, custom actions, OIDC, reusable workflows",        tags:["CI/CD","Actions","OIDC","Workflows"]       },

  // ── AI / ML ───────────────────────────────────────────────────────────────
  { id:"s33", name:"GPT-4 / OpenAI",   category:"ai",           pct:95, yrs: 4, since:2021, icon:"🧠",  note:"Function calling, fine-tuning, evals, cost optimisation",        tags:["GPT-4","OpenAI","Fine-tune","Evals"]       },
  { id:"s34", name:"LangChain",        category:"ai",           pct:93, yrs: 3, since:2022, icon:"🔗",  note:"Agents, chains, tools, memory, LCEL",                            tags:["LangChain","Agents","LCEL","Memory"]       },
  { id:"s35", name:"RAG Pipelines",    category:"ai",           pct:92, yrs: 3, since:2022, icon:"📚",  note:"Chunking strategies, semantic re-ranking, hybrid search",        tags:["RAG","Embeddings","Vector","Retrieval"]    },
  { id:"s36", name:"Prompt Engineering",category:"ai",          pct:96, yrs: 4, since:2021, icon:"✍️",  note:"CoT, few-shot, constitutional AI, meta-prompting",               tags:["Prompt","CoT","Few-Shot","Eval"]           },
  { id:"s37", name:"Hugging Face",     category:"ai",           pct:88, yrs: 3, since:2022, icon:"🤗",  note:"PEFT, LoRA, inference pipelines, model hub",                     tags:["HuggingFace","LoRA","PEFT","Transformers"] },
  { id:"s38", name:"SSE Streaming",    category:"ai",           pct:95, yrs: 4, since:2021, icon:"📡",  note:"Token streaming, backpressure, abort signals",                   tags:["SSE","Streaming","Tokens","Backpressure"]  },
  { id:"s39", name:"Python / ML Ops",  category:"ai",           pct:91, yrs: 8, since:2016, icon:"🐍",  note:"scikit-learn, MLflow, model serving, feature stores",            tags:["Python","MLflow","scikit","Feature Store"] },

  // ── Testing & QA ──────────────────────────────────────────────────────────
  { id:"s40", name:"Jest",             category:"testing",      pct:98, yrs: 8, since:2016, icon:"🃏",  note:"Unit/integration, mocking, snapshot, code coverage",             tags:["Jest","Unit","Mock","Coverage"]            },
  { id:"s41", name:"Vitest",           category:"testing",      pct:97, yrs: 3, since:2022, icon:"⚡",  note:"Vite-native, browser mode, inline snapshots",                    tags:["Vitest","Vite","Fast","Unit"]              },
  { id:"s42", name:"Cypress E2E",      category:"testing",      pct:96, yrs: 6, since:2018, icon:"🌲",  note:"Component testing, visual diff, CI cloud",                       tags:["Cypress","E2E","Visual","Component"]       },
  { id:"s43", name:"Playwright",       category:"testing",      pct:95, yrs: 4, since:2021, icon:"🎭",  note:"Multi-browser, trace viewer, codegen, sharding",                 tags:["Playwright","Browser","Trace","Multi"]     },
  { id:"s44", name:"React Testing Lib",category:"testing",      pct:97, yrs: 6, since:2018, icon:"🧪",  note:"User-event, accessibility queries, provider wrappers",           tags:["RTL","A11y","User-Event","Queries"]        },
  { id:"s45", name:"k6 Load Testing",  category:"testing",      pct:90, yrs: 4, since:2020, icon:"📊",  note:"Scripted load scenarios, thresholds, cloud execution",           tags:["k6","Load","Performance","Thresholds"]    },
  { id:"s46", name:"Storybook",        category:"testing",      pct:94, yrs: 5, since:2019, icon:"📖",  note:"CSF3, interactions, a11y addon, design tokens",                  tags:["Storybook","CSF","A11y","Components"]     },
  { id:"s47", name:"Supertest",        category:"testing",      pct:93, yrs: 7, since:2017, icon:"🚀",  note:"HTTP assertions, request chains, auth flow testing",             tags:["Supertest","HTTP","API","Assertions"]     },

  // ── Architecture ──────────────────────────────────────────────────────────
  { id:"s48", name:"Microservices",    category:"architecture", pct:99, yrs:20, since:2004, icon:"🔬",  note:"40+ service migration, zero-downtime, service mesh",             tags:["Microservices","Mesh","Domain","Scale"]    },
  { id:"s49", name:"Event-Driven",     category:"architecture", pct:97, yrs:18, since:2006, icon:"⚡",  note:"CQRS, Event Sourcing, Saga pattern, outbox pattern",             tags:["CQRS","EventSource","Saga","Outbox"]       },
  { id:"s50", name:"DDD",              category:"architecture", pct:96, yrs:15, since:2009, icon:"🏛️",  note:"Bounded contexts, aggregates, value objects, ubiquitous lang",   tags:["DDD","Aggregates","Context","Domain"]      },
  { id:"s51", name:"System Design",    category:"architecture", pct:99, yrs:35, since:1989, icon:"📐",  note:"Interviewer-level: URL shortener → CDN → distributed DB",        tags:["CAP","Sharding","CDN","Consistency"]       },
  { id:"s52", name:"Distributed Sys",  category:"architecture", pct:96, yrs:20, since:2004, icon:"🌐",  note:"CAP theorem, consensus algorithms, Paxos / Raft",                tags:["CAP","Paxos","Raft","Consensus"]           },
  { id:"s53", name:"Security Arch",    category:"architecture", pct:95, yrs:22, since:2002, icon:"🔐",  note:"OWASP Top 10, zero-trust, SAST/DAST, threat modeling",           tags:["OWASP","ZeroTrust","SAST","ThreatModel"]   },
  { id:"s54", name:"Observability",    category:"architecture", pct:94, yrs:15, since:2009, icon:"👁️",  note:"OpenTelemetry, Prometheus, Grafana, distributed tracing",        tags:["OTel","Prometheus","Grafana","Tracing"]    },
  { id:"s55", name:"API Design",       category:"architecture", pct:99, yrs:28, since:1996, icon:"🔌",  note:"REST, GraphQL, gRPC — standards author, versioning patterns",    tags:["REST","GraphQL","gRPC","OpenAPI"]          },
];

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT DATA — 5 flagship projects
// ─────────────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id        : "ecommerce",
    title     : "Fullstack E-Commerce Platform",
    emoji     : "🛒",
    year      : 2023,
    status    : "Production",
    statusCls : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    gradient  : "from-emerald-600/25 via-teal-600/10 to-cyan-600/25",
    border    : "border-emerald-500/30",
    accentCls : "text-emerald-400",
    desc      : "Enterprise multi-vendor platform — $4M+ processed, 120K DAU, 99.99% uptime.",
    tech      : ["React.js","Next.js","Redux.js","Prisma","Django","PostgreSQL","MySQL","Docker","AWS Cloud","Tailwind CSS","REST API","UI/UX"],
    metrics   : [
      { label:"DAU",            value:"120K+"  },
      { label:"Uptime",         value:"99.99%" },
      { label:"API P99",        value:"<80ms"  },
      { label:"Revenue",        value:"$4M+"   },
    ],
    highlights: [
      "12-service Docker + Kubernetes mesh",
      "Real-time WebSocket inventory across 5 warehouses",
      "Django AI recommendations — +22% CTR",
      "Multi-currency: Stripe + PayPal + crypto gateway",
      "AWS CloudFront CDN — 94% cache hit rate",
      "PostgreSQL + Redis: P99 query < 40ms",
    ],
  },
  {
    id        : "portfolio",
    title     : "Portfolio Platform",
    emoji     : "🎨",
    year      : 2024,
    status    : "Live",
    statusCls : "bg-blue-500/20 text-blue-300 border-blue-500/30",
    gradient  : "from-blue-600/25 via-indigo-600/10 to-violet-600/25",
    border    : "border-blue-500/30",
    accentCls : "text-blue-400",
    desc      : "Lighthouse 100/100 · SSR+ISR hybrid · i18n 6 languages · bounce ↓42%.",
    tech      : ["React.js","Next.js","Redux.js","Prisma","Node.js","Express.js","PostgreSQL","MySQL","Docker","Cloud","Tailwind CSS","REST API","UI/UX"],
    metrics   : [
      { label:"Lighthouse",     value:"100/100" },
      { label:"Load Time",      value:"<1.2s"   },
      { label:"Bounce ↓",       value:"42%"     },
      { label:"Conversions ↑",  value:"67%"     },
    ],
    highlights: [
      "SSR + ISR hybrid — static speed, dynamic freshness",
      "Headless CMS — zero-redeploy content updates",
      "Interactive 3D skill graph (Three.js + R3F)",
      "A/B testing with statistical significance engine",
      "i18n via next-intl across 6 languages",
      "WCAG 2.2 AA — NVDA, JAWS, VoiceOver tested",
    ],
  },
  {
    id        : "dashboard",
    title     : "Analytics Dashboard App",
    emoji     : "📊",
    year      : 2023,
    status    : "Production",
    statusCls : "bg-violet-500/20 text-violet-300 border-violet-500/30",
    gradient  : "from-violet-600/25 via-purple-600/10 to-pink-600/25",
    border    : "border-violet-500/30",
    accentCls : "text-violet-400",
    desc      : "Multi-tenant SaaS BI dashboard — 500+ tenants, 50K events/sec, 10M+ rows.",
    tech      : ["React.js","Next.js","Redux.js","Prisma","Node.js","Express.js","PostgreSQL","MySQL","Docker","Cloud","Tailwind CSS","REST API","UI/UX"],
    metrics   : [
      { label:"Tenants",        value:"500+"     },
      { label:"Events/Sec",     value:"50K+"     },
      { label:"Query P99",      value:"<200ms"   },
      { label:"Data",           value:"10M+ rows"},
    ],
    highlights: [
      "Drag-and-drop widget builder — 40+ chart types",
      "WebSocket live KPIs — sub-100ms at 500 tenants",
      "RBAC: 12 permission scopes + attribute-based overrides",
      "Row-level Postgres security — zero cross-tenant bleed",
      "PDF (Puppeteer) + Excel (exceljs) + CSV export pipeline",
      "Scheduled reports — cron, timezone-aware delivery",
    ],
  },
  {
    id        : "chat",
    title     : "Real-Time Chat Application",
    emoji     : "💬",
    year      : 2022,
    status    : "Production",
    statusCls : "bg-pink-500/20 text-pink-300 border-pink-500/30",
    gradient  : "from-pink-600/25 via-rose-600/10 to-red-600/25",
    border    : "border-pink-500/30",
    accentCls : "text-pink-400",
    desc      : "Slack-inspired · 200K concurrent · E2E encryption · WebRTC video · enterprise SSO.",
    tech      : ["React.js","Next.js","Redux.js","Prisma","Node.js","Express.js","PostgreSQL","MySQL","Docker","Cloud","Tailwind CSS","REST API","UI/UX"],
    metrics   : [
      { label:"Concurrent",     value:"200K+"  },
      { label:"Messages/Day",   value:"5M+"    },
      { label:"WS Latency",     value:"<15ms"  },
      { label:"Uptime",         value:"99.97%" },
    ],
    highlights: [
      "E2E encryption via Signal Protocol (double ratchet)",
      "WebRTC P2P video — SFU architecture for group calls",
      "Elasticsearch full-text message search",
      "S3 + CloudFront — virus scan on every upload",
      "Enterprise SSO: SAML 2.0 + OAuth 2.0 + OIDC",
      "FCM + APNS push — delivery & read receipts",
    ],
  },
  {
    id        : "ai-app",
    title     : "AI + Fullstack Application",
    emoji     : "🤖",
    year      : 2024,
    status    : "Production",
    statusCls : "bg-amber-500/20 text-amber-300 border-amber-500/30",
    gradient  : "from-amber-600/25 via-yellow-600/10 to-orange-600/25",
    border    : "border-amber-500/30",
    accentCls : "text-amber-400",
    desc      : "LLM platform — GPT-4, RAG, autonomous agents, 1M+ daily inferences, ↓60% cost.",
    tech      : ["React.js","Next.js","Redux.js","Prisma","Django","PostgreSQL","MySQL","Docker","Cloud","Tailwind CSS","REST API","UI/UX"],
    metrics   : [
      { label:"Inferences/Day", value:"1M+"    },
      { label:"Accuracy",       value:"94.7%"  },
      { label:"Cost Saved",     value:"↓60%"   },
      { label:"Satisfaction",   value:"4.9/5"  },
    ],
    highlights: [
      "RAG pipeline: Pinecone + semantic re-ranking",
      "LangChain autonomous agents — tool use, reflection",
      "SSE token streaming — perceived latency <200ms",
      "LoRA fine-tuned on proprietary domain dataset",
      "HITL feedback loop — continuous model improvement",
      "Cost router: GPT-4 → GPT-3.5 → local model fallback",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PRISMA INFRA DATA
// ─────────────────────────────────────────────────────────────────────────────
const PRISMA_INFRA = {
  overview: {
    title  : "Prisma ORM — Expert Level",
    badge  : "Expert Certified",
    years  : 5,
    since  : 2020,
    mastery: 99,
    desc   : "Production Prisma expert across all 5 flagship projects. Schema design, migration pipelines, advanced relations, raw query escape hatches, and performance tuning.",
  },
  features: [
    { icon:"📐", title:"Schema Design",       desc:"Multi-model schemas with self-referential relations, polymorphism, composite unique constraints, and advanced index strategies."    },
    { icon:"🔄", title:"Migrations",          desc:"Versioned migration pipeline, shadow databases, migration squashing, rollback strategies, and baseline for existing databases."    },
    { icon:"🔗", title:"Relations",           desc:"One-to-one, one-to-many, many-to-many with explicit join tables, nested writes, connect/disconnect, referential integrity."        },
    { icon:"⚡", title:"Performance Tuning",  desc:"Query batching with DataLoader, N+1 elimination, index optimisation, query analysis, lazy loading control, select fields only."   },
    { icon:"🔐", title:"Transactions",        desc:"Interactive transactions, nested writes, $transaction API, isolation levels, optimistic concurrency control."                      },
    { icon:"🗃️", title:"Raw Queries",         desc:"$queryRaw and $executeRaw for complex SQL, parameterised inputs to prevent injection, tagged template literals."                  },
    { icon:"🌱", title:"Seeding & Testing",   desc:"Deterministic seed scripts, factory patterns, test database isolation, Prisma reset in CI/CD pipeline."                           },
    { icon:"🔭", title:"Prisma Studio",       desc:"Visual data browser, real-time record editing, relationship traversal, used in all 5 project dev workflows."                      },
  ],
  usedIn: [
    { project:"E-Commerce",   detail:"Multi-vendor product catalogue, order saga, inventory events — 15 Prisma models" },
    { project:"Portfolio",    detail:"Project CMS, contact submissions, analytics events — 8 Prisma models"            },
    { project:"Dashboard",    detail:"Multi-tenant schema with row-level isolation, 12 models, 40+ migrations"          },
    { project:"Chat App",     detail:"Messages, threads, workspaces, presence — real-time with Prisma + WebSocket"      },
    { project:"AI App",       detail:"Conversation history, user feedback, RAG document store — 10 Prisma models"       },
  ],
  supportedDBs: [
    { name:"PostgreSQL", icon:"🐘", note:"Primary production DB — all 5 projects"  },
    { name:"MySQL",      icon:"🐬", note:"Legacy & secondary stores — 3 projects"   },
    { name:"SQLite",     icon:"📦", note:"Local dev & E2E test isolation"           },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// CERTIFICATION DATA
// ─────────────────────────────────────────────────────────────────────────────
const CERTS = [
  { id:"c01", issuer:"AWS",       logo:"☁️",  name:"Solutions Architect – Associate",      year:2021, topics:["EC2","S3","RDS","Lambda","VPC"],          gradient:"from-orange-500 to-amber-500",  badge:"bg-orange-500/20 text-orange-300 border-orange-500/30"  },
  { id:"c02", issuer:"AWS",       logo:"☁️",  name:"DevOps Engineer – Professional",        year:2022, topics:["ECS","EKS","CodePipeline","CloudWatch"],  gradient:"from-orange-600 to-red-500",    badge:"bg-red-500/20 text-red-300 border-red-500/30"           },
  { id:"c03", issuer:"Google",    logo:"🌐",  name:"Associate Cloud Engineer",              year:2020, topics:["GKE","BigQuery","Pub/Sub","Cloud Run"],   gradient:"from-blue-500 to-cyan-400",     badge:"bg-blue-500/20 text-blue-300 border-blue-500/30"        },
  { id:"c04", issuer:"Microsoft", logo:"🪟",  name:"Azure Fundamentals AZ-900",             year:2021, topics:["AKS","App Service","Cosmos DB"],          gradient:"from-sky-500 to-blue-600",      badge:"bg-sky-500/20 text-sky-300 border-sky-500/30"           },
  { id:"c05", issuer:"Microsoft", logo:"🪟",  name:"Azure Developer Associate AZ-204",      year:2022, topics:["Functions","Service Bus","Key Vault"],    gradient:"from-indigo-500 to-sky-600",    badge:"bg-indigo-500/20 text-indigo-300 border-indigo-500/30"  },
  { id:"c06", issuer:"IBM",       logo:"🔷",  name:"Cloud Application Developer",           year:2020, topics:["OpenShift","Kafka","Db2","Watson"],       gradient:"from-blue-700 to-blue-500",     badge:"bg-blue-700/20 text-blue-200 border-blue-700/30"        },
  { id:"c07", issuer:"Meta",      logo:"🔵",  name:"Back-End Developer Professional",       year:2023, topics:["Django","DRF","MySQL","JWT"],             gradient:"from-blue-400 to-indigo-500",   badge:"bg-blue-400/20 text-blue-200 border-blue-400/30"        },
  { id:"c08", issuer:"Meta",      logo:"🔵",  name:"Front-End Developer Professional",      year:2023, topics:["React","Redux","A11y","Figma"],           gradient:"from-cyan-400 to-blue-500",     badge:"bg-cyan-400/20 text-cyan-200 border-cyan-400/30"        },
  { id:"c09", issuer:"Prisma",    logo:"🗃️",  name:"ORM Expert Certification",              year:2022, topics:["Schema","Migrations","Relations","SQL"],  gradient:"from-teal-500 to-emerald-400",  badge:"bg-teal-500/20 text-teal-300 border-teal-500/30"        },
  { id:"c10", issuer:"CNCF",      logo:"☸️",  name:"Kubernetes App Developer (CKAD)",       year:2021, topics:["Pods","Helm","ConfigMaps","Services"],    gradient:"from-violet-500 to-purple-600", badge:"bg-violet-500/20 text-violet-300 border-violet-500/30"  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ASYNC UTILITIES
// ─────────────────────────────────────────────────────────────────────────────
const tick = (ms) => new Promise((res) => setTimeout(res, ms));

const loadAllData = () =>
  Promise.all([
    tick(80 ).then(() => ({ skills    : ALL_SKILLS    })),
    tick(100).then(() => ({ projects  : PROJECTS      })),
    tick(60 ).then(() => ({ certs     : CERTS         })),
    tick(70 ).then(() => ({ prisma    : PRISMA_INFRA  })),
    tick(90 ).then(() => ({ categories: CATEGORIES    })),
  ]).then((parts) => parts.reduce((acc, p) => ({ ...acc, ...p }), {}));

const computeSummaryStats = (skills) =>
  new Promise((resolve) => {
    const byCategory = skills.reduce((acc, s) => {
      acc[s.category] = (acc[s.category] || 0) + 1;
      return acc;
    }, {});

    const avgMastery = Math.round(
      skills.reduce((sum, s) => sum + s.pct, 0) / skills.length
    );

    const topSkills = [...skills]
      .sort((a, b) => b.pct - a.pct)
      .slice(0, 5)
      .map((s) => s.name);

    resolve({ byCategory, avgMastery, topSkills, total: skills.length });
  });

// ─────────────────────────────────────────────────────────────────────────────
// REDUCER
// ─────────────────────────────────────────────────────────────────────────────
const ACTS = Object.freeze({
  SET_CATEGORY : "SET_CATEGORY",
  SET_SORT     : "SET_SORT",
  SET_VIEW     : "SET_VIEW",
  SET_QUERY    : "SET_QUERY",
  TOGGLE_PROJ  : "TOGGLE_PROJ",
  SET_ACTIVE_TAB:"SET_ACTIVE_TAB",
  RESET        : "RESET",
});

const initState = {
  activeCategory : FILTER_ALL,
  sortBy         : SORT_OPTIONS.MASTERY,
  viewMode       : VIEW_MODES.GRID,
  searchQuery    : "",
  expandedProjs  : {},
  activeTab      : "skills",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTS.SET_CATEGORY  : return { ...state, activeCategory: payload, searchQuery: "" };
    case ACTS.SET_SORT      : return { ...state, sortBy: payload };
    case ACTS.SET_VIEW      : return { ...state, viewMode: payload };
    case ACTS.SET_QUERY     : return { ...state, searchQuery: payload };
    case ACTS.SET_ACTIVE_TAB: return { ...state, activeTab: payload };
    case ACTS.TOGGLE_PROJ   : return {
      ...state,
      expandedProjs: { ...state.expandedProjs, [payload]: !state.expandedProjs[payload] },
    };
    case ACTS.RESET: return { ...initState };
    default: return state;
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOM HOOKS
// ─────────────────────────────────────────────────────────────────────────────
const useData = () => {
  const [data,    setData   ] = useState(null);
  const [stats,   setStats  ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError  ] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const loaded = await loadAllData();
        if (!alive) return;
        setData(loaded);
        const s = await computeSummaryStats(loaded.skills);
        if (!alive) return;
        setStats(s);
      } catch (e) {
        if (alive) setError(e?.message ?? "Load failed.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  return { data, stats, loading, error };
};

const useViewportEntry = (margin = "-60px") => {
  const ref     = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setSeen(true); return; }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } },
      { rootMargin: margin, threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return { ref, seen };
};

const useDebounce = (val, ms = 260) => {
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

// ── level resolver ────────────────────────────────────────────────────────────
const getLevel = (pct) => {
  if (pct >= 97) return { label:"Legendary", bar:"bg-gradient-to-r from-emerald-500 to-teal-400",   badge:"bg-emerald-500/20 text-emerald-300 border-emerald-500/30" };
  if (pct >= 90) return { label:"Expert",    bar:"bg-gradient-to-r from-cyan-500 to-blue-400",      badge:"bg-cyan-500/20 text-cyan-300 border-cyan-500/30"           };
  if (pct >= 80) return { label:"Advanced",  bar:"bg-gradient-to-r from-violet-500 to-purple-400",  badge:"bg-violet-500/20 text-violet-300 border-violet-500/30"     };
  return              { label:"Proficient", bar:"bg-gradient-to-r from-amber-500 to-yellow-400",   badge:"bg-amber-500/20 text-amber-300 border-amber-500/30"         };
};

// ── Badge ────────────────────────────────────────────────────────────────────
const Badge = ({ label, cls }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border tracking-wide ${cls}`}>
    {label}
  </span>
);

// ── RingMeter — SVG circular progress ────────────────────────────────────────
const RingMeter = ({ pct, size = 48, stroke = 4 }) => {
  const r    = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const { label, badge } = getLevel(pct);
  const ringColor = {
    Legendary : "stroke-emerald-400",
    Expert    : "stroke-cyan-400",
    Advanced  : "stroke-violet-400",
    Proficient: "stroke-amber-400",
  }[label] ?? "stroke-slate-400";

  return (
    <div className="relative inline-flex items-center justify-center shrink-0">
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle cx={size/2} cy={size/2} r={r} fill="none" strokeWidth={stroke} className="stroke-slate-700/50" />
        <circle
          cx={size/2} cy={size/2} r={r} fill="none" strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ - (pct / 100) * circ}
          className={`${ringColor} transition-all duration-1000`}
        />
      </svg>
      <span className="absolute text-xs font-black text-white">{pct}</span>
    </div>
  );
};

// ── AnimBar — animated horizontal progress bar ───────────────────────────────
const AnimBar = ({ pct, seen, barCls }) => {
  const barRef = useRef(null);
  const { bar: defaultBar } = getLevel(pct);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    el.style.width = seen ? `${pct}%` : "0%";
    el.style.transition = seen ? "width 1.2s cubic-bezier(0.4,0,0.2,1)" : "none";
  }, [seen, pct]);

  return (
    <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
      <div ref={barRef} style={{ width: 0 }} className={`h-full rounded-full ${barCls ?? defaultBar}`} />
    </div>
  );
};

// ── Pill ─────────────────────────────────────────────────────────────────────
const Pill = ({ label, cls = "bg-slate-700/70 text-slate-300 border-slate-600/50" }) => (
  <span className={`inline-block text-xs px-2 py-0.5 rounded-full border mr-1.5 mb-1.5 ${cls}`}>
    {label}
  </span>
);

// ── MetricTile ────────────────────────────────────────────────────────────────
const MetricTile = ({ label, value, accentCls = "text-white" }) => (
  <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3 text-center">
    <div className={`text-base font-black leading-tight ${accentCls}`}>{value}</div>
    <div className="text-xs text-slate-400 mt-0.5">{label}</div>
  </div>
);

// ── SectionTitle ──────────────────────────────────────────────────────────────
const SectionTitle = ({ icon, title, sub }) => (
  <div className="text-center mb-10">
    <div className="text-4xl mb-3">{icon}</div>
    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">{title}</h2>
    {sub && <p className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed">{sub}</p>}
  </div>
);

// ── Skeleton ─────────────────────────────────────────────────────────────────
const Skeleton = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-48 bg-slate-800/60 rounded-3xl" />
    <div className="flex gap-2 flex-wrap">
      {[1,2,3,4,5,6,7,8].map((n) => <div key={n} className="h-9 w-24 bg-slate-800/60 rounded-xl" />)}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {[1,2,3,4,5,6].map((n) => <div key={n} className="h-60 bg-slate-800/60 rounded-2xl" />)}
    </div>
  </div>
);

// ═════════════════════════════════════════════════════════════════════════════
//  MOLECULES
// ═════════════════════════════════════════════════════════════════════════════

// ── SkillRow — one row inside a category grid card ───────────────────────────
const SkillRow = ({ skill, seen }) => {
  const lv = getLevel(skill.pct);
  return (
    <div className="mb-3.5 group/sr">
      <div className="flex items-center justify-between gap-2 mb-1">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-sm leading-none shrink-0">{skill.icon}</span>
          <span className="text-sm font-semibold text-slate-300 truncate">{skill.name}</span>
          {skill.yrs && <span className="text-xs text-slate-600 shrink-0">{skill.yrs}yr</span>}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <Badge label={lv.label} cls={lv.badge} />
          <span className="text-xs font-black text-slate-400 w-7 text-right">{skill.pct}%</span>
        </div>
      </div>

      {skill.note && (
        <p className="text-xs text-slate-600 italic mb-1 opacity-0 group-hover/sr:opacity-100 transition-opacity duration-200 leading-snug">
          {skill.note}
        </p>
      )}

      <AnimBar pct={skill.pct} seen={seen} />

      <div className="flex flex-wrap mt-1.5">
        {skill.tags.map((t) => <Pill key={t} label={t} />)}
      </div>
    </div>
  );
};

// ── CategoryCard — groups skills by category ─────────────────────────────────
const CATEGORY_STYLE = {
  frontend    : { gradient:"from-cyan-600/20 via-blue-600/10 to-indigo-600/20",    border:"border-cyan-500/30",    accent:"text-cyan-400"    },
  backend     : { gradient:"from-green-600/20 via-emerald-600/10 to-teal-600/20",  border:"border-green-500/30",   accent:"text-green-400"   },
  database    : { gradient:"from-teal-600/20 via-cyan-600/10 to-sky-600/20",       border:"border-teal-500/30",    accent:"text-teal-400"    },
  cloud       : { gradient:"from-orange-600/20 via-amber-600/10 to-yellow-600/20", border:"border-orange-500/30",  accent:"text-orange-400"  },
  ai          : { gradient:"from-violet-600/20 via-purple-600/10 to-fuchsia-600/20",border:"border-violet-500/30", accent:"text-violet-400"  },
  testing     : { gradient:"from-pink-600/20 via-rose-600/10 to-red-600/20",       border:"border-pink-500/30",    accent:"text-pink-400"    },
  architecture: { gradient:"from-slate-600/20 via-zinc-600/10 to-gray-600/20",     border:"border-slate-500/30",   accent:"text-slate-300"   },
};

const CategoryCard = ({ catId, skills, catLabel, catIcon }) => {
  const { ref, seen } = useViewportEntry();
  const [expanded, setExpanded] = useState(false);
  const style = CATEGORY_STYLE[catId] ?? CATEGORY_STYLE.architecture;

  const displayed = expanded ? skills : skills.slice(0, 6);
  const hasMore   = skills.length > 6;

  const avgPct = useMemo(
    () => Math.round(skills.reduce((s, sk) => s + sk.pct, 0) / skills.length),
    [skills]
  );

  return (
    <div
      ref={ref}
      className={`rounded-2xl border bg-gradient-to-br ${style.gradient} ${style.border} hover:border-white/20 hover:shadow-xl transition-all duration-300`}
    >
      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{catIcon}</span>
            <div>
              <h3 className={`font-black text-base ${style.accent}`}>{catLabel}</h3>
              <p className="text-xs text-slate-500">{skills.length} skills tracked</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <RingMeter pct={avgPct} size={46} stroke={4} />
            <span className="text-xs text-slate-500">avg</span>
          </div>
        </div>
      </div>

      {/* Skill rows */}
      <div className="px-5 pb-2">
        {displayed.map((sk) => <SkillRow key={sk.id} skill={sk} seen={seen} />)}
      </div>

      {hasMore && (
        <div className="px-5 pb-5">
          <button
            onClick={() => setExpanded((v) => !v)}
            className={`w-full text-xs font-bold py-2 rounded-xl bg-slate-800/50 border border-slate-700/50 ${style.accent} hover:bg-slate-700/60 transition-colors`}
          >
            {expanded ? "Show less ▲" : `+${skills.length - 6} more ▼`}
          </button>
        </div>
      )}
    </div>
  );
};

// ── ProjectCard ───────────────────────────────────────────────────────────────
const ProjectCard = ({ project, isExpanded, onToggle }) => (
  <div className={`rounded-3xl border overflow-hidden bg-gradient-to-br ${project.gradient} ${project.border} hover:border-white/20 transition-all duration-300`}>
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
      <div className="flex flex-wrap mb-3">
        {project.tech.map((t) => (
          <span key={t} className="text-xs mr-1.5 mb-1.5 px-2.5 py-0.5 rounded-full bg-slate-700/60 text-slate-300 border border-slate-600/40">{t}</span>
        ))}
      </div>
    </div>

    <div className="px-5 pb-3">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {project.metrics.map((m) => (
          <MetricTile key={m.label} label={m.label} value={m.value} accentCls={project.accentCls} />
        ))}
      </div>
    </div>

    <div className="px-5 pb-5">
      <button
        onClick={() => onToggle(project.id)}
        aria-expanded={isExpanded}
        className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-700/60 transition-all duration-200"
      >
        <span>{isExpanded ? "Hide" : "Show"} Architecture Highlights</span>
        <span className={`text-xs transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>▼</span>
      </button>
      {isExpanded && (
        <div className="mt-3 space-y-2">
          {project.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-2.5 bg-slate-800/40 rounded-xl p-3 border border-slate-700/40">
              <span className={`shrink-0 mt-0.5 text-sm ${project.accentCls}`}>◆</span>
              <span className="text-sm text-slate-300 leading-snug">{h}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

// ── CertCard ──────────────────────────────────────────────────────────────────
const CertCard = ({ cert }) => (
  <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 hover:border-slate-500/60 hover:scale-[1.02] transition-all duration-300 group">
    <div className={`h-1.5 w-full bg-gradient-to-r ${cert.gradient}`} />
    <div className="p-5">
      <div className="flex items-start gap-3 mb-3">
        <span className="text-3xl leading-none mt-0.5">{cert.logo}</span>
        <div className="flex-1 min-w-0">
          <Badge label={`${cert.issuer} · ${cert.year}`} cls={cert.badge} />
          <h4 className="font-bold text-white text-sm leading-snug mt-1 group-hover:text-violet-300 transition-colors">{cert.name}</h4>
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {cert.topics.map((t) => <Pill key={t} label={t} />)}
      </div>
    </div>
  </div>
);

// ═════════════════════════════════════════════════════════════════════════════
//  PANEL ORGANISMS
// ═════════════════════════════════════════════════════════════════════════════

// ── SkillsPanel ───────────────────────────────────────────────────────────────
const SkillsPanel = ({ skills, categories, state, dispatch, stats }) => {
  const debouncedQ = useDebounce(state.searchQuery);

  // Filter by category + search
  const filtered = useMemo(() => {
    let list = state.activeCategory === FILTER_ALL
      ? skills
      : skills.filter((s) => s.category === state.activeCategory);

    if (debouncedQ) {
      const q = debouncedQ.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q)) ||
          (s.note && s.note.toLowerCase().includes(q))
      );
    }

    return [...list].sort((a, b) => {
      if (state.sortBy === SORT_OPTIONS.MASTERY) return b.pct - a.pct;
      if (state.sortBy === SORT_OPTIONS.ALPHA)   return a.name.localeCompare(b.name);
      if (state.sortBy === SORT_OPTIONS.YEARS)   return b.yrs - a.yrs;
      return 0;
    });
  }, [skills, state.activeCategory, debouncedQ, state.sortBy]);

  // Group filtered skills by category for grid view
  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach((sk) => {
      if (!map[sk.category]) map[sk.category] = [];
      map[sk.category].push(sk);
    });
    return map;
  }, [filtered]);

  const catOrder = ["frontend","backend","database","cloud","ai","testing","architecture"];
  const sortedGroups = catOrder.filter((c) => grouped[c]);

  return (
    <div className="space-y-8">
      <SectionTitle
        icon="⚡"
        title="Skill Categories"
        sub={`${YEARS_EXP}+ years · ${stats?.total ?? 55}+ technologies · principal-level mastery across every layer.`}
      />

      {/* Stats strip */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label:"Years Experience",    value:`${YEARS_EXP}+`                          },
            { label:"Total Skills",        value:`${stats.total}+`                        },
            { label:"Avg Mastery",         value:`${stats.avgMastery}%`                   },
            { label:"Production Projects", value:"5"                                       },
          ].map((s) => (
            <MetricTile key={s.label} label={s.label} value={s.value} accentCls="text-violet-300" />
          ))}
        </div>
      )}

      {/* Category filter chips */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Skill category filters">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => dispatch({ type: ACTS.SET_CATEGORY, payload: cat.id })}
            className={`
              flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200
              ${state.activeCategory === cat.id
                ? "bg-violet-600 text-white shadow-lg shadow-violet-500/25"
                : "bg-slate-800/60 text-slate-400 border border-slate-700/50 hover:text-white hover:bg-slate-700/60"}
            `}
          >
            <span>{cat.icon}</span>
            <span className="hidden sm:inline">{cat.label}</span>
            {stats?.byCategory?.[cat.id] !== undefined && cat.id !== FILTER_ALL && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${state.activeCategory === cat.id ? "bg-white/20" : "bg-slate-700"}`}>
                {stats.byCategory[cat.id]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Search + Sort controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search skills, tags, notes…"
            value={state.searchQuery}
            onChange={(e) => dispatch({ type: ACTS.SET_QUERY, payload: e.target.value })}
            className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all"
          />
        </div>
        <div className="flex gap-2 shrink-0">
          {Object.entries(SORT_OPTIONS).map(([key, val]) => (
            <button
              key={val}
              onClick={() => dispatch({ type: ACTS.SET_SORT, payload: val })}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                state.sortBy === val
                  ? "bg-violet-600 text-white"
                  : "bg-slate-800/60 border border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700/60"
              }`}
            >
              {key === "MASTERY" ? "% Mastery" : key === "ALPHA" ? "A–Z" : "Years"}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      {debouncedQ && (
        <p className="text-sm text-slate-500">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "{debouncedQ}"
          <button
            onClick={() => dispatch({ type: ACTS.RESET })}
            className="ml-3 text-xs text-violet-400 hover:text-violet-300 underline"
          >
            clear
          </button>
        </p>
      )}

      {/* Skill grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-white mb-2">No skills found</h3>
          <p className="text-slate-400 text-sm mb-5">Try a different search or reset your filters.</p>
          <button
            onClick={() => dispatch({ type: ACTS.RESET })}
            className="px-5 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold rounded-xl transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedGroups.map((catId) => {
            const catMeta = categories.find((c) => c.id === catId);
            return (
              <CategoryCard
                key={catId}
                catId={catId}
                skills={grouped[catId]}
                catLabel={catMeta?.label ?? catId}
                catIcon={catMeta?.icon ?? "🔧"}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
