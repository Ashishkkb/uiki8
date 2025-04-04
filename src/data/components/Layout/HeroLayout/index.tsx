
import React from 'react';
import { ComponentItem } from "@/types/component";
import { Button } from "@/components/ui/button";

const HeroLayout = () => {
  return (
    <div className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-purple-50 to-blue-100 dark:from-slate-900 dark:to-slate-800">
      <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.8))] dark:bg-grid-slate-800/20"></div>
      <div className="relative px-6 py-12 md:py-20 md:px-10 space-y-6 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          Build beautiful websites with ease
        </h1>
        <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
          A professional UI component library for building modern web applications
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="outline">Documentation</Button>
        </div>
      </div>
    </div>
  );
};

const HeroLayoutComponentData: ComponentItem = {
  id: 407,
  name: "Hero Layout",
  category: "Layout",
  framework: "React",
  description: "A versatile hero section with gradient background and call-to-action buttons",
  code: `import React from "react";
import { Button } from "@/components/ui/button";

interface HeroLayoutProps {
  title: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  backgroundVariant?: "gradient" | "image" | "solid";
  className?: string;
}

const HeroLayout: React.FC<HeroLayoutProps> = ({
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  backgroundVariant = "gradient",
  className = "",
}) => {
  const getBackgroundClasses = () => {
    switch (backgroundVariant) {
      case "gradient":
        return "bg-gradient-to-br from-purple-50 to-blue-100 dark:from-slate-900 dark:to-slate-800";
      case "image":
        return "bg-cover bg-center bg-no-repeat";
      case "solid":
        return "bg-background";
      default:
        return "bg-gradient-to-br from-purple-50 to-blue-100 dark:from-slate-900 dark:to-slate-800";
    }
  };

  return (
    <div className={\`relative overflow-hidden rounded-xl border \${getBackgroundClasses()} \${className}\`}>
      <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.8))] dark:bg-grid-slate-800/20"></div>
      <div className="relative px-6 py-12 md:py-20 md:px-10 space-y-6 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          {title}
        </h1>
        <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
          <Button size="lg" onClick={onPrimaryClick}>
            {primaryButtonText}
          </Button>
          {secondaryButtonText && (
            <Button size="lg" variant="outline" onClick={onSecondaryClick}>
              {secondaryButtonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroLayout;`,
  component: HeroLayout,
  tags: ["layout", "hero", "landing", "header"],
  fileSize: "1.7 KB",
  price: "Free",
  complexity: "medium",
  lastUpdated: "2023-12-12"
};

export default HeroLayoutComponentData;
