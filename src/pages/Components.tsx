
import React from "react";
import { Separator } from "@/components/ui/separator";
import ComponentsShowcase from "@/components/ComponentsShowcase";
import { useTheme } from "@/hooks/useTheme";

const Components = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            Component Library
          </h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of beautifully crafted components for modern web applications
          </p>
        </div>
        
        <Separator className="my-8" />
        
        <ComponentsShowcase />
      </div>
    </div>
  );
};

export default Components;
