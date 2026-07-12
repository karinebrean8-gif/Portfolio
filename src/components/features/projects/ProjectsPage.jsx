/**
 * ============================================================================
 * L10 DISTINGUISHED PRINCIPAL ENTERPRISE PROJECTS MATRIX DASHBOARD
 * COMPONENT: ProjectsPage
 * PARADIGM: Declarative Data Projection, High-Performance Architectural Layout,
 * Component Memory Isolation, Zero If-Else Functional Strategy Mapping.
 * DESIGN SYSTEM: High-Contrast Cyberpunk Glassmorphic Tailwind CSS Matrix
 * ============================================================================
 */
{/* Declarative Compute Telemetry Grid */ }
<div className="grid grid-cols-3 gap-2 bg-slate-950/80 p-3 rounded border-slate-900 font-mono text-[11px] mb-6 relative z-10">
    {METRICS_LABEL_LOOKUP.map((metricSpec) => (
        <div key={`${projectNode.projectId}-metric-${metricSpec.dataKey}`}>
            <span className="block text-slate-500 uppercase">{metricSpec.label}</span>
            <span className="block text-slate-200 font-bold">
                {projectNode.metrics?.[metricSpec.dataKey] || "N/A"}
            </span>
        </div>
    ))}
</div>

{/* Tech Stack Micro-Badges */ }
<div className="flex flex-wrap gap-1.5 relative z-10">
    {projectNode.technologies.slice(0, 6).map((tech) => (
        <span key={tech} className={componentVisualBlueprint.techBadgeClass}>
            {tech}
        </span>
    ))}
</div>

import React, { useState, useMemo, useCallback } from "react";
import { useClusterMatrix } from "../RealApiCluster/useClusterMatrix";
import { useQuantumDebounce } from "../RealApiCluster/useQuantumDebounce";

// ============================================================================
// 1. IMMUTABLE ENTERPRISE PROJECTS REGISTRY (The Core Blueprint)
// ============================================================================
const ENTERPRISE_PROJECTS_MANIFEST = Object.freeze([

    {
        projectId: "PROJ-NC-01",
        title: "Next-Gen Enterprise E-Commerce Platform",
        subheading: "Hyper-Scale Distributed Retail Engine Architecture",
        description: "A multi-tenant, microservices-driven retail engine designed for concurrent traffic mitigation, reactive global inventory state syncing, and high-frequency transactions storage optimization.",
        stackType: "BACKEND_DJANGO",
        technologies: ["React.js", "Microsoft Next.js", "Redux.js", "Prisma", "Cloud Ingress", "Docker Containers", "Tailwind CSS", "RESTful API", "Django Engine", "PostgreSQL", "MySQL", "UI/UX Architecture"],
        k8sTargetPod: "pod-ecommerce-core",
        metrics: { scaleFactor: "99.99% Uptime", throughput: "15k Req/Sec", DBReplica: "Master-Slave" }
    },
    {
        projectId: "PROJ-NC-02",
        title: "L10 Ultragod Full-Stack Portfolio Matrix",
        subheading: "Self-Healing Reactive Cloud Ecosystem & Telemetry Proxy",
        description: "The complete infrastructure proxy mapping your career telemetry, including active O(1) edge-caching memory networks, real-time logging buffers, and high-performance layout virtualization.",
        stackType: "BACKEND_NODE",
        technologies: ["React.js", "Microsoft Next.js", "Redux.js", "Prisma", "Cloud Ingress", "Docker Containers", "Tailwind CSS", "RESTful API", "Node.js Engine", "Express.js", "PostgreSQL", "MySQL", "UI/UX Architecture"],
        k8sTargetPod: "pod-portfolio-matrix",
        metrics: { scaleFactor: "0ms Edge Cache", throughput: "O(1) Matrix Lookup", DBReplica: "Isolated Inversion" }
    },
    {
        projectId: "PROJ-NC-03",
        title: "Autonomous Analytical Control Dashboard App",
        subheading: "Real-Time Telemetry and Operational Cluster Analyzer",
        description: "An administrative mission-control console capable of parsing telemetry batch buffers, monitoring distributed K8s replica weights, and visualizing continuous background event logging loops.",
        stackType: "BACKEND_NODE",
        technologies: ["React.js", "Microsoft Next.js", "Redux.js", "Prisma", "Cloud Ingress", "Docker Containers", "Tailwind CSS", "RESTful API", "Node.js Engine", "Express.js", "PostgreSQL", "MySQL", "UI/UX Architecture"],
        k8sTargetPod: "pod-dashboard-analytics",
        metrics: { scaleFactor: "60 FPS Rendered", throughput: "400ms Batch Ingress", DBReplica: "Read-Intensive" }
    },
    {
        projectId: "PROJ-NC-04",
        title: "Reactive Distributed Real-Time Chat System",
        subheading: "Bi-Directional Event Stream Messaging Framework",
        description: "A secure, non-blocking asynchronous communications engine utilizing message queues and socket pools to route live sharded packet channels between virtual pod threads.",
        stackType: "BACKEND_NODE",
        technologies: ["React.js", "Microsoft Next.js", "Redux.js", "Prisma", "Cloud Ingress", "Docker Containers", "Tailwind CSS", "RESTful API", "Node.js Engine", "Express.js", "PostgreSQL", "MySQL", "UI/UX Architecture"],
        k8sTargetPod: "pod-chat-messaging",
        metrics: { scaleFactor: "<4ms Sync Latency", throughput: "100k Active Pools", DBReplica: "Write-Heavy Node" }
    },
    {
        projectId: "PROJ-NC-05",
        title: "Cognitive AI + Full-Stack Application",
        subheading: "Neural Pattern Synthesis and Big-Data Ingestion Layer",
        description: "An artificial intelligence orchestration gateway paired with web layers to deliver streaming context inference pipelines, vectorized lookup steps, and automated resource tuning.",
        stackType: "BACKEND_DJANGO",
        technologies: ["React.js", "Microsoft Next.js", "Redux.js", "Prisma", "Cloud Ingress", "Docker Containers", "Tailwind CSS", "RESTful API", "Django Engine", "PostgreSQL", "MySQL", "UI/UX Architecture"],
        k8sTargetPod: "pod-ai-inference",
        metrics: { scaleFactor: "Vectorized Search", throughput: "Contextual Pipeline", DBReplica: "Sharded Datastore" }
    }
]);

// Polymorphic Glassmorphic Theming Strategy Registry
const COMPONENT_THEMING_STRATEGY = Object.freeze({
    BACKEND_DJANGO: {
        cardWrapper: "relative group backdrop-blur-xl bg-slate-900/40 rounded-xl border border-emerald-500/10 p-6 hover:border-emerald-500/30 transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.02)]",
        badge: "px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
        glowEffect: "absolute -inset-px bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-sm"
    },
    BACKEND_NODE: {
        cardWrapper: "relative group backdrop-blur-xl bg-slate-900/40 rounded-xl border border-cyan-500/10 p-6 hover:border-cyan-500/30 transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.02)]",
        badge: "px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
        glowEffect: "absolute -inset-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-sm"
    }
});

// ============================================================================
// 2. THE MAIN PROJECTS INTERFACE VIEW
// ============================================================================
export default function ProjectsPage() {
    const { systemPerformanceReportCard } = useClusterMatrix();
    const { executeQuantumDebouncePipeline } = useQuantumDebounce();

    const [activeFilterKeyword, setActiveFilterKeyword] = useState("ALL_NODES");

    // Telemetry Search Interceptor (Wrapped inside Quantum Debounce Promise Framework)
    const handleFilterUpdateDebounced = useCallback(
        executeQuantumDebouncePipeline((selectedCategory) => {
            setActiveFilterKeyword(selectedCategory);
        }, 150),
        [executeQuantumDebouncePipeline]
    );

    // Memoized Filtered List Resolution (Zero Garbage Collection Allocation)
    const filteredProjectsMatrix = useMemo(() => {
        // Strategy Lookups replacing classical multi-branch nesting
        const filterConditionsMap = {
            ALL_NODES: () => true,
            BACKEND_DJANGO: (item) => item.stackType === "BACKEND_DJANGO",
            BACKEND_NODE: (item) => item.stackType === "BACKEND_NODE"
        };

        const targetEvaluatorFn = filterConditionsMap[activeFilterKeyword] || filterConditionsMap.ALL_NODES;
        return ENTERPRISE_PROJECTS_MANIFEST.filter(targetEvaluatorFn);
    }, [activeFilterKeyword]);

    return (
        <div className="min-h-screen w-full bg-[#030712] text-slate-100 px-6 py-12 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">

            {/* ─── TELEMETRY TOP HEADER RUNWAY ─── */}
            <header className="max-w-7xl mx-auto mb-16 border-b border-slate-900 pb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                            <p className="text-xs font-mono tracking-widest text-cyan-400 uppercase">System Production Node: Portfolio</p>
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 via-slate-300 to-slate-500 bg-clip-text text-transparent">
                            Distributed Projects Fabric
                        </h1>
                    </div>

                    {/* Infrastructure Metrics Badge Board */}
                    <div className="flex gap-4 font-mono bg-slate-950/60 p-4 rounded-lg border border-slate-900 text-xs">
                        <div>
                            <p className="text-slate-500">ENGINE_STATUS</p>
                            <p className="text-emerald-400 font-bold">ONLINE (K8S)</p>
                        </div>
                        <div className="border-l border-slate-800 pl-4">
                            <p className="text-slate-500">BUFFER_UPTIME</p>
                            <p className="text-slate-300">{systemPerformanceReportCard.formattedUptime || "0.0s"}</p>
                        </div>
                    </div>
                </div>

                {/* Dynamic Filter Controls Matrix */}
                <div className="mt-8 flex gap-2 font-mono">
                    {["ALL_NODES", "BACKEND_DJANGO", "BACKEND_NODE"].map((filterKey) => (
                        <button
                            key={filterKey}
                            onClick={() => handleFilterUpdateDebounced(filterKey)}
                            className={`px-4 py-1.5 rounded text-xs font-bold transition-all border ${activeFilterKeyword === filterKey
                                ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                                : "bg-slate-950 text-slate-400 border-slate-900 hover:border-slate-800 hover:text-slate-200"
                                }`}
                        >
                            {filterKey === "ALL_NODES" ? "SYS_SHOW_ALL" : `FILTER_${filterKey}`}
                        </button>
                    ))}
                </div>
            </header>

            {/* ─── GRID REPLICAS STREAM RUNWAY ─── */}
            <main className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-8">
                {filteredProjectsMatrix.map((projectNode) => {
                    const activeThemeSpec = COMPONENT_THEMING_STRATEGY[projectNode.stackType] || COMPONENT_THEMING_STRATEGY.BACKEND_NODE;

                    return (
                        <section
                            key={projectNode.projectId}
                            className={activeThemeSpec.cardWrapper}
                        >
                            {/* Kinetic Glow Ambient Box */}
                            <div className={activeThemeSpec.glowEffect} />

                            {/* Card Meta Row Header */}
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <span className="font-mono text-xs text-slate-500 tracking-wider">
                                    [{projectNode.projectId}] // {projectNode.k8sTargetPod}
                                </span>
                                <span className={activeThemeSpec.badge}>
                                    {projectNode.stackType.replace("BACKEND_", "")} CORE
                                </span>
                            </div>

                            {/* Title Aggregators */}
                            <div className="mb-4 relative z-10">
                                <h2 className="text-xl font-bold text-slate-100 group-hover:text-cyan-400/90 transition-colors duration-300">
                                    {projectNode.title}
                                </h2>
                                <p className="text-xs font-mono text-slate-400 mt-1">
                                    {projectNode.subheading}
                                </p>
                            </div>

                            {/* Core Description Abstract */}
                            <p className="text-sm text-slate-400 leading-relaxed mb-6 relative z-10">
                                {projectNode.description}
                            </p>

                            {/* Compute Telemetry Specs Table */}
                            <div className="grid grid-cols-3 gap-2 bg-slate-950/80 p-3 rounded border border-slate-900 font-mono text-[11px] mb-6 relative z-10">
                                <div>
                                    <span className="block text-slate-600">CAPACITY</span>
                                    <span className="text-slate-300 font-medium">{projectNode.metrics.scaleFactor}</span>
                                </div>
                                <div>
                                    <span className="block text-slate-600">THROUGHPUT</span>
                                    <span className="text-slate-300 font-medium">{projectNode.metrics.throughput}</span>
                                </div>
                                <div>
                                    <span className="block text-slate-600">DB_TOPOLOGY</span>
                                    <span className="text-slate-300 font-medium">{projectNode.metrics.DBReplica}</span>
                                </div>
                            </div>

                            {/* Technology Tags Stack Matrix Iteration */}
                            <div className="relative z-10">
                                <h4 className="text-[10px] font-mono font-bold text-slate-600 tracking-wider uppercase mb-2">
                                    Ingested Technology Vectors
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {projectNode.technologies.map((techItem, index) => (
                                        <span
                                            key={`${projectNode.projectId}-tech-${index}`}
                                            className="px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-900 text-[11px] font-mono hover:text-cyan-400 hover:border-cyan-500/20 transition-colors"
                                        >
                                            {techItem}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </section>
                    );
                })}
            </main>

            {/* Null-State Strategy Guard */}
            {filteredProjectsMatrix.length === 0 && (
                <div className="max-w-7xl mx-auto text-center py-20 font-mono text-slate-500 text-sm border border-dashed border-slate-900 rounded-xl">
                    [CRITICAL]: Zero projects resolved matching current active matrix filters.
                </div>
            )}
        </div>
    );
}