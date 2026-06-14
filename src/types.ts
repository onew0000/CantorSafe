export type TabId = 'INTRO' | 'MATH' | 'SIM' | 'END';

export interface SimConfig {
  h0: number; // Initial state h(0)
  amplitude: number; // Perturbation amplitude A
  alpha: number; // Restoration force alpha
}

export interface SimPoint {
  t: number;
  h: number;
  p: number; // Perturbation value
  safe: boolean;
}

export interface ModelResult {
  points: SimPoint[];
  safetyRatio: number; // In percentage
}
