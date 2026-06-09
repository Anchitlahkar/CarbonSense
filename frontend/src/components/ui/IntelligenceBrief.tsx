import React from 'react';
import { Panel } from './Panel';
import { Sparkles } from 'lucide-react';

interface IntelligenceBriefProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  badge?: string;
  narrative: string;
  bulletPoints?: string[];
  forecastConfidence?: 'Low' | 'Medium' | 'High';
  behaviorFreshness?: string;
  modelIntegrity?: number;
  level?: 1 | 2 | 3 | 4;
  status?: 'success' | 'warning' | 'danger' | 'info' | null;
}

export const IntelligenceBrief: React.FC<IntelligenceBriefProps> = ({
  title = "Intelligence Briefing",
  badge,
  narrative,
  bulletPoints = [],
  forecastConfidence,
  behaviorFreshness,
  modelIntegrity,
  level = 1,
  status = 'info',
  className = '',
  ...props
}) => {
  // Highlights text like "6% this week" or "Transportation" or "transit"
  const renderFormattedNarrative = (text: string) => {
    const keywords = /(improved \d+%\s*(?:this\s+week)?|\d+%\s*reduction|\d+\s*kg\s*CO₂e|\d+,\d+\s*vehicle\s*km|Transportation|Food|Energy|Shopping|High|Medium|Low|daily\s+emissions|optimization\s+pathway|aggressive\s+pathway)/gi;
    
    if (!text) return '';
    const parts = text.split(keywords);
    
    return parts.map((part, index) => {
      if (part.match(keywords)) {
        return (
          <span key={index} className="text-text-primary font-semibold bg-white/5 px-1 py-0.5 rounded-sm border border-white/5 font-mono text-[10px] tracking-tight">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <Panel level={level} status={status} className={`relative flex flex-col justify-between ${className}`} {...props}>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.04] pb-1.5 mb-2.5">
          <div className="flex items-center space-x-1.5">
            <Sparkles className="w-3 h-3 text-accent-blue" />
            <h3 className="text-[10px] font-bold text-text-primary uppercase tracking-widest font-display">
              {title}
            </h3>
          </div>
          {badge && (
            <span className="text-[8px] font-mono bg-accent-blue/5 border border-accent-blue/20 text-accent-blue/80 px-1.5 py-0.5 rounded-sm uppercase font-bold tracking-tighter">
              {badge}
            </span>
          )}
        </div>

        {/* Narrative Paragraph */}
        <p className="text-[11px] text-text-muted/90 leading-relaxed font-body font-normal">
          {renderFormattedNarrative(narrative)}
        </p>

        {/* Bullet Points */}
        {bulletPoints.length > 0 && (
          <ul className="mt-2.5 space-y-1.5 border-t border-white/[0.03] pt-2">
            {bulletPoints.map((point, idx) => (
              <li key={idx} className="flex items-start text-[10px] text-text-muted font-body">
                <span className="inline-block w-1 h-1 rounded-full bg-accent-blue/60 mt-1.5 mr-2 shrink-0" />
                <span className="leading-snug">{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Telemetry Footer */}
      {(forecastConfidence || behaviorFreshness || modelIntegrity !== undefined) && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-3 pt-2 border-t border-white/[0.04] text-[9px] text-text-subtle font-mono uppercase tracking-tight">
          {forecastConfidence && (
            <div className="flex items-center space-x-1">
              <span className="opacity-60">Confidence:</span>
              <span className={`font-bold ${
                forecastConfidence === 'High' ? 'text-accent-green' :
                forecastConfidence === 'Medium' ? 'text-accent-amber' :
                'text-accent-red'
              }`}>{forecastConfidence}</span>
            </div>
          )}

          {behaviorFreshness && (
            <div className="flex items-center space-x-1 border-l border-white/5 pl-3">
              <span className="opacity-60">Freshness:</span>
              <span className="text-text-primary/70">{behaviorFreshness}</span>
            </div>
          )}

          {modelIntegrity !== undefined && (
            <div className="flex items-center space-x-1 border-l border-white/5 pl-3">
              <span className="opacity-60">Integrity:</span>
              <span className="text-accent-blue font-bold">{modelIntegrity}%</span>
            </div>
          )}
        </div>
      )}
    </Panel>
  );
};

export default IntelligenceBrief;
