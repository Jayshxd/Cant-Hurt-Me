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
    <GlowCard className={cn('p-4', className)} glowColor="cyan">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
          TRANSACTION_AUDIT
        </span>
        <span className="text-xs font-mono text-gray-600">
          {logs.length} RECORDS
        </span>
      </div>

      {/* Log entries */}
      <div className="space-y-1 font-mono text-sm max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {displayLogs.length === 0 ? (
          <div className="text-gray-600 text-center py-4">
            <span className="text-xs">NO_RECORDS_FOUND</span>
          </div>
        ) : (
          displayLogs.map((log, index) => (
            <LogEntryRow key={log.id} log={log} index={index} />
          ))
        )}
      </div>

      {/* Terminal cursor */}
      <div className="mt-3 flex items-center gap-2">
        <span className="text-cyber-cyan">{'>'}</span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-2 h-4 bg-cyber-cyan"
        />
      </div>
    </GlowCard>
  );
}

function LogEntryRow({ log, index }: { log: LogEntry; index: number }) {
  const config = ACTION_CONFIG[log.type];
  const isPositive = log.points > 0;
  const isSpending = log.type === 'RESOURCE_DEPLOY';

  const colorClass = isPositive
    ? 'text-cyber-cyan'
    : isSpending
    ? 'text-cyber-amber'
    : 'text-cyber-red';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        'flex items-center gap-2 py-1 px-2 rounded hover:bg-white/5 transition-colors',
        'border-l-2',
        isPositive ? 'border-l-cyber-cyan/50' : isSpending ? 'border-l-cyber-amber/50' : 'border-l-cyber-red/50'
      )}
    >
      {/* Points change */}
      <span className={cn('w-12 text-right', colorClass)}>
        [{isPositive ? '+' : ''}{log.points}]
      </span>

      {/* Action type */}
      <span className="text-gray-400 flex-1 truncate">
        {config.label}
        {isSpending && log.amount !== undefined && (
          <span className="text-cyber-amber/70 ml-1">
            (${log.amount})
          </span>
        )}
      </span>

      {/* Timestamp */}
      <span className="text-gray-600 text-xs">
        {formatTime(new Date(log.timestamp))}
      </span>
    </motion.div>
  );
}
