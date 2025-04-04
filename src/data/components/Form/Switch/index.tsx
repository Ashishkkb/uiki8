
import { ComponentItem } from "@/types/component";
import SwitchComponent from "./SwitchComponent";

const SwitchComponentItem: ComponentItem = {
  id: 51,
  name: "Switch",
  category: "Form",
  framework: "React",
  description: "A toggle switch component for enabling or disabling a setting.",
  component: SwitchComponent,
  price: "Free",
  language: "TypeScript",
  previewBg: "light",
  tags: ["form", "toggle", "switch", "input", "boolean"],
  isNew: true,
  fileSize: "1.8kb",
  complexity: "simple",
  lastUpdated: "2025-04-04",
  author: "Lovable UI",
  code: `import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface CustomSwitchProps {
  label?: string;
  description?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  label,
  description,
  checked = false,
  onCheckedChange,
  disabled = false,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
      {(label || description) && (
        <div className="grid gap-1">
          {label && <Label>{label}</Label>}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomSwitch;`,
};

export default SwitchComponentItem;
