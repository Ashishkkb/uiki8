
import React from 'react';
import { ComponentItem } from "@/types/component";
import TimelineItemComponent from "./TimelineItemComponent";
import TimelineListComponent from "./TimelineListComponent";

// Create and export TimelineComponents
const TimelineComponents = {
  Item: TimelineItemComponent,
  List: TimelineListComponent
};

// Export the Timeline component item
const TimelineComponentItem: ComponentItem = {
  id: 132,
  name: "Timeline",
  category: "UI",
  framework: "React",
  description: "A set of components for creating vertical timelines to show chronological events.",
  code: `import React from 'react';
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

const TimelineItem: React.FC<TimelineItemProps> = ({
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

interface TimelineListProps {
  children: React.ReactNode;
  className?: string;
}

const TimelineList: React.FC<TimelineListProps> = ({
  children,
  className
}) => {
  // Count the number of children to mark the last item
  const childrenArray = React.Children.toArray(children);
  
  // Add the "last" prop to the last child
  const childrenWithProps = React.Children.map(childrenArray, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        last: index === childrenArray.length - 1
      });
    }
    return child;
  });

  return (
    <div className={cn("space-y-1", className)}>
      {childrenWithProps}
    </div>
  );
};

// Export the Timeline components
const Timeline = {
  Item: TimelineItem,
  List: TimelineList
};

export default Timeline;`,
  component: TimelineComponents.List,
  tags: ["UI", "timeline", "history", "events", "activity"],
  isNew: true,
  fileSize: "2.8 KB",
  complexity: "medium"
};

export default TimelineComponentItem;
