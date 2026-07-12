import React, { useState, useMemo, useCallback, useEffect } from "react";

// ============================================================================
// LAYER 1: IMMUTABLE ARCHITECTURAL CONFIGURATIONS & FALLBACK FABRICS
// ============================================================================

const NETWORK_GATEWAY = Object.freeze({
    BASE_URL: process.env.REACT_APP_API_GATEWAY_URL || "https://api.ultra-faang.internal/v1",
    TIMEOUT: 8000,
    METHODS: { GET: "GET", POST: "POST" }
});

const TIMELINE_FILTERS = Object.freeze({
    ALL: "ALL_SYSTEMS",
    FAANG_CORE: "FAANG_CORE",
    DISTRIBUTED_SYSTEMS: "DISTRIBUTED_SYSTEMS",
    KERNEL_ARCHITECTURE: "KERNEL_ARCHITECTURE"
});

const FILTER_REGISTRY_LOOKUP = Object.freeze({
    [TIMELINE_FILTERS.ALL]: "ALL ENGINE NODES",
    [TIMELINE_FILTERS.FAANG_CORE]: "FAANG HYPERSCALE CORE",
    [TIMELINE_FILTERS.DISTRIBUTED_SYSTEMS]: "DISTRIBUTED CLUSTERS",
    [TIMELINE_FILTERS.KERNEL_ARCHITECTURE]: "KERNEL & OS ARCHITECTURE"
});

const STATIC_FALLBACK_EXPERIENCES = Object.freeze([
    {
        id: "EXP-L15-01",
        epoch: "2022 - PRESENT",
        role: "Fellow & Principal System Architect",
        organization: "Google Cloud / Alphabet Core",
        tag: TIMELINE_FILTERS.FAANG_CORE,
        summary: "Spearheaded the design and global deployment of Next-Gen distributed consensus engines, processing multi-exabyte compute fabrics.",
        metrics: [
            { label: "P99.99 Latency Reduction", value: "42%", dynamicImpact: "Saves $40M annually in infrastructure allocation" },
            { label: "Throughput Scalability Ratio", value: "18.5x", dynamicImpact: "Handled 4.2 Billion active tasks simultaneously" }
        ],
        techStack: ["Rust", "Go Core", "Kubernetes Mesh", "eBPF Telemetry", "C++26"],
        achievements: [
            "Architected the low-latency networking subsystem utilized by global Edge locations.",
            "Redesigned distributed sharding topologies to eliminate database lock contentions."
        ]
    },
    {
        id: "EXP-L15-02",
        epoch: "2015 - 2022",
        role: "Distinguished Software Engineer (Kernel Ingress)",
        organization: "Netflix Streaming Infrastructure",
        tag: TIMELINE_FILTERS.DISTRIBUTED_SYSTEMS,
        summary: "Re-engineered global content delivery networks (Open Connect) and optimized Linux kernel socket layers for high-throughput video pipelines.",
        metrics: [
            { label: "Global Bandwidth Efficiency", value: "+34%", dynamicImpact: "Optimized streaming paths across 190 countries" },
            { label: "Kernel Context Switching Drops", value: "-60%", dynamicImpact: "Freed massive thread availability across hardware clusters" }
        ],
        techStack: ["Linux Kernel C", "FreeBSD Network Subsystem", "Assembly x86_64", "Python Core Engines"],
        achievements: [
            "Introduced zero-copy memory routing architectures directly into production hardware arrays.",
            "Authored localized internal memory managers reducing memory thrashing errors to near-zero."
        ]
    }
]);

// ============================================================================
// LAYER 2: INFRASTRUCTURE INGRESS MESH - experienceAPI.js
// ============================================================================

const executeAsyncFetch = async (endpoint, options = {}) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), NETWORK_GATEWAY.TIMEOUT);

    const defaultHeaders = {
        "Content-Type": "application/json",
        "X-Client-Tier": "L15-Principal-Architect-Matrix",
        "Authorization": `Bearer ${process.env.REACT_APP_SECURE_INGRESS_TOKEN || "DEFAULT_FABRIC_TOKEN"}`
    };

    try {
        const response = await fetch(`${NETWORK_GATEWAY.BASE_URL}${endpoint}`, {
            ...options,
            headers: { ...defaultHeaders, ...options.headers },
            signal: controller.signal
        });

        clearTimeout(timeoutId);
        if (!response.ok) throw new Error(`Gateway returned an error status code: [HTTP ${response.status}]`);

        const operationalPayload = await response.json();
        return operationalPayload?.data || [];
    } catch (error) {
        clearTimeout(timeoutId);
        console.error(`%c[NETWORK GATEWAY FAULT INTERCEPT]: ${error.message}`, "color: #ef4444; font-weight: bold; font-family: monospace;");
        // Graceful degrading fallback using Native JavaScript Promises
        return Promise.resolve([...STATIC_FALLBACK_EXPERIENCES]);
    }
};

export const experienceAPI = {
    fetchExperienceMatrix: () => executeAsyncFetch("/portfolio/experiences", { method: NETWORK_GATEWAY.METHODS.GET }),
    triggerRemoteTelemetryFlush: (experienceId) => executeAsyncFetch(`/portfolio/telemetry/${experienceId}`, { method: NETWORK_GATEWAY.METHODS.POST })
};

// ============================================================================
// LAYER 3: CUSTOM STATE REACTION HOOKS - useExperience.js & useExperienceFilter.js
// ============================================================================

export function useExperience() {
    const [experienceState, setExperienceState] = useState({
        dataStream: [],
        loading: true,
        errorSignal: null
    });

    useEffect(() => {
        let activeThread = true;

        experienceAPI.fetchExperienceMatrix()
            .then((payload) => {
                if (activeThread) {
                    setExperienceState({
                        dataStream: payload,
                        loading: false,
                        errorSignal: payload.length === 0 ? "Empty network data packet returned." : null
                    });
                }
            })
            .catch((err) => {
                if (activeThread) {
                    setExperienceState({
                        dataStream: [...STATIC_FALLBACK_EXPERIENCES],
                        loading: false,
                        errorSignal: `Safe structural fallback applied. Reason: ${err.message}`
                    });
                }
            });

        return () => { activeThread = false; };
    }, []);

    return experienceState;
}

export function useExperienceFilter(initialDataStream) {
    const [activeFilterTag, setActiveFilterTag] = useState(TIMELINE_FILTERS.ALL);

    const computedFilteredMatrix = useMemo(() => {
        if (!initialDataStream || !Array.isArray(initialDataStream)) return [];
        if (activeFilterTag === TIMELINE_FILTERS.ALL) {
            return [...initialDataStream].sort((a, b) => b.epoch.localeCompare(a.epoch));
        }
        return initialDataStream.filter(node => node.tag === activeFilterTag);
    }, [initialDataStream, activeFilterTag]);

    return { activeFilterTag, setActiveFilterTag, computedFilteredMatrix };
}

// ============================================================================
// LAYER 4: HIGHER-ORDER VDOM LEAF COMPONENTS (Memoized Pure UI Modules)
// ============================================================================

// --- TechUsed.jsx ---
const TechUsed = React.memo(({ stackData }) => (
    <div className="flex flex-wrap gap-2 mt-5 font-mono">
        {stackData.map((tech, index) => (
            <span
                key={index}
                className="text-[10px] font-bold px-2.5 py-1 rounded bg-cyan-950/40 text-cyan-400 border border-cyan-900/40 hover:border-cyan-500/30 transition-all duration-200 cursor-default"
            >
                {tech}
            </span>
        ))}
    </div>
));
TechUsed.displayName = "TechUsed";

// --- ImpactsMetrics.jsx ---
const ImpactsMetrics = React.memo(({ metricsData }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5 bg-slate-950/60 p-4 rounded-xl border border-slate-900/80">
        {metricsData.map((metric, index) => (
            <div key={index} className="flex flex-col border-l-2 border-cyan-500/40 pl-3">
                <span className="text-2xl font-black tracking-tight font-mono text-slate-100">
                    {metric.value}
                </span>
                <span className="text-[11px] font-mono text-cyan-400 font-semibold tracking-wide uppercase mt-0.5">
                    {metric.label}
                </span>
                <span className="text-xs text-slate-400 mt-1 leading-normal">
                    {metric.dynamicImpact}
                </span>
            </div>
        ))}
    </div>
));
ImpactsMetrics.displayName = "ImpactsMetrics";

// --- AchievementList.jsx ---
const AchievementList = React.memo(({ highlights }) => (
    <div className="mt-5 space-y-2.5 font-sans">
        <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            KEY CORE ACCOMPLISHMENTS
        </h4>
        <ul className="space-y-2 text-sm text-slate-300">
            {highlights.map((bullet, index) => (
                <li key={index} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-cyan-500 font-mono select-none mt-0.5">▸</span>
                    <span>{bullet}</span>
                </li>
            ))}
        </ul>
    </div>
));
AchievementList.displayName = "AchievementList";

// --- RolesDetails.jsx ---
const RolesDetails = React.memo(({ title, org, epoch, overview }) => (
    <div className="space-y-2 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-900/60 pb-3">
            <div>
                <h3 className="text-2xl font-black text-slate-100 tracking-tight hover:text-cyan-400 transition-colors duration-200">
                    {title}
                </h3>
                <p className="text-sm font-mono text-slate-400 mt-0.5 font-medium">{org}</p>
            </div>
            <span className="px-3 py-1 bg-slate-950 text-cyan-400 border border-slate-800 rounded font-mono text-xs font-bold self-start md:self-auto shadow-inner">
                {epoch}
            </span>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed font-sans pt-2">{overview}</p>
    </div>
));
RolesDetails.displayName = "RolesDetails";

// --- ExperienceCard.jsx ---
const ExperienceCard = React.memo(({ dataNode }) => {
    const handleTelemetryClick = useCallback(async () => {
        console.log(`%c[TELEMETRY INITIATED]: Node ID - ${dataNode.id}`, "color: #a855f7; font-weight: bold;");
        await experienceAPI.triggerRemoteTelemetryFlush(dataNode.id);
    }, [dataNode.id]);

    return (
        <div className="relative group bg-slate-900/20 border border-slate-900 hover:border-cyan-500/20 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 shadow-[0_0_30px_rgba(0,0,0,0.2)]">
            {/* Structural Accent lines */}
            <div className="absolute top-0 left-0 w-8 h-[1px] bg-cyan-500/40 group-hover:w-16 transition-all duration-300" />
            <div className="absolute top-0 left-0 w-[1px] h-8 bg-cyan-500/40 group-hover:h-16 transition-all duration-300" />

            <RolesDetails
                title={dataNode.role}
                org={dataNode.organization}
                epoch={dataNode.epoch}
                overview={dataNode.summary}
            />

            <ImpactsMetrics metricsData={dataNode.metrics} />

            <AchievementList highlights={dataNode.achievements} />

            <TechUsed stackData={dataNode.techStack} />

            <div className="mt-6 pt-4 border-t border-slate-950 flex justify-end">
                <button
                    onClick={handleTelemetryClick}
                    className="text-[10px] font-mono tracking-wider px-3 py-1.5 rounded border border-purple-500/20 text-purple-400 bg-purple-500/5 hover:bg-purple-500/10 hover:border-purple-500/40 transition-all cursor-pointer"
                >
                    ⚙ INTERCEPT_SYSTEM_TELEMETRY
                </button>
            </div>
        </div>
    );
});
ExperienceCard.displayName = "ExperienceCard";

// --- ExperienceTimeline.jsx ---
const ExperienceTimeline = React.memo(({ dataset }) => (
    <div className="grid grid-cols-1 gap-8 mt-10">
        {dataset.map((experience) => (
            <ExperienceCard key={experience.id} dataNode={experience} />
        ))}
    </div>
));
ExperienceTimeline.displayName = "ExperienceTimeline";

// ============================================================================
// LAYER 5: DYNAMIC ORCHESTRATION CONTAINER - ExperiencePage.jsx (Main Export)
// ============================================================================

export default function ExperienceDashboard() {
    const { dataStream, loading, errorSignal } = useExperience();
    const { activeFilterTag, setActiveFilterTag, computedFilteredMatrix } = useExperienceFilter(dataStream);

    return (
        <div className="min-h-screen w-full bg-[#020617] text-slate-100 px-6 sm:px-12 py-16 font-sans selection:bg-cyan-500/20 selection:text-cyan-300 antialiased relative overflow-hidden">

            {/* Background Matrix Decors */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a50_1px,transparent_1px),linear-gradient(to_bottom,#0f172a50_1px,transparent_1px)] bg-[size:5rem_5rem]" />
            <div className="absolute top-0 left-1/4 -z-10 h-[500px] w-[800px] rounded-full bg-cyan-500/5 blur-[140px]" />
            <div className="absolute bottom-0 right-1/4 -z-10 h-[500px] w-[800px] rounded-full bg-purple-500/5 blur-[140px]" />

            {/* Network Anomaly Interception Alert */}
            {errorSignal && (
                <div className="max-w-5xl mx-auto mb-8 bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 flex items-center gap-3 font-mono text-xs text-amber-400 relative z-10 shadow-lg">
                    <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                    <span>[PIPELINE TRACE NOTICE]: {errorSignal} Engine mounted static cache profiles safely.</span>
                </div>
            )}

            {/* Header Panel */}
            <header className="max-w-5xl mx-auto mb-16 border-b border-slate-900 pb-10 flex flex-col gap-8 relative z-10">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                        <p className="text-xs font-mono tracking-widest text-cyan-400 uppercase">L15 Principal Level Operations</p>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-100">
                        Engineering Milestones Matrix
                    </h1>
                    <p className="text-sm font-mono text-slate-500 mt-2 max-w-2xl leading-relaxed">
                        A real-time telemetry log detailing 50+ years of cumulative infrastructure scaling, distributed systems architecture, and core system optimizations.
                    </p>
                </div>

                {/* Filter Navigation Control Deck */}
                <div className="flex flex-wrap gap-2.5 font-mono">
                    {Object.keys(FILTER_REGISTRY_LOOKUP).map((key) => (
                        <button
                            key={key}
                            onClick={() => setActiveFilterTag(key)}
                            className={`px-4 py-2 rounded text-xs font-bold transition-all duration-200 border cursor-pointer ${activeFilterTag === key
                                    ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                                    : "bg-slate-950/60 text-slate-500 border-slate-900 hover:border-slate-800 hover:text-slate-300"
                                }`}
                        >
                            {FILTER_REGISTRY_LOOKUP[key]}
                        </button>
                    ))}
                </div>
            </header>

            {/* Main Workspace Frame */}
            <main className="max-w-5xl mx-auto relative z-10">
                {loading ? (
                    <div className="text-center py-40 font-mono text-xs text-slate-500 tracking-widest animate-pulse">
                        CONNECTING_TO_GLOBAL_INGRESS_FABRIC...
                    </div>
                ) : (
                    <>
                        {computedFilteredMatrix.length === 0 ? (
                            <div className="text-center py-24 bg-slate-950/40 rounded-2xl border border-slate-900 font-mono text-xs text-slate-500">
                                NO EXECUTIONS FOUND MATCHING THE ACTIVE NODE FILTER.
                            </div>
                        ) : (
                            <ExperienceTimeline dataset={computedFilteredMatrix} />
                        )}
                    </>
                )}
            </main>
        </div>
    );
}