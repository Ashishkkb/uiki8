
import React from 'react';
import { ComponentItem } from "@/types/component";
import DropdownComponent from "@/components/ui/DropdownComponent";

const DropdownComponentData: ComponentItem = {
  id: 203,
  name: "Dropdown",
  category: "UI",
  framework: "React",
  description: "A dropdown menu component for displaying a list of options or actions",
  code: `import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export interface DropdownItem {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface DropdownComponentProps {
  triggerText?: string;
  items?: DropdownItem[];
  label?: string;
  variant?: "default" | "outline" | "secondary";
}

const DropdownComponent = ({
  triggerText = "Options",
  items = [
    { label: "Profile", onClick: () => console.log("Profile clicked") },
    { label: "Settings", onClick: () => console.log("Settings clicked") },
    { label: "Logout", onClick: () => console.log("Logout clicked") },
  ],
  label = "My Account",
  variant = "default",
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} className="flex items-center gap-1">
          {triggerText} <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
        {label && <DropdownMenuSeparator />}
        {items.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={item.onClick}
            disabled={item.disabled}
            className="cursor-pointer"
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownComponent;`,
  component: () => <DropdownComponent />,
  tags: ["UI", "menu", "selection", "navigation"],
  fileSize: "1.3 KB",
  price: "Free"
};

export default DropdownComponentData;
