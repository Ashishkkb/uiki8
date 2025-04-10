
import { ComponentItem } from "@/types/component";
import ColorSwatchComponent from "./ColorSwatchComponent";

const ColorSwatchComponentItem: ComponentItem = {
  id: 211,
  name: "Color Swatch",
  description: "A component for displaying and copying color palettes",
  category: "UI",
  component: () => (
    <ColorSwatchComponent
      colorGroups={[
        {
          name: "Primary",
          colors: [
            { name: "50", value: "#f0f9ff" },
            { name: "100", value: "#e0f2fe" },
            { name: "200", value: "#bae6fd" },
            { name: "300", value: "#7dd3fc" },
            { name: "400", value: "#38bdf8" },
            { name: "500", value: "#0ea5e9" },
            { name: "600", value: "#0284c7" },
            { name: "700", value: "#0369a1" },
            { name: "800", value: "#075985" },
            { name: "900", value: "#0c4a6e" },
            { name: "950", value: "#082f49" }
          ]
        },
        {
          name: "Neutral",
          colors: [
            { name: "50", value: "#f9fafb" },
            { name: "100", value: "#f3f4f6" },
            { name: "200", value: "#e5e7eb" },
            { name: "300", value: "#d1d5db" },
            { name: "400", value: "#9ca3af" },
            { name: "500", value: "#6b7280" },
            { name: "600", value: "#4b5563" },
            { name: "700", value: "#374151" },
            { name: "800", value: "#1f2937" },
            { name: "900", value: "#111827" },
            { name: "950", value: "#030712" }
          ]
        }
      ]}
    />
  ),
  code: `import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ColorSwatch = ({
  colorGroups = [
    {
      name: "Primary",
      colors: [
        { name: "50", value: "#f0f9ff" },
        { name: "100", value: "#e0f2fe" },
        { name: "200", value: "#bae6fd" },
        { name: "300", value: "#7dd3fc" },
        { name: "400", value: "#38bdf8" },
        { name: "500", value: "#0ea5e9" },
        { name: "600", value: "#0284c7" },
        { name: "700", value: "#0369a1" },
        { name: "800", value: "#075985" },
        { name: "900", value: "#0c4a6e" }
      ]
    },
    {
      name: "Gray",
      colors: [
        { name: "50", value: "#f9fafb" },
        { name: "100", value: "#f3f4f6" },
        { name: "200", value: "#e5e7eb" },
        { name: "300", value: "#d1d5db" },
        { name: "400", value: "#9ca3af" },
        { name: "500", value: "#6b7280" },
        { name: "600", value: "#4b5563" },
        { name: "700", value: "#374151" },
        { name: "800", value: "#1f2937" },
        { name: "900", value: "#111827" }
      ]
    }
  ],
  copyFormat = 'hex', // 'hex', 'tailwind', 'css-var'
  showTooltip = true,
  showNames = true,
  size = 'md', // 'sm', 'md', 'lg'
  className
}) => {
  const [copiedColor, setCopiedColor] = useState(null);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'h-12 w-12';
      case 'lg': return 'h-24 w-24';
      default: return 'h-16 w-16';
    }
  };

  const copyToClipboard = (color, colorName) => {
    let textToCopy = color;
    
    if (copyFormat === 'tailwind') {
      // Convert to tailwind class format
      textToCopy = \`\${colorGroups.find(group => 
        group.colors.some(c => c.name === colorName)
      )?.name.toLowerCase() || 'color'}-\${colorName}\`;
    } else if (copyFormat === 'css-var') {
      // Convert to CSS variable format
      textToCopy = \`var(--\${colorName.toLowerCase()})\`;
    }
    
    navigator.clipboard.writeText(textToCopy);
    toast.success(\`Copied \${textToCopy}\`);
    setCopiedColor(color);
    
    setTimeout(() => {
      setCopiedColor(null);
    }, 2000);
  };

  const getContrastTextColor = (bgColor) => {
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
      
      // Calculate luminance
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      
      return luminance > 0.5 ? 'text-black' : 'text-white';
    }
    
    return 'text-white';
  };

  return (
    <div className={cn("space-y-8", className)}>
      {colorGroups.map((group) => (
        <div key={group.name} className="space-y-4">
          <h3 className="text-lg font-medium">{group.name}</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {group.colors.map((color) => (
              <div key={color.name} className="space-y-1.5">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={cn(
                          "group relative flex items-center justify-center rounded-md border cursor-pointer",
                          getSizeClasses()
                        )}
                        style={{ backgroundColor: color.value }}
                        onClick={() => copyToClipboard(color.value, color.name)}
                      >
                        {copiedColor === color.value ? (
                          <Check className={cn("h-5 w-5", getContrastTextColor(color.value))} />
                        ) : (
                          <Copy className={cn(
                            "h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100",
                            getContrastTextColor(color.value)
                          )} />
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
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};`,
  framework: "React",
  isNew: true,
  tags: ["colors", "design", "palette", "swatch", "ui"]
};

export default ColorSwatchComponentItem;
