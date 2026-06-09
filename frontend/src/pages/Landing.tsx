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
    <div className="min-h-screen bg-[#050A0E] text-text-primary flex flex-col justify-between overflow-x-hidden selection:bg-accent-green selection:text-bg-primary font-body">
      {/* Header */}
      <header className="border-b border-white/[0.06] bg-[#050A0E]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="text-accent-green" size={20} />
            <span className="font-display font-black text-sm tracking-wider text-text-primary">
              CARBONSENSE X
            </span>
          </div>
          <button
            onClick={handleStart}
            className="px-3 py-1.5 rounded border border-white/10 hover:border-white/20 bg-white/5 text-text-primary font-mono text-xs font-bold transition-all uppercase cursor-pointer"
          >
            {user ? 'Dashboard' : 'Sign In'}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 max-w-5xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded border border-accent-blue/10 bg-accent-blue/5 text-accent-blue text-[10px] font-mono mb-8 uppercase">
          <span>●</span>
          <span>APPLIED AI CARBON RESEARCH ENVIRONMENT</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight mb-6 leading-tight text-white uppercase">
          Your Planet.<br />
          Your Footprint.<br />
          <span className="text-accent-green">
            Your Decision.
          </span>
        </h1>

        <p className="text-text-muted max-w-2xl text-sm md:text-base font-body leading-relaxed mb-10">
          The first behavioral optimization intelligence platform applying multi-horizon scenario forecasts, carbon genomes, and event-driven impact models to reduce human footprint.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <button
            onClick={handleStart}
            className="w-full sm:w-auto px-6 py-3 rounded bg-accent-green text-bg-primary font-mono font-bold text-xs uppercase transition-all hover:scale-[1.01] cursor-pointer"
          >
            Launch Research Environment
          </button>
          <a
            href="/docs/RESEARCH.md"
            onClick={(e) => {
              e.preventDefault();
              alert('Redirecting to local markdown research file. Please review /docs/RESEARCH.md in the workspace.');
            }}
            className="w-full sm:w-auto px-6 py-3 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-text-primary font-mono font-bold text-xs transition-all uppercase"
          >
            Read Research Plan
          </a>
        </div>

        {/* Pillars / Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-20">
          <div className="p-5 rounded-lg bg-[#0B1220] border border-white/[0.06] hover:border-white/[0.12] transition-all text-left space-y-3">
            <Cpu className="text-accent-blue" size={24} />
            <h3 className="text-sm font-display font-bold text-text-primary uppercase">AI Decoupled Orchestration</h3>
            <p className="text-xs text-text-muted font-body leading-relaxed">
              Domain computation engines isolated from underlying LLM vendors. Switch model engines seamlessly via modular wrapper APIs.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-[#0B1220] border border-white/[0.06] hover:border-white/[0.12] transition-all text-left space-y-3">
            <Activity className="text-accent-green" size={24} />
            <h3 className="text-sm font-display font-bold text-text-primary uppercase">Event-Driven Contracts</h3>
            <p className="text-xs text-text-muted font-body leading-relaxed">
              System architecture reacting dynamically to domain events. Immutable record feeds track every carbon calculation.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-[#0B1220] border border-white/[0.06] hover:border-white/[0.12] transition-all text-left space-y-3">
            <Globe className="text-accent-amber" size={24} />
            <h3 className="text-sm font-display font-bold text-text-primary uppercase">Planet Twin Simulation</h3>
            <p className="text-xs text-text-muted font-body leading-relaxed">
              Visualizes real-time climate telemetry updates representing parts-per-million concentration indexes driven by user choices.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-bg-card/40 bg-bg-surface py-8 text-center text-xs text-text-muted">
        <p>© 2026 CarbonSense X. Built for Applied Carbon Behavioral Science. Deployed globally.</p>
      </footer>
    </div>
  );
};
export default Landing;
