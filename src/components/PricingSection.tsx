
import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Open Source",
    price: "$0",
    description: "Get started with our open-source components",
    buttonText: "Get Started",
    buttonVariant: "outline" as const,
    features: [
      "Core components library",
      "Base themes",
      "Documentation",
      "Community support",
      "MIT license"
    ],
    popular: false
  },
  {
    name: "Pro",
    price: "$49",
    description: "Everything you need for professional projects",
    buttonText: "Buy Pro License",
    buttonVariant: "default" as const,
    features: [
      "All core components",
      "Advanced components",
      "Premium themes",
      "Figma design files",
      "1 year of updates",
      "Priority support"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "Contact Us",
    description: "Custom solutions for large organizations",
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
    features: [
      "All Pro features",
      "Custom branding",
      "Dedicated support",
      "SLA agreement",
      "Team training",
      "Extended license"
    ],
    popular: false
  }
];

const PricingSection = () => {
  return (
    <section className="py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#333]">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-[#666] max-w-3xl mx-auto">
            Choose the plan that's right for your project. All plans include access to our core components.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-lg overflow-hidden ${
                plan.popular 
                  ? "border-2 border-[#6A9D80] shadow-lg relative" 
                  : "border border-gray-200 shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="bg-[#6A9D80] text-white py-1 px-4 text-xs font-medium text-center">
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="mt-4 mb-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.price !== "Contact Us" && (
                    <span className="text-gray-500 ml-2">one-time payment</span>
                  )}
                </div>
                <p className="text-[#666] mb-6">{plan.description}</p>
                
                <Button 
                  variant={plan.buttonVariant} 
                  className={`w-full ${
                    plan.buttonVariant === "default" 
                      ? "bg-[#6A9D80] hover:bg-[#5D8B72]" 
                      : ""
                  }`}
                >
                  {plan.buttonText}
                </Button>
                
                <div className="mt-8 space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-[#6A9D80] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold mb-4">Need something special?</h3>
          <p className="text-[#666] max-w-2xl mx-auto mb-6">
            We offer custom development services for specific requirements.
            Contact our team for a personalized solution.
          </p>
          <Button variant="outline" className="border-[#6A9D80] text-[#6A9D80]">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
