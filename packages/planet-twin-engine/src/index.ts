import { Result, ok, fail } from '@carbonsense/core';
import {
  BehaviorProfile,
  ForecastProfile,
  OptimizationPlan,
  CarbonDNAProfile,
  PlanetTwinProfile
} from '@carbonsense/shared-types';
import TwinAggregator from './TwinAggregator';

export interface IPlanetTwinEngine {
  /**
   * Translates behavior, forecast, optimization, and carbon DNA profiles into a complete PlanetTwinProfile.
   */
  simulatePlanetTwin(
    behaviorProfile: BehaviorProfile,
    forecastProfile: ForecastProfile,
    optimizationPlan: OptimizationPlan,
    carbonDNAProfile: CarbonDNAProfile
  ): Result<PlanetTwinProfile>;
}

export class PlanetTwinEngine implements IPlanetTwinEngine {
  private aggregator: TwinAggregator;

  constructor() {
    this.aggregator = new TwinAggregator();
  }

  public simulatePlanetTwin(
    behaviorProfile: BehaviorProfile,
    forecastProfile: ForecastProfile,
    optimizationPlan: OptimizationPlan,
    carbonDNAProfile: CarbonDNAProfile
  ): Result<PlanetTwinProfile> {
    if (!behaviorProfile) {
      return fail(new Error('BehaviorProfile is required'));
    }
    if (!forecastProfile) {
      return fail(new Error('ForecastProfile is required'));
    }
    if (!optimizationPlan) {
      return fail(new Error('OptimizationPlan is required'));
    }
    if (!carbonDNAProfile) {
      return fail(new Error('CarbonDNAProfile is required'));
    }

    if (
      behaviorProfile.userId !== forecastProfile.userId ||
      behaviorProfile.userId !== optimizationPlan.userId ||
      behaviorProfile.userId !== carbonDNAProfile.userId
    ) {
      return fail(new Error('User IDs in all profiles must match'));
    }

    try {
      const profile = this.aggregator.aggregate(
        behaviorProfile,
        forecastProfile,
        optimizationPlan,
        carbonDNAProfile
      );
      return ok(profile);
    } catch (error: any) {
      return fail(error);
    }
  }
}

export { TrajectorySimulator } from './TrajectorySimulator';
export { ImpactAccumulator } from './ImpactAccumulator';
export { EarthEquivalentCalculator } from './EarthEquivalentCalculator';
export { WorldDivergenceAnalyzer } from './WorldDivergenceAnalyzer';
export { NarrativeGenerator } from './NarrativeGenerator';
export { ScenarioWorldBuilder } from './ScenarioWorldBuilder';
export { TwinAggregator } from './TwinAggregator';
export default PlanetTwinEngine;
