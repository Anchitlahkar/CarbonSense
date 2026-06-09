import React from 'react';
import { Panel } from './Panel';
import { TrendingDown, Info } from 'lucide-react';

export interface ForecastPeriod {
  label: string; // e.g. "30d Horizon", "90d Horizon", "365d Horizon"
  baselineKg: number;
  momentumKg: number;
  optimizedKg: number;
  confidence: number; // e.g. 0.85
}

interface ForecastStripProps extends React.HTMLAttributes<HTMLDivElement> {
  periods: ForecastPeriod[];
  level?: 1 | 2 | 3 | 4;
}

export const ForecastStrip: React.FC<ForecastStripProps> = ({
  periods,
  level = 3,
  className = '',
  ...props
}) => {
  return (
    <Panel level={level} className={`w-full ${className}`} {...props}>
      <div className="flex items-center space-x-1.5 mb-2">
        <TrendingDown className="w-3.5 h-3.5 text-accent-green" />
        <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider font-display">
          Multi-Horizon Momentum Forecast
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {periods.map((period, index) => {
          const savingsPercent = Math.max(0, Math.round(((period.momentumKg - period.optimizedKg) / (period.momentumKg || 1)) * 100));
          return (
            <div 
              key={index}
              className="bg-bg-card/50 border border-white/[0.04] rounded p-2 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-[9px] uppercase font-mono tracking-tight text-text-subtle">
                <span>{period.label}</span>
                <span className="text-accent-blue font-bold">Conf: {Math.round(period.confidence * 100)}%</span>
              </div>

              <div className="flex items-baseline space-x-2 my-1.5">
                <span className="text-lg font-bold font-mono text-text-primary tracking-tight">
                  {Math.round(period.optimizedKg)}
                </span>
                <span className="text-[9px] font-mono text-text-muted">kg CO₂e</span>
                {savingsPercent > 0 && (
                  <span className="text-[9px] font-mono text-accent-green bg-accent-green/10 px-1 rounded ml-auto">
                    -{savingsPercent}% path
                  </span>
                )}
              </div>

              {/* Stacked pathway indicators */}
              <div className="space-y-1 text-[9px] font-mono border-t border-white/[0.03] pt-1 mt-1">
                <div className="flex justify-between">
                  <span className="text-text-subtle">Baseline:</span>
                  <span className="text-text-muted">{Math.round(period.baselineKg)} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-subtle">Momentum:</span>
                  <span className="text-text-muted">{Math.round(period.momentumKg)} kg</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-accent-green">Optimized:</span>
                  <span className="text-accent-green">{Math.round(period.optimizedKg)} kg</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
};

export default ForecastStrip;
