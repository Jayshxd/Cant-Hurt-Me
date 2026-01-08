'use client';

import { motion } from 'framer-motion';
import { TrendUp, TrendDown, Minus } from '@phosphor-icons/react';
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
      glowColor={isCritical ? 'red' : 'cyan'}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
          DAILY_METRICS
        </span>
        <span className="text-xs font-mono text-gray-600">
          {new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
        </span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Today's gains */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendUp size={14} className="text-cyber-green" />
            <span className="text-[10px] font-mono text-gray-500 uppercase">
              GAINS
            </span>
          </div>
          <AnimatedNumber
            value={todayGains}
            prefix="+"
            className="text-lg font-mono text-cyber-green"
          />
        </div>

        {/* Today's losses */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendDown size={14} className="text-cyber-red" />
            <span className="text-[10px] font-mono text-gray-500 uppercase">
              LOSSES
            </span>
          </div>
          <AnimatedNumber
            value={todayLosses}
            className="text-lg font-mono text-cyber-red"
          />
        </div>

        {/* Net change */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Minus size={14} className="text-gray-400" />
            <span className="text-[10px] font-mono text-gray-500 uppercase">
              NET
            </span>
          </div>
          <motion.div
            animate={{
              color:
                netChange > 0
                  ? '#00ffff'
                  : netChange < 0
                  ? '#ff073a'
                  : '#6b7280',
            }}
          >
            <AnimatedNumber
              value={netChange}
              prefix={netChange > 0 ? '+' : ''}
              className="text-lg font-mono"
            />
          </motion.div>
        </div>
      </div>

      {/* Activity count */}
      <div className="mt-4 pt-3 border-t border-gray-800">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-gray-500">TRANSACTIONS</span>
          <span className="text-sm font-mono text-cyber-cyan">
            {todayLogs.length}
          </span>
        </div>
      </div>
    </GlowCard>
  );
}
