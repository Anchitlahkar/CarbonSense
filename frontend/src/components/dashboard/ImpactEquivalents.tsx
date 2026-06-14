import React from 'react';
import { Activity, Car, Plane, TreeDeciduous, Zap } from 'lucide-react';
import { Panel } from '../ui';

interface ImpactEquivalentsProps {
  vehicleEquivalentKm: number;
  annualKg: number;
  treesRequiredForOffset: number;
  householdEnergyEquivalentDays: number;
}

/**
 * ImpactEquivalents
 * 
 * Translates carbon emissions into physical equivalents.
 */
export const ImpactEquivalents: React.FC<ImpactEquivalentsProps> = ({
  vehicleEquivalentKm,
  annualKg,
  treesRequiredForOffset,
  householdEnergyEquivalentDays
}) => {
  return (
    <Panel level={2} className="p-5 space-y-5">
      <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
        <div className="flex items-center space-x-2">
          <Activity className="text-accent-blue" size={18} aria-hidden="true" />
          <h3 className="text-[16px] font-bold text-text-primary uppercase tracking-widest font-display">
            Impact Translation
          </h3>
        </div>
        <span className="text-[10px] font-mono text-text-muted/40 uppercase font-bold tracking-widest">Equivalents</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3" aria-label="Physical impact equivalents">
        <div className="flex items-center space-x-3 p-4 bg-white/[0.02] border border-white/[0.03] rounded-sm group hover:bg-white/[0.04] transition-all">
          <Car className="text-text-muted group-hover:text-text-primary transition-colors" size={24} aria-hidden="true" />
          <div>
            <div className="text-[18px] font-bold text-text-primary font-mono">{vehicleEquivalentKm.toLocaleString()}</div>
            <div className="text-[11px] text-text-muted uppercase font-bold tracking-tighter">KM Driven</div>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-4 bg-white/[0.02] border border-white/[0.03] rounded-sm group hover:bg-white/[0.04] transition-all">
          <Plane className="text-text-muted group-hover:text-text-primary transition-colors" size={24} aria-hidden="true" />
          <div>
            <div className="text-[18px] font-bold text-text-primary font-mono">{Math.round(annualKg / 250)}</div>
            <div className="text-[11px] text-text-muted uppercase font-bold tracking-tighter">Short Flights</div>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-4 bg-accent-green/5 border border-accent-green/10 rounded-sm group hover:bg-accent-green/10 transition-all">
          <TreeDeciduous className="text-accent-green" size={24} aria-hidden="true" />
          <div>
            <div className="text-[18px] font-bold text-accent-green font-mono">{treesRequiredForOffset.toLocaleString()}</div>
            <div className="text-[11px] text-text-muted uppercase font-bold tracking-tighter">Trees Required</div>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-4 bg-accent-amber/5 border border-accent-amber/10 rounded-sm group hover:bg-accent-amber/10 transition-all">
          <Zap className="text-accent-amber" size={24} aria-hidden="true" />
          <div>
            <div className="text-[18px] font-bold text-accent-amber font-mono">{householdEnergyEquivalentDays}</div>
            <div className="text-[11px] text-text-muted uppercase font-bold tracking-tighter">Home Energy Days</div>
          </div>
        </div>
      </div>
    </Panel>
  );
};
