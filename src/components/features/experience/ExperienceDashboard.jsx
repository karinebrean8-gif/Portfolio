```jsx
import { memo, useEffect, useMemo, useState } from 'react';
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useParams,
} from 'react-router-dom';

const FILTERS = {
  ALL: 'ALL',
  PLATFORM: 'PLATFORM',
  DISTRIBUTED: 'DISTRIBUTED',
  BACKEND: 'BACKEND',
};

const FILTER_OPTIONS = [
  { label: 'All experience', value: FILTERS.ALL },
  { label: 'Platform', value: FILTERS.PLATFORM },
  { label: 'Distributed systems', value: FILTERS.DISTRIBUTED },
  { label: 'Backend', value: FILTERS.BACKEND },
];

const EXPERIENCES = [
  {
    id: 'alexicorn-staff-engineer',
    period: 'Jan 2016 — Present',
    role: 'Staff Fullstack Engineer',
    company: 'ALEXICORN',
    location: 'London, United Kingdom',
    category: FILTERS.PLATFORM,
    summary:
      'Designed and delivered multi-tenant web platforms, distributed backend services and cloud infrastructure supporting high-volume production workloads.',
    metrics: [
      { label: 'Concurrent users', value: '10K+' },
      { label: 'Peak throughput', value: '50K RPM' },
      { label: 'Infrastructure cost', value: '−40%' },
      { label: 'Platform availability', value: '99.9%' },
    ],
    achievements: [
      'Improved API performance by 60% through query optimization, Redis caching and asynchronous processing.',
      'Designed Kubernetes-based deployment architecture across AWS EKS, RDS, Redis and object storage.',
      'Reduced developer onboarding time by 90% through reusable tooling, documentation and automated environments.',
      'Led architecture decisions across frontend, backend, persistence, observability and delivery systems.',
    ],
    stack: [
      'React',
      'Next.js',
      'TypeScript',
      'Django',
      'FastAPI',
      'Node.js',
      'PostgreSQL',
      'Redis',
      'AWS',
      'Kubernetes',
      'Terraform',
    ],
  },
  {
    id: 'commerce-platform',
    period: '2022 — 2025',
    role: 'Platform Architecture Lead',
    company: 'Commerce Platform Program',
    location: 'Remote',
    category: FILTERS.DISTRIBUTED,
    summary:
      'Built scalable commerce capabilities covering product discovery, checkout, payments, fulfillment and operational administration.',
    metrics: [
      { label: 'API latency', value: '−55%' },
      { label: 'Deployment frequency', value: '3×' },
      { label: 'Recovery time', value: '−70%' },
      { label: 'Critical services', value: '12' },
    ],
    achievements: [
      'Separated business capabilities into independently deployable services with stable contracts.',
      'Introduced idempotent payment flows, durable event processing and failure recovery policies.',
      'Created shared observability standards for structured logs, metrics, traces and alert ownership.',
    ],
    stack: [
      'Django REST Framework',
      'NestJS',
      'Kafka',
      'PostgreSQL',
      'Elasticsearch',
      'Docker',
      'Kubernetes',
    ],
  },
  {
    id: 'developer-platform',
    period: '2020 — 2023',
    role: 'Senior Backend & Platform Engineer',
    company: 'Developer Platform Initiative',
    location: 'Remote',
    category: FILTERS.BACKEND,
    summary:
      'Developed internal platform services that standardized authentication, authorization, application delivery and operational workflows.',
    metrics: [
      { label: 'Build duration', value: '−45%' },
      { label: 'Manual operations', value: '−80%' },
      { label: 'Service adoption', value: '25+' },
      { label: 'Security controls', value: '15' },
    ],
    achievements: [
      'Built reusable authentication and RBAC services for multiple product teams.',
      'Automated CI/CD quality gates, security scans, artifact generation and environment promotion.',
      'Standardized database migrations, API validation and failure-response contracts.',
    ],
    stack: [
      'Python',
      'Node.js',
      'Prisma',
      'PostgreSQL',
      'GitHub Actions',
      'Docker',
      'Terraform',
    ],
  },
];

const CATEGORY_THEME = new Map([
  [
    FILTERS.PLATFORM,
    {
      border: 'border-cyan-400/30',
      badge: 'border-cyan-400/20 bg-cyan-400/10 text-cyan-300',
    },
  ],
  [
    FILTERS.DISTRIBUTED,
    {
      border: 'border-purple-400/30',
      badge: 'border-purple-400/20 bg-purple-400/10 text-purple-300',
    },
  ],
  [
    FILTERS.BACKEND,
    {
      border: 'border-emerald-400/30',
      badge: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
    },
  ],
]);

const DEFAULT_THEME = {
  border: 'border-slate-700',
  badge: 'border-slate-700 bg-slate-800 text-slate-300',
};

const loadExperiences = (signal) =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(() => resolve(EXPERIENCES), 250);
    signal.addEventListener(
      'abort',
      () => {
        clearTimeout(timer);
        reject(new DOMException('Request aborted', 'AbortError'));
      },
      { once: true },
    );
  });

const MetricGrid = memo(function MetricGrid({ metrics }) {
  return (
    <dl className="mt-6 grid grid-cols-2 gap-3">
      {metrics.map(({ label, value }) => (
        <div
          key={label}
          className="rounded-xl border border-slate-800 bg-slate-950/70 p-4"
        >
          <dd className="text-xl font-black text-white">{value}</dd>
          <dt className="mt-1 text-xs text-slate-500">{label}</dt>
        </div>
      ))}
    </dl>
  );
});

const ExperienceCard = memo(function ExperienceCard({ experience }) {
  const theme = CATEGORY_THEME.get(experience.category) ?? DEFAULT_THEME;
  return (
    <article
      className={`flex h-full flex-col rounded-2xl border bg-slate-900/50 p-6 shadow-xl transition hover:-translate-y-1 hover:bg-slate-900 ${theme.border}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <span className={`rounded-full border px-3 py-1 text-xs font-bold ${theme.badge}`}>
          {experience.category}
        </span>
        <span className="text-xs text-slate-500">{experience.period}</span>
      </div>

      <h2 className="mt-5 text-2xl font-black text-white">{experience.role}</h2>
      <p className="mt-1 font-semibold text-emerald-400">
        {experience.company}
      </p>
      <p className="mt-1 text-xs text-slate-500">{experience.location}</p>

      <p className="mt-5 line-clamp-3 text-sm leading-7 text-slate-400">
        {experience.summary}
      </p>
      <MetricGrid metrics={experience.metrics.slice(0, 4)} />
      <ul className="mt-5 flex flex-wrap gap-2">
        {experience.stack.slice(0, 6).map((technology) => (
          <li
            key={technology}
            className="rounded-md border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs text-slate-300"
          >
            {technology}
          </li>
        ))}
      </ul>
      <Link
        to={`/experience/${experience.id}`}
        className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-emerald-400 px-4 text-sm font-bold text-slate-950 transition hover:bg-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
      >
        View experience
      </Link>
    </article>
  );
});

function ExperienceList() {
  const [records, setRecords] = useState([]);
  const [status, setStatus] = useState('loading');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(FILTERS.ALL);
  useEffect(() => {
    const controller = new AbortController();
    loadExperiences(controller.signal)
      .then((data) => {
        setRecords(data);
        setStatus('success');
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setStatus('error');
      });
    return () => controller.abort();
  }, []);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return records.filter((experience) => {
      const matchesFilter =
        filter === FILTERS.ALL || experience.category === filter;
      const searchable = [
        experience.role,
        experience.company,
        experience.location,
        experience.summary,
        ...experience.achievements,
        ...experience.stack,
      ]
        .join(' ')
        .toLowerCase();
      return matchesFilter && searchable.includes(search);
    });
  }, [filter, query, records]);

  const stats = useMemo(
    () => [
      { label: 'Experience', value: '9+ years' },
      { label: 'Roles', value: records.length },
      {
        label: 'Technologies',
        value: new Set(records.flatMap(({ stack }) => stack)).size,
      },
      {
        label: 'Achievements',
        value: records.reduce(
          (total, item) => total + item.achievements.length,
          0,
        ),
      },
    ],
    [records],
  );
  if (status === 'loading') {
    return <p className="py-24 text-center text-slate-400">Loading experience…</p>;
  }
  if (status === 'error') {
    return (
      <p className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-8 text-center text-rose-300">
        Experience data could not be loaded.
      </p>
    );
  }

  return (
    <>
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
          Professional experience
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
          Engineering Experience
        </h1>
        <p className="mt-5 max-w-3xl leading-7 text-slate-400">
          Platform architecture, distributed systems, product engineering and
          measurable production outcomes.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl border border-slate-800 bg-slate-900/50 p-4"
            >
              <p className="text-xs uppercase tracking-wider text-slate-500">
                {label}
              </p>
              <p className="mt-2 text-2xl font-black text-white">{value}</p>
            </div>
          ))}
        </div>
      </header>
      <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
        <input
          type="search"
          value={query}
          onChange={({ target }) => setQuery(target.value)}
          placeholder="Search roles, systems, achievements or technologies"
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none transition placeholder:text-slate-600 focus:border-emerald-400"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          {FILTER_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilter(option.value)}
              className={`rounded-lg border px-4 py-2 text-xs font-semibold transition ${
                filter === option.value
                  ? 'border-emerald-400 bg-emerald-400 text-slate-950'
                  : 'border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>
      <p className="mt-6 text-sm text-slate-400">
        Showing <strong className="text-white">{filtered.length}</strong> of{' '}
        {records.length} roles
      </p>
      {filtered.length ? (
        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          {filtered.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </section>
      ) : (
        <p className="mt-8 rounded-xl border border-dashed border-slate-700 py-16 text-center text-slate-500">
          No matching experience found.
        </p>
      )}
    </>
  );
}

function ExperienceDetails() {
  const { id } = useParams();
  const experience = EXPERIENCES.find((item) => item.id === id);
  if (!experience) return <Navigate to="/experience" replace />;
  const theme = CATEGORY_THEME.get(experience.category) ?? DEFAULT_THEME;

  return (
    <article
      className={`mx-auto max-w-4xl rounded-2xl border bg-slate-900/60 p-6 shadow-2xl md:p-10 ${theme.border}`}
    >
      <Link
        to="/experience"
        className="text-sm font-semibold text-emerald-400 hover:text-emerald-300"
      >
        ← Back to experience
      </Link>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <span className={`rounded-full border px-3 py-1 text-xs font-bold ${theme.badge}`}>
          {experience.category}
        </span>
        <span className="text-sm text-slate-500">{experience.period}</span>
      </div>
      <h1 className="mt-5 text-3xl font-black text-white md:text-5xl">
        {experience.role}
      </h1>
      <p className="mt-2 text-xl font-semibold text-emerald-400">
        {experience.company}
      </p>
      <p className="mt-1 text-sm text-slate-500">{experience.location}</p>
      <p className="mt-6 max-w-3xl leading-7 text-slate-400">
        {experience.summary}
      </p>

      <MetricGrid metrics={experience.metrics} />
      <section className="mt-8">
        <h2 className="text-lg font-bold text-white">Key achievements</h2>
        <ul className="mt-4 space-y-3">
          {experience.achievements.map((achievement) => (
            <li
              key={achievement}
              className="flex gap-3 rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm leading-6 text-slate-400"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
              {achievement}
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-8">
        <h2 className="text-lg font-bold text-white">Technology stack</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {experience.stack.map((technology) => (
            <li
              key={technology}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-300"
            >
              {technology}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

export default function ExperienceDashboard() {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-slate-950 px-5 py-14 text-slate-100 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Routes>
            <Route path="/experience" element={<ExperienceList />} />
            <Route path="/experience/:id" element={<ExperienceDetails />} />
            <Route path="*" element={<Navigate to="/experience" replace />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}
```
