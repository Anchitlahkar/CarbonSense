import React, { useEffect } from 'react';
import useCarbonStore from '../store/carbonStore';
import { 
  Panel, 
  SectionHeader, 
  StatusPill, 
  Skeleton, 
  PanelError 
} from '../components/ui';
import { 
  Zap, 
  ShieldAlert, 
  Clock, 
  CheckCircle,
  TrendingDown,
  Hammer,
  AlertCircle,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

export const Optimization: React.FC = () => {
  const { 
    isLoading, 
    error, 
    optimizationPlan, 
    carbonDNAProfile,
    fetchContext 
  } = useCarbonStore();

  useEffect(() => {
    if (!optimizationPlan) {
      fetchContext();
    }
  }, [optimizationPlan, fetchContext]);

  if (isLoading) {
    return (
      <div className="space-y-4 max-w-6xl mx-auto font-body">
        <Skeleton className="h-5 w-40" />
        <div className="space-y-3">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto pt-12">
        <PanelError message={error} onRetry={fetchContext} />
      </div>
    );
  }

  if (!optimizationPlan) {
    return (
      <div className="max-w-md mx-auto text-center py-12 space-y-4">
        <ShieldAlert className="mx-auto text-accent-amber animate-pulse" size={40} />
        <h3 className="text-xs font-bold font-display uppercase tracking-wider text-text-primary">NO OPTIMIZATION MATRIX FOUND</h3>
        <p className="text-[11px] text-text-muted">Optimization models require active profile context logs.</p>
        <button onClick={fetchContext} className="px-3 py-1.5 rounded bg-accent-green text-bg-primary text-xs font-mono font-bold uppercase">
          Reload Plan Data
        </button>
      </div>
    );
  }

  const categoryTradeoffs = optimizationPlan.tradeoffs.length > 0
    ? optimizationPlan.tradeoffs
    : [
        {
          category: 'transport',
          potentialSavingsKg: 120.0,
          averageDifficulty: 35,
          averageResistance: 25,
          candidateCount: 2,
          description: 'High savings potential, transit alternatives exist.'
        },
        {
          category: 'food',
          potentialSavingsKg: 45.0,
          averageDifficulty: 20,
          averageResistance: 40,
          candidateCount: 1,
          description: 'Medium savings, dietary habit change resistance.'
        }
      ];

  const confidenceLabel = 
    (carbonDNAProfile?.archetypeConfidence || 85) > 80 ? 'High' : 
    (carbonDNAProfile?.archetypeConfidence || 85) > 60 ? 'Medium' : 'Low';

  return (
    <div className="max-w-6xl mx-auto space-y-3 font-body">
      {/* Page Header */}
      <SectionHeader
        title="OPTIMIZATION CENTER"
        description="Lifestyle intervention roadmap computed using multi-criteria decision analysis (MCDA) parameters."
        actions={
          <div className="flex items-center space-x-2 text-[8px] font-mono text-text-subtle">
            <Zap size={11} className="text-accent-green animate-pulse" />
            <span className="uppercase tracking-widest">INTERVENTIONS: {optimizationPlan.candidates.length}</span>
          </div>
        }
      />

      {/* Grid: Actions & Tradeoffs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        
        {/* Left: Ranked Decisions List */}
        <div className="lg:col-span-8 space-y-2.5">
          <div className="flex items-center space-x-1.5 pl-1">
            <CheckCircle size={12} className="text-accent-green" />
            <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest font-display">
              Prioritized Roadmap
            </span>
          </div>

          {optimizationPlan.candidates.map((cand, idx) => {
            const implementationTime = 
              cand.difficultyLevel === 'easy' ? '1-2 days' : 
              cand.difficultyLevel === 'medium' ? '1 week' : '2-4 weeks';

            const userResistanceRating = 
              cand.resistanceScore.score > 70 ? 'High' : 
              cand.resistanceScore.score > 40 ? 'Medium' : 'Low';

            const annualSavings = Math.round(cand.estimatedSavingsKg * 12);

            return (
              <Panel key={idx} level={1} compact status={cand.difficultyLevel === 'easy' ? 'success' : 'info'} className="space-y-2.5 hover:border-white/[0.08] transition-all">
                
                {/* Header Section */}
                <div className="flex items-center justify-between border-b border-white/[0.04] pb-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 rounded bg-white/5 border border-white/10 text-white font-mono text-[9px] font-black flex items-center justify-center">
                      {cand.rank}
                    </span>
                    <h4 className="text-[11px] font-bold text-text-primary tracking-tight uppercase">{cand.title}</h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <StatusPill label={cand.category} variant={cand.category === 'transport' ? 'blue' : 'neutral'} />
                    <span className="text-[8px] font-mono text-text-subtle bg-white/5 border border-white/10 px-1 py-0.5 rounded font-bold">
                      SCORE: {cand.score}
                    </span>
                  </div>
                </div>

                {/* Recommendation Description */}
                <p className="text-[10px] text-text-muted leading-relaxed font-body">
                  {cand.description}
                </p>

                {/* Decision Impact Preview Layout */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-2.5 bg-bg-card border border-white/[0.03] rounded font-mono text-[9px]">
                  
                  {/* Monthly Impact */}
                  <div className="space-y-0.5 border-r border-white/[0.03]">
                    <span className="text-text-subtle block uppercase text-[7px] tracking-widest">Savings/30d</span>
                    <span className="text-accent-green font-bold text-[10px]">
                      -{Math.round(cand.estimatedSavingsKg)} kg
                    </span>
                  </div>

                  {/* Annual Impact */}
                  <div className="space-y-0.5 border-r border-white/[0.03] sm:pl-2">
                    <span className="text-text-subtle block uppercase text-[7px] tracking-widest">Annual Offset</span>
                    <span className="text-accent-green font-bold text-[10px]">
                      -{annualSavings} kg
                    </span>
                  </div>

                  {/* Telemetry settings */}
                  <div className="space-y-0.5 sm:pl-2">
                    <span className="text-text-subtle block uppercase text-[7px] tracking-widest">Model Conf</span>
                    <span className="text-text-primary font-bold text-[10px] uppercase flex items-center space-x-1">
                      <TrendingUp size={10} className="text-accent-blue" />
                      <span>{confidenceLabel}</span>
                    </span>
                  </div>

                  {/* Spacing Divider */}
                  <div className="col-span-full border-t border-white/[0.03] pt-1.5 mt-0.5 grid grid-cols-3 gap-1 text-[8px]">
                    <div>
                      <span className="text-text-subtle block uppercase text-[6px] tracking-widest">Difficulty</span>
                      <span className="text-text-primary font-bold uppercase">{cand.difficultyLevel}</span>
                    </div>
                    <div>
                      <span className="text-text-subtle block uppercase text-[6px] tracking-widest">Resistance</span>
                      <span className="text-text-primary font-bold uppercase">{userResistanceRating}</span>
                    </div>
                    <div>
                      <span className="text-text-subtle block uppercase text-[6px] tracking-widest">Horizon</span>
                      <span className="text-text-primary font-bold uppercase">{implementationTime}</span>
                    </div>
                  </div>
                </div>

                {/* Resistance / Behavioral friction explanation */}
                <div className="p-1.5 bg-white/[0.01] border border-white/[0.03] rounded text-[9px] text-text-subtle flex items-start space-x-1.5">
                  <AlertCircle size={10} className="text-accent-amber shrink-0 mt-0.5" />
                  <p className="font-body leading-snug">{cand.resistanceScore.reasoning}</p>
                </div>

              </Panel>
            );
          })}
        </div>

        {/* Right: Tradeoffs Dashboard */}
        <div className="lg:col-span-4 space-y-3">
          <Panel level={2} compact className="space-y-2.5 p-3.5">
            <h4 className="text-[9px] font-bold text-text-primary uppercase tracking-widest font-display border-b border-white/[0.04] pb-1.5">
              Optimization Tradeoffs
            </h4>
            <p className="text-[10px] text-text-muted leading-relaxed">
              Synthesis of carbon reduction rates relative to structural effort and cognitive resistance points.
            </p>

            <div className="space-y-2.5 pt-1">
              {categoryTradeoffs.map((td, idx) => (
                <div key={idx} className="p-2 bg-bg-card border border-white/[0.03] rounded font-mono text-[10px] space-y-1.5">
                  <div className="flex justify-between items-center border-b border-white/[0.02] pb-1">
                    <span className="font-bold text-text-primary uppercase tracking-tight">{td.category}</span>
                    <span className="text-[7px] text-text-subtle uppercase">Runs: {td.candidateCount}</span>
                  </div>
                  <p className="text-[9px] text-text-muted font-body leading-snug">{td.description}</p>
                  <div className="grid grid-cols-3 gap-1 pt-1 text-[8px] text-text-subtle border-t border-white/[0.02]">
                    <div>
                      <span className="block uppercase text-[6px] tracking-widest">Savings</span>
                      <span className="font-bold text-accent-green">-{td.potentialSavingsKg}kg</span>
                    </div>
                    <div>
                      <span className="block uppercase text-[6px] tracking-widest">Difficulty</span>
                      <span className="font-bold text-text-primary">{td.averageDifficulty}%</span>
                    </div>
                    <div>
                      <span className="block uppercase text-[6px] tracking-widest">Friction</span>
                      <span className="font-bold text-text-primary">{td.averageResistance}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
};

export default Optimization;
