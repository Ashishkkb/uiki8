
import React from 'react';
import { ComponentItem } from "@/types/component";
import StepperComponent from "./StepperComponent";

const StepperComponentItem: ComponentItem = {
  id: 165,
  name: "Stepper",
  category: "UI",
  framework: "React",
  description: "A stepper component for guiding users through a multi-step process.",
  component: StepperComponent,
  tags: ["ui", "stepper", "wizard", "steps", "process"],
  isNew: true,
  fileSize: "2.4 KB",
  complexity: "medium",
  code: `import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronRight } from "lucide-react";

export interface Step {
  id: string | number;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  optional?: boolean;
}

interface StepperProps {
  steps: Step[];
  activeStep: number;
  onStepChange?: (step: number) => void;
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "small" | "large";
  hideLabels?: boolean;
  className?: string;
  showNavigation?: boolean;
  disableNavigation?: boolean;
  navigationPosition?: "top" | "bottom" | "both";
  completedStepIcon?: React.ReactNode;
  allowSkip?: boolean;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  activeStep,
  onStepChange,
  orientation = "horizontal",
  variant = "default",
  size = "default",
  hideLabels = false,
  className,
  showNavigation = false,
  disableNavigation = false,
  navigationPosition = "bottom",
  completedStepIcon,
  allowSkip = false,
}) => {
  const [currentStep, setCurrentStep] = useState(activeStep);

  useEffect(() => {
    setCurrentStep(activeStep);
  }, [activeStep]);

  const handleStepClick = (stepIndex: number) => {
    if (disableNavigation) return;
    
    // Only allow clicking on completed steps or the next step
    if (stepIndex <= currentStep || (allowSkip && stepIndex > currentStep)) {
      setCurrentStep(stepIndex);
      if (onStepChange) {
        onStepChange(stepIndex);
      }
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      if (onStepChange) {
        onStepChange(nextStep);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      if (onStepChange) {
        onStepChange(prevStep);
      }
    }
  };

  const renderNavigationButtons = () => {
    return (
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
        >
          {currentStep === steps.length - 2 ? "Finish" : "Next"}
        </Button>
      </div>
    );
  };

  const getStepIcon = (step: Step, index: number) => {
    if (index < currentStep) {
      // For completed steps
      return completedStepIcon || <CheckIcon className="h-5 w-5" />;
    }

    if (index === currentStep) {
      // For active step
      return step.icon || <span className="text-sm font-medium">{index + 1}</span>;
    }

    // For future steps
    return step.icon || <span className="text-sm font-medium">{index + 1}</span>;
  };

  const sizeClasses = {
    small: {
      step: "h-6 w-6 text-xs",
      connector: "h-0.5",
      container: "gap-2"
    },
    default: {
      step: "h-8 w-8 text-sm",
      connector: "h-0.5",
      container: "gap-3"
    },
    large: {
      step: "h-10 w-10 text-base",
      connector: "h-1",
      container: "gap-4"
    }
  };

  const variantClasses = {
    default: {
      step: (isActive: boolean, isCompleted: boolean) => cn(
        "flex items-center justify-center rounded-full",
        isCompleted ? "bg-primary text-primary-foreground" : 
        isActive ? "bg-primary text-primary-foreground" : 
        "bg-muted text-muted-foreground"
      ),
      connector: (isCompleted: boolean) => cn(
        "flex-1",
        isCompleted ? "bg-primary" : "bg-muted"
      )
    },
    outline: {
      step: (isActive: boolean, isCompleted: boolean) => cn(
        "flex items-center justify-center rounded-full border-2",
        isCompleted ? "border-primary text-primary" : 
        isActive ? "border-primary text-primary" : 
        "border-muted-foreground text-muted-foreground"
      ),
      connector: (isCompleted: boolean) => cn(
        "flex-1",
        isCompleted ? "bg-primary" : "bg-muted"
      )
    },
    ghost: {
      step: (isActive: boolean, isCompleted: boolean) => cn(
        "flex items-center justify-center rounded-full",
        isCompleted ? "bg-primary/20 text-primary" : 
        isActive ? "bg-primary/20 text-primary" : 
        "bg-muted/50 text-muted-foreground"
      ),
      connector: (isCompleted: boolean) => cn(
        "flex-1",
        isCompleted ? "bg-primary/30" : "bg-muted/30"
      )
    }
  };

  const renderStepConnector = (index: number) => {
    if (index < steps.length - 1) {
      return (
        <div 
          className={cn(
            "flex-1",
            orientation === "horizontal" ? "w-full" : "h-full",
            variantClasses[variant].connector(index < currentStep)
          )}
        />
      );
    }
    return null;
  };

  return (
    <div className={cn("w-full", className)}>
      {(showNavigation && navigationPosition === "top" || navigationPosition === "both") && renderNavigationButtons()}
      
      <div 
        className={cn(
          "w-full my-4",
          orientation === "horizontal" ? "flex items-center" : "flex flex-col",
          sizeClasses[size].container
        )}
      >
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div 
              className={cn(
                "flex flex-col items-center"
              )}
            >
              <div
                className={cn(
                  "flex-shrink-0 cursor-pointer",
                  sizeClasses[size].step,
                  variantClasses[variant].step(index === currentStep, index < currentStep)
                )}
                onClick={() => handleStepClick(index)}
              >
                {getStepIcon(step, index)}
              </div>
              
              {!hideLabels && (
                <div className={cn(
                  "mt-2 text-center",
                  index === currentStep ? "text-foreground" : "text-muted-foreground",
                  orientation === "horizontal" && "max-w-[100px] overflow-hidden text-ellipsis"
                )}>
                  <div className="text-sm font-medium">{step.title}</div>
                  {step.description && (
                    <div className="text-xs">{step.description}</div>
                  )}
                  {step.optional && (
                    <div className="text-xs italic">(Optional)</div>
                  )}
                </div>
              )}
            </div>

            {orientation === "horizontal" && renderStepConnector(index)}
            
            {orientation === "vertical" && (
              <div className="h-8 w-0.5 bg-muted mx-auto">
                {renderStepConnector(index)}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      {(showNavigation && (navigationPosition === "bottom" || navigationPosition === "both")) && renderNavigationButtons()}
    </div>
  );
};

export default Stepper;`
};

export default StepperComponentItem;
