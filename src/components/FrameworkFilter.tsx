
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const frameworks = [
  { name: "All", count: 256 },
  { name: "React", count: 124 },
  { name: "Vue", count: 87 },
  { name: "Angular", count: 45 },
  { name: "Svelte", count: 32 },
  { name: "Tailwind", count: 98 },
  { name: "Bootstrap", count: 76 }
];

const categories = [
  "Buttons", "Cards", "Forms", "Navigation", "Tables", 
  "Modals", "Alerts", "Loaders", "Charts", "Layout"
];

const FrameworkFilter = () => {
  const [activeFramework, setActiveFramework] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col md:flex-row gap-6 mb-10">
      <div className="flex-1 md:max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {frameworks.map((framework) => (
            <Button
              key={framework.name}
              variant={activeFramework === framework.name ? "default" : "outline"}
              className={`
                whitespace-nowrap 
                ${activeFramework === framework.name 
                  ? "bg-purple-600 hover:bg-purple-700" 
                  : "text-gray-600 hover:text-gray-900 border-gray-200"}
              `}
              onClick={() => setActiveFramework(framework.name)}
            >
              {framework.name}
              <span className="ml-2 text-xs rounded-full bg-opacity-20 px-2 py-0.5">
                {framework.count}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrameworkFilter;
