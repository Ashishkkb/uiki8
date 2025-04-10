
import React from 'react';
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusChipVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary",
        success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
        error: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        info: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
        gray: "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400",
        outline: "border border-muted text-foreground",
      },
      size: {
        sm: "px-1.5 py-0.5 text-[10px]",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
      shape: {
        rounded: "rounded-full",
        square: "rounded",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "rounded",
      animation: "none",
    },
  }
);

export interface StatusChipProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusChipVariants> {
  label?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  dot?: boolean;
}

const StatusChipComponent: React.FC<StatusChipProps> = ({
  className,
  variant,
  size,
  shape,
  animation,
  label,
  icon,
  iconPosition = 'left',
  dot = false,
  ...props
}) => {
  return (
    <span
      className={cn(statusChipVariants({ variant, size, shape, animation }), className)}
      {...props}
    >
      {dot && (
        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      )}
      
      {icon && iconPosition === 'left' && (
        <span className={cn("mr-1", size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5')}>
          {icon}
        </span>
      )}
      
      {label}
      
      {icon && iconPosition === 'right' && (
        <span className={cn("ml-1", size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5')}>
          {icon}
        </span>
      )}
    </span>
  );
};

export default StatusChipComponent;
