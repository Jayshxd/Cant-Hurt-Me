'use client';

import { motion } from 'framer-motion';
import {
  EnergyRing,
  CommandBar,
  HistoryLog,
  StreakCounter,
  HeatMap,
  StatsCard,
  ScanlineOverlay,
} from '@/components';
import { useEnergyStore } from '@/store/useEnergyStore';

export default function Home() {
  const points = useEnergyStore((state) => state.points);
  const isCritical = points < 0;

  return (
    <main className="relative min-h-screen bg-cyber-black text-white overflow-hidden">
      {/* Scanline and overlay effects */}
      <ScanlineOverlay />

      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                boxShadow: isCritical
                  ? ['0 0 10px #ff073a', '0 0 20px #ff073a', '0 0 10px #ff073a']
                  : ['0 0 10px #00ffff', '0 0 20px #00ffff', '0 0 10px #00ffff'],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`h-3 w-3 rounded-full ${
                isCritical ? 'bg-cyber-red' : 'bg-cyber-cyan'
              }`}
            />
            <h1 className="text-lg font-mono font-bold tracking-widest">
              <span className={isCritical ? 'text-cyber-red' : 'text-cyber-cyan'}>
                CANT_HURT_ME
              </span>
              <span className="text-gray-500">{' // SYSTEM_MONITOR'}</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-500">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <div
              className={`px-2 py-1 rounded text-xs font-mono border ${
                isCritical
                  ? 'border-cyber-red/50 text-cyber-red bg-cyber-red/10'
                  : 'border-cyber-cyan/50 text-cyber-cyan bg-cyber-cyan/10'
              }`}
            >
              {isCritical ? 'CRITICAL' : 'OPERATIONAL'}
            </div>
          </div>
        </motion.header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-4 auto-rows-min">
          {/* Left column - Stats and Streak */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="col-span-12 md:col-span-3 space-y-4"
          >
            <StreakCounter />
            <StatsCard />
          </motion.div>

          {/* Center column - Energy Ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="col-span-12 md:col-span-6 flex items-center justify-center py-8"
          >
            <EnergyRing points={points} />
          </motion.div>

          {/* Right column - History Log */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-12 md:col-span-3"
          >
            <HistoryLog maxItems={8} />
          </motion.div>

          {/* Command Bar - Full width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="col-span-12"
          >
            <CommandBar />
          </motion.div>

          {/* HeatMap - Full width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="col-span-12"
          >
            <HeatMap />
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center text-xs font-mono text-gray-600"
        >
          <span>SYSTEM_VERSION: 1.0.0</span>
          <span className="mx-2">|</span>
          <span>STATUS: {isCritical ? 'ALERT' : 'NOMINAL'}</span>
          <span className="mx-2">|</span>
          <span>BUILD: STABLE</span>
        </motion.footer>
      </div>
    </main>
  );
}
