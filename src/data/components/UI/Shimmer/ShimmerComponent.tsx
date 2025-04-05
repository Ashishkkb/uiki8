
import React from 'react';
import { cn } from "@/lib/utils";

interface ShimmerProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean | string;
  variant?: 'default' | 'dark' | 'light';
  animation?: 'pulse' | 'wave' | 'none';
}

const ShimmerComponent: React.FC<ShimmerProps> = ({
  className,
  width = '100%',
  height = '1rem',
  rounded = 'md',
  variant = 'default',
  animation = 'wave'
}) => {
  const variantStyles = {
    default: "bg-gray-200 dark:bg-gray-700",
    light: "bg-gray-100",
    dark: "bg-gray-300 dark:bg-gray-800"
  };
  
  const animationStyles = {
    pulse: "animate-pulse",
    wave: "overflow-hidden relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent",
    none: ""
  };
  
  const roundedStyles = typeof rounded === 'boolean' 
    ? rounded ? 'rounded-full' : '' 
    : `rounded-${rounded}`;
  
  const widthStyle = typeof width === 'number' ? `${width}px` : width;
  const heightStyle = typeof height === 'number' ? `${height}px` : height;

  return (
    <div 
      className={cn(
        variantStyles[variant],
        animationStyles[animation],
        roundedStyles,
        className
      )}
      style={{
        width: widthStyle,
        height: heightStyle
      }}
      aria-hidden="true"
    />
  );
};

export default ShimmerComponent;
