import React, { useState, useEffect, useMemo, useCallback } from 'react';

// ============================================================================
// 1. DOMAIN LAYER: CONFIGURATIONS, REGISTRIES & SCHEMAS (Isolated Immutables)
// ============================================================================

const TIMELINE_EPOCHS = {
    PIONEER: '1975_1989_FOUNDATIONAL_HARDWARE',
    DOTCOM: '1990_2004_DISTRIBUTED_WEB_EXPLOSION',
    CLOUD: '2005_2019_HYPERSCALE_VIRTUALIZATION',
    QUANTUM: '2020_2026_DECENTRALIZED_INTELLIGENCE'
};

const DISCIPLINE_CATEGORIES = {
    KERNEL: 'Low-Level Kernel & Memory Systems',
    DISTRIBUTED: 'Hyperscale Distributed Consensus',
    FRONTEND: 'Reactive Deterministic Interface Engines',
    PARADIGM: 'Architectural Philosophy & Anti-Patterns'
};

const VISUAL_THEME_MATRIX = {
    [TIMELINE_EPOCHS.PIONEER]: {
        border: 'border-amber-600/30 hover:border-amber-500',
        bg: 'bg-amber-950/5 shadow-amber-950/20',
        accentText: 'text-amber-400',
        badge: 'bg-amber-950/40 border-amber-900/50 text-amber-300',
        terminalGlow: 'bg-amber-500'
    },
    [TIMELINE_EPOCHS.DOTCOM]: {
        border: 'border-cyan-600/30 hover:border-cyan-500',
        bg: 'bg-cyan-950/5 shadow-cyan-950/20',
        accentText: 'text-cyan-400',
        badge: 'bg-cyan-950/40 border-cyan-900/50 text-cyan-300',
        terminalGlow: 'bg-cyan-500'
    },
    [TIMELINE_EPOCHS.CLOUD]: {
        border: 'border-emerald-600/30 hover:border-emerald-500',
        bg: 'bg-emerald-950/5 shadow-emerald-950/20',
        accentText: 'text-emerald-400',
        badge: 'bg-emerald-950/40 border-emerald-900/50 text-emerald-300',
        terminalGlow: 'bg-emerald-500'
    },
    [TIMELINE_EPOCHS.QUANTUM]: {
        border: 'border-purple-600/30 hover:border-purple-500',
        bg: 'bg-purple-950/5 shadow-purple-950/20',
        accentText: 'text-purple-400',
        badge: 'bg-purple-950/40 border-purple-900/50 text-purple-300',
        terminalGlow: 'bg-purple-500'
    }
};

const LESSONS_MANIFEST_REGISTRY = [
    {
        id: "LN-001",
        title: "Premature Abstraction is the Root of System Rot",
        epoch: TIMELINE_EPOCHS.PIONEER,
        discipline: DISCIPLINE_CATEGORIES.PARADIGM,
        severity: "CRITICAL_FATAL",
        summary: "Writing code for future use-cases that do not exist yet adds cognitive overhead, hidden coupling, and debt. Hard-code it twice before building an interface.",
        postMortemMetrics: { blastRadius: "High", recoveryTimeHours: 142, architecturalMaturityIndex: 0.99 },
        deepDive: {
            context: "Orchestrated atomic state management transitions inside raw telecom switches in 1982.",
            invariantChecks: [
                "Duplication is far cheaper than the wrong abstraction.",
                "Monoliths should only be broken when team scaling bounds or raw hardware processing saturation demand it.",
                "Code metrics like lines-of-code reduced are healthier indicators than total framework coverage abstractions."
            ]
        },
        techStackImpacted: ["C", "Assembly x86", "POSIX Threads"]
    },
    {
        id: "LN-002",
        title: "The Fallacy of Networks and the Myth of Zero Latency",
        epoch: TIMELINE_EPOCHS.DOTCOM,
        discipline: DISCIPLINE_CATEGORIES.DISTRIBUTED,
        severity: "SYSTEM_WARN",
        summary: "Every network mutation will fail eventually. Relying on synchronous atomic state over microservices across separate physical data loops is system suicide.",
        postMortemMetrics: { blastRadius: "Catastrophic", recoveryTimeHours: 18, architecturalMaturityIndex: 0.94 },
        deepDive: {
            context: "Scaling data grid syncing systems during the 2001 dot-com high-frequency exchange traffic surges.",
            invariantChecks: [
                "Embrace eventual consistency early; real-world transactions are decoupled, asynchronous human pipelines.",
                "Implement hard timeout budgets, idempotent event execution receivers, and exponential micro-backoffs.",
                "Distributed lock architectures (Distributed Mutex) are structural bottlenecks. Optimize for shared-nothing pipelines."
            ]
        },
        techStackImpacted: ["Erlang/OTP", "Corba Mesh", "TCP/IP Layer Bypass"]
    },
    {
        id: "LN-003",
        title: "State Management belongs at the Edges, not inside Virtual Dom Sinks",
        epoch: TIMELINE_EPOCHS.CLOUD,
        discipline: DISCIPLINE_CATEGORIES.FRONTEND,
        severity: "PERFORMANCE_DEGRADED",
        summary: "Rerendering massive visual component matrices because a deep nested primitive value mutated is a fundamental structural architectural anti-pattern.",
        postMortemMetrics: { blastRadius: "Low", recoveryTimeHours: 4, architecturalMaturityIndex: 0.89 },
        deepDive: {
            context: "Re-architecting dynamic, real-time telemetry control pipelines tracking millions of cloud hypervisor allocations simultaneously.",
            invariantChecks: [
                "Isolate highly dynamic mutations inside lightweight local atom states or direct un-controlled refs.",
                "The browser layout layer is the real CPU barrier, not JavaScript execution context execution blocks.",
                "Treat UI as a pure functional projection of an asynchronous append-only state log stream."
            ]
        },
        techStackImpacted: ["Vanilla DOM Mutation Streams", "Early React Fiber Engines", "Web Workers Pipelines"]
    },
    {
        id: "LN-004",
        title: "AI-Driven Synthetics and Quantum Invariant Validations",
        epoch: TIMELINE_EPOCHS.QUANTUM,
        discipline: DISCIPLINE_CATEGORIES.KERNEL,
        severity: "CRITICAL_FATAL",
        summary: "As LLMs emit mountains of automated code, the engineer's primary value shifts from code production to rigid invariant engineering and verification.",
        postMortemMetrics: { blastRadius: "Extreme", recoveryTimeHours: 89, architecturalMaturityIndex: 0.98 },
        deepDive: {
            context: "Establishing safety guarantees inside multi-agent continuous synthesis systems handling mission-critical code deployments in 2026.",
            invariantChecks: [
                "Unverified AI generation is equivalent to executing dynamic untrusted binaries directly inside production kernels.",
                "Build formal mathematical verification frameworks around your infrastructure boundaries.",
                "Type definitions and type-safety become runtime enforcers, not compile-time hints."
            ]
        },
        techStackImpacted: ["Rust FFI", "eBPF Isolation Layers", "WebAssembly Core RunTimes"]
    }
];

// ============================================================================
// 2. INFRASTRUCTURE LAYER: ASYNC SIMULATED COMPILER BROKER (Promises & Async Tasks)
// ============================================================================
const HistoricalKnowledgeBroker = {
    fetchAdvancedAnalysis: async (lessonId) => {
        if (!lessonId) throw new Error("CRITICAL EXCEPTION: Execution Identifier Unallocated.");

        // Simulate real-time retrieval of archival telemetry logs from deep hardware cold storage
        await new Promise(resolve => setTimeout(resolve, 380));

        return {
            compiledTimestamp: Date.now(),
            vulnerabilityAuditStatus: "MATURED_VERIFIED_BY_TIME",
            systemEntropyRating: `${(Math.random() * 5 + 1.2).toFixed(2)}%`,
            seniorityConsensusScore: "99.98%"
        };
    }
};

// ============================================================================
// 3. SUB-PRESENTATION INTERFACES (Clean Atomic View Components)
// ============================================================================

const LessonDetailInspector = ({ selectedNode, asyncData, isSyncing }) => {
    if (!selectedNode) return null;

    return (
        <div className="space-y-6 animate-[fadeIn_0.15s_ease-out]">
            <div className="space-y-3">
                <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-[9px] font-mono font-bold tracking-widest uppercase bg-slate-950 text-amber-400 px-2 py-0.5 rounded border border-slate-800">
                        {selectedNode.id}
                    </span>
                    <span className="text-[9px] font-mono font-bold tracking-widest uppercase bg-slate-950 text-cyan-400 px-2 py-0.5 rounded border border-slate-800">
                        {selectedNode.severity}
                    </span>
                </div>
                <h3 className="text-xl md:text-2xl font-mono font-black tracking-tight text-slate-100">
                    {selectedNode.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans bg-slate-950 p-4 border border-slate-900 rounded-xl">
                    {selectedNode.summary}
                </p>
            </div>

            <div className="space-y-3">
                <h4 className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">// DEEP ARCHITECTURAL CONTEXT & INVARIANTS</h4>
                <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-xl space-y-4">
                    <p className="text-xs font-mono text-indigo-400 italic">
                        <span className="text-slate-500 not-italic font-bold">// ARCHIVAL LOG:</span> "{selectedNode.deepDive.context}"
                    </p>
                    <div className="space-y-2">
                        {selectedNode.deepDive.invariantChecks.map((invariant, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                                <span className="text-[10px] font-mono font-bold text-cyan-500 mt-0.5">▶</span>
                                <p className="text-xs text-slate-300 font-mono leading-relaxed">{invariant}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Real-time Simulated Telemetry Async Output */}
            <div className="space-y-2">
                <h4 className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">// KNOWLEDGE INTEGRITY ARCHIVE BROADCAST</h4>
                {isSyncing ? (
                    <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl flex items-center justify-center gap-2 font-mono text-xs text-slate-500 animate-pulse">
                        <div className="h-3 w-3 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                        Querying distributed matrix archives...
                    </div>
                ) : asyncData ? (
                    <div className="grid grid-cols-2 gap-2 font-mono text-[10px] p-3 bg-slate-950/80 border border-slate-900 rounded-xl">
                        <div className="flex justify-between border-r border-slate-900 pr-3">
                            <span className="text-slate-500">SYSTEM_ENTROPY</span>
                            <span className="text-rose-400 font-bold">{asyncData.systemEntropyRating}</span>
                        </div>
                        <div className="flex justify-between pl-3">
                            <span className="text-slate-500">CONSENSUS</span>
                            <span className="text-emerald-400 font-bold">{asyncData.seniorityConsensusScore}</span>
                        </div>
                    </div>
                ) : null}
            </div>

            <div className="space-y-2">
                <h4 className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">// MITIGATION ECOSYSTEM</h4>
                <div className="flex flex-wrap gap-1.5">
                    {selectedNode.techStackImpacted.map((tech) => (
                        <span key={tech} className="text-[10px] font-mono font-bold bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded-md">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ============================================================================
// 4. CORE CONTAINER COMPONENT (Main Architecture Layout Engine)
// ============================================================================

export default function LessonLearned() {
    const [selectedId, setSelectedId] = useState(LESSONS_MANIFEST_REGISTRY[0].id);
    const [activeEpochFilter, setActiveEpochFilter] = useState('ALL_EPOCHS');
    const [searchQuery, setSearchQuery] = useState('');

    // Async State Vector Reducer
    const [archiveState, setArchiveState] = useState({ data: null, loading: false });

    // Memoized Evaluation of active system pointer
    const selectedNode = useMemo(() => {
        return LESSONS_MANIFEST_REGISTRY.find(node => node.id === selectedId) || LESSONS_MANIFEST_REGISTRY[0];
    }, [selectedId]);

    // Resolution loop triggering promises across component bounds
    useEffect(() => {
        let isThreadStale = false;
        setArchiveState(prev => ({ ...prev, loading: true }));

        HistoricalKnowledgeBroker.fetchAdvancedAnalysis(selectedNode.id)
            .then(payload => {
                if (!isThreadStale) setArchiveState({ data: payload, loading: false });
            })
            .catch(() => {
                if (!isThreadStale) setArchiveState({ data: null, loading: false });
            });

        return () => { isThreadStale = true; };
    }, [selectedNode.id]);

    // High-performance filter map pipeline matrix
    const processedLessons = useMemo(() => {
        return LESSONS_MANIFEST_REGISTRY.filter(node => {
            // Functional multi-condition matrix checking (replaces dirty nested if-else stacks)
            const matchEpoch = activeEpochFilter === 'ALL_EPOCHS' || node.epoch === activeEpochFilter;

            const cleanQuery = searchQuery.trim().toLowerCase();
            const matchSearch = !cleanQuery ||
                node.title.toLowerCase().includes(cleanQuery) ||
                node.id.toLowerCase().includes(cleanQuery) ||
                node.summary.toLowerCase().includes(cleanQuery);

            return matchEpoch && matchSearch;
        });
    }, [activeEpochFilter, searchQuery]);

    const purgeFilters = useCallback(() => {
        setSelectedId(LESSONS_MANIFEST_REGISTRY[0].id);
        setActiveEpochFilter('ALL_EPOCHS');
        setSearchQuery('');
    }, []);

    return (
        <div className="w-full min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 lg:p-12 font-sans antialiased selection:bg-amber-500/30 selection:text-amber-300">

            {/* ENTERPRISE INTELLIGENCE SYSTEM HEADER */}
            <header className="w-full border-b border-slate-900 pb-6 mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50 animate-pulse" />
                        <span className="font-mono text-xs font-black tracking-widest text-slate-500 uppercase">// PRINCIPAL ARCHITECT HISTORICAL ENGINE</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black font-mono tracking-tighter bg-gradient-to-r from-slate-100 via-slate-400 to-slate-600 bg-clip-text text-transparent">
                        Lessons Learned In Invariant Space
                    </h1>
                    <p className="text-xs text-slate-500 font-mono">50+ Years of Architectural Scars, System Crashes, and Operational Axioms.</p>
                </div>
                <button
                    onClick={purgeFilters}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-mono rounded-xl transition-all shadow-xl"
                >
                    ← PURGE_SEARCH_STATE
                </button>
            </header>

            {/* CORE WORKSPACE PANEL SYSTEM GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* LEFT SECTOR: DIRECTORY GRAPH ITERATOR INDEX */}
                <section className="lg:col-span-5 space-y-4">
                    <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-4 md:p-6 shadow-2xl backdrop-blur-md space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-mono text-xs font-extrabold uppercase tracking-widest text-slate-500">// KNOWLEDGE SHARD NODES</h3>
                            <span className="text-[10px] font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-900 text-slate-500">
                                ACTIVE_NODES: {processedLessons.length}
                            </span>
                        </div>

                        {/* ACTION PIPELINE INTERFACES */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Regex search over data fields..."
                                className="w-full bg-slate-950 border border-slate-900 focus:border-amber-500/50 text-slate-200 px-3 py-2 text-xs font-mono rounded-xl focus:outline-none placeholder:text-slate-700 transition-colors"
                            />
                            <select
                                value={activeEpochFilter}
                                onChange={(e) => setActiveEpochFilter(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-900 text-slate-300 px-3 py-2 text-xs font-mono rounded-xl focus:outline-none cursor-pointer hover:border-slate-800 transition-colors"
                            >
                                <option value="ALL_EPOCHS">ALL MEMORY EPOCHS</option>
                                <option value={TIMELINE_EPOCHS.PIONEER}>1975 - 1989 PIONEER</option>
                                <option value={TIMELINE_EPOCHS.DOTCOM}>1990 - 2004 DOTCOM</option>
                                <option value={TIMELINE_EPOCHS.CLOUD}>2005 - 2019 CLOUD</option>
                                <option value={TIMELINE_EPOCHS.QUANTUM}>2020 - 2026 QUANTUM</option>
                            </select>
                        </div>

                        {/* HIGH-DENSITY INTERACTIVE TILES */}
                        <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
                            {processedLessons.map((node) => {
                                const isCurrentPointer = node.id === selectedId;
                                const activeTheme = VISUAL_THEME_MATRIX[node.epoch];

                                return (
                                    <div
                                        key={node.id}
                                        onClick={() => setSelectedId(node.id)}
                                        className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${activeTheme.bg} ${isCurrentPointer
                                                ? 'border-amber-500 bg-slate-900/80 shadow-lg shadow-amber-950/10'
                                                : `${activeTheme.border} border-slate-900/80`
                                            }`}
                                    >
                                        <div className="flex justify-between items-start gap-2 mb-2">
                                            <span className="text-[10px] font-mono tracking-widest text-slate-600">{node.id}</span>
                                            <div className="flex items-center gap-1.5">
                                                <span className={`h-1 w-1 rounded-full ${activeTheme.terminalGlow}`} />
                                                <span className={`text-[9px] font-mono font-bold uppercase tracking-tight ${activeTheme.accentText}`}>
                                                    {node.epoch.split('_')[2]}
                                                </span>
                                            </div>
                                        </div>
                                        <h4 className="text-xs font-bold text-slate-200 font-mono leading-tight">{node.title}</h4>
                                        <span className={`inline-block mt-2 text-[9px] font-mono border px-1.5 py-0.5 rounded ${activeTheme.badge}`}>
                                            {node.discipline}
                                        </span>
                                    </div>
                                );
                            })}

                            {processedLessons.length === 0 && (
                                <div className="text-center py-12 text-xs font-mono text-slate-600 border border-dashed border-slate-900 rounded-xl">
                                    [!] Zero memory shards returned for search parameters.
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* RIGHT SECTOR: FULL ANALYSIS TELEMETRY DESK */}
                <section className="lg:col-span-7">
                    <div className="bg-slate-900/10 border border-slate-900 rounded-2xl p-6 md:p-8 space-y-8 shadow-2xl backdrop-blur-sm">
                        <LessonDetailInspector
                            selectedNode={selectedNode}
                            asyncData={archiveState.data}
                            isSyncing={archiveState.loading}
                        />
                    </div>
                </section>

            </div>
        </div>
    );
}