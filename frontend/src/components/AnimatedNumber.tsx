'use client';

import { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedNumberProps {
  value: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export function AnimatedNumber({
  value,
  className,
  prefix = '',
  suffix = '',
}: AnimatedNumberProps) {
  const spring = useSpring(value, {
    mass: 0.8,
    stiffness: 75,
    damping: 15,
  });

  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <motion.span className={cn('tabular-nums', className)}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </motion.span>
  );
}

// Slot machine style number animation for dramatic effect
interface SlotNumberProps {
  value: number;
  className?: string;
  digitCount?: number;
}

export function SlotNumber({ value, className, digitCount = 4 }: SlotNumberProps) {
  const digits = String(Math.abs(value)).padStart(digitCount, '0').split('');
  const isNegative = value < 0;

  return (
    <div className={cn('flex items-center', className)}>
      {isNegative && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-danger-600"
        >
          -
        </motion.span>
      )}
      {digits.map((digit, index) => (
        <motion.div
          key={`${index}-${digit}`}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: index * 0.05,
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
          className="relative"
        >
          <span>{digit}</span>
        </motion.div>
      ))}
    </div>
  );
}
