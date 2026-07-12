/**
 * ============================================================================
 * ULTRA-FAANG L10+ DISTINGUISHED PRESENTATION LAYER: SKILLS INVERSION ENGINE
 * Optimization Level: O(1) Target Lookup, Strict Memoization & Isolated V-DOM
 * Framework Standard: React 18/19 Enterprise Architecture Spec
 * ============================================================================
 */

import React, { useState, useMemo, useCallback } from 'react';

// ============================================================================
// 1. MEMOIZED SUB-COMPONENTS (Pure Presentation Isolation Layers)
// ============================================================================

const HeaderSystemConsole = React.memo(({ compileState, themeProfile }) => (
    <header className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-900 pb-8">
        <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 text-[10px] font-mono tracking-widest text-emerald-400 uppercase rounded border border-emerald-500/20 bg-emerald-950/30">
                ENGINE_PIPELINE::INVERSION_LAYER
            </div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight text-slate-100">
                Relational Skill <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Inversion Graph Mapping</span>
            </h1>
        </div>

        <div className={`px-4 py-2 rounded-xl border font-mono text-xs flex items-center gap-3 transition-all duration-300 ${themeProfile.style}`}>
            <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${compileState === COMPILER_PIPELINE_STATES.ASSEMBLING ? "bg-amber-400" : "bg-emerald-400"}`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${compileState === COMPILER_PIPELINE_STATES.ASSEMBLING ? "bg-amber-500" : "bg-emerald-500"}`} />
            </span>
            <span>{themeProfile.statusMsg}</span>
        </div>
    </header>
));
HeaderSystemConsole.displayName = "HeaderSystemConsole";

const InteractiveSkillNode = React.memo(({ skillName, mappedCertificates, isSelected, onTrigger }) => {
    const routerConfig = SKILL_TAXONOMY_ROUTER[skillName] || FALLBACK_TAXONOMY;
    const originCount = mappedCertificates.length;

    return (
        <div
            onClick={() => onTrigger(skillName, mappedCertificates)}
            className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer flex items-center justify-between group ${isSelected
                    ? "border-emerald-500/50 bg-slate-900 shadow-lg scale-[1.01]"
                    : "border-slate-900 bg-slate-950/60 hover:border-slate-800"
                }`}
        >
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full transition-colors ${isSelected ? "bg-emerald-400" : "bg-slate-800 group-hover:bg-slate-600"}`} />
                <span className="text-xs font-mono text-slate-300 group-hover:text-slate-100 transition-colors">
                    {skillName}
                </span>
            </div>
            <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${routerConfig.intensity}`}>
                {originCount} {originCount === 1 ? "Origin" : "Origins"}
            </span>
        </div>
    );
});
InteractiveSkillNode.displayName = "InteractiveSkillNode";

const SkillCategoryGroup = React.memo(({ categoryName, skills, selectedSkill, onTrigger }) => (
    <div className={`p-5 rounded-xl border ${CATEGORY_UI_DECK[categoryName] || "border-slate-900 bg-slate-900/10"} space-y-4`}>
        <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
      // {categoryName}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {skills.map((skill) => (
                <InteractiveSkillNode
                    key={skill.name}
                    skillName={skill.name}
                    mappedCertificates={skill.origins}
                    isSelected={selectedSkill === skill.name}
                    onTrigger={onTrigger}
                />
            ))}
        </div>
    </div>
));
SkillCategoryGroup.displayName = "SkillCategoryGroup";

const GenealogyInspectorTerminal = React.memo(({ selectedSkill, associatedCerts, compileState }) => {
    const isPending = compileState === COMPILER_PIPELINE_STATES.ASSEMBLING;

    return (
        <div className="sticky top-6 p-6 rounded-2xl bg-slate-900/20 border border-slate-900 space-y-6 shadow-2xl">
            <div className="border-b border-slate-900/60 pb-4">
                <h2 className="text-xs font-mono tracking-widest text-slate-500 uppercase">
                    Verification Ancestry Trace Engine
                </h2>
            </div>

            {!selectedSkill ? (
                <div className="h-48 flex items-center justify-center border border-dashed border-slate-900 rounded-xl p-6 text-center text-xs font-mono text-slate-600 leading-relaxed">
                    [ INTERCEPT READY ]<br />Pick a modular capability signature token node to track structural origin authority roots.
                </div>
            ) : (
                <div className="space-y-5 animate-fadeIn">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Selected Inversion Anchor</label>
                        <h3 className="text-xl font-black font-mono tracking-tight text-emerald-400">{selectedSkill}</h3>
                    </div>

                    <div className="space-y-3 pt-2">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                            Source Authority Roots ({associatedCerts.length})
                        </label>

                        {isPending ? (
                            <div className="space-y-2">
                                <div className="h-16 w-full bg-slate-900/40 rounded-lg animate-pulse border border-slate-900" />
                                <div className="h-16 w-full bg-slate-900/40 rounded-lg animate-pulse border border-slate-900" />
                            </div>
                        ) : (
                            <div className="space-y-2.5">
                                {associatedCerts.map((cert) => (
                                    <div key={cert.id} className="p-4 rounded-xl bg-slate-950 border border-slate-900 space-y-2">
                                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                                            <span>{cert.id}</span>
                                            <span className="text-slate-400 font-semibold">{cert.issuer}</span>
                                        </div>
                                        <h4 className="text-xs font-bold text-slate-200 leading-snug">{cert.title}</h4>
                                        <div className="text-[10px] font-mono text-slate-600 truncate bg-slate-900/50 px-2 py-1 rounded select-all border border-slate-950">
                                            HASH: {cert.credentialId}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
});
GenealogyInspectorTerminal.displayName = "GenealogyInspectorTerminal";

// ============================================================================
// 2. MAIN SYSTEMS CONTROLLER
// ============================================================================
export default function SkillFromCertification() {
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [associatedCerts, setAssociatedCerts] = useState([]);
    const [compileState, setCompileState] = useState(COMPILER_PIPELINE_STATES.READY);

    // Inversion Matrix: Generates unique structural identity graphs
    const { skillsInversionMatrix, categorizedSkillTree } = useMemo(() => {
        const registryMap = {};
        DATA_INGRESS_MANIFEST.forEach((cert) => {
            cert.skills.forEach((skill) => {
                registryMap[skill] = registryMap[skill] || [];
                registryMap[skill].push({
                    id: cert.id,
                    title: cert.title,
                    issuer: cert.issuer,
                    credentialId: cert.credentialId
                });
            });
        });

        const classificationMap = {};
        Object.keys(registryMap).forEach((skillName) => {
            const targetCategory = (SKILL_TAXONOMY_ROUTER[skillName] || FALLBACK_TAXONOMY).category;
            classificationMap[targetCategory] = classificationMap[targetCategory] || [];
            classificationMap[targetCategory].push({
                name: skillName,
                origins: registryMap[skillName]
            });
        });

        return { skillsInversionMatrix: registryMap, categorizedSkillTree: classificationMap };
    }, []);

    const triggerSkillTelemetryProcessing = useCallback(async (skillName, certificates) => {
        setSelectedSkill(skillName);
        setAssociatedCerts([]);
        setCompileState(COMPILER_PIPELINE_STATES.ASSEMBLING);

        await new Promise((resolve) => setTimeout(resolve, 450));

        setAssociatedCerts(certificates);
        setCompileState(COMPILER_PIPELINE_STATES.VERIFIED);
    }, []);

    const themeProfile = COMPILER_THEME_ROUTER[compileState];
    const totalInversionKeys = Object.keys(skillsInversionMatrix).length;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500/20 py-16 px-4 sm:px-8 lg:px-16">

            <HeaderSystemConsole compileState={compileState} themeProfile={themeProfile} />

            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* STRUCTURAL GRAPH LIST (7 COLS) */}
                <section className="lg:col-span-7 space-y-6 max-h-[76vh] overflow-y-auto pr-2 custom-scrollbar">
                    {Object.entries(categorizedSkillTree).map(([categoryName, skills]) => (
                        <SkillCategoryGroup
                            key={categoryName}
                            categoryName={categoryName}
                            skills={skills}
                            selectedSkill={selectedSkill}
                            onTrigger={triggerSkillTelemetryProcessing}
                        />
                    ))}
                </section>

                {/* DATA ANCESTRY SIDEBAR TERMINAL (5 COLS) */}
                <aside className="lg:col-span-5 relative">
                    <GenealogyInspectorTerminal
                        selectedSkill={selectedSkill}
                        associatedCerts={associatedCerts}
                        compileState={compileState}
                    />
                </aside>
            </main>

            <footer className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-900 font-mono text-[11px] text-slate-600 flex flex-wrap justify-between gap-4">
                <span>TOTAL_ACCUMULATED_INVERSION_KEYS: {totalInversionKeys}</span>
                <span>SPEC_COMPLIANCE::REACTIVE_ZERO_CONDITIONAL_ROUTER_V3</span>
            </footer>

        </div>
    );
}

// ============================================================================
// 3. STATIC CONFIGURATION SHARDS (Extracted to enforce core isolation)
// ============================================================================
const DATA_INGRESS_MANIFEST = [
    { id: "CERT-01", title: "Virtualization, Docker, and Kubernetes for Data Engineering", issuer: "Duke University", credentialId: "3CCYPNBIEK26", skills: ["Docker", "Kubernetes", "Virtualization", "Data Engineering"] },
    { id: "CERT-02", title: "Accelerate Your Job Search with AI", issuer: "Google", credentialId: "8NSHZKDSCL16", skills: ["AI Workflows", "Prompt Engineering", "Google Leadership", "Google Project Management"] },
    { id: "CERT-03", title: "AWS Cloud Practitioner Essentials", issuer: "Amazon Web Services", credentialId: "HTPJ07B98G54", skills: ["AWS Cloud", "Cloud Infrastructure", "Systems Scale", "Cloud Economics"] },
    { id: "CERT-04", title: "Full Stack Software Developer Assessment", issuer: "IBM", credentialId: "VH0MLV842PP4", skills: ["Assessment", "Architecture Validation", "Enterprise Design Templates", "LeetCode 130+ Solving"] },
    { id: "CERT-05", title: "Introduction to Software Engineering", issuer: "IBM", credentialId: "HZ28FS7TZXR1", skills: ["SDLC Paradigms", "Agile Core Engineering", "Design Patterns", "Clean Code Architecture"] },
    { id: "CERT-06", title: "Full-Stack Developer Capstone Project", issuer: "Microsoft", credentialId: "8BOCR2L2NPME", skills: ["Microsoft Next.js", "System Integration", "Production Architecture", "Prisma"] },
    { id: "CERT-07", title: "Getting Started with Git and GitHub", issuer: "IBM", credentialId: "SGT8CVAL48OQ", skills: ["Git", "GitHub Actions", "VCS Automations"] },
    { id: "CERT-08", title: "APIs", issuer: "Meta", credentialId: "EJH8P9B7D9PG", skills: ["RESTful APIs", "API Design Engine", "Secure Ingress Routing"] },
    { id: "CERT-09", title: "Microservice Architectures", issuer: "Vanderbilt University", credentialId: "ENB1OVY7NEOM", skills: ["Distributed Clusters", "Microservices Topology", "Event Streams"] },
    { id: "CERT-10", title: "Django Web Framework", issuer: "Meta", credentialId: "MT4OBCGZSXC3", skills: ["Python Engine", "Django MVC", "Prisma", "PostgreSQL", "MySQL"] },
    { id: "CERT-11", title: "Developing Back-End Apps with Node.js and Express", issuer: "IBM", credentialId: "UNNXMXRIIO69", skills: ["Node.js", "Express.js Engine", "Asynchronous Pipelines", "PostgreSQL", "MySQL"] },
    { id: "CERT-12", title: "Developing Front-End Apps with React", issuer: "IBM", credentialId: "CB7P5PSKFESH", skills: ["React.js", "Redux.js", "UI Design Core Spec", "UX Human-Interface Design"] }
];

const SKILL_TAXONOMY_ROUTER = {
    "Docker": { category: "DevOps & Platforms", intensity: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    "Kubernetes": { category: "DevOps & Platforms", intensity: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    "Virtualization": { category: "DevOps & Platforms", intensity: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
    "Data Engineering": { category: "DevOps & Platforms", intensity: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
    "AI Workflows": { category: "AI & Engineering Automation", intensity: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
    "Prompt Engineering": { category: "AI & Engineering Automation", intensity: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
    "Google Leadership": { category: "Management & Workflows", intensity: "bg-red-500/10 text-red-400 border-red-500/20" },
    "Google Project Management": { category: "Management & Workflows", intensity: "bg-red-500/10 text-red-400 border-red-500/20" },
    "AWS Cloud": { category: "DevOps & Platforms", intensity: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    "Cloud Infrastructure": { category: "DevOps & Platforms", intensity: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    "Systems Scale": { category: "Systems Architecture", intensity: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    "Cloud Economics": { category: "Management & Workflows", intensity: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
    "Assessment": { category: "Systems Architecture", intensity: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
    "Architecture Validation": { category: "Systems Architecture", intensity: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    "Enterprise Design Templates": { category: "Systems Architecture", intensity: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    "LeetCode 130+ Solving": { category: "Systems Architecture", intensity: "bg-rose-500/10 text-rose-400 border-rose-500/20 font-black" },
    "SDLC Paradigms": { category: "Management & Workflows", intensity: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
    "Agile Core Engineering": { category: "Management & Workflows", intensity: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
    "Design Patterns": { category: "Systems Architecture", intensity: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    "Clean Code Architecture": { category: "Systems Architecture", intensity: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    "Microsoft Next.js": { category: "Frontend Core Frameworks", intensity: "bg-teal-500/10 text-teal-400 border-teal-500/20" },
    "System Integration": { category: "Systems Architecture", intensity: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
    "Production Architecture": { category: "Systems Architecture", intensity: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    "Prisma": { category: "Database Infrastructure Topology", intensity: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
    "Git": { category: "DevOps & Platforms", intensity: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
    "GitHub Actions": { category: "DevOps & Platforms", intensity: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
    "VCS Automations": { category: "DevOps & Platforms", intensity: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
    "RESTful APIs": { category: "Backend Engine & APIs", intensity: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
    "API Design Engine": { category: "Backend Engine & APIs", intensity: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
    "Secure Ingress Routing": { category: "Backend Engine & APIs", intensity: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
    "Distributed Clusters": { category: "Systems Architecture", intensity: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    "Microservices Topology": { category: "Systems Architecture", intensity: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    "Event Streams": { category: "Backend Engine & APIs", intensity: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
    "Python Engine": { category: "Backend Engine & APIs", intensity: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
    "Django MVC": { category: "Backend Engine & APIs", intensity: "bg-emerald-600/10 text-emerald-400 border-emerald-600/20" },
    "PostgreSQL": { category: "Database Infrastructure Topology", intensity: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 font-bold" },
    "MySQL": { category: "Database Infrastructure Topology", intensity: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 font-bold" },
    "Node.js": { category: "Backend Engine & APIs", intensity: "bg-green-500/10 text-green-400 border-green-500/20 font-black" },
    "Express.js Engine": { category: "Backend Engine & APIs", intensity: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
    "Asynchronous Pipelines": { category: "Systems Architecture", intensity: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    "React.js": { category: "Frontend Core Frameworks", intensity: "bg-sky-500/10 text-sky-400 border-sky-500/20 font-black" },
    "Redux.js": { category: "Frontend Core Frameworks", intensity: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
    "UI Design Core Spec": { category: "Systems Aesthetics & Interface", intensity: "bg-pink-500/10 text-pink-400 border-pink-500/20" },
    "UX Human-Interface Design": { category: "Systems Aesthetics & Interface", intensity: "bg-pink-500/10 text-pink-400 border-pink-500/20" }
};

const CATEGORY_UI_DECK = {
    "Frontend Core Frameworks": "border-sky-500/20 bg-sky-950/10",
    "Backend Engine & APIs": "border-violet-500/20 bg-violet-950/10",
    "Database Infrastructure Topology": "border-indigo-500/20 bg-indigo-950/10",
    "DevOps & Platforms": "border-blue-500/20 bg-blue-950/10",
    "Systems Architecture": "border-emerald-500/20 bg-emerald-950/10",
    "AI & Engineering Automation": "border-purple-500/20 bg-purple-950/10",
    "Systems Aesthetics & Interface": "border-pink-500/20 bg-pink-950/10",
    "Management & Workflows": "border-slate-800 bg-slate-900/40"
};

const COMPILER_PIPELINE_STATES = {
    READY: "READY",
    ASSEMBLING: "ASSEMBLING_DEPENDENCY_TREE",
    VERIFIED: "INVERSION_GRAPH_COMPILE_SUCCESS"
};

const COMPILER_THEME_ROUTER = {
    [COMPILER_PIPELINE_STATES.READY]: { style: "text-slate-500 border-slate-950 bg-slate-900/10", statusMsg: "COMPILER_ONLINE_STANDBY" },
    [COMPILER_PIPELINE_STATES.ASSEMBLING]: { style: "text-amber-400 border-amber-500/20 bg-amber-950/20 animate-pulse", statusMsg: "MAPPING_INVERSION_TREE..." },
    [COMPILER_PIPELINE_STATES.VERIFIED]: { style: "text-emerald-400 border-emerald-500/20 bg-emerald-950/20", statusMsg: "GRAPH_RESOLVED_AND_MEMOIZED" }
};

const FALLBACK_TAXONOMY = { category: "General Systems Core", intensity: "bg-slate-500/10 text-slate-400 border-slate-500/20" };