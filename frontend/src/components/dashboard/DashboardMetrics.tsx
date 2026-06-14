import React from 'react';
import { PlanetTwinProfile, CarbonDNAProfile } from '@carbonsense/shared-types';
import { IntelligenceBrief, MetricCard } from '../ui';

interface DashboardMetricsProps {
  dynamicBriefText: string;
  dynamicBullets: string[];
  confidenceLabel: 'High' | 'Medium' | 'Low';
  planetTwinProfile: PlanetTwinProfile;
  carbonDNAProfile: CarbonDNAProfile;
}

/**
 * DashboardMetrics
 * 
 * Renders the Intelligence Briefing and key metric cards.
 */
export const DashboardMetrics: React.FC<DashboardMetricsProps> = ({
  dynamicBriefText,
  dynamicBullets,
  confidenceLabel,
  planetTwinProfile,
  carbonDNAProfile
}) => {
  const currentWorld = planetTwinProfile.currentWorld;
  const evolution = carbonDNAProfile.evolution;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
      <div className="lg:col-span-8">
        <IntelligenceBrief 
          title="Intelligence Briefing"
          badge="Engine v1.6-X"
          narrative={dynamicBriefText}
          bulletPoints={dynamicBullets}
          forecastConfidence={confidenceLabel}
          behaviorFreshness="SYNCED 2M AGO"
          modelIntegrity={currentWorld.healthIndex.score}
          level={1}
          status="info"
          className="h-full"
        />
      </div>

      <div className="lg:col-span-4 grid grid-cols-1 gap-2.5">
        <MetricCard 
          title="Planet Health Index"
          value={currentWorld.healthIndex.score}
          unit="/ 100"
          subtext="Trajectory simulation"
          level={1}
          status={currentWorld.healthIndex.score > 60 ? 'success' : 'warning'}
          trend={{
            value: Math.round(currentWorld.healthIndex.score - 50),
            isGood: currentWorld.healthIndex.score > 50,
          }}
          compact
        />
        <MetricCard 
          title="30-Day Forecast"
          value={currentWorld.trajectory.cumulative30DayKg}
          unit="kg CO₂e"
          subtext="Baseline momentum"
          level={2}
          trend={{
            value: Math.round(evolution.projected30dChangePercent),
            isGood: evolution.projected30dChangePercent < 0,
          }}
          compact
        />
      </div>
    </div>
  );
};
