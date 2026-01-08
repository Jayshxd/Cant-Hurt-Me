'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useEnergyStore } from '@/store/useEnergyStore';

interface ScanlineOverlayProps {
  className?: string;
}

export function ScanlineOverlay({ className }: ScanlineOverlayProps) {
  const points = useEnergyStore((state) => state.points);
  const isCritical = points < 0;

  return (
    <>
      {/* Scanline effect */}
      <div
        className={cn(
          'pointer-events-none fixed inset-0 z-50',
          'bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.03)_50%)]',
          'bg-[length:100%_4px]',
          className
        )}
      />

      {/* Vignette effect */}
      <div
        className={cn(
          'pointer-events-none fixed inset-0 z-40',
          'bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]'
        )}
      />

      {/* Critical mode overlay */}
      {isCritical && (
        <>
          {/* Red tint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="pointer-events-none fixed inset-0 z-30 bg-cyber-red/10"
          />

          {/* Warning bars */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="pointer-events-none fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-transparent via-cyber-red to-transparent"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '-100%' }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="pointer-events-none fixed bottom-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-transparent via-cyber-red to-transparent"
          />
        </>
      )}
    </>
  );
}
