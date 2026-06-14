import React from 'react';
import { Globe, Target } from 'lucide-react';

interface AwarenessHeroProps {
  annualTons: string;
  globalAvg: number;
  sustainableTarget: number;
  reductionPercent: number;
  primaryCategory: string;
}

/**
 * AwarenessHero
 * 
 * Displays the high-level carbon footprint summary and benchmark comparisons.
 */
export const AwarenessHero: React.FC<AwarenessHeroProps> = ({
  annualTons,
  globalAvg,
  sustainableTarget,
  reductionPercent,
  primaryCategory
}) => {
  const vsGlobalAvg = ((parseFloat(annualTons) / globalAvg) * 100).toFixed(0);
  const vsSustainable = (parseFloat(annualTons) / sustainableTarget).toFixed(1);

  return (
    <div className="lg:col-span-7 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse" aria-hidden="true" />
          <h2 className="text-[12px] font-mono font-black text-accent-green uppercase tracking-[0.3em]">
            Carbon Awareness Summary
          </h2>
        </div>
        <h3 className="text-[28px] md:text-[36px] font-display font-black text-text-primary uppercase leading-tight tracking-tight">
          Your footprint is <span className="text-accent-red" aria-label={`${annualTons} tons per year`}>{annualTons}t</span> CO₂e / Year
        </h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-sm space-y-2 group hover:border-accent-blue/30 transition-colors">
          <div className="flex items-center space-x-2 text-text-muted">
            <Globe size={14} className="group-hover:text-accent-blue transition-colors" aria-hidden="true" />
            <span className="text-[11px] font-mono uppercase font-bold tracking-wider">vs Global Average</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-[24px] font-bold text-text-primary font-mono">{vsGlobalAvg}%</span>
            <span className="text-[12px] text-text-muted uppercase font-bold tracking-tighter">of Benchmark</span>
          </div>
        </div>
        
        <div className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-sm space-y-2 group hover:border-accent-amber/30 transition-colors">
          <div className="flex items-center space-x-2 text-text-muted">
            <Target size={14} className="group-hover:text-accent-amber transition-colors" aria-hidden="true" />
            <span className="text-[11px] font-mono uppercase font-bold tracking-wider">Sustainable Goal</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-[24px] font-bold text-accent-amber font-mono">{vsSustainable}x</span>
            <span className="text-[12px] text-text-muted uppercase font-bold tracking-tighter">Above Target</span>
          </div>
        </div>
      </div>

      <p className="text-[16px] text-text-muted leading-relaxed max-w-2xl font-body">
        CarbonSense has analyzed your <strong className="text-text-primary font-bold">Carbon DNA</strong> and current behavioral momentum. 
        You are currently emitting <strong className="text-text-primary font-bold">{annualTons} tons</strong> annually. 
        Implementing identified <strong className="text-accent-green font-bold">MCDA optimizations</strong> can reduce this by <strong className="text-accent-green font-bold">{reductionPercent}%</strong>, 
        primarily by targeting <strong className="text-text-primary font-bold">{primaryCategory}</strong> inefficiencies.
      </p>
    </div>
  );
};
