import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";

/**
 * CertificationsPage
 * =============================================================================
 * Recruiter-facing, single-file certifications and skills experience.
 *
 * Architectural goals:
 * - immutable constants, objects, arrays, and maps
 * - abortable Promise-based data pipeline
 * - predictable reducer state
 * - accessible search, filters, status messages, and controls
 * - stable keys and normalized data
 * - responsive Tailwind CSS-only presentation
 * - truthful credential language without unsupported seniority claims
 *
 * Data note:
 * Credential records below are portfolio-owner supplied. A credential is shown
 * as externally verifiable only when a real verification URL is provided.
 */

// =============================================================================
// CONFIGURATION
// =============================================================================

const APP_CONFIG = Object.freeze({
  simulatedLatencyMs: 260,
  searchDebounceMs: 180,
  defaultTrack: "ALL",
});

const REQUEST_STATUS = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
});

const VERIFICATION_STATUS = Object.freeze({
  VERIFIED: "verified",
  PROVIDED: "provided",
});

const UI_COPY = Object.freeze({
  eyebrow: "Professional development portfolio",
  title: "Certifications & Technical Learning",
  subtitle:
    "A structured view of coursework, assessments, technical practice, and the engineering capabilities developed through each learning track.",
  loading: "Loading credential records…",
  empty: "No credentials match the current search and filter.",
  retry: "Retry",
  allTracks: "All tracks",
  verificationUnavailable: "Verification link not provided",
});

// =============================================================================
// IMMUTABLE DOMAIN DATA
// =============================================================================

const CERTIFICATIONS_MANIFEST = Object.freeze([
  Object.freeze({
    id: "CERT-001",
    title: "Virtualization, Docker, and Kubernetes for Data Engineering",
    issuer: "Duke University",
    issued: "June 2026",
    expiry: null,
    credentialId: "3CCYPNBIEK26",
    verificationUrl: null,
    track: "Cloud & DevOps",
    skills: Object.freeze([
      "Docker",
      "Kubernetes",
      "Virtualization",
      "Data Engineering",
    ]),
  }),
  Object.freeze({
    id: "CERT-002",
    title: "Accelerate Your Job Search with AI",
    issuer: "Google",
    issued: "June 2026",
    expiry: null,
    credentialId: "8NSHZKDSCL16",
    verificationUrl: null,
    track: "Artificial Intelligence",
    skills: Object.freeze([
      "AI-assisted workflows",
      "Prompt design",
      "Job-search strategy",
    ]),
  }),
  Object.freeze({
    id: "CERT-003",
    title: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services",
    issued: "June 2026",
    expiry: null,
    credentialId: "HTPJ07B98G54",
    verificationUrl: null,
    track: "Cloud & DevOps",
    skills: Object.freeze([
      "AWS fundamentals",
      "Cloud economics",
      "Shared responsibility",
    ]),
  }),
  Object.freeze({
    id: "CERT-004",
    title: "Full Stack Software Developer Assessment",
    issuer: "IBM",
    issued: "May 2026",
    expiry: null,
    credentialId: "VH0MLV842PP4",
    verificationUrl: null,
    track: "Full-Stack Engineering",
    skills: Object.freeze([
      "Software assessment",
      "Application architecture",
      "Full-stack development",
    ]),
  }),
  Object.freeze({
    id: "CERT-005",
    title: "Introduction to Software Engineering",
    issuer: "IBM",
    issued: "June 2026",
    expiry: null,
    credentialId: "HZ28FS7TZXR1",
    verificationUrl: null,
    track: "Full-Stack Engineering",
    skills: Object.freeze([
      "Software development lifecycle",
      "Agile delivery",
      "Engineering fundamentals",
    ]),
  }),
  Object.freeze({
    id: "CERT-006",
    title: "Full-Stack Developer Capstone Project",
    issuer: "Microsoft",
    issued: "June 2026",
    expiry: null,
    credentialId: "8BOCR2L2NPME",
    verificationUrl: null,
    track: "Full-Stack Engineering",
    skills: Object.freeze([
      "System design",
      "Production deployment",
      "Application delivery",
    ]),
  }),
  Object.freeze({
    id: "CERT-007",
    title: "Getting Started with Git and GitHub",
    issuer: "IBM",
    issued: "June 2026",
    expiry: null,
    credentialId: "SGT8CVAL48OQ",
    verificationUrl: null,
    track: "Developer Productivity",
    skills: Object.freeze([
      "Git",
      "GitHub",
      "Version-control workflows",
    ]),
  }),
  Object.freeze({
    id: "CERT-008",
    title: "APIs",
    issuer: "Meta",
    issued: "June 2026",
    expiry: null,
    credentialId: "EJH8P9B7D9PG",
    verificationUrl: null,
    track: "Backend Engineering",
    skills: Object.freeze([
      "REST APIs",
      "API contracts",
      "HTTP fundamentals",
    ]),
  }),
  Object.freeze({
    id: "CERT-009",
    title: "Microservice Architectures",
    issuer: "Vanderbilt University",
    issued: "June 2026",
    expiry: null,
    credentialId: "ENB1OVY7NEOM",
    verificationUrl: null,
    track: "Backend Engineering",
    skills: Object.freeze([
      "Distributed systems",
      "Microservices",
      "Scalability trade-offs",
    ]),
  }),
  Object.freeze({
    id: "CERT-010",
    title: "Django Web Framework",
    issuer: "Meta",
    issued: "June 2026",
    expiry: null,
    credentialId: "MT4OBCGZSXC3",
    verificationUrl: null,
    track: "Backend Engineering",
    skills: Object.freeze([
      "Python",
      "Django",
      "Model-view-template architecture",
    ]),
  }),
  Object.freeze({
    id: "CERT-011",
    title: "Developing Back-End Apps with Node.js and Express",
    issuer: "IBM",
    issued: "June 2026",
    expiry: null,
    credentialId: "UNNXMXRIIO69",
    verificationUrl: null,
    track: "Backend Engineering",
    skills: Object.freeze([
      "Node.js",
      "Express",
      "Asynchronous JavaScript",
    ]),
  }),
  Object.freeze({
    id: "CERT-012",
    title: "Developing Front-End Apps with React",
    issuer: "IBM",
    issued: "June 2026",
    expiry: null,
    credentialId: "CB7P5PSKFESH",
    verificationUrl: null,
    track: "Frontend Engineering",
    skills: Object.freeze([
      "React",
      "State management",
      "Component architecture",
    ]),
  }),
  Object.freeze({
    id: "CERT-013",
    title: "Next.js Advanced Implementation & Routing",
    issuer: "Microsoft",
    issued: "July 2026",
    expiry: null,
    credentialId: "MSFT-NX-9021",
    verificationUrl: null,
    track: "Frontend Engineering",
    skills: Object.freeze([
      "Next.js",
      "Routing",
      "Server rendering",
      "Prisma",
    ]),
  }),
  Object.freeze({
    id: "CERT-014",
    title: "Project Management Essentials & Technical Leadership",
    issuer: "Google",
    issued: "July 2026",
    expiry: null,
    credentialId: "GOOG-PM-7712",
    verificationUrl: null,
    track: "Engineering Leadership",
    skills: Object.freeze([
      "Project planning",
      "Agile execution",
      "Team communication",
    ]),
  }),
  Object.freeze({
    id: "CERT-015",
    title: "Algorithm Practice — 130+ Solved Problems",
    issuer: "LeetCode",
    issued: "Ongoing",
    expiry: null,
    credentialId: "LC-RANK-130-PLUS",
    verificationUrl: null,
    track: "Algorithms & Data Structures",
    skills: Object.freeze([
      "Data structures",
      "Dynamic programming",
      "Graph algorithms",
      "Problem solving",
    ]),
  }),
]);

const SPECIALIZATION_DOMAINS = Object.freeze([
  Object.freeze({
    id: "domain-data",
    title: "Data & Persistence",
    description:
      "Relational modeling, query design, migrations, validation, and application-level data access.",
    skills: Object.freeze([
      "PostgreSQL",
      "MySQL",
      "Prisma ORM",
      "Relational modeling",
    ]),
  }),
  Object.freeze({
    id: "domain-product",
    title: "Product Engineering & Interface Design",
    description:
      "Accessible interfaces, component systems, responsive layouts, and design-to-code workflows.",
    skills: Object.freeze([
      "UI engineering",
      "UX workflows",
      "Figma",
      "Design tokens",
    ]),
  }),
]);

const BRAND_THEME_MAP = new Map([
  [
    "Duke University",
    Object.freeze({
      border: "border-blue-400/20",
      badge: "border-blue-400/20 bg-blue-400/10 text-blue-200",
    }),
  ],
  [
    "Google",
    Object.freeze({
      border: "border-rose-400/20",
      badge: "border-rose-400/20 bg-rose-400/10 text-rose-200",
    }),
  ],
  [
    "Amazon Web Services",
    Object.freeze({
      border: "border-amber-400/20",
      badge: "border-amber-400/20 bg-amber-400/10 text-amber-200",
    }),
  ],
  [
    "IBM",
    Object.freeze({
      border: "border-cyan-400/20",
      badge: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
    }),
  ],
  [
    "Microsoft",
    Object.freeze({
      border: "border-teal-400/20",
      badge: "border-teal-400/20 bg-teal-400/10 text-teal-200",
    }),
  ],
  [
    "Meta",
    Object.freeze({
      border: "border-indigo-400/20",
      badge: "border-indigo-400/20 bg-indigo-400/10 text-indigo-200",
    }),
  ],
  [
    "Vanderbilt University",
    Object.freeze({
      border: "border-yellow-400/20",
      badge: "border-yellow-400/20 bg-yellow-400/10 text-yellow-200",
    }),
  ],
  [
    "LeetCode",
    Object.freeze({
      border: "border-orange-400/20",
      badge: "border-orange-400/20 bg-orange-400/10 text-orange-200",
    }),
  ],
]);

const DEFAULT_BRAND_THEME = Object.freeze({
  border: "border-slate-700",
  badge: "border-slate-700 bg-slate-800 text-slate-300",
});

// =============================================================================
// DOMAIN UTILITIES
// =============================================================================

const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

const validateCredential = (credential) =>
  Boolean(
    credential &&
      isNonEmptyString(credential.id) &&
      isNonEmptyString(credential.title) &&
      isNonEmptyString(credential.issuer) &&
      isNonEmptyString(credential.issued) &&
      isNonEmptyString(credential.track) &&
      Array.isArray(credential.skills),
  );

const normalizeSearchText = (value) =>
  String(value ?? "")
    .trim()
    .toLocaleLowerCase();

const getVerificationStatus = (credential) =>
  isNonEmptyString(credential.verificationUrl)
    ? VERIFICATION_STATUS.VERIFIED
    : VERIFICATION_STATUS.PROVIDED;

const getCredentialSearchIndex = (credential) =>
  [
    credential.title,
    credential.issuer,
    credential.track,
    credential.credentialId,
    ...credential.skills,
  ]
    .join(" ")
    .toLocaleLowerCase();

const CREDENTIAL_SEARCH_INDEX = new Map(
  CERTIFICATIONS_MANIFEST.map((credential) => [
    credential.id,
    getCredentialSearchIndex(credential),
  ]),
);

// =============================================================================
// APPLICATION SERVICE
// =============================================================================

const wait = (milliseconds, signal) =>
  new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(resolve, milliseconds);

    const abort = () => {
      window.clearTimeout(timeoutId);
      reject(new DOMException("Credential request aborted.", "AbortError"));
    };

    if (signal?.aborted) {
      abort();
      return;
    }

    signal?.addEventListener("abort", abort, { once: true });
  });

const CertificationService = Object.freeze({
  async getAll({ signal } = {}) {
    await wait(APP_CONFIG.simulatedLatencyMs, signal);

    const records = CERTIFICATIONS_MANIFEST.filter(validateCredential);

    if (records.length === 0) {
      throw new Error("No valid credential records are available.");
    }

    return records.map((credential) => ({
      ...credential,
      skills: [...credential.skills],
      verificationStatus: getVerificationStatus(credential),
    }));
  },
});

// =============================================================================
// ASYNC STATE
// =============================================================================

const initialRequestState = Object.freeze({
  status: REQUEST_STATUS.IDLE,
  records: [],
  error: null,
});

const requestReducer = (state, action) => {
  switch (action.type) {
    case "request/start":
      return {
        ...state,
        status: REQUEST_STATUS.LOADING,
        error: null,
      };

    case "request/success":
      return {
        status: REQUEST_STATUS.SUCCESS,
        records: action.payload,
        error: null,
      };

    case "request/error":
      return {
        ...state,
        status: REQUEST_STATUS.ERROR,
        error: action.payload,
      };

    default:
      return state;
  }
};

const useCertifications = () => {
  const [state, dispatch] = useReducer(
    requestReducer,
    initialRequestState,
  );
  const controllerRef = useRef(null);
  const requestVersionRef = useRef(0);

  const load = useCallback(async () => {
    controllerRef.current?.abort();

    const controller = new AbortController();
    const version = requestVersionRef.current + 1;

    controllerRef.current = controller;
    requestVersionRef.current = version;

    dispatch({ type: "request/start" });

    try {
      const records = await CertificationService.getAll({
        signal: controller.signal,
      });

      if (
        !controller.signal.aborted &&
        requestVersionRef.current === version
      ) {
        dispatch({
          type: "request/success",
          payload: records,
        });
      }
    } catch (error) {
      if (
        error?.name !== "AbortError" &&
        requestVersionRef.current === version
      ) {
        dispatch({
          type: "request/error",
          payload:
            error instanceof Error
              ? error.message
              : "An unexpected credential error occurred.",
        });
      }
    }
  }, []);

  useEffect(() => {
    load();

    return () => {
      requestVersionRef.current += 1;
      controllerRef.current?.abort();
    };
  }, [load]);

  return {
    ...state,
    reload: load,
  };
};

// =============================================================================
// PRESENTATION UTILITIES
// =============================================================================

const cx = (...classes) => classes.filter(Boolean).join(" ");

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

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
// PRESENTATION COMPONENTS
// =============================================================================

const LoadingState = () => (
  <div
    className="flex min-h-[24rem] items-center justify-center"
    role="status"
    aria-live="polite"
  >
    <div className="w-full max-w-md rounded-2xl border border-emerald-400/20 bg-slate-900/80 p-6 shadow-2xl">
      <div className="flex items-center justify-between font-mono text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
        <span>Credential registry</span>
        <span className="animate-pulse">Loading</span>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
        <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
      </div>
      <p className="mt-4 text-sm text-slate-400">{UI_COPY.loading}</p>
    </div>
  </div>
);

const ErrorState = ({ message, onRetry }) => (
  <div
    className="mx-auto max-w-xl rounded-2xl border border-rose-400/30 bg-rose-950/20 p-8 text-center"
    role="alert"
  >
    <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-rose-300">
      Credential registry error
    </p>
    <h2 className="mt-3 text-2xl font-black text-slate-100">
      Certifications could not be loaded
    </h2>
    <p className="mt-3 text-sm leading-6 text-slate-300">{message}</p>
    <button
      type="button"
      onClick={onRetry}
      className={cx(
        "mt-6 min-h-11 rounded-lg bg-rose-400 px-5 py-2 text-sm font-bold text-slate-950 transition hover:bg-rose-300",
        FOCUS_RING,
      )}
    >
      {UI_COPY.retry}
    </button>
  </div>
);

const FilterBar = ({
  tracks,
  selectedTrack,
  onTrackChange,
}) => (
  <nav aria-label="Certification tracks">
    <div className="flex flex-wrap gap-2.5">
      {tracks.map((track) => {
        const isActive = selectedTrack === track.value;

        return (
          <button
            key={track.value}
            type="button"
            onClick={() => onTrackChange(track.value)}
            aria-pressed={isActive}
            className={cx(
              "min-h-10 rounded-lg border px-4 py-2 font-mono text-xs font-semibold tracking-wide transition",
              FOCUS_RING,
              isActive
                ? "border-emerald-400/40 bg-slate-800 text-emerald-300 shadow-lg shadow-emerald-950/20"
                : "border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-slate-200",
            )}
          >
            {track.label}
          </button>
        );
      })}
    </div>
  </nav>
);

const VerificationBadge = ({ status }) => {
  const isVerified = status === VERIFICATION_STATUS.VERIFIED;

  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.625rem] font-bold uppercase tracking-[0.12em]",
        isVerified
          ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
          : "border-slate-700 bg-slate-800/80 text-slate-400",
      )}
      title={
        isVerified
          ? "External verification link provided"
          : "Portfolio-owner supplied record"
      }
    >
      <span
        aria-hidden="true"
        className={cx(
          "h-1.5 w-1.5 rounded-full",
          isVerified ? "bg-emerald-300" : "bg-slate-500",
        )}
      />
      {isVerified ? "Verifiable" : "Portfolio record"}
    </span>
  );
};

const CertificationCard = memo(function CertificationCard({
  credential,
}) {
  const brandTheme =
    BRAND_THEME_MAP.get(credential.issuer) ?? DEFAULT_BRAND_THEME;

  return (
    <article
      className={cx(
        "group relative flex h-full flex-col justify-between rounded-2xl border bg-slate-900/35 p-6 shadow-lg backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:bg-slate-900/60 hover:shadow-2xl",
        brandTheme.border,
      )}
    >
      <div>
        <header className="flex flex-col gap-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <span
              className={cx(
                "rounded-full border px-2.5 py-1 font-mono text-[0.625rem] font-bold uppercase tracking-[0.12em]",
                brandTheme.badge,
              )}
            >
              {credential.issuer}
            </span>
            <VerificationBadge
              status={credential.verificationStatus}
            />
          </div>

          <div>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-slate-500">
              {credential.track}
            </p>
            <h3 className="mt-2 text-lg font-black leading-snug text-slate-100 transition group-hover:text-emerald-300">
              {credential.title}
            </h3>
          </div>
        </header>

        <dl className="mt-5 grid grid-cols-1 gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-4 text-xs">
          <div className="flex items-start justify-between gap-4">
            <dt className="font-mono uppercase tracking-wide text-slate-500">
              Issued
            </dt>
            <dd className="text-right font-medium text-slate-300">
              {credential.issued}
            </dd>
          </div>

          {credential.expiry ? (
            <div className="flex items-start justify-between gap-4">
              <dt className="font-mono uppercase tracking-wide text-slate-500">
                Expires
              </dt>
              <dd className="text-right font-medium text-slate-300">
                {credential.expiry}
              </dd>
            </div>
          ) : null}

          <div className="flex items-start justify-between gap-4">
            <dt className="font-mono uppercase tracking-wide text-slate-500">
              Credential
            </dt>
            <dd className="max-w-[65%] select-all break-all text-right font-mono text-slate-300">
              {credential.credentialId}
            </dd>
          </div>
        </dl>

        <section className="mt-5" aria-label="Skills developed">
          <h4 className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-slate-500">
            Skills developed
          </h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {credential.skills.map((skill) => (
              <li
                key={`${credential.id}-${skill}`}
                className="rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 font-mono text-[0.6875rem] text-slate-400 transition group-hover:border-slate-700 group-hover:text-slate-300"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <footer className="mt-6 border-t border-slate-800 pt-5">
        {credential.verificationUrl ? (
          <a
            href={credential.verificationUrl}
            target="_blank"
            rel="noreferrer"
            className={cx(
              "inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-emerald-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-emerald-300",
              FOCUS_RING,
            )}
          >
            Verify credential
            <span aria-hidden="true" className="ml-2">
              ↗
            </span>
          </a>
        ) : (
          <span
            className="flex min-h-11 w-full cursor-not-allowed items-center justify-center rounded-lg border border-slate-800 bg-slate-950 px-4 py-2 text-center text-xs font-medium text-slate-500"
            aria-label={UI_COPY.verificationUnavailable}
          >
            {UI_COPY.verificationUnavailable}
          </span>
        )}
      </footer>
    </article>
  );
});

const SpecializationCard = memo(function SpecializationCard({
  domain,
}) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/25 p-6">
      <h3 className="text-base font-bold text-slate-100">
        {domain.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        {domain.description}
      </p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {domain.skills.map((skill) => (
          <li
            key={`${domain.id}-${skill}`}
            className="rounded-lg border border-emerald-400/10 bg-slate-950 px-3 py-1.5 font-mono text-xs text-emerald-300/80"
          >
            {skill}
          </li>
        ))}
      </ul>
    </article>
  );
});

// =============================================================================
// MAIN PRESENTATION ENGINE
// =============================================================================

export default function CertificationsPage() {
  const { status, records, error, reload } = useCertifications();
  const [selectedTrack, setSelectedTrack] = useState(
    APP_CONFIG.defaultTrack,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebouncedValue(
    searchQuery,
    APP_CONFIG.searchDebounceMs,
  );

  const trackOptions = useMemo(() => {
    const tracks = Array.from(
      new Set(records.map((credential) => credential.track)),
    ).sort((left, right) => left.localeCompare(right));

    return [
      {
        value: APP_CONFIG.defaultTrack,
        label: UI_COPY.allTracks,
      },
      ...tracks.map((track) => ({
        value: track,
        label: track,
      })),
    ];
  }, [records]);

  const filteredCredentials = useMemo(() => {
    const normalizedQuery = normalizeSearchText(
      debouncedSearchQuery,
    );

    return records.filter((credential) => {
      const matchesTrack =
        selectedTrack === APP_CONFIG.defaultTrack ||
        credential.track === selectedTrack;

      const searchIndex =
        CREDENTIAL_SEARCH_INDEX.get(credential.id) ??
        getCredentialSearchIndex(credential);

      const matchesSearch =
        normalizedQuery.length === 0 ||
        searchIndex.includes(normalizedQuery);

      return matchesTrack && matchesSearch;
    });
  }, [debouncedSearchQuery, records, selectedTrack]);

  const summary = useMemo(() => {
    const issuerCount = new Set(
      records.map((credential) => credential.issuer),
    ).size;
    const trackCount = new Set(
      records.map((credential) => credential.track),
    ).size;
    const skillCount = new Set(
      records.flatMap((credential) => credential.skills),
    ).size;

    return {
      credentialCount: records.length,
      issuerCount,
      trackCount,
      skillCount,
    };
  }, [records]);

  const handleTrackChange = useCallback((track) => {
    setSelectedTrack(track);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 antialiased selection:bg-emerald-300 selection:text-slate-950 md:px-12 lg:px-24">
      <a
        href="#certification-content"
        className="sr-only z-[100] rounded-lg bg-emerald-300 px-4 py-2 font-bold text-slate-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to certifications
      </a>

      <header className="mx-auto max-w-7xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
          <span
            aria-hidden="true"
            className="h-2 w-2 animate-pulse rounded-full bg-emerald-300"
          />
          {UI_COPY.eyebrow}
        </div>

        <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-tight text-slate-100 md:text-5xl">
          Certifications, assessments, and{" "}
          <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
            continuous technical learning
          </span>
        </h1>

        <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400 md:text-base">
          {UI_COPY.subtitle}
        </p>

        {status === REQUEST_STATUS.SUCCESS ? (
          <dl className="mt-8 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              {
                id: "summary-credentials",
                label: "Credentials",
                value: summary.credentialCount,
              },
              {
                id: "summary-issuers",
                label: "Issuers",
                value: summary.issuerCount,
              },
              {
                id: "summary-tracks",
                label: "Learning tracks",
                value: summary.trackCount,
              },
              {
                id: "summary-skills",
                label: "Skill areas",
                value: summary.skillCount,
              },
            ].map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-800 bg-slate-900/40 p-4"
              >
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-slate-500">
                  {item.label}
                </dt>
                <dd className="mt-2 text-2xl font-black text-slate-100">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </header>

      <main
        id="certification-content"
        className="mx-auto mt-14 max-w-7xl"
      >
        {status === REQUEST_STATUS.LOADING ? <LoadingState /> : null}

        {status === REQUEST_STATUS.ERROR ? (
          <ErrorState message={error} onRetry={reload} />
        ) : null}

        {status === REQUEST_STATUS.SUCCESS ? (
          <>
            <section
              className="rounded-2xl border border-slate-800 bg-slate-900/25 p-5"
              aria-labelledby="credential-controls-title"
            >
              <h2
                id="credential-controls-title"
                className="sr-only"
              >
                Search and filter certifications
              </h2>

              <div className="flex flex-col gap-5">
                <div>
                  <label
                    htmlFor="credential-search"
                    className="mb-2 block font-mono text-xs font-bold uppercase tracking-[0.14em] text-slate-500"
                  >
                    Search credentials
                  </label>
                  <input
                    id="credential-search"
                    type="search"
                    value={searchQuery}
                    onChange={(event) =>
                      setSearchQuery(event.target.value)
                    }
                    placeholder="Search issuer, credential, track, or skill…"
                    className={cx(
                      "min-h-11 w-full max-w-xl rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 transition hover:border-slate-700",
                      FOCUS_RING,
                    )}
                  />
                </div>

                <FilterBar
                  tracks={trackOptions}
                  selectedTrack={selectedTrack}
                  onTrackChange={handleTrackChange}
                />
              </div>
            </section>

            <div
              className="mt-6 flex items-center justify-between gap-4"
              aria-live="polite"
            >
              <p className="text-sm text-slate-400">
                Showing{" "}
                <strong className="font-semibold text-slate-200">
                  {filteredCredentials.length}
                </strong>{" "}
                of {records.length} credentials
              </p>
            </div>

            {filteredCredentials.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-slate-700 bg-slate-900/20 py-20 text-center text-sm text-slate-400">
                {UI_COPY.empty}
              </div>
            ) : (
              <section
                className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                aria-label="Certification records"
              >
                {filteredCredentials.map((credential) => (
                  <CertificationCard
                    key={credential.id}
                    credential={credential}
                  />
                ))}
              </section>
            )}

            <section
              className="mt-16 border-t border-slate-800 pt-12"
              aria-labelledby="specializations-title"
            >
              <div className="max-w-3xl">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
                  Complementary capabilities
                </p>
                <h2
                  id="specializations-title"
                  className="mt-2 text-2xl font-black text-slate-100"
                >
                  Applied engineering specializations
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Supporting areas developed through projects,
                  coursework, and hands-on implementation.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                {SPECIALIZATION_DOMAINS.map((domain) => (
                  <SpecializationCard
                    key={domain.id}
                    domain={domain}
                  />
                ))}
              </div>
            </section>

            <aside className="mt-12 rounded-xl border border-slate-800 bg-slate-900/25 p-5 text-xs leading-6 text-slate-500">
              Credential details are portfolio-owner supplied.
              External verification is shown only when a real
              verification URL is configured. Course completion does
              not independently establish seniority or production
              experience.
            </aside>
          </>
        ) : null}
      </main>
    </div>
  );
}
