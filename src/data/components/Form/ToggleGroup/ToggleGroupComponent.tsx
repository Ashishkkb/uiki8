
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify,
  Layout,
  LayoutDashboard,
  LayoutGrid
} from "lucide-react";
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

const ToggleGroupDemo = () => {
  const [textFormat, setTextFormat] = useState<string[]>([]);
  const [alignment, setAlignment] = useState("left");
  const [layout, setLayout] = useState("default");
  
  return (
    <div className="space-y-8">
      {/* Text formatting toggle group */}
      <CustomToggleGroup
        type="multiple"
        label="Text Formatting"
        items={[
          { value: "bold", icon: <Bold className="h-4 w-4" />, label: "Bold" },
          { value: "italic", icon: <Italic className="h-4 w-4" />, label: "Italic" },
          { value: "underline", icon: <Underline className="h-4 w-4" />, label: "Underline" }
        ]}
        defaultValue={textFormat}
        onChange={(value) => setTextFormat(value as string[])}
      />
      
      {/* Text alignment toggle group */}
      <CustomToggleGroup
        type="single"
        label="Text Alignment"
        items={[
          { value: "left", icon: <AlignLeft className="h-4 w-4" /> },
          { value: "center", icon: <AlignCenter className="h-4 w-4" /> },
          { value: "right", icon: <AlignRight className="h-4 w-4" /> },
          { value: "justify", icon: <AlignJustify className="h-4 w-4" /> }
        ]}
        defaultValue={alignment}
        onChange={(value) => setAlignment(value as string)}
      />
      
      {/* Layout toggle group */}
      <CustomToggleGroup
        type="single"
        label="Layout"
        variant="outline"
        items={[
          { value: "default", icon: <Layout className="h-4 w-4" />, label: "Default" },
          { value: "dashboard", icon: <LayoutDashboard className="h-4 w-4" />, label: "Dashboard" },
          { value: "grid", icon: <LayoutGrid className="h-4 w-4" />, label: "Grid" }
        ]}
        defaultValue={layout}
        onChange={(value) => setLayout(value as string)}
      />
      
      {/* Display the current values */}
      <div className="p-4 border rounded-md bg-muted/30">
        <h3 className="font-medium">Current Selection:</h3>
        <div className="mt-2 text-sm space-y-1">
          <p>Formatting: {textFormat.length ? textFormat.join(", ") : "None"}</p>
          <p>Alignment: {alignment}</p>
          <p>Layout: {layout}</p>
        </div>
      </div>
    </div>
  );
};

export default ToggleGroupDemo;
