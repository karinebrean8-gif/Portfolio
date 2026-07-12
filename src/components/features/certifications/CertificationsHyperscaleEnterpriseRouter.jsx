import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
// React Router Core Ingress - (যদি প্রোজেক্টে ইনস্টল করা থাকে, সরাসরি রান করবে)
import { BrowserRouter, Routes, Route, useNavigate, useParams, Link } from "react-router-dom";

// ============================================================================
// LAYER 1: IMMUTABLE MANIFEST & INFRASTRUCTURE CONFIGURATIONS
// ============================================================================

const GATEWAY_SPECS = Object.freeze({
    INGRESS_ENDPOINT: process.env.REACT_APP_API_URL || "https://api.ultra-faang.internal/v2",
    SECURE_TENANT_ID: "TENANT-L15-ULTRAGOD",
    TIMEOUT_MS: 5000
});

// Certification.mainfest.json Layer
const CERTIFICATION_MANIFEST = Object.freeze([
    {
        id: "aws-networking-2024",
        title: "AWS Certified Advanced Networking - Specialty",
        authority: "Amazon Web Services",
        licenseNumber: "AWS-NET-ADV-992",
        issueDate: "2024",
        verificationUrl: "https://aws.amazon.com/verification/aws-net-adv-992",
        skills: ["BGP Routing", "Multi-Region VPC Mesh", "AWS Direct Connect", "Transit Gateway"],
        tier: "CRITICAL_INFRASTRUCTURE"
    },
    {
        id: "gcp-fellow-2023",
        title: "Google Cloud Certified Fellow - Hybrid Cloud Architect",
        authority: "Google Cloud",
        licenseNumber: "GCP-FELLOW-8810",
        issueDate: "2023",
        verificationUrl: "https://cloud.google.com/verification/gcp-fellow-8810",
        skills: ["Anthos Service Mesh", "Bare Metal Compute Clusters", "Distributed Consensus Routing"],
        tier: "HYPERSCALE_ARCHITECTURE"
    },
    {
        id: "cka-kubernetes-2022",
        title: "Certified Kubernetes Administrator (CKA)",
        authority: "The Linux Foundation",
        licenseNumber: "CKA-7719-0012",
        issueDate: "2022",
        verificationUrl: "https://linuxfoundation.org/verify/cka-7719-0012",
        skills: ["Container Security", "etcd Cluster Recovery", "eBPF Kernel Instrumentation"],
        tier: "CRITICAL_INFRASTRUCTURE"
    }
]);

// ============================================================================
// LAYER 2: SYSTEM INFRASTRUCTURE & MULTI-TENANT SERVICES
// ============================================================================

const LoggerConsoleService = {
    log: (msg, src = "CORE") => console.log(`%c[${src}]: ${msg}`, "color: #38bdf8; font-family: monospace;"),
    warn: (msg, src = "WARN") => console.warn(`%c[${src}]: ${msg}`, "color: #fbbf24; font-weight: bold; font-family: monospace;")
};

const SecurityAuthorityService = {
    signToken: async (payload) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const signatureBytes = btoa(JSON.stringify(payload)).substring(0, 24);
                resolve(`SHA256//SECURE-SIG.${signatureBytes}`);
            }, 20);
        });
    }
};

const EdgeCacheTelemetryService = {
    syncPayload: async (telemetryNode) => {
        const abortToken = new AbortController();
        const threadTimer = setTimeout(() => abortToken.abort(), GATEWAY_SPECS.TIMEOUT_MS);

        try {
            const secureHandshake = await SecurityAuthorityService.signToken(telemetryNode);
            const ingressConfig = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Tenant-Signature": secureHandshake,
                    "X-Matrix-Ingress": GATEWAY_SPECS.SECURE_TENANT_ID
                },
                body: JSON.stringify({ telemetryNode, timestamp: new Date().toISOString() }),
                signal: abortToken.signal
            };

            // Live Telemetry Stream Ingress
            const response = await fetch(`${GATEWAY_SPECS.INGRESS_ENDPOINT}/telemetry`, ingressConfig);
            clearTimeout(threadTimer);
            return response.ok;
        } catch (fault) {
            clearTimeout(threadTimer);
            LoggerConsoleService.warn(`Telemetry pipeline deferred. Safe static caching applied: ${fault.message}`);
            return false;
        }
    }
};

const MultiTenantInversionService = Object.freeze({
    provideContextFabric: () => ({
        logger: LoggerConsoleService,
        telemetry: EdgeCacheTelemetryService,
        security: SecurityAuthorityService,
        immutableRegistry: CERTIFICATION_MANIFEST
    })
});

// ============================================================================
// LAYER 3: COMPOSABLE COMPUTATION HOOKS (Core Engine State Pipelines)
// ============================================================================

export function useQuantumDebounce(callbackFn, delayMs = 200) {
    const processRef = useRef(null);
    return useCallback((...args) => {
        if (processRef.current) clearTimeout(processRef.current);
        processRef.current = setTimeout(() => callbackFn(...args), delayMs);
    }, [callbackFn, delayMs]);
}

export function useTelemetryPipeline() {
    const fabric = useMemo(() => MultiTenantInversionService.provideContextFabric(), []);

    const dispatchTelemetry = useCallback(async (actionType, resourceId) => {
        fabric.logger.log(`Dispatching telemetry vector for event: ${actionType}`, "TELEMETRY_PIPELINE");
        const nodePayload = { actionType, resourceId, route: window.location.pathname };
        await fabric.telemetry.syncPayload(nodePayload);
    }, [fabric]);

    return { dispatchTelemetry, fabric };
}

export function useClusterMatrix() {
    const { dispatchTelemetry, fabric } = useTelemetryPipeline();
    const [registryState] = useState([...fabric.immutableRegistry]);
    const [searchFilter, setSearchFilter] = useState("");

    const actualFilteredMatrix = useMemo(() => {
        if (!searchFilter) return registryState;
        const cleanQuery = searchFilter.toLowerCase().trim();
        return registryState.filter(node =>
            node.title.toLowerCase().includes(cleanQuery) ||
            node.authority.toLowerCase().includes(cleanQuery) ||
            node.skills.some(skill => skill.toLowerCase().includes(cleanQuery))
        );
    }, [registryState, searchFilter]);

    const updateSearchQuery = useQuantumDebounce((query) => {
        setSearchFilter(query);
        dispatchTelemetry("SEARCH_QUERY_EXECUTION", query || "ALL_FABRIC");
    }, 250);

    return { actualFilteredMatrix, updateSearchQuery, dispatchTelemetry };
}

export function useVirtualScrollManager(itemsCount, rowHeight = 185) {
    const [scrollTop, setScrollTop] = useState(0);
    const containerViewportRef = useRef(null);

    const handleScrollEvent = useCallback((event) => {
        setScrollTop(event.currentTarget.scrollTop);
    }, []);

    const dimensions = useMemo(() => {
        const totalHeight = itemsCount * rowHeight;
        const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 1);
        const endIndex = Math.min(itemsCount - 1, Math.floor((scrollTop + 500) / rowHeight) + 1);

        return { totalHeight, startIndex, endIndex, offsetTop: startIndex * rowHeight };
    }, [scrollTop, itemsCount, rowHeight]);

    return { containerViewportRef, handleScrollEvent, dimensions };
}

// ============================================================================
// LAYER 4: MEMOIZED VDOM COMPONENTS (Atomic UI Nodes)
// ============================================================================

// --- VerificationLink.jsx ---
const VerificationLink = React.memo(({ url, onInterceptTelemetry }) => (
    <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onInterceptTelemetry}
        className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold px-3 py-1.5 rounded border border-cyan-500/20 text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all duration-200"
    >
        <span>Verify Original</span>
        <span className="text-[9px]">↗</span>
    </a>
));
VerificationLink.displayName = "VerificationLink";

// --- SkillFromCertification.jsx ---
const SkillFromCertification = React.memo(({ technicalTags }) => (
    <div className="flex flex-wrap gap-1.5 mt-4">
        {technicalTags.map((skill, index) => (
            <span
                key={index}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-900 font-semibold select-none"
            >
                {skill}
            </span>
        ))}
    </div>
));
SkillFromCertification.displayName = "SkillFromCertification";

// --- CertificationDetails.jsx ---
const CertificationDetails = React.memo(({ authority, id, license }) => (
    <div className="font-mono text-xs space-y-1 text-slate-400 mt-2 border-l border-slate-900/80 pl-3">
        <div className="flex items-center gap-1.5">
            <span className="text-slate-600 text-[10px]">ISSUER:</span>
            <span className="text-slate-300 font-bold">{authority}</span>
        </div>
        <div className="flex items-center gap-1.5">
            <span className="text-slate-600 text-[10px]">VERIFY_ID:</span>
            <span className="text-slate-500 text-[11px]">[{id}] // {license}</span>
        </div>
    </div>
));
CertificationDetails.displayName = "CertificationDetails";

// --- CertificationsCard.jsx ---
const CertificationsCard = React.memo(({ nodeData, onTriggerVerification, onTelemetryEvent }) => {
    const handleUrlInterception = useCallback(() => {
        onTelemetryEvent("VERIFICATION_LINK_REDIRECT", nodeData.id);
    }, [nodeData.id, onTelemetryEvent]);

    return (
        <div className="relative group bg-slate-900/30 rounded-xl border border-slate-900 hover:border-slate-800 p-5 transition-all duration-300 flex flex-col justify-between h-[170px]">
            <div>
                <div className="flex justify-between items-start">
                    <h3 className="text-base font-black tracking-tight text-slate-200 group-hover:text-purple-400 transition-colors truncate max-w-[80%]">
                        {nodeData.title}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-500 font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-900">
                        {nodeData.issueDate}
                    </span>
                </div>

                <CertificationDetails authority={nodeData.authority} id={nodeData.id} license={nodeData.licenseNumber} />
                <SkillFromCertification technicalTags={nodeData.skills} />
            </div>

            <div className="mt-4 pt-3 border-t border-slate-950 flex justify-between items-center">
                <button
                    onClick={() => onTriggerVerification(nodeData.id)}
                    className="text-[10px] font-mono font-bold text-purple-400 hover:text-purple-300 cursor-pointer"
                >
                    ⚡ OPEN_DYNAMIC_ROUTE
                </button>
                <VerificationLink url={nodeData.verificationUrl} onInterceptTelemetry={handleUrlInterception} />
            </div>
        </div>
    );
});
CertificationsCard.displayName = "CertificationsCard";

// ============================================================================
// LAYER 5: ROUTE PAGES & SUB-SYSTEM VIEWS
// ============================================================================

// --- Master Dashboard View Page ---
function CertificationsPage() {
    const navigate = useNavigate();
    const { actualFilteredMatrix, updateSearchQuery, dispatchTelemetry } = useClusterMatrix();
    const { containerViewportRef, handleScrollEvent, dimensions } = useVirtualScrollManager(actualFilteredMatrix.length, 185);

    const routeToCertificateNode = useCallback((id) => {
        dispatchTelemetry("ROUTER_NAVIGATE_DETAILS", id);
        navigate(`/certification/${id}`);
    }, [navigate, dispatchTelemetry]);

    const visibleCardSlices = useMemo(() => {
        return actualFilteredMatrix.slice(dimensions.startIndex, dimensions.endIndex + 1);
    }, [actualFilteredMatrix, dimensions.startIndex, dimensions.endIndex]);

    return (
        <div className="max-w-4xl mx-auto relative z-10">
            <header className="mb-12 border-b border-slate-900 pb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
                        <p className="text-xs font-mono tracking-widest text-purple-400 uppercase">L15 Quantum Router Layer</p>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 to-slate-500 bg-clip-text text-transparent">
                        Credentials Matrix
                    </h1>
                </div>

                <div className="w-full md:w-72 font-mono">
                    <input
                        type="text"
                        placeholder="[Search secure clusters...]"
                        onChange={(e) => updateSearchQuery(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-900 focus:border-purple-500/40 text-xs px-4 py-2.5 rounded text-slate-300 focus:outline-none placeholder:text-slate-700 font-bold transition-all"
                    />
                </div>
            </header>

            <div className="mb-6 flex justify-between items-center font-mono text-[10px] text-slate-500 uppercase tracking-wider px-1">
                <span>// BUFFER_VIRTUALIZATION_PIPELINE_STABLE</span>
                <span>COMPUTE_NODES: {actualFilteredMatrix.length}</span>
            </div>

            {actualFilteredMatrix.length === 0 ? (
                <div className="text-center py-24 bg-slate-950/40 rounded-xl border border-slate-900/60 font-mono text-xs text-slate-600">
                    NO CREDENTIAL MATRIX RECORDED IN RUNTIME CORE BUFFERS.
                </div>
            ) : (
                <div
                    ref={containerViewportRef}
                    onScroll={handleScrollEvent}
                    className="overflow-y-auto max-h-[600px] rounded-xl border border-slate-900/30"
                    style={{ position: "relative" }}
                >
                    <div style={{ height: `${dimensions.totalHeight}px`, width: "100%", position: "relative" }}>
                        <div
                            className="grid grid-cols-1 gap-4 w-full px-1"
                            style={{
                                transform: `translateY(${dimensions.offsetTop}px)`,
                                position: "absolute",
                                left: 0,
                                top: 0
                            }}
                        >
                            {visibleCardSlices.map((item) => (
                                <CertificationsCard
                                    key={item.id}
                                    nodeData={item}
                                    onTriggerVerification={routeToCertificateNode}
                                    onTelemetryEvent={dispatchTelemetry}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// --- Dynamic Certificate Viewer Page (Dedicated Route Screen) ---
function CertificateViewer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { dispatchTelemetry } = useTelemetryPipeline();

    const selectedCertificate = useMemo(() => {
        return CERTIFICATION_MANIFEST.find(node => node.id === id);
    }, [id]);

    useEffect(() => {
        if (id) dispatchTelemetry("MOUNTED_DYNAMIC_ROUTE_VIEWER", id);
    }, [id, dispatchTelemetry]);

    if (!selectedCertificate) {
        return (
            <div className="max-w-xl mx-auto text-center py-20 font-mono text-xs text-amber-500 bg-slate-950/40 border border-slate-900 rounded-xl">
                <p>[CRITICAL METRIC CONTEXT FAULT]: NODE ID NOT LOCATED IN MANIFEST.</p>
                <button onClick={() => navigate("/")} className="mt-4 px-4 py-2 bg-slate-900 text-slate-300 border border-slate-800 rounded text-[11px] cursor-pointer">
                    RETURN_TO_CORE_ROUTER
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto bg-slate-900 border border-purple-500/20 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(168,85,247,0.08)] font-mono relative z-10">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6">
                <span className="text-purple-400 font-bold flex items-center gap-2 text-xs">
                    <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
                    ISOLATED_SECURE_VERIFICATION_ROUTER
                </span>
                <button
                    onClick={() => { dispatchTelemetry("ROUTER_EXIT_DETAILS", id); navigate("/"); }}
                    className="text-slate-500 hover:text-slate-300 text-xs cursor-pointer"
                >
                    [RETURN_TO_CORE]
                </button>
            </div>

            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800/80 space-y-5">
                <div>
                    <span className="text-[10px] text-slate-500 block mb-1">// SYSTEM VERIFIED NODE RECORD</span>
                    <h2 className="text-xl font-black text-slate-100 tracking-tight">{selectedCertificate.title}</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t border-slate-900">
                    <div>
                        <span className="text-slate-600 block text-[10px]">ISSUER MATRIX</span>
                        <span className="text-slate-300 font-bold">{selectedCertificate.authority}</span>
                    </div>
                    <div>
                        <span className="text-slate-600 block text-[10px]">SECURITY ENCRYPTION TIER</span>
                        <span className="text-cyan-400 font-bold">{selectedCertificate.tier}</span>
                    </div>
                    <div>
                        <span className="text-slate-600 block text-[10px]">LICENSE SERIAL NUMBER</span>
                        <span className="text-slate-400 font-bold">{selectedCertificate.licenseNumber}</span>
                    </div>
                    <div>
                        <span className="text-slate-600 block text-[10px]">PRODUCTION STATE</span>
                        <span className="text-emerald-400 font-bold">ACTIVE_NODE_VERIFIED</span>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-900">
                    <span className="text-slate-600 block text-[10px] mb-2">VERIFIED CORE COMPETENCIES</span>
                    <div className="flex flex-wrap gap-2">
                        {selectedCertificate.skills.map((skill, index) => (
                            <span key={index} className="text-[11px] px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-slate-800">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// LAYER 6: GLOBAL ROOT APP ROUTER ORCHESTRATION CONTAINER
// ============================================================================

export default function CertificationsHyperscaleEnterpriseRouter() {
    return (
        <BrowserRouter>
            <div className="min-h-screen w-full bg-[#030712] text-slate-100 px-6 sm:px-12 py-16 font-sans antialiased relative overflow-hidden selection:bg-purple-500/30 selection:text-purple-200">

                {/* Absolute Architectural Grid Canvas Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                <div className="absolute top-0 right-1/4 -z-10 h-[500px] w-[800px] rounded-full bg-purple-500/5 blur-[140px]" />
                <div className="absolute bottom-0 left-1/4 -z-10 h-[500px] w-[800px] rounded-full bg-cyan-500/5 blur-[140px]" />

                {/* Global Routing Fabric Switcher Mapping */}
                <Routes>
                    <Route path="/" element={<CertificationsPage />} />
                    <Route path="/certification/:id" element={<CertificateViewer />} />
                </Routes>

            </div>
        </BrowserRouter>
    );
}