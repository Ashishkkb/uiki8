
import React from 'react';
import { ComponentItem } from "@/types/component";
import EmptyStateComponent from "./EmptyStateComponent";

const EmptyStateComponentItem: ComponentItem = {
  id: 126,
  name: "Empty State",
  category: "UI",
  framework: "React",
  description: "A component for displaying empty states with customizable icons, titles and action buttons.",
  code: `import React from 'react';
import { cn } from "@/lib/utils";
import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'compact';
  align?: 'center' | 'left';
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  children,
  className,
  variant = 'default',
  align = 'center'
}) => {
  const variantClasses = {
    default: "py-12",
    compact: "py-6"
  };

  const alignClasses = {
    center: "items-center text-center",
    left: "items-start text-left"
  };

  return (
    <div className={cn(
      "w-full flex flex-col",
      variantClasses[variant],
      alignClasses[align],
      className
    )}>
      {icon ? (
        <div className="mb-4 flex justify-center">
          {icon}
        </div>
      ) : (
        <div className="mb-4 flex justify-center w-12 h-12 rounded-full bg-muted items-center mx-auto">
          <FolderOpen className="h-6 w-6 text-muted-foreground" />
        </div>
      )}
      
      <h3 className="text-lg font-medium text-foreground mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
          {description}
        </p>
      )}
      
      {children && (
        <div className={cn(
          "mt-2",
          align === 'center' ? "flex justify-center" : ""
        )}>
          {children}
        </div>
      )}
    </div>
  );
};

export default EmptyState;`,
  component: EmptyStateComponent,
  tags: ["UI", "empty", "state", "placeholder"],
  isNew: true,
  fileSize: "1.8 KB",
  complexity: "simple"
};

export default EmptyStateComponentItem;
