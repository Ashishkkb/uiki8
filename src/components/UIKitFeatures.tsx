
import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  PenTool,
  Layers,
  Zap,
  Settings,
  Monitor,
  Smartphone,
  Terminal,
  FileText,
} from "lucide-react";

const features = [
  {
    icon: <Layers className="h-6 w-6" />,
    title: "50+ Components",
    description:
      "Comprehensive collection of UI components with consistent design language.",
  },
  {
    icon: <PenTool className="h-6 w-6" />,
    title: "Figma Design Kit",
    description:
      "Pixel-perfect design files with components, styles, and templates.",
    badge: "Pro",
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "Framework Agnostic",
    description: "Works with React, Vue, Angular, and other modern frameworks.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Performance Optimized",
    description: "Lightweight implementation with minimal dependencies.",
  },
  {
    icon: <Terminal className="h-6 w-6" />,
    title: "TypeScript Support",
    description: "Fully typed components with excellent autocompletion support.",
  },
  {
    icon: <Settings className="h-6 w-6" />,
    title: "Customizable",
    description: "Easily theme and adapt components to match your brand.",
  },
  {
    icon: <Monitor className="h-6 w-6" />,
    title: "Dark Mode",
    description: "Built-in dark mode support with seamless transitions.",
    badge: "Pro",
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Responsive Design",
    description: "Mobile-first components that work on all screen sizes.",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Documentation",
    description: "Comprehensive guides, examples, and API references.",
  },
];

const UIKitFeatures = () => {
  return (
    <section className="py-16 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#333]">
            Everything You Need to Build Better UIs
          </h2>
          <p className="text-xl text-[#666] max-w-3xl mx-auto">
            Our UI kit provides all the tools and components needed to create
            beautiful, responsive web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="mb-4 p-2 rounded-full bg-[#F1F0FB] inline-block text-[#6A9D80]">
                {feature.icon}
              </div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xl font-semibold text-[#333]">
                  {feature.title}
                </h3>
                {feature.badge && (
                  <Badge variant="secondary" className="bg-[#FDE1D3] text-[#333]">
                    {feature.badge}
                  </Badge>
                )}
              </div>
              <p className="text-[#555]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UIKitFeatures;
