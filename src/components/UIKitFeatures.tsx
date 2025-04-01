
import React from "react";
import { 
  CheckCircle2, 
  Layers, 
  Code, 
  Sparkles, 
  Palette, 
  Zap, 
  Box, 
  Figma, 
  Smartphone
} from "lucide-react";

const features = [
  {
    icon: <Layers className="h-6 w-6 text-purple-600" />,
    title: "Multiple Frameworks",
    description: "React, Vue, Angular, and Svelte support with identical APIs."
  },
  {
    icon: <Code className="h-6 w-6 text-purple-600" />,
    title: "TypeScript Ready",
    description: "Full type definitions for all components and hooks."
  },
  {
    icon: <Sparkles className="h-6 w-6 text-purple-600" />,
    title: "Fully Customizable",
    description: "Easily modify themes, colors, and behaviors to match your brand."
  },
  {
    icon: <Palette className="h-6 w-6 text-purple-600" />,
    title: "Dark Mode Support",
    description: "Built-in dark mode with automatic system preference detection."
  },
  {
    icon: <Zap className="h-6 w-6 text-purple-600" />,
    title: "Performance Optimized",
    description: "Lightweight components with minimal bundle size impact."
  },
  {
    icon: <CheckCircle2 className="h-6 w-6 text-purple-600" />,
    title: "Accessibility Built-in",
    description: "WCAG 2.1 AA compliant components for inclusive applications."
  },
  {
    icon: <Box className="h-6 w-6 text-purple-600" />,
    title: "CSS-in-JS",
    description: "Modern styling solutions with zero runtime overhead."
  },
  {
    icon: <Figma className="h-6 w-6 text-purple-600" />,
    title: "Design Assets",
    description: "Figma component library that mirrors the code components."
  },
  {
    icon: <Smartphone className="h-6 w-6 text-purple-600" />,
    title: "Responsive Design",
    description: "Mobile-first approach ensures great UX on all devices."
  }
];

const UIKitFeatures = () => {
  return (
    <section id="features" className="py-20 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to Build<br />Modern User Interfaces
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive collection provides all the essential components and utilities 
            for creating beautiful, functional UIs.
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

export default UIKitFeatures;
