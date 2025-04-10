
import React from 'react';
import { cn } from "@/lib/utils";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

interface ResizablePanelProps {
  firstPanelContent: React.ReactNode;
  secondPanelContent: React.ReactNode;
  direction?: "horizontal" | "vertical";
  firstPanelDefaultSize?: number;
  secondPanelDefaultSize?: number;
  className?: string;
  handleClassName?: string;
  showHandle?: boolean;
}

const ResizablePanelComponent: React.FC<ResizablePanelProps> = ({
  firstPanelContent,
  secondPanelContent,
  direction = "horizontal",
  firstPanelDefaultSize = 50,
  secondPanelDefaultSize = 50,
  className,
  handleClassName,
  showHandle = true
}) => {
  return (
    <ResizablePanelGroup
      direction={direction}
      className={cn(
        "min-h-[200px] w-full rounded-lg border",
        className
      )}
    >
      <ResizablePanel defaultSize={firstPanelDefaultSize} minSize={20}>
        <div className="flex h-full items-center justify-center p-6">
          {firstPanelContent}
        </div>
      </ResizablePanel>
      
      <ResizableHandle withHandle={showHandle} className={handleClassName} />
      
      <ResizablePanel defaultSize={secondPanelDefaultSize} minSize={20}>
        <div className="flex h-full items-center justify-center p-6">
          {secondPanelContent}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ResizablePanelComponent;
