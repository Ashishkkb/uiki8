
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out components and small projects.",
    features: [
      "50+ Basic Components",
      "React & Vue Support",
      "Community Support",
      "Basic Documentation",
      "1 Project"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Pro",
    price: "$49",
    period: "one-time",
    description: "For professional developers working on multiple projects.",
    features: [
      "200+ Premium Components",
      "All Framework Support",
      "Priority Email Support",
      "Advanced Documentation",
      "Unlimited Projects",
      "Source Files Access"
    ],
    cta: "Upgrade to Pro",
    popular: true
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "per month",
    description: "For teams building commercial applications at scale.",
    features: [
      "Everything in Pro",
      "500+ Enterprise Components",
      "Custom Component Development",
      "Dedicated Support",
      "White-labeling Option",
      "Team Collaboration"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that's right for you and start building amazing UIs today.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl overflow-hidden border ${
                plan.popular 
                  ? "border-purple-500 shadow-lg shadow-purple-100" 
                  : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="bg-purple-500 text-white text-center text-sm font-medium py-1">
                  Most Popular
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white" 
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {plan.cta}
                </Button>
                
                <div className="mt-8">
                  <h4 className="font-medium mb-4 text-sm uppercase text-gray-500">What's included</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center bg-white rounded-xl border border-gray-200 p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Need a Custom Solution?</h3>
          <p className="text-gray-600 mb-6">
            We offer custom development services for teams with specific needs.
            Contact us to discuss your requirements.
          </p>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
