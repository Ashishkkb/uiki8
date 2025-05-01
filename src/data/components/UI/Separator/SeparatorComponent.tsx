import React, { forwardRef } from 'react';
import { cn } from "@/lib/utils";

type SeparatorOrientation = "horizontal" | "vertical";
type SeparatorVariant = "solid" | "dashed" | "dotted";
type SeparatorSize = "thin" | "medium" | "thick";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: SeparatorOrientation;
  variant?: SeparatorVariant;
  size?: SeparatorSize;
  color?: string;
  spacing?: number;
  label?: React.ReactNode;
  labelPosition?: 'left' | 'center' | 'right';
}

const SIZE_STYLES: Record<SeparatorSize, string> = {
  thin: "border-[0.5px]",
  medium: "border-[1px]",
  thick: "border-[2px]"
} as const;

const VARIANT_STYLES: Record<SeparatorVariant, string> = {
  solid: "border-solid",
  dashed: "border-dashed",
  dotted: "border-dotted"
} as const;

const Separator = forwardRef<HTMLDivElement, SeparatorProps>(({
  className,
  orientation = "horizontal",
  variant = "solid",
  size = "medium",
  color,
  spacing = 4,
  label,
  labelPosition = 'center',
  ...props
}, ref) => {
  const isVertical = orientation === "vertical";
  const hasLabel = Boolean(label);

  if (hasLabel && !isVertical) {
    return (
      <div
        className={cn(
          "flex items-center w-full",
          `my-${spacing}`,
          className
        )}
        ref={ref}
        role="separator"
        {...props}
      >
        <div className={cn(
          "flex-grow border-t",
          SIZE_STYLES[size],
          VARIANT_STYLES[variant],
          color && `border-${color}`,
          labelPosition === 'center' && "flex-1",
          labelPosition === 'right' && "flex-[3]",
          labelPosition === 'left' && "flex-1"
        )} />
        
        <span className={cn(
          "px-3 text-sm text-muted-foreground",
          labelPosition === 'left' && "pl-0",
          labelPosition === 'right' && "pr-0"
        )}>
          {label}
        </span>
        
        {labelPosition === 'center' && (
          <div className={cn(
            "flex-grow border-t",
            SIZE_STYLES[size],
            VARIANT_STYLES[variant],
            color && `border-${color}`,
            "flex-1"
          )} />
        )}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "shrink-0",
        isVertical
          ? cn("h-auto border-l mx-4", `mx-${spacing}`)
          : cn("w-full border-t", `my-${spacing}`),
        SIZE_STYLES[size],
        VARIANT_STYLES[variant],
        color && `border-${color}`,
        className
      )}
      role="separator"
      {...props}
    />
  );
});

Separator.displayName = "Separator";

export default Separator;