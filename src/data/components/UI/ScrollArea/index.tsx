
import React from 'react';
import ScrollAreaComponent from './ScrollAreaComponent';
import { ComponentItem } from '@/types/component';
import { Lorem } from 'lucide-react';

const ScrollAreaComponentItem: ComponentItem = {
  id: 110,
  name: "Advanced ScrollArea",
  category: "UI",
  framework: "React",
  description: "A customizable scroll area component with support for both vertical and horizontal scrolling.",
  component: () => (
    <div className="space-y-8 w-full">
      <div>
        <p className="text-sm mb-3 text-muted-foreground">Vertical Scroll Area (200px height)</p>
        <ScrollAreaComponent height="200px" className="border rounded-md">
          <div className="p-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="py-2">
                <div className="text-sm font-medium">Item {i + 1}</div>
                <div className="text-sm text-muted-foreground">
                  This is a scrollable content area that demonstrates the vertical scrolling capability.
                </div>
              </div>
            ))}
          </div>
        </ScrollAreaComponent>
      </div>
      
      <div>
        <p className="text-sm mb-3 text-muted-foreground">Horizontal Scroll Area</p>
        <ScrollAreaComponent height="100px" orientation="horizontal" className="border rounded-md">
          <div className="p-4 flex gap-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="min-w-[200px] p-4 border rounded-md">
                <div className="text-sm font-medium">Horizontal Item {i + 1}</div>
              </div>
            ))}
          </div>
        </ScrollAreaComponent>
      </div>
      
      <div>
        <p className="text-sm mb-3 text-muted-foreground">Both Directions Scroll Area</p>
        <ScrollAreaComponent height="300px" orientation="both" className="border rounded-md">
          <div className="p-4" style={{ width: '1000px' }}>
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="py-2">
                <div className="text-sm font-medium">Item {i + 1}</div>
                <div className="text-sm text-muted-foreground">
                  This content area allows scrolling in both vertical and horizontal directions.
                  Try scrolling down and to the right to see more content.
                </div>
              </div>
            ))}
          </div>
        </ScrollAreaComponent>
      </div>
    </div>
  ),
  code: `import React, { forwardRef } from 'react';
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
        maxHeight && \`max-h-[\${maxHeight}]\`,
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
            <ScrollBar orientation="vertical" className="transition-opacity" />
          )}
          {shouldShowHorizontal && (
            <ScrollBar orientation="horizontal" className="transition-opacity" />
          )}
        </>
      )}
    </UIScrollArea>
  );
});

export default ScrollArea;`,
  tags: ["ui", "scroll", "container", "overflow"],
  isNew: true,
};

export default ScrollAreaComponentItem;
