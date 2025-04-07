
import React from 'react';
import { ComponentItem } from "@/types/component";
import CommandItemComponent from "./CommandItemComponent";

const CommandItemComponentItem: ComponentItem = {
  id: 128,
  name: "Command Item",
  category: "UI",
  framework: "React",
  description: "A component for displaying command menu items with icons, keyboard shortcuts, and selection indicators.",
  code: `import React from 'react';
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface CommandItemProps {
  children: React.ReactNode;
  className?: string;
  command?: string;
  onSelect?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  shortcut?: string;
  showArrow?: boolean;
}

const CommandItem: React.FC<CommandItemProps> = ({
  children,
  className,
  command,
  onSelect,
  disabled = false,
  icon,
  shortcut,
  showArrow = false
}) => {
  return (
    <div
      className={cn(
        "flex items-center px-2 py-1.5 text-sm rounded-md relative select-none",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-accent",
        className
      )}
      onClick={disabled ? undefined : onSelect}
      data-command={command}
      aria-disabled={disabled}
    >
      {icon && (
        <div className="mr-2 flex-shrink-0 text-muted-foreground">
          {icon}
        </div>
      )}
      <div className="flex-grow">{children}</div>
      
      {shortcut && (
        <kbd className="ml-auto flex-shrink-0 px-1.5 font-mono text-xs bg-muted text-muted-foreground rounded">
          {shortcut}
        </kbd>
      )}
      
      {showArrow && (
        <div className="ml-2 flex-shrink-0 text-muted-foreground">
          <ArrowRight className="h-4 w-4" />
        </div>
      )}
    </div>
  );
};

export default CommandItem;`,
  component: CommandItemComponent,
  tags: ["UI", "command", "menu", "dropdown", "navigation"],
  isNew: true,
  fileSize: "1.5 KB",
  complexity: "simple"
};

export default CommandItemComponentItem;
