/**
 * ============================================================================
 * L10 DISTINGUISHED PRINCIPAL FRONTEND ATOMIC COMPONENT
 * COMPONENT: ProjectsCard
 * PARADIGM: Pure Functional Component, O(1) Token Memory Inversion Lookup,
 * Zero Layout Thrashing Render Contract, High-Performance Micro-Engine.
 * DESIGN SPEC: Cyberpunk Glassmorphic Micro-Matrix Card Blueprint
 * ============================================================================
 */

import React, { useMemo, memo } from "react";

// ============================================================================
// 1. IMMUTABLE ARCHITECTURAL CONFIGURATIONS & THEME REGISTRIES
// ============================================================================
const POLYMORPHIC_STYLE_MAP = Object.freeze({
    BACKEND_DJANGO: {
        cardWrapper: "relative group backdrop-blur-xl bg-slate-900/40 rounded-xl border border-emerald-500/10 p-6 hover:border-emerald-500/30 transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.02)]",
        badge: "px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
        glowEffect: "absolute -inset-px bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-sm",
        techBadgeClass: "px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-900 text-[11px] font-mono hover:text-emerald-400 hover:border-emerald-500/20 transition-colors"
    },
    BACKEND_NODE: {
        cardWrapper: "relative group backdrop-blur-xl bg-slate-900/40 rounded-xl border border-cyan-500/10 p-6 hover:border-cyan-500/30 transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.02)]",
        badge: "px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
        glowEffect: "absolute -inset-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-sm",
        techBadgeClass: "px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-900 text-[11px] font-mono hover:text-cyan-400 hover:border-cyan-500/20 transition-colors"
    }
});

const METRICS_LABEL_LOOKUP = Object.freeze([
    { dataKey: "scaleFactor", label: "CAPACITY" },
    { dataKey: "throughput", label: "THROUGHPUT" },
    { dataKey: "DBReplica", label: "DB_TOPOLOGY" }
]);

// ============================================================================
// 2. MEMOIZED PURE ATOMIC CARD ENGINE
// ============================================================================
const ProjectsCard = memo(({ projectNode }) => {

    // Guard Clause Contract: Protect DOM against invalid data-stream leaks
    if (!projectNode || !projectNode.projectId) {
        return (
            <div className="p-4 border border-dashed border-rose-500/30 rounded-xl text-xs font-mono text-rose-400 bg-rose-950/10">
                [FAULT_INTERCEPT]: Ingress project packet failed schema verification.
            </div>
        );
    }

    // Memoize Strategy Extraction to Eliminate Allocation Spill Over Re-renders
    const componentVisualBlueprint = useMemo(() => {
        const matchedStrategy = POLYMORPHIC_STYLE_MAP[projectNode.stackType] || POLYMORPHIC_STYLE_MAP.BACKEND_NODE;
        return Object.freeze({ ...matchedStrategy });
    }, [projectNode.stackType]);

    return (
        <section className={componentVisualBlueprint.cardWrapper}>
            {/* Laser Glow Layer Boundary */}
            <div className={componentVisualBlueprint.glowEffect} />

            {/* Meta Identity Descriptor Row */}
            <div className="flex justify-between items-start mb-4 relative z-10">
                <span className="font-mono text-xs text-slate-500 tracking-wider">
                    [{projectNode.projectId}] // {projectNode.k8sTargetPod || "pod-unassigned"}
                </span>
                <span className={componentVisualBlueprint.badge}>
                    {String(projectNode.stackType || "NODE").replace("BACKEND_", "")} CORE
                </span>
            </div>

            {/* Title & Vector Headers */}
            <div className="mb-4 relative z-10">
                <h2 className="text-xl font-bold text-slate-100 group-hover:text-cyan-400/90 transition-colors duration-300">
                    {projectNode.title}
                </h2>
                <p className="text-xs font-mono text-slate-400 mt-1">
                    {projectNode.subheading}
                </p>
            </div>

            {/* Abstract Domain Context */}
            <p className="text-sm text-slate-400 leading-relaxed mb-6 relative z-10">
                {projectNode.description}
            </p>

            {/* Declarative Compute Telemetry Grid */}
            <div className="grid grid-cols-3 gap-2 bg-slate-950/80 p-3 rounded border border-slate-900 font-mono text-[11px] mb-6 relative z-10">
                {METRICS_LABEL_LOOKUP.map((metricSpec) => (
                    <div key={`${projectNode.projectId}-metric-${metricSpec.dataKey}`}>
                        <span className="block text-slate-500 uppercase">{metricSpec.label}</span>
                        <span className="block text-slate-200 font-bold">
                            {projectNode.metrics?.[metricSpec.dataKey] || "N/A"}
                        </span>
                    </div>
                ))}
            </div>

            {/* Technology Vector Tags Stack */}
            <div className="relative z-10">
                <h4 className="text-[10px] font-mono font-bold text-slate-600 tracking-wider uppercase mb-2">
                    Ingested Technology Vectors
                </h4>
                <div className="flex flex-wrap gap-1.5 relative z-10">
                    {(projectNode.technologies || []).slice(0, 6).map((tech) => (
                        <span
                            key={tech}
                            className={componentVisualBlueprint.techBadgeClass}
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
});

// Set Display Name for Advanced Production DevTools Debug Tracking Loops
ProjectsCard.displayName = "ProjectsCard";

export default ProjectsCard;