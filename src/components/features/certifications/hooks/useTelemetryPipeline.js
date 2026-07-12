/**
 * ============================================================================
 * L10 DISTINGUISHED PRINCIPAL DATA PIPELINE & METRICS ORCHESTRATOR
 * HOOK: useTelemetryPipeline
 * PARADIGM: Stream Buffer Batching, Microtask Scheduling, Asynchronous Ingress,
 * Structural Immutability Contracts.
 * SYSTEM SPECS: Docker/K8s Compute Node Engine Virtualizer
 * ============================================================================
 */

import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// Enterprise Facade Proxy Ingress
import LoggerConsoleInstance from "../services/LoggerConsole.service";
import EdgeCacheTelemetryInstance from "../services/EdgeCacheTelemetry.service";

// ============================================================================
// 1. HARDENED SYSTEM INGRESS CONFIGURATION CONTRACTS
// ============================================================================
const PIPELINE_POLICIES = Object.freeze({
    BATCH_FLUSH_INTERVAL_MS: 400, // Debounce window for bulk rendering hydration
    MAX_LIVE_BUFFER_LIMIT: 100,   // Prevent DOM bloating memory footprint
    DEFAULT_NAMESPACE: "k8s-telemetry-ingress"
});

const CLUSTER_NODE_STATUS = Object.freeze({
    STABLE: "HEALTHY_STEADY_STATE",
    BURST_TRAFFIC: "HIGH_THROUGHPUT_PROCESSING",
    DEGRADED: "CLUSTER_THROTTLED"
});

// ============================================================================
// 2. THE ULTRAGOD PIPELINE ORCHESTRATOR ENGINE HOOK
// ============================================================================
export const useTelemetryPipeline = () => {
    // Pure Isolated Atomic States Direct to Screen Thread
    const [batchedLogs, setBatchedLogs] = useState([]);
    const [pipelineHealthState, setPipelineHealthState] = useState(CLUSTER_NODE_STATUS.STABLE);

    // High-Speed Reference Registers (Zero Allocation Garbage Collection Safeguard)
    const structuralBufferQueue = useRef([]);
    const batchProcessingTimer = useRef(null);
    const throughputCounterMap = useRef(new Map());

    /**
     * TRANSACTION REGISTER SEEDING
     */
    if (throughputCounterMap.current.size === 0) {
        throughputCounterMap.current.set("INGESTED_METRICS_COUNT", 0);
        throughputCounterMap.current.set("LAST_BATCH_EPOCH", Date.now());
    }

    /**
     * BATCH PROCESSING FLUSH ENGINE
     * Dispatches buffered array items synchronously to the React execution thread.
     */
    const flushMetricsStreamBuffer = useCallback(() => {
        if (structuralBufferQueue.current.length === 0) return;

        // Mutate state with snapshot clone array slicing boundaries
        setBatchedLogs((historicalLogs) => {
            const consolidatedArray = [...historicalLogs, ...structuralBufferQueue.current];

            // LRU/FIFO Ring Buffer Truncator: Keeps absolute performance limits
            return consolidatedArray.length > PIPELINE_POLICIES.MAX_LIVE_BUFFER_LIMIT
                ? consolidatedArray.slice(consolidatedArray.length - PIPELINE_POLICIES.MAX_LIVE_BUFFER_LIMIT)
                : consolidatedArray;
        });

        // Compute Throughput Diagnostics Metrics inside Map Storage
        const currentIngestedTotal = throughputCounterMap.current.get("INGESTED_METRICS_COUNT");
        throughputCounterMap.current.set("INGESTED_METRICS_COUNT", currentIngestedTotal + structuralBufferQueue.current.length);
        throughputCounterMap.current.set("LAST_BATCH_EPOCH", Date.now());

        // Flush active staging buffer queue array memory pointer references
        structuralBufferQueue.current = [];
        setPipelineHealthState(CLUSTER_NODE_STATUS.STABLE);
    }, []);

    /**
     * SYSTEM SHUTDOWN DEALLOCATION HOOK
     */
    const deallocatePipelineIntervalTimer = useCallback(() => {
        if (batchProcessingTimer.current) {
            clearInterval(batchProcessingTimer.current);
            batchProcessingTimer.current = null;
        }
    }, []);

    /**
     * FORCE RE-ROUTE TRIGGER: Manually inject system diagnostic traces
     */
    const dispatchManualTelemetryEvent = useCallback(async (eventMessage, targetSeverity = "CLUSTER_INFO") => {
        return new Promise((resolve) => {
            // Guard Clause: Validate string block pointer validity
            if (!eventMessage) {
                resolve(false);
                return;
            }

            LoggerConsoleInstance.commitLogRecord(
                `[INJECTOR_NODE] -> ${eventMessage}`,
                targetSeverity,
                PIPELINE_POLICIES.DEFAULT_NAMESPACE.toUpperCase()
            );
            resolve(true);
        });
    }, []);

    // ============================================================================
    // 3. REACTIVE EFFECT SUBSCRIPTION LIFECYCLE HANDSHAKE LOOP
    // ============================================================================
    useEffect(() => {
        // Instantiate Background Batch Microtask Scheduler
        batchProcessingTimer.current = setInterval(
            flushMetricsStreamBuffer,
            PIPELINE_POLICIES.BATCH_FLUSH_INTERVAL_MS
        );

        // Bind real-time reactive log stream provider subscription hook
        const cancelLiveStreamSubscription = LoggerConsoleInstance.subscribeToLiveStreamLog((incomingLogNode) => {
            structuralBufferQueue.current.push(incomingLogNode);

            // Dynamic Traffic Condition Burst Detector (Anti If-Else Strategy Mapping)
            const healthStateEvaluationStrategy = {
                true: () => setPipelineHealthState(CLUSTER_NODE_STATUS.BURST_TRAFFIC),
                false: () => { }
            };
            healthStateEvaluationStrategy[structuralBufferQueue.current.length > 15]();
        });

        // Teardown execution loops upon hook lifecycle unmount contexts
        return () => {
            deallocatePipelineIntervalTimer();
            cancelLiveStreamSubscription();
        };
    }, [flushMetricsStreamBuffer, deallocatePipelineIntervalTimer]);

    // ============================================================================
    // 4. MEMOIZED ANALYTICAL MATRICES (Zero Cost Projection Allocation Layers)
    // ============================================================================
    const computedPipelineTelemetryMetrics = useMemo(() => {
        const rawMetrics = LoggerConsoleInstance.getSystemTelemetryMetricsReport();

        return Object.freeze({
            ...rawMetrics,
            currentClusterState: pipelineHealthState,
            totalMetricsProcessedSinceMount: throughputCounterMap.current.get("INGESTED_METRICS_COUNT"),
            lastFlushDeltaMs: Date.now() - throughputCounterMap.current.get("LAST_BATCH_EPOCH"),
            tailwindStatusBadgeClass: pipelineHealthState === CLUSTER_NODE_STATUS.STABLE
                ? "inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]"
                : "inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse"
        });
    }, [pipelineHealthState]);

    // Return Frozen Locked Interface Contract API to React DOM Renderers
    return Object.freeze({
        batchedLogs,
        pipelineHealthState,
        computedPipelineTelemetryMetrics,
        actions: {
            dispatchManualTelemetryEvent,
            clearRenderedBuffer: () => setBatchedLogs([]),
            forceFlushBufferNow: flushMetricsStreamBuffer
        }
    });
};