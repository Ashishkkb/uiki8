
import React from 'react';
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { format, eachDayOfInterval, subDays, addDays, isSameDay, isToday, startOfWeek, getDay } from "date-fns";

interface ActivityCalendarProps {
  data: Array<{
    date: Date;
    count: number;
  }>;
  colorLevels?: number;
  startColor?: string;
  endColor?: string;
  emptyColor?: string;
  dayClassName?: string;
  daySize?: number;
  gap?: number;
  showLabels?: boolean;
  className?: string;
}

const ActivityCalendar: React.FC<ActivityCalendarProps> = ({
  data,
  colorLevels = 5,
  startColor = "hsl(var(--primary) / 0.1)",
  endColor = "hsl(var(--primary))",
  emptyColor = "hsl(var(--muted))",
  dayClassName,
  daySize = 10,
  gap = 2,
  showLabels = true,
  className,
}) => {
  // Get today and 365 days ago
  const today = new Date();
  const yearAgo = subDays(today, 365);
  
  // Get all days between today and a year ago
  const allDays = eachDayOfInterval({
    start: yearAgo,
    end: today,
  });

  // Find the maximum count to calculate color intensity
  const maxCount = Math.max(...data.map(d => d.count), 1);
  
  // Get the color for a specific count
  const getColorForCount = (count: number) => {
    if (count === 0) return emptyColor;
    
    // Calculate intensity level
    const intensityLevel = Math.ceil((count / maxCount) * colorLevels);
    
    // Return color with opacity based on intensity
    if (intensityLevel === colorLevels) return endColor;
    return startColor.replace(/0\.\d+/, (0.1 + (intensityLevel / colorLevels) * 0.9).toFixed(1));
  };
  
  // Get count for a specific date
  const getCountForDate = (date: Date) => {
    const match = data.find(d => isSameDay(d.date, date));
    return match ? match.count : 0;
  };
  
  // Get label for a specific count
  const getLabel = (count: number) => {
    if (count === 0) return "No activity";
    if (count === 1) return "1 activity";
    return `${count} activities`;
  };
  
  // Generate weeks layout
  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];
  
  // Calculate first day offset to align with week grid
  const firstDayOffset = getDay(yearAgo);
  
  // Add empty cells for the first week if needed
  if (firstDayOffset > 0) {
    for (let i = 0; i < firstDayOffset; i++) {
      currentWeek.push(null as unknown as Date);
    }
  }
  
  // Add all days to weeks
  allDays.forEach(day => {
    if (currentWeek.length === 7) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
    currentWeek.push(day);
  });
  
  // Add the last partial week
  if (currentWeek.length > 0) {
    weeks.push([...currentWeek]);
  }

  return (
    <div className={cn("inline-block", className)}>
      {showLabels && (
        <div className="flex text-xs text-muted-foreground mb-1">
          <div style={{ width: showLabels ? '20px' : '0' }}></div>
          <div className="flex justify-between w-full">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>
        </div>
      )}
      
      <div className="flex">
        {showLabels && (
          <div className="flex flex-col justify-around text-xs text-muted-foreground mr-2" style={{ width: '20px' }}>
            <span>Jan</span>
            <span>Mar</span>
            <span>May</span>
            <span>Jul</span>
            <span>Sep</span>
            <span>Nov</span>
          </div>
        )}
        
        <div 
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${weeks.length}, ${daySize}px)`,
            gridTemplateRows: `repeat(7, ${daySize}px)`,
            gap: `${gap}px`,
            transform: 'rotate(-90deg) translateX(-100%)',
            transformOrigin: 'top left',
            width: `${weeks.length * (daySize + gap)}px`,
            height: `${7 * (daySize + gap)}px`
          }}
        >
          {weeks.map((week, weekIndex) => 
            week.map((day, dayIndex) => {
              if (!day) return <div key={`empty-${weekIndex}-${dayIndex}`} />;
              
              const count = getCountForDate(day);
              const backgroundColor = getColorForCount(count);
              
              return (
                <TooltipProvider key={`day-${format(day, 'yyyy-MM-dd')}`}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={cn(
                          "rounded-sm transition-colors",
                          isToday(day) && "ring-1 ring-primary",
                          dayClassName
                        )}
                        style={{
                          backgroundColor,
                          width: daySize,
                          height: daySize,
                          transform: 'rotate(90deg)',
                        }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-xs">
                        <div className="font-medium">{format(day, 'MMM d, yyyy')}</div>
                        <div>{getLabel(count)}</div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-2 mt-4">
        <span className="text-xs text-muted-foreground">Less</span>
        {Array.from({ length: colorLevels }).map((_, i) => (
          <div
            key={`legend-${i}`}
            className="rounded-sm"
            style={{
              backgroundColor: i === 0 ? emptyColor : getColorForCount(Math.ceil((i / colorLevels) * maxCount)),
              width: 10,
              height: 10,
            }}
          />
        ))}
        <span className="text-xs text-muted-foreground">More</span>
      </div>
    </div>
  );
};

export default ActivityCalendar;
