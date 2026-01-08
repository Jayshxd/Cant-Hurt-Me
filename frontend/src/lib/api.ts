const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export interface ApiLogEntry {
  id: string;
  type: string;
  points: number;
  timestamp: string;
  amount?: number;
}

export interface EnergyStateResponse {
  points: number;
  logs: ApiLogEntry[];
  lastResetDate: string;
}

export interface DailyStatsResponse {
  todayGains: number;
  todayLosses: number;
  netChange: number;
  todayActivities: number;
  streakDays: number;
}

export interface DayActivity {
  date: string;
  count: number;
  level: number;
}

export interface LogActionRequest {
  type: string;
  amount?: number;
}

export const api = {
  async getEnergyState(): Promise<EnergyStateResponse> {
    const response = await fetch(`${API_BASE_URL}/state`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch energy state');
    return response.json();
  },

  async logAction(request: LogActionRequest): Promise<ApiLogEntry> {
    const response = await fetch(`${API_BASE_URL}/log`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(request),
    });
    if (!response.ok) throw new Error('Failed to log action');
    return response.json();
  },

  async getDailyStats(): Promise<DailyStatsResponse> {
    const response = await fetch(`${API_BASE_URL}/stats`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch daily stats');
    return response.json();
  },

  async getActivityData(): Promise<DayActivity[]> {
    const response = await fetch(`${API_BASE_URL}/activity`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch activity data');
    return response.json();
  },

  async deleteLog(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/log/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to delete log');
  },
};
