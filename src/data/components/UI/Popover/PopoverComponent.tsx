
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Settings, User, Bell, Info } from "lucide-react";

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
        style={{"--width": `${width}px`} as React.CSSProperties}
      >
        {title && <h4 className="font-medium mb-2">{title}</h4>}
        {children}
      </PopoverContent>
    </Popover>
  );
};

const PopoverDemo = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  return (
    <div className="flex flex-wrap gap-6">
      <CustomPopover 
        triggerText="User Settings" 
        title="Edit Profile"
        width={300}
      >
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              placeholder="John Doe" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              placeholder="john@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button>Save Changes</Button>
        </div>
      </CustomPopover>

      <CustomPopover 
        triggerText="Information" 
        side="right"
        width={200}
      >
        <div className="text-sm text-muted-foreground">
          <p>This is additional information that provides context or help for the user.</p>
        </div>
      </CustomPopover>

      <CustomPopover 
        triggerText="Notifications" 
        title="Recent Notifications"
        side="top"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2 p-2 rounded hover:bg-muted">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">New message received</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded hover:bg-muted">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Profile updated</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded hover:bg-muted">
            <Settings className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Settings changed</span>
          </div>
        </div>
      </CustomPopover>

      <CustomPopover 
        triggerText="Help" 
        side="left"
        align="start"
      >
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-primary" />
          <span className="text-sm">Need help? Contact support.</span>
        </div>
      </CustomPopover>
    </div>
  );
};

export default PopoverDemo;
