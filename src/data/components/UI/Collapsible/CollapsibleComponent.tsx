
import React, { useState } from 'react';
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

const CollapsibleDemo = () => {
  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <h3 className="text-lg font-medium mb-4">Frequently Asked Questions</h3>
      
      <CustomCollapsible 
        title="What is Lovable UI?" 
        defaultOpen={true}
      >
        <p className="text-sm text-muted-foreground">
          Lovable UI is a collection of beautifully designed, accessible components for modern web applications. 
          It includes a variety of UI elements, from simple buttons to complex interactive components.
        </p>
      </CustomCollapsible>
      
      <CustomCollapsible 
        title="How do I install these components?"
      >
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            You can install the components using npm or yarn:
          </p>
          <div className="bg-muted p-2 rounded-md text-sm font-mono">
            npm install @lovable/ui
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Then import the components as needed in your React application.
          </p>
        </div>
      </CustomCollapsible>
      
      <CustomCollapsible 
        title="Are these components accessible?"
      >
        <p className="text-sm text-muted-foreground">
          Yes, all components are designed with accessibility in mind. They follow WAI-ARIA guidelines 
          and include proper keyboard navigation, focus management, and screen reader support.
        </p>
      </CustomCollapsible>
      
      <CustomCollapsible 
        title="Can I customize the components?"
      >
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Absolutely! All components are highly customizable through:
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Tailwind CSS classes</li>
            <li>Custom props for specific behaviors</li>
            <li>Theming support</li>
            <li>Component composition</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-2">
            You can also extend them or create new components based on the existing ones.
          </p>
        </div>
      </CustomCollapsible>
      
      <CustomCollapsible 
        title="Is there documentation available?"
      >
        <p className="text-sm text-muted-foreground">
          Yes, comprehensive documentation is available at 
          <a href="#" className="text-primary ml-1 hover:underline">docs.lovable-ui.com</a>.
          It includes installation instructions, API references, examples, and design guidelines.
        </p>
      </CustomCollapsible>
    </div>
  );
};

export default CollapsibleDemo;
