import React, { useState, useEffect, useMemo } from 'react';

// ============================================================================
// CONSTANTS & CONFIGURATION (Domain Driven Architecture)
// ============================================================================
const ARCHITECTURE_LAYERS = {
    PRESENTATION: 'presentation',
    APPLICATION: 'application',
    DOMAIN: 'domain',
    INFRASTRUCTURE: 'infrastructure'
};

const METRIC_TYPES = {
    SCALE: 'scale',
    PERFORMANCE: 'performance',
    REVENUE: 'revenue',
    EFFICIENCY: 'efficiency'
};

// ============================================================================
// DATA REPOSITORY (Immense, Deeply Nested Domain Models)
// ============================================================================
const CASE_STUDIES_REPOSITORY = [
    {
        id: "cs-001",
        title: "Global Financial Settlement Engine Modernization",
        client: "Sovereign Clearing House Corp",
        duration: "2024 - 2026",
        sector: "FinTech / Distributed Infrastructure",
        impactSummary: "Architected and executed the complete decommissioning of a 40-year-old COBOL mainframe settlement system, replacing it with an event-sourced, multi-region active-active TypeScript/Go mesh. Handled trillions in daily transaction volume with zero-downtime migration.",
        tags: ["Distributed Systems", "Event Sourcing", "React 19", "Node.js", "Rust", "Kafka", "AWS"],
        metrics: [
            { type: METRIC_TYPES.SCALE, label: "Daily Peak Volume", value: "$2.4 Trillion", improvement: "+400%" },
            { type: METRIC_TYPES.PERFORMANCE, label: "P99.99 Latency", value: "4.2ms", improvement: "-98.6%" },
            { type: METRIC_TYPES.REVENUE, label: "Infrastructure Cost", value: "-$42M/Yr", improvement: "Saved" }
        ],
        architecture: {
            layer: ARCHITECTURE_LAYERS.DOMAIN,
            description: "Clean Domain-Driven Design (DDD) with complete decoupling of IO from core banking transactional logic.",
            highlights: [
                "CQRS pattern separating read/write paths over global Kafka clusters.",
                "Custom WASM-based cryptographic validation layer running inside edge runtimes.",
                "Micro-frontend dashboard orchestrating 14 sub-teams via federated modules."
            ]
        },
        narrative: [
            {
                heading: "The 50-Year Legacy Bottleneck",
                content: "The existing infrastructure relied on overnight batch processing architectures engineered in the late 1970s. As global transactional frequencies shifted toward real-time settlement, the physical limits of sequential file processing threatened systemic liquidity failures."
            },
            {
                heading: "The Ultra-FAANG Execution Paradigm",
                content: "Instead of a high-risk 'big bang' cutover, we engineered a dual-write shadow routing system. For 18 months, our new system processed live traffic in shadow mode, constantly verifying states against the legacy mainframe using a highly optimized, asynchronous Promise-pool validation engine."
            }
        ]
    },
    {
        id: "cs-002",
        title: "Hyper-Scale Next-Gen AI Orchestration Mesh",
        client: "Autonomous Intelligence Consortium",
        duration: "2023 - 2025",
        sector: "Artificial Intelligence / Cloud Infra",
        impactSummary: "Designed the full-stack visualization, orchestration, and scheduling interface powering the world's largest distributed LLM training cluster. Solved catastrophic GPU starvation problems via dynamic client-side scheduling telemetry.",
        tags: ["WebSockets", "WebGPU", "React Server Components", "Python", "Kubernetes", "gRPC"],
        metrics: [
            { type: METRIC_TYPES.SCALE, label: "Cluster Footprint", value: "250,000+ H100s", improvement: "Orchestrated" },
            { type: METRIC_TYPES.PERFORMANCE, label: "UI Telemetry Throughput", value: "12M events/sec", improvement: "Zero Lag" },
            { type: METRIC_TYPES.EFFICIENCY, label: "GPU Utilization", value: "98.4%", improvement: "+22.1%" }
        ],
        architecture: {
            layer: ARCHITECTURE_LAYERS.APPLICATION,
            description: "Real-time streaming layer leveraging canvas, WebGPU, and worker threads to prevent main-thread blocking during extreme network strain.",
            highlights: [
                "Binary-packed gRPC-web streams translated straight into shared array buffers.",
                "Zero-allocation memory pooling strategy inside React components to eliminate Garbage Collection pauses.",
                "Custom virtualized state matrix capable of rendering 100k nodes smoothly at 120 FPS."
            ]
        },
        narrative: [
            {
                heading: "The Distributed Grid Telemetry Disaster",
                content: "Standard web architectures collapse when fed real-time health arrays from hundreds of thousands of individual compute cores. The original monitoring stack regularly crashed operations rooms during critical training runs."
            },
            {
                heading: "The Multi-Threaded Frontend Paradigm",
                content: "We abstracted the entire data ingestion pipeline into dedicated Web Workers. React became a pure, highly dumb rendering layer consuming immutable snapshots via custom hooks, completely isolating user interactions from complex data processing."
            }
        ]
    }
];

// FILTER STRATEGIES (Open-Closed Principle: Easy to extend without modifying core logic)
const FILTER_STRATEGIES = {
    ALL: (study) => true,
    HIGH_SCALE: (study) => study.metrics.some(m => m.type === METRIC_TYPES.SCALE),
    FINTECH: (study) => study.sector.toLowerCase().includes('fintech'),
    AI: (study) => study.sector.toLowerCase().includes('ai')
};

// ============================================================================
// APPLICATION LOGIC SERVICES (Promises, Async Mocking, Strict Domain Rules)
// ============================================================================
const CaseStudyService = {
    fetchAll: () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!CASE_STUDIES_REPOSITORY || CASE_STUDIES_REPOSITORY.length === 0) {
                    reject(new Error("Domain Error: Empty repository state."));
                } else {
                    resolve([...CASE_STUDIES_REPOSITORY]);
                }
            }, 600); // Realistic enterprise simulation latency
        });
    }
};

// ============================================================================
// MAIN PRESENTATION LAYER COMPONENT
// ============================================================================
export default function CaseStudiesPage() {
    // Pure UI & Orchestration States
    const [caseStudies, setCaseStudies] = useState([]);
    const [activeStrategy, setActiveStrategy] = useState('ALL');
    const [selectedStudyId, setSelectedStudyId] = useState(CASE_STUDIES_REPOSITORY[0]?.id || null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load Data via Domain Services using Clean Lifecycle Patterns
    useEffect(() => {
        let isMounted = true;

        setIsLoading(true);
        CaseStudyService.fetchAll()
            .then((data) => {
                if (isMounted) {
                    setCaseStudies(data);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err.message);
                    setIsLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    // Complex Memoization Optimization for Filtering Operations
    const filteredStudies = useMemo(() => {
        const filterFn = FILTER_STRATEGIES[activeStrategy] || FILTER_STRATEGIES.ALL;
        return caseStudies.filter(filterFn);
    }, [caseStudies, activeStrategy]);

    // Selected Item Domain Extraction
    const selectedStudy = useMemo(() => {
        return caseStudies.find(study => study.id === selectedStudyId) || null;
    }, [caseStudies, selectedStudyId]);

    // Guard Clause: Loading Engine
    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center font-mono p-8">
                <div className="space-y-4 max-w-md w-full border border-emerald-500/30 p-6 bg-slate-900 rounded-lg shadow-2xl shadow-emerald-500/5">
                    <div className="flex justify-between items-center text-xs text-emerald-400 font-bold tracking-widest uppercase">
                        <span>System Ingestion</span>
                        <span className="animate-pulse">Active_</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 animate-[loading_1.5s_ease-in-out_infinite] w-2/3 rounded-full" />
                    </div>
                    <p className="text-xs text-slate-400">Loading 50+ Years of FAANG Scale Architectural Artifacts...</p>
                </div>
            </div>
        );
    }

    // Guard Clause: Core Runtime Exception Rendering
    if (error) {
        return (
            <div className="min-h-screen bg-slate-950 text-rose-400 flex items-center justify-center p-6 font-mono">
                <div className="border-2 border-rose-500/40 bg-rose-950/20 max-w-xl p-8 rounded-xl backdrop-blur-md">
                    <h2 className="text-xl font-black uppercase tracking-wider mb-2">Architectural Panic Condition</h2>
                    <p className="text-sm text-slate-300 font-sans mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-rose-500 text-slate-950 font-bold text-xs uppercase hover:bg-rose-400 transition"
                    >
                        Reboot Kernel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">

            {/* ULTRA-FAANG CYBERPUNK GLOBAL HEADER */}
            <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50 px-6 py-4 lg:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                        <h1 className="text-lg font-black tracking-wider uppercase font-mono bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                            PRINCIPLE ARCHITECT_ // SYSTEM ARTIFACTS
                        </h1>
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">50+ Years Engineering Multi-Region Global Systems</p>
                </div>

                {/* Strategy Filtering Matrix */}
                <nav className="flex flex-wrap gap-2 p-1 bg-slate-950 border border-slate-800 rounded-lg">
                    {Object.keys(FILTER_STRATEGIES).map((strategyKey) => (
                        <button
                            key={strategyKey}
                            onClick={() => setActiveStrategy(strategyKey)}
                            className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-tight rounded-md transition-all duration-200 ${activeStrategy === strategyKey
                                    ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-md'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                                }`}
                        >
                            {strategyKey.replace('_', ' ')}
                        </button>
                    ))}
                </nav>
            </header>

            {/* COMPONENT BODY SPLIT ARCHITECTURE */}
            <main className="max-w-[1920px] mx-auto p-6 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* LEFT COLUMN: COMPACT CASE STUDY DIRECTORY MAPPING */}
                <section className="lg:col-span-5 xl:col-span-4 space-y-4">
                    <div className="flex justify-between items-center px-1 font-mono text-xs uppercase text-slate-400 font-semibold tracking-wider">
                        <span>Index Matrix</span>
                        <span>({filteredStudies.length} loaded)</span>
                    </div>

                    <div className="space-y-3">
                        {filteredStudies.map((study) => {
                            const isSelected = study.id === selectedStudyId;
                            return (
                                <div
                                    key={study.id}
                                    onClick={() => setSelectedStudyId(study.id)}
                                    className={`group relative p-5 rounded-xl border transition-all duration-300 cursor-pointer ${isSelected
                                            ? 'bg-slate-900 border-emerald-500/50 shadow-xl shadow-emerald-950/20 translate-x-1'
                                            : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/70'
                                        }`}
                                >
                                    {/* Subtle selection block indicator */}
                                    {isSelected && (
                                        <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-emerald-400 to-cyan-500 rounded-l-xl" />
                                    )}

                                    <div className="flex justify-between items-start gap-4 mb-2 font-mono text-xs">
                                        <span className="text-slate-500 font-medium">{study.duration}</span>
                                        <span className="text-emerald-400 font-semibold tracking-wide uppercase px-2 py-0.5 bg-emerald-950/50 border border-emerald-900/50 rounded">
                                            {study.id}
                                        </span>
                                    </div>

                                    <h3 className={`font-bold tracking-tight text-base mb-2 group-hover:text-emerald-400 transition-colors ${isSelected ? 'text-emerald-400' : 'text-slate-200'
                                        }`}>
                                        {study.title}
                                    </h3>

                                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                                        {study.impactSummary}
                                    </p>

                                    <div className="flex flex-wrap gap-1.5">
                                        {study.tags.slice(0, 4).map((tag, idx) => (
                                            <span key={idx} className="text-[10px] font-mono px-2 py-0.5 bg-slate-950 border border-slate-800 text-slate-400 rounded">
                                                {tag}
                                            </span>
                                        ))}
                                        {study.tags.length > 4 && (
                                            <span className="text-[10px] font-mono px-1.5 py-0.5 text-slate-500">
                                                +{study.tags.length - 4} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* RIGHT COLUMN: REINFORCED GRANULAR CASE STUDY VIEW ENGINE */}
                <section className="lg:col-span-7 xl:col-span-8">
                    {selectedStudy ? (
                        <article className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 lg:p-10 shadow-2xl backdrop-blur-sm space-y-8 animate-fadeIn">

                            {/* SYSTEM HEADER BAR */}
                            <div className="border-b border-slate-800 pb-6">
                                <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-bold mb-2">
                  // {selectedStudy.sector}
                                </div>
                                <h2 className="text-2xl lg:text-4xl font-extrabold tracking-tight text-slate-100 mb-4">
                                    {selectedStudy.title}
                                </h2>
                                <div className="flex flex-wrap gap-3 items-center text-xs text-slate-400">
                                    <div>Client: <strong className="text-slate-200 font-medium">{selectedStudy.client}</strong></div>
                                    <span className="text-slate-700">•</span>
                                    <div>Timeline: <strong className="text-slate-200 font-medium">{selectedStudy.duration}</strong></div>
                                </div>
                            </div>

                            {/* LIVE DYNAMIC METRIC ACCELERATORS GRID */}
                            <div>
                                <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold mb-4">
                                    Verified Real-World Production Impacts
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {selectedStudy.metrics.map((metric, idx) => (
                                        <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 p-1.5 text-[10px] font-mono font-bold uppercase tracking-tighter text-emerald-400 bg-emerald-950/40 border-l border-b border-slate-800 rounded-bl-lg">
                                                {metric.improvement}
                                            </div>
                                            <div className="text-xs font-mono text-slate-500 uppercase">{metric.label}</div>
                                            <div className="text-xl lg:text-2xl font-black tracking-tight text-slate-200 mt-2 font-mono group-hover:text-cyan-400 transition-colors">
                                                {metric.value}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ARCHITECTURE LAYER REVIEW BLOCK */}
                            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 bg-indigo-950 border border-indigo-800 text-indigo-300 rounded-full">
                                        {selectedStudy.architecture.layer} Layer Architecture
                                    </span>
                                </div>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    {selectedStudy.architecture.description}
                                </p>
                                <ul className="space-y-2.5 text-xs text-slate-400 pl-1">
                                    {selectedStudy.architecture.highlights.map((highlight, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <span className="text-cyan-400 font-mono mt-0.5">▸</span>
                                            <span>{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* TECHNICAL NARRATIVE EXCERPTS */}
                            <div className="space-y-6">
                                <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold">
                                    Architectural Implementation Report
                                </h4>
                                {selectedStudy.narrative.map((section, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <h5 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                                            <span className="h-1 w-1.5 bg-emerald-500 rounded-sm" />
                                            {section.heading}
                                        </h5>
                                        <p className="text-sm text-slate-400 leading-relaxed font-sans">
                                            {section.content}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* FULL TECH TAG MATRIX */}
                            <div className="border-t border-slate-800 pt-6">
                                <div className="text-xs font-mono text-slate-500 uppercase mb-3">Engineered Stack Context</div>
                                <div className="flex flex-wrap gap-2">
                                    {selectedStudy.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="text-xs font-mono font-medium px-3 py-1 bg-slate-900 border border-slate-700/60 text-slate-300 rounded-lg hover:border-emerald-500/40 hover:text-emerald-300 transition-colors duration-200"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </article>
                    ) : (
                        <div className="border-2 border-dashed border-slate-800 rounded-2xl p-12 text-center text-slate-500 font-mono text-xs">
                            System Error: No valid architectural context currently selected in data matrix.
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}