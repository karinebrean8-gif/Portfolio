import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';

// ============================================================================
// 1. IMMUTABLE ARCHITECTURAL REGISTRIES & DICTIONARIES
// ============================================================================
const INFRASTRUCTURE_TIERS = {
    GOD_CORE: { title: "Level 9 Global Infrastructure Invariant", accent: "from-purple-500/20 to-indigo-950/40 border-purple-800/60 text-purple-400" },
    HYPERSCALE: { title: "Ultra-FAANG Distinguished Shard Fellow", accent: "from-emerald-500/20 to-teal-950/40 border-emerald-800/60 text-emerald-400" },
    LEGACY_FOUNDATION: { title: "Founding Systems Pioneer Grid", accent: "from-cyan-500/20 to-blue-950/40 border-cyan-800/60 text-cyan-400" }
};

const PROTOCOL_GLYPHS = {
    CODE: "🧬",
    SCALE: "📊",
    BLAST: "💥",
    METRIC: "⚡"
};

// ============================================================================
// 2. THE CHRONO-MATRIX MEMORY LEDGER (Alexicorn + 50 Years Invariants)
// ============================================================================
const MASTER_ROLE_REPOSITORY = [
    {
        uid: "role-node-01-alexicorn",
        company: "ALEXICORN",
        role: "Senior Engineer",
        tenure: "6 Years Matrix (2020 - 2026)",
        tier: INFRASTRUCTURE_TIERS.GOD_CORE,
        missionBrief: "Commanded the design and execution of hyper-scale state machines, multi-region database sharding frameworks, and decoupled micro-kernels. Optimized absolute performance profiles on standard enterprise nodes.",

        // Principal Level 5 Macro Projects Matrix
        coreProjects: [
            {
                id: "ALEX-P5-01",
                name: "Omniscience Sharder Engine",
                scope: "Architected a state-partitioned sharding node handling zero-locking concurrent data mutations over distributed cloud topologies.",
                blastRadius: "Global Distributed Persistence Layer",
                throughput: "1.8B Mutative Tx / Min",
                efficiency: "+42% Compute Recovery"
            },
            {
                id: "ALEX-P5-02",
                name: "Quantum Proxy Mesh (QPM)",
                scope: "Engineered ultra-low-latency reverse proxy configurations bypassing standard TCP handshake blocks through binary AST packing.",
                blastRadius: "Edge Nodes Transport Ring",
                throughput: "450 Terabits / Sec Peak",
                efficiency: "-35ms Regional Latency Shards"
            },
            {
                id: "ALEX-P5-03",
                name: "Titan-IX Memory Recycler",
                scope: "Authored standalone zero-overhead heap management script intercepting runtimes allocations to avoid blocking engine frames.",
                blastRadius: "V8 Isolated Virtualization Cells",
                throughput: "0ms Stop-The-World Framework",
                efficiency: "100% Leak Prevention"
            },
            {
                id: "ALEX-P5-04",
                name: "Aether Cryptographic Ledger",
                scope: "Built custom zero-knowledge security validation layer handling cross-border financial payload authentication without database reads.",
                blastRadius: "Distributed Compliance Vaults",
                throughput: "800k Validations / Sec",
                efficiency: "Zero Compromise Execution"
            },
            {
                id: "ALEX-P5-05",
                name: "Vortex Telemetry Sink",
                scope: "Implemented binary-stream ingestion engine to pipe, analyze, and map real-time distributed application monitoring events.",
                blastRadius: "Global Fleet Telemetry Ingestor",
                throughput: "24 Billion Log Vectors / Min",
                efficiency: "Real-time Processing Stream"
            }
        ],
        proCoderMetrics: [
            "God-Tier Pro Coder Rank: Maintained 12,000+ optimized algorithmic commits across system-critical core repositories.",
            "Redesigned multi-tenant memory-mapping modules to eliminate thread contention locks under high spikes.",
            "Mentored a specialized engineering cell to deploy robust, decoupled full-stack models globally.",
            "Re-engineered distributed state pipelines ensuring data integrity across decoupled remote storage arrays."
        ]
    },
    {
        uid: "role-node-02-faang",
        company: "ULTRA-FAANG CORP",
        role: "Distinguished Principal Architect",
        tenure: "24 Years Matrix (1996 - 2020)",
        tier: INFRASTRUCTURE_TIERS.HYPERSCALE,
        missionBrief: "Oversaw international computing clusters, virtualization layer deployments, and runtime optimizations utilized by millions of client interfaces globally.",
        coreProjects: [
            {
                id: "FAANG-P1",
                name: "OmniContainer Fleet Management",
                scope: "Stripped native host systems to implement bare-metal sub-second application instance pooling vectors.",
                blastRadius: "Global Virtualized Fleet",
                throughput: "45 Million Active Nodes",
                efficiency: "99.9999% Hardware Utilization"
            }
        ],
        proCoderMetrics: [
            "Authored load balancer packet hashing architectures reducing globally dropped regional connections to zero.",
            "Designed data encoding primitives parsing petabytes of user data streams without CPU cache eviction spikes."
        ]
    },
    {
        uid: "role-node-03-bell",
        company: "BELL & ARPANET LABS",
        role: "Founding Core Systems Engineer",
        tenure: "20 Years Foundations (1976 - 1996)",
        tier: INFRASTRUCTURE_TIERS.LEGACY_FOUNDATION,
        missionBrief: "Contributed directly to primitive low-level assembly compiling arrays, networking socket layer protocols, and hardware multiplexer interfaces.",
        coreProjects: null,
        proCoderMetrics: [
            "Co-developed initial asynchronous polling patterns which formed the foundation of early multi-process scheduling loops.",
            "Hand-tuned registry distribution instructions on primitive compute units to maximize performance profiles."
        ]
    }
];

export default function RolesDetails() {
    const [registryData, setRegistryData] = useState([]);
    const [focusedRoleUid, setFocusedRoleUid] = useState("role-node-01-alexicorn");
    const [projectSelectionIdx, setProjectSelectionIdx] = useState(0);
    const [isCompiling, setIsCompiling] = useState(true);

    const hardwareLookupCache = useRef({ executionCycles: 0, threadHealth: "NOMINAL" });

    // ============================================================================
    // 3. ASYNCHRONOUS ENGINE COMPILATION PIPELINE
    // ============================================================================
    useEffect(() => {
        let isThreadIntact = true;

        const compileRegistryPayload = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (MASTER_ROLE_REPOSITORY && MASTER_ROLE_REPOSITORY.length > 0) {
                        resolve([...MASTER_ROLE_REPOSITORY]);
                    } else {
                        reject(new Error("Registry Kernel Invariant Denied."));
                    }
                }, 300); // Hypersonic sub-second compilation delay
            });
        };

        compileRegistryPayload()
            .then((dataMatrix) => {
                if (isThreadIntact) {
                    setRegistryData(dataMatrix);
                    setIsCompiling(false);
                }
            })
            .catch((err) => {
                console.error("[CRITICAL KERNEL CRASH]", err);
                if (isThreadIntact) setIsCompiling(false);
            });

        return () => { isThreadIntact = false; };
    }, []);

    // ============================================================================
    // 4. MEMOIZED EXTRACTORS (Saves compute overhead during intense states shift)
    // ============================================================================
    const activeRoleMetadata = useMemo(() => {
        return registryData.find(item => item.uid === focusedRoleUid) || null;
    }, [registryData, focusedRoleUid]);

    const selectActiveRole = useCallback((targetUid) => {
        setFocusedRoleUid(targetUid);
        setProjectSelectionIdx(0); // Safely clear selected sub-project indexes to protect UI alignment
        hardwareLookupCache.current.executionCycles += 1;
    }, []);

    // ============================================================================
    // 5. MASTER CONSOLE GRAPHICAL RENDER
    // ============================================================================
    if (isCompiling) {
        return (
            <div className="w-full min-h-[400px] bg-slate-950 flex flex-col items-center justify-center font-mono text-xs text-slate-600 border border-slate-900 rounded-3xl p-6">
                <div className="w-5 h-5 border border-t-cyan-500 border-r-transparent border-slate-800 rounded-full animate-spin mb-3" />
                <div>// Executing Granular Career Matrix Assembly Threads...</div>
            </div>
        );
    }

    return (
        <div className="w-full bg-slate-950 text-slate-100 border border-slate-900 rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 font-sans shadow-2xl selection:bg-cyan-500/20 max-w-7xl mx-auto">

            {/* MATRIX TELEMETRY HEADER ELEMENT */}
            <div className="border-b border-slate-900 pb-5 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <span className="text-[10px] font-mono text-cyan-500 tracking-wider block uppercase">// SUBSYSTEM ENGINE INSPECTOR</span>
                    <h2 className="text-xl sm:text-2xl font-black font-mono tracking-tighter uppercase mt-0.5 bg-gradient-to-r from-slate-100 to-slate-600 bg-clip-text text-transparent">
                        ROLE_INSPECTION_DESK
                    </h2>
                </div>
                <div className="flex gap-4 font-mono text-[9px] text-slate-500 bg-slate-900/50 px-3 py-1.5 border border-slate-900 rounded-xl">
                    <span>CYCLES_TICKED: <span className="text-cyan-400 font-bold">{hardwareLookupCache.current.executionCycles}</span></span>
                    <span>KERNEL_STATE: <span className="text-emerald-400 font-bold">{hardwareLookupCache.current.threadHealth}</span></span>
                </div>
            </div>

            {/* CORE GRANULAR DISTRIBUTION VIEWPORT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                {/* LEFT COLUMN PANEL: CHANNEL NAV SELECTORS */}
                <nav className="lg:col-span-4 space-y-2.5">
                    <span className="text-[9px] font-mono font-bold text-slate-600 block px-1 uppercase">// HISTORICAL NODES REGISTRY</span>
                    {registryData.map((node) => {
                        const isSelected = focusedRoleUid === node.uid;
                        return (
                            <button
                                key={node.uid}
                                onClick={() => selectActiveRole(node.uid)}
                                className={`w-full text-left p-4 rounded-xl border font-mono transition-all duration-150 focus:outline-none flex flex-col gap-1.5 ${isSelected
                                        ? "bg-slate-900/40 border-cyan-500/40 shadow-lg text-slate-100"
                                        : "bg-slate-950/20 border-slate-900 text-slate-500 hover:border-slate-800 hover:text-slate-300"
                                    }`}
                            >
                                <div className="flex justify-between items-center w-full">
                                    <span className="text-xs font-black tracking-tight uppercase text-slate-200">{node.company}</span>
                                    <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-cyan-400 animate-pulse" : "bg-slate-800"}`} />
                                </div>
                                <div className="text-[11px] font-bold text-slate-400">{node.role}</div>
                                <div className="text-[9px] text-slate-600 font-semibold">{node.tenure}</div>
                            </button>
                        );
                    })}
                </nav>

                {/* RIGHT COLUMN PANEL: MASTER INSPECTOR DISPLAY VIEW */}
                <main className="lg:col-span-8 space-y-5">
                    {activeRoleMetadata ? (
                        <div className="space-y-5 animate-[fadeIn_0.15s_ease-out]">

                            {/* TARGET BRIEF SUMMARY LAYER */}
                            <div className={`p-5 bg-gradient-to-b border rounded-2xl space-y-2 ${activeRoleMetadata.tier.accent}`}>
                                <span className="text-[9px] font-mono tracking-wider block font-black uppercase">
                  // {activeRoleMetadata.tier.title}
                                </span>
                                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                                    {activeRoleMetadata.missionBrief}
                                </p>
                            </div>

                            {/* CORE PRINCIPLE LEVEL 5 SUB-PROJECTS DESK COMPILER */}
                            {activeRoleMetadata.coreProjects ? (
                                <div className="space-y-3">
                                    <div className="text-[10px] font-mono font-bold text-cyan-400 tracking-tight flex items-center gap-2 uppercase">
                                        <span>{PROTOCOL_GLYPHS.CODE} Core Enterprise Clusters ({activeRoleMetadata.coreProjects.length})</span>
                                        <span className="h-px bg-slate-900 flex-1" />
                                    </div>

                                    {/* SUB-PROJECT HORIZONTAL CONTROL ARRAY */}
                                    <div className="flex gap-1 overflow-x-auto pb-1.5 scrollbar-none">
                                        {activeRoleMetadata.coreProjects.map((proj, idx) => (
                                            <button
                                                key={proj.id}
                                                onClick={() => setProjectSelectionIdx(idx)}
                                                className={`px-3 py-1 text-[10px] font-mono rounded-md border font-black transition-all focus:outline-none ${projectSelectionIdx === idx
                                                        ? "bg-cyan-950/40 border-cyan-500 text-cyan-400 shadow-md"
                                                        : "bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-400"
                                                    }`}
                                            >
                                                {proj.id}
                                            </button>
                                        ))}
                                    </div>

                                    {/* ACTIVE PROJECT DATA GRAPH SEGMENT */}
                                    <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-2.5">
                                        <h4 className="text-xs sm:text-sm font-black font-mono text-slate-200">
                                            {activeRoleMetadata.coreProjects[projectSelectionIdx].name}
                                        </h4>
                                        <p className="text-[11px] sm:text-xs text-slate-400 font-mono leading-relaxed">
                                            {activeRoleMetadata.coreProjects[projectSelectionIdx].scope}
                                        </p>

                                        {/* SYSTEM OUTPUT INFRA-GRID */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 mt-2 border-t border-slate-900/60 font-mono text-[9px]">
                                            <div>
                                                <span className="text-slate-600 block">{PROTOCOL_GLYPHS.BLAST} BLAST_RADIUS</span>
                                                <span className="text-slate-300 font-bold">{activeRoleMetadata.coreProjects[projectSelectionIdx].blastRadius}</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-600 block">{PROTOCOL_GLYPHS.SCALE} INTENSITY_THROUGHPUT</span>
                                                <span className="text-cyan-400 font-bold">{activeRoleMetadata.coreProjects[projectSelectionIdx].throughput}</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-600 block">{PROTOCOL_GLYPHS.METRIC} OPTIMIZATION_METRIC</span>
                                                <span className="text-emerald-400 font-bold">{activeRoleMetadata.coreProjects[projectSelectionIdx].efficiency}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="border border-dashed border-slate-900 p-4 text-center text-slate-600 font-mono text-[10px] rounded-xl">
                                    [*] Isolation Node Checked. Internal configurations skip advanced sub-project telemetry.
                                </div>
                            )}

                            {/* GRANULAR PRO-CODER METRICS VECTOR COMPILER */}
                            <div className="space-y-2.5">
                                <span className="text-[9px] font-mono font-bold text-slate-600 block tracking-tight uppercase">
                  // VERIFIED LOGISTIC PRO-CODER METRICS LOGS
                                </span>
                                <div className="space-y-2">
                                    {activeRoleMetadata.proCoderMetrics.map((logMetric, idx) => (
                                        <div
                                            key={idx}
                                            className="text-xs text-slate-400 font-mono flex gap-2.5 items-start p-3 bg-slate-900/10 border border-slate-900/40 hover:border-slate-800 hover:text-slate-200 rounded-xl transition-colors group"
                                        >
                                            <span className="text-cyan-400 group-hover:scale-110 transition-transform">⚙️</span>
                                            <span className="leading-relaxed flex-1">{logMetric}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    ) : (
                        <div className="text-center py-12 font-mono text-xs text-slate-600">
                            [!] Core Trace Failure. Select active registry stack pointer.
                        </div>
                    )}
                </main>

            </div>
        </div>
    );
}