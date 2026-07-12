/**
 * @file seed.ts
 * @package scripts
 * @description Principle-Level Ultra-FAANG High-Density Seeding Engine.
 * @architecture Isolated Domain Data Ingress / Atomic Multi-Tenant Transaction
 * @orm Prisma Client Ecosystem
 */

import { PrismaClient } from '@prisma/client';

// Core Ingress State Machine for Cloud Persistence
const globalPrismaKernel = new PrismaClient();

// =========================================================================
// 1. IMMUTABLE CONSTANTS & SCHEMA METRIC MATRICES
// =========================================================================
const DOMAIN_PROJECT_TYPES = Object.freeze({
    ECOMMERCE: 'Fullstack E-Commerce',
    PORTFOLIO: 'UI/UX Portfolio',
    DASHBOARD: 'Dashboard App',
    CHAT_APP: 'Real time chat-app',
    AI_APP: 'Ai+Fullstack APP'
});

const IMMUTABLE_TECH_SKILLS = Object.freeze([
    { name: 'React.js', tier: 'FRONTEND' },
    { name: 'Next.js', tier: 'FRONTEND' },
    { name: 'Redux.js', tier: 'STATE' },
    { name: 'Tailwind CSS', tier: 'UI' },
    { name: 'Prisma', tier: 'ORM' },
    { name: 'Prisma Infra', tier: 'INFRASTRUCTURE' },
    { name: 'Cloud', tier: 'DEVOPS' },
    { name: 'Docker', tier: 'CONTAINER' },
    { name: 'Rest api', tier: 'ARCHITECTURE' },
    { name: 'Django', tier: 'BACKEND' },
    { name: 'Node.js', tier: 'BACKEND' },
    { name: 'Express.js', tier: 'BACKEND' },
    { name: 'PostgreSQL', tier: 'DATABASE' },
    { name: 'MySQL', tier: 'DATABASE' },
    { name: 'UI/UX', tier: 'DESIGN' }
]);

// Deep Nested Core Metadata Payloads representing the 5 Monolith Application Layers
const SEED_TARGET_DATA_STREAM = [
    {
        identitySlug: 'enterprise-scale-ecommerce',
        projectName: 'Enterprise Fullstack E-Commerce Platform',
        domainType: DOMAIN_PROJECT_TYPES.ECOMMERCE,
        scopeSummary: 'High-volume B2C transaction architecture utilizing decoupled Python microservice routing models.',
        associatedTechStack: ['React.js', 'Next.js', 'Redux.js', 'Prisma', 'Cloud', 'Docker', 'Tailwind CSS', 'Rest api', 'Django', 'PostgreSQL', 'MySQL', 'UI/UX']
    },
    {
        identitySlug: 'interactive-dev-portfolio',
        projectName: 'Ultra-FAANG Interactive Developer Portfolio',
        domainType: DOMAIN_PROJECT_TYPES.PORTFOLIO,
        scopeSummary: 'Isomorphic rendering infrastructure optimized for zero content layout shifts and maximum Lighthouse scores.',
        associatedTechStack: ['React.js', 'Next.js', 'Redux.js', 'Prisma', 'Cloud', 'Docker', 'Tailwind CSS', 'Rest api', 'Node.js', 'Express.js', 'PostgreSQL', 'MySQL', 'UI/UX']
    },
    {
        identitySlug: 'realtime-operations-dashboard',
        projectName: 'Real-Time Analytics & Operations Dashboard',
        domainType: DOMAIN_PROJECT_TYPES.DASHBOARD,
        scopeSummary: 'Time-series telemetry visualization board tracking system operational health thresholds at scale.',
        associatedTechStack: ['React.js', 'Next.js', 'Redux.js', 'Prisma', 'Cloud', 'Docker', 'Tailwind CSS', 'Rest api', 'Node.js', 'Express.js', 'PostgreSQL', 'MySQL', 'UI/UX']
    },
    {
        identitySlug: 'distributed-communication-chat',
        projectName: 'Mission-Critical Real-Time Chat Application',
        domainType: DOMAIN_PROJECT_TYPES.CHAT_APP,
        scopeSummary: 'Event-driven real-time socket bridge with dynamic channel mapping and low latency persistence nodes.',
        associatedTechStack: ['React.js', 'Next.js', 'Redux.js', 'Prisma', 'Cloud', 'Docker', 'Tailwind CSS', 'Rest api', 'Node.js', 'Express.js', 'PostgreSQL', 'MySQL', 'UI/UX']
    },
    {
        identitySlug: 'autonomous-ai-intelligence-platform',
        projectName: 'Next-Gen AI + Fullstack Intelligence Platform',
        domainType: DOMAIN_PROJECT_TYPES.AI_APP,
        scopeSummary: 'Autonomous prompt orchestration engine utilizing Prisma Infra setups and multi-cloud server clusters.',
        associatedTechStack: ['React.js', 'Next.js', 'Redux.js', 'Prisma', 'Prisma Infra', 'Cloud', 'Docker', 'Tailwind CSS', 'Rest api', 'Django', 'PostgreSQL', 'MySQL', 'UI/UX']
    }
];

// =========================================================================
// 2. ISOLATED SEED INGRESS MANAGER CORE
// =========================================================================
class StructuralDataSeeder {

    /**
     * Main Kernel Ingress Controller Flow
     */
    public async bootSeedingPipeline(): Promise<void> {
        console.log('🏁 [ORCHESTRATION START] Commencing database state baseline synchronization...');

        try {
            // Step A: Purge current records inside an atomic database transaction layer (Prevents FK constraints failure)
            await this.wipeRelationalStateBoundaries();

            // Step B: Seed Master Tech Skills Matrix and map internal lookups into memory O(1) Map
            const runtimeInMemorySkillMap = await this.populateMasterSkillsMatrix();

            // Step C: Route application payloads and associate dependencies
            await this.provisionDomainApplicationClusters(runtimeInMemorySkillMap);

            console.log('🎉 [ORCHESTRATION SUCCESS] Multi-project data streams securely written to database clusters.');
        } catch (criticalKernelException) {
            console.error('🚨 [KERNEL COMPILATION FAULT] Seeding pipeline crashed natively. Stack Trace:');
            console.error(criticalKernelException);
            process.exit(1);
        } finally {
            // Decouple connections to prevent dangling memory pools
            await globalPrismaKernel.$disconnect();
        }
    }

    /**
     * Sanitizes existing relational memory constraints safely
     */
    private async wipeRelationalStateBoundaries(): Promise<void> {
        console.log('🧹 Purging active tables via isolated cascading pipeline...');
        await globalPrismaKernel.$transaction([
            globalPrismaKernel.projectTechnologyMap.deleteMany({}),
            globalPrismaKernel.project.deleteMany({}),
            globalPrismaKernel.technology.deleteMany({})
        ]);
    }

    /**
     * Populate skills matrix table and construct rapid O(1) hashing lookup map
     */
    private async populateMasterSkillsMatrix(): Promise<Map<string, string>> {
        console.log('🧬 Injecting core technological infrastructure blueprints...');
        const hashedSkillRegistry = new Map<string, string>();

        // Fire off async parallel mappings across database connection pool threads
        await Promise.all(
            IMMUTABLE_TECH_SKILLS.map(async (skill) => {
                const technologyNode = await globalPrismaKernel.technology.create({
                    data: {
                        name: skill.name,
                        category: skill.tier
                    }
                });
                hashedSkillRegistry.set(technologyNode.name, technologyNode.id);
            })
        );

        return hashedSkillRegistry;
    }

    /**
     * Loops through payloads to register clean domain models
     */
    private async provisionDomainApplicationClusters(skillLookupMap: Map<string, string>): Promise<void> {
        console.log('💼 Syncing the 5 primary macro application engines into cloud stack layer...');

        for (const project of SEED_TARGET_DATA_STREAM) {
            const parentRecord = await globalPrismaKernel.project.create({
                data: {
                    slug: project.identitySlug,
                    title: project.projectName,
                    type: project.domainType,
                    description: project.scopeSummary
                }
            });

            // Map relation references through fast O(1) memory hashes instead of continuous DB queries
            const junctionMappingPayload = project.associatedTechStack.map((techKey) => {
                const resolvedId = skillLookupMap.get(techKey);
                if (!resolvedId) {
                    throw new Error(`[Integrity Breach Exception] Technology keyword reference token not registered: ${techKey}`);
                }
                return {
                    projectId: parentRecord.id,
                    technologyId: resolvedId
                };
            });

            // Batch insert connection nodes in bulk inside internal storage runtime
            await globalPrismaKernel.projectTechnologyMap.createMany({
                data: junctionMappingPayload
            });

            console.log(`   🗲 Node Synced: [${project.domainType}] -> Persistent Data State Stabilized.`);
        }
    }
}

// =========================================================================
// 3. RUNTIME PIPELINE INITIALIZER
// =========================================================================
const ActiveSeederRuntime = new StructuralDataSeeder();
ActiveSeederRuntime.bootSeedingPipeline();