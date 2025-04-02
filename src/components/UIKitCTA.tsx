
import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, FileText } from "lucide-react";

const UIKitCTA = () => {
  return (
    <section className="py-20 px-6 md:px-12 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Get started with ModernKit UI today and transform your development workflow.
            Join thousands of developers building better interfaces, faster.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-background text-foreground hover:bg-background/90 transition-colors">
            Get Started
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          
          <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 transition-colors">
            <Github className="mr-2 h-4 w-4" />
            Star on GitHub
          </Button>
          
          <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 transition-colors">
            <FileText className="mr-2 h-4 w-4" />
            Read Documentation
          </Button>
        </div>
        
        <div className="mt-12 text-center">
          <div className="text-sm opacity-80">
            Available for React, Vue, Angular, and Svelte
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {["React", "Vue", "Angular", "Svelte"].map(tech => (
              <div key={tech} className="text-sm font-medium px-3 py-1 rounded-full bg-primary-foreground/10">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UIKitCTA;
