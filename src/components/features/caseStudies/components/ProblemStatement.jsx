import React, { useState, useEffect, useMemo, useCallback } from 'react';

// ============================================================================
// 1. ARCHITECTURAL DOMAIN REGISTRY & IMMUTABLE DATA SCHEMAS
// ============================================================================

const SYSTEM_CRISIS_TIERS = {
    TIER_0_HALT: 'CRITICAL_GLOBAL_OUTAGE',
    TIER_1_DEGRADED: 'LATENCY_SPIKE_DEGRADATION',
    TIER_2_LEAK: 'MEMORY_ENTROPY_LEAK'
};

const SEVERITY_THEME_REGISTRY = {
    [SYSTEM_CRISIS_TIERS.TIER_0_HALT]: {
        border: 'border-rose-600/40 hover:border-rose-500',
        bg: 'bg-rose-950/10 shadow-rose-950/20',
        text: 'text-rose-400',
        glow: 'bg-rose-500',
        badge: 'bg-rose-950/60 border-rose-900/60 text-rose-300'
    },
    [SYSTEM_CRISIS_TIERS.TIER_1_DEGRADED]: {
        border: 'border-amber-600/40 hover:border-amber-500',
        bg: 'bg-amber-950/10 shadow-amber-950/20',
        text: 'text-amber-400',
        glow: 'bg-amber-500',
        badge: 'bg-amber-950/60 border-amber-900/60 text-amber-300'
    },
    [SYSTEM_CRISIS_TIERS.TIER_2_LEAK]: {
        border: 'border-cyan-600/40 hover:border-cyan-500',
        bg: 'bg-cyan-950/10 shadow-cyan-950/20',
        text: 'text-cyan-400',
        glow: 'bg-cyan-500',
        badge: 'bg-cyan-950/60 border-cyan-900/60 text-cyan-300'
    }
};

const COMPONENT_MANIFEST_STATEMENTS = [
    {
        uuid: "PRB-CORE-991",
        tier: SYSTEM_CRISIS_TIERS.TIER_0_HALT,
        systemComponent: "Cross-Continental Raft Consensus Engine",
        title: "Split-Brain Invariant Breach Under High-IOPS Packet Partitioning",
        impactScore: "99.997% Blast Radius",
        manifesto: "During asynchronous network partition sequences between APAC-East and US-Central, sub-consensus micro-nodes forged rogue state mutation epochs. The distributed transactional ledger partially split, dropping non-idempotent mutation frames.",
        diagnostics: {
            rootCause: "Optimistic network timeout settings failed to calculate physical undersea fiber micro-refractions under solar-flare magnetic degradation loops.",
            telemetryMetastasis: ["TCP Buffer Saturation", "Zombie Thread Spawning", "Un-ACKed Packet Replication Loop"],
            blastBoundary: "Global Wire-Transfer Core Infrastructure"
        },
        mitigationStrategy: "Injected a hard Byzantine Fault Tolerant (BFT) quarantine barrier with Zero-Allocation memory rings running inside isolated Rust routines."
    },
    {
        uuid: "PRB-EDGE-042",
        tier: SYSTEM_CRISIS_TIERS.TIER_1_DEGRADED,
        systemComponent: "Multi-Region Distributed Gateway Layer",
        title: "Cascading Cache Storm Over Thundering-Herd Core Invalidation",
        impactScore: "3400ms Latency Degrade",
        manifesto: "A single heavy database read worker node crashed, clearing the shared memory grid layer. 10+ million concurrent edge-node clients immediately bypassed the edge and bombarded the origin cluster, resulting in CPU thread pool starvation.",
        diagnostics: {
            rootCause: "Lack of reactive mutual exclusion (Mutex) locks across the dynamic cache compilation pipeline keys.",
            telemetryMetastasis: ["Socket Descriptor Exhaustion", "GC Allocation Spikes", "Kernel Packet Dropping"],
            blastBoundary: "Edge API Ingestion Gateway Layer"
        },
        mitigationStrategy: "Engineered single-flight request coalescing registers and distributed sliding-window token bucket micro-throttles."
    },
    {
        uuid: "PRB-UI-773",
        tier: SYSTEM_CRISIS_TIERS.TIER_2_LEAK,
        systemComponent: "Real-Time Telemetry Interface Engine",
        title: "JavaScript Engine Heap Exhaustion via Micro-Event Stream Sinks",
        impactScore: "60FPS Drop to Browser Freeze",
        manifesto: "The high-frequency Web-Socket vector feed (100k+ packets/sec) leaked un-garbage-collected closure references inside deep nested rendering arrays, saturating V8 heap allocation boundaries.",
        diagnostics: {
            rootCause: "Anonymous inline lambdas capturing component scope inside event handlers without un-subscription buffers on DOM detachment loops.",
            telemetryMetastasis: ["V8 Old Generation Saturation", "Main Thread Blocking", "Layout Thrashing loops"],
            blastBoundary: "Mission Control Monitoring Workspace Client"
        },
        mitigationStrategy: "Decoupled state injection using a flat array vector arena with direct canvas blitting bypassing React's internal reconciler."
    }
];

// ============================================================================
// 2. INFRASTRUCTURE LAYER: HARDWARE TELEMETRY LOG BROKER (Promises & Simulation)
// ============================================================================
const HardwareTelemetryBroker = {
    fetchImpactMetrics: async (problemUuid) => {
        if (!problemUuid) throw new Error("FATAL ENGINE ERROR: Context reference pointer null.");

        // Simulating raw stream read from hardware log pipes
        await new Promise(resolve => setTimeout(resolve, 400));

        return {
            entropyBitsDelta: `+${(Math.random() * 8 + 2).toFixed(4)}% H-Entropy`,
            kernelInterruptFails: Math.floor(Math.random() * 800 + 120),
            signatureHash: `SHA256_VERIFIED_${Math.random().toString(16).substring(3, 11).toUpperCase()}`
        };
    }
};

// ============================================================================
// 3. SUB-PRESENTATION ATOMIC COMPONENTS (Clean Code Separation)
// ============================================================================

const DiagnosticPanel = ({ activeNode, telemetry, loading }) => {
    if (!activeNode) return null;

    return (
        <div className="space-y-6 animate-[fadeIn_0.15s_ease-out]">
            <div className="space-y-3">
                <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-[10px] font-mono tracking-wider font-extrabold text-slate-500 uppercase">// PROBLEM VECTOR</span>
                    <span className="text-[10px] font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-900 text-rose-500 font-bold">
                        {activeNode.uuid}
                    </span>
                </div>
                <h2 className="text-xl md:text-3xl font-black font-mono tracking-tight text-slate-100">
                    {activeNode.title}
                </h2>
                <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl">
                    <span className="text-[10px] font-mono font-bold text-indigo-400 block mb-1">// EVENT MANIFESTO:</span>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">{activeNode.manifesto}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950/60 border border-slate-900 rounded-xl space-y-2">
                    <span className="text-[10px] font-mono font-bold text-amber-500 block">// METASTASIS PATHOLOGY</span>
                    <ul className="space-y-1.5">
                        {activeNode.diagnostics.telemetryMetastasis.map((log, i) => (
                            <li key={i} className="text-xs font-mono text-slate-400 flex items-center gap-2">
                                <span className="text-rose-500/60">⚡</span> {log}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="p-4 bg-slate-950/60 border border-slate-900 rounded-xl space-y-2">
                    <span className="text-[10px] font-mono font-bold text-cyan-500 block">// CORE IMPACT BOUNDARY</span>
                    <p className="text-xs font-mono text-slate-300 leading-relaxed">{activeNode.diagnostics.blastBoundary}</p>
                    <div className="pt-2 border-t border-slate-900">
                        <span className="text-[9px] text-slate-500 block font-mono">BLAST_RADIUS_METRIC</span>
                        <span className="text-xs font-mono font-bold text-rose-400">{activeNode.impactScore}</span>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-emerald-950/10 border border-emerald-900/40 rounded-xl space-y-1">
                <span className="text-[10px] font-mono font-bold text-emerald-400 block">// INJECTED ARCHITECTURAL RESOLUTION</span>
                <p className="text-xs font-mono text-slate-300 leading-relaxed">{activeNode.mitigationStrategy}</p>
            </div>

            {/* Dynamic Async Broker Stream Panel */}
            <div className="space-y-2">
                <h4 className="text-[10px] font-mono font-black text-slate-600 uppercase tracking-widest">// RAW MEMORY BUFFER STREAM DIAGNOSTICS</h4>
                {loading ? (
                    <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl flex items-center justify-center gap-2 font-mono text-xs text-slate-500 animate-pulse">
                        <div className="h-3 w-3 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                        Compiling telemetry matrix across hardware buses...
                    </div>
                ) : telemetry ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 font-mono text-[10px] p-3 bg-slate-950 border border-slate-900 rounded-xl">
                        <div className="flex justify-between md:border-r border-slate-900 md:pr-3">
                            <span className="text-slate-500">ENTROPY_DELTA</span>
                            <span className="text-rose-400 font-bold">{telemetry.entropyBitsDelta}</span>
                        </div>
                        <div className="flex justify-between md:border-r border-slate-900 md:px-3">
                            <span className="text-slate-500">INTERRUPT_FAILS</span>
                            <span className="text-amber-400 font-bold">{telemetry.kernelInterruptFails} FLT</span>
                        </div>
                        <div className="flex justify-between md:pl-3">
                            <span className="text-slate-500">HASH_SIG</span>
                            <span className="text-cyan-400 font-bold">{telemetry.signatureHash}</span>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

// ============================================================================
// 4. CORE RECONCILER CONTAINER (Main Pipeline Entry Point)
// ============================================================================

export default function ProblemStatement() {
    const [selectedUuid, setSelectedUuid] = useState(COMPONENT_MANIFEST_STATEMENTS[0].uuid);
    const [tierFilter, setTierFilter] = useState('ALL_CRISES');
    const [searchQuery, setSearchQuery] = useState('');

    // Real-time Hardware Telemetry Vector State
    const [telemetryState, setTelemetryState] = useState({ payload: null, loading: false });

    // Functional Pointer Evaluation Loop
    const activeNode = useMemo(() => {
        return COMPONENT_MANIFEST_STATEMENTS.find(c => c.uuid === selectedUuid) || COMPONENT_MANIFEST_STATEMENTS[0];
    }, [selectedUuid]);

    // Thread Loop for Async Promise Resolution
    useEffect(() => {
        let isPipelineActive = true;
        setTelemetryState(prev => ({ ...prev, loading: true }));

        HardwareTelemetryBroker.fetchImpactMetrics(activeNode.uuid)
            .then(metrics => {
                if (isPipelineActive) setTelemetryState({ payload: metrics, loading: false });
            })
            .catch(() => {
                if (isPipelineActive) setTelemetryState({ payload: null, loading: false });
            });

        return () => { isPipelineActive = false; };
    }, [activeNode.uuid]);

    // High Density Filtering Pipeline Map Matrix
    const processedStatements = useMemo(() => {
        return COMPONENT_MANIFEST_STATEMENTS.filter(node => {
            // Functional Multi-Condition Isolation Pattern (No dirty nested blocks)
            const matchTier = tierFilter === 'ALL_CRISES' || node.tier === tierFilter;

            const cleanQuery = searchQuery.trim().toLowerCase();
            const matchSearch = !cleanQuery ||
                node.title.toLowerCase().includes(cleanQuery) ||
                node.systemComponent.toLowerCase().includes(cleanQuery) ||
                node.manifesto.toLowerCase().includes(cleanQuery);

            return matchTier && matchSearch;
        });
    }, [tierFilter, searchQuery]);

    const purgeSystemState = useCallback(() => {
        setSelectedUuid(COMPONENT_MANIFEST_STATEMENTS[0].uuid);
        setTierFilter('ALL_CRISES');
        setSearchQuery('');
    }, []);

    return (
        <div className="w-full min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 lg:p-12 font-sans antialiased selection:bg-rose-500/30 selection:text-rose-300">

            {/* ENTERPRISE WAR-ROOM SYSTEMS CONTROL HEADER */}
            <header className="w-full border-b border-slate-900/80 pb-6 mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-rose-500 shadow-lg shadow-rose-500/50 animate-pulse" />
                        <span className="font-mono text-xs font-black tracking-widest text-slate-500 uppercase">// CRISIS VECTOR ANALYSIS COMPILATION FRAMEWORK</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black font-mono tracking-tighter bg-gradient-to-r from-slate-100 via-slate-300 to-slate-500 bg-clip-text text-transparent">
                        Systemic Failure Paradigms
                    </h1>
                    <p className="text-xs text-slate-500 font-mono">Deep-dive into the architectural bottlenecks and system failures I was brought in to isolate and eliminate.</p>
                </div>
                <button
                    onClick={purgeSystemState}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-mono rounded-xl transition-all shadow-xl"
                >
                    ← RESET_PIPELINE_FILTERS
                </button>
            </header>

            {/* ARCHITECTURE DEPLOYMENT PANELS CONTENT MATRIX */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* LEFT COMPONENT COLUMN: INCIDENT GRAPH TRACKING ITERATOR */}
                <section className="lg:col-span-5 space-y-4">
                    <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-4 md:p-6 shadow-2xl backdrop-blur-md space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-mono text-xs font-extrabold uppercase tracking-widest text-slate-400">// INCIDENT LEDGER INDEX</h3>
                            <span className="text-[10px] font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-900 text-slate-500">
                                TOTAL_INCIDENTS: {processedStatements.length}
                            </span>
                        </div>

                        {/* PIPELINE DISPATCH FILTERS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Query failure vectors..."
                                className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500/50 text-slate-200 px-3 py-2 text-xs font-mono rounded-xl focus:outline-none placeholder:text-slate-800 transition-colors"
                            />
                            <select
                                value={tierFilter}
                                onChange={(e) => setTierFilter(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 text-slate-300 px-3 py-2 text-xs font-mono rounded-xl focus:outline-none cursor-pointer transition-colors hover:border-slate-800"
                            >
                                <option value="ALL_CRISES">ALL SEVERITY MATRIX</option>
                                <option value={SYSTEM_CRISIS_TIERS.TIER_0_HALT}>TIER-0 GLOBAL HALT</option>
                                <option value={SYSTEM_CRISIS_TIERS.TIER_1_DEGRADED}>TIER-1 LATENCY SPIKE</option>
                                <option value={SYSTEM_CRISIS_TIERS.TIER_2_LEAK}>TIER-2 MEMORY ENTROPY</option>
                            </select>
                        </div>

                        {/* INCIDENT GRAPH TILES */}
                        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-900">
                            {processedStatements.map((node) => {
                                const isSelectedPointer = node.uuid === selectedUuid;
                                const visualTheme = SEVERITY_THEME_REGISTRY[node.tier];

                                return (
                                    <div
                                        key={node.uuid}
                                        onClick={() => setSelectedUuid(node.uuid)}
                                        className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${visualTheme.bg} ${isSelectedPointer
                                                ? 'border-rose-500 bg-slate-900/80 shadow-md shadow-rose-950/10'
                                                : `${visualTheme.border} border-slate-900/80`
                                            }`}
                                    >
                                        <div className="flex justify-between items-start gap-2 mb-2">
                                            <span className="text-[10px] font-mono tracking-widest text-slate-600">{node.systemComponent}</span>
                                            <div className="flex items-center gap-1.5">
                                                <span className={`h-1.5 w-1.5 rounded-full ${visualTheme.glow}`} />
                                                <span className={`text-[9px] font-mono font-bold tracking-tight uppercase ${visualTheme.text}`}>
                                                    {node.tier.split('_')[1]}
                                                </span>
                                            </div>
                                        </div>
                                        <h4 className="text-xs font-bold text-slate-200 font-mono leading-snug">{node.title}</h4>
                                        <span className={`inline-block mt-2 text-[9px] font-mono border px-2 py-0.5 rounded-md ${visualTheme.badge}`}>
                                            {node.impactScore}
                                        </span>
                                    </div>
                                );
                            })}

                            {processedStatements.length === 0 && (
                                <div className="text-center py-12 text-xs font-mono text-slate-600 border border-dashed border-slate-900 rounded-xl">
                                    [!] Zero failure vectors returned for current pipeline query context.
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* RIGHT COMPONENT COLUMN: INTERACTIVE MONITOR DIAGNOSTIC DESK */}
                <section className="lg:col-span-7">
                    <div className="bg-slate-900/10 border border-slate-900 rounded-2xl p-6 md:p-8 space-y-8 shadow-2xl backdrop-blur-sm">
                        <DiagnosticPanel
                            activeNode={activeNode}
                            telemetry={telemetryState.payload}
                            loading={telemetryState.loading}
                        />
                    </div>
                </section>

            </div>
        </div>
    );
}