// ═══════════════════════════════════════════════════════════════════════════
//  RegistryIngress.js  —  Principal Engineer · 50+ yrs · Ultra FAANG
//  Service layer: single source of truth for all skill, project, Prisma,
//  certification, and academic data. Exposes async ingress functions so
//  consumers (hooks, components) never touch raw data directly.
//  Architecture: constants → registry objects → transformers → ingress API
// ═══════════════════════════════════════════════════════════════════════════

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const REGISTRY_VERSION = "4.0.0";
const CAREER_START = 1975;
const NOW = new Date().getFullYear();
const YRS_EXP = NOW - CAREER_START;
const LEETCODE_SOLVED = 523;

const DOMAIN = Object.freeze({
  FRONTEND: "frontend",
  BACKEND: "backend",
  DATABASE: "database",
  CLOUD: "cloud",
  AI_ML: "ai_ml",
  TESTING: "testing",
  ARCH: "architecture",
});

const MASTERY = Object.freeze({
  LEGENDARY: { min: 97, label: "Legendary", color: "#34d399" },
  EXPERT: { min: 90, label: "Expert", color: "#22d3ee" },
  ADVANCED: { min: 80, label: "Advanced", color: "#a78bfa" },
  PROFICIENT: { min: 0, label: "Proficient", color: "#fbbf24" },
});

const PROVIDER = Object.freeze({
  POSTGRESQL: "postgresql",
  MYSQL: "mysql",
  SQLITE: "sqlite",
});

const STATUS = Object.freeze({
  PRODUCTION: "production",
  LIVE: "live",
  STAGING: "staging",
  DEPRECATED: "deprecated",
});

// ─── SKILL REGISTRY  (55 skills · 7 domains) ─────────────────────────────────
const SKILL_REGISTRY = [
  // Frontend
  { id: "f1", name: "React.js", domain: DOMAIN.FRONTEND, pct: 99, yrs: 12, since: 2013, wh: 20, trend: "stable", certs: ["meta-fe"] },
  { id: "f2", name: "Next.js", domain: DOMAIN.FRONTEND, pct: 99, yrs: 9, since: 2019, wh: 18, trend: "stable", certs: [] },
  { id: "f3", name: "Redux.js", domain: DOMAIN.FRONTEND, pct: 98, yrs: 10, since: 2015, wh: 12, trend: "stable", certs: ["meta-fe"] },
  { id: "f4", name: "Tailwind CSS", domain: DOMAIN.FRONTEND, pct: 99, yrs: 6, since: 2020, wh: 16, trend: "rising", certs: [] },
  { id: "f5", name: "TypeScript", domain: DOMAIN.FRONTEND, pct: 98, yrs: 10, since: 2016, wh: 14, trend: "stable", certs: [] },
  { id: "f6", name: "UI/UX Design", domain: DOMAIN.FRONTEND, pct: 95, yrs: 20, since: 2004, wh: 8, trend: "stable", certs: ["meta-fe"] },
  { id: "f7", name: "Web Performance", domain: DOMAIN.FRONTEND, pct: 97, yrs: 18, since: 2006, wh: 6, trend: "stable", certs: [] },
  { id: "f8", name: "Framer Motion", domain: DOMAIN.FRONTEND, pct: 93, yrs: 5, since: 2020, wh: 4, trend: "rising", certs: [] },
  // Backend
  { id: "b1", name: "Node.js", domain: DOMAIN.BACKEND, pct: 99, yrs: 16, since: 2009, wh: 22, trend: "stable", certs: [] },
  { id: "b2", name: "Express.js", domain: DOMAIN.BACKEND, pct: 99, yrs: 14, since: 2011, wh: 18, trend: "stable", certs: [] },
  { id: "b3", name: "Django", domain: DOMAIN.BACKEND, pct: 97, yrs: 8, since: 2017, wh: 14, trend: "rising", certs: ["meta-be"] },
  { id: "b4", name: "REST API Design", domain: DOMAIN.BACKEND, pct: 99, yrs: 25, since: 2000, wh: 16, trend: "stable", certs: ["meta-be"] },
  { id: "b5", name: "GraphQL", domain: DOMAIN.BACKEND, pct: 95, yrs: 8, since: 2017, wh: 8, trend: "stable", certs: [] },
  { id: "b6", name: "WebSockets", domain: DOMAIN.BACKEND, pct: 97, yrs: 12, since: 2013, wh: 10, trend: "stable", certs: [] },
  { id: "b7", name: "gRPC", domain: DOMAIN.BACKEND, pct: 91, yrs: 7, since: 2017, wh: 5, trend: "rising", certs: [] },
  { id: "b8", name: "Message Queues", domain: DOMAIN.BACKEND, pct: 93, yrs: 10, since: 2014, wh: 6, trend: "stable", certs: [] },
  // Database & ORM
  { id: "d1", name: "Prisma ORM", domain: DOMAIN.DATABASE, pct: 99, yrs: 5, since: 2020, wh: 20, trend: "rising", certs: ["prisma-expert"] },
  { id: "d2", name: "PostgreSQL", domain: DOMAIN.DATABASE, pct: 98, yrs: 14, since: 2010, wh: 14, trend: "stable", certs: [] },
  { id: "d3", name: "MySQL", domain: DOMAIN.DATABASE, pct: 97, yrs: 16, since: 2008, wh: 10, trend: "stable", certs: ["meta-be"] },
  { id: "d4", name: "Redis", domain: DOMAIN.DATABASE, pct: 94, yrs: 11, since: 2013, wh: 8, trend: "stable", certs: [] },
  { id: "d5", name: "MongoDB", domain: DOMAIN.DATABASE, pct: 91, yrs: 10, since: 2014, wh: 5, trend: "stable", certs: [] },
  { id: "d6", name: "Elasticsearch", domain: DOMAIN.DATABASE, pct: 90, yrs: 8, since: 2016, wh: 4, trend: "stable", certs: [] },
  { id: "d7", name: "SQLite", domain: DOMAIN.DATABASE, pct: 90, yrs: 15, since: 2009, wh: 3, trend: "stable", certs: [] },
  { id: "d8", name: "Vector Databases", domain: DOMAIN.DATABASE, pct: 88, yrs: 3, since: 2022, wh: 6, trend: "rising", certs: [] },
  // Cloud & DevOps
  { id: "c1", name: "Docker", domain: DOMAIN.CLOUD, pct: 99, yrs: 11, since: 2014, wh: 16, trend: "stable", certs: [] },
  { id: "c2", name: "Kubernetes", domain: DOMAIN.CLOUD, pct: 97, yrs: 9, since: 2016, wh: 14, trend: "stable", certs: ["ckad"] },
  { id: "c3", name: "AWS (Pro)", domain: DOMAIN.CLOUD, pct: 98, yrs: 14, since: 2011, wh: 18, trend: "stable", certs: ["aws-saa", "aws-dop"] },
  { id: "c4", name: "GCP", domain: DOMAIN.CLOUD, pct: 94, yrs: 9, since: 2015, wh: 10, trend: "stable", certs: ["gcp-ace"] },
  { id: "c5", name: "Azure", domain: DOMAIN.CLOUD, pct: 93, yrs: 8, since: 2017, wh: 8, trend: "stable", certs: ["ms-az900", "ms-az204"] },
  { id: "c6", name: "Terraform", domain: DOMAIN.CLOUD, pct: 95, yrs: 8, since: 2017, wh: 10, trend: "rising", certs: [] },
  { id: "c7", name: "Helm Charts", domain: DOMAIN.CLOUD, pct: 93, yrs: 7, since: 2018, wh: 6, trend: "stable", certs: [] },
  { id: "c8", name: "GitHub Actions", domain: DOMAIN.CLOUD, pct: 98, yrs: 6, since: 2019, wh: 12, trend: "stable", certs: [] },
  // AI / ML
  { id: "a1", name: "GPT-4 / OpenAI", domain: DOMAIN.AI_ML, pct: 95, yrs: 4, since: 2021, wh: 14, trend: "rising", certs: ["google-ai"] },
  { id: "a2", name: "LangChain", domain: DOMAIN.AI_ML, pct: 93, yrs: 3, since: 2022, wh: 12, trend: "rising", certs: [] },
  { id: "a3", name: "RAG Pipelines", domain: DOMAIN.AI_ML, pct: 92, yrs: 3, since: 2022, wh: 10, trend: "rising", certs: [] },
  { id: "a4", name: "Prompt Eng.", domain: DOMAIN.AI_ML, pct: 96, yrs: 4, since: 2021, wh: 10, trend: "rising", certs: ["google-ai"] },
  { id: "a5", name: "Hugging Face", domain: DOMAIN.AI_ML, pct: 88, yrs: 3, since: 2022, wh: 8, trend: "rising", certs: [] },
  { id: "a6", name: "SSE Streaming", domain: DOMAIN.AI_ML, pct: 95, yrs: 4, since: 2021, wh: 8, trend: "rising", certs: [] },
  { id: "a7", name: "Python / MLOps", domain: DOMAIN.AI_ML, pct: 91, yrs: 8, since: 2016, wh: 10, trend: "stable", certs: ["google-auto"] },
  // Testing & QA
  { id: "t1", name: "Jest", domain: DOMAIN.TESTING, pct: 98, yrs: 8, since: 2016, wh: 10, trend: "stable", certs: [] },
  { id: "t2", name: "Vitest", domain: DOMAIN.TESTING, pct: 97, yrs: 3, since: 2022, wh: 8, trend: "rising", certs: [] },
  { id: "t3", name: "Cypress E2E", domain: DOMAIN.TESTING, pct: 96, yrs: 6, since: 2018, wh: 8, trend: "stable", certs: [] },
  { id: "t4", name: "Playwright", domain: DOMAIN.TESTING, pct: 95, yrs: 4, since: 2021, wh: 6, trend: "rising", certs: [] },
  { id: "t5", name: "React Test Lib", domain: DOMAIN.TESTING, pct: 97, yrs: 6, since: 2018, wh: 8, trend: "stable", certs: [] },
  { id: "t6", name: "k6 Load Testing", domain: DOMAIN.TESTING, pct: 90, yrs: 4, since: 2020, wh: 4, trend: "stable", certs: [] },
  { id: "t7", name: "Storybook", domain: DOMAIN.TESTING, pct: 94, yrs: 5, since: 2019, wh: 5, trend: "stable", certs: [] },
  { id: "t8", name: "Supertest", domain: DOMAIN.TESTING, pct: 93, yrs: 7, since: 2017, wh: 4, trend: "stable", certs: [] },
  // Architecture
  { id: "ar1", name: "Microservices", domain: DOMAIN.ARCH, pct: 99, yrs: 20, since: 2004, wh: 10, trend: "stable", certs: [] },
  { id: "ar2", name: "Event-Driven", domain: DOMAIN.ARCH, pct: 97, yrs: 18, since: 2006, wh: 8, trend: "stable", certs: [] },
  { id: "ar3", name: "DDD", domain: DOMAIN.ARCH, pct: 96, yrs: 15, since: 2009, wh: 6, trend: "stable", certs: [] },
  { id: "ar4", name: "System Design", domain: DOMAIN.ARCH, pct: 99, yrs: 35, since: 1989, wh: 12, trend: "stable", certs: [] },
  { id: "ar5", name: "Distributed Sys", domain: DOMAIN.ARCH, pct: 96, yrs: 20, since: 2004, wh: 8, trend: "stable", certs: [] },
  { id: "ar6", name: "Security Arch", domain: DOMAIN.ARCH, pct: 95, yrs: 22, since: 2002, wh: 6, trend: "stable", certs: [] },
  { id: "ar7", name: "Observability", domain: DOMAIN.ARCH, pct: 94, yrs: 15, since: 2009, wh: 6, trend: "rising", certs: [] },
  { id: "ar8", name: "API Design", domain: DOMAIN.ARCH, pct: 99, yrs: 28, since: 1996, wh: 10, trend: "stable", certs: [] },
];

// ─── PROJECT REGISTRY  (5 production projects) ───────────────────────────────
const PROJECT_REGISTRY = [
  {
    id: "ecommerce",
    title: "Fullstack E-Commerce Platform",
    emoji: "🛒",
    year: 2023,
    status: STATUS.PRODUCTION,
    complexity: 98,
    tech: [
      "React.js", "Next.js", "Redux.js", "Prisma", "Django", "PostgreSQL", "MySQL",
      "Docker", "AWS", "Tailwind CSS", "REST API", "UI/UX",
    ],
    perf: { dau: 120000, uptime: 99.99, p99Ms: 80, revenueUSD: 4000000 },
    prisma: { models: 15, migrations: 52, rawQueries: 8, provider: PROVIDER.POSTGRESQL },
    infra: { services: 12, k8sPods: 48, dockerImages: 15, cicdPipelines: 4 },
    highlights: [
      "12-service Kubernetes mesh · zero-downtime deployments",
      "Django AI recommendations engine — +22% click-through rate",
      "Multi-currency checkout: Stripe + PayPal + crypto gateway",
      "AWS CloudFront CDN image pipeline — 94% cache hit ratio",
      "PostgreSQL + Redis caching layer: P99 query < 40ms",
    ],
    tags: ["e-commerce", "multi-vendor", "real-time", "ai-recs", "multi-region"],
  },
  {
    id: "portfolio",
    title: "Portfolio Platform",
    emoji: "🎨",
    year: 2024,
    status: STATUS.LIVE,
    complexity: 90,
    tech: [
      "React.js", "Next.js", "Redux.js", "Prisma", "Node.js", "Express.js",
      "PostgreSQL", "MySQL", "Docker", "Cloud", "Tailwind CSS", "REST API", "UI/UX",
    ],
    perf: { lighthouse: 100, loadMs: 1200, bounceReduction: 42, conversionLift: 67 },
    prisma: { models: 8, migrations: 18, rawQueries: 2, provider: PROVIDER.POSTGRESQL },
    infra: { services: 4, k8sPods: 8, dockerImages: 5, cicdPipelines: 2 },
    highlights: [
      "SSR + ISR hybrid rendering — static speed with real-time freshness",
      "Headless CMS architecture — zero-redeploy content updates",
      "Lighthouse 100/100 across all four metrics",
      "i18n support across 6 languages via next-intl",
      "WCAG 2.2 AA — NVDA, JAWS, VoiceOver tested",
    ],
    tags: ["ssr", "isr", "cms", "a11y", "i18n", "performance"],
  },
  {
    id: "dashboard",
    title: "Analytics Dashboard App",
    emoji: "📊",
    year: 2023,
    status: STATUS.PRODUCTION,
    complexity: 97,
    tech: [
      "React.js", "Next.js", "Redux.js", "Prisma", "Node.js", "Express.js",
      "PostgreSQL", "MySQL", "Docker", "Cloud", "Tailwind CSS", "REST API", "UI/UX",
    ],
    perf: { tenants: 500, eventsPerSec: 50000, queryP99Ms: 200, rowsRendered: 10000000 },
    prisma: { models: 12, migrations: 40, rawQueries: 14, provider: PROVIDER.POSTGRESQL },
    infra: { services: 8, k8sPods: 24, dockerImages: 10, cicdPipelines: 3 },
    highlights: [
      "Drag-and-drop widget builder with 40+ chart types (Recharts)",
      "WebSocket live KPIs — sub-100ms update latency at 500 tenants",
      "RBAC with 12 permission scopes + attribute-based overrides",
      "Row-level PostgreSQL security — zero cross-tenant data bleed",
      "Export pipeline: PDF (Puppeteer) + Excel (exceljs) + CSV",
    ],
    tags: ["multi-tenant", "rbac", "websocket", "rls", "export", "scheduled-reports"],
  },
  {
    id: "chat",
    title: "Real-Time Chat Application",
    emoji: "💬",
    year: 2022,
    status: STATUS.PRODUCTION,
    complexity: 96,
    tech: [
      "React.js", "Next.js", "Redux.js", "Prisma", "Node.js", "Express.js",
      "PostgreSQL", "MySQL", "Docker", "Cloud", "Tailwind CSS", "REST API", "UI/UX",
    ],
    perf: { concurrentUsers: 200000, messagesPerDay: 5000000, wsLatencyMs: 15, uptime: 99.97 },
    prisma: { models: 10, migrations: 28, rawQueries: 5, provider: PROVIDER.POSTGRESQL },
    infra: { services: 9, k8sPods: 32, dockerImages: 12, cicdPipelines: 3 },
    highlights: [
      "E2E encryption via Signal Protocol — double ratchet algorithm",
      "WebRTC P2P video/audio — SFU architecture for group calls",
      "Elasticsearch full-text message search with instant results",
      "Enterprise SSO: SAML 2.0 + OAuth 2.0 + OIDC",
      "FCM + APNS push notifications — delivery & read receipts",
    ],
    tags: ["e2e-encryption", "webrtc", "sfu", "sso", "saml", "push-notifications"],
  },
  {
    id: "ai-app",
    title: "AI + Fullstack Application",
    emoji: "🤖",
    year: 2024,
    status: STATUS.PRODUCTION,
    complexity: 99,
    tech: [
      "React.js", "Next.js", "Redux.js", "Prisma", "Django", "PostgreSQL", "MySQL",
      "Docker", "Cloud", "Tailwind CSS", "REST API", "UI/UX",
    ],
    perf: { inferencesPerDay: 1000000, modelAccuracy: 94.7, costReduction: 60, satisfaction: 4.9 },
    prisma: { models: 10, migrations: 24, rawQueries: 6, provider: PROVIDER.POSTGRESQL },
    infra: { services: 7, k8sPods: 20, dockerImages: 9, cicdPipelines: 3 },
    highlights: [
      "RAG pipeline: Pinecone vector DB + semantic chunk re-ranking",
      "LangChain autonomous agents — tool use, self-reflection, memory",
      "SSE token streaming — perceived first-token latency < 200ms",
      "LoRA fine-tuned domain model on proprietary dataset",
      "HITL feedback loop — continuous model improvement system",
    ],
    tags: ["rag", "langchain", "lora", "sse-streaming", "hitl", "model-routing"],
  },
];

// ─── PRISMA INFRA REGISTRY ────────────────────────────────────────────────────
const PRISMA_REGISTRY = {
  mastery: 99,
  yrs: 5,
  since: 2020,
  certified: true,
  version: "5.14.0",
  totalModels: PROJECT_REGISTRY.reduce((s, p) => s + p.prisma.models, 0),
  totalMigrations: PROJECT_REGISTRY.reduce((s, p) => s + p.prisma.migrations, 0),
  totalRawQueries: PROJECT_REGISTRY.reduce((s, p) => s + p.prisma.rawQueries, 0),
  features: [
    { name: "Schema Design", pct: 99, cat: "core" },
    { name: "Migrations", pct: 99, cat: "core" },
    { name: "Relations (all types)", pct: 98, cat: "core" },
    { name: "Query Optimisation", pct: 97, cat: "performance" },
    { name: "Transactions", pct: 98, cat: "advanced" },
    { name: "Raw SQL ($queryRaw)", pct: 96, cat: "advanced" },
    { name: "Seeding & Testing", pct: 97, cat: "devops" },
    { name: "Prisma Studio", pct: 95, cat: "tooling" },
    { name: "N+1 Elimination", pct: 99, cat: "performance" },
    { name: "Row-Level Security", pct: 97, cat: "security" },
    { name: "Multi-provider Setup", pct: 96, cat: "advanced" },
    { name: "Middleware / Hooks", pct: 94, cat: "advanced" },
  ],
  dbAdapters: [
    { name: "PostgreSQL", pct: 99, projects: 5, note: "Primary — all 5 projects" },
    { name: "MySQL", pct: 97, projects: 3, note: "Secondary — 3 projects" },
    { name: "SQLite", pct: 90, projects: 5, note: "Dev & E2E test isolation" },
  ],
  queryPatterns: [
    { pattern: "findMany + include", freq: "daily", optimised: true },
    { pattern: "upsert", freq: "daily", optimised: true },
    { pattern: "$transaction (nested)", freq: "daily", optimised: true },
    { pattern: "$queryRaw (complex SQL)", freq: "weekly", optimised: true },
    { pattern: "cursor-based pagination", freq: "daily", optimised: true },
    { pattern: "createMany / updateMany", freq: "daily", optimised: true },
    { pattern: "count + groupBy", freq: "weekly", optimised: true },
    { pattern: "select distinct fields", freq: "daily", optimised: true },
  ],
};

// ─── CERTIFICATION REGISTRY  (10 platform + 3 Google) ────────────────────────
const CERT_REGISTRY = {
  platform: [
    { id: "aws-saa", issuer: "AWS", logo: "☁️", name: "Solutions Architect – Associate", year: 2021, gradient: "from-orange-500 to-amber-500", badge: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
    { id: "aws-dop", issuer: "AWS", logo: "☁️", name: "DevOps Engineer – Professional", year: 2022, gradient: "from-orange-600 to-red-500", badge: "bg-red-500/20 text-red-300 border-red-500/30" },
    { id: "gcp-ace", issuer: "Google", logo: "🌐", name: "Associate Cloud Engineer", year: 2020, gradient: "from-blue-500 to-cyan-400", badge: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
    { id: "ms-az900", issuer: "Microsoft", logo: "🪟", name: "Azure Fundamentals AZ-900", year: 2021, gradient: "from-sky-500 to-blue-600", badge: "bg-sky-500/20 text-sky-300 border-sky-500/30" },
    { id: "ms-az204", issuer: "Microsoft", logo: "🪟", name: "Azure Developer Associate AZ-204", year: 2022, gradient: "from-indigo-500 to-sky-600", badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30" },
    { id: "ibm-cad", issuer: "IBM", logo: "🔷", name: "Cloud Application Developer", year: 2020, gradient: "from-blue-700 to-blue-500", badge: "bg-blue-700/20 text-blue-200 border-blue-700/30" },
    { id: "meta-be", issuer: "Meta", logo: "🔵", name: "Back-End Developer Professional", year: 2023, gradient: "from-blue-400 to-indigo-500", badge: "bg-blue-400/20 text-blue-200 border-blue-400/30" },
    { id: "meta-fe", issuer: "Meta", logo: "🔵", name: "Front-End Developer Professional", year: 2023, gradient: "from-cyan-400 to-blue-500", badge: "bg-cyan-400/20 text-cyan-200 border-cyan-400/30" },
    { id: "prisma-expert", issuer: "Prisma", logo: "🗃️", name: "ORM Expert Certification", year: 2022, gradient: "from-teal-500 to-emerald-400", badge: "bg-teal-500/20 text-teal-300 border-teal-500/30" },
    { id: "ckad", issuer: "CNCF", logo: "☸️", name: "Kubernetes App Developer (CKAD)", year: 2021, gradient: "from-violet-500 to-purple-600", badge: "bg-violet-500/20 text-violet-300 border-violet-500/30" },
  ],
  google: [
    { id: "google-ai", name: "Google AI Essentials", year: 2024, pct: 100 },
    { id: "google-auto", name: "Google IT Automation with Python", year: 2023, pct: 100 },
    { id: "google-data", name: "Google Data Analytics Professional", year: 2023, pct: 100 },
  ],
};

// ─── ACADEMIC REGISTRY ────────────────────────────────────────────────────────
const ACADEMIC_REGISTRY = {
  degrees: [
    { id: "bsc-cs", title: "BSc Computer Science", institution: "University of London", year: 2022, pct: 100, grade: "First Class Honours", status: "completed" },
    { id: "bsc-ai", title: "BSc Artificial Intelligence", institution: "University of London", year: 2025, pct: 78, grade: "On Track – Distinction", status: "in_progress" },
  ],
  leetcode: {
    solved: 523,
    target: 600,
    ranking: "Top 3%",
    streak: 87,
    contestRating: 1842,
    badge: "Knight",
    byDifficulty: [
      { level: "easy", solved: 198, total: 760 },
      { level: "medium", solved: 267, total: 1580 },
      { level: "hard", solved: 58, total: 650 },
    ],
    topics: ["Dynamic Programming", "Graph Algorithms", "Binary Search", "Tree Traversals", "Sliding Window", "Backtracking"],
  },
};

// ═══════════════════════════════════════════════════════════════════════════
//  TRANSFORMER UTILITIES  — pure functions, no side effects
// ═══════════════════════════════════════════════════════════════════════════

/** Groups array items by key function */
const groupBy = (arr, fn) =>
  arr.reduce((acc, item) => {
    const k = fn(item);
    return { ...acc, [k]: [...(acc[k] ?? []), item] };
  }, {});

/** Returns mastery level metadata for a given percentage */
const resolveLevel = (pct) =>
  Object.values(MASTERY).find((l) => pct >= l.min) ?? MASTERY.PROFICIENT;

/** Builds per-domain aggregate summary from skill list */
const toDomainSummary = (skills) =>
  Object.entries(groupBy(skills, (s) => s.domain)).map(([domain, items]) => ({
    domain,
    count: items.length,
    avgPct: Math.round(items.reduce((s, i) => s + i.pct, 0) / items.length),
    weeklyHrs: items.reduce((s, i) => s + i.wh, 0),
    legendary: items.filter((i) => i.pct >= 97).length,
    topSkill: [...items].sort((a, b) => b.pct - a.pct)[0]?.name ?? "",
    rising: items.filter((i) => i.trend === "rising").map((i) => i.name),
    certLinked: [...new Set(items.flatMap((i) => i.certs))],
    level: resolveLevel(Math.round(items.reduce((s, i) => s + i.pct, 0) / items.length)),
  }));

/** Builds global stats snapshot from all registry data */
const toGlobalStats = (skills, projects) => ({
  totalSkills: skills.length,
  avgMastery: Math.round(skills.reduce((s, k) => s + k.pct, 0) / skills.length),
  legendary: skills.filter((s) => s.pct >= 97).length,
  expert: skills.filter((s) => s.pct >= 90 && s.pct < 97).length,
  totalWeeklyHrs: skills.reduce((s, k) => s + k.wh, 0),
  risingCount: skills.filter((s) => s.trend === "rising").length,
  yrsExperience: YRS_EXP,
  careerStart: CAREER_START,
  projectCount: projects.length,
  totalCerts: CERT_REGISTRY.platform.length + CERT_REGISTRY.google.length,
  leetcodeSolved: ACADEMIC_REGISTRY.leetcode.solved,
  avgComplexity: Math.round(projects.reduce((s, p) => s + p.complexity, 0) / projects.length),
  prismaModels: PRISMA_REGISTRY.totalModels,
  prismaMigrations: PRISMA_REGISTRY.totalMigrations,
  prismaRawQueries: PRISMA_REGISTRY.totalRawQueries,
  registryVersion: REGISTRY_VERSION,
});

/** Enriches Prisma registry with derived stats */
const toPrismaMeta = (prisma) => {
  const byCategory = groupBy(prisma.features, (f) => f.cat);
  const avgFeatureMastery = Math.round(prisma.features.reduce((s, f) => s + f.pct, 0) / prisma.features.length);
  const topFeature = [...prisma.features].sort((a, b) => b.pct - a.pct)[0];
  const optimisedPatterns = prisma.queryPatterns.filter((p) => p.optimised).length;
  return {
    ...prisma,
    byCategory,
    avgFeatureMastery,
    topFeature,
    optimisedPatterns,
    coverage: "100%",
    topDbAvgPct: Math.round(prisma.dbAdapters.reduce((s, d) => s + d.pct, 0) / prisma.dbAdapters.length),
  };
};

/** Enriches cert registry with grouped views */
const toCertMeta = (certs) => ({
  ...certs,
  platformByIssuer: groupBy(certs.platform, (c) => c.issuer),
  total: certs.platform.length + certs.google.length,
  issuers: [...new Set(certs.platform.map((c) => c.issuer))],
});

/** Enriches academic registry with derived stats */
const toAcademicMeta = (academic) => ({
  ...academic,
  degrees: {
    all: academic.degrees,
    completed: academic.degrees.filter((d) => d.status === "completed"),
    ongoing: academic.degrees.filter((d) => d.status === "in_progress"),
  },
  leetcode: {
    ...academic.leetcode,
    solvePct: Math.round((academic.leetcode.solved / academic.leetcode.target) * 100),
    byDifficulty: academic.leetcode.byDifficulty.map((d) => ({
      ...d,
      solvePct: Math.round((d.solved / d.total) * 100),
    })),
  },
});

// ═══════════════════════════════════════════════════════════════════════════
//  INGRESS API  — async fetchers that simulate a data layer boundary
//  Consumers always go through these; never access raw registries directly.
// ═══════════════════════════════════════════════════════════════════════════

const _delay = (ms) => new Promise((r) => setTimeout(r, ms));

/** Fetch all skills — optionally filtered by domain */
const ingressSkills = (domain = "all") =>
  _delay(80).then(() => {
    const list = domain === "all"
      ? SKILL_REGISTRY
      : SKILL_REGISTRY.filter((s) => s.domain === domain);
    return {
      skills: list,
      domainSummary: toDomainSummary(list),
      total: list.length,
      byDomain: groupBy(list, (s) => s.domain),
      rising: list.filter((s) => s.trend === "rising"),
      legendary: list.filter((s) => s.pct >= 97),
      certified: list.filter((s) => s.certs.length > 0),
    };
  });

/** Fetch all 5 projects — optionally filtered by status or tag */
const ingressProjects = (filter = {}) =>
  _delay(100).then(() => {
    let list = PROJECT_REGISTRY;
    if (filter.status) list = list.filter((p) => p.status === filter.status);
    if (filter.tag) list = list.filter((p) => p.tags.includes(filter.tag));
    return {
      projects: list,
      byStatus: groupBy(list, (p) => p.status),
      byYear: groupBy(list, (p) => String(p.year)),
      avgComplexity: Math.round(list.reduce((s, p) => s + p.complexity, 0) / (list.length || 1)),
      totalModels: list.reduce((s, p) => s + p.prisma.models, 0),
      totalServices: list.reduce((s, p) => s + p.infra.services, 0),
      totalPods: list.reduce((s, p) => s + p.infra.k8sPods, 0),
    };
  });

/** Fetch enriched Prisma infra snapshot */
const ingressPrisma = () =>
  _delay(60).then(() => toPrismaMeta(PRISMA_REGISTRY));

/** Fetch enriched certification metadata */
const ingressCerts = () =>
  _delay(70).then(() => toCertMeta(CERT_REGISTRY));

/** Fetch enriched academic + LeetCode metadata */
const ingressAcademic = () =>
  _delay(50).then(() => toAcademicMeta(ACADEMIC_REGISTRY));

/** Fetch everything in parallel — returns full registry snapshot */
const ingressAll = () =>
  Promise.all([
    ingressSkills(),
    ingressProjects(),
    ingressPrisma(),
    ingressCerts(),
    ingressAcademic(),
  ]).then(([skillData, projectData, prisma, certs, academic]) => ({
    ...skillData,
    ...projectData,
    prisma,
    certs,
    academic,
    globalStats: toGlobalStats(skillData.skills, projectData.projects),
    meta: { version: REGISTRY_VERSION, generatedAt: new Date().toISOString(), yrsExp: YRS_EXP },
  }));

/** Fetch a single skill by id */
const ingressSkillById = (id) =>
  _delay(20).then(() => {
    const skill = SKILL_REGISTRY.find((s) => s.id === id) ?? null;
    return skill ? { skill, level: resolveLevel(skill.pct) } : null;
  });

/** Fetch a single project by id */
const ingressProjectById = (id) =>
  _delay(20).then(() => PROJECT_REGISTRY.find((p) => p.id === id) ?? null);

// ═══════════════════════════════════════════════════════════════════════════
//  NAMED EXPORTS
// ═══════════════════════════════════════════════════════════════════════════
export {
  // Ingress API (primary interface)
  ingressAll,
  ingressSkills,
  ingressProjects,
  ingressPrisma,
  ingressCerts,
  ingressAcademic,
  ingressSkillById,
  ingressProjectById,

  // Transformers (re-usable)
  groupBy,
  resolveLevel,
  toDomainSummary,
  toGlobalStats,
  toPrismaMeta,
  toCertMeta,
  toAcademicMeta,

  // Raw registries (read-only; prefer ingress functions)
  SKILL_REGISTRY,
  PROJECT_REGISTRY,
  PRISMA_REGISTRY,
  CERT_REGISTRY,
  ACADEMIC_REGISTRY,

  // Constants
  DOMAIN,
  MASTERY,
  PROVIDER,
  STATUS,
  REGISTRY_VERSION,
  CAREER_START,
  YRS_EXP,
  LEETCODE_SOLVED,
};

export default ingressAll;