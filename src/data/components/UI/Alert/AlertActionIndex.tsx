
import React from 'react';
import { ComponentItem } from "@/types/component";
import AlertActionComponent from "./AlertActionComponent";

const AlertActionComponentItem: ComponentItem = {
  id: 119,
  name: "Alert Action",
  category: "UI",
  framework: "React",
  description: "An enhanced alert component with customizable actions, dismissal functionality, and styling options.",
  code: `import React from 'react';
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, InfoIcon, XCircle, XIcon } from "lucide-react";

interface AlertActionProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  actions?: React.ReactNode;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  border?: boolean;
}

const AlertAction: React.FC<AlertActionProps> = ({
  title,
  children,
  variant = 'default',
  size = 'md',
  className,
  icon,
  dismissible = false,
  onDismiss,
  actions,
  rounded = 'md',
  border = true
}) => {
  const variantStyles = {
    default: {
      container: 'bg-background text-foreground',
      border: 'border-border',
      icon: <InfoIcon className="h-5 w-5 text-foreground" />
    },
    info: {
      container: 'bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-100',
      border: 'border-blue-200 dark:border-blue-800',
      icon: <InfoIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
    },
    success: {
      container: 'bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-100',
      border: 'border-green-200 dark:border-green-800',
      icon: <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
    },
    warning: {
      container: 'bg-yellow-50 dark:bg-yellow-950 text-yellow-900 dark:text-yellow-100',
      border: 'border-yellow-200 dark:border-yellow-800',
      icon: <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
    },
    error: {
      container: 'bg-red-50 dark:bg-red-950 text-red-900 dark:text-red-100',
      border: 'border-red-200 dark:border-red-800',
      icon: <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
    }
  };

  const sizeStyles = {
    sm: 'p-3 text-sm',
    md: 'p-4 text-base',
    lg: 'p-5 text-lg'
  };

  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  };

  return (
    <div
      className={cn(
        variantStyles[variant].container,
        sizeStyles[size],
        roundedStyles[rounded],
        border && \`border \${variantStyles[variant].border}\`,
        className
      )}
      role="alert"
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        {icon !== null && (
          <div className="flex-shrink-0">
            {icon || variantStyles[variant].icon}
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1">
          {title && (
            <h5 className="font-medium mb-1">{title}</h5>
          )}
          <div>{children}</div>
          
          {/* Action buttons */}
          {actions && (
            <div className="mt-3 flex flex-wrap gap-2">
              {actions}
            </div>
          )}
        </div>
        
        {/* Dismiss button */}
        {dismissible && (
          <button
            type="button"
            className="flex-shrink-0 inline-flex text-muted-foreground hover:text-foreground"
            onClick={onDismiss}
            aria-label="Dismiss"
          >
            <XIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AlertAction;`,
  component: AlertActionComponent,
  tags: ["UI", "alert", "feedback", "notification"],
  isNew: true,
  fileSize: "2.7 KB",
  complexity: "medium"
};

export default AlertActionComponentItem;
