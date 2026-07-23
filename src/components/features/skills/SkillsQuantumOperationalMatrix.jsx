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

const DOMAINS = {
  ALL: 'ALL',
  FRONTEND: 'FRONTEND',
  BACKEND: 'BACKEND',
  CLOUD: 'CLOUD',
  DATA: 'DATA',
};

const FILTERS = [
  { label: 'All skills', value: DOMAINS.ALL },
  { label: 'Frontend', value: DOMAINS.FRONTEND },
  { label: 'Backend', value: DOMAINS.BACKEND },
  { label: 'Cloud & DevOps', value: DOMAINS.CLOUD },
  { label: 'Data', value: DOMAINS.DATA },
];

const SKILLS = [
  {
    id: 'react-typescript',
    name: 'React & TypeScript',
    domain: DOMAINS.FRONTEND,
    level: 'Advanced',
    years: 8,
    summary:
      'Component architecture, state management, performance, accessibility and scalable frontend delivery.',
    capabilities: [
      'React 18/19',
      'TypeScript',
      'Redux Toolkit',
      'Zustand',
      'SSR',
      'Testing',
    ],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    domain: DOMAINS.FRONTEND,
    level: 'Advanced',
    years: 6,
    summary:
      'Server rendering, routing, caching, application architecture and production deployment.',
    capabilities: [
      'App Router',
      'SSR',
      'SSG',
      'ISR',
      'Server Components',
      'SEO',
    ],
  },
  {
    id: 'python-django',
    name: 'Python & Django',
    domain: DOMAINS.BACKEND,
    level: 'Advanced',
    years: 9,
    summary:
      'Secure APIs, business-domain modeling, asynchronous workloads and scalable service architecture.',
    capabilities: [
      'Django',
      'DRF',
      'FastAPI',
      'Celery',
      'Pytest',
      'REST APIs',
    ],
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    domain: DOMAINS.BACKEND,
    level: 'Advanced',
    years: 7,
    summary:
      'API platforms, event-driven services, authentication and real-time application backends.',
    capabilities: [
      'Node.js',
      'NestJS',
      'Express',
      'WebSockets',
      'GraphQL',
      'Vitest',
    ],
  },
  {
    id: 'aws-cloud',
    name: 'AWS Cloud',
    domain: DOMAINS.CLOUD,
    level: 'Advanced',
    years: 7,
    summary:
      'Highly available infrastructure, application delivery, managed databases and operational security.',
    capabilities: ['EKS', 'EC2', 'S3', 'RDS', 'Lambda', 'CloudFront'],
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes & Docker',
    domain: DOMAINS.CLOUD,
    level: 'Advanced',
    years: 6,
    summary:
      'Container orchestration, deployment automation, workload reliability and environment consistency.',
    capabilities: [
      'Kubernetes',
      'Docker',
      'Helm',
      'Ingress',
      'Autoscaling',
      'GitOps',
    ],
  },
  {
    id: 'terraform-cicd',
    name: 'Terraform & CI/CD',
    domain: DOMAINS.CLOUD,
    level: 'Proficient',
    years: 5,
    summary:
      'Infrastructure as code, automated quality gates and repeatable production delivery.',
    capabilities: [
      'Terraform',
      'GitHub Actions',
      'Security scanning',
      'SBOM',
      'Release automation',
    ],
  },
  {
    id: 'databases',
    name: 'Databases & Caching',
    domain: DOMAINS.DATA,
    level: 'Advanced',
    years: 9,
    summary:
      'Relational modeling, query optimization, caching and reliable persistence architecture.',
    capabilities: [
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'Redis',
      'Prisma',
      'Elasticsearch',
    ],
  },
];

const THEMES = new Map([
  [
    DOMAINS.FRONTEND,
    {
      border: 'border-cyan-400/30',
      badge: 'border-cyan-400/20 bg-cyan-400/10 text-cyan-300',
    },
  ],
  [
    DOMAINS.BACKEND,
    {
      border: 'border-emerald-400/30',
      badge: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
    },
  ],
  [
    DOMAINS.CLOUD,
    {
      border: 'border-purple-400/30',
      badge: 'border-purple-400/20 bg-purple-400/10 text-purple-300',
    },
  ],
  [
    DOMAINS.DATA,
    {
      border: 'border-amber-400/30',
      badge: 'border-amber-400/20 bg-amber-400/10 text-amber-300',
    },
  ],
]);

const DEFAULT_THEME = {
  border: 'border-slate-700',
  badge: 'border-slate-700 bg-slate-800 text-slate-300',
};
const loadSkills = (signal) =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(() => resolve(SKILLS), 220);

    signal.addEventListener(
      'abort',
      () => {
        clearTimeout(timer);
        reject(new DOMException('Request aborted', 'AbortError'));
      },
      { once: true },
    );
  });

const SkillCard = memo(function SkillCard({ skill }) {
  const theme = THEMES.get(skill.domain) ?? DEFAULT_THEME;
  return (
    <article
      className={`flex h-full flex-col rounded-2xl border bg-slate-900/50 p-6 shadow-xl transition hover:-translate-y-1 hover:bg-slate-900 ${theme.border}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className={`rounded-full border px-3 py-1 text-xs font-bold ${theme.badge}`}>
          {skill.domain}
        </span>
        <span className="text-xs text-slate-500">{skill.years}+ years</span>
      </div>
      <h2 className="mt-5 text-xl font-black text-white">{skill.name}</h2>
      <p className="mt-1 text-sm font-semibold text-emerald-400">
        {skill.level}
      </p>
      <p className="mt-4 text-sm leading-7 text-slate-400">{skill.summary}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {skill.capabilities.slice(0, 6).map((capability) => (
          <li
            key={capability}
            className="rounded-md border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs text-slate-300"
          >
            {capability}
          </li>
        ))}
      </ul>
      <Link
        to={`/skills/${skill.id}`}
        className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-emerald-400 px-4 text-sm font-bold text-slate-950 transition hover:bg-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
      >
        View skill
      </Link>
    </article>
  );
});

function SkillsList() {
  const [records, setRecords] = useState([]);
  const [status, setStatus] = useState('loading');
  const [query, setQuery] = useState('');
  const [domain, setDomain] = useState(DOMAINS.ALL);
  useEffect(() => {
    const controller = new AbortController();
    loadSkills(controller.signal)
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

    return records.filter((skill) => {
      const matchesDomain =
        domain === DOMAINS.ALL || skill.domain === domain;
      const searchable = [
        skill.name,
        skill.domain,
        skill.level,
        skill.summary,
        ...skill.capabilities,
      ]
        .join(' ')
        .toLowerCase();

      return matchesDomain && searchable.includes(search);
    });
  }, [domain, query, records]);

  const stats = useMemo(
    () => [
      { label: 'Skills', value: records.length },
      {
        label: 'Domains',
        value: new Set(records.map(({ domain: item }) => item)).size,
      },
      {
        label: 'Capabilities',
        value: new Set(records.flatMap(({ capabilities }) => capabilities)).size,
      },
      {
        label: 'Average experience',
        value: records.length
          ? `${Math.round(
              records.reduce((total, skill) => total + skill.years, 0) /
                records.length,
            )}+ years`
          : '0 years',
      },
    ],
    [records],
  );

  if (status === 'loading') {
    return <p className="py-24 text-center text-slate-400">Loading skills…</p>;
  }
  if (status === 'error') {
    return (
      <p className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-8 text-center text-rose-300">
        Skills could not be loaded.
      </p>
    );
  }

  return (
    <>
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
          Technical capabilities
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
          Engineering Skills
        </h1>
        <p className="mt-5 max-w-3xl leading-7 text-slate-400">
          Production experience across frontend, backend, infrastructure,
          cloud delivery and data systems.
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
          placeholder="Search skills, tools or capabilities"
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none transition placeholder:text-slate-600 focus:border-emerald-400"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setDomain(filter.value)}
              className={`rounded-lg border px-4 py-2 text-xs font-semibold transition ${
                domain === filter.value
                  ? 'border-emerald-400 bg-emerald-400 text-slate-950'
                  : 'border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>
      <p className="mt-6 text-sm text-slate-400">
        Showing <strong className="text-white">{filtered.length}</strong> of{' '}
        {records.length} skills
      </p>
      {filtered.length ? (
        <section className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </section>
      ) : (
        <p className="mt-8 rounded-xl border border-dashed border-slate-700 py-16 text-center text-slate-500">
          No matching skills found.
        </p>
      )}
    </>
  );
}

function SkillDetails() {
  const { id } = useParams();
  const skill = SKILLS.find((item) => item.id === id);
  if (!skill) return <Navigate to="/skills" replace />;
  const theme = THEMES.get(skill.domain) ?? DEFAULT_THEME;
  return (
    <article
      className={`mx-auto max-w-3xl rounded-2xl border bg-slate-900/60 p-6 shadow-2xl md:p-10 ${theme.border}`}
    >
      <Link
        to="/skills"
        className="text-sm font-semibold text-emerald-400 hover:text-emerald-300"
      >
        ← Back to skills
      </Link>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <span className={`rounded-full border px-3 py-1 text-xs font-bold ${theme.badge}`}>
          {skill.domain}
        </span>
        <span className="text-sm text-slate-500">{skill.years}+ years</span>
      </div>
      <h1 className="mt-5 text-3xl font-black text-white md:text-5xl">
        {skill.name}
      </h1>
      <p className="mt-2 text-lg font-semibold text-emerald-400">
        {skill.level}
      </p>
      <p className="mt-6 leading-7 text-slate-400">{skill.summary}</p>
      <section className="mt-8">
        <h2 className="text-lg font-bold text-white">Core capabilities</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {skill.capabilities.map((capability) => (
            <li
              key={capability}
              className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300"
            >
              {capability}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

export default function SkillsQuantumOperationalMatrix() {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-slate-950 px-5 py-14 text-slate-100 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Routes>
            <Route path="/skills" element={<SkillsList />} />
            <Route path="/skills/:id" element={<SkillDetails />} />
            <Route path="*" element={<Navigate to="/skills" replace />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}
```
