
import React from 'react';
import { ComponentItem } from "@/types/component";
import { Progress } from "@/components/ui/progress";

const ProgressComponentData: ComponentItem = {
  id: 404,
  name: "Progress",
  category: "UI",
  framework: "React",
  description: "Displays an indicator showing the completion progress of a task",
  code: `import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: \`translateX(-\${100 - (value || 0)}%)\` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }`,
  component: () => (
    <div className="space-y-4 w-full">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Processing...</span>
          <span>25%</span>
        </div>
        <Progress value={25} className="h-2" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Uploading...</span>
          <span>75%</span>
        </div>
        <Progress value={75} className="h-2" />
      </div>
    </div>
  ),
  tags: ["ui", "progress", "loader", "feedback"],
  fileSize: "0.9 KB",
  price: "Free",
  complexity: "simple",
  lastUpdated: "2023-12-10"
};

export default ProgressComponentData;
