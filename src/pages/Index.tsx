
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Github, Package, ExternalLink, ArrowRight } from "lucide-react";
import FeatureSection from "@/components/FeatureSection";
import ComponentsShowcase from "@/components/ComponentsShowcase";
import PricingSection from "@/components/PricingSection";
import UIKitSponsors from "@/components/UIKitSponsors";
import NewsletterSignup from "@/components/NewsletterSignup";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-[#8250df]">
              Beautiful UI Components for Modern Web Apps
            </h1>
            
            <p className="text-lg text-github-gray-700 md:pr-12">
              A professionally crafted, open-source UI kit with 50+ components for React, Vue, and Angular. 
              Build stunning interfaces that delight users.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-github-blue text-white px-8 py-6 hover:bg-github-blue/90 transition-colors">
                Get Started
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
              
              <Button variant="outline" className="border-github-gray-200 hover:bg-github-gray-50 px-8 py-6 gap-2">
                <Github className="h-5 w-5" />
                Star on GitHub
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 relative mt-12 md:mt-0">
            <div className="absolute -inset-1 bg-[#8250df]/10 rounded-xl blur-xl opacity-60"></div>
            <div className="relative bg-white shadow-lg rounded-xl border border-github-gray-200 p-6">
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-github-gray-50/80 rounded-lg p-4 h-24 flex items-center justify-center">
                    <div className={`w-12 h-12 rounded-md bg-gradient-to-br from-[#f6f8fa] to-[#d0d7de]`}></div>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-github-gray-50/80 h-16 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <FeatureSection />
      
      {/* Components Showcase */}
      <div id="components">
        <ComponentsShowcase />
      </div>
      
      {/* Sponsors Section */}
      <UIKitSponsors />
      
      {/* Pricing Section */}
      <div id="pricing">
        <PricingSection />
      </div>
      
      {/* Newsletter Signup */}
      <NewsletterSignup />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
