import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'line' | 'rect' | 'circle';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rect',
}) => {
  const baseStyles = 'bg-white/[0.04] animate-pulse';
  const variantStyles = {
    line: 'h-3 w-full rounded',
    rect: 'h-24 w-full rounded-lg border border-white/[0.02]',
    circle: 'rounded-full',
  };

  return <div className={`${baseStyles} ${variantStyles[variant]} ${className}`} />;
};

export default Skeleton;
