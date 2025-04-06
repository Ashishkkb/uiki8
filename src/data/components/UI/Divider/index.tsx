
import React from 'react';
import { ComponentItem } from "@/types/component";
import DividerComponent from "./DividerComponent";

const DividerComponentItem: ComponentItem = {
  id: 118,
  name: "Divider",
  category: "UI",
  framework: "React",
  description: "A versatile divider component supporting horizontal and vertical orientations, labels, and various styles.",
  code: `import React from 'react';
import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  thickness?: 'thin' | 'medium' | 'thick';
  color?: string;
  label?: React.ReactNode;
  labelPosition?: 'start' | 'center' | 'end';
  decorative?: boolean;
  spacing?: 'sm' | 'md' | 'lg';
}

const Divider: React.FC<DividerProps> = ({
  className,
  orientation = 'horizontal',
  variant = 'solid',
  thickness = 'medium',
  color,
  label,
  labelPosition = 'center',
  decorative = true,
  spacing = 'md'
}) => {
  const isHorizontal = orientation === 'horizontal';
  
  const variantClasses = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted'
  };
  
  const thicknessClasses = {
    thin: isHorizontal ? 'border-t' : 'border-l',
    medium: isHorizontal ? 'border-t-2' : 'border-l-2',
    thick: isHorizontal ? 'border-t-4' : 'border-l-4'
  };
  
  const orientationClasses = {
    horizontal: 'w-full',
    vertical: 'h-full'
  };
  
  const spacingClasses = {
    sm: isHorizontal ? 'my-2' : 'mx-2',
    md: isHorizontal ? 'my-4' : 'mx-4',
    lg: isHorizontal ? 'my-6' : 'mx-6'
  };
  
  const labelPositionClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end'
  };

  // For a divider with a label
  if (label && isHorizontal) {
    return (
      <div 
        className={cn(
          'flex items-center w-full',
          spacingClasses[spacing],
          labelPositionClasses[labelPosition],
          className
        )}
        role={decorative ? 'presentation' : 'separator'}
      >
        <div 
          className={cn(
            'border-border flex-grow',
            variantClasses[variant],
            thicknessClasses[thickness]
          )}
          style={color ? { borderColor: color } : undefined}
        />
        
        <span className="px-3 text-sm text-muted-foreground">
          {label}
        </span>
        
        <div 
          className={cn(
            'border-border flex-grow',
            variantClasses[variant],
            thicknessClasses[thickness]
          )}
          style={color ? { borderColor: color } : undefined}
        />
      </div>
    );
  }

  // For a simple divider without a label
  return (
    <div
      className={cn(
        'border-border',
        orientationClasses[orientation],
        variantClasses[variant],
        thicknessClasses[thickness],
        spacingClasses[spacing],
        className
      )}
      style={color ? { borderColor: color } : undefined}
      role={decorative ? 'presentation' : 'separator'}
      aria-orientation={orientation}
    />
  );
};

export default Divider;`,
  component: DividerComponent,
  tags: ["UI", "layout", "separator", "divider"],
  isNew: true,
  fileSize: "2.3 KB",
  complexity: "simple"
};

export default DividerComponentItem;
