
import React from 'react';
import { ComponentItem } from "@/types/component";
import { Card } from "@/components/ui/card";

const MasonryLayout = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-max">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className={`p-4 ${i === 0 || i === 3 ? 'md:col-span-2 md:row-span-2' : ''}`}>
          <div className={`bg-muted rounded-md w-full ${i === 0 || i === 3 ? 'h-60' : 'h-40'}`} />
          <h3 className="mt-2 font-medium">Card {i + 1}</h3>
          <p className="text-sm text-muted-foreground">This is a masonry grid item.</p>
        </Card>
      ))}
    </div>
  );
};

const MasonryLayoutComponentData: ComponentItem = {
  id: 406,
  name: "Masonry Layout",
  category: "Layout",
  framework: "React",
  description: "A responsive masonry grid layout for image galleries and card layouts",
  code: `import React from "react";

interface MasonryLayoutProps {
  children: React.ReactNode[];
  columns?: number;
  gap?: number;
  className?: string;
}

const MasonryLayout: React.FC<MasonryLayoutProps> = ({
  children,
  columns = 3,
  gap = 4,
  className = "",
}) => {
  const calculateColumns = () => {
    const childrenArray = React.Children.toArray(children);
    const columnsArray: React.ReactNode[][] = Array.from({ length: columns }, () => []);
    
    childrenArray.forEach((child, index) => {
      const columnIndex = index % columns;
      columnsArray[columnIndex].push(child);
    });
    
    return columnsArray;
  };
  
  const columnsArray = calculateColumns();
  
  return (
    <div 
      className={\`grid grid-cols-1 md:grid-cols-\${columns} gap-\${gap} \${className}\`}
    >
      {columnsArray.map((column, columnIndex) => (
        <div key={columnIndex} className="flex flex-col space-y-4">
          {column.map((child, childIndex) => (
            <div key={childIndex}>{child}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MasonryLayout;`,
  component: MasonryLayout,
  tags: ["layout", "masonry", "grid", "gallery"],
  fileSize: "1.1 KB",
  price: "Free",
  complexity: "medium",
  lastUpdated: "2023-12-15"
};

export default MasonryLayoutComponentData;
