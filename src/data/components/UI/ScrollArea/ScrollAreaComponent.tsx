
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ScrollAreaProps {
  children: React.ReactNode;
  className?: string;
  height?: string;
  orientation?: "vertical" | "horizontal" | "both";
  showScrollbar?: boolean;
}

const ScrollAreaComponent: React.FC<ScrollAreaProps> = ({
  children,
  className,
  height = "400px",
  orientation = "vertical",
  showScrollbar = true
}) => {
  return (
    <ScrollArea 
      className={cn(
        "rounded-md border", 
        showScrollbar ? "p-4" : "", 
        className
      )}
      style={{ height }}
      orientation={orientation}
    >
      {children}
    </ScrollArea>
  );
};

export default ScrollAreaComponent;
