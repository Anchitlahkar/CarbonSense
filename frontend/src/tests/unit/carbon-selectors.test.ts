import { describe, it, expect } from 'vitest';
import { 
  selectPrimaryCategoryRatio, 
  formatCategoryRatioText, 
  selectCategoryRatios 
} from '../../lib/carbon-selectors';
import { 
  BehaviorProfile, 
  CarbonDNAProfile 
} from '@carbonsense/shared-types';

describe('Carbon Selectors', () => {
  const mockDna: Partial<CarbonDNAProfile> = {
    primaryCategory: 'transport'
  };

  const mockBehavior: Partial<BehaviorProfile> = {
    featureVector: {
      userId: 'test-user',
      transportRatio: 0.6,
      foodRatio: 0.2,
      energyRatio: 0.1,
      shoppingRatio: 0.1,
      dailyEmissionsMean: 10,
      dailyEmissionsStdDev: 2,
      weeklyBeefCount: 1,
      monthlyFlightCount: 0,
      weekendMultiplier: 1.2
    }
  };

  describe('selectPrimaryCategoryRatio', () => {
    it('correctly selects the transport ratio', () => {
      const result = selectPrimaryCategoryRatio(
        mockDna as CarbonDNAProfile, 
        mockBehavior as BehaviorProfile
      );
      expect(result).toBe(0.6);
    });

    it('returns 0 for unknown category', () => {
      const dna = { ...mockDna, primaryCategory: 'unknown' };
      const result = selectPrimaryCategoryRatio(
        dna as CarbonDNAProfile, 
        mockBehavior as BehaviorProfile
      );
      expect(result).toBe(0);
    });
  });

  describe('formatCategoryRatioText', () => {
    it('formats transport ratio as percentage', () => {
      const result = formatCategoryRatioText('transport', mockBehavior as BehaviorProfile);
      expect(result).toBe('60%');
    });

    it('returns fallback text for unknown category', () => {
      const result = formatCategoryRatioText('unknown', mockBehavior as BehaviorProfile);
      expect(result).toBe('a significant portion');
    });
  });

  describe('selectCategoryRatios', () => {
    it('returns sorted category ratios', () => {
      const result = selectCategoryRatios(mockBehavior as BehaviorProfile);
      expect(result[0].label).toBe('Transport');
      expect(result[0].ratio).toBe(0.6);
      expect(result[3].label).toBe('Shopping');
      expect(result[3].ratio).toBe(0.1);
    });
  });
});
