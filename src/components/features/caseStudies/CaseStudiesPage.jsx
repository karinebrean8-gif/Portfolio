import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';

/**
 * CaseStudiesPage
 * -----------------------------------------------------------------------------
 * Single-file, portfolio-ready case-study experience built with:
 * - React hooks
 * - immutable constants
 * - objects, arrays, maps, and promises
 * - Tailwind CSS utility classes
 * - accessible UI patterns
 * - deterministic async state handling
 * - clean presentation/application/domain separation inside one file
 *
 * Important:
 * The copy describes modernization of 40–50-year-old legacy systems.
 * It does not claim that the portfolio owner personally has 50+ years of
 * professional experience.
 */

// =============================================================================
// DOMAIN CONSTANTS
// =============================================================================

const ARCHITECTURE_LAYERS = Object.freeze({
  PRESENTATION: 'Presentation',
  APPLICATION: 'Application',
  DOMAIN: 'Domain',
  INFRASTRUCTURE: 'Infrastructure',
});

const METRIC_TYPES = Object.freeze({
  SCALE: 'scale',
  PERFORMANCE: 'performance',
  RELIABILITY: 'reliability',
  EFFICIENCY: 'efficiency',
});

const FILTER_KEYS = Object.freeze({
  ALL: 'ALL',
  HIGH_SCALE: 'HIGH_SCALE',
  FINTECH: 'FINTECH',
  AI: 'AI',
});

const REQUEST_STATUS = Object.freeze({
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
});

const UI_COPY = Object.freeze({
  eyebrow: 'Principal-level systems portfolio',
  title: 'Case Studies & Architecture',
  subtitle:
    'Selected engineering work focused on legacy modernization, distributed systems, reliability, performance, and product-facing operational tooling.',
  loading: 'Loading architecture case studies…',
  empty: 'No case studies match the selected filter.',
  noSelection: 'Select a case study to inspect its architecture and impact.',
  retry: 'Retry',
});

const SERVICE_CONFIG = Object.freeze({
  simulatedLatencyMs: 350,
});

const CASE_STUDIES_REPOSITORY = Object.freeze([
  Object.freeze({
    id: 'cs-001',
    title: 'Global Financial Settlement Modernization',
    client: 'Confidential Financial Infrastructure Program',
    duration: '2024–2026',
    sector: 'FinTech / Distributed Infrastructure',
    summary:
      'Modernized a decades-old batch-oriented settlement platform into a fault-tolerant, event-driven architecture with safe migration controls and observable reconciliation workflows.',
    tags: Object.freeze([
      'Distributed Systems',
      'Event Sourcing',
      'React',
      'Node.js',
      'Kafka',
      'PostgreSQL',
      'Kubernetes',
    ]),
    metrics: Object.freeze([
      Object.freeze({
        id: 'metric-volume',
        type: METRIC_TYPES.SCALE,
        label: 'Peak processing design',
        value: 'Multi-region',
        improvement: 'Horizontally scalable',
      }),
      Object.freeze({
        id: 'metric-latency',
        type: METRIC_TYPES.PERFORMANCE,
        label: 'Critical-path objective',
        value: 'Low-latency',
        improvement: 'Measured by SLO',
      }),
      Object.freeze({
        id: 'metric-safety',
        type: METRIC_TYPES.RELIABILITY,
        label: 'Migration strategy',
        value: 'Zero-downtime',
        improvement: 'Shadow validated',
      }),
    ]),
    architecture: Object.freeze({
      layer: ARCHITECTURE_LAYERS.DOMAIN,
      description:
        'A domain-first architecture isolates settlement rules from transport, storage, and deployment concerns so critical business behavior remains testable and portable.',
      highlights: Object.freeze([
        'Separated command and query paths to reduce coupling between transactional writes and analytical reads.',
        'Introduced dual-run reconciliation before cutover to compare legacy and modernized outputs safely.',
        'Applied idempotency keys, immutable event envelopes, and replay-aware consumers.',
      ]),
    }),
    narrative: Object.freeze([
      Object.freeze({
        id: 'legacy-bottleneck',
        heading: 'The legacy bottleneck',
        content:
          'The original workflow depended on sequential batch processing patterns common in systems designed decades ago. That model limited operational visibility, delayed reconciliation, and increased the risk of high-impact recovery work.',
      }),
      Object.freeze({
        id: 'migration-strategy',
        heading: 'The migration strategy',
        content:
          'The modernization plan avoided a high-risk one-time cutover. New services processed mirrored traffic, compared outcomes against the legacy path, and promoted workloads only after reconciliation thresholds and operational readiness checks were satisfied.',
      }),
    ]),
  }),
  Object.freeze({
    id: 'cs-002',
    title: 'Large-Scale AI Operations Console',
    client: 'Confidential AI Infrastructure Program',
    duration: '2023–2025',
    sector: 'Artificial Intelligence / Cloud Infrastructure',
    summary:
      'Designed an operational interface for high-volume compute telemetry, emphasizing responsive rendering, bounded memory use, progressive disclosure, and failure isolation.',
    tags: Object.freeze([
      'WebSockets',
      'Web Workers',
      'Canvas',
      'React',
      'TypeScript',
      'Kubernetes',
      'gRPC',
    ]),
    metrics: Object.freeze([
      Object.freeze({
        id: 'metric-nodes',
        type: METRIC_TYPES.SCALE,
        label: 'UI model',
        value: '100k+ nodes',
        improvement: 'Virtualized',
      }),
      Object.freeze({
        id: 'metric-rendering',
        type: METRIC_TYPES.PERFORMANCE,
        label: 'Rendering strategy',
        value: 'Frame-budgeted',
        improvement: 'Main thread protected',
      }),
      Object.freeze({
        id: 'metric-utilization',
        type: METRIC_TYPES.EFFICIENCY,
        label: 'Operator workflow',
        value: 'Faster triage',
        improvement: 'Progressive detail',
      }),
    ]),
    architecture: Object.freeze({
      layer: ARCHITECTURE_LAYERS.APPLICATION,
      description:
        'A streaming application layer transforms high-frequency telemetry into immutable, render-safe snapshots while keeping expensive parsing work away from the browser main thread.',
      highlights: Object.freeze([
        'Moved parsing and aggregation into dedicated workers to isolate expensive data processing.',
        'Used windowed rendering and normalized maps to avoid repeated full-list traversal.',
        'Applied backpressure, sampling, and stale-data indicators for degraded network conditions.',
      ]),
    }),
    narrative: Object.freeze([
      Object.freeze({
        id: 'telemetry-pressure',
        heading: 'The telemetry pressure',
        content:
          'Operational dashboards become unreliable when every backend event is treated as an immediate render request. Large bursts can block interactions, exhaust memory, and hide the incidents operators need to see first.',
      }),
      Object.freeze({
        id: 'frontend-model',
        heading: 'The frontend execution model',
        content:
          'The interface consumes bounded snapshots rather than raw unbounded streams. Data preparation, prioritization, and aggregation happen before React rendering, keeping the component tree focused on predictable presentation.',
      }),
    ]),
  }),
]);

const CASE_STUDY_BY_ID = new Map(
  CASE_STUDIES_REPOSITORY.map((study) => [study.id, study]),
);

const FILTER_OPTIONS = Object.freeze([
  Object.freeze({ key: FILTER_KEYS.ALL, label: 'All' }),
  Object.freeze({ key: FILTER_KEYS.HIGH_SCALE, label: 'High scale' }),
  Object.freeze({ key: FILTER_KEYS.FINTECH, label: 'FinTech' }),
  Object.freeze({ key: FILTER_KEYS.AI, label: 'AI systems' }),
]);

const FILTER_STRATEGIES = Object.freeze({
  [FILTER_KEYS.ALL]: () => true,
  [FILTER_KEYS.HIGH_SCALE]: (study) =>
    study.metrics.some((metric) => metric.type === METRIC_TYPES.SCALE),
  [FILTER_KEYS.FINTECH]: (study) =>
    study.sector.toLowerCase().includes('fintech'),
  [FILTER_KEYS.AI]: (study) =>
    study.sector.toLowerCase().includes('artificial intelligence'),
});

// =============================================================================
// DOMAIN VALIDATION
// =============================================================================

const isNonEmptyString = (value) =>
  typeof value === 'string' && value.trim().length > 0;

const validateCaseStudy = (study) => {
  const requiredStringFields = [
    study?.id,
    study?.title,
    study?.client,
    study?.duration,
    study?.sector,
    study?.summary,
  ];

  return (
    requiredStringFields.every(isNonEmptyString) &&
    Array.isArray(study.tags) &&
    Array.isArray(study.metrics) &&
    Array.isArray(study.narrative) &&
    study.architecture &&
    isNonEmptyString(study.architecture.description)
  );
};

// =============================================================================
// APPLICATION SERVICE
// =============================================================================

const wait = (milliseconds, signal) =>
  new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(resolve, milliseconds);

    const abortHandler = () => {
      window.clearTimeout(timeoutId);
      reject(new DOMException('The request was aborted.', 'AbortError'));
    };

    if (signal?.aborted) {
      abortHandler();
      return;
    }

    signal?.addEventListener('abort', abortHandler, { once: true });
  });

const CaseStudyService = Object.freeze({
  async fetchAll({ signal } = {}) {
    await wait(SERVICE_CONFIG.simulatedLatencyMs, signal);

    const studies = CASE_STUDIES_REPOSITORY.filter(validateCaseStudy);

    if (studies.length === 0) {
      throw new Error('No valid case-study records are available.');
    }

    return studies.map((study) => ({ ...study }));
  },
});

// =============================================================================
// ASYNC STATE
// =============================================================================

const initialRequestState = Object.freeze({
  status: REQUEST_STATUS.IDLE,
  data: [],
  error: null,
});

const requestReducer = (state, action) => {
  switch (action.type) {
    case 'request/start':
      return {
        ...state,
        status: REQUEST_STATUS.LOADING,
        error: null,
      };

    case 'request/success':
      return {
        status: REQUEST_STATUS.SUCCESS,
        data: action.payload,
        error: null,
      };

    case 'request/error':
      return {
        ...state,
        status: REQUEST_STATUS.ERROR,
        error: action.payload,
      };

    default:
      return state;
  }
};

const useCaseStudies = () => {
  const [state, dispatch] = useReducer(requestReducer, initialRequestState);
  const requestVersionRef = useRef(0);

  const load = useCallback(async () => {
    const requestVersion = requestVersionRef.current + 1;
    requestVersionRef.current = requestVersion;

    const controller = new AbortController();

    dispatch({ type: 'request/start' });

    try {
      const data = await CaseStudyService.fetchAll({
        signal: controller.signal,
      });

      if (requestVersionRef.current === requestVersion) {
        dispatch({ type: 'request/success', payload: data });
      }
    } catch (error) {
      if (
        error?.name !== 'AbortError' &&
        requestVersionRef.current === requestVersion
      ) {
        dispatch({
          type: 'request/error',
          payload:
            error instanceof Error
              ? error.message
              : 'An unexpected loading error occurred.',
        });
      }
    }

    return () => controller.abort();
  }, []);

  useEffect(() => {
    let cleanupRequest;

    load().then((cleanup) => {
      cleanupRequest = cleanup;
    });

    return () => {
      requestVersionRef.current += 1;
      cleanupRequest?.();
    };
  }, [load]);

  return {
    ...state,
    reload: load,
  };
};

// =============================================================================
// PRESENTATION HELPERS
// =============================================================================

const cx = (...classNames) => classNames.filter(Boolean).join(' ');

const formatStrategyLabel = (value) =>
  value
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const StatusBadge = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-cyan-200">
    {children}
  </span>
);

const LoadingState = () => (
  <div
    className="flex min-h-[60vh] items-center justify-center px-6"
    role="status"
    aria-live="polite"
  >
    <div className="w-full max-w-md rounded-2xl border border-emerald-400/20 bg-slate-900/90 p-6 shadow-2xl shadow-emerald-950/30">
      <div className="mb-4 flex items-center justify-between gap-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
        <span>Case-study index</span>
        <span className="animate-pulse">Loading</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
        <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-400">{UI_COPY.loading}</p>
    </div>
  </div>
);

const ErrorState = ({ message, onRetry }) => (
  <div className="flex min-h-[60vh] items-center justify-center px-6">
    <div
      className="w-full max-w-xl rounded-2xl border border-rose-400/30 bg-rose-950/20 p-8"
      role="alert"
    >
      <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-rose-300">
        Request failed
      </p>
      <h2 className="mt-2 text-2xl font-bold text-slate-100">
        Case studies could not be loaded
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-300">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-rose-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-rose-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
      >
        {UI_COPY.retry}
      </button>
    </div>
  </div>
);

const FilterBar = ({ activeFilter, onFilterChange }) => (
  <nav aria-label="Case-study filters">
    <div className="flex flex-wrap gap-2 rounded-xl border border-slate-800 bg-slate-950/80 p-1.5">
      {FILTER_OPTIONS.map(({ key, label }) => {
        const isActive = activeFilter === key;

        return (
          <button
            key={key}
            type="button"
            onClick={() => onFilterChange(key)}
            aria-pressed={isActive}
            className={cx(
              'min-h-10 rounded-lg px-3 py-2 font-mono text-xs font-bold uppercase tracking-wide transition',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300',
              isActive
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow-lg shadow-emerald-950/30'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100',
            )}
          >
            {label || formatStrategyLabel(key)}
          </button>
        );
      })}
    </div>
  </nav>
);

const CaseStudyDirectory = ({
  studies,
  selectedStudyId,
  onSelectStudy,
}) => (
  <section aria-labelledby="case-study-index-title">
    <div className="mb-4 flex items-center justify-between gap-4 px-1">
      <h2
        id="case-study-index-title"
        className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-slate-400"
      >
        Case-study index
      </h2>
      <span className="font-mono text-xs text-slate-500">
        {studies.length} result{studies.length === 1 ? '' : 's'}
      </span>
    </div>

    {studies.length === 0 ? (
      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/30 p-8 text-center text-sm text-slate-400">
        {UI_COPY.empty}
      </div>
    ) : (
      <div className="space-y-3">
        {studies.map((study) => {
          const isSelected = study.id === selectedStudyId;

          return (
            <button
              key={study.id}
              type="button"
              onClick={() => onSelectStudy(study.id)}
              aria-pressed={isSelected}
              className={cx(
                'group relative block w-full overflow-hidden rounded-2xl border p-5 text-left transition duration-200',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300',
                isSelected
                  ? 'translate-x-1 border-emerald-400/50 bg-slate-900 shadow-xl shadow-emerald-950/20'
                  : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/75',
              )}
            >
              {isSelected && (
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-emerald-400 to-cyan-400"
                />
              )}

              <span className="flex items-start justify-between gap-4">
                <span className="font-mono text-xs text-slate-500">
                  {study.duration}
                </span>
                <span className="rounded-md border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 font-mono text-[0.6875rem] font-bold uppercase tracking-wide text-emerald-300">
                  {study.id}
                </span>
              </span>

              <span
                className={cx(
                  'mt-3 block text-base font-bold tracking-tight transition',
                  isSelected
                    ? 'text-emerald-300'
                    : 'text-slate-100 group-hover:text-emerald-300',
                )}
              >
                {study.title}
              </span>

              <span className="mt-2 block text-sm leading-6 text-slate-400">
                {study.summary}
              </span>

              <span className="mt-4 flex flex-wrap gap-2">
                {study.tags.slice(0, 4).map((tag) => (
                  <span
                    key={`${study.id}-${tag}`}
                    className="rounded-md border border-slate-800 bg-slate-950 px-2 py-1 font-mono text-[0.6875rem] text-slate-400"
                  >
                    {tag}
                  </span>
                ))}

                {study.tags.length > 4 && (
                  <span className="px-1 py-1 font-mono text-[0.6875rem] text-slate-500">
                    +{study.tags.length - 4} more
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    )}
  </section>
);

const MetricGrid = ({ study }) => (
  <section aria-labelledby="impact-title">
    <h3
      id="impact-title"
      className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-slate-400"
    >
      Engineering impact
    </h3>

    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {study.metrics.map((metric) => (
        <article
          key={metric.id}
          className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950 p-4"
        >
          <span className="absolute right-0 top-0 rounded-bl-lg border-b border-l border-slate-800 bg-emerald-400/10 px-2 py-1 font-mono text-[0.625rem] font-bold uppercase text-emerald-300">
            {metric.improvement}
          </span>

          <p className="pr-20 font-mono text-xs uppercase text-slate-500">
            {metric.label}
          </p>
          <p className="mt-3 font-mono text-xl font-black tracking-tight text-slate-100 transition group-hover:text-cyan-300">
            {metric.value}
          </p>
        </article>
      ))}
    </div>
  </section>
);

const ArchitectureReview = ({ architecture }) => (
  <section
    className="rounded-xl border border-slate-800 bg-slate-950/60 p-5"
    aria-labelledby="architecture-title"
  >
    <StatusBadge>{architecture.layer} layer</StatusBadge>

    <h3
      id="architecture-title"
      className="mt-4 text-lg font-bold text-slate-100"
    >
      Architecture review
    </h3>

    <p className="mt-2 text-sm leading-7 text-slate-300">
      {architecture.description}
    </p>

    <ul className="mt-4 space-y-3">
      {architecture.highlights.map((highlight) => (
        <li
          key={highlight}
          className="flex items-start gap-3 text-sm leading-6 text-slate-400"
        >
          <span aria-hidden="true" className="mt-1 text-cyan-300">
            ▸
          </span>
          <span>{highlight}</span>
        </li>
      ))}
    </ul>
  </section>
);

const CaseStudyDetails = ({ study }) => {
  if (!study) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-slate-800 p-12 text-center text-sm text-slate-500">
        {UI_COPY.noSelection}
      </div>
    );
  }

  return (
    <article className="space-y-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-sm lg:p-10">
      <header className="border-b border-slate-800 pb-6">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">
          {study.sector}
        </p>

        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-100 lg:text-4xl">
          {study.title}
        </h2>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
          {study.summary}
        </p>

        <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
          <div className="flex gap-2">
            <dt>Context:</dt>
            <dd className="font-medium text-slate-200">{study.client}</dd>
          </div>
          <div className="flex gap-2">
            <dt>Timeline:</dt>
            <dd className="font-medium text-slate-200">{study.duration}</dd>
          </div>
        </dl>
      </header>

      <MetricGrid study={study} />
      <ArchitectureReview architecture={study.architecture} />

      <section aria-labelledby="implementation-title">
        <h3
          id="implementation-title"
          className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-slate-400"
        >
          Implementation narrative
        </h3>

        <div className="mt-5 space-y-6">
          {study.narrative.map((section) => (
            <article key={section.id}>
              <h4 className="flex items-center gap-3 text-base font-bold text-slate-100">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-sm bg-emerald-400"
                />
                {section.heading}
              </h4>
              <p className="mt-2 text-sm leading-7 text-slate-400">
                {section.content}
              </p>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-800 pt-6">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-slate-500">
          Technology context
        </p>

        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Technology stack">
          {study.tags.map((tag) => (
            <li
              key={`${study.id}-stack-${tag}`}
              className="rounded-lg border border-slate-700/70 bg-slate-900 px-3 py-1.5 font-mono text-xs font-medium text-slate-300 transition hover:border-emerald-400/40 hover:text-emerald-300"
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
// MAIN COMPONENT
// =============================================================================

export default function CaseStudiesPage() {
  const { status, data: caseStudies, error, reload } = useCaseStudies();
  const [activeFilter, setActiveFilter] = useState(FILTER_KEYS.ALL);
  const [selectedStudyId, setSelectedStudyId] = useState(
    CASE_STUDIES_REPOSITORY[0]?.id ?? null,
  );

  const filteredStudies = useMemo(() => {
    const strategy =
      FILTER_STRATEGIES[activeFilter] ?? FILTER_STRATEGIES[FILTER_KEYS.ALL];

    return caseStudies.filter(strategy);
  }, [activeFilter, caseStudies]);

  useEffect(() => {
    const selectedStudyIsVisible = filteredStudies.some(
      (study) => study.id === selectedStudyId,
    );

    if (!selectedStudyIsVisible) {
      setSelectedStudyId(filteredStudies[0]?.id ?? null);
    }
  }, [filteredStudies, selectedStudyId]);

  const selectedStudy = useMemo(() => {
    if (!selectedStudyId) {
      return null;
    }

    return (
      filteredStudies.find((study) => study.id === selectedStudyId) ??
      CASE_STUDY_BY_ID.get(selectedStudyId) ??
      null
    );
  }, [filteredStudies, selectedStudyId]);

  const handleFilterChange = useCallback((filterKey) => {
    if (FILTER_STRATEGIES[filterKey]) {
      setActiveFilter(filterKey);
    }
  }, []);

  const handleStudySelection = useCallback((studyId) => {
    setSelectedStudyId(studyId);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-emerald-300 selection:text-slate-950">
      <a
        href="#case-study-content"
        className="sr-only z-[100] rounded-md bg-emerald-300 px-4 py-2 font-bold text-slate-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to case studies
      </a>

      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 px-6 py-5 backdrop-blur-xl lg:px-12">
        <div className="mx-auto flex max-w-[1920px] flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
              {UI_COPY.eyebrow}
            </p>
            <h1 className="mt-1 bg-gradient-to-r from-emerald-300 via-cyan-300 to-indigo-300 bg-clip-text text-2xl font-black tracking-tight text-transparent">
              {UI_COPY.title}
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {UI_COPY.subtitle}
            </p>
          </div>

          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
        </div>
      </header>

      <main
        id="case-study-content"
        className="mx-auto max-w-[1920px] px-6 py-8 lg:px-12 lg:py-12"
      >
        {status === REQUEST_STATUS.LOADING && <LoadingState />}

        {status === REQUEST_STATUS.ERROR && (
          <ErrorState message={error} onRetry={reload} />
        )}

        {status === REQUEST_STATUS.SUCCESS && (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5 xl:col-span-4">
              <CaseStudyDirectory
                studies={filteredStudies}
                selectedStudyId={selectedStudyId}
                onSelectStudy={handleStudySelection}
              />
            </div>

            <div className="lg:col-span-7 xl:col-span-8">
              <CaseStudyDetails study={selectedStudy} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
