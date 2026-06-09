import { BehaviorProfile, OptimizationPlan } from '@carbonsense/shared-types';

export class ResponsivenessAnalyzer {
  /**
   * Computes user intervention resistance (0-100) and optimization readiness (0-100).
   */
  public analyze(
    behaviorProfile: BehaviorProfile,
    optimizationPlan: OptimizationPlan
  ): { resistance: number; readiness: number } {
    const candidates = optimizationPlan.candidates;

    if (!candidates || candidates.length === 0) {
      // If there are no recommended actions, resistance is low and readiness defaults to a neutral high base
      const fallbackResistance = Math.round(behaviorProfile.riskScore * 0.5);
      return {
        resistance: fallbackResistance,
        readiness: 100 - fallbackResistance,
      };
    }

    const totalResistance = candidates.reduce((sum, c) => sum + c.resistanceScore.score, 0);
    const totalDifficulty = candidates.reduce((sum, c) => sum + c.difficultyScore, 0);

    const averageResistance = totalResistance / candidates.length;
    const averageDifficulty = totalDifficulty / candidates.length;

    const resistance = Math.max(0, Math.min(100, Math.round(averageResistance)));

    // Readiness blends lower resistance, lower difficulty, and lower general profile risk
    const readinessRaw = 100 - (averageResistance * 0.5 + averageDifficulty * 0.3 + behaviorProfile.riskScore * 0.2);
    const readiness = Math.max(0, Math.min(100, Math.round(readinessRaw)));

    return {
      resistance,
      readiness,
    };
  }
}
export default ResponsivenessAnalyzer;
