
import React from "react";
import { cn } from "@/lib/utils";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

export interface SplitLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  leftWidth?: number;
  rightWidth?: number;
  direction?: "horizontal" | "vertical";
  withHandle?: boolean;
  className?: string;
  leftClassName?: string;
  rightClassName?: string;
  handleClassName?: string;
}

const SplitLayout: React.FC<SplitLayoutProps> = ({
  leftContent,
  rightContent,
  leftWidth = 50,
  rightWidth = 50,
  direction = "horizontal",
  withHandle = true,
  className = "",
  leftClassName = "",
  rightClassName = "",
  handleClassName = "",
}) => {
  return (
    <ResizablePanelGroup
      direction={direction}
      className={cn("h-full min-h-[200px] w-full rounded-lg border", className)}
    >
      <ResizablePanel 
        defaultSize={leftWidth} 
        minSize={20}
        className={cn("p-4", leftClassName)}
      >
        {leftContent}
      </ResizablePanel>
      
      <ResizableHandle withHandle={withHandle} className={handleClassName} />
      
      <ResizablePanel 
        defaultSize={rightWidth} 
        minSize={20}
        className={cn("p-4", rightClassName)}
      >
        {rightContent}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default SplitLayout;
