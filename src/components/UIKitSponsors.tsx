
import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, Coffee } from "lucide-react";

const UIKitSponsors = () => {
  return (
    <section className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Support the Project
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enchant UI is an open-source project backed by a community of contributors and sponsors.
            Your support helps us continue building and improving the library.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-pink-50 to-red-50 p-8 rounded-xl border border-pink-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-pink-100">
                <Heart className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-2xl font-bold">GitHub Sponsors</h3>
            </div>
            
            <p className="text-gray-700 mb-6">
              Become a sponsor on GitHub to support our work and get your logo featured on our documentation.
              GitHub Sponsors matches contributions for the first year.
            </p>
            
            <Button className="bg-[#EA4AAA] text-white hover:bg-[#EA4AAA]/90 transition-colors">
              <Heart className="mr-2 h-4 w-4" />
              Sponsor on GitHub
            </Button>
            
            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-3">Current Sponsors:</p>
              <div className="flex flex-wrap gap-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-10 w-10 rounded-full bg-gray-100"></div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-blue-100">
                <Coffee className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold">Open Collective</h3>
            </div>
            
            <p className="text-gray-700 mb-6">
              Support us through Open Collective where funds are transparently managed.
              All expenses are public and go directly toward development and maintenance.
            </p>
            
            <Button className="bg-[#3385FF] text-white hover:bg-[#3385FF]/90 transition-colors">
              <Coffee className="mr-2 h-4 w-4" />
              Contribute on Open Collective
            </Button>
            
            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-3">Monthly Budget:</p>
              <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>$1,850 raised</span>
                <span>$2,500 goal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UIKitSponsors;
