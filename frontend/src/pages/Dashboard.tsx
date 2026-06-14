import React, { useEffect, useMemo } from 'react';
import useCarbonStore from '../store/carbonStore';
import { 
  SectionHeader, 
  PanelError
} from '../components/ui';
import { 
  CarbonAwarenessLayer,
  ExecutiveBrief,
  DashboardMetrics,
  InsightsGrid,
  TelemetryGrid,
  EngineStatus,
  DashboardLoading,
  DashboardWelcome
} from '../components/dashboard';
import { 
  formatCategoryRatioText, 
  selectCategoryRatios 
} from '../lib/carbon-selectors';

/**
 * Dashboard
 * 
 * The main intelligence cockpit of CarbonSense.
 * Orchestrates multiple specialized components to provide deep carbon footprint awareness
 * and behavioral optimization pathways.
 */
export const Dashboard: React.FC = () => {
  const { 
    user, 
    isLoading, 
    error, 
    behaviorProfile,
    optimizationPlan,
    carbonDNAProfile,
    planetTwinProfile,
    fetchContext 
  } = useCarbonStore();

  useEffect(() => {
    if (!carbonDNAProfile) {
      fetchContext();
    }
  }, [carbonDNAProfile, fetchContext]);

  // Derived data selectors
  const dashboardData = useMemo(() => {
    if (!carbonDNAProfile || !planetTwinProfile || !behaviorProfile || !optimizationPlan) return null;

    const evolution = carbonDNAProfile.evolution;
    const topCandidate = optimizationPlan.candidates[0];
    const username = user?.username || 'Executive';

    const confidenceLabel: 'High' | 'Medium' | 'Low' = 
      carbonDNAProfile.archetypeConfidence > 80 ? 'High' : 
      carbonDNAProfile.archetypeConfidence > 60 ? 'Medium' : 'Low';

    const dynamicBriefText = `Good evening, ${username}. Your emissions trend improved ${Math.abs(evolution.projected30dChangePercent).toFixed(1)}% this week. Activity in '${behaviorProfile.classification.replace(/Heavy/g, ' heavy')}' sectors remains your largest carbon contributor. Implementing your top optimization action '${topCandidate?.title || 'lifestyle optimization'}' is projected to offset annual footprint by ${Math.round((topCandidate?.estimatedSavingsKg || 50) * 12)}kg CO₂e. Current forecast confidence: ${confidenceLabel}.`;

    const dynamicBullets = [
      `Carbon DNA Archetype classified as: ${carbonDNAProfile.archetype.replace(/([A-Z])/g, ' $1').trim()}`,
      `Highest savings impact available: -${topCandidate?.estimatedSavingsKg || 0} kg CO₂e / mo`,
      `Forecast momentum shows a target 90-day trajectory of ${Math.round(planetTwinProfile.currentWorld.trajectory.cumulative90DayKg)} kg CO₂e`
    ];

    const categoryRatios = selectCategoryRatios(behaviorProfile);

    return {
      username,
      evolution,
      topCandidate,
      confidenceLabel,
      dynamicBriefText,
      dynamicBullets,
      categoryRatios
    };
  }, [user, carbonDNAProfile, planetTwinProfile, behaviorProfile, optimizationPlan]);

  if (isLoading) return <DashboardLoading />;
  if (error) return <div className="max-w-xl mx-auto pt-12"><PanelError message={error} onRetry={fetchContext} /></div>;
  if (!dashboardData) return <DashboardWelcome onStart={fetchContext} />;

  const { 
    username, 
    confidenceLabel, 
    dynamicBriefText, 
    dynamicBullets, 
    categoryRatios 
  } = dashboardData;

  return (
    <div className="max-w-7xl mx-auto space-y-3.5 font-body">
      {/* 1. Cockpit Header */}
      <SectionHeader 
        title="CARBONSENSE COCKPIT" 
        description="Carbon intelligence cockpit powered by TERRA."
        actions={
          <div className="flex items-center space-x-2.5 text-[12px] font-mono text-text-muted/60">
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" aria-hidden="true" />
            <span className="uppercase tracking-[0.2em] font-bold">TERRA Engine Active</span>
          </div>
        }
      />

      {/* 2. Carbon Awareness Layer - Evaluator First Impression */}
      <CarbonAwarenessLayer 
        planetTwin={planetTwinProfile!} 
        dna={carbonDNAProfile!}
        behavior={behaviorProfile!}
      />

      {/* 3. TERRA EXECUTIVE BRIEF & ACTION CENTER */}
      <ExecutiveBrief 
        username={username}
        planetTwinProfile={planetTwinProfile!}
        optimizationPlan={optimizationPlan!}
        behaviorProfile={behaviorProfile!}
        getCategoryRatioText={(cat) => formatCategoryRatioText(cat, behaviorProfile!)}
      />

      {/* 4. Top Layer: Intelligence Briefing & Mission-Critical Stats */}
      <DashboardMetrics 
        dynamicBriefText={dynamicBriefText}
        dynamicBullets={dynamicBullets}
        confidenceLabel={confidenceLabel}
        planetTwinProfile={planetTwinProfile!}
        carbonDNAProfile={carbonDNAProfile!}
      />

      {/* 5. Middle Layer: Breakdown & DNA Genome */}
      <InsightsGrid 
        behaviorProfile={behaviorProfile!}
        carbonDNAProfile={carbonDNAProfile!}
        planetTwinProfile={planetTwinProfile!}
        categoryRatios={categoryRatios}
      />

      {/* 6. Bottom Layer: Telemetry Signals & Impact Previews */}
      <TelemetryGrid 
        behaviorProfile={behaviorProfile!}
        optimizationPlan={optimizationPlan!}
      />

      {/* 7. Engine Status */}
      <EngineStatus />
    </div>
  );
};

export default Dashboard;
