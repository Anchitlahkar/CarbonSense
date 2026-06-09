import { ForecastProfile } from '@carbonsense/shared-types';

export class ForecastReliabilityAnalyzer {
  /**
   * Evaluates forecast reliability on a scale of 0-100.
   */
  public analyze(forecastProfile: ForecastProfile, behaviorVolatility: number): number {
    const integrityScore = forecastProfile?.integrity?.score ?? 50;

    // Get average prediction confidence from baseline forecasts
    let avgConfidence = 0.5;
    const baseline = forecastProfile?.baseline;
    if (baseline) {
      const c30 = baseline['30d']?.confidence ?? 0.5;
      const c90 = baseline['90d']?.confidence ?? 0.5;
      const c365 = baseline['365d']?.confidence ?? 0.5;
      avgConfidence = (c30 + c90 + c365) / 3;
    }

    const confidenceScore = avgConfidence * 100;

    // Mathematical blend of integrity, average confidence, and consistency (inverse volatility)
    const rawReliability = (integrityScore * 0.4) + (confidenceScore * 0.4) + ((100 - behaviorVolatility) * 0.2);
    const reliability = Math.max(0, Math.min(100, Math.round(rawReliability)));

    return reliability;
  }
}
export default ForecastReliabilityAnalyzer;
