'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'primary' | 'danger' | 'warning' | 'success';
  onClick?: () => void;
  animate?: boolean;
}

const borderColorMap = {
  primary: 'border-primary-200 hover:border-primary-300',
  danger: 'border-danger-200 hover:border-danger-300',
  warning: 'border-warning-200 hover:border-warning-300',
  success: 'border-success-200 hover:border-success-300',
};

export function GlowCard({
  children,
  className,
  glowColor = 'primary',
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
        'relative overflow-hidden rounded-xl border bg-white shadow-soft transition-all duration-300',
        borderColorMap[glowColor],
        onClick && 'cursor-pointer',
        className
      )}
    >
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
