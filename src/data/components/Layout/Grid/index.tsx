
import React from 'react';
import { ComponentItem } from "@/types/component";
import GridComponent from "@/components/layout/GridComponent";

const GridComponentData: ComponentItem = {
  id: 301,
  name: "Grid Layout",
  category: "Layout",
  framework: "React",
  description: "A flexible grid layout component for creating responsive grid-based designs",
  code: `import React from "react";

export interface GridComponentProps {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
  className?: string;
  rowGap?: number;
  columnGap?: number;
  responsive?: boolean;
}

const GridComponent = ({
  children,
  columns = 2,
  gap = 4,
  className = "",
  rowGap,
  columnGap,
  responsive = true,
}) => {
  // Define column gap styles
  const colGap = columnGap !== undefined ? columnGap : gap;
  const rowG = rowGap !== undefined ? rowGap : gap;
  
  // Calculate the grid template columns based on number of columns
  const gridCols = \`grid-cols-\${columns}\`;
  
  // For responsive grids, define breakpoints
  const responsiveClasses = responsive
    ? \`grid-cols-1 sm:grid-cols-2 md:\${columns >= 3 ? 'grid-cols-3' : 'grid-cols-2'} lg:\${gridCols}\`
    : gridCols;

  return (
    <div
      className={\`grid \${responsiveClasses} gap-\${rowG} gap-x-\${colGap} \${className}\`}
    >
      {children}
    </div>
  );
};

export default GridComponent;`,
  component: () => (
    <GridComponent>
      <div className="bg-gray-100 p-4 rounded">Item 1</div>
      <div className="bg-gray-100 p-4 rounded">Item 2</div>
      <div className="bg-gray-100 p-4 rounded">Item 3</div>
      <div className="bg-gray-100 p-4 rounded">Item 4</div>
    </GridComponent>
  ),
  tags: ["layout", "grid", "responsive", "container"],
  fileSize: "0.9 KB",
  price: "Free"
};

export default GridComponentData;
