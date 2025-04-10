
import React from 'react';
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon?: React.ReactNode;
  color?: string;
}

interface FeatureGridProps {
  features: Feature[];
  title?: string;
  subtitle?: string;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
  cardClassName?: string;
  iconClassName?: string;
  variant?: 'default' | 'bordered' | 'minimum';
}

const FeatureGridComponent: React.FC<FeatureGridProps> = ({
  features,
  title,
  subtitle,
  columns = 3,
  className,
  cardClassName,
  iconClassName,
  variant = 'default'
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  };

  const getCardStyles = () => {
    switch (variant) {
      case 'bordered':
        return "border bg-background shadow-sm";
      case 'minimum':
        return "border-none bg-transparent shadow-none p-0";
      case 'default':
      default:
        return "border bg-card/50 shadow-sm";
    }
  };

  return (
    <div className={cn("space-y-8", className)}>
      {(title || subtitle) && (
        <div className="space-y-2 text-center">
          {title && <h2 className="text-3xl font-bold tracking-tight">{title}</h2>}
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
      )}
      
      <div className={cn(
        "grid gap-4 md:gap-8",
        gridCols[columns]
      )}>
        {features.map((feature, index) => (
          <Card
            key={index}
            className={cn(
              getCardStyles(),
              cardClassName
            )}
          >
            <CardContent className={cn(
              "flex flex-col gap-2",
              variant === 'minimum' ? 'px-0' : 'p-6',
            )}>
              {feature.icon && (
                <div
                  className={cn(
                    "mb-3 flex h-10 w-10 items-center justify-center rounded-lg",
                    feature.color ? feature.color : "bg-primary/10 text-primary",
                    iconClassName
                  )}
                >
                  {feature.icon}
                </div>
              )}
              
              <CardTitle className="text-xl">{feature.title}</CardTitle>
              
              <CardDescription className="mt-2 text-muted-foreground">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeatureGridComponent;
