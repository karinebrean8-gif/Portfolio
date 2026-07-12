import { useState, useMemo, useCallback, useRef } from 'react';

// ============================================================================
// 1. HARDENED ARCHITECTURAL CONSTANTS & CRITERIA MAPS
// ============================================================================
export const FILTER_MODES = {
    ALL: "ALL_NODES",
    PRINCIPAL_PROJECTS: "P5_SHARDS",
    PRO_CODER_MILESTONES: "PRO_MILESTONES",
    LEGACY_METRICS: "LEGACY_ARCHIVE"
};

const ENGINE_CONFIG = {
    MIN_SEARCH_LENGTH: 2,
    STRICT_MATCH: false
};

/**
 * useExperienceFilter - Core Data Query & Slicing Engine
 * @param {Array} initialNodes - Main raw experience data matrix stream
 */
export default function useExperienceFilter(initialNodes = []) {
    // Core Search & Filter States
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilterMode, setActiveFilterMode] = useState(FILTER_MODES.ALL);
    const [sortOrder, setSortOrder] = useState("CHRONO_DESC"); // DESC | ASC

    // Internal Analytics Ref for Telemetry Tracking
    const queryTelemetryRef = useRef({
        totalQueriesExecuted: 0,
        cacheHits: 0,
        executionTimeMs: 0
    });

    // ============================================================================
    // 2. HIGH-PERFORMANCE SEARCH & FILTER PROCESSING PIPELINE
    // ============================================================================
    const processedMatrix = useMemo(() => {
        const startTime = performance.now();

        if (!initialNodes || initialNodes.length === 0) return [];

        // Deep clone array reference to protect core thread registry data
        let streamPool = [...initialNodes];

        // Phase 1: Pure Mathematical Sorting Loop
        streamPool.sort((alpha, beta) => {
            const extractYear = (spanStr) => parseInt(spanStr.match(/\d+/)?.[0] || "0", 10);
            return sortOrder === "CHRONO_DESC"
                ? extractYear(beta.span) - extractYear(alpha.span)
                : extractYear(alpha.span) - extractYear(beta.span);
        });

        // Phase 2: Structural Architectural Mode Filtering Map
        streamPool = streamPool.filter((node) => {
            switch (activeFilterMode) {
                case FILTER_MODES.PRINCIPAL_PROJECTS:
                    return node.shards && node.shards.length > 0;
                case FILTER_MODES.PRO_CODER_MILESTONES:
                    return node.proCoderMilestones && node.proCoderMilestones.length > 0;
                case FILTER_MODES.LEGACY_METRICS:
                    return node.status?.includes("LEGACY") || node.status?.includes("HISTORICAL");
                case FILTER_MODES.ALL:
                default:
                    return true;
            }
        });

        // Phase 3: High-Density Text Interrogation Sequence
        const cleanQuery = searchQuery.trim().toLowerCase();
        if (cleanQuery.length >= ENGINE_CONFIG.MIN_SEARCH_LENGTH) {
            streamPool = streamPool.filter((node) => {
                const companyMatch = node.company?.toLowerCase().includes(cleanQuery);
                const roleMatch = node.role?.toLowerCase().includes(cleanQuery);
                const overviewMatch = node.overview?.toLowerCase().includes(cleanQuery);

                // Deep nested array shard scanning (Maps 5 Principal Projects internally)
                const shardMatch = node.shards?.some(shard =>
                    shard.title.toLowerCase().includes(cleanQuery) ||
                    shard.detail.toLowerCase().includes(cleanQuery) ||
                    shard.code.toLowerCase().includes(cleanQuery)
                );

                // Milestone array lookups
                const milestoneMatch = node.proCoderMilestones?.some(milestone =>
                    milestone.toLowerCase().includes(cleanQuery)
                );

                return companyMatch || roleMatch || overviewMatch || shardMatch || milestoneMatch;
            });
        }

        // Capture telemetry logs safely without triggering state cycles
        const endTime = performance.now();
        queryTelemetryRef.current.executionTimeMs = parseFloat((endTime - startTime).toFixed(3));
        queryTelemetryRef.current.totalQueriesExecuted += 1;

        return streamPool;
    }, [initialNodes, searchQuery, activeFilterMode, sortOrder]);

    // ============================================================================
    // 3. MEMOIZED DYNAMIC METRICS COMPILER
    // ============================================================================
    const queryAnalytics = useMemo(() => {
        // Collect specific counts using array map/reduce configurations
        const totalAlexicornShards = processedMatrix
            .filter(node => node.company === "ALEXICORN")
            .reduce((acc, curr) => acc + (curr.shards?.length || 0), 0);

        return {
            matchedNodesCount: processedMatrix.length,
            alexicornActiveShards: totalAlexicornShards,
            searchLatencyMs: queryTelemetryRef.current.executionTimeMs,
            totalInteractions: queryTelemetryRef.current.totalQueriesExecuted
        };
    }, [processedMatrix]);

    // ============================================================================
    // 4. TRANSACTION-SAFE CALLED ACTION HANDLERS (Callbacks)
    // ============================================================================
    const updateSearchQuery = useCallback((query) => {
        setSearchQuery(query);
    }, []);

    const selectFilterMode = useCallback((mode) => {
        if (Object.values(FILTER_MODES).includes(mode)) {
            setActiveFilterMode(mode);
        }
    }, []);

    const toggleChronologyOrder = useCallback(() => {
        setSortOrder(prev => (prev === "CHRONO_DESC" ? "CHRONO_ASC" : "CHRONO_DESC"));
    }, []);

    const forceResetPipeline = useCallback(() => {
        setSearchQuery("");
        setActiveFilterMode(FILTER_MODES.ALL);
        setSortOrder("CHRONO_DESC");
    }, []);

    // ============================================================================
    // 5. ARCHITECTURAL INTERFACE EXPORT EXPOSURE
    // ============================================================================
    return {
        // Stream Output Data Layer
        filteredNodes: processedMatrix,

        // Core Configuration States
        searchQuery,
        activeFilterMode,
        sortOrder,

        // Live Diagnostics Metadata
        analytics: queryAnalytics,
        modes: FILTER_MODES,

        // Functional Operations Pipelines
        updateSearchQuery,
        selectFilterMode,
        toggleChronologyOrder,
        forceResetPipeline
    };
}