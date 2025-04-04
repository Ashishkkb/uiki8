
import { ComponentItem } from "@/types/component";
import CheckboxComponent from "./CheckboxComponent";

const CheckboxComponentItem: ComponentItem = {
  id: 52,
  name: "Checkbox",
  category: "Form",
  framework: "React",
  description: "A checkbox component for selecting multiple options from a set of alternatives.",
  component: CheckboxComponent,
  price: "Free",
  language: "TypeScript",
  previewBg: "light",
  tags: ["form", "checkbox", "selection", "input", "boolean"],
  isNew: true,
  fileSize: "2.2kb",
  complexity: "simple",
  lastUpdated: "2025-04-04",
  author: "Lovable UI",
  code: `import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CustomCheckboxProps {
  id: string;
  label?: string;
  description?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  id,
  label,
  description,
  checked,
  onCheckedChange,
  disabled = false,
}) => {
  return (
    <div className="flex space-x-2">
      <Checkbox 
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
      <div className="grid gap-1.5 leading-none">
        {label && (
          <Label
            htmlFor={id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </Label>
        )}
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomCheckbox;`,
};

export default CheckboxComponentItem;
