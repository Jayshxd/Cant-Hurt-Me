'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lightning,
  Barbell,
  CurrencyDollar,
  Skull,
  WifiSlash,
  BatteryWarning,
  X,
} from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { ActionType, ACTION_CONFIG } from '@/types';
import { useEnergyStore } from '@/store/useEnergyStore';
import { GlowCard } from './GlowCard';

const iconMap = {
  Lightning,
  Barbell,
  CurrencyDollar,
  Skull,
  WifiSlash,
  BatteryWarning,
};

const colorMap = {
  primary: 'text-primary-600 hover:bg-primary-50',
  danger: 'text-danger-600 hover:bg-danger-50',
  warning: 'text-warning-600 hover:bg-warning-50',
  success: 'text-success-600 hover:bg-success-50',
};

const bgColorMap = {
  primary: 'bg-primary-100 border-primary-200',
  danger: 'bg-danger-100 border-danger-200',
  warning: 'bg-warning-100 border-warning-200',
  success: 'bg-success-100 border-success-200',
};

interface CommandBarProps {
  className?: string;
}

export function CommandBar({ className }: CommandBarProps) {
  const [showSpendingInput, setShowSpendingInput] = useState(false);
  const [spendingAmount, setSpendingAmount] = useState('');
  const [activeCommand, setActiveCommand] = useState<ActionType | null>(null);
  const logAction = useEnergyStore((state) => state.logAction);

  const handleAction = (type: ActionType) => {
    if (type === 'SPENDING') {
      setShowSpendingInput(true);
      setActiveCommand(type);
    } else {
      logAction(type);
      // Flash effect
      setActiveCommand(type);
      setTimeout(() => setActiveCommand(null), 300);
    }
  };

  const handleSpendingSubmit = () => {
    const amount = parseInt(spendingAmount, 10);
    if (!isNaN(amount) && amount > 0) {
      logAction('SPENDING', amount);
      setSpendingAmount('');
      setShowSpendingInput(false);
      setActiveCommand(null);
    }
  };

  const actions: ActionType[] = [
    'FOCUS_SESSION',
    'WORKOUT',
    'SPENDING',
    'MAJOR_SETBACK',
    'MODERATE_SETBACK',
    'MINOR_SETBACK',
  ];

  return (
    <GlowCard className={cn('p-6', className)} glowColor="primary">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-slate-600">
          Quick Actions
        </span>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-success-500" />
          <span className="text-xs text-slate-500">Ready</span>
        </div>
      </div>

      {/* Command buttons */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {actions.map((actionType) => {
          const config = ACTION_CONFIG[actionType];
          const IconComponent = iconMap[config.icon as keyof typeof iconMap];
          const isActive = activeCommand === actionType;

          return (
            <motion.button
              key={actionType}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAction(actionType)}
              className={cn(
                'relative flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 bg-white transition-all duration-200',
                colorMap[config.color],
                isActive && bgColorMap[config.color]
              )}
            >
              <IconComponent size={28} weight="duotone" />
              <span className="text-xs font-medium mt-2 text-slate-700">
                {config.label}
              </span>
              <span className={cn(
                'text-xs mt-1',
                config.points > 0 ? 'text-success-600' : config.points < 0 ? 'text-danger-600' : 'text-warning-600'
              )}>
                {config.points > 0 ? `+${config.points}` : config.points === 0 ? 'Variable' : config.points}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Spending input overlay */}
      <AnimatePresence>
        {showSpendingInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 overflow-hidden"
          >
            <div className="flex items-center gap-3 p-4 bg-warning-50 border border-warning-200 rounded-xl">
              <CurrencyDollar size={24} className="text-warning-600" />
              <input
                type="number"
                value={spendingAmount}
                onChange={(e) => setSpendingAmount(e.target.value)}
                placeholder="Enter amount..."
                className="flex-1 bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSpendingSubmit();
                  if (e.key === 'Escape') {
                    setShowSpendingInput(false);
                    setActiveCommand(null);
                  }
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSpendingSubmit}
                className="px-4 py-2 bg-warning-500 text-white rounded-lg font-medium text-sm hover:bg-warning-600 transition-colors"
              >
                Log Spending
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setShowSpendingInput(false);
                  setActiveCommand(null);
                }}
                className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlowCard>
  );
}
