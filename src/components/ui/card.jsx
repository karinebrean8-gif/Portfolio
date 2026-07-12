import React, { useState, useTransition } from 'react';

// ============================================================================
// STRUCTURAL REGISTRIES & SCHEMAS (Immutable Configuration Layer)
// ============================================================================

/**
 * Visual Layout Variations Mapped onto Functional Style Matrices.
 * Dictates atomic UI layout without modifying component structure.
 */
const CARD_LAYOUT_VARIANTS = Object.freeze({
    project: {
        wrapper: "bg-slate-900/40 border-slate-900 hover:border-emerald-500/40 hover:bg-slate-900/80 shadow-2xl shadow-slate-950/50",
        headerAccent: "text-emerald-400",
        iconBg: "bg-emerald-500/10 text-emerald-400"
    },
    experience: {
        wrapper: "bg-zinc-900/30 border-zinc-900 hover:border-blue-500/40 hover:bg-zinc-900/60 shadow-xl",
        headerAccent: "text-blue-400",
        iconBg: "bg-blue-500/10 text-blue-400"
    },
    stack: {
        wrapper: "bg-slate-950/80 border-slate-900 hover:border-purple-500/30 hover:bg-slate-900/20 text-center",
        headerAccent: "text-purple-400",
        iconBg: "bg-purple-500/10 text-purple-400 mx-auto"
    }
});

// ============================================================================
// ASYNCHRONOUS TRANSACTION MANAGERS (Promise Simulation Engine)
// ============================================================================

/**
 * Handles edge-node metric increments or live demo route analytics.
 * Returns a pipeline state resolved via async microtasks.
 */
const trackCardInteractionEvent = (cardId, actionType) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!cardId) {
                reject(new Error("Missing entity identity reference vector."));
            } else {
                resolve({
                    telemetryStatus: "SYNCHRONIZED",
                    payload: { nodeId: cardId, action: actionType, timestamp: Date.now() }
                });
            }
        }, 600); // 600ms transaction trip simulation
    });
};

// ============================================================================
// CORE DISTRIBUTED INTERFACE COMPONENT
// ============================================================================

export default function Card({
    id,
    variant = "project", // 'project' | 'experience' | 'stack'
    metaBadge,
    title,
    subtitle,
    description,
    tags = [],         // Flat text tag arrays
    metrics = [],      // Object array: [{ label: "SLA", value: "99.9%" }]
    actions = [],      // Object array: [{ label: "Deploy", handler: () => {}, primary: true }]
    icon = "🧱"
}) {
    const [metricCounter, setMetricCounter] = useState(0);
    const [isPending, startTransition] = useTransition();
    const [syncState, setSyncState] = useState("idle"); // "idle" | "syncing" | "done"

    // Target variant discovery pattern lookup
    const currentStyles = CARD_LAYOUT_VARIANTS[variant] || CARD_LAYOUT_VARIANTS.project;

    /**
     * Dispatches analytics tracking safely via non-blocking transaction streams.
     */
    const executeActionPipeline = async (actionItem) => {
        if (isPending) return;

        startTransition(async () => {
            setSyncState("syncing");
            try {
                // Parallelized tasks: Track telemetry event + trigger client handler
                await trackCardInteractionEvent(id, actionItem.label);

                if (typeof actionItem.handler === "function") {
                    actionItem.handler({ id, title, currentCount: metricCounter });
                }

                setMetricCounter((prev) => prev + 1);
                setSyncState("done");
            } catch (err) {
                console.error("Telemetry pipeline execution aborted:", err.message);
                setSyncState("idle");
            }
        });
    };

    return (
        <div className={`group relative w-full rounded-2xl border p-6 md:p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-md ${currentStyles.wrapper} selection:bg-emerald-500 selection:text-slate-950`}>

            {/* GLOW DECORATOR EFFECT CORE */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/[0.02] to-transparent" />

            {/* TOP REGION: CONTENT ENTITIES */}
            <div className="space-y-4">

                {/* HEADER META BAR MAP */}
                <div className="flex items-center justify-between gap-4">
                    {metaBadge ? (
                        <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border border-slate-800 bg-slate-950 text-slate-400">
                            {metaBadge}
                        </span>
                    ) : <div />}

                    {/* Core Pipeline Sync Micro State */}
                    <div className="text-[9px] font-mono text-slate-600 uppercase tracking-wider flex items-center gap-1">
                        <span className={`w-1 h-1 rounded-full ${syncState === 'syncing' ? 'bg-amber-400 animate-ping' : syncState === 'done' ? 'bg-emerald-400' : 'bg-slate-700'}`} />
                        Vctr: [{syncState}]
                    </div>
                </div>

                {/* IDENTITY IDENTITY LAYER */}
                <div className="flex items-start gap-4">
                    {icon && (
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 transition-transform duration-300 group-hover:scale-105 ${currentStyles.iconBg}`}>
                            {icon}
                        </div>
                    )}
                    <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-bold text-white tracking-tight truncate group-hover:text-slate-100 transition-colors">
                            {title}
                        </h3>
                        {subtitle && (
                            <p className={`text-xs font-mono mt-0.5 tracking-wide ${currentStyles.headerAccent}`}>
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>

                {/* NARRATIVE LOG MATRIX */}
                {description && (
                    <p className="text-sm text-slate-400 leading-relaxed font-sans line-clamp-3">
                        {description}
                    </p>
                )}

                {/* ATTRIBUTE TAG LOOP ELEMENT */}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                        {tags.map((tag, idx) => (
                            <span
                                key={`${tag}-${idx}`}
                                className="text-[11px] font-mono text-slate-300 bg-slate-900/60 px-2.5 py-0.5 rounded-md border border-slate-900"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* BOTTOM REGION: INTERACTION MATRIX & DATA SEGMENTS */}
            <div className="mt-6 pt-6 border-t border-slate-900/60 space-y-5">

                {/* METRIC SEGMENTS COUNTER SECTION */}
                {metrics.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 bg-slate-950/20 p-3 rounded-xl border border-slate-900/40">
                        {metrics.map((metric, idx) => (
                            <div key={`${metric.label}-${idx}`} className="text-left font-mono">
                                <span className="block text-[9px] text-slate-500 uppercase tracking-wider">{metric.label}</span>
                                <span className="text-xs font-bold text-slate-200">{metric.value}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* INTERACTION PIPELINES ELEMENT CAPTURE */}
                {actions.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-center gap-2.5">
                        {actions.map((action, idx) => (
                            <button
                                key={`${action.label}-${idx}`}
                                disabled={isPending}
                                onClick={() => executeActionPipeline(action)}
                                className={`w-full py-2.5 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none ${action.primary
                                        ? "bg-slate-100 text-slate-950 hover:bg-white shadow-lg shadow-white/5"
                                        : "border border-slate-800 bg-slate-900/40 text-slate-300 hover:text-white hover:border-slate-700"
                                    }`}
                            >
                                {isPending && syncState === "syncing" ? "Broadcasting..." : action.label}
                            </button>
                        ))}
                    </div>
                )}

                {/* REAL-TIME ENGAGEMENT STREAM TELEMETRY BAR */}
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-600 border-t border-slate-950 pt-3">
                    <span>Interaction Logs</span>
                    <span>Hits: {String(metricCounter).padStart(3, '0')}</span>
                </div>

            </div>
        </div>
    );
}