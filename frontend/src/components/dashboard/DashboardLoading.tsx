import React from 'react';
import { Skeleton } from '../ui';

/**
 * DashboardLoading
 * 
 * Renders the loading skeleton for the dashboard.
 */
export const DashboardLoading: React.FC = () => {
  return (
    <div className="space-y-4 max-w-6xl mx-auto font-body">
      <div className="flex justify-between items-center pb-2 border-b border-white/[0.06]">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-6 w-24" />
      </div>
      
      {/* Top layer skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Skeleton className="h-32 lg:col-span-2" />
        <Skeleton className="h-32" />
      </div>

      {/* Mid layer skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="h-44" />
        <Skeleton className="h-44" />
        <Skeleton className="h-44" />
      </div>

      {/* Bottom layer skeleton */}
      <Skeleton className="h-56 w-full" />
    </div>
  );
};
