
import { ComponentItem } from "@/types/component";
import CommandPaletteComponent from "./CommandPaletteComponent";

const CommandPaletteComponentItem: ComponentItem = {
  id: 51,
  name: "Command Palette",
  category: "Navigation",
  framework: "React",
  description: "A keyboard-accessible command palette for quick navigation and performing actions in your application.",
  component: CommandPaletteComponent,
  price: "Free",
  language: "TypeScript",
  previewBg: "light",
  tags: ["navigation", "command", "keyboard", "search", "accessibility"],
  isNew: true,
  fileSize: "4.2kb",
  complexity: "medium",
  lastUpdated: "2025-04-04",
  author: "Lovable UI",
  code: `import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { 
  Command, 
  CommandDialog, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList, 
  CommandSeparator,
  CommandShortcut
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Settings, 
  Users, 
  Mail, 
  Calendar, 
  LayoutDashboard, 
  Search,
  HelpCircle,
  LogOut
} from "lucide-react";

interface CommandPaletteProps {
  className?: string;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ className }) => {
  const [open, setOpen] = useState(false);

  // Toggle command palette with keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className={cn("w-full", className)}>
      <Button 
        variant="outline" 
        className="w-full justify-between text-sm text-muted-foreground"
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          <span>Search commands...</span>
        </div>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem>
              <Users className="mr-2 h-4 w-4" />
              <span>Team</span>
            </CommandItem>
            <CommandItem>
              <FileText className="mr-2 h-4 w-4" />
              <span>Documents</span>
              <CommandShortcut>⌘D</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          
          <CommandSeparator />
          
          <CommandGroup heading="Applications">
            <CommandItem>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Calendar</span>
              <CommandShortcut>⌘C</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Mail className="mr-2 h-4 w-4" />
              <span>Mail</span>
              <CommandShortcut>⌘M</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          
          <CommandSeparator />
          
          <CommandGroup heading="Quick Actions">
            <CommandItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help Center</span>
            </CommandItem>
            <CommandItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default CommandPalette;`,
};

export default CommandPaletteComponentItem;
