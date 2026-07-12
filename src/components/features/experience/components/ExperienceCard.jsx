import React, { useState, useMemo, useCallback, useRef } from 'react';

// ============================================================================
// 1. ATOMIC VISUAL DICTIONARIES & ROUTERS (Prevents Inline CSS Spaghettis)
// ============================================================================
const METRIC_THEME_ROUTER = {
    HIGH_VOLTAGE: {
        border: "border-purple-500/30 bg-purple-950/10",
        badge: "bg-purple-950 text-purple-400 border-purple-800",
        textGlow: "text-purple-400 drop-shadow-[0_0_6px_rgba(168,85,247,0.4)]"
    },
    HYPER_DRIVE: {
        border: "border-emerald-500/30 bg-emerald-950/10",
        badge: "bg-emerald-950 text-emerald-400 border-emerald-800",
        textGlow: "text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.4)]"
    },
    QUANTUM_SHARD: {
        border: "border-cyan-500/30 bg-cyan-950/10",
        badge: "bg-cyan-950 text-cyan-400 border-cyan-800",
        textGlow: "text-cyan-400 drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]"
    }
};

const GLYPH_DICTIONARY = {
    PROJECT_LAUNCH: "🚀",
    METRIC_BOOST: "⚡",
    BLAST_RADIUS: "💥",
    SYSTEM_STABLE: "⚙️"
};

export default function ExperienceCard({ epochPayload, telemetryDispatcher }) {
    // Graceful fallback to prevent crashes if payload leaks uncompiled properties
    const node = useMemo(() => {
        const fallbackNode = {
            epochId: "unknown-shard",
            company: "ALEXICORN",
            role: "Senior Engineer",
            duration: "6 Years Active Matrix",
            context: "Executing hyperscale engineering loops.",
            themeKey: "HIGH_VOLTAGE",
            masterProjects: [],
            proCoderAchievements: []
        };
        return { ...fallbackNode, ...epochPayload };
    }, [epochPayload]);

    const [activeProjectIdx, setActiveProjectIdx] = useState(0);
    const [isInterrogating, setIsInterrogating] = useState(false);
    const internalTrackerRef = useRef({ processingCycles: 0 });

    // Extract precise styling metrics derived from the immutable routing graph
    const visualStyles = useMemo(() => {
        return METRIC_THEME_ROUTER[node.themeKey] || METRIC_THEME_ROUTER.HIGH_VOLTAGE;
    }, [node.themeKey]);

    // ============================================================================
    // 2. PROMISE-DRIVEN TELEMETRY INTERROGATION HANDLER
    // ============================================================================
    const triggerNodeInterrogation = useCallback(() => {
        if (isInterrogating) return;
        setIsInterrogating(true);
        internalTrackerRef.current.processingCycles += 1;

        // Simulate real-time stream packet dispatching to parent infrastructure
        new Promise((resolve) => {
            if (typeof telemetryDispatcher === 'function') {
                telemetryDispatcher(node.company, node.epochId);
            }
            setTimeout(() => resolve(true), 250);
        }).then(() => {
            setIsInterrogating(false);
        });
    }, [node, telemetryDispatcher, isInterrogating]);

    // ============================================================================
    // 3. ISOLATED SUB-COMPONENT COMPILING RENDERERS (Bypasses parent re-renders)
    // ============================================================================
    const renderProjectDashboard = useMemo(() => {
        if (!node.masterProjects || node.masterProjects.length === 0) return null;
        const activeProject = node.masterProjects[activeProjectIdx] || node.masterProjects[0];

        return (
            <div className="space-y-4 pt-2 border-t border-slate-900/80">
                <div className="text-[10px] font-mono tracking-wider text-slate-500 uppercase flex items-center gap-2">
                    <span>{GLYPH_DICTIONARY.PROJECT_LAUNCH} Core Enterprise Projects Array ({node.masterProjects.length})</span>
                    <div className="h-px bg-slate-900 flex-grow" />
                </div>

                {/* Dynamic Project Tab Array */}
                <div className="flex gap-1 overflow-x-auto pb-1.5 scrollbar-none">
                    {node.masterProjects.map((proj, idx) => (
                        <button
                            key={proj.uid || idx}
                            onClick={() => setActiveProjectIdx(idx)}
                            className={`px-3 py-1 text-[10px] font-mono font-black border rounded-md transition-all duration-150 focus:outline-none ${activeProjectIdx === idx
                                    ? "bg-cyan-950/40 border-cyan-500 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.15)]"
                                    : "bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-300"
                                }`}
                        >
                            {proj.uid || `PROJ_${idx}`}
                        </button>
                    ))}
                </div>

                {/* Selected Project Dynamic Output Panel */}
                <div className={`p-4 rounded-xl border transition-all duration-200 ${visualStyles.border}`}>
                    <h4 className="text-xs sm:text-sm font-black font-mono text-slate-200">
                        {activeProject.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-400 font-mono mt-1 leading-relaxed">
                        {activeProject.scope}
                    </p>

                    {/* Dynamic Metadata Data Grid Matrix */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 mt-3 border-t border-slate-900/60 font-mono text-[9px]">
                        <div>
                            <span className="text-slate-600 block">// BLAST_RADIUS</span>
                            <span className="text-slate-300 font-bold">{activeProject.blastRadius}</span>
                        </div>
                        <div>
                            <span className="text-slate-600 block">// THROUGHPUT_SCALE</span>
                            <span className="text-cyan-400 font-bold">{activeProject.throughput}</span>
                        </div>
                        <div>
                            <span className="text-slate-600 block">// INSTANCE_STATUS</span>
                            <span className="text-emerald-400 font-bold">{activeProject.status}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }, [node.masterProjects, activeProjectIdx, visualStyles]);

    // ============================================================================
    // 4. MAIN CARD CONSOLE TEMPLATE
    // ============================================================================
    return (
        <div className="w-full bg-slate-950/40 border border-slate-900 rounded-2xl p-4 sm:p-5 md:p-6 shadow-xl transition-all hover:border-slate-800 flex flex-col gap-4 group">

            {/* CARD HEAD LOGIC SYSTEM */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-3 border-b border-slate-900/60 pb-4">
                <div className="space-y-1 w-full sm:max-w-[70%]">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2 py-0.5 text-[9px] border font-mono font-extrabold rounded uppercase tracking-tighter ${visualStyles.badge}`}>
                            {node.tierLabel || "GOD_MODE_INVARIANT"}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 font-bold">{node.duration}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black tracking-tight text-slate-100 group-hover:text-cyan-400 transition-colors">
                        {node.role}
                    </h3>
                    <p className={`text-xs font-mono font-black ${visualStyles.textGlow}`}>
                        @{node.company.toUpperCase()}
                    </p>
                </div>

                {/* Real-time Interaction Pulse Node */}
                <button
                    onClick={triggerNodeInterrogation}
                    disabled={isInterrogating}
                    className={`w-full sm:w-auto px-3 py-1.5 rounded-lg border font-mono text-[10px] font-bold text-center transition-all focus:outline-none ${isInterrogating
                            ? "bg-slate-900 border-slate-800 text-slate-600 animate-pulse"
                            : "bg-slate-950 border-slate-800 text-slate-400 hover:border-cyan-500/50 hover:text-cyan-400"
                        }`}
                >
                    {isInterrogating ? "INTERROGATING..." : "RUN_TELEMETRY"}
                </button>
            </div>

            {/* CORE CONTEXT IMPRESSION BULLET */}
            <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-900/20 p-3 rounded-xl border border-slate-900/40">
                {node.context}
            </p>

            {/* CONDITIONAL COMPILER FOR MASTER PROJECTS */}
            {renderProjectDashboard}

            {/* GRANULAR PRO CODER LOG CHANNELS */}
            {node.proCoderAchievements && node.proCoderAchievements.length > 0 && (
                <div className="space-y-2">
                    <span className="text-[9px] font-mono font-bold text-slate-600 block tracking-tight uppercase">
            // CORE GRANULAR PRO-CODER METRICS
                    </span>
                    <div className="space-y-1.5">
                        {node.proCoderAchievements.map((achievement, idx) => (
                            <div
                                key={idx}
                                className="text-[11px] text-slate-400 font-mono flex gap-2.5 items-start p-2 bg-slate-950 border border-slate-900/60 hover:border-slate-800 rounded-lg transition-colors group/row"
                            >
                                <span className="text-cyan-500 group-hover/row:scale-110 transition-transform">
                                    {GLYPH_DICTIONARY.METRIC_BOOST}
                                </span>
                                <span className="leading-normal flex-1 text-slate-400 group-hover/row:text-slate-300 transition-colors">
                                    {achievement}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ANCHOR CARD INTERNAL FOOTER */}
            <div className="flex justify-between items-center pt-2 border-t border-slate-900/40 font-mono text-[8px] text-slate-600">
                <span>CYCLES_EXECUTED: {internalTrackerRef.current.processingCycles}</span>
                <span>NODE_STATUS: VERIFIED_STEADY_STATE</span>
            </div>

        </div>
    );
}