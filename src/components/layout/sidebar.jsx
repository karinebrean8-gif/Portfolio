import React, { useState, useEffect, useMemo, useCallback } from 'react';

// ============================================================================
// ARCHITECTURE : ULTRA-FAANG PRINCIPAL ENGINE CORE (50+ YRS EXP MATRIX)
// DESIGN PATTERN: IMMUTABLE DATA-DRIVEN DECLARATIVE UI PROTOCOL
// ============================================================================

/**
 * Immutable Core Configuration for System Subsystems.
 * Frozen object matrix ensuring zero runtime drift.
 */
const SYSTEM_METRICS = Object.freeze({
  IDENTITY: {
    NAME: "Shakib Mia",
    TITLE: "Principal Systems Architect & UltraFAANG Fellow",
    EXPERIENCE_EPOCH: "50+ YRS ENGINE CODES",
    NODE_ID: "FAANG-CORE-001X",
  },
  THEME: {
    DARK_BG: "bg-slate-950",
    BORDER_COLOR: "border-slate-900/60",
    GLOW_EFFECT: "shadow-lg shadow-emerald-500/5",
    ACTIVE_TEXT: "text-emerald-400",
    INACTIVE_TEXT: "text-slate-400 hover:text-slate-200",
  }
});

/**
 * Array Matrix defining the architectural navigation tree.
 */
const NAVIGATION_NODES = [
  {
    category: "QUANTUM KERNEL MODULES",
    nodes: [
      { id: "dashboard", label: "Core Matrix Control", icon: "📊", badge: "LIVE" },
      { id: "clusters", label: "Multi-Region Distributed Systems", icon: "🌐", badge: "99.99%" },
      { id: "pipelines", label: "High-Throughput CI/CD Pipelines", icon: "🧬" }
    ]
  },
  {
    category: "ENTERPRISE STORAGE & LEDGERS",
    nodes: [
      { id: "databases", label: "Sharded Quantum Ledgers", icon: "🗄️" },
      { id: "security", label: "Zero-Trust Mesh Shield", icon: "🛡️", badge: "SECURE" }
    ]
  },
  {
    category: "TELEMETRY & LOGISTICS",
    nodes: [
      { id: "telemetry", label: "Real-Time Packet Diagnostics", icon: "📡" },
      { id: "settings", label: "Ecosystem Runtime Settings", icon: "⚙️" }
    ]
  }
];

/**
 * Deep-Mocking Asynchronous Initialization Layer via Native Promises.
 * Simulates high-speed cache validation before hydration.
 */
const verifySystemState = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: "STABLE", latency: "0.04ms", integrity: 1.0 });
    }, 450);
  });
};

// ============================================================================
// COMPONENTS LAYER: CLEAN, DECOUPLED ATOMIC COMPONENTS
// ============================================================================

/**
 * Atomic Metadata Header Component.
 * Memoized to prevent parent redraw leaks.
 */
const SidebarHeader = React.memo(() => {
  const meta = SYSTEM_METRICS.IDENTITY;
  return (
    <div className={`p-6 border-b ${SYSTEM_METRICS.THEME.BORDER_COLOR} font-mono`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-lg shadow-inner animate-pulse">
          ⚡
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-black text-white tracking-wide truncate uppercase">{meta.NAME}</h2>
          <p className="text-[10px] text-emerald-400 font-bold mt-0.5 tracking-tight">{meta.NODE_ID}</p>
        </div>
      </div>
      <div className="mt-4 p-2.5 rounded-lg bg-slate-900/40 border border-slate-900 text-[10px] text-slate-400 leading-tight">
        <div>{meta.TITLE}</div>
        <div className="text-[9px] text-slate-500 font-bold mt-1 tracking-widest">{meta.EXPERIENCE_EPOCH}</div>
      </div>
    </div>
  );
});
SidebarHeader.displayName = "SidebarHeader";

/**
 * Navigation Action Row Element.
 */
const NavLink = React.memo(({ item, isActive, onSelect }) => {
  const theme = SYSTEM_METRICS.THEME;
  const currentClass = isActive
    ? `${theme.ACTIVE_TEXT} bg-emerald-500/5 border-r-2 border-emerald-500 font-bold`
    : `${theme.INACTIVE_TEXT} hover:bg-slate-900/20`;

  return (
    <button
      onClick={() => onSelect(item.id)}
      className={`w-full flex items-center justify-between px-4 py-3 text-xs font-mono rounded-lg transition-all duration-200 group ${currentClass}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-sm opacity-80 group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
        <span className="tracking-wide">{item.label}</span>
      </div>
      {item.badge && (
        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${isActive
            ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-400"
            : "bg-slate-950 border-slate-900 text-slate-500 group-hover:text-slate-400"
          }`}>
          {item.badge}
        </span>
      )}
    </button>
  );
});
NavLink.displayName = "NavLink";

// ============================================================================
// MAIN CORE ARCHITECTURE VIEW
// ============================================================================
export default function UltraGodSidebarView({ activeRoute = "dashboard", onRouteChange }) {
  const [currentActive, setCurrentActive] = useState(activeRoute);
  const [sysDiagnostic, setSysDiagnostic] = useState({ status: "INITIALIZING", latency: "..." });

  // Native async handler wrapping the verification layer
  useEffect(() => {
    let isMounted = true;

    verifySystemState()
      .then((payload) => {
        if (isMounted) setSysDiagnostic(payload);
      })
      .catch(() => {
        if (isMounted) setSysDiagnostic({ status: "FAULT_DETECTED", latency: "ERR" });
      });

    return () => { isMounted = false; };
  }, []);

  // Highly optimized immutable click vector
  const handleNavigation = useCallback((nodeId) => {
    setCurrentActive(nodeId);
    if (typeof onRouteChange === "function") {
      onRouteChange(nodeId);
    }
  }, [onRouteChange]);

  // Memoizing navigation structure to prevent unnecessary heavy DOM recalculations
  const renderedNavigationTree = useMemo(() => {
    return NAVIGATION_NODES.map((group, index) => (
      <div key={group.category || index} className="space-y-1.5">
        <h3 className="px-4 text-[10px] font-black font-mono tracking-widest text-slate-600 uppercase">
          {group.category}
        </h3>
        <div className="space-y-0.5 px-2">
          {group.nodes.map((node) => (
            <NavLink
              key={node.id}
              item={node}
              isActive={currentActive === node.id}
              onSelect={handleNavigation}
            />
          ))}
        </div>
      </div>
    ));
  }, [currentActive, handleNavigation]);

  return (
    <aside className={`w-80 h-screen border-r flex flex-col justify-between ${SYSTEM_METRICS.THEME.DARK_BG} ${SYSTEM_METRICS.THEME.BORDER_COLOR} ${SYSTEM_METRICS.THEME.GLOW_EFFECT} select-none`}>
      {/* SECTION 1: HEADER PLATFORM */}
      <SidebarHeader />

      {/* SECTION 2: MAP COMPILER ENGINE */}
      <div className="flex-1 py-6 space-y-8 overflow-y-auto no-scrollbar">
        {renderedNavigationTree}
      </div>

      {/* SECTION 3: SYSTEM INTEGRITY FOOTER STATUS */}
      <div className={`p-4 border-t ${SYSTEM_METRICS.THEME.BORDER_COLOR} bg-slate-950/60 font-mono text-[10px]`}>
        <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-900 bg-slate-950">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${sysDiagnostic.status === "STABLE" ? "bg-emerald-400 animate-ping" : "bg-amber-400"}`} />
            <span className="text-slate-500 font-bold uppercase">CORE TELEMETRY:</span>
          </div>
          <span className={`font-bold ${sysDiagnostic.status === "STABLE" ? "text-emerald-400" : "text-amber-400"}`}>
            {sysDiagnostic.status} ({sysDiagnostic.latency})
          </span>
        </div>
      </div>
    </aside>
  );
}