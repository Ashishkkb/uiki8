
import { ComponentItem } from "@/types/component";
import CircularProgressComponent from "./CircularProgressComponent";

const CircularProgressComponentItem: ComponentItem = {
  id: 208,
  name: "Circular Progress",
  description: "A circular progress indicator with customizable appearance",
  category: "UI",
  component: CircularProgressComponent,
  code: `import React from 'react';
import { cn } from "@/lib/utils";

export const CircularProgress = ({
  value = 75,
  maxValue = 100,
  showValue = true,
  trackColor = "border-muted",
  size = "md", // 'sm', 'md', 'lg', 'xl'
  variant = "default", // 'default', 'success', 'warning', 'error'
  thickness = "default", // 'thin', 'default', 'thick'
  label,
  className,
}) => {
  // Ensure value is within 0 and maxValue
  const normalizedValue = Math.min(Math.max(0, value), maxValue);
  
  // Calculate the percentage
  const percentage = (normalizedValue / maxValue) * 100;
  
  // Calculate the circle properties
  const radius = 42; // SVG coordinate system
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  // Get size classes
  const sizeClasses = {
    sm: "h-16 w-16 text-lg",
    md: "h-24 w-24 text-2xl",
    lg: "h-32 w-32 text-3xl", 
    xl: "h-40 w-40 text-4xl"
  };
  
  // Get color classes
  const colorClasses = {
    default: "text-primary",
    success: "text-green-500",
    warning: "text-amber-500",
    error: "text-red-500"
  };
  
  // Get thickness classes
  const thicknessValues = {
    thin: 4,
    default: 6,
    thick: 8
  };

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-full",
        sizeClasses[size],
        trackColor,
        "border-opacity-10",
        className
      )}
      style={{
        borderWidth: thicknessValues[thickness]
      }}
    >
      <svg className="absolute inset-0 h-full w-full -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="none"
          stroke={colorClasses[variant].replace('text-', 'var(--')}
          strokeWidth={thicknessValues[thickness]}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {showValue && (
          <span className="font-semibold">
            {Math.round(percentage)}%
          </span>
        )}
        
        {label && (
          <span className="text-muted-foreground text-xs">
            {label}
          </span>
        )}
      </div>
    </div>
  );
};`,
  framework: "React",
  isNew: true,
  tags: ["progress", "circular", "chart", "loading"]
};

export default CircularProgressComponentItem;
