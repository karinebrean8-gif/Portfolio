import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { createBrowserRouter, RouterProvider, useNavigate, useParams } from "react-router-dom";

// Constants & Mock Data Ingress
const API_URL = process.env.REACT_APP_API_URL || "https://api.ultra-faang.internal/v3";

const STATIC_STUDIES = Object.freeze([
    {
        id: "distributed-ledger-scaling",
        title: "Re-Architecting Multi-Exabyte Distributed Ledgers",
        client: "Global Financial Infrastructure Ingress",
        epoch: "2024 - 2025",
        problem: "Legacy sharding protocols suffered from severe database lock contention, causing write degradation at peak traffic loads (exceeding 1.2M operations/sec).",
        solution: "Designed an asynchronous distributed consensus ring with localized zero-copy memory pipelines and event-driven optimistic state locks.",
        architecture: { layer: "Core Kernel Systems", topology: "Decoupled Rings Mesh", throughput: "18.4M IOPS Target" },
        scaling: [
            "Deployed dynamic network routing shifting loads away from congested clusters.",
            "Optimized Linux socket layers via custom eBPF kernel telemetry injectors."
        ],
        tradeOffs: {
            pros: ["Eliminated lock overhead completely", "Reduced CPU cycle utilization by 45%"],
            cons: ["Increased operational consistency window by 14ms", "Elevated initial memory overhead by 8GB per node"]
        },
        lessons: [
            "Hardware-level memory alignments yield higher optimizations than micro-service isolation.",
            "Optimistic locking works exceptionally well if collision surfaces are mapped accurately."
        ]
    },
    {
        id: "hyperscale-video-ingress",
        title: "Zero-Copy Video Routing for 4K Hyperscale Streams",
        client: "Entertainment Streaming Matrix",
        epoch: "2023 - 2024",
        problem: "Kernel space to user space context switching overhead caused extreme CPU thrashing on 100GbE network interfaces under heavy concurrent requests.",
        solution: "Implemented kernel-level packet routing bypass using custom FreeBSD socket structures and high-performance ring buffers.",
        architecture: { layer: "Network Infrastructure Layer", topology: "Edge Content Mesh", throughput: "4.2 Tbps Continuous Load" },
        scaling: [
            "Allocated memory directly from the network card interface to pre-allocated buffers.",
            "Engineered an abstract scheduler avoiding thread allocation overhead entirely."
        ],
        tradeOffs: {
            pros: ["Zero-copy operations dropped context switching to zero", "Network latency dropped by 62%"],
            cons: ["Debugging requires native kernel analysis tools", "Strict dependency on explicit cloud hardware configurations"]
        },
        lessons: [
            "Bypassing runtime engines directly to native structures yields the highest predictable velocity.",
            "Clean abstractions inside kernel wrappers avoid cascading maintenance debt."
        ]
    }
]);

// Custom Hooks for Debounce & Event Pipelines
export function useDebounce(callbackFn, delayMs = 200) {
    const executionRef = useRef(null);
    return useCallback((...args) => {
        if (executionRef.current) clearTimeout(executionRef.current);
        executionRef.current = setTimeout(() => callbackFn(...args), delayMs);
    }, [callbackFn, delayMs]);
}

export function useDataPipeline() {
    const [state, setState] = useState({ dataset: [], loading: true });

    const fetchMatrix = useCallback(async () => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            const response = await fetch(`${API_URL}/portfolio/casestudies`, { signal: AbortSignal.timeout(6000) });
            const payload = await response.json();
            setState({ dataset: payload?.data || [...STATIC_STUDIES], loading: false });
        } catch {
            setState({ dataset: [...STATIC_STUDIES], loading: false });
        }
    }, []);

    useEffect(() => {
        fetchMatrix();
    }, [fetchMatrix]);

    return { ...state, refresh: fetchMatrix };
}

// Highly Reusable & Clean Sub-Components
const CaseStudiesCard = React.memo(({ node, onInspect }) => (
    <div className="group relative bg-slate-900/20 border border-slate-900 hover:border-cyan-500/20 rounded-2xl p-6 sm:p-8 transition-all duration-300 shadow-xl">
        <div className="absolute top-0 left-0 w-6 h-[1px] bg-cyan-500/40 group-hover:w-12 transition-all" />
        <div className="absolute top-0 left-0 w-[1px] h-6 bg-cyan-500/40 group-hover:h-12 transition-all" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900/60 pb-4 mb-4">
            <div>
                <h3 className="text-xl font-black text-slate-200 group-hover:text-cyan-400 transition-colors">{node.title}</h3>
                <p className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-wider">{node.client}</p>
            </div>
            <span className="text-xs font-mono bg-slate-950 px-3 py-1 rounded border border-slate-900 text-cyan-400 font-bold self-start sm:self-auto">
                {node.epoch}
            </span>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed font-sans line-clamp-2 mb-6">{node.problem}</p>
        <div className="flex justify-end pt-2 border-t border-slate-950">
            <button onClick={() => onInspect(node.id)} className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer">
                INSPECT_SYSTEM_ARCHITECTURE 🡪
            </button>
        </div>
    </div>
));
CaseStudiesCard.displayName = "CaseStudiesCard";

const SectionBlock = React.memo(({ title, children, variant = "info" }) => {
    const styles = variant === "danger"
        ? "bg-rose-950/10 border-rose-950/40 text-rose-400"
        : variant === "success" ? "bg-emerald-950/10 border-emerald-950/40 text-emerald-400" : "bg-slate-950/40 border-slate-900 text-slate-400";

    return (
        <div className={`p-5 rounded-xl border ${styles} space-y-2`}>
            <h4 className="text-xs font-mono font-black tracking-widest uppercase flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-current" /> {title}
            </h4>
            <div className="text-sm text-slate-300 leading-relaxed font-sans">{children}</div>
        </div>
    );
});
SectionBlock.displayName = "SectionBlock";

// Page Views
function CaseStudiesPage({ dataset, loading, onInspect }) {
    const [query, setQuery] = useState("");

    const filtered = useMemo(() => {
        const cleaned = query.toLowerCase().trim();
        return dataset.filter(n => n.title.toLowerCase().includes(cleaned) || n.client.toLowerCase().includes(cleaned));
    }, [dataset, query]);

    const handleSearch = useDebounce(setQuery, 200);

    return (
        <div className="max-w-4xl mx-auto relative z-10">
            <header className="mb-12 border-b border-slate-900 pb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <p className="text-xs font-mono tracking-widest text-cyan-400 uppercase">// L15 Hyperscale Retrospectives</p>
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent mt-1">
                        Architectural Case Studies
                    </h1>
                </div>
                <input
                    type="text"
                    placeholder="[Query architectural nodes...]"
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full md:w-72 bg-slate-950 border border-slate-900 focus:border-cyan-500/40 text-xs px-4 py-2.5 rounded text-slate-300 focus:outline-none font-mono"
                />
            </header>

            {loading ? (
                <div className="text-center py-36 font-mono text-xs text-slate-600 animate-pulse">CONNECTING_TO_FABRIC...</div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {filtered.length === 0 ? (
                        <div className="text-center py-20 bg-slate-950/40 border border-slate-900 rounded-xl font-mono text-xs text-slate-600">NO NODES DETECTED.</div>
                    ) : (
                        filtered.map(node => <CaseStudiesCard key={node.id} node={node} onInspect={onInspect} />)
                    )}
                </div>
            )}
        </div>
    );
}

function CaseStudiesDetails({ dataset, onBack }) {
    const { id } = useParams();
    const node = useMemo(() => dataset.find(item => item.id === id), [dataset, id]);

    if (!node) {
        return (
            <div className="max-w-xl mx-auto text-center py-16 bg-slate-950/40 border border-slate-900 rounded-xl font-mono text-xs text-amber-500">
                <p>[ERROR]: NODE IDENTIFIER FAILED.</p>
                <button onClick={onBack} className="mt-4 px-4 py-2 bg-slate-900 border border-slate-800 text-slate-300 rounded cursor-pointer">RETURN_TO_FABRIC</button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto bg-slate-900/10 border border-slate-900/80 rounded-2xl p-6 sm:p-10 shadow-2xl relative z-10 space-y-6">
            <header className="flex justify-between items-center border-b border-slate-900 pb-4 font-mono text-xs">
                <span className="text-cyan-400 font-bold flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" /> DEEP_DIVE_ENV</span>
                <button onClick={onBack} className="text-slate-500 hover:text-slate-300 cursor-pointer">[EXIT_ENV]</button>
            </header>

            <div>
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">{node.client}</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight mt-1">{node.title}</h2>
            </div>

            <SectionBlock title="01 // CRITICAL PROBLEM STATEMENT" variant="danger">{node.problem}</SectionBlock>
            <SectionBlock title="02 // RESOLUTION & IMPLEMENTATION" variant="success">{node.solution}</SectionBlock>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-900/80 font-mono text-xs grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Object.entries(node.architecture).map(([key, value]) => (
                    <div key={key} className="border-l border-slate-800 pl-3">
                        <span className="text-slate-600 block uppercase font-bold text-[9px]">{key}</span>
                        <span className="text-slate-200 font-bold text-sm block mt-0.5">{value}</span>
                    </div>
                ))}
            </div>

            <SectionBlock title="03 // INGRESS SCALING TOPOLOGIES">
                <ul className="space-y-1.5 font-mono text-xs text-slate-300">
                    {node.scaling.map((item, i) => <li key={i} className="flex gap-2"><span>►</span><span>{item}</span></li>)}
                </ul>
            </SectionBlock>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-4">
                    <span className="text-emerald-400 font-bold block mb-2 border-b border-slate-900 pb-1.5">// ADVANTAGES</span>
                    <ul className="space-y-1 list-inside list-disc text-slate-400">{node.tradeOffs.pros.map((p, i) => <li key={i}>{p}</li>)}</ul>
                </div>
                <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-4">
                    <span className="text-amber-500 font-bold block mb-2 border-b border-slate-900 pb-1.5">// ARCHITECTURAL COST</span>
                    <ul className="space-y-1 list-inside list-disc text-slate-400">{node.tradeOffs.cons.map((c, i) => <li key={i}>{c}</li>)}</ul>
                </div>
            </div>

            <SectionBlock title="04 // ENGINEERING RETROSPECTIVE">
                <ul className="space-y-2 text-slate-300 list-none">{node.lessons.map((l, i) => <li key={i} className="flex gap-2"><span>▪</span><span>{l}</span></li>)}</ul>
            </SectionBlock>
        </div>
    );
}

// Master Layout Boilerplate
function LayoutWrapper({ children }) {
    return (
        <div className="min-h-screen w-full bg-[#030712] text-slate-100 px-6 sm:px-12 py-16 antialiased relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a40_1px,transparent_1px),linear-gradient(to_bottom,#0f172a40_1px,transparent_1px)] bg-[size:5rem_5rem]" />
            <div className="absolute top-0 left-1/4 -z-10 h-[500px] w-[800px] rounded-full bg-cyan-500/5 blur-[140px]" />
            {children}
        </div>
    );
}

// Core App Orchestrator
export default function CaseStudiesHyperscaleOperationalEngine() {
    const { dataset, loading } = useDataPipeline();

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <LayoutWrapper>
                    <CaseStudiesPage dataset={dataset} loading={loading} onInspect={(id) => window.location.assign(`/casestudy/${id}`)} />
                </LayoutWrapper>
            )
        },
        {
            path: "/casestudy/:id",
            element: (
                <LayoutWrapper>
                    <CaseStudiesDetails dataset={dataset} onBack={() => window.location.assign("/")} />
                </LayoutWrapper>
            )
        }
    ]);

    return <RouterProvider router={router} />;
}