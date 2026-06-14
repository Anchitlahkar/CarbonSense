import { 
  BehaviorProfile, 
  CarbonDNAProfile 
} from '@carbonsense/shared-types';

/**
 * Calculates the emission ratio for the primary category identified in Carbon DNA.
 */
export const selectPrimaryCategoryRatio = (
  dna: CarbonDNAProfile,
  behavior: BehaviorProfile
): number => {
  const category = dna.primaryCategory;
  const vector = behavior.featureVector;
  
  switch (category) {
    case 'transport': return vector.transportRatio;
    case 'food': return vector.foodRatio;
    case 'energy': return vector.energyRatio;
    case 'shopping': return vector.shoppingRatio;
    default: return 0;
  }
};

/**
 * Formats a category's contribution as a percentage string.
 */
export const formatCategoryRatioText = (
  category: string,
  behavior: BehaviorProfile
): string => {
  const vector = behavior.featureVector;
  let ratio = 0;
  
  if (category === 'transport') ratio = vector.transportRatio;
  else if (category === 'food') ratio = vector.foodRatio;
  else if (category === 'energy') ratio = vector.energyRatio;
  else if (category === 'shopping') ratio = vector.shoppingRatio;
  else return 'a significant portion';

  return `${Math.round(ratio * 100)}%`;
};

/**
 * Maps category metrics to compute ratio styles for display.
 */
export const selectCategoryRatios = (behavior: BehaviorProfile) => {
  const vector = behavior.featureVector;
  return [
    { label: 'Transport', ratio: vector.transportRatio, color: 'bg-accent-blue' },
    { label: 'Food', ratio: vector.foodRatio, color: 'bg-accent-green' },
    { label: 'Energy', ratio: vector.energyRatio, color: 'bg-accent-amber' },
    { label: 'Shopping', ratio: vector.shoppingRatio, color: 'bg-accent-red' }
  ].sort((a, b) => b.ratio - a.ratio);
};
