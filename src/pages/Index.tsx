
import { Button } from "@/components/ui/button";
import { Github, Package, ArrowRight } from "lucide-react";
import UIKitHero from "@/components/UIKitHero";
import UIKitFeatures from "@/components/UIKitFeatures";
import UIKitSponsors from "@/components/UIKitSponsors";
import UIKitCTA from "@/components/UIKitCTA";
import NewsletterSignup from "@/components/NewsletterSignup";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <UIKitHero />
      
      {/* Features Section */}
      <UIKitFeatures />
      
      {/* Sponsors Section */}
      <UIKitSponsors />
      
      {/* CTA Section */}
      <UIKitCTA />
      
      {/* Newsletter Signup */}
      <NewsletterSignup />
      
      {/* Footer */}
      <footer className="border-t border-border/20 py-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">UI</span>
              </div>
              <span className="font-bold text-lg">ModernKit</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              A beautiful UI component library for building modern web applications.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Documentation</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Components</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Examples</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Community</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">GitHub</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Discord</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Twitter</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">License</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-border/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ModernKit. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Github className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
