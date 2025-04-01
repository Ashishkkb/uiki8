
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
            <div className="inline-block px-3 py-1 rounded-full bg-[#FDE1D3] text-[#555] font-medium text-sm mb-4">
              Introducing UIKits Galaxy
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Beautiful UI Components for Modern Web Apps
            </h1>
            
            <p className="text-lg text-[#666] md:pr-12">
              A professionally crafted, open-source UI kit with 50+ components for React, Vue, and Angular. 
              Build stunning interfaces that delight users.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-6 hover:opacity-90 transition-opacity">
                Get Started
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
              
              <Button variant="outline" className="border-[#D3E4FD] hover:bg-[#D3E4FD]/20 px-8 py-6 gap-2">
                <Github className="h-5 w-5" />
                Star on GitHub
              </Button>
              
              <Button variant="outline" className="border-[#D3E4FD] hover:bg-[#D3E4FD]/20 px-8 py-6 gap-2">
                <Package className="h-5 w-5" />
                npm install uikits-galaxy
              </Button>
            </div>
            
            <div className="flex items-center gap-2 pt-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full bg-[#D3E4FD] border-2 border-white"></div>
                ))}
              </div>
              <p className="text-sm text-[#8A898C]">Join 5,000+ developers and designers</p>
            </div>
          </div>
          
          <div className="md:w-1/2 relative mt-12 md:mt-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl blur-lg opacity-30"></div>
            <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-[#D3E4FD] shadow-lg">
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-[#f3f3f3]/80 rounded-lg p-4 h-24 flex items-center justify-center">
                    <div className={`w-12 h-12 rounded-md bg-gradient-to-br from-[#FDE1D3] to-[#D3E4FD]`}></div>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-[#f3f3f3]/80 h-16 rounded-lg"></div>
              <div className="mt-4 flex gap-2">
                <div className="h-10 w-10 rounded-md bg-[#FDE1D3]"></div>
                <div className="flex-1 h-10 bg-[#f3f3f3]/80 rounded-md"></div>
              </div>
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
