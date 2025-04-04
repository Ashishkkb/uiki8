
import { ComponentItem } from "@/types/component";
import RadioGroupComponent from "./RadioGroupComponent";

const RadioGroupComponentItem: ComponentItem = {
  id: 53,
  name: "Radio Group",
  category: "Form",
  framework: "React",
  description: "A radio group component for selecting a single option from a set of alternatives.",
  component: RadioGroupComponent,
  price: "Free",
  language: "TypeScript",
  previewBg: "light",
  tags: ["form", "radio", "selection", "input", "choice"],
  isNew: true,
  fileSize: "2.5kb",
  complexity: "simple",
  lastUpdated: "2025-04-04",
  author: "Lovable UI",
  code: `import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface CustomRadioGroupProps {
  label?: string;
  options: RadioOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({
  label,
  options,
  value,
  onValueChange,
  className,
}) => {
  return (
    <div className={className}>
      {label && (
        <Label className="mb-3 block">{label}</Label>
      )}
      
      <RadioGroup value={value} onValueChange={onValueChange}>
        <div className="space-y-3">
          {options.map((option) => (
            <div key={option.value} className="flex items-start space-x-2">
              <RadioGroupItem
                value={option.value}
                id={option.value}
                disabled={option.disabled}
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor={option.value}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.label}
                </Label>
                {option.description && (
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default CustomRadioGroup;`,
};

export default RadioGroupComponentItem;
