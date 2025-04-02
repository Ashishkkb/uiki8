
import React from "react";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import ComponentsShowcase from "@/components/ComponentsShowcase";

const Components = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C]/95 to-[#2D3748]/95 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#9b87f5] sm:text-4xl">
            MERN Component Library
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
            Modern, elegant React components for your next web application
          </p>
        </div>
        
        <Separator className="my-8 bg-[#9b87f5]/20" />
        
        <ComponentsShowcase />
      </div>
    </div>
  );
};

export default Components;
