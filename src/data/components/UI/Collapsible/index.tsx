
import { ComponentItem } from "@/types/component";
import CollapsibleComponent from "./CollapsibleComponent";

const CollapsibleComponentItem: ComponentItem = {
  id: 57,
  name: "Collapsible",
  category: "UI",
  framework: "React",
  description: "A component that can be expanded and collapsed to show or hide content, useful for FAQs and content toggles.",
  component: CollapsibleComponent,
  price: "Free",
  language: "TypeScript",
  previewBg: "light",
  tags: ["UI", "collapsible", "accordion", "toggle", "disclosure"],
  isNew: true,
  fileSize: "1.5kb",
  complexity: "simple",
  lastUpdated: "2025-04-04",
  author: "Lovable UI",
  code: `import React, { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface CustomCollapsibleProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

const CustomCollapsible: React.FC<CustomCollapsibleProps> = ({
  title,
  children,
  defaultOpen = false,
  className,
  triggerClassName,
  contentClassName,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn("border rounded-md", className)}
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "flex w-full justify-between p-4 font-medium text-left",
            triggerClassName
          )}
        >
          {title}
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className={cn("p-4 pt-0", contentClassName)}>
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CustomCollapsible;`,
};

export default CollapsibleComponentItem;
