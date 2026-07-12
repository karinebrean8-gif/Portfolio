import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';

// ============================================================================
// 1. ARCHITECTURAL VECTOR UNITS & STATUS ROUTERS
// ============================================================================
const METRIC_UNITS = {
    THROUGHPUT: "Tx / Min",
    LATENCY: "Milliseconds",
    EFFICIENCY: "Percent Recovery",
    FINANCIAL: "USD Saved"
};

const SHARD_STATUS = {
    OPTIMAL: "bg-emerald-500/10 border-emerald-800 text-emerald-400 font-mono",
    HYPER_DRIVE: "bg-cyan-500/10 border-cyan-800 text-cyan-400 font-mono",
    IMMUNE: "bg-purple-500/10 border-purple-800 text-purple-400 font-mono"
};

// ============================================================================
// 2. GIANT METRIC MATRIX (50+ Years Data Streams + Alexicorn Principal 5 Core)
// ============================================================================
const IMPACT_METRIC_LEDGER = [
    {
        epochKey: "alexicorn-impacts",
        organization: "ALEXICORN",
        role: "Senior Engineer (6 Years Cluster)",
        overallScore: "99.98% System Efficiency",

        // Principal Level 5 Core Projects Impact Mapping
        metricsArray: [
            {
                vectorCode: "VEC-ALEX-01",
                label: "Omniscience Sharder Engine",
                value: "1.8 Billion",
                unit: METRIC_UNITS.THROUGHPUT,
                status: SHARD_STATUS.HYPER_DRIVE,
                deepImpact: "Eliminated distributed synchronization locks across 45 nodes, unlocking scalable state mutations under enterprise load spikes."
            },
            {
                vectorCode: "VEC-ALEX-02",
                label: "Quantum Proxy Mesh (QPM)",
                value: "-35ms Delta",
                unit: METRIC_UNITS.LATENCY,
                status: SHARD_STATUS.OPTIMAL,
                deepImpact: "Bypassed traditional TCP stack bottlenecks using custom binary Abstract Syntax Tree packaging rules at regional gateway nodes."
            },
            {
                vectorCode: "VEC-ALEX-03",
                label: "Titan-IX Memory Recycler",
                value: "100%",
                unit: METRIC_UNITS.EFFICIENCY,
                status: SHARD_STATUS.IMMUNE,
                deepImpact: "Intercepted V8 virtual machine allocations in real-time, completely overriding standard stop-the-world garbage collection pauses."
            },
            {
                vectorCode: "VEC-ALEX-04",
                label: "Aether Cryptographic Ledger",
                value: "14,000,000",
                unit: METRIC_UNITS.FINANCIAL,
                status: SHARD_STATUS.HYPER_DRIVE,
                deepImpact: "Avoided expensive relational database lookup read-charges by executing zero-knowledge proof tokens in isolated RAM cache rings."
            },
            {
                vectorCode: "VEC-ALEX-05",
                label: "Vortex Telemetry Sink",
                value: "24 Billion",
                unit: METRIC_UNITS.THROUGHPUT,
                status: SHARD_STATUS.OPTIMAL,
                deepImpact: "Built high-density logs pipeline utilizing multi-core workers to map, filter, and stream planetary system operations flawlessly."
            }
        ],
        proCoderInsights: [
            "Committed 12,000+ hardened algorithmic blocks resulting in zero critical downtime anomalies across the Alexicorn era.",
            "Refactored high-order async abstractions down to microsecond-safe hooks, recovering 42% raw hardware processing capabilities."
        ]
    },
    {
        epochKey: "faang-impacts",
        organization: "THE ULTRA-FAANG CONSORTIUM",
        role: "Distinguished Fellow Architect (24 Years Matrix)",
        overallScore: "Exabyte Scale Validation",
        metricsArray: [
            {
                vectorCode: "VEC-FAANG-01",
                label: "Grid Hypervisor Multiplexing",
                value: "45 Million",
                unit: "Active Instances",
                status: SHARD_STATUS.IMMUNE,
                deepImpact: "Re-engineered native virtual environment schedulers, allowing dense bare metal host isolation layers to scale seamlessly."
            }
        ],
        proCoderInsights: [
            "Pioneered data sharding specifications that currently drive top-tier global cloud backbones.",
            "Optimized load balancer distribution matrix formulas, effectively dropping multi-tenant request collisions to absolute zero."
        ]
    }
];

export default function ImpactsMetrics() {
    const [metricsLedger, setMetricsLedger] = useState([]);
    const [selectedEpochKey, setSelectedEpochKey] = useState("alexicorn-impacts");
    const [activeVectorIdx, setActiveVectorIdx] = useState(0);
    const [isSynthesizing, setIsSynthesizing] = useState(true);

    const dashboardTelemetryRef = useRef({ telemetryTicks: 0, nodeVerification: "SECURE" });

    // ============================================================================
    // 3. ASYNCHRONOUS DATA ACQUISITION PARSER (Promise Pipeline)
    // ============================================================================
    useEffect(() => {
        let isMountedThread = true;

        const bootstrapTelemetryData = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (IMPACT_METRIC_LEDGER && IMPACT_METRIC_LEDGER.length > 0) {
                        resolve([...IMPACT_METRIC_LEDGER]);
                    } else {
                        reject(new Error("Telemetry Ingestion Pipeline Broken."));
                    }
                }, 350); // High-speed stream resolve
            });
        };

        bootstrapTelemetryData()
            .then((payloadMatrix) => {
                if (isMountedThread) {
                    setMetricsLedger(payloadMatrix);
                    setIsSynthesizing(false);
                }
            })
            .catch((errorLog) => {
                console.error("[CRITICAL SHARD FAULT]", errorLog);
                if (isMountedThread) setIsSynthesizing(false);
            });

        return () => { isMountedThread = false; };
    }, []);

    // ============================================================================
    // 4. MEMOIZED METRIC FILTERS
    // ============================================================================
    const activeEpochMetrics = useMemo(() => {
        return metricsLedger.find(item => item.epochKey === selectedEpochKey) || null;
    }, [metricsLedger, selectedEpochKey]);

    const fireEpochSwitch = useCallback((targetKey) => {
        setSelectedEpochKey(targetKey);
        setActiveVectorIdx(0); // Reset metric indices to avoid runtime offset overflows
        dashboardTelemetryRef.current.telemetryTicks += 1;
    }, []);

    // ============================================================================
    // 5. GRAPHICAL USER DESK INTERFACE RENDER
    // ============================================================================
    if (isSynthesizing) {
        return (
            <div className="w-full min-h-[400px] bg-slate-950 flex flex-col items-center justify-center font-mono text-xs text-slate-600 border border-slate-900 rounded-3xl p-6">
                <div className="w-5 h-5 border border-t-cyan-500 border-r-transparent border-slate-800 rounded-full animate-spin mb-3" />
                <div>// Pulling Planetary Core Business Impact Frameworks...</div>
            </div>
        );
    }

    return (
        <div className="w-full bg-slate-950 text-slate-100 border border-slate-900 rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 font-sans shadow-2xl selection:bg-cyan-500/20 max-w-7xl mx-auto">

            {/* SECTION TOP TELEMETRY BAR */}
            <div className="border-b border-slate-900 pb-5 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <span className="text-[10px] font-mono text-cyan-500 tracking-wider block uppercase">// CORE QUANTIFIABLE STATEMENTS</span>
                    <h2 className="text-xl sm:text-2xl font-black font-mono tracking-tighter uppercase mt-0.5 bg-gradient-to-r from-slate-100 to-slate-500 bg-clip-text text-transparent">
                        IMPACT_ANALYTICS_MATRIX
                    </h2>
                </div>
                <div className="flex gap-4 font-mono text-[9px] text-slate-500 bg-slate-900/50 px-3 py-1.5 border border-slate-900 rounded-xl">
                    <span>STREAM_TICKS: <span className="text-cyan-400 font-bold">{dashboardTelemetryRef.current.telemetryTicks}</span></span>
                    <span>INTEGRITY: <span className="text-emerald-400 font-bold">{dashboardTelemetryRef.current.nodeVerification}</span></span>
                </div>
            </div>

            {/* CORE DISPLAY ROUTER GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                {/* SIDE BAR BUTTON SWITCHER LAYER */}
                <nav className="lg:col-span-4 space-y-2.5">
                    <span className="text-[9px] font-mono font-bold text-slate-600 block px-1 uppercase">// SECTOR SELECTION REPOSITORIES</span>
                    {metricsLedger.map((epoch) => {
                        const isActive = selectedEpochKey === epoch.epochKey;
                        return (
                            <button
                                key={epoch.epochKey}
                                onClick={() => fireEpochSwitch(epoch.epochKey)}
                                className={`w-full text-left p-4 rounded-xl border font-mono transition-all duration-150 focus:outline-none flex flex-col gap-1.5 ${isActive
                                        ? "bg-slate-900/40 border-cyan-500/40 shadow-lg text-slate-100"
                                        : "bg-slate-950/20 border-slate-900 text-slate-500 hover:border-slate-800 hover:text-slate-300"
                                    }`}
                            >
                                <div className="flex justify-between items-center w-full">
                                    <span className="text-xs font-black tracking-tight uppercase text-slate-200">{epoch.organization}</span>
                                    <div className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-cyan-400 animate-pulse" : "bg-slate-800"}`} />
                                </div>
                                <div className="text-[11px] font-bold text-slate-400">{epoch.role}</div>
                                <div className="text-[9px] text-slate-600 font-semibold">{epoch.overallScore}</div>
                            </button>
                        );
                    })}
                </nav>

                {/* MAIN VISUAL PANEL DATA GRAPH */}
                <main className="lg:col-span-8 space-y-5">
                    {activeEpochMetrics ? (
                        <div className="space-y-5 animate-[fadeIn_0.15s_ease-out]">

                            {/* TARGET GRID DYNAMIC GRAPH DATA CELLS */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                                {activeEpochMetrics.metricsArray.map((metric, idx) => {
                                    const isCurrentVector = activeVectorIdx === idx;
                                    return (
                                        <button
                                            key={metric.vectorCode}
                                            onClick={() => setActiveVectorIdx(idx)}
                                            className={`p-3 rounded-xl border text-left font-mono transition-all duration-150 focus:outline-none flex flex-col justify-between h-24 ${isCurrentVector
                                                    ? "bg-cyan-950/30 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                                                    : "bg-slate-950 border-slate-900 text-slate-500 hover:border-slate-800 hover:text-slate-400"
                                                }`}
                                        >
                                            <span className="text-[8px] block text-slate-600 font-bold">{metric.vectorCode}</span>
                                            <div className="my-auto">
                                                <div className="text-sm font-black tracking-tighter truncate text-slate-200 group-hover:text-cyan-400">
                                                    {metric.value}
                                                </div>
                                                <div className="text-[8px] tracking-tight text-slate-500 truncate mt-0.5">
                                                    {metric.unit}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* SPECIFIC IMPACT DETAILS INSPECTOR HOOK */}
                            <div className="p-5 bg-slate-950 border border-slate-900 rounded-xl space-y-3">
                                <div className="flex justify-between items-center flex-wrap gap-2">
                                    <h4 className="text-xs sm:text-sm font-black font-mono text-slate-200">
                                        {activeEpochMetrics.metricsArray[activeVectorIdx].label}
                                    </h4>
                                    <span className={`px-2 py-0.5 text-[8px] border rounded uppercase font-bold ${activeEpochMetrics.metricsArray[activeVectorIdx].status}`}>
                    // TELEMETRY_VERIFIED
                                    </span>
                                </div>

                                <p className="text-xs text-slate-400 font-mono leading-relaxed bg-slate-900/10 p-3 rounded-lg border border-slate-900/60">
                                    {activeEpochMetrics.metricsArray[activeVectorIdx].deepImpact}
                                </p>
                            </div>

                            {/* PRO CODER METRIC LOG HOOKS */}
                            <div className="space-y-2.5">
                                <span className="text-[9px] font-mono font-bold text-slate-600 block tracking-tight uppercase">
                  // GLOBAL OPTIMIZATION INSIGHTS LOGS
                                </span>
                                <div className="space-y-2">
                                    {activeEpochMetrics.proCoderInsights.map((insight, idx) => (
                                        <div
                                            key={idx}
                                            className="text-xs text-slate-400 font-mono flex gap-2.5 items-start p-3 bg-slate-900/10 border border-slate-900/40 hover:border-slate-800 hover:text-slate-200 rounded-xl transition-colors group"
                                        >
                                            <span className="text-cyan-500 group-hover:scale-110 transition-transform">⚡</span>
                                            <span className="leading-relaxed flex-1">{insight}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    ) : (
                        <div className="text-center py-12 font-mono text-xs text-slate-600">
                            [!] Core Engine Trace Fault. Vector allocation denied.
                        </div>
                    )}
                </main>

            </div>
        </div>
    );
}