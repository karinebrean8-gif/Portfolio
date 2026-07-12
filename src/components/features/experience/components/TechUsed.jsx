import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';

// ============================================================================
// 1. IMMUTABLE ARCHITECTURAL DICTIONARIES & THEME ROUTERS
// ============================================================================
const CORE_DOMAINS = {
    FULLSTACK_ENGINES: { id: "FS_ENGINES", title: "Distributed Runtimes & Fullstack" },
    SYSTEMS_INFRA: { id: "SYS_INFRA", title: "Systems & Bare-Metal Infra" },
    DATA_PERSISTENCE: { id: "DATA_PER", title: "Planetary Storage & Sharding" },
    CYBER_SECURITY: { id: "CYBER_SEC", title: "Zero-Knowledge & Encryption" }
};

const TECH_THEME_ROUTER = {
    FS_ENGINES: "border-purple-500/30 bg-purple-950/10 text-purple-400 border-purple-800",
    SYS_INFRA: "border-emerald-500/30 bg-emerald-950/10 text-emerald-400 border-emerald-800",
    DATA_PER: "border-cyan-500/30 bg-cyan-950/10 text-cyan-400 border-cyan-800",
    CYBER_SEC: "border-rose-500/30 bg-rose-950/10 text-rose-400 border-rose-800"
};

const TECH_INVENTORY_REGISTRY = [
    {
        techId: "tech-node-01",
        name: "Custom V8 Isolated Run-times",
        domainKey: CORE_DOMAINS.FULLSTACK_ENGINES.id,
        version: "v9.4-Hardened",
        utilizationEpoch: "ALEXICORN (Senior Engineer, 6 Years Matrix)",
        deploymentScope: "Titan-IX Memory Recycler",
        technicalSpecs: [
            "Intercepted garbage collection loops via raw C++ memory injection abstractions.",
            "Optimized fullstack Node.js thread pools to leverage non-blocking async loops without stack overflow locks."
        ]
    },
    {
        techId: "tech-node-02",
        name: "Rust-Based Network Multiplexers",
        domainKey: CORE_DOMAINS.SYS_INFRA.id,
        version: "v1.78 Stable-Core",
        utilizationEpoch: "ALEXICORN & ULTRA-FAANG Systems",
        deploymentScope: "Quantum Proxy Mesh (QPM)",
        technicalSpecs: [
            "Bypassed standard operating system TCP stack bottlenecks using lower-level AST memory parsing.",
            "Achieved sub-millisecond network hops handling 450 Terabits/sec peak loads without packet drops."
        ]
    },
    {
        techId: "tech-node-03",
        name: "Distributed Multi-Tenant NoSQL Nodes",
        domainKey: CORE_DOMAINS.DATA_PERSISTENCE.id,
        version: "Enterprise Invariant Cluster",
        utilizationEpoch: "ALEXICORN (Level 5 Core Projects Stack)",
        deploymentScope: "Omniscience Sharder Engine",
        technicalSpecs: [
            "Authored custom state partitioning sharding logic that handles 1.8B mutative operations per minute.",
            "Maintained zero-locking absolute horizontal persistence mapping over decentralized global data fields."
        ]
    },
    {
        techId: "tech-node-04",
        name: "Zero-Knowledge Proof Primitives",
        domainKey: CORE_DOMAINS.CYBER_SECURITY.id,
        version: "ZKP-Crypto Spec v4",
        utilizationEpoch: "ALEXICORN Pro Coder Epoch",
        deploymentScope: "Aether Cryptographic Ledger",
        technicalSpecs: [
            "Secured massive cross-border multi-tenant payload pipelines without incurring high database read costs.",
            "Executed asynchronous validation sequences inside hyper-isolated RAM cache arrays."
        ]
    },
    {
        techId: "tech-node-05",
        name: "Binary Ingestion Streams & WebWorkers",
        domainKey: CORE_DOMAINS.FULLSTACK_ENGINES.id,
        version: "High-Density Data Sink",
        utilizationEpoch: "ALEXICORN Systems Cluster",
        deploymentScope: "Vortex Telemetry Sink",
        technicalSpecs: [
            "Piped 24 Billion real-time server operational telemetry entries per minute down to fullstack UI logs.",
            "Utilized multi-threaded worker pooling architectures to parse, filter, and stream clean structural models."
        ]
    },
    {
        techId: "tech-node-06",
        name: "Bare-Metal Virtualization Hypervisors",
        domainKey: CORE_DOMAINS.SYS_INFRA.id,
        version: "Kernel Level v2",
        utilizationEpoch: "ULTRA-FAANG Consortium (24 Years Fellow Archive)",
        deploymentScope: "OmniContainer Fleet Infrastructure",
        technicalSpecs: [
            "Stripped native OS layers to execute application container instances directly on memory arrays.",
            "Managed 45 Million global computing nodes with 99.9999% production hardware resource utilization."
        ]
    }
];

export default function TechUsed() {
    const [techStack, setTechStack] = useState([]);
    const [activeDomainFilter, setActiveDomainFilter] = useState("ALL");
    const [focusedTechId, setFocusedTechId] = useState("tech-node-01");
    const [isCompiling, setIsCompiling] = useState(true);

    const clusterTelemetryRef = useRef({ telemetryTicks: 0, stackStatus: "NOMINAL" });

    // ============================================================================
    // 2. ASYNCHRONOUS POOL COMPILATION PIPELINE (Promise Engine)
    // ============================================================================
    useEffect(() => {
        let isThreadSecure = true;

        new Promise((resolve, reject) => {
            setTimeout(() => {
                TECH_INVENTORY_REGISTRY.length > 0
                    ? resolve([...TECH_INVENTORY_REGISTRY])
                    : reject(new Error("Tech Registry Stream Unresolved."));
            }, 200);
        })
            .then((resolvedPayload) => {
                if (isThreadSecure) {
                    setTechStack(resolvedPayload);
                    setIsCompiling(false);
                }
            })
            .catch((errorLog) => {
                console.error("[CRITICAL STACK ANOMALY]", errorLog);
                if (isThreadSecure) setIsCompiling(false);
            });

        return () => { isThreadSecure = false; };
    }, []);

    // ============================================================================
    // 3. MEMOIZED FILTERING MATRIX & SELECTION HANDLERS
    // ============================================================================
    const filteredTechMatrix = useMemo(() => {
        return activeDomainFilter === "ALL"
            ? techStack
            : techStack.filter(tech => tech.domainKey === activeDomainFilter);
    }, [techStack, activeDomainFilter]);

    const activeTechDetails = useMemo(() => {
        return techStack.find(tech => tech.techId === focusedTechId) || null;
    }, [techStack, focusedTechId]);

    const triggerDomainChange = useCallback((targetFilter) => {
        setActiveDomainFilter(targetFilter);
        clusterTelemetryRef.current.telemetryTicks += 1;

        const subPool = techStack.filter(t => targetFilter === "ALL" || t.domainKey === targetFilter);
        if (subPool.length > 0) {
            setFocusedTechId(subPool[0].techId);
        }
    }, [techStack]);

    // ============================================================================
    // 4. SUB-RENDER PATTERNS (Isolates Complex Nodes From Main Layout Tree)
    // ============================================================================
    const renderFilterNavigation = useMemo(() => {
        return (
            <div className="flex gap-1 overflow-x-auto pb-3 mb-5 border-b border-slate-900/40 scrollbar-none">
                <button
                    onClick={() => triggerDomainChange("ALL")}
                    className={`px-3 py-1 text-[10px] font-mono font-black border rounded-md transition-all focus:outline-none whitespace-nowrap ${activeDomainFilter === "ALL"
                            ? "bg-cyan-950/40 border-cyan-500 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.15)]"
                            : "bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-300"
                        }`}
                >
                    [// ALL_DOMAINS]
                </button>
                {Object.values(CORE_DOMAINS).map((domain) => (
                    <button
                        key={domain.id}
                        onClick={() => triggerDomainChange(domain.id)}
                        className={`px-3 py-1 text-[10px] font-mono font-black border rounded-md transition-all focus:outline-none whitespace-nowrap ${activeDomainFilter === domain.id
                                ? "bg-cyan-950/40 border-cyan-500 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.15)]"
                                : "bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-300"
                            }`}
                    >
                        {domain.title}
                    </button>
                ))}
            </div>
        );
    }, [activeDomainFilter, triggerDomainChange]);

    const renderLeftLookupPipeline = useMemo(() => {
        return (
            <div className="lg:col-span-5 space-y-2">
                <span className="text-[9px] font-mono font-bold text-slate-600 block px-1 uppercase">// ACTIVE DOMAIN LOOKUP PIPELINE</span>
                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1 scrollbar-none">
                    {filteredTechMatrix.map((tech) => {
                        const isSelected = focusedTechId === tech.techId;
                        const badgeStyle = TECH_THEME_ROUTER[tech.domainKey] || TECH_THEME_ROUTER.FS_ENGINES;

                        return (
                            <div
                                key={tech.techId}
                                onClick={() => setFocusedTechId(tech.techId)}
                                className={`w-full text-left p-3.5 rounded-xl border font-mono transition-all duration-150 cursor-pointer flex flex-col gap-1 ${isSelected ? "bg-slate-900/40 border-cyan-500/40 shadow-lg" : "bg-slate-950 border-slate-900 hover:border-slate-800"
                                    }`}
                            >
                                <div className="flex justify-between items-center w-full gap-2">
                                    <span className={`text-[11px] font-black truncate ${isSelected ? "text-cyan-400" : "text-slate-200"}`}>
                                        {tech.name}
                                    </span>
                                    <span className={`px-1.5 py-0.5 text-[7px] border rounded font-black uppercase shrink-0 ${badgeStyle}`}>
                                        {tech.version}
                                    </span>
                                </div>
                                <span className="text-[9px] text-slate-500 font-semibold truncate">@ {tech.deploymentScope}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }, [filteredTechMatrix, focusedTechId]);

    const renderRightSpecsViewport = useMemo(() => {
        if (!activeTechDetails) {
            return (
                <div className="text-center py-12 font-mono text-xs text-slate-600">[!] Core Registry Pointer Failure.</div>
            );
        }

        return (
            <div className="space-y-4 bg-slate-950 border border-slate-900 p-5 rounded-2xl animate-[fadeIn_0.15s_ease-out]">
                <div className="border-b border-slate-900/60 pb-3 space-y-1">
                    <span className="text-[9px] font-mono text-cyan-500 font-bold tracking-tight block uppercase">// METADATA ARTIFACT SPECIFICATIONS</span>
                    <h3 className="text-base sm:text-lg font-black font-mono text-slate-100">{activeTechDetails.name}</h3>
                    <div className="text-xs font-semibold text-slate-400 font-mono">
                        Runtime Span: <span className="text-slate-300 font-bold">{activeTechDetails.utilizationEpoch}</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <span className="text-[9px] font-mono font-bold text-slate-600 block uppercase">// PRODUCTION SCALE LOGISTIC PROFILE</span>
                    <div className="space-y-2">
                        {activeTechDetails.technicalSpecs.map((spec, idx) => (
                            <div key={idx} className="text-xs text-slate-400 font-mono flex gap-2.5 items-start p-3 bg-slate-900/10 border border-slate-900/40 rounded-xl">
                                <span className="text-cyan-500">⚙️</span>
                                <span className="leading-relaxed flex-1">{spec}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-3 bg-slate-900/30 border border-slate-900 rounded-xl font-mono text-[9px] text-slate-500 flex justify-between items-center">
                    <span>SYSTEM_ANCHOR: {activeTechDetails.techId.toUpperCase()}</span>
                    <span className="text-emerald-400 font-bold">// VERIFIED_STEADY_STATE</span>
                </div>
            </div>
        );
    }, [activeTechDetails]);

    // ============================================================================
    // 5. MAXIMUM PERFORMANCE TERMINAL LAYOUT
    // ============================================================================
    if (isCompiling) {
        return (
            <div className="w-full min-h-[400px] bg-slate-950 flex flex-col items-center justify-center font-mono text-xs text-slate-600 border border-slate-900 rounded-3xl p-6">
                <div className="w-5 h-5 border border-t-cyan-500 border-r-transparent border-slate-800 rounded-full animate-spin mb-3" />
                <div>// Fetching Core Production Stack Mapping Sequences...</div>
            </div>
        );
    }

    return (
        <div className="w-full bg-slate-950 text-slate-100 border border-slate-900 rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 font-sans shadow-2xl selection:bg-cyan-500/20 max-w-7xl mx-auto">

            {/* HEADER CONTROL TERMINAL */}
            <div className="border-b border-slate-900 pb-5 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <span className="text-[10px] font-mono text-cyan-500 tracking-wider block uppercase">// REPOSITORIES & RUNTIMES SPECIFICATION</span>
                    <h2 className="text-xl sm:text-2xl font-black font-mono tracking-tighter uppercase mt-0.5 bg-gradient-to-r from-slate-100 to-slate-500 bg-clip-text text-transparent">
                        PRODUCTION_STACK_REGISTRY
                    </h2>
                </div>
                <div className="flex gap-4 font-mono text-[9px] text-slate-500 bg-slate-900/50 px-3 py-1.5 border border-slate-900 rounded-xl">
                    <span>FILTERS: <span className="text-cyan-400 font-bold">{clusterTelemetryRef.current.telemetryTicks}</span></span>
                    <span>HEALTH: <span className="text-emerald-400 font-bold">{clusterTelemetryRef.current.stackStatus}</span></span>
                </div>
            </div>

            {renderFilterNavigation}

            {/* GRAPH COUPLING LAYOUT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {renderLeftLookupPipeline}
                <main className="lg:col-span-7">
                    {renderRightSpecsViewport}
                </main>
            </div>

        </div>
    );
}