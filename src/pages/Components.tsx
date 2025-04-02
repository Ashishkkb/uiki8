
import React from "react";
import { Separator } from "@/components/ui/separator";
import ComponentsShowcase from "@/components/ComponentsShowcase";
import { useTheme } from "@/hooks/useTheme";

const Components = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' 
      ? 'bg-gradient-to-b from-[#1A1F2C]/95 to-[#2D3748]/95' 
      : 'bg-gradient-to-b from-gray-50 to-white'} text-foreground`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary sm:text-4xl">
            MERN Component Library
          </h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            Modern, elegant React components for your next web application
          </p>
        </div>
        
        <Separator className="my-8 bg-primary/20" />
        
        <ComponentsShowcase />
      </div>
    </div>
  );
};

export default Components;
