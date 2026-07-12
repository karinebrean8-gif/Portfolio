/**
 * ============================================================================
 * PORTFOLIO PRESENTATION LAYER: ENTERPRISE INTERACTIVE VIEWPORT ENGINE
 * Core Pattern: JSON Invariant Manifests, Dictionary Route Mappers
 * Architecture Standard: React 18 / React 19 Production Ready
 * ============================================================================
 */

import React, { useState, useMemo, useCallback } from 'react';

// 1. SYSTEM CONTRACT MANIFEST (Pure Isolated Data-Driven Configuration Model)
const VIEWER_SYSTEM_MANIFEST = {
    "ENGINE_METADATA": {
        "signature": "VIEWER-CORE-v909.8-PROD",
        "tier": "Principal-Presentation-Layer",
        "specification": "Zero-Conditional-State-Router"
    },
    "CERTIFICATES_DATABASE": [
        { "id": "C01", "title": "Virtualization, Docker, and Kubernetes for Data Engineering", "issuer": "Duke University", "issued": "Jun 2026", "expires": "Apr 2035", "hash": "3CCYPNBIEK26", "track": "Cloud & DevOps", "skills": ["Docker", "Kubernetes", "Data Engineering"] },
        { "id": "C02", "title": "Accelerate Your Job Search with AI", "issuer": "Google", "issued": "Jun 2026", "expires": "Jun 2036", "hash": "8NSHZKDSCL16", "track": "AI Systems", "skills": ["AI Workflows", "Prompt Eng", "Strategy"] },
        { "id": "C03", "title": "AWS Cloud Practitioner Essentials", "issuer": "Amazon Web Services", "issued": "Jun 2026", "expires": "Sep 2036", "hash": "HTPJ07B98G54", "track": "Cloud & DevOps", "skills": ["AWS Cloud", "Economics", "Infrastructure"] },
        { "id": "C04", "title": "Full Stack Software Developer Assessment", "issuer": "IBM", "issued": "May 2026", "expires": "Jun 2036", "hash": "VH0MLV842PP4", "track": "Software Engineering", "skills": ["Assessment", "Architecture", "Full-Stack"] },
        { "id": "C05", "title": "Introduction to Software Engineering", "issuer": "IBM", "issued": "Jun 2026", "expires": "Sep 2036", "hash": "HZ28FS7TZXR1", "track": "Software Engineering", "skills": ["SDLC", "Agile Core", "Engineering"] },
        { "id": "C06", "title": "Full-Stack Developer Capstone Project", "issuer": "Microsoft", "issued": "Jun 2026", "expires": "Jun 2036", "hash": "8BOCR2L2NPME", "track": "Software Engineering", "skills": ["Next.js", "System Arch", "Production"] },
        { "id": "C07", "title": "Getting Started with Git and GitHub", "issuer": "IBM", "issued": "Jun 2026", "expires": "Jul 2036", "hash": "SGT8CVAL48OQ", "track": "Software Engineering", "skills": ["Git", "GitHub Actions", "VCS"] },
        { "id": "C08", "title": "APIs", "issuer": "Meta", "issued": "Jun 2026", "expires": "Aug 2036", "hash": "EJH8P9B7D9PG", "track": "Backend Engineering", "skills": ["REST APIs", "API Design", "Ingress"] },
        { "id": "C09", "title": "Microservice Architectures", "issuer": "Vanderbilt University", "issued": "Jun 2026", "expires": "Oct 2036", "hash": "ENB1OVY7NEOM", "track": "Backend Engineering", "skills": ["Distributed Systems", "Microservices"] },
        { "id": "C10", "title": "Django Web Framework", "issuer": "Meta", "issued": "Jun 2026", "expires": "Permanent", "hash": "MT4OBCGZSXC3", "track": "Backend Engineering", "skills": ["Python", "Django", "MVC Framework"] },
        { "id": "C11", "title": "Developing Back-End Apps with Node.js and Express", "issuer": "IBM", "issued": "Jun 2026", "expires": "Jan 2036", "hash": "UNNXMXRIIO69", "track": "Backend Engineering", "skills": ["Node.js", "Express.js", "Async Ingress"] },
        { "id": "C12", "title": "Developing Front-End Apps with React", "issuer": "IBM", "issued": "Jun 2026", "expires": "Jun 2026", "hash": "CB7P5PSKFESH", "track": "Frontend Engineering", "skills": ["React.js", "Redux.js", "State"] }
    ],
    "COMPLEMENTARY_METRICS": [
        { "domain": "Database Clusters & High Availability", "nodes": ["PostgreSQL", "MySQL", "Prisma ORM", "Sharded Architecture"] },
        { "domain": "Systems Aesthetics & Product Topology", "nodes": ["UI/UX Engineering", "Design Tokens Optimization", "Figma Core"] },
        { "domain": "Algorithmic Engineering Metrics", "nodes": ["Google Technical Leadership", "Google Project Management", "LeetCode 130+ Verified Solved"] }
    ]
};

// 2. DOMAIN RECONCILIATION STATES & COLOR ENUMS (O(1) Style Registries)
const KERNEL_STATES = {
    IDLE: 'STATE_IDLE_STANDBY',
    DECRYPTING: 'STATE_DECRYPTING_HASH',
    VERIFIED_SECURE: 'STATE_VERIFIED_OPTIMAL'
};

const ISSUER_AESTHETICS_DICTIONARY = {
    "Duke University": { border: "border-blue-500/20", glow: "shadow-blue-950/20", badge: "bg-blue-950 text-blue-400" },
    "Google": { border: "border-red-500/20", glow: "shadow-red-950/20", badge: "bg-red-950 text-red-400" },
    "Amazon Web Services": { border: "border-amber-500/20", glow: "shadow-amber-950/20", badge: "bg-amber-950 text-amber-400" },
    "IBM": { border: "border-cyan-500/20", glow: "shadow-cyan-950/20", badge: "bg-cyan-950 text-cyan-400" },
    "Microsoft": { border: "border-teal-500/20", glow: "shadow-teal-950/20", badge: "bg-teal-950 text-teal-400" },
    "Meta": { border: "border-indigo-500/20", glow: "shadow-indigo-950/20", badge: "bg-indigo-950 text-indigo-400" },
    "Vanderbilt University": { border: "border-yellow-600/20", glow: "shadow-yellow-950/20", badge: "bg-yellow-950 text-yellow-500" }
};

const TELEMETRY_MUTATION_MAP = {
    [KERNEL_STATES.IDLE]: { header: "text-slate-500", label: "bg-slate-900 text-slate-500", alert: "WAITING_FOR_TOKEN_INGRESS" },
    [KERNEL_STATES.DECRYPTING]: { header: "text-amber-400 animate-pulse", label: "bg-amber-950 text-amber-400", alert: "COMPUTING_MERKLE_PROOF_STREAM" },
    [KERNEL_STATES.VERIFIED_SECURE]: { header: "text-emerald-400", label: "bg-emerald-950 text-emerald-400", alert: "CRYPTOGRAPHIC_SIGNATURE_MATCH" }
};

// ============================================================================
// MAIN COMPONENT MODULE
// ============================================================================
export default function CertificateViewer() {
    const [activeToken, setActiveToken] = useState(null);
    const [kernelState, setKernelState] = useState(KERNEL_STATES.IDLE);

    /**
     * Spawns an asynchronous processing stream validating certificate hashes
     */
    const interceptAndVerifyCredentials = useCallback(async (tokenPayload) => {
        setActiveToken(tokenPayload);
        setKernelState(KERNEL_STATES.DECRYPTING);

        // Dynamic delay mapping representing async operation simulation
        await new Promise((resolveThread) => setTimeout(resolveThread, 550));
        setKernelState(KERNEL_STATES.VERIFIED_SECURE);
    }, []);

    const clearInspectorChannel = useCallback(() => {
        setActiveToken(null);
        setKernelState(KERNEL_STATES.IDLE);
    }, []);

    // Compute active telemetry profiles on state shifts without a single if-else branch
    const activeTelemetryTheme = useMemo(() => {
        return TELEMETRY_MUTATION_MAP[kernelState] || TELEMETRY_MUTATION_MAP[KERNEL_STATES.IDLE];
    }, [kernelState]);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500/20 py-24 px-6 md:px-12 lg:px-24">

            {/* HEADER SPECS ARCHITECTURE */}
            <header className="max-w-7xl mx-auto mb-16 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono tracking-widest text-emerald-400 uppercase rounded-full bg-emerald-950/40 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    VERIFIED INGRESS VIEWPORT HUB
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-100">
                    Systems Infrastructure <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Viewer Engine</span>
                </h1>
            </header>

            {/* SYSTEM CONTROL COMPONENT SPLIT VIEW GRID */}
            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT COMPONENT COLUMN: ACTIVE TELEMETRY REGISTRY INGEST MAPS */}
                <section className="lg:col-span-2 space-y-2.5 max-h-[75vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800">
                    {VIEWER_SYSTEM_MANIFEST.CERTIFICATES_DATABASE.map((certificate) => {
                        const currentIssuerBrand = ISSUER_AESTHETICS_DICTIONARY[certificate.issuer] || { border: "border-slate-900", glow: "", badge: "bg-slate-900 text-slate-500" };
                        const isActiveSelection = activeToken?.id === certificate.id;
                        const containerActiveStates = isActiveSelection ? "border-emerald-500/50 bg-slate-900/40 shadow-md" : "border-slate-900 bg-slate-900/10";

                        return (
                            <div
                                key={certificate.id}
                                onClick={() => interceptAndVerifyCredentials(certificate)}
                                className={`p-4 rounded-lg border ${containerActiveStates} ${currentIssuerBrand.border} ${currentIssuerBrand.glow} hover:border-slate-700 hover:bg-slate-900/20 transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 group`}
                            >
                                <div className="space-y-1">
                                    <h3 className="text-sm font-bold text-slate-200 group-hover:text-emerald-400 transition-colors duration-150 line-clamp-1">
                                        {certificate.title}
                                    </h3>
                                    <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
                                        <span className="text-slate-400">{certificate.issuer}</span>
                                        <span>·</span>
                                        <span className="text-slate-500 group-hover:text-slate-400 transition-colors duration-150">{certificate.hash}</span>
                                    </div>
                                </div>
                                <div className="text-[10px] font-mono text-slate-600 group-hover:text-emerald-400 transition-colors duration-150 tracking-wider uppercase shrink-0">
                  // Fetch_Node
                                </div>
                            </div>
                        );
                    })}
                </section>

                {/* RIGHT COMPONENT COLUMN: REAL-TIME SECURE ISOLATION HOVER CONTEXT INSPECTOR */}
                <section className="relative">
                    {!activeToken ? (
                        <div className="h-full min-h-[350px] border border-dashed border-slate-900 rounded-lg flex flex-col items-center justify-center p-8 text-center text-slate-600 font-mono text-xs leading-relaxed">
                            [ NO CARD INTERCEPTED FOR REGISTRY VALIDATION ]<br />Select a system credential token to initialize remote checksum mapping profiles.
                        </div>
                    ) : (
                        <aside className="sticky top-6 p-6 rounded-lg bg-slate-900/20 border border-slate-900 space-y-6 animate-fade-in">

                            {/* Telemetry Actions Header Line */}
                            <div className="flex items-center justify-between border-b border-slate-900 pb-4">
                                <h2 className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                                    Registry Inspector
                                </h2>
                                <button
                                    onClick={clearInspectorChannel}
                                    className="text-xs font-mono text-slate-500 hover:text-rose-400 cursor-pointer bg-transparent border-none outline-none"
                                >
                                    [ drop_stream ]
                                </button>
                            </div>

                            {/* Dynamic State Verification Metrics Indicator Block */}
                            <div className="space-y-2 font-mono">
                                <div className="text-[10px] text-slate-500 uppercase tracking-widest">Crypto Engine Status</div>
                                <span className={`inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase rounded ${activeTelemetryTheme.label}`}>
                                    {activeTelemetryTheme.alert}
                                </span>
                            </div>

                            {/* Specification Breakdown Metadata Nodes */}
                            <div className="space-y-4 pt-2">
                                <div>
                                    <label className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">Entity Core Classification</label>
                                    <span className="text-sm font-bold text-slate-200 block mt-0.5">{activeToken.title}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">Authority</label>
                                        <span className="text-xs font-semibold text-slate-300 block mt-0.5">{activeToken.issuer}</span>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">Epoch Delta</label>
                                        <span className="text-xs font-mono text-slate-400 block mt-0.5">{activeToken.issued} · {activeToken.expires}</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">Verified Secure Key Hash String</label>
                                    <span className="text-xs font-mono text-emerald-400 bg-slate-950/60 border border-slate-900/60 px-2 py-1.5 rounded block mt-1 break-all select-all font-semibold shadow-inner">
                                        {activeToken.hash}
                                    </span>
                                </div>

                                <div className="pt-2">
                                    <label className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider mb-2">Acquired Skill Domains Matrix</label>
                                    <div className="flex flex-wrap gap-1">
                                        {activeToken.skills.map((tokenSkill, idx) => (
                                            <span
                                                key={idx}
                                                className="text-[10px] font-mono bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-900"
                                            >
                                                {tokenSkill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </aside>
                    )}
                </section>
            </main>

            {/* MATRIX COMPLEMENTARY ACCOMPLISHMENTS PERSISTENCE LAYER DISPLAY SECTION */}
            <footer className="max-w-7xl mx-auto mt-16 pt-12 border-t border-slate-900">
                <h2 className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-8">
                    Continuous Specialization Verticals & Performance Channels
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {VIEWER_SYSTEM_MANIFEST.COMPLEMENTARY_METRICS.map((metricNode, index) => (
                        <div
                            key={index}
                            className="p-5 rounded-lg bg-slate-900/10 border border-slate-900/60 flex flex-col justify-between gap-4"
                        >
                            <h4 className="text-xs font-mono text-slate-400 font-bold border-b border-slate-900 pb-2">
                                {metricNode.domain}
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                                {metricNode.nodes.map((nodeEntity, entityIdx) => (
                                    <span
                                        key={entityIdx}
                                        className="px-2 py-0.5 text-[10px] font-mono bg-slate-950 text-emerald-400/80 border border-emerald-500/5 rounded"
                                    >
                                        {nodeEntity}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </footer>

        </div>
    );
}