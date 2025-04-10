
import { ComponentItem } from "@/types/component";
import FeatureGridComponent from "./FeatureGridComponent";
import { LayoutGrid, Shield, Zap, Star, MessageSquare, BarChart } from 'lucide-react';

const FeatureGridComponentItem: ComponentItem = {
  id: 209,
  name: "Feature Grid",
  description: "A responsive grid layout for displaying product or service features",
  category: "UI",
  component: () => (
    <FeatureGridComponent
      title="Key Features"
      subtitle="Everything you need to build modern UI interfaces."
      features={[
        {
          title: "Responsive Layout",
          description: "Fully responsive components that look great on any device.",
          icon: <LayoutGrid className="h-5 w-5" />,
          color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
        },
        {
          title: "Accessible",
          description: "All components follow WAI-ARIA guidelines and implement keyboard navigation.",
          icon: <Shield className="h-5 w-5" />,
          color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
        },
        {
          title: "Fast & Optimized",
          description: "Built with performance in mind to ensure smooth user experiences.",
          icon: <Zap className="h-5 w-5" />,
          color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
        },
        {
          title: "Customizable",
          description: "Easily customize components to match your brand identity.",
          icon: <Star className="h-5 w-5" />,
          color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
        },
        {
          title: "Well Documented",
          description: "Comprehensive documentation with examples for all components.",
          icon: <MessageSquare className="h-5 w-5" />,
          color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400"
        },
        {
          title: "Analytics Ready",
          description: "Easily integrate with analytics tools to track user interactions.",
          icon: <BarChart className="h-5 w-5" />,
          color: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400"
        }
      ]}
    />
  ),
  code: `import React from 'react';
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { LayoutGrid, Shield, Zap, Star, MessageSquare, BarChart } from 'lucide-react';

export const FeatureGrid = ({
  features = [
    {
      title: "Responsive Layout",
      description: "Fully responsive components that look great on any device.",
      icon: <LayoutGrid className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "Accessible",
      description: "All components follow WAI-ARIA guidelines and implement keyboard navigation.",
      icon: <Shield className="h-5 w-5" />,
      color: "bg-green-100 text-green-700"
    },
    {
      title: "Fast & Optimized",
      description: "Built with performance in mind to ensure smooth user experiences.",
      icon: <Zap className="h-5 w-5" />,
      color: "bg-amber-100 text-amber-700"
    }
  ],
  title = "Key Features",
  subtitle = "Everything you need to build modern UI interfaces.",
  columns = 3,
  variant = 'default', // 'default', 'bordered', 'minimum'
  className
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className={cn("space-y-8", className)}>
      {(title || subtitle) && (
        <div className="space-y-2 text-center">
          {title && <h2 className="text-3xl font-bold tracking-tight">{title}</h2>}
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
      )}
      
      <div className={cn("grid gap-6", gridCols[columns])}>
        {features.map((feature, index) => (
          <Card
            key={index}
            className={cn(
              variant === 'bordered' ? "border" : 
              variant === 'minimum' ? "border-none shadow-none" : 
              "border bg-card/50"
            )}
          >
            <CardContent className="flex flex-col gap-2 p-6">
              {feature.icon && (
                <div
                  className={cn(
                    "mb-3 flex h-10 w-10 items-center justify-center rounded-lg",
                    feature.color || "bg-primary/10 text-primary"
                  )}
                >
                  {feature.icon}
                </div>
              )}
              
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};`,
  framework: "React",
  isNew: true,
  tags: ["features", "grid", "marketing", "ui", "showcase"]
};

export default FeatureGridComponentItem;
