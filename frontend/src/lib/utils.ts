import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export function getStreakDays(logs: { timestamp: Date }[]): number {
  if (logs.length === 0) return 0;
  
  const sortedLogs = [...logs].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let streak = 0;
  const currentDate = new Date(today);
  
  const dateSet = new Set(
    sortedLogs.map((log) => {
      const d = new Date(log.timestamp);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    })
  );
  
  while (dateSet.has(currentDate.getTime())) {
    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }
  
  return streak;
}

export function getDaysAgo(date: Date): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);
  const diffTime = today.getTime() - compareDate.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}
