
import { ComponentItem } from "@/types/component";
import DataStatsComponent from "./DataStatsComponent";
import { Users, DollarSign, LineChart, ShoppingCart } from 'lucide-react';

const DataStatsComponentItem: ComponentItem = {
  id: 210,
  name: "Data Stats",
  description: "A component for displaying key metrics and statistics",
  category: "Data Display",
  component: () => (
    <DataStatsComponent
      stats={[
        {
          title: "Total Revenue",
          value: 45231.89,
          formatter: (value) => `$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          icon: <DollarSign className="h-4 w-4" />,
          change: { value: 12.5, trend: 'positive', text: 'from last month' },
          tooltip: "Total revenue generated from all sources"
        },
        {
          title: "New Customers",
          value: 1482,
          icon: <Users className="h-4 w-4" />,
          change: { value: 8.2, trend: 'positive', text: 'from last month' }
        },
        {
          title: "Conversion Rate",
          value: 3.2,
          formatter: (value) => `${value}%`,
          icon: <LineChart className="h-4 w-4" />,
          change: { value: 1.1, trend: 'negative', text: 'from last month' }
        },
        {
          title: "Active Orders",
          value: 237,
          icon: <ShoppingCart className="h-4 w-4" />,
          change: { value: 0.0, trend: 'neutral', text: 'no change' }
        }
      ]}
    />
  ),
  code: `import React from 'react';
import { ArrowDown, ArrowUp, ArrowRight, Users, DollarSign, LineChart, ShoppingCart } from 'lucide-react';
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const DataStats = ({
  stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      icon: <DollarSign className="h-4 w-4" />,
      change: { value: 12.5, trend: 'positive', text: 'from last month' }
    },
    {
      title: "New Customers",
      value: "1,482",
      icon: <Users className="h-4 w-4" />,
      change: { value: 8.2, trend: 'positive', text: 'from last month' }
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      icon: <LineChart className="h-4 w-4" />,
      change: { value: 1.1, trend: 'negative', text: 'from last month' }
    },
    {
      title: "Active Orders",
      value: "237",
      icon: <ShoppingCart className="h-4 w-4" />,
      change: { value: 0.0, trend: 'neutral', text: 'no change' }
    }
  ],
  columns = 4,
  variant = 'default', // 'default', 'minimal', 'outline'
  className
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'positive': return <ArrowUp className="h-3 w-3" />;
      case 'negative': return <ArrowDown className="h-3 w-3" />;
      default: return <ArrowRight className="h-3 w-3" />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'positive': return 'text-green-600 bg-green-50';
      case 'negative': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getCardStyles = () => {
    switch (variant) {
      case 'minimal': return 'border-0 shadow-none bg-transparent';
      case 'outline': return 'border shadow-sm bg-transparent';
      default: return 'border shadow-sm bg-card';
    }
  };

  return (
    <div className={cn("grid gap-4", gridCols[columns], className)}>
      {stats.map((stat, index) => (
        <Card key={index} className={getCardStyles()}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            {stat.icon && (
              <div className="h-4 w-4 text-muted-foreground">
                {stat.icon}
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            
            {stat.change && (
              <div className="mt-2 flex items-center text-xs">
                <div className={\`rounded-sm px-1 py-0.5 mr-1 flex items-center \${getTrendColor(stat.change.trend)}\`}>
                  {getTrendIcon(stat.change.trend)}
                  <span className="ml-0.5">{Math.abs(stat.change.value)}%</span>
                </div>
                <CardDescription className="text-xs">
                  {stat.change.text || 'from previous period'}
                </CardDescription>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};`,
  framework: "React",
  isNew: true,
  tags: ["data", "statistics", "dashboard", "metrics", "cards"]
};

export default DataStatsComponentItem;
