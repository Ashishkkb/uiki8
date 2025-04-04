
import React from 'react';
import { ComponentItem } from "@/types/component";
import ResponsiveColumns from "@/components/layout/ResponsiveColumns";
import { Card } from "@/components/ui/card";

const ResponsiveColumnsComponentData: ComponentItem = {
  id: 304,
  name: "Responsive Columns",
  category: "Layout",
  framework: "React",
  description: "A flexible responsive column layout that adapts to different screen sizes",
  code: `import React from "react";
import { cn } from "@/lib/utils";

export interface ResponsiveColumnsProps {
  children: React.ReactNode;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: number;
  className?: string;
  equalHeight?: boolean;
  breakout?: boolean;
}

const ResponsiveColumns: React.FC<ResponsiveColumnsProps> = ({
  children,
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = 4,
  className = "",
  equalHeight = true,
  breakout = false,
}) => {
  // Generate the column classes based on the provided configuration
  const colClasses = [
    columns.sm ? \`sm:grid-cols-\${columns.sm}\` : "",
    columns.md ? \`md:grid-cols-\${columns.md}\` : "",
    columns.lg ? \`lg:grid-cols-\${columns.lg}\` : "",
    columns.xl ? \`xl:grid-cols-\${columns.xl}\` : "",
  ].filter(Boolean).join(" ");
  
  return (
    <div
      className={cn(
        "grid grid-cols-1",
        colClasses,
        \`gap-\${gap}\`,
        equalHeight ? "auto-rows-fr" : "",
        breakout ? "overflow-x-auto -mx-4 px-4 md:-mx-6 md:px-6" : "",
        className
      )}
    >
      {children}
    </div>
  );
};

export default ResponsiveColumns;`,
  component: () => (
    <ResponsiveColumns columns={{ sm: 1, md: 2, lg: 3 }} gap={4}>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Card key={item} className="p-4">
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="rounded-md bg-muted h-12 w-12 flex items-center justify-center">
              {item}
            </div>
            <h3 className="text-sm font-medium">Item {item}</h3>
            <p className="text-xs text-muted-foreground">Responsive column item</p>
          </div>
        </Card>
      ))}
    </ResponsiveColumns>
  ),
  tags: ["layout", "responsive", "grid", "columns"],
  fileSize: "1.0 KB",
  price: "Free",
  complexity: "simple",
  lastUpdated: "2023-12-10"
};

export default ResponsiveColumnsComponentData;
