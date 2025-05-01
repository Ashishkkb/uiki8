
import React from 'react';
import { ComponentItem } from "@/types/component";
import RangeSliderComponent from "./RangeSliderComponent";

const RangeSliderComponentItem: ComponentItem = {
  id: 160,
  name: "Range Slider",
  category: "Form",
  framework: "React",
  description: "A range slider component for selecting values within a specified range.",
  component: RangeSliderComponent,
  tags: ["form", "input", "range", "slider", "selection"],
  isNew: true,
  fileSize: "2.0 KB",
  complexity: "medium",
  code: `import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface RangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number[];
  value?: number[];
  onValueChange?: (value: number[]) => void;
  label?: string;
  showValues?: boolean;
  className?: string;
  disabled?: boolean;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  defaultValue,
  value,
  onValueChange,
  label,
  showValues = true,
  className,
  disabled = false,
}) => {
  // If value is provided, use it, otherwise use defaultValue or provide a sensible default
  const controlledValue = value || defaultValue || [min, max];
  
  const handleValueChange = (newValue: number[]) => {
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {label && (
        <div className="flex items-center justify-between">
          <Label>{label}</Label>
          {showValues && (
            <span className="text-sm text-muted-foreground">
              {controlledValue[0]} - {controlledValue[1]}
            </span>
          )}
        </div>
      )}
      
      <Slider
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        step={step}
        onValueChange={handleValueChange}
        disabled={disabled}
      />
    </div>
  );
};

export default RangeSlider;`
};

export default RangeSliderComponentItem;
