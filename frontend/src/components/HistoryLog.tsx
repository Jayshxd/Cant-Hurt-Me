'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { formatTime } from '@/lib/utils';
import { LogEntry, ACTION_CONFIG } from '@/types';
import { useEnergyStore } from '@/store/useEnergyStore';
import { GlowCard } from './GlowCard';

interface HistoryLogProps {
  className?: string;
  maxItems?: number;
}

export function HistoryLog({ className, maxItems = 10 }: HistoryLogProps) {
  const logs = useEnergyStore((state) => state.logs);
  const displayLogs = logs.slice(0, maxItems);

  return (
    <GlowCard className={cn('p-4', className)} glowColor="primary">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-slate-600">
          Recent Activity
        </span>
        <span className="text-xs text-slate-400">
          {logs.length} entries
        </span>
      </div>

      {/* Log entries */}
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {displayLogs.length === 0 ? (
          <div className="text-slate-400 text-center py-8">
            <span className="text-sm">No activity yet</span>
          </div>
        ) : (
          displayLogs.map((log, index) => (
            <LogEntryRow key={log.id} log={log} index={index} />
          ))
        )}
      </div>
    </GlowCard>
  );
}

function LogEntryRow({ log, index }: { log: LogEntry; index: number }) {
  const config = ACTION_CONFIG[log.type];
  const isPositive = log.points > 0;
  const isSpending = log.type === 'SPENDING';

  const colorClass = isPositive
    ? 'text-success-600 bg-success-50'
    : isSpending
    ? 'text-warning-600 bg-warning-50'
    : 'text-danger-600 bg-danger-50';

  const borderClass = isPositive
    ? 'border-l-success-400'
    : isSpending
    ? 'border-l-warning-400'
    : 'border-l-danger-400';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        'flex items-center gap-3 py-2 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors',
        'border-l-4',
        borderClass
      )}
    >
      {/* Points change */}
      <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', colorClass)}>
        {isPositive ? '+' : ''}{log.points}
      </span>

      {/* Action type */}
      <span className="text-slate-700 flex-1 truncate text-sm">
        {config.label}
        {isSpending && log.amount !== undefined && (
          <span className="text-warning-600 ml-1">
            (${log.amount})
          </span>
        )}
      </span>

      {/* Timestamp */}
      <span className="text-slate-400 text-xs">
        {formatTime(new Date(log.timestamp))}
      </span>
    </motion.div>
  );
}
