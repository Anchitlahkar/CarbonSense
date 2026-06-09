import React from 'react';

interface Column<T> {
  header: string;
  render: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyState?: React.ReactNode;
  isLoading?: boolean;
  rowKey: (item: T) => string | number;
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  emptyState,
  isLoading = false,
  rowKey,
  className = '',
}: DataTableProps<T>) {
  return (
    <div className={`overflow-x-auto w-full border border-white/[0.04] rounded-lg bg-bg-surface ${className}`}>
      <table className="w-full text-left border-collapse text-[10px]">
        <thead>
          <tr className="border-b border-white/[0.04] bg-white/[0.01]">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`px-2.5 py-1.5 font-bold text-text-muted tracking-widest uppercase font-display text-[8px] ${col.className || ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.02] font-mono">
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="px-3 py-6 text-center text-text-muted">
                <div className="flex items-center justify-center space-x-2">
                  <span className="w-1 h-1 rounded-full bg-accent-blue animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1 h-1 rounded-full bg-accent-blue animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1 h-1 rounded-full bg-accent-blue animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-3 py-6 text-center text-text-muted font-body">
                {emptyState || 'No telemetry data recorded.'}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={rowKey(item)} className="hover:bg-white/[0.01] transition-colors">
                {columns.map((col, idx) => (
                  <td key={idx} className={`px-3 py-2 text-text-primary ${col.className || ''}`}>
                    {col.render(item)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
