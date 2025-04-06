
import React from 'react';
import { cn } from "@/lib/utils";

interface KbdProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'subtle';
}

const KbdComponent: React.FC<KbdProps> = ({
  children,
  className,
  size = 'md',
  variant = 'default'
}) => {
  const sizeClasses = {
    sm: "text-xs px-1 py-0.5 min-w-[1.2rem]",
    md: "text-xs px-1.5 py-1 min-w-[1.6rem]",
    lg: "text-sm px-2 py-1 min-w-[2rem]"
  };

  const variantClasses = {
    default: "bg-muted border border-border shadow-sm",
    outlined: "bg-transparent border border-border",
    subtle: "bg-muted/50 border-none"
  };

  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center rounded font-mono font-medium",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </kbd>
  );
};

export default KbdComponent;
