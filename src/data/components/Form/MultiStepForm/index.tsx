
import React from 'react';
import { ComponentItem } from "@/types/component";
import MultiStepForm from "@/components/form/MultiStepForm";

const MultiStepFormComponent: ComponentItem = {
  id: 403,
  name: "Multi-Step Form",
  category: "Form",
  framework: "React",
  description: "A multi-step form component with progress indicator and validation",
  code: `import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField } from "./FormBuilder";
import FormBuilder from "./FormBuilder";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
}

export interface MultiStepFormProps {
  steps: FormStep[];
  onComplete: (data: Record<string, any>) => void;
  className?: string;
  completeButtonText?: string;
  showStepIndicator?: boolean;
  showSummary?: boolean;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  steps,
  onComplete,
  className = "",
  completeButtonText = "Complete",
  showStepIndicator = true,
  showSummary = true,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isCompleted, setIsCompleted] = useState(false);

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleStepSubmit = (stepData: Record<string, any>) => {
    const updatedData = { ...formData, ...stepData };
    setFormData(updatedData);
    
    // Mark this step as completed
    const updatedCompletedSteps = new Set(completedSteps);
    updatedCompletedSteps.add(currentStepIndex);
    setCompletedSteps(updatedCompletedSteps);

    if (isLastStep) {
      handleComplete(updatedData);
    } else {
      // Move to next step
      setCurrentStepIndex(currentStepIndex + 1);
      toast.success("Step saved successfully!");
    }
  };

  const handleComplete = (data: Record<string, any>) => {
    setIsCompleted(true);
    onComplete(data);
    toast.success("Form completed successfully!");
  };

  const goToPreviousStep = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const goToStep = (index: number) => {
    // Only allow going to steps that have been completed or are the next one
    if (completedSteps.has(index) || index === 0 || completedSteps.has(index - 1)) {
      setCurrentStepIndex(index);
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isComplete = completedSteps.has(index);
          const isClickable = completedSteps.has(index) || index === 0 || completedSteps.has(index - 1);
          
          return (
            <React.Fragment key={step.id}>
              {/* Step indicator */}
              <div 
                className={\`relative flex items-center justify-center w-10 h-10 rounded-full border-2 
                  \${isActive ? "border-primary bg-primary text-primary-foreground" : 
                    isComplete ? "border-green-500 bg-green-500 text-white" : 
                      isClickable ? "border-gray-400 cursor-pointer" : "border-gray-200"}\`}
                onClick={() => isClickable && goToStep(index)}
              >
                {isComplete ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              
              {/* Connector line between indicators */}
              {index < steps.length - 1 && (
                <div 
                  className={\`w-12 h-1 mx-1 \${
                    completedSteps.has(index) ? "bg-green-500" : "bg-gray-200"
                  }\`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  const renderSummary = () => {
    return (
      <div className="space-y-6">
        <div className="rounded-lg bg-green-50 p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="mt-3 text-lg font-medium text-green-800">Form Completed!</h3>
          <p className="mt-2 text-sm text-green-600">
            Thank you for completing all steps of the form.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Summary</h3>
          {steps.map((step) => (
            <Card key={step.id} className="overflow-hidden">
              <CardHeader className="bg-muted/50 py-3">
                <CardTitle className="text-base">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <dl className="space-y-2">
                  {step.fields.map((field) => {
                    const value = formData[field.name];
                    
                    // Handle different value types for display
                    let displayValue = value;
                    if (field.type === "checkbox") {
                      displayValue = value ? "Yes" : "No";
                    } else if (field.type === "select" && field.options) {
                      const selectedOption = field.options.find(opt => opt.value === value);
                      displayValue = selectedOption?.label || value;
                    }
                    
                    return (
                      <div key={field.id} className="grid grid-cols-3 gap-1">
                        <dt className="text-sm font-medium text-gray-500">{field.label}:</dt>
                        <dd className="col-span-2 text-sm">{displayValue || "-"}</dd>
                      </div>
                    );
                  })}
                </dl>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center">
          <Button onClick={() => onComplete(formData)}>
            {completeButtonText}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className={className}>
      {/* Show step indicator if enabled */}
      {showStepIndicator && !isCompleted && renderStepIndicator()}
      
      {/* Show form or summary based on completion status */}
      {isCompleted && showSummary ? (
        renderSummary()
      ) : (
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">{currentStep.title}</CardTitle>
            {currentStep.description && (
              <p className="text-muted-foreground">{currentStep.description}</p>
            )}
          </CardHeader>
          <CardContent>
            <FormBuilder
              fields={currentStep.fields}
              onSubmit={handleStepSubmit}
              submitLabel={isLastStep ? "Complete" : "Continue"}
              showReset={false}
            />
          </CardContent>
          <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-3">
            <Button
              type="button"
              variant="ghost"
              onClick={goToPreviousStep}
              disabled={isFirstStep}
              className={isFirstStep ? "invisible" : ""}
            >
              Previous
            </Button>
            <div className="text-sm text-muted-foreground">
              Step {currentStepIndex + 1} of {steps.length}
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default MultiStepForm;`,
  component: () => (
    <div className="max-w-2xl mx-auto">
      <MultiStepForm
        steps={[
          {
            id: "personal",
            title: "Personal Information",
            description: "Please provide your personal details",
            fields: [
              {
                id: "fullName",
                name: "fullName",
                label: "Full Name",
                type: "text",
                required: true,
                placeholder: "Enter your full name"
              },
              {
                id: "email",
                name: "email",
                label: "Email",
                type: "email",
                required: true,
                placeholder: "Enter your email address"
              },
              {
                id: "birthdate",
                name: "birthdate",
                label: "Date of Birth",
                type: "text",
                placeholder: "MM/DD/YYYY"
              }
            ]
          },
          {
            id: "address",
            title: "Address",
            description: "Where do you live?",
            fields: [
              {
                id: "address1",
                name: "address1", 
                label: "Street Address",
                type: "text",
                required: true,
                placeholder: "Enter your street address"
              },
              {
                id: "city",
                name: "city",
                label: "City",
                type: "text",
                required: true,
                placeholder: "Enter your city"
              },
              {
                id: "zipCode",
                name: "zipCode",
                label: "Zip Code",
                type: "text",
                required: true,
                placeholder: "Enter your zip code"
              }
            ]
          },
          {
            id: "preferences",
            title: "Preferences",
            description: "Tell us about your preferences",
            fields: [
              {
                id: "interests",
                name: "interests",
                label: "What are you interested in?",
                type: "select",
                required: true,
                options: [
                  { value: "technology", label: "Technology" },
                  { value: "design", label: "Design" },
                  { value: "marketing", label: "Marketing" },
                  { value: "business", label: "Business" }
                ]
              },
              {
                id: "subscribe",
                name: "subscribe",
                label: "Subscribe to newsletter",
                type: "checkbox"
              }
            ]
          }
        ]}
        onComplete={(data) => console.log("Form completed:", data)}
        showStepIndicator={true}
        showSummary={true}
      />
    </div>
  ),
  tags: ["form", "multi-step", "wizard", "validation", "progress"],
  fileSize: "7.5 KB",
  price: "Free",
  isNew: true
};

export default MultiStepFormComponent;
