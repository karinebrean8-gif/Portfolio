
import React, { useState, useMemo, useCallback } from 'react';

// 1. IN-MEMORY IMMUTABLE CERTIFICATION & ACCOMPLISHMENT REGISTRY (Pure JSON-Driven Isolation)
const CERTIFICATIONS_MANIFEST = [
    {
        id: "CERT-001",
        title: "Virtualization, Docker, and Kubernetes for Data Engineering",
        issuer: "Duke University",
        issued: "Jun 2026",
        expires: "Apr 2035",
        credentialId: "3CCYPNBIEK26",
        track: "Cloud & DevOps",
        skills: ["Docker", "Kubernetes", "Virtualization", "Data Engineering"]
    },
    {
        id: "CERT-002",
        title: "Accelerate Your Job Search with AI",
        issuer: "Google",
        issued: "Jun 2026",
        expires: "Jun 2036",
        credentialId: "8NSHZKDSCL16",
        track: "Artificial Intelligence",
        skills: ["AI Workflows", "Prompt Engineering", "Strategy"]
    },
    {
        id: "CERT-003",
        title: "AWS Cloud Practitioner Essentials",
        issuer: "Amazon Web Services",
        issued: "Jun 2026",
        expires: "Sep 2036",
        credentialId: "HTPJ07B98G54",
        track: "Cloud & DevOps",
        skills: ["AWS Cloud", "Cloud Economics", "Infrastructure"]
    },
    {
        id: "CERT-004",
        title: "Full Stack Software Developer Assessment",
        issuer: "IBM",
        issued: "May 2026",
        expires: "Jun 2036",
        credentialId: "VH0MLV842PP4",
        track: "Full-Stack Software Engineering",
        skills: ["Software Assessment", "Architecture Solutions", "Full-Stack Development"]
    },
    {
        id: "CERT-005",
        title: "Introduction to Software Engineering",
        issuer: "IBM",
        issued: "Jun 2026",
        expires: "Sep 2036",
        credentialId: "HZ28FS7TZXR1",
        track: "Full-Stack Software Engineering",
        skills: ["SDLC", "Agile Methodologies", "Engineering Core"]
    },
    {
        id: "CERT-006",
        title: "Full-Stack Developer Capstone Project",
        issuer: "Microsoft",
        issued: "Jun 2026",
        expires: "Jun 2036",
        credentialId: "8BOCR2L2NPME",
        track: "Full-Stack Software Engineering",
        skills: ["System Architecture", "Production Deployment", "Monolith Architecture"]
    },
    {
        id: "CERT-007",
        title: "Getting Started with Git and GitHub",
        issuer: "IBM",
        issued: "Jun 2026",
        expires: "Jul 2036",
        credentialId: "SGT8CVAL48OQ",
        track: "Full-Stack Software Engineering",
        skills: ["Version Control", "Git", "GitHub Actions"]
    },
    {
        id: "CERT-008",
        title: "APIs",
        issuer: "Meta",
        issued: "Jun 2026",
        expires: "Aug 2036",
        credentialId: "EJH8P9B7D9PG",
        track: "Backend Engineering",
        skills: ["REST APIs", "API Design", "Network Ingress"]
    },
    {
        id: "CERT-009",
        title: "Microservice Architectures",
        issuer: "Vanderbilt University",
        issued: "Jun 2026",
        expires: "Oct 2036",
        credentialId: "ENB1OVY7NEOM",
        track: "Backend Engineering",
        skills: ["Distributed Systems", "Microservices", "System Scaling"]
    },
    {
        id: "CERT-010",
        title: "Django Web Framework",
        issuer: "Meta",
        issued: "Jun 2026",
        expires: "Permanent",
        credentialId: "MT4OBCGZSXC3",
        track: "Backend Engineering",
        skills: ["Python", "Django", "MVC Architecture"]
    },
    {
        id: "CERT-011",
        title: "Developing Back-End Apps with Node.js and Express",
        issuer: "IBM",
        issued: "Jun 2026",
        expires: "Jan 2036",
        credentialId: "UNNXMXRIIO69",
        track: "Backend Engineering",
        skills: ["Node.js", "Express.js", "Asynchronous Pipelines"]
    },
    {
        id: "CERT-012",
        title: "Developing Front-End Apps with React",
        issuer: "IBM",
        issued: "Jun 2026",
        expires: "Jun 2026",
        credentialId: "CB7P5PSKFESH",
        track: "Frontend Engineering",
        skills: ["React.js", "Redux.js", "State Reconciliation"]
    },
    {
        id: "CERT-013",
        title: "Next.js Advanced Implementation & Routing Matrix",
        issuer: "Microsoft",
        issued: "Jul 2026",
        expires: "Permanent",
        credentialId: "MSFT-NX-9021",
        track: "Frontend Engineering",
        skills: ["Next.js", "Server Components", "SSR/ISR", "Prisma"]
    },
    {
        id: "CERT-014",
        title: "Project Management Essentials & Technical Leadership",
        issuer: "Google",
        issued: "Jul 2026",
        expires: "Jul 2036",
        credentialId: "GOOG-PM-7712",
        track: "Engineering Leadership",
        skills: ["Project Management", "Agile Execution", "Team Leadership"]
    },
    {
        id: "CERT-015",
        title: "Algorithmic Invariants Mastery (130+ Verified LeetCode Solutions)",
        issuer: "LeetCode",
        issued: "Active Continuous Validation",
        expires: "Permanent",
        credentialId: "LC-RANK-130-PLUS",
        track: "Algorithmic Engineering",
        skills: ["Data Structures", "Dynamic Programming", "Graph Theory", "Bit Manipulation"]
    }
];

// EXTRA STATIC DATA REGISTRY: HIGH-PERFORMANCE SKILLS MATRIX TOPO-MAP
const SKILLS_TOPOLOGY_DOMAINS = [
    { domain: "Database Engines & Storage Layers", entities: ["PostgreSQL", "MySQL", "Prisma ORM", "Relational Architecture"] },
    { domain: "Product Engineering & Systems Aesthetics", entities: ["UI Design Core", "UX Flow Architecture", "Figma Design Tokens"] }
];

// 2. TAILWIND DESIGN TOKENS MATRIX (Object Mapping replacing conditional rendering style blocks)
const BRAND_THEMATIC_MAP = {
    "Duke University": { border: "border-blue-800/30", badge: "bg-blue-950/40 text-blue-400" },
    "Google": { border: "border-red-500/20", badge: "bg-red-950/40 text-red-400" },
    "Amazon Web Services": { border: "border-amber-500/20", badge: "bg-amber-950/40 text-amber-400" },
    "IBM": { border: "border-cyan-500/20", badge: "bg-cyan-950/40 text-cyan-400" },
    "Microsoft": { border: "border-teal-500/20", badge: "bg-teal-950/40 text-teal-400" },
    "Meta": { border: "border-indigo-500/20", badge: "bg-indigo-950/40 text-indigo-400" },
    "Vanderbilt University": { border: "border-yellow-600/20", badge: "bg-yellow-950/40 text-yellow-500" },
    "LeetCode": { border: "border-orange-500/30", badge: "bg-orange-950/40 text-orange-400" }
};

const TRACK_FILTER_BUTTON_THEMES = {
    active: "bg-slate-800 text-emerald-400 border-emerald-500/40 shadow-lg shadow-emerald-950/20",
    inactive: "bg-slate-900/40 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700"
};

// ============================================================================
// CORE PRESENTATION ENGINE: COMPONENT LIFECYCLE
// ============================================================================
export default function CertificationsPage() {
    const [selectedTrack, setSelectedTrack] = useState("ALL_CHANNELS");

    // Generate unique categories dynamically using map arrays (Highly scalable configuration)
    const structuralTracksArray = useMemo(() => {
        const defaultChannels = ["ALL_CHANNELS"];
        const uniqueExtractedTracks = Array.from(new Set(CERTIFICATIONS_MANIFEST.map(cert => cert.track)));
        return [...defaultChannels, ...uniqueExtractedTracks];
    }, []);

    // Filter pipeline executing optimization passes over the manifest array
    const filteredCertificationsList = useMemo(() => {
        // Guard Clause: Return full database context instantly if global channel is selected
        if (selectedTrack === "ALL_CHANNELS") return CERTIFICATIONS_MANIFEST;

        return CERTIFICATIONS_MANIFEST.filter(cert => cert.track === selectedTrack);
    }, [selectedTrack]);

    // Decoupled tracker function managing state switches
    const handleTrackSwitch = useCallback((targetTrackKey) => {
        setSelectedTrack(targetTrackKey);
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500/20 selection:text-emerald-300 py-24 px-6 md:px-12 lg:px-24">

            {/* 3. ENGINE METADATA SECTION */}
            <header className="max-w-7xl mx-auto mb-16 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono tracking-wider text-emerald-400 uppercase rounded-full bg-emerald-950/40 border border-emerald-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    VERIFIED PRINCIPAL ENGINEERING METRICS POOL
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-100">
                    Systems Engineering & Leadership <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Credentials Matrix</span>
                </h1>
                <p className="max-w-3xl text-slate-400 text-sm md:text-base leading-relaxed">
                    Dynamic cataloging of verified certifications, production engineering competencies, algorithmic data structures benchmarks, and technical leadership streams.
                </p>
            </header>

            {/* 4. FILTER VECTOR CONTROLLER (Pure Map Integration) */}
            <nav className="max-w-7xl mx-auto mb-12 flex flex-wrap gap-2.5">
                {structuralTracksArray.map((trackKey) => {
                    const isActive = selectedTrack === trackKey;
                    const assignedButtonStyle = isActive ? TRACK_FILTER_BUTTON_THEMES.active : TRACK_FILTER_BUTTON_THEMES.inactive;
                    const readableLabel = trackKey.replace(/_/g, " ").toLowerCase();

                    return (
                        <button
                            key={trackKey}
                            onClick={() => handleTrackSwitch(trackKey)}
                            className={`px-4 py-2 text-xs font-mono font-medium tracking-wide border rounded-md capitalize transition-all duration-300 ease-out cursor-pointer ${assignedButtonStyle}`}
                        >
                            {readableLabel}
                        </button>
                    );
                })}
            </nav>

            {/* 5. HIGH-DENSITY CARD RECONCILIATION GRID */}
            <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {filteredCertificationsList.map((certNode) => {
                    // Object lookup theme binding resolving dynamic aesthetics instantly with zero if-else lines
                    const brandTheme = BRAND_THEMATIC_MAP[certNode.issuer] || { border: "border-slate-800", badge: "bg-slate-900 text-slate-400" };

                    return (
                        <article
                            key={certNode.id}
                            className={`group relative flex flex-col justify-between p-6 rounded-lg bg-slate-900/30 backdrop-blur-md border ${brandTheme.border} hover:border-slate-700 hover:bg-slate-900/50 transition-all duration-300 ease-out`}
                        >
                            <div className="space-y-4">
                                {/* Header Metadata Row */}
                                <div className="flex items-start justify-between gap-4">
                                    <span className={`px-2.5 py-0.5 text-[10px] font-mono font-semibold tracking-wider rounded uppercase ${brandTheme.badge}`}>
                                        {certNode.issuer}
                                    </span>
                                    <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap">
                                        {certNode.issued} {certNode.expires !== "Permanent" ? `· ${certNode.expires}` : ""}
                                    </span>
                                </div>

                                {/* Main Card Content */}
                                <div className="space-y-1">
                                    <h3 className="text-base font-bold text-slate-200 group-hover:text-emerald-400 transition-colors duration-200 leading-snug line-clamp-2">
                                        {certNode.title}
                                    </h3>
                                    <p className="text-xs font-mono text-slate-500 tracking-wider">
                                        ID: <span className="text-slate-400 group-hover:text-slate-300 transition-colors duration-200 select-all">{certNode.credentialId}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Functional Skill Token Arrays Layer */}
                            <div className="mt-6 pt-4 border-t border-slate-900 flex flex-wrap gap-1.5">
                                {certNode.skills.map((skillToken, tokenIdx) => (
                                    <span
                                        key={`${certNode.id}-skill-${tokenIdx}`}
                                        className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-950 text-slate-400 border border-slate-900/50 group-hover:border-slate-800 group-hover:text-slate-300 transition-colors duration-200"
                                    >
                                        {skillToken}
                                    </span>
                                ))}
                            </div>
                        </article>
                    );
                })}
            </main>

            {/* 6. EXPANDED MATRIX SECTION: COMPLEMENTARY SYSTEMS ARCHITECTURE KNOWLEDGE DOMAINS */}
            <section className="max-w-7xl mx-auto pt-12 border-t border-slate-900">
                <h2 className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-8">
                    Additional Core Specialization Verticals
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {SKILLS_TOPOLOGY_DOMAINS.map((domainNode, index) => (
                        <div
                            key={`domain-node-${index}`}
                            className="p-6 rounded-lg bg-slate-900/20 border border-slate-900 flex flex-col justify-between gap-4"
                        >
                            <h3 className="text-sm font-mono text-slate-300 font-semibold border-b border-slate-900 pb-2">
                                {domainNode.domain}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {domainNode.entities.map((entity, entityIdx) => (
                                    <span
                                        key={`entity-${entityIdx}`}
                                        className="px-3 py-1 text-xs font-mono bg-slate-950 text-emerald-400/80 border border-emerald-500/10 rounded"
                                    >
                                        {entity}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}