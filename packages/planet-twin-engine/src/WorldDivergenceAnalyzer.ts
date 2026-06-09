import { TwinWorld, WorldDivergence, OptimizationPlan } from '@carbonsense/shared-types';

export class WorldDivergenceAnalyzer {
  /**
   * Compares the Current World and Optimized World to evaluate divergence and identify drivers.
   */
  public analyze(
    currentWorld: Omit<TwinWorld, 'healthIndex'>,
    optimizedWorld: Omit<TwinWorld, 'healthIndex'>,
    optimizationPlan: OptimizationPlan
  ): WorldDivergence {
    const currentAnnual = currentWorld.trajectory.annualEmissionsKg;
    const optimizedAnnual = optimizedWorld.trajectory.annualEmissionsKg;

    const emissionsGapKg = parseFloat(Math.max(0, currentAnnual - optimizedAnnual).toFixed(2));

    const currentEarths = currentWorld.earthEquivalent.earthsRequired;
    const optimizedEarths = optimizedWorld.earthEquivalent.earthsRequired;
    const earthsDiff = Math.max(0, currentEarths - optimizedEarths);

    const sustainabilityGapPercent = parseFloat(
      (currentEarths > 0 ? (earthsDiff / currentEarths) * 100 : 0).toFixed(2)
    );

    // Divergence score: scales the percentage emissions gap (e.g., 40% gap = 100 divergence score)
    const pctGap = currentAnnual > 0 ? (emissionsGapKg / currentAnnual) * 100 : 0;
    const divergenceScore = Math.max(0, Math.min(100, Math.round(pctGap * 2.5)));

    // Extract key drivers from top candidates in the optimization plan
    const sortedCandidates = [...(optimizationPlan.candidates || [])].sort((a, b) => a.rank - b.rank);
    const topCandidates = sortedCandidates.slice(0, 3);

    const keyDrivers = topCandidates.length > 0
      ? topCandidates.map(c => c.title)
      : ['No optimization modifications applied'];

    return {
      divergenceScore,
      emissionsGapKg,
      sustainabilityGapPercent,
      keyDrivers,
    };
  }
}
export default WorldDivergenceAnalyzer;
