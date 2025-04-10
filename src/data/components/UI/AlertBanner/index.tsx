
import { ComponentItem } from "@/types/component";
import AlertBannerComponent from "./AlertBannerComponent";
import { Button } from "@/components/ui/button";

const AlertBannerComponentItem: ComponentItem = {
  id: 214,
  name: "Alert Banner",
  description: "A versatile alert banner for important messages and notifications",
  category: "UI",
  component: () => (
    <div className="space-y-4">
      <AlertBannerComponent 
        variant="info" 
        title="Information" 
        description="This is an informational message. No action required." 
      />
      
      <AlertBannerComponent 
        variant="success" 
        title="Success!" 
        description="Your changes have been saved successfully." 
      />
      
      <AlertBannerComponent 
        variant="warning" 
        title="Warning" 
        description="This action cannot be undone. Please proceed with caution." 
        action={<Button size="sm" variant="outline">Review</Button>}
      />
      
      <AlertBannerComponent 
        variant="destructive" 
        title="Error" 
        description="There was a problem processing your request. Please try again." 
        action={<Button size="sm" variant="outline">Try Again</Button>}
      />
    </div>
  ),
  code: `import React, { useState } from 'react';
import { X, AlertCircle, CheckCircle, AlertTriangle, Info, Bell } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export const AlertBanner = ({
  variant = 'default', // 'default', 'success', 'warning', 'destructive', 'info'
  position = 'normal', // 'top', 'bottom', 'normal'
  size = 'md', // 'sm', 'md', 'lg'
  title,
  description,
  icon,
  dismissible = true,
  onDismiss,
  action,
  className,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  // Default icon based on variant
  const getDefaultIcon = () => {
    switch (variant) {
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'destructive':
        return <AlertCircle className="h-4 w-4" />;
      case 'info':
        return <Info className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  // Position styles
  const positionStyles = {
    top: "rounded-none border-t-0 border-x-0 border-b",
    bottom: "rounded-none border-b-0 border-x-0 border-t",
    normal: "rounded-lg border",
  };

  // Size styles
  const sizeStyles = {
    sm: "py-1.5 px-3",
    md: "py-3 px-4",
    lg: "py-4 px-6",
  };

  // Variant styles
  const variantStyles = {
    default: "bg-background text-foreground border-muted-foreground/20",
    success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-950/30 dark:border-green-900 dark:text-green-400",
    warning: "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-400",
    destructive: "bg-red-50 border-red-200 text-red-800 dark:bg-red-950/30 dark:border-red-900 dark:text-red-400",
    info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950/30 dark:border-blue-900 dark:text-blue-400",
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Alert
      className={cn(
        "relative w-full transition-all",
        variantStyles[variant],
        positionStyles[position],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-3">
        {icon || getDefaultIcon()}
        
        <div className="flex-1">
          {title && <AlertTitle className="mb-1">{title}</AlertTitle>}
          {description && <AlertDescription>{description}</AlertDescription>}
        </div>
        
        <div className="flex items-center gap-2">
          {action}
          
          {dismissible && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-full"
              onClick={handleDismiss}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss</span>
            </Button>
          )}
        </div>
      </div>
    </Alert>
  );
};`,
  framework: "React",
  isNew: true,
  tags: ["alert", "banner", "notification", "message", "toast"]
};

export default AlertBannerComponentItem;
