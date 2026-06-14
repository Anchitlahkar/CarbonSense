import React from 'react';
import { Wind } from 'lucide-react';

interface AwarenessInsightsProps {
  earths: number;
  primaryRatio: number;
  primaryCategory: string;
}

/**
 * AwarenessInsights
 * 
 * Displays the Earth Overshoot Index and emission dominance insights.
 */
export const AwarenessInsights: React.FC<AwarenessInsightsProps> = ({
  earths,
  primaryRatio,
  primaryCategory
}) => {
  return (
    <div className="lg:col-span-5 flex flex-col justify-center lg:border-l lg:border-white/[0.04] lg:pl-8">
      <div className="space-y-4">
        <h4 className="text-[12px] font-mono font-black text-text-muted/60 uppercase tracking-widest flex items-center justify-between">
          <span>Awareness Insights</span>
          <Wind size={14} className="opacity-40" aria-hidden="true" />
        </h4>
        <div className="space-y-6">
          <div className="space-y-2.5" role="group" aria-label="Earth Overshoot Progress">
            <div className="flex justify-between items-end">
              <span className="text-[14px] font-bold text-text-primary uppercase tracking-tight">Earth Overshoot Index</span>
              <span className="text-[24px] font-black text-accent-red font-mono leading-none">{earths.toFixed(1)}</span>
            </div>
            <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden border border-white/[0.02]">
              <div 
                className="h-full bg-accent-red rounded-full transition-all duration-1000" 
                role="progressbar"
                aria-valuenow={Math.min(earths * 20, 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuetext={`${earths.toFixed(1)} planets`}
                style={{ width: `${Math.min(earths * 20, 100)}%` }} 
              />
            </div>
            <p className="text-[13px] text-text-muted italic bg-accent-red/5 p-2 rounded-sm border border-accent-red/10">
              "If everyone lived like you, Earth would require <strong className="text-accent-red font-bold">{earths.toFixed(1)} planets</strong> to sustain humanity."
            </p>
          </div>
          
          <div className="p-3 bg-accent-blue/5 border border-accent-blue/10 rounded-sm space-y-1">
            <div className="flex justify-between text-[14px] font-mono">
              <span className="text-accent-blue/80 font-bold uppercase tracking-tighter">Emission Dominance</span>
              <span className="text-text-primary font-bold">{Math.round(primaryRatio * 100)}%</span>
            </div>
            <p className="text-[13px] text-text-muted font-body">
              <strong className="text-text-primary uppercase tracking-tighter font-bold">{primaryCategory}</strong> contributes the largest portion of your footprint.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
