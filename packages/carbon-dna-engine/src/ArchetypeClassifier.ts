import { BehaviorProfile, CarbonArchetype, ArchetypeEvidence } from '@carbonsense/shared-types';

export class ArchetypeClassifier {
  /**
   * Classifies the user into a dominant CarbonArchetype and compiles the auditable evidence list.
   */
  public classify(
    behaviorProfile: BehaviorProfile,
    volatility: number,
    resistance: number,
    optimizationPotentialScore: number
  ): { archetype: CarbonArchetype; confidence: number; evidence: ArchetypeEvidence[] } {
    const vector = behaviorProfile.featureVector;
    const dailyMean = vector.dailyEmissionsMean;

    const transportPct = Math.round(vector.transportRatio * 100);
    const foodPct = Math.round(vector.foodRatio * 100);
    const energyPct = Math.round(vector.energyRatio * 100);
    const shoppingPct = Math.round(vector.shoppingRatio * 100);

    const evidence: ArchetypeEvidence[] = [
      {
        factor: 'Transport Footprint Ratio',
        contribution: transportPct,
        reasoning: `Transportation activities represent ${transportPct}% of the user's daily footprint.`,
      },
      {
        factor: 'Food Footprint Ratio',
        contribution: foodPct,
        reasoning: `Dietary choices and agricultural consumption represent ${foodPct}% of the user's daily footprint.`,
      },
      {
        factor: 'Energy Footprint Ratio',
        contribution: energyPct,
        reasoning: `Residential heating, cooling, and electricity represent ${energyPct}% of the user's daily footprint.`,
      },
      {
        factor: 'Shopping Footprint Ratio',
        contribution: shoppingPct,
        reasoning: `Discretionary product acquisitions represent ${shoppingPct}% of the user's daily footprint.`,
      },
    ];

    // Rules for classification, checked in order of research precedence:
    let archetype = CarbonArchetype.BalancedOptimizer;
    let confidence = 80;

    if (dailyMean > 0 && dailyMean < 3.0) {
      // 1. StableLowEmitter (global sustainability threshold target: 3 kg CO2e / day)
      archetype = CarbonArchetype.StableLowEmitter;
      confidence = Math.max(0, Math.min(100, Math.round(95 - volatility * 0.2)));
      evidence.push({
        factor: 'Low Daily Emissions Mean',
        contribution: 100,
        reasoning: `Daily emissions average of ${dailyMean.toFixed(1)} kg is below the global Paris Agreement budget of 3.0 kg/day.`,
      });
    } else if (volatility > 60) {
      // 2. VolatileEmitter (high variability)
      archetype = CarbonArchetype.VolatileEmitter;
      confidence = Math.max(0, Math.min(100, Math.round(volatility)));
      evidence.push({
        factor: 'Behavioral Volatility Index',
        contribution: volatility,
        reasoning: `Volatility score of ${volatility}/100 indicates erratic emissions patterns between days/weekends.`,
      });
    } else if (resistance > 70 && behaviorProfile.riskScore > 60) {
      // 3. ResistantEmitter (high friction to intervention change)
      archetype = CarbonArchetype.ResistantEmitter;
      confidence = Math.max(0, Math.min(100, Math.round(resistance * 0.8 + behaviorProfile.riskScore * 0.2)));
      evidence.push({
        factor: 'Behavioral Change Resistance',
        contribution: resistance,
        reasoning: `Average intervention resistance is extremely high (${resistance}/100) paired with a high risk profile score.`,
      });
    } else if (vector.transportRatio > 0.40) {
      // 4. TransportDominant
      archetype = CarbonArchetype.TransportDominant;
      confidence = Math.max(0, Math.min(100, Math.round(70 + vector.transportRatio * 25)));
      evidence.push({
        factor: 'Transport Dominance',
        contribution: transportPct,
        reasoning: `Transportation is the single largest emissions driver, exceeding the dominance threshold of 40%.`,
      });
    } else if (vector.foodRatio > 0.40) {
      // 5. FoodDominant
      archetype = CarbonArchetype.FoodDominant;
      confidence = Math.max(0, Math.min(100, Math.round(70 + vector.foodRatio * 25)));
      evidence.push({
        factor: 'Food Dominance',
        contribution: foodPct,
        reasoning: `Dietary choices represent the primary emissions driver, exceeding the dominance threshold of 40%.`,
      });
    } else if (vector.energyRatio > 0.40) {
      // 6. EnergyDominant
      archetype = CarbonArchetype.EnergyDominant;
      confidence = Math.max(0, Math.min(100, Math.round(70 + vector.energyRatio * 25)));
      evidence.push({
        factor: 'Energy Dominance',
        contribution: energyPct,
        reasoning: `Household utilities and energy systems represent the primary driver, exceeding the dominance threshold of 40%.`,
      });
    } else if (vector.shoppingRatio > 0.35) {
      // 7. ShoppingDominant
      archetype = CarbonArchetype.ShoppingDominant;
      confidence = Math.max(0, Math.min(100, Math.round(70 + vector.shoppingRatio * 25)));
      evidence.push({
        factor: 'Shopping Dominance',
        contribution: shoppingPct,
        reasoning: `Discretionary consumer shopping is the primary driver, exceeding the dominance threshold of 35%.`,
      });
    } else if (optimizationPotentialScore > 30) {
      // 8. HighImpactReducer (high reduction potential across multiple balanced categories)
      archetype = CarbonArchetype.HighImpactReducer;
      confidence = Math.max(0, Math.min(100, Math.round(70 + optimizationPotentialScore * 0.25)));
      evidence.push({
        factor: 'Optimization Savings Cap',
        contribution: optimizationPotentialScore,
        reasoning: `Potential carbon savings exceed 30% of total footprint, offering high impact targets across multiple categories.`,
      });
    } else {
      // 9. BalancedOptimizer
      archetype = CarbonArchetype.BalancedOptimizer;
      confidence = 80;
      evidence.push({
        factor: 'Carbon Category Balance',
        contribution: 50,
        reasoning: `Emissions are distributed evenly without individual category dominance or extreme volatility barriers.`,
      });
    }

    return {
      archetype,
      confidence,
      evidence,
    };
  }
}
export default ArchetypeClassifier;
