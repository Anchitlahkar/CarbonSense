import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sliders, Activity, TrendingDown, ChevronRight } from 'lucide-react';
import { BehaviorProfile, CarbonDNAProfile, PlanetTwinProfile } from '@carbonsense/shared-types';
import { Panel } from '../ui';

interface InsightsGridProps {
  behaviorProfile: BehaviorProfile;
  carbonDNAProfile: CarbonDNAProfile;
  planetTwinProfile: PlanetTwinProfile;
  categoryRatios: Array<{ label: string, ratio: number, color: string }>;
}

/**
 * InsightsGrid
 * 
 * Displays emissions breakdown, DNA snapshot, and forecast momentum.
 */
export const InsightsGrid: React.FC<InsightsGridProps> = ({
  behaviorProfile,
  carbonDNAProfile,
  planetTwinProfile,
  categoryRatios
}) => {
  const navigate = useNavigate();
  const currentEmissionsMean = behaviorProfile.featureVector.dailyEmissionsMean;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
      {/* Current Emissions breakdown */}
      <Panel level={2} compact className="flex flex-col justify-between min-h-[180px] p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-white/[0.04] pb-2">
            <span className="text-[14px] font-bold text-text-muted/60 font-mono tracking-[0.2em] uppercase">Carbon Contribution Ratios</span>
            <Sliders className="w-4 h-4 text-text-muted/40" aria-hidden="true" />
          </div>
          
          <div className="space-y-2">
            {categoryRatios.map((cat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[14px] font-mono tracking-tight">
                  <span className="text-text-primary/80 uppercase font-bold">{cat.label}</span>
                  <span className="text-text-muted/60">{(cat.ratio * 100).toFixed(0)}%</span>
                </div>
                <div className="h-1 bg-white/[0.02] rounded-full overflow-hidden">
                  <div className={`h-full ${cat.color} rounded-full opacity-80`} style={{ width: `${cat.ratio * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-[12px] text-text-muted/40 font-mono pt-2 border-t border-white/[0.03] flex justify-between items-center mt-3 uppercase tracking-tighter">
          <span>Mean: <strong className="text-text-primary/60">{currentEmissionsMean.toFixed(1)} kg/d</strong></span>
          <button onClick={() => navigate('/twin')} className="text-accent-blue/60 hover:text-accent-blue transition-colors flex items-center font-bold text-[12px] cursor-pointer">
            <span>SIMULATION</span>
            <ChevronRight size={12} aria-hidden="true" />
          </button>
        </div>
      </Panel>

      {/* Carbon DNA snapshot */}
      <Panel level={2} compact className="flex flex-col justify-between min-h-[180px] p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-white/[0.04] pb-2">
            <span className="text-[14px] font-bold text-text-muted/60 font-mono tracking-[0.2em] uppercase">DNA Genome</span>
            <Activity className="w-4 h-4 text-text-muted/40" aria-hidden="true" />
          </div>
          
          <div className="p-2 bg-bg-card border border-white/[0.03] rounded-sm">
            <span className="text-[12px] font-mono text-text-muted/40 block uppercase tracking-widest">Archetype Classification</span>
            <span className="text-[16px] font-bold text-text-primary block tracking-wider uppercase mt-1 truncate">
              {carbonDNAProfile.archetype.replace(/([A-Z])/g, ' $1').trim()}
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between text-[14px] font-mono tracking-tighter">
              <span className="text-text-muted/50 uppercase">Volatility</span>
              <span className="text-text-primary/70">{carbonDNAProfile.dimensions.behaviorVolatility}%</span>
            </div>
            <div className="h-1 bg-white/[0.02] rounded-full overflow-hidden">
              <div className="h-full bg-accent-amber opacity-80" style={{ width: `${carbonDNAProfile.dimensions.behaviorVolatility}%` }} />
            </div>

            <div className="flex justify-between text-[14px] font-mono tracking-tighter">
              <span className="text-text-muted/50 uppercase">Readiness</span>
              <span className="text-text-primary/70">{carbonDNAProfile.dimensions.optimizationReadiness}%</span>
            </div>
            <div className="h-1 bg-white/[0.02] rounded-full overflow-hidden">
              <div className="h-full bg-accent-green opacity-80" style={{ width: `${carbonDNAProfile.dimensions.optimizationReadiness}%` }} />
            </div>
          </div>
        </div>
        <button 
          onClick={() => navigate('/dna')} 
          className="w-full text-center text-[16px] font-mono font-black text-text-primary/60 hover:text-text-primary bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] rounded-sm py-2 transition-all mt-3 uppercase tracking-[0.1em] cursor-pointer"
        >
          Open DNA Profile
        </button>
      </Panel>

      {/* Forecast Momentum preview */}
      <Panel level={2} compact className="flex flex-col justify-between min-h-[180px] p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-white/[0.04] pb-2">
            <span className="text-[14px] font-bold text-text-muted/60 font-mono tracking-[0.2em] uppercase">Momentum</span>
            <TrendingDown className="w-4 h-4 text-text-muted/40" aria-hidden="true" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-[14px] font-mono">
              <span className="text-text-muted/50 uppercase tracking-tighter">Baseline (365d):</span>
              <span className="text-text-primary/80 font-bold">{Math.round(planetTwinProfile.currentWorld.trajectory.annualEmissionsKg)} kg</span>
            </div>
            <div className="flex items-center justify-between text-[14px] font-mono">
              <span className="text-accent-green/60 uppercase tracking-tighter font-bold">Optimized:</span>
              <span className="text-accent-green font-bold">{Math.round(planetTwinProfile.optimizedWorld.trajectory.annualEmissionsKg)} kg</span>
            </div>
            <div className="flex items-center justify-between text-[14px] font-mono border-t border-white/[0.02] pt-1.5 mt-1.5">
              <span className="text-text-muted/40 uppercase tracking-tighter">Net Divergence:</span>
              <span className="text-accent-green font-bold">
                -{Math.round(planetTwinProfile.currentWorld.trajectory.annualEmissionsKg - planetTwinProfile.optimizedWorld.trajectory.annualEmissionsKg)} kg
              </span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => navigate('/forecasts')} 
          className="w-full text-center text-[16px] font-mono font-black text-text-primary/60 hover:text-text-primary bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] rounded-sm py-2 transition-all mt-3 uppercase tracking-[0.1em] cursor-pointer"
        >
          Analyze Trajectories
        </button>
      </Panel>
    </div>
  );
};
