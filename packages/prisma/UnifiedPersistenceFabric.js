/**
 * @file UnifiedPersistenceFabric.ts
 * @package prisma
 * @description Principle-Level Ultra-FAANG Consolidated Persistence Kernel & Firewall Matrix.
 * @architecture Clean Domain Isolation / Single Point of Truth / ACID Interactive Transaction Core
 * @framework Prisma ORM Engine Integration / Zero-Dependency High-Entropy Data Sanitizer
 */

import { PrismaClient } from '@prisma/client';

// =========================================================================
// MODULE 1: ENTERPRISE GLOBAL API RESPONSE ENVELOPE STRUCTS
// =========================================================================
export interface UnifiedApiResponse<T = any> {
  success: boolean;
  telemetryTimestamp: number;
  executionTimeMs: number;
  payload: T | null;
  errorMatrix: {
    code: string;
    message: string;
    targetBoundary?: string;
  } | null;
}

// Native Global Declaration to bypass runtime linter errors across hot-reloads
declare global {
  // eslint-disable-next-line no-var
  var globalPrismaInstance: PrismaClient | undefined;
}

// =========================================================================
// MODULE 2: PERSISTENCE DOMAIN BOUNDARIES CONFIGURATION
// =========================================================================
export const PERSISTENCE_DOMAIN_BOUNDARIES = {
  PORTFOLIO: 'PORTFOLIO_PERSISTENCE_BOUND',
  ECOMMERCE: 'ECOMMERCE_GATEWAY_BOUND',
  AI_PLATFORM: 'AI_INFERENCE_PERSISTENCE_BOUND',
  CHAT_CORE: 'CHAT_STREAM_PERSISTENCE_BOUND',
  DASHBOARD: 'DASHBOARD_ANALYTICS_BOUND',
} as const;

export type PersistenceDomainBoundary =
  typeof PERSISTENCE_DOMAIN_BOUNDARIES[keyof typeof PERSISTENCE_DOMAIN_BOUNDARIES];

// =========================================================================
// MODULE 3: CRYPTOGRAPHIC & TELEMETRY INPUT VALIDATION ENGINE
// =========================================================================
const STRICT_TELEMETRY_REGEX = Object.freeze({
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  UUID_V4: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
  ALPHANUMERIC_DASH: /^[a-zA-Z0-9-_]+$/,
  SECURE_URL: /^https:\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([/?#][-a-zA-Z0-9@:%_+.~#?&//=]*)?$/,
  BD_PHONE: /^01[3-9]\d{8}$/
});

export interface ValidationResult {
  isValid: boolean;
  sanitizedData: any;
  violationMatrix: { field: string; rule: string; description: string }[];
}

export class EnterpriseValidationEngine {
  public static deepSanitizePayload<T>(rawPayload: T): T {
    if (rawPayload === null || rawPayload === undefined) return rawPayload;
    if (typeof rawPayload === 'string') {
      return rawPayload.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/["']/g, '').trim() as unknown as T;
    }
    if (Array.isArray(rawPayload)) {
      return rawPayload.map(item => this.deepSanitizePayload(item)) as unknown as T;
    }
    if (typeof rawPayload === 'object') {
      const sanitizedObj: any = {};
      for (const [key, value] of Object.entries(rawPayload)) {
        sanitizedObj[key] = this.deepSanitizePayload(value);
      }
      return sanitizedObj as T;
    }
    return rawPayload;
  }

  public static validateClusterPayload(domain: PersistenceDomainBoundary, payload: Record<string, any>): ValidationResult {
    const matrix: ValidationResult = { isValid: true, sanitizedData: null, violationMatrix: [] };
    const cleanPayload = this.deepSanitizePayload(payload);

    switch (domain) {
      case PERSISTENCE_DOMAIN_BOUNDARIES.AI_PLATFORM:
        if (!cleanPayload.promptContext || typeof cleanPayload.promptContext !== 'string' || cleanPayload.promptContext.length < 5) {
          matrix.violationMatrix.push({ field: 'promptContext', rule: 'MIN_LENGTH_CEILING', description: 'AI Prompt context content is too shallow.' });
        }
        if (cleanPayload.maxTokens && (typeof cleanPayload.maxTokens !== 'number' || cleanPayload.maxTokens > 128000)) {
          matrix.violationMatrix.push({ field: 'maxTokens', rule: 'HARD_MAX_LIMIT_OVERFLOW', description: 'Requested tokens exceed horizontal pipeline limits.' });
        }
        break;
      case PERSISTENCE_DOMAIN_BOUNDARIES.ECOMMERCE:
        if (!cleanPayload.productId || !STRICT_TELEMETRY_REGEX.UUID_V4.test(cleanPayload.productId)) {
          matrix.violationMatrix.push({ field: 'productId', rule: 'UUID_V4_INVALID', description: 'Product ID must be a valid cryptographic UUID v4.' });
        }
        if (!cleanPayload.phone || !STRICT_TELEMETRY_REGEX.BD_PHONE.test(cleanPayload.phone)) {
          matrix.violationMatrix.push({ field: 'phone', rule: 'BD_PHONE_INVALID', description: 'Phone must be a valid 11-digit Bangladesh cellular structure.' });
        }
        if (cleanPayload.totalAmount === undefined || typeof cleanPayload.totalAmount !== 'number' || cleanPayload.totalAmount <= 0) {
          matrix.violationMatrix.push({ field: 'totalAmount', rule: 'PRICE_INVALID', description: 'Total amount allocation must be greater than 0.' });
        }
        break;
      case PERSISTENCE_DOMAIN_BOUNDARIES.CHAT_CORE:
        if (!cleanPayload.messageStream || typeof cleanPayload.messageStream !== 'string' || cleanPayload.messageStream.length > 65535) {
          matrix.violationMatrix.push({ field: 'messageStream', rule: 'MAX_BYTE_CAPACITY_BREACH', description: 'Realtime socket transmission frame size exceeds 64KB buffer.' });
        }
        break;
      default:
        if (cleanPayload.email && !STRICT_TELEMETRY_REGEX.EMAIL.test(cleanPayload.email)) {
          matrix.violationMatrix.push({ field: 'email', rule: 'MALFORMED_RFC_STRUCTURE', description: 'Identification routing pointer does not match standard patterns.' });
        }
        break;
    }

    matrix.isValid = matrix.violationMatrix.length === 0;
    if (matrix.isValid) matrix.sanitizedData = cleanPayload;
    return matrix;
  }
}

// =========================================================================
// MODULE 4: PRISMA TELEMETRY EXTENSIONS & FACTORY INITIALIZATION
// =========================================================================
function injectFaangTelemetryExtensions(client: PrismaClient) {
  return client.$extends({
    query: {
      $allModels: {
        async $allOperations({ model, operation, args, query }) {
          const startHighResTime = performance.now();
          const queryExecutionResult = await query(args);
          const executionDurationMs = performance.now() - startHighResTime;

          if (process.env.NODE_ENV !== 'production') {
            console.log(
              `\x1b[36m[Prisma Query Telemetry]\x1b[0m ${model}.${operation} ` +
              `executed in \x1b[33m${executionDurationMs.toFixed(2)}ms\x1b[0m`
            );
          }
          return queryExecutionResult;
        },
      },
    },
  });
}

let basePrismaInstance: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  basePrismaInstance = new PrismaClient({ log: ['error', 'warn'], errorFormat: 'minimal' });
} else {
  if (!globalThis.globalPrismaInstance) {
    globalThis.globalPrismaInstance = new PrismaClient({ log: ['query', 'error', 'warn'], errorFormat: 'pretty' });
  }
  basePrismaInstance = globalThis.globalPrismaInstance;
}

const extendedPrismaClient = injectFaangTelemetryExtensions(basePrismaInstance);

// =========================================================================
// MODULE 5: MACRO CLUSTER PERSISTENCE KERNEL (Unified Facade)
// =========================================================================
export class EnterprisePersistenceKernel {
  public static readonly engine = extendedPrismaClient;
  public static readonly domains = PERSISTENCE_DOMAIN_BOUNDARIES;

  /**
   * Safe Query Executor with Embedded Input Firewall Validation Matrix
   */
  public static async execute<T>(
    operation: () => Promise<T>,
    domainBoundary: PersistenceDomainBoundary = PERSISTENCE_DOMAIN_BOUNDARIES.PORTFOLIO,
    inboundPayloadToValidate?: Record<string, any>
  ): Promise<UnifiedApiResponse<T>> {
    const startEnvelopeTime = performance.now();

    // Ingress Firewall Guardrail Trigger
    if (inboundPayloadToValidate) {
      const validationReport = EnterpriseValidationEngine.validateClusterPayload(domainBoundary, inboundPayloadToValidate);
      if (!validationReport.isValid) {
        return {
          success: false,
          telemetryTimestamp: Date.now(),
          executionTimeMs: parseFloat((performance.now() - startEnvelopeTime).toFixed(2)),
          payload: null,
          errorMatrix: {
            code: 'FIREWALL_VALIDATION_VIOLATION_FAULT',
            message: JSON.stringify(validationReport.violationMatrix),
            targetBoundary: domainBoundary,
          }
        };
      }
    }

    try {
      const dataPayload = await operation();
      return {
        success: true,
        telemetryTimestamp: Date.now(),
        executionTimeMs: parseFloat((performance.now() - startEnvelopeTime).toFixed(2)),
        payload: dataPayload,
        errorMatrix: null,
      };
    } catch (dbError: unknown) {
      const parsedError = dbError as { code?: string; message?: string };
      return {
        success: false,
        telemetryTimestamp: Date.now(),
        executionTimeMs: parseFloat((performance.now() - startEnvelopeTime).toFixed(2)),
        payload: null,
        errorMatrix: {
          code: parsedError.code || 'PRISMA_UNHANDLED_EXCEPTION_FAULT',
          message: parsedError.message || 'Fatal data layer synchronization exception across cluster.',
          targetBoundary: domainBoundary,
        },
      };
    }
  }

  /**
   * Atomic ACID Transaction Engine Core
   */
  public static async executeAtomicTransaction<T>(
    transactionThread: (txClient: typeof extendedPrismaClient) => Promise<T>,
    domainBoundary: PersistenceDomainBoundary = PERSISTENCE_DOMAIN_BOUNDARIES.ECOMMERCE
  ): Promise<UnifiedApiResponse<T>> {
    const startHighResTime = performance.now();

    try {
      const transactionPayload = await basePrismaInstance.$transaction(async (tx) => {
        return await transactionThread(tx as any);
      });

      return {
        success: true,
        telemetryTimestamp: Date.now(),
        executionTimeMs: parseFloat((performance.now() - startHighResTime).toFixed(2)),
        payload: transactionPayload,
        errorMatrix: null,
      };
    } catch (txError: unknown) {
      const parsedError = txError as { code?: string; message?: string };
      return {
        success: false,
        telemetryTimestamp: Date.now(),
        executionTimeMs: parseFloat((performance.now() - startHighResTime).toFixed(2)),
        payload: null,
        errorMatrix: {
          code: parsedError.code || 'PRISMA_ATOMIC_TRANSACTION_FAULT',
          message: parsedError.message || 'Distributed transaction failed. State rolled back safely.',
          targetBoundary: domainBoundary,
        },
      };
    }
  }
}

// Global Bulk Namespace Type Pipeline Re-exports
export type { Prisma } from '@prisma/client';