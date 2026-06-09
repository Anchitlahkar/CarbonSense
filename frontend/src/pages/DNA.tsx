import React, { useEffect } from 'react';
import useCarbonStore from '../store/carbonStore';
import { 
  Panel, 
  SectionHeader, 
  DNAProgress, 
  StatusPill, 
  Skeleton, 
  PanelError 
} from '../components/ui';
import { 
  Fingerprint, 
  Activity, 
  ShieldAlert,
  HelpCircle,
  Brain,
  Search,
  Compass
} from 'lucide-react';

export const DNA: React.FC = () => {
  const { 
    isLoading, 
    error, 
    carbonDNAProfile, 
    fetchContext 
  } = useCarbonStore();

  useEffect(() => {
    if (!carbonDNAProfile) {
      fetchContext();
    }
  }, [carbonDNAProfile, fetchContext]);

  if (isLoading) {
    return (
      <div className="space-y-4 max-w-6xl mx-auto font-body">
        <Skeleton className="h-5 w-40" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <Skeleton className="h-72 lg:col-span-8" />
          <Skeleton className="h-72 lg:col-span-4" />
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

  if (!carbonDNAProfile) {
    return (
      <div className="max-w-md mx-auto text-center py-12 space-y-4">
        <ShieldAlert className="mx-auto text-accent-amber" size={40} />
        <h3 className="text-xs font-bold font-display uppercase tracking-wider text-text-primary">NO PROFILE TELEMETRY</h3>
        <p className="text-[11px] text-text-muted">A behavioral genome profile requires active synchronization.</p>
        <button onClick={fetchContext} className="px-3 py-1.5 rounded bg-accent-green text-bg-primary text-xs font-mono font-bold uppercase">
          Reload Profile
        </button>
      </div>
    );
  }

  const { archetype, archetypeConfidence, dimensions, evolution, archetypeEvidence } = carbonDNAProfile;

  return (
    <div className="max-w-6xl mx-auto space-y-3 font-body">
      {/* Page Header */}
      <SectionHeader
        title="BEHAVIORAL DNA DOSSIER"
        description="Machine learning classifications mapping behavioral markers and cognitive habits to consumption archetypes."
        actions={
          <div className="flex items-center space-x-2 text-[8px] font-mono text-text-subtle">
            <Fingerprint size={12} className="text-accent-blue" />
            <span className="uppercase tracking-widest">DNA_COMPILATION_V1.5_X</span>
          </div>
        }
      />

      {/* Main Grid: Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        
        {/* Left dossier panel */}
        <div className="lg:col-span-8 space-y-3">
          
          {/* Dossier Header panel */}
          <Panel level={1} compact className="relative overflow-hidden p-3.5 space-y-2.5">
            <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-gradient-to-l from-white/[0.01] to-transparent pointer-events-none" />
            
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <span className="text-[8px] font-mono text-text-subtle uppercase tracking-widest">// CLASSIFIED ARCHETYPE PROFILE</span>
                <h2 className="text-base font-bold font-display text-text-primary tracking-[0.1em] uppercase">
                  {archetype.replace(/([A-Z])/g, ' $1').trim()}
                </h2>
              </div>
              <StatusPill label="ACTIVE DOSSIER" variant="blue" />
            </div>

            <div className="text-[11px] text-text-muted leading-relaxed font-body">
              Cognitive behavior patterns mapping systemic readiness, intensity indices, and resistance points. This dossier reflects dynamic response vectors to optimization interventions.
            </div>

            {/* Matrix details */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/[0.04] text-[9px] font-mono">
              <div>
                <span className="text-text-subtle block uppercase text-[7px] tracking-widest">Confidence</span>
                <span className="text-text-primary font-bold text-[11px]">{archetypeConfidence}% MATCH</span>
              </div>
              <div>
                <span className="text-text-subtle block uppercase text-[7px] tracking-widest">Evolution</span>
                <span className="text-accent-blue font-bold text-[11px] uppercase truncate">{evolution.direction.replace(/([A-Z])/g, ' $1').trim()}</span>
              </div>
              <div>
                <span className="text-text-subtle block uppercase text-[7px] tracking-widest">Integrity</span>
                <span className="text-accent-green font-bold text-[11px] uppercase">VERIFIED_PASS</span>
              </div>
            </div>
          </Panel>

          {/* Psychological Evidence factors */}
          <div className="space-y-2">
            <div className="flex items-center space-x-1.5 pl-1">
              <Brain size={12} className="text-text-muted" />
              <h4 className="text-[9px] font-bold text-text-muted uppercase tracking-widest font-display">
                Behavioral Evidence Telemetry
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {archetypeEvidence.map((ev, idx) => (
                <Panel key={idx} level={2} compact className="flex flex-col justify-between space-y-2 py-2">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[8px] font-mono text-text-subtle">
                      <span className="tracking-widest">FACTOR_SIGNAL_{idx + 1}</span>
                      <span className="text-accent-blue font-bold tracking-tighter">-{ev.contribution}% Influence</span>
                    </div>
                    <h5 className="text-[10px] font-bold text-text-primary leading-tight uppercase tracking-tight">{ev.factor}</h5>
                  </div>
                  <p className="text-[9px] text-text-muted leading-snug">{ev.reasoning}</p>
                </Panel>
              ))}
            </div>
          </div>
        </div>

        {/* Right dossier dimensions sidebar */}
        <div className="lg:col-span-4 space-y-3">
          
          {/* Dimensions meter */}
          <Panel level={2} compact className="space-y-3 p-3">
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-1.5">
              <h3 className="text-[9px] font-bold text-text-primary uppercase tracking-widest font-display">
                Behavioral Dimensions
              </h3>
              <Compass size={12} className="text-text-subtle" />
            </div>

            <div className="space-y-2.5">
              {[
                { label: 'Intensity', value: dimensions.emissionIntensity, color: 'bg-accent-red' },
                { label: 'Volatility', value: dimensions.behaviorVolatility, color: 'bg-accent-amber' },
                { label: 'Readiness', value: dimensions.optimizationReadiness, color: 'bg-accent-green' },
                { label: 'Resistance', value: dimensions.interventionResistance, color: 'bg-accent-amber' },
                { label: 'Reliability', value: dimensions.forecastReliability, color: 'bg-accent-blue' }
              ].map((dim, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-[8px] font-mono">
                    <span className="text-text-muted uppercase tracking-tighter">{dim.label}</span>
                    <span className="text-text-primary font-bold">{dim.value}%</span>
                  </div>
                  <div className="h-0.5 bg-white/[0.04] rounded-full overflow-hidden">
                    <div className={`h-full ${dim.color} rounded-full`} style={{ width: `${dim.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* Dossier Evolution & projected behavioral shifts */}
          <Panel level={2} compact className="space-y-2.5 p-3">
            <div className="flex justify-between items-center border-b border-white/[0.04] pb-1.5">
              <h3 className="text-[9px] font-bold text-text-primary uppercase tracking-widest font-display">
                Cognitive Shift
              </h3>
              <span className="text-[7px] font-mono bg-accent-blue/10 border border-accent-blue/20 text-accent-blue px-1 py-0.5 rounded font-bold uppercase tracking-widest">
                {evolution.direction}
              </span>
            </div>

            <p className="text-[10px] text-text-muted leading-snug font-body">
              {evolution.reasoning}
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.04] font-mono text-[8px]">
              <div>
                <span className="text-text-subtle block uppercase tracking-tighter">30d Project</span>
                <span className={`text-[10px] font-bold ${evolution.projected30dChangePercent < 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                  {evolution.projected30dChangePercent > 0 ? '+' : ''}{evolution.projected30dChangePercent}%
                </span>
              </div>
              <div>
                <span className="text-text-subtle block uppercase tracking-tighter">90d Project</span>
                <span className={`text-[10px] font-bold ${evolution.projected90dChangePercent < 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                  {evolution.projected90dChangePercent > 0 ? '+' : ''}{evolution.projected90dChangePercent}%
                </span>
              </div>
            </div>

            {/* Target projection shift */}
            <div className="p-2 bg-bg-card border border-white/[0.03] rounded space-y-0.5 font-mono text-[9px] mt-1">
              <span className="text-[7px] text-text-subtle block uppercase tracking-widest">PROBABLE SHIFT TARGET</span>
              <div className="flex justify-between items-center text-text-primary font-bold">
                <span className="uppercase tracking-tighter truncate max-w-[120px]">{evolution.futureProjection.projectedArchetype.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className="text-accent-blue">{(evolution.futureProjection.probability * 100).toFixed(0)}% P</span>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
};

export default DNA;
