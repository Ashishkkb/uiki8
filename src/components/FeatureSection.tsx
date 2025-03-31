
import { CheckCircle2, Layers, Code, Sparkles, Palette, Zap } from "lucide-react";

const features = [
  {
    icon: <Layers className="h-6 w-6 text-purple-600" />,
    title: "Multiple Frameworks",
    description: "Components for React, Vue, Angular, and more popular frameworks."
  },
  {
    icon: <Code className="h-6 w-6 text-purple-600" />,
    title: "Copy & Paste Ready",
    description: "Simply copy the code and paste into your project. No complex setup."
  },
  {
    icon: <Sparkles className="h-6 w-6 text-purple-600" />,
    title: "Fully Customizable",
    description: "Easily modify colors, sizes, and behaviors to match your brand."
  },
  {
    icon: <Palette className="h-6 w-6 text-purple-600" />,
    title: "Modern Design",
    description: "Beautiful, contemporary design that follows the latest trends."
  },
  {
    icon: <Zap className="h-6 w-6 text-purple-600" />,
    title: "Performance Optimized",
    description: "Lightweight components that won't slow down your application."
  },
  {
    icon: <CheckCircle2 className="h-6 w-6 text-purple-600" />,
    title: "Accessibility Built-in",
    description: "Follows WCAG guidelines to ensure your app is accessible to everyone."
  }
];

const FeatureSection = () => {
  return (
    <section id="features" className="py-20 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to Build<br />Modern Interfaces
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive collection provides all the tools you need to create 
            beautiful, functional user interfaces.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-md transition-shadow group"
            >
              <div className="mb-5 inline-block p-3 rounded-lg bg-purple-100 group-hover:bg-purple-200 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
