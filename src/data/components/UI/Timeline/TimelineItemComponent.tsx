
import React from 'react';
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  children: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
  date?: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
  last?: boolean;
}

const TimelineItemComponent: React.FC<TimelineItemProps> = ({
  children,
  title,
  icon,
  date,
  variant = 'default',
  className,
  last = false
}) => {
  const variantClasses = {
    default: "border-gray-200 bg-gray-100 text-gray-600",
    success: "border-green-200 bg-green-100 text-green-600",
    warning: "border-amber-200 bg-amber-100 text-amber-600",
    error: "border-red-200 bg-red-100 text-red-600",
    info: "border-blue-200 bg-blue-100 text-blue-600"
  };

  return (
    <div className={cn("relative", className)}>
      {/* Timeline connector */}
      {!last && (
        <div 
          className="absolute left-5 top-5 h-full w-px bg-border"
          aria-hidden="true"
        />
      )}

      <div className="flex gap-4">
        {/* Icon/bullet */}
        <div className={cn(
          "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2",
          variantClasses[variant]
        )}>
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
            {title && (
              <h4 className="text-sm font-medium">{title}</h4>
            )}
            {date && (
              <time className="text-xs text-muted-foreground sm:ml-auto">{date}</time>
            )}
          </div>

          <div className="mt-2 text-sm text-muted-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineItemComponent;
