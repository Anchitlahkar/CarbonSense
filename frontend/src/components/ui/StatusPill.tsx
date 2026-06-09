import React from 'react';

interface StatusPillProps {
  label: string;
  variant?: 'green' | 'blue' | 'amber' | 'red' | 'neutral';
  className?: string;
}

export const StatusPill: React.FC<StatusPillProps> = ({
  label,
  variant = 'neutral',
  className = '',
}) => {
  const styles = {
    neutral: 'bg-white/5 border-white/10 text-text-muted',
    green: 'bg-accent-green/5 border-accent-green/10 text-accent-green',
    blue: 'bg-accent-blue/5 border-accent-blue/10 text-accent-blue',
    amber: 'bg-accent-amber/5 border-accent-amber/10 text-accent-amber',
    red: 'bg-accent-red/5 border-accent-red/10 text-accent-red',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border tracking-wider font-mono ${styles[variant]} ${className}`}
    >
      <span className="w-1 h-1 rounded-full mr-1.5 bg-current" />
      {label.toUpperCase()}
    </span>
  );
};

export default StatusPill;
