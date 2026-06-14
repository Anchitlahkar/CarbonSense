import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Panel } from '../ui';

/**
 * EngineStatus
 * 
 * Displays the system metadata and engine status.
 */
export const EngineStatus: React.FC = () => {
  return (
    <Panel level={4} compact className="flex items-center justify-between text-[12px] font-mono text-text-muted/40 py-2.5 px-4 uppercase tracking-[0.1em]">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-accent-green opacity-60" aria-hidden="true" />
          <span className="font-black text-text-primary/60 tracking-[0.2em]">Engine Status: Active</span>
        </div>
        <div className="hidden sm:flex items-center space-x-4 border-l border-white/[0.03] pl-4">
          <span>Confidence: <strong className="text-accent-green/60">94%</strong></span>
          <span>Integrity: <strong className="text-accent-blue/60">100</strong></span>
          <span>Logic: <strong>1.5-X</strong></span>
        </div>
      </div>
      <div className="tracking-[0.3em] font-black opacity-30 text-[12px]">
        CARBONSENSE_COCKPIT_V1.0
      </div>
    </Panel>
  );
};
