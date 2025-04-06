
import React from 'react';
import { ComponentItem } from "@/types/component";
import Badge3DComponent from "./Badge3DComponent";

const Badge3DComponentItem: ComponentItem = {
  id: 117,
  name: "Badge 3D",
  category: "UI",
  framework: "React",
  description: "A 3D badge component with customizable depth, variants, and visual effects.",
  code: `import React from 'react';
import { cn } from "@/lib/utils";

interface Badge3DProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
  depth?: 'shallow' | 'medium' | 'deep';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

const Badge3D: React.FC<Badge3DProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  icon,
  depth = 'medium',
  rounded = 'full'
}) => {
  const variantClasses = {
    primary: {
      bg: 'bg-blue-500',
      shadow: 'shadow-blue-600',
      text: 'text-white'
    },
    secondary: {
      bg: 'bg-purple-500',
      shadow: 'shadow-purple-600',
      text: 'text-white'
    },
    success: {
      bg: 'bg-green-500',
      shadow: 'shadow-green-600',
      text: 'text-white'
    },
    warning: {
      bg: 'bg-amber-500',
      shadow: 'shadow-amber-600',
      text: 'text-white'
    },
    danger: {
      bg: 'bg-red-500',
      shadow: 'shadow-red-600',
      text: 'text-white'
    },
    info: {
      bg: 'bg-sky-500',
      shadow: 'shadow-sky-600',
      text: 'text-white'
    }
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1'
  };

  const depthClasses = {
    shallow: 'translate-y-[1px] shadow-[0_1px_0]',
    medium: 'translate-y-[2px] shadow-[0_2px_0]',
    deep: 'translate-y-[3px] shadow-[0_3px_0]'
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center font-medium',
        variantClasses[variant].bg,
        variantClasses[variant].text,
        variantClasses[variant].shadow,
        sizeClasses[size],
        depthClasses[depth],
        roundedClasses[rounded],
        icon && 'gap-1.5',
        className
      )}
    >
      {icon && <span>{icon}</span>}
      {children}
    </span>
  );
};

export default Badge3D;`,
  component: Badge3DComponent,
  tags: ["UI", "badge", "3D", "label"],
  isNew: true,
  fileSize: "1.6 KB",
  complexity: "simple"
};

export default Badge3DComponentItem;
