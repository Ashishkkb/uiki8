
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

interface Step {
  id: string | number;
  title: string;
  description?: string;
  optional?: boolean;
}

const StepperComponent = () => {
  const [activeStep, setActiveStep] = useState(1);
  
  const steps: Step[] = [
    { 
      id: 1, 
      title: 'Account', 
      description: 'Create your account' 
    },
    { 
      id: 2, 
      title: 'Profile', 
      description: 'Complete your profile' 
    },
    { 
      id: 3, 
      title: 'Preferences', 
      description: 'Set your preferences',
      optional: true
    },
    { 
      id: 4, 
      title: 'Complete', 
      description: 'Finish setup' 
    }
  ];

  const handleNext = () => {
    setActiveStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep(prev => Math.max(prev - 1, 0));
  };

  const handleStepClick = (stepIndex: number) => {
    // Only allow clicking on completed steps or the next step
    if (stepIndex <= activeStep) {
      setActiveStep(stepIndex);
    }
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="flex items-center gap-3 my-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex items-center justify-center h-8 w-8 rounded-full cursor-pointer",
                  index < activeStep 
                    ? "bg-primary text-primary-foreground" 
                    : index === activeStep 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                )}
                onClick={() => handleStepClick(index)}
              >
                {index < activeStep ? (
                  <CheckIcon className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              
              <div className={cn(
                "mt-2 text-center max-w-[100px] overflow-hidden text-ellipsis",
                index === activeStep ? "text-foreground" : "text-muted-foreground"
              )}>
                <div className="text-sm font-medium">{step.title}</div>
                {step.description && (
                  <div className="text-xs">{step.description}</div>
                )}
                {step.optional && (
                  <div className="text-xs italic">(Optional)</div>
                )}
              </div>
            </div>

            {index < steps.length - 1 && (
              <div 
                className={cn(
                  "flex-1 h-0.5",
                  index < activeStep ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="p-6 border rounded-md mb-4">
        <h3 className="text-lg font-medium mb-2">
          {steps[activeStep].title}
        </h3>
        <p className="text-muted-foreground">
          This is the content for step {activeStep + 1}: {steps[activeStep].description}
        </p>
      </div>
      
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={activeStep === steps.length - 1}
        >
          {activeStep === steps.length - 2 ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default StepperComponent;
