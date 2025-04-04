
import { ComponentItem } from "@/types/component";
import HoverCardComponent from "./HoverCardComponent";

const HoverCardComponentItem: ComponentItem = {
  id: 56,
  name: "Hover Card",
  category: "UI",
  framework: "React",
  description: "A component that displays additional information when hovering over a trigger element, ideal for user profiles and product previews.",
  component: HoverCardComponent,
  price: "Free",
  language: "TypeScript",
  previewBg: "light",
  tags: ["UI", "hover", "card", "tooltip", "preview"],
  isNew: true,
  fileSize: "2.1kb",
  complexity: "simple",
  lastUpdated: "2025-04-04",
  author: "Lovable UI",
  code: `import React from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface CustomHoverCardProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  openDelay?: number;
  closeDelay?: number;
  className?: string;
}

const CustomHoverCard: React.FC<CustomHoverCardProps> = ({
  trigger,
  children,
  side = "bottom",
  align = "center",
  openDelay = 300,
  closeDelay = 200,
  className,
}) => {
  return (
    <HoverCard openDelay={openDelay} closeDelay={closeDelay}>
      <HoverCardTrigger asChild>
        <span className="cursor-pointer">{trigger}</span>
      </HoverCardTrigger>
      <HoverCardContent 
        side={side}
        align={align}
        className={className}
      >
        {children}
      </HoverCardContent>
    </HoverCard>
  );
};

export default CustomHoverCard;`,
};

export default HoverCardComponentItem;
