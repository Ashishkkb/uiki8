import React, { forwardRef } from 'react';
import { cn } from "@/lib/utils";
import { ScrollArea as UIScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type ScrollAreaOrientation = "vertical" | "horizontal" | "both";

interface ScrollAreaProps {
  children: React.ReactNode;
  className?: string;
  viewportClassName?: string;
  height?: string;
  maxHeight?: string;
  orientation?: ScrollAreaOrientation;
  showScrollbar?: boolean;
}

const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(({
  children,
  className,
  viewportClassName,
  height = "100%",
  maxHeight,
  orientation = "vertical",
  showScrollbar = true
}, ref) => {
  const shouldShowHorizontal = orientation === "horizontal" || orientation === "both";
  const shouldShowVertical = orientation === "vertical" || orientation === "both";

  return (
    <UIScrollArea
      ref={ref}
      className={cn(
        "relative overflow-hidden",
        maxHeight && `max-h-[${maxHeight}]`,
        className
      )}
      style={{ height }}
    >
      <div className={cn("h-full w-full", viewportClassName)}>
        {children}
      </div>
      {showScrollbar && (
        <>
          {shouldShowVertical && (
            <ScrollBar 
              orientation="vertical" 
              className="transition-opacity" 
            />
          )}
          {shouldShowHorizontal && (
            <ScrollBar 
              orientation="horizontal" 
              className="transition-opacity" 
            />
          )}
        </>
      )}
    </UIScrollArea>
  );
});

ScrollArea.displayName = "ScrollArea";

export default ScrollArea;
