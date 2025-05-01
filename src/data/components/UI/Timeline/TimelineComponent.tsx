
import React from 'react';
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  active?: boolean;
}

export const TimelineItem = ({
  date,
  title,
  description,
  icon,
  className,
  active = false,
}: TimelineItemProps) => {
  return (
    <div className={cn("relative pl-8", className)}>
      {/* Timeline connector */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-muted-foreground/30" />
      
      {/* Timeline circle/icon */}
      <div className={cn(
        "absolute left-[-8px] top-0 w-4 h-4 rounded-full border-2 border-background",
        active ? "bg-primary" : "bg-muted"
      )}>
        {icon && (
          <div className="absolute inset-0 flex items-center justify-center text-white" style={{ fontSize: '0.5rem' }}>
            {icon}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="mb-8">
        <time className="text-sm text-muted-foreground">{date}</time>
        <h3 className="text-lg font-semibold mt-1">{title}</h3>
        <p className="mt-1 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

interface TimelineProps {
  items: Array<Omit<TimelineItemProps, 'active'> & { active?: boolean }>;
  className?: string;
}

const TimelineComponent = () => {
  const timelineItems = [
    {
      date: "Jan 2023",
      title: "Project Kickoff",
      description: "Initial planning and requirements gathering for the project.",
      active: true,
    },
    {
      date: "Mar 2023",
      title: "Design Phase",
      description: "UI/UX design and prototyping phase completed.",
      active: true,
    },
    {
      date: "Jun 2023",
      title: "Development",
      description: "Core functionality developed and initial testing performed.",
      active: true,
    },
    {
      date: "Sep 2023",
      title: "Beta Release",
      description: "Beta version released to select users for feedback.",
      active: false,
    },
    {
      date: "Dec 2023",
      title: "1.0 Launch",
      description: "Official product launch with full feature set.",
      active: false,
    },
  ];

  return (
    <div className="w-full max-w-xl">
      <div className="space-y-0">
        {timelineItems.map((item, index) => (
          <TimelineItem
            key={index}
            date={item.date}
            title={item.title}
            description={item.description}
            active={item.active}
          />
        ))}
      </div>
    </div>
  );
};

export default TimelineComponent;
