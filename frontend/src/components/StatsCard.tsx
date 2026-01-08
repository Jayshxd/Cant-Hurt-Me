'use client';

import { motion } from 'framer-motion';
import { TrendUp, TrendDown, Equals } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { useEnergyStore } from '@/store/useEnergyStore';
import { GlowCard } from './GlowCard';
import { AnimatedNumber } from './AnimatedNumber';

interface StatsCardProps {
  className?: string;
}

export function StatsCard({ className }: StatsCardProps) {
  const logs = useEnergyStore((state) => state.logs);
  const points = useEnergyStore((state) => state.points);

  // Calculate stats
  const todayLogs = logs.filter((log) => {
    const today = new Date();
    const logDate = new Date(log.timestamp);
    return (
      logDate.getDate() === today.getDate() &&
      logDate.getMonth() === today.getMonth() &&
      logDate.getFullYear() === today.getFullYear()
    );
  });

  const todayGains = todayLogs
    .filter((log) => log.points > 0)
    .reduce((sum, log) => sum + log.points, 0);

  const todayLosses = todayLogs
    .filter((log) => log.points < 0)
    .reduce((sum, log) => sum + log.points, 0);

  const netChange = todayGains + todayLosses;
  const isCritical = points < 0;

  return (
    <GlowCard
      className={cn('p-4', className)}
      glowColor={isCritical ? 'danger' : 'primary'}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-slate-600">
          Today&apos;s Stats
        </span>
        <span className="text-xs text-slate-400">
          {new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
        </span>
      </div>

      {/* Stats grid */}
      <div className="space-y-3">
        {/* Today's gains */}
        <div className="flex items-center justify-between p-3 bg-success-50 rounded-lg">
          <div className="flex items-center gap-2">
            <TrendUp size={18} className="text-success-600" />
            <span className="text-sm text-slate-600">Gains</span>
          </div>
          <AnimatedNumber
            value={todayGains}
            prefix="+"
            className="text-lg font-semibold text-success-600"
          />
        </div>

        {/* Today's losses */}
        <div className="flex items-center justify-between p-3 bg-danger-50 rounded-lg">
          <div className="flex items-center gap-2">
            <TrendDown size={18} className="text-danger-600" />
            <span className="text-sm text-slate-600">Losses</span>
          </div>
          <AnimatedNumber
            value={todayLosses}
            className="text-lg font-semibold text-danger-600"
          />
        </div>

        {/* Net change */}
        <div className={cn(
          'flex items-center justify-between p-3 rounded-lg',
          netChange > 0 ? 'bg-primary-50' : netChange < 0 ? 'bg-danger-50' : 'bg-slate-100'
        )}>
          <div className="flex items-center gap-2">
            <Equals size={18} className="text-slate-500" />
            <span className="text-sm text-slate-600">Net</span>
          </div>
          <motion.div
            animate={{
              color:
                netChange > 0
                  ? '#0284c7'
                  : netChange < 0
                  ? '#dc2626'
                  : '#64748b',
            }}
          >
            <AnimatedNumber
              value={netChange}
              prefix={netChange > 0 ? '+' : ''}
              className="text-lg font-semibold"
            />
          </motion.div>
        </div>
      </div>

      {/* Activity count */}
      <div className="mt-4 pt-3 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">Activities today</span>
          <span className="text-lg font-semibold text-primary-600">
            {todayLogs.length}
          </span>
        </div>
      </div>
    </GlowCard>
  );
}
