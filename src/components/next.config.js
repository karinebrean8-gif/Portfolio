/**
 * ============================================================================
 * ARCHITECTURE : NEXT.JS CONFIGURATION MATRIX & INFRALAYER HYDRATOR (SINGLE FILE)
 * SYSTEM       : SHAKIB MIA ULTRAGOD PORTFOLIO METRIC ENGINE
 * PARADIGM     : SELF-EXTRACTING DEPLOYMENT SYSTEM & HIGH-PERFORMANCE RUNTIME
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// 1. INFRALAYER INJECTION MATRIX (Automated Dockerfile Extraction Layer)
// ============================================================================
const IMMUTABLE_DOCKERFILE_BLUEPRINT = `
# syntax=docker/dockerfile:1.6
# --- PASS 1: DETERMINISTIC DEPENDENCY COMPILER & CACHE GATEKEEPER ---
FROM node:22-alpine AS dependency_compiler
WORKDIR /enterprise/infrastructure/runtime
RUN apk add --no-cache libc6-compat python3 make g++
COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm \\
    npm ci --prefer-offline --no-audit --progress=false

# --- PASS 2: PRODUCTION BUILD ENGINE & STATIC HYDRATION LAYER ---
FROM node:22-alpine AS asset_hydrator
WORKDIR /enterprise/infrastructure/runtime
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
COPY --from=dependency_compiler /enterprise/infrastructure/runtime/node_modules ./node_modules
COPY . .
RUN npm run build
RUN rm -rf node_modules && --mount=type=cache,target=/root/.npm npm prune --production

# --- PASS 3: HIGH-SECURITY DISTROLESS-INSPIRED PRODUCTION EDGE ENGINE ---
FROM node:22-alpine AS production_edge_gateway
WORKDIR /enterprise/infrastructure/runtime
ENV NODE_ENV=production PORT=3000 HOSTNAME="0.0.0.0"
RUN addgroup --system --gid 1001 ultrafaang_cloud_group && \\
    adduser --system --uid 1001 ultrafaang_cloud_architect
COPY --from=asset_hydrator --chown=ultrafaang_cloud_architect:ultrafaang_cloud_group /enterprise/infrastructure/runtime/public ./public
COPY --from=asset_hydrator --chown=ultrafaang_cloud_architect:ultrafaang_cloud_group /enterprise/infrastructure/runtime/.next/standalone ./
COPY --from=asset_hydrator --chown=ultrafaang_cloud_architect:ultrafaang_cloud_group /enterprise/infrastructure/runtime/.next/static ./.next/static
USER ultrafaang_cloud_architect
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \\
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"
CMD ["node", "server.js"]
`.trim();

// Self-Hydration Execution Loop (Executes strictly at Next.js boot time)
try {
  const targetPath = path.join(process.cwd(), 'Dockerfile');
  fs.writeFileSync(targetPath, IMMUTABLE_DOCKERFILE_BLUEPRINT, { encoding: 'utf8', mode: 0o644 });
  console.log('⚡ [INFRALAYER] Micro-kernel successfully injected Dockerfile to root workspace.');
} catch (infrastructureFault) {
  console.error('🚨 [CRITICAL_ERR] Infralayer hydration bottleneck:', infrastructureFault.message);
}

// ============================================================================
// 2. RUNTIME CORE NEXT.JS MATRIX ENGINE (Next.js Configurations)
// ============================================================================
const SECURITY_HEADERS_MANIFEST = Object.freeze([
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:;" }
]);

/** @type {import('next').NextConfig} */
const nextConfigurationEngine = {
  // Enforce native standalone build output (Essential for multi-stage Docker)
  output: 'standalone',

  // High-Scale Compilation Performance Tuning
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Compiler Matrix Refinement
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  // Asynchronous Security Headers Injection Link
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [...SECURITY_HEADERS_MANIFEST],
      },
    ];
  },

  // Webpack Low-Level Multi-Threaded Compilation Tuning
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Split chunks layout definition for ultra-low latency client delivery
      config.optimization.splitChunks.cacheGroups = {
        default: false,
        vendors: false,
        framework: {
          chunks: 'all',
          name: 'framework',
          test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types)[\\/]/,
          priority: 40,
          enforce: true,
        },
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
          priority: 20,
        },
      };
    }
    return config;
  },
};

module.exports = nextConfigurationEngine;