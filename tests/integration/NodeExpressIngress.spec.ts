/**
 * @file NodeExpressIngress.spec.ts
 * @package tests/integration/gateway
 * @description Principle-Level Ultra-FAANG Network Ingress & API Contract Testing Engine.
 * @architecture Isomorphic HTTP Ingress Isolation / Defensive Security Assertions
 * @framework Jest / Vitest with Supertest
 */

import request from 'supertest';
import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';

describe('🌐 Enterprise Network Ingress Pipeline - Node/Express Server Node Gateway Suite', () => {
  let targetAppKernel: Express;

  // Immutable Gateway System Parameter Blueprints
  const CORE_GATEWAY_CONFIGS = Object.freeze({
    MOCK_VALID_JWT: 'Bearer faang_crypto_token_secure_flow_2026',
    ALLOWED_ORIGIN: 'https://portfolio.ultragod.dev',
    RATE_LIMIT_CEILING: '100'
  });

  // =========================================================================
  // 1. ISOLATED TARGET ENVIRONMENT SANDBOX PROVISIONING
  // =========================================================================
  beforeAll(() => {
    targetAppKernel = express();

    // Inject Production-Grade Security Shields (Mimicking Live Main Server)
    targetAppKernel.use(helmet());
    targetAppKernel.use(cors({ origin: CORE_GATEWAY_CONFIGS.ALLOWED_ORIGIN }));
    targetAppKernel.use(express.json());

    // Mock Ingress Global Middleware: Rate Limiting & Auth Interceptor Headers
    targetAppKernel.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader('X-RateLimit-Limit', CORE_GATEWAY_CONFIGS.RATE_LIMIT_CEILING);

      if (req.path.startsWith('/api/v1/secure') && req.headers.authorization !== CORE_GATEWAY_CONFIGS.MOCK_VALID_JWT) {
        res.status(401).json({ error: 'Unauthorized Ingress Attempt: Token validation failed.' });
        return;
      }
      next();
    });

    // Mock Core Domain Routes (Serving 5 Integrated Macro Engines Data States)
    targetAppKernel.get('/api/v1/health', (_req: Request, res: Response) => {
      res.status(200).json({ status: 'HEALTHY', clusterId: 'cluster-node-001' });
    });

    targetAppKernel.post('/api/v1/secure/projects', (req: Request, res: Response) => {
      const { title, slug } = req.body;
      if (!title || !slug) {
        res.status(400).json({ error: 'Validation Fault: Title and Slug tokens are required.' });
        return;
      }
      res.status(201).json({ confirmed: true, data: { title, slug } });
    });

    // Global Error Handling Interceptor Rule (Fault-Tolerant Engine Isolation)
    targetAppKernel.use((_err: Error, _req: Request, res: Response, _next: NextFunction) => {
      res.status(500).json({ error: 'Internal Server Error: Ingress Pipeline Unhandled Exception.' });
    });
  });

  // =========================================================================
  // 2. HTTP INGRESS LAYER INTEGRATION SPECIFICATIONS
  // =========================================================================

  it('🔒 Should enforce rigid HTTP Security Policies via Helmet and CORS origins', async () => {
    // Act
    const response = await request(targetAppKernel)
      .get('/api/v1/health')
      .set('Origin', CORE_GATEWAY_CONFIGS.ALLOWED_ORIGIN);

    // Assert: Verifying structural enterprise security headers
    expect(response.status).toBe(200);
    expect(response.headers['access-control-allow-origin']).toBe(CORE_GATEWAY_CONFIGS.ALLOWED_ORIGIN);
    expect(response.headers['x-dns-prefetch-control']).toBeDefined();
    expect(response.headers['x-frame-options']).toBe('SAMEORIGIN');
    expect(response.headers['x-ratelimit-limit']).toBe(CORE_GATEWAY_CONFIGS.RATE_LIMIT_CEILING);
  });

  it('🚫 Should block unauthorized ingress traffic trying to hit secure domain layers without valid signature', async () => {
    // Act & Assert: Invalid Token Signature Injection
    const maliciousAttempt = await request(targetAppKernel)
      .post('/api/v1/secure/projects')
      .set('Authorization', 'Bearer invalid_malicious_token_hash')
      .send({ title: 'Hacked Node', slug: 'malicious' });

    expect(maliciousAttempt.status).toBe(401);
    expect(maliciousAttempt.body.error).toContain('Unauthorized Ingress Attempt');
  });

  it('✅ Should grant authorization and process requests smoothly when valid cryptographic signatures are passed', async () => {
    // Arrange
    const enterpriseProjectPayload = {
      title: 'UltraGod AI Platform Framework',
      slug: 'autonomous-ai-agent-engine'
    };

    // Act
    const dynamicResponse = await request(targetAppKernel)
      .post('/api/v1/secure/projects')
      .set('Authorization', CORE_GATEWAY_CONFIGS.MOCK_VALID_JWT)
      .send(enterpriseProjectPayload);

    // Assert
    expect(dynamicResponse.status).toBe(201);
    expect(dynamicResponse.body.confirmed).toBe(true);
    expect(dynamicResponse.body.data.slug).toBe(enterpriseProjectPayload.slug);
  });

  it('❌ Should reject execution gracefully with a 400 Bad Request error when payload keys are missing', async () => {
    // Arrange: Malformed request schema definition
    const corruptedPayload = {
      title: 'Broken Payload Node Structure'
      // Missing 'slug' token parameter on purpose
    };

    // Act
    const runtimeResponse = await request(targetAppKernel)
      .post('/api/v1/secure/projects')
      .set('Authorization', CORE_GATEWAY_CONFIGS.MOCK_VALID_JWT)
      .send(corruptedPayload);

    // Assert
    expect(runtimeResponse.status).toBe(400);
    expect(runtimeResponse.body.error).toContain('Validation Fault');
  });
});