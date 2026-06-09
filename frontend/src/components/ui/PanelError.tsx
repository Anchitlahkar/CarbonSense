import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { Panel } from './Panel';

interface PanelErrorProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const PanelError: React.FC<PanelErrorProps> = ({
  message,
  onRetry,
  className = '',
}) => {
  return (
    <Panel className={`flex flex-col items-center justify-center text-center p-8 border-accent-red/20 ${className}`}>
      <div className="w-8 h-8 rounded bg-accent-red/5 flex items-center justify-center border border-accent-red/10 text-accent-red mb-3">
        <ShieldAlert size={18} />
      </div>
      <h4 className="text-xs font-bold font-display text-text-primary mb-1 tracking-wider">TELEMETRY AUDIT FAILURE</h4>
      <p className="text-xs text-text-muted font-body mb-4 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-text-primary rounded text-xs font-mono border border-white/10 hover:border-white/20 transition-all"
        >
          [ RETRY telemetry FETCH ]
        </button>
      )}
    </Panel>
  );
};

export default PanelError;
