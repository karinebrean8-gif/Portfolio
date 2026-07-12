/**
 * @file client.ts
 * @package prisma/api-response
 * @description Principle-Level Ultra-FAANG Singleton Prisma Client Storage Core.
 * @architecture Clean Domain Isolation / Connection Pool Throttle / Modern Extension Interceptor Matrix
 * @framework Prisma ORM Engine Core (v5+)
 */

import { PrismaClient } from '@prisma/client';

// =========================================================================
// 1. ENTERPRISE GLOBAL API RESPONSE ENVELOPE STRUCTS & TYPES
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

// Native Global Declaration to bypass runtime linter errors and ensure type safety across Node.js contexts
declare global {
  // eslint-disable-next-line no-var
  var globalPrismaInstance: PrismaClient | undefined;
}

// =========================================================================
// 2. MODERN PRISMA EXTENSION MATRIX (Replaces Legacy $use Middleware)
// =========================================================================
/**
 * Extends the Prisma instance using high-performance Client Extensions 
 * to capture query runtime telemetry across global clusters.
 */
function injectFaangTelemetryExtensions(client: PrismaClient) {
  return client.$extends({
    query: {
      $allModels: {
        async $allOperations({ model, operation, args, query }) {
          const startHighResTime = performance.now();

          // Execute the native transactional database engine layer
          const queryExecutionResult = await query(args);

          const executionDurationMs = performance.now() - startHighResTime;

          // Ingress logging pipeline simulation (Structured telemetry outputs)
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

// =========================================================================
// 3. SINGLETON DATABASE FACTORY ENGINE INGRESS
// =========================================================================
let basePrismaInstance: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  basePrismaInstance = new PrismaClient({
    log: ['error', 'warn'],
    errorFormat: 'minimal',
  });
} else {
  // Graceful handling of Hot Module Replacement (HMR) connection leaks
  if (!globalThis.globalPrismaInstance) {
    globalThis.globalPrismaInstance = new PrismaClient({
      log: ['query', 'error', 'warn'],
      errorFormat: 'pretty',
    });
  }
  basePrismaInstance = globalThis.globalPrismaInstance;
}

// Apply the telemetry pipeline extension layer to the active client reference
const extendedPrismaClient = injectFaangTelemetryExtensions(basePrismaInstance);

// =========================================================================
// 4. CLEAN ARCHITECTURE UNIFIED RESPONDER ENVELOPE UTILITY
// =========================================================================
export class PrismaResponseOrchestrator {

  /**
   * Safe Execution Wrapper: Wraps all database calls into an idempotent corporate 
   * API Response envelope, ensuring no raw unhandled system exceptions crash the server kernel.
   */
  public static async executeSafeQuery<T>(
    databaseOperationThread: () => Promise<T>,
    boundaryScope = 'GLOBAL_PERSISTENCE_LAYER'
  ): Promise<UnifiedApiResponse<T>> {
    const startEnvelopeTime = performance.now();

    try {
      const dataPayload = await databaseOperationThread();

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
          targetBoundary: boundaryScope,
        },
      };
    }
  }
}

// Named Export for Absolute Domain Tracking Enforcement
export { extendedPrismaClient as dbClient };
