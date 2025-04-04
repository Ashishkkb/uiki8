
import { ComponentItem } from "@/types/component";
import StatCardComponent from "./StatCardComponent";

const StatCardComponentItem: ComponentItem = {
  id: 49,
  name: "Stat Card",
  category: "DataDisplay",
  framework: "React",
  description: "A collection of statistic cards for displaying metrics, KPIs, and other important data points.",
  component: StatCardComponent,
  price: "Free",
  language: "TypeScript",
  previewBg: "light",
  tags: ["data", "statistics", "metrics", "dashboard", "cards"],
  isNew: true,
  fileSize: "2.5kb",
  complexity: "simple",
  lastUpdated: "2025-04-04",
  author: "Lovable UI",
  code: `import React from 'react';
import { cn } from "@/lib/utils";
import { 
  ArrowUp, 
  ArrowDown, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  Eye
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: {
    value: number;
    trend: 'up' | 'down' | 'neutral';
  };
  description?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  description,
  className
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="h-4 w-4 text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className="flex items-center space-x-1 text-xs mt-1">
            {change.trend === 'up' && (
              <span className="text-green-600 dark:text-green-500 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                {Math.abs(change.value)}%
              </span>
            )}
            {change.trend === 'down' && (
              <span className="text-red-600 dark:text-red-500 flex items-center">
                <ArrowDown className="h-3 w-3 mr-1" />
                {Math.abs(change.value)}%
              </span>
            )}
            {change.trend === 'neutral' && (
              <span className="text-gray-600 dark:text-gray-400 flex items-center">
                {change.value}%
              </span>
            )}
            {description && (
              <span className="text-muted-foreground">{description}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;`,
};

export default StatCardComponentItem;
