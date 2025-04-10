
import React from 'react';
import { ArrowDown, ArrowUp, ArrowRight, HelpCircle } from 'lucide-react';
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StatItem {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  change?: {
    value: number;
    trend?: 'positive' | 'negative' | 'neutral';
    text?: string;
  };
  tooltip?: string;
  formatter?: (value: string | number) => string;
}

interface DataStatsProps {
  stats: StatItem[];
  columns?: 1 | 2 | 3 | 4;
  variant?: 'default' | 'minimal' | 'outline';
  className?: string;
  cardClassName?: string;
}

const DataStatsComponent: React.FC<DataStatsProps> = ({
  stats,
  columns = 4,
  variant = 'default',
  className,
  cardClassName,
}) => {
  const getGridCols = () => {
    switch (columns) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 sm:grid-cols-2';
      case 3: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
      default: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
    }
  };

  const getCardStyles = () => {
    switch (variant) {
      case 'minimal':
        return 'border-0 shadow-none bg-transparent';
      case 'outline':
        return 'border shadow-sm bg-transparent';
      case 'default':
      default:
        return 'border shadow-sm bg-card';
    }
  };

  const getTrendIcon = (trend?: 'positive' | 'negative' | 'neutral') => {
    switch (trend) {
      case 'positive':
        return <ArrowUp className="h-3 w-3" />;
      case 'negative':
        return <ArrowDown className="h-3 w-3" />;
      case 'neutral':
      default:
        return <ArrowRight className="h-3 w-3" />;
    }
  };

  const getTrendColor = (trend?: 'positive' | 'negative' | 'neutral') => {
    switch (trend) {
      case 'positive':
        return 'text-green-600 bg-green-50 dark:bg-green-950/50 dark:text-green-400';
      case 'negative':
        return 'text-red-600 bg-red-50 dark:bg-red-950/50 dark:text-red-400';
      case 'neutral':
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-900 dark:text-gray-400';
    }
  };

  return (
    <div className={cn("grid gap-4", getGridCols(), className)}>
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={cn(getCardStyles(), cardClassName)}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
              
              {stat.tooltip && (
                <TooltipProvider>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <button className="ml-1 inline-flex">
                        <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-xs">{stat.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </CardTitle>
            
            {stat.icon && (
              <div className="h-4 w-4 text-muted-foreground">
                {stat.icon}
              </div>
            )}
          </CardHeader>
          
          <CardContent>
            <div className="text-2xl font-bold">
              {stat.formatter ? stat.formatter(stat.value) : stat.value}
            </div>
            
            <div className="mt-2 flex items-center text-xs">
              {stat.change && (
                <>
                  <div className={cn(
                    "rounded-sm px-1 py-0.5 mr-1 flex items-center",
                    getTrendColor(stat.change.trend)
                  )}>
                    {getTrendIcon(stat.change.trend)}
                    <span className="ml-0.5">{Math.abs(stat.change.value)}%</span>
                  </div>
                  
                  <CardDescription className="text-xs">
                    {stat.change.text || `from previous period`}
                  </CardDescription>
                </>
              )}
              
              {!stat.change && stat.description && (
                <CardDescription className="text-xs">
                  {stat.description}
                </CardDescription>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DataStatsComponent;
