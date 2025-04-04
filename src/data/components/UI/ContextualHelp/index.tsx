
import { ComponentItem } from "@/types/component";
import ContextualHelpComponent from "./ContextualHelpComponent";

const ContextualHelpComponentItem: ComponentItem = {
  id: 58,
  name: "Contextual Help",
  category: "UI",
  framework: "React",
  description: "A component that provides contextual help information in an accessible and user-friendly way.",
  component: ContextualHelpComponent,
  price: "Free",
  language: "TypeScript",
  previewBg: "light",
  tags: ["UI", "help", "tooltip", "accessibility", "info"],
  isNew: true,
  fileSize: "1.9kb",
  complexity: "medium",
  lastUpdated: "2025-04-04",
  author: "Lovable UI",
  code: `import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Info, HelpCircle } from "lucide-react";

interface ContextualHelpProps {
  content: React.ReactNode;
  icon?: "info" | "help";
  iconSize?: number;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  className?: string;
  iconClassName?: string;
}

const ContextualHelp: React.FC<ContextualHelpProps> = ({
  content,
  icon = "info",
  iconSize = 16,
  side = "top",
  align = "center",
  className,
  iconClassName,
}) => {
  const IconComponent = icon === "info" ? Info : HelpCircle;
  
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <button 
            type="button"
            className={cn(
              "inline-flex text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus-visible:text-foreground",
              iconClassName
            )}
            aria-label="Show help information"
          >
            <IconComponent size={iconSize} />
          </button>
        </TooltipTrigger>
        <TooltipContent 
          side={side} 
          align={align}
          className={cn("max-w-xs text-sm", className)}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ContextualHelp;`,
};

export default ContextualHelpComponentItem;
