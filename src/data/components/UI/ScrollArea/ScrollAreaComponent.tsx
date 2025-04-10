
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
  // The orientation prop is not available on ScrollArea from shadcn/ui
  // We'll implement it with CSS and data attributes instead
  return (
    <ScrollArea 
      className={cn(
        "rounded-md border", 
        showScrollbar ? "p-4" : "", 
        className,
        orientation === "horizontal" ? "overflow-x-auto" : "",
        orientation === "vertical" ? "overflow-y-auto" : "",
        orientation === "both" ? "overflow-auto" : ""
      )}
      style={{ height }}
      data-orientation={orientation}
    >
      {children}
    </ScrollArea>
  );
};

export default ScrollAreaComponent;
