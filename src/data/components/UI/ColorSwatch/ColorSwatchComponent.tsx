
import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ColorValue {
  name: string;
  value: string;
  textColor?: string;
}

interface ColorGroupProps {
  name: string;
  colors: ColorValue[];
}

interface ColorSwatchProps {
  colorGroups: ColorGroupProps[];
  className?: string;
  copyFormat?: 'hex' | 'tailwind' | 'css-var';
  showTooltip?: boolean;
  showNames?: boolean;
  showCopyButton?: boolean;
  gridColumns?: 1 | 2 | 3 | 4 | 5 | 'auto';
  size?: 'sm' | 'md' | 'lg';
}

const ColorSwatchComponent: React.FC<ColorSwatchProps> = ({
  colorGroups,
  className,
  copyFormat = 'hex',
  showTooltip = true,
  showNames = true,
  showCopyButton = true,
  gridColumns = 'auto',
  size = 'md',
}) => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'h-12 w-12';
      case 'lg': return 'h-24 w-24';
      case 'md':
      default: return 'h-16 w-16';
    }
  };

  const getGridColumns = () => {
    if (gridColumns === 'auto') return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5';
    return `grid-cols-${gridColumns}`;
  };

  const copyToClipboard = (color: string, colorName: string) => {
    let textToCopy = color;
    
    if (copyFormat === 'tailwind') {
      // Convert to tailwind class format
      textToCopy = colorName.includes('-') 
        ? colorName // If already in format like "blue-500"
        : `${colorGroups.find(group => 
            group.colors.some(c => c.name === colorName)
          )?.name.toLowerCase() || 'color'}-${colorName.toLowerCase()}`;
    } else if (copyFormat === 'css-var') {
      // Convert to CSS variable format
      textToCopy = `var(--${colorName.toLowerCase().replace(/\s+/g, '-')})`;
    }
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedColor(color);
      toast.success(`Copied ${textToCopy} to clipboard`);
      
      setTimeout(() => {
        setCopiedColor(null);
      }, 2000);
    });
  };

  const getContrastTextColor = (bgColor: string): string => {
    // Default to light text
    if (!bgColor || bgColor === 'transparent') return 'text-white';
    
    // Use provided text color if available
    const colorObj = colorGroups
      .flatMap(group => group.colors)
      .find(color => color.value === bgColor);
      
    if (colorObj?.textColor) {
      return colorObj.textColor;
    }
    
    // Simple contrast calculation for hex colors
    if (bgColor.startsWith('#')) {
      let r, g, b;
      
      // Convert 3-character hex to 6-character
      if (bgColor.length === 4) {
        r = parseInt(bgColor[1] + bgColor[1], 16);
        g = parseInt(bgColor[2] + bgColor[2], 16);
        b = parseInt(bgColor[3] + bgColor[3], 16);
      } else {
        r = parseInt(bgColor.slice(1, 3), 16);
        g = parseInt(bgColor.slice(3, 5), 16);
        b = parseInt(bgColor.slice(5, 7), 16);
      }
      
      // Calculate relative luminance
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      
      return luminance > 0.5 ? 'text-black' : 'text-white';
    }
    
    // Default for non-hex colors
    return 'text-white';
  };

  return (
    <div className={cn("space-y-8", className)}>
      {colorGroups.map((group) => (
        <div key={group.name} className="space-y-4">
          <h3 className="text-lg font-medium">{group.name}</h3>
          
          <div className={cn("grid gap-4", getGridColumns())}>
            {group.colors.map((color) => {
              const contrastTextColor = getContrastTextColor(color.value);
              
              return (
                <div key={color.name} className="space-y-1.5">
                  <TooltipProvider>
                    <Tooltip open={showTooltip ? undefined : false}>
                      <TooltipTrigger asChild>
                        <div
                          className={cn(
                            "group relative flex items-center justify-center rounded-md border",
                            getSizeClasses(),
                            showCopyButton ? "cursor-pointer" : "cursor-default"
                          )}
                          style={{ backgroundColor: color.value }}
                          onClick={() => showCopyButton && copyToClipboard(color.value, color.name)}
                        >
                          {copiedColor === color.value ? (
                            <Check className={cn("h-5 w-5", contrastTextColor)} />
                          ) : (
                            showCopyButton && (
                              <Copy className={cn(
                                "h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100",
                                contrastTextColor
                              )} />
                            )
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <div className="text-xs">{color.value}</div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  {showNames && (
                    <div className="space-y-0.5">
                      <div className="text-xs font-medium">{color.name}</div>
                      <div className="text-xs text-muted-foreground">{color.value}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColorSwatchComponent;
