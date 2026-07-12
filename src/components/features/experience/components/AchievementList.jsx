import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';

// ============================================================================
// 1. IMMUTABLE CONSTANT REGISTRIES & TELEMETRY ROUTERS (Bypasses dirty if-else)
// ============================================================================
const ARCHITECTURAL_TIERS = {
    LEVEL_9_GOD_MODE: { label: "Level 9 Core Invariant", style: "border-purple-500/30 text-purple-400 bg-purple-950/20" },
    ULTRA_FAANG_DISTINGUISHED: { label: "Ultra-FAANG Fellow Matrix", style: "border-emerald-500/30 text-emerald-400 bg-emerald-950/20" },
    PRINCIPAL_SHARD: { label: "Principal Cluster Lead", style: "border-cyan-500/30 text-cyan-400 bg-cyan-950/20" }
};

const ENGINE_SIGNALS = {
    CRITICAL: "shadow-rose-500/20 text-rose-400 border-rose-900/50 bg-rose-950/30",
    STABLE_EDGE: "shadow-cyan-500/20 text-cyan-400 border-cyan-900/50 bg-cyan-950/30",
    INFRA_WARP: "shadow-emerald-500/20 text-emerald-400 border-emerald-900/50 bg-emerald-950/30"
};

// ============================================================================
// 2. GIANT ENCAPSULATED MEMORY MATRIX (50+ Years Global Career Ledger)
// ============================================================================
const LIFETIME_ACHIEVEMENT_LEDGER = [
    {
        epochId: "node-alexicorn-core",
        company: "ALEXICORN",
        role: "Senior Engineer",
        duration: "6 Years Active Ledger (2020 - 2026)",
        tier: ARCHITECTURAL_TIERS.LEVEL_9_GOD_MODE,
        signal: ENGINE_SIGNALS.INFRA_WARP,
        context: "Executed kernel-level routing paradigms, hyper-scale data synchronization arrays, and bare-metal engine abstractions. Spearheaded structural engineering pipelines across 5 macro clusters.",

        // Principal Level 5 Large Projects
        masterProjects: [
            {
                uid: "ALEX-P1",
                title: "Omniscience Sharder Engine",
                scope: "Architected a state-partitioned sharding node handling zero-locking data writes over decentralized multi-cloud infrastructure.",
                blastRadius: "Global Distributed Persistence Layer",
                throughput: "1.8B Transactions / Min",
                status: "99.99999% Operational"
            },
            {
                uid: "ALEX-P2",
                title: "Quantum Proxy Mesh (QPM)",
                scope: "Engineered low-level network topology bypassing traditional TCP overhead via atomic-state serialization layers.",
                blastRadius: "Edge Nodes Network Topology",
                throughput: "450 Terabits / Sec Base Line",
                status: "Active Backbone"
            },
            {
                uid: "ALEX-P3",
                title: "Titan-IX Memory Recycler",
                scope: "Authored an automated raw heap garbage interceptor removing garbage collector spikes across critical engine instances.",
                blastRadius: "V8 Runtime Execution Kernels",
                throughput: "0ms Stop-The-World Latency",
                status: "Hardened Core"
            },
            {
                uid: "ALEX-P4",
                title: "Aether Cryptographic Ledger",
                scope: "Designed hardware-accelerated state machine layer ensuring cryptographic zero-knowledge proof checks in sub-millisecond timelines.",
                blastRadius: "Enterprise Validation Vaults",
                throughput: "800k Validations / Sec",
                status: "Immune System"
            },
            {
                uid: "ALEX-P5",
                title: "Vortex Telemetry Sink",
                scope: "Engineered binary-stream ingestion parser with dynamic AST mapping, processing raw infrastructure telemetries flawlessly.",
                blastRadius: "Global System Ingest Engine",
                throughput: "24 Billion Ingestions / Min",
                status: "Live Streams"
            }
        ],
        proCoderAchievements: [
            "Achieved God-Tier Pro Coder rank by committing 12,000+ optimized algorithmic blocks into core systems.",
            "Refactored dirty high-order abstractions to bare metal structures, recovering 42% lost compute cycles.",
            "Maintained zero runtime incident track record during enterprise hot-swap cluster migrations.",
            "Built distributed telemetry engines tracking microsecond shifts across cross-continent backbones."
        ]
    },
    {
        id: "node-faang-fellow",
        company: "THE ULTRA-FAANG HYPERSCALERS",
        role: "Distinguished Principal Architect",
        duration: "24 Years Matrix (1996 - 2020)",
        tier: ARCHITECTURAL_TIERS.ULTRA_FAANG_DISTINGUISHED,
        signal: ENGINE_SIGNALS.STABLE_EDGE,
        context: "Oversaw containerization frameworks, massive data center virtualization stacks, and optimized core system dependencies used globally by billions.",
        masterProjects: [
            {
                uid: "FAANG-P1",
                title: "Grid Hypervisor Matrix",
                scope: "Stripped traditional Linux kernels to run microsecond isolated virtual environments on multi-tenant bare metal arrays.",
                blastRadius: "Global Cloud Fleet Grid",
                throughput: "45M Independent Instances",
                status: "Production Anchor"
            }
        ],
        proCoderAchievements: [
            "Pioneered early data architecture methodologies managing exabyte scale storage structures seamlessly.",
            "Optimized load balancer distribution equations reducing worldwide regional edge drops to zero."
        ]
    },
    {
        id: "node-pioneer-labs",
        company: "EARLY COMPUTATION LABS (BELL / ARPANET NODES)",
        role: "Founding Systems Architect",
        duration: "20 Years Foundations (1976 - 1996)",
        tier: ARCHITECTURAL_TIERS.PRINCIPAL_SHARD,
        signal: ENGINE_SIGNALS.CRITICAL,
        context: "Historical contribution to low-level assembly compilers, initial networking transport layer interfaces, and standard memory allocator prototypes.",
        masterProjects: null, // Legacy historical nodes don't implement sub-desk telemetry arrays
        proCoderAchievements: [
            "Co-authored primitive multi-threaded asynchronous polling configurations still used in base kernel rings.",
            "Hand-optimized assembly memory routines to bypass physical registers limitations on early machines."
        ]
    }
];

export default function AchievementList() {
    const [ledgerData, setLedgerData] = useState([]);
    const [activeEpochId, setActiveEpochId] = useState("node-alexicorn-core");
    const [activeProjectIdx, setActiveProjectIdx] = useState(0);
    const [isCompiling, setIsCompiling] = useState(true);

    const lookupStatisticsRef = useRef({ totalLookups: 0, microsecondDrift: 0.02 });

    // ============================================================================
    // 3. ASYNCHRONOUS KERNEL PROMISE PIPELINE (Simulates Thread-Safe Compilation)
    // ============================================================================
    useEffect(() => {
        let isThreadActive = true;

        const compileChronologicalLedger = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (LIFETIME_ACHIEVEMENT_LEDGER && LIFETIME_ACHIEVEMENT_LEDGER.length > 0) {
                        resolve([...LIFETIME_ACHIEVEMENT_LEDGER]);
                    } else {
                        reject(new Error("Memory Pipeline Isolation Fault."));
                    }
                }, 400); // Super-fast async memory flush
            });
        };

        compileChronologicalLedger()
            .then((payloadGrid) => {
                if (isThreadActive) {
                    setLedgerData(payloadGrid);
                    setIsCompiling(false);
                }
            })
            .catch((err) => {
                console.error("[CRITICAL SHARD CORRUPTION]", err);
                if (isThreadActive) setIsCompiling(false);
            });

        return () => { isThreadActive = false; };
    }, []);

    // ============================================================================
    // 4. MEMOIZED EXTRACTORS & INTERROGATORS (No recalculations unless states shift)
    // ============================================================================
    const activeEpochMetadata = useMemo(() => {
        return ledgerData.find(node => (node.epochId === activeEpochId || node.id === activeEpochId)) || null;
    }, [ledgerData, activeEpochId]);

    const handleEpochShift = useCallback((targetId) => {
        setActiveEpochId(targetId);
        setActiveProjectIdx(0); // Reset inner tab indexes to prevent layout boundary breaks
        lookupStatisticsRef.current.totalLookups += 1;
    }, []);

    // ============================================================================
    // 5. HIGH-DENSITY CYBERPUNK VIEWPORT RENDER
    // ============================================================================
    if (isCompiling) {
        return (
            <div className="w-full min-h-[450px] bg-slate-950 flex flex-col items-center justify-center font-mono text-xs text-slate-500 border border-slate-900 rounded-3xl p-8">
                <div className="w-6 h-6 border-2 border-t-cyan-500 border-r-transparent border-slate-900 rounded-full animate-spin mb-3" />
                <p className="animate-pulse">// Loading 50+ Years Global Master Ledger Core...</p>
            </div>
        );
    }

    return (
        <div className="w-full bg-slate-950 text-slate-100 border border-slate-900 rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 font-sans shadow-2xl selection:bg-cyan-500/20 max-w-7xl mx-auto">

            {/* ENTERPRISE TERMINAL TOP HEADER BAR */}
            <header className="border-b border-slate-900 pb-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <div className="text-[10px] font-mono text-cyan-500 tracking-wider uppercase">// CORE CAPABILITY ENGINE</div>
                    <h2 className="text-xl sm:text-2xl font-black font-mono tracking-tighter uppercase mt-1 bg-gradient-to-r from-slate-100 via-slate-400 to-slate-700 bg-clip-text text-transparent">
                        ACHIEVEMENT_TELEMETRY_DESK
                    </h2>
                </div>
                <div className="flex gap-4 font-mono text-[9px] text-slate-500 bg-slate-900/40 px-3 py-2 border border-slate-900 rounded-xl">
                    <span>DESK_LOOKUPS: <span className="text-cyan-400 font-bold">{lookupStatisticsRef.current.totalLookups}</span></span>
                    <span className="border-l border-slate-800 pl-4">DRIFT: <span className="text-emerald-400 font-bold">{lookupStatisticsRef.current.microsecondDrift}ms</span></span>
                </div>
            </header>

            {/* TWO-COLUMN LAYOUT DISPATCHER */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                {/* LEFT COLUMN: INTERROGATION CONTROL NAV PANEL */}
                <nav className="lg:col-span-4 space-y-3">
                    <span className="text-[9px] font-mono font-bold text-slate-600 block px-1 uppercase">// CHRONO REGISTRY CHANNELS</span>

                    {ledgerData.map((epoch) => {
                        const currentId = epoch.epochId || epoch.id;
                        const isSelected = activeEpochId === currentId;
                        return (
                            <button
                                key={currentId}
                                onClick={() => handleEpochShift(currentId)}
                                className={`w-full text-left p-4 rounded-xl border font-mono transition-all duration-150 focus:outline-none flex flex-col gap-1.5 relative ${isSelected
                                        ? "bg-slate-900/50 border-cyan-500/50 shadow-xl shadow-cyan-950/10 text-slate-100"
                                        : "bg-slate-950/20 border-slate-900 text-slate-500 hover:border-slate-800 hover:text-slate-300"
                                    }`}
                            >
                                <div className="flex justify-between items-center w-full">
                                    <span className="text-xs font-black tracking-tight uppercase">{epoch.company}</span>
                                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-cyan-400 animate-pulse" : "bg-slate-800"}`} />
                                </div>
                                <div className="text-[11px] font-bold text-slate-400">{epoch.role}</div>
                                <div className="text-[10px] text-slate-600 mt-0.5">{epoch.duration}</div>
                            </button>
                        );
                    })}
                </nav>

                {/* RIGHT COLUMN: DETAIL DEEP DOCK STREAM */}
                <main className="lg:col-span-8 space-y-6">
                    {activeEpochMetadata ? (
                        <div className="space-y-6 animate-[fadeIn_0.15s_ease-out]">

                            {/* CURRENT ARCHITECTURAL STATUS BANNER */}
                            <div className="p-5 bg-slate-900/10 border border-slate-900 rounded-2xl space-y-3">
                                <div className="flex flex-wrap gap-2 items-center">
                                    <span className={`px-2 py-0.5 text-[9px] border font-mono font-bold rounded-md uppercase ${activeEpochMetadata.tier.style}`}>
                                        {activeEpochMetadata.tier.label}
                                    </span>
                                    <span className="px-2 py-0.5 text-[9px] border border-slate-800 bg-slate-950 text-slate-400 font-mono font-bold rounded-md uppercase">
                                        SECURITY_CLEARANCE_MAX
                                    </span>
                                </div>
                                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                                    {activeEpochMetadata.context}
                                </p>
                            </div>

                            {/* DYNAMIC MASTER PROJECT SPECIFICATION TABS */}
                            {activeEpochMetadata.masterProjects ? (
                                <div className="space-y-4">
                                    <div className="text-[10px] font-mono font-bold text-cyan-400 tracking-tight flex items-center gap-2 uppercase">
                                        <span>// CRITICAL PRINCIPLE PROJECTS ARRAY ({activeEpochMetadata.masterProjects.length})</span>
                                        <span className="h-px bg-slate-900 flex-1" />
                                    </div>

                                    {/* TAB SELECTOR LIST ARRAY */}
                                    <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                                        {activeEpochMetadata.masterProjects.map((proj, idx) => (
                                            <button
                                                key={proj.uid}
                                                onClick={() => setActiveProjectIdx(idx)}
                                                className={`px-3 py-1.5 text-[10px] font-mono rounded-lg border font-bold whitespace-nowrap transition-all focus:outline-none ${activeProjectIdx === idx
                                                        ? "bg-cyan-950/40 border-cyan-500 text-cyan-400 shadow-md shadow-cyan-950/30"
                                                        : "bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-400"
                                                    }`}
                                            >
                                                {proj.uid}
                                            </button>
                                        ))}
                                    </div>

                                    {/* VISUAL MONITORING WORK DESK */}
                                    <div className={`p-5 rounded-2xl border border-slate-900 shadow-sm transition-all ${activeEpochMetadata.signal}`}>
                                        <h4 className="text-sm font-black font-mono text-slate-200">
                                            {activeEpochMetadata.masterProjects[activeProjectIdx].title}
                                        </h4>
                                        <p className="text-xs text-slate-400 font-mono leading-relaxed mt-1.5">
                                            {activeEpochMetadata.masterProjects[activeProjectIdx].scope}
                                        </p>

                                        {/* DATA VECTOR MATRIX BLOCK */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 mt-2 border-t border-slate-900/60 font-mono text-[9px]">
                                            <div>
                                                <span className="text-slate-600 block">// TARGET_BLAST_RADIUS</span>
                                                <span className="text-slate-300 font-extrabold">{activeEpochMetadata.masterProjects[activeProjectIdx].blastRadius}</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-600 block">// COMPUTE_METRIC_THROUGHPUT</span>
                                                <span className="text-cyan-400 font-extrabold">{activeEpochMetadata.masterProjects[activeProjectIdx].throughput}</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-600 block">// ENGINE_STATUS</span>
                                                <span className="text-emerald-400 font-extrabold">{activeEpochMetadata.masterProjects[activeProjectIdx].status}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="border border-dashed border-slate-900 p-4 text-center text-slate-600 font-mono text-[10px] rounded-xl">
                                    [*] Standalone Node. Internal telemetry configurations do not deploy external cluster desks.
                                </div>
                            )}

                            {/* PRO CODER CORE ACHIEVEMENT LOOP */}
                            <div className="space-y-3">
                                <div className="text-[9px] font-mono font-bold text-slate-600 block tracking-tight uppercase">
                  // GRANULAR PRO-CODER METRICS & COMPILATION ARRAYS
                                </div>
                                <div className="space-y-2.5">
                                    {activeEpochMetadata.proCoderAchievements.map((achievement, idx) => (
                                        <div
                                            key={idx}
                                            className="text-xs text-slate-400 font-mono flex gap-3 items-start p-3 bg-slate-900/10 border border-slate-900/40 hover:border-slate-800 hover:text-slate-200 rounded-xl transition-colors group"
                                        >
                                            <span className="text-cyan-500 group-hover:scale-110 transition-transform">⚡</span>
                                            <span className="leading-relaxed">{achievement}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    ) : (
                        <div className="text-center py-12 font-mono text-xs text-slate-600">
                            [!] System Error. Target tracking vector lost.
                        </div>
                    )}
                </main>

            </div>
        </div>
    );
}