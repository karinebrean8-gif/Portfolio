import { useState, useEffect, useMemo, useCallback, useRef } from 'react';

// ============================================================================
// 1. HARDENED STATIC REGISTRIES & DICTIONARIES (Clean Architecture Immutable Layer)
// ============================================================================
const TIMELINE_METADATA_SOURCE = [
    {
        timelineId: "stream-alexicorn-2020",
        company: "ALEXICORN",
        role: "Senior Engineer",
        span: "2020 - 2026 (6 Years)",
        status: "CURRENT CORE",
        domainKey: "FS_ENGINES",
        overview: "Led foundational full-stack transformations and bare-metal service meshes. Deployed 5 large principal-level projects across planetary scale infrastructures.",
        shards: [
            { code: "SHARD-01", title: "Omniscience Sharder Engine", detail: "Architected a state-partitioned sharding node handling zero-locking data writes over decentralized multi-cloud infrastructure." },
            { code: "SHARD-02", title: "Quantum Proxy Mesh", detail: "Engineered low-level network topology bypassing traditional TCP overhead via atomic-state serialization layers." },
            { code: "SHARD-03", title: "Titan-IX Memory Recycler", detail: "Authored an automated raw heap garbage interceptor removing garbage collector spikes across critical instances." },
            { code: "SHARD-04", title: "Aether Cryptographic Ledger", detail: "Designed hardware-accelerated state machine layer ensuring cryptographic zero-knowledge proof checks in sub-millisecond timelines." },
            { code: "SHARD-05", title: "Vortex Telemetry Sink", detail: "Engineered binary-stream ingestion parser with dynamic AST mapping, processing raw infrastructure telemetries flawlessly." }
        ],
        proCoderMilestones: [
            "God-Tier Pro Coder Rank: Maintained over 12,000+ flawless enterprise optimization commits.",
            "Recovered 42% lost compute capacity by dropping bloated high-order abstraction configurations."
        ]
    },
    {
        timelineId: "stream-faang-2000",
        company: "THE ULTRA-FAANG CONSORTIUM",
        role: "Distinguished Principal Fellow",
        span: "2000 - 2020 (20 Years)",
        status: "HISTORICAL HARDENED",
        domainKey: "SYS_INFRA",
        overview: "Oversaw global hypervisors, datacenter container automation nodes, and micro-runtime compilation engines used by billions of global client states.",
        shards: [
            { code: "FAANG-S1", title: "Grid Container Infrastructure", detail: "Stripped down bloated host subsystems to implement bare-metal virtualization routines running in microseconds." }
        ],
        proCoderMilestones: [
            "Pioneered early data architecture methodologies managing exabyte scale storage structures seamlessly.",
            "Optimized load balancer distribution equations reducing worldwide regional edge drops to zero."
        ]
    },
    {
        timelineId: "stream-bell-1976",
        company: "FOUNDING LABS (BELL / ARPANET NODES)",
        role: "Core Systems Pioneer Architect",
        span: "1976 - 2000 (24 Years Archive)",
        status: "LEGACY ANCHOR",
        domainKey: "DATA_PER",
        overview: "Contributed foundational blueprints to low-level assembly compilers, initial networking transport layer loops, and raw POSIX memory allocators.",
        shards: null,
        proCoderMilestones: [
            "Co-authored primitive multi-threaded asynchronous polling configurations still used in base kernel rings.",
            "Hand-optimized assembly memory routines to bypass physical registers limitations on early machines."
        ]
    }
];

// ============================================================================
// 2. TECH SPECIFICATION REGISTRY LOOKUP MAP
// ============================================================================
const TECH_INVENTORY_SOURCE = [
    { techId: "tech-01", name: "Custom V8 Isolated Run-times", domainKey: "FS_ENGINES", version: "v9.4-Hardened", deploymentScope: "Titan-IX Memory Recycler" },
    { techId: "tech-02", name: "Rust Network Multiplexers", domainKey: "SYS_INFRA", version: "v1.78 Stable", deploymentScope: "Quantum Proxy Mesh (QPM)" },
    { techId: "tech-03", name: "Distributed Multi-Tenant NoSQL", domainKey: "DATA_PER", version: "Cluster Invariant", deploymentScope: "Omniscience Sharder Engine" },
    { techId: "tech-04", name: "Zero-Knowledge Proof Primitives", domainKey: "CYBER_SEC", version: "ZKP-Crypto v4", deploymentScope: "Aether Cryptographic Ledger" },
    { techId: "tech-05", name: "Binary Ingestion Streams", domainKey: "FS_ENGINES", version: "High-Density Sink", deploymentScope: "Vortex Telemetry Sink" }
];

/**
 * useExperience - Enterprise Reactive Data Hook Engine
 * Provides hyper-clean abstraction over 50+ Years Stream Matrix.
 */
export default function useExperience(initialNodeId = "stream-alexicorn-2020") {
    const [chronoNodes, setChronoNodes] = useState([]);
    const [techStack, setTechStack] = useState([]);
    const [selectedNodeId, setSelectedNodeId] = useState(initialNodeId);
    const [activeDomainFilter, setActiveDomainFilter] = useState("ALL");
    const [isAssembling, setIsAssembling] = useState(true);

    // In-memory telemetry engine to prevent re-triggering updates on state counters
    const hookTelemetryRef = useRef({ navigationTaps: 0, filterTicks: 0, threadHealth: "STABLE" });

    // ============================================================================
    // 3. ASYNCHRONOUS PIPELINE COMPILER (Promise Defer Pattern)
    // ============================================================================
    useEffect(() => {
        let isThreadSecure = true;

        const dispatchLedgerTask = () => {
            return new Promise((resolve, reject) => {
                try {
                    // Simultaneous matrix initialization simulating wire hydration
                    const packedPayload = {
                        nodes: [...TIMELINE_METADATA_SOURCE],
                        tech: [...TECH_INVENTORY_SOURCE]
                    };
                    resolve(packedPayload);
                } catch (error) {
                    reject(new Error("Temporal Data Pipeline Hydration Failure."));
                }
            });
        };

        dispatchLedgerTask()
            .then((synchronizedPayload) => {
                if (isThreadSecure) {
                    setChronoNodes(synchronizedPayload.nodes);
                    setTechStack(synchronizedPayload.tech);
                    setIsAssembling(false);
                }
            })
            .catch((errorLog) => {
                console.error("[CRITICAL TEMPORAL SHARD ANOMALY]", errorLog);
                if (isThreadSecure) setIsAssembling(false);
            });

        return () => { isThreadSecure = false; };
    }, []);

    // ============================================================================
    // 4. MEMOIZED METADATA TARGET INTERROGATOR SELECTORS
    // ============================================================================
    const activeTimelineNode = useMemo(() => {
        return chronoNodes.find(node => node.timelineId === selectedNodeId) || null;
    }, [chronoNodes, selectedNodeId]);

    const filteredTechMatrix = useMemo(() => {
        return activeDomainFilter === "ALL"
            ? techStack
            : techStack.filter(tech => tech.domainKey === activeDomainFilter);
    }, [techStack, activeDomainFilter]);

    // Aggregate matrix metrics computed dynamically for telemetry views
    const computedExperienceMetrics = useMemo(() => {
        const totalProjectsCount = chronoNodes.reduce((acc, current) => {
            return acc + (current.shards ? current.shards.length : 0);
        }, 0);

        return {
            totalYearsLogged: 50,
            alexicornProjectsCount: totalProjectsCount,
            activeNodeStatus: activeTimelineNode?.status || "STANDBY",
            registryLength: chronoNodes.length
        };
    }, [chronoNodes, activeTimelineNode]);

    // ============================================================================
    // 5. CACHED TRANSACTION INTELLIGENT HANDLERS (Callback Handlers)
    // ============================================================================
    const inspectNode = useCallback((targetNodeId) => {
        setSelectedNodeId(targetNodeId);
        hookTelemetryRef.current.navigationTaps += 1;
    }, []);

    const mutateDomainFilter = useCallback((targetFilter) => {
        setActiveDomainFilter(targetFilter);
        hookTelemetryRef.current.filterTicks += 1;
    }, []);

    // ============================================================================
    // 6. ARCHITECTURAL EXPORT INTERFACE MAPPING
    // ============================================================================
    return {
        // Structural Data Streams
        chronoNodes,
        techStack: filteredTechMatrix,
        activeTimelineNode,
        selectedNodeId,
        activeDomainFilter,
        isAssembling,

        // Calculated Analytics Object
        metrics: computedExperienceMetrics,

        // Performance Metrics References
        telemetry: hookTelemetryRef.current,

        // Mutator Dispatch Operations
        inspectNode,
        mutateDomainFilter
    };
}