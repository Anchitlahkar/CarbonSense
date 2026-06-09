import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCarbonStore from '../store/carbonStore';
import { 
  Panel, 
  SectionHeader, 
  Skeleton, 
  PanelError,
  IntelligenceBrief,
  MetricCard
} from '../components/ui';
import { 
  Activity, 
  ChevronRight, 
  ShieldAlert,
  Sliders,
  Database,
  ShieldCheck,
  TrendingDown
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
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

  // Loading skeleton matching dense layout structure
  if (isLoading) {
    return (
      <div className="space-y-4 max-w-6xl mx-auto font-body">
        <div className="flex justify-between items-center pb-2 border-b border-white/[0.06]">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-6 w-24" />
        </div>
        
        {/* Top layer skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Skeleton className="h-32 lg:col-span-2" />
          <Skeleton className="h-32" />
        </div>

        {/* Mid layer skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-44" />
          <Skeleton className="h-44" />
          <Skeleton className="h-44" />
        </div>

        {/* Bottom layer skeleton */}
        <Skeleton className="h-56 w-full" />
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

  if (!carbonDNAProfile || !planetTwinProfile || !behaviorProfile || !optimizationPlan) {
    return (
      <div className="max-w-md mx-auto text-center py-12 space-y-4">
        <ShieldAlert size={40} className="mx-auto text-accent-amber" />
        <h3 className="text-xs font-bold font-display uppercase tracking-wider text-text-primary">TELEMETRY OFFLINE</h3>
        <p className="text-[11px] text-text-muted">
          Your environmental intelligence indices have not been synthesized. Initialize the engines to retrieve profile parameters.
        </p>
        <button
          onClick={fetchContext}
          className="px-3 py-1.5 rounded bg-accent-green text-bg-primary text-xs font-mono font-bold uppercase"
        >
          Initialize Telemetry Engine
        </button>
      </div>
    );
  }

  // Synthesize brief details dynamically from internal engines
  const username = user?.username || 'Executive';
  const evolution = carbonDNAProfile.evolution;
  const currentEmissionsMean = behaviorProfile.featureVector.dailyEmissionsMean;
  const topCandidate = optimizationPlan.candidates[0];

  const confidenceLabel = 
    carbonDNAProfile.archetypeConfidence > 80 ? 'High' : 
    carbonDNAProfile.archetypeConfidence > 60 ? 'Medium' : 'Low';

  const dynamicBriefText = `Good evening, ${username}. Your emissions trend improved ${Math.abs(evolution.projected30dChangePercent).toFixed(1)}% this week. Activity in '${behaviorProfile.classification.replace(/Heavy/g, ' heavy')}' sectors remains your largest carbon contributor. Implementing your top optimization action '${topCandidate?.title || 'lifestyle optimization'}' is projected to offset annual footprint by ${Math.round((topCandidate?.estimatedSavingsKg || 50) * 12)}kg CO₂e. Current forecast confidence: ${confidenceLabel}.`;

  const dynamicBullets = [
    `Carbon DNA Archetype classified as: ${carbonDNAProfile.archetype.replace(/([A-Z])/g, ' $1').trim()}`,
    `Highest savings impact available: -${topCandidate?.estimatedSavingsKg || 0} kg CO₂e / mo`,
    `Forecast momentum shows a target 90-day trajectory of ${Math.round(planetTwinProfile.currentWorld.trajectory.cumulative90DayKg)} kg CO₂e`
  ];

  // Map category metrics to compute ratio styles
  const categoryRatios = [
    { label: 'Transport', ratio: behaviorProfile.featureVector.transportRatio, color: 'bg-accent-blue' },
    { label: 'Food', ratio: behaviorProfile.featureVector.foodRatio, color: 'bg-accent-green' },
    { label: 'Energy', ratio: behaviorProfile.featureVector.energyRatio, color: 'bg-accent-amber' },
    { label: 'Shopping', ratio: behaviorProfile.featureVector.shoppingRatio, color: 'bg-accent-red' }
  ].sort((a, b) => b.ratio - a.ratio);

  return (
    <div className="max-w-7xl mx-auto space-y-2.5 font-body">
      {/* 1. Cockpit Header */}
      <SectionHeader 
        title="MISSION CONTROL" 
        description="Executive intelligence cockpit synthesizing real-time footprint, forecast divergence, and behavioral DNA metrics."
        actions={
          <div className="flex items-center space-x-2 text-[7.5px] font-mono text-text-muted/60">
            <span className="w-1 h-1 rounded-full bg-accent-green animate-pulse" />
            <span className="uppercase tracking-[0.2em] font-bold">Telemetry: Active</span>
          </div>
        }
      />

      {/* 2. Top Layer: Executive Briefing & Mission-Critical Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5">
        {/* Daily Intelligence Brief (Required) */}
        <div className="lg:col-span-8">
          <IntelligenceBrief 
            title="Intelligence Briefing"
            badge="Engine v1.6-X"
            narrative={dynamicBriefText}
            bulletPoints={dynamicBullets}
            forecastConfidence={confidenceLabel as 'High' | 'Medium' | 'Low'}
            behaviorFreshness="SYNCED 2M AGO"
            modelIntegrity={planetTwinProfile.currentWorld.healthIndex.score}
            level={1}
            status="info"
            className="h-full"
          />
        </div>

        {/* Planet Health Index Metric Card */}
        <div className="lg:col-span-4 grid grid-cols-1 gap-2">
          <MetricCard 
            title="Planet Health Index"
            value={planetTwinProfile.currentWorld.healthIndex.score}
            unit="/ 100"
            subtext="Trajectory simulation"
            level={1}
            status={planetTwinProfile.currentWorld.healthIndex.score > 60 ? 'success' : 'warning'}
            trend={{
              value: Math.round(planetTwinProfile.currentWorld.healthIndex.score - 50),
              isGood: planetTwinProfile.currentWorld.healthIndex.score > 50,
            }}
            compact
          />
          <MetricCard 
            title="30-Day Forecast"
            value={planetTwinProfile.currentWorld.trajectory.cumulative30DayKg}
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

      {/* 3. Middle Layer: Emissions Breakdown, DNA Genome, and Forecast Momentum */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
        {/* Current Emissions breakdown */}
        <Panel level={2} compact className="flex flex-col justify-between min-h-[160px]">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-1.5">
              <span className="text-[8px] font-bold text-text-muted/60 font-mono tracking-[0.2em] uppercase">Telemetry Ratios</span>
              <Sliders className="w-2.5 h-2.5 text-text-muted/40" />
            </div>
            
            <div className="space-y-1.5">
              {categoryRatios.map((cat, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex justify-between text-[7.5px] font-mono tracking-tight">
                    <span className="text-text-primary/80 uppercase font-bold">{cat.label}</span>
                    <span className="text-text-muted/60">{(cat.ratio * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-0.5 bg-white/[0.02] rounded-full overflow-hidden">
                    <div className={`h-full ${cat.color} rounded-full opacity-80`} style={{ width: `${cat.ratio * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[7.5px] text-text-muted/40 font-mono pt-1.5 border-t border-white/[0.03] flex justify-between items-center mt-2 uppercase tracking-tighter">
            <span>Mean: <strong className="text-text-primary/60">{currentEmissionsMean.toFixed(1)} kg/d</strong></span>
            <button onClick={() => navigate('/twin')} className="text-accent-blue/60 hover:text-accent-blue transition-colors flex items-center font-bold">
              <span>SIMULATION</span>
              <ChevronRight size={8} />
            </button>
          </div>
        </Panel>

        {/* Carbon DNA snapshot */}
        <Panel level={2} compact className="flex flex-col justify-between min-h-[160px]">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-1.5">
              <span className="text-[8px] font-bold text-text-muted/60 font-mono tracking-[0.2em] uppercase">DNA Genome</span>
              <Activity className="w-2.5 h-2.5 text-text-muted/40" />
            </div>
            
            <div className="p-1.5 bg-bg-card border border-white/[0.03] rounded-sm">
              <span className="text-[7.5px] font-mono text-text-muted/40 block uppercase tracking-widest">Archetype Classification</span>
              <span className="text-[10px] font-bold text-text-primary block tracking-wider uppercase mt-0.5 truncate">
                {carbonDNAProfile.archetype.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[7.5px] font-mono tracking-tighter">
                <span className="text-text-muted/50 uppercase">Volatility</span>
                <span className="text-text-primary/70">{carbonDNAProfile.dimensions.behaviorVolatility}%</span>
              </div>
              <div className="h-0.5 bg-white/[0.02] rounded-full overflow-hidden">
                <div className="h-full bg-accent-amber opacity-80" style={{ width: `${carbonDNAProfile.dimensions.behaviorVolatility}%` }} />
              </div>

              <div className="flex justify-between text-[7.5px] font-mono tracking-tighter">
                <span className="text-text-muted/50 uppercase">Readiness</span>
                <span className="text-text-primary/70">{carbonDNAProfile.dimensions.optimizationReadiness}%</span>
              </div>
              <div className="h-0.5 bg-white/[0.02] rounded-full overflow-hidden">
                <div className="h-full bg-accent-green opacity-80" style={{ width: `${carbonDNAProfile.dimensions.optimizationReadiness}%` }} />
              </div>
            </div>
          </div>
          <button 
            onClick={() => navigate('/dna')} 
            className="w-full text-center text-[8px] font-mono font-black text-text-primary/60 hover:text-text-primary bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] rounded-sm py-1 transition-all mt-2 uppercase tracking-[0.1em]"
          >
            Open DNA Profile
          </button>
        </Panel>

        {/* Forecast Momentum preview */}
        <Panel level={2} compact className="flex flex-col justify-between min-h-[160px]">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-1.5">
              <span className="text-[8px] font-bold text-text-muted/60 font-mono tracking-[0.2em] uppercase">Momentum</span>
              <TrendingDown className="w-2.5 h-2.5 text-text-muted/40" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-[8px] font-mono">
                <span className="text-text-muted/50 uppercase tracking-tighter">Baseline (365d):</span>
                <span className="text-text-primary/80 font-bold">{Math.round(planetTwinProfile.currentWorld.trajectory.annualEmissionsKg)} kg</span>
              </div>
              <div className="flex items-center justify-between text-[8px] font-mono">
                <span className="text-accent-green/60 uppercase tracking-tighter font-bold">Optimized:</span>
                <span className="text-accent-green font-bold">{Math.round(planetTwinProfile.optimizedWorld.trajectory.annualEmissionsKg)} kg</span>
              </div>
              <div className="flex items-center justify-between text-[8px] font-mono border-t border-white/[0.02] pt-1 mt-1">
                <span className="text-text-muted/40 uppercase tracking-tighter">Net Divergence:</span>
                <span className="text-accent-green font-bold">
                  -{Math.round(planetTwinProfile.currentWorld.trajectory.annualEmissionsKg - planetTwinProfile.optimizedWorld.trajectory.annualEmissionsKg)} kg
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => navigate('/forecasts')} 
            className="w-full text-center text-[8px] font-mono font-black text-text-primary/60 hover:text-text-primary bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] rounded-sm py-1 transition-all mt-2 uppercase tracking-[0.1em]"
          >
            Analyze Trajectories
          </button>
        </Panel>
      </div>

      {/* 4. Bottom Layer: Telemetry Signals, Priority Actions Grid (MCDA) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5">
        {/* Telemetry Signals */}
        <div className="lg:col-span-4">
          <Panel level={3} compact className="space-y-2 h-full min-h-[180px]">
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-1">
              <span className="text-[8px] font-bold text-text-muted/60 font-mono tracking-[0.2em] uppercase">Signals</span>
              <Database className="w-2.5 h-2.5 text-text-muted/40" />
            </div>

            <div className="space-y-1 max-h-[140px] overflow-y-auto pr-1 scrollbar-thin">
              {behaviorProfile.signals.map((sig, idx) => (
                <div key={idx} className="p-1 bg-white/[0.01] border border-white/[0.03] rounded-sm flex flex-col space-y-0.5">
                  <div className="flex justify-between items-center text-[6.5px] font-mono">
                    <span className="text-accent-blue/70 font-bold tracking-widest uppercase">[{sig.type}]</span>
                    <span className="text-text-muted/30 font-bold tracking-tighter">CONF: {Math.round(sig.confidence * 100)}%</span>
                  </div>
                  <p className="text-[8.5px] font-bold text-text-primary/70 leading-tight truncate">{sig.description}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Priority Actions Grid - Decision Impact Previews */}
        <div className="lg:col-span-8">
          <Panel level={3} compact className="space-y-2 h-full min-h-[180px]">
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-1">
              <span className="text-[8px] font-bold text-text-muted/60 font-mono tracking-[0.2em] uppercase">Impact Previews</span>
              <span className="text-[7px] font-mono text-text-muted/30 uppercase tracking-[0.15em] font-bold">MCDA Optimization Ranking</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {optimizationPlan.candidates.slice(0, 4).map((cand, idx) => {
                const annualSavings = Math.round(cand.estimatedSavingsKg * 12);
                return (
                  <div 
                    key={idx} 
                    className="p-1.5 bg-bg-card/30 border border-white/[0.03] rounded-sm flex flex-col justify-between space-y-1.5 hover:border-white/[0.08] transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[6.5px] font-mono bg-white/[0.03] border border-white/[0.06] px-1 rounded-sm text-text-muted/50 uppercase tracking-tighter font-bold">
                        Rank #{cand.rank}
                      </span>
                      <span className={`text-[6.5px] font-mono font-black uppercase tracking-[0.05em] ${
                        cand.difficultyLevel === 'easy' ? 'text-accent-green/70' : 'text-accent-amber/70'
                      }`}>
                        {cand.difficultyLevel}
                      </span>
                    </div>
                    <h4 className="text-[9.5px] font-bold text-text-primary/90 tracking-tight truncate group-hover:text-text-primary transition-colors">
                      {cand.title}
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/[0.02] text-[7.5px] font-mono tracking-tighter uppercase font-bold">
                      <div>
                        <span className="text-text-muted/30 block">Monthly</span>
                        <span className="text-accent-green/80">-{Math.round(cand.estimatedSavingsKg)}kg</span>
                      </div>
                      <div>
                        <span className="text-text-muted/30 block">Annual</span>
                        <span className="text-accent-green/80">-{annualSavings}kg</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>
      </div>

      {/* 5. Telemetry Logs Metadata (System Telemetry Panel) */}
      <Panel level={4} compact className="flex items-center justify-between text-[7px] font-mono text-text-muted/40 py-1.5 px-3 uppercase tracking-[0.1em]">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-2.5 h-2.5 text-accent-green opacity-60" />
            <span className="font-black text-text-primary/60 tracking-[0.2em]">Audit: Pass</span>
          </div>
          <div className="hidden sm:flex items-center space-x-3 border-l border-white/[0.03] pl-3">
            <span>Confidence: <strong className="text-accent-green/60">94%</strong></span>
            <span>Integrity: <strong className="text-accent-blue/60">100</strong></span>
            <span>Logic: <strong>1.5-X</strong></span>
          </div>
        </div>
        <div className="tracking-[0.3em] font-black opacity-30 text-[6.5px]">
          TERMINAL_SYNX_COCKPIT_V1.0
        </div>
      </Panel>
    </div>
  );
};

export default Dashboard;
