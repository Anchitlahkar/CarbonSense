import React from 'react';
import { Database } from 'lucide-react';
import { BehaviorProfile, OptimizationPlan } from '@carbonsense/shared-types';
import { Panel } from '../ui';

interface TelemetryGridProps {
  behaviorProfile: BehaviorProfile;
  optimizationPlan: OptimizationPlan;
}

/**
 * TelemetryGrid
 * 
 * Displays telemetry signals and priority optimization action impact previews.
 */
export const TelemetryGrid: React.FC<TelemetryGridProps> = ({
  behaviorProfile,
  optimizationPlan
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
      {/* Telemetry Signals */}
      <div className="lg:col-span-4">
        <Panel level={3} compact className="space-y-3 h-full min-h-[200px] p-4">
          <div className="flex items-center justify-between border-b border-white/[0.04] pb-2">
            <span className="text-[14px] font-bold text-text-muted/60 font-mono tracking-[0.2em] uppercase">Signals</span>
            <Database className="w-4 h-4 text-text-muted/40" aria-hidden="true" />
          </div>

          <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1 scrollbar-thin">
            {behaviorProfile.signals.map((sig, idx) => (
              <div key={idx} className="p-2 bg-white/[0.01] border border-white/[0.03] rounded-sm flex flex-col space-y-1">
                <div className="flex justify-between items-center text-[12px] font-mono">
                  <span className="text-accent-blue/70 font-bold tracking-widest uppercase">[{sig.type}]</span>
                  <span className="text-text-muted/30 font-bold tracking-tighter">CONF: {Math.round(sig.confidence * 100)}%</span>
                </div>
                <p className="text-[16px] font-bold text-text-primary/70 leading-tight truncate">{sig.description}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Priority Actions Grid - Decision Impact Previews */}
      <div className="lg:col-span-8">
        <Panel level={3} compact className="space-y-3 h-full min-h-[200px] p-4">
          <div className="flex items-center justify-between border-b border-white/[0.04] pb-2">
            <span className="text-[14px] font-bold text-text-muted/60 font-mono tracking-[0.2em] uppercase">Impact Previews</span>
            <span className="text-[12px] font-mono text-text-muted/30 uppercase tracking-[0.15em] font-bold">MCDA Optimization Ranking</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {optimizationPlan.candidates.slice(0, 4).map((cand, idx) => {
              const annualSavings = Math.round(cand.estimatedSavingsKg * 12);
              return (
                <div 
                  key={idx} 
                  className="p-3 bg-bg-card/30 border border-white/[0.03] rounded-sm flex flex-col justify-between space-y-2 hover:border-white/[0.08] transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-mono bg-white/[0.03] border border-white/[0.06] px-1.5 py-0.5 rounded-sm text-text-muted/50 uppercase tracking-tighter font-bold">
                      Rank #{cand.rank}
                    </span>
                    <span className={`text-[12px] font-mono font-black uppercase tracking-[0.05em] ${
                      cand.difficultyLevel === 'easy' ? 'text-accent-green/70' : 'text-accent-amber/70'
                    }`}>
                      {cand.difficultyLevel}
                    </span>
                  </div>
                  <h4 className="text-[16px] font-bold text-text-primary/90 tracking-tight truncate group-hover:text-text-primary transition-colors">
                    {cand.title}
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-2 pt-1.5 border-t border-white/[0.02] text-[12px] font-mono tracking-tighter uppercase font-bold">
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
  );
};
