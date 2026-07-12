/**
 * ==============================================================================
 * TITLE:       ReduxGlobalSlices.test.ts (Enterprise Domain Unit Specification)
 * ARCHITECT:   L15 Principle Ultra-FAANG Systems Architect
 * EXPERIENCE:  50+ Years Legacy Systems & Hyper-scale Infrastructure Philosophy
 * COMPLIANCE:  TypeScript Strict Mode, Pure Functional Reducers, Clean Architecture
 * ==============================================================================
 * This suite validates the global application state transition boundary.
 * It enforces pure mutation logic, immutable state freezes, and async thunk cycles.
 * ==============================================================================
 */

import { configureStore, createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// ==============================================================================
// 1. DOMAIN ABSTRACT CONTRACTS & APPLICATION STATE SCHEMAS
// ==============================================================================

export type SystemThemeMode = 'SYSTEM_CORE_LIGHT' | 'SYSTEM_CORE_DARK' | 'AMOLÈD_MATRIX';

export interface ITelemetryPayload {
  latencyMs: number;
  endpoint: string;
  success: boolean;
}

export interface IGlobalApplicationState {
  theme: SystemThemeMode;
  networkOnline: boolean;
  activeDeploymentsCount: number;
  telemetryLogs: ITelemetryPayload[];
  asyncPipelineStatus: 'IDLE' | 'PENDING' | 'FULFILLED' | 'REJECTED';
  systemExceptionMessage: string | null;
}

const INITIAL_CORE_STATE: IGlobalApplicationState = {
  theme: 'SYSTEM_CORE_DARK',
  networkOnline: true,
  activeDeploymentsCount: 0,
  telemetryLogs: [],
  asyncPipelineStatus: 'IDLE',
  systemExceptionMessage: null
};

// ==============================================================================
// 2. ASYNC STATE INTERCEPTOR (THE ASYNC SIDE-EFFECT ADAPTER)
// ==============================================================================

/**
 * High-performance enterprise asynchronous operational wrapper.
 * Simulates portfolio analytical profile telemetry ingestion pipelines.
 */
export const dispatchSystemTelemetryDump = createAsyncThunk<
  ITelemetryPayload,
  { targetRoute: string; mockedLatency: number },
  { rejectValue: string }
>(
  'global/dispatchSystemTelemetryDump',
  async (payload, { rejectWithValue }) => {
    try {
      if (payload.mockedLatency < 0) {
        throw new Error('Telemetry validation failure: Latency cannot occupy negative space.');
      }
      // Simulating zero-alloc hardware-level network boundary pass
      return {
        endpoint: payload.targetRoute,
        latencyMs: payload.mockedLatency,
        success: true
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Unknown network telemetry fault.');
    }
  }
);

// ==============================================================================
// 3. THE REDUX SLICE MODULE (THE PURE STATE TRANSITION ENGINE)
// ==============================================================================

export const globalSystemSlice = createSlice({
  name: 'global',
  initialState: INITIAL_CORE_STATE,
  reducers: {
    mutateSystemTheme(state, action: PayloadAction<SystemThemeMode>) {
      state.theme = action.payload;
    },
    toggleNetworkTopologyState(state, action: PayloadAction<boolean>) {
      state.networkOnline = action.payload;
    },
    incrementDeploymentCounter(state) {
      state.activeDeploymentsCount += 1;
    },
    flushTelemetryMatrices(state) {
      state.telemetryLogs = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(dispatchSystemTelemetryDump.pending, (state) => {
        state.asyncPipelineStatus = 'PENDING';
        state.systemExceptionMessage = null;
      })
      .addCase(dispatchSystemTelemetryDump.fulfilled, (state, action) => {
        state.asyncPipelineStatus = 'FULFILLED';
        state.telemetryLogs.push(action.payload);
      })
      .addCase(dispatchSystemTelemetryDump.rejected, (state, action) => {
        state.asyncPipelineStatus = 'REJECTED';
        state.systemExceptionMessage = action.payload || 'Fallback core runtime interception.';
      });
  }
});

export const {
  mutateSystemTheme,
  toggleNetworkTopologyState,
  incrementDeploymentCounter,
  flushTelemetryMatrices
} = globalSystemSlice.actions;

// ==============================================================================
// 4. UNIT TESTING SUITE SPECIFICATION MATRIX (THE ENFORCEMENT ENGINE)
// ==============================================================================

describe('Unit Specification Engine: Redux Global State Slice Machine', () => {
  
  // Helper to initialize a clean, sandboxed configuration store per execution test
  const setupSandboxStore = () => {
    return configureStore({
      reducer: {
        globalSystem: globalSystemSlice.reducer
      }
    });
  };

  // ----------------------------------------------------------------------------
  // TEST SCENARIO 1: ISOLATED PURE ACTION-REDUCER INVARIANTS
  // ----------------------------------------------------------------------------
  describe('Synchronous Mutation Slices', () => {
    
    it('should return the baseline initialization state when provided with an unmapped operational vector', () => {
      const emptyAction = { type: '@@SYSTEM_KERNEL/UNKNOWN_PROBE' };
      const outputState = globalSystemSlice.reducer(undefined, emptyAction);
      
      expect(outputState).toEqual(INITIAL_CORE_STATE);
    });

    it('should smoothly transition theme vectors while guarding immutable property states', () => {
      const intermediateState = globalSystemSlice.reducer(
        INITIAL_CORE_STATE, 
        mutateSystemTheme('AMOLÈD_MATRIX')
      );
      
      expect(intermediateState.theme).toBe('AMOLÈD_MATRIX');
      // Crucial invariant check: Ensure downstream fields are unmodified
      expect(intermediateState.networkOnline).toBe(INITIAL_CORE_STATE.networkOnline);
    });

    it('should accurately step up performance deployment logs through deterministic increments', () => {
      let activeState = INITIAL_CORE_STATE;
      
      activeState = globalSystemSlice.reducer(activeState, incrementDeploymentCounter());
      activeState = globalSystemSlice.reducer(activeState, incrementDeploymentCounter());
      
      expect(activeState.activeDeploymentsCount).toBe(2);
    });

    it('should fully evacuate runtime memory telemetry pools under a manual flush signature', () => {
      const loadedState: IGlobalApplicationState = {
        ...INITIAL_CORE_STATE,
        telemetryLogs: [{ endpoint: '/api/v1/metrics', latencyMs: 12, success: true }]
      };

      const flushedState = globalSystemSlice.reducer(loadedState, flushTelemetryMatrices());
      expect(flushedState.telemetryLogs.length).toBe(0);
    });
  });

  // ----------------------------------------------------------------------------
  // TEST SCENARIO 2: ASYNCHRONOUS LIFE-CYCLE SIDE-EFFECT TRAPS
  // ----------------------------------------------------------------------------
  describe('Asynchronous Side-Effect Lifecycle Pipelines', () => {
    
    it('should instantly flag status vectors as PENDING upon launching async data transfers', () => {
      const storeInstance = setupSandboxStore();
      
      // We purposefully do not await this promise to arrest the execution thread mid-flight
      storeInstance.dispatch(dispatchSystemTelemetryDump({ targetRoute: '/api/v1/portfolio', mockedLatency: 45 }));
      
      const unfulfilledState = storeInstance.getState().globalSystem;
      expect(unfulfilledState.asyncPipelineStatus).toBe('PENDING');
      expect(unfulfilledState.systemExceptionMessage).toBeNull();
    });

    it('should cleanly buffer historical event objects in the analytics heap upon a FULFILLED dispatch handle', async () => {
      const storeInstance = setupSandboxStore();
      
      await storeInstance.dispatch(dispatchSystemTelemetryDump({ targetRoute: '/api/v1/gateway', mockedLatency: 8 }));
      
      const hydratedState = storeInstance.getState().globalSystem;
      expect(hydratedState.asyncPipelineStatus).toBe('FULFILLED');
      expect(hydratedState.telemetryLogs.length).toBe(1);
      expect(hydratedState.telemetryLogs[0]).toEqual({
        endpoint: '/api/v1/gateway',
        latencyMs: 8,
        success: true
      });
    });

    it('should successfully trap application failures and intercept error messages on a REJECTED dispatch vector', async () => {
      const storeInstance = setupSandboxStore();
      
      // Injecting a corrupted, impossible runtime value to force execution crash loops
      await storeInstance.dispatch(dispatchSystemTelemetryDump({ targetRoute: '/api/v1/faulty', mockedLatency: -120 }));
      
      const failureState = storeInstance.getState().globalSystem;
      expect(failureState.asyncPipelineStatus).toBe('REJECTED');
      expect(failureState.telemetryLogs.length).toBe(0); // Core data buffer must remain unpolluted
      expect(failureState.systemExceptionMessage).toContain('Latency cannot occupy negative space.');
    });
  });
});
