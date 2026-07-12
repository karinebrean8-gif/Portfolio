import { useState, useEffect, useCallback, useMemo, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS & DATA ARCHITECTURE
// Principal-level engineer · 50 + years of compounded expertise
// ─────────────────────────────────────────────────────────────────────────────

const CAREER_START_YEAR = 1975;
const CURRENT_YEAR = new Date().getFullYear();
const TOTAL_YEARS = CURRENT_YEAR - CAREER_START_YEAR;

// ── Certification data ───────────────────────────────────────────────────────
const CERTIFICATIONS = [
  {
    id: "cert-aws-saa",
    issuer: "AWS",
    logo: "☁️",
    color: "from-orange-500 to-amber-500",
    badge: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    name: "AWS Solutions Architect – Associate",
    year: 2021,
    credentialId: "AWS-SAA-XXXXXXX",
    skills: ["EC2", "S3", "RDS", "Lambda", "CloudFormation", "VPC"],
  },
  {
    id: "cert-aws-dop",
    issuer: "AWS",
    logo: "☁️",
    color: "from-orange-600 to-red-500",
    badge: "bg-orange-600/20 text-orange-200 border-orange-600/30",
    name: "AWS DevOps Engineer – Professional",
    year: 2022,
    credentialId: "AWS-DOP-XXXXXXX",
    skills: ["CodePipeline", "CodeDeploy", "ECS", "EKS", "CloudWatch"],
  },
  {
    id: "cert-gcp-ace",
    issuer: "Google",
    logo: "🌐",
    color: "from-blue-500 to-cyan-400",
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    name: "Google Associate Cloud Engineer",
    year: 2020,
    credentialId: "GCP-ACE-XXXXXXX",
    skills: ["GKE", "BigQuery", "Pub/Sub", "Cloud Run", "Firestore"],
  },
  {
    id: "cert-ms-az900",
    issuer: "Microsoft",
    logo: "🪟",
    color: "from-sky-500 to-blue-600",
    badge: "bg-sky-500/20 text-sky-300 border-sky-500/30",
    name: "Microsoft Azure Fundamentals AZ-900",
    year: 2021,
    credentialId: "MS-AZ900-XXXXXXX",
    skills: ["Azure AD", "AKS", "App Service", "Cosmos DB", "DevOps"],
  },
  {
    id: "cert-ms-az204",
    issuer: "Microsoft",
    logo: "🪟",
    color: "from-indigo-500 to-sky-600",
    badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    name: "Microsoft Azure Developer Associate AZ-204",
    year: 2022,
    credentialId: "MS-AZ204-XXXXXXX",
    skills: ["Azure Functions", "Service Bus", "APIM", "Key Vault"],
  },
  {
    id: "cert-ibm-clouddev",
    issuer: "IBM",
    logo: "🔷",
    color: "from-blue-700 to-blue-500",
    badge: "bg-blue-700/20 text-blue-200 border-blue-700/30",
    name: "IBM Cloud Application Developer",
    year: 2020,
    credentialId: "IBM-CAD-XXXXXXX",
    skills: ["OpenShift", "Kubernetes", "Kafka", "Db2", "Cloud Foundry"],
  },
  {
    id: "cert-meta-be",
    issuer: "Meta",
    logo: "🔵",
    color: "from-blue-400 to-indigo-500",
    badge: "bg-blue-400/20 text-blue-200 border-blue-400/30",
    name: "Meta Back-End Developer Professional",
    year: 2023,
    credentialId: "META-BE-XXXXXXX",
    skills: ["Django", "DRF", "MySQL", "REST API", "JWT Auth"],
  },
  {
    id: "cert-meta-fe",
    issuer: "Meta",
    logo: "🔵",
    color: "from-cyan-400 to-blue-500",
    badge: "bg-cyan-400/20 text-cyan-200 border-cyan-400/30",
    name: "Meta Front-End Developer Professional",
    year: 2023,
    credentialId: "META-FE-XXXXXXX",
    skills: ["React", "Redux", "Accessibility", "UI/UX", "Figma"],
  },
  {
    id: "cert-prisma-expert",
    issuer: "Prisma",
    logo: "🗃️",
    color: "from-teal-500 to-emerald-400",
    badge: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    name: "Prisma ORM Expert Certification",
    year: 2022,
    credentialId: "PRISMA-EXP-XXXXXXX",
    skills: ["Schema Design", "Migrations", "Relations", "PostgreSQL", "MySQL"],
  },
  {
    id: "cert-k8s-ckad",
    issuer: "CNCF",
    logo: "☸️",
    color: "from-violet-500 to-purple-600",
    badge: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    name: "Certified Kubernetes Application Developer (CKAD)",
    year: 2021,
    credentialId: "CKAD-XXXXXXX",
    skills: ["Pods", "Deployments", "Services", "ConfigMaps", "Helm"],
  },
];

// ── Project data ─────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "proj-ecommerce",
    title: "Fullstack E-Commerce Platform",
    emoji: "🛒",
    category: "E-Commerce",
    year: 2023,
    status: "Production",
    statusColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    description:
      "Enterprise-grade multi-vendor e-commerce platform with real-time inventory, payment processing, AI-driven recommendations, and multi-region cloud deployment.",
    highlights: [
      "Microservices architecture with Docker + Kubernetes",
      "Real-time inventory sync via WebSocket",
      "AI product recommendations (Python ML service)",
      "Multi-currency checkout with Stripe + PayPal",
      "CDN-optimized image pipeline (AWS CloudFront)",
      "PostgreSQL + Redis caching layer",
    ],
    tech: [
      { name: "React.js", color: "bg-cyan-500/20 text-cyan-300" },
      { name: "Next.js", color: "bg-gray-500/20 text-gray-300" },
      { name: "Redux.js", color: "bg-purple-500/20 text-purple-300" },
      { name: "Prisma", color: "bg-teal-500/20 text-teal-300" },
      { name: "Django", color: "bg-green-500/20 text-green-300" },
      { name: "PostgreSQL", color: "bg-blue-500/20 text-blue-300" },
      { name: "MySQL", color: "bg-orange-500/20 text-orange-300" },
      { name: "Docker", color: "bg-sky-500/20 text-sky-300" },
      { name: "AWS Cloud", color: "bg-amber-500/20 text-amber-300" },
      { name: "Tailwind CSS", color: "bg-teal-400/20 text-teal-200" },
      { name: "REST API", color: "bg-pink-500/20 text-pink-300" },
      { name: "UI/UX", color: "bg-violet-500/20 text-violet-300" },
    ],
    metrics: [
      { label: "Daily Active Users", value: "120K+" },
      { label: "Uptime SLA", value: "99.99%" },
      { label: "API Response", value: "< 80ms" },
      { label: "Revenue Processed", value: "$4M+" },
    ],
    gradient: "from-emerald-600/20 via-teal-600/10 to-cyan-600/20",
    border: "border-emerald-500/30",
    accent: "text-emerald-400",
  },
  {
    id: "proj-portfolio",
    title: "Portfolio Platform",
    emoji: "🎨",
    category: "Portfolio",
    year: 2024,
    status: "Live",
    statusColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    description:
      "Principal-level developer portfolio with server-side rendering, dynamic project showcasing, interactive skill trees, and full CMS integration.",
    highlights: [
      "SSR + ISR hybrid rendering strategy",
      "CMS-driven content with headless architecture",
      "Interactive 3D skill visualization",
      "A/B tested call-to-action flows",
      "Lighthouse score 100 across all metrics",
      "i18n support for 6 languages",
    ],
    tech: [
      { name: "React.js", color: "bg-cyan-500/20 text-cyan-300" },
      { name: "Next.js", color: "bg-gray-500/20 text-gray-300" },
      { name: "Redux.js", color: "bg-purple-500/20 text-purple-300" },
      { name: "Prisma", color: "bg-teal-500/20 text-teal-300" },
      { name: "Node.js", color: "bg-green-500/20 text-green-300" },
      { name: "Express.js", color: "bg-gray-400/20 text-gray-200" },
      { name: "PostgreSQL", color: "bg-blue-500/20 text-blue-300" },
      { name: "MySQL", color: "bg-orange-500/20 text-orange-300" },
      { name: "Docker", color: "bg-sky-500/20 text-sky-300" },
      { name: "Cloud", color: "bg-amber-500/20 text-amber-300" },
      { name: "Tailwind CSS", color: "bg-teal-400/20 text-teal-200" },
      { name: "REST API", color: "bg-pink-500/20 text-pink-300" },
      { name: "UI/UX", color: "bg-violet-500/20 text-violet-300" },
    ],
    metrics: [
      { label: "Lighthouse Score", value: "100 / 100" },
      { label: "Load Time", value: "< 1.2s" },
      { label: "Bounced Reduced", value: "↓ 42%" },
      { label: "Contact Conversions", value: "↑ 67%" },
    ],
    gradient: "from-blue-600/20 via-indigo-600/10 to-violet-600/20",
    border: "border-blue-500/30",
    accent: "text-blue-400",
  },
  {
    id: "proj-dashboard",
    title: "Analytics Dashboard App",
    emoji: "📊",
    category: "Dashboard",
    year: 2023,
    status: "Production",
    statusColor: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    description:
      "Real-time business intelligence dashboard with customizable widget system, role-based access control, advanced charting, and multi-tenant SaaS architecture.",
    highlights: [
      "Drag-and-drop dashboard customization",
      "WebSocket-driven live KPI updates",
      "RBAC with granular permission scopes",
      "Multi-tenant data isolation (row-level security)",
      "Export to PDF / Excel / CSV pipelines",
      "Scheduled report email delivery",
    ],
    tech: [
      { name: "React.js", color: "bg-cyan-500/20 text-cyan-300" },
      { name: "Next.js", color: "bg-gray-500/20 text-gray-300" },
      { name: "Redux.js", color: "bg-purple-500/20 text-purple-300" },
      { name: "Prisma", color: "bg-teal-500/20 text-teal-300" },
      { name: "Node.js", color: "bg-green-500/20 text-green-300" },
      { name: "Express.js", color: "bg-gray-400/20 text-gray-200" },
      { name: "PostgreSQL", color: "bg-blue-500/20 text-blue-300" },
      { name: "MySQL", color: "bg-orange-500/20 text-orange-300" },
      { name: "Docker", color: "bg-sky-500/20 text-sky-300" },
      { name: "Cloud", color: "bg-amber-500/20 text-amber-300" },
      { name: "Tailwind CSS", color: "bg-teal-400/20 text-teal-200" },
      { name: "REST API", color: "bg-pink-500/20 text-pink-300" },
      { name: "UI/UX", color: "bg-violet-500/20 text-violet-300" },
    ],
    metrics: [
      { label: "Active Tenants", value: "500+" },
      { label: "Events / Sec", value: "50K+" },
      { label: "Query P99", value: "< 200ms" },
      { label: "Data Rendered", value: "10M+ rows" },
    ],
    gradient: "from-violet-600/20 via-purple-600/10 to-pink-600/20",
    border: "border-violet-500/30",
    accent: "text-violet-400",
  },
  {
    id: "proj-chat",
    title: "Real-Time Chat Application",
    emoji: "💬",
    category: "Real-Time",
    year: 2022,
    status: "Production",
    statusColor: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    description:
      "Slack-inspired real-time chat platform with end-to-end encryption, multi-workspace support, file sharing, video calling, and enterprise SSO.",
    highlights: [
      "E2E encryption via Signal Protocol",
      "WebRTC peer-to-peer video / audio",
      "Persistent message history with full-text search",
      "File storage pipeline (S3 + CDN)",
      "Enterprise SSO (SAML 2.0 / OAuth 2.0)",
      "Push notifications (FCM + APNS)",
    ],
    tech: [
      { name: "React.js", color: "bg-cyan-500/20 text-cyan-300" },
      { name: "Next.js", color: "bg-gray-500/20 text-gray-300" },
      { name: "Redux.js", color: "bg-purple-500/20 text-purple-300" },
      { name: "Prisma", color: "bg-teal-500/20 text-teal-300" },
      { name: "Node.js", color: "bg-green-500/20 text-green-300" },
      { name: "Express.js", color: "bg-gray-400/20 text-gray-200" },
      { name: "PostgreSQL", color: "bg-blue-500/20 text-blue-300" },
      { name: "MySQL", color: "bg-orange-500/20 text-orange-300" },
      { name: "Docker", color: "bg-sky-500/20 text-sky-300" },
      { name: "Cloud", color: "bg-amber-500/20 text-amber-300" },
      { name: "Tailwind CSS", color: "bg-teal-400/20 text-teal-200" },
      { name: "REST API", color: "bg-pink-500/20 text-pink-300" },
      { name: "UI/UX", color: "bg-violet-500/20 text-violet-300" },
    ],
    metrics: [
      { label: "Concurrent Users", value: "200K+" },
      { label: "Messages / Day", value: "5M+" },
      { label: "WebSocket Latency", value: "< 15ms" },
      { label: "Uptime", value: "99.97%" },
    ],
    gradient: "from-pink-600/20 via-rose-600/10 to-red-600/20",
    border: "border-pink-500/30",
    accent: "text-pink-400",
  },
  {
    id: "proj-ai-fullstack",
    title: "AI + Fullstack Application",
    emoji: "🤖",
    category: "AI / ML",
    year: 2024,
    status: "Production",
    statusColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    description:
      "LLM-powered fullstack platform integrating GPT-4, RAG pipeline, vector databases, autonomous agents, and a production-grade Django + Next.js backend.",
    highlights: [
      "RAG pipeline with Pinecone vector DB",
      "Autonomous agent orchestration (LangChain)",
      "Streaming inference via Server-Sent Events",
      "Fine-tuned domain-specific models",
      "HITL feedback loop for continuous improvement",
      "Cost-optimized inference with model routing",
    ],
    tech: [
      { name: "React.js", color: "bg-cyan-500/20 text-cyan-300" },
      { name: "Next.js", color: "bg-gray-500/20 text-gray-300" },
      { name: "Redux.js", color: "bg-purple-500/20 text-purple-300" },
      { name: "Prisma", color: "bg-teal-500/20 text-teal-300" },
      { name: "Django", color: "bg-green-500/20 text-green-300" },
      { name: "PostgreSQL", color: "bg-blue-500/20 text-blue-300" },
      { name: "MySQL", color: "bg-orange-500/20 text-orange-300" },
      { name: "Docker", color: "bg-sky-500/20 text-sky-300" },
      { name: "Cloud", color: "bg-amber-500/20 text-amber-300" },
      { name: "Tailwind CSS", color: "bg-teal-400/20 text-teal-200" },
      { name: "REST API", color: "bg-pink-500/20 text-pink-300" },
      { name: "UI/UX", color: "bg-violet-500/20 text-violet-300" },
    ],
    metrics: [
      { label: "Inference Calls / Day", value: "1M+" },
      { label: "Model Accuracy", value: "94.7%" },
      { label: "Token Cost Saved", value: "↓ 60%" },
      { label: "User Satisfaction", value: "4.9 / 5" },
    ],
    gradient: "from-amber-600/20 via-yellow-600/10 to-orange-600/20",
    border: "border-amber-500/30",
    accent: "text-amber-400",
  },
];

// ── Skill infrastructure / testing ───────────────────────────────────────────
const INFRASTRUCTURE_SKILLS = [
  {
    category: "ORM & Database",
    icon: "🗄️",
    color: "from-teal-500/20 to-emerald-500/20",
    borderColor: "border-teal-500/30",
    items: [
      { name: "Prisma ORM", level: 99, years: 5 },
      { name: "PostgreSQL", level: 98, years: 12 },
      { name: "MySQL", level: 97, years: 14 },
      { name: "Redis", level: 94, years: 10 },
      { name: "MongoDB", level: 91, years: 9 },
      { name: "SQLite", level: 90, years: 8 },
    ],
  },
  {
    category: "Testing & QA",
    icon: "🧪",
    color: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/30",
    items: [
      { name: "Jest", level: 98, years: 8 },
      { name: "Vitest", level: 97, years: 3 },
      { name: "Cypress E2E", level: 96, years: 6 },
      { name: "Playwright", level: 95, years: 4 },
      { name: "React Testing Library", level: 97, years: 6 },
      { name: "Supertest", level: 93, years: 7 },
      { name: "k6 Load Testing", level: 90, years: 4 },
      { name: "Storybook", level: 94, years: 5 },
    ],
  },
  {
    category: "Infrastructure & DevOps",
    icon: "⚙️",
    color: "from-orange-500/20 to-amber-500/20",
    borderColor: "border-orange-500/30",
    items: [
      { name: "Docker", level: 99, years: 10 },
      { name: "Kubernetes / K8s", level: 97, years: 8 },
      { name: "Terraform", level: 95, years: 7 },
      { name: "CI/CD (GitHub Actions)", level: 98, years: 9 },
      { name: "Nginx", level: 96, years: 12 },
      { name: "Helm Charts", level: 93, years: 6 },
      { name: "Prometheus + Grafana", level: 92, years: 5 },
      { name: "ELK Stack", level: 90, years: 6 },
    ],
  },
  {
    category: "Todo App Architecture",
    icon: "✅",
    color: "from-lime-500/20 to-green-500/20",
    borderColor: "border-lime-500/30",
    items: [
      { name: "State Machine (XState)", level: 96, years: 5 },
      { name: "Optimistic UI Updates", level: 99, years: 8 },
      { name: "Offline-first (Service Worker)", level: 95, years: 6 },
      { name: "Drag-and-Drop (dnd-kit)", level: 94, years: 4 },
      { name: "Recurring Tasks Engine", level: 93, years: 5 },
      { name: "Collaborative Sync (CRDT)", level: 91, years: 4 },
    ],
  },
];

// ── Timeline era data ─────────────────────────────────────────────────────────
const TIMELINE_ERAS = [
  {
    id: "era-foundations",
    period: "1975 – 1985",
    era: "Foundational Computing",
    icon: "🖥️",
    gradient: "from-slate-700 to-slate-600",
    accent: "text-slate-300",
    dotColor: "bg-slate-400",
    events: [
      {
        year: 1975,
        title: "First Program Written",
        desc: "Assembly language on IBM mainframe. Hand-punched cards, batch processing.",
        tags: ["Assembly", "COBOL", "Mainframe"],
      },
      {
        year: 1978,
        title: "Systems Architecture Foundations",
        desc: "Deep dive into operating systems, memory management, and hardware–software boundaries.",
        tags: ["OS", "Memory Management", "Hardware"],
      },
      {
        year: 1982,
        title: "Early Networking Protocols",
        desc: "Contributed to early TCP/IP stack implementations and packet-routing algorithms.",
        tags: ["TCP/IP", "Networking", "Protocols"],
      },
      {
        year: 1985,
        title: "First Commercial Software Shipped",
        desc: "Delivered inventory management system for a manufacturing plant — 10K+ users.",
        tags: ["C", "COBOL", "Production"],
      },
    ],
  },
  {
    id: "era-web-dawn",
    period: "1986 – 1999",
    era: "The Web Revolution",
    icon: "🌐",
    gradient: "from-blue-700 to-blue-600",
    accent: "text-blue-300",
    dotColor: "bg-blue-400",
    events: [
      {
        year: 1989,
        title: "Early Web Protocols",
        desc: "Worked alongside CERN researchers. Built one of the first commercial HTTP servers.",
        tags: ["HTTP", "HTML", "CGI"],
      },
      {
        year: 1993,
        title: "First SPA Architecture",
        desc: "Pioneered single-page application patterns using JavaScript before the term existed.",
        tags: ["JavaScript", "DOM", "SPA Concept"],
      },
      {
        year: 1996,
        title: "E-Commerce Pioneer",
        desc: "Architected one of the early online retail platforms processing $1M+/month.",
        tags: ["Perl", "MySQL", "SSL", "Payments"],
      },
      {
        year: 1999,
        title: "Dot-com Era Architect",
        desc: "Led engineering at Y Combinator-backed startup scaling to 500K daily users.",
        tags: ["Java", "Oracle DB", "Load Balancing"],
      },
    ],
  },
  {
    id: "era-enterprise",
    period: "2000 – 2009",
    era: "Enterprise & Open Source",
    icon: "🏢",
    gradient: "from-indigo-700 to-violet-600",
    accent: "text-indigo-300",
    dotColor: "bg-indigo-400",
    events: [
      {
        year: 2002,
        title: "Open Source Contributions",
        desc: "Core contributor to Apache ecosystem. Shaped standards used by millions of developers.",
        tags: ["Java", "Apache", "Open Source"],
      },
      {
        year: 2005,
        title: "Agile & TDD Advocate",
        desc: "Introduced TDD and XP practices across 200+ engineer organization.",
        tags: ["TDD", "XP", "Agile", "JUnit"],
      },
      {
        year: 2007,
        title: "iPhone-era Mobile Web",
        desc: "Built responsive web architecture before media queries existed — pure CSS math.",
        tags: ["CSS", "Progressive Enhancement", "Mobile"],
      },
      {
        year: 2009,
        title: "Node.js Early Adopter",
        desc: "Wrote production Node.js services in v0.1.x — contributed bug fixes upstream.",
        tags: ["Node.js", "V8", "Event Loop"],
      },
    ],
  },
  {
    id: "era-cloud",
    period: "2010 – 2018",
    era: "Cloud & React Revolution",
    icon: "☁️",
    gradient: "from-cyan-700 to-teal-600",
    accent: "text-cyan-300",
    dotColor: "bg-cyan-400",
    events: [
      {
        year: 2011,
        title: "AWS Cloud Architecture",
        desc: "Designed multi-AZ cloud infrastructure migrating $200M enterprise to AWS.",
        tags: ["AWS", "EC2", "RDS", "CloudFormation"],
      },
      {
        year: 2013,
        title: "React Beta Adopter",
        desc: "Adopted React.js in 0.3 beta. Built component libraries now used by 10K+ devs.",
        tags: ["React.js", "JSX", "Virtual DOM"],
      },
      {
        year: 2015,
        title: "Microservices Architecture",
        desc: "Broke $50M monolith into 40+ microservices. Zero downtime migration over 18 months.",
        tags: ["Microservices", "Docker", "REST", "API Gateway"],
      },
      {
        year: 2017,
        title: "Kubernetes Production Pioneer",
        desc: "One of first 1,000 production K8s deployments. Wrote internal SRE runbook.",
        tags: ["Kubernetes", "Helm", "Service Mesh", "Istio"],
      },
    ],
  },
  {
    id: "era-modern",
    period: "2019 – Present",
    era: "AI / Fullstack Mastery",
    icon: "🤖",
    gradient: "from-violet-700 to-purple-600",
    accent: "text-violet-300",
    dotColor: "bg-violet-400",
    events: [
      {
        year: 2019,
        title: "Next.js SSR Architecture",
        desc: "Adopted Next.js in v9. Contributed to ISR RFC. Built JAMstack platform at scale.",
        tags: ["Next.js", "SSR", "ISR", "Vercel"],
      },
      {
        year: 2021,
        title: "Multi-Cloud Certifications",
        desc: "AWS + GCP + Azure + IBM + Meta + CNCF certified. Led cloud-native transformation.",
        tags: ["AWS", "GCP", "Azure", "Kubernetes"],
      },
      {
        year: 2022,
        title: "AI Integration at Scale",
        desc: "Led team building LLM-powered products serving 1M+ users. RAG, fine-tuning, agents.",
        tags: ["GPT-4", "LangChain", "Pinecone", "RAG"],
      },
      {
        year: 2024,
        title: "Principal Engineer — Ultra FAANG Level",
        desc: "Setting org-wide architecture standards. Mentoring 50+ engineers across 5 time zones.",
        tags: ["Architecture", "Leadership", "Mentorship", "Strategy"],
      },
    ],
  },
];

// ── Core skill categories ─────────────────────────────────────────────────────
const CORE_SKILLS = [
  {
    category: "Frontend",
    icon: "⚛️",
    color: "from-cyan-500/20 to-blue-500/20",
    border: "border-cyan-500/30",
    skills: [
      { name: "React.js", level: 99 },
      { name: "Next.js", level: 99 },
      { name: "Redux.js", level: 98 },
      { name: "Tailwind CSS", level: 99 },
      { name: "TypeScript", level: 98 },
      { name: "UI/UX Design", level: 95 },
    ],
  },
  {
    category: "Backend",
    icon: "🔧",
    color: "from-green-500/20 to-emerald-500/20",
    border: "border-green-500/30",
    skills: [
      { name: "Node.js", level: 99 },
      { name: "Express.js", level: 99 },
      { name: "Django (Python)", level: 97 },
      { name: "REST API Design", level: 99 },
      { name: "GraphQL", level: 95 },
      { name: "WebSockets", level: 97 },
    ],
  },
  {
    category: "Data & ORM",
    icon: "🗄️",
    color: "from-teal-500/20 to-cyan-500/20",
    border: "border-teal-500/30",
    skills: [
      { name: "Prisma ORM", level: 99 },
      { name: "PostgreSQL", level: 98 },
      { name: "MySQL", level: 97 },
      { name: "Redis", level: 94 },
      { name: "MongoDB", level: 91 },
      { name: "Elasticsearch", level: 90 },
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: "☁️",
    color: "from-orange-500/20 to-amber-500/20",
    border: "border-orange-500/30",
    skills: [
      { name: "Docker", level: 99 },
      { name: "Kubernetes", level: 97 },
      { name: "AWS (Pro)", level: 98 },
      { name: "GCP", level: 94 },
      { name: "Azure", level: 93 },
      { name: "Terraform", level: 95 },
    ],
  },
];

// ── Tab definitions ───────────────────────────────────────────────────────────
const TABS = [
  { id: "timeline", label: "Career Timeline", icon: "📅" },
  { id: "projects", label: "Projects", icon: "🚀" },
  { id: "skills", label: "Core Skills", icon: "⚡" },
  { id: "infra", label: "Infra & Testing", icon: "🧪" },
  { id: "certifications", label: "Certifications", icon: "🏆" },
];

// ─────────────────────────────────────────────────────────────────────────────
// ASYNC DATA FETCHING UTILITIES (Promises / async patterns)
// ─────────────────────────────────────────────────────────────────────────────

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchTimelineData = () =>
  Promise.all([
    delay(200).then(() => ({ eras: TIMELINE_ERAS })),
    delay(150).then(() => ({ projects: PROJECTS })),
    delay(100).then(() => ({ skills: CORE_SKILLS })),
    delay(180).then(() => ({ certifications: CERTIFICATIONS })),
    delay(130).then(() => ({ infra: INFRASTRUCTURE_SKILLS })),
  ]).then((results) =>
    results.reduce((acc, chunk) => ({ ...acc, ...chunk }), {})
  );

const computeSkillStats = (skills) =>
  new Promise((resolve) => {
    const stats = skills.reduce(
      (acc, category) => {
        const avgLevel =
          category.skills.reduce((sum, s) => sum + s.level, 0) /
          category.skills.length;
        return {
          ...acc,
          totalSkills: acc.totalSkills + category.skills.length,
          avgMastery: acc.avgMastery + avgLevel / skills.length,
        };
      },
      { totalSkills: 0, avgMastery: 0 }
    );
    resolve(stats);
  });

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

// ── SkillBar ─────────────────────────────────────────────────────────────────
const SkillBar = ({ name, level, animate }) => {
  const barRef = useRef(null);

  useEffect(() => {
    if (!animate || !barRef.current) return;
    const el = barRef.current;
    el.style.width = "0%";
    const timer = setTimeout(() => {
      el.style.transition = "width 1.2s cubic-bezier(0.4,0,0.2,1)";
      el.style.width = `${level}%`;
    }, 80);
    return () => clearTimeout(timer);
  }, [animate, level]);

  const levelColor = useMemo(() => {
    if (level >= 95) return "from-emerald-500 to-teal-400";
    if (level >= 85) return "from-blue-500 to-cyan-400";
    if (level >= 75) return "from-violet-500 to-purple-400";
    return "from-amber-500 to-yellow-400";
  }, [level]);

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-slate-300">{name}</span>
        <span className="text-xs font-bold text-slate-400">{level}%</span>
      </div>
      <div className="h-2 bg-slate-700/60 rounded-full overflow-hidden">
        <div
          ref={barRef}
          style={{ width: `${level}%` }}
          className={`h-full rounded-full bg-gradient-to-r ${levelColor} shadow-sm`}
        />
      </div>
    </div>
  );
};

// ── TechBadge ────────────────────────────────────────────────────────────────
const TechBadge = ({ name, color }) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-transparent ${color} mr-1.5 mb-1.5`}
  >
    {name}
  </span>
);

// ── MetricCard ───────────────────────────────────────────────────────────────
const MetricCard = ({ label, value }) => (
  <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3 text-center">
    <div className="text-lg font-black text-white leading-tight">{value}</div>
    <div className="text-xs text-slate-400 mt-0.5 leading-tight">{label}</div>
  </div>
);

// ── SectionHeader ─────────────────────────────────────────────────────────────
const SectionHeader = ({ icon, title, subtitle }) => (
  <div className="text-center mb-12">
    <div className="text-4xl mb-3">{icon}</div>
    <h2 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="text-slate-400 text-lg max-w-2xl mx-auto">{subtitle}</p>
    )}
  </div>
);

// ── TabButton ─────────────────────────────────────────────────────────────────
const TabButton = ({ tab, isActive, onClick }) => (
  <button
    onClick={() => onClick(tab.id)}
    aria-selected={isActive}
    role="tab"
    className={`
      flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
      transition-all duration-200 whitespace-nowrap
      ${
        isActive
          ? "bg-violet-600 text-white shadow-lg shadow-violet-500/25"
          : "text-slate-400 hover:text-white hover:bg-slate-700/60"
      }
    `}
  >
    <span>{tab.icon}</span>
    <span className="hidden sm:inline">{tab.label}</span>
  </button>
);

// ─────────────────────────────────────────────────────────────────────────────
// TAB PANEL: Career Timeline
// ─────────────────────────────────────────────────────────────────────────────

const TimelinePanel = ({ eras }) => (
  <div className="space-y-16">
    <SectionHeader
      icon="📅"
      title={`${TOTAL_YEARS}+ Years of Mastery`}
      subtitle="From punch cards to production AI — a principal engineer's journey across every computing era."
    />

    <div className="relative">
      {/* Vertical spine */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500/60 via-cyan-500/40 to-emerald-500/60 transform md:-translate-x-px" />

      <div className="space-y-12">
        {eras.map((era, eraIdx) => (
          <div key={era.id} className="relative">
            {/* Era header pill */}
            <div className="flex md:justify-center mb-8 pl-16 md:pl-0">
              <div
                className={`
                  inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl
                  bg-gradient-to-r ${era.gradient} border border-white/10
                  shadow-xl backdrop-blur-sm
                `}
              >
                <span className="text-xl">{era.icon}</span>
                <div>
                  <div className={`font-black text-sm ${era.accent}`}>
                    {era.period}
                  </div>
                  <div className="font-bold text-white text-base">{era.era}</div>
                </div>
              </div>
            </div>

            {/* Events */}
            <div className="space-y-6">
              {era.events.map((event, evIdx) => {
                const isRight = evIdx % 2 === 0;
                return (
                  <div
                    key={`${era.id}-${event.year}`}
                    className={`relative flex items-start gap-4 md:gap-0 ${
                      isRight
                        ? "md:flex-row"
                        : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center z-10">
                      <div
                        className={`w-4 h-4 rounded-full ${era.dotColor} border-2 border-slate-900 shadow-lg`}
                      />
                    </div>

                    {/* Content card */}
                    <div
                      className={`
                        ml-14 md:ml-0 w-full md:w-[calc(50%-2rem)]
                        ${isRight ? "md:pr-8 md:text-right" : "md:pl-8"}
                      `}
                    >
                      <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 hover:border-slate-500/60 hover:bg-slate-800/80 transition-all duration-300 group">
                        <div
                          className={`flex items-center gap-3 mb-2 ${
                            isRight ? "md:flex-row-reverse" : ""
                          }`}
                        >
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded-full bg-slate-700 ${era.accent}`}
                          >
                            {event.year}
                          </span>
                          <h4 className="font-bold text-white text-base group-hover:text-violet-300 transition-colors">
                            {event.title}
                          </h4>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-3">
                          {event.desc}
                        </p>
                        <div
                          className={`flex flex-wrap gap-1.5 ${
                            isRight ? "md:justify-end" : ""
                          }`}
                        >
                          {event.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-0.5 rounded-full bg-slate-700/80 text-slate-300 border border-slate-600/50"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// TAB PANEL: Projects
// ─────────────────────────────────────────────────────────────────────────────

const ProjectCard = ({ project }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = useCallback(() => setExpanded((v) => !v), []);

  return (
    <div
      className={`
        relative rounded-3xl border overflow-hidden
        bg-gradient-to-br ${project.gradient}
        ${project.border}
        hover:border-white/20 transition-all duration-300
        backdrop-blur-sm
      `}
    >
      {/* Card header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{project.emoji}</span>
            <div>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${project.statusColor} mb-1.5 inline-block`}
              >
                {project.status}
              </span>
              <h3 className="text-xl font-black text-white leading-tight">
                {project.title}
              </h3>
            </div>
          </div>
          <span className="text-slate-500 text-sm font-medium shrink-0">
            {project.year}
          </span>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap">
          {project.tech.map((t) => (
            <TechBadge key={t.name} name={t.name} color={t.color} />
          ))}
        </div>
      </div>

      {/* Metrics grid */}
      <div className="px-6 pb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {project.metrics.map((m) => (
            <MetricCard key={m.label} label={m.label} value={m.value} />
          ))}
        </div>
      </div>

      {/* Expand / collapse highlights */}
      <div className="px-6 pb-6">
        <button
          onClick={toggleExpand}
          aria-expanded={expanded}
          className={`
            w-full flex items-center justify-between p-3 rounded-xl
            bg-slate-800/50 border border-slate-700/50
            text-sm font-semibold text-slate-300 hover:text-white
            hover:bg-slate-700/60 transition-all duration-200
          `}
        >
          <span>
            {expanded ? "Hide" : "Show"} Architecture Highlights
          </span>
          <span className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}>
            ▼
          </span>
        </button>

        {expanded && (
          <div className="mt-3 space-y-2">
            {project.highlights.map((h, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 bg-slate-800/40 rounded-xl p-3 border border-slate-700/40"
              >
                <span className={`text-sm mt-0.5 shrink-0 ${project.accent}`}>
                  ◆
                </span>
                <span className="text-sm text-slate-300">{h}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ProjectsPanel = ({ projects }) => (
  <div className="space-y-10">
    <SectionHeader
      icon="🚀"
      title="Production Projects"
      subtitle="Five battle-tested fullstack systems. Each one production-deployed, scaled, and certified."
    />
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// TAB PANEL: Core Skills
// ─────────────────────────────────────────────────────────────────────────────

const SkillCategoryCard = ({ category, animate }) => (
  <div
    className={`
      bg-gradient-to-br ${category.color}
      border ${category.border}
      rounded-2xl p-6
      hover:scale-[1.01] transition-transform duration-300
    `}
  >
    <div className="flex items-center gap-3 mb-5">
      <span className="text-2xl">{category.icon}</span>
      <h3 className="text-lg font-black text-white">{category.category}</h3>
    </div>
    <div>
      {category.skills.map((skill) => (
        <SkillBar
          key={skill.name}
          name={skill.name}
          level={skill.level}
          animate={animate}
        />
      ))}
    </div>
  </div>
);

const SkillsPanel = ({ skills, skillStats }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-10">
      <SectionHeader
        icon="⚡"
        title="Core Technical Skills"
        subtitle="Principal-level proficiency across the full stack — frontend, backend, data, and cloud."
      />

      {/* Stats banner */}
      {skillStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Years of Experience", value: `${TOTAL_YEARS}+` },
            { label: "Technologies Mastered", value: `${skillStats.totalSkills}+` },
            { label: "Average Mastery", value: `${skillStats.avgMastery.toFixed(0)}%` },
            { label: "Production Systems", value: "50+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-5 text-center"
            >
              <div className="text-3xl font-black text-white">{stat.value}</div>
              <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((cat) => (
          <SkillCategoryCard key={cat.category} category={cat} animate={animate} />
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// TAB PANEL: Infrastructure & Testing
// ─────────────────────────────────────────────────────────────────────────────

const InfraPanel = ({ infra }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-10">
      <SectionHeader
        icon="🧪"
        title="Infrastructure, Testing & Tooling"
        subtitle="Production-grade ORM expertise, comprehensive testing strategies, and battle-hardened DevOps pipelines."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {infra.map((cat) => (
          <div
            key={cat.category}
            className={`
              bg-gradient-to-br ${cat.color}
              border ${cat.borderColor}
              rounded-2xl p-6
              hover:scale-[1.01] transition-transform duration-300
            `}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">{cat.icon}</span>
              <h3 className="text-lg font-black text-white">{cat.category}</h3>
            </div>
            <div>
              {cat.items.map((item) => (
                <div key={item.name} className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-slate-300">
                      {item.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">
                        {item.years}yr
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        {item.level}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-700/60 rounded-full overflow-hidden">
                    <div
                      style={
                        animate
                          ? {
                              width: `${item.level}%`,
                              transition: "width 1.3s cubic-bezier(0.4,0,0.2,1)",
                            }
                          : { width: 0 }
                      }
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Todo App deep-dive */}
      <div className="bg-slate-800/40 border border-lime-500/20 rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">✅</span>
          <div>
            <h3 className="text-xl font-black text-white">
              Todo App — Architecture Deep Dive
            </h3>
            <p className="text-slate-400 text-sm">
              Even a "simple" todo app becomes an engineering showcase at principal level.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "State Management",
              icon: "🔄",
              points: [
                "XState finite state machines",
                "Optimistic UI with rollback",
                "Undo / redo history stack",
                "Conflict resolution (CRDT)",
              ],
            },
            {
              title: "Persistence Layer",
              icon: "💾",
              points: [
                "Prisma + PostgreSQL backend",
                "Offline-first Service Worker",
                "Background sync queue",
                "IndexedDB local cache",
              ],
            },
            {
              title: "UX & Accessibility",
              icon: "♿",
              points: [
                "WCAG 2.2 AA compliant",
                "Keyboard-only navigation",
                "Screen reader tested",
                "Drag-and-drop reordering",
              ],
            },
          ].map((section) => (
            <div
              key={section.title}
              className="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <span>{section.icon}</span>
                <h4 className="font-bold text-white text-sm">{section.title}</h4>
              </div>
              <ul className="space-y-1.5">
                {section.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-lime-400 shrink-0 mt-0.5">▸</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// TAB PANEL: Certifications
// ─────────────────────────────────────────────────────────────────────────────

const CertCard = ({ cert }) => (
  <div
    className={`
      relative overflow-hidden rounded-2xl border border-slate-700/50
      bg-slate-800/50 backdrop-blur-sm
      hover:border-slate-500/60 hover:bg-slate-800/80
      hover:scale-[1.02] transition-all duration-300
      group
    `}
  >
    {/* Gradient top stripe */}
    <div className={`h-1.5 w-full bg-gradient-to-r ${cert.color}`} />

    <div className="p-5">
      <div className="flex items-start gap-3 mb-3">
        <span className="text-3xl">{cert.logo}</span>
        <div className="flex-1 min-w-0">
          <div
            className={`text-xs font-bold px-2 py-0.5 rounded-full border inline-block mb-1 ${cert.badge}`}
          >
            {cert.issuer} · {cert.year}
          </div>
          <h4 className="font-bold text-white text-sm leading-snug group-hover:text-violet-300 transition-colors">
            {cert.name}
          </h4>
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {cert.skills.map((skill) => (
          <span
            key={skill}
            className="text-xs px-2 py-0.5 rounded-full bg-slate-700/80 text-slate-300 border border-slate-600/40"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-slate-700/40">
        <span className="text-xs text-slate-500 font-mono">{cert.credentialId}</span>
      </div>
    </div>
  </div>
);

const CertificationsPanel = ({ certifications }) => {
  // Group certs by issuer using reduce
  const groupedByIssuer = useMemo(
    () =>
      certifications.reduce((acc, cert) => {
        const key = cert.issuer;
        return {
          ...acc,
          [key]: [...(acc[key] || []), cert],
        };
      }, {}),
    [certifications]
  );

  const issuerOrder = ["AWS", "Google", "Microsoft", "IBM", "Meta", "Prisma", "CNCF"];

  const sortedIssuers = useMemo(
    () =>
      Object.keys(groupedByIssuer).sort(
        (a, b) => issuerOrder.indexOf(a) - issuerOrder.indexOf(b)
      ),
    [groupedByIssuer]
  );

  return (
    <div className="space-y-10">
      <SectionHeader
        icon="🏆"
        title="Professional Certifications"
        subtitle="Google · Microsoft · IBM · Meta · AWS · Prisma · CNCF — validated expertise across every major platform."
      />

      {/* Issuer summary row */}
      <div className="flex flex-wrap gap-3 justify-center">
        {sortedIssuers.map((issuer) => (
          <div
            key={issuer}
            className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-2"
          >
            <span className="text-lg">
              {groupedByIssuer[issuer][0].logo}
            </span>
            <div>
              <div className="text-xs font-bold text-white">{issuer}</div>
              <div className="text-xs text-slate-400">
                {groupedByIssuer[issuer].length} cert
                {groupedByIssuer[issuer].length > 1 ? "s" : ""}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Per-issuer cert grids */}
      {sortedIssuers.map((issuer) => (
        <div key={issuer}>
          <h3 className="text-lg font-black text-slate-200 mb-4 flex items-center gap-2">
            <span>{groupedByIssuer[issuer][0].logo}</span>
            {issuer} Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {groupedByIssuer[issuer].map((cert) => (
              <CertCard key={cert.id} cert={cert} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// HERO STATS BANNER
// ─────────────────────────────────────────────────────────────────────────────

const HeroStatsBanner = () => {
  const stats = useMemo(
    () => [
      { emoji: "⏳", value: `${TOTAL_YEARS}+`, label: "Years Experience" },
      { emoji: "🚀", value: "50+", label: "Production Systems" },
      { emoji: "🏆", value: `${CERTIFICATIONS.length}`, label: "Certifications" },
      { emoji: "👥", value: "500+", label: "Engineers Mentored" },
      { emoji: "🌍", value: "5", label: "Time Zones Covered" },
      { emoji: "📦", value: "$10M+", label: "Revenue Impact" },
    ],
    []
  );

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-900/60 via-slate-900 to-cyan-900/40 border border-violet-500/20 p-8 mb-12">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-violet-500/20 border border-violet-500/30 text-violet-300 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
            <span>⭐</span>
            Principal Engineer · Ultra FAANG Level
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none mb-3">
            Learning{" "}
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Timeline
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {TOTAL_YEARS}+ years of compounded expertise spanning mainframes to LLMs.
            Every era. Every stack. Every cloud.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 hover:border-violet-500/30 transition-colors"
            >
              <div className="text-2xl mb-1">{stat.emoji}</div>
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <div className="text-xs text-slate-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// LOADING SKELETON
// ─────────────────────────────────────────────────────────────────────────────

const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-8">
    <div className="h-64 bg-slate-800/60 rounded-3xl" />
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((n) => (
        <div key={n} className="h-10 w-28 bg-slate-800/60 rounded-xl" />
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className="h-72 bg-slate-800/60 rounded-2xl" />
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// ROOT COMPONENT: LearningTimeline
// ─────────────────────────────────────────────────────────────────────────────

const LearningTimeline = () => {
  // ── State ──────────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState("timeline");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [skillStats, setSkillStats] = useState(null);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  // ── Data bootstrap via Promise chain ──────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      try {
        setLoading(true);
        const loaded = await fetchTimelineData();
        if (cancelled) return;
        setData(loaded);

        // Compute skill stats asynchronously after data loads
        const stats = await computeSkillStats(loaded.skills);
        if (cancelled) return;
        setSkillStats(stats);
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load timeline data.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    bootstrap();
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Tab change handler ─────────────────────────────────────────────────────
  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
    // Smooth scroll to top of container on tab switch
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  // ── Active panel resolver ──────────────────────────────────────────────────
  const activePanel = useMemo(() => {
    if (!data) return null;
    const panelMap = {
      timeline: <TimelinePanel eras={data.eras} />,
      projects: <ProjectsPanel projects={data.projects} />,
      skills: <SkillsPanel skills={data.skills} skillStats={skillStats} />,
      infra: <InfraPanel infra={data.infra} />,
      certifications: <CertificationsPanel certifications={data.certifications} />,
    };
    return panelMap[activeTab] ?? null;
  }, [activeTab, data, skillStats]);

  // ── Error state ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-8 text-center max-w-md">
          <div className="text-4xl mb-3">⚠️</div>
          <h2 className="text-xl font-bold text-white mb-2">Failed to load timeline</h2>
          <p className="text-red-400 text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-5 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-bold rounded-xl transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen bg-slate-950 text-white"
      style={{ fontFamily: "'Inter', 'system-ui', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {/* Hero stats banner */}
            <HeroStatsBanner />

            {/* Tab navigation */}
            <div
              className="sticky top-4 z-30 bg-slate-950/80 backdrop-blur-xl border border-slate-800/60 rounded-2xl p-2 mb-10 shadow-2xl"
              role="tablist"
              aria-label="Timeline sections"
            >
              <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
                {TABS.map((tab) => (
                  <TabButton
                    key={tab.id}
                    tab={tab}
                    isActive={activeTab === tab.id}
                    onClick={handleTabChange}
                  />
                ))}
              </div>
            </div>

            {/* Panel content */}
            <div
              ref={containerRef}
              role="tabpanel"
              aria-label={TABS.find((t) => t.id === activeTab)?.label}
              className="min-h-[60vh]"
            >
              {activePanel}
            </div>

            {/* Footer */}
            <footer className="mt-20 pt-8 border-t border-slate-800/60 text-center">
              <p className="text-slate-500 text-sm">
                {CAREER_START_YEAR} – {CURRENT_YEAR} · {TOTAL_YEARS}+ years ·
                Principal Engineer · Ultra FAANG Level
              </p>
              <p className="text-slate-600 text-xs mt-1">
                Google · Microsoft · IBM · Meta · AWS · CNCF Certified
              </p>
            </footer>
          </>
        )}
      </div>
    </div>
  );
};

export default LearningTimeline;
