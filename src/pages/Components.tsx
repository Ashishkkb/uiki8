
import React from "react";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import ComponentsShowcase from "@/components/ComponentsShowcase";

const Components = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            React Component Library
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Browse, customize and download high-quality React components
          </p>
        </div>
        
        <Separator className="my-8" />
        
        <ComponentsShowcase />
      </div>
    </div>
  );
};

export default Components;
