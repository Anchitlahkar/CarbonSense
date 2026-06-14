import React from 'react';
import { Activity } from 'lucide-react';

interface DashboardWelcomeProps {
  onStart: () => void;
}

/**
 * DashboardWelcome
 * 
 * Renders the welcome screen for new users who haven't generated a profile yet.
 */
export const DashboardWelcome: React.FC<DashboardWelcomeProps> = ({ onStart }) => {
  return (
    <div className="max-w-xl mx-auto text-center py-12 space-y-5 bg-bg-surface/60 border border-white/[0.06] rounded-sm p-8 shadow-xl mt-6 relative overflow-hidden font-body">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent-green to-accent-blue" aria-hidden="true" />
      <div className="w-16 h-16 rounded-sm bg-bg-card border border-white/[0.08] flex items-center justify-center mb-4 shadow-inner mx-auto" aria-hidden="true">
        <Activity className="text-accent-green opacity-80" size={32} />
      </div>
      <h2 className="font-display font-black text-[32px] tracking-wide text-text-primary uppercase">
        Welcome to CarbonSense
      </h2>
      <p className="text-[16px] text-text-muted">
        Let's build your first Carbon Intelligence Profile.
      </p>
      
      <div className="text-left text-[14px] text-text-muted space-y-2.5 max-w-[280px] mx-auto py-5 font-mono uppercase font-bold tracking-tighter">
        <p className="text-text-primary border-b border-white/[0.04] pb-2 tracking-wider">To begin:</p>
        <ul className="space-y-2" role="list">
          <li className="flex items-center space-x-2.5">
            <span className="w-2 h-2 rounded-full bg-accent-green" aria-hidden="true" />
            <span>• Upload a receipt</span>
          </li>
          <li className="flex items-center space-x-2.5">
            <span className="w-2 h-2 rounded-full bg-accent-blue" aria-hidden="true" />
            <span>• Add transport activity</span>
          </li>
          <li className="flex items-center space-x-2.5">
            <span className="w-2 h-2 rounded-full bg-accent-amber" aria-hidden="true" />
            <span>• Generate your first forecast</span>
          </li>
        </ul>
      </div>
      
      <button
        onClick={onStart}
        className="px-6 py-3 rounded-sm bg-accent-green text-bg-primary text-[16px] font-mono font-black uppercase shadow-[0_0_15px_-5px_#00FF87] hover:bg-accent-green/90 transition-all cursor-pointer tracking-wider"
      >
        [ Get Started ]
      </button>
    </div>
  );
};
