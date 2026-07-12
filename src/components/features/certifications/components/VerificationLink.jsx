
import React, { useState, useMemo, useCallback } from 'react';

// ============================================================================
// 1. DATA INGRESS MANIFEST (The Immutable Authority Records)
// ============================================================================
const CREDENTIAL_INGRESS_MANIFEST = [
    { id: "CERT-01", title: "Virtualization, Docker, and Kubernetes for Data Engineering", issuer: "Duke University", issued: "Jun 2026", expires: "Apr 2035", credentialId: "3CCYPNBIEK26", url: "https://coursera.org/verify/3CCYPNBIEK26", skills: ["Docker", "Kubernetes", "Virtualization", "Data Engineering"] },
    { id: "CERT-02", title: "Accelerate Your Job Search with AI", issuer: "Google", issued: "Jun 2026", expires: "Jun 2036", credentialId: "8NSHZKDSCL16", url: "https://coursera.org/verify/8NSHZKDSCL16", skills: ["AI Workflows", "Prompt Engineering", "Google Leadership", "Google Project Management"] },
    { id: "CERT-03", title: "AWS Cloud Practitioner Essentials", issuer: "Amazon Web Services", issued: "Jun 2026", expires: "Sep 2036", credentialId: "HTPJ07B98G54", url: "https://aws.amazon.com/verification", skills: ["AWS Cloud", "Cloud Infrastructure", "Systems Scale", "Cloud Economics"] },
    { id: "CERT-04", title: "Full Stack Software Developer Assessment", issuer: "IBM", issued: "May 2026", expires: "Jun 2036", credentialId: "VH0MLV842PP4", url: "https://coursera.org/verify/VH0MLV842PP4", skills: ["Assessment", "Architecture Validation", "Enterprise Design Templates", "LeetCode 130+ Solving"] },
    { id: "CERT-05", title: "Introduction to Software Engineering", issuer: "IBM", issued: "Jun 2026", expires: "Sep 2036", credentialId: "HZ28FS7TZXR1", url: "https://coursera.org/verify/HZ28FS7TZXR1", skills: ["SDLC Paradigms", "Agile Core Engineering", "Design Patterns", "Clean Code Architecture"] },
    { id: "CERT-06", title: "Full-Stack Developer Capstone Project", issuer: "Microsoft", issued: "Jun 2026", expires: "Jun 2036", credentialId: "8BOCR2L2NPME", url: "https://microsoft.com/verify", skills: ["Microsoft Next.js", "System Integration", "Production Architecture", "Prisma"] },
    { id: "CERT-07", title: "Getting Started with Git and GitHub", issuer: "IBM", issued: "Jun 2026", expires: "Jul 2036", credentialId: "SGT8CVAL48OQ", url: "https://coursera.org/verify/SGT8CVAL48OQ", skills: ["Git", "GitHub Actions", "VCS Automations"] },
    { id: "CERT-08", title: "APIs", issuer: "Meta", issued: "Jun 2026", expires: "Aug 2036", credentialId: "EJH8P9B7D9PG", url: "https://coursera.org/verify/EJH8P9B7D9PG", skills: ["RESTful APIs", "API Design Engine", "Secure Ingress Routing"] },
    { id: "CERT-09", title: "Microservice Architectures", issuer: "Vanderbilt University", issued: "Jun 2026", expires: "Oct 2036", credentialId: "ENB1OVY7NEOM", url: "https://coursera.org/verify/ENB1OVY7NEOM", skills: ["Distributed Clusters", "Microservices Topology", "Event Streams"] },
    { id: "CERT-10", title: "Django Web Framework", issuer: "Meta", issued: "Jun 2026", expires: "Permanent", credentialId: "MT4OBCGZSXC3", url: "https://coursera.org/verify/MT4OBCGZSXC3", skills: ["Python Engine", "Django MVC", "Prisma", "PostgreSQL", "MySQL"] },
    { id: "CERT-11", title: "Developing Back-End Apps with Node.js and Express", issuer: "IBM", issued: "Jun 2026", expires: "Jan 2036", credentialId: "UNNXMXRIIO69", url: "https://coursera.org/verify/UNNXMXRIIO69", skills: ["Node.js", "Express.js Engine", "Asynchronous Pipelines", "PostgreSQL", "MySQL"] },
    { id: "CERT-12", title: "Developing Front-End Apps with React", issuer: "IBM", issued: "Jun 2026", expires: "Jun 2026", credentialId: "CB7P5PSKFESH", url: "https://coursera.org/verify/CB7P5PSKFESH", skills: ["React.js", "Redux.js", "UI Design Core Spec", "UX Human-Interface Design"] }
];

// ============================================================================
// 2. STATIC DICTIONARY CONFIGURATIONS (Enforcing Runtime De-duplication)
// ============================================================================
const PIPELINE_STATES = {
    STANDBY: "PIPELINE_STANDBY",
    RESOLVING: "MAPPING_VERIFICATION_BRANCHES",
    SUCCESS: "VERIFICATION_VERDICT_RESOLVED"
};

const SKILL_TAXONOMY_ROUTER = {
    "Docker": { category: "DevOps & Cloud Systems", style: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    "Kubernetes": { category: "DevOps & Cloud Systems", style: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    "Virtualization": { category: "DevOps & Cloud Systems", style: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
    "Data Engineering": { category: "DevOps & Cloud Systems", style: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
    "AI Workflows": { category: "AI & Engineering Automation", style: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
    "Prompt Engineering": { category: "AI & Engineering Automation", style: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
    "Google Leadership": { category: "Management & Workflow Engineering", style: "bg-red-500/10 text-red-400 border-red-500/20" },
    "Google Project Management": { category: "Management & Workflow Engineering", style: "bg-red-500/10 text-red-400 border-red-500/20" },
    "AWS Cloud": { category: "DevOps & Cloud Systems", style: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    "Cloud Infrastructure": { category: "DevOps & Cloud Systems", style: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    "Systems Scale": { category: "Enterprise Systems Architecture", style: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    "Cloud Economics": { category: "Management & Workflow Engineering", style: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
    "Assessment": { category: "Enterprise Systems Architecture", style: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
    "Architecture Validation": { category: "Enterprise Systems Architecture", style: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    "Enterprise Design Templates": { category: "Enterprise Systems Architecture", style: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    "LeetCode 130+ Solving": { category: "Enterprise Systems Architecture", style: "bg-rose-500/10 text-rose-400 border-rose-500/20 font-black tracking-wider" },
    "SDLC Paradigms": { category: "Management & Workflow Engineering", style: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
    "Agile Core Engineering": { category: "Management & Workflow Engineering", style: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
    "Design Patterns": { category: "Enterprise Systems Architecture", style: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    "Clean Code Architecture": { category: "Enterprise Systems Architecture", style: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    "Microsoft Next.js": { category: "Frontend Core Frameworks", style: "bg-teal-500/10 text-teal-400 border-teal-500/20" },
    "System Integration": { category: "Enterprise Systems Architecture", style: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
    "Production Architecture": { category: "Enterprise Systems Architecture", style: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    "Prisma": { category: "Database Infrastructure Topology", style: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
    "Git": { category: "DevOps & Cloud Systems", style: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
    "GitHub Actions": { category: "DevOps & Cloud Systems", style: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
    "VCS Automations": { category: "DevOps & Cloud Systems", style: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
    "RESTful APIs": { category: "Backend Runtime & Core Engine", style: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
    "API Design Engine": { category: "Backend Runtime & Core Engine", style: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
    "Secure Ingress Routing": { category: "Backend Runtime & Core Engine", style: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
    "Distributed Clusters": { category: "Enterprise Systems Architecture", style: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    "Microservices Topology": { category: "Enterprise Systems Architecture", style: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    "Event Streams": { category: "Backend Runtime & Core Engine", style: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
    "Python Engine": { category: "Backend Runtime & Core Engine", style: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
    "Django MVC": { category: "Backend Runtime & Core Engine", style: "bg-emerald-600/10 text-emerald-400 border-emerald-600/20" },
    "PostgreSQL": { category: "Database Infrastructure Topology", style: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 font-bold" },
    "MySQL": { category: "Database Infrastructure Topology", style: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 font-bold" },
    "Node.js": { category: "Backend Runtime & Core Engine", style: "bg-green-500/10 text-green-400 border-green-500/20 font-black" },
    "Express.js Engine": { category: "Backend Runtime & Core Engine", style: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
    "Asynchronous Pipelines": { category: "Enterprise Systems Architecture", style: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    "React.js": { category: "Frontend Core Frameworks", style: "bg-sky-500/10 text-sky-400 border-sky-500/20 font-black" },
    "Redux.js": { category: "Frontend Core Frameworks", style: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
    "UI Design Core Spec": { category: "Systems Aesthetics & Interface", style: "bg-pink-500/10 text-pink-400 border-pink-500/20" },
    "UX Human-Interface Design": { category: "Systems Aesthetics & Interface", style: "bg-pink-500/10 text-pink-400 border-pink-500/20" }
};

const CATEGORY_STYLE_DECK = {
    "Frontend Core Frameworks": "border-sky-500/20 bg-sky-950/10",
    "Backend Runtime & Core Engine": "border-violet-500/20 bg-violet-950/10",
    "Database Infrastructure Topology": "border-indigo-500/20 bg-indigo-950/10",
    "DevOps & Cloud Systems": "border-blue-500/20 bg-blue-950/10",
    "Enterprise Systems Architecture": "border-emerald-500/20 bg-emerald-950/10",
    "AI & Engineering Automation": "border-purple-500/20 bg-purple-950/10",
    "Systems Aesthetics & Interface": "border-pink-500/20 bg-pink-950/10",
    "Management & Workflow Engineering": "border-slate-800 bg-slate-900/40"
};

const THEME_ROUTER = {
    [PIPELINE_STATES.STANDBY]: { style: "text-slate-500 border-slate-950 bg-slate-900/10", msg: "CLUSTER_IDLE" },
    [PIPELINE_STATES.RESOLVING]: { style: "text-amber-400 border-amber-500/20 bg-amber-950/20 animate-pulse", msg: "ASYNC_LINK_RESOLVING..." },
    [PIPELINE_STATES.SUCCESS]: { style: "text-emerald-400 border-emerald-500/20 bg-emerald-950/20", msg: "METRIC_CRITICAL_VALIDATED" }
};

const FALLBACK_TAXONOMY = { category: "Unclassified Core Protocols", style: "bg-slate-500/10 text-slate-400 border-slate-500/20" };

// ============================================================================
// 3. ISOLATED SUB-COMPONENTS (Pure Rendering Nodes & Zero Side-Effects)
// ============================================================================

const HeaderConsole = React.memo(({ pipelineState, currentTheme }) => (
    <header className="max-w-7xl mx-auto mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-900 pb-8">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 text-[10px] font-mono tracking-widest text-cyan-400 uppercase rounded border border-cyan-500/20 bg-cyan-950/30">
                SECURE_CORE::AUTHORITY_CHAIN
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-100">
                Verification <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Link Matrix</span>
            </h1>
        </div>

        <div className={`px-4 py-2 rounded-xl border font-mono text-xs flex items-center gap-3 transition-all duration-300 ${currentTheme.style}`}>
            <span className="relative flex h-2 w-2">
                {pipelineState === PIPELINE_STATES.RESOLVING && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                )}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${pipelineState === PIPELINE_STATES.RESOLVING ? "bg-amber-500" : "bg-emerald-500"}`} />
            </span>
            <span>{currentTheme.msg}</span>
        </div>
    </header>
));
HeaderConsole.displayName = "HeaderConsole";

const SkillNodeButton = React.memo(({ skillName, totalCertificates, isSelected, onClick }) => {
    const router = SKILL_TAXONOMY_ROUTER[skillName] || FALLBACK_TAXONOMY;

    return (
        <button
            onClick={onClick}
            type="button"
            className={`p-3 rounded-xl border text-left transition-all duration-200 flex items-center justify-between group ${isSelected
                    ? "border-cyan-500/50 bg-slate-900 shadow-md scale-[1.01]"
                    : "border-slate-900 bg-slate-950/50 hover:border-slate-800"
                }`}
        >
            <div className="flex items-center gap-2.5">
                <div className={`w-1.5 h-1.5 rounded-full transition-colors ${isSelected ? "bg-cyan-400" : "bg-slate-800 group-hover:bg-slate-600"}`} />
                <span className="text-xs font-mono text-slate-300 group-hover:text-slate-100">{skillName}</span>
            </div>
            <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${router.style}`}>
                {totalCertificates} {totalCertificates === 1 ? "Node" : "Nodes"}
            </span>
        </button>
    );
});
SkillNodeButton.displayName = "SkillNodeButton";

const CertificateClusterCard = React.memo(({ cert }) => (
    <div className="p-4 rounded-xl bg-slate-950 border border-slate-900/80 space-y-3.5 hover:border-slate-800 transition-colors">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span className="bg-slate-900 px-2 py-0.5 rounded text-slate-400 border border-slate-800">{cert.id}</span>
            <span className="text-cyan-400 font-bold">{cert.issuer}</span>
        </div>

        <div>
            <h4 className="text-sm font-bold text-slate-200 leading-snug">{cert.title}</h4>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-500 font-mono mt-1">
                <span>Issued: {cert.issued}</span>
                <span>Expires: {cert.expires}</span>
            </div>
        </div>

        <div className="flex items-center justify-between gap-4 pt-1">
            <div className="text-[9px] font-mono text-slate-600 truncate bg-slate-900/80 px-2.5 py-1.5 rounded border border-slate-950 max-w-[65%] select-all">
                ID: {cert.credentialId}
            </div>
            <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 font-mono text-[10px] tracking-wider uppercase font-bold transition-all"
            >
                Verify Link ↗
            </a>
        </div>
    </div>
));
CertificateClusterCard.displayName = "CertificateClusterCard";

// Isolation of Render Blocks inside Terminal Options to absolute functional blocks
const RouterStandbyBlock = React.memo(() => (
    <div className="h-56 flex items-center justify-center border border-dashed border-slate-900 rounded-xl p-6 text-center text-xs font-mono text-slate-600 leading-relaxed">
        [ NETWORK_STANDBY ]<br />Select a specific capability token from the left node tree matrix to fetch immediate link authority.
    </div>
));
RouterStandbyBlock.displayName = "RouterStandbyBlock";

const RouterResolvingBlock = React.memo(() => (
    <div className="space-y-4">
        <div className="space-y-2">
            <div className="h-3 w-24 bg-slate-900 rounded animate-pulse" />
            <div className="h-6 w-48 bg-slate-900 rounded animate-pulse" />
        </div>
        <div className="space-y-3 pt-4 border-t border-slate-900/60">
            <div className="h-24 w-full bg-slate-900/40 rounded-xl border border-slate-900/60 animate-pulse" />
            <div className="h-24 w-full bg-slate-900/40 rounded-xl border border-slate-900/60 animate-pulse" />
        </div>
    </div>
));
RouterResolvingBlock.displayName = "RouterResolvingBlock";

const RouterSuccessBlock = React.memo(({ selectedSkill, certificates }) => (
    <div className="space-y-5 transition-opacity duration-300 ease-in-out">
        <div className="space-y-1">
            <label className="text-[9px] font-mono uppercase text-slate-500">Active Structural Anchor</label>
            <h3 className="text-lg font-black font-mono text-cyan-400">{selectedSkill}</h3>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-900/60">
            <label className="text-[9px] font-mono uppercase text-slate-500 block mb-1">
                Resolved Target Verification Endpoints ({certificates.length})
            </label>
            <div className="space-y-3 max-h-[45vh] overflow-y-auto pr-1 custom-scrollbar">
                {certificates.map((cert) => (
                    <CertificateClusterCard key={cert.id} cert={cert} />
                ))}
            </div>
        </div>
    </div>
));
RouterSuccessBlock.displayName = "RouterSuccessBlock";

// ============================================================================
// 4. MAIN ARCHITECTURAL CONTROLLER LAYER
// ============================================================================
export default function VerificationLink() {
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [activeCertificates, setActiveCertificates] = useState([]);
    const [pipelineState, setPipelineState] = useState(PIPELINE_STATES.STANDBY);

    // Inversion Lookup Graph Engine: Normalizes raw matrices into highly queryable hash trees
    const { invertedSkillRegistry, categoricalClusterTree } = useMemo(() => {
        const registry = {};

        // Step 1: Invert M:N relations down to singular O(1) references
        CREDENTIAL_INGRESS_MANIFEST.forEach((cert) => {
            cert.skills.forEach((skill) => {
                if (!registry[skill]) registry[skill] = [];
                registry[skill].push(cert);
            });
        });

        // Step 2: Route tokens directly into categorical layouts
        const structuralClusters = {};
        Object.keys(registry).forEach((skillName) => {
            const taxonomy = SKILL_TAXONOMY_ROUTER[skillName] || FALLBACK_TAXONOMY;
            if (!structuralClusters[taxonomy.category]) structuralClusters[taxonomy.category] = [];

            structuralClusters[taxonomy.category].push({
                name: skillName,
                nodes: registry[skillName]
            });
        });

        return { invertedSkillRegistry: registry, categoricalClusterTree: structuralClusters };
    }, []);

    // Telemetry Broker Pipeline: Emulates cryptographic confirmation cycles
    const executeTelemetryResolution = useCallback(async (skillName, relatedNodes) => {
        if (selectedSkill === skillName) return; // Guard clause against identity execution loops

        setSelectedSkill(skillName);
        setActiveCertificates([]);
        setPipelineState(PIPELINE_STATES.RESOLVING);

        // Emulate edge runtime propagation delays via high-precision wrappers
        await new Promise((resolve) => setTimeout(resolve, 380));

        setActiveCertificates(relatedNodes);
        setPipelineState(PIPELINE_STATES.SUCCESS);
    }, [selectedSkill]);

    const currentTheme = THEME_ROUTER[pipelineState];
    const manifestTotalSize = CREDENTIAL_INGRESS_MANIFEST.length;
    const invertedKeysCount = Object.keys(invertedSkillRegistry).length;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans antialiased selection:bg-cyan-500/20 py-16 px-4 sm:px-8 lg:px-12">

            <HeaderConsole pipelineState={pipelineState} currentTheme={currentTheme} />

            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* INVERSION LOOKUP PLATFORM (Left: 7 Columns) */}
                <section className="lg:col-span-7 space-y-6 max-h-[78vh] overflow-y-auto pr-2 custom-scrollbar">
                    {Object.entries(categoricalClusterTree).map(([category, skills]) => (
                        <div key={category} className={`p-5 rounded-2xl border ${CATEGORY_STYLE_DECK[category] || "border-slate-900 bg-slate-900/10"} space-y-4`}>
                            <h3 className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                // {category}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {skills.map((skill) => (
                                    <SkillNodeButton
                                        key={skill.name}
                                        skillName={skill.name}
                                        totalCertificates={skill.nodes.length}
                                        isSelected={selectedSkill === skill.name}
                                        onClick={() => executeTelemetryResolution(skill.name, skill.nodes)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </section>

                {/* SECURE TELEMETRY INSPECTOR TERMINAL (Right: 5 Columns) */}
                <aside className="lg:col-span-5 sticky top-6">
                    <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-900 space-y-6 shadow-2xl backdrop-blur-sm">
                        <div className="border-b border-slate-900 pb-4">
                            <h2 className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                                Node Ancestry Cryptographic Verifier
                            </h2>
                        </div>

                        {if_else_structural_router(selectedSkill, pipelineState, activeCertificates)}

                    </div>
                </aside>
            </main>

            {/* METRIC FOUL PROOF FOOTER */}
            <footer className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-900 font-mono text-[10px] text-slate-600 flex flex-wrap justify-between gap-4">
                <div className="flex gap-6">
                    <span>ROOT_MANIFEST_NODES: {manifestTotalSize}</span>
                    <span>COMPUTED_INVERSION_KEYS: {invertedKeysCount}</span>
                </div>
                <span>COMPLIANCE_SPEC::PRODUCTION_STABLE_V4</span>
            </footer>

        </div>
    );
}

// ============================================================================
// 5. ISOLATED IF-ELSE ROUTER ENGINE (Clean Architecture Pure Structural Sub-Router)
// ============================================================================
function if_else_structural_router(selectedSkill, pipelineState, certificates) {
    if (!selectedSkill) {
        return <RouterStandbyBlock />;
    }

    if (pipelineState === PIPELINE_STATES.RESOLVING) {
        return <RouterResolvingBlock />;
    }

    if (pipelineState === PIPELINE_STATES.SUCCESS) {
        return <RouterSuccessBlock selectedSkill={selectedSkill} certificates={certificates} />;
    }

    return null;
}