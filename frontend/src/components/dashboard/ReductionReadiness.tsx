import React from 'react';
import { TrendingDown } from 'lucide-react';
import { Panel } from '../ui';

interface ReductionReadinessProps {
  reductionPercent: number;
  reductionPotential: number;
  annualKg: number;
}

/**
 * ReductionReadiness
 * 
 * Displays the carbon reduction potential and forecast gap analysis.
 */
export const ReductionReadiness: React.FC<ReductionReadinessProps> = ({
  reductionPercent,
  reductionPotential,
  annualKg
}) => {
  return (
    <Panel level={2} className="p-5 space-y-5">
      <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
        <div className="flex items-center space-x-2">
          <TrendingDown className="text-accent-green" size={18} aria-hidden="true" />
          <h3 className="text-[16px] font-bold text-text-primary uppercase tracking-widest font-display">
            Reduction Readiness
          </h3>
        </div>
        <span className="text-[10px] font-mono text-text-muted/40 uppercase font-bold tracking-widest">Forecast Gap</span>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center bg-bg-card/40 p-4 rounded-sm border border-white/[0.03]">
          <div>
            <span className="text-[11px] font-mono text-text-muted uppercase tracking-widest font-bold">Reduction Potential</span>
            <div className="text-[24px] font-black text-accent-green font-mono leading-tight">-{reductionPercent}%</div>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-mono text-text-muted uppercase tracking-widest font-bold">Annual Gap</span>
            <div className="text-[24px] font-black text-text-primary font-mono leading-tight">{Math.round(reductionPotential)} kg</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-[12px] font-mono font-bold uppercase tracking-tighter">
            <span className="text-text-muted opacity-60">Current Trajectory</span>
            <span className="text-accent-green">Optimized Target</span>
          </div>
          <div className="relative h-6 bg-white/[0.04] rounded-sm overflow-hidden border border-white/[0.06] shadow-inner">
            <div 
              className="absolute top-0 left-0 h-full bg-accent-green/20 border-r border-accent-green/50 transition-all duration-1000"
              role="progressbar"
              aria-valuenow={100 - reductionPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuetext={`${100 - reductionPercent}% of current trajectory`}
              style={{ width: `${100 - reductionPercent}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-between px-3 text-[10px] font-mono font-black uppercase pointer-events-none tracking-tighter">
              <span className="text-text-primary">{annualKg.toLocaleString()} kg</span>
              <span className="text-accent-green">{(annualKg - reductionPotential).toLocaleString()} kg</span>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
};
