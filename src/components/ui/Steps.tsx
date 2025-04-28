
import React from 'react';
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface Step {
  id: string | number;
  title: string;
  description?: string;
}

interface StepsProps {
  steps: Step[];
  currentStep?: number;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onStepClick?: (stepIndex: number) => void;
}

const Steps = React.forwardRef<
  HTMLDivElement,
  StepsProps
>(({
  steps = [],  
  currentStep = 0,
  className,
  orientation = 'horizontal',
  variant = 'default',
  size = 'md',
  onStepClick
}, ref) => {
  const isVertical = orientation === 'vertical';
  
  const variantClasses = {
    default: "bg-primary text-primary-foreground",
    outline: "border-2 border-primary bg-transparent text-primary",
    ghost: "bg-primary/20 text-primary"
  };
  
  const sizeClasses = {
    sm: isVertical ? "h-6 w-6 text-xs" : "h-6 w-6 text-xs",
    md: isVertical ? "h-8 w-8 text-sm" : "h-8 w-8 text-sm",
    lg: isVertical ? "h-10 w-10 text-base" : "h-10 w-10 text-base"
  };
  
  const containerClasses = isVertical 
    ? "flex flex-col space-y-4" 
    : "flex items-center";
  
  const lineClasses = isVertical
    ? "w-0.5 h-full absolute left-4 top-10 bottom-0 -translate-x-1/2 bg-muted"
    : "flex-1 h-0.5 bg-muted";

  // If no steps provided, return a simple message
  if (!steps || steps.length === 0) {
    return <div ref={ref} className={cn(containerClasses, className)}>No steps available</div>;
  }

  return (
    <div ref={ref} className={cn(containerClasses, className)}>
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const isClickable = onStepClick !== undefined;
        
        return (
          <React.Fragment key={step.id}>
            <div 
              className={cn(
                "flex items-center space-x-4",
                isVertical ? "relative" : "",
                isClickable && "cursor-pointer"
              )}
              onClick={() => isClickable && onStepClick(index)}
            >
              <div 
                className={cn(
                  "rounded-full flex items-center justify-center",
                  sizeClasses[size],
                  isCompleted ? variantClasses.default : 
                    isActive ? variantClasses[variant] : 
                    "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className={cn(
                    "h-4 w-4",
                    size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : ''
                  )} />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              
              <div>
                <p className={cn(
                  "font-medium",
                  isActive ? "text-foreground" : "text-muted-foreground",
                  size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'
                )}>
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
            
            {index < steps.length - 1 && (
              <div className={lineClasses} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
});

Steps.displayName = "Steps";

export default Steps;
