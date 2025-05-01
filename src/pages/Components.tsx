import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import ComponentsShowcase from "@/components/ComponentsShowcase";
import { AnimatedGradientBackground } from "@/components/ui/animated-gradient-background";
import { Spotlight } from "@/components/ui/spotlight";
import { getAllComponents } from "@/data/components/registry";
import { CodeBlock } from "@/components/ui/code-highlight";
import { Command, Github, Copy, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarProvider } from "@/components/ui/sidebar";
import ComponentSidebar from "@/components/ComponentSidebar";

const Components = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const allComponents = getAllComponents();
  const categories = Array.from(
    new Set(allComponents.map((component) => component.category))
  ).sort();

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <ComponentSidebar
            onCategorySelect={setSelectedCategory}
            selectedCategory={selectedCategory}
            filterBySearch={setSearchQuery}
          />
          
          <main className="flex-1">
            <AnimatedGradientBackground>
              <div className="container px-4 md:px-6 py-16">
                <div className="relative">
                  <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" />
                  <div className="relative z-10">
                    {/* Header Section */}
                    <div className="flex flex-col items-center text-center mb-16">
                      <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                        {allComponents.length}+ Components
                      </div>
                      <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                        Beautiful UI Components
                      </h1>
                      <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                        A collection of beautifully designed, accessible components for modern web applications
                      </p>

                      {/* Search bar */}
                      <div className="mt-10 w-full max-w-md mx-auto relative">
                        <div className="relative">
                          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            className="pl-10 pr-10"
                            placeholder="Search components..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                          <div className="absolute right-3 top-3 flex gap-1 items-center text-xs text-muted-foreground">
                            <Command className="h-3 w-3" />
                            <span>K</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-8" />

                    {/* Installation Section */}
                    {searchQuery.toLowerCase().includes("install") && (
                      <div className="mb-12 rounded-xl border border-border/50 bg-muted/50 p-6 md:p-10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                          <div>
                            <h3 className="text-2xl font-bold">Installation</h3>
                            <p className="text-muted-foreground mt-1">
                              How to install and dependencies for your project
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-lg font-semibold">Install dependencies</h4>
                            <div className="relative">
                              <CodeBlock>
                                <div className="text-sm font-mono">
                                  npm install tailwindcss class-variance-authority clsx tailwind-merge lucide-react
                                </div>
                              </CodeBlock>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 h-8 w-8 opacity-70 hover:opacity-100"
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tailwind CSS Section */}
                    {searchQuery.toLowerCase().includes("tailwind") && (
                      <div className="mb-12 rounded-xl border border-border/50 bg-muted/50 p-6 md:p-10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                          <div>
                            <h3 className="text-2xl font-bold">Install Tailwind CSS</h3>
                            <p className="text-muted-foreground mt-1">
                              Configure Tailwind CSS for your project
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-lg font-semibold">Install Tailwind and its dependencies</h4>
                            <div className="relative">
                              <CodeBlock>
                                <div className="text-sm font-mono">
                                  npm install -D tailwindcss postcss autoprefixer<br />
                                  npx tailwindcss init -p
                                </div>
                              </CodeBlock>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 h-8 w-8 opacity-70 hover:opacity-100"
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <h4 className="text-lg font-semibold mt-6">Configure your tailwind.config.js</h4>
                            <div className="relative">
                              <CodeBlock>
                                <div className="text-sm font-mono">
                                  {`module.exports = {\n  content: ["./src/**/*.{js,jsx,ts,tsx}"],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n}`}
                                </div>
                              </CodeBlock>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 h-8 w-8 opacity-70 hover:opacity-100"
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Utils Section */}
                    {searchQuery.toLowerCase().includes("util") && (
                      <div className="mb-12 rounded-xl border border-border/50 bg-muted/50 p-6 md:p-10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                          <div>
                            <h3 className="text-2xl font-bold">Add Utilities</h3>
                            <p className="text-muted-foreground mt-1">
                              Add utility functions to your project
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-lg font-semibold">The cn utility</h4>
                            <div className="relative">
                              <CodeBlock>
                                <div className="text-sm font-mono">
                                  {`// lib/utils.ts\nimport { type ClassValue, clsx } from "clsx"\nimport { twMerge } from "tailwind-merge"\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs))\n}`}
                                </div>
                              </CodeBlock>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 h-8 w-8 opacity-70 hover:opacity-100"
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <h4 className="text-lg font-semibold mt-6">Required packages</h4>
                            <div className="relative">
                              <CodeBlock>
                                <div className="text-sm font-mono">
                                  npm install clsx tailwind-merge
                                </div>
                              </CodeBlock>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 h-8 w-8 opacity-70 hover:opacity-100"
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Component Grid with Aceternity UI inspired design */}
                    <div className="space-y-12">
                      {/* Show specific category if selected */}
                      {selectedCategory ? (
                        <div key={selectedCategory} className="space-y-6">
                          <h2 className="text-2xl font-bold tracking-tight">{selectedCategory}</h2>
                          <ComponentsShowcase initialCategory={selectedCategory} searchQuery={searchQuery} />
                        </div>
                      ) : (
                        // Otherwise show all categories
                        categories.map((category) => (
                          <div key={category} className="space-y-6">
                            <h2 className="text-2xl font-bold tracking-tight">{category}</h2>
                            <ComponentsShowcase initialCategory={category} searchQuery={searchQuery} />
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedGradientBackground>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Components;
