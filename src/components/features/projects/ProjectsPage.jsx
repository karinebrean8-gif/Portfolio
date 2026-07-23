```jsx
import { memo, useEffect, useMemo, useState } from 'react';

const FILTERS = {
  ALL: 'ALL',
  DJANGO: 'DJANGO',
  NODE: 'NODE',
  PLATFORM: 'PLATFORM',
};
const FILTER_OPTIONS = [
  { label: 'All projects', value: FILTERS.ALL },
  { label: 'Django', value: FILTERS.DJANGO },
  { label: 'Node.js', value: FILTERS.NODE },
  { label: 'Platform', value: FILTERS.PLATFORM },
];

const PROJECTS = [
  {
    id: 'nextshop-commerce',
    title: 'NextShop Commerce Platform',
    subtitle: 'Full-stack multi-service e-commerce system',
    description:
      'A commerce platform covering product discovery, cart, checkout, payment, seller operations and administrative workflows.',
    category: FILTERS.DJANGO,
    status: 'Production-ready',
    metrics: [
      { label: 'Architecture', value: 'Modular' },
      { label: 'API style', value: 'REST' },
      { label: 'Persistence', value: 'PostgreSQL' },
    ],
    technologies: [
      'React',
      'Redux Toolkit',
      'Django',
      'Django REST Framework',
      'PostgreSQL',
      'Redis',
      'Docker',
      'Tailwind CSS',
    ],
  },
  {
    id: 'staff-portfolio',
    title: 'Staff Engineer Portfolio',
    subtitle: 'Cloud-native engineering portfolio',
    description:
      'A production-focused portfolio presenting system design, engineering experience, certifications, projects and measurable technical outcomes.',
    category: FILTERS.PLATFORM,
    status: 'Active',
    metrics: [
      { label: 'Frontend', value: 'React 19' },
      { label: 'Delivery', value: 'CI/CD' },
      { label: 'Infrastructure', value: 'Kubernetes' },
    ],
    technologies: [
      'React',
      'Vite',
      'Redux Toolkit',
      'Prisma',
      'Docker',
      'Kubernetes',
      'Terraform',
      'GitHub Actions',
    ],
  },
  {
    id: 'admin-platform',
    title: 'Enterprise Admin Platform',
    subtitle: 'Role-based operational management system',
    description:
      'An administrative platform for users, roles, permissions, analytics, billing, audit trails and system operations.',
    category: FILTERS.NODE,
    status: 'Architecture complete',
    metrics: [
      { label: 'Authorization', value: 'RBAC' },
      { label: 'Services', value: 'Modular' },
      { label: 'Observability', value: 'Integrated' },
    ],
    technologies: [
      'Next.js',
      'TypeScript',
      'NestJS',
      'Prisma',
      'PostgreSQL',
      'Redis',
      'WebSockets',
      'Kubernetes',
    ],
  },
  {
    id: 'realtime-messaging',
    title: 'Real-Time Messaging System',
    subtitle: 'Event-driven communication platform',
    description:
      'A resilient messaging system supporting authenticated sessions, real-time delivery, presence, notification processing and durable message storage.',
    category: FILTERS.NODE,
    status: 'Prototype',
    metrics: [
      { label: 'Transport', value: 'WebSocket' },
      { label: 'Processing', value: 'Async' },
      { label: 'Delivery', value: 'Event-driven' },
    ],
    technologies: [
      'React',
      'Node.js',
      'Express',
      'Socket.IO',
      'Redis',
      'PostgreSQL',
      'Docker',
    ],
  },
  {
    id: 'ai-workflow-platform',
    title: 'AI Workflow Platform',
    subtitle: 'Context-aware automation application',
    description:
      'A full-stack platform for prompt-driven workflows, asynchronous processing, structured results and operational monitoring.',
    category: FILTERS.DJANGO,
    status: 'Research',
    metrics: [
      { label: 'Workflow', value: 'Async' },
      { label: 'Search', value: 'Vector' },
      { label: 'Interface', value: 'API-first' },
    ],
    technologies: [
      'React',
      'Python',
      'Django',
      'FastAPI',
      'PostgreSQL',
      'Vector Search',
      'Docker',
    ],
  },
];

const THEMES = new Map([
  [
    FILTERS.DJANGO,
    {
      border: 'border-emerald-400/30',
      badge: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
    },
  ],
  [
    FILTERS.NODE,
    {
      border: 'border-cyan-400/30',
      badge: 'border-cyan-400/20 bg-cyan-400/10 text-cyan-300',
    },
  ],
  [
    FILTERS.PLATFORM,
    {
      border: 'border-purple-400/30',
      badge: 'border-purple-400/20 bg-purple-400/10 text-purple-300',
    },
  ],
]);
const DEFAULT_THEME = {
  border: 'border-slate-700',
  badge: 'border-slate-700 bg-slate-800 text-slate-300',
};
const loadProjects = (signal) =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(() => resolve(PROJECTS), 220);
    signal.addEventListener(
      'abort',
      () => {
        clearTimeout(timer);
        reject(new DOMException('Request aborted', 'AbortError'));
      },
      { once: true },
    );
  });

const ProjectCard = memo(function ProjectCard({ project }) {
  const theme = THEMES.get(project.category) ?? DEFAULT_THEME;

  return (
    <article
      className={`flex h-full flex-col rounded-2xl border bg-slate-900/50 p-6 shadow-xl transition hover:-translate-y-1 hover:bg-slate-900 ${theme.border}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <span className={`rounded-full border px-3 py-1 text-xs font-bold ${theme.badge}`}>
          {project.category}
        </span>
        <span className="text-xs text-slate-500">{project.status}</span>
      </div>
      <h2 className="mt-5 text-2xl font-black text-white">{project.title}</h2>
      <p className="mt-1 text-sm font-semibold text-emerald-400">
        {project.subtitle}
      </p>
      <p className="mt-4 text-sm leading-7 text-slate-400">
        {project.description}
      </p>
      <dl className="mt-6 grid grid-cols-3 gap-2">
        {project.metrics.map(({ label, value }) => (
          <div
            key={label}
            className="rounded-lg border border-slate-800 bg-slate-950/70 p-3"
          >
            <dt className="text-[10px] uppercase tracking-wider text-slate-500">
              {label}
            </dt>
            <dd className="mt-1 text-sm font-bold text-slate-200">{value}</dd>
          </div>
        ))}
      </dl>
      <ul className="mt-6 flex flex-wrap gap-2">
        {project.technologies.map((technology) => (
          <li
            key={technology}
            className="rounded-md border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs text-slate-300"
          >
            {technology}
          </li>
        ))}
      </ul>
    </article>
  );
});

export default function ProjectsPage() {
  const [records, setRecords] = useState([]);
  const [status, setStatus] = useState('loading');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(FILTERS.ALL);
  useEffect(() => {
    const controller = new AbortController();
    loadProjects(controller.signal)
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
    return records.filter((project) => {
      const matchesFilter =
        filter === FILTERS.ALL || project.category === filter;
      const searchable = [
        project.title,
        project.subtitle,
        project.description,
        project.status,
        ...project.metrics.flatMap(({ label, value }) => [label, value]),
        ...project.technologies,
      ]
        .join(' ')
        .toLowerCase();
      return matchesFilter && searchable.includes(search);
    });
  }, [filter, query, records]);

  const stats = useMemo(
    () => [
      { label: 'Projects', value: records.length },
      {
        label: 'Technologies',
        value: new Set(records.flatMap(({ technologies }) => technologies)).size,
      },
      {
        label: 'Categories',
        value: new Set(records.map(({ category }) => category)).size,
      },
      {
        label: 'Active',
        value: records.filter(({ status }) => status === 'Active').length,
      },
    ],
    [records],
  );

  if (status === 'loading') {
    return (
      <main className="min-h-screen bg-slate-950 px-5 py-24 text-center text-slate-400">
        Loading projects…
      </main>
    );
  }
  if (status === 'error') {
    return (
      <main className="min-h-screen bg-slate-950 px-5 py-24">
        <p className="mx-auto max-w-xl rounded-xl border border-rose-500/30 bg-rose-950/20 p-8 text-center text-rose-300">
          Projects could not be loaded.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-14 text-slate-100 md:px-10">
      <div className="mx-auto max-w-7xl">
        <header>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
            Selected engineering work
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
            Projects
          </h1>
          <p className="mt-5 max-w-3xl leading-7 text-slate-400">
            Product systems, platforms and distributed applications designed
            with production-focused architecture and measurable engineering
            outcomes.
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
            placeholder="Search projects, technologies or architecture"
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
          {records.length} projects
        </p>

        {filtered.length ? (
          <section className="mt-6 grid gap-6 lg:grid-cols-2">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </section>
        ) : (
          <p className="mt-8 rounded-xl border border-dashed border-slate-700 py-16 text-center text-slate-500">
            No matching projects found.
          </p>
        )}
      </div>
    </main>
  );
}
```
