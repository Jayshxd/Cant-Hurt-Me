'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'red' | 'amber' | 'green' | 'purple';
  onClick?: () => void;
  animate?: boolean;
}

const glowColorMap = {
  cyan: 'from-cyber-cyan/20 via-cyber-cyan/10 to-transparent',
  red: 'from-cyber-red/20 via-cyber-red/10 to-transparent',
  amber: 'from-cyber-amber/20 via-cyber-amber/10 to-transparent',
  green: 'from-cyber-green/20 via-cyber-green/10 to-transparent',
  purple: 'from-cyber-purple/20 via-cyber-purple/10 to-transparent',
};

const borderColorMap = {
  cyan: 'border-cyber-cyan/30 hover:border-cyber-cyan/60',
  red: 'border-cyber-red/30 hover:border-cyber-red/60',
  amber: 'border-cyber-amber/30 hover:border-cyber-amber/60',
  green: 'border-cyber-green/30 hover:border-cyber-green/60',
  purple: 'border-cyber-purple/30 hover:border-cyber-purple/60',
};

export function GlowCard({
  children,
  className,
  glowColor = 'cyan',
  onClick,
  animate = true,
}: GlowCardProps) {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : undefined}
      animate={animate ? { opacity: 1, y: 0 } : undefined}
      whileHover={onClick ? { scale: 1.02 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={cn(
        'relative overflow-hidden rounded-lg border bg-cyber-dark/80 backdrop-blur-sm transition-all duration-300',
        borderColorMap[glowColor],
        onClick && 'cursor-pointer',
        className
      )}
    >
      {/* Background gradient glow effect */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-radial opacity-50',
          glowColorMap[glowColor]
        )}
      />
      
      {/* Scanline effect */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]" />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
