
import { ComponentItem } from "@/types/component";
import ToggleGroupComponent from "./ToggleGroupComponent";

const ToggleGroupComponentItem: ComponentItem = {
  id: 50,
  name: "Toggle Group",
  category: "Form",
  framework: "React",
  description: "A group of togglable buttons for selecting multiple options or a single option from a set of mutually exclusive choices.",
  component: ToggleGroupComponent,
  price: "Free",
  language: "TypeScript",
  previewBg: "light",
  tags: ["form", "toggle", "button", "group", "selection"],
  isNew: true,
  fileSize: "3.8kb",
  complexity: "medium",
  lastUpdated: "2025-04-04",
  author: "Lovable UI",
  code: `import React from 'react';
import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";

interface CustomToggleGroupProps {
  type: "single" | "multiple";
  items: {
    value: string;
    icon?: React.ReactNode;
    label?: string;
  }[];
  defaultValue?: string | string[];
  label?: string;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  className?: string;
  onChange?: (value: string | string[]) => void;
}

const CustomToggleGroup: React.FC<CustomToggleGroupProps> = ({
  type,
  items,
  defaultValue,
  label,
  variant = "default",
  size = "default",
  className,
  onChange
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label>{label}</Label>}
      <ToggleGroup
        type={type}
        defaultValue={defaultValue}
        className="justify-start"
        onValueChange={onChange}
      >
        {items.map(item => (
          <ToggleGroupItem 
            key={item.value} 
            value={item.value}
            aria-label={item.label || item.value}
            size={size}
            variant={variant}
          >
            {item.icon}
            {item.label && <span className="ml-2">{item.label}</span>}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default CustomToggleGroup;`,
};

export default ToggleGroupComponentItem;
