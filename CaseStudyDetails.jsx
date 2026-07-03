import React, { useState, useEffect, useMemo } from 'react';

// ============================================================================
// SYSTEM ARCHITECTURE CONFIGURATION & ENUMS (Domain Layer Definitions)
// ============================================================================
const PIPELINE_STATUS = {
    IDLE: 'STATUS_IDLE',
    HYDRATING: 'STATUS_HYDRATING',
    VERIFIED: 'STATUS_VERIFIED',
    FAULT: 'STATUS_FAULT'
};

const INCIDENT_SEVERITY = {
    L1_MISSION_CRITICAL: 'L1',
    L2_PERFORMANCE_DEGRADATION: 'L2',
    L3_TECHNICAL_DEBT: 'L3'
};

const SEVERITY_BADGES = {
    [INCIDENT_SEVERITY.L1_MISSION_CRITICAL]: 'bg-rose-950/60 border border-rose-800/80 text-rose-400',
    [INCIDENT_SEVERITY.L2_PERFORMANCE_DEGRADATION]: 'bg-amber-950/60 border border-amber-800/80 text-amber-400',
    [INCIDENT_SEVERITY.L3_TECHNICAL_DEBT]: 'bg-cyan-950/60 border border-cyan-800/80 text-cyan-400'
};

// ============================================================================
// INFRASTRUCTURE SERVICES & CORE PROMISE PIPELINES
// ============================================================================
const DeepTelemetryAnalyzer = {
    runDiagnosticCheck: (studyId) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!studyId) {
                    reject(new Error("Architectural Violation: Context identifier missing."));
                } else {
                    resolve({
                        timestamp: new Date().toISOString(),
                        integrityScore: 99.997,
                        replicaSyncState: "SYNCHRONIZED_ACTIVE_ACTIVE",
                        threadPoolUtilization: "14.2%"
                    });
                }
            }, 750);
        });
    }
};

// ============================================================================
// PRESENTATION LAYER ARCHITECTURE
// ============================================================================
export default function CaseStudiesDetails({ selectedStudy, onResetContext }) {
    const [pipelineState, setPipelineState] = useState(PIPELINE_STATUS.IDLE);
    const [diagnosticMetrics, setDiagnosticMetrics] = useState(null);
    const [activeTab, setActiveTab] = useState('ARCHITECTURE_MANIFEST');

    const {
        id = "UNASSIGNED",
        title = "System Matrix Node",
        client = "Global Enterprise Entity",
        sector = "Core Technology",
        impactSummary = "",
        architecture = { layer: "UNKNOWN", description: "", highlights: [] },
        narrative = [],
        tags = []
    } = selectedStudy || {};

    useEffect(() => {
        if (!selectedStudy?.id) {
            setPipelineState(PIPELINE_STATUS.IDLE);
            return;
        }

        let isThreadActive = true;
        setPipelineState(PIPELINE_STATUS.HYDRATING);

        DeepTelemetryAnalyzer.runDiagnosticCheck(selectedStudy.id)
            .then((payload) => {
                if (isThreadActive) {
                    setDiagnosticMetrics(payload);
                    setPipelineState(PIPELINE_STATUS.VERIFIED);
                }
            })
            .catch((error) => {
                if (isThreadActive) {
                    console.error("[CRITICAL PROTOCOL ERROR] Isolation Failed:", error);
                    setPipelineState(PIPELINE_STATUS.FAULT);
                }
            });

        return () => {
            isThreadActive = false;
        };
    }, [selectedStudy?.id]);

    const executionTabs = useMemo(() => {
        return [
            { key: 'ARCHITECTURE_MANIFEST', label: 'Systems Blueprint', count: architecture?.highlights?.length || 0 },
            { key: 'NARRATIVE_LOGS', label: 'Retrospective Logs', count: narrative?.length || 0 },
            { key: 'TELEMETRY_ENGINE', label: 'Telemetry Diagnostics', count: diagnosticMetrics ? 4 : 0 }
        ];
    }, [architecture?.highlights, narrative?.length, diagnosticMetrics]);

    if (!selectedStudy) {
        return (
            <div className="w-full h-[600px] bg-slate-950/40 border border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center p-8 text-center">
                <div className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-500 font-mono font-bold mb-4 animate-pulse">
          //
                </div>
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-400">System Pipeline Dormant</h3>
                <p className="text-xs text-slate-500 max-w-xs mt-2 leading-relaxed">
                    Select an architectural case study module from the master listing index matrix to map data across visual layers.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full bg-slate-900/40 border border-slate-800 rounded-2xl p-6 lg:p-10 shadow-2xl backdrop-blur-md space-y-8 animate-[fadeIn_0.3s_ease-out]">

            {/* 1. TOP PIPELINE AND CONTROL INFRASTRUCTURE BAR */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                    {pipelineState === PIPELINE_STATUS.HYDRATING && (
                        <span className="flex h-3 w-3 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                        </span>
                    )}
                    {pipelineState === PIPELINE_STATUS.VERIFIED && (
                        <span className="h-3 w-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/40 animate-pulse" />
                    )}
                    {pipelineState === PIPELINE_STATUS.FAULT && (
                        <span className="h-3 w-3 rounded-full bg-rose-500 shadow-lg shadow-rose-500/40" />
                    )}
                    {pipelineState === PIPELINE_STATUS.IDLE && (
                        <span className="h-3 w-3 rounded-full bg-slate-600" />
                    )}

                    <div className="font-mono text-xs font-bold tracking-tight text-slate-400">
                        {pipelineState === PIPELINE_STATUS.HYDRATING && 'STATUS // INGESTING_TELEMETRY'}
                        {pipelineState === PIPELINE_STATUS.VERIFIED && 'STATUS // SHIELD_INTEGRITY_MAX'}
                        {pipelineState === PIPELINE_STATUS.FAULT && 'STATUS // DISCONNECTED_RUNTIME'}
                        {pipelineState === PIPELINE_STATUS.IDLE && 'STATUS // STANDBY'}
                    </div>
                </div>

                {typeof onResetContext === 'function' && (
                    <button
                        onClick={onResetContext}
                        className="px-3 py-1 bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 rounded-lg text-xs font-mono transition-colors"
                    >
                        ← FLUSH_CONTEXT
                    </button>
                )}
            </div>

            {/* 2. SYSTEM HEADER & DEEP IDENTITY MATRIX */}
            <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase bg-slate-950 border border-slate-800/80 px-2.5 py-0.5 rounded text-cyan-400">
                        {sector}
                    </span>
                    <span className="text-[10px] font-mono tracking-tight text-slate-500">
                        NODE_REF // {id}
                    </span>
                </div>
                <h2 className="text-2xl lg:text-4xl font-extrabold tracking-tight text-slate-100 leading-tight">
                    {title}
                </h2>
                <div className="text-xs text-slate-400 font-mono">
                    Orchestrated Enterprise: <span className="text-slate-200 font-bold">{client}</span>
                </div>
            </div>

            {/* 3. CORE ABSTRACT LAYER */}
            <div className="p-4 bg-slate-950/40 border border-slate-800/60 rounded-xl">
                <h4 className="text-[10px] font-mono uppercase font-bold tracking-wider text-slate-500 mb-1.5">// EXECUTIVE ARCHITECTURAL SUMMARY</h4>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">{impactSummary}</p>
            </div>

            {/* 4. DYNAMIC MULTI-SEGMENT NAVIGATION TAB PANEL */}
            <div className="border-b border-slate-800">
                <nav className="flex flex-wrap gap-1 -mb-px">
                    {executionTabs.map((tab) => {
                        const isTabActive = activeTab === tab.key;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-4 py-2.5 font-mono text-xs font-bold uppercase border-b-2 tracking-tighter transition-all duration-200 ${isTabActive
                                        ? 'border-emerald-500 text-emerald-400 bg-emerald-950/10'
                                        : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                                    }`}
                            >
                                {tab.label} <span className="text-[9px] opacity-40 ml-1">({tab.count})</span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* 5. MULTI-LAYER CONDITIONAL DISPLAY ENGINE */}
            <div className="min-h-[250px]">
                {activeTab === 'ARCHITECTURE_MANIFEST' && (
                    <div className="space-y-6 animate-[fadeIn_0.2s_ease-out]">
                        <div className="space-y-2">
                            <span className="text-[11px] font-mono font-bold tracking-widest text-indigo-400 uppercase bg-indigo-950/40 border border-indigo-900/60 px-2.5 py-0.5 rounded-full">
                                {architecture?.layer || 'GENERAL'} LAYER ARCHITECTURE
                            </span>
                            <p className="text-sm text-slate-400 leading-relaxed font-sans pt-1">
                                {architecture?.description}
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h5 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">// CRITICAL INVARIANT VERIFICATIONS</h5>
                            <div className="grid grid-cols-1 gap-2">
                                {architecture?.highlights?.map((highlight, index) => (
                                    <div key={index} className="flex items-start gap-3 p-3 bg-slate-950/60 border border-slate-800/40 rounded-xl">
                                        <span className="text-xs font-mono font-bold text-emerald-500 bg-emerald-950/60 border border-emerald-900/50 px-1.5 py-0.5 rounded">
                                            #{index + 1}
                                        </span>
                                        <span className="text-xs text-slate-300 leading-relaxed font-sans">{highlight}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'NARRATIVE_LOGS' && (
                    <div className="space-y-6 animate-[fadeIn_0.2s_ease-out]">
                        {narrative.length > 0 ? (
                            <div className="space-y-6">
                                {narrative.map((section, idx) => {
                                    // Fallback fallback handling sequence dynamic validation rule
                                    const badgeStyle = SEVERITY_BADGES[section.severity] || 'bg-slate-950 border border-slate-800 text-slate-400';

                                    return (
                                        <div key={idx} className="relative pl-4 border-l border-slate-800 space-y-1.5">
                                            <div className="absolute top-2 -left-[4.5px] h-2 w-2 rounded-full bg-slate-700" />

                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h5 className="text-sm font-bold tracking-tight text-slate-200">
                                                    {section.heading || `Incident Step ${idx + 1}`}
                                                </h5>

                                                {/* Dynamic Severity Badge Engine Matrix */}
                                                {section.severity && (
                                                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono tracking-widest font-bold uppercase ${badgeStyle}`}>
                                                        {section.severity}
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-xs text-slate-400 leading-relaxed font-sans">
                                                {section.content}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-xs font-mono text-slate-500 py-8 text-center border border-dashed border-slate-800 rounded-xl">
                                No telemetry narrative blocks indexed for this instance deployment.
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'TELEMETRY_ENGINE' && (
                    <div className="space-y-4 animate-[fadeIn_0.2s_ease-out]">
                        {pipelineState === PIPELINE_STATUS.HYDRATING ? (
                            <div className="space-y-3 p-6 text-center text-xs font-mono text-slate-500">
                                <div className="animate-spin h-4 w-4 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto" />
                                <p>Syncing across cluster partitions...</p>
                            </div>
                        ) : diagnosticMetrics ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                                    <span className="text-slate-500">INGESTION_TIMESTAMP</span>
                                    <span className="text-slate-300 tracking-tight">{diagnosticMetrics.timestamp}</span>
                                </div>
                                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                                    <span className="text-slate-500">REPLICA_TOPOLOGY</span>
                                    <span className="text-cyan-400 font-bold">{diagnosticMetrics.replicaSyncState}</span>
                                </div>
                                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                                    <span className="text-slate-500">THREAD_POOL_LOAD</span>
                                    <span className="text-emerald-400 font-bold">{diagnosticMetrics.threadPoolUtilization}</span>
                                </div>
                                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                                    <span className="text-slate-500">DATA_INTEGRITY_INDEX</span>
                                    <span className="text-amber-400 font-bold">{diagnosticMetrics.integrityScore}%</span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-xs font-mono text-slate-500 py-8 text-center border border-dashed border-slate-800 rounded-xl">
                                Telemetry pipelines missing runtime connection framework.
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* 6. GLOBAL FOOTER PACKING TAG MATRICES */}
            {tags.length > 0 && (
                <div className="border-t border-slate-800/80 pt-6 space-y-3">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">// COMPRESSED ECOSYSTEM COMPILER CONTEXT</div>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="text-xs font-mono px-3 py-1 bg-slate-950 border border-slate-800 text-slate-400 rounded-lg shadow-sm hover:border-emerald-500/30 hover:text-slate-200 transition-colors duration-150 cursor-default"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}