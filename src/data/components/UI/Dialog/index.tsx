
import { ComponentItem } from "@/types/component";
import DialogComponent from "./DialogComponent";

const DialogComponentItem: ComponentItem = {
  id: 132,
  name: "Dialog",
  category: "UI",
  framework: "React",
  description: "A modal dialog component for displaying important information or requesting user input.",
  component: DialogComponent,
  price: "Free",
  language: "TypeScript",
  tags: ["UI", "modal", "dialog", "popup", "overlay"],
  isNew: true,
  fileSize: "1.4kb",
  complexity: "medium",
  code: `import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DialogProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const DialogComponent: React.FC<DialogProps> = ({
  trigger,
  title,
  description,
  children,
  footer,
  open,
  onOpenChange
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        
        {children}
        
        {footer && (
          <DialogFooter>
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;`
};

export default DialogComponentItem;
