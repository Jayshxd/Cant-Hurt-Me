export type ActionType = 
  | 'FOCUS_SESSION'    // Study/Focus > 6hr: +10
  | 'WORKOUT'          // Physical Exercise: +5
  | 'SPENDING'         // Spending Money: -X
  | 'MAJOR_SETBACK'    // Major Relapse: -15
  | 'MODERATE_SETBACK' // Moderate Relapse: -10
  | 'MINOR_SETBACK';   // Minor Relapse: -5

export interface ActionConfig {
  type: ActionType;
  label: string;
  points: number;
  icon: string;
  color: 'primary' | 'danger' | 'warning' | 'success';
  description: string;
}

export interface LogEntry {
  id: string;
  type: ActionType;
  points: number;
  timestamp: Date;
  amount?: number; // For SPENDING
}

export interface DayActivity {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export const ACTION_CONFIG: Record<ActionType, ActionConfig> = {
  FOCUS_SESSION: {
    type: 'FOCUS_SESSION',
    label: 'Focus Session',
    points: 10,
    icon: 'Lightning',
    color: 'primary',
    description: 'Deep work session (6+ hours)',
  },
  WORKOUT: {
    type: 'WORKOUT',
    label: 'Workout',
    points: 5,
    icon: 'Barbell',
    color: 'success',
    description: 'Physical exercise completed',
  },
  SPENDING: {
    type: 'SPENDING',
    label: 'Spending',
    points: 0, // Variable
    icon: 'CurrencyDollar',
    color: 'warning',
    description: 'Money spent',
  },
  MAJOR_SETBACK: {
    type: 'MAJOR_SETBACK',
    label: 'Major Setback',
    points: -15,
    icon: 'Skull',
    color: 'danger',
    description: 'Major discipline failure',
  },
  MODERATE_SETBACK: {
    type: 'MODERATE_SETBACK',
    label: 'Moderate Setback',
    points: -10,
    icon: 'WifiSlash',
    color: 'danger',
    description: 'Moderate discipline failure',
  },
  MINOR_SETBACK: {
    type: 'MINOR_SETBACK',
    label: 'Minor Setback',
    points: -5,
    icon: 'BatteryWarning',
    color: 'danger',
    description: 'Minor discipline failure',
  },
};
