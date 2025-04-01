
import React from "react";
import { Button } from "@/components/ui/button";
import { Github, Package, ExternalLink } from "lucide-react";

const UIKitHero = () => {
  return (
    <section className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center">
        <div className="inline-block px-3 py-1 rounded-full bg-[#FDE1D3] text-[#555] font-medium text-sm mb-4">
          Introducing Enchant UI
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#555] max-w-3xl">
          Beautiful UI Components for Modern Web Applications
        </h1>
        
        <p className="text-lg text-[#666] max-w-2xl mt-6">
          A professionally crafted, open-source UI kit with 50+ components for React, Vue, and Angular. 
          Build stunning interfaces that delight users.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button className="bg-gradient-to-r from-[#6A9D80] to-[#87B5A2] text-white px-8 py-6 hover:opacity-90 transition-opacity">
            Get Started
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
          
          <Button variant="outline" className="border-[#D3E4FD] hover:bg-[#D3E4FD]/20 px-8 py-6 gap-2">
            <Github className="h-5 w-5" />
            Star on GitHub
          </Button>
          
          <Button variant="outline" className="border-[#D3E4FD] hover:bg-[#D3E4FD]/20 px-8 py-6 gap-2">
            <Package className="h-5 w-5" />
            npm install enchant-ui
          </Button>
        </div>
        
        <div className="flex items-center gap-2 mt-8">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 w-8 rounded-full bg-[#D3E4FD] border-2 border-white"></div>
            ))}
          </div>
          <p className="text-sm text-[#8A898C]">Join 5,000+ developers and designers</p>
        </div>
      </div>
    </section>
  );
};

export default UIKitHero;
