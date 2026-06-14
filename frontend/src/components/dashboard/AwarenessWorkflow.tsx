import React from 'react';
import { Search, Activity, BarChart3, TrendingDown, CheckCircle2 } from 'lucide-react';
import { Panel } from '../ui';

/**
 * AwarenessWorkflow
 * 
 * Displays the 5-step CarbonSense workflow to improve footprint awareness.
 */
export const AwarenessWorkflow: React.FC = () => {
  const steps = [
    { icon: <Search size={18} />, title: "Measure", desc: "Receipt Intelligence & Activity Logs", color: "text-accent-blue" },
    { icon: <Activity size={18} />, title: "Understand", desc: "Behavior Engine & Carbon DNA", color: "text-accent-green" },
    { icon: <BarChart3 size={18} />, title: "Forecast", desc: "AI-Powered Trajectory Simulation", color: "text-accent-amber" },
    { icon: <TrendingDown size={18} />, title: "Reduce", desc: "MCDA Optimization Roadmap", color: "text-accent-red" },
    { icon: <CheckCircle2 size={18} />, title: "Track", desc: "Real-time Planet Twin Alignment", color: "text-text-primary" }
  ];

  return (
    <Panel level={3} className="bg-bg-card/20 p-6 md:p-8 border-accent-blue/5">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-[18px] md:text-[22px] font-display font-black text-text-primary uppercase tracking-widest">
            How CarbonSense Improves Carbon Footprint Awareness
          </h3>
          <p className="text-[14px] text-text-muted max-w-2xl mx-auto font-body">
            We bridge the gap between raw activity and climate awareness through five specialized intelligence engines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3" role="list">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              role="listitem"
              className="flex flex-col items-center text-center space-y-3 p-5 bg-white/[0.02] border border-white/[0.04] rounded-sm group hover:border-white/[0.1] hover:bg-white/[0.04] transition-all"
            >
              <div 
                className={`${step.color} p-2.5 bg-white/[0.05] rounded-full group-hover:scale-110 transition-transform shadow-inner`}
                aria-hidden="true"
              >
                {step.icon}
              </div>
              <div className="space-y-1">
                <h4 className="text-[13px] font-mono font-black uppercase tracking-wider text-text-primary">
                  {step.title}
                </h4>
                <p className="text-[11px] text-text-muted leading-tight font-medium">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
};
