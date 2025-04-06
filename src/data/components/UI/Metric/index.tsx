
import React from 'react';
import { ComponentItem } from "@/types/component";
import MetricComponent from "./MetricComponent";

const MetricComponentItem: ComponentItem = {
  id: 108,
  name: "Metric",
  category: "UI",
  framework: "React",
  description: "A component for displaying metrics and statistics with optional trends and icons.",
  code: `import React from 'react';
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

interface MetricProps {
  title: string;
  value: string | number;
  className?: string;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
    label?: string;
  };
  valueClassName?: string;
  descriptionClassName?: string;
  trendClassName?: string;
  iconClassName?: string;
}

const Metric: React.FC<MetricProps> = ({
  title,
  value,
  className,
  description,
  icon,
  trend,
  valueClassName,
  descriptionClassName,
  trendClassName,
  iconClassName
}) => {
  const getTrendIcon = () => {
    if (!trend) return null;
    
    if (trend.direction === 'up') {
      return <ArrowUp className="h-3 w-3" />;
    }
    
    if (trend.direction === 'down') {
      return <ArrowDown className="h-3 w-3" />;
    }
    
    return null;
  };
  
  const getTrendColor = () => {
    if (!trend) return '';
    
    if (trend.direction === 'up') {
      return 'text-green-600';
    }
    
    if (trend.direction === 'down') {
      return 'text-red-600';
    }
    
    return 'text-muted-foreground';
  };

  return (
    <div className={cn("flex flex-col space-y-1", className)}>
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && (
          <div className={cn("text-muted-foreground", iconClassName)}>
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex items-baseline gap-2">
        <span className={cn("text-2xl font-bold", valueClassName)}>
          {value}
        </span>
        
        {trend && (
          <div className={cn(
            "flex items-center text-xs font-medium gap-0.5",
            getTrendColor(),
            trendClassName
          )}>
            {getTrendIcon()}
            <span>{trend.value}%</span>
            {trend.label && (
              <span className="text-muted-foreground text-xs ml-1">
                {trend.label}
              </span>
            )}
          </div>
        )}
      </div>
      
      {description && (
        <p className={cn("text-xs text-muted-foreground", descriptionClassName)}>
          {description}
        </p>
      )}
    </div>
  );
};

export default Metric;`,
  component: MetricComponent,
  tags: ["UI", "data display", "statistics", "dashboard"],
  isNew: true,
  fileSize: "1.9 KB",
  complexity: "simple"
};

export default MetricComponentItem;
