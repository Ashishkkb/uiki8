
import React from "react";
import { Separator } from "@/components/ui/separator";

const sponsors = [
  { name: "Acme Inc.", logo: "https://via.placeholder.com/150x50?text=ACME" },
  { name: "Globex", logo: "https://via.placeholder.com/150x50?text=Globex" },
  { name: "Initech", logo: "https://via.placeholder.com/150x50?text=Initech" },
  { name: "Hooli", logo: "https://via.placeholder.com/150x50?text=Hooli" },
  { name: "Massive Dynamic", logo: "https://via.placeholder.com/150x50?text=MassiveDynamic" },
];

const UIKitSponsors = () => {
  return (
    <section className="py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#333]">
            Trusted By Developers Worldwide
          </h2>
          <p className="text-lg text-[#666] max-w-2xl mx-auto">
            Join the growing community of developers and companies using our UI kit to build modern web applications.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 my-8">
          {sponsors.map((sponsor, index) => (
            <div key={index} className="grayscale hover:grayscale-0 transition-all duration-300">
              <img 
                src={sponsor.logo} 
                alt={sponsor.name} 
                className="h-12 object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        
        <Separator className="my-12" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-[#6A9D80]">10,000+</div>
            <div className="text-[#666] mt-2">Downloads</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#6A9D80]">1,000+</div>
            <div className="text-[#666] mt-2">GitHub Stars</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#6A9D80]">50+</div>
            <div className="text-[#666] mt-2">Contributors</div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center mt-12 bg-[#F1F0FB] p-6 rounded-lg">
          <div className="text-center md:text-left">
            <h3 className="font-medium text-lg">Want to become a sponsor?</h3>
            <p className="text-sm text-[#666]">Support this project and get your logo displayed above.</p>
          </div>
          <a 
            href="https://github.com/sponsors" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#333] text-white px-4 py-2 rounded-md text-sm hover:bg-[#555] transition-colors"
          >
            Become a Sponsor
          </a>
        </div>
      </div>
    </section>
  );
};

export default UIKitSponsors;
