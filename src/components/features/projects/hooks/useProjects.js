import { useState, useEffect, useMemo, useCallback } from 'react';

// ============================================================================
// 1. ARCHITECTURAL LAYER: IMMUTABLE REGISTRIES & CORE SCHEMAS
// ============================================================================

const TELEMETRY_STATUS = {
    STABLE: 'STABLE_OPERATIONAL',
    DEGRADED: 'DEGRADED_PERFORMANCE',
    CRITICAL: 'CRITICAL_LEAK_WARNING'
};

const ENTERPRISE_PROJECTS_REGISTRY = [
    {
        projectId: "PROJECT-X-75",
        title: "Project Alpha: Autonomous Anycast Routing Grid",
        systemClassification: "Hyper-Scale Infrastructure",
        telemetry: TELEMETRY_STATUS.STABLE,
        operationalBudgetMetrics: "Allocated: $42M | Saturated: 12%",
        coreAxiom: "Architected a decentralized packet routing array using BGP optimization loops, preventing multi-region network cascading outages during high-load traffic floods.",
        technologies: ["Rust", "eBPF/XDP", "C++", "WebAssembly Core"],
        architecturalInvariants: [
            "Zero allocations inside the primary packet ingestion stream path.",
            "Hardware-level isolation utilizing customized hypervisors.",
            "Sub-millisecond route calculation guarantees via lock-free state ring buffers."
        ]
    },
    {
        projectId: "PROJECT-Y-99",
        title: "Project Omega: Distributed Atomic Transactional Ledger",
        systemClassification: "Decentralized Settlement Engine",
        telemetry: TELEMETRY_STATUS.CRITICAL,
        operationalBudgetMetrics: "Allocated: $118M | Saturated: 89%",
        coreAxiom: "Engineered a low-latency conflict-free replicated data type (CRDT) memory pipeline spanning 6 planetary regions with deterministic convergence guarantees.",
        technologies: ["Go", "Kafka Enterprise", "RocksDB Backend", "gRPC Mesh"],
        architecturalInvariants: [
            "Byzantine fault-tolerant safety metrics verified through formal TLA+ proofs.",
            "Append-only log storage processing 50M+ mutations every clock window.",
            "Rubidium atomic clock sync drift mitigations operating at edge nodes."
        ]
    },
    {
        projectId: "PROJECT-Z-04",
        title: "Project Matrix: Reactive Telemetry Stream Blitter",
        systemClassification: "Observability Control Desk",
        telemetry: TELEMETRY_STATUS.DEGRADED,
        operationalBudgetMetrics: "Allocated: $18M | Saturated: 64%",
        coreAxiom: "Designed a high-density graphics pipeline that bypasses traditional virtual DOM engines to stream live server canvas blitting maps directly to engineers.",
        technologies: ["TypeScript", "WebGL 2.0", "WebSockets Engine", "Tailwind CSS Mesh"],
        architecturalInvariants: [
            "Flat array memory allocations layout preventing V8 heap fragmentation loops.",
            "Raw event throttling loops keeping browser frame pacing locked at 120 FPS.",
            "Dynamic style computation caches mapped via immutable hash tables."
        ]
    }
];

// ============================================================================
// 2. INFRASTRUCTURE LAYER: ASYNC TELEMETRY BROKER (Simulated Hardware Pipes)
// ============================================================================
const HardwareLogBroker = {
    fetchLiveEcosystemMetrics: async (projectId) => {
        if (!projectId) {
            throw new Error("FATAL PROTOCOL ERROR: Project entity context reference unallocated.");
        }

        // Simulating raw buffer stream compilation across internal bare-metal arrays
        await new Promise((resolve) => setTimeout(resolve, 350));

        return {
            hardwareNodeCount: Math.floor(Math.random() * 500 + 250),
            ioThroughputDelta: `${(Math.random() * 150 + 400).toFixed(2)} Gbps`,
            runtimeHashSignature: `SHA512_SECURE_${Math.random().toString(36).substring(2, 10).toUpperCase()}`
        };
    }
};

// ============================================================================
// 3. REACT HOOK ENGINE EXPORT
// ============================================================================
export const useProjects = () => {
    const [activeProjectId, setActiveProjectId] = useState(ENTERPRISE_PROJECTS_REGISTRY[0].projectId);
    const [classificationFilter, setClassificationFilter] = useState('ALL_CLASSIFICATIONS');
    const [searchParameter, setSearchParameter] = useState('');

    // Async Infrastructure State Vector
    const [asyncTelemetry, setAsyncTelemetry] = useState({
        liveMetrics: null,
        isCompiling: false,
        exceptionRaised: null
    });

    // 1. UseMemo Matrix Pointer Evaluation
    const evaluatedActiveNode = useMemo(() => {
        const matchedNode = ENTERPRISE_PROJECTS_REGISTRY.find(
            (node) => node.projectId === activeProjectId
        );

        // Fallback security assertion invariant loop (Clean Code Rule)
        if (!matchedNode) {
            return ENTERPRISE_PROJECTS_REGISTRY[0];
        }

        return matchedNode;
    }, [activeProjectId]);

    // 2. Async Life-Cycle Resolver Pipeline
    useEffect(() => {
        let isExecutionThreadValid = true;

        setAsyncTelemetry((previousState) => ({
            ...previousState,
            isCompiling: true,
            exceptionRaised: null
        }));

        HardwareLogBroker.fetchLiveEcosystemMetrics(evaluatedActiveNode.projectId)
            .then((telemetryPayload) => {
                if (isExecutionThreadValid) {
                    setAsyncTelemetry({
                        liveMetrics: telemetryPayload,
                        isCompiling: false,
                        exceptionRaised: null
                    });
                }
            })
            .catch((errorContext) => {
                if (isExecutionThreadValid) {
                    setAsyncTelemetry({
                        liveMetrics: null,
                        isCompiling: false,
                        exceptionRaised: errorContext.message || "Unknown Core Exception."
                    });
                }
            });

        // Cleanup hook terminating race-conditions in unmounted pipelines
        return () => {
            isExecutionThreadValid = false;
        };
    }, [evaluatedActiveNode.projectId]);

    // 3. High-Performance Multi-Filter Array Matrix Compilation
    const filteredProjectsPipeline = useMemo(() => {
        return ENTERPRISE_PROJECTS_REGISTRY.filter((projectNode) => {
            // Functional state mapping bypassing massive dirty nested branches
            const matchesClassification =
                classificationFilter === 'ALL_CLASSIFICATIONS' ||
                projectNode.systemClassification === classificationFilter;

            const normalizedSearchQuery = searchParameter.trim().toLowerCase();
            const matchesSearch =
                !normalizedSearchQuery ||
                projectNode.title.toLowerCase().includes(normalizedSearchQuery) ||
                projectNode.coreAxiom.toLowerCase().includes(normalizedSearchQuery) ||
                projectNode.technologies.some((tech) => tech.toLowerCase().includes(normalizedSearchQuery));

            return matchesClassification && matchesSearch;
        });
    }, [classificationFilter, searchParameter]);

    // 4. UseCallback Action Dispatches
    const switchActiveProjectPointer = useCallback((id) => {
        if (!id) return;
        setActiveProjectId(id);
    }, []);

    const purgeActiveFilters = useCallback(() => {
        setActiveProjectId(ENTERPRISE_PROJECTS_REGISTRY[0].projectId);
        setClassificationFilter('ALL_CLASSIFICATIONS');
        setSearchParameter('');
    }, []);

    // Return API Interface Matrix exposing pure states and workers
    return {
        rawRegistryData: ENTERPRISE_PROJECTS_REGISTRY,
        visibleProjects: filteredProjectsPipeline,
        activeProject: evaluatedActiveNode,
        activeId: activeProjectId,

        // Input state controls
        searchParameter,
        setSearchParameter,
        classificationFilter,
        setClassificationFilter,

        // Async Telemetry States
        liveMetrics: asyncTelemetry.liveMetrics,
        isTelemetryLoading: asyncTelemetry.isCompiling,
        telemetryError: asyncTelemetry.exceptionRaised,

        // Core Operation Dispatches
        selectProject: switchActiveProjectPointer,
        resetFilterState: purgeActiveFilters
    };
};