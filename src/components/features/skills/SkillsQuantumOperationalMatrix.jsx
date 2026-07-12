import React, { useState, useMemo, useCallback, useEffect } from "react";

// ============================================================================
// 1. IMMUTABLE ARCHITECTURAL CONFIGURATIONS & RAW MANIFEST (Static Memory Layer)
// ============================================================================

const ENGINE_SPECS = Object.freeze({
    GATEWAY_URL: process.env.REACT_APP_API_GATEWAY_URL || "https://api.matrix-core.internal/v1",
    TIMEOUT_MS: 6000,
    POST: "POST",
    GET: "GET"
});

const SKILL_DOMAINS = Object.freeze({
    CORE_LANGUAGES: "CORE_LANGUAGES",
    FRAMEWORKS_ENGINE: "FRAMEWORKS_ENGINE",
    INFRASTRUCTURE_CLOUD: "INFRASTRUCTURE_CLOUD"
});

const COMPONENT_THEMING = Object.freeze({
    [SKILL_DOMAINS.CORE_LANGUAGES]: {
        border: "border-amber-500/10 hover:border-amber-500/30",
        text: "text-amber-400",
        bg: "bg-amber-500/10",
        bar: "bg-gradient-to-r from-amber-600 to-yellow-400",
        shadow: "shadow-[0_0_20px_rgba(245,158,11,0.05)]"
    },
    [SKILL_DOMAINS.FRAMEWORKS_ENGINE]: {
        border: "border-cyan-500/10 hover:border-cyan-500/30",
        text: "text-cyan-400",
        bg: "bg-cyan-500/10",
        bar: "bg-gradient-to-r from-cyan-600 to-blue-400",
        shadow: "shadow-[0_0_20px_rgba(6,182,212,0.05)]"
    },
    [SKILL_DOMAINS.INFRASTRUCTURE_CLOUD]: {
        border: "border-purple-500/10 hover:border-purple-500/30",
        text: "text-purple-400",
        bg: "bg-purple-500/10",
        bar: "bg-gradient-to-r from-purple-600 to-fuchsia-400",
        shadow: "shadow-[0_0_20px_rgba(168,85,247,0.05)]"
    }
});

const DOMAIN_REGISTRY_LOOKUP = Object.freeze({
    [SKILL_DOMAINS.CORE_LANGUAGES]: "SYSTEM_LANGUAGES",
    [SKILL_DOMAINS.FRAMEWORKS_ENGINE]: "ARCHITECTURE_FRAMEWORKS",
    [SKILL_DOMAINS.INFRASTRUCTURE_CLOUD]: "CLOUD_INFRASTRUCTURE"
});

const STATIC_FALLBACK_SKILLS = Object.freeze([
    { id: "SKILL-01", name: "TypeScript / JavaScript", competency: 98, level: "Distinguished", category: SKILL_DOMAINS.CORE_LANGUAGES, telemetryWeight: "O(1) Execution Capacity" },
    { id: "SKILL-02", name: "Python / Django Engine", competency: 95, level: "Principal Expert", category: SKILL_DOMAINS.CORE_LANGUAGES, telemetryWeight: "High-Throughput Mitigation" },
    { id: "SKILL-03", name: "React.js / Next.js Framework", competency: 97, level: "L15 Architect", category: SKILL_DOMAINS.FRAMEWORKS_ENGINE, telemetryWeight: "Virtual DOM Thread Tuning" },
    { id: "SKILL-04", name: "Node.js Core / Express Clusters", competency: 94, level: "System Engineer", category: SKILL_DOMAINS.FRAMEWORKS_ENGINE, telemetryWeight: "Non-Blocking Async Pools" },
    { id: "SKILL-05", name: "Kubernetes / Docker Pods", competency: 92, level: "Orchestrator Guru", category: SKILL_DOMAINS.INFRASTRUCTURE_CLOUD, telemetryWeight: "Self-Healing Workloads" },
    { id: "SKILL-06", name: "AWS Cloud Ingress / Edge Fabric", competency: 90, level: "Cloud Overlord", category: SKILL_DOMAINS.INFRASTRUCTURE_CLOUD, telemetryWeight: "Multi-Zone Sharding Vector" }
]);

const STATIC_TIMELINE_EVENTS = Object.freeze([
    { epoch: "2024 - 2026", milestone: "Enterprise Cloud Migration", infrastructure: "Migrated 400+ monolith applications to sharded Kubernetes nodes with active telemetry streaming." },
    { epoch: "2022 - 2024", milestone: "Neural Aggregation Core Deployment", infrastructure: "Engineered distributed vector search microservices utilizing async memory maps." },
    { epoch: "2018 - 2022", milestone: "High-Frequency Transaction Ingress", infrastructure: "Architected a multi-tenant financial data lake resolving 50k requests per single thread sync." }
]);

// ============================================================================
// 2. STRICT VALIDATION & INGRESS AGENT (SchemaValidator & Registryingress Modules)
// ============================================================================

const SchemaValidator = {
    validateSkillsMatrix: (rawBuffer) => {
        if (!rawBuffer || !Array.isArray(rawBuffer)) return false;
        return rawBuffer.every(node => node.id && node.name && typeof node.competency === "number" && node.category);
    }
};

const executeNetworkIngress = async (path, verb = ENGINE_SPECS.GET, data = null) => {
    const signalToken = new AbortController();
    const threadTimer = setTimeout(() => signalToken.abort(), ENGINE_SPECS.TIMEOUT_MS);

    const requestConfig = {
        method: verb,
        headers: {
            "Content-Type": "application/json",
            "X-Telemetry-Ingress-Layer": "L15-Skills-Matrix-Fabric"
        },
        signal: signalToken.signal
    };

    if (data && verb !== ENGINE_SPECS.GET) {
        requestConfig.body = JSON.stringify(data);
    }

    try {
        const rawResponse = await fetch(`${ENGINE_SPECS.GATEWAY_URL}${path}`, requestConfig);
        clearTimeout(threadTimer);
        if (!rawResponse.ok) throw new Error(`Cluster connection exception code [HTTP ${rawResponse.status}].`);
        const unpackedPayload = await rawResponse.json();
        return unpackedPayload?.data || [];
    } catch (fault) {
        clearTimeout(threadTimer);
        console.warn(`%c[SKILLS TELEMETRY FALLBACK]: ${fault.message}`, "color: #f59e0b; font-weight: bold; font-family: monospace;");
        return [...STATIC_FALLBACK_SKILLS];
    }
};

export const RegistryIngress = {
    pullTelemetryStream: () => executeNetworkIngress("/skills/matrix-fabric"),
    pullProfilerLogDump: (nodeId) => executeNetworkIngress(`/prisma/profiler/${nodeId}`, ENGINE_SPECS.POST, { trace: true })
};

// ============================================================================
// 3. REACTIVE PRISMA PROFILER CUSTOM TELEMETRY HOOK (usePrismaProfiler Module)
// ============================================================================

export function usePrismaProfiler() {
    const [skillsMatrix, setSkillsMatrix] = useState([]);
    const [loading, setLoading] = useState(true);
    const [systemFault, setSystemFault] = useState(null);
    const [activeDomainFilter, setActiveDomainFilter] = useState(SKILL_DOMAINS.CORE_LANGUAGES);
    const [monitoredNodeId, setMonitoredNodeId] = useState(null);
    const [profilerReportDump, setProfilerReportDump] = useState(null);

    useEffect(() => {
        let threadMounted = true;
        RegistryIngress.pullTelemetryStream()
            .then((streamBuffer) => {
                if (threadMounted) {
                    const isValid = SchemaValidator.validateSkillsMatrix(streamBuffer);
                    if (!isValid) throw new Error("Data stream structural constraint violation detected during validation step.");
                    setSkillsMatrix(streamBuffer);
                    setLoading(false);
                }
            })
            .catch((error) => {
                if (threadMounted) {
                    setSystemFault(error.message);
                    setSkillsMatrix([...STATIC_FALLBACK_SKILLS]);
                    setLoading(false);
                }
            });
        return () => { threadMounted = false; };
    }, []);

    const sortedAndFilteredSkills = useMemo(() => {
        const filterRoutesMap = {
            [SKILL_DOMAINS.CORE_LANGUAGES]: (node) => node.category === SKILL_DOMAINS.CORE_LANGUAGES,
            [SKILL_DOMAINS.FRAMEWORKS_ENGINE]: (node) => node.category === SKILL_DOMAINS.FRAMEWORKS_ENGINE,
            [SKILL_DOMAINS.INFRASTRUCTURE_CLOUD]: (node) => node.category === SKILL_DOMAINS.INFRASTRUCTURE_CLOUD
        };
        const targetFilterFn = filterRoutesMap[activeDomainFilter] || (() => true);
        return skillsMatrix.filter(targetFilterFn).sort((a, b) => b.competency - a.competency);
    }, [skillsMatrix, activeDomainFilter]);

    return { skillsMatrix, sortedAndFilteredSkills, loading, systemFault, activeDomainFilter, setActiveDomainFilter, monitoredNodeId, setMonitoredNodeId, profilerReportDump, setProfilerReportDump };
}

// ============================================================================
// 4. DECOUPLED VDOM PERFORMANCE COMPONENT LAYERS (Cards, Filters & Timeline)
// ============================================================================

/**
 * [SkillCategory.jsx / SkillFilters Module]
 */
const SkillCategoryFilters = React.memo(({ currentDomain, onToggleDomain }) => (
    <div className="flex flex-wrap gap-2 font-mono relative z-10">
        {Object.keys(DOMAIN_REGISTRY_LOOKUP).map((domainKey) => (
            <button
                key={domainKey}
                onClick={() => onToggleDomain(domainKey)}
                className={`px-4 py-1.5 rounded text-xs font-bold transition-all border ${currentDomain === domainKey
                        ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                        : "bg-slate-950 text-slate-400 border-slate-900 hover:border-slate-800 hover:text-slate-200"
                    }`}
            >
                {DOMAIN_REGISTRY_LOOKUP[domainKey]}
            </button>
        ))}
    </div>
));
SkillCategoryFilters.displayName = "SkillCategoryFilters";

/**
 * [SkillProgress.jsx Module]
 */
const SkillProgressMeter = React.memo(({ scalarWeight, categoryKey }) => {
    const blueprint = COMPONENT_THEMING[categoryKey] || COMPONENT_THEMING[SKILL_DOMAINS.CORE_LANGUAGES];
    return (
        <div className="w-full font-mono mt-3 relative z-10">
            <div className="flex justify-between text-[11px] mb-1 text-slate-400">
                <span>METRIC_COMPETENCY_RATIO</span>
                <span className={`${blueprint.text} font-bold`}>{scalarWeight}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-950 rounded-full border border-slate-900/60 overflow-hidden">
                <div className={`h-full ${blueprint.bar} transition-all duration-1000`} style={{ width: `${scalarWeight}%` }} />
            </div>
        </div>
    );
});
SkillProgressMeter.displayName = "SkillProgressMeter";

/**
 * [SkillCard.jsx Module]
 */
const SkillCard = React.memo(({ skillNode, onTriggerProfiler }) => {
    const theme = COMPONENT_THEMING[skillNode.category] || COMPONENT_THEMING[SKILL_DOMAINS.CORE_LANGUAGES];

    return (
        <div className={`relative group bg-slate-900/40 rounded-xl border ${theme.border} p-5 ${theme.shadow} transition-all duration-300`}>
            <div className="flex justify-between items-start mb-3 relative z-10">
                <span className="font-mono text-[10px] text-slate-500">[{skillNode.id}]</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-tight bg-slate-950 text-slate-400 border border-slate-800">
                    {skillNode.level}
                </span>
            </div>

            <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400/90 transition-colors relative z-10">
                {skillNode.name}
            </h3>
            <p className="text-xs font-mono text-slate-400 mt-0.5 leading-relaxed relative z-10">{skillNode.telemetryWeight}</p>

            <SkillProgressMeter scalarWeight={skillNode.competency} categoryKey={skillNode.category} />

            <div className="mt-5 pt-3 border-t border-slate-950 flex justify-between items-center relative z-10">
                <button
                    onClick={() => onTriggerProfiler(skillNode)}
                    className="text-[10px] font-mono font-bold px-2 py-1 rounded border border-purple-500/20 text-purple-400 bg-purple-500/5 hover:bg-purple-500/10 transition-all shadow-[0_0_10px_rgba(168,85,247,0.02)]"
                >
                    ⚡ RUN_PRISMA_PROFILER
                </button>
            </div>
        </div>
    );
});
SkillCard.displayName = "SkillCard";

/**
 * [LearningTimeline.jsx Module]
 */
const EngineeringLearningTimeline = React.memo(() => (
    <div className="mt-16 border-t border-slate-900 pt-12 relative z-10">
        <div className="flex items-center gap-2 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            <h2 className="text-xs font-mono tracking-widest text-amber-400 uppercase">Chronological Knowledge Architecture Timeline</h2>
        </div>

        <div className="space-y-6 relative border-l border-slate-900 ml-3 pl-6">
            {STATIC_TIMELINE_EVENTS.map((event, index) => (
                <div key={index} className="relative group">
                    <div className="absolute -left-[31px] top-1.5 h-2 w-2 rounded-full bg-slate-950 border border-slate-700 group-hover:bg-cyan-400 transition-colors" />
                    <span className="block font-mono text-xs text-slate-500 tracking-wider mb-1">{event.epoch}</span>
                    <h4 className="text-md font-bold text-slate-200 group-hover:text-slate-100 transition-colors">{event.milestone}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">{event.infrastructure}</p>
                </div>
            ))}
        </div>
    </div>
));
EngineeringLearningTimeline.displayName = "EngineeringLearningTimeline";

/**
 * [TechStackVisualizer.jsx Module]
 */
const TechStackGraphVisualizer = React.memo(({ matrixData }) => (
    <div className="bg-slate-950/60 border border-slate-900 p-6 rounded-xl font-mono text-xs mb-10 relative z-10">
        <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-4 flex justify-between items-center">
            <span>// GRAPH_TOPOLOGY_MATRIX_DUMP</span>
            <span className="text-emerald-400">TELEMETRY_STREAM_STABLE</span>
        </div>
        <div className="flex flex-wrap gap-2">
            {matrixData.map((node) => (
                <div key={node.id} className="px-3 py-1.5 bg-slate-900 rounded border border-slate-800/80 hover:border-cyan-500/30 transition-all flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-slate-300 font-bold">{node.name}</span>
                    <span className="text-[10px] text-slate-600">({node.competency}w)</span>
                </div>
            ))}
        </div>
    </div>
));
TechStackGraphVisualizer.displayName = "TechStackGraphVisualizer";

// ============================================================================
// 5. PRIMARY DEPLOYED CONTAINER RUNWAY (SkillPage.jsx Entrypoint Module)
// ============================================================================

export default function SkillsQuantumOperationalMatrix() {
    const { skillsMatrix, sortedAndFilteredSkills, loading, systemFault, activeDomainFilter, setActiveDomainFilter, monitoredNodeId, setMonitoredNodeId, profilerReportDump, setProfilerReportDump } = usePrismaProfiler();
    const [profilerLoading, setProfilerLoading] = useState(false);

    // High-Performance Core Profiler Trigger Callback
    const handleExecuteProfiler = useCallback(async (skillNode) => {
        setMonitoredNodeId(skillNode.id);
        setProfilerLoading(true);
        try {
            const response = await RegistryIngress.pullProfilerLogDump(skillNode.id);
            setProfilerReportDump({
                target: skillNode.name,
                log: response?.queryExecutionBlueprint || `SELECT * FROM "${skillNode.category}" WHERE "competency" >= ${skillNode.competency} ORDER BY "execution_weight" DESC; [Cache Hit: O(1) Edge Buffer - Execution Time: 0.04ms]`
            });
        } catch {
            setProfilerReportDump({
                target: skillNode.name,
                log: `[CRITICAL PROFILER EXCEPTION]: Local memory thread lookup intercept on "${skillNode.id}". Pipeline fell back safely to schema architecture manifest rules.`
            });
        } finally {
            setProfilerLoading(false);
        }
    }, [setMonitoredNodeId, setProfilerReportDump]);

    return (
        <div className="min-h-screen w-full bg-[#030712] text-slate-100 px-4 sm:px-8 py-12 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 antialiased relative overflow-hidden">

            {/* Structural Schema Validation Fault Notification Area */}
            {systemFault && (
                <div className="max-w-7xl mx-auto mb-6 bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 flex items-center gap-3 font-mono text-xs text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.02)]">
                    <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                    <span>[INGRESS_SCHEMA_ALERT]: {systemFault}. Rendering immutable static backup manifest fabric cache safely.</span>
                </div>
            )}

            {/* Primary Infrastructure Matrix Header Banner */}
            <header className="max-w-7xl mx-auto mb-16 border-b border-slate-900 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                        <p className="text-xs font-mono tracking-widest text-cyan-400 uppercase">Principal Knowledge Fabric Network</p>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 via-slate-300 to-slate-500 bg-clip-text text-transparent">
                        Skills Competency Cluster
                    </h1>
                </div>

                <SkillCategoryFilters currentDomain={activeDomainFilter} onToggleDomain={setActiveDomainFilter} />
            </header>

            {/* Main Core Workload Execution Segment */}
            <main className="max-w-7xl mx-auto">

                {/* Real-time Dynamic Node Graph Topology Section */}
                {!loading && skillsMatrix.length > 0 && (
                    <TechStackGraphVisualizer matrixData={skillsMatrix} />
                )}

                {loading ? (
                    <div className="text-center py-24 font-mono text-xs text-slate-500 tracking-widest animate-pulse">
                        BUFFERING_CLUSTERS_TELEMETRY_VECTOR_METRICS...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedAndFilteredSkills.map((skillNode) => (
                            <SkillCard
                                key={skillNode.id}
                                skillNode={skillNode}
                                onTriggerProfiler={handleExecuteProfiler}
                            />
                        ))}
                    </div>
                )}

                {/* Chronological Architecture Event Runway */}
                <EngineeringLearningTimeline />
            </main>

            {/* Real-time Prisma Query Profiler Output Modal Gateway */}
            {(profilerLoading || profilerReportDump) && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-purple-500/20 w-full max-w-xl rounded-2xl p-6 shadow-2xl font-mono text-xs relative">
                        <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
                            <span className="text-purple-400 font-bold flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
                                DATABASE_PRISMA_PROFILER_LOG_DUMP
                            </span>
                            {!profilerLoading && (
                                <button
                                    onClick={() => { setProfilerReportDump(null); setMonitoredNodeId(null); }}
                                    className="text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    [DISMISS_BUFFER]
                                </button>
                            )}
                        </div>

                        {profilerLoading ? (
                            <div className="py-12 text-center text-purple-400/70 animate-pulse tracking-wider">
                                INTERCEPTING_DATABASE_QUERIES_AND_PARSING_ABSTRACT_SYNTAX_TREES...
                            </div>
                        ) : (
                            <div>
                                <p className="text-slate-500 mb-2">PROFILED_TARGET: <span className="text-slate-300 font-bold">{profilerReportDump?.target}</span></p>
                                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-purple-300/90 leading-relaxed max-h-[40vh] overflow-y-auto">
                                    {profilerReportDump?.log}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}