#!/usr/bin/env bash

# ============================================================================
# ARCHITECTURE : ULTRAGOD FULLSTACK SYSTEM CORE INTERFACE (50+ YRS EXP SPEC)
# APPLICATION  : SHAKIB MIA PORTFOLIO MATRIX MASTER KERNEL
# PARADIGM     : ZERO-EXTERNAL-DEPENDENCY AUTOMATED ECOSYSTEM GENERATOR
# ============================================================================

set -e

echo "============================================================================"
echo "🚀 INITIALIZING SHAKIB MIA FAANG CLOUD-NATIVE MATRIX INJECTOR"
echo "============================================================================\n"

# Create structural sub-directories for component isolation
mkdir -p src/components/ui src/app/api/health

# ----------------------------------------------------------------------------
# 1. NEXT.JS CONFIGURATION MATRIX [next.config.js]
# ----------------------------------------------------------------------------
echo "📂 Hydrating next.config.js..."
cat << 'EOF' > next.config.js
/** @type {import('next').NextConfig} */
const SECURITY_HEADERS = Object.freeze([
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:;" }
]);

module.exports = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  async headers() {
    return [{ source: '/:path*', headers: [...SECURITY_HEADERS] }];
  }
};
EOF

# ----------------------------------------------------------------------------
# 2. TYPESCRIPT COMPILER CONFIGURATION [tsconfig.json]
# ----------------------------------------------------------------------------
echo "📂 Hydrating tsconfig.json..."
cat << 'EOF' > tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

# ----------------------------------------------------------------------------
# 3. HIGH-PERFORMANCE CLOUD-NATIVE CONTAINER ENGINE [Dockerfile]
# ----------------------------------------------------------------------------
echo "📂 Hydrating Dockerfile..."
cat << 'EOF' > Dockerfile
# syntax=docker/dockerfile:1.6
FROM node:22-alpine AS dependency_compiler
WORKDIR /enterprise/app
RUN apk add --no-cache libc6-compat python3 make g++
COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm npm ci --prefer-offline --no-audit --progress=false

FROM node:22-alpine AS asset_hydrator
WORKDIR /enterprise/app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
COPY --from=dependency_compiler /enterprise/app/node_modules ./node_modules
COPY . .
RUN npm run build
RUN rm -rf node_modules && --mount=type=cache,target=/root/.npm npm prune --production

FROM node:22-alpine AS production_edge_gateway
WORKDIR /enterprise/app
ENV NODE_ENV=production PORT=3000 HOSTNAME="0.0.0.0"
RUN addgroup --system --gid 1001 faang_group && adduser --system --uid 1001 faang_architect
COPY --from=asset_hydrator --chown=faang_architect:faang_group /enterprise/app/public ./public
COPY --from=asset_hydrator --chown=faang_architect:faang_group /enterprise/app/.next/standalone ./
COPY --from=asset_hydrator --chown=faang_architect:faang_group /enterprise/app/.next/static ./.next/static
USER faang_architect
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"
CMD ["node", "server.js"]
EOF

# ----------------------------------------------------------------------------
# 4. CUSTOM STANDALONE PROXIED BACKEND INTEGRATOR [server.js]
# ----------------------------------------------------------------------------
echo "📂 Hydrating custom server.js layer..."
cat << 'EOF' > server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    
    // Direct Node-level interceptor route for Cloud Orchestrator Probes
    if (parsedUrl.pathname === '/api/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'UP', timestamp: new Date().toISOString() }));
      return;
    }

    handle(req, res, parsedUrl);
  }).listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> [CLUSTER] God-Mode Active on http://localhost:${PORT}`);
  });
});
EOF

# ----------------------------------------------------------------------------
# 5. ATOMIC UI BUTTON COMPONENT [src/components/ui/button.jsx]
# ----------------------------------------------------------------------------
echo "📂 Hydrating src/components/ui/button.jsx..."
cat << 'EOF' > src/components/ui/button.jsx
import React from 'react';

export const Button = ({ children, type = 'button', disabled, onClick, className = '' }) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={`w-full py-3.5 px-6 rounded-xl font-mono font-bold text-xs uppercase tracking-widest text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 disabled:opacity-40 transition-all shadow-lg shadow-emerald-500/5 ${className}`}
  >
    {children}
  </button>
);
EOF

# ----------------------------------------------------------------------------
# 6. ATOMIC UI INPUT ENGINE [src/components/ui/input.jsx]
# ----------------------------------------------------------------------------
echo "📂 Hydrating src/components/ui/input.jsx..."
cat << 'EOF' > src/components/ui/input.jsx
import React, { useState } from 'react';

export const Input = ({ id, label, type = 'text', placeholder, required, onChange }) => {
  const [err, setErr] = useState('');
  
  const validate = (val) => {
    if (required && !val) return setErr("Parameter stream is required.");
    if (type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return setErr("Malformed URI node.");
    setErr('');
  };

  return (
    <div className="flex flex-col space-y-2 w-full font-mono">
      <label htmlFor={id} className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
        {label} {required && <span className="text-emerald-400">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea id={id} placeholder={placeholder} onChange={(e) => { validate(e.target.value); onChange(id, e.target.value); }} className="w-full px-4 py-3.5 rounded-xl text-sm text-white bg-slate-950/40 border border-slate-800 focus:border-emerald-500/60 focus:ring-emerald-500/60 focus:outline-none h-32 resize-none transition-all duration-300" />
      ) : (
        <input id={id} type={type} placeholder={placeholder} onChange={(e) => { validate(e.target.value); onChange(id, e.target.value); }} className="w-full px-4 py-3.5 rounded-xl text-sm text-white bg-slate-950/40 border border-slate-800 focus:border-emerald-500/60 focus:ring-emerald-500/60 focus:outline-none transition-all duration-300" />
      )}
      {err && <p className="text-[11px] text-rose-400">✖ [FAULT] {err}</p>}
    </div>
  );
};
EOF

# ----------------------------------------------------------------------------
# 7. METRIC SHOWCASE CARD COMPONENT [src/components/ui/card.jsx]
# ----------------------------------------------------------------------------
echo "📂 Hydrating src/components/ui/card.jsx..."
cat << 'EOF' > src/components/ui/card.jsx
import React from 'react';

export const Card = ({ title, subtitle, description, tags = [], icon }) => (
  <div className="group relative w-full rounded-2xl border border-slate-900 bg-slate-900/40 p-6 flex flex-col justify-between transition-all duration-300 backdrop-blur-md hover:border-emerald-500/40 hover:bg-slate-900/80 shadow-2xl">
    <div className="space-y-4">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-emerald-500/10 text-emerald-400 shrink-0">{icon}</div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold text-white truncate">{title}</h3>
          <p className="text-xs font-mono text-emerald-400 mt-0.5">{subtitle}</p>
        </div>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{description}</p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag, idx) => (
          <span key={idx} className="text-[10px] font-mono text-slate-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-900">{tag}</span>
        ))}
      </div>
    </div>
  </div>
);
EOF

# ----------------------------------------------------------------------------
# 8. DIAGNOSTIC INTERCEPTOR MODAL [src/components/ui/dialog.jsx]
# ----------------------------------------------------------------------------
echo "📂 Hydrating src/components/ui/dialog.jsx..."
cat << 'EOF' > src/components/ui/dialog.jsx
import React, { useEffect } from 'react';

export const Dialog = ({ isOpen, onClose, identity }) => {
  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-950/95 p-6 font-mono text-xs text-slate-300 shadow-3xl">
        <div className="flex justify-between items-center border-b border-slate-900 pb-4 mb-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Diagnostic Manifest Log</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white text-base">✕</button>
        </div>
        <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-900 text-emerald-400/80">
          <p>[SYS] Infrastructure Context Matrix Stabilized.</p>
          <p>[SYS] Core Operational Target: {identity}</p>
          <p>[SYS] Thread Pool Allocation: High-Availability Mode.</p>
        </div>
      </div>
    </div>
  );
};
EOF

# ----------------------------------------------------------------------------
# 9. INTEGRATED ROUTING CONTROL INTERFACE [src/components/contact.jsx]
# ----------------------------------------------------------------------------
echo "📂 Hydrating src/components/contact.jsx..."
cat << 'EOF' > src/components/contact.jsx
import React, { useState, useCallback } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Dialog } from './ui/dialog';

const CONFIG = Object.freeze({
  identity: { name: "Shakib Mia", mobile: "0194683407", email: "r01227673@gmail.com" },
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/shakib-mia-497531" },
    { name: "GitHub", url: "https://github.com/karinebrean8-gif/NextShop" },
    { name: "Facebook", url: "https://www.facebook.com/shakib.mia.497531" }
  ]
});

export default function ContactPortfolioView() {
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const updateField = useCallback((id, val) => setFormData(p => ({ ...p, [id]: val })), []);
  
  const submitStream = (e) => {
    e.preventDefault();
    setStatus('Packet injected into routing gateway successfully.');
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-20 px-6 md:px-24">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* HERO MATRICES */}
        <div className="flex justify-between items-center border-b border-slate-900 pb-10">
          <div>
            <h1 className="text-5xl font-black text-white">{CONFIG.identity.name}</h1>
            <p className="text-emerald-400 font-mono text-xs uppercase mt-2">UltraFAANG Principal Fullstack Systems Architect</p>
          </div>
          <Button onClick={() => setModalOpen(true)} className="!w-auto bg-none border border-slate-800 text-white hover:bg-slate-900">Run Diagnostics</Button>
        </div>

        {/* CONTROLS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-lg font-bold text-white">Secure Ingress Channels</h3>
            <div className="p-5 border border-slate-900 rounded-xl bg-slate-900/10 font-mono text-sm space-y-3">
              <p><span className="text-slate-500">TEL:</span> {CONFIG.identity.mobile}</p>
              <p><span className="text-slate-500">MAIL:</span> {CONFIG.identity.email}</p>
            </div>
            <div className="flex gap-3">
              {CONFIG.socials.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noreferrer" className="px-4 py-2 text-xs font-mono border border-slate-900 bg-slate-900/40 rounded-lg hover:text-emerald-400 transition-all">{s.name}</a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={submitStream} className="p-8 border border-slate-900 rounded-2xl bg-slate-900/10 space-y-5">
              <Input id="name" label="Identity Signature String" required onChange={updateField} />
              <Input id="email" label="Cryptographic Mail Endpoint" type="email" required onChange={updateField} />
              <Input id="msg" label="Payload Spec Block" type="textarea" required onChange={updateField} />
              {status && <div className="p-4 rounded-xl text-xs font-mono border bg-emerald-500/10 border-emerald-500/20 text-emerald-400">{status}</div>}
              <Button type="submit">Transmit Stream Node</Button>
            </form>
          </div>
        </div>

        {/* METRIC SYSTEM COMPILATION CARD AT FOOTER */}
        <div className="pt-10 border-t border-slate-900">
          <Card title="NextShop Global CDN Core" subtitle="Edge Runtime Matrix" description="Distributed, multi-region commercial asset gateway with predictive dynamic rendering pipelines." tags={["Next.js", "TypeScript", "Docker", "Edge Engine"]} icon="⚡" />
        </div>

      </div>
      <Dialog isOpen={modalOpen} onClose={() => setModalOpen(false)} identity={CONFIG.identity.name} />
    </main>
  );
}
EOF

# ----------------------------------------------------------------------------
# 10. NESTED NATIVE HEALTH MONITOR INTERCEPTOR [src/app/api/health/route.ts]
# ----------------------------------------------------------------------------
cat << 'EOF' > src/app/api/health/route.ts
export async function GET() {
  return new Response(JSON.stringify({ status: "UP", gateway: "Edge Node Optimized" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
EOF

echo "\n🏁 SYSTEM MATRIX EXTRACTED SUCCESSFULLY."
echo "Your entire decoupled cluster workspace layout is fully generated and ready."
echo "============================================================================"