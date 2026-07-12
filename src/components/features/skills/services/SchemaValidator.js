/**
 * @file SchemaValidator.js
 * @description Ultra-FAANG Distributed Data Validation Engine & Guardrail.
 * @architecture Enterprise Domain-Driven Design (DDD) Ingress Guard
 * @constraint Strict Hard Ceiling Under 500 Lines (Ultra-Dense Optimization)
 */

// =========================================================================
// 1. IMMUTABLE CONSTANTS & CORE BLUEPRINTS (Domain Rules)
// =========================================================================
const TECH_REGISTRY = Object.freeze([
  'React.js', 'Next.js', 'Redux.js', 'Prisma', 'Cloud', 'Docker',
  'Tailwind CSS', 'Rest api', 'Django', 'PostgreSQL', 'MySQL', 
  'UI/UX', 'Node.js', 'Express.js', 'Prisma Infra'
]);

const STRICT_PROJECT_TYPES = Object.freeze({
  ECOMMERCE: 'Fullstack E-Commerce',
  PORTFOLIO: 'UI/UX Portfolio',
  DASHBOARD: 'Dashboard App',
  CHAT_APP: 'Real time chat-app',
  AI_APP: 'Ai+Fullstack APP'
});

// Structural expectations for internal data pipelines
const CORE_SCHEMA_BLUEPRINT = Object.freeze({
  id: 'string',
  name: 'string',
  type: 'string',
  techStack: 'array',
  isInfraReady: 'boolean',
  performanceMetrics: 'object'
});

// =========================================================================
// 2. TAILWIND DESIGN SYSTEM INGRESS INTERFACES (Lookups)
// =========================================================================
const VALIDATION_THEME_REGISTRY = Object.freeze({
  success: {
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    toast: 'bg-slate-950 border-l-4 border-emerald-500 text-slate-200'
  },
  failure: {
    badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    toast: 'bg-slate-950 border-l-4 border-rose-500 text-slate-200'
  },
  neutral: {
    badge: 'bg-slate-800 text-slate-300 border-slate-700',
    toast: 'bg-slate-900 border border-slate-800 text-slate-400'
  }
});

// =========================================================================
// 3. ENTERPRISE VALIDATION CORE ENGINE
// =========================================================================
class CoreSchemaValidator {
  #schemaCacheMap;
  #errorPipelineBuffer;

  constructor() {
    this.#schemaCacheMap = new Map();
    this.#errorPipelineBuffer = [];
    this.#preseedValidationSchemes();
  }

  /**
   * High Performance Map Pre-seeding for Ultra-Fast Memory Reads
   */
  #preseedValidationSchemes() {
    this.#schemaCacheMap.set(STRICT_PROJECT_TYPES.ECOMMERCE, {
      requiredTech: ['React.js', 'Next.js', 'Redux.js', 'Prisma', 'Cloud', 'Docker', 'Tailwind CSS', 'Rest api', 'Django', 'PostgreSQL', 'MySQL', 'UI/UX'],
      minTechCount: 12
    });

    this.#schemaCacheMap.set(STRICT_PROJECT_TYPES.PORTFOLIO, {
      requiredTech: ['React.js', 'Next.js', 'Redux.js', 'Prisma', 'Cloud', 'Docker', 'Tailwind CSS', 'Rest api', 'Node.js', 'Express.js', 'PostgreSQL', 'MySQL', 'UI/UX'],
      minTechCount: 13
    });

    this.#schemaCacheMap.set(STRICT_PROJECT_TYPES.DASHBOARD, {
      requiredTech: ['React.js', 'Next.js', 'Redux.js', 'Prisma', 'Cloud', 'Docker', 'Tailwind CSS', 'Rest api', 'Node.js', 'Express.js', 'PostgreSQL', 'MySQL', 'UI/UX'],
      minTechCount: 13
    });

    this.#schemaCacheMap.set(STRICT_PROJECT_TYPES.CHAT_APP, {
      requiredTech: ['React.js', 'Next.js', 'Redux.js', 'Prisma', 'Cloud', 'Docker', 'Tailwind CSS', 'Rest api', 'Node.js', 'Express.js', 'PostgreSQL', 'MySQL', 'UI/UX'],
      minTechCount: 13
    });

    this.#schemaCacheMap.set(STRICT_PROJECT_TYPES.AI_APP, {
      requiredTech: ['React.js', 'Next.js', 'Redux.js', 'Prisma', 'Cloud', 'Docker', 'Tailwind CSS', 'Rest api', 'Django', 'PostgreSQL', 'MySQL', 'UI/UX', 'Prisma Infra'],
      minTechCount: 13
    });
  }

  /**
   * Granular Type Validator Node
   */
  #validateFieldType(value, expectedType) {
    if (expectedType === 'array') return Array.isArray(value);
    return typeof value === expectedType;
  }

  /**
   * Deep Structural Audit Pipeline
   */
  #executeStructuralAudit(payload) {
    const errors = [];
    
    Object.keys(CORE_SCHEMA_BLUEPRINT).map((key) => {
      const expectedType = CORE_SCHEMA_BLUEPRINT[key];
      if (!(key in payload)) {
        errors.push(`Missing critical key payload field: [${key}]`);
      } else if (!this.#validateFieldType(payload[key], expectedType)) {
        errors.push(`Type mismatch on field [${key}]. Expected ${expectedType}, received ${typeof payload[key]}`);
      }
    });

    return errors;
  }

  /**
   * Tech Stack Completeness Verifier
   */
  #executeTechStackAudit(projectType, incomingTechStack) {
    const errors = [];
    const rule = this.#schemaCacheMap.get(projectType);

    if (!rule) {
      errors.push(`Unregistered Domain Project Type: ${projectType}`);
      return errors;
    }

    // Identify omitted mandatory technology definitions
    rule.requiredTech.map((tech) => {
      if (!incomingTechStack.includes(tech)) {
        errors.push(`Mandatory core tech feature asset missing: [${tech}]`);
      }
    });

    return errors;
  }

  /**
   * Public Async Interceptor Pipeline
   * @param {Object} projectPayload
   * @returns {Promise<Object>} High fidelity UI/UX mapping report
   */
  async validateProjectIngress(projectPayload) {
    return new Promise((resolve, reject) => {
      try {
        if (!projectPayload || typeof projectPayload !== 'object') {
          throw new Error('Fatal: Incoming core payload stream is null or corrupted.');
        }

        // Parallel Sync Tasks execution
        const structureErrors = this.#executeStructuralAudit(projectPayload);
        const stackErrors = !structureErrors.includes('Missing critical key payload field: [type]') && !structureErrors.includes('Missing critical key payload field: [techStack]')
          ? this.#executeTechStackAudit(projectPayload.type, projectPayload.techStack)
          : [];

        const aggregatedErrors = [...structureErrors, ...stackErrors];
        const isVerified = aggregatedErrors.length === 0;

        const reportContext = {
          payloadId: projectPayload.id || 'GENERIC_ERR_ID',
          isValidated: isVerified,
          errors: aggregatedErrors,
          timestamp: new Date().toISOString(),
          uiMetadata: {
            theme: isVerified ? VALIDATION_THEME_REGISTRY.success : VALIDATION_THEME_REGISTRY.failure,
            statusBadgeStyles: `inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border ${
              isVerified ? VALIDATION_THEME_REGISTRY.success.badge : VALIDATION_THEME_REGISTRY.failure.badge
            }`,
            toastContainerStyles: `p-4 rounded-xl shadow-2xl backdrop-blur-md flex items-start space-x-3 max-w-md ${
              isVerified ? VALIDATION_THEME_REGISTRY.success.toast : VALIDATION_THEME_REGISTRY.failure.toast
            }`
          }
        };

        // Cache historical errors for analytics reporting
        if (!isVerified) {
          this.#errorPipelineBuffer.push({ id: projectPayload.id, issues: aggregatedErrors });
        }

        resolve(reportContext);
      } catch (fatalKernelException) {
        reject({
          criticalFailure: true,
          message: fatalKernelException.message,
          timestamp: new Date().toISOString()
        });
      }
    });
  }

  /**
   * System Error Pipeline Diagnostics
   */
  async fetchSystemErrorLogs() {
    return new Promise((resolve) => resolve([...this.#errorPipelineBuffer]));
  }
}

// Global Singleton Initialization 
const SchemaValidatorInstance = Object.freeze(new CoreSchemaValidator());
export default SchemaValidatorInstance;