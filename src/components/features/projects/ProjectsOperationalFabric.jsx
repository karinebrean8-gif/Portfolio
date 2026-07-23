import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
const PROJECTS = Object.freeze([
  {
    id: "nextshop-commerce-platform",
    title: "NextShop Commerce Platform",
    type: "Full Stack",
    status: "Production Ready",
    summary:
      "A Django and React commerce platform covering catalog, cart, checkout, payments, administration, and operational workflows.",
    impact: [
      "Separated domain modules for products, orders, payments, sellers, and users.",
      "Introduced predictable client state and reusable API boundaries.",
      "Prepared containerized delivery and production-focused configuration."
    ],
    stack: ["React", "Redux Toolkit", "Django", "PostgreSQL", "Docker"],
    repository: "https://github.com/"
  },
  {
    id: "staff-engineer-portfolio",
    title: "Staff Engineer Portfolio",
    type: "Platform",
    status: "Active",
    summary:
      "A modern engineering portfolio presenting architecture, experience, projects, certifications, and delivery practices.",
    impact: [
      "Built reusable feature boundaries and route-driven page composition.",
      "Added CI, security, infrastructure, and deployment workflows.",
      "Designed responsive interfaces with accessible interaction states."
    ],
    stack: ["React", "Vite", "Tailwind CSS", "Prisma", "Kubernetes"],
    repository: "https://github.com/"
  },
  {
    id: "admin-operations-platform",
    title: "Admin Operations Platform",
    type: "Dashboard",
    status: "In Development",
    summary:
      "A role-aware administration platform for users, permissions, analytics, billing, audit events, and system operations.",
    impact: [
      "Defined modular frontend, API gateway, services, workers, and shared packages.",
      "Designed RBAC boundaries and permission-aware navigation.",
      "Planned observability, infrastructure, and automated delivery layers."
    ],
    stack: ["Next.js", "TypeScript", "NestJS", "Redis", "Terraform"],
    repository: "https://github.com/"
  }
]);
const FILTERS = Object.freeze(["All", "Full Stack", "Platform", "Dashboard"]);
const normalize = value => value.trim().toLowerCase();
const loadProjects = signal =>
  new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => resolve(PROJECTS), 180);
    signal.addEventListener(
      "abort",
      () => {
        window.clearTimeout(timer);
        reject(new DOMException("Request aborted", "AbortError"));
      },
      { once: true }
    );
  });
const matchesSearch = (project, query) =>
  [
    project.title,
    project.type,
    project.status,
    project.summary,
    ...project.impact,
    ...project.stack
  ].some(value => normalize(value).includes(query));
const ProjectCard = ({ project, onOpen }) => (
  <article className="group flex h-full flex-col rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-black/10 transition hover:-translate-y-1 hover:border-cyan-400/50">
    <div className="flex items-start justify-between gap-4">
      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">{project.type}</span>
        <h2 className="mt-3 text-xl font-bold leading-7 text-white">{project.title}</h2>
      </div>
      <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">{project.status}</span>
    </div>
    <p className="mt-5 flex-1 text-sm leading-6 text-slate-300">{project.summary}</p>
    <div className="mt-6 flex flex-wrap gap-2">
      {project.stack.map(technology => (
        <span
          key={technology}
          className="rounded-full bg-slate-950 px-3 py-1 text-xs text-slate-400 ring-1 ring-slate-800"
        >
          {technology}
        </span>
      ))}
    </div>
    <button
      type="button"
      onClick={() => onOpen(project.id)}
      className="mt-6 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300"
    >
      View project
    </button>
  </article>
);
const LoadingState = () => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-label="Loading projects">
    {[0, 1, 2].map(item => (
      <div
        key={item}
        className="h-80 animate-pulse rounded-3xl border border-slate-800 bg-slate-900/60"
      />
    ))}
  </div>
);
const EmptyState = () => (
  <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/40 px-6 py-16 text-center">
    <h2 className="text-xl font-semibold text-white">No projects found</h2>
    <p className="mt-2 text-sm text-slate-400">Try another keyword or project type.</p>
  </div>
);
function ProjectsPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    const controller = new AbortController();
    loadProjects(controller.signal)
      .then(data => {
        setProjects(data);
        setStatus("ready");
      })
      .catch(error => {
        if (error.name !== "AbortError") setStatus("error");
      });
    return () => controller.abort();
  }, []);
  const visibleProjects = useMemo(() => {
    const search = normalize(query);
    return projects.filter(project => {
      const typeMatch = type === "All" || project.type === type;
      return typeMatch && (!search || matchesSearch(project, search));
    });
  }, [projects, query, type]);
  const openProject = useCallback(
    projectId => navigate(`/projects/${projectId}`),
    [navigate]
  );
  return (
    <section className="mx-auto max-w-7xl">
      <header className="border-b border-slate-800 pb-10">
        <p className="text-sm font-semibold tracking-[0.22em] text-cyan-400">PROJECTS</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl">Systems designed for delivery, scale, and maintainable ownership.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
          Selected product, platform, and operational work across frontend,
          backend, cloud, infrastructure, and developer experience.
        </p>
      </header>
      <div className="flex flex-col gap-5 py-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map(filter => (
            <button
              key={filter}
              type="button"
              onClick={() => setType(filter)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                type === filter
                  ? "bg-cyan-400 text-slate-950"
                  : "border border-slate-800 text-slate-400 hover:border-cyan-400 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <label className="block w-full lg:w-80">
          <span className="sr-only">Search projects</span>
          <input
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search projects"
            className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
          />
        </label>
      </div>
      {status === "loading" && <LoadingState />}
      {status === "error" && (
        <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-8 text-rose-200">
          Projects could not be loaded.
        </div>
      )}
      {status === "ready" &&
        (visibleProjects.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={openProject}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        ))}
    </section>
  );
}
function ProjectDetailsPage() {
  const { projectId } = useParams();
  const project = PROJECTS.find(item => item.id === projectId);
  if (!project) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-800 bg-slate-900/60 p-10 text-center">
        <h1 className="text-2xl font-bold text-white">Project not found</h1>
        <Link
          to="/projects"
          className="mt-6 inline-flex rounded-xl bg-cyan-400 px-5 py-2.5 font-semibold text-slate-950 hover:bg-cyan-300"
        >
          Back to projects
        </Link>
      </div>
    );
  }
  return (
    <article className="mx-auto max-w-4xl">
      <Link
        to="/projects"
        className="text-sm font-semibold text-cyan-400 hover:text-cyan-300"
      >
        ← Back to projects
      </Link>
      <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-7 sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">{project.type}</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">{project.title}</h1>
        <p className="mt-4 text-slate-400">{project.status}</p>
        <p className="mt-8 text-lg leading-8 text-slate-300">{project.summary}</p>
        <section className="mt-10 border-t border-slate-800 pt-8">
          <h2 className="text-xl font-bold text-white">Selected impact</h2>
          <ul className="mt-5 grid gap-4">
            {project.impact.map(item => (
              <li key={item} className="flex gap-3 leading-7 text-slate-300">
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
        <div className="mt-8 flex flex-wrap gap-2">
          {project.stack.map(technology => (
            <span
              key={technology}
              className="rounded-full bg-slate-950 px-3 py-1 text-xs text-slate-400 ring-1 ring-slate-800"
            >
              {technology}
            </span>
          ))}
        </div>
        <a href={project.repository} target="_blank" rel="noreferrer" className="mt-8 inline-flex rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">
          View repository ↗
        </a>
      </div>
    </article>
  );
}
export default function ProjectsOperationalFabric() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:py-24">
      <Routes><Route index element={<ProjectsPage />} /><Route path=":projectId" element={<ProjectDetailsPage />} /></Routes>
    </main>
  );
}
