'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ActionType, LogEntry, ACTION_CONFIG, DayActivity } from '@/types';
import { generateId } from '@/lib/utils';

interface EnergyState {
  points: number;
  logs: LogEntry[];
  lastResetDate: string;
  
  // Actions
  logAction: (type: ActionType, amount?: number) => void;
  getActivityData: () => DayActivity[];
  getStreakDays: () => number;
  resetDaily: () => void;
}

const STORAGE_KEY = 'cant-hurt-me-energy';

export const useEnergyStore = create<EnergyState>()(
  persist(
    (set, get) => ({
      points: 100, // Starting with 100 points
      logs: [],
      lastResetDate: new Date().toISOString().split('T')[0],

      logAction: (type: ActionType, amount?: number) => {
        const config = ACTION_CONFIG[type];
        let pointChange = config.points;
        
        // For spending, the amount is the negative points
        if (type === 'SPENDING' && amount !== undefined) {
          pointChange = -Math.abs(amount);
        }

        const newLog: LogEntry = {
          id: generateId(),
          type,
          points: pointChange,
          timestamp: new Date(),
          amount: type === 'SPENDING' ? amount : undefined,
        };

        set((state) => ({
          points: state.points + pointChange,
          logs: [newLog, ...state.logs].slice(0, 100), // Keep last 100 logs
        }));
      },

      getActivityData: (): DayActivity[] => {
        const logs = get().logs;
        const activityMap = new Map<string, number>();
        
        // Generate last 365 days
        const days: DayActivity[] = [];
        const today = new Date();
        
        for (let i = 364; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          activityMap.set(dateStr, 0);
        }
        
        // Count activities per day
        logs.forEach((log) => {
          const dateStr = new Date(log.timestamp).toISOString().split('T')[0];
          if (activityMap.has(dateStr)) {
            activityMap.set(dateStr, (activityMap.get(dateStr) || 0) + 1);
          }
        });
        
        // Convert to activity data with levels
        activityMap.forEach((count, date) => {
          let level: 0 | 1 | 2 | 3 | 4 = 0;
          if (count >= 5) level = 4;
          else if (count >= 3) level = 3;
          else if (count >= 2) level = 2;
          else if (count >= 1) level = 1;
          
          days.push({ date, count, level });
        });
        
        return days;
      },

      getStreakDays: (): number => {
        const logs = get().logs;
        if (logs.length === 0) return 0;
        
        const positiveActions = logs.filter((log) => log.points > 0);
        if (positiveActions.length === 0) return 0;
        
        const dateSet = new Set(
          positiveActions.map((log) => {
            const d = new Date(log.timestamp);
            return d.toISOString().split('T')[0];
          })
        );
        
        const today = new Date();
        let streak = 0;
        let currentDate = new Date(today);
        const maxIterations = 365; // Maximum 1 year of streak
        
        while (streak < maxIterations) {
          const dateStr = currentDate.toISOString().split('T')[0];
          if (dateSet.has(dateStr)) {
            streak++;
            currentDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
          } else {
            break;
          }
        }
        
        return streak;
      },

      resetDaily: () => {
        const today = new Date().toISOString().split('T')[0];
        const lastReset = get().lastResetDate;
        
        if (lastReset !== today) {
          set({ lastResetDate: today });
        }
      },
    }),
    {
      name: STORAGE_KEY,
    }
  )
);
