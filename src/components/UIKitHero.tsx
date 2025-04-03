
import React from "react";
import { Button } from "@/components/ui/button";
import { Github, Package, ExternalLink } from "lucide-react";
import { CodeBlock } from "@/components/ui/code-highlight";

const UIKitHero = () => {
  return (
    <section className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center">
        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
          Introducing uiki8
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground max-w-3xl">
          Beautiful UI Components for Modern Web Applications
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-2xl mt-6">
          A professionally crafted, open-source UI kit with 50+ components for React, Vue, and Angular. 
          Build stunning interfaces that delight users.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button className="gap-2 px-8 py-6" size="lg">
            Get Started
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
          
          <Button variant="outline" className="gap-2 px-8 py-6" size="lg">
            <Github className="h-5 w-5" />
            Star on GitHub
          </Button>
          
          <Button variant="secondary" className="gap-2 px-8 py-6" size="lg">
            <Package className="h-5 w-5" />
            npm install uiki8
          </Button>
        </div>
        
        <div className="flex items-center gap-2 mt-8">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 w-8 rounded-full bg-primary/20 border-2 border-background"></div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Join 5,000+ developers and designers</p>
        </div>
        
        <div className="mt-10 w-full max-w-xl">
          <CodeBlock language="jsx">
            {`import { Button, Scene } from 'uiki8';\n\nfunction App() {\n  return (\n    <div>\n      <h1>My Amazing App</h1>\n      <Scene height="300px" />\n      <Button>Get Started</Button>\n    </div>\n  );\n}`}
          </CodeBlock>
        </div>
      </div>
    </section>
  );
};

export default UIKitHero;
