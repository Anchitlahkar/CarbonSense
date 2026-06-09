import React from 'react';
import { Panel } from './Panel';
import { Sparkles, BarChart2, CheckCircle2 } from 'lucide-react';

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
    // Regex to match percentages, numbers with units (e.g. 180kg CO2e, 8,700 vehicle km) or specific target keywords
    const keywords = /(improved \d+%\s*(?:this\s+week)?|\d+%\s*reduction|\d+\s*kg\s*CO₂e|\d+,\d+\s*vehicle\s*km|Transportation|Food|Energy|Shopping|High|Medium|Low|daily\s+emissions|optimization\s+pathway|aggressive\s+pathway)/gi;
    
    if (!text) return '';
    const parts = text.split(keywords);
    
    return parts.map((part, index) => {
      if (part.match(keywords)) {
        return (
          <span key={index} className="text-white font-medium bg-white/5 px-1 py-0.5 rounded border border-white/10 font-mono text-[11px]">
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
        <div className="flex items-center justify-between border-b border-white/[0.04] pb-2 mb-3">
          <div className="flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent-blue" />
            <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider font-display">
              {title}
            </h3>
          </div>
          {badge && (
            <span className="text-[9px] font-mono bg-accent-blue/10 border border-accent-blue/20 text-accent-blue px-1.5 py-0.5 rounded uppercase font-bold tracking-tight">
              {badge}
            </span>
          )}
        </div>

        {/* Narrative Paragraph */}
        <p className="text-xs text-text-muted leading-relaxed font-body font-normal">
          {renderFormattedNarrative(narrative)}
        </p>

        {/* Bullet Points */}
        {bulletPoints.length > 0 && (
          <ul className="mt-3 space-y-1.5 border-t border-white/[0.04] pt-2.5">
            {bulletPoints.map((point, idx) => (
              <li key={idx} className="flex items-start text-[11px] text-text-subtle font-body">
                <span className="inline-block w-1 h-1 rounded-full bg-accent-blue mt-1.5 mr-2 shrink-0" />
                <span className="leading-tight">{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Telemetry Footer */}
      {(forecastConfidence || behaviorFreshness || modelIntegrity !== undefined) && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-4 pt-2 border-t border-white/[0.04] text-[10px] text-text-subtle font-mono">
          {forecastConfidence && (
            <div className="flex items-center space-x-1">
              <span>Confidence:</span>
              <span className={`font-semibold ${
                forecastConfidence === 'High' ? 'text-accent-green' :
                forecastConfidence === 'Medium' ? 'text-accent-amber' :
                'text-accent-red'
              }`}>{forecastConfidence}</span>
            </div>
          )}

          {behaviorFreshness && (
            <div className="flex items-center space-x-1 border-l border-white/10 pl-4">
              <span>Freshness:</span>
              <span className="text-text-primary">{behaviorFreshness}</span>
            </div>
          )}

          {modelIntegrity !== undefined && (
            <div className="flex items-center space-x-1 border-l border-white/10 pl-4">
              <span>Integrity:</span>
              <span className="text-accent-blue font-bold">{modelIntegrity}%</span>
            </div>
          )}
        </div>
      )}
    </Panel>
  );
};

export default IntelligenceBrief;
