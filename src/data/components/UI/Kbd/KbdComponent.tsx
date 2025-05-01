
import React, { forwardRef } from 'react';
import { cn } from "@/lib/utils";

type KbdSize = 'sm' | 'md' | 'lg';
type KbdVariant = 'default' | 'outlined' | 'subtle';

interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  size?: KbdSize;
  variant?: KbdVariant;
}

const SIZE_STYLES: Record<KbdSize, string> = {
  sm: "text-xs px-1 py-0.5 min-w-[1.2rem]",
  md: "text-xs px-1.5 py-1 min-w-[1.6rem]",
  lg: "text-sm px-2 py-1 min-w-[2rem]"
} as const;

const VARIANT_STYLES: Record<KbdVariant, string> = {
  default: "bg-muted border border-border shadow-sm",
  outlined: "bg-transparent border border-border",
  subtle: "bg-muted/50 border-none"
} as const;

const Kbd = forwardRef<HTMLElement, KbdProps>(({
  children,
  className,
  size = 'md',
  variant = 'default',
  ...props
}, ref) => {
  return (
    <kbd
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded font-mono font-medium transition-colors",
        SIZE_STYLES[size],
        VARIANT_STYLES[variant],
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  );
});

Kbd.displayName = "Kbd";

export default Kbd;
