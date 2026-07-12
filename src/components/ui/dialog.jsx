import React, { useState, useEffect, useCallback } from 'react';

// ============================================================================
// IMMUTABLE ARCHITECTURAL LAYOUTS & DATA SCHEMAS (Decoupled Configuration)
// ============================================================================

const DIALOG_THEMES = Object.freeze({
    system: {
        border: 'border-slate-800',
        bg: 'bg-slate-950/95',
        accent: 'text-emerald-400',
        glow: 'shadow-emerald-500/5',
        button: 'from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950'
    },
    critical: {
        border: 'border-rose-900/50',
        bg: 'bg-zinc-950/95',
        accent: 'text-rose-400',
        glow: 'shadow-rose-500/5',
        button: 'from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white'
    }
});

const METRIC_NODES = [
    { label: "Uptime SLA", value: "99.999%", detail: "Global redundancy across 24 edge zones." },
    { label: "Latency Matrix", value: "<12ms", detail: "Edge-optimized cold start bypass protocols." },
    { label: "Throughput Capacity", value: "10M+ req/s", detail: "Distributed asynchronous mesh network pipeline." }
];

const SYSTEM_ACTIONS = [
    {
        id: "action-telemetry",
        title: "Initialize Telemetry Stream",
        description: "Deploys real-time runtime monitoring onto cluster nodes.",
        impact: "Low Overhead",
        icon: "📡"
    },
    {
        id: "action-optimize",
        title: "Trigger V8 Memory Compaction",
        description: "Force executes garbage collection hooks over system memory arrays.",
        impact: "High Optimization",
        icon: "⚡"
    },
    {
        id: "action-verify",
        title: "Verify Cryptographic Ledger",
        description: "Runs a checksum pass against distributed state databases.",
        impact: "Zero Mutation",
        icon: "🔐"
    }
];

// ============================================================================
// ASYNCHRONOUS PIPELINE SIMULATORS (Promise-Driven Architecture)
// ============================================================================

const executeSystemPipeline = (actionId) => {
    return new Promise((resolve, reject) => {
        // Simulating FAANG distributed architecture ingestion delay
        setTimeout(() => {
            const randomSuccess = Math.random() > 0.15; // 85% success rate
            if (randomSuccess) {
                resolve({
                    timestamp: Date.now(),
                    traceId: `tr-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
                    payload: `Pipeline event [${actionId}] successfully completed at edge.`
                });
            } else {
                reject(new Error(`Node connection timeout during execution of action: ${actionId}`));
            }
        }, 1500);
    });
};

// ============================================================================
// MAIN COMPONENT DEFINITION (Clean Code Execution Architecture)
// ============================================================================

export default function Dialog({ isOpen, onClose, dialogType = "system" }) {
    const [activeAction, setActiveAction] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [executionLog, setExecutionLog] = useState([]);

    // Resolve active theme styling based on theme token array map
    const activeTheme = DIALOG_THEMES[dialogType] || DIALOG_THEMES.system;

    // Global ESC key event listener registration via clean hook architecture
    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape' && isOpen && !isProcessing) onClose();
        };

        window.addEventListener('keydown', handleEscapeKey);
        return () => window.removeEventListener('keydown', handleEscapeKey);
    }, [isOpen, isProcessing, onClose]);

    // Clean wrapper for closing dialog safely without disrupting system mutations
    const handleSafeClose = useCallback(() => {
        if (!isProcessing) {
            setActiveAction(null);
            setExecutionLog([]);
            onClose();
        }
    }, [isProcessing, onClose]);

    // Command Pattern implementation using Native JavaScript Promises
    const triggerActionPipeline = async (actionId) => {
        if (isProcessing) return;

        setIsProcessing(true);
        setActiveAction(actionId);

        const initialLog = { type: 'info', text: `Dispatched transaction stream for vector code: [${actionId}]` };
        setExecutionLog([initialLog]);

        try {
            const receipt = await executeSystemPipeline(actionId);
            setExecutionLog((prev) => [
                ...prev,
                { type: 'success', text: `Handshake verified. Trace-ID: ${receipt.traceId}` },
                { type: 'success', text: receipt.payload }
            ]);
        } catch (error) {
            setExecutionLog((prev) => [
                ...prev,
                { type: 'error', text: `CRITICAL EXECUTION FAILURE: ${error.message}` }
            ]);
        } finally {
            setIsProcessing(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 selection:bg-emerald-500 selection:text-slate-950">

            {/* BACKDROP DETACHED INTERACTION LAYER */}
            <div
                className="absolute inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity duration-300"
                onClick={handleSafeClose}
            />

            {/* CORE DIALOG FRAME */}
            <div className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col rounded-2xl border ${activeTheme.border} ${activeTheme.bg} text-slate-100 shadow-2xl ${activeTheme.glow} transition-all duration-300 transform scale-100`}>

                {/* MODAL HEADER BLOCK */}
                <div className="p-6 md:p-8 border-b border-slate-900 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className={`text-xs font-mono uppercase tracking-widest px-2 py-0.5 rounded border ${dialogType === 'critical' ? 'border-rose-500/20 bg-rose-500/10 text-rose-400' : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'}`}>
                                {dialogType} environment
                            </span>
                            <span className="text-xs text-slate-500 font-mono">Schema-v4.9.2</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                            System Control & Architectural Manifest
                        </h2>
                    </div>

                    <button
                        onClick={handleSafeClose}
                        disabled={isProcessing}
                        className="p-2 rounded-lg border border-slate-900 bg-slate-900/50 text-slate-400 hover:text-white hover:border-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-all duration-200"
                        aria-label="Terminate Dialog View"
                    >
                        ✕
                    </button>
                </div>

                {/* MODAL CONTENT LAYOUT GRID */}
                <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-y-auto">

                    {/* LEFT SUB-GRID: ARCHITECT METRIC MATRICES */}
                    <div className="lg:col-span-5 flex flex-col space-y-6">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Performance Directives</h3>

                        <div className="space-y-4">
                            {METRIC_NODES.map((metric, idx) => (
                                <div key={idx} className="p-4 rounded-xl border border-slate-900 bg-slate-900/20">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="text-sm font-medium text-slate-400">{metric.label}</span>
                                        <span className={`font-mono text-lg font-bold ${activeTheme.accent}`}>{metric.value}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 leading-relaxed">{metric.detail}</p>
                                </div>
                            ))}
                        </div>

                        <blockquote className="p-4 rounded-xl border border-dashed border-slate-800 bg-slate-950 text-xs text-slate-400 leading-relaxed">
                            "System structures behave precisely like their communication schemas. Build modular, keep mutations isolated, and treat side-effects as system exceptions."
                        </blockquote>
                    </div>

                    {/* RIGHT SUB-GRID: DISTRIBUTED COMMAND INTERFACES */}
                    <div className="lg:col-span-7 space-y-6">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Available Process Vectors</h3>

                        <div className="space-y-3">
                            {SYSTEM_ACTIONS.map((action) => {
                                const isThisActionProcessing = isProcessing && activeAction === action.id;

                                return (
                                    <div
                                        key={action.id}
                                        className={`p-4 rounded-xl border transition-all duration-300 flex items-start gap-4 ${activeAction === action.id
                                                ? 'bg-slate-900/60 border-slate-700'
                                                : 'bg-slate-900/30 border-slate-900 hover:border-slate-800'
                                            }`}
                                    >
                                        <span className="text-2xl mt-1">{action.icon}</span>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start gap-2 mb-1">
                                                <h4 className="text-sm font-semibold text-white truncate">{action.title}</h4>
                                                <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 whitespace-nowrap">
                                                    {action.impact}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-400 mb-3 leading-relaxed">{action.description}</p>

                                            <button
                                                onClick={() => triggerActionPipeline(action.id)}
                                                disabled={isProcessing}
                                                className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-200 uppercase tracking-wider ${isThisActionProcessing
                                                        ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400 animate-pulse'
                                                        : 'bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white'
                                                    } disabled:opacity-40 disabled:pointer-events-none`}
                                            >
                                                {isThisActionProcessing ? "In Flight..." : "Invoke Command"}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* REALTIME SYSTEM STREAM CONSOLE */}
                        {executionLog.length > 0 && (
                            <div className="mt-4 rounded-xl border border-slate-900 bg-slate-950 p-4 font-mono text-xs space-y-2 max-h-[160px] overflow-y-auto shadow-inner">
                                <div className="text-[10px] text-slate-500 uppercase tracking-widest border-b border-slate-900 pb-1.5 mb-2 flex justify-between">
                                    <span>Standard Output Stream (stdout)</span>
                                    <span className="animate-pulse text-amber-500">● Live</span>
                                </div>
                                {executionLog.map((log, index) => (
                                    <div
                                        key={index}
                                        className={`whitespace-pre-wrap break-all ${log.type === 'error' ? 'text-rose-400' : log.type === 'success' ? 'text-emerald-400' : 'text-amber-400'
                                            }`}
                                    >
                                        {log.type === 'error' ? '✖ [ERR] ' : log.type === 'success' ? '✔ [OK] ' : 'ℹ [SYS] '}
                                        {log.text}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>

                {/* MODAL ACTION BAR FOOTER */}
                <div className="p-6 md:p-8 border-t border-slate-900 bg-slate-950/40 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4">
                    <button
                        onClick={handleSafeClose}
                        disabled={isProcessing}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-semibold border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700 disabled:opacity-40 disabled:pointer-events-none transition-all duration-200"
                    >
                        Close Diagnostics
                    </button>

                    <button
                        onClick={() => triggerActionPipeline("global-sync")}
                        disabled={isProcessing}
                        className={`w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold bg-gradient-to-r shadow-lg shadow-emerald-500/5 ${activeTheme.button} active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none transition-all duration-200`}
                    >
                        {isProcessing ? "Awaiting Core..." : "Commit Changes System-Wide"}
                    </button>
                </div>

            </div>
        </div>
    );
}