/**
 * @file PrismaInfraPipeline.spec.ts
 * @package tests/integration/persistence
 * @description Principle-Level Ultra-FAANG Infrastructure Integration Testing Kernel.
 * @architecture Isolated Ephemeral Container Testing / Atomic Relational Verification
 * @framework Jest / Vitest with Prisma Client
 */

import { PrismaClient } from '@prisma/client';

describe('🏛️ Enterprise Infrastructure Pipeline - Prisma Core Integration Suite', () => {
    let testPrismaKernel: PrismaClient;

    // High-Density Configuration Map for Performance Benchmarking Limits
    const BENCHMARK_LIMITS = Object.freeze({
        MAX_TRANSACTION_MS: 45, // FAANG Standard: Sub-45ms write pipeline target
        TOTAL_STRESS_RECORDS: 100,
    });

    const DOMAIN_TYPES = Object.freeze({
        ECOMMERCE: 'Fullstack E-Commerce',
        PORTFOLIO: 'UI/UX Portfolio',
        AI_APP: 'Ai+Fullstack APP',
    } as const);

    // =========================================================================
    // 1. LIFECYCLE HOOKS (Sandbox Ingress & Egress Isolation)
    // =========================================================================
    beforeAll(async () => {
        // Runtime Telemetry Check: Ensuring the test layer is NOT attacking production storage
        if (process.env.NODE_ENV === 'production') {
            throw new Error('Fatal: Production protection fault. Integration tests cannot run in live cluster!');
        }

        testPrismaKernel = new PrismaClient({
            datasources: { db: { url: process.env.DATABASE_URL } },
            log: ['error'],
        });

        await testPrismaKernel.$connect();
    });

    afterAll(async () => {
        // Prevent memory leaks in continuous integration servers
        await testPrismaKernel.$disconnect();
    });

    beforeEach(async () => {
        // Idempotent clean slate wipe via parallel atomic queries wrapped inside defensive catch block
        try {
            await testPrismaKernel.$transaction([
                testPrismaKernel.projectTechnologyMap.deleteMany({}),
                testPrismaKernel.project.deleteMany({}),
                testPrismaKernel.technology.deleteMany({}),
            ]);
        } catch (cleanupError) {
            console.warn('⚠️ Cache Purge Exception caught inside transaction, falling back to sequential wiping.');
            await testPrismaKernel.projectTechnologyMap.deleteMany({});
            await testPrismaKernel.project.deleteMany({});
            await testPrismaKernel.technology.deleteMany({});
        }
    });

    // =========================================================================
    // 2. TEST SPECIFICATIONS (Deep Relational & Ingress Guard Tests)
    // =========================================================================

    it('⚡ Should satisfy sub-45ms low latency constraint on atomic project & technology mapping creation', async () => {
        // Arrange
        const startTime = performance.now();

        // Act - Executing a full relational graph seed
        const [techNode, projectNode] = await testPrismaKernel.$transaction([
            testPrismaKernel.technology.create({
                data: { name: 'Next.js', category: 'FRONTEND' },
            }),
            testPrismaKernel.project.create({
                data: {
                    slug: 'faang-ecommerce-pipeline',
                    title: 'Next-Gen E-Commerce Storage Unit',
                    type: DOMAIN_TYPES.ECOMMERCE,
                    description: 'High volume transactional architecture node',
                },
            }),
        ]);

        await testPrismaKernel.projectTechnologyMap.create({
            data: {
                projectId: projectNode.id,
                technologyId: techNode.id,
            },
        });

        const runtimeDuration = performance.now() - startTime;

        // Assert
        expect(projectNode.id).toBeDefined();
        expect(techNode.id).toBeDefined();
        expect(runtimeDuration).toBeLessThan(BENCHMARK_LIMITS.MAX_TRANSACTION_MS);

        console.log(`\x1b[32m   ➔ Telemetry Pass: Pipeline Ingress resolved in ${runtimeDuration.toFixed(2)}ms\x1b[0m`);
    });

    it('🔒 Should enforce relational cascading and referential integrity guards cleanly', async () => {
        // Arrange: Setup data records
        const technology = await testPrismaKernel.technology.create({
            data: { name: 'Prisma Infra', category: 'INFRASTRUCTURE' },
        });

        const project = await testPrismaKernel.project.create({
            data: {
                slug: 'ai-autonomous-hub',
                title: 'Autonomous Multi-Agent Cluster',
                type: DOMAIN_TYPES.AI_APP,
                description: 'Distributed model routing architecture',
            },
        });

        await testPrismaKernel.projectTechnologyMap.create({
            data: { projectId: project.id, technologyId: technology.id },
        });

        // Act: Delete the root project entity to test cascade mechanics
        await testPrismaKernel.project.delete({ where: { id: project.id } });

        // Assert: Relational map junction table should be wiped automatically (No orphan data leaks)
        const activeMappings = await testPrismaKernel.projectTechnologyMap.findMany({
            where: { projectId: project.id },
        });

        const safeTechNodeNode = await testPrismaKernel.technology.findUnique({
            where: { id: technology.id },
        });

        expect(activeMappings).toHaveLength(0);
        expect(safeTechNodeNode).not.toBeNull(); // Master technology should stay preserved
    });

    it('🌀 Should successfully process high-throughput parallel data stress pipelines without connection deadlocks', async () => {
        // Arrange: Construct dynamic array payloads using native high-speed generators
        const baselineTimestamp = Date.now();
        const bulkPayloads = Array.from({ length: BENCHMARK_LIMITS.TOTAL_STRESS_RECORDS }, (_, index) => ({
            slug: `stress-test-portfolio-node-${index}-${baselineTimestamp}`,
            title: `Automated Load System Core #${index}`,
            type: DOMAIN_TYPES.PORTFOLIO,
            description: 'Isomorphic microservice cluster stress asset',
        }));

        // Act: Fire off asynchronous concurrent bulk operations via Promise.all mapping
        const parallelOps = bulkPayloads.map((payload) =>
            testPrismaKernel.project.create({ data: payload })
        );

        const metricsResults = await Promise.all(parallelOps);

        // Assert
        expect(metricsResults).toHaveLength(BENCHMARK_LIMITS.TOTAL_STRESS_RECORDS);

        const countCheck = await testPrismaKernel.project.count({
            where: { type: DOMAIN_TYPES.PORTFOLIO },
        });
        expect(countCheck).toBe(BENCHMARK_LIMITS.TOTAL_STRESS_RECORDS);
    });
});