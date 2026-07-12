import { useState, useEffect, useMemo } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const CAREER_START = 1975;
const YRS = new Date().getFullYear() - CAREER_START;

// ─── Data ─────────────────────────────────────────────────────────────────────
const STACKS = [
  { id:"frontend", label:"Frontend",       icon:"⚛️", color:"from-cyan-500/20 to-blue-500/20",    border:"border-cyan-500/30",   accent:"text-cyan-400",
    techs:[{ name:"React.js",pct:99,yrs:12},{ name:"Next.js",pct:99,yrs:9},{ name:"Redux.js",pct:98,yrs:10},{ name:"Tailwind CSS",pct:99,yrs:6},{ name:"TypeScript",pct:98,yrs:10},{ name:"UI/UX",pct:95,yrs:20}]},
  { id:"backend",  label:"Backend",        icon:"🔧", color:"from-green-500/20 to-emerald-500/20", border:"border-green-500/30",  accent:"text-green-400",
    techs:[{ name:"Node.js",pct:99,yrs:16},{ name:"Express.js",pct:99,yrs:14},{ name:"Django",pct:97,yrs:8},{ name:"REST API",pct:99,yrs:25},{ name:"GraphQL",pct:95,yrs:8},{ name:"WebSockets",pct:97,yrs:12}]},
  { id:"database", label:"Database & ORM", icon:"🗄️", color:"from-teal-500/20 to-cyan-500/20",    border:"border-teal-500/30",   accent:"text-teal-400",
    techs:[{ name:"Prisma ORM",pct:99,yrs:5},{ name:"PostgreSQL",pct:98,yrs:14},{ name:"MySQL",pct:97,yrs:16},{ name:"Redis",pct:94,yrs:11},{ name:"MongoDB",pct:91,yrs:10}]},
  { id:"cloud",    label:"Cloud & DevOps", icon:"☁️", color:"from-orange-500/20 to-amber-500/20", border:"border-orange-500/30", accent:"text-orange-400",
    techs:[{ name:"Docker",pct:99,yrs:11},{ name:"Kubernetes",pct:97,yrs:9},{ name:"AWS (Pro)",pct:98,yrs:14},{ name:"GCP",pct:94,yrs:9},{ name:"Azure",pct:93,yrs:8},{ name:"Terraform",pct:95,yrs:8}]},
  { id:"ai",       label:"AI / ML",        icon:"🤖", color:"from-violet-500/20 to-purple-500/20",border:"border-violet-500/30", accent:"text-violet-400",
    techs:[{ name:"GPT-4/OpenAI",pct:95,yrs:4},{ name:"LangChain",pct:93,yrs:3},{ name:"RAG Pipelines",pct:92,yrs:3},{ name:"Hugging Face",pct:88,yrs:3},{ name:"Python/MLOps",pct:91,yrs:8}]},
];

const PROJECTS = [
  { id:"ecom",  emoji:"🛒", title:"E-Commerce",    status:"Production", gradient:"from-emerald-600/20 to-cyan-600/20",   border:"border-emerald-500/30", accent:"text-emerald-400", year:2023,
    tech:["React.js","Next.js","Redux.js","Prisma","Django","PostgreSQL","MySQL","Docker","AWS","Tailwind CSS","REST API","UI/UX"],
    metrics:[{ v:"120K+",  l:"DAU" },{ v:"99.99%",l:"Uptime"   },{ v:"$4M+",   l:"Revenue"    }] },
  { id:"port",  emoji:"🎨", title:"Portfolio",      status:"Live",       gradient:"from-blue-600/20 to-violet-600/20",   border:"border-blue-500/30",    accent:"text-blue-400",    year:2024,
    tech:["React.js","Next.js","Redux.js","Prisma","Node.js","Express.js","PostgreSQL","MySQL","Docker","Cloud","Tailwind CSS","UI/UX"],
    metrics:[{ v:"100/100",l:"Lighthouse" },{ v:"<1.2s", l:"Load"     },{ v:"↑67%",   l:"Conversions"}] },
  { id:"dash",  emoji:"📊", title:"Dashboard",      status:"Production", gradient:"from-violet-600/20 to-pink-600/20",   border:"border-violet-500/30",  accent:"text-violet-400",  year:2023,
    tech:["React.js","Next.js","Redux.js","Prisma","Node.js","Express.js","PostgreSQL","MySQL","Docker","Cloud","Tailwind CSS","UI/UX"],
    metrics:[{ v:"500+",   l:"Tenants" },{ v:"50K/s", l:"Events"   },{ v:"10M+",   l:"Rows"       }] },
  { id:"chat",  emoji:"💬", title:"Real-Time Chat", status:"Production", gradient:"from-pink-600/20 to-red-600/20",      border:"border-pink-500/30",    accent:"text-pink-400",    year:2022,
    tech:["React.js","Next.js","Redux.js","Prisma","Node.js","Express.js","PostgreSQL","MySQL","Docker","Cloud","Tailwind CSS","UI/UX"],
    metrics:[{ v:"200K+",  l:"Concurrent"},{ v:"5M/day",l:"Messages" },{ v:"<15ms",  l:"Latency"    }] },
  { id:"ai-app",emoji:"🤖", title:"AI + Fullstack", status:"Production", gradient:"from-amber-600/20 to-orange-600/20", border:"border-amber-500/30",   accent:"text-amber-400",   year:2024,
    tech:["React.js","Next.js","Redux.js","Prisma","Django","PostgreSQL","MySQL","Docker","Cloud","Tailwind CSS","REST API","UI/UX"],
    metrics:[{ v:"1M+/day",l:"Inferences"},{ v:"↓60%", l:"Cost"     },{ v:"4.9/5",  l:"Rating"     }] },
];

const ACHIEVEMENTS = [
  { icon:"💻", label:"LeetCode Solved",      value:"500+",        sub:"Top 3% · Knight",            color:"text-amber-300"   },
  { icon:"🌐", label:"Google AI Certified",  value:"Certified",   sub:"AI Essentials",              color:"text-blue-300"    },
  { icon:"⚙️", label:"Google Automation",    value:"Certified",   sub:"IT Auto + Python",           color:"text-green-300"   },
  { icon:"🎓", label:"BSc Computer Science", value:"1st Class",   sub:"Univ. of London",            color:"text-violet-300"  },
  { icon:"🤖", label:"BSc AI (Online)",      value:"In Progress", sub:"Univ. of London · 78%",      color:"text-cyan-300"    },
  { icon:"☸️", label:"CKAD Certified",       value:"Passed",      sub:"CNCF · Kubernetes",          color:"text-purple-300"  },
  { icon:"☁️", label:"AWS Pro",              value:"SAA + DOP",   sub:"50+ services mastered",      color:"text-orange-300"  },
  { icon:"🗃️", label:"Prisma Expert",        value:"Certified",   sub:"5 production projects",      color:"text-teal-300"    },
];

const PRISMA_FEATURES = [
  { icon:"📐", name:"Schema Design",     pct:99 },
  { icon:"🔄", name:"Migrations",         pct:99 },
  { icon:"🔗", name:"Relations",          pct:98 },
  { icon:"⚡", name:"Query Optimisation", pct:97 },
  { icon:"🔐", name:"Transactions",       pct:98 },
  { icon:"🗃️", name:"Raw SQL",            pct:96 },
];

// ─── Async loader ─────────────────────────────────────────────────────────────
const loadData = () =>
  Promise.all([
    new Promise((r) => setTimeout(() => r({ stacks: STACKS }),     80)),
    new Promise((r) => setTimeout(() => r({ projects: PROJECTS }), 100)),
  ]).then((parts) => parts.reduce((a, p) => ({ ...a, ...p }), {}));

// ─── Atoms ────────────────────────────────────────────────────────────────────
const Badge = ({ label, cls }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${cls}`}>{label}</span>
);

const Bar = ({ pct }) => {
  const color =
    pct >= 97 ? "from-emerald-500 to-teal-400" :
    pct >= 90 ? "from-cyan-500 to-blue-400"    :
                "from-violet-500 to-purple-400";
  return (
    <div className="h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
      <div style={{ width:`${pct}%` }} className={`h-full rounded-full bg-gradient-to-r ${color}`} />
    </div>
  );
};

const Tile = ({ icon, label, value, sub, color }) => (
  <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4 text-center hover:border-slate-500/60 transition-colors">
    <div className="text-2xl mb-1">{icon}</div>
    <div className={`text-lg font-black ${color}`}>{value}</div>
    <div className="text-xs font-semibold text-slate-300 mt-0.5">{label}</div>
    {sub && <div className="text-xs text-slate-500 mt-0.5">{sub}</div>}
  </div>
);

// ─── Stack Card ───────────────────────────────────────────────────────────────
const StackCard = ({ stack }) => (
  <div className={`rounded-2xl border bg-gradient-to-br ${stack.color} ${stack.border} p-5 hover:border-white/20 transition-all duration-300`}>
    <div className="flex items-center gap-2 mb-4">
      <span className="text-2xl">{stack.icon}</span>
      <h3 className={`font-black text-base ${stack.accent}`}>{stack.label}</h3>
    </div>
    {stack.techs.map((t) => (
      <div key={t.name} className="mb-2.5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-slate-300">{t.name}</span>
          <div className="flex items-center gap-1.5">
            <Badge label={`${t.yrs}yr`} cls="bg-slate-700/60 text-slate-400 border-slate-600/40" />
            <span className="text-xs font-black text-slate-400">{t.pct}%</span>
          </div>
        </div>
        <Bar pct={t.pct} />
      </div>
    ))}
  </div>
);

// ─── Project Card ─────────────────────────────────────────────────────────────
const ProjectCard = ({ project }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-2xl border overflow-hidden bg-gradient-to-br ${project.gradient} ${project.border} hover:border-white/20 transition-all duration-300`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{project.emoji}</span>
            <div>
              <Badge label={project.status} cls="bg-slate-700/60 text-slate-300 border-slate-600/40" />
              <h3 className={`font-black text-sm mt-0.5 ${project.accent}`}>{project.title}</h3>
            </div>
          </div>
          <span className="text-slate-500 text-xs">{project.year}</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          {project.metrics.map((m) => (
            <div key={m.l} className="bg-slate-800/60 border border-slate-700/40 rounded-xl p-2 text-center">
              <div className={`text-sm font-black ${project.accent}`}>{m.v}</div>
              <div className="text-xs text-slate-500">{m.l}</div>
            </div>
          ))}
        </div>
        <button onClick={() => setOpen((v) => !v)}
          className="w-full text-xs font-bold py-1.5 rounded-xl bg-slate-800/50 border border-slate-700/40 text-slate-400 hover:text-white transition-colors">
          {open ? "Hide stack ▲" : "Show tech stack ▼"}
        </button>
        {open && (
          <div className="mt-3 flex flex-wrap gap-1">
            {project.tech.map((t) => (
              <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-slate-700/70 text-slate-300 border border-slate-600/40">{t}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Prisma Section ───────────────────────────────────────────────────────────
const PrismaSection = () => (
  <div className="bg-gradient-to-br from-teal-600/20 to-emerald-600/20 border border-teal-500/30 rounded-3xl p-6">
    <div className="flex items-center gap-3 mb-4">
      <span className="text-4xl">🗃️</span>
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-black text-white">Prisma ORM</h3>
          <Badge label="Expert Certified ✓" cls="bg-teal-500/20 text-teal-300 border-teal-500/30" />
        </div>
        <p className="text-xs text-slate-400 mt-0.5">Production use across all 5 projects · 5 years · since 2020 · 99% mastery</p>
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {PRISMA_FEATURES.map((f) => (
        <div key={f.name} className="bg-slate-800/50 border border-slate-700/40 rounded-xl p-3">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <span>{f.icon}</span>
              <span className="text-xs font-bold text-white">{f.name}</span>
            </div>
            <span className="text-xs font-black text-teal-300">{f.pct}%</span>
          </div>
          <Bar pct={f.pct} />
        </div>
      ))}
    </div>
    <p className="text-xs text-slate-500 mt-3 leading-relaxed">
      Schema design · migrations · relations · transactions · raw SQL · DataLoader N+1 elimination · Prisma Studio ·
      used with <span className="text-teal-300 font-bold">PostgreSQL</span> (all 5 projects) ·
      <span className="text-orange-300 font-bold"> MySQL</span> (3 projects) ·
      <span className="text-slate-400 font-bold"> SQLite</span> (dev/test isolation)
    </p>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const TechStackVisualizer = () => {
  const [data,    setData   ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab,     setTab    ] = useState("stacks");

  useEffect(() => {
    loadData().then((d) => { setData(d); setLoading(false); });
  }, []);

  const tabs = useMemo(() => [
    { id:"stacks",   label:"Tech Stacks",    icon:"⚡" },
    { id:"projects", label:"Projects",        icon:"🚀" },
    { id:"prisma",   label:"Prisma Infra",   icon:"🗃️" },
    { id:"achieve",  label:"Achievements",   icon:"🏆" },
  ], []);

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="animate-pulse space-y-4 w-full max-w-4xl px-6">
        <div className="h-40 bg-slate-800/60 rounded-3xl" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4].map((n) => <div key={n} className="h-10 bg-slate-800/60 rounded-xl" />)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1,2,3,4].map((n) => <div key={n} className="h-48 bg-slate-800/60 rounded-2xl" />)}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white" style={{ fontFamily:"'Inter','system-ui',sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-900/60 via-slate-900 to-cyan-900/40 border border-violet-500/20 p-8 mb-10 text-center">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 bg-violet-500/20 border border-violet-500/30 text-violet-300 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
              ⭐ Principal Engineer · Ultra FAANG · {YRS}+ Years
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
              Tech Stack{" "}
              <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Visualizer
              </span>
            </h1>
            <p className="text-slate-400 text-sm max-w-xl mx-auto mb-5">
              LeetCode 500+ · Google AI & Automation Certified · BSc CS + BSc AI (Univ. of London) ·
              AWS · Microsoft · IBM · Meta · Prisma · CNCF
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {["React","Next.js","Redux","Prisma","Django","Node.js","Docker","AWS","PostgreSQL","MySQL","Tailwind","REST API"].map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-slate-800/70 border border-slate-700/50 text-slate-300">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="sticky top-4 z-30 bg-slate-950/80 backdrop-blur-xl border border-slate-800/60 rounded-2xl p-1.5 mb-8 shadow-2xl">
          <div className="flex gap-1.5">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 flex-1 justify-center
                  ${tab === t.id ? "bg-violet-600 text-white shadow-lg shadow-violet-500/25" : "text-slate-400 hover:text-white hover:bg-slate-700/60"}`}>
                <span>{t.icon}</span>
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Panel: Tech Stacks */}
        {tab === "stacks" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {(data?.stacks ?? []).map((s) => <StackCard key={s.id} stack={s} />)}
          </div>
        )}

        {/* Panel: Projects */}
        {tab === "projects" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {(data?.projects ?? []).map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        )}

        {/* Panel: Prisma */}
        {tab === "prisma" && <PrismaSection />}

        {/* Panel: Achievements */}
        {tab === "achieve" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ACHIEVEMENTS.map((a) => (
              <Tile key={a.label} icon={a.icon} label={a.label} value={a.value} sub={a.sub} color={a.color} />
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-6 border-t border-slate-800/60 text-center">
          <p className="text-slate-500 text-xs">{CAREER_START}–{new Date().getFullYear()} · {YRS}+ yrs · Google · AWS · Microsoft · IBM · Meta · Prisma · CNCF</p>
        </footer>
      </div>
    </div>
  );
};

export default TechStackVisualizer;
