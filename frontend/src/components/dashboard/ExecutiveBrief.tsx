import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OptimizationPlan, PlanetTwinProfile, BehaviorProfile } from '@carbonsense/shared-types';

interface ExecutiveBriefProps {
  username: string;
  planetTwinProfile: PlanetTwinProfile;
  optimizationPlan: OptimizationPlan;
  behaviorProfile: BehaviorProfile;
  getCategoryRatioText: (category: string) => string;
}

/**
 * ExecutiveBrief
 * 
 * Renders the TERRA Executive Brief & Action Center on the dashboard.
 */
export const ExecutiveBrief: React.FC<ExecutiveBriefProps> = ({
  username,
  planetTwinProfile,
  optimizationPlan,
  behaviorProfile,
  getCategoryRatioText
}) => {
  const navigate = useNavigate();
  const topCandidate = optimizationPlan.candidates[0];
  const annualTons = (planetTwinProfile.currentWorld.trajectory.annualEmissionsKg / 1000).toFixed(1);

  return (
    <div className="bg-bg-surface border border-accent-green/20 rounded-sm p-5 md:p-6 shadow-[0_0_50px_-12px_rgba(0,255,135,0.1)] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent-green to-accent-blue" aria-hidden="true" />
      
      <div className="flex items-center justify-between border-b border-white/[0.04] pb-2 mb-4">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" aria-hidden="true" />
          <h2 className="text-[18px] font-mono font-black uppercase tracking-[0.25em] text-accent-green">
            TERRA EXECUTIVE BRIEF
          </h2>
        </div>
        <span className="text-[12px] font-mono text-text-muted/40 uppercase font-bold tracking-widest">
          MCDA RANKING STATUS
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
        <div className="lg:col-span-8 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-[20px] font-bold text-text-primary uppercase tracking-wide">
              Good Evening, {username}.
            </h3>
            <p className="text-[16px] text-text-muted leading-relaxed font-medium">
              Your projected annual footprint is <strong className="text-text-primary">{annualTons} t CO₂e</strong>, 
              with <strong className="text-text-primary">{topCandidate?.category || 'transport'}</strong> contributing 
              <strong className="text-text-primary"> {getCategoryRatioText(topCandidate?.category)}</strong>. 
              TERRA's highest-impact recommendation is to <strong className="text-accent-green">{topCandidate?.title.toLowerCase()}</strong>, 
              which is projected to reduce your footprint by <strong className="text-accent-green">-{Math.round((topCandidate?.estimatedSavingsKg || 23.9) * 12)} kg CO₂e/year</strong> 
              (Confidence: <strong className="text-accent-blue">{topCandidate?.score || 91}%</strong>).
            </p>
          </div>
          
          <div className="text-[12px] font-mono text-text-muted/30 uppercase tracking-wider border-t border-white/[0.02] pt-2.5 flex flex-wrap gap-x-4">
            <span>MCDA Rank: #1 of {optimizationPlan.candidates.length} Interventions</span>
            <span>Evidence: Behavior Vector (Mean: {behaviorProfile.featureVector.dailyEmissionsMean.toFixed(1)} kg/d)</span>
            <span>DNA Profile: {behaviorProfile.classification}</span>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col justify-between space-y-4 lg:space-y-0 lg:border-l lg:border-white/[0.04] lg:pl-6">
          <div className="space-y-3">
            <h4 className="text-[14px] font-mono font-black uppercase tracking-wider text-text-muted/60">
              If you do nothing
            </h4>
            <div className="space-y-2 text-[14px] font-mono">
              <div className="flex justify-between">
                <span className="text-text-muted/50 uppercase">Emissions Drift:</span>
                <span className="text-accent-red font-bold">{annualTons} t CO₂e</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted/50 uppercase">Opportunity Lost:</span>
                <span className="text-accent-amber font-bold">
                  -{Math.round((topCandidate?.estimatedSavingsKg || 23.9) * 12)} kg CO₂e
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/coach')}
            className="w-full py-3 bg-accent-green hover:bg-accent-green/90 text-bg-primary font-mono font-black text-[16px] uppercase transition-all rounded-sm tracking-[0.2em] shadow-[0_0_15px_-4px_rgba(0,255,135,0.4)] flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Consult TERRA Advisor</span>
          </button>
        </div>
      </div>
    </div>
  );
};
