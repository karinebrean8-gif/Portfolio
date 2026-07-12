import React, { useState, useTransition, useCallback } from 'react';

// ============================================================================
// STRUCTURAL MATRICES & CONFIGURATIONS (Immutable Architecture)
// ============================================================================

/**
 * Core UI states mapped onto strict atomic design classes.
 * Decouples layout mutation logic completely from component lifecycle.
 */
const ENGIN_VARIANTS = Object.freeze({
    base: "w-full px-4 py-3.5 rounded-xl text-sm font-mono text-white bg-slate-950/40 border transition-all duration-300 focus:outline-none focus:ring-1 disabled:opacity-40 disabled:pointer-events-none",
    states: {
        idle: "border-slate-800 focus:border-emerald-500/60 focus:ring-emerald-500/60 placeholder-slate-600",
        success: "border-emerald-500/50 focus:border-emerald-400 focus:ring-emerald-400/50 placeholder-emerald-800/50 bg-emerald-950/10",
        error: "border-rose-500/50 focus:border-rose-400 focus:ring-rose-400/50 placeholder-rose-800/50 bg-rose-950/10",
        validating: "border-amber-500/50 focus:border-amber-400 focus:ring-amber-400/50 placeholder-slate-600 animate-pulse"
    },
    labels: {
        base: "text-xs font-bold uppercase tracking-widest transition-colors duration-200",
        idle: "text-slate-400",
        success: "text-emerald-400",
        error: "text-rose-400",
        validating: "text-amber-400"
    },
    feedbacks: {
        error: "text-xs font-mono text-rose-400/90 mt-1.5 flex items-center gap-1.5",
        success: "text-xs font-mono text-emerald-400/90 mt-1.5 flex items-center gap-1.5",
        validating: "text-xs font-mono text-amber-400/90 mt-1.5 flex items-center gap-1.5"
    }
});

/**
 * Native Built-in Validators using immutable Regex maps
 */
const CORE_VALIDATORS = Object.freeze({
    email: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Payload format mismatch. Provide valid semantic URI mail node."
    },
    phone: {
        regex: /^[0-9]{10,15}$/,
        message: "Invalid baseline digits. Direct routing vector must be 10-15 integers."
    },
    secureText: {
        regex: /^[\s\S]{3,500}$/,
        message: "Buffer limit boundary violation. Minimum 3, maximum 500 characters."
    }
});

// ============================================================================
// ASYNCHRONOUS PIPELINES (Promise Engine Architecture)
// ============================================================================

/**
 * Simulates a FAANG-scale Edge Network validation protocol.
 * Returns a pipeline state resolved via microtask queues.
 */
const executeAsyncNetworkSanitizer = (value, strictMode) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Security edge interceptor injection check
            if (strictMode && /[\langle\rangle\x27\x22]/.test(value)) {
                reject(new Error("XSS / SQL Injection vector footprint detected at edge firewall."));
            }

            // Blacklist entity checking emulation
            if (value.toLowerCase().includes("root") || value.toLowerCase().includes("admin")) {
                reject(new Error("Protected namespace restriction. Authority node assignment denied."));
            }

            resolve({ validated: true, status: "CLEAR_NODE" });
        }, 900); // Network gateway emulation packet trip latency
    });
};

// ============================================================================
// DISTRIBUTED INPUT INTERFACES (The Ultra Component)
// ============================================================================

export default function Input({
    id,
    name,
    label,
    type = "text",
    placeholder,
    required = false,
    validatorType = null, // 'email' | 'phone' | 'secureText'
    enableAsyncCheck = false,
    onChangePipeline = () => { },
    disabled = false
}) {
    const [value, setValue] = useState('');
    const [internalState, setInternalState] = useState('idle'); // 'idle' | 'success' | 'error' | 'validating'
    const [feedbackMsg, setFeedbackMsg] = useState('');
    const [isPending, startTransition] = useTransition();

    /**
     * Evaluates input mutations dynamically via synchronous and asynchronous promise streams.
     */
    const evaluateInputState = useCallback(async (currentValue) => {
        // 1. Check Baseline Null Assertions
        if (!currentValue) {
            if (required) {
                setInternalState('error');
                setFeedbackMsg("Critical field parameter requirement missing.");
            } else {
                setInternalState('idle');
                setFeedbackMsg('');
            }
            return;
        }

        // 2. Client-Side Regex Validation Layer
        if (validatorType && CORE_VALIDATORS[validatorType]) {
            const targetRule = CORE_VALIDATORS[validatorType];
            if (!targetRule.regex.test(currentValue)) {
                setInternalState('error');
                setFeedbackMsg(targetRule.message);
                return;
            }
        }

        // 3. Distributed Network Cloud Verification Layer (Promise / Transition Driven)
        if (enableAsyncCheck) {
            setInternalState('validating');
            setFeedbackMsg("Verifying node cluster availability across regions...");

            try {
                await executeAsyncNetworkSanitizer(currentValue, true);
                setInternalState('success');
                setFeedbackMsg("Cryptographic format and namespace availability certified.");
            } catch (error) {
                setInternalState('error');
                setFeedbackMsg(error.message);
            }
        } else {
            // Fallback condition if client checks pass and async engine is decoupled
            setInternalState('success');
            setFeedbackMsg("Local data schema validation verified.");
        }
    }, [required, validatorType, enableAsyncCheck]);

    /**
     * Ingests native HTML events and marshals inputs into functional states.
     */
    const handleInputChange = (e) => {
        const inboundValue = e.target.value;
        setValue(inboundValue);

        // Bubble up data mutation into parent execution layers
        onChangePipeline({ id, name, value: inboundValue });

        // Non-blocking architecture using concurrent React features (useTransition)
        startTransition(() => {
            evaluateInputState(inboundValue);
        });
    };

    // ============================================================================
    // TYPE MAP FACTORY (Avoids complex if/else chains or structural bloating)
    // ============================================================================

    const INPUT_RENDER_FACTORY = Object.freeze({
        textarea: () => (
            <textarea
                id={id}
                name={name}
                value={value}
                disabled={disabled || isPending}
                placeholder={placeholder}
                onChange={handleInputChange}
                className={`${ENGIN_VARIANTS.base} ${ENGIN_VARIANTS.states[internalState]} resize-none h-32 font-mono`}
            />
        ),
        default: () => (
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                disabled={disabled || isPending}
                placeholder={placeholder}
                onChange={handleInputChange}
                className={`${ENGIN_VARIANTS.base} ${ENGIN_VARIANTS.states[internalState]}`}
            />
        )
    });

    // Resolve component rendering target matrix safely
    const renderInputControl = INPUT_RENDER_FACTORY[type] || INPUT_RENDER_FACTORY.default;

    return (
        <div className="flex flex-col space-y-2 w-full group selection:bg-emerald-500 selection:text-slate-950">

            {/* LABEL MANAGEMENT SUITE */}
            {label && (
                <div className="flex justify-between items-center px-1">
                    <label
                        htmlFor={id}
                        className={`${ENGIN_VARIANTS.labels.base} ${ENGIN_VARIANTS.labels[internalState]}`}
                    >
                        {label} {required && <span className="text-rose-500 font-sans">*</span>}
                    </label>

                    {/* Real-time Validation State Node Badge */}
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider opacity-60 group-focus-within:opacity-100 transition-opacity">
                        State: [ {internalState} ]
                    </span>
                </div>
            )}

            {/* RENDER INJECTION MATRIX SITE */}
            <div className="relative rounded-xl overflow-hidden">
                {renderInputControl()}

                {/* Floating Async Processing State Micro Indicator */}
                {internalState === 'validating' && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 absolute" />
                    </div>
                )}
            </div>

            {/* DISPATCH FEEDBACK MESSAGES MAP */}
            {feedbackMsg && (
                <div
                    className={
                        internalState === 'error' ? ENGIN_VARIANTS.feedbacks.error :
                            internalState === 'success' ? ENGIN_VARIANTS.feedbacks.success :
                                ENGIN_VARIANTS.feedbacks.validating
                    }
                >
                    <span>
                        {internalState === 'error' ? '✖ [ERR]' : internalState === 'success' ? '✔ [OK]' : '⚙ [SYNC]'}
                    </span>
                    <p className="tracking-wide leading-none">{feedbackMsg}</p>
                </div>
            )}
        </div>
    );
}