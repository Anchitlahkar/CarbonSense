import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface TrendIndicatorProps {
  value: number;
  isGood: boolean;
  label?: string;
  className?: string;
}

export const TrendIndicator: React.FC<TrendIndicatorProps> = ({
  value,
  isGood,
  label,
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center space-x-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium ${
        isGood
          ? 'bg-accent-green/5 border border-accent-green/10 text-accent-green'
          : 'bg-accent-red/5 border border-accent-red/10 text-accent-red'
      } ${className}`}
    >
      {isGood ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
      <span>
        {Math.abs(value) > 0 ? `${value > 0 ? '+' : ''}${value}%` : `${value}%`}
      </span>
      {label && <span className="opacity-60 ml-0.5 font-sans font-normal uppercase text-[9px]">{label}</span>}
    </div>
  );
};

export default TrendIndicator;
