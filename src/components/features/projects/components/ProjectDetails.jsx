import React, { useState, useEffect } from "react";

// ==========================================
// 1. ENTERPRISE DATA CONTRACTS & CONSTANTS
// ==========================================
// Static Constants for UI Badges & Tech Stack categorization to maintain DRY principle
const TECH_CATEGORIES = {
    FRONTEND: "Frontend / UX",
    BACKEND: "Backend / API",
    DATABASE: "Database / ORM",
    DEVOPS: "DevOps / Infrastructure",
};

const PROJECTS_DATA = [
    {
        id: "proj_001",
        title: "Next-Gen Enterprise E-Commerce Platform",
        tagline: "Hyper-scalable retail engine with decoupled microservices architecture.",
        description: "A high-throughput e-commerce solution engineered for sub-100ms page loads, global state sync, and containerized deployment pipelines.",
        metrics: { uptime: "99.99%", latency: "<45ms", scale: "1M+ RPM" },
        stack: [
            { name: "React.js", category: TECH_CATEGORIES.FRONTEND },
            { name: "Next.js", category: TECH_CATEGORIES.FRONTEND },
            { name: "Redux Toolkit", category: TECH_CATEGORIES.FRONTEND },
            { name: "Tailwind CSS", category: TECH_CATEGORIES.FRONTEND },
            { name: "Django", category: TECH_CATEGORIES.BACKEND },
            { name: "REST API", category: TECH_CATEGORIES.BACKEND },
            { name: "Prisma", category: TECH_CATEGORIES.DATABASE },
            { name: "PostgreSQL", category: TECH_CATEGORIES.DATABASE },
            { name: "MySQL", category: TECH_CATEGORIES.DATABASE },
            { name: "Cloud Infrastructure", category: TECH_CATEGORIES.DEVOPS },
            { name: "Docker", category: TECH_CATEGORIES.DEVOPS },
        ],
        features: [
            "Distributed cache synchronization across geographically isolated databases.",
            "Custom multi-tenant cart orchestration engine with Redux state isolation.",
            "Automated fallback routes using Next.js Incremental Static Regeneration (ISR)."
        ],
        architectureType: "Microservices & Hybrid SSR/SSG"
    },
    {
        id: "proj_002",
        title: "Immersive UI/UX Portfolio Matrix",
        tagline: "The definitive showcase of modern, atomic design systems.",
        description: "An advanced portfolio runtime designed to benchmark client-side rendering capabilities, component modularity, and smooth layout animations.",
        metrics: { lighthouseScore: "100/100", TTI: "0.4s", cls: "0" },
        stack: [
            { name: "React.js", category: TECH_CATEGORIES.FRONTEND },
            { name: "Next.js", category: TECH_CATEGORIES.FRONTEND },
            { name: "Redux Toolkit", category: TECH_CATEGORIES.FRONTEND },
            { name: "Tailwind CSS", category: TECH_CATEGORIES.FRONTEND },
            { name: "Node.js", category: TECH_CATEGORIES.BACKEND },
            { name: "Express.js", category: TECH_CATEGORIES.BACKEND },
            { name: "REST API", category: TECH_CATEGORIES.BACKEND },
            { name: "Prisma", category: TECH_CATEGORIES.DATABASE },
            { name: "PostgreSQL", category: TECH_CATEGORIES.DATABASE },
            { name: "MySQL", category: TECH_CATEGORIES.DATABASE },
            { name: "Cloud Infrastructure", category: TECH_CATEGORIES.DEVOPS },
            { name: "Docker", category: TECH_CATEGORIES.DEVOPS },
        ],
        features: [
            "Atomic architecture configuration ensuring absolute component decoupling.",
            "Advanced memory leak prevention handling complex UI transitions.",
            "Optimized assets serving over edge networks with lazy execution schemas."
        ],
        architectureType: "Atomic Clean UI Architecture"
    },
    {
        id: "proj_003",
        title: "Real-Time Operational Dashboard App",
        tagline: "Mission-critical analytical command center for streaming datasets.",
        description: "A unified enterprise control panel mapping heavy relational systems into digestible, low-latency data visualizations.",
        metrics: { throughput: "50k events/s", precision: "Realtime", security: "AES-256" },
        stack: [
            { name: "React.js", category: TECH_CATEGORIES.FRONTEND },
            { name: "Next.js", category: TECH_CATEGORIES.FRONTEND },
            { name: "Redux Toolkit", category: TECH_CATEGORIES.FRONTEND },
            { name: "Tailwind CSS", category: TECH_CATEGORIES.FRONTEND },
            { name: "Node.js", category: TECH_CATEGORIES.BACKEND },
            { name: "Express.js", category: TECH_CATEGORIES.BACKEND },
            { name: "REST API", category: TECH_CATEGORIES.BACKEND },
            { name: "Prisma", category: TECH_CATEGORIES.DATABASE },
            { name: "PostgreSQL", category: TECH_CATEGORIES.DATABASE },
            { name: "MySQL", category: TECH_CATEGORIES.DATABASE },
            { name: "Cloud Infrastructure", category: TECH_CATEGORIES.DEVOPS },
            { name: "Docker", category: TECH_CATEGORIES.DEVOPS },
        ],
        features: [
            "High-frequency polling optimizations reducing unnecessary network overhead.",
            "Dynamic column rendering mapping Prisma types directly to user-facing tables.",
            "Containerized micro-frontend strategy for dashboard modular expansion."
        ],
        architectureType: "Event-Driven Analytical UI"
    },
    {
        id: "proj_004",
        title: "Ultra-Low Latency Real-Time Chat Engine",
        tagline: "Polymorphic messaging fabric designed for global connectivity.",
        description: "An isolated communication hub minimizing message propagation times while ensuring persistent data integrity across dual-DB clusters.",
        metrics: { syncTime: "<12ms", concurrency: "250k+ active", lossRate: "0%" },
        stack: [
            { name: "React.js", category: TECH_CATEGORIES.FRONTEND },
            { name: "Next.js", category: TECH_CATEGORIES.FRONTEND },
            { name: "Redux Toolkit", category: TECH_CATEGORIES.FRONTEND },
            { name: "Tailwind CSS", category: TECH_CATEGORIES.FRONTEND },
            { name: "Node.js", category: TECH_CATEGORIES.BACKEND },
            { name: "Express.js", category: TECH_CATEGORIES.BACKEND },
            { name: "REST API", category: TECH_CATEGORIES.BACKEND },
            { name: "Prisma", category: TECH_CATEGORIES.DATABASE },
            { name: "PostgreSQL", category: TECH_CATEGORIES.DATABASE },
            { name: "MySQL", category: TECH_CATEGORIES.DATABASE },
            { name: "Cloud Infrastructure", category: TECH_CATEGORIES.DEVOPS },
            { name: "Docker", category: TECH_CATEGORIES.DEVOPS },
        ],
        features: [
            "Bi-directional event transport layer optimizing packet size efficiency.",
            "Optimistic UI updates managed through Redux pipeline for instantaneous UX.",
            "Dual-database storage optimization sorting active logs vs archival records."
        ],
        architectureType: "Reactive Pub-Sub Architecture"
    },
    {
        id: "proj_005",
        title: "AI-Augmented Fullstack Orchestrator",
        tagline: "Cognitive application platform combining LLMs with robust Python runtimes.",
        description: "A state-of-the-art computational system utilizing intelligent inference models backended by raw asynchronous Django structures.",
        metrics: { inferenceTime: "<120ms", accuracy: "99.2%", tokenEfficiency: "+40%" },
        stack: [
            { name: "React.js", category: TECH_CATEGORIES.FRONTEND },
            { name: "Next.js", category: TECH_CATEGORIES.FRONTEND },
            { name: "Redux Toolkit", category: TECH_CATEGORIES.FRONTEND },
            { name: "Tailwind CSS", category: TECH_CATEGORIES.FRONTEND },
            { name: "Django", category: TECH_CATEGORIES.BACKEND },
            { name: "REST API", category: TECH_CATEGORIES.BACKEND },
            { name: "Prisma", category: TECH_CATEGORIES.DATABASE },
            { name: "PostgreSQL", category: TECH_CATEGORIES.DATABASE },
            { name: "MySQL", category: TECH_CATEGORIES.DATABASE },
            { name: "Cloud Infrastructure", category: TECH_CATEGORIES.DEVOPS },
            { name: "Docker", category: TECH_CATEGORIES.DEVOPS },
        ],
        features: [
            "Asynchronous context streaming delivering real-time responses efficiently.",
            "Robust input validation middleware shielding downstream databases.",
            "Dynamic schema translations mapping Prisma abstractions to relational storage."
        ],
        architectureType: "Cognitive Agent & Asynchronous Micro-Engine"
    }
];

// ==========================================
// 2. ASYNC SERVICE LAYER (PROMISES)
// ==========================================
// Simulating an enterprise database fetch or API service handling raw data hydration
const fetchProjectsFromCoreRegistry = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (PROJECTS_DATA && PROJECTS_DATA.length > 0) {
                resolve(PROJECTS_DATA);
            } else {
                reject(new Error("Core registry ingestion failed: Database offline."));
            }
        }, 600); // 600ms network emulation
    });
};

// ==========================================
// 3. MAIN ARCHITECTURE VIEW COMPONENT
// ==========================================
export default function ProjectsDetails() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState("ALL");

    useEffect(() => {
        fetchProjectsFromCoreRegistry()
            .then((data) => {
                setProjects(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Filter logic using Array prototype strategies
    const filteredProjects = activeFilter === "ALL"
        ? projects
        : projects.filter(project => project.stack.some(tech => tech.category === activeFilter));

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-200 font-sans">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mb-4"></div>
                <p className="text-sm font-mono tracking-widest text-emerald-400">HYDRATING ARCHITECTURE FILES...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-950 text-rose-400 font-mono p-6">
                <div className="border border-rose-500/30 bg-rose-950/20 p-6 rounded-xl max-w-md">
                    <h3 className="text-lg font-bold mb-2">CRITICAL_REGISTRY_ERROR</h3>
                    <p className="text-sm text-slate-400">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans py-16 px-4 sm:px-6 lg:px-8 selection:bg-emerald-500/30 selection:text-emerald-300">
            <div className="max-w-7xl mx-auto">

                {/* ENTERPRISE HEADER */}
                <header className="border-b border-slate-800 pb-10 mb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                PRINCIPAL-LEVEL SYSTEM REGISTRY
                            </div>
                            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent sm:text-5xl">
                                Core Production Artifacts
                            </h1>
                            <p className="mt-3 text-lg text-slate-400 max-w-3xl">
                                A highly-optimized manifest representing decoupled systems engineering, microservices orchestration, and reactive interface structures.
                            </p>
                        </div>

                        {/* ARCHITECTURE METRICS SUMMARY */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-900/50 border border-slate-800 p-4 rounded-xl font-mono text-xs text-slate-400">
                            <div>
                                <p className="text-slate-500">ENG_EXPERIENCE</p>
                                <p className="text-sm font-bold text-white">50+ Yrs / FAANG+</p>
                            </div>
                            <div>
                                <p className="text-slate-500">DEPLOYED_NODES</p>
                                <p className="text-sm font-bold text-emerald-400">Fully Clusterized</p>
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <p className="text-slate-500">CLEAN_CODE</p>
                                <p className="text-sm font-bold text-blue-400">SOLID / High-Cohesion</p>
                            </div>
                        </div>
                    </div>

                    {/* FILTER NAVIGATION RUNTIME */}
                    <div className="mt-10 flex flex-wrap gap-2 text-xs font-mono">
                        {["ALL", ...Object.values(TECH_CATEGORIES)].map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveFilter(category)}
                                className={`px-4 py-2 rounded-lg border transition-all duration-200 ${activeFilter === category
                                        ? "bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-lg shadow-emerald-500/10"
                                        : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                                    }`}
                            >
                                {category === "ALL" ? "SYSTEMS_ALL" : category.toUpperCase().replace(/ \/ /g, "_")}
                            </button>
                        ))}
                    </div>
                </header>

                {/* PROJECTS GRID MATRIX */}
                <main className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {filteredProjects.map((project) => (
                        <article
                            key={project.id}
                            className="group relative flex flex-col justify-between bg-slate-900/40 border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-950/10 backdrop-blur-sm"
                        >
                            {/* Top Accent Line */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-transparent via-slate-800 group-hover:via-emerald-500/40 to-transparent transition-all duration-300"></div>

                            <div>
                                {/* Project Header Meta */}
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <span className="font-mono text-xs text-emerald-500 bg-emerald-950/40 border border-emerald-900 px-2.5 py-1 rounded-md">
                                        {project.architectureType}
                                    </span>
                                    <span className="font-mono text-xs text-slate-600">{project.id}</span>
                                </div>

                                {/* Project Title & Tagline */}
                                <h2 className="text-2xl font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors duration-200">
                                    {project.title}
                                </h2>
                                <p className="mt-1 text-sm font-medium text-slate-400 italic">
                                    "{project.tagline}"
                                </p>

                                {/* Primary Description */}
                                <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Dynamic Metrics Badges */}
                                <div className="mt-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800/60 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs">
                                    {Object.entries(project.metrics).map(([key, value]) => (
                                        <div key={key} className="flex gap-2">
                                            <span className="text-slate-500">{key.toUpperCase()}:</span>
                                            <span className="text-slate-300 font-bold">{value}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Features Mapping Section */}
                                <div className="mt-6">
                                    <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">Core Technical Implementations</h4>
                                    <ul className="space-y-2">
                                        {project.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start text-xs text-slate-400 gap-2">
                                                <span className="text-emerald-500 mt-0.5">▹</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Nested Tech Stack Map */}
                            <div className="mt-8 pt-6 border-t border-slate-800/60">
                                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">Engine Infrastructure Stack</h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.stack.map((tech, index) => (
                                        <span
                                            key={index}
                                            title={tech.category}
                                            className="text-[11px] font-mono px-2 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-600 transition-colors cursor-help"
                                        >
                                            {tech.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </article>
                    ))}
                </main>

                {/* FOOTER METRICS SYSTEM */}
                <footer className="mt-20 border-t border-slate-800 pt-8 text-center text-xs font-mono text-slate-500">
                    <p>SYSTEM RECONCILIATION SUCCESSFUL // ALL OBJECT MATRICES FULLY COMPILED</p>
                </footer>
            </div>
        </div>
    );
}