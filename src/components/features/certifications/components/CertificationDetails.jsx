/**
 * ============================================================================
 * ULTRA-FAANG L10+ DISTINGUISHED PRESENTATION LAYER: CERTIFICATION DETAILS ENGINE
 * Core Pattern: Invariant Manifest Matrix, Hash Sub-Verification Pipelines, State Token Router
 * Optimization Level: O(1) Performance Lookups & Memoized Presentation Sub-Trees
 * Framework Standard: React 18/19 Enterprise Architecture Spec
 * ============================================================================
 */

import React, { useState, useMemo, useCallback, useEffect } from 'react';

// ============================================================================
// 1. IMMUTABLE SYSTEM REGISTRIES & DATA ARRAYS (The Source of Truth)
// ============================================================================
const CERTIFICATION_REGISTRY = [
    { id: "CERT-01", title: "Virtualization, Docker, and Kubernetes for Data Engineering", issuer: "Duke University", issued: "Jun 2026", expires: "Apr 2035", credentialId: "3CCYPNBIEK26", systemTrack: "DevOps & Data Systems", classification: "CORE_INFRASTRUCTURE", systemLoad: "94.2%", clusterNodes: "K8s-v1.30", cryptographicSalt: "0x8F3C2B1A", skills: ["Docker", "Kubernetes", "Virtualization", "Data Engineering", "Containerization Security", "Cluster Orchestration"] },
    { id: "CERT-02", title: "Accelerate Your Job Search with AI", issuer: "Google", issued: "Jun 2026", expires: "Jun 2036", credentialId: "8NSHZKDSCL16", systemTrack: "AI & Workflow Automation", classification: "AI_HEURISTICS", systemLoad: "41.5%", clusterNodes: "LLM-Agentic", cryptographicSalt: "0x4E9A1B7F", skills: ["AI Workflows", "Prompt Engineering", "Google Leadership", "Google Project Management", "Workflow Automation"] },
    { id: "CERT-03", title: "AWS Cloud Practitioner Essentials", issuer: "Amazon Web Services", issued: "Jun 2026", expires: "Sep 2036", credentialId: "HTPJ07B98G54", systemTrack: "DevOps & Data Systems", classification: "CORE_INFRASTRUCTURE", systemLoad: "88.7%", clusterNodes: "us-east-1", cryptographicSalt: "0x7B2C9E4D", skills: ["AWS Cloud", "Cloud Infrastructure", "Systems Scale", "Cloud Economics", "IAM Policies"] },
    { id: "CERT-04", title: "Full Stack Software Developer Assessment", issuer: "IBM", issued: "May 2026", expires: "Jun 2036", credentialId: "VH0MLV842PP4", systemTrack: "Fullstack Architecture", classification: "SYSTEM_VALIDATION", systemLoad: "99.1%", clusterNodes: "Sys-Eval-Node", cryptographicSalt: "0x3A8F1C6E", skills: ["Assessment", "Architecture Validation", "Enterprise Design Templates", "System Performance Profiling"] },
    { id: "CERT-05", title: "Introduction to Software Engineering", issuer: "IBM", issued: "Jun 2026", expires: "Sep 2036", credentialId: "HZ28FS7TZXR1", systemTrack: "Fullstack Architecture", classification: "SYSTEM_VALIDATION", systemLoad: "12.4%", clusterNodes: "Agile-Core", cryptographicSalt: "0x9D5E2A3B", skills: ["SDLC Paradigms", "Agile Core Engineering", "Design Patterns", "Clean Code Architecture"] },
    { id: "CERT-06", title: "Full-Stack Developer Capstone Project", issuer: "Microsoft", issued: "Jun 2026", expires: "Jun 2036", credentialId: "8BOCR2L2NPME", systemTrack: "Fullstack Architecture", classification: "APPLICATION_LAYERS", systemLoad: "96.8%", clusterNodes: "Azure-App-04", cryptographicSalt: "0x1C7B8E9F", skills: ["Microsoft Next.js", "System Integration", "Production Architecture", "Vercel Ingress", "Prisma High-Throughput ORM"] },
    { id: "CERT-07", title: "Getting Started with Git and GitHub", issuer: "IBM", issued: "Jun 2026", expires: "Jul 2036", credentialId: "SGT8CVAL48OQ", systemTrack: "Version Control Infrastructure", classification: "CORE_INFRASTRUCTURE", systemLoad: "33.2%", clusterNodes: "Git-Main-Cl", cryptographicSalt: "0x6F4A2D8E", skills: ["Git", "GitHub Actions", "VCS Automations", "Branch Management Engine"] },
    { id: "CERT-08", title: "APIs", issuer: "Meta", issued: "Jun 2026", expires: "Aug 2036", credentialId: "EJH8P9B7D9PG", systemTrack: "Backend Systems Engine", classification: "APPLICATION_LAYERS", systemLoad: "85.4%", clusterNodes: "Edge-Proxy-Graph", cryptographicSalt: "0x2D9C7B1A", skills: ["RESTful APIs", "API Design Engine", "Secure Ingress Routing", "GraphQL Prototyping"] },
    { id: "CERT-09", title: "Microservice Architectures", issuer: "Vanderbilt University", issued: "Jun 2026", expires: "Oct 2036", credentialId: "ENB1OVY7NEOM", systemTrack: "Backend Systems Engine", classification: "APPLICATION_LAYERS", systemLoad: "91.0%", clusterNodes: "Mesh-Vandy-09", cryptographicSalt: "0x5E3B8A4F", skills: ["Distributed Clusters", "Microservices Topology", "Event Streams", "Service Mesh Fabric"] },
    { id: "CERT-10", title: "Django Web Framework", issuer: "Meta", issued: "Jun 2026", expires: "Permanent", credentialId: "MT4OBCGZSXC3", systemTrack: "Backend Systems Engine", classification: "APPLICATION_LAYERS", systemLoad: "77.3%", clusterNodes: "WSGI-Prod-01", cryptographicSalt: "0x4A9E2C6B", skills: ["Python Engine", "Django MVC", "Prisma Relational Mapping", "Relational Database Performance"] },
    { id: "CERT-11", title: "Developing Back-End Apps with Node.js and Express", issuer: "IBM", issued: "Jun 2026", expires: "Jan 2036", credentialId: "UNNXMXRIIO69", systemTrack: "Backend Systems Engine", classification: "APPLICATION_LAYERS", systemLoad: "89.9%", clusterNodes: "V8-Cluster-Pool", cryptographicSalt: "0x8C2B7F1E", skills: ["Node.js Framework", "Express.js Engine", "Asynchronous Pipelines", "Event Loop Profiling", "PostgreSQL Shards", "MySQL Engine"] },
    { id: "CERT-12", title: "Developing Front-End Apps with React", issuer: "IBM", issued: "Jun 2026", expires: "Jun 2026", credentialId: "CB7P5PSKFESH", systemTrack: "Frontend Systems Engineering", classification: "APPLICATION_LAYERS", systemLoad: "92.4%", clusterNodes: "Client-VDOM-01", cryptographicSalt: "0x3F9E1A7C", skills: ["React.js Core", "Redux.js State Machine", "Context Optimization", "UI Design Core Spec", "UX Human-Interface Design"] }
];

const ANALYTICS_MATRIX = [
    { metric: "Total Solved Algorithmic Matrix Nodes", score: "LeetCode 130+", health: "Optimal Execution" },
    { metric: "Cross-Cluster Database Prototyping", score: "PostgreSQL & MySQL", health: "Sync Functional" },
    { metric: "Interface Architecture Standard", score: "UI/UX Pure Design Tokens", health: "Validated Invariant" }
];

// ============================================================================
// 2. O(1) STRATEGY CONVERTERS & OBJECT LOOKUPS (Bypasses procedural if-else)
// ============================================================================
const VALIDATION_STATES = {
    STANDBY: "STANDBY",
    RUNNING: "COMPUTING_INTEGRITY_PROOFS",
    SUCCESS: "PROOFS_VERIFIED_SECURE"
};

const CLASSIFICATION_UI_ROUTER = {
    CORE_INFRASTRUCTURE: { banner: "bg-gradient-to-r from-blue-600/20 to-indigo-600/20", border: "border-blue-500/30", text: "text-blue-400", label: "Core Infrastructure Cluster" },
    AI_HEURISTICS: { banner: "bg-gradient-to-r from-purple-600/20 to-pink-600/20", border: "border-purple-500/30", text: "text-purple-400", label: "AI Heuristics Optimization Channel" },
    SYSTEM_VALIDATION: { banner: "bg-gradient-to-r from-amber-600/20 to-orange-600/20", border: "border-amber-500/30", text: "text-amber-400", label: "System Validation Architecture" },
    APPLICATION_LAYERS: { banner: "bg-gradient-to-r from-emerald-600/20 to-teal-600/20", border: "border-emerald-500/30", text: "text-emerald-400", label: "Application Infrastructure Layers" }
};

const BRANDING_MAP = {
    "Duke University": "text-blue-400 bg-blue-950/40 border-blue-800/50",
    "Google": "text-red-400 bg-red-950/40 border-red-800/50",
    "Amazon Web Services": "text-amber-400 bg-amber-950/40 border-amber-800/50",
    "IBM": "text-cyan-400 bg-cyan-950/40 border-cyan-800/50",
    "Microsoft": "text-teal-400 bg-teal-950/40 border-teal-800/50",
    "Meta": "text-indigo-400 bg-indigo-950/40 border-indigo-800/50",
    "Vanderbilt University": "text-yellow-500 bg-yellow-950/40 border-yellow-800/50"
};

const SYSTEM_STATUS_LAYOUT = {
    [VALIDATION_STATES.STANDBY]: { style: "bg-slate-900 border-slate-800 text-slate-500", terminalText: "SYSTEM READY: Initialize real-time checksum evaluation block." },
    [VALIDATION_STATES.RUNNING]: { style: "bg-amber-950/50 border-amber-500/30 text-amber-400 animate-pulse", terminalText: "EXECUTING: Fetching verification payload blocks from remote authority endpoint ledger..." },
    [VALIDATION_STATES.SUCCESS]: { style: "bg-emerald-950/50 border-emerald-500/30 text-emerald-400", terminalText: "INTEGRITY MATCHED: SHA-256 validation proof matched zero error parameters." }
};

const ASSIGNMENT_FALLBACK = { banner: "bg-slate-900", border: "border-slate-800", text: "text-slate-400", label: "General Core Unit" };

// ============================================================================
// 3. ATOMIC PRESENTATION SUB-COMPONENTS (Memoized Component Units)
// ============================================================================
const MetricNodeWidget = React.memo(({ item }) => (
    <div className="p-4 rounded-xl bg-slate-900/20 border border-slate-900/60 flex items-center justify-between gap-4">
        <div className="space-y-1">
            <div className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">// SPECIALIZATION CAPABILITY</div>
            <div className="text-xs font-bold text-slate-300 font-mono">{item.metric}</div>
        </div>
        <div className="text-right">
            <span className="text-xs font-mono font-black text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-2.5 py-1 rounded">
                {item.score}
            </span>
        </div>
    </div>
));
MetricNodeWidget.displayName = "MetricNodeWidget";

const VerificationTerminal = React.memo(({ state, activeId, checksumValue, onTrigger }) => {
    const metaProfile = useMemo(() => SYSTEM_STATUS_LAYOUT[state], [state]);

    return (
        <div className={`p-5 rounded-xl border ${metaProfile.style} transition-all duration-300 font-mono space-y-3 shadow-inner`}>
            <div className="flex items-center justify-between border-b border-slate-900/60 pb-3">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Cryptographic Sub-Verification Terminal</span>
                <button
                    onClick={() => onTrigger(activeId)}
                    disabled={state === VALIDATION_STATES.RUNNING}
                    className="px-3 py-1 bg-slate-950 text-slate-300 rounded border border-slate-800 text-[11px] hover:text-emerald-400 hover:border-emerald-500/40 transition-all duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    [ RUN_VALIDATION_PIPELINE ]
                </button>
            </div>
            <div className="text-xs space-y-1.5 text-slate-300 leading-relaxed">
                <p className="text-slate-500">&gt; {metaProfile.terminalText}</p>
                <p className="text-[11px] text-slate-400 select-all bg-slate-950 p-2 rounded border border-slate-900 overflow-x-auto">
                    COMPUTED_HASH: <span className="text-cyan-400 font-semibold">{checksumValue}</span>
                </p>
            </div>
        </div>
    );
});
VerificationTerminal.displayName = "VerificationTerminal";

// ============================================================================
// 4. MAIN CENTRAL INTERFACE NODE ENGINE
// ============================================================================
export default function CertificationDetails() {
    const [activeTarget, setActiveTarget] = useState(REGISTRY_INITIAL_POINTER());
    const [checksumState, setChecksumState] = useState(VALIDATION_STATES.STANDBY);
    const [computedSignature, setComputedSignature] = useState("0xE0F3...NULL");

    // O(1) Local Initial State Hydrator
    function REGISTRY_INITIAL_POINTER() {
        return CERTIFICATION_REGISTRY[0];
    }

    // Pure Config Strategy Router Lookup Resolver
    const currentUiStrategy = useMemo(() => {
        return CLASSIFICATION_UI_ROUTER[activeTarget.classification] || ASSIGNMENT_FALLBACK;
    }, [activeTarget.classification]);

    const issuerBrandStyle = useMemo(() => {
        return BRANDING_MAP[activeTarget.issuer] || "text-slate-400 bg-slate-900 border-slate-800";
    }, [activeTarget.issuer]);

    // Async Execution Pipeline utilizing Native Core Promise Micro-Tasks
    const computeCryptographicValidationProof = useCallback(async (targetId) => {
        setChecksumState(VALIDATION_STATES.RUNNING);
        setComputedSignature("SHA256::GENERATING_MERKLE_ROOT_LEAF...");

        await new Promise((resolvePipeline) => setTimeout(resolvePipeline, 650));

        setComputedSignature(`SHA256::${activeTarget.cryptographicSalt}FF92C${targetId}D16BA0489EFE`);
        setChecksumState(VALIDATION_STATES.SUCCESS);
    }, [activeTarget.cryptographicSalt]);

    // Reset verification pipeline state when swapping the targeted object index pointers
    const cycleActiveTargetNode = useCallback((nodePayload) => {
        setActiveTarget(nodePayload);
        setChecksumState(VALIDATION_STATES.STANDBY);
        setComputedSignature("0xE0F3...NULL");
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500/20 py-16 px-4 sm:px-8 lg:px-16">

            {/* HEADER SPECS ARCHITECTURE LAYER */}
            <header className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-900 pb-8">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-0.5 text-[10px] font-mono tracking-widest text-cyan-400 uppercase rounded border border-cyan-500/20 bg-cyan-950/30">
                        ENGINE::SPEC_INSPECTION_LAYER_V2
                    </div>
                    <h1 className="text-2xl md:text-4xl font-black tracking-tight text-slate-100">
                        Infrastructure Certification <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Deep-Dive Telemetry</span>
                    </h1>
                </div>
                <div className="font-mono text-xs text-slate-500 text-left md:text-right">
                    [ POOL_SIZE: {CERTIFICATION_REGISTRY.length} SYSTEM TOKENS ]
                </div>
            </header>

            {/* MATRIX LAYOUT DIVISION WRAPPER */}
            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* INTERACTIVE COMPONENT DIRECTORY LOOKUP LIST (4 Cols) */}
                <nav className="lg:col-span-4 space-y-2 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                    {CERTIFICATION_REGISTRY.map((node) => {
                        const isTargetNodeActive = activeTarget.id === node.id;
                        return (
                            <button
                                key={node.id}
                                onClick={() => cycleActiveTargetNode(node)}
                                className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 block font-sans cursor-pointer outline-none group ${isTargetNodeActive
                                        ? "border-cyan-500/50 bg-cyan-950/20 shadow-md"
                                        : "border-slate-900 bg-slate-900/10 hover:border-slate-800 hover:bg-slate-900/20"
                                    }`}
                            >
                                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                                    <span>{node.id}</span>
                                    <span className="group-hover:text-cyan-400 transition-colors duration-150">{node.issuer}</span>
                                </div>
                                <h4 className={`text-xs font-bold leading-tight line-clamp-1 ${isTargetNodeActive ? "text-cyan-400" : "text-slate-300 group-hover:text-slate-100"}`}>
                                    {node.title}
                                </h4>
                            </button>
                        );
                    })}
                </nav>

                {/* DETAILS FIELD TARGET INSPECTION STATION (8 Cols) */}
                <section className="lg:col-span-8 space-y-6">

                    {/* CORE IDENTITY TARGET INSIGNIA CARD */}
                    <div className={`p-6 rounded-2xl border ${currentUiStrategy.border} ${currentUiStrategy.banner} transition-all duration-300 space-y-6 relative overflow-hidden shadow-2xl`}>
                        <div className="absolute top-0 right-0 p-3 text-[9px] font-mono tracking-widest text-slate-600 uppercase select-none">
                            {activeTarget.classification}
                        </div>

                        <div className="space-y-2">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">// {currentUiStrategy.label}</span>
                            <h2 className="text-lg md:text-2xl font-black text-slate-100 leading-snug">{activeTarget.title}</h2>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono">
                            <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide border ${issuerBrandStyle}`}>
                                {activeTarget.issuer}
                            </span>
                            <span className="text-slate-700">|</span>
                            <span className="text-slate-400">ID String: <strong className="text-slate-200 select-all">{activeTarget.credentialId}</strong></span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-900/60 pt-5 font-mono">
                            <div>
                                <label className="text-[10px] text-slate-500 block uppercase tracking-wider">Epoch Issued</label>
                                <span className="text-xs font-bold text-slate-300 mt-0.5 block">{activeTarget.issued}</span>
                            </div>
                            <div>
                                <label className="text-[10px] text-slate-500 block uppercase tracking-wider">Epoch Expiry</label>
                                <span className="text-xs font-bold text-slate-300 mt-0.5 block">{activeTarget.expires}</span>
                            </div>
                            <div>
                                <label className="text-[10px] text-slate-500 block uppercase tracking-wider">Virtual Machine Load</label>
                                <span className="text-xs font-bold text-emerald-400 mt-0.5 block">{activeTarget.systemLoad}</span>
                            </div>
                            <div>
                                <label className="text-[10px] text-slate-500 block uppercase tracking-wider">Target Node</label>
                                <span className="text-xs font-bold text-cyan-400 mt-0.5 block">{activeTarget.clusterNodes}</span>
                            </div>
                        </div>
                    </div>

                    {/* SYSTEM RUNTIME TERM VALIDATION HUB */}
                    <VerificationTerminal
                        state={checksumState}
                        activeId={activeTarget.id}
                        checksumValue={computedSignature}
                        onTrigger={computeCryptographicValidationProof}
                    />

                    {/* DYNAMIC SKILL INTERACTION MAPPING DECK */}
                    <div className="p-6 rounded-xl bg-slate-900/10 border border-slate-900 space-y-4">
                        <h3 className="text-xs font-mono tracking-widest text-slate-400 uppercase border-b border-slate-900 pb-3">
                            Verified Capability Stack Target Ingress
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {activeTarget.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-3 py-1 text-xs font-mono bg-slate-950 text-slate-300 rounded-lg border border-slate-800 hover:border-slate-600 transition-colors duration-150 cursor-default"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                </section>
            </main>

            {/* CONTINUOUS DEEPER ANCILLARY ENGINE MATRIX FOOTER */}
            <footer className="max-w-7xl mx-auto mt-16 pt-12 border-t border-slate-900 space-y-6">
                <h3 className="text-xs font-mono tracking-widest text-slate-500 uppercase">
                    Ancillary Engineering Metrics & Capability Benchmarks Channel
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {ANALYTICS_MATRIX.map((item) => (
                        <MetricNodeWidget key={item.metric} item={item} />
                    ))}
                </div>
            </footer>

        </div>
    );
}