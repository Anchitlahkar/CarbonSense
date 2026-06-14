import React from 'react';
import { RefreshCw, LogOut, ShieldAlert } from 'lucide-react';
import useCarbonStore from '../store/carbonStore';
import { useNavigate } from 'react-router-dom';

export const DemoBanner: React.FC = () => {
  const { enterDemoMode, logout } = useCarbonStore();
  const navigate = useNavigate();

  const handleReset = () => {
    enterDemoMode();
    console.log('[DEMO_MODE] Seeded demo dataset reloaded/reset by user request');
  };

  const handleExit = async () => {
    await logout();
    navigate('/');
    console.log('[DEMO_MODE] Exited demo mode');
  };

  return (
    <div className="bg-gradient-to-r from-accent-blue/15 to-accent-blue/5 border-b border-accent-blue/20 text-text-primary px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[13px] tracking-wider uppercase z-20 shadow-md relative select-none">
      <div className="flex items-center space-x-2.5">
        <ShieldAlert className="text-accent-blue shrink-0 animate-pulse" size={16} />
        <span className="font-black text-accent-blue">Demo Mode</span>
        <span className="text-text-muted/60 text-[12px] hidden md:inline">Using sample sustainability data</span>
      </div>
      
      <div className="flex items-center gap-3">
        <button
          onClick={handleReset}
          className="flex items-center space-x-1.5 px-3 py-1 rounded-sm border border-accent-blue/30 hover:border-accent-blue/70 bg-accent-blue/5 hover:bg-accent-blue/10 text-accent-blue font-bold text-[12px] transition-all cursor-pointer"
          title="Reset the demo session to pristine seeded data"
        >
          <RefreshCw size={12} />
          <span>Reset Demo</span>
        </button>
        
        <button
          onClick={handleExit}
          className="flex items-center space-x-1.5 px-3 py-1 rounded-sm border border-white/10 hover:border-accent-red/40 bg-white/[0.02] hover:bg-accent-red/5 text-text-muted hover:text-accent-red font-bold text-[12px] transition-all cursor-pointer"
        >
          <LogOut size={12} />
          <span>Exit Demo</span>
        </button>
      </div>
    </div>
  );
};

export default DemoBanner;
