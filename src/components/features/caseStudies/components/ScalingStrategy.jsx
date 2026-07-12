import React, { useState, useEffect, useMemo } from 'react';

// ============================================================================
// ARCHITECTURAL CONSTANTS & CONFIGURATION MATRICES (The "Brain" of the Scale)
// ============================================================================

const SCALE_LAYERS = {
    EDGE: 'EDGE_COMPUTE',
    INGRESS: 'TRAFFIC_INGRESS',
    ORCHESTRATION: 'COMPUTE_ORCHESTRATION',
    STORAGE: 'DISTRIBUTED_STORAGE',
    TELEMETRY: 'GLOBAL_TELEMETRY'
};

const SYSTEM_STATUS_CODES = {
    OPTIMAL: 'STATUS_200_OK',
    DEGRADED: 'STATUS_429_TOO_MANY_REQUESTS',
    CRITICAL: 'STATUS_503_SERVICE_UNAVAILABLE',
    DRAINING: 'STATUS_CONNECTION_DRAIN'
};

// Deeply nested configuration object mapping global data centers and strategies
const GLOBAL_INFRASTRUCTURE_MAP = {
    regions: [
        { id: 'us-east-1', name: 'N. Virginia (Primary)', trafficWeight: 40, activeScyllaNodes: 512 },
        { id: 'eu-west-1', name: 'Ireland (EMEA Hub)', trafficWeight: 35, activeScyllaNodes: 384 },
        { id: 'ap-northeast-1', name: 'Tokyo (APAC Ingress)', trafficWeight: 25, activeScyllaNodes: 256 }
    ],
    failoverProtocols: {
        [SYSTEM_STATUS_CODES.OPTIMAL]: { autoTrigger: false, alertLevel: 'INFO', activePath: 'PRIMARY' },
        [SYSTEM_STATUS_CODES.DEGRADED]: { autoTrigger: true, alertLevel: 'WARNING', activePath: 'SHADOW_ROUTING' },
        [SYSTEM_STATUS_CODES.CRITICAL]: { autoTrigger: true, alertLevel: 'CRITICAL', activePath: 'MULTI_REGION_DRAIN' },
        [SYSTEM_STATUS_CODES.DRAINING]: { autoTrigger: false, alertLevel: 'NOTICE', activePath: 'ISOLATED_CLUSTER' }
    }
};

// Strategic architectural execution paradigms (The 50-Year Experience Paradigm)
const SCALING_PARADIGMS = [
    {
        layer: SCALE_LAYERS.EDGE,
        title: "Anycast Routing & Global Edge Offloading",
        metrics: { latencyTarget: "< 12ms", cacheHitRatio: "99.94%" },
        assertions: [
            "BGP Anycast routing table optimizations across 450+ global PoPs.",
            "Edge-side compute parsing JWTs and state validation before hitting origin.",
            "WASM-driven dynamic request rewriting at the CDN layer."
        ]
    },
    {
        layer: SCALE_LAYERS.INGRESS,
        title: "Layer 7 Load Balancing & Envoy Proxy Mesh",
        metrics: { rpsCapacity: "55,000,000/sec", activeConnections: "1.2B" },
        assertions: [
            "Adaptive concurrency limiting preventing cascading failure domain propagation.",
            "HTTP/3 prioritization matrices based on real-time network jitter telemetry.",
            "Mutual TLS (mTLS) handshake offloading via specialized hardware accelerators."
        ]
    },
    {
        layer: SCALE_LAYERS.ORCHESTRATION,
        title: "Multi-Region Kubernetes Elastic Mesh",
        metrics: { podScaleTime: "0.4s", computeEfficiency: "94.2%" },
        assertions: [
            "Custom CRDs managing declarative horizontal pod autoscaling based on memory bandwidth.",
            "Kernel-level eBPF probes tracking packet life-cycles to eliminate service mesh overhead.",
            "Predictive capacity forecasting via sub-millisecond real-time model evaluation."
        ]
    },
    {
        layer: SCALE_LAYERS.STORAGE,
        title: "Distributed Sharded ScyllaDB & Multi-Raft Consensus",
        metrics: { writeIOPS: "180,000,000", replicationLag: "< 8ms" },
        assertions: [
            "Zero-locking consistent hashing rings minimizing cross-datacenter mutations.",
            "Hybrid-logical clock sequence tracking to cleanly resolve out-of-order writes.",
            "Tiered NVMe storage caching with real-time compression algorithms."
        ]
    }
];

// ============================================================================
// CORE PRINCIPAL COMPONENT
// ============================================================================

export default function ScalingStrategy() {
    // State tracking simulating massive real-time infrastructure metrics
    const [activeLayer, setActiveLayer] = useState(SCALE_LAYERS.EDGE);
    const [systemStatus, setSystemStatus] = useState(SYSTEM_STATUS_CODES.OPTIMAL);
    const [liveMetrics, setLiveMetrics] = useState({ globalRps: 42500000, CPUUtilization: 42.8 });
    const [simulationLogs, setSimulationLogs] = useState([]);
    const [isSimulating, setIsSimulating] = useState(false);

    // --------------------------------------------------------------------------
    // ASYNCHRONOUS PIPELINES & PROMISES (Simulating Infrastructure Lifecycles)
    // --------------------------------------------------------------------------

    // High-order function returning a Promise to simulate multi-region verification
    const verifyRegionHealth = (regionId) => {
        return new Promise((resolve, reject) => {
            const delay = Math.floor(Math.random() * 600) + 200;
            setTimeout(() => {
                if (!regionId) {
                    reject(new Error("Malformed Network Routing Vector"));
                } else {
                    resolve({ id: regionId, status: 'HEALTHY', latency: `${Math.floor(Math.random() * 15) + 3}ms` });
                }
            }, delay);
        });
    };

    const triggerGlobalFailoverSimulation = async () => {
        if (isSimulating) return; // Guard clause

        setIsSimulating(true);
        setSystemStatus(SYSTEM_STATUS_CODES.DEGRADED);
        setSimulationLogs(prev => [...prev, "[CRITICAL] Initiating global chaos engineering simulation..."]);

        try {
            // Map configurations to an array of pending promises executing concurrently
            const regionalChecks = GLOBAL_INFRASTRUCTURE_MAP.regions.map(region =>
                verifyRegionHealth(region.id)
            );

            setSimulationLogs(prev => [...prev, "[PENDING] Resolving multi-region Raft consensus promises..."]);

            const evaluationResults = await Promise.all(regionalChecks);

            // Clean processing of promise resolutions using array reduction and transformation
            evaluationResults.forEach(result => {
                setSimulationLogs(prev => [...prev, `[RESOLVED] ${result.id} verified at ${result.latency} latency.`]);
            });

            // Defensive Architectural State Mitigation Block
            if (liveMetrics.CPUUtilization > 40) {
                setSystemStatus(SYSTEM_STATUS_CODES.DRAINING);
                setSimulationLogs(prev => [...prev, "[ACTION] Load balancing threshold met. Draining non-critical edge pathways."]);
            } else {
                setSystemStatus(SYSTEM_STATUS_CODES.OPTIMAL);
            }

        } catch (error) {
            setSystemStatus(SYSTEM_STATUS_CODES.CRITICAL);
            setSimulationLogs(prev => [...prev, `[FATAL] Infrastructure Promise Chain Rejected: ${error.message}`]);
        } finally {
            setIsSimulating(false);
        }
    };

    // Simulated telemetry ticker stream
    useEffect(() => {
        const telemetryInterval = setInterval(() => {
            setLiveMetrics(prev => {
                const drift = Math.random() > 0.5 ? 150000 : -150000;
                const cpuDrift = Math.random() > 0.5 ? 0.4 : -0.4;
                return {
                    globalRps: Math.max(35000000, prev.globalRps + drift),
                    CPUUtilization: Math.min(98, Math.max(20, prev.CPUUtilization + cpuDrift))
                };
            });
        }, 1000);

        return () => clearInterval(telemetryInterval);
    }, []);

    // Memoizing heavy layout filters for clean UI decoupling
    const filteredParadigm = useMemo(() => {
        return SCALING_PARADIGMS.find(p => p.layer === activeLayer) || SCALING_PARADIGMS[0];
    }, [activeLayer]);

    return (
        <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-mono p-6 lg:p-12 selection:bg-cyan-500 selection:text-slate-950">

            {/* HEADER SECTION (Principal Architectural Manifesto) */}
            <header className="border-b border-slate-800 pb-8 mb-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="text-xs text-cyan-400 font-bold tracking-widest uppercase mb-2">// CAP THEOREMATIC ARCHITECTURAL FRAMEWORK</div>
                        <h1 className="text-3xl lg:text-5xl font-black tracking-tight text-white">
                            GLOBAL SCALING <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500">STRATEGY</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-3 rounded">
                        <span className={`h-3 w-3 rounded-full animate-pulse ${systemStatus === SYSTEM_STATUS_CODES.OPTIMAL ? 'bg-emerald-500' :
                                systemStatus === SYSTEM_STATUS_CODES.DRAINING ? 'bg-amber-500' : 'bg-rose-500'
                            }`} />
                        <span className="text-xs text-slate-400 tracking-wider font-semibold uppercase">
                            {GLOBAL_INFRASTRUCTURE_MAP.failoverProtocols[systemStatus].alertLevel} ROUTING STATE
                        </span>
                    </div>
                </div>
            </header>

            {/* METRICS DASHBOARD ROW */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-lg backdrop-blur-sm">
                    <div className="text-xs text-slate-500 mb-1 font-bold">TOTAL COMPUTE INGRESS (RPS)</div>
                    <div className="text-3xl font-extrabold text-cyan-400">{(liveMetrics.globalRps / 1000000).toFixed(2)}M/s</div>
                    <div className="w-full bg-slate-800 h-1 rounded overflow-hidden mt-3">
                        <div className="bg-cyan-400 h-full transition-all duration-500" style={{ width: `${(liveMetrics.globalRps / 6000000) * 10}%` }} />
                    </div>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-lg backdrop-blur-sm">
                    <div className="text-xs text-slate-500 mb-1 font-bold">AVG MULTI-REGION CPU CORES</div>
                    <div className="text-3xl font-extrabold text-indigo-400">{liveMetrics.CPUUtilization.toFixed(1)}%</div>
                    <div className="w-full bg-slate-800 h-1 rounded overflow-hidden mt-3">
                        <div className="bg-indigo-400 h-full transition-all duration-300" style={{ width: `${liveMetrics.CPUUtilization}%` }} />
                    </div>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-lg backdrop-blur-sm flex flex-col justify-between">
                    <div>
                        <div className="text-xs text-slate-500 mb-1 font-bold">FAILOVER ACTIVE ORCHESTRATION</div>
                        <div className="text-sm font-semibold text-purple-400 uppercase mt-1">
                            {GLOBAL_INFRASTRUCTURE_MAP.failoverProtocols[systemStatus].activePath}
                        </div>
                    </div>
                    <button
                        onClick={triggerGlobalFailoverSimulation}
                        disabled={isSimulating}
                        className="w-full mt-4 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 font-bold text-xs py-2 px-4 rounded border border-slate-700 hover:border-cyan-400 transition-all cursor-pointer disabled:opacity-40 uppercase tracking-widest"
                    >
                        {isSimulating ? "Simulating Chaos..." : "Test Multi-Region Ingress Drop"}
                    </button>
                </div>
            </section>

            {/* CORE LAYER SELECTION & ARCHITECTURAL SPECS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                {/* Layer Controls Navigation */}
                <nav className="lg:col-span-4 flex flex-col gap-3">
                    <div className="text-xs font-bold text-slate-500 tracking-wider mb-1 uppercase">// OSI & SYSTEMS INFRASTRUCTURE LAYERS</div>
                    {SCALING_PARADIGMS.map((paradigm) => {
                        const isSelected = activeLayer === paradigm.layer;
                        return (
                            <button
                                key={paradigm.layer}
                                onClick={() => setActiveLayer(paradigm.layer)}
                                className={`w-full text-left p-4 rounded transition-all border flex flex-col justify-between ${isSelected
                                        ? 'bg-slate-900 border-cyan-500 shadow-md shadow-cyan-950/20 text-white'
                                        : 'bg-transparent border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                                    }`}
                            >
                                <span className="text-xs opacity-60 tracking-mono mb-1">{paradigm.layer}</span>
                                <span className="text-sm font-bold tracking-tight">{paradigm.title}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* Selected Layer Technical Assertions & Real-Time Code Execution Simulator */}
                <main className="lg:col-span-8 bg-slate-900 border border-slate-800 p-6 lg:p-8 rounded-xl flex flex-col justify-between">
                    <div>
                        {/* Strategy Content block */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-4">
                            <h2 className="text-xl font-bold text-white">{filteredParadigm.title}</h2>

                            <div className="flex gap-4">
                                {Object.entries(filteredParadigm.metrics).map(([key, value]) => (
                                    <div key={key} className="text-right">
                                        <span className="block text-[10px] text-slate-500 uppercase font-semibold">{key.replace(/([A-Z])/g, ' $1')}</span>
                                        <span className="text-xs font-bold text-cyan-400">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Architecture Assertions List */}
                        <div className="space-y-4">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">// GUARANTEED INVARIANT SYSTEMS POLICIES</div>
                            {filteredParadigm.assertions.map((assertion, index) => (
                                <div key={index} className="flex gap-3 items-start bg-slate-950 p-4 border border-slate-800/80 rounded">
                                    <span className="text-cyan-500 text-sm font-bold select-none">0{index + 1}.</span>
                                    <p className="text-xs text-slate-300 leading-relaxed font-sans">{assertion}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Conditional Simulation Log Output Block */}
                    {simulationLogs.length > 0 && (
                        <div className="mt-8 border-t border-slate-800 pt-6">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">// REAL-TIME STACK TELEMETRY ORCHESTRATOR LOGS</span>
                                <button
                                    onClick={() => setSimulationLogs([])}
                                    className="text-[10px] text-rose-400 hover:underline cursor-pointer"
                                >
                                    Clear Terminal
                                </button>
                            </div>
                            <div className="bg-slate-950 p-4 rounded border border-slate-800 max-h-40 overflow-y-auto text-[11px] space-y-1 text-slate-400 scrollbar-thin scrollbar-thumb-slate-800">
                                {simulationLogs.map((log, idx) => (
                                    <div key={idx} className={`leading-relaxed ${log.includes('[CRITICAL]') || log.includes('[FATAL]') ? 'text-rose-400' :
                                            log.includes('[RESOLVED]') ? 'text-emerald-400' :
                                                log.includes('[ACTION]') ? 'text-amber-400' : 'text-slate-400'
                                        }`}>
                                        {log}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </main>
            </div>

            {/* FOOTER METADATA MARKER */}
            <footer className="mt-12 pt-6 border-t border-slate-900 text-center text-[10px] text-slate-600 tracking-widest uppercase">
                System Topology Validated for Global High-Availability Distributed Lifecycles • Distributed Multi-Region Active Mesh Active-Active Mode
            </footer>
        </div>
    );
}