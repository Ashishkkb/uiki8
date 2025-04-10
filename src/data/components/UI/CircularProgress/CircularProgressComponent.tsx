
import React from 'react';
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const circularProgressVariants = cva(
  "relative inline-flex items-center justify-center rounded-full",
  {
    variants: {
      size: {
        sm: "h-16 w-16",
        md: "h-24 w-24",
        lg: "h-32 w-32",
        xl: "h-40 w-40",
      },
      variant: {
        default: "text-primary",
        success: "text-green-500",
        warning: "text-amber-500",
        error: "text-red-500",
        info: "text-blue-500",
      },
      thickness: {
        thin: "border-2",
        default: "border-4",
        thick: "border-6",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
      thickness: "default",
    },
  }
);

interface CircularProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof circularProgressVariants> {
  value: number;
  maxValue?: number;
  showValue?: boolean;
  valueFormat?: (value: number, maxValue: number) => string;
  trackColor?: string;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
  label?: string;
}

const CircularProgressComponent: React.FC<CircularProgressProps> = ({
  value,
  maxValue = 100,
  showValue = true,
  valueFormat,
  trackColor = "border-muted",
  className,
  valueClassName,
  labelClassName,
  label,
  size,
  variant,
  thickness,
  ...props
}) => {
  // Ensure value is within 0 and maxValue
  const normalizedValue = Math.min(Math.max(0, value), maxValue);
  
  // Calculate the percentage
  const percentage = (normalizedValue / maxValue) * 100;
  
  // Calculate the circle properties
  const radius = 42; // SVG coordinate system
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  
  // Format the displayed value
  const formattedValue = valueFormat 
    ? valueFormat(normalizedValue, maxValue)
    : `${Math.round(percentage)}%`;

  return (
    <div
      className={cn(
        circularProgressVariants({ size, variant, thickness }),
        trackColor,
        "border-opacity-10",
        className
      )}
      {...props}
    >
      <svg className="absolute inset-0 h-full w-full -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={thickness === "thin" ? 4 : thickness === "thick" ? 8 : 6}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {showValue && (
          <span className={cn(
            "font-semibold",
            size === "sm" ? "text-lg" : size === "lg" ? "text-3xl" : size === "xl" ? "text-4xl" : "text-2xl",
            valueClassName
          )}>
            {formattedValue}
          </span>
        )}
        
        {label && (
          <span className={cn(
            "text-muted-foreground",
            size === "sm" ? "text-xs" : size === "lg" ? "text-sm" : size === "xl" ? "text-base" : "text-xs",
            labelClassName
          )}>
            {label}
          </span>
        )}
      </div>
    </div>
  );
};

export default CircularProgressComponent;
