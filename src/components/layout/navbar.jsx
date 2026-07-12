import React, { useState, useEffect, useMemo, useCallback } from 'react';

// ============================================================================
// ARCHITECTURE : ULTRA-FAANG PRINCIPAL SYSTEM NAVIGATION KERNEL (50+ YRS EXP)
// DESIGN PATTERN: FUNCTIONAL MEMOIZED COMPOSITION WITH IMMUTABLE CONST MATRICES
// ============================================================================

/**
 * Frozen Architectural Metrics and Theme Matrix.
 * Prevents execution context mutation across complex render passes.
 */
const MATRIX_CONFIG = Object.freeze({
  GATEWAY_METRICS: {
    NODE_VERSION: "v5.2.0-PROD",
    CLUSTER_LOC: "US-EAST-01",
    SECURE_SHIELD: "AES-GCM-256",
  },
  STYLES: {
    BG_BLUR: "bg-slate-950/80 backdrop-blur-md",
    BORDER_NODE: "border-b border-slate-900/60",
    TRANSITION: "transition-all duration-300 ease-in-out",
    GLOW_EMERALD: "shadow-[0_0_15px_rgba(52,211,153,0.1)]",
  }
});

/**
 * Array Matrix of Quick Action Control Interfaces.
 */
const SYSTEM_ACTIONS = [
  { id: "terminal", label: "Kernel Shell", icon: "💻" },
  { id: "quantum", label: "Q-Link Engine", icon: "⚛️" },
  { id: "firewall", label: "Mesh Firewall", icon: "🔥", secure: true }
];

/**
 * Asynchronous Node Gateway Handshake.
 * Generates an internal cryptographic network signal promise.
 */
const initSecurityHandshake = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        handshake: "ESTABLISHED",
        sessionExpiry: "24H",
        encryption: "ACTIVE"
      });
    }, 600);
  });
};

// ============================================================================
// ATOMIC SUB-COMPONENTS: CLEAN SEPARATION OF CONCERNS
// ============================================================================

/**
 * Network Telemetry Ticker UI Element.
 */
const NetworkTicker = React.memo(({ systemData }) => (
  <div className="hidden lg:flex items-center gap-4 font-mono text-[10px] text-slate-500">
    <div className="flex items-center gap-1.5 border border-slate-950 bg-slate-900/40 px-2.5 py-1 rounded-md">
      <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
      <span className="text-slate-400 uppercase tracking-widest">NET:</span>
      <span className="text-emerald-400 font-bold">{MATRIX_CONFIG.GATEWAY_METRICS.CLUSTER_LOC}</span>
    </div>
    <div className="flex items-center gap-1.5 border border-slate-950 bg-slate-900/40 px-2.5 py-1 rounded-md">
      <span className="text-slate-400 uppercase tracking-widest">SHIELD:</span>
      <span className="text-teal-400 font-bold">{MATRIX_CONFIG.GATEWAY_METRICS.SECURE_SHIELD}</span>
    </div>
    <div className="text-[9px] text-slate-600 font-semibold tracking-wider">
      {systemData.encryption ? `[SECURE-TUNNEL: ${systemData.handshake}]` : "[ESTABLISHING HANDSHAKE...]"}
    </div>
  </div>
));
NetworkTicker.displayName = "NetworkTicker";

/**
 * Individual Interface Control Micro-Action.
 */
const ActionButton = React.memo(({ item, onClick }) => (
  <button
    onClick={() => onClick(item.id)}
    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-slate-900 bg-slate-950 text-xs font-mono font-medium text-slate-400 hover:text-white hover:border-slate-700/60 transition-all duration-200 group ${item.secure ? "hover:border-rose-500/30 hover:text-rose-400" : "hover:border-emerald-500/30 hover:text-emerald-400"
      }`}
  >
    <span className="text-xs group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
    <span className="tracking-wide hidden sm:inline">{item.label}</span>
  </button>
));
ActionButton.displayName = "ActionButton";

// ============================================================================
// MAIN SYSTEM NAVBAR CORE IMPLEMENTATION
// ============================================================================
export default function UltraGodNavbarView({ onActionTrigger }) {
  const [sessionState, setSessionState] = useState({ handshake: "PENDING", encryption: false });
  const [profileOpen, setProfileOpen] = useState(false);

  // Hook into the async hardware handshake layer
  useEffect(() => {
    let activeStream = true;

    initSecurityHandshake()
      .then((payload) => {
        if (activeStream) {
          setSessionState({
            handshake: payload.handshake,
            encryption: payload.encryption === "ACTIVE"
          });
        }
      })
      .catch(() => {
        if (activeStream) setSessionState({ handshake: "FAILED", encryption: false });
      });

    return () => { activeStream = false; };
  }, []);

  // Optimized execution payload transmitter
  const executeKernelAction = useCallback((actionId) => {
    if (typeof onActionTrigger === "function") {
      onActionTrigger(actionId);
    }
  }, [onActionTrigger]);

  const toggleProfileNode = useCallback(() => {
    setProfileOpen(prev => !prev);
  }, []);

  // Structural mapping engine memoized to optimize pipeline iterations
  const compiledActionInterface = useMemo(() => {
    return SYSTEM_ACTIONS.map((action) => (
      <ActionButton
        key={action.id}
        item={action}
        onClick={executeKernelAction}
      />
    ));
  }, [executeKernelAction]);

  return (
    <nav className={`fixed top-0 right-0 left-0 z-40 h-16 flex items-center justify-between px-6 md:px-12 select-none ${MATRIX_CONFIG.STYLES.BG_BLUR} ${MATRIX_CONFIG.STYLES.BORDER_NODE} ${MATRIX_CONFIG.STYLES.GLOW_EMERALD}`}>

      {/* BRAND INTERFACE LAYER */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2.5 font-mono">
          <div className="text-sm font-black text-white tracking-widest bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            CORE_MATRIX
          </div>
          <span className="text-[9px] text-slate-600 border border-slate-900 bg-slate-950 px-1.5 py-0.5 rounded font-bold">
            {MATRIX_CONFIG.GATEWAY_METRICS.NODE_VERSION}
          </span>
        </div>

        {/* NETWORK STATUS LEDGERS */}
        <NetworkTicker systemData={sessionState} />
      </div>

      {/* CORE OPERATOR CONTROL SYSTEM */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {compiledActionInterface}
        </div>

        <div className={`w-px h-5 border-r border-slate-900/80 mx-1 hidden sm:block`} />

        {/* IDENTITY ANCHOR NODE */}
        <div className="relative">
          <button
            onClick={toggleProfileNode}
            className={`w-8 h-8 rounded-lg overflow-hidden border border-slate-800 hover:border-emerald-500/40 focus:outline-none transition-all duration-200 ${MATRIX_CONFIG.STYLES.TRANSITION}`}
          >
            <div className="w-full h-full bg-slate-900 flex items-center justify-center text-xs font-mono font-bold text-emerald-400 hover:bg-slate-850">
              SM
            </div>
          </button>

          {/* ISOLATED FLOATING OVERLAY ACCORDING TO PRINCIPAL SPECS */}
          {profileOpen && (
            <div className="absolute right-0 mt-2.5 w-56 rounded-xl border border-slate-900 bg-slate-950/95 p-4 font-mono text-[10px] text-slate-400 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
              <p className="text-white font-bold mb-1 text-xs">Shakib Mia</p>
              <p className="text-slate-600 mb-3 text-[9px] uppercase tracking-wider">Level 50+ Global Overlord</p>
              <div className="border-t border-slate-900 pt-2.5 space-y-2 text-slate-500">
                <p className="hover:text-emerald-400 cursor-pointer transition-colors">⚡ Memory Leak Profiler</p>
                <p className="hover:text-emerald-400 cursor-pointer transition-colors">⚙️ Thread Allocation</p>
                <p className="text-rose-500 hover:text-rose-400 cursor-pointer transition-colors pt-1 border-t border-slate-900/40">☠️ Kill Process Pool</p>
              </div>
            </div>
          )}
        </div>
      </div>

    </nav>
  );
}