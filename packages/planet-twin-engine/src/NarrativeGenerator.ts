import {
  BehaviorProfile,
  TwinTrajectory,
  EarthEquivalent,
  PlanetTwinNarrative,
  NarrativeEvidence,
  CarbonArchetype
} from '@carbonsense/shared-types';

export class NarrativeGenerator {
  /**
   * Generates a deterministic, rule-based narrative and audit log for each TwinWorld scenario.
   */
  public generate(
    worldType: 'current' | 'optimized' | 'aggressive',
    behaviorProfile: BehaviorProfile,
    trajectory: TwinTrajectory,
    earthEquivalent: EarthEquivalent,
    archetype: CarbonArchetype,
    currentAnnualEmissionsKg: number
  ): PlanetTwinNarrative {
    const vector = behaviorProfile.featureVector;
    const dailyMean = vector.dailyEmissionsMean;

    // Identify dominant category
    const maxRatio = Math.max(vector.transportRatio, vector.foodRatio, vector.energyRatio, vector.shoppingRatio);
    let dominantCategory = 'transport';
    if (maxRatio === vector.foodRatio) dominantCategory = 'food';
    else if (maxRatio === vector.energyRatio) dominantCategory = 'energy';
    else if (maxRatio === vector.shoppingRatio) dominantCategory = 'shopping';

    const evidence: NarrativeEvidence[] = [];

    if (worldType === 'current') {
      const summary = `${dominantCategory.charAt(0).toUpperCase() + dominantCategory.slice(1)} emissions represent the primary driver of this lifestyle. Baseline forecasts indicate carbon intensity will remain high without optimization.`;

      evidence.push(
        {
          metric: 'Baseline Annual Emissions',
          value: trajectory.annualEmissionsKg,
          reason: 'Calculated cumulative baseline footprint over a 365-day forecast horizon.',
        },
        {
          metric: 'Dominant Category Ratio',
          value: Math.round(maxRatio * 100),
          reason: `Emissions are highly concentrated in '${dominantCategory}', driving ${Math.round(maxRatio * 100)}% of the total footprint.`,
        }
      );

      return {
        title: 'Current Trajectory Simulation',
        summary,
        keyChanges: [
          'Baseline lifestyle behaviors continue unchanged.',
          `Primary carbon risk remains centered around '${dominantCategory}' emissions.`,
          `High dependency results in an ecological footprint of ${earthEquivalent.earthsRequired} Earths.`,
        ],
        evidence,
      };
    } else if (worldType === 'optimized') {
      const savingsKg = parseFloat(Math.max(0, currentAnnualEmissionsKg - trajectory.annualEmissionsKg).toFixed(2));
      const summary = `Emissions intensity decreases significantly by applying the top 3 recommended lifestyle modifications. The user's carbon profile begins stabilizing, moving towards a BalancedOptimizer identity.`;

      evidence.push(
        {
          metric: 'Annual Mitigation Savings',
          value: savingsKg,
          reason: 'Carbon footprint reduction achieved by implementing top-ranked optimization candidates.',
        },
        {
          metric: 'Optimized Percentile Rank',
          value: earthEquivalent.globalPercentile,
          reason: `Mitigated emissions improve the user's standing to the ${earthEquivalent.globalPercentile}th global percentile.`,
        }
      );

      return {
        title: 'Mitigated Target Profile',
        summary,
        keyChanges: [
          'Top 3 high-priority optimization interventions are successfully adopted.',
          `Mitigated footprint saves ${savingsKg.toFixed(1)} kg of CO2e emissions annually.`,
          `Reduces the global sustainability footprint to ${earthEquivalent.earthsRequired} Earths.`,
        ],
        evidence,
      };
    } else {
      // aggressive
      const savingsKg = parseFloat(Math.max(0, currentAnnualEmissionsKg - trajectory.annualEmissionsKg).toFixed(2));
      const summary = `All identified lifestyle improvements are adopted simultaneously. This maximizes footprints reduction, unlocking rapid carbon stabilization and driving the user towards a StableLowEmitter identity.`;

      evidence.push(
        {
          metric: 'Max Reduction Savings',
          value: savingsKg,
          reason: 'Total possible annual carbon savings achieved by implementing all candidates.',
        },
        {
          metric: 'Aggressive Percentile Rank',
          value: earthEquivalent.globalPercentile,
          reason: `Maximum mitigations place the user in the top tier of sustainability (${earthEquivalent.globalPercentile}th percentile).`,
        }
      );

      return {
        title: 'Full Sustainability Simulation',
        summary,
        keyChanges: [
          'All recommended lifestyle optimizations are adopted concurrently.',
          `Achieves maximum carbon footprint reduction of ${savingsKg.toFixed(1)} kg of CO2e annually.`,
          `Minimizes biocapacity requirements to just ${earthEquivalent.earthsRequired} Earths.`,
        ],
        evidence,
      };
    }
  }
}
export default NarrativeGenerator;
