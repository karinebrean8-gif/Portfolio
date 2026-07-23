import type { Page, Request, Route } from '@playwright/test';
export type UserRole = 'admin' | 'staff' | 'user';

export interface AuthUser {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly role: UserRole;
  readonly permissions: readonly string[];
}
export interface AuthSession {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly expiresAt: string;
  readonly user: AuthUser;
}
export interface AuthMockOptions {
  readonly loginPath?: string;
  readonly logoutPath?: string;
  readonly sessionPath?: string;
  readonly refreshPath?: string;
  readonly delayMs?: number;
  readonly user?: Partial<AuthUser>;
  readonly session?: Partial<AuthSession>;
}
export interface MockRequestRecord {
  readonly method: string;
  readonly url: string;
  readonly pathname: string;
  readonly body: unknown;
  readonly timestamp: string;
}
export interface AuthenticationMockController {
  readonly requests: readonly MockRequestRecord[];
  getLastRequest(): MockRequestRecord | undefined;
  resetRequests(): void;
  dispose(): Promise<void>;
}
export interface MockLoginFailure {
  readonly status?: 400 | 401 | 403 | 422 | 429 | 500 | 503;
  readonly code?: string;
  readonly message?: string;
  readonly retryAfterSeconds?: number;
}
type RouteHandler = (route: Route) => Promise<void>;
type RegisteredRoute = Readonly<{ url: string; handler: RouteHandler }>;
const PATHS = Object.freeze({
  login: '/api/auth/login',
  logout: '/api/auth/logout',
  session: '/api/auth/session',
  refresh: '/api/auth/refresh',
});

const DEFAULT_USER: AuthUser = Object.freeze({
  id: 'e2e-user-001',
  email: 'staff.engineer@example.test',
  name: 'E2E Staff Engineer',
  role: 'staff',
  permissions: Object.freeze(['portfolio:read', 'portfolio:write', 'profile:read']),
});

const HEADERS = Object.freeze({
  'access-control-allow-credentials': 'true',
  'access-control-allow-headers': 'content-type, authorization',
  'access-control-allow-methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  'access-control-allow-origin': '*',
  'cache-control': 'no-store',
  'content-type': 'application/json; charset=utf-8',
});
const normalizePath = (value: string): string => {
  const path = value.trim();
  if (!path) throw new Error('Authentication mock path cannot be empty.');
  return path.startsWith('/') ? path : `/${path}`;
};

const matchesPath = (request: Request, path: string): boolean =>
  new URL(request.url()).pathname === path;
const createToken = (kind: 'access' | 'refresh'): string =>
  `e2e-${kind}-${crypto.randomUUID()}`;
const createUser = (overrides: Partial<AuthUser> = {}): AuthUser => ({
  ...DEFAULT_USER,
  ...overrides,
  permissions: overrides.permissions ?? DEFAULT_USER.permissions,
});

const createSession = (
  user: AuthUser,
  overrides: Partial<AuthSession> = {},
): AuthSession => ({
  accessToken: createToken('access'),
  refreshToken: createToken('refresh'),
  expiresAt: new Date(Date.now() + 3_600_000).toISOString(),
  user,
  ...overrides,
  user: overrides.user ?? user,
});

const wait = async (delayMs: number): Promise<void> => {
  if (!Number.isFinite(delayMs) || delayMs < 0) {
    throw new Error(`Invalid authentication mock delay: ${delayMs}`);
  }
  if (delayMs > 0) await new Promise<void>((resolve) => setTimeout(resolve, delayMs));
};

const parseBody = (request: Request): unknown => {
  const body = request.postData();
  if (!body) return undefined;
  try {
    return JSON.parse(body) as unknown;
  } catch {
    return body;
  }
};
const capture = (
  request: Request,
  records: MockRequestRecord[],
): void => {
  records.push({
    method: request.method(),
    url: request.url(),
    pathname: new URL(request.url()).pathname,
    body: parseBody(request),
    timestamp: new Date().toISOString(),
  });
};
const fulfillJson = async (
  route: Route,
  status: number,
  body?: unknown,
  headers: Readonly<Record<string, string>> = {},
): Promise<void> => {
  await route.fulfill({
    status,
    headers: { ...HEADERS, ...headers },
    body: body === undefined ? '' : JSON.stringify(body),
  });
};

const handlePreflight = async (route: Route): Promise<boolean> => {
  if (route.request().method() !== 'OPTIONS') return false;
  await fulfillJson(route, 204);
  return true;
};
const validateLoginBody = (value: unknown): void => {
  if (!value || typeof value !== 'object') {
    throw new Error('Login request body must be a JSON object.');
  }
  const { email, password } = value as Record<string, unknown>;
  if (typeof email !== 'string' || !email.trim()) {
    throw new Error('Login request must contain a valid email.');
  }
  if (typeof password !== 'string' || !password) {
    throw new Error('Login request must contain a password.');
  }
};
const methodNotAllowed = async (
  route: Route,
  method: 'GET' | 'POST',
  action: string,
): Promise<void> => {
  await fulfillJson(route, 405, {
    error: {
      code: 'METHOD_NOT_ALLOWED',
      message: `Only ${method} is allowed for ${action}.`,
    },
  });
};

const createController = (
  page: Page,
  records: MockRequestRecord[],
  routes: readonly RegisteredRoute[],
): AuthenticationMockController => ({
  get requests() {
    return records;
  },
  getLastRequest: () => records.at(-1),
  resetRequests: () => {
    records.length = 0;
  },
  dispose: async () => {
    await Promise.all(routes.map(({ url, handler }) => page.unroute(url, handler)));
  },
});

const registerRoutes = async (
  page: Page,
  routes: readonly RegisteredRoute[],
): Promise<void> => {
  await Promise.all(routes.map(({ url, handler }) => page.route(url, handler)));
};

export async function mockAuthenticatedSession(
  page: Page,
  options: AuthMockOptions = {},
): Promise<AuthenticationMockController> {
  const paths = {
    login: normalizePath(options.loginPath ?? PATHS.login),
    logout: normalizePath(options.logoutPath ?? PATHS.logout),
    session: normalizePath(options.sessionPath ?? PATHS.session),
    refresh: normalizePath(options.refreshPath ?? PATHS.refresh),
  };
  const user = createUser(options.user);
  const records: MockRequestRecord[] = [];
  const delayMs = options.delayMs ?? 0;
  let session: AuthSession | null = createSession(user, options.session);
  const login: RouteHandler = async (route) => {
    const request = route.request();
    if (!matchesPath(request, paths.login)) return route.fallback();
    capture(request, records);
    if (await handlePreflight(route)) return;
    if (request.method() !== 'POST') return methodNotAllowed(route, 'POST', 'login');
    await wait(delayMs);
    try {
      validateLoginBody(parseBody(request));
    } catch (error) {
      return fulfillJson(route, 422, {
        error: {
          code: 'INVALID_LOGIN_PAYLOAD',
          message: error instanceof Error ? error.message : 'Invalid login request payload.',
        },
      });
    }
    session = createSession(user, options.session);
    await fulfillJson(route, 200, { data: session });
  };

  const currentSession: RouteHandler = async (route) => {
    const request = route.request();
    if (!matchesPath(request, paths.session)) return route.fallback();
    capture(request, records);
    if (await handlePreflight(route)) return;
    if (request.method() !== 'GET') {
      return methodNotAllowed(route, 'GET', 'session retrieval');
    }
    await wait(delayMs);
    if (!session) {
      return fulfillJson(route, 401, {
        error: {
          code: 'UNAUTHENTICATED',
          message: 'No active authentication session exists.',
        },
      });
    }
    await fulfillJson(route, 200, { data: session });
  };

  const refresh: RouteHandler = async (route) => {
    const request = route.request();
    if (!matchesPath(request, paths.refresh)) return route.fallback();
    capture(request, records);
    if (await handlePreflight(route)) return;
    if (request.method() !== 'POST') {
      return methodNotAllowed(route, 'POST', 'token refresh');
    }
    await wait(delayMs);
    if (!session) {
      return fulfillJson(route, 401, {
        error: {
          code: 'REFRESH_SESSION_MISSING',
          message: 'The authentication session cannot be refreshed.',
        },
      });
    }
    session = {
      ...session,
      accessToken: createToken('access'),
      expiresAt: new Date(Date.now() + 3_600_000).toISOString(),
    };
    await fulfillJson(route, 200, { data: session });
  };

  const logout: RouteHandler = async (route) => {
    const request = route.request();
    if (!matchesPath(request, paths.logout)) return route.fallback();
    capture(request, records);
    if (await handlePreflight(route)) return;
    if (request.method() !== 'POST') return methodNotAllowed(route, 'POST', 'logout');
    await wait(delayMs);
    session = null;
    await fulfillJson(route, 204);
  };

  const routes: readonly RegisteredRoute[] = [
    { url: `**${paths.login}`, handler: login },
    { url: `**${paths.session}`, handler: currentSession },
    { url: `**${paths.refresh}`, handler: refresh },
    { url: `**${paths.logout}`, handler: logout },
  ];

  await registerRoutes(page, routes);
  return createController(page, records, routes);
}

export async function mockLoginFailure(
  page: Page,
  failure: MockLoginFailure = {},
  options: Pick<AuthMockOptions, 'loginPath' | 'delayMs'> = {},
): Promise<AuthenticationMockController> {
  const path = normalizePath(options.loginPath ?? PATHS.login);
  const records: MockRequestRecord[] = [];
  const status = failure.status ?? 401;
  const delayMs = options.delayMs ?? 0;
  const handler: RouteHandler = async (route) => {
    const request = route.request();
    if (!matchesPath(request, path)) return route.fallback();
    capture(request, records);
    if (await handlePreflight(route)) return;
    if (request.method() !== 'POST') return methodNotAllowed(route, 'POST', 'login');
    await wait(delayMs);
    const headers =
      status === 429 && failure.retryAfterSeconds !== undefined
        ? { 'retry-after': String(failure.retryAfterSeconds) }
        : {};
    await fulfillJson(
      route,
      status,
      {
        error: {
          code: failure.code ?? 'INVALID_CREDENTIALS',
          message: failure.message ?? 'The supplied credentials are not valid.',
        },
      },
      headers,
    );
  };

  const routes: readonly RegisteredRoute[] = [{ url: `**${path}`, handler }];
  await registerRoutes(page, routes);
  return createController(page, records, routes);
}

export async function mockUnauthenticatedSession(
  page: Page,
  options: Pick<AuthMockOptions, 'sessionPath' | 'delayMs'> = {},
): Promise<AuthenticationMockController> {
  const path = normalizePath(options.sessionPath ?? PATHS.session);
  const records: MockRequestRecord[] = [];
  const delayMs = options.delayMs ?? 0;
  const handler: RouteHandler = async (route) => {
    const request = route.request();
    if (!matchesPath(request, path)) return route.fallback();
    capture(request, records);
    if (await handlePreflight(route)) return;
    if (request.method() !== 'GET') {
      return methodNotAllowed(route, 'GET', 'session retrieval');
    }
    await wait(delayMs);
    await fulfillJson(route, 401, {
      error: {
        code: 'SESSION_EXPIRED',
        message: 'The authentication session has expired.',
      },
    });
  };
  const routes: readonly RegisteredRoute[] = [{ url: `**${path}`, handler }];
  await registerRoutes(page, routes);
  return createController(page, records, routes);
}
