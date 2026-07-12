import React, { useState, useMemo, useEffect } from 'react';

// ============================================================================
// 1. DOMAIN LAYER: TYPES, CONSTANTS & INVARIANTS (Immutable)
// ============================================================================

const DESIGN_PARADIGMS = {
    COMPUTE_LOCATION: 'EDGE_VS_ORIGIN_COMPUTE',
    CONSISTENCY_MODEL: 'LINEARIZABLE_VS_EVENTUAL_CONSISTENCY',
    DATA_ARCHITECTURE: 'RELATIONAL_SHARDING_VS_NOSQL_LSM'
};

const COMPARISON_VECTORS = {
    LATENCY: 'LATENCY_P99_PROFILE',
    FAUL_ISOLATION: 'BLAST_RADIUS_ISOLATION',
    DEVELOPER_VELOCITY: 'ENGINEERING_MAINTAINABILITY_VELOCITY'
};

const ENGINE_STATES = {
    INITIALIZED: 'SYSTEM_STATE_INITIALIZED',
    COMPUTING_ENTROPY: 'SYSTEM_STATE_COMPUTING_ENTROPY',
    STABILITY_ACHIEVED: 'SYSTEM_STATE_STABILITY_ACHIEVED',
    FAULT_DIVERGENCE: 'SYSTEM_STATE_FAULT_DIVERGENCE'
};

// ============================================================================
// 2. DATA LAYER: MULTIDIMENSIONAL KNOWLEDGE REGISTRY (The Matrix)
// ============================================================================

const TRADE_OFF_REGISTRY = {
    systemSpecifications: {
        engineSignature: "AHP-Matrix-v104.2",
        slaGuarantee: "99.9999% Availability Boundary",
        targetTopologies: ["Zone Alpha", "Zone Beta", "Global Edge Rings"]
    },
    vectorMetaMaps: {
        [COMPARISON_VECTORS.LATENCY]: { label: "p99.99 Latency Profiles", weight: 0.40, colorTheme: "from-cyan-500 to-blue-500" },
        [COMPARISON_VECTORS.FAUL_ISOLATION]: { label: "Blast Radius Minimization", weight: 0.35, colorTheme: "from-amber-500 to-orange-500" },
        [COMPARISON_VECTORS.DEVELOPER_VELOCITY]: { label: "CI/CD & Architecture Velocity", weight: 0.25, colorTheme: "from-purple-500 to-pink-500" }
    },
    matrixPayloads: [
        {
            paradigmId: DESIGN_PARADIGMS.COMPUTE_LOCATION,
            title: "V8-Isolate Distributed Edge vs. Centralized Heavy Compute Origins",
            abstract: "Decoupling runtime processing boundaries down to eyeball-networks versus centralized heavy memory sharded persistence nodes.",
            evaluations: [
                {
                    vectorId: COMPARISON_VECTORS.LATENCY,
                    optionA: { label: "V8 Edge Isolate", rank: 98, operationalNote: "Sub-5ms global cold starts. Localized execution maps minimize TCP handshakes dramatically." },
                    optionB: { label: "Central Origin", rank: 42, operationalNote: "Trans-oceanic backhaul delays. Latency scales linearly with geographical client distance." }
                },
                {
                    vectorId: COMPARISON_VECTORS.FAUL_ISOLATION,
                    optionA: { label: "V8 Edge Isolate", rank: 91, operationalNote: "Isolate sandboxing ensures infinite safety boundaries. Failures affect only localized edge points." },
                    optionB: { label: "Central Origin", rank: 60, operationalNote: "Cascading failures in pooling layers risk full deployment domain crashes." }
                }
            ]
        },
        {
            paradigmId: DESIGN_PARADIGMS.CONSISTENCY_MODEL,
            title: "Strict Multi-Raft Linearizable Consistency vs. Eventual Gossip Consistency",
            abstract: "Navigating the irrevocable boundaries of the CAP Theorem during multi-region network partition events.",
            evaluations: [
                {
                    vectorId: COMPARISON_VECTORS.LATENCY,
                    optionA: { label: "Strict Multi-Raft (CP)", rank: 31, operationalNote: "Requires synchronous WAN consensus confirmation. p99 latencies bound to atomic transit constraints." },
                    optionB: { label: "Eventual Gossip (AP)", rank: 96, operationalNote: "Local node state mutations resolve immediately. Convergence handled in background execution cycles." }
                },
                {
                    vectorId: COMPARISON_VECTORS.DEVELOPER_VELOCITY,
                    optionA: { label: "Strict Multi-Raft (CP)", rank: 88, operationalNote: "Deterministic data mutations. Engineers build features without race condition maps or edge merge mitigations." },
                    optionB: { label: "Eventual Gossip (AP)", rank: 40, operationalNote: "Massive downstream complexity burden. Requires complex CRDT models to resolve multi-region split-brains." }
                }
            ]
        }
    ]
};

// ============================================================================
// 3. CORE ARCHITECTURAL LOGIC: ASYNC PROCESSING PIPELINES (Pure Functions)
// ============================================================================

const executeStochasticEntropyCheck = (topologyLocator, environmentalChaos) => {
    return new Promise((resolve, reject) => {
        const processingDelay = Math.floor(Math.random() * 250) + 75;

        setTimeout(() => {
            // Guard Clause avoiding standard if-else indentation blocks
            if (environmentalChaos > 4.5) {
                return reject(new Error(`Topological divergence detected at node vector location: [${topologyLocator}]`));
            }

            resolve({
                locator: topologyLocator,
                driftCoefficient: `${(Math.random() * 0.003).toFixed(5)}%`,
                equilibriumFactor: (0.9992 - (environmentalChaos * 0.0015)).toFixed(6)
            });
        }, processingDelay);
    });
};

// ============================================================================
// 4. PRESENTATION LAYER: REUSABLE CLEAN DECOUPLED SUB-COMPONENTS
// ============================================================================

const MetricCard = ({ heading, dynamicValue, subText, highlightColor = "text-cyan-400" }) => (
    <div className="bg-slate-900/40 border border-slate-900/80 p-5 rounded-xl backdrop-blur-md flex flex-col justify-between">
        <div>
            <span className="block text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">{heading}</span>
            <span className={`text-2xl font-black ${highlightColor} tracking-tight`}>{dynamicValue}</span>
        </div>
        <span className="text-[11px] text-slate-400 font-sans mt-2 block">{subText}</span>
    </div>
);

const ScoringVectorBar = ({ config, optionData, barGradient }) => (
    <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 flex flex-col justify-between space-y-3">
        <div className="flex justify-between items-start">
            <span className="text-xs font-black text-slate-100 tracking-tight">{optionData.label}</span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 bg-slate-900 rounded border border-slate-800 text-slate-300">
                {optionData.rank} / 100
            </span>
        </div>
        <p className="text-[11px] text-slate-400 font-sans leading-relaxed min-h-[36px]">
            {optionData.operationalNote}
        </p>
        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
            <div
                className={`bg-gradient-to-r ${barGradient} h-full transition-all duration-700 ease-out`}
                style={{ width: `${optionData.rank}%` }}
            />
        </div>
    </div>
);

const TerminalConsole = ({ logMatrix, clearTrigger }) => {
    // Guard clause to clean up render tree if logs don't exist
    if (logMatrix.length === 0) return null;

    return (
        <div className="bg-slate-950 border border-slate-900 rounded-xl p-5 mt-6 shadow-inner">
            <div className="flex justify-between items-center mb-3 border-b border-slate-900 pb-2">
                <span className="text-[11px] font-bold text-slate-500 tracking-widest uppercase">// STOCHASTIC TELEMETRY ORCHESTRATOR FEED</span>
                <button onClick={clearTrigger} className="text-[10px] text-rose-400 hover:underline font-bold uppercase tracking-wider cursor-pointer">
                    Flush Stream
                </button>
            </div>
            <div className="max-h-40 overflow-y-auto space-y-1.5 text-[11px] font-mono text-slate-400 scrollbar-thin scrollbar-thumb-slate-900">
                {logMatrix.map((logEntry, logIdx) => {
                    const isError = logEntry.includes('[FATAL') || logEntry.includes('[WARN');
                    const isSuccess = logEntry.includes('[SUCCESS');
                    return (
                        <div key={logIdx} className={`${isError ? 'text-rose-400' : isSuccess ? 'text-emerald-400' : 'text-slate-400'}`}>
                            {logEntry}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// ============================================================================
// 5. MAIN CONTAINER COMPONENT: SYSTEM ORCHESTRATION ENGINE
// ============================================================================

export default function TradeOffAnalysis() {
    const [activeParadigmId, setActiveParadigmId] = useState(DESIGN_PARADIGMS.COMPUTE_LOCATION);
    const [engineState, setEngineState] = useState(ENGINE_STATES.INITIALIZED);
    const [consoleLogs, setConsoleLogs] = useState([]);
    const [liveChaosMetrics, setLiveChaosMetrics] = useState(1.15);

    // Memoizing heavy filters to protect the React component reconciliation timeline
    const activeParadigmConfig = useMemo(() => {
        return TRADE_OFF_REGISTRY.matrixPayloads.find(node => node.paradigmId === activeParadigmId)
            || TRADE_OFF_REGISTRY.matrixPayloads[0];
    }, [activeParadigmId]);

    // Dynamic environment jitter simulation loop
    useEffect(() => {
        const streamInterval = setInterval(() => {
            setLiveChaosMetrics(parseFloat((Math.random() * 3.4).toFixed(3)));
        }, 5000);
        return () => clearInterval(streamInterval);
    }, []);

    // Concurrent Execution Promise Routing Block
    const triggerMatrixConvergencePipeline = async () => {
        if (engineState === ENGINE_STATES.COMPUTING_ENTROPY) return;

        setEngineState(ENGINE_STATES.COMPUTING_ENTROPY);
        setConsoleLogs(["[INIT] Spawning asynchronous Monte Carlo analytics across top-tier vectors...", "[INIT] Accessing static multidimensional data structures..."]);

        try {
            // Maps structural configuration elements clean to an array of pending execution Promises
            const diagnosticPromises = TRADE_OFF_REGISTRY.systemSpecifications.targetTopologies.map(topologyLoc =>
                executeStochasticEntropyCheck(topologyLoc, liveChaosMetrics)
            );

            const resolvedEvaluations = await Promise.all(diagnosticPromises);

            // Declarative array processing loop updating telemetry logs
            resolvedEvaluations.forEach(evaluatedNode => {
                setConsoleLogs(prev => [
                    ...prev,
                    `[EVALUATED] ${evaluatedNode.locator} stabilized with index of ${evaluatedNode.equilibriumFactor} (Drift: ${evaluatedNode.driftCoefficient})`
                ]);
            });

            // Pure Conditional State Resolution
            const isSystemDegraded = liveChaosMetrics > 2.8;
            setEngineState(isSystemDegraded ? ENGINE_STATES.FAULT_DIVERGENCE : ENGINE_STATES.STABILITY_ACHIEVED);
            setConsoleLogs(prev => [
                ...prev,
                isSystemDegraded ? "[WARN] Critical system noise ceiling exceeded. Equilibrium broken." : "[SUCCESS] Matrix model fully converged with zero invariant exceptions."
            ]);

        } catch (pipelineFault) {
            setEngineState(ENGINE_STATES.FAULT_DIVERGENCE);
            setConsoleLogs(prev => [...prev, `[FATAL RUNTIME REJECTION] System Diverged: ${pipelineFault.message}`]);
        }
    };

    return (
        <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-mono p-6 lg:p-12 selection:bg-amber-500 selection:text-slate-950">

            {/* HEADER SPECS AREA */}
            <header className="border-b border-slate-900 pb-8 mb-10 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
                <div>
                    <div className="text-[11px] text-amber-400 font-bold tracking-widest uppercase mb-1">// SYSTEM-LEVEL BOUNDARY EQUILIBRIUM MATRICES</div>
                    <h1 className="text-3xl lg:text-5xl font-black text-white tracking-tight">
                        TRADEOFF <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500">ANALYSIS</span>
                    </h1>
                </div>

                {/* METRICS HEADER WIDGET GROUP */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full xl:w-auto min-w-[50%]">
                    <MetricCard heading="ENGINE PIPELINE" dynamicValue={TRADE_OFF_REGISTRY.systemSpecifications.engineSignature} subText="Analytical Model Standard" />
                    <MetricCard heading="TARGET ASSURANCE" dynamicValue="p99.999%" subText={TRADE_OFF_REGISTRY.systemSpecifications.slaGuarantee} highlightColor="text-emerald-400" />
                    <MetricCard heading="ENVIRONMENT NOISE" dynamicValue={`${liveChaosMetrics}δ`} subText="Real-time Stochastic Noise" highlightColor={liveChaosMetrics > 2.8 ? "text-rose-400" : "text-amber-400"} />
                </div>
            </header>

            {/* CORE DOUBLE PANEL LAYOUT */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">

                {/* SIDE BAR NAVIGATION SELECTOR CONTROLS */}
                <nav className="xl:col-span-4 space-y-5">
                    <div className="text-xs font-bold text-slate-500 tracking-widest uppercase">// DESIGN DOMAINS CONTROLS</div>
                    <div className="space-y-3">
                        {TRADE_OFF_REGISTRY.matrixPayloads.map((matrixPayloadNode) => {
                            const isSelectedActiveNode = activeParadigmId === matrixPayloadNode.paradigmId;
                            return (
                                <button
                                    key={matrixPayloadNode.paradigmId}
                                    onClick={() => setActiveParadigmId(matrixPayloadNode.paradigmId)}
                                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${isSelectedActiveNode
                                            ? 'bg-gradient-to-br from-slate-900 to-amber-950/20 border-amber-500 text-white shadow-lg shadow-amber-950/10'
                                            : 'bg-transparent border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-200'
                                        }`}
                                >
                                    <span className="text-[9px] opacity-40 uppercase tracking-mono mb-1">{matrixPayloadNode.paradigmId.replace(/_/g, ' ')}</span>
                                    <span className="text-xs font-black tracking-tight leading-normal">{matrixPayloadNode.title}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* RUNTIME TELEMETRY ENGINE CONTROL CONSOLE BOARD */}
                    <div className="bg-slate-900/30 border border-slate-900 p-5 rounded-xl space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] text-slate-400 font-bold uppercase">Orchestrator State</span>
                            <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase ${engineState === ENGINE_STATES.INITIALIZED ? 'bg-slate-950 border-slate-800 text-slate-500' :
                                    engineState === ENGINE_STATES.COMPUTING_ENTROPY ? 'bg-amber-950/40 border-amber-500/30 text-amber-400 animate-pulse' :
                                        engineState === ENGINE_STATES.STABILITY_ACHIEVED ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400' : 'bg-rose-950/40 border-rose-500/30 text-rose-400'
                                }`}>{engineState.replace('SYSTEM_STATE_', '')}</span>
                        </div>
                        <button
                            onClick={triggerMatrixConvergencePipeline}
                            disabled={engineState === ENGINE_STATES.COMPUTING_ENTROPY}
                            className="w-full bg-slate-900 border border-slate-800 hover:bg-amber-400 hover:text-slate-950 hover:border-amber-300 font-bold text-xs py-3 rounded-lg transition-all tracking-widest uppercase disabled:opacity-20 cursor-pointer"
                        >
                            Execute Chaos Probes
                        </button>
                    </div>
                </nav>

                {/* COMPARISON RESULTS DISPLAY PANEL */}
                <main className="xl:col-span-8 space-y-6">
                    <div className="bg-slate-900 border border-slate-900 p-6 rounded-2xl shadow-sm">
                        <span className="text-[10px] text-amber-400 font-bold tracking-widest block uppercase mb-1">// SYSTEM DATA ABSTRACT</span>
                        <h2 className="text-xl font-bold text-white tracking-tight mb-2">{activeParadigmConfig.title}</h2>
                        <p className="text-xs text-slate-400 font-sans leading-relaxed">{activeParadigmConfig.abstract}</p>
                    </div>

                    <div className="space-y-5">
                        <div className="text-xs font-bold text-slate-500 tracking-widest uppercase">// ARCHITECTURAL RESOLUTION TRADEOFF VECTOR SPECS</div>

                        {activeParadigmConfig.evaluations.map((evaluationNode, index) => {
                            const vectorMeta = TRADE_OFF_REGISTRY.vectorMetaMaps[evaluationNode.vectorId] || { label: "Arbitrary Weight Profile", colorTheme: "from-slate-500 to-slate-400" };
                            return (
                                <div key={index} className="bg-slate-900/60 border border-slate-900 p-6 rounded-2xl space-y-4">
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-950 pb-3 text-xs gap-2">
                                        <span className="font-bold text-slate-200">
                                            Evaluation Boundary: <span className="text-amber-400">{vectorMeta.label}</span>
                                        </span>
                                        <span className="text-[10px] text-slate-500 uppercase font-mono">
                                            Metric Allocation Weight: {(vectorMeta.weight * 100)}%
                                        </span>
                                    </div>

                                    {/* Dual Grid Comparison System */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <ScoringVectorBar config={vectorMeta} optionData={evaluationNode.optionA} barGradient={vectorMeta.colorTheme} />
                                        <ScoringVectorBar config={vectorMeta} optionData={evaluationNode.optionB} barGradient={vectorMeta.colorTheme} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* TELEMETRY LOGGER PANEL */}
                    <TerminalConsole logMatrix={consoleLogs} clearTrigger={() => setConsoleLogs([])} />
                </main>
            </div>

            <footer className="mt-16 pt-6 border-t border-slate-900 flex justify-between items-center text-[10px] text-slate-600 tracking-wider uppercase font-mono">
                <span>Architectural Decision Invariants Fully Enforced</span>
                <span>Active-Active Global Mesh Convergence Core Online</span>
            </footer>
        </div>
    );
}