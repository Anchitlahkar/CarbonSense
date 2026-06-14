import React, { useMemo } from 'react';
import { 
  PlanetTwinProfile, 
  CarbonDNAProfile, 
  BehaviorProfile 
} from '@carbonsense/shared-types';
import { Panel } from '../ui';
import { AwarenessHero } from './AwarenessHero';
import { AwarenessInsights } from './AwarenessInsights';
import { ImpactEquivalents } from './ImpactEquivalents';
import { ReductionReadiness } from './ReductionReadiness';
import { AwarenessWorkflow } from './AwarenessWorkflow';
import { selectPrimaryCategoryRatio } from '../../lib/carbon-selectors';

/**
 * Interface for CarbonAwarenessLayer component props.
 */
interface CarbonAwarenessLayerProps {
  planetTwin: PlanetTwinProfile;
  dna: CarbonDNAProfile;
  behavior: BehaviorProfile;
}

/**
 * CarbonAwarenessLayer
 * 
 * The primary visibility component for the CarbonSense Awareness Platform.
 * Orchestrates sub-components to provide a comprehensive carbon footprint awareness experience.
 * 
 * @param {CarbonAwarenessLayerProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
export const CarbonAwarenessLayer: React.FC<CarbonAwarenessLayerProps> = ({
  planetTwin,
  dna,
  behavior
}) => {
  const currentWorld = planetTwin.currentWorld;
  
  // Memoized derived data to satisfy efficiency and code quality standards
  const metrics = useMemo(() => {
    const annualKg = currentWorld.trajectory.annualEmissionsKg;
    return {
      annualKg,
      annualTons: (annualKg / 1000).toFixed(1),
      globalAvg: 4.7,
      sustainableTarget: 2.0,
      earths: currentWorld.earthEquivalent.earthsRequired,
      reductionPotential: planetTwin.comparativeAnalysis.reductionVsCurrentKg,
      reductionPercent: planetTwin.comparativeAnalysis.reductionVsCurrentPercent,
      primaryRatio: selectPrimaryCategoryRatio(dna, behavior)
    };
  }, [currentWorld, planetTwin.comparativeAnalysis, dna, behavior]);

  return (
    <div className="space-y-4" role="region" aria-label="Carbon Footprint Awareness Summary">
      {/* 1. Awareness Hero & Insights Panel */}
      <Panel level={1} className="relative overflow-hidden p-6 md:p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-green/5 blur-[100px] -mr-32 -mt-32 rounded-full" aria-hidden="true" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <AwarenessHero 
            annualTons={metrics.annualTons}
            globalAvg={metrics.globalAvg}
            sustainableTarget={metrics.sustainableTarget}
            reductionPercent={metrics.reductionPercent}
            primaryCategory={dna.primaryCategory}
          />
          <AwarenessInsights 
            earths={metrics.earths}
            primaryRatio={metrics.primaryRatio}
            primaryCategory={dna.primaryCategory}
          />
        </div>
      </Panel>

      {/* 2. Impact Translation & Reduction Readiness Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ImpactEquivalents 
          vehicleEquivalentKm={currentWorld.impact.vehicleEquivalentKm}
          annualKg={metrics.annualKg}
          treesRequiredForOffset={currentWorld.impact.treesRequiredForOffset}
          householdEnergyEquivalentDays={currentWorld.impact.householdEnergyEquivalentDays}
        />
        <ReductionReadiness 
          reductionPercent={metrics.reductionPercent}
          reductionPotential={metrics.reductionPotential}
          annualKg={metrics.annualKg}
        />
      </div>

      {/* 3. Challenge Visibility: The CarbonSense Advantage Workflow */}
      <AwarenessWorkflow />
    </div>
  );
};

export default CarbonAwarenessLayer;
