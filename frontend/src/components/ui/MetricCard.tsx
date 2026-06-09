import React from 'react';
import { Panel } from './Panel';

interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  unit?: string;
  subtext?: string;
  level?: 1 | 2 | 3 | 4;
  compact?: boolean;
  status?: 'success' | 'warning' | 'danger' | 'info' | null;
  trend?: {
    value: number;
    isGood: boolean;
    label?: string;
  };
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  subtext,
  level = 2,
  compact = false,
  status = null,
  trend,
  className = '',
  ...props
}) => {
  return (
    <Panel
      level={level}
      compact={compact}
      status={status}
      className={`flex flex-col justify-between ${className}`}
      {...props}
    >
      <div className="flex flex-col">
        <span className="text-[9px] font-bold tracking-widest text-text-muted uppercase font-display">{title}</span>
        <div className="flex items-baseline mt-1 space-x-1">
          <span className={`${compact ? 'text-xl' : 'text-2xl'} font-bold font-mono text-text-primary tracking-tighter`}>{value}</span>
          {unit && <span className="text-[9px] text-text-muted font-mono ml-0.5 opacity-70">{unit}</span>}
        </div>
      </div>
      {(subtext || trend) && (
        <div className="flex items-center justify-between mt-2 text-[9px] w-full border-t border-white/[0.04] pt-1.5 font-mono">
          {subtext && <span className="text-text-subtle truncate max-w-[65%]">{subtext}</span>}
          {trend && (
            <span
              className={`font-bold shrink-0 ${
                trend.isGood ? 'text-accent-green' : 'text-accent-red'
              }`}
            >
              {trend.value > 0 ? `+${trend.value}%` : `${trend.value}%`}
            </span>
          )}
        </div>
      )}
    </Panel>
  );
};

export default MetricCard;
