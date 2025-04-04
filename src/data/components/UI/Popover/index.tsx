
import { ComponentItem } from "@/types/component";
import PopoverComponent from "./PopoverComponent";

const PopoverComponentItem: ComponentItem = {
  id: 54,
  name: "Popover",
  category: "UI",
  framework: "React",
  description: "A popover component that displays content in a small overlay triggered by a button.",
  component: PopoverComponent,
  price: "Free",
  language: "TypeScript",
  previewBg: "light",
  tags: ["UI", "popover", "overlay", "tooltip", "modal"],
  isNew: true,
  fileSize: "1.8kb",
  complexity: "simple",
  lastUpdated: "2025-04-04",
  author: "Lovable UI",
  code: `import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CustomPopoverProps {
  triggerText: string;
  title?: string;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  width?: number;
  className?: string;
}

const CustomPopover: React.FC<CustomPopoverProps> = ({
  triggerText,
  title,
  children,
  side = "bottom",
  align = "center",
  width = 250,
  className,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={className}>
          {triggerText}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        side={side} 
        align={align} 
        className="w-[var(--width)]"
        style={{"--width": \`\${width}px\`} as React.CSSProperties}
      >
        {title && <h4 className="font-medium mb-2">{title}</h4>}
        {children}
      </PopoverContent>
    </Popover>
  );
};

export default CustomPopover;`,
};

export default PopoverComponentItem;
