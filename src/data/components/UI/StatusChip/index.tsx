
import { ComponentItem } from "@/types/component";
import StatusChipComponent from "./StatusChipComponent";
import { CheckCircle, AlertCircle, Clock, Info, Ban } from 'lucide-react';

const StatusChipComponentItem: ComponentItem = {
  id: 213,
  name: "Status Chip",
  description: "A versatile status indicator component with various styles and animations",
  category: "UI",
  component: () => (
    <div className="flex flex-wrap gap-3">
      <StatusChipComponent 
        variant="success" 
        label="Completed" 
        icon={<CheckCircle className="h-3.5 w-3.5" />}
      />
      <StatusChipComponent 
        variant="warning" 
        label="Pending" 
        icon={<Clock className="h-3.5 w-3.5" />}
      />
      <StatusChipComponent 
        variant="error" 
        label="Failed" 
        icon={<AlertCircle className="h-3.5 w-3.5" />}
      />
      <StatusChipComponent 
        variant="info" 
        label="Info" 
        dot={true}
      />
      <StatusChipComponent 
        variant="gray" 
        label="Inactive" 
        icon={<Ban className="h-3.5 w-3.5" />}
      />
      <StatusChipComponent 
        variant="outline" 
        label="Draft" 
        size="lg"
      />
      <StatusChipComponent 
        variant="default" 
        label="Processing" 
        animation="pulse"
      />
    </div>
  ),
  code: `import React from 'react';
import { cn } from "@/lib/utils";
import { CheckCircle, AlertCircle, Clock, Info, Ban } from 'lucide-react';

export const StatusChip = ({
  variant = 'default', // 'default', 'success', 'warning', 'error', 'info', 'gray', 'outline'
  size = 'md', // 'sm', 'md', 'lg'
  shape = 'rounded', // 'rounded', 'square'
  animation = 'none', // 'none', 'pulse', 'bounce'
  label = 'Status',
  icon,
  iconPosition = 'left',
  dot = false,
  className,
  ...props
}) => {
  // Variant styles
  const variantStyles = {
    default: "bg-primary/10 text-primary",
    success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    error: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    gray: "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400",
    outline: "border border-muted text-foreground",
  };

  // Size styles
  const sizeStyles = {
    sm: "px-1.5 py-0.5 text-[10px]",
    md: "px-2.5 py-0.5 text-xs",
    lg: "px-3 py-1 text-sm",
  };

  // Shape styles
  const shapeStyles = {
    rounded: "rounded-full",
    square: "rounded",
  };

  // Animation styles
  const animationStyles = {
    none: "",
    pulse: "animate-pulse",
    bounce: "animate-bounce",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium",
        variantStyles[variant],
        sizeStyles[size],
        shapeStyles[shape],
        animationStyles[animation],
        className
      )}
      {...props}
    >
      {dot && <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />}
      
      {icon && iconPosition === 'left' && (
        <span className="mr-1">{icon}</span>
      )}
      
      {label}
      
      {icon && iconPosition === 'right' && (
        <span className="ml-1">{icon}</span>
      )}
    </span>
  );
};

// Example usage:
export const StatusChipExamples = () => (
  <div className="flex flex-wrap gap-3">
    <StatusChip 
      variant="success" 
      label="Completed" 
      icon={<CheckCircle className="h-3.5 w-3.5" />}
    />
    <StatusChip 
      variant="warning" 
      label="Pending" 
      icon={<Clock className="h-3.5 w-3.5" />}
    />
    <StatusChip 
      variant="error" 
      label="Failed" 
      icon={<AlertCircle className="h-3.5 w-3.5" />}
    />
    <StatusChip 
      variant="info" 
      label="Info" 
      dot={true}
    />
    <StatusChip 
      variant="outline" 
      label="Draft" 
      size="lg"
    />
  </div>
);`,
  framework: "React",
  isNew: true,
  tags: ["status", "badge", "chip", "tag", "indicator"]
};

export default StatusChipComponentItem;
