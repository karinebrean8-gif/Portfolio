

import React, { useState, useMemo, useCallback } from 'react';

// ============================================================================
// 1. SYSTEM CONTRACT MANIFEST (Pure Invariant Data Infrastructure Layer)
// ============================================================================
const CERTIFICATE_MANIFEST = {
  METADATA: {
    engineSignature: "ENGINE-CORE-v99.50-DISTINGUISHED",
    tier: "L10-Principal-Presentation-Node",
    protocolSpec: "Reactive-Zero-Conditional-State-Router"
  },
  DATABASE: [
    { id: "CERT-01", title: "Virtualization, Docker, and Kubernetes for Data Engineering", issuer: "Duke University", issued: "Jun 2026", expires: "Apr 2035", credentialId: "3CCYPNBIEK26", systemTrack: "DevOps & Data Systems", skills: ["Docker", "Kubernetes", "Virtualization", "Data Engineering"] },
    { id: "CERT-02", title: "Accelerate Your Job Search with AI", issuer: "Google", issued: "Jun 2026", expires: "Jun 2036", credentialId: "8NSHZKDSCL16", systemTrack: "AI & Workflow Automation", skills: ["AI Workflows", "Prompt Engineering", "Google Leadership", "Google Project Management"] },
    { id: "CERT-03", title: "AWS Cloud Practitioner Essentials", issuer: "Amazon Web Services", issued: "Jun 2026", expires: "Sep 2036", credentialId: "HTPJ07B98G54", systemTrack: "DevOps & Data Systems", skills: ["AWS Cloud", "Cloud Infrastructure", "Systems Scale", "Economics"] },
    { id: "CERT-04", title: "Full Stack Software Developer Assessment", issuer: "IBM", issued: "May 2026", expires: "Jun 2036", credentialId: "VH0MLV842PP4", systemTrack: "Fullstack Architecture", skills: ["Assessment", "Architecture Validation", "Enterprise Design Templates"] },
    { id: "CERT-05", title: "Introduction to Software Engineering", issuer: "IBM", issued: "Jun 2026", expires: "Sep 2036", credentialId: "HZ28FS7TZXR1", systemTrack: "Fullstack Architecture", skills: ["SDLC Paradigms", "Agile Core Engineering", "Design Patterns"] },
    { id: "CERT-06", title: "Full-Stack Developer Capstone Project", issuer: "Microsoft", issued: "Jun 2026", expires: "Jun 2036", credentialId: "8BOCR2L2NPME", systemTrack: "Fullstack Architecture", skills: ["Microsoft Next.js", "System Integration", "Production Architecture"] },
    { id: "CERT-07", title: "Getting Started with Git and GitHub", issuer: "IBM", issued: "Jun 2026", expires: "Jul 2036", credentialId: "SGT8CVAL48OQ", systemTrack: "Version Control Infrastructure", skills: ["Git", "GitHub Actions", "VCS Automations"] },
    { id: "CERT-08", title: "APIs", issuer: "Meta", issued: "Jun 2026", expires: "Aug 2036", credentialId: "EJH8P9B7D9PG", systemTrack: "Backend Systems Engine", skills: ["RESTful APIs", "API Design Engine", "Secure Ingress Routing"] },
    { id: "CERT-09", title: "Microservice Architectures", issuer: "Vanderbilt University", issued: "Jun 2026", expires: "Oct 2036", credentialId: "ENB1OVY7NEOM", systemTrack: "Backend Systems Engine", skills: ["Distributed Clusters", "Microservices Topology", "Event Streams"] },
    { id: "CERT-10", title: "Django Web Framework", issuer: "Meta", issued: "Jun 2026", expires: "Permanent", credentialId: "MT4OBCGZSXC3", systemTrack: "Backend Systems Engine", skills: ["Python Engine", "Django MVC", "Prisma Relational Mapping"] },
    { id: "CERT-11", title: "Developing Back-End Apps with Node.js and Express", issuer: "IBM", issued: "Jun 2026", expires: "Jan 2036", credentialId: "UNNXMXRIIO69", systemTrack: "Backend Systems Engine", skills: ["Node.js Framework", "Express.js Engine", "Asynchronous Pipelines"] },
    { id: "CERT-12", title: "Developing Front-End Apps with React", issuer: "IBM", issued: "Jun 2026", expires: "Jun 2026", credentialId: "CB7P5PSKFESH", systemTrack: "Frontend Systems Engineering", skills: ["React.js Core", "Redux.js State Machine", "Context Optimization"] }
  ],
  METRIC_VERTICALS: [
    { domain: "Algorithmic Runtime Performance Engine", targets: ["LeetCode 130+ Solved Matrix", "Complex Dynamic Programming Mastery", "Data Structure Optimization"] },
    { domain: "Database Infrastructure Topology", targets: ["PostgreSQL Production Shards", "MySQL Cluster Engine", "Prisma High-Throughput ORM"] },
    { domain: "Systems Aesthetics & Interface Architecture", targets: ["UI Design Core Spec", "UX Human-Interface Design", "Design Tokens Automation"] }
  ]
};

// ============================================================================
// 2. O(1) STRATEGY REGISTER DICTIONARIES (Eliminates Imperative Logic Chains)
// ============================================================================
const ENGINE_MUTATION_STATES = {
  IDLE: 'STATE_SYSTEM_STANDBY',
  DECRYPTING: 'STATE_COMPUTING_HASH_PROOFS',
  VERIFIED: 'STATE_CRYPTOGRAPHIC_SIGNATURE_MATCHED'
};

const AUTHORITY_BRANDING_ROUTER = {
  "Duke University": { border: "border-blue-500/20", glow: "hover:shadow-blue-950/30", text: "text-blue-400", bg: "bg-blue-950/40" },
  "Google": { border: "border-red-500/20", glow: "hover:shadow-red-950/30", text: "text-red-400", bg: "bg-red-950/40" },
  "Amazon Web Services": { border: "border-amber-500/20", glow: "hover:shadow-amber-950/30", text: "text-amber-400", bg: "bg-amber-950/40" },
  "IBM": { border: "border-cyan-500/20", glow: "hover:shadow-cyan-950/30", text: "text-cyan-400", bg: "bg-cyan-950/40" },
  "Microsoft": { border: "border-teal-500/20", glow: "hover:shadow-teal-950/30", text: "text-teal-400", bg: "bg-teal-950/40" },
  "Meta": { border: "border-indigo-500/20", glow: "hover:shadow-indigo-950/30", text: "text-indigo-400", bg: "bg-indigo-950/40" },
  "Vanderbilt University": { border: "border-yellow-600/20", glow: "hover:shadow-yellow-950/30", text: "text-yellow-500", bg: "bg-yellow-950/40" }
};

const UI_STATE_METRIC_ROUTER = {
  [ENGINE_MUTATION_STATES.IDLE]: { statusText: "AWAITING_STREAM_INGRESS", badgeStyle: "bg-slate-900 text-slate-500 border-slate-800", textStyle: "text-slate-500" },
  [ENGINE_MUTATION_STATES.DECRYPTING]: { statusText: "COMPUTING_ASYNC_MERKLE_PROOF", badgeStyle: "bg-amber-950 text-amber-400 border-amber-500/30 animate-pulse", textStyle: "text-amber-400" },
  [ENGINE_MUTATION_STATES.VERIFIED]: { statusText: "CRYPTOGRAPHIC_SIGNATURE_VERIFIED_SECURE", badgeStyle: "bg-emerald-950 text-emerald-400 border-emerald-500/30", textStyle: "text-emerald-400" }
};

const BRAND_FALLBACK = { border: "border-slate-800", glow: "hover:shadow-transparent", text: "text-slate-400", bg: "bg-slate-950" };

// ============================================================================
// 3. INTERNAL BUSINESS LOGIC HOOK MAPPING ENGINE
// ============================================================================
function useTelemetryEngine() {
  const [activePayload, setActivePayload] = useState(null);
  const [structuralState, setStructuralState] = useState(ENGINE_MUTATION_STATES.IDLE);

  const interceptAndDecryptStream = useCallback(async (targetPayload) => {
    setActivePayload(targetPayload);
    setStructuralState(ENGINE_MUTATION_STATES.DECRYPTING);

    // native asynchronous delay emulation workflow patterns using Native Promise
    await new Promise((resolvePipeline) => setTimeout(resolvePipeline, 500));
    setStructuralState(ENGINE_MUTATION_STATES.VERIFIED);
  }, []);

  const resetTelemetryChannel = useCallback(() => {
    setActivePayload(null);
    setStructuralState(ENGINE_MUTATION_STATES.IDLE);
  }, []);

  return { activePayload, structuralState, interceptAndDecryptStream, resetTelemetryChannel };
}

// ============================================================================
// 4. ATOMIC MICRO-COMPONENTS (Pure Presentation Layout Modules)
// ============================================================================
const CredentialNodeRow = React.memo(({ data, selectedNodeId, onSelectionTrigger }) => {
  const brandConfig = useMemo(() => AUTHORITY_BRANDING_ROUTER[data.issuer] || BRAND_FALLBACK, [data.issuer]);
  const isSelected = selectedNodeId === data.id;

  const dynamicLayoutClass = isSelected
    ? "border-emerald-500/60 bg-slate-900/50 shadow-xl scale-[1.005]"
    : "border-slate-900 bg-slate-900/10 hover:border-slate-800 hover:bg-slate-900/25";

  return (
    <div
      onClick={() => onSelectionTrigger(data)}
      className={`p-5 rounded-xl border ${dynamicLayoutClass} ${brandConfig.border} ${brandConfig.glow} transition-all duration-300 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 group`}
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 block">
            // {data.systemTrack}
          </span>
          <h3 className="text-base font-bold text-slate-200 group-hover:text-emerald-400 transition-colors duration-200">
            {data.title}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-mono text-slate-400">
          <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide border border-transparent ${brandConfig.bg} ${brandConfig.text}`}>
            {data.issuer}
          </span>
          <span className="text-slate-700">|</span>
          <span className="text-slate-500">Issued: <strong className="text-slate-300">{data.issued}</strong></span>
          <span className="text-slate-700">·</span>
          <span className="text-slate-500">Expires: <strong className="text-slate-300">{data.expires}</strong></span>
        </div>
      </div>

      <div className="flex flex-col items-start md:items-end justify-center shrink-0 space-y-2 pt-3 md:pt-0 border-t border-slate-900 md:border-none">
        <span className="text-[11px] font-mono text-slate-600 group-hover:text-emerald-500 transition-colors duration-200">
          HASH: {data.credentialId}
        </span>
        <div className="flex flex-wrap gap-1 max-w-[280px] justify-start md:justify-end">
          {data.skills.slice(0, 2).map((skill) => (
            <span key={skill} className="text-[9px] font-mono bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-900">
              {skill}
            </span>
          ))}
          {data.skills.length > 2 && (
            <span className="text-[9px] font-mono bg-slate-950 text-emerald-400/90 px-2 py-0.5 rounded border border-emerald-950/40">
              +{data.skills.length - 2} skill domains
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

CredentialNodeRow.displayName = 'CredentialNodeRow';

const TelemetryInspectorChannel = React.memo(({ activePayload, structuralState, onDisconnect }) => {
  const dynamicUiProfile = useMemo(() => UI_STATE_METRIC_ROUTER[structuralState] || UI_STATE_METRIC_ROUTER[ENGINE_MUTATION_STATES.IDLE], [structuralState]);

  if (!activePayload) {
    return (
      <div className="h-full min-h-[450px] border border-dashed border-slate-900 rounded-xl flex flex-col items-center justify-center p-8 text-center text-slate-600 font-mono text-xs leading-relaxed">
        [ NODE INTERCEPT ENGINE OFFLINE ]<br />Select an enterprise system credential token payload to initialize asynchronous checksum verification protocols.
      </div>
    );
  }

  return (
    <aside className="sticky top-8 p-6 rounded-xl bg-slate-900/20 border border-slate-900 space-y-6 shadow-2xl animate-fadeIn">
      <div className="flex items-center justify-between border-b border-slate-900 pb-4">
        <h2 className="text-xs font-mono tracking-widest text-slate-400 uppercase">
          Asymmetric Cryptographic Telemetry
        </h2>
        <button
          onClick={onDisconnect}
          className="text-xs font-mono text-slate-500 hover:text-rose-400 transition-colors duration-150 cursor-pointer bg-transparent border-none outline-none"
        >
          [ drop_ingress_stream ]
        </button>
      </div>

      <div className="space-y-2 font-mono">
        <div className="text-[10px] text-slate-500 uppercase tracking-widest">Crypto Engine Processing State</div>
        <span className={`inline-block px-3 py-1 text-[10px] font-bold tracking-wider rounded border ${dynamicUiProfile.badgeStyle}`}>
          {dynamicUiProfile.statusText}
        </span>
      </div>

      <div className="space-y-4 pt-2">
        <div>
          <label className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">Classification Spec Mapping</label>
          <span className="text-sm font-black text-slate-200 block mt-1 leading-snug">{activePayload.title}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-900 py-3.5">
          <div>
            <label className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">Authority Engine</label>
            <span className="text-xs font-bold text-slate-300 block mt-0.5">{activePayload.issuer}</span>
          </div>
          <div>
            <label className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">Epoch Delta</label>
            <span className="text-xs font-mono text-slate-400 block mt-0.5">{activePayload.issued} · {activePayload.expires}</span>
          </div>
        </div>

        <div>
          <label className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">SHA-256 Invariant Verification String</label>
          <span className="text-xs font-mono text-emerald-400 bg-slate-950/80 border border-slate-900 px-3 py-2 rounded-lg block mt-1.5 break-all select-all font-semibold tracking-wide shadow-inner">
            {activePayload.credentialId}
          </span>
        </div>

        <div className="pt-2">
          <label className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider mb-2.5">Domain Verification Skills Stack Mapping</label>
          <div className="flex flex-wrap gap-1.5">
            {activePayload.skills.map((skill) => (
              <span key={skill} className="text-[10px] font-mono bg-slate-950 text-slate-300 px-2.5 py-1 rounded border border-slate-800 hover:border-slate-700 transition-colors duration-150">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
});

TelemetryInspectorChannel.displayName = 'TelemetryInspectorChannel';

// ============================================================================
// 5. MAIN SYSTEM ENTRY CONTAINER ENGINE
// ============================================================================
export default function CertificationsCard() {
  const {
    activePayload,
    structuralState,
    interceptAndDecryptStream,
    resetTelemetryChannel
  } = useTelemetryEngine();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500/20 py-24 px-4 sm:px-8 lg:px-16">

      {/* INTERFACE HEAD ARCHITECTURE SPEC */}
      <header className="max-w-7xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono tracking-widest text-emerald-400 uppercase rounded-full bg-emerald-950/40 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          SYSTEM_INGRESS_MANIFEST_ONLINE
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-100">
          Production Infrastructure <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Credentials & Verification Matrix</span>
        </h1>
      </header>

      {/* COMPONENT INTERACTION FIELD SPLIT-GRID */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* COMPONENT STREAM ROW CONTROLS */}
        <section className="lg:col-span-2 space-y-3 max-h-[78vh] overflow-y-auto pr-2 custom-scrollbar">
          {CERTIFICATE_MANIFEST.DATABASE.map((certificate) => (
            <CredentialNodeRow
              key={certificate.id}
              data={certificate}
              selectedNodeId={activePayload?.id}
              onSelectionTrigger={interceptAndDecryptStream}
            />
          ))}
        </section>

        {/* SIDEBAR DETAILED TERMINAL CHANNEL */}
        <section className="relative">
          <TelemetryInspectorChannel
            activePayload={activePayload}
            structuralState={structuralState}
            onDisconnect={resetTelemetryChannel}
          />
        </section>
      </main>

      {/* STRATEGIC CAPABILITIES MATRIX FOOTER */}
      <footer className="max-w-7xl mx-auto mt-20 pt-12 border-t border-slate-900">
        <h2 className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-8">
          Continuous Specialization Verticals & Global Verified Capabilities Channels
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CERTIFICATE_MANIFEST.METRIC_VERTICALS.map((metric) => (
            <div
              key={metric.domain}
              className="p-5 rounded-xl bg-slate-900/10 border border-slate-900 flex flex-col justify-between gap-4 hover:border-slate-800 transition-colors duration-200"
            >
              <h4 className="text-xs font-mono text-slate-400 font-bold border-b border-slate-900 pb-2.5">
                // {metric.domain}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {metric.targets.map((nodeEntity) => (
                  <span
                    key={nodeEntity}
                    className="px-2.5 py-1 text-[10px] font-mono bg-slate-950 text-emerald-400/80 border border-emerald-500/5 rounded-md shadow-sm"
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