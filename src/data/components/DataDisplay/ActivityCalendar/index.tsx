
import React from 'react';
import ActivityCalendarComponent from './ActivityCalendarComponent';
import { ComponentItem } from '@/types/component';
import { subDays, subMonths, addDays } from "date-fns";

const ActivityCalendarComponentItem: ComponentItem = {
  id: 112,
  name: "Activity Calendar",
  category: "Data Display",
  framework: "React",
  description: "A GitHub-style activity calendar heat map for visualizing data over time.",
  component: () => {
    // Generate sample data for the past year
    const today = new Date();
    const generateSampleData = () => {
      const data = [];
      
      // Generate some random activity over the past year
      for (let i = 0; i < 150; i++) {
        // Create more activity in recent months
        const daysAgo = Math.floor(Math.random() * 365);
        const date = subDays(today, daysAgo);
        
        // Higher activity for recent dates
        let count = 0;
        if (daysAgo < 30) {
          count = Math.floor(Math.random() * 10) + 1;
        } else if (daysAgo < 90) {
          count = Math.floor(Math.random() * 7) + 1;
        } else {
          count = Math.floor(Math.random() * 5) + 1;
        }
        
        data.push({ date, count });
      }
      
      // Add a streak in the last month
      const lastMonthStart = subMonths(today, 1);
      for (let i = 0; i < 14; i++) {
        const date = addDays(lastMonthStart, i);
        data.push({ date, count: Math.floor(Math.random() * 5) + 5 });
      }
      
      return data;
    };

    return (
      <div className="space-y-8">
        <div>
          <p className="text-sm mb-3 text-muted-foreground">GitHub-style Activity Calendar</p>
          <ActivityCalendarComponent 
            data={generateSampleData()} 
            colorLevels={5}
            startColor="hsl(var(--primary) / 0.1)"
            endColor="hsl(var(--primary))"
          />
        </div>

        <div>
          <p className="text-sm mb-3 text-muted-foreground">Custom Color Heat Map</p>
          <ActivityCalendarComponent 
            data={generateSampleData()}
            colorLevels={5}
            startColor="hsl(200 98% 95%)"
            endColor="hsl(200 98% 39%)"
            emptyColor="hsl(0 0% 93%)"
            showLabels={true}
          />
        </div>
      </div>
    );
  },
  code: `import React from 'react';
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { format, eachDayOfInterval, subDays, isSameDay, isToday } from "date-fns";

interface ActivityCalendarProps {
  data: Array<{
    date: Date;
    count: number;
  }>;
  colorLevels?: number;
  startColor?: string;
  endColor?: string;
  emptyColor?: string;
  daySize?: number;
  gap?: number;
  showLabels?: boolean;
}

const ActivityCalendar: React.FC<ActivityCalendarProps> = ({
  data,
  colorLevels = 5,
  startColor = "hsl(var(--primary) / 0.1)",
  endColor = "hsl(var(--primary))",
  emptyColor = "hsl(var(--muted))",
  daySize = 10,
  gap = 2,
  showLabels = true,
}) => {
  // Get data for the past year
  const today = new Date();
  const yearAgo = subDays(today, 365);
  
  // Get all days in the interval
  const allDays = eachDayOfInterval({
    start: yearAgo,
    end: today,
  });
  
  // Find the maximum count
  const maxCount = Math.max(...data.map(d => d.count), 1);
  
  // Get color for a specific count
  const getColorForCount = (count) => {
    if (count === 0) return emptyColor;
    const intensityLevel = Math.ceil((count / maxCount) * colorLevels);
    if (intensityLevel === colorLevels) return endColor;
    return startColor.replace(/0\\.\\d+/, (0.1 + (intensityLevel / colorLevels) * 0.9).toFixed(1));
  };
  
  // Get count for a specific date
  const getCountForDate = (date) => {
    const match = data.find(d => isSameDay(d.date, date));
    return match ? match.count : 0;
  };
  
  // Format weeks for the heat map display
  const weeks = [];
  let currentWeek = [];
  
  allDays.forEach(day => {
    if (currentWeek.length === 7) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
    currentWeek.push(day);
  });
  
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return (
    <div>
      <div className="grid" style={{ gridTemplateColumns: \`repeat(\${weeks.length}, \${daySize}px)\`, gap: \`\${gap}px\` }}>
        {weeks.map((week, weekIndex) => 
          week.map((day, dayIndex) => {
            const count = getCountForDate(day);
            
            return (
              <TooltipProvider key={\`day-\${format(day, 'yyyy-MM-dd')}\`}>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      className={cn(
                        "rounded-sm transition-colors",
                        isToday(day) && "ring-1 ring-primary"
                      )}
                      style={{
                        backgroundColor: getColorForCount(count),
                        width: daySize,
                        height: daySize,
                      }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-xs">
                      <div className="font-medium">{format(day, 'MMM d, yyyy')}</div>
                      <div>{count === 0 ? "No activity" : \`\${count} activities\`}</div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ActivityCalendar;`,
  tags: ["data display", "calendar", "heat map", "activity", "visualization"],
  isNew: true,
};

export default ActivityCalendarComponentItem;
