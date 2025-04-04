
import { ComponentItem } from "@/types/component";
import ColorPickerComponent from "./ColorPickerComponent";

const ColorPickerComponentItem: ComponentItem = {
  id: 43,
  name: "Color Picker",
  category: "Form",
  framework: "React",
  description: "An intuitive color picker component that allows users to select from a predefined palette of colors.",
  component: ColorPickerComponent,
  price: "Free",
  language: "TypeScript",
  previewBg: "light",
  tags: ["form", "color", "picker", "input", "selection"],
  isNew: true,
  fileSize: "3kb",
  complexity: "medium",
  lastUpdated: "2025-04-04",
  author: "Lovable UI",
  code: `import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Paintbrush, Check } from "lucide-react";

interface ColorPickerProps {
  defaultColor?: string;
  colors?: string[];
  onChange?: (color: string) => void;
  className?: string;
}

const defaultColors = [
  "#f44336", "#e91e63", "#9c27b0", "#673ab7", 
  "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", 
  "#009688", "#4caf50", "#8bc34a", "#cddc39", 
  "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", 
  "#795548", "#607d8b", "#9e9e9e", "#000000"
];

const ColorPicker: React.FC<ColorPickerProps> = ({
  defaultColor = "#2196f3",
  colors = defaultColors,
  onChange,
  className
}) => {
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  
  const handleSelectColor = (color: string) => {
    setSelectedColor(color);
    if (onChange) {
      onChange(color);
    }
  };
  
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <Label>Select Color</Label>
        <div 
          className="w-8 h-8 rounded-full border border-border cursor-pointer"
          style={{ backgroundColor: selectedColor }}
        />
      </div>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <div className="flex items-center gap-2">
              <Paintbrush className="h-4 w-4" />
              <span>Pick a color</span>
            </div>
            <div 
              className="w-4 h-4 rounded-full border"
              style={{ backgroundColor: selectedColor }}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="grid grid-cols-5 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                className={cn(
                  "w-8 h-8 rounded-full border border-border flex items-center justify-center",
                  selectedColor === color && "ring-2 ring-primary ring-offset-2"
                )}
                style={{ backgroundColor: color }}
                onClick={() => handleSelectColor(color)}
              >
                {selectedColor === color && (
                  <Check className="h-4 w-4 text-white" />
                )}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ColorPicker;`,
};

export default ColorPickerComponentItem;
