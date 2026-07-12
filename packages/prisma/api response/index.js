/**
 * @file index.ts
 * @package prisma
 * @description Principle-Level Ultra-FAANG Distributed Persistence Engine Gateway.
 * @architecture Clean Domain Isolation / Single Point of Truth / Cross-Subnet Transaction Core
 * @framework Prisma ORM Engine Integration / Clean Isomorphic Architecture
 */
import { performance } from 'perf_hooks'
import { dbClient, PrismaResponseOrchestrator, UnifiedApiResponse } from './api-response/client';
import { PERSISTENCE_DOMAIN_BOUNDARIES, PersistenceDomainBoundary } from './api-response/index';

// =========================================================================
// 1. MACRO CLUSTER FACADE INTERFACE (The Core Gatekeeper)
// =========================================================================
export class EnterprisePersistenceKernel {

  /**
   * Directly exposes the underlying extended Prisma instance for complex operational queries.
   * Access to this should be heavily audited across critical enterprise codebases.
   */
  public static readonly engine = dbClient;

  /**
   * Macro Subnet Isolation Domains for clear operational visibility.
   */
  public static readonly domains = PERSISTENCE_DOMAIN_BOUNDARIES;

  /**
   * High-Level Execution Wrapper: Executes structural operations enclosed securely inside 
   * the standardized enterprise unified response envelope.
   * 
   * @example
   * const response = await EnterprisePersistenceKernel.execute(
   *   () => EnterprisePersistenceKernel.engine.user.findMany(),
   *   EnterprisePersistenceKernel.domains.AI_PLATFORM
   * );
   */
  public static async execute<T>(
    operation: () => Promise<T>,
    domainBoundary: PersistenceDomainBoundary = PERSISTENCE_DOMAIN_BOUNDARIES.PORTFOLIO
  ): Promise<UnifiedApiResponse<T>> {
    return PrismaResponseOrchestrator.executeSafeQuery(operation, domainBoundary);
  }

  // =========================================================================
  // 2. ACID TRANSACTION ORCHESTRATION PIPELINE
  // =========================================================================
  /**
   * Atomic Cluster Transaction Runner: Executes critical multi-model mutative processes 
   * inside an isolated distributed transaction wrapper with high concurrency protection.
   */
  public static async executeAtomicTransaction<T>(
    transactionThread: (txClient: typeof dbClient) => Promise<T>,
    domainBoundary: PersistenceDomainBoundary = PERSISTENCE_DOMAIN_BOUNDARIES.ECOMMERCE
  ): Promise<UnifiedApiResponse<T>> {
    const startHighResTime = performance.now();

    try {
      // Direct leverage of Prisma's interactive transactional system wrapper
      const transactionPayload = await dbClient.$transaction(async (tx) => {
        // Casted safely to maintain the custom extension telemetry configurations
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
          message: parsedError.message || 'Distributed multi-subnet transaction failed. State rolled back safely.',
          targetBoundary: domainBoundary,
        },
      };
    }
  }
}

// =========================================================================
// 3. CLEAN ARCHITECTURE BULK TYPE PIPELINE RE-EXPORTS
// =========================================================================
export type { UnifiedApiResponse, PersistenceDomainBoundary };

// Global Prisma Namespace Client Models Re-export Interface
export type {
  Prisma,
  // Add core model definitions below as per generated schema requirements
  // User, Project, Order, MetricStream, ChatMessage
} from '@prisma/client';