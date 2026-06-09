import { BehaviorProfile } from '@carbonsense/shared-types';

export class ConsistencyAnalyzer {
  /**
   * Computes the behavior volatility (0-100) and consistency score (0-100) of the user.
   */
  public analyze(behaviorProfile: BehaviorProfile): { volatility: number; consistencyScore: number } {
    const vector = behaviorProfile.featureVector;
    const mean = vector.dailyEmissionsMean;
    const stdDev = vector.dailyEmissionsStdDev;
    const weekendMultiplier = vector.weekendMultiplier;

    // Coefficient of variation: stdDev / mean (handling zero mean)
    const cv = mean > 0 ? stdDev / mean : 0;

    // Volatility score calculation
    const rawVolatility = (cv * 50) + (Math.abs(weekendMultiplier - 1.0) * 30);
    const volatility = Math.max(0, Math.min(100, Math.round(rawVolatility)));
    const consistencyScore = 100 - volatility;

    return {
      volatility,
      consistencyScore,
    };
  }
}
export default ConsistencyAnalyzer;
