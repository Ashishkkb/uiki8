
import React from 'react';
import { cn } from "@/lib/utils";
import { TimelineItemProps } from './TimelineItemComponent';

interface TimelineListProps {
  children: React.ReactNode;
  className?: string;
}

const TimelineListComponent: React.FC<TimelineListProps> = ({
  children,
  className
}) => {
  // Count the number of children to mark the last item
  const childrenArray = React.Children.toArray(children).filter(Boolean);
  
  // Add the "last" prop to the last child
  const childrenWithProps = React.Children.map(childrenArray, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        last: index === childrenArray.length - 1
      } as Partial<TimelineItemProps>);
    }
    return child;
  });

  return (
    <div className={cn("space-y-1", className)}>
      {childrenWithProps}
    </div>
  );
};

export default TimelineListComponent;
