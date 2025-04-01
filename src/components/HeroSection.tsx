
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-[#FDE1D3] text-[#555] font-medium text-sm mb-4">
            Introducing UIKits Galaxy
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#555]">
            Enchanted UI Components for Magical Apps
          </h1>
          
          <p className="text-lg text-[#666] md:pr-12">
            A premium collection of UI kits and component libraries inspired by the whimsical world of animation.
            Build captivating interfaces that tell a story.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button className="bg-gradient-to-r from-[#6A9D80] to-[#87B5A2] text-white px-8 py-6 hover:opacity-90 transition-opacity">
              Browse Components
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="border-[#D3E4FD] hover:bg-[#D3E4FD]/20 px-8 py-6">
              View Pricing
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
        
        <div className="md:w-1/2 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#6A9D80] to-[#87B5A2] rounded-xl blur-lg opacity-30"></div>
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
  );
};

export default HeroSection;
