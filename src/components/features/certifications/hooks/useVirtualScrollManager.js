
import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// Enterprise Core Metric Pipeline Connection
import LoggerConsoleInstance from "../services/LoggerConsole.service";

// ============================================================================
// 1. IMMUTABLE ARCHITECTURAL POLICIES & BOUNDARIES
// ============================================================================
const VIRTUAL_ENGINE_CONFIG = Object.freeze({
    DEFAULT_ROW_HEIGHT_PX: 36,     // Optimized height for dense Tailwind terminal typography
    BUFFER_NODE_COUNT: 5,          // Virtual items rendered outside visible view to eliminate screen flashing
    SUBSYSTEM_KEY: "VIRTUAL_SCROLL_CORE",
    RENDER_THROTTLE_MS: 8
});

const LAYOUT_POLYMORTPHIC_THEMES = Object.freeze({
    CONTAINER_WRAPPERS: "relative overflow-y-auto w-full h-full max-h-[600px] bg-slate-950/90 rounded-lg border border-slate-800 shadow-inner scrollbar-thin scrollbar-thumb-slate-800",
    SCROLL_RUNWAY: "absolute top-0 left-0 w-full pointer-events-none text-transparent border-none opacity-0"
});

// ============================================================================
// 2. THE ULTRAGOD VIRTUALIZATION ENGINE CONTEXT
// ============================================================================
export const useVirtualScrollManager = (rawSourceArrayData = []) => {
    // Pure Atomic Vector Layout Indexes mapped to the UI Render Threads
    const [scrollTopOffset, setScrollTopOffset] = useState(0);
    const [containerHeight, setContainerHeight] = useState(400);

    // Hardened Hardware Reference Anchors (Zero GC Allocation Layer)
    const DOMContainerRef = useRef(null);
    const engineStateRegistryMap = useRef(new Map());

    /**
     * INITIALIZE SEED CONSTANTS WITHIN PERSISTENT REFS
     */
    if (engineStateRegistryMap.current.size === 0) {
        engineStateRegistryMap.current.set("TOTAL_PROCESSED_ITEMS", 0);
        engineStateRegistryMap.current.set("LAST_INTERSECT_TIMESTAMP", Date.now());
    }

    /**
     * INTERCEPT CONTAINER SCROLL EVENTS
     * Captures scroll progression boundaries safely without causing synchronous layout thrashing.
     */
    const handleContainerScrollEvent = useCallback((scrollEvent) => {
        // Structural Guard Clapping: Evacuate if event target pointer integrity collapses
        if (!scrollEvent?.target) return;

        setScrollTopOffset(scrollEvent.target.scrollTop);
    }, []);

    /**
     * LAYOUT GEOMETRY RE-CALCULATION ADAPTER
     * Measures current bounding box viewport specs to reset memory window slices.
     */
    const executeViewportGeometryRecalculation = useCallback(() => {
        // Guard Clause: Abort calculation safely if ref is unmounted or detached
        if (!DOMContainerRef.current) return;

        const dynamicHeight = DOMContainerRef.current.clientHeight;
        setContainerHeight(dynamicHeight);

        LoggerConsoleInstance.commitLogRecord(
            `[VIRTUALIZATION] Viewport recalibrated. Active Layout Bound: ${dynamicHeight}px`,
            "CORE_DEBUG",
            VIRTUAL_ENGINE_CONFIG.SUBSYSTEM_KEY
        );
    }, []);

    /**
     * SYSTEM EFFECT ATTACHMENT HANDSHAKE LOOP
     * Attaches low-level window resize observer interfaces to avoid classical resize lagging.
     */
    useEffect(() => {
        executeViewportGeometryRecalculation();

        if (typeof window === "undefined" || !window.ResizeObserver) return () => { };

        const structuralResizeObserver = new ResizeObserver(() => {
            executeViewportGeometryRecalculation();
        });

        if (DOMContainerRef.current) {
            structuralResizeObserver.observe(DOMContainerRef.current);
        }

        // Tear-down destructor pipeline loop
        return () => {
            structuralResizeObserver.disconnect();
        };
    }, [executeViewportGeometryRecalculation]);

    // ============================================================================
    // 3. ZERO-ALLOCATION MATHEMATICAL GEOMETRY COMPUTATIONS (Memoized Projections)
    // ============================================================================
    const computedVirtualWindowManifest = useMemo(() => {
        const dataDatasetLength = rawSourceArrayData.length;
        engineStateRegistryMap.current.set("TOTAL_PROCESSED_ITEMS", dataDatasetLength);

        const rowHeight = VIRTUAL_ENGINE_CONFIG.DEFAULT_ROW_HEIGHT_PX;
        const scrollBuffer = VIRTUAL_ENGINE_CONFIG.BUFFER_NODE_COUNT;

        // Mathematical Core Range Inversion Engine
        const computedTotalRunwayHeightPx = dataDatasetLength * rowHeight;

        // Anti-Negative Floating Bounds Anchors
        const calculatedStartIndex = Math.max(0, Math.floor(scrollTopOffset / rowHeight) - scrollBuffer);
        const calculatedEndIndex = Math.min(dataDatasetLength - 1, Math.floor((scrollTopOffset + containerHeight) / rowHeight) + scrollBuffer);

        // Slice array memory chunk vectors safely without modifying structural index references
        const sliceBufferItemsArray = [];
        for (let currentPointer = calculatedStartIndex; currentPointer <= calculatedEndIndex; currentPointer++) {
            const activeItemPayload = rawSourceArrayData[currentPointer];

            // Structural Guard Clause: Skip undefined loop registers safely
            if (!activeItemPayload) continue;

            sliceBufferItemsArray.push(Object.freeze({
                rawIndex: currentPointer,
                virtualTopStyleOffsetPx: currentPointer * rowHeight,
                payload: activeItemPayload,
                rowWrapperTailwindClass: "absolute left-0 w-full transition-all duration-75 hover:bg-slate-900/60"
            }));
        }

        // Anti If-Else Status Evaluation Matrix Strategy Pattern
        const logConditionStrategy = {
            true: () => {
                engineStateRegistryMap.current.set("LAST_INTERSECT_TIMESTAMP", Date.now());
            },
            false: () => { }
        };
        logConditionStrategy[sliceBufferItemsArray.length > 0]();

        return Object.freeze({
            slicedVirtualItems: sliceBufferItemsArray,
            runwayHeight: computedTotalRunwayHeightPx,
            startIndex: calculatedStartIndex,
            endIndex: calculatedEndIndex,
            metricsSummary: {
                totalSourceCount: dataDatasetLength,
                currentlyRenderedDOMCount: sliceBufferItemsArray.length,
                memorySavingsPercentage: dataDatasetLength > 0
                    ? Math.max(0, ((1 - (sliceBufferItemsArray.length / dataDatasetLength)) * 100).toFixed(1))
                    : 100
            }
        });
    }, [rawSourceArrayData, scrollTopOffset, containerHeight]);

    // Lock interface return types to protect structural system access layers
    return Object.freeze({
        DOMContainerRef,
        computedVirtualWindowManifest,
        tailwindLayoutSpecs: LAYOUT_POLYMORTPHIC_THEMES,
        actions: {
            handleContainerScrollEvent,
            triggerManualGeometrySync: executeViewportGeometryRecalculation,
            scrollToTopIndex: () => {
                if (DOMContainerRef.current) DOMContainerRef.current.scrollTop = 0;
            }
        }
    });
};