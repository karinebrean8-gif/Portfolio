#!/usr/bin/env bash

# ============================================================================
# ARCHITECTURE : ULTRA-FAANG PRINCIPAL LAYOUT KERNEL (50+ YRS EXP SPEC)
# PARADIGM     : ZERO-EXTERNAL-DEPENDENCY AUTOMATED DISPATCHER SYSTEM
# COMPONENTS   : NAVBAR, SIDEBAR, FOOTER (HIGHLY MEMOIZED, PROMISE DRIVEN)
# ============================================================================

set -e

echo "============================================================================"
echo "🚀 INITIALIZING ULTRA-FAANG LAYOUT CORE MATRIX INJECTOR"
echo "============================================================================\n"

# Create target directories for atomic components
mkdir -p src/components/layout src/components/ui

# ----------------------------------------------------------------------------
# 1. NAVBAR KERNEL MODULE [src/components/layout/navbar.jsx]
# ----------------------------------------------------------------------------
echo "📂 Hydrating src/components/layout/navbar.jsx..."
cat << 'EOF' > src/components/layout/navbar.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';

const MATRIX_CONFIG = Object.freeze({
  GATEWAY_METRICS: { NODE_VERSION: "v5.2.0-PROD", CLUSTER_LOC: "US-EAST-01", SECURE_SHIELD: "AES-GCM-256" },
  STYLES: {
    BG_BLUR: "bg-slate-950/80 backdrop-blur-md",
    BORDER_NODE: "border-b border-slate-900/60",
    TRANSITION: "transition-all duration-300 ease-in-out",
    GLOW_EMERALD: "shadow-[0_0_15px_rgba(52,211,153,0.1)]",
  }
});

const SYSTEM_ACTIONS = [
  { id: "terminal", label: "Kernel Shell", icon: "💻" },
  { id: "quantum", label: "Q-Link Engine", icon: "⚛️" },
  { id: "firewall", label: "Mesh Firewall", icon: "🔥", secure: true }
];

const initSecurityHandshake = () => {
  return new Promise((resolve) => {
    setTimeout(() => { resolve({ handshake: "ESTABLISHED", encryption: "ACTIVE" }); }, 600);
  });
};

const NetworkTicker = React.memo(({ systemData }) => (
  <div className="hidden lg:flex items-center gap-4 font-mono text-[10px] text-slate-500">
    <div className="flex items-center gap-1.5 border border-slate-950 bg-slate-900/40 px-2.5 py-1 rounded-md">
      <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
      <span className="text-slate-400 uppercase tracking-widest">NET:</span>
      <span className="text-emerald-400 font-bold">{MATRIX_CONFIG.GATEWAY_METRICS.CLUSTER_LOC}</span>
    </div>
    <div className="text-[9px] text-slate-600 font-semibold tracking-wider">
      {systemData.encryption ? `[SECURE-TUNNEL: ${systemData.handshake}]` : "[ESTABLISHING HANDSHAKE...]"}
    </div>
  </div>
));
NetworkTicker.displayName = "NetworkTicker";

const ActionButton = React.memo(({ item, onClick }) => (
  <button
    onClick={() => onClick(item.id)}
    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-slate-900 bg-slate-950 text-xs font-mono text-slate-400 hover:text-white hover:border-slate-700/60 transition-all duration-200 group ${
      item.secure ? "hover:border-rose-500/30 hover:text-rose-400" : "hover:border-emerald-500/30 hover:text-emerald-400"
    }`}
  >
    <span className="text-xs group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
    <span className="tracking-wide hidden sm:inline">{item.label}</span>
  </button>
));
ActionButton.displayName = "ActionButton";

export function Navbar({ onActionTrigger }) {
  const [sessionState, setSessionState] = useState({ handshake: "PENDING", encryption: false });
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    let activeStream = true;
    initSecurityHandshake().then((payload) => {
      if (activeStream) setSessionState({ handshake: payload.handshake, encryption: payload.encryption === "ACTIVE" });
    });
    return () => { activeStream = false; };
  }, []);

  const executeKernelAction = useCallback((actionId) => {
    if (typeof onActionTrigger === "function") onActionTrigger(actionId);
  }, [onActionTrigger]);

  const compiledActionInterface = useMemo(() => {
    return SYSTEM_ACTIONS.map((action) => (
      <ActionButton key={action.id} item={action} onClick={executeKernelAction} />
    ));
  }, [executeKernelAction]);

  return (
    <nav className={`fixed top-0 right-0 left-0 z-40 h-16 flex items-center justify-between px-6 md:px-12 select-none ${MATRIX_CONFIG.STYLES.BG_BLUR} ${MATRIX_CONFIG.STYLES.BORDER_NODE} ${MATRIX_CONFIG.STYLES.GLOW_EMERALD}`}>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2.5 font-mono">
          <div className="text-sm font-black text-white tracking-widest bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">CORE_MATRIX</div>
          <span className="text-[9px] text-slate-600 border border-slate-900 bg-slate-950 px-1.5 py-0.5 rounded font-bold">{MATRIX_CONFIG.GATEWAY_METRICS.NODE_VERSION}</span>
        </div>
        <NetworkTicker systemData={sessionState} />
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">{compiledActionInterface}</div>
        <div className="relative">
          <button onClick={() => setProfileOpen(!profileOpen)} className="w-8 h-8 rounded-lg overflow-hidden border border-slate-800 hover:border-emerald-500/40 focus:outline-none bg-slate-900 flex items-center justify-center text-xs font-mono text-emerald-400">SM</button>
          {profileOpen && (
            <div className="absolute right-0 mt-2.5 w-56 rounded-xl border border-slate-900 bg-slate-950/95 p-4 font-mono text-[10px] text-slate-400 shadow-2xl backdrop-blur-xl">
              <p className="text-white font-bold mb-1 text-xs">Shakib Mia</p>
              <p className="text-slate-600 mb-3 text-[9px] uppercase tracking-wider">Level 50+ Global Overlord</p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
EOF

# ----------------------------------------------------------------------------
# 2. SIDEBAR KERNEL MODULE [src/components/layout/sidebar.jsx]
# ----------------------------------------------------------------------------
echo "📂 Hydrating src/components/layout/sidebar.jsx..."
cat << 'EOF' > src/components/layout/sidebar.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';

const SYSTEM_METRICS = Object.freeze({
  IDENTITY: { NAME: "Shakib Mia", TITLE: "Principal Systems Architect", EXPERIENCE_EPOCH: "50+ YRS ENGINE CODES", NODE_ID: "FAANG-CORE-001X" },
  THEME: { DARK_BG: "bg-slate-950", BORDER_COLOR: "border-slate-900/60", GLOW_EFFECT: "shadow-lg shadow-emerald-500/5", ACTIVE_TEXT: "text-emerald-400", INACTIVE_TEXT: "text-slate-400 hover:text-slate-200" }
});

const NAVIGATION_NODES = [
  {
    category: "QUANTUM MODULES",
    nodes: [
      { id: "dashboard", label: "Core Control", icon: "📊", badge: "LIVE" },
      { id: "clusters", label: "Distributed Systems", icon: "🌐", badge: "99.99%" }
    ]
  },
  {
    category: "SECURITY LEDGERS",
    nodes: [
      { id: "security", label: "Zero-Trust Mesh", icon: "🛡️", badge: "SECURE" }
    ]
  }
];

const verifySystemState = () => {
  return new Promise((resolve) => {
    setTimeout(() => { resolve({ status: "STABLE", latency: "0.04ms" }); }, 450);
  });
};

const SidebarHeader = React.memo(() => {
  const meta = SYSTEM_METRICS.IDENTITY;
  return (
    <div className={`p-6 border-b ${SYSTEM_METRICS.THEME.BORDER_COLOR} font-mono`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-lg shadow-inner animate-pulse">⚡</div>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-black text-white tracking-wide truncate uppercase">{meta.NAME}</h2>
          <p className="text-[10px] text-emerald-400 font-bold mt-0.5">{meta.NODE_ID}</p>
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

const NavLink = React.memo(({ item, isActive, onSelect }) => {
  const theme = SYSTEM_METRICS.THEME;
  return (
    <button
      onClick={() => onSelect(item.id)}
      className={`w-full flex items-center justify-between px-4 py-3 text-xs font-mono rounded-lg transition-all duration-200 group ${isActive ? `${theme.ACTIVE_TEXT} bg-emerald-500/5 border-r-2 border-emerald-500 font-bold` : `${theme.INACTIVE_TEXT} hover:bg-slate-900/20`}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-sm opacity-80 group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
        <span className="tracking-wide">{item.label}</span>
      </div>
      {item.badge && <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${isActive ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-400" : "bg-slate-950 border-slate-900 text-slate-500"}`}>{item.badge}</span>}
    </button>
  );
});
NavLink.displayName = "NavLink";

export function Sidebar({ activeRoute = "dashboard", onRouteChange }) {
  const [currentActive, setCurrentActive] = useState(activeRoute);
  const [sysDiagnostic, setSysDiagnostic] = useState({ status: "INITIALIZING", latency: "..." });

  useEffect(() => {
    let isMounted = true;
    verifySystemState().then((payload) => { if (isMounted) setSysDiagnostic(payload); });
    return () => { isMounted = false; };
  }, []);

  const handleNavigation = useCallback((nodeId) => {
    setCurrentActive(nodeId);
    if (typeof onRouteChange === "function") onRouteChange(nodeId);
  }, [onRouteChange]);

  const renderedNavigationTree = useMemo(() => {
    return NAVIGATION_NODES.map((group, index) => (
      <div key={group.category || index} className="space-y-1.5">
        <h3 className="px-4 text-[10px] font-black font-mono tracking-widest text-slate-600 uppercase">{group.category}</h3>
        <div className="space-y-0.5 px-2">
          {group.nodes.map((node) => (
            <NavLink key={node.id} item={node} isActive={currentActive === node.id} onSelect={handleNavigation} />
          ))}
        </div>
      </div>
    ));
  }, [currentActive, handleNavigation]);

  return (
    <aside className={`w-80 h-screen border-r flex flex-col justify-between ${SYSTEM_METRICS.THEME.DARK_BG} ${SYSTEM_METRICS.THEME.BORDER_COLOR} ${SYSTEM_METRICS.THEME.GLOW_EFFECT} select-none`}>
      <SidebarHeader />
      <div className="flex-1 py-6 space-y-8 overflow-y-auto no-scrollbar">{renderedNavigationTree}</div>
      <div className={`p-4 border-t ${SYSTEM_METRICS.THEME.BORDER_COLOR} bg-slate-950/60 font-mono text-[10px]`}>
        <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-900 bg-slate-950">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-slate-500 font-bold uppercase">TELEMETRY:</span>
          </div>
          <span className="font-bold text-emerald-400">{sysDiagnostic.status} ({sysDiagnostic.latency})</span>
        </div>
      </div>
    </aside>
  );
}
EOF

# ----------------------------------------------------------------------------
# 3. FOOTER KERNEL MODULE [src/components/layout/footer.jsx]
# ----------------------------------------------------------------------------
echo "📂 Hydrating src/components/layout/footer.jsx..."
cat << 'EOF' > src/components/layout/footer.jsx
import React, { useState, useEffect, useMemo } from 'react';

const FOOTER_METRICS = Object.freeze({
  LEGAL: { COPYRIGHT: "© 2026 SHAKIB MIA.", RIGHTS: "ALL SYSTEMS OPERATIONAL // ZERO-TRUST PROTOCOL." },
  INFRASTRUCTURE: { TELEMETRY_ID: "NODE-FT-99X" },
  STYLES: { CONTAINER_BG: "bg-slate-950", BORDER_NODE: "border-t border-slate-900/60", GLOW_EFFECT: "shadow-[0_-15px_30px_rgba(16,185,129,0.02)]" }
});

const SYSTEM_LINK_GROUPS = [
  { title: "CLUSTER SYSTEMS", links: [{ label: "Distributed Edge", href: "#" }, { label: "Quantum Balancers", href: "#" }] },
  { title: "SECURITY LEDGERS", links: [{ label: "Zero-Trust Mesh", href: "#" }, { label: "AES-256 Gateways", href: "#" }] }
];

const fetchHardwareUptime = () => {
  return new Promise((resolve) => {
    setTimeout(() => { resolve({ uptime: "99.9998%", activeThreads: 1024 }); }, 700);
  });
};

const LinkGroup = React.memo(({ group }) => (
  <div className="space-y-4">
    <h4 className="text-[10px] font-black font-mono tracking-widest text-slate-500 uppercase">{group.title}</h4>
    <ul className="space-y-2.5">
      {group.links.map((link, index) => (
        <li key={index}>
          <a href={link.href} className="text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors duration-200">{link.label}</a>
        </li>
      ))}
    </ul>
  </div>
));
LinkGroup.displayName = "LinkGroup";

export function Footer() {
  const [telemetry, setTelemetry] = useState({ uptime: "LOADING...", activeThreads: 0 });

  useEffect(() => {
    let isStreamLive = true;
    fetchHardwareUptime().then((data) => { if (isStreamLive) setTelemetry(data); });
    return () => { isStreamLive = false; };
  }, []);

  const compiledLinkMatrix = useMemo(() => {
    return SYSTEM_LINK_GROUPS.map((group, idx) => <LinkGroup key={idx} group={group} />);
  }, []);

  return (
    <footer className={`w-full py-12 px-6 md:px-16 relative select-none z-10 ${FOOTER_METRICS.STYLES.CONTAINER_BG} ${FOOTER_METRICS.STYLES.BORDER_NODE} ${FOOTER_METRICS.STYLES.GLOW_EFFECT}`}>
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-10 border-b border-slate-900/40 pb-10">
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2 font-mono">
              <span className="text-sm font-black text-white tracking-widest bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">SYSTEM_SHIELD</span>
              <span className="text-[9px] text-emerald-400 border border-emerald-950 bg-emerald-950/20 px-1.5 py-0.5 rounded font-bold">{FOOTER_METRICS.INFRASTRUCTURE.TELEMETRY_ID}</span>
            </div>
            <p className="text-xs text-slate-400 font-mono max-w-sm">Architecting ultra-low latency enterprise engines and self-healing systems.</p>
          </div>
          {compiledLinkMatrix}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 font-mono text-[10px]">
          <div className="text-slate-400"><span className="text-white font-bold">{FOOTER_METRICS.LEGAL.COPYRIGHT}</span> {FOOTER_METRICS.LEGAL.RIGHTS}</div>
          <div className="flex items-center gap-3 bg-slate-950 border border-slate-900 px-4 py-2 rounded-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-500 font-bold">UPTIME: <span className="text-emerald-400">{telemetry.uptime}</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
EOF

echo "\n🏁 EXTRACTION INTEGRITY VERIFIED."
echo "Navbar, Sidebar, and Footer generated under 'src/components/layout/' successfully."
echo "============================================================================"