
import React from 'react';
import { ComponentItem } from "@/types/component";
import SpinnerComponent from "./SpinnerComponent";

const SpinnerComponentItem: ComponentItem = {
  id: 100,
  name: "Spinner",
  category: "UI",
  framework: "React",
  description: "A versatile loading spinner component with various sizes, colors, and thickness options.",
  code: `import React from 'react';
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'light';
  className?: string;
  thickness?: 'thin' | 'regular' | 'thick';
  label?: string;
  showLabel?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className,
  thickness = 'regular',
  label = 'Loading...',
  showLabel = false
}) => {
  const sizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    danger: 'text-red-500',
    light: 'text-gray-300'
  };

  const thicknessClasses = {
    thin: 'border',
    regular: 'border-2',
    thick: 'border-4'
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        className={cn(
          "rounded-full animate-spin border-t-transparent",
          sizeClasses[size],
          colorClasses[color],
          thicknessClasses[thickness],
          className
        )}
      />
      {showLabel && <span className="mt-2 text-sm text-muted-foreground">{label}</span>}
    </div>
  );
};

export default Spinner;`,
  component: SpinnerComponent,
  tags: ["UI", "feedback", "loading", "spinner"],
  isNew: true,
  fileSize: "1.2 KB",
  complexity: "simple"
};

export default SpinnerComponentItem;
