import React, { useState, useEffect, useMemo } from "react";

// ============================================================================
// 1. ENTERPRISE FILTER SCHEMA CONFIGURATION & META TOKENS
// ============================================================================
// Scalable mappings holding advanced UI configuration tokens for multi-tier criteria.
const CORE_TECH_REGISTRY = {
    ALL: { id: "ALL", label: "All Systems", countKey: "all", variant: "emerald" },
    FRONTEND: { id: "FRONTEND", label: "Client Layer / UI-UX", countKey: "frontend", variant: "blue" },
    BACKEND: { id: "BACKEND", label: "Data Pipeline & Runtimes", countKey: "backend", variant: "amber" },
    DATABASE: { id: "DATABASE", label: "Relational / Object ORM", countKey: "database", variant: "purple" },
    DEVOPS: { id: "DEVOPS", label: "Infrastructure & Isolation", countKey: "devops", variant: "cyan" }
};

// Extensible metadata config holding strict technical keywords to scan inside dynamic payloads
const MATCH_CRITERIA_MAP = {
    [CORE_TECH_REGISTRY.FRONTEND.id]: ["react.js", "next.js", "redux.js", "tailwind css", "ui/ux"],
    [CORE_TECH_REGISTRY.BACKEND.id]: ["django", "node.js", "express.js", "rest api"],
    [CORE_TECH_REGISTRY.DATABASE.id]: ["prisma", "postgresql", "mysql"],
    [CORE_TECH_REGISTRY.DEVOPS.id]: ["docker", "cloud"]
};

// UI Styling Engine Variant Map mapping state classes deterministically without string interpolation runtime bugs
const METRIC_BADGE_THEMES = {
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 group-hover:border-emerald-500/50",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20 group-hover:border-blue-500/50",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20 group-hover:border-amber-500/50",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20 group-hover:border-purple-500/50",
    cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 group-hover:border-cyan-500/50"
};

const SELECTION_THEMES = {
    emerald: "bg-emerald-500 border-emerald-400 text-slate-950 font-semibold shadow-lg shadow-emerald-500/10",
    blue: "bg-blue-500 border-blue-400 text-slate-950 font-semibold shadow-lg shadow-blue-500/10",
    amber: "bg-amber-500 border-amber-400 text-slate-950 font-semibold shadow-lg shadow-amber-500/10",
    purple: "bg-purple-500 border-purple-400 text-slate-950 font-semibold shadow-lg shadow-purple-500/10",
    cyan: "bg-cyan-500 border-cyan-400 text-slate-950 font-semibold shadow-lg shadow-cyan-500/10"
};

// Raw array matrix configuration extracted cleanly for processing metrics engine dynamically
const SYSTEM_RAW_MANIFEST = [
    { id: "e_com", name: "Fullstack E-Commerce", stack: ["react.js", "next.js", "redux.js", "prisma", "cloud", "docker", "tailwind css", "rest api", "django", "postgresql", "mysql", "ui/ux"] },
    { id: "portfolio", name: "UI/UX Portfolio Showcase", stack: ["react.js", "next.js", "redux.js", "prisma", "cloud", "docker", "tailwind css", "rest api", "node.js", "express.js", "postgresql", "mysql", "ui/ux"] },
    { id: "dashboard", name: "Operational Dashboard App", stack: ["react.js", "next.js", "redux.js", "prisma", "cloud", "docker", "tailwind css", "rest api", "node.js", "express.js", "postgresql", "mysql", "ui/ux"] },
    { id: "chat", name: "Real-Time Chat Application", stack: ["react.js", "next.js", "redux.js", "prisma", "cloud", "docker", "tailwind css", "rest api", "node.js", "express.js", "postgresql", "mysql", "ui/ux"] },
    { id: "ai_app", name: "AI + Fullstack Orchestrator", stack: ["react.js", "next.js", "redux.js", "prisma", "cloud", "docker", "tailwind css", "rest api", "django", "postgresql", "mysql", "ui/ux"] }
];

// ============================================================================
// 2. DATA PROCESSING CORE ENGINES & SERVICES (PROMISES)
// ============================================================================
/**
 * Asynchronous Registry Service emulating secure calculation telemetry pipeline.
 * Returns distribution statistics based on standard multi-tier infrastructure configurations.
 */
const calculateRegistryAggregates = (manifest) => {
    return new Promise((resolve, reject) => {
        try {
            if (!Array.isArray(manifest)) {
                throw new Error("Invalid telemetry ingestion vector: Manifest parameter must be an iterable structure.");
            }

            // High-performance reducer parsing deep layer matrices efficiently
            const counts = manifest.reduce(
                (acc, item) => {
                    acc.all += 1;
                    const techStackNormalized = item.stack.map(tech => tech.toLowerCase());

                    // Match keywords dynamically according to the criteria registry configuration
                    Object.entries(MATCH_CRITERIA_MAP).forEach(([categoryId, matches]) => {
                        const registryKey = CORE_TECH_REGISTRY[categoryId].countKey;
                        const hasMatch = matches.some(keyword => techStackNormalized.includes(keyword));
                        if (hasMatch) {
                            acc[registryKey] += 1;
                        }
                    });

                    return acc;
                },
                { all: 0, frontend: 0, backend: 0, database: 0, devops: 0 }
            );

            // Artificially defer response payload slightly to emulate a high-speed network event worker
            setTimeout(() => resolve(counts), 350);
        } catch (error) {
            reject(error);
        }
    });
};

// ============================================================================
// 3. COMPONENT IMPLEMENTATION
// ============================================================================
export default function ProjectsFilters({ onFilterChange, currentActiveFilter = "ALL" }) {
    const [aggregates, setAggregates] = useState({ all: 0, frontend: 0, backend: 0, database: 0, devops: 0 });
    const [processingState, setProcessingState] = useState({ operational: false, failure: null });
    const [searchToken, setSearchToken] = useState("");

    // Ingestion deployment effect hooks tracking background thread allocation simulation
    useEffect(() => {
        setProcessingState({ operational: true, failure: null });

        calculateRegistryAggregates(SYSTEM_RAW_MANIFEST)
            .then((calculatedCounts) => {
                setAggregates(calculatedCounts);
                setProcessingState({ operational: false, failure: null });
            })
            .catch((err) => {
                setProcessingState({ operational: false, failure: err.message || "Failed to parse system aggregates." });
            });
    }, []);

    // Structural transformation using Array mappings for standard loop operations
    const navigationFilters = useMemo(() => {
        return Object.values(CORE_TECH_REGISTRY).map(categoryConfig => {
            return {
                ...categoryConfig,
                computedVolume: aggregates[categoryConfig.countKey] || 0
            };
        });
    }, [aggregates]);

    // Bubble context upward safely upon user execution selection events
    const executeFilterSelection = (filterId) => {
        if (typeof onFilterChange === "function") {
            onFilterChange(filterId);
        }
    };

    return (
        <div className="w-full bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md">

            {/* FILTER PANEL CONSOLE HEADER META */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/60 mb-6">
                <div>
                    <h3 className="text-sm font-mono font-bold tracking-wider text-slate-400 uppercase">
                        System Taxonomy Control Plane
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Query cross-platform stacks across containerized and isolated environments.
                    </p>
                </div>

                {/* RUNTIME TELEMETRY TRACKER SPINNER */}
                {processingState.operational && (
                    <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-cyan-400 bg-cyan-950/30 border border-cyan-900 px-3 py-1 rounded-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                        COMPUTING_METRICS_LIVE
                    </div>
                )}
            </div>

            {/* COMPACT INTERACTIVE INPUT INGESTION LAYER */}
            <div className="mb-6">
                <div className="relative rounded-xl shadow-sm">
                    <input
                        type="text"
                        value={searchToken}
                        onChange={(e) => setSearchToken(e.target.value)}
                        placeholder="Type technology signature keywords... (e.g., Prisma, Cloud, Next.js)"
                        className="w-full font-mono text-xs bg-slate-950 border border-slate-800 focus:border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-700 transition-all duration-200"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[10px] font-mono text-slate-600">
                        [STR_SCANNER]
                    </div>
                </div>
            </div>

            {/* PRIMARY DESKTOP FILTER MAPPING NAVIGATION GRID */}
            <div className="flex flex-wrap gap-3">
                {navigationFilters.map((node) => {
                    const isCurrentlyActive = currentActiveFilter === node.id;

                    // Deterministic style assignments using structural evaluation schemas instead of nested conditionals
                    const badgeThemeClass = METRIC_BADGE_THEMES[node.variant] || METRIC_BADGE_THEMES.emerald;
                    const selectedThemeClass = SELECTION_THEMES[node.variant] || SELECTION_THEMES.emerald;

                    return (
                        <button
                            key={node.id}
                            onClick={() => executeFilterSelection(node.id)}
                            disabled={processingState.operational}
                            className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl border font-mono text-xs transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none ${isCurrentlyActive
                                    ? selectedThemeClass
                                    : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                                }`}
                        >
                            {/* Dynamic Action Dot Indicator */}
                            <span className={`w-1 h-1 rounded-full transition-all duration-300 ${isCurrentlyActive ? "bg-slate-950 scale-125" : "bg-slate-700 group-hover:bg-slate-400"
                                }`}></span>

                            <span>{node.label}</span>

                            {/* Advanced Internal Dynamic Counting Badge Matrix */}
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border transition-colors duration-300 ${isCurrentlyActive
                                    ? "bg-slate-950/20 text-slate-950 border-slate-950/30"
                                    : badgeThemeClass
                                }`}>
                                {processingState.operational ? "--" : node.computedVolume}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* ERROR HANDLER MATRIX FALLBACK STATE */}
            {processingState.failure && (
                <div className="mt-4 p-3 bg-rose-950/20 border border-rose-900/40 rounded-xl text-xs font-mono text-rose-400">
                    <span className="font-bold">CRITICAL_EXCEPTION:</span> {processingState.failure}
                </div>
            )}
        </div>
    );
}