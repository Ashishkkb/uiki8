
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

const Components = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const allComponents = getAllComponents();
  const categories = Array.from(
    new Set(allComponents.map((component) => component.category))
  ).sort();

  return (
    <div className="min-h-screen bg-background">
      <AnimatedGradientBackground>
        <div className="container px-4 md:px-6 py-16">
          <div className="relative">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" />
            <div className="relative z-10">
              {/* Header Section */}
              <div className="flex flex-col items-center text-center mb-16">
                <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                  40+ Components
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

              {/* Component Grid with Aceternity UI inspired design */}
              <div className="space-y-12">
                {/* Rendering components by category */}
                {categories.map((category) => (
                  <div key={category} className="space-y-6">
                    <h2 className="text-2xl font-bold tracking-tight">{category}</h2>
                    <ComponentsShowcase initialCategory={category} searchQuery={searchQuery} />
                  </div>
                ))}
              </div>

              {/* Code Usage Example */}
              <div className="mt-24 rounded-xl border border-border/50 bg-muted/50 p-6 md:p-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                  <div>
                    <h3 className="text-2xl font-bold">Installation</h3>
                    <p className="text-muted-foreground mt-1">
                      How to install and use the components
                    </p>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Github className="h-4 w-4" />
                    <span>View on GitHub</span>
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Install dependencies</h4>
                    <div className="relative">
                      <CodeBlock>
                        <div className="text-sm font-mono">
                          npm install @modernui/components
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

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Import and use</h4>
                    <div className="relative">
                      <CodeBlock>
                        <div className="text-sm font-mono">
                          <div>import {"{ Button }"} from '@modernui/components';</div>
                          <div className="mt-2">
                            export default function App() {"{"}
                          </div>
                          <div className="ml-4">return &lt;Button&gt;Click me&lt;/Button&gt;;</div>
                          <div>{"}"}</div>
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
            </div>
          </div>
        </div>
      </AnimatedGradientBackground>
    </div>
  );
};

export default Components;
