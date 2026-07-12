/**
 * @file playwright.config.ts
 * @package tests/e2e/configs
 * @description Principle-Level Ultra-FAANG Distributed E2E Orchestration Engine.
 * @architecture Isomorphic Monorepo Project Matrix / Automated Ephemeral Lifecycle Control
 * @framework Playwright Test Engine
 */

import { defineConfig, devices } from '@playwright/test';

// Global Hard-Ceiling Telemetry Parameters
const GLOBAL_TIMEOUT_BLUEPRINTS = Object.freeze({
  SINGLE_TEST_TIMEOUT_MS: 45000,     // 45s hard timeout limit per test case
  GLOBAL_SUITE_TIMEOUT_MS: 900000,  // 15 minutes max CI/CD duration barrier
  NAVIGATION_TIMEOUT_MS: 15000       // 15s low-latency ingress network budget
});

export default defineConfig({
  // Core Test Suite Root Discovery Map pointing to the specs folder
  testDir: '../specs',
  
  // Timeout Controls (FAANG Scalability Guardrails)
  timeout: GLOBAL_TIMEOUT_BLUEPRINTS.SINGLE_TEST_TIMEOUT_MS,
  globalTimeout: GLOBAL_TIMEOUT_BLUEPRINTS.GLOBAL_SUITE_TIMEOUT_MS,
  expect: {
    timeout: 8000 // Assertion timeout limit for elements hydration
  },

  // Parallelism & Resource Throttle Management
  fullyParallel: true,
  workers: process.env.CI ? 4 : '50%', // 4 hard workers in CI thread-pool, 50% CPU allocation on local bare-metal
  
  // Resiliency Strategy Against Flaky Network Contexts
  retries: process.env.CI ? 2 : 1,
  
  // Control Console Ingress Logging Output Formats
  reporter: [
    ['html', { outputFolder: '../reports/html-report', open: 'never' }],
    ['json', { outputFile: '../reports/telemetry-metrics.json' }],
    ['list']
  ],

  // Isomorphic Browser Context Configurations
  use: {
    baseURL: process.env.APP_BASE_URL || 'https://app.ultragod.dev',
    actionTimeout: 10000,
    navigationTimeout: GLOBAL_TIMEOUT_BLUEPRINTS.NAVIGATION_TIMEOUT_MS,
    
    // Telemetry Capturing Rules for Forensic Failure Diagnosis
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    
    // Absolute Security Layer Mapping Rules
    ignoreHTTPSErrors: true,
    bypassCSP: false // Maintain Content Security Policy boundaries during black-box testing
  },

  // MULTI-TENANT MONOREPO PROJECT TARGET MATRIX (The 5 Macro Application Nodes)
  projects: [
    {
      name: 'production-desktop-chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'production-desktop-webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'production-mobile-safari',
      use: { ...devices['iPhone 14 Pro Max'] },
    },
    {
      name: 'subsystem-ecommerce-isolated',
      testMatch: /.*ecommerce.*\.e2e\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: '../utils/states/ecommerce-auth-state.json'
      },
    },
    {
      name: 'subsystem-ai-engine-isolated',
      testMatch: /.*ai-engine.*\.e2e\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        permissions: ['clipboard-read', 'clipboard-write']
      },
    }
  ],

  // AUTOMATED EPHEMERAL LOCAL HOST GATEWAY INFRASTRUCTURE
  webServer: process.env.CI ? undefined : {
    command: 'npm run infrastructure:up', // Triggers docker-compose orchestration pipeline
    url: 'http://localhost:8080/api/v1/health',
    reuseExistingServer: !process.env.CI,
    timeout: 120000 // 2-minute hard limit for local boot sequences
  }
});