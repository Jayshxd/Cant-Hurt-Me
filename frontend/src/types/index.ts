export type ActionType = 
  | 'SYSTEM_SYNCH'     // Focus Mode (Study > 6hr): +10
  | 'HARDWARE_OPT'     // Physical Tuning (Workout): +5
  | 'RESOURCE_DEPLOY'  // Spending Money: -X
  | 'CORE_FAILURE'     // Relapse Type A: -15
  | 'NETWORK_BREACH'   // Relapse Type B: -10
  | 'POWER_LEAK';      // Relapse Type C: -5

export interface ActionConfig {
  type: ActionType;
  label: string;
  points: number;
  icon: string;
  color: 'cyan' | 'red' | 'amber' | 'green';
  description: string;
}

export interface LogEntry {
  id: string;
  type: ActionType;
  points: number;
  timestamp: Date;
  amount?: number; // For RESOURCE_DEPLOY
}

export interface DayActivity {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export const ACTION_CONFIG: Record<ActionType, ActionConfig> = {
  SYSTEM_SYNCH: {
    type: 'SYSTEM_SYNCH',
    label: 'SYSTEM_SYNCH',
    points: 10,
    icon: 'Lightning',
    color: 'cyan',
    description: 'Focus Mode > 6hr',
  },
  HARDWARE_OPT: {
    type: 'HARDWARE_OPT',
    label: 'HARDWARE_OPT',
    points: 5,
    icon: 'Barbell',
    color: 'green',
    description: 'Physical Tuning',
  },
  RESOURCE_DEPLOY: {
    type: 'RESOURCE_DEPLOY',
    label: 'RESOURCE_DEPLOY',
    points: 0, // Variable
    icon: 'CurrencyDollar',
    color: 'amber',
    description: 'Resource Deployment',
  },
  CORE_FAILURE: {
    type: 'CORE_FAILURE',
    label: 'CORE_FAILURE',
    points: -15,
    icon: 'Skull',
    color: 'red',
    description: 'Critical System Failure',
  },
  NETWORK_BREACH: {
    type: 'NETWORK_BREACH',
    label: 'NETWORK_BREACH',
    points: -10,
    icon: 'WifiSlash',
    color: 'red',
    description: 'Network Security Breach',
  },
  POWER_LEAK: {
    type: 'POWER_LEAK',
    label: 'POWER_LEAK',
    points: -5,
    icon: 'BatteryWarning',
    color: 'red',
    description: 'Power Leak Detected',
  },
};
