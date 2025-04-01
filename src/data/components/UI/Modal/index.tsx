
import React from 'react';
import { ComponentItem } from "@/types/component";
import ModalComponent from "@/components/ui/ModalComponent";

const ModalComponentData: ComponentItem = {
  id: 202,
  name: "Modal",
  category: "UI",
  framework: "React",
  description: "A modal dialog component for displaying important content that requires user attention or interaction",
  code: `import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface ModalComponentProps {
  title?: string;
  description?: string;
  triggerText?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const ModalComponent = ({
  title = "Modal Title",
  description = "This is a description for the modal dialog.",
  triggerText = "Open Modal",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm = () => {},
  size = 'md'
}) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl"
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerText}</Button>
      </DialogTrigger>
      <DialogContent className={\`\${sizeClasses[size]}\`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          Content can go here. This example uses a simple text description,
          but you can add forms, images, or other components here.
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {cancelText}
          </Button>
          <Button onClick={handleConfirm}>
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalComponent;`,
  component: () => <ModalComponent />,
  tags: ["UI", "dialog", "popup", "interaction"],
  fileSize: "1.5 KB",
  price: "Free"
};

export default ModalComponentData;
