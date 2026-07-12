import React, { useState, useMemo, useCallback, useEffect } from "react";

// ============================================================================
// 1. IMMUTABLE SYSTEM REGISTRY & TELEMETRY MANIFEST (Memory Layer)
// ============================================================================

const SYSTEM_CONFIG = Object.freeze({
    GATEWAY_URL: process.env.REACT_APP_API_GATEWAY_URL || "https://api.matrix-core.internal/v1",
    TIMEOUT_MS: 8000,
    STORAGE_TOKEN: "CLUSTER_SESSION_TOKEN"
});

const SCHEDULER_STATES = Object.freeze({
    ALL_NODES: "ALL_NODES",
    BACKEND_DJANGO: "BACKEND_DJANGO",
    BACKEND_NODE: "BACKEND_NODE",
    GET: "GET",
    POST: "POST",
    PUT: "PUT"
});

const METRICS_LOOKUP = Object.freeze([
    { label: "Capacity", key: "scaleFactor" },
    { label: "Throughput", key: "throughput" },
    { label: "DB Topology", key: "DBReplica" }
]);

const CONTROL_POD_REGISTRY = Object.freeze({
    [SCHEDULER_STATES.ALL_NODES]: { id: SCHEDULER_STATES.ALL_NODES, display: "SYS_SHOW_ALL" },
    [SCHEDULER_STATES.BACKEND_DJANGO]: { id: SCHEDULER_STATES.BACKEND_DJANGO, display: "FILTER_DJANGO_CORE" },
    [SCHEDULER_STATES.BACKEND_NODE]: { id: SCHEDULER_STATES.BACKEND_NODE, display: "FILTER_NODE_CORE" }
});

const HARDWARE_THEME_MATRIX = Object.freeze({
    [SCHEDULER_STATES.BACKEND_DJANGO]: {
        border: "border-emerald-500/10 hover:border-emerald-500/40",
        text: "text-emerald-400",
        bg: "bg-emerald-500/10",
        glow: "from-emerald-500/0 via-emerald-500/10 to-emerald-500/0"
    },
    [SCHEDULER_STATES.BACKEND_NODE]: {
        border: "border-cyan-500/10 hover:border-cyan-500/40",
        text: "text-cyan-400",
        bg: "bg-cyan-500/10",
        glow: "from-cyan-500/0 via-cyan-500/10 to-cyan-500/0"
    }
});

const IMMUTABLE_FALLBACK_MANIFEST = Object.freeze([
    {
        projectId: "PROJ-NC-01",
        title: "Next-Gen Enterprise E-Commerce Platform",
        subheading: "Hyper-Scale Distributed Retail Engine Architecture",
        description: "A multi-tenant, microservices-driven retail engine designed for concurrent traffic mitigation, reactive global inventory state syncing, and high-frequency transactions storage optimization.",
        stackType: SCHEDULER_STATES.BACKEND_DJANGO,
        technologies: ["React.js", "Microsoft Next.js", "Redux.js", "Prisma", "Cloud Ingress", "Docker", "Tailwind CSS", "Django Engine", "PostgreSQL"],
        k8sTargetPod: "pod-ecommerce-core",
        metrics: { scaleFactor: "99.99% Uptime", throughput: "15k Req/Sec", DBReplica: "Master-Slave" }
    },
    {
        projectId: "PROJ-NC-02",
        title: "L10 Ultragod Full-Stack Portfolio Matrix",
        subheading: "Self-Healing Reactive Cloud Ecosystem & Telemetry Proxy",
        description: "The complete infrastructure proxy mapping your career telemetry, including active O(1) edge-caching memory networks, real-time logging buffers, and high-performance layout virtualization.",
        stackType: SCHEDULER_STATES.BACKEND_NODE,
        technologies: ["React.js", "Microsoft Next.js", "Redux.js", "Tailwind CSS", "Node.js Engine", "Express.js", "PostgreSQL", "MySQL"],
        k8sTargetPod: "pod-portfolio-matrix",
        metrics: { scaleFactor: "0ms Edge Cache", throughput: "O(1) Matrix Lookup", DBReplica: "Isolated Inversion" }
    },
    {
        projectId: "PROJ-NC-03",
        title: "Autonomous Analytical Control Dashboard App",
        subheading: "Real-Time Telemetry and Operational Cluster Analyzer",
        description: "An administrative mission-control console capable of parsing telemetry batch buffers, monitoring distributed K8s replica weights, and visualizing continuous background event logging loops.",
        stackType: SCHEDULER_STATES.BACKEND_NODE,
        technologies: ["React.js", "Redux.js", "Prisma", "Docker Containers", "Tailwind CSS", "Node.js Engine", "Express.js", "PostgreSQL"],
        k8sTargetPod: "pod-dashboard-analytics",
        metrics: { scaleFactor: "60 FPS Rendered", throughput: "400ms Batch Ingress", DBReplica: "Read-Intensive" }
    },
    {
        projectId: "PROJ-NC-04",
        title: "Reactive Distributed Real-Time Chat System",
        subheading: "Bi-Directional Event Stream Messaging Framework",
        description: "A secure, non-blocking asynchronous communications engine utilizing message queues and socket pools to route live sharded packet channels between virtual pod threads.",
        stackType: SCHEDULER_STATES.BACKEND_NODE,
        technologies: ["React.js", "Microsoft Next.js", "Cloud Ingress", "Tailwind CSS", "Node.js Engine", "Express.js", "PostgreSQL", "MySQL"],
        k8sTargetPod: "pod-chat-messaging",
        metrics: { scaleFactor: "<4ms Sync Latency", throughput: "100k Active Pools", DBReplica: "Write-Heavy Node" }
    },
    {
        projectId: "PROJ-NC-05",
        title: "Cognitive AI + Full-Stack Application",
        subheading: "Neural Pattern Synthesis and Big-Data Ingestion Layer",
        description: "An artificial intelligence orchestration gateway paired with web layers to deliver streaming context inference pipelines, vectorized lookup steps, and automated resource tuning.",
        stackType: SCHEDULER_STATES.BACKEND_DJANGO,
        technologies: ["React.js", "Microsoft Next.js", "Prisma", "Tailwind CSS", "Django Engine", "PostgreSQL", "MySQL", "UI/UX Architecture"],
        k8sTargetPod: "pod-ai-inference",
        metrics: { scaleFactor: "Vectorized Search", throughput: "Contextual Pipeline", DBReplica: "Sharded Datastore" }
    }
]);

// ============================================================================
// 2. LOW-LEVEL ASYNCHRONOUS INGRESS INJECTOR (projectAPI.js component)
// ============================================================================

const networkIngressFabric = async (endpoint, method = SCHEDULER_STATES.GET, payload = null) => {
    const signalController = new AbortController();
    const threadTimeout = setTimeout(() => signalController.abort(), SYSTEM_CONFIG.TIMEOUT_MS);

    const requestConfig = {
        method,
        headers: {
            "Content-Type": "application/json",
            "X-Telemetry-Ingress-Layer": "L15-Ultragod-Proxy",
            "Authorization": `Bearer ${localStorage.getItem(SYSTEM_CONFIG.STORAGE_TOKEN) || "ANONYMOUS_RUNWAY"}`
        },
        signal: signalController.signal
    };

    if (payload && method !== SCHEDULER_STATES.GET) {
        requestConfig.body = JSON.stringify(payload);
    }

    const networkResponse = await fetch(`${SYSTEM_CONFIG.GATEWAY_URL}${endpoint}`, requestConfig);
    clearTimeout(threadTimeout);

    if (!networkResponse.ok) {
        throw new Error(`Fabric Cluster Disrupted [HTTP ${networkResponse.status}]. Core Link Severed.`);
    }

    const parsedBuffer = await networkResponse.json();
    return parsedBuffer?.data;
};

export const projectAPI = {
    getClusterMatrix: () => networkIngressFabric("/projects/telemetry-stream"),
    askAIAnalysis: (projectNode) => networkIngressFabric("/ai/predict-scale", SCHEDULER_STATES.POST, { project: projectNode })
};

// ============================================================================
// 3. REACTIVE CUSTOM TELEMETRY & HOOK LAYER (useProjects.js component)
// ============================================================================

export function useProjects() {
    const [dataMatrix, setDataMatrix] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState(SCHEDULER_STATES.ALL_NODES);
    const [selectedNodeId, setSelectedNodeId] = useState(null);

    useEffect(() => {
        let threadMounted = true;

        projectAPI.getClusterMatrix()
            .then((resolvedBuffer) => {
                if (threadMounted) {
                    if (!resolvedBuffer || !Array.isArray(resolvedBuffer)) {
                        throw new Error("Invalid telemetry streaming payload from remote clusters.");
                    }
                    setDataMatrix(resolvedBuffer);
                    setLoading(false);
                }
            })
            .catch((fault) => {
                if (threadMounted) {
                    console.error(`%c[CLUSTER ERROR REGISTRY]: ${fault.message}`, "color: #ef4444; font-weight: bold;");
                    setError(fault.message);
                    setDataMatrix([...IMMUTABLE_FALLBACK_MANIFEST]);
                    setLoading(false);
                }
            });

        return () => { threadMounted = false; };
    }, []);

    const filteredNodes = useMemo(() => {
        const strategyConditionsMap = {
            [SCHEDULER_STATES.ALL_NODES]: () => true,
            [SCHEDULER_STATES.BACKEND_DJANGO]: (node) => node.stackType === SCHEDULER_STATES.BACKEND_DJANGO,
            [SCHEDULER_STATES.BACKEND_NODE]: (node) => node.stackType === SCHEDULER_STATES.BACKEND_NODE
        };
        return dataMatrix.filter(strategyConditionsMap[activeFilter] || strategyConditionsMap[SCHEDULER_STATES.ALL_NODES]);
    }, [dataMatrix, activeFilter]);

    const activeInspectedNode = useMemo(() => {
        return dataMatrix.find((node) => node.projectId === selectedNodeId) || null;
    }, [dataMatrix, selectedNodeId]);

    return { filteredNodes, loading, error, activeFilter, setActiveFilter, activeInspectedNode, setSelectedNodeId };
}

// ============================================================================
// 4. DECOUPLED VDOM NODES SUB-COMPONENTS (Filters, Card, Details & AI Portal)
// ============================================================================

/**
 * [ProjectsFilters.jsx Module]
 */
const ProjectsFilters = React.memo(({ activeFilter, onSelectFilter }) => (
    <div className="flex flex-wrap gap-2 font-mono relative z-10">
        {Object.values(CONTROL_POD_REGISTRY).map((filterItem) => (
            <button
                key={filterItem.id}
                onClick={() => onSelectFilter(filterItem.id)}
                className={`px-4 py-1.5 rounded text-xs font-bold transition-all border ${activeFilter === filterItem.id
                        ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                        : "bg-slate-950 text-slate-400 border-slate-900 hover:border-slate-800 hover:text-slate-200"
                    }`}
            >
                {filterItem.display}
            </button>
        ))}
    </div>
));
ProjectsFilters.displayName = "ProjectsFilters";

/**
 * [ProjectsCard.jsx Module]
 */
const ProjectsCard = React.memo(({ node, onInspect, onAskAI }) => {
    const theme = HARDWARE_THEME_MATRIX[node.stackType] || HARDWARE_THEME_MATRIX[SCHEDULER_STATES.BACKEND_NODE];

    return (
        <article className={`relative group backdrop-blur-xl bg-slate-900/40 rounded-xl border ${theme.border} p-6 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.3)]`}>
            <div className={`absolute -inset-px bg-gradient-to-r ${theme.glow} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-sm`} />

            <div className="flex justify-between items-start mb-4 relative z-10">
                <span className="font-mono text-xs text-slate-500 tracking-wider">[{node.projectId}]</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${theme.bg} ${theme.text}`}>
                    {node.stackType.replace("BACKEND_", "")} CORE
                </span>
            </div>

            <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors duration-300 relative z-10">
                {node.title}
            </h3>
            <p className="text-xs font-mono text-slate-400 mt-1 mb-4 relative z-10">{node.subheading}</p>

            <div className="grid grid-cols-3 gap-2 bg-slate-950/80 p-3 rounded border border-slate-900 font-mono text-[11px] mb-4 relative z-10">
                {METRICS_LOOKUP.map((metric) => (
                    <div key={metric.key}>
                        <span className="block text-slate-500 text-[9px] uppercase">{metric.label}</span>
                        <span className="block text-slate-300 font-bold truncate">{node.metrics?.[metric.key] || "N/A"}</span>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center relative z-10 mt-6 gap-2">
                <button
                    onClick={() => onAskAI(node)}
                    className="px-3 py-1 rounded bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 text-[11px] font-mono transition-all font-bold tracking-tight shadow-[0_0_15px_rgba(168,85,247,0.05)]"
                >
                    ⚡ ASK_AI "Ei project scale korte ki lagbe?"
                </button>

                <button
                    onClick={() => onInspect(node.projectId)}
                    className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors whitespace-nowrap"
                >
                    INSPECT &rarr;
                </button>
            </div>
        </article>
    );
});
ProjectsCard.displayName = "ProjectsCard";

/**
 * [ProjectsDetails.jsx Module]
 */
const ProjectsDetails = React.memo(({ node, onClose }) => {
    if (!node) return null;
    const theme = HARDWARE_THEME_MATRIX[node.stackType] || HARDWARE_THEME_MATRIX[SCHEDULER_STATES.BACKEND_NODE];

    return (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <span className="text-xs font-mono text-cyan-400 font-bold tracking-widest block mb-1">//{node.k8sTargetPod.toUpperCase()}</span>
                        <h2 className="text-2xl font-black text-slate-100 tracking-tight">{node.title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="font-mono text-xs border border-slate-800 text-slate-400 hover:text-slate-100 hover:border-slate-700 px-3 py-1.5 rounded transition-all bg-slate-950"
                    >
                        [CLOSE_STREAM]
                    </button>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 bg-slate-950/40 p-4 rounded-xl border border-slate-800/60">{node.description}</p>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">Full Tech Dependency Vector</h4>
                <div className="flex flex-wrap gap-2 mb-8">
                    {node.technologies.map((tech, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-950 text-slate-300 border border-slate-800/80 font-mono text-xs hover:border-cyan-500/30 transition-colors">{tech}</span>
                    ))}
                </div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">Target Cluster Node Specs</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono bg-slate-950 p-4 rounded-xl border border-slate-800/60">
                    {METRICS_LOOKUP.map((metric) => (
                        <div key={metric.key} className="border-b sm:border-b-0 sm:border-r last:border-0 border-slate-800 pb-2 sm:pb-0 last:pb-0 sm:pr-4">
                            <span className="block text-[10px] text-slate-500 uppercase">{metric.label}</span>
                            <span className={`text-sm font-bold block mt-0.5 ${theme.text}`}>{node.metrics?.[metric.key] || "UNALLOCATED"}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});
ProjectsDetails.displayName = "ProjectsDetails";

// ============================================================================
// 5. MASTER PRODUCTION RUNWAY ENTRYPOINT (ProjectsPage.jsx component)
// ============================================================================

export default function ProjectsOperationalFabric() {
    const { filteredNodes, loading, error, activeFilter, setActiveFilter, activeInspectedNode, setSelectedNodeId } = useProjects();
    const [aiAnalysisPayload, setAiAnalysisPayload] = useState(null);
    const [aiLoading, setAiLoading] = useState(false);

    const handleInspectNode = useCallback((id) => setSelectedNodeId(id), [setSelectedNodeId]);
    const handleCloseInspector = useCallback(() => setSelectedNodeId(null), [setSelectedNodeId]);

    // AI Orchestration Stream Interceptor
    const handleTriggerAI = useCallback(async (projectNode) => {
        setAiLoading(true);
        try {
            const response = await projectAPI.askAIAnalysis(projectNode);
            setAiAnalysisPayload({
                title: projectNode.title,
                report: response?.scaleBlueprint || "Ensure global Kafka event bus shards scale synchronously with K8s cluster replicas."
            });
        } catch (err) {
            setAiAnalysisPayload({
                title: projectNode.title,
                report: `[API FAULT]: Unable to synchronize with remote neural pattern models. Fallback Blueprint: Dynamic vertical scaling required on ${projectNode.k8sTargetPod}.`
            });
        } finally {
            setAiLoading(false);
        }
    }, []);

    return (
        <div className="min-h-screen w-full bg-[#030712] text-slate-100 px-4 sm:px-8 py-12 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 antialiased relative overflow-x-hidden">

            {/* Strict Network Disruption Notification Layer */}
            {error && (
                <div className="max-w-7xl mx-auto mb-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 font-mono text-xs text-red-400 shadow-[0_0_25px_rgba(239,68,68,0.05)]">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                    <span>[SYSTEM_FAULT_INGRESS]: {error} (Cascaded safely into local immutable memory allocation).</span>
                </div>
            )}

            {/* Dynamic Telemetry System Header */}
            <header className="max-w-7xl mx-auto mb-16 border-b border-slate-900 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                        <p className="text-xs font-mono tracking-widest text-cyan-400 uppercase">Production Grid Telemetry Matrix</p>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 via-slate-300 to-slate-500 bg-clip-text text-transparent">
                        Distributed Projects Fabric
                    </h1>
                </div>

                <ProjectsFilters activeFilter={activeFilter} onSelectFilter={setActiveFilter} />
            </header>

            {/* Main Grid View Controller */}
            <main className="max-w-7xl mx-auto">
                {loading ? (
                    <div className="text-center py-24 font-mono text-xs text-slate-500 tracking-widest animate-pulse">
                        LOADING_TELEMETRY_STREAM_BUFFERING...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredNodes.map((projectNode) => (
                            <ProjectsCard
                                key={projectNode.projectId}
                                node={projectNode}
                                onInspect={handleInspectNode}
                                onAskAI={handleTriggerAI}
                            />
                        ))}
                    </div>
                )}

                {!loading && filteredNodes.length === 0 && (
                    <div className="text-center py-24 font-mono text-slate-500 text-sm border border-dashed border-slate-900 rounded-2xl">
                        [FATAL]: Zero active cluster workloads matching the configuration state matrix.
                    </div>
                )}
            </main>

            {/* Deep Component Portal Inspection View */}
            <ProjectsDetails node={activeInspectedNode} onClose={handleCloseInspector} />

            {/* AI Terminal Output Modal Overlay */}
            {(aiLoading || aiAnalysisPayload) && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-purple-500/20 w-full max-w-xl rounded-2xl p-6 shadow-2xl font-mono text-xs relative">
                        <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
                            <span className="text-purple-400 font-bold flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
                                INTELLIGENT_INFRASTRUCTURE_PREDICTOR
                            </span>
                            {!aiLoading && (
                                <button
                                    onClick={() => setAiAnalysisPayload(null)}
                                    className="text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    [DISMISS]
                                </button>
                            )}
                        </div>

                        {aiLoading ? (
                            <div className="py-12 text-center text-purple-400/70 animate-pulse tracking-wider">
                                PARSING_SYSTEM_MANIFEST_AND_COMPILING_SCALING_BLUEPRINT...
                            </div>
                        ) : (
                            <div>
                                <p className="text-slate-500 mb-2">TARGET_NODE: <span className="text-slate-300 font-bold">{aiAnalysisPayload?.title}</span></p>
                                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-slate-300 leading-relaxed max-h-[40vh] overflow-y-auto">
                                    {aiAnalysisPayload?.report}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}