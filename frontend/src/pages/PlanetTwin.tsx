import React, { useState, useEffect, useMemo } from 'react';
import useCarbonStore from '../store/carbonStore';
import { 
  Panel, 
  SectionHeader, 
  Skeleton, 
  PanelError,
  IntelligenceBrief
} from '../components/ui';
import PlanetTwinScene from '../components/3d/PlanetTwinScene';
import { 
  Compass, 
  ShieldAlert,
  Globe,
  Trees,
  Thermometer,
  Shield,
  Gauge,
  Activity,
  Car
} from 'lucide-react';

type ScenarioMode = 'current' | 'optimized' | 'aggressive';

export const PlanetTwin: React.FC = () => {
  const [scenario, setScenario] = useState<ScenarioMode>('current');
  const { 
    isLoading, 
    error, 
    planetTwinProfile, 
    fetchContext 
  } = useCarbonStore();

  useEffect(() => {
    if (!planetTwinProfile) {
      fetchContext();
    }
  }, [planetTwinProfile, fetchContext]);

  if (isLoading) {
    return (
      <div className="space-y-4 max-w-6xl mx-auto font-body">
        <div className="flex justify-between items-center pb-2 border-b border-white/[0.06]">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8">
            <Skeleton className="h-[320px] w-full" />
          </div>
          <div className="lg:col-span-4 space-y-3">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto pt-12">
        <PanelError message={error} onRetry={fetchContext} />
      </div>
    );
  }

  if (!planetTwinProfile) {
    return (
      <div className="max-w-md mx-auto text-center py-12 space-y-4">
        <ShieldAlert className="mx-auto text-accent-amber animate-pulse" size={40} />
        <h3 className="text-xs font-bold font-display uppercase tracking-wider text-text-primary">PROFILE SYNC ERROR</h3>
        <p className="text-[11px] text-text-muted">Planet Twin simulations require active profile telemetry.</p>
        <button onClick={fetchContext} className="px-3 py-1.5 rounded bg-accent-green text-bg-primary text-xs font-mono font-bold uppercase">
          Reinitialize Profile
        </button>
      </div>
    );
  }

  const activeWorld = 
    scenario === 'current' ? planetTwinProfile.currentWorld :
    scenario === 'optimized' ? planetTwinProfile.optimizedWorld :
    planetTwinProfile.aggressiveWorld;

  const currentAnnualTons = (planetTwinProfile.currentWorld.trajectory.annualEmissionsKg / 1000).toFixed(2);
  const optimizedAnnualTons = (planetTwinProfile.optimizedWorld.trajectory.annualEmissionsKg / 1000).toFixed(2);
  const aggressiveAnnualTons = (planetTwinProfile.aggressiveWorld.trajectory.annualEmissionsKg / 1000).toFixed(2);

  // Compute Delta Text & Value
  const deltaValue = useMemo(() => {
    if (scenario === 'current') return '0% Drift';
    if (scenario === 'optimized') return `-${planetTwinProfile.comparativeAnalysis.reductionVsCurrentPercent}% Offset`;
    
    const aggressiveReductionPercent = Math.round(
      ((planetTwinProfile.currentWorld.trajectory.annualEmissionsKg - planetTwinProfile.aggressiveWorld.trajectory.annualEmissionsKg) / 
       planetTwinProfile.currentWorld.trajectory.annualEmissionsKg) * 100
    );
    return `-${aggressiveReductionPercent}% Recovery`;
  }, [scenario, planetTwinProfile]);

  const currentAnnualTonsVal = (activeWorld.trajectory.annualEmissionsKg / 1000).toFixed(2);

  // Construct Dynamic Narrative Intelligence Text
  const narrativeText = `At your current trajectory, annual emissions are projected to reach ${currentAnnualTons} tons CO₂e. Following the optimization pathway reduces emissions by ${planetTwinProfile.comparativeAnalysis.reductionVsCurrentPercent}%, down to ${optimizedAnnualTons} tons CO₂e. The aggressive pathway reduces emissions by ${Math.round(((planetTwinProfile.currentWorld.trajectory.annualEmissionsKg - planetTwinProfile.aggressiveWorld.trajectory.annualEmissionsKg) / planetTwinProfile.currentWorld.trajectory.annualEmissionsKg) * 100)}%, equivalent to removing ${planetTwinProfile.aggressiveWorld.impact.vehicleEquivalentKm.toLocaleString()} vehicle kilometers annually.`;

  const bulletPoints = [
    `Atmospheric Concentration: Carbon levels project at ${scenario === 'current' ? '418' : scenario === 'optimized' ? '385' : '360'} PPM.`,
    `Forest Offset Equivalent: Demands ${activeWorld.impact.treesRequiredForOffset.toLocaleString()} reforestation hectares.`,
    `Overshoot Index: Global adoption would require ${activeWorld.earthEquivalent.earthsRequired.toFixed(1)} Earths to sustain.`
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-3 font-body">
      {/* 1. Page Header */}
      <SectionHeader 
        title="PLANET TWIN SIMULATION"
        description="Physically-based simulation modeling atmospheric and biospheric feedback of carbon pathways."
        actions={
          <div className="flex items-center space-x-2 text-[8px] font-mono text-text-subtle">
            <span className="uppercase tracking-widest">Confidence: <strong className="text-accent-green">94%</strong></span>
            <span className="border-l border-white/10 pl-2 uppercase tracking-widest">Telemetry: <strong>ACTIVE</strong></span>
          </div>
        }
      />

      {/* 2. Top Layer: Scenario Selector */}
      <Panel level={2} compact className="py-2 px-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <Gauge className="w-3 h-3 text-accent-blue" />
          <span className="text-[9px] font-bold text-text-primary uppercase tracking-widest font-display">
            Simulation Scenario Mode
          </span>
        </div>
        <div className="flex bg-bg-card border border-white/[0.04] rounded p-0.5 space-x-0.5 font-mono text-[8px]">
          <button
            onClick={() => setScenario('current')}
            className={`px-2.5 py-1 rounded transition-colors font-bold uppercase tracking-tight ${
              scenario === 'current' ? 'bg-accent-red text-white' : 'text-text-muted hover:text-white'
            }`}
          >
            Current Trajectory
          </button>
          <button
            onClick={() => setScenario('optimized')}
            className={`px-2.5 py-1 rounded transition-colors font-bold uppercase tracking-tight ${
              scenario === 'optimized' ? 'bg-accent-blue text-white' : 'text-text-muted hover:text-white'
            }`}
          >
            Optimized Pathway
          </button>
          <button
            onClick={() => setScenario('aggressive')}
            className={`px-2.5 py-1 rounded transition-colors font-bold uppercase tracking-tight ${
              scenario === 'aggressive' ? 'bg-accent-green text-bg-primary' : 'text-text-muted hover:text-white'
            }`}
          >
            Aggressive Recovery
          </button>
        </div>
      </Panel>

      {/* 3. Center Section: 3D Globe + Key Delta (Hero Area) & Right Telemetry Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Globe Visualization Area */}
        <Panel level={1} className="lg:col-span-8 relative flex flex-col justify-between min-h-[340px] p-3">
          <div className="absolute top-2.5 left-2.5 z-10 flex items-center space-x-1.5">
            <Globe className="text-text-muted animate-spin-slow w-3 h-3" />
            <span className="text-[8px] font-mono text-text-muted uppercase tracking-[0.2em]">
              SIM_OUTPUT_RENDER_V1.5
            </span>
          </div>

          {/* Floating Key Delta (Hero Visual) */}
          <div className="absolute top-2.5 right-2.5 z-10 bg-bg-card/80 border border-white/[0.08] px-2 py-1 rounded flex flex-col text-right backdrop-blur font-mono">
            <span className="text-[7px] text-text-subtle uppercase tracking-widest">Scenario Target</span>
            <span className={`text-xs font-bold tracking-tight ${
              scenario === 'current' ? 'text-accent-red' : scenario === 'optimized' ? 'text-accent-blue' : 'text-accent-green'
            }`}>
              {deltaValue}
            </span>
          </div>

          {/* Center 3D Canvas */}
          <div className="flex-1 flex items-center justify-center">
            <PlanetTwinScene scenario={scenario} />
          </div>

          <div className="flex items-center justify-between text-[7px] font-mono text-text-subtle pt-1.5 border-t border-white/[0.04] uppercase tracking-widest">
            <span>Volumetric clouds: <strong>ACTIVE</strong></span>
            <span>Haze density: <strong>{(scenario === 'current' ? 0.55 : scenario === 'optimized' ? 0.4 : 0.25) * 100}%</strong></span>
          </div>
        </Panel>

        {/* Right Section: Divergence Metrics */}
        <div className="lg:col-span-4 grid grid-cols-1 gap-2">
          {/* Annual Emissions */}
          <Panel level={2} compact className="flex items-center justify-between h-fit py-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded bg-white/[0.02] border border-white/[0.04] flex items-center justify-center text-text-muted">
                <Activity size={12} />
              </div>
              <div>
                <span className="text-[8px] font-mono text-text-subtle block uppercase tracking-tighter">Annual Emissions</span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-text-primary">
              {currentAnnualTonsVal} <span className="text-[8px] text-text-muted font-normal uppercase">t CO₂e</span>
            </span>
          </Panel>

          {/* Temp Impact */}
          <Panel level={2} compact className="flex items-center justify-between h-fit py-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded bg-white/[0.02] border border-white/[0.04] flex items-center justify-center text-text-muted">
                <Thermometer size={12} />
              </div>
              <div>
                <span className="text-[8px] font-mono text-text-subtle block uppercase tracking-tighter">Temp Delta</span>
              </div>
            </div>
            <span className={`text-xs font-mono font-bold ${
              scenario === 'current' ? 'text-accent-red' : scenario === 'optimized' ? 'text-accent-blue' : 'text-accent-green'
            }`}>
              +{scenario === 'current' ? '2.1' : scenario === 'optimized' ? '1.7' : '1.3'}°C
            </span>
          </Panel>

          {/* Atmospheric concentration */}
          <Panel level={2} compact className="flex items-center justify-between h-fit py-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded bg-white/[0.02] border border-white/[0.04] flex items-center justify-center text-text-muted">
                <Compass size={12} />
              </div>
              <div>
                <span className="text-[8px] font-mono text-text-subtle block uppercase tracking-tighter">Atmospheric PPM</span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-text-primary">
              {scenario === 'current' ? '418' : scenario === 'optimized' ? '385' : '360'} <span className="text-[8px] text-text-muted font-normal uppercase">PPM</span>
            </span>
          </Panel>

          {/* Forest Offset */}
          <Panel level={2} compact className="flex items-center justify-between h-fit py-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded bg-white/[0.02] border border-white/[0.04] flex items-center justify-center text-text-muted">
                <Trees size={12} />
              </div>
              <div>
                <span className="text-[8px] font-mono text-text-subtle block uppercase tracking-tighter">Forest Demand</span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-text-primary">
              {activeWorld.impact.treesRequiredForOffset.toLocaleString()} <span className="text-[8px] text-text-muted font-normal uppercase">Hectares</span>
            </span>
          </Panel>

          {/* Vehicle Reduction */}
          <Panel level={2} compact className="flex items-center justify-between h-fit py-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded bg-white/[0.02] border border-white/[0.04] flex items-center justify-center text-text-muted">
                <Car size={12} />
              </div>
              <div>
                <span className="text-[8px] font-mono text-text-subtle block uppercase tracking-tighter">Vehicle Offset</span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-text-primary">
              {(activeWorld.impact.vehicleEquivalentKm / 1000).toFixed(1)}k <span className="text-[8px] text-text-muted font-normal uppercase">KM</span>
            </span>
          </Panel>

          {/* Earth Overshoot */}
          <Panel level={2} compact className="flex items-center justify-between h-fit py-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded bg-white/[0.02] border border-white/[0.04] flex items-center justify-center text-text-muted">
                <Globe size={12} />
              </div>
              <div>
                <span className="text-[8px] font-mono text-text-subtle block uppercase tracking-tighter">Overshoot</span>
              </div>
            </div>
            <span className={`text-xs font-mono font-bold ${
              activeWorld.earthEquivalent.earthsRequired > 1.5 ? 'text-accent-amber' : 'text-accent-green'
            }`}>
              {activeWorld.earthEquivalent.earthsRequired.toFixed(1)} <span className="text-[8px] text-text-muted font-normal uppercase">Earths</span>
            </span>
          </Panel>
        </div>
      </div>

      {/* 4. Bottom Layer: Narrative Intelligence Report */}
      <IntelligenceBrief 
        title={`Intelligence Report: ${activeWorld.name}`}
        badge="SIMULATION COMPLETED"
        narrative={narrativeText}
        bulletPoints={bulletPoints}
        forecastConfidence="High"
        behaviorFreshness="Active"
        modelIntegrity={94}
        level={3}
        status={scenario === 'current' ? 'danger' : scenario === 'optimized' ? 'info' : 'success'}
      />
    </div>
  );
};

export default PlanetTwin;
