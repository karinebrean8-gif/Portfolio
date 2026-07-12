import React, { useState, useMemo } from 'react';

// ============================================================================
// STRUCTURAL ARCHITECTURE CONSTANTS (Clean Architecture Design Patterns)
// ============================================================================
const CARD_THEMES = {
    CRITICAL: {
        border: "border-rose-500/30 hover:border-rose-500/60",
        bg: "bg-rose-950/10",
        glow: "shadow-rose-950/20",
        text: "text-rose-400",
        badge: "bg-rose-950/50 border-rose-900/50 text-rose-300"
    },
    OPTIMIZED: {
        border: "border-emerald-500/30 hover:border-emerald-500/60",
        bg: "bg-slate-900/90",
        glow: "shadow-emerald-950/20",
        text: "text-emerald-400",
        badge: "bg-emerald-950/50 border-emerald-900/50 text-emerald-300"
    },
    DEFAULT: {
        border: "border-slate-800 hover:border-slate-700",
        bg: "bg-slate-900/40",
        glow: "shadow-black/40",
        text: "text-cyan-400",
        badge: "bg-slate-950 border-slate-800 text-slate-400"
    }
};

const EXECUTION_METRICS_WEIGHT = {
    SCALE: 3,
    PERFORMANCE: 2,
    REVENUE: 1,
    EFFICIENCY: 1
};

// ============================================================================
// PURE UTILITY ENGINE (Decoupled Infrastructure Layer)
// ============================================================================
const TelemetryLogger = {
    logDispatch: (id, action) => {
        return new Promise((resolve) => {
            const timestamp = new Date().toISOString();
            // Simulating telemetry piping to global sink asynchronously
            setTimeout(() => {
                console.log(`[TELEMETRY] [${timestamp}] CaseStudy:${id} -> Action:${action}`);
                resolve({ Status: 200, Dispatched: true });
            }, 50);
        });
    }
};

// ============================================================================
// CORE PRESENTATION ARCHITECTURE
// ============================================================================
export default function CaseStudiesCard({ study, onSelect, isActive = false }) {
    const [isSyncing, setIsSyncing] = useState(false);
    const [telemetryCount, setTelemetryCount] = useState(0);

    // Fallback Guard: Structural verification of incoming domain objects
    if (!study || typeof study !== 'object') {
        return (
            <div className="p-4 border border-rose-500/20 bg-rose-950/10 rounded-xl text-xs font-mono text-rose-400">
                CRITICAL ERROR: Invalid or corrupted Data Model passed to Presentation Engine.
            </div>
        );
    }

    // Destructure domain parameters with strict defaults
    const {
        id = "CS-UNKNOWN",
        title = "Untitled Architecture Blueprint",
        client = "Anonymous Enterprise",
        duration = "N/A",
        sector = "General Infrastructure",
        impactSummary = "",
        tags = [],
        metrics = []
    } = study;

    // Runtime Evaluator Engine: Deterministic layout switching based on impact density
    const evaluatedTheme = useMemo(() => {
        // Ultra-clean functional reduction matrix
        const architecturalPriorityScore = metrics.reduce(
            (acc, m) => acc + (EXECUTION_METRICS_WEIGHT[m.type?.toUpperCase()] || 0),
            0
        );

        // Pure Conditional Branching Architecture (If-Else Pattern Selection)
        if (architecturalPriorityScore >= 5) {
            return CARD_THEMES.CRITICAL;
        } else if (architecturalPriorityScore >= 2 && architecturalPriorityScore < 5) {
            return CARD_THEMES.OPTIMIZED;
        } else {
            return CARD_THEMES.DEFAULT;
        }
    }, [metrics]);

    // Clean Async Event Handler Pattern using Native Promises
    const handleSystemSelection = async (event) => {
        event.stopPropagation();
        setIsSyncing(true);

        try {
            // Parallel processing loop via Promise pools simulation
            await Promise.all([
                TelemetryLogger.logDispatch(id, "VIEW_DETAILS"),
                new Promise(resolve => setTimeout(resolve, 200)) // Force layout settling frame
            ]);

            setTelemetryCount(prev => prev + 1);
            if (typeof onSelect === 'function') {
                onSelect(id);
            }
        } catch (err) {
            console.error("System Matrix Fault during Event Dispatch:", err);
        } finally {
            setIsSyncing(false);
        }
    };

    return (
        <div
            onClick={handleSystemSelection}
            className={`group relative w-full rounded-2xl border transition-all duration-300 backdrop-blur-sm shadow-xl ${isActive
                    ? 'bg-slate-900 border-emerald-500/50 ring-1 ring-emerald-500/20 translate-y-[-2px]'
                    : `${evaluatedTheme.bg} ${evaluatedTheme.border}`
                } ${evaluatedTheme.glow}`}
        >
            {/* Visual State Indicators */}
            {isActive && (
                <span className="absolute top-3 right-3 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
            )}

            <div className="p-6 space-y-4">
                {/* Card Header Meta Data */}
                <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                        <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-slate-500">
              // {sector}
                        </span>
                        <h3 className={`text-lg font-bold tracking-tight leading-snug group-hover:text-emerald-400 transition-colors duration-200 ${isActive ? 'text-emerald-400' : 'text-slate-100'
                            }`}>
                            {title}
                        </h3>
                    </div>
                </div>

                {/* Impact Abstract Area */}
                <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-3">
                    {impactSummary || "No technical manifest documented for this system footprint."}
                </p>

                {/* Nested Metric Array Parsing Block */}
                {metrics.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/60">
                        {metrics.slice(0, 2).map((metric, idx) => (
                            <div key={idx} className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/40">
                                <div className="text-[10px] font-mono text-slate-500 truncate uppercase">{metric.label}</div>
                                <div className="text-xs font-mono font-bold text-slate-300 mt-0.5 flex items-center gap-1.5">
                                    <span className={`h-1 w-1 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-slate-400'}`} />
                                    {metric.value}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer Interaction Elements */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/40">
                    {/* Tech Stack Array Remapping */}
                    <div className="flex flex-wrap gap-1 max-w-[70%]">
                        {tags.slice(0, 3).map((tag, index) => (
                            <span
                                key={index}
                                className={`text-[9px] font-mono px-2 py-0.5 rounded tracking-tight ${evaluatedTheme.badge}`}
                            >
                                {tag}
                            </span>
                        ))}
                        {tags.length > 3 && (
                            <span className="text-[9px] font-mono text-slate-600 px-1">
                                +{tags.length - 3}
                            </span>
                        )}
                    </div>

                    {/* Action Trigger Elements */}
                    <button
                        disabled={isSyncing}
                        className={`text-xs font-mono font-bold uppercase tracking-tighter flex items-center gap-1 transition-all ${isSyncing ? 'text-slate-600 animate-pulse' : 'text-slate-400 group-hover:text-slate-200'
                            }`}
                    >
                        {isSyncing ? 'SYNCING_' : 'MANIFEST_'}
                        <span className="transform group-hover:translate-x-0.5 transition-transform">→</span>
                    </button>
                </div>
            </div>

            {/* Embedded Deep Debugging Context Telemetry Layer */}
            <div className="absolute bottom-1 right-3 text-[8px] font-mono text-slate-700 select-none opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                POLLS_DISPATCHED: {telemetryCount} | SYSTEM_ID: {id}
            </div>
        </div>
    );
}