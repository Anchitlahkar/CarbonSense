import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Cpu, Globe } from 'lucide-react';
import useCarbonStore from '../store/carbonStore';

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useCarbonStore();

  const handleStart = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col justify-between overflow-x-hidden selection:bg-accent-green/30 font-body relative">
      {/* Subtle grid background overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Header */}
      <header className="border-b border-white/[0.04] bg-bg-primary/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="text-accent-green opacity-80" size={16} />
            <span className="font-display font-black text-xs tracking-[0.25em] text-text-primary">
              CARBONSENSE
            </span>
          </div>
          <button
            onClick={handleStart}
            className="px-3 py-1.5 rounded-sm border border-white/[0.08] hover:border-accent-blue/40 hover:text-text-primary hover:bg-accent-blue/5 text-text-muted/80 font-mono text-[9px] font-bold transition-all uppercase cursor-pointer tracking-widest"
          >
            {user ? 'ACCESS_DASHBOARD' : 'SYSTEM_LOGIN'}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 max-w-5xl mx-auto relative z-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-sm border border-accent-blue/10 bg-accent-blue/5 text-accent-blue text-[8.5px] font-mono mb-8 uppercase font-bold tracking-[0.2em] shadow-[inset_0_0_15px_-5px_rgba(0,212,255,0.2)]">
          <span className="animate-pulse">●</span>
          <span>APPLIED AI CARBON RESEARCH ENVIRONMENT</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-6 leading-[1.1] text-text-primary uppercase drop-shadow-lg">
          Simulate Earth.<br />
          Optimize Action.<br />
          <span className="text-accent-green bg-clip-text text-transparent bg-gradient-to-r from-accent-green to-[#00D4FF]">
            Control Future.
          </span>
        </h1>

        <p className="text-text-muted/80 max-w-2xl text-[13px] md:text-sm font-body leading-relaxed mb-10 font-medium">
          The first behavioral optimization intelligence platform applying multi-horizon scenario forecasts, carbon genomes, and event-driven impact models to reduce human footprint.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full max-w-md">
          <button
            onClick={handleStart}
            className="w-full sm:w-auto px-6 py-2.5 rounded-sm bg-accent-green text-bg-primary font-mono font-black text-[10px] uppercase transition-all hover:bg-accent-green/90 cursor-pointer tracking-[0.2em] shadow-[0_0_20px_-5px_#00FF87]"
          >
            Initialize Terminal
          </button>
          <a
            href="/docs/RESEARCH.md"
            onClick={(e) => {
              e.preventDefault();
              alert('Redirecting to local markdown research file. Please review /docs/RESEARCH.md in the workspace.');
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-sm bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/[0.2] text-text-primary/80 hover:text-text-primary font-mono font-bold text-[10px] transition-all uppercase tracking-[0.2em]"
          >
            Access Docs
          </a>
        </div>

        {/* Pillars / Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-20">
          <div className="p-5 rounded-sm bg-bg-surface/50 border border-white/[0.04] hover:border-white/[0.1] transition-all text-left space-y-3 shadow-lg">
            <Cpu className="text-accent-blue opacity-80" size={20} />
            <h3 className="text-[11px] font-display font-black text-text-primary uppercase tracking-tight">AI Decoupled Orchestration</h3>
            <p className="text-[10px] text-text-muted/70 font-body leading-relaxed font-medium">
              Domain computation engines isolated from underlying LLM vendors. Switch model engines seamlessly via modular wrapper APIs.
            </p>
          </div>

          <div className="p-5 rounded-sm bg-bg-surface/50 border border-white/[0.04] hover:border-white/[0.1] transition-all text-left space-y-3 shadow-lg">
            <Activity className="text-accent-green opacity-80" size={20} />
            <h3 className="text-[11px] font-display font-black text-text-primary uppercase tracking-tight">Event-Driven Contracts</h3>
            <p className="text-[10px] text-text-muted/70 font-body leading-relaxed font-medium">
              System architecture reacting dynamically to domain events. Immutable record feeds track every carbon calculation.
            </p>
          </div>

          <div className="p-5 rounded-sm bg-bg-surface/50 border border-white/[0.04] hover:border-white/[0.1] transition-all text-left space-y-3 shadow-lg">
            <Globe className="text-accent-amber opacity-80" size={20} />
            <h3 className="text-[11px] font-display font-black text-text-primary uppercase tracking-tight">Planet Twin Simulation</h3>
            <p className="text-[10px] text-text-muted/70 font-body leading-relaxed font-medium">
              Visualizes real-time climate telemetry updates representing parts-per-million concentration indexes driven by user choices.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.02] bg-bg-surface/80 py-6 text-center text-[9px] text-text-muted/40 font-mono uppercase tracking-[0.25em] font-bold">
        <p>© 2026 CARBONSENSE_X. APPLIED CARBON BEHAVIORAL SCIENCE. GLOBAL_NODE.</p>
      </footer>
    </div>
  );
};
export default Landing;
