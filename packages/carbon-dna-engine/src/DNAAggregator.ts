import {
  BehaviorProfile,
  ForecastProfile,
  OptimizationPlan,
  CarbonDNAProfile,
  CarbonArchetype,
  DNAEvolutionDirection,
  DNADimensions,
  ArchetypeEvidence,
  DNAEvolution,
  FutureDNAProjection
} from '@carbonsense/shared-types';

export class DNAAggregator {
  /**
   * Orchestrates the final aggregation of DNA elements and computes evolution projection metrics.
   */
  public aggregate(
    behaviorProfile: BehaviorProfile,
    forecastProfile: ForecastProfile,
    optimizationPlan: OptimizationPlan,
    archetype: CarbonArchetype,
    archetypeConfidence: number,
    evidence: ArchetypeEvidence[],
    dimensions: DNADimensions
  ): CarbonDNAProfile {
    // 1. Calculate trajectory deltas between trend-adjusted and baseline projections
    const baseline30d = forecastProfile?.baseline?.['30d']?.snapshots || [];
    const trend30d = forecastProfile?.trendAdjusted?.['30d']?.snapshots || [];

    const baselineSum = baseline30d.reduce((sum, s) => sum + s.projectedEmission, 0);
    const trendSum = trend30d.reduce((sum, s) => sum + s.projectedEmission, 0);

    // Percentage difference (trend compared to flat baseline)
    const pctChange = baselineSum > 0 ? ((trendSum - baselineSum) / baselineSum) * 100 : 0;

    // Resolve DNAEvolutionDirection
    let direction = DNAEvolutionDirection.Stable;
    if (pctChange < -15) {
      direction = DNAEvolutionDirection.RapidImprovement;
    } else if (pctChange < -2) {
      direction = DNAEvolutionDirection.Improving;
    } else if (pctChange > 15) {
      direction = DNAEvolutionDirection.RapidDegradation;
    } else if (pctChange > 2) {
      direction = DNAEvolutionDirection.Degrading;
    }

    const evolutionConfidence = forecastProfile?.integrity?.score ?? 80;

    // 2. Compute future identity projection (state transition forecasting)
    let projectedArchetype = archetype;
    let probability = 0.90;
    const reasoningSteps: string[] = [];

    if (direction === DNAEvolutionDirection.RapidImprovement || direction === DNAEvolutionDirection.Improving) {
      if (
        archetype === CarbonArchetype.TransportDominant ||
        archetype === CarbonArchetype.FoodDominant ||
        archetype === CarbonArchetype.EnergyDominant ||
        archetype === CarbonArchetype.ShoppingDominant
      ) {
        projectedArchetype = CarbonArchetype.BalancedOptimizer;
        probability = dimensions.optimizationReadiness > 60 ? 0.85 : 0.65;
        reasoningSteps.push(
          `Improving emissions trend (${pctChange.toFixed(1)}%) indicates active reduction behaviors.`,
          `High optimization readiness (${dimensions.optimizationReadiness}/100) supports the transition from a category-dominant profile to BalancedOptimizer.`
        );
      } else if (archetype === CarbonArchetype.BalancedOptimizer) {
        projectedArchetype = CarbonArchetype.StableLowEmitter;
        probability = dimensions.optimizationReadiness > 70 ? 0.75 : 0.55;
        reasoningSteps.push(
          `Steady downward trajectory supports transition to sustainable baseline values.`,
          `Balanced emissions structure aligns with carbon budget constraints.`
        );
      } else if (archetype === CarbonArchetype.VolatileEmitter || archetype === CarbonArchetype.ResistantEmitter) {
        projectedArchetype = CarbonArchetype.BalancedOptimizer;
        probability = 0.60;
        reasoningSteps.push(
          `Improving forecast values stabilize historical volatility indicators.`,
          `Transition probability of 0.60 reflects the moderation of behavioral barriers.`
        );
      } else {
        // Already StableLowEmitter
        projectedArchetype = CarbonArchetype.StableLowEmitter;
        probability = 0.95;
        reasoningSteps.push(`User is expected to maintain their sustainable, low-emissions profile.`);
      }
    } else if (direction === DNAEvolutionDirection.RapidDegradation || direction === DNAEvolutionDirection.Degrading) {
      if (archetype === CarbonArchetype.StableLowEmitter || archetype === CarbonArchetype.BalancedOptimizer) {
        projectedArchetype = CarbonArchetype.VolatileEmitter;
        probability = 0.70;
        reasoningSteps.push(
          `Upward trend projection (${pctChange.toFixed(1)}%) warns of expanding carbon drivers.`,
          `Rising consumption behaviors disrupt user stability, likely transitioning them to a VolatileEmitter.`
        );
      } else {
        projectedArchetype = CarbonArchetype.ResistantEmitter;
        probability = dimensions.interventionResistance > 60 ? 0.80 : 0.55;
        reasoningSteps.push(
          `Degrading trends compound existing carbon inefficiencies.`,
          `High current resistance score (${dimensions.interventionResistance}/100) accelerates transition to ResistantEmitter status.`
        );
      }
    } else {
      // Stable
      projectedArchetype = archetype;
      probability = 0.90;
      reasoningSteps.push(
        `Flat projection delta (${pctChange.toFixed(1)}%) indicates consistent historical behaviors.`,
        `User is highly likely (90% probability) to remain classified as ${archetype}.`
      );
    }

    const futureProjection: FutureDNAProjection = {
      currentArchetype: archetype,
      projectedArchetype,
      probability: parseFloat(probability.toFixed(2)),
      reasoning: reasoningSteps,
    };

    const evolution: DNAEvolution = {
      direction,
      projected30dChangePercent: parseFloat(pctChange.toFixed(2)),
      projected90dChangePercent: parseFloat((pctChange * 1.5).toFixed(2)), // simple projection multiplier
      confidenceScore: evolutionConfidence,
      reasoning: `Trajectory classified as ${direction} based on 30-day projection delta of ${pctChange.toFixed(1)}% compared to flat baseline.`,
      futureProjection,
    };

    // Determine primary category and ratio for legacy properties
    const vector = behaviorProfile.featureVector;
    const maxRatio = Math.max(vector.transportRatio, vector.foodRatio, vector.energyRatio, vector.shoppingRatio);
    let primaryCategory: 'transport' | 'food' | 'energy' | 'shopping' = 'transport';
    if (maxRatio === vector.foodRatio) primaryCategory = 'food';
    else if (maxRatio === vector.energyRatio) primaryCategory = 'energy';
    else if (maxRatio === vector.shoppingRatio) primaryCategory = 'shopping';

    return {
      id: `dna-profile-${behaviorProfile.userId}-${Date.now()}`,
      userId: behaviorProfile.userId,
      
      // Legacy fields mapping
      carbonPersonaType: archetype.toString(),
      primaryCategory,
      primaryEmissionsRatio: parseFloat(maxRatio.toFixed(3)),
      behavioralScore: 100 - dimensions.behaviorVolatility,
      
      // Phase 6 fields
      archetype,
      archetypeConfidence,
      dimensions,
      archetypeEvidence: evidence,
      evolution,
      lastUpdated: new Date(),
    };
  }
}
export default DNAAggregator;
