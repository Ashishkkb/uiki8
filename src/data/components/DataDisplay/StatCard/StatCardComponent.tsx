
import React from 'react';
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

const StatCardDemo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <StatCard
        title="Total Revenue"
        value="$45,231.89"
        icon={<DollarSign className="h-4 w-4" />}
        change={{ value: 20.1, trend: 'up' }}
        description="from last month"
      />
      <StatCard
        title="Subscribers"
        value="2,350"
        icon={<Users className="h-4 w-4" />}
        change={{ value: 5.25, trend: 'up' }}
        description="new users"
      />
      <StatCard
        title="Sales"
        value="12,234"
        icon={<ShoppingCart className="h-4 w-4" />}
        change={{ value: 1.4, trend: 'down' }}
        description="from yesterday"
      />
      <StatCard
        title="Active Users"
        value="573"
        icon={<Eye className="h-4 w-4" />}
        change={{ value: 10, trend: 'up' }}
        description="current users"
      />
    </div>
  );
};

export default StatCardDemo;
