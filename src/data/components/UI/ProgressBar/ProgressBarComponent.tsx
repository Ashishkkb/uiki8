
import React from 'react';
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  total?: number;
  className?: string;
  barClassName?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showValue?: boolean;
  valueFormat?: 'percentage' | 'fraction' | 'custom';
  customValueFormat?: (value: number, total: number) => string;
  label?: string;
  animated?: boolean;
  striped?: boolean;
  rounded?: boolean;
}

const ProgressBarComponent: React.FC<ProgressBarProps> = ({
  value,
  total = 100,
  className,
  barClassName,
  variant = 'default',
  size = 'md',
  showValue = false,
  valueFormat = 'percentage',
  customValueFormat,
  label,
  animated = false,
  striped = false,
  rounded = true
}) => {
  // Calculate percentage
  const percentage = Math.min(100, Math.max(0, (value / total) * 100));
  
  // Determine the color variant
  const variantColors = {
    default: "bg-primary",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
    info: "bg-blue-500"
  };

  // Size classes for the progress bar height
  const sizeClasses = {
    xs: "h-1",
    sm: "h-2",
    md: "h-3",
    lg: "h-4"
  };

  // Format the displayed value
  const getFormattedValue = () => {
    if (customValueFormat) {
      return customValueFormat(value, total);
    }
    
    switch (valueFormat) {
      case 'percentage':
        return `${Math.round(percentage)}%`;
      case 'fraction':
        return `${value}/${total}`;
      default:
        return `${Math.round(percentage)}%`;
    }
  };

  // Striped effect
  const stripedClass = striped ? 
    "bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:20px_100%]" : "";

  // Animation
  const animationClass = animated ? "animate-[progress-bar-stripes_1s_linear_infinite]" : "";

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1">
          {label && <div className="text-sm font-medium">{label}</div>}
          {showValue && (
            <div className="text-xs text-muted-foreground">
              {getFormattedValue()}
            </div>
          )}
        </div>
      )}
      
      <div 
        className={cn(
          "w-full bg-muted overflow-hidden",
          sizeClasses[size],
          rounded && "rounded-full",
          className
        )}
      >
        <div
          className={cn(
            "h-full transition-all duration-300",
            variantColors[variant],
            stripedClass,
            animationClass,
            rounded && "rounded-full",
            barClassName
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={total}
        />
      </div>
    </div>
  );
};

export default ProgressBarComponent;
