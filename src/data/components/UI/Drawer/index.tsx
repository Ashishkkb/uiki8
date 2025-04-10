
import { ComponentItem } from "@/types/component";
import DrawerComponent from "./DrawerComponent";

const DrawerComponentItem: ComponentItem = {
  id: 134,
  name: "Drawer",
  category: "UI",
  framework: "React",
  description: "A sliding drawer panel that can appear from any edge of the screen to show additional content.",
  component: DrawerComponent,
  price: "Free",
  language: "TypeScript",
  tags: ["navigation", "panel", "drawer", "slide", "modal"],
  isNew: true,
  fileSize: "1.8kb",
  complexity: "medium",
  code: `import React from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

interface DrawerComponentProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeButton?: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({
  trigger,
  title,
  description,
  children,
  footer,
  className,
  open,
  onOpenChange,
  closeButton = "Close",
  side = "right",
}) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction={side}>
      <DrawerTrigger asChild>
        {trigger}
      </DrawerTrigger>
      <DrawerContent className={cn("", className)}>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        
        <div className="px-4 py-2">
          {children}
        </div>
        
        {(footer || closeButton) && (
          <DrawerFooter>
            {footer}
            {closeButton && (
              <DrawerClose asChild>
                {typeof closeButton === 'string' ? (
                  <button className="text-sm text-muted-foreground hover:underline">
                    {closeButton}
                  </button>
                ) : (
                  closeButton
                )}
              </DrawerClose>
            )}
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;`
};

export default DrawerComponentItem;
