import React from 'react';

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
  compact?: boolean;
  level?: 1 | 2 | 3 | 4;
  status?: 'success' | 'warning' | 'danger' | 'info' | null;
}

export const Panel: React.FC<PanelProps> = ({
  children,
  hoverable = false,
  compact = false,
  level = 2,
  status = null,
  className = '',
  ...props
}) => {
  // Spacing density
  const paddingClass = compact ? 'p-2' : 'p-3.5';

  // Card Level Hierarchy Background & Borders
  let levelClass = '';
  switch (level) {
    case 1:
      levelClass = 'bg-bg-surface border border-white/[0.06] shadow-[0_4px_20px_-12px_rgba(0,0,0,0.5)]';
      break;
    case 2:
      levelClass = 'bg-bg-surface/80 border border-white/[0.04] backdrop-blur-sm';
      break;
    case 3:
      levelClass = 'bg-bg-card/40 border border-white/[0.03]';
      break;
    case 4:
      levelClass = 'bg-bg-card/20 border border-transparent';
      break;
  }

  // Left Border Status Indicator
  let statusBorderClass = '';
  if (status) {
    const borderColor = 
      status === 'success' ? 'border-l-accent-green' :
      status === 'warning' ? 'border-l-accent-amber' :
      status === 'danger' ? 'border-l-accent-red' :
      'border-l-accent-blue';
    statusBorderClass = `border-l-[3px] ${borderColor}`;
  }

  return (
    <div
      className={`rounded-sm transition-all duration-300 ${paddingClass} ${levelClass} ${statusBorderClass} ${
        hoverable ? 'hover:border-white/[0.12] hover:bg-white/[0.02]' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Panel;
