'use client';

import { motion } from 'framer-motion';
import {
  EnergyRing,
  CommandBar,
  HistoryLog,
  StreakCounter,
  HeatMap,
  StatsCard,
} from '@/components';
import { useEnergyStore } from '@/store/useEnergyStore';

export default function Home() {
  const points = useEnergyStore((state) => state.points);
  const isCritical = points < 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Main content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <div
              className={`h-3 w-3 rounded-full ${
                isCritical ? 'bg-danger-500' : 'bg-success-500'
              }`}
            />
            <h1 className="text-xl font-semibold text-slate-800">
              Cant Hurt Me
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <div
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                isCritical
                  ? 'bg-danger-100 text-danger-700'
                  : 'bg-success-100 text-success-700'
              }`}
            >
              {isCritical ? 'Needs Attention' : 'On Track'}
            </div>
          </div>
        </motion.header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-6 auto-rows-min">
          {/* Left column - Stats and Streak */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="col-span-12 md:col-span-3 space-y-6"
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
          className="mt-8 text-center text-sm text-slate-400"
        >
          <span>Version 1.0.0</span>
          <span className="mx-2">•</span>
          <span>Stay Disciplined</span>
        </motion.footer>
      </div>
    </main>
  );
}
