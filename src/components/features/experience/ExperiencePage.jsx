import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { experienceTelemetry } from "./telemetryEngine";
import DATA_STORE from "./experienceData.json";

// ============================================================================
// 1. IMMUTABLE CONSTANTS & REGISTRY ROUTERS (Zero Hardcoded Logic Layers)
// ============================================================================
const CORE_CONFIG = {
    DEFAULT_NODE_ID: "stream-alexicorn-2020",
    SCROLL_DELTA_THRESHOLD: 5,
    INTERSECTION_THRESHOLD: 0.5,
    DEBOUNCE_DELAY_MS: 150
};

const FILTER_MODES = {
    ALL: "ALL_NODES",
    P5_SHARDS: "PRINCIPAL_PROJECTS",
    PRO_MILESTONES: "PRO_CODER_METRICS"
};

const THEME_REGISTRY = {
    FS_ENGINES: { border: "border-cyan-900/60", text: "text-cyan-400", bg: "bg-cyan-950/20", glow: "bg-cyan-500 shadow-cyan-500/50" },
    SYS_INFRA: { border: "border-purple-900/60", text: "text-purple-400", bg: "bg-purple-950/20", glow: "bg-purple-500 shadow-purple-500/50" },
    DATA_PER: { border: "border-emerald-900/60", text: "text-emerald-400", bg: "bg-emerald-950/20", glow: "bg-emerald-500 shadow-emerald-500/50" },
    DEFAULT: { border: "border-slate-800", text: "text-slate-400", bg: "bg-slate-900/20", glow: "bg-slate-500 shadow-slate-500/50" }
};

const METRIC_METADATA_MAP = [
    { key: "totalYearsLogged", label: "TEMPORAL EXPERIENCE", suffix: "+ Years Invariant", style: "text-cyan-400" },
    { key: "alexicornProjectsCount", label: "ALEXICORN SHARDS", suffix: " Core P5 Projects", style: "text-purple-400" },
    { key: "runtimeHealth", label: "ENGINE THREADS", suffix: " SYSTEM_OK", style: "text-emerald-400" }
];

// ============================================================================
// 2. ISOLATED PURE MULTI-VECTOR SUBVIEWS (Optimized to Map and Matrices)
// ============================================================================

const ImpactsMetrics = React.memo(({ metrics, telemetry }) => {
    if (!metrics) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono w-full">
            {METRIC_METADATA_MAP.map((meta) => (
                <div key={meta.key} className="bg-slate-900/30 border border-slate-900/80 p-4 rounded-2xl backdrop-blur-sm transition-all hover:border-slate-800">
                    <span className="text-[9px] text-slate-500 block font-bold tracking-wider">// {meta.label}</span>
                    <span className={`text-base font-black tracking-tight mt-1 block ${meta.style}`}>
                        {meta.key === "runtimeHealth" ? (telemetry?.threadHealth || metrics[meta.key]) : metrics[meta.key]}
                        {meta.suffix}
                    </span>
                </div>
            ))}
        </div>
    );
});

const RolesDetails = React.memo(({ projects }) => {
    if (!projects?.length) return null;

    return (
        <div className="space-y-3 w-full font-mono">
            <span className="text-[9px] font-bold text-slate-600 block uppercase tracking-widest">// PRODUCTION PRINCIPAL LEVEL SHARDS</span>
            <div className="grid grid-cols-1 gap-3">
                {projects.map((project) => (
                    <div key={project.code} className="p-4 bg-slate-900/10 border border-slate-900/60 rounded-xl transition-all hover:bg-slate-900/20">
                        <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 text-[8px] bg-purple-950/40 border border-purple-800/60 text-purple-400 font-black rounded-md uppercase tracking-wider">
                                {project.code}
                            </span>
                            <h4 className="text-xs font-black text-slate-200 tracking-tight">{project.name}</h4>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                            <span className="text-cyan-500 mr-1.5 select-none">▶</span> {project.impact}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
});

const AchievementList = React.memo(({ milestones }) => {
    if (!milestones?.length) return null;

    return (
        <div className="space-y-2 w-full font-mono">
            <span className="text-[9px] font-bold text-slate-600 block uppercase tracking-widest">// PRO CODER SYSTEM MILESTONES</span>
            <div className="space-y-2">
                {milestones.map((milestone, index) => (
                    <div key={index} className="text-xs text-slate-400 bg-slate-900/20 border border-slate-900/40 p-3 rounded-xl flex gap-3 items-start group transition-all hover:border-slate-800">
                        <span className="text-emerald-500 select-none transition-transform group-hover:rotate-45 duration-300">⚙️</span>
                        <span className="leading-relaxed flex-1">{milestone}</span>
                    </div>
                ))}
            </div>
        </div>
    );
});

const TechUsed = React.memo(({ inventory }) => {
    const [activeFilter, setActiveFilter] = useState("ALL");

    const filterDomains = useMemo(() => ["ALL", "FS_ENGINES", "SYS_INFRA", "DATA_PER"], []);

    const filteredInventory = useMemo(() => {
        return activeFilter === "ALL"
            ? inventory
            : inventory.filter((item) => item.domainKey === activeFilter);
    }, [inventory, activeFilter]);

    if (!inventory?.length) return null;

    return (
        <div className="bg-slate-950 border border-slate-900 rounded-3xl p-5 font-mono space-y-4 shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-900 pb-3">
                <span className="text-[10px] text-cyan-500 font-black tracking-wider">// TECH_INVENTORY_REGISTRY</span>
                <div className="flex flex-wrap gap-1 text-[8px]">
                    {filterDomains.map((domain) => (
                        <button
                            key={domain}
                            onClick={() => setActiveFilter(domain)}
                            className={`px-2 py-0.5 border rounded uppercase transition-all font-bold ${activeFilter === domain ? "border-cyan-500 text-cyan-400 bg-cyan-950/30" : "border-slate-900 text-slate-500 hover:text-slate-300"}`}
                        >
                            {domain}
                        </button>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-900">
                {filteredInventory.map((tech) => (
                    <div key={tech.techId} className="p-2.5 bg-slate-900/20 border border-slate-900 rounded-xl flex justify-between items-center gap-3 transition-all hover:border-slate-800">
                        <div className="truncate flex-1">
                            <h5 className="text-[11px] font-black text-slate-200 truncate">{tech.name}</h5>
                            <span className="text-[8px] text-slate-500 block truncate font-medium mt-0.5">@ {tech.deploymentScope}</span>
                        </div>
                        <span className="px-1.5 py-0.5 text-[7px] border border-slate-800 bg-slate-950 text-slate-400 rounded-md shrink-0 uppercase font-black tracking-wide">
                            {tech.version}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
});

const ExperienceTimeline = React.memo(({ nodes, selectedId, onSelect, epochRefs }) => {
    if (!nodes?.length) return null;

    return (
        <div className="space-y-2 font-mono w-full">
            <span className="text-[9px] font-bold text-slate-600 block px-1 uppercase tracking-widest">// TIMELINE INDEX STREAM</span>
            <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-900">
                {nodes.map((node) => {
                    const isActive = node.id === selectedId;
                    const currentTheme = THEME_REGISTRY[node.domainKey] || THEME_REGISTRY.DEFAULT;

                    return (
                        <button
                            key={node.id}
                            id={node.id}
                            ref={(el) => { if (epochRefs) epochRefs.current[node.id] = el; }}
                            onClick={() => onSelect(node.id)}
                            className={`w-full text-left p-4 rounded-xl border relative transition-all flex flex-col gap-1.5 focus:outline-none ${isActive ? "bg-slate-900/40 border-cyan-500/40 shadow-2xl shadow-cyan-950/10" : "bg-slate-950 border-slate-900 hover:border-slate-800/80"}`}
                        >
                            {/* FIXED CLASSNAME INJECTION ROUTE */}
                            <div className={`absolute left-0 top-1/2 -translate-y-1/2 rounded-r transition-all ${isActive ? `${currentTheme.glow} w-0.5 h-1/2` : "hidden"}`} />

                            <div className="flex justify-between items-center w-full gap-3">
                                <span className={`text-[11px] font-black truncate tracking-tight uppercase ${isActive ? "text-cyan-400" : "text-slate-200"}`}>
                                    {node.company}
                                </span>
                                <span className="text-[8px] text-slate-500 font-extrabold shrink-0 tracking-wide bg-slate-900/50 px-1.5 py-0.5 rounded border border-slate-900">
                                    {node.duration}
                                </span>
                            </div>
                            <div className="flex justify-between items-center w-full text-[10px]">
                                <span className="text-slate-400 font-semibold truncate">{node.role}</span>
                                <span className={`text-[7px] font-black tracking-wider shrink-0 uppercase px-1.5 py-0.2 rounded border ${currentTheme.border} ${currentTheme.bg} ${currentTheme.text}`}>
                                    {node.status}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
});

// ============================================================================
// 3. MAIN CORE ROOT INTERACTIVE CONTROLLER + ADVANCED PROMISE TELEMETRY
// ============================================================================
export default function ExperiencePage() {
    const [selectedNodeId, setSelectedNodeId] = useState(CORE_CONFIG.DEFAULT_NODE_ID);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    const [filterMode, setFilterMode] = useState(FILTER_MODES.ALL);

    const telemetryRef = useRef({ navigationTicks: 0, threadHealth: "STABLE_INLINE" });
    const lastTrackedScrollDepth = useRef(0);
    const epochRefs = useRef({});

    // 0. SEARCH DEBOUNCE ENGINE
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, CORE_CONFIG.DEBOUNCE_DELAY_MS);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // 1. HIGH-DENSITY SCROLL TRACKER ENGINE (Promises Dynamic Stream Router)
    useEffect(() => {
        const processScrollTelemetry = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight <= 0) return;

            const currentScrollPercentage = Math.round((window.scrollY / scrollHeight) * 100);

            Promise.resolve(currentScrollPercentage)
                .then((percentage) => {
                    const delta = Math.abs(percentage - lastTrackedScrollDepth.current);
                    if (delta >= CORE_CONFIG.SCROLL_DELTA_THRESHOLD) {
                        lastTrackedScrollDepth.current = percentage;
                        experienceTelemetry.trackTimelineScrollDepth(percentage.toFixed(0));
                    }
                });
        };

        window.addEventListener('scroll', processScrollTelemetry, { passive: true });
        return () => window.removeEventListener('scroll', processScrollTelemetry);
    }, []);

    // 2. KERNEL EVAPORATION SIGNAL BOUNDARY (Tab Eviction Node Flush)
    useEffect(() => {
        const executeEvictionEvacuator = () => {
            Promise.resolve()
                .then(() => experienceTelemetry.forceEcosystemFlush())
                .catch(() => console.warn("// Telemetry kernel critical eviction failure."));
        };

        window.addEventListener('beforeunload', executeEvictionEvacuator);
        return () => window.removeEventListener('beforeunload', executeEvictionEvacuator);
    }, []);

    // 3. VIEWPORT INTELLIGENT DEEP ENTRY INSPECTOR (Intersection Observer Platform)
    useEffect(() => {
        if (!DATA_STORE.timeline?.length) return;

        const observerConfig = { threshold: CORE_CONFIG.INTERSECTION_THRESHOLD };

        const observerStream = new IntersectionObserver((entries) => {
            entries.map((entry) => {
                if (entry.isIntersecting) {
                    Promise.resolve(entry.target.id)
                        .then((targetId) => experienceTelemetry.trackEpochViewportEntry(targetId));
                }
                return null;
            });
        }, observerConfig);

        const activeRegistryRefs = epochRefs.current;
        Object.values(activeRegistryRefs).map((ref) => {
            if (ref) observerStream.observe(ref);
            return null;
        });

        return () => {
            Object.values(activeRegistryRefs).map((ref) => {
                if (ref) observerStream.unobserve(ref);
                return null;
            });
            observerStream.disconnect();
        };
    }, []);

    // 4. ARCHITECTURAL SEARCH & INTERSECT TRANSFORM MATRIX (Complex Filter Arrays)
    const filteredTimeline = useMemo(() => {
        let dataset = [...DATA_STORE.timeline];

        const filterStrategies = {
            [FILTER_MODES.P5_SHARDS]: () => dataset.filter((node) => node.projects?.length),
            [FILTER_MODES.PRO_MILESTONES]: () => dataset.filter((node) => node.milestones?.length),
            [FILTER_MODES.ALL]: () => dataset
        };

        dataset = (filterStrategies[filterMode] || filterStrategies[FILTER_MODES.ALL])();

        // Utilizing debouncedQuery here instead of active raw searchQuery
        const normalQuery = debouncedQuery.trim().toLowerCase();
        if (normalQuery.length < 2) return dataset;

        return dataset.filter((node) => {
            const matchRoot = node.company.toLowerCase().includes(normalQuery) ||
                node.role.toLowerCase().includes(normalQuery) ||
                node.overview.toLowerCase().includes(normalQuery);

            const matchProjects = node.projects?.some((proj) =>
                proj.name.toLowerCase().includes(normalQuery) || proj.impact.toLowerCase().includes(normalQuery)
            );

            const matchMilestones = node.milestones?.some((milestone) =>
                milestone.toLowerCase().includes(normalQuery)
            );

            return matchRoot || matchProjects || matchMilestones;
        });
    }, [filterMode, debouncedQuery]);

    const activeNode = useMemo(() => {
        return DATA_STORE.timeline.find((node) => node.id === selectedNodeId) || null;
    }, [selectedNodeId]);

    // 5. MEMORY-SAFE MEMOIZED ACTION HANDLER ROUTINE
    const handleNodeSwitch = useCallback((id) => {
        Promise.resolve(DATA_STORE.timeline.find((n) => n.id === id))
            .then((matchedNode) => {
                setSelectedNodeId(id);
                telemetryRef.current.navigationTicks += 1;
                if (matchedNode) {
                    experienceTelemetry.trackNodeInterrogated(matchedNode.company, id);
                }
            });
    }, []);

    return (
        <div className="w-full min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 space-y-6 max-w-7xl mx-auto selection:bg-cyan-500/20 antialiased">

            {/* HIGH-LEVEL TERMINAL DASHBOARD HEADER */}
            <header className="border border-slate-900/80 bg-slate-950/60 backdrop-blur-md p-6 rounded-3xl space-y-4 font-mono shadow-xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                        <span className="text-[10px] font-black text-cyan-500 tracking-widest block uppercase">// CLEAN INTEGRATED TELEMETRY ENGINE</span>
                        <h1 className="text-xl sm:text-2xl font-black tracking-tighter uppercase text-slate-100">L5_EXPERIENCE_CONTROL_DESK</h1>
                    </div>
                    <div className="relative w-full md:w-64 group">
                        {/* Input binds to reactive raw searchQuery for instant typing visual response */}
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="[// Search Core Shards...]"
                            className="w-full bg-slate-900/40 border border-slate-900 text-xs px-3.5 py-2.5 rounded-xl text-slate-300 focus:outline-none focus:border-cyan-500/50 transition-all placeholder-slate-600 font-mono"
                        />
                    </div>
                </div>
                <div className="flex gap-1.5 overflow-x-auto pb-1 text-[9px] scrollbar-none">
                    {Object.entries(FILTER_MODES).map(([key, val]) => (
                        <button
                            key={key}
                            onClick={() => setFilterMode(val)}
                            className={`px-3 py-1.5 border rounded-lg uppercase tracking-wider font-extrabold transition-all focus:outline-none ${filterMode === val ? "bg-cyan-950/40 border-cyan-500 text-cyan-400 shadow-md shadow-cyan-950/20" : "bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-300"}`}
                        >
                            {key.replace("P5_", "").replace("PRO_", "")}
                        </button>
                    ))}
                </div>
            </header>

            {/* CORE RUNTIME GLOBAL STATS OVERVIEW PANEL */}
            <ImpactsMetrics metrics={DATA_STORE.globalMetrics} telemetry={telemetryRef.current} />

            {/* TWO-COLUMN MATRIX ECOSYSTEM CONTROL BOARD */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-4 space-y-6">
                    <ExperienceTimeline nodes={filteredTimeline} selectedId={selectedNodeId} onSelect={handleNodeSwitch} epochRefs={epochRefs} />
                    <TechUsed inventory={DATA_STORE.techInventory} />
                </div>

                <main className="lg:col-span-8 h-full">
                    {activeNode ? (
                        <div className="space-y-6 bg-slate-950 border border-slate-900/80 p-6 rounded-3xl shadow-2xl backdrop-blur-sm transition-all animate-[fadeIn_0.15s_ease-out]">
                            <div className="border-b border-slate-900/80 pb-4 font-mono space-y-2">
                                <span className="text-[9px] text-cyan-500 font-black uppercase tracking-widest block">// CONTEXT COMPACT CORE CELL</span>
                                <h3 className="text-base sm:text-lg font-black text-slate-100 tracking-tight uppercase">{activeNode.role} @ {activeNode.company}</h3>
                                <div className="text-[10px] text-slate-500 font-bold bg-slate-900/30 px-2.5 py-1 rounded-md border border-slate-900 inline-block">
                                    Deployment Scope Layer: <span className="text-slate-300">{activeNode.scope}</span>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed pt-2 italic font-sans border-t border-slate-900/40 mt-2">
                                    "{activeNode.overview}"
                                </p>
                            </div>
                            <RolesDetails projects={activeNode.projects} />
                            <AchievementList milestones={activeNode.milestones} />
                        </div>
                    ) : (
                        <div className="border border-dashed border-slate-900 rounded-3xl p-12 text-center font-mono text-[11px] text-slate-600 bg-slate-900/5">
                            [!] Access granular cluster streams to instantiate active data-node inspect matrices.
                        </div>
                    )}
                </main>
            </div>

        </div>
    );
}