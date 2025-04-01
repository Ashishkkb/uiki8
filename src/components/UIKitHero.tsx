
import React from "react";
import { Button } from "@/components/ui/button";
import { Github, Package, ExternalLink } from "lucide-react";

const UIKitHero = () => {
  return (
    <section className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center">
        <div className="inline-block px-3 py-1 rounded-full bg-[#F6F8FA] text-github-gray-900 font-medium text-sm mb-4 border border-[#D0D7DE]">
          Introducing GitHub UI
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-github-gray-900 max-w-3xl">
          Beautiful UI Components for Modern Web Applications
        </h1>
        
        <p className="text-lg text-github-gray-600 max-w-2xl mt-6">
          A professionally crafted, open-source UI kit with 50+ components for React, Vue, and Angular. 
          Build stunning interfaces that delight users.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button className="bg-github-blue text-white px-8 py-6 hover:bg-github-blue/90 transition-colors">
            Get Started
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
          
          <Button variant="outline" className="border-github-gray-200 hover:bg-github-gray-50 px-8 py-6 gap-2">
            <Github className="h-5 w-5" />
            Star on GitHub
          </Button>
          
          <Button variant="outline" className="border-github-gray-200 hover:bg-github-gray-50 px-8 py-6 gap-2">
            <Package className="h-5 w-5" />
            npm install github-ui
          </Button>
        </div>
        
        <div className="flex items-center gap-2 mt-8">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 w-8 rounded-full bg-github-gray-100 border-2 border-white"></div>
            ))}
          </div>
          <p className="text-sm text-github-gray-500">Join 5,000+ developers and designers</p>
        </div>
      </div>
    </section>
  );
};

export default UIKitHero;
