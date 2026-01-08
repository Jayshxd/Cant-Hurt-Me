'use client';

import { motion } from 'framer-motion';
import { Timer } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { useEnergyStore } from '@/store/useEnergyStore';
import { GlowCard } from './GlowCard';
import { AnimatedNumber } from './AnimatedNumber';

interface StreakCounterProps {
  className?: string;
}

export function StreakCounter({ className }: StreakCounterProps) {
  const getStreakDays = useEnergyStore((state) => state.getStreakDays);
  const streak = getStreakDays();
  
  const isActive = streak > 0;

  return (
    <GlowCard
      className={cn('p-4', className)}
      glowColor={isActive ? 'green' : 'cyan'}
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={isActive ? { rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className={cn(
            'p-2 rounded-lg',
            isActive ? 'bg-cyber-green/10 text-cyber-green' : 'bg-gray-800 text-gray-500'
          )}
        >
          <Timer size={24} weight="fill" />
        </motion.div>

        <div className="flex-1">
          <span className="text-xs font-mono text-gray-500 uppercase tracking-wider block">
            UPTIME
          </span>
          <div className="flex items-baseline gap-1">
            <AnimatedNumber
              value={streak}
              className={cn(
                'text-2xl font-bold font-mono',
                isActive ? 'text-cyber-green' : 'text-gray-400'
              )}
            />
            <span className="text-sm font-mono text-gray-500">DAYS</span>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex flex-col items-end">
          <motion.div
            animate={{ scale: isActive ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 1, repeat: Infinity }}
            className={cn(
              'h-2 w-2 rounded-full',
              isActive ? 'bg-cyber-green' : 'bg-gray-600'
            )}
          />
          <span className="text-[10px] font-mono text-gray-600 mt-1">
            {isActive ? 'ACTIVE' : 'IDLE'}
          </span>
        </div>
      </div>
    </GlowCard>
  );
}
