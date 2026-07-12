import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';

// ============================================================================
// 1. IMMUTABLE ARCHITECTURAL CONSTANTS & CONFIGURATIONS
// ============================================================================
const THEME = {
    ACTIVE_NODE: "bg-cyan-500 ring-4 ring-cyan-950 border-2 border-slate-100",
    HISTORICAL_NODE: "bg-slate-800 ring-4 ring-slate-950 border-2 border-slate-700 hover:border-cyan-500",
    GLOW_LINE: "bg-gradient-to-b from-cyan-500 via-purple-600 to-slate-900"
};

const GLYPHS = {
    LAUNCH: "🚀",
    VERIFIED: "🛡️",
    SYSTEM: "⚡"
};

const TIMELINE_DATA_REGISTRY = [
    {
        timelineId: "stream-alexicorn-2020",
        company: "ALEXICORN",
        role: "Senior Engineer",
        span: "2020 - 2026 (6 Years)",
        status: "CURRENT CORE",
        overview: "Led foundational full-stack transformations and bare-metal service meshes. Deployed 5 large principal-level projects across planetary scale infrastructures.",
        shards: [
            { code: "SHARD-01", title: "Omniscience Sharder Engine", detail: "Architected a state-partitioned sharding node handling zero-locking data writes over decentralized multi-cloud infrastructure." },
            { code: "SHARD-02", title: "Quantum Proxy Mesh", detail: "Engineered low-level network topology bypassing traditional TCP overhead via atomic-state serialization layers." },
            { code: "SHARD-03", title: "Titan-IX Memory Recycler", detail: "Authored an automated raw heap garbage interceptor removing garbage collector spikes across critical instances." },
            { code: "SHARD-04", title: "Aether Cryptographic Ledger", detail: "Designed hardware-accelerated state machine layer ensuring cryptographic zero-knowledge proof checks in sub-millisecond timelines." },
            { code: "SHARD-05", title: "Vortex Telemetry Sink", detail: "Engineered binary-stream ingestion parser with dynamic AST mapping, processing raw infrastructure telemetries flawlessly." }
        ],
        proCoderMilestones: [
            "God-Tier Pro Coder Rank: Maintained over 12,000+ flawless enterprise optimization commits.",
            "Recovered 42% lost compute capacity by dropping bloated high-order abstraction configurations."
        ]
    },
    {
        timelineId: "stream-faang-2000",
        company: "THE ULTRA-FAANG CONSORTIUM",
        role: "Distinguished Principal Fellow",
        span: "2000 - 2020 (20 Years)",
        status: "HISTORICAL HARDENED",
        overview: "Oversaw global hypervisors, datacenter container automation nodes, and micro-runtime compilation engines used by billions of global client states.",
        shards: [
            { code: "FAANG-S1", title: "Grid Container Infrastructure", detail: "Stripped down bloated host subsystems to implement bare-metal virtualization routines running in microseconds." }
        ],
        proCoderMilestones: [
            "Pioneered early data architecture methodologies managing exabyte scale storage structures seamlessly.",
            "Optimized load balancer distribution equations reducing worldwide regional edge drops to zero."
        ]
    },
    {
        timelineId: "stream-bell-1976",
        company: "FOUNDING LABS (BELL / ARPANET NODES)",
        role: "Core Systems Pioneer Architect",
        span: "1976 - 2000 (24 Years Archive)",
        status: "LEGACY ANCHOR",
        overview: "Contributed foundational blueprints to low-level assembly compilers, initial networking transport layer loops, and raw POSIX memory allocators.",
        shards: null,
        proCoderMilestones: [
            "Co-authored primitive multi-threaded asynchronous polling configurations still used in base kernel rings.",
            "Hand-optimized assembly memory routines to bypass physical registers limitations on early machines."
        ]
    }
];

export default function ExperienceTimeline() {
    const [chronoNodes, setChronoNodes] = useState([]);
    const [inspectedNodeId, setInspectedNodeId] = useState("stream-alexicorn-2020");
    const [isAssembling, setIsAssembling] = useState(true);

    const trackingMetricsRef = useRef({ navigationTaps: 0, threadHealth: "OPERATIONAL" });

    // ============================================================================
    // 2. ASYNCHRONOUS COMPILATION PIPELINE (Promise Driven)
    // ============================================================================
    useEffect(() => {
        let isThreadSecure = true;

        new Promise((resolve, reject) => {
            setTimeout(() => {
                TIMELINE_DATA_REGISTRY.length > 0
                    ? resolve([...TIMELINE_DATA_REGISTRY])
                    : reject(new Error("Timeline Ledger Node Empty."));
            }, 200);
        })
            .then((payload) => {
                if (isThreadSecure) {
                    setChronoNodes(payload);
                    setIsAssembling(false);
                }
            })
            .catch((err) => {
                console.error("[CRITICAL SHARD FAULT]", err);
                if (isThreadSecure) setIsAssembling(false);
            });

        return () => { isThreadSecure = false; };
    }, []);

    // ============================================================================
    // 3. MEMOIZED DATA SELECTORS & INTERACTION HANDLERS
    // ============================================================================
    const focusedNodeData = useMemo(() => {
        return chronoNodes.find(node => node.timelineId === inspectedNodeId) || null;
    }, [chronoNodes, inspectedNodeId]);

    const interactWithNode = useCallback((targetId) => {
        setInspectedNodeId(targetId);
        trackingMetricsRef.current.navigationTaps += 1;
    }, []);

    // ============================================================================
    // 4. SUB-RENDER PATTERNS (Prevents Main Return Pollution)
    // ============================================================================
    const renderLeftNavigationStream = useMemo(() => {
        return (
            <div className="lg:col-span-5 relative pl-6 border-l-2 border-slate-900 ml-3 py-2 space-y-6">
                <div className={`absolute top-0 bottom-0 left-[-2px] w-0.5 ${THEME.GLOW_LINE} opacity-30`} />

                {chronoNodes.map((item) => {
                    const isSelected = inspectedNodeId === item.timelineId;
                    return (
                        <div
                            key={item.timelineId}
                            onClick={() => interactWithNode(item.timelineId)}
                            className="relative group cursor-pointer"
                        >
                            <div className={`absolute left-[-31px] top-1.5 w-4 h-4 rounded-full transition-all duration-200 ${isSelected ? THEME.ACTIVE_NODE : THEME.HISTORICAL_NODE
                                }`} />

                            <div className={`p-4 rounded-xl border transition-all ${isSelected ? "bg-slate-900/40 border-cyan-500/30 shadow-md" : "bg-slate-950 border-slate-900 hover:border-slate-800"
                                }`}>
                                <span className="text-[9px] font-mono font-bold block text-cyan-500 tracking-tighter uppercase">// {item.status}</span>
                                <h3 className="text-sm font-black font-mono text-slate-200 mt-0.5 uppercase group-hover:text-cyan-400 transition-colors">
                                    {item.company}
                                </h3>
                                <div className="text-xs font-semibold text-slate-400 mt-0.5">{item.role}</div>
                                <div className="text-[10px] font-mono text-slate-600 mt-1 font-bold">{item.span}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }, [chronoNodes, inspectedNodeId, interactWithNode]);

    const renderActiveInspectorView = useMemo(() => {
        if (!focusedNodeData) {
            return (
                <div className="text-center py-12 font-mono text-xs text-slate-600">[!] Core Trace Failure. Pointer invalid.</div>
            );
        }

        return (
            <div className="space-y-5 animate-[fadeIn_0.15s_ease-out]">
                {/* Overview Brief Box */}
                <div className="p-4 bg-slate-900/10 border border-slate-900 rounded-xl space-y-1.5">
                    <span className="text-[9px] font-mono text-slate-500 font-bold block uppercase">// SYSTEM SCOPE OVERVIEW</span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{focusedNodeData.overview}</p>
                </div>

                {/* Dynamic Project Shards Container */}
                {focusedNodeData.shards ? (
                    <div className="space-y-3">
                        <span className="text-[9px] font-mono font-bold text-cyan-400 tracking-tight block uppercase">
                            {GLYPHS.LAUNCH} LEVEL 5 ARCHITECTED HARDENED SHARDS ({focusedNodeData.shards.length})
                        </span>
                        <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1 border border-slate-900/60 p-2 rounded-xl bg-slate-950">
                            {focusedNodeData.shards.map((shard) => (
                                <div key={shard.code} className="p-3 bg-slate-900/20 border border-slate-900/80 rounded-lg font-mono text-xs hover:border-slate-800 transition-colors">
                                    <div className="flex justify-between items-center text-[10px] font-bold text-cyan-400">
                                        <span>{shard.title}</span>
                                        <span className="text-slate-600 text-[9px]">{shard.code}</span>
                                    </div>
                                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{shard.detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="border border-dashed border-slate-900 p-4 text-center text-slate-600 font-mono text-[10px] rounded-xl">
                        [*] Isolation Node System. No discrete shards configured.
                    </div>
                )}

                {/* Pro-Coder Milestones Log */}
                <div className="space-y-2">
                    <span className="text-[9px] font-mono font-bold text-slate-600 block uppercase">{GLYPHS.SYSTEM} VERIFIED LOG MILESTONES</span>
                    <div className="space-y-1.5">
                        {focusedNodeData.proCoderMilestones.map((milestone, idx) => (
                            <div key={idx} className="text-xs text-slate-400 font-mono flex gap-2.5 items-start p-3 bg-slate-900/10 border border-slate-900/40 rounded-xl">
                                <span className="text-cyan-500">{GLYPHS.VERIFIED}</span>
                                <span className="leading-relaxed flex-1">{milestone}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }, [focusedNodeData]);

    // ============================================================================
    // 5. ABSOLUTE CONSOLE TERMINAL LAYOUT
    // ============================================================================
    if (isAssembling) {
        return (
            <div className="w-full min-h-[400px] bg-slate-950 flex flex-col items-center justify-center font-mono text-xs text-slate-600 border border-slate-900 rounded-3xl p-6">
                <div className="w-5 h-5 border border-t-cyan-500 border-r-transparent border-slate-800 rounded-full animate-spin mb-3" />
                <div>// Compiling Temporal Stream...</div>
            </div>
        );
    }

    return (
        <div className="w-full bg-slate-950 text-slate-100 border border-slate-900 rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 font-sans shadow-2xl selection:bg-cyan-500/20 max-w-7xl mx-auto">

            {/* METRICS HEADER */}
            <div className="border-b border-slate-900 pb-5 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <span className="text-[10px] font-mono text-cyan-500 tracking-wider block uppercase">// TEMPORAL RUNTIME CHRONO</span>
                    <h2 className="text-xl sm:text-2xl font-black font-mono tracking-tighter uppercase mt-0.5 bg-gradient-to-r from-slate-100 to-slate-500 bg-clip-text text-transparent">
                        CHRONO_TIMELINE_LEDGER
                    </h2>
                </div>
                <div className="flex gap-4 font-mono text-[9px] text-slate-500 bg-slate-900/50 px-3 py-1.5 border border-slate-900 rounded-xl">
                    <span>TAPS: <span className="text-cyan-400 font-bold">{trackingMetricsRef.current.navigationTaps}</span></span>
                    <span>KERNEL: <span className="text-emerald-400 font-bold">{trackingMetricsRef.current.threadHealth}</span></span>
                </div>
            </div>

            {/* CHRONO TOPOLOGY GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {renderLeftNavigationStream}
                <main className="lg:col-span-7">
                    {renderActiveInspectorView}
                </main>
            </div>

        </div>
    );
}
