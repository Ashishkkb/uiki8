
import React from 'react';
import SeparatorComponent from './SeparatorComponent';
import { ComponentItem } from '@/types/component';

const SeparatorComponentItem: ComponentItem = {
  id: 108,
  name: "Advanced Separator",
  category: "UI",
  framework: "React",
  description: "A highly customizable separator component with label support and multiple visual styles.",
  component: () => (
    <div className="space-y-8 w-full max-w-md">
      <div>
        <p className="text-sm mb-2 text-muted-foreground">Default Separator</p>
        <SeparatorComponent />
      </div>
      
      <div>
        <p className="text-sm mb-2 text-muted-foreground">Labeled Separator</p>
        <SeparatorComponent label="Section" />
      </div>
      
      <div>
        <p className="text-sm mb-2 text-muted-foreground">Dashed Style</p>
        <SeparatorComponent variant="dashed" />
      </div>
      
      <div>
        <p className="text-sm mb-2 text-muted-foreground">Dotted Style</p>
        <SeparatorComponent variant="dotted" />
      </div>
      
      <div>
        <p className="text-sm mb-2 text-muted-foreground">Labeled with Position</p>
        <SeparatorComponent label="Left Aligned" labelPosition="left" />
        <div className="h-4" />
        <SeparatorComponent label="Right Aligned" labelPosition="right" />
      </div>
      
      <div>
        <p className="text-sm mb-2 text-muted-foreground">Vertical Separator</p>
        <div className="flex h-12 items-center">
          <span>Left</span>
          <SeparatorComponent orientation="vertical" className="mx-4" />
          <span>Right</span>
        </div>
      </div>
    </div>
  ),
  code: `import React, { forwardRef } from 'react';
import { cn } from "@/lib/utils";

type SeparatorOrientation = "horizontal" | "vertical";
type SeparatorVariant = "solid" | "dashed" | "dotted";
type SeparatorSize = "thin" | "medium" | "thick";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: SeparatorOrientation;
  variant?: SeparatorVariant;
  size?: SeparatorSize;
  color?: string;
  spacing?: number;
  label?: React.ReactNode;
  labelPosition?: 'left' | 'center' | 'right';
}

// Simplified version
const Separator = forwardRef<HTMLDivElement, SeparatorProps>(({
  className,
  orientation = "horizontal",
  variant = "solid",
  size = "medium",
  label,
  labelPosition = 'center',
  ...props
}, ref) => {
  const isVertical = orientation === "vertical";
  const hasLabel = Boolean(label);

  if (hasLabel && !isVertical) {
    return (
      <div
        className="flex items-center w-full my-4"
        ref={ref}
        role="separator"
        {...props}
      >
        <div className="flex-grow border-t" />
        <span className="px-3 text-sm text-muted-foreground">
          {label}
        </span>
        <div className="flex-grow border-t" />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "shrink-0",
        isVertical ? "h-auto border-l mx-4" : "w-full border-t my-4",
        className
      )}
      role="separator"
      {...props}
    />
  );
});

Separator.displayName = "Separator";

export default Separator;`,
  tags: ["ui", "divider", "separator", "layout"],
  isNew: true,
};

export default SeparatorComponentItem;
