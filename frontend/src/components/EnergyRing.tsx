'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AnimatedNumber } from './AnimatedNumber';

interface EnergyRingProps {
  points: number;
  maxPoints?: number;
  className?: string;
}

export function EnergyRing({ points, maxPoints = 200, className }: EnergyRingProps) {
  const isCritical = points < 0;
  const percentage = Math.min(Math.max((points / maxPoints) * 100, 0), 100);
  const radius = 120;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const ringColor = isCritical ? 'stroke-danger-500' : 'stroke-primary-500';
  const textColor = isCritical ? 'text-danger-600' : 'text-primary-600';
  const bgColor = isCritical ? 'bg-danger-50' : 'bg-primary-50';

  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      {/* Background circle */}
      <div
        className={cn(
          'absolute rounded-full opacity-30',
          bgColor
        )}
        style={{ width: radius * 2 + strokeWidth * 2 + 20, height: radius * 2 + strokeWidth * 2 + 20 }}
      />

      {/* SVG Ring */}
      <svg
        width={radius * 2 + strokeWidth * 2}
        height={radius * 2 + strokeWidth * 2}
        className="transform -rotate-90"
      >
        {/* Background ring */}
        <circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-200"
        />

        {/* Progress ring */}
        <motion.circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={ringColor}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: isCritical ? circumference : strokeDashoffset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute flex flex-col items-center justify-center">
        <motion.span
          className="text-sm font-medium text-slate-500 mb-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {isCritical ? '⚠️ Low Points' : 'Energy Points'}
        </motion.span>
        
        <AnimatedNumber
          value={points}
          className={cn('text-5xl font-bold', textColor)}
        />
        
        <motion.span
          className="text-sm text-slate-400 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          of {maxPoints} max
        </motion.span>
      </div>

      {/* Critical mode warning */}
      {isCritical && (
        <motion.div
          className="absolute -bottom-4 bg-danger-100 text-danger-700 px-3 py-1 rounded-full text-sm font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Time to get back on track!
        </motion.div>
      )}
    </div>
  );
}
