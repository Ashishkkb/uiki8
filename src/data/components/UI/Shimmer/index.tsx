
import { ComponentItem } from "@/types/component";
import ShimmerComponent from "./ShimmerComponent";

const ShimmerComponentItem: ComponentItem = {
  id: 64,
  name: "Shimmer",
  category: "UI",
  framework: "React",
  description: "A shimmer loading placeholder that provides visual feedback while content is loading.",
  component: ShimmerComponent,
  price: "Free",
  language: "TypeScript",
  previewBg: "light",
  tags: ["UI", "loading", "placeholder", "shimmer", "skeleton"],
  isNew: true,
  fileSize: "1.4kb",
  complexity: "simple",
  lastUpdated: "2025-04-06",
  author: "Lovable UI",
  code: `import React from 'react';
import { cn } from "@/lib/utils";

interface ShimmerProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean | string;
  variant?: 'default' | 'dark' | 'light';
  animation?: 'pulse' | 'wave' | 'none';
}

const Shimmer: React.FC<ShimmerProps> = ({
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
    : \`rounded-\${rounded}\`;
  
  const widthStyle = typeof width === 'number' ? \`\${width}px\` : width;
  const heightStyle = typeof height === 'number' ? \`\${height}px\` : height;

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

export default Shimmer;`,
};

export default ShimmerComponentItem;
