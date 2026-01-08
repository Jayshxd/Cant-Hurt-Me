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
  cyan: 'text-cyber-cyan hover:text-cyber-cyan hover:bg-cyber-cyan/10',
  red: 'text-cyber-red hover:text-cyber-red hover:bg-cyber-red/10',
  amber: 'text-cyber-amber hover:text-cyber-amber hover:bg-cyber-amber/10',
  green: 'text-cyber-green hover:text-cyber-green hover:bg-cyber-green/10',
};

const bgColorMap = {
  cyan: 'bg-cyber-cyan/10 border-cyber-cyan/30',
  red: 'bg-cyber-red/10 border-cyber-red/30',
  amber: 'bg-cyber-amber/10 border-cyber-amber/30',
  green: 'bg-cyber-green/10 border-cyber-green/30',
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
    if (type === 'RESOURCE_DEPLOY') {
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
      logAction('RESOURCE_DEPLOY', amount);
      setSpendingAmount('');
      setShowSpendingInput(false);
      setActiveCommand(null);
    }
  };

  const actions: ActionType[] = [
    'SYSTEM_SYNCH',
    'HARDWARE_OPT',
    'RESOURCE_DEPLOY',
    'CORE_FAILURE',
    'NETWORK_BREACH',
    'POWER_LEAK',
  ];

  return (
    <GlowCard className={cn('p-4', className)} glowColor="cyan">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
          COMMAND_INPUT
        </span>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyber-green animate-pulse" />
          <span className="text-xs font-mono text-gray-600">ONLINE</span>
        </div>
      </div>

      {/* Command buttons */}
      <div className="grid grid-cols-6 gap-2">
        {actions.map((actionType) => {
          const config = ACTION_CONFIG[actionType];
          const IconComponent = iconMap[config.icon as keyof typeof iconMap];
          const isActive = activeCommand === actionType;

          return (
            <motion.button
              key={actionType}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleAction(actionType)}
              className={cn(
                'relative flex flex-col items-center justify-center p-3 rounded-lg border border-transparent transition-all duration-200',
                colorMap[config.color],
                isActive && bgColorMap[config.color]
              )}
            >
              <IconComponent size={24} weight="fill" />
              <span className="text-[10px] font-mono mt-1 opacity-60">
                {config.points > 0 ? `+${config.points}` : config.points === 0 ? '-X' : config.points}
              </span>
              
              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 bg-cyber-dark border border-gray-700 rounded px-2 py-1 text-xs font-mono whitespace-nowrap z-20"
              >
                {config.label}
              </motion.div>
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
            <div className="flex items-center gap-2 p-3 bg-cyber-amber/5 border border-cyber-amber/30 rounded-lg">
              <CurrencyDollar size={20} className="text-cyber-amber" />
              <input
                type="number"
                value={spendingAmount}
                onChange={(e) => setSpendingAmount(e.target.value)}
                placeholder="Enter amount..."
                className="flex-1 bg-transparent border-none outline-none text-cyber-amber font-mono placeholder:text-cyber-amber/30"
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
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSpendingSubmit}
                className="px-3 py-1 bg-cyber-amber/20 text-cyber-amber rounded font-mono text-sm border border-cyber-amber/30 hover:bg-cyber-amber/30"
              >
                DEPLOY
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setShowSpendingInput(false);
                  setActiveCommand(null);
                }}
                className="p-1 text-gray-500 hover:text-gray-300"
              >
                <X size={16} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlowCard>
  );
}
