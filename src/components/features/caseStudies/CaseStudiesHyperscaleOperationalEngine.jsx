import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";

/**
 * CaseStudiesHyperscaleOperationalEngine
 * -----------------------------------------------------------------------------
 * A single-file, production-oriented portfolio case-study experience.
 *
 * Design goals:
 * - truthful portfolio language
 * - React Router SPA navigation
 * - abortable async requests
 * - deterministic fallback data
 * - accessible controls and semantic content
 * - immutable constants, arrays, objects, maps, and promises
 * - Tailwind CSS-only styling
 * - clean architecture boundaries inside one giant file
 *
 * The copy refers to modernization of decades-old systems. It does not claim
 * that the portfolio owner personally has 50+ years of experience.
 */

// =============================================================================
// CONFIGURATION
// =============================================================================

const APP_CONFIG = Object.freeze({
  apiUrl:
    import.meta.env.VITE_API_URL?.trim() ||
    "https://api.example.com/v1",
  requestTimeoutMs: 6_000,
  searchDebounceMs: 220,
  enableRemoteApi: import.meta.env.VITE_ENABLE_REMOTE_API === "true",
});

const REQUEST_STATUS = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
});

const ROUTES = Object.freeze({
  HOME: "/",
  CASE_STUDY: "/case-studies/:id",
  caseStudyDetails: (id) => `/case-studies/${encodeURIComponent(id)}`,
});

const UI_COPY = Object.freeze({
  eyebrow: "Principal-level engineering portfolio",
  title: "Architectural Case Studies",
  subtitle:
    "Selected systems work covering legacy modernization, distributed processing, streaming interfaces, reliability, and operational design.",
  loading: "Loading case-study architecture…",
  empty: "No case studies match your search.",
  fallbackNotice:
    "Showing verified local portfolio data because the remote API is unavailable.",
  retry: "Retry request",
  back: "Back to case studies",
});

// =============================================================================
// DOMAIN DATA
// =============================================================================

const STATIC_STUDIES = Object.freeze([
  Object.freeze({
    id: "distributed-ledger-scaling",
    title: "Distributed Ledger Scaling & Contention Reduction",
    client: "Confidential Financial Infrastructure Program",
    period: "2024–2025",
    category: "Distributed systems",
    problem:
      "A legacy sharding design experienced lock contention and degraded write performance during burst traffic. The operational model also made reconciliation and incident diagnosis slower than acceptable.",
    solution:
      "Designed an event-driven processing model with partition-aware routing, bounded concurrency, idempotent commands, and observable reconciliation checkpoints.",
    architecture: Object.freeze({
      layer: "Domain and infrastructure",
      topology: "Partitioned event-processing mesh",
      objective: "Predictable throughput under burst traffic",
    }),
    scaling: Object.freeze([
      Object.freeze({
        id: "ledger-scale-1",
        text:
          "Introduced load-aware routing to redirect work away from saturated partitions.",
      }),
      Object.freeze({
        id: "ledger-scale-2",
        text:
          "Applied backpressure and bounded worker pools to protect dependent systems.",
      }),
      Object.freeze({
        id: "ledger-scale-3",
        text:
          "Added telemetry around queue depth, processing lag, retries, and reconciliation drift.",
      }),
    ]),
    tradeOffs: Object.freeze({
      advantages: Object.freeze([
        Object.freeze({
          id: "ledger-pro-1",
          text: "Reduced lock contention across hot partitions.",
        }),
        Object.freeze({
          id: "ledger-pro-2",
          text: "Improved failure isolation and replay safety.",
        }),
      ]),
      costs: Object.freeze([
        Object.freeze({
          id: "ledger-cost-1",
          text:
            "Eventual consistency requires explicit product and operator expectations.",
        }),
        Object.freeze({
          id: "ledger-cost-2",
          text:
            "Operational maturity is required for replay, dead-letter handling, and observability.",
        }),
      ]),
    }),
    lessons: Object.freeze([
      Object.freeze({
        id: "ledger-lesson-1",
        text:
          "Optimizing contention starts with measuring ownership boundaries, not adding more infrastructure.",
      }),
      Object.freeze({
        id: "ledger-lesson-2",
        text:
          "Idempotency and reconciliation must be designed before migration traffic is introduced.",
      }),
    ]),
    tags: Object.freeze([
      "React",
      "Node.js",
      "Event-driven architecture",
      "PostgreSQL",
      "Kafka",
      "Kubernetes",
    ]),
  }),
  Object.freeze({
    id: "hyperscale-video-ingress",
    title: "High-Throughput Media Ingress Control Plane",
    client: "Confidential Streaming Infrastructure Program",
    period: "2023–2024",
    category: "Network and media systems",
    problem:
      "A high-volume media pipeline suffered CPU pressure, excessive copying, and insufficient visibility into saturation across ingress nodes.",
    solution:
      "Built an operational control plane around zero-copy-friendly data paths, bounded queues, edge-aware routing, and clear degraded-mode behavior.",
    architecture: Object.freeze({
      layer: "Network and application",
      topology: "Regional edge-ingress mesh",
      objective: "Stable throughput with bounded resource use",
    }),
    scaling: Object.freeze([
      Object.freeze({
        id: "media-scale-1",
        text:
          "Used pre-allocated buffers and bounded queues to reduce memory churn.",
      }),
      Object.freeze({
        id: "media-scale-2",
        text:
          "Separated control-plane decisions from data-plane packet processing.",
      }),
      Object.freeze({
        id: "media-scale-3",
        text:
          "Added regional health scoring and capacity-aware traffic shifting.",
      }),
    ]),
    tradeOffs: Object.freeze({
      advantages: Object.freeze([
        Object.freeze({
          id: "media-pro-1",
          text: "Lower allocation pressure and more predictable latency.",
        }),
        Object.freeze({
          id: "media-pro-2",
          text: "Clearer regional failure isolation and operator visibility.",
        }),
      ]),
      costs: Object.freeze([
        Object.freeze({
          id: "media-cost-1",
          text:
            "Low-level optimizations increase debugging and portability complexity.",
        }),
        Object.freeze({
          id: "media-cost-2",
          text:
            "Hardware-aware tuning requires disciplined benchmarking and rollout controls.",
        }),
      ]),
    }),
    lessons: Object.freeze([
      Object.freeze({
        id: "media-lesson-1",
        text:
          "Performance work should begin with profiling, workload models, and explicit SLOs.",
      }),
      Object.freeze({
        id: "media-lesson-2",
        text:
          "Control-plane simplicity is critical when the data plane is already complex.",
      }),
    ]),
    tags: Object.freeze([
      "React",
      "WebSockets",
      "Streaming telemetry",
      "Edge routing",
      "Observability",
      "Tailwind CSS",
    ]),
  }),
]);

const STUDY_BY_ID = new Map(
  STATIC_STUDIES.map((study) => [study.id, study]),
);

// =============================================================================
// DOMAIN VALIDATION
// =============================================================================

const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

const isValidStudy = (study) =>
  Boolean(
    study &&
      isNonEmptyString(study.id) &&
      isNonEmptyString(study.title) &&
      isNonEmptyString(study.client) &&
      isNonEmptyString(study.problem) &&
      isNonEmptyString(study.solution) &&
      Array.isArray(study.scaling) &&
      Array.isArray(study.lessons) &&
      Array.isArray(study.tags) &&
      study.architecture &&
      study.tradeOffs,
  );

const normalizeStudy = (study) => ({
  ...study,
  scaling: Array.isArray(study.scaling) ? study.scaling : [],
  lessons: Array.isArray(study.lessons) ? study.lessons : [],
  tags: Array.isArray(study.tags) ? study.tags : [],
  tradeOffs: {
    advantages: Array.isArray(study.tradeOffs?.advantages)
      ? study.tradeOffs.advantages
      : [],
    costs: Array.isArray(study.tradeOffs?.costs)
      ? study.tradeOffs.costs
      : [],
  },
});

// =============================================================================
// APPLICATION SERVICES
// =============================================================================

const createTimeoutController = (timeoutMs) => {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => {
    controller.abort(new DOMException("Request timed out.", "TimeoutError"));
  }, timeoutMs);

  return {
    controller,
    clear: () => window.clearTimeout(timeoutId),
  };
};

const CaseStudyService = Object.freeze({
  async fetchAll({ signal } = {}) {
    if (!APP_CONFIG.enableRemoteApi) {
      return {
        studies: [...STATIC_STUDIES],
        source: "local",
      };
    }

    const timeout = createTimeoutController(APP_CONFIG.requestTimeoutMs);

    const abortFromParent = () => timeout.controller.abort();

    if (signal?.aborted) {
      abortFromParent();
    } else {
      signal?.addEventListener("abort", abortFromParent, { once: true });
    }

    try {
      const response = await fetch(
        `${APP_CONFIG.apiUrl}/portfolio/case-studies`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          signal: timeout.controller.signal,
        },
      );

      if (!response.ok) {
        throw new Error(`Case-study API returned HTTP ${response.status}.`);
      }

      const payload = await response.json();
      const rawStudies = Array.isArray(payload?.data) ? payload.data : [];
      const studies = rawStudies
        .map(normalizeStudy)
        .filter(isValidStudy);

      if (studies.length === 0) {
        throw new Error("The API returned no valid case-study records.");
      }

      return {
        studies,
        source: "remote",
      };
    } catch (error) {
      if (signal?.aborted) {
        throw new DOMException("Request aborted.", "AbortError");
      }

      return {
        studies: [...STATIC_STUDIES],
        source: "fallback",
        warning:
          error instanceof Error
            ? error.message
            : "Remote case-study data could not be loaded.",
      };
    } finally {
      timeout.clear();
      signal?.removeEventListener("abort", abortFromParent);
    }
  },
});

// =============================================================================
// ASYNC STATE
// =============================================================================

const initialPipelineState = Object.freeze({
  status: REQUEST_STATUS.IDLE,
  studies: [],
  source: "local",
  warning: null,
  error: null,
});

const pipelineReducer = (state, action) => {
  switch (action.type) {
    case "pipeline/loading":
      return {
        ...state,
        status: REQUEST_STATUS.LOADING,
        warning: null,
        error: null,
      };

    case "pipeline/success":
      return {
        status: REQUEST_STATUS.SUCCESS,
        studies: action.payload.studies,
        source: action.payload.source,
        warning: action.payload.warning ?? null,
        error: null,
      };

    case "pipeline/error":
      return {
        ...state,
        status: REQUEST_STATUS.ERROR,
        error: action.payload,
      };

    default:
      return state;
  }
};

const useDataPipeline = () => {
  const [state, dispatch] = useReducer(
    pipelineReducer,
    initialPipelineState,
  );
  const activeRequestRef = useRef(null);
  const requestVersionRef = useRef(0);

  const load = useCallback(async () => {
    activeRequestRef.current?.abort();

    const controller = new AbortController();
    const requestVersion = requestVersionRef.current + 1;

    activeRequestRef.current = controller;
    requestVersionRef.current = requestVersion;

    dispatch({ type: "pipeline/loading" });

    try {
      const result = await CaseStudyService.fetchAll({
        signal: controller.signal,
      });

      if (
        !controller.signal.aborted &&
        requestVersionRef.current === requestVersion
      ) {
        dispatch({
          type: "pipeline/success",
          payload: result,
        });
      }
    } catch (error) {
      if (
        error?.name !== "AbortError" &&
        requestVersionRef.current === requestVersion
      ) {
        dispatch({
          type: "pipeline/error",
          payload:
            error instanceof Error
              ? error.message
              : "An unexpected data error occurred.",
        });
      }
    }
  }, []);

  useEffect(() => {
    load();

    return () => {
      requestVersionRef.current += 1;
      activeRequestRef.current?.abort();
    };
  }, [load]);

  return {
    ...state,
    refresh: load,
  };
};

// =============================================================================
// REUSABLE HOOKS
// =============================================================================

const useDebouncedValue = (value, delayMs) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => window.clearTimeout(timeoutId);
  }, [delayMs, value]);

  return debouncedValue;
};

// =============================================================================
// PRESENTATION HELPERS
// =============================================================================

const cx = (...classes) => classes.filter(Boolean).join(" ");

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

const LoadingState = () => (
  <div
    className="py-36 text-center font-mono text-xs uppercase tracking-[0.18em] text-slate-500"
    role="status"
    aria-live="polite"
  >
    <span className="animate-pulse">{UI_COPY.loading}</span>
  </div>
);

const ErrorState = ({ message, onRetry }) => (
  <div
    className="mx-auto max-w-xl rounded-2xl border border-rose-400/30 bg-rose-950/20 p-8 text-center"
    role="alert"
  >
    <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-rose-300">
      Data pipeline error
    </p>
    <h2 className="mt-3 text-2xl font-black text-slate-100">
      Case studies could not be loaded
    </h2>
    <p className="mt-3 text-sm leading-6 text-slate-300">{message}</p>
    <button
      type="button"
      onClick={onRetry}
      className={cx(
        "mt-6 min-h-11 rounded-lg bg-rose-400 px-5 py-2 text-sm font-bold text-slate-950 transition hover:bg-rose-300",
        focusRing,
      )}
    >
      {UI_COPY.retry}
    </button>
  </div>
);

const FallbackNotice = ({ warning }) => (
  <div
    className="mb-6 rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100"
    role="status"
  >
    <strong className="font-semibold">Local fallback active.</strong>{" "}
    {UI_COPY.fallbackNotice}
    {warning ? (
      <span className="mt-1 block text-xs text-amber-200/70">
        Diagnostic: {warning}
      </span>
    ) : null}
  </div>
);

const CaseStudyCard = memo(function CaseStudyCard({
  study,
  onInspect,
}) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/35 p-6 shadow-xl transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-slate-900/60 sm:p-8">
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-px w-8 bg-cyan-400/50 transition-all group-hover:w-16"
      />
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-8 w-px bg-cyan-400/50 transition-all group-hover:h-16"
      />

      <header className="mb-5 flex flex-col gap-4 border-b border-slate-800 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-cyan-300">
            {study.category}
          </p>
          <h2 className="mt-2 text-xl font-black tracking-tight text-slate-100 transition group-hover:text-cyan-300">
            {study.title}
          </h2>
          <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">
            {study.client}
          </p>
        </div>

        <span className="w-fit rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 font-mono text-xs font-bold text-cyan-300">
          {study.period}
        </span>
      </header>

      <p className="text-sm leading-7 text-slate-400">{study.problem}</p>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technology tags">
        {study.tags.slice(0, 4).map((tag) => (
          <li
            key={`${study.id}-${tag}`}
            className="rounded-md border border-slate-800 bg-slate-950 px-2 py-1 font-mono text-[0.6875rem] text-slate-400"
          >
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-slate-800 pt-5 text-right">
        <button
          type="button"
          onClick={() => onInspect(study.id)}
          className={cx(
            "inline-flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 font-mono text-xs font-bold uppercase tracking-wide text-cyan-300 transition hover:bg-cyan-400/10 hover:text-cyan-200",
            focusRing,
          )}
          aria-label={`Inspect architecture for ${study.title}`}
        >
          Inspect architecture
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
});

const SectionBlock = memo(function SectionBlock({
  title,
  children,
  variant = "neutral",
}) {
  const variants = Object.freeze({
    danger:
      "border-rose-400/20 bg-rose-950/15 text-rose-300",
    success:
      "border-emerald-400/20 bg-emerald-950/15 text-emerald-300",
    neutral:
      "border-slate-800 bg-slate-950/50 text-slate-400",
  });

  return (
    <section
      className={cx(
        "space-y-3 rounded-xl border p-5",
        variants[variant] ?? variants.neutral,
      )}
    >
      <h3 className="flex items-center gap-2 font-mono text-xs font-black uppercase tracking-[0.16em]">
        <span
          aria-hidden="true"
          className="h-2 w-2 rounded-full bg-current"
        />
        {title}
      </h3>
      <div className="text-sm leading-7 text-slate-300">{children}</div>
    </section>
  );
});

// =============================================================================
// PAGE VIEWS
// =============================================================================

const CaseStudiesPage = ({
  studies,
  status,
  source,
  warning,
  error,
  onRetry,
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(
    query,
    APP_CONFIG.searchDebounceMs,
  );

  const normalizedQuery = debouncedQuery.trim().toLowerCase();

  const filteredStudies = useMemo(() => {
    if (!normalizedQuery) {
      return studies;
    }

    return studies.filter((study) => {
      const searchableText = [
        study.title,
        study.client,
        study.category,
        study.problem,
        study.solution,
        ...study.tags,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [normalizedQuery, studies]);

  const inspectStudy = useCallback(
    (id) => {
      navigate(ROUTES.caseStudyDetails(id));
    },
    [navigate],
  );

  return (
    <div className="relative z-10 mx-auto max-w-5xl">
      <header className="mb-10 flex flex-col gap-6 border-b border-slate-800 pb-10 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
            {UI_COPY.eyebrow}
          </p>
          <h1 className="mt-2 bg-gradient-to-r from-slate-100 via-cyan-100 to-slate-400 bg-clip-text text-4xl font-black tracking-tight text-transparent">
            {UI_COPY.title}
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            {UI_COPY.subtitle}
          </p>
        </div>

        <div className="w-full md:w-80">
          <label
            htmlFor="case-study-search"
            className="mb-2 block font-mono text-xs font-bold uppercase tracking-[0.14em] text-slate-500"
          >
            Search case studies
          </label>
          <input
            id="case-study-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Architecture, technology, problem…"
            className={cx(
              "min-h-11 w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 transition hover:border-slate-700",
              focusRing,
            )}
          />
        </div>
      </header>

      {source === "fallback" ? (
        <FallbackNotice warning={warning} />
      ) : null}

      {status === REQUEST_STATUS.LOADING ? <LoadingState /> : null}

      {status === REQUEST_STATUS.ERROR ? (
        <ErrorState message={error} onRetry={onRetry} />
      ) : null}

      {status === REQUEST_STATUS.SUCCESS ? (
        filteredStudies.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-950/40 py-20 text-center text-sm text-slate-500">
            {UI_COPY.empty}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredStudies.map((study) => (
              <CaseStudyCard
                key={study.id}
                study={study}
                onInspect={inspectStudy}
              />
            ))}
          </div>
        )
      ) : null}
    </div>
  );
};

const ArchitectureMetadata = ({ architecture }) => (
  <dl className="grid grid-cols-1 gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4 font-mono text-xs sm:grid-cols-3">
    {Object.entries(architecture).map(([key, value]) => (
      <div
        key={key}
        className="border-l border-slate-700 pl-3"
      >
        <dt className="text-[0.625rem] font-bold uppercase tracking-wider text-slate-500">
          {key}
        </dt>
        <dd className="mt-1 text-sm font-bold leading-5 text-slate-200">
          {value}
        </dd>
      </div>
    ))}
  </dl>
);

const BulletList = ({ items, marker = "▸" }) => (
  <ul className="space-y-2">
    {items.map((item) => (
      <li key={item.id} className="flex gap-3">
        <span aria-hidden="true" className="text-cyan-300">
          {marker}
        </span>
        <span>{item.text}</span>
      </li>
    ))}
  </ul>
);

const CaseStudyDetails = ({ studies, status }) => {
  const { id = "" } = useParams();
  const navigate = useNavigate();

  const study = useMemo(
    () =>
      studies.find((item) => item.id === id) ??
      STUDY_BY_ID.get(id) ??
      null,
    [id, studies],
  );

  const goBack = useCallback(() => {
    navigate(ROUTES.HOME);
  }, [navigate]);

  if (status === REQUEST_STATUS.LOADING) {
    return <LoadingState />;
  }

  if (!study) {
    return (
      <div className="relative z-10 mx-auto max-w-xl rounded-2xl border border-amber-400/20 bg-amber-950/10 p-8 text-center">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
          Case study not found
        </p>
        <h1 className="mt-3 text-2xl font-black text-slate-100">
          The requested architecture record does not exist
        </h1>
        <button
          type="button"
          onClick={goBack}
          className={cx(
            "mt-6 min-h-11 rounded-lg border border-slate-700 bg-slate-900 px-5 py-2 text-sm font-bold text-slate-200 transition hover:bg-slate-800",
            focusRing,
          )}
        >
          {UI_COPY.back}
        </button>
      </div>
    );
  }

  return (
    <article className="relative z-10 mx-auto max-w-4xl space-y-7 rounded-2xl border border-slate-800 bg-slate-900/30 p-6 shadow-2xl sm:p-10">
      <header className="border-b border-slate-800 pb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">
            <span
              aria-hidden="true"
              className="h-2 w-2 animate-pulse rounded-full bg-cyan-400"
            />
            Architecture deep dive
          </span>

          <button
            type="button"
            onClick={goBack}
            className={cx(
              "min-h-11 rounded-lg px-3 py-2 font-mono text-xs font-bold uppercase text-slate-400 transition hover:bg-slate-800 hover:text-slate-200",
              focusRing,
            )}
          >
            ← {UI_COPY.back}
          </button>
        </div>

        <p className="mt-8 font-mono text-xs uppercase tracking-[0.16em] text-slate-500">
          {study.client}
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-100 sm:text-4xl">
          {study.title}
        </h1>
        <p className="mt-3 text-sm text-slate-400">
          {study.period} · {study.category}
        </p>
      </header>

      <SectionBlock
        title="01 · Critical problem statement"
        variant="danger"
      >
        {study.problem}
      </SectionBlock>

      <SectionBlock
        title="02 · Resolution and implementation"
        variant="success"
      >
        {study.solution}
      </SectionBlock>

      <ArchitectureMetadata architecture={study.architecture} />

      <SectionBlock title="03 · Scaling strategy">
        <BulletList items={study.scaling} />
      </SectionBlock>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SectionBlock title="Advantages" variant="success">
          <BulletList
            items={study.tradeOffs.advantages}
            marker="+"
          />
        </SectionBlock>

        <SectionBlock title="Architectural costs" variant="danger">
          <BulletList
            items={study.tradeOffs.costs}
            marker="−"
          />
        </SectionBlock>
      </div>

      <SectionBlock title="04 · Engineering retrospective">
        <BulletList items={study.lessons} marker="▪" />
      </SectionBlock>

      <footer className="border-t border-slate-800 pt-6">
        <h2 className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
          Technology context
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <li
              key={`${study.id}-detail-${tag}`}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 font-mono text-xs text-slate-300"
            >
              {tag}
            </li>
          ))}
        </ul>
      </footer>
    </article>
  );
};

// =============================================================================
// LAYOUT AND ROUTER ORCHESTRATION
// =============================================================================

const LayoutWrapper = ({ children }) => (
  <div className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-12 text-slate-100 antialiased selection:bg-cyan-300 selection:text-slate-950 sm:px-12 sm:py-16">
    <a
      href="#main-content"
      className="sr-only z-[100] rounded-md bg-cyan-300 px-4 py-2 font-bold text-slate-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      Skip to main content
    </a>

    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.24)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.24)_1px,transparent_1px)] bg-[size:5rem_5rem]"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/4 top-0 h-[31rem] w-[50rem] rounded-full bg-cyan-400/5 blur-[8.75rem]"
    />

    <main id="main-content">{children}</main>
  </div>
);

const CaseStudyApplication = () => {
  const pipeline = useDataPipeline();

  return (
    <Routes>
      <Route
        path={ROUTES.HOME}
        element={
          <LayoutWrapper>
            <CaseStudiesPage
              studies={pipeline.studies}
              status={pipeline.status}
              source={pipeline.source}
              warning={pipeline.warning}
              error={pipeline.error}
              onRetry={pipeline.refresh}
            />
          </LayoutWrapper>
        }
      />

      <Route
        path={ROUTES.CASE_STUDY}
        element={
          <LayoutWrapper>
            <CaseStudyDetails
              studies={pipeline.studies}
              status={pipeline.status}
            />
          </LayoutWrapper>
        }
      />

      <Route
        path="*"
        element={<Navigate to={ROUTES.HOME} replace />}
      />
    </Routes>
  );
};

export default function CaseStudiesHyperscaleOperationalEngine() {
  return (
    <BrowserRouter>
      <CaseStudyApplication />
    </BrowserRouter>
  );
}
