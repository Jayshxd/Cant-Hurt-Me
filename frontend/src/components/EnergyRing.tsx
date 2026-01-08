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
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const ringColor = isCritical ? 'stroke-cyber-red' : 'stroke-cyber-cyan';
  const glowColor = isCritical ? 'drop-shadow-[0_0_15px_rgba(255,7,58,0.8)]' : 'drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]';
  const textColor = isCritical ? 'text-cyber-red' : 'text-cyber-cyan';

  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      {/* Outer glow ring */}
      <div
        className={cn(
          'absolute inset-0 rounded-full blur-xl opacity-30',
          isCritical ? 'bg-cyber-red' : 'bg-cyber-cyan'
        )}
      />

      {/* SVG Ring */}
      <svg
        width={radius * 2 + strokeWidth * 2}
        height={radius * 2 + strokeWidth * 2}
        className={cn('transform -rotate-90', glowColor)}
      >
        {/* Background ring */}
        <circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-cyber-dark/50"
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

        {/* Animated pulse for critical mode */}
        {isCritical && (
          <motion.circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth / 2}
            className="stroke-cyber-red"
            strokeDasharray={circumference}
            animate={{
              strokeDashoffset: [circumference, 0],
              opacity: [1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}
      </svg>

      {/* Center content */}
      <div className="absolute flex flex-col items-center justify-center">
        <motion.span
          className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {isCritical ? '⚠ CRITICAL' : 'ENERGY'}
        </motion.span>
        
        <AnimatedNumber
          value={points}
          className={cn('text-5xl font-bold font-mono', textColor)}
        />
        
        <motion.span
          className="text-xs font-mono text-gray-600 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          POINTS
        </motion.span>
      </div>

      {/* Critical mode warning indicators */}
      {isCritical && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-cyber-red/50"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="absolute -top-2 left-1/2 -translate-x-1/2"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <span className="text-cyber-red text-2xl">⚠</span>
          </motion.div>
        </>
      )}
    </div>
  );
}
