
import React from "react";
import { Separator } from "@/components/ui/separator";

const sponsors = [
  { name: "Acme Inc." },
  { name: "Globex" },
  { name: "Initech" },
  { name: "Hooli" },
  { name: "Massive Dynamic" },
];

const UIKitSponsors = () => {
  return (
    <section className="py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Trusted By Developers Worldwide
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join the growing community of developers and companies using our UI kit to build modern web applications.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 my-8">
          {sponsors.map((sponsor, index) => (
            <div key={index} className="grayscale hover:grayscale-0 transition-all duration-300">
              <div className="h-12 px-8 flex items-center justify-center bg-muted/50 rounded-md">
                <span className="text-lg font-semibold text-muted-foreground">{sponsor.name}</span>
              </div>
            </div>
          ))}
        </div>
        
        <Separator className="my-12" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary">10,000+</div>
            <div className="text-muted-foreground mt-2">Downloads</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">1,000+</div>
            <div className="text-muted-foreground mt-2">GitHub Stars</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">50+</div>
            <div className="text-muted-foreground mt-2">Contributors</div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center mt-12 bg-card p-6 rounded-lg border">
          <div className="text-center md:text-left">
            <h3 className="font-medium text-lg">Want to become a sponsor?</h3>
            <p className="text-sm text-muted-foreground">Support this project and get your logo displayed above.</p>
          </div>
          <a 
            href="https://github.com/sponsors" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:bg-primary/90 transition-colors"
          >
            Become a Sponsor
          </a>
        </div>
      </div>
    </section>
  );
};

export default UIKitSponsors;
