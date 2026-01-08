'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useEnergyStore } from '@/store/useEnergyStore';
import { GlowCard } from './GlowCard';

interface HeatMapProps {
  className?: string;
}

const levelColors = {
  0: 'bg-gray-800/50',
  1: 'bg-cyber-cyan/20',
  2: 'bg-cyber-cyan/40',
  3: 'bg-cyber-cyan/60',
  4: 'bg-cyber-cyan/80',
};

const levelGlows = {
  0: '',
  1: 'shadow-[0_0_3px_rgba(0,255,255,0.2)]',
  2: 'shadow-[0_0_5px_rgba(0,255,255,0.3)]',
  3: 'shadow-[0_0_8px_rgba(0,255,255,0.4)]',
  4: 'shadow-[0_0_12px_rgba(0,255,255,0.5)]',
};

export function HeatMap({ className }: HeatMapProps) {
  const getActivityData = useEnergyStore((state) => state.getActivityData);
  const activityData = useMemo(() => getActivityData(), [getActivityData]);

  // Get last 20 weeks (140 days) for display
  const weeksToShow = 20;
  const displayData = activityData.slice(-weeksToShow * 7);

  // Group by weeks
  const weeks: typeof displayData[] = [];
  for (let i = 0; i < displayData.length; i += 7) {
    weeks.push(displayData.slice(i, i + 7));
  }

  // Get months for labels
  const months = useMemo(() => {
    const monthLabels: { name: string; position: number }[] = [];
    let lastMonth = -1;

    displayData.forEach((day, index) => {
      const date = new Date(day.date);
      const month = date.getMonth();
      if (month !== lastMonth) {
        monthLabels.push({
          name: date.toLocaleDateString('en-US', { month: 'short' }),
          position: Math.floor(index / 7),
        });
        lastMonth = month;
      }
    });

    return monthLabels;
  }, [displayData]);

  const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  return (
    <GlowCard className={cn('p-4', className)} glowColor="cyan">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
          ACTIVITY_DENSITY
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-gray-600">Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={cn(
                  'w-3 h-3 rounded-sm',
                  levelColors[level as keyof typeof levelColors],
                  levelGlows[level as keyof typeof levelGlows]
                )}
              />
            ))}
          </div>
          <span className="text-xs font-mono text-gray-600">More</span>
        </div>
      </div>

      {/* Heatmap grid */}
      <div className="flex gap-4">
        {/* Day labels */}
        <div className="flex flex-col gap-[3px] text-xs font-mono text-gray-600 pt-5">
          {dayLabels.map((label, i) => (
            <div key={i} className="h-3 flex items-center">
              {label}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-x-auto">
          {/* Month labels */}
          <div className="flex mb-1 ml-0.5">
            {months.map((month, i) => (
              <div
                key={i}
                className="text-xs font-mono text-gray-600"
                style={{
                  marginLeft:
                    i === 0
                      ? `${month.position * 16}px`
                      : `${(month.position - (months[i - 1]?.position || 0) - 1) * 16}px`,
                }}
              >
                {month.name}
              </div>
            ))}
          </div>

          {/* Cells */}
          <div className="flex gap-[3px]">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {week.map((day, dayIndex) => (
                  <motion.div
                    key={day.date}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: (weekIndex * 7 + dayIndex) * 0.002,
                      type: 'spring',
                      stiffness: 500,
                    }}
                    className={cn(
                      'w-3 h-3 rounded-sm cursor-pointer transition-all duration-200 hover:ring-1 hover:ring-cyber-cyan/50',
                      levelColors[day.level],
                      levelGlows[day.level]
                    )}
                    title={`${day.date}: ${day.count} activities`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlowCard>
  );
}
