/**
 * @file server.js
 * @description Enterprise-Grade Monolithic Gatekeeper & Application Engine.
 * @architecture Clean Onion Architecture / Centralized Ingress Pattern
 * @constraint Hard Ceiling Under 500 Lines (High Density Core)
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import RegistryIngress from './services/RegistryIngress.js';
import SchemaValidator from './services/SchemaValidator.js';

// =========================================================================
// 1. ENGINE CONFIGURATION & STRUCTURAL MAPS
// =========================================================================
const SERVER_CONFIG = Object.freeze({
  PORT: process.env.PORT || 8080,
  ENV: process.env.NODE_ENV || 'production',
  API_PREFIX: '/api/v1/portfolio',
  ALLOWED_ORIGINS: Object.freeze(['http://localhost:3000', 'https://your-ultra-faang-portfolio.com'])
});

// Structural routing lookup dictionary (Map Pattern)
const ROUTE_REGISTRY_MAP = new Map();

// =========================================================================
// 2. BACKEND TAILWIND LOG INTERFACE DICTIONARY
// =========================================================================
// কনসোলে বা রিমোট ড্যাশবোর্ডে Tailwind ইউটিলিটি ক্লাস স্ট্রিং পাস করার জন্য রিচ অবজেক্ট
const SYSTEM_LOG_THEME = Object.freeze({
  BOOT: 'bg-indigo-600 text-white font-bold px-3 py-1 rounded',
  SUCCESS: 'bg-emerald-500 text-black font-semibold px-2 py-0.5 rounded',
  WARN: 'bg-amber-500 text-black px-2 py-0.5 rounded',
  CRITICAL: 'bg-rose-600 text-white animate-pulse px-3 py-1 rounded-md'
});

// =========================================================================
// 3. MIDDLEWARE PIPELINE ORCHESTRATION
// =========================================================================
const initializeSecurityMiddlewares = (app) => {
  app.use(helmet());
  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || SERVER_CONFIG.ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`[Security Breach] Ingress Blocked by CORS Core Engine.`));
      }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true
  }));
  app.use(express.json());
};

// =========================================================================
// 4. ROUTE CONTROLLER KERNEL (Decoupled Promises Execution)
// =========================================================================
const RouteControllers = Object.freeze({
  /**
   * Fetch all integrated project nodes with direct telemetry analytics
   */
  getAllProjects: async (req, res, next) => {
    try {
      const activeServices = await RegistryIngress.fetchAllActiveServices();
      
      // Parallel execution mapping across registry nodes
      const mutatedPayloads = await Promise.all(activeServices.map(async (project) => {
        const validationReport = await SchemaValidator.validateProjectIngress(project);
        return {
          ...project,
          integrityReport: {
            isValid: validationReport.isValidated,
            timestamp: validationReport.timestamp,
            injectedTheme: validationReport.uiMetadata.statusBadgeStyles
          }
        };
      }));

      res.status(200).json({ success: true, count: mutatedPayloads.length, data: mutatedPayloads });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Filter dynamic services across multi-cloud structures via parameters
   */
  getProjectsByTech: async (req, res, next) => {
    try {
      const { targetTech } = req.params;
      const filteredResults = await RegistryIngress.resolveServicesByTechStack(targetTech);
      res.status(200).json({ success: true, query: targetTech, matches: filteredResults.length, data: filteredResults });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Real-time metrics streaming for Prisma Infrastructure, Docker and Cloud health statuses
   */
  getInfrastructureTelemetry: async (req, res, next) => {
    try {
      const infrastructureHealth = await RegistryIngress.queryInfrastructureHealth();
      const diagnosticLogs = await SchemaValidator.fetchSystemErrorLogs();

      res.status(200).json({
        success: true,
        telemetry: {
          ...infrastructureHealth,
          systemStatus: diagnosticLogs.length === 0 ? 'HEALTHY_OPERATION' : 'DEGRADED_STATE',
          activeFaults: diagnosticLogs.length,
          faultRegistry: diagnosticLogs
        }
      });
    } catch (error) {
      next(error);
    }
  }
});

// =========================================================================
// 5. SERVER INITIALIZATION & LIFECYCLE MANAGEMENT
// =========================================================================
const bootStrapServerEngine = async () => {
  const app = express();
  
  initializeSecurityMiddlewares(app);

  // Pre-mapping API endpoints explicitly into In-Memory Array/Map structure
  ROUTE_REGISTRY_MAP.set(`${SERVER_CONFIG.API_PREFIX}/services`, RouteControllers.getAllProjects);
  ROUTE_REGISTRY_MAP.set(`${SERVER_CONFIG.API_PREFIX}/search/:targetTech`, RouteControllers.getProjectsByTech);
  ROUTE_REGISTRY_MAP.set(`${SERVER_CONFIG.API_PREFIX}/telemetry/infra`, RouteControllers.getInfrastructureTelemetry);

  // Inject routes dynamically from the compiled Memory Map Blueprint
  Array.from(ROUTE_REGISTRY_MAP.entries()).map(([routePath, controllerMethod]) => {
    if (routePath.includes(':')) {
      app.get(routePath, controllerMethod); // Setup dynamic slug endpoints
    } else {
      app.get(routePath, controllerMethod); // Setup static endpoints
    }
  });

  // Global Centralized Error Catching Ingress Pipeline
  app.use((err, req, res, next) => {
    console.error(`\x1b[41m\x1b[37m[FATAL ARCHITECTURE EXCEPTION]\x1b[0m`, err.message);
    res.status(err.status || 500).json({
      success: false,
      errorKernel: {
        message: err.message || 'Internal Server Ingress Failure.',
        buildContext: SERVER_CONFIG.ENV === 'development' ? err.stack : 'REDACTED_PROD_SHIELD',
        tailwindBanner: SYSTEM_LOG_THEME.CRITICAL
      }
    });
  });

  // Start HTTP Kernel Listener Execution Context
  return new Promise((resolve) => {
    const liveInstance = app.listen(SERVER_CONFIG.PORT, () => {
      console.log(`\n>>> Engine Active: Running pipeline on port: ${SERVER_CONFIG.PORT}`);
      resolve(liveInstance);
    });
  });
};

// Fire up core initialization cluster immediately
const ServerNodeInstance = await bootStrapServerEngine();
export default ServerNodeInstance;