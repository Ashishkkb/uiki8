
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Info, HelpCircle, CreditCard, User, Mail, Key } from "lucide-react";

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

const FormField = ({ 
  label, 
  icon: Icon, 
  helpText, 
  type = "text", 
  placeholder 
}: { 
  label: string; 
  icon?: React.ElementType; 
  helpText?: string; 
  type?: string; 
  placeholder?: string;
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label htmlFor={label.toLowerCase()}>{label}</Label>
        {helpText && (
          <ContextualHelp content={helpText} />
        )}
      </div>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            <Icon size={16} />
          </div>
        )}
        <Input 
          id={label.toLowerCase()} 
          type={type} 
          placeholder={placeholder}
          className={Icon ? "pl-9" : ""} 
        />
      </div>
    </div>
  );
};

const ContextualHelpDemo = () => {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          Form with Contextual Help
          <ContextualHelp 
            icon="help"
            content={
              <div>
                <p className="font-medium mb-1">Form help</p>
                <p>Complete all required fields and submit the form to continue.</p>
              </div>
            }
          />
        </h3>
        
        <FormField 
          label="Full Name" 
          icon={User} 
          placeholder="John Doe"
          helpText="Enter your full legal name as it appears on your ID."
        />
        
        <FormField 
          label="Email" 
          icon={Mail} 
          type="email"
          placeholder="john@example.com"
          helpText="We'll never share your email with anyone else."
        />
        
        <FormField 
          label="Password" 
          icon={Key} 
          type="password"
          helpText={
            <div className="space-y-1">
              <p className="font-medium">Password requirements:</p>
              <ul className="list-disc list-inside">
                <li>At least 8 characters</li>
                <li>At least one uppercase letter</li>
                <li>At least one number</li>
                <li>At least one special character</li>
              </ul>
            </div>
          }
        />
        
        <FormField 
          label="Credit Card" 
          icon={CreditCard} 
          placeholder="1234 5678 9012 3456"
          helpText="We use secure encryption for all payment information."
        />
      </div>
      
      <div className="flex items-center space-x-2 mt-2">
        <p className="text-sm text-muted-foreground">
          Need more help?
        </p>
        <ContextualHelp 
          content="Contact our support team at support@example.com"
          side="right"
        />
      </div>
    </div>
  );
};

export default ContextualHelpDemo;
