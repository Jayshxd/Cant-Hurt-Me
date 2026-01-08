'use client';

import { motion } from 'framer-motion';
import { Fire } from '@phosphor-icons/react';
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
      glowColor={isActive ? 'success' : 'primary'}
    >
      <div className="flex items-center gap-4">
        <div
          className={cn(
            'p-3 rounded-xl',
            isActive ? 'bg-success-100 text-success-600' : 'bg-slate-100 text-slate-400'
          )}
        >
          <Fire size={28} weight={isActive ? 'fill' : 'regular'} />
        </div>

        <div className="flex-1">
          <span className="text-sm text-slate-500 block">
            Current Streak
          </span>
          <div className="flex items-baseline gap-2">
            <AnimatedNumber
              value={streak}
              className={cn(
                'text-3xl font-bold',
                isActive ? 'text-success-600' : 'text-slate-400'
              )}
            />
            <span className="text-sm text-slate-500">days</span>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex flex-col items-end">
          <motion.div
            animate={{ scale: isActive ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 1, repeat: Infinity }}
            className={cn(
              'h-3 w-3 rounded-full',
              isActive ? 'bg-success-500' : 'bg-slate-300'
            )}
          />
          <span className="text-xs text-slate-400 mt-1">
            {isActive ? 'Active' : 'Start today!'}
          </span>
        </div>
      </div>
    </GlowCard>
  );
}
