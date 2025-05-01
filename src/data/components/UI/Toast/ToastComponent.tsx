import React, { forwardRef } from 'react';
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Toast as UIToast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all",
  {
    variants: {
      variant: {
        default: "bg-background border",
        success: "bg-success text-success-foreground border-success",
        error: "bg-destructive text-destructive-foreground border-destructive",
        destructive: "bg-destructive text-destructive-foreground border-destructive",
        warning: "bg-warning text-warning-foreground border-warning",
        info: "bg-info text-info-foreground border-info"
      },
      size: {
        sm: "p-2",
        default: "p-4",
        lg: "p-6"
      },
      swipeDirection: {
        right: "translate-x-[var(--radix-toast-swipe-move-x)] radix-swipe-end:animate-swipeOutRight",
        left: "translate-x-[var(--radix-toast-swipe-move-x)] radix-swipe-end:animate-swipeOutLeft",
        up: "translate-y-[var(--radix-toast-swipe-move-y)] radix-swipe-end:animate-swipeOutUp",
        down: "translate-y-[var(--radix-toast-swipe-move-y)] radix-swipe-end:animate-swipeOutDown"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      swipeDirection: "right"
    }
  }
);

interface ToastProps extends Omit<React.ComponentPropsWithoutRef<typeof UIToast>, 'variant'>,
  VariantProps<typeof toastVariants> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  duration?: number;
  onOpenChange?: (open: boolean) => void;
  onSwipeEnd?: () => void;
}

const Toast = forwardRef<React.ElementRef<typeof UIToast>, ToastProps>(({
  className,
  variant,
  size,
  swipeDirection,
  title,
  description,
  icon,
  action,
  children,
  ...props
}, ref) => {
  return (
    <UIToast
      ref={ref}
      className={cn(toastVariants({ variant, size, swipeDirection }), className)}
      {...props}
    >
      <div className="flex gap-3 items-start w-full">
        {icon && (
          <div className="flex-shrink-0 pt-0.5">
            {icon}
          </div>
        )}
        
        <div className="flex-1 gap-1">
          {title && <ToastTitle>{title}</ToastTitle>}
          {description && (
            <ToastDescription>{description}</ToastDescription>
          )}
          {children}
        </div>

        {action && (
          <div className="flex-shrink-0">
            {action}
          </div>
        )}
      </div>
      
      <ToastClose className="absolute right-2 top-2 rounded-md p-1 opacity-0 transition-opacity group-hover:opacity-100" />
    </UIToast>
  );
});

Toast.displayName = "Toast";

interface ToastContainerProps {
  children: React.ReactNode;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
  gap?: number;
  offset?: number;
  inset?: number;
}

const POSITION_STYLES = {
  'top-left': 'top-0 left-0',
  'top-right': 'top-0 right-0',
  'bottom-left': 'bottom-0 left-0',
  'bottom-right': 'bottom-0 right-0',
  'top-center': 'top-0 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2'
} as const;

const ToastContainer = ({
  children,
  position = 'bottom-right',
  gap = 4,
  offset = 16,
  inset = 16
}: ToastContainerProps) => {
  return (
    <ToastProvider duration={5000}>
      {children}
      <ToastViewport 
        className={cn(
          "fixed flex flex-col p-4 z-[100] outline-none",
          POSITION_STYLES[position],
          `gap-${gap}`,
          position.startsWith('top') ? `mt-${offset}` : `mb-${offset}`,
          position.endsWith('right') ? `mr-${inset}` : position.endsWith('left') ? `ml-${inset}` : ''
        )}
      />
    </ToastProvider>
  );
};

export { Toast, ToastContainer, type ToastProps };