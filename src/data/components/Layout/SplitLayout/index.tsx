
import React from 'react';
import { ComponentItem } from "@/types/component";
import SplitLayout from "@/components/layout/SplitLayout";
import { ScrollArea } from "@/components/ui/scroll-area";

const SplitLayoutComponentData: ComponentItem = {
  id: 303,
  name: "Split Layout",
  category: "Layout",
  framework: "React",
  description: "A resizable split layout component for creating side-by-side or stacked interfaces",
  code: `import React from "react";
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

export default SplitLayout;`,
  component: () => (
    <div className="h-64 w-full">
      <SplitLayout 
        leftContent={
          <ScrollArea className="h-full">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Left Panel</h3>
              <p className="text-muted-foreground">
                This is the left panel content. It can be resized by dragging the handle.
              </p>
              <div className="h-20 rounded-md bg-muted flex items-center justify-center">
                Content Area
              </div>
            </div>
          </ScrollArea>
        }
        rightContent={
          <ScrollArea className="h-full">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Right Panel</h3>
              <p className="text-muted-foreground">
                This is the right panel content. Try resizing by dragging the middle handle.
              </p>
              <div className="h-20 rounded-md bg-muted flex items-center justify-center">
                Content Area
              </div>
            </div>
          </ScrollArea>
        }
      />
    </div>
  ),
  tags: ["layout", "split", "resizable", "panels"],
  fileSize: "1.2 KB",
  price: "Free",
  complexity: "medium",
  lastUpdated: "2023-12-05"
};

export default SplitLayoutComponentData;
