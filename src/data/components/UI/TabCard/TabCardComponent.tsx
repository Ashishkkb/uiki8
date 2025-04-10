
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TabItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

interface TabCardProps {
  tabs: TabItem[];
  defaultValue?: string;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  cardClassName?: string;
  tabsClassName?: string;
  contentClassName?: string;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  onTabChange?: (value: string) => void;
}

const TabCardComponent: React.FC<TabCardProps> = ({
  tabs,
  defaultValue,
  orientation = 'horizontal',
  className,
  cardClassName,
  tabsClassName,
  contentClassName,
  title,
  description,
  footer,
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState<string>(() => {
    // Set the default tab value
    if (defaultValue) {
      return defaultValue;
    }
    
    // Find first non-disabled tab
    const firstEnabledTab = tabs.find(tab => !tab.disabled);
    return firstEnabledTab ? firstEnabledTab.value : tabs[0]?.value || '';
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (onTabChange) {
      onTabChange(value);
    }
  };

  const activeContent = tabs.find(tab => tab.value === activeTab)?.content;

  return (
    <Card className={cn("overflow-hidden", cardClassName)}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      
      <div className={cn(
        "flex",
        orientation === 'vertical' ? "flex-row" : "flex-col",
        className
      )}>
        <div className={cn(
          orientation === 'vertical' 
            ? "w-1/3 border-r border-border/50" 
            : "border-b border-border/50",
          tabsClassName
        )}>
          <div className={cn(
            "flex",
            orientation === 'vertical' ? "flex-col" : "flex-row"
          )}>
            {tabs.map((tab) => (
              <button
                key={tab.value}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors",
                  "focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  orientation === 'vertical' 
                    ? "justify-start border-l-2 text-left" 
                    : "justify-center border-b-2 text-center",
                  activeTab === tab.value
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                  tab.disabled && "pointer-events-none opacity-50",
                )}
                onClick={() => !tab.disabled && handleTabChange(tab.value)}
                disabled={tab.disabled}
              >
                {tab.icon && <span className="h-4 w-4">{tab.icon}</span>}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className={cn(
          "flex-1",
          orientation === 'vertical' ? "w-2/3" : "w-full",
          contentClassName
        )}>
          <CardContent className={cn(
            "p-6",
            orientation === 'vertical' && "h-full",
          )}>
            {activeContent}
          </CardContent>
          
          {footer && (
            <CardFooter className="border-t bg-muted/50 px-6 py-4">
              {footer}
            </CardFooter>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TabCardComponent;
