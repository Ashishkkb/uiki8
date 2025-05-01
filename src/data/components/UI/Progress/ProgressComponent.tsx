import React, { forwardRef, useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full transition-all",
  {
    variants: {
      size: {
        sm: "h-2",
        md: "h-4",
        lg: "h-6"
      },
      variant: {
        default: "bg-secondary",
        success: "bg-success/20",
        info: "bg-info/20",
        warning: "bg-warning/20",
        error: "bg-destructive/20"
      }
    },
    defaultVariants: {
      size: "md",
      variant: "default"
    }
  }
);

const indicatorVariants = cva(
  "h-full w-full flex-1 transition-all rounded-full",
  {
    variants: {
      variant: {
        default: "bg-primary",
        success: "bg-success",
        info: "bg-info",
        warning: "bg-warning",
        error: "bg-destructive"
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
        shimmer: "animate-shimmer"
      }
    },
    defaultVariants: {
      variant: "default",
      animation: "none"
    }
  }
);

interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number;
  maxValue?: number;
  animation?: "none" | "pulse" | "bounce" | "shimmer";
  showValue?: boolean;
  valuePosition?: "inside" | "outside";
  formatValue?: (value: number, maxValue: number) => string;
  indeterminate?: boolean;
  label?: string;
  description?: string;
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(({
  className,
  value = 0,
  maxValue = 100,
  variant = "default",
  size = "md",
  animation = "none",
  showValue = false,
  valuePosition = "outside",
  formatValue = (val, max) => `${Math.round((val / max) * 100)}%`,
  indeterminate = false,
  label,
  description,
  ...props
}, ref) => {
  const [computedValue, setComputedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setComputedValue(value);
    }, 100);

    return () => clearTimeout(timeout);
  }, [value]);

  const percentage = (computedValue / maxValue) * 100;
  const formattedValue = formatValue(computedValue, maxValue);

  return (
    <div className="w-full space-y-2">
      {(label || (showValue && valuePosition === "outside")) && (
        <div className="flex justify-between items-center">
          {label && (
            <div>
              <div className="text-sm font-medium">{label}</div>
              {description && (
                <div className="text-xs text-muted-foreground">{description}</div>
              )}
            </div>
          )}
          {showValue && valuePosition === "outside" && (
            <div className="text-sm text-muted-foreground">
              {formattedValue}
            </div>
          )}
        </div>
      )}
      
      <div
        ref={ref}
        role="progressbar"
        {...(!indeterminate && {
          'aria-valuemin': 0,
          'aria-valuemax': maxValue,
          'aria-valuenow': computedValue
        })}
        aria-valuetext={indeterminate ? "Loading..." : formattedValue}
        aria-label={label}
        className={cn(progressVariants({ size, variant }), className)}
        {...props}
      >
        <div
          className={cn(
            indicatorVariants({ variant, animation }),
            "relative transition-transform duration-500",
            indeterminate && "animate-indeterminate w-2/5",
            !indeterminate && "transform-gpu"
          )}
          style={{
            transform: !indeterminate ? `translateX(${percentage - 100}%)` : undefined
          }}
        >
          {showValue && valuePosition === "inside" && size !== "sm" && (
            <div className={cn(
              "absolute inset-0 flex items-center justify-center text-primary-foreground",
              size === "md" && "text-xs",
              size === "lg" && "text-sm"
            )}>
              {formattedValue}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

Progress.displayName = "Progress";

export default Progress;