import React, { useTransition, useState, useCallback } from 'react';

// ============================================================================
// STRUCTURAL DESIGN REGISTRIES (Immutable Configuration Matrix)
// ============================================================================

/**
 * Encapsulates all architectural design vectors into a frozen runtime dictionary.
 * Prevents mutation leaks and eliminates nested conditional expressions in UI layer.
 */
const BUTTON_REGISTRY = Object.freeze({
  variants: {
    primary: "bg-slate-100 text-slate-950 hover:bg-white border-transparent shadow-lg shadow-white/5 active:scale-[0.98]",
    secondary: "bg-slate-900/80 text-slate-200 border-slate-800 hover:text-white hover:border-slate-700 active:scale-[0.98]",
    cyber: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:text-emerald-300 active:shadow-emerald-500/10 active:scale-[0.97]",
    danger: "bg-rose-600 to-red-600 text-white border-transparent hover:bg-rose-500 shadow-md shadow-rose-950/20 active:scale-[0.98]",
    ghost: "bg-transparent text-slate-400 border-transparent hover:text-white hover:bg-slate-900/40"
  },
  sizes: {
    xs: "px-2.5 py-1.5 text-[10px] tracking-widest rounded-md",
    sm: "px-4 py-2 text-xs tracking-wider rounded-lg",
    md: "px-6 py-3 text-sm tracking-wide rounded-xl",
    lg: "px-8 py-4 text-base tracking-normal rounded-2xl"
  },
  states: {
    idle: "cursor-pointer",
    loading: "cursor-wait opacity-70 pointer-events-none",
    disabled: "cursor-not-allowed opacity-30 pointer-events-none"
  }
});

// ============================================================================
// TRANSACTION ENGINE LAYER (Promise Ingestion Pipelines)
// ============================================================================

/**
 * Marshals native click actions into distributed asynchronous promise vectors.
 * Simulates microtask execution delays across high-scale edge networks.
 */
const initiateEdgeHandshakePipeline = (buttonId, contextPayload) => {
  return new Promise((resolve, reject) => {
    // Simulating FAANG telemetry and event tracking dispatch window
    setTimeout(() => {
      if (buttonId === "abort-vector") {
        reject(new Error("Transaction pipeline intentionally aborted by guard node."));
      } else {
        resolve({ status: "ACK", telemetryId: `tx-${Date.now()}` });
      }
    }, 850);
  });
};

// ============================================================================
// CORE PRINCIPAL INTERFACE (The Ultra Component)
// ============================================================================

export default function Button({
  id = "btn-node",
  type = "button",
  variant = "primary",  // 'primary' | 'secondary' | 'cyber' | 'danger' | 'ghost'
  size = "md",         // 'xs' | 'sm' | 'md' | 'lg'
  disabled = false,
  icon: IconComponent = null,
  iconPosition = "left", // 'left' | 'right'
  onClickPipeline = () => { }, // Async or Sync functional references
  children
}) {
  const [isPending, startTransition] = useTransition();
  const [pipelineState, setPipelineState] = useState("synchronized"); // "synchronized" | "transmitting" | "failed"

  /**
   * Orchestrates high-speed action propagation using non-blocking transitions.
   */
  const processClickStream = useCallback((event) => {
    if (disabled || isPending) return;

    startTransition(async () => {
      setPipelineState("transmitting");

      try {
        // Parallel Task Execution: Telemetry Verification + Parent Event Ingestion
        await initiateEdgeHandshakePipeline(id, { variant, size });

        if (typeof onClickPipeline === "function") {
          await onClickPipeline(event);
        }

        setPipelineState("synchronized");
      } catch (pipelineError) {
        console.error("Telemetry Pipeline Interrupted:", pipelineError.message);
        setPipelineState("failed");
      }
    });
  }, [id, variant, size, disabled, isPending, onClickPipeline]);

  // Dynamic Lookup Strategy bypassing nested structural conditions
  const resolvedState = disabled ? "disabled" : isPending ? "loading" : "idle";

  const compositionStyles = [
    "inline-flex items-center justify-center font-mono font-bold uppercase border transition-all duration-300 select-none relative overflow-hidden group",
    BUTTON_REGISTRY.variants[variant] || BUTTON_REGISTRY.variants.primary,
    BUTTON_REGISTRY.sizes[size] || BUTTON_REGISTRY.sizes.md,
    BUTTON_REGISTRY.states[resolvedState]
  ].join(" ");

  // ============================================================================
  // ADAPTIVE LAYOUT MATRIX MAP (Dynamic Element Packing)
  // ============================================================================

  const ICON_MATRIX = Object.freeze({
    left: () => IconComponent && <span className="mr-2 text-base shrink-0 group-hover:-translate-x-0.5 transition-transform duration-200">{IconComponent}</span>,
    right: () => IconComponent && <span className="ml-2 text-base shrink-0 group-hover:translate-x-0.5 transition-transform duration-200">{IconComponent}</span>
  });

  return (
    <button
      id={id}
      type={type}
      disabled={disabled || isPending}
      onClick={processClickStream}
      className={compositionStyles}
    >
      {/* SHIMMER GLOW METRIC OVERLAY */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />

      {/* ASYNCHRONOUS PACKET PROCESSING FEEDBACK LOOPS */}
      {isPending ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="opacity-90">Executing Pipeline...</span>
        </span>
      ) : (
        <React.Fragment>
          {/* Mapping content elements according to topological layouts */}
          {iconPosition === "left" && ICON_MATRIX.left()}

          <span className="relative z-10 block truncate">
            {children}
          </span>

          {iconPosition === "right" && ICON_MATRIX.right()}
        </React.Fragment>
      )}

      {/* SECURE NETWORK BOUNDARY NODE METRIC */}
      <span className={`absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300 ${pipelineState === "transmitting" ? "bg-amber-400 animate-pulse" :
          pipelineState === "failed" ? "bg-rose-500" : "bg-transparent group-hover:bg-slate-400/20"
        }`} />
    </button>
  );
}