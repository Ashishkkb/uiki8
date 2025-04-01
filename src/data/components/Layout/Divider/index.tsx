
import React from 'react';
import { ComponentItem } from "@/types/component";
import DividerComponent from "@/components/layout/DividerComponent";

const DividerComponentData: ComponentItem = {
  id: 302,
  name: "Divider",
  category: "Layout",
  framework: "React",
  description: "A divider component for visually separating content with optional labels",
  code: `import React from "react";
import { Separator } from "@/components/ui/separator";

export interface DividerComponentProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  label?: string;
  thickness?: number;
  color?: string;
}

const DividerComponent = ({
  orientation = "horizontal",
  className = "",
  label,
  thickness = 1,
  color = "border",
}) => {
  if (!label) {
    return (
      <Separator 
        orientation={orientation} 
        className={\`bg-\${color} \${thickness > 1 ? \`h-[\${thickness}px]\` : ''} \${className}\`}
      />
    );
  }
  
  // If label is provided, create a divider with label in the middle
  return (
    <div className="flex items-center w-full my-2">
      <Separator className={\`bg-\${color} \${thickness > 1 ? \`h-[\${thickness}px]\` : ''} flex-1\`} />
      <span className="px-2 text-sm text-gray-500">{label}</span>
      <Separator className={\`bg-\${color} \${thickness > 1 ? \`h-[\${thickness}px]\` : ''} flex-1\`} />
    </div>
  );
};

export default DividerComponent;`,
  component: () => (
    <div className="space-y-4">
      <DividerComponent />
      <DividerComponent label="OR" />
    </div>
  ),
  tags: ["layout", "divider", "separator", "UI"],
  fileSize: "0.8 KB",
  price: "Free"
};

export default DividerComponentData;
