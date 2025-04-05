
import { ComponentItem } from "@/types/component";
import AspectRatioComponent from "./AspectRatioComponent";

const AspectRatioComponentItem: ComponentItem = {
  id: 55,
  name: "Aspect Ratio",
  category: "UI",
  framework: "React",
  description: "A component for maintaining a consistent aspect ratio for its content, useful for images and videos.",
  component: AspectRatioComponent,
  price: "Free",
  language: "TypeScript",
  previewBg: "light",
  tags: ["UI", "layout", "image", "video", "responsive"],
  isNew: true,
  fileSize: "1.2kb",
  complexity: "simple",
  lastUpdated: "2025-04-05",
  author: "Lovable UI",
  code: `import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

interface CustomAspectRatioProps {
  ratio?: number;
  className?: string;
  children: React.ReactNode;
}

const CustomAspectRatio: React.FC<CustomAspectRatioProps> = ({
  ratio = 16 / 9,
  className,
  children,
}) => {
  return (
    <div className={cn("overflow-hidden rounded-lg", className)}>
      <AspectRatio ratio={ratio}>
        {children}
      </AspectRatio>
    </div>
  );
};

export default CustomAspectRatio;`,
};

export default AspectRatioComponentItem;
