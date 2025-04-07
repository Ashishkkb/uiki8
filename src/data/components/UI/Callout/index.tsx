
import React from 'react';
import { ComponentItem } from "@/types/component";
import CalloutComponent from "./CalloutComponent";

const CalloutComponentItem: ComponentItem = {
  id: 124,
  name: "Callout",
  category: "UI",
  framework: "React",
  description: "A component for displaying important information, warnings, or notes with varied styles.",
  code: `import React from 'react';
import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react";

interface CalloutProps {
  children: React.ReactNode;
  title?: string;
  variant?: 'info' | 'warning' | 'error' | 'success';
  className?: string;
  icon?: React.ReactNode;
}

const Callout: React.FC<CalloutProps> = ({
  children,
  title,
  variant = 'info',
  className,
  icon
}) => {
  const getVariantStyles = () => {
    switch(variant) {
      case 'info':
        return {
          container: "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800",
          title: "text-blue-800 dark:text-blue-300",
          icon: <Info className="h-5 w-5 text-blue-500" />
        };
      case 'warning':
        return {
          container: "bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800",
          title: "text-amber-800 dark:text-amber-300",
          icon: <AlertTriangle className="h-5 w-5 text-amber-500" />
        };
      case 'error':
        return {
          container: "bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800",
          title: "text-red-800 dark:text-red-300",
          icon: <AlertCircle className="h-5 w-5 text-red-500" />
        };
      case 'success':
        return {
          container: "bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800",
          title: "text-green-800 dark:text-green-300",
          icon: <CheckCircle className="h-5 w-5 text-green-500" />
        };
      default:
        return {
          container: "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800",
          title: "text-blue-800 dark:text-blue-300",
          icon: <Info className="h-5 w-5 text-blue-500" />
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={cn(
      "flex p-4 border-l-4 rounded-r-lg",
      styles.container,
      className
    )}>
      <div className="flex-shrink-0 mr-3 mt-0.5">
        {icon || styles.icon}
      </div>
      <div>
        {title && (
          <h4 className={cn("font-medium mb-1", styles.title)}>
            {title}
          </h4>
        )}
        <div className="text-muted-foreground text-sm">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Callout;`,
  component: CalloutComponent,
  tags: ["UI", "notification", "alert", "message"],
  isNew: true,
  fileSize: "2.1 KB",
  complexity: "simple"
};

export default CalloutComponentItem;
