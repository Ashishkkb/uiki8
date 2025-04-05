
import { ComponentItem } from "@/types/component";
import ThemeToggleComponent from "./ThemeToggleComponent";

const ThemeToggleComponentItem: ComponentItem = {
  id: 62,
  name: "Theme Toggle",
  category: "UI",
  framework: "React",
  description: "A toggle component for switching between light, dark, and system themes.",
  component: ThemeToggleComponent,
  price: "Free",
  language: "TypeScript",
  previewBg: "light",
  tags: ["UI", "theme", "toggle", "dark mode", "light mode"],
  isNew: true,
  fileSize: "1.8kb",
  complexity: "simple",
  lastUpdated: "2025-04-06",
  author: "Lovable UI",
  code: `import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sun, Moon, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  defaultTheme?: 'light' | 'dark' | 'system';
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  onChange?: (theme: 'light' | 'dark' | 'system') => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className,
  defaultTheme = 'system',
  size = 'md',
  showLabels = false,
  onChange
}) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(defaultTheme);
  
  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    if (onChange) onChange(newTheme);
    
    // You would typically update your app's theme here using a theme provider
    console.log(\`Theme changed to: \${newTheme}\`);
  };
  
  const sizeConfig = {
    sm: { button: "h-6 px-2", icon: "h-3 w-3" },
    md: { button: "h-9 px-3", icon: "h-4 w-4" },
    lg: { button: "h-11 px-4", icon: "h-5 w-5" }
  };
  
  return (
    <div className={cn("flex items-center rounded-lg border", className)}>
      <Button
        type="button"
        variant={theme === 'light' ? 'default' : 'ghost'}
        className={cn(
          sizeConfig[size].button,
          "rounded-r-none border-0"
        )}
        onClick={() => handleThemeChange('light')}
        aria-label="Light theme"
      >
        <Sun className={sizeConfig[size].icon} />
        {showLabels && <span className="ml-2">Light</span>}
      </Button>
      
      <Button
        type="button"
        variant={theme === 'dark' ? 'default' : 'ghost'}
        className={cn(
          sizeConfig[size].button,
          "rounded-none border-0 border-x"
        )}
        onClick={() => handleThemeChange('dark')}
        aria-label="Dark theme"
      >
        <Moon className={sizeConfig[size].icon} />
        {showLabels && <span className="ml-2">Dark</span>}
      </Button>
      
      <Button
        type="button"
        variant={theme === 'system' ? 'default' : 'ghost'}
        className={cn(
          sizeConfig[size].button,
          "rounded-l-none border-0"
        )}
        onClick={() => handleThemeChange('system')}
        aria-label="System theme"
      >
        <Laptop className={sizeConfig[size].icon} />
        {showLabels && <span className="ml-2">System</span>}
      </Button>
    </div>
  );
};

export default ThemeToggle;`,
};

export default ThemeToggleComponentItem;
