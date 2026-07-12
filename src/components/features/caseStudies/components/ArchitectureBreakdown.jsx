import React, { useState, useEffect, useMemo, useCallback } from 'react';

// ============================================================================
// SYSTEM INFRASTRUCTURE ENUMS & REGISTRIES (Isolated Domain Layer)
// ============================================================================
const DATA_PIPELINE_MODES = {
    STABLE_GREEN: 'SYSTEM_STABLE_OPERATIONAL',
    DEGRADED_WARN: 'SYSTEM_PARTIAL_DEGRADATION',
    CRITICAL_FAIL: 'SYSTEM_FAILOVER_TRIGGERED',
    SHUTDOWN: 'SYSTEM_HARD_CEASE'
};

const INFRA_REGIONS = {
    US_EAST_AMER: 'us-east-1_primary',
    EU_WEST_EMEA: 'eu-west-1_replica',
    AP_SOUTH_APAC: 'ap-south-1_edge',
    GLOBAL_ANYCAST: 'anycast_mesh_backbone'
};

const VISUAL_THEME_REGISTRY = {
    [DATA_PIPELINE_MODES.STABLE_GREEN]: {
        border: 'border-emerald-500/40 hover:border-emerald-500',
        background: 'bg-emerald-950/10 shadow-emerald-950/30',
        text: 'text-emerald-400',
        glow: 'bg-emerald-500'
    },
    [DATA_PIPELINE_MODES.DEGRADED_WARN]: {
        border: 'border-amber-500/40 hover:border-amber-500',
        background: 'bg-amber-950/10 shadow-amber-950/30',
        text: 'text-amber-400',
        glow: 'bg-amber-500'
    },
    [DATA_PIPELINE_MODES.CRITICAL_FAIL]: {
        border: 'border-rose-500/40 hover:border-rose-500',
        background: 'bg-rose-950/10 shadow-rose-950/30',
        text: 'text-rose-400',
        glow: 'bg-rose-500'
    },
    [DATA_PIPELINE_MODES.SHUTDOWN]: {
        border: 'border-slate-800',
        background: 'bg-slate-950',
        text: 'text-slate-500',
        glow: 'bg-slate-700'
    }
};

const METRIC_TABS = {
    TOPOLOGY_MAP: 'TOPOLOGY_MAP',
    LIVE_TELEMETRY: 'LIVE_TELEMETRY'
};

const INFRA_MANIFEST_SCHEMAS = [
    {
        clusterId: "SYS-MIGRATE-992X",
        systemName: "Hyper-Scale Quantum Transaction Ledger",
        tier: "Tier-0 Mission Critical",
        region: INFRA_REGIONS.GLOBAL_ANYCAST,
        operationalStatus: DATA_PIPELINE_MODES.STABLE_GREEN,
        telemetryData: { loadFactor: 0.142, activeIOPS: 4890212, failureRate: 0.000001, totalSLA: 99.9999 },
        architecturalTopology: {
            layer: "Distributed Consensus Engine",
            description: "Asynchronous multi-master transactional ledger orchestrating atomic state syncing across 4 continental micro-regions with under 4ms cross-cutting mutation reconciliation loops.",
            verificationInvariants: [
                "Raft Consensus Protocol Over-Ridden with Custom Optimistic BFT Pipelines",
                "Zero-Allocation Memory Buffers written in Zero-Cost Rust Foreign Interfaces",
                "Hardware-Accelerated Crypto-Verification Layer Utilizing Intel SGX Enclaves"
            ]
        },
        systemDependencies: ["Kafka-Mesh-L4", "Dynamo-Global-Backbone"],
        costMatrix: { monthlyBurn: 242000, efficiencyMetric: 0.98 }
    },
    {
        clusterId: "SYS-STREAM-041B",
        systemName: "Real-Time Petabyte Video Ingestion Engine",
        tier: "Tier-1 High-Throughput Stream",
        region: INFRA_REGIONS.US_EAST_AMER,
        operationalStatus: DATA_PIPELINE_MODES.DEGRADED_WARN,
        telemetryData: { loadFactor: 0.887, activeIOPS: 12409104, failureRate: 0.0124, totalSLA: 99.9500 },
        architecturalTopology: {
            layer: "Data Ingestion & Dynamic Sharding Multiplexer",
            description: "Backpressure-aware multi-threaded pipeline ingesting uncompressed RAW video matrix blocks directly over custom L4 layer bypass mechanisms.",
            verificationInvariants: [
                "Kernel Bypass (eBPF/XDP) network frames isolation architecture",
                "Adaptive rate-limiting with exponential micro-backoffs running inside edge-nodes"
            ]
        },
        systemDependencies: ["eBPF-Router-Mesh", "S3-Deep-Glacier-Cold"],
        costMatrix: { monthlyBurn: 890000, efficiencyMetric: 0.81 }
    }
];

// ============================================================================
// SIMULATED HARDWARE-LEVEL TELEMETRY ENGINE LAYER
// ============================================================================
const TelemetryPipelineBroker = {
    fetchDiagnostics: async (clusterId) => {
        if (!clusterId) {
            throw new Error("FATAL EXCEPTION: Cluster Context Pointer Unallocated.");
        }
        await new Promise(resolve => setTimeout(resolve, 450));
        return {
            epochTimestamp: Date.now(),
            activeThreadPoolLoad: `${(Math.random() * 35 + 10).toFixed(2)}%`,
            memoryFootprintPages: "4096000_PAGES_X86_64",
            hardwareReplicaState: "ACTIVE_ACTIVE_HOT_SWAP_SYNCED"
        };
    }
};

// ============================================================================
// SUB-PRESENTATION INTERFACES (Clean Architecture Atomic Sub-Components)
// ============================================================================
const TopologyView = ({ activeClusterNode }) => (
    <div className="space-y-6 animate-[fadeIn_0.12s_ease-out]">
        <div className="space-y-2">
            <h4 className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">// ARCHITECTURAL LAYER DEF</h4>
            <div className="p-4 bg-slate-950/60 border border-slate-800/40 rounded-xl">
                <span className="text-xs font-mono font-bold text-indigo-400 block">
                    <span className="text-cyan-500">NODE_ROLE:</span> {activeClusterNode.architecturalTopology.layer}
                </span>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {activeClusterNode.architecturalTopology.description}
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-[10px]">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 flex justify-between items-center">
                <span className="text-slate-500">CLUSTER_ID</span>
                <span className="text-cyan-400 font-bold">{activeClusterNode.clusterId}</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 flex justify-between items-center">
                <span className="text-slate-500">REGION</span>
                <span className="text-emerald-400 font-bold">{activeClusterNode.region}</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 flex justify-between items-center">
                <span className="text-slate-500">MONTHLY_BURN</span>
                <span className="text-amber-400 font-bold">${activeClusterNode.costMatrix.monthlyBurn.toLocaleString()}</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 flex justify-between items-center">
                <span className="text-slate-500">SLA</span>
                <span className="text-emerald-400 font-bold">{activeClusterNode.telemetryData.totalSLA}%</span>
            </div>
        </div>

        <div className="space-y-3">
            <h4 className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">// CRITICAL INVARIANTS</h4>
            <div className="grid grid-cols-1 gap-2">
                {activeClusterNode.architecturalTopology.verificationInvariants.map((inv, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-slate-950/60 border border-slate-800/40 rounded-xl">
                        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-900/50 px-2 py-0.5 rounded mt-0.5">
                            #{i + 1}
                        </span>
                        <span className="text-xs text-slate-300 leading-relaxed">{inv}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const LiveTelemetryView = ({ clusterId }) => {
    const [telemetry, setTelemetry] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        TelemetryPipelineBroker.fetchDiagnostics(clusterId).then((data) => {
            setTelemetry(data);
            setLoading(false);
        });
    }, [clusterId]);

    if (loading) {
        return (
            <div className="w-full py-12 flex flex-col items-center justify-center gap-3 font-mono text-xs text-slate-500">
                <div className="h-5 w-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                <p className="animate-pulse tracking-tight">Intercepting socket memory buffers over fiber backplane...</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs animate-[fadeIn_0.12s_ease-out]">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-900">
                <span className="text-slate-500 text-[10px]">// THREAD_POOL_LOAD</span>
                <div className="text-emerald-400 font-bold text-lg mt-1">{telemetry?.activeThreadPoolLoad} UTILIZATION</div>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-900">
                <span className="text-slate-500 text-[10px]">// REPLICA_STATE</span>
                <div className="text-cyan-400 font-bold text-sm mt-1">{telemetry?.hardwareReplicaState}</div>
            </div>
        </div>
    );
};

// ============================================================================
// CORE APPLICATION CONTAINER COMPONENT
// ============================================================================
export default function ArchitectureBreakdown() {
    const [selectedClusterId, setSelectedClusterId] = useState(INFRA_MANIFEST_SCHEMAS[0].clusterId);
    const [activeSystemTab, setActiveSystemTab] = useState(METRIC_TABS.TOPOLOGY_MAP);
    const [filterRegion, setFilterRegion] = useState('ALL_REGIONS');
    const [searchQuery, setSearchQuery] = useState('');

    const activeClusterNode = useMemo(() => {
        return INFRA_MANIFEST_SCHEMAS.find(c => c.clusterId === selectedClusterId) || INFRA_MANIFEST_SCHEMAS[0];
    }, [selectedClusterId]);

    const processedClusterNodes = useMemo(() => {
        return INFRA_MANIFEST_SCHEMAS.filter(node => {
            const matchRegion = filterRegion === 'ALL_REGIONS' || node.region === filterRegion;
            const cleanQuery = searchQuery.trim().toLowerCase();
            const matchSearch = !cleanQuery ||
                node.systemName.toLowerCase().includes(cleanQuery) ||
                node.clusterId.toLowerCase().includes(cleanQuery);
            return matchRegion && matchSearch;
        });
    }, [filterRegion, searchQuery]);

    const executeSystemReset = useCallback(() => {
        setSelectedClusterId(INFRA_MANIFEST_SCHEMAS[0].clusterId);
        setFilterRegion('ALL_REGIONS');
        setSearchQuery('');
        setActiveSystemTab(METRIC_TABS.TOPOLOGY_MAP);
    }, []);

    const tabViewRouterMap = {
        [METRIC_TABS.TOPOLOGY_MAP]: <TopologyView activeClusterNode={activeClusterNode} />,
        [METRIC_TABS.LIVE_TELEMETRY]: <LiveTelemetryView clusterId={activeClusterNode.clusterId} />
    };

    return (
        <div className="w-full min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 lg:p-12 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-300">

            {/* ENTERPRISE PLATFORM FRAMEWORK HEADER */}
            <header className="w-full border-b border-slate-800/80 pb-6 mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-cyan-500 shadow-lg animate-pulse" />
                        <span className="font-mono text-xs font-black tracking-widest text-slate-500 uppercase">// PRINCIPLE DECOUPLED TELEMETRY CONTROL ENGINE</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black font-mono tracking-tighter bg-gradient-to-r from-slate-100 via-slate-300 to-slate-500 bg-clip-text text-transparent">
                        System Architecture Matrix
                    </h1>
                </div>
                <button
                    onClick={executeSystemReset}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-mono rounded-xl transition-all shadow-lg"
                >
                    ← PURGE_PIPELINE_CONTEXT
                </button>
            </header>

            {/* CORE CONTROL DEPLOYMENT ARCHITECTURE PANELS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* LEFT COLUMN: CONTROL INTERFACE FOR SELECTION LISTINGS INDICES */}
                <section className="lg:col-span-5 space-y-6">
                    <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-4 md:p-6 shadow-xl backdrop-blur-md space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-mono text-xs font-extrabold uppercase tracking-widest text-slate-400">// SHARD CLUSTER NETWORKS</h3>
                            <span className="text-[10px] font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-500">
                                COUNT: {processedClusterNodes.length}
                            </span>
                        </div>

                        {/* ACTION MATRICES INTERFACES */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Query asset tracking logs..."
                                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 text-slate-200 px-3 py-2 text-xs font-mono rounded-xl focus:outline-none"
                            />
                            <select
                                value={filterRegion}
                                onChange={(e) => setFilterRegion(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 text-slate-300 px-3 py-2 text-xs font-mono rounded-xl focus:outline-none cursor-pointer"
                            >
                                <option value="ALL_REGIONS">ALL DATA SHARDS</option>
                                <option value={INFRA_REGIONS.GLOBAL_ANYCAST}>GLOBAL ANYCAST</option>
                                <option value={INFRA_REGIONS.US_EAST_AMER}>US-EAST PRIMARY</option>
                            </select>
                        </div>

                        {/* COMPONENT MAP ITERATOR DISPATCH GRAPH FLUID TILES */}
                        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                            {processedClusterNodes.map((node) => {
                                const isSelected = node.clusterId === selectedClusterId;
                                const visualTheme = VISUAL_THEME_REGISTRY[node.operationalStatus];

                                return (
                                    <div
                                        key={node.clusterId}
                                        onClick={() => setSelectedClusterId(node.clusterId)}
                                        className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${visualTheme.background} ${isSelected ? 'border-cyan-500 bg-slate-900/80 shadow-md shadow-cyan-950/20' : `${visualTheme.border} border-slate-900`
                                            }`}
                                    >
                                        <div className="flex justify-between items-start gap-2 mb-2">
                                            <span className="text-[10px] font-mono tracking-widest text-slate-500">{node.clusterId}</span>
                                            <div className="flex items-center gap-1.5">
                                                <span className={`h-1.5 w-1.5 rounded-full ${visualTheme.glow}`} />
                                                <span className={`text-[9px] font-mono font-bold tracking-tighter uppercase ${visualTheme.text}`}>
                                                    {node.operationalStatus.replace('SYSTEM_', '')}
                                                </span>
                                            </div>
                                        </div>
                                        <h4 className="text-sm font-bold text-slate-200 font-mono">{node.systemName}</h4>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* RIGHT COLUMN: CORE DETAILS INTERACTIVE ANALYSIS PLATFORM WORKSPACE */}
                <section className="lg:col-span-7">
                    <div className="bg-slate-900/20 border border-slate-900/60 rounded-2xl p-6 md:p-8 space-y-8 shadow-2xl backdrop-blur-sm">

                        <div className="space-y-3">
                            <span className="text-[9px] font-mono font-extrabold tracking-widest uppercase bg-slate-950 px-2 py-0.5 rounded text-cyan-400 border border-slate-800">
                                {activeClusterNode.tier}
                            </span>
                            <h2 className="text-xl md:text-3xl font-extrabold tracking-tight text-slate-100 font-mono">
                                {activeClusterNode.systemName}
                            </h2>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                {activeClusterNode.architecturalTopology.description}
                            </p>
                        </div>

                        {/* TAB CONTROLS NAVIGATION */}
                        <div className="border-b border-slate-800">
                            <nav className="flex gap-2 -mb-px">
                                {Object.keys(METRIC_TABS).map((tabKey) => (
                                    <button
                                        key={tabKey}
                                        onClick={() => setActiveSystemTab(tabKey)}
                                        className={`px-4 py-2.5 font-mono text-xs font-bold uppercase border-b-2 tracking-tighter transition-all ${activeSystemTab === tabKey
                                                ? 'border-cyan-500 text-cyan-400 bg-cyan-950/5'
                                                : 'border-transparent text-slate-500 hover:text-slate-300'
                                            }`}
                                    >
                                        {tabKey.replace('_', ' ')}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* REGISTERED DICTIONARY ROUTED DYNAMIC METRICS OUTPUT PANEL PLATFORM ENGINE VIEWPORT */}
                        <div className="min-h-[260px]">
                            {tabViewRouterMap[activeSystemTab]}
                        </div>

                    </div>
                </section>

            </div>
        </div>
    );
}