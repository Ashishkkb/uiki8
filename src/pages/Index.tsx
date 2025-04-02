
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, ChevronRight, Code, Sparkles, Moon, Sun, Layers, Zap, LineChart } from "lucide-react";
import { AnimatedGradientBackground } from "@/components/ui/animated-gradient-background";
import { Spotlight } from "@/components/ui/spotlight";
import { MovingCards } from "@/components/ui/moving-cards";
import { HeroCard } from "@/components/ui/hero-card";
import { CodeBlock, LineHighlight } from "@/components/ui/code-highlight";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";

const componentPreviews = [
  <div className="flex flex-col gap-3 rounded-xl border border-border/40 bg-card p-6 shadow-sm">
    <div className="flex items-center gap-2">
      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
        <Layers className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold">Components</h3>
        <p className="text-xs text-muted-foreground">Build interfaces faster</p>
      </div>
    </div>
    <p className="text-sm text-muted-foreground">
      Over 40+ beautifully designed, accessible components that you can use in your projects.
    </p>
  </div>,
  <div className="flex flex-col gap-3 rounded-xl border border-border/40 bg-card p-6 shadow-sm">
    <div className="flex items-center gap-2">
      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
        <Sparkles className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold">Animations</h3>
        <p className="text-xs text-muted-foreground">Bring interfaces to life</p>
      </div>
    </div>
    <p className="text-sm text-muted-foreground">
      Beautiful animations and transitions for your websites and applications.
    </p>
  </div>,
  <div className="flex flex-col gap-3 rounded-xl border border-border/40 bg-card p-6 shadow-sm">
    <div className="flex items-center gap-2">
      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
        <LineChart className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold">Data Visualization</h3>
        <p className="text-xs text-muted-foreground">Charts, graphs, and more</p>
      </div>
    </div>
    <p className="text-sm text-muted-foreground">
      Beautiful charts and graphs for visualizing data in your applications.
    </p>
  </div>,
  <div className="flex flex-col gap-3 rounded-xl border border-border/40 bg-card p-6 shadow-sm">
    <div className="flex items-center gap-2">
      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
        <Zap className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold">Performance</h3>
        <p className="text-xs text-muted-foreground">Optimized for speed</p>
      </div>
    </div>
    <p className="text-sm text-muted-foreground">
      Fast and optimized components that won't slow down your application.
    </p>
  </div>,
  <div className="flex flex-col gap-3 rounded-xl border border-border/40 bg-card p-6 shadow-sm">
    <div className="flex items-center gap-2">
      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
        <Sun className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold">Light Mode</h3>
        <p className="text-xs text-muted-foreground">For bright environments</p>
      </div>
    </div>
    <p className="text-sm text-muted-foreground">
      Beautiful light theme designed for optimal readability in bright environments.
    </p>
  </div>,
  <div className="flex flex-col gap-3 rounded-xl border border-border/40 bg-card p-6 shadow-sm">
    <div className="flex items-center gap-2">
      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
        <Moon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold">Dark Mode</h3>
        <p className="text-xs text-muted-foreground">For dark environments</p>
      </div>
    </div>
    <p className="text-sm text-muted-foreground">
      Beautiful dark theme designed for optimal readability in dark environments.
    </p>
  </div>,
];

const features = [
  {
    title: "40+ Components",
    description: "Beautifully designed components built with Tailwind CSS and Radix UI.",
    icon: <Layers className="h-6 w-6" />,
  },
  {
    title: "Animation Library",
    description: "A collection of beautiful animations to enhance your user interfaces.",
    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    title: "Theme Switcher",
    description: "Switch between light and dark mode with a single click.",
    icon: <Moon className="h-6 w-6" />,
  },
  {
    title: "Easy Customization",
    description: "Easily customize components to match your brand.",
    icon: <Code className="h-6 w-6" />,
  },
];

const Index = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <AnimatedGradientBackground containerClassName="min-h-screen">
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
            <Spotlight
              className="-top-40 left-0 md:left-60 md:-top-20"
              fill="rgba(120, 119, 198, 0.2)"
            />
            <div className="container px-4 md:px-6 mx-auto">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                  Modern UI Kit for React
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
                  Modern UI Kit for <br className="hidden sm:inline" /> React Applications
                </h1>
                <p className="max-w-[42rem] text-muted-foreground text-lg sm:text-xl mt-4">
                  A professionally designed component library with 40+ components to build beautiful interfaces with speed and precision.
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                  <Button size="lg" asChild>
                    <Link to="/components">Browse Components</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="border-border/40"
                  ><a
                      href="https://github.com"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github className="h-4 w-4" />
                      <span>GitHub</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Component Cards Section */}
          <section className="py-12 md:py-20">
            <div className="container px-4 md:px-6">
              <div className="mx-auto text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Beautiful Components
                </h2>
                <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
                  A collection of 40+ beautifully designed, accessible components
                  that you can use in your projects.
                </p>
              </div>
              <MovingCards items={componentPreviews} speed="normal" />
            </div>
          </section>

          {/* Feature Section */}
          <section className="py-16 md:py-24">
            <div className="container px-4 md:px-6">
              <div className="mx-auto text-center max-w-[800px] mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Features & Capabilities
                </h2>
                <p className="text-muted-foreground text-lg">
                  Everything you need to build modern interfaces with speed
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-3 bg-card border border-border/40 rounded-xl p-6 shadow-sm"
                  >
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Code Example Section */}
          <section className="py-16 md:py-24 bg-muted/50">
            <div className="container px-4 md:px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                    Simple to Use
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Our components are designed to be intuitive and easy to use. Just import
                    the component and start building your interface.
                  </p>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-2 items-center">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <ChevronRight className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-lg">Import what you need</div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <ChevronRight className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-lg">Customize to fit your brand</div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <ChevronRight className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-lg">Build beautiful interfaces</div>
                    </div>
                  </div>
                  <Button asChild className="mt-8">
                    <Link to="/components">See All Components</Link>
                  </Button>
                </div>
                <div>
                  <HeroCard className="shadow-xl">
                    <CodeBlock>
                      <div className="text-sm">
                        <div className="mb-4 text-muted-foreground/70">
                          <span className="mr-2">1</span>
                          <span className="text-foreground">import</span> {"{ Button }"}{" "}
                          <span className="text-foreground">from</span>{" "}
                          <span className="text-green-500">"@/components/ui/button"</span>
                        </div>
                        <div className="mb-4 text-muted-foreground/70">
                          <span className="mr-2">2</span>
                        </div>
                        <div className="mb-4 text-muted-foreground/70">
                          <span className="mr-2">3</span>
                          <span className="text-foreground">export</span>{" "}
                          <span className="text-foreground">default</span>{" "}
                          <span className="text-foreground">function</span>{" "}
                          <span className="text-blue-500">Home</span>() {"{"}
                        </div>
                        <div className="mb-4 text-muted-foreground/70">
                          <span className="mr-2">4</span>
                          {"  "}
                          <span className="text-foreground">return</span> (
                        </div>
                        <div className="mb-4 text-muted-foreground/70">
                          <span className="mr-2">5</span>
                          {"    "}&lt;<span className="text-blue-500">div</span>&gt;
                        </div>
                        <LineHighlight>
                          <div className="mb-4">
                            <span className="mr-2 text-muted-foreground/70">6</span>
                            {"      "}&lt;<span className="text-blue-500">Button</span>{" "}
                            <span className="text-yellow-500">variant</span>="
                            <span className="text-green-500">default</span>"&gt;
                            Click me&lt;/<span className="text-blue-500">Button</span>&gt;
                          </div>
                        </LineHighlight>
                        <div className="mb-4 text-muted-foreground/70">
                          <span className="mr-2">7</span>
                          {"    "}&lt;/<span className="text-blue-500">div</span>&gt;
                        </div>
                        <div className="mb-4 text-muted-foreground/70">
                          <span className="mr-2">8</span>
                          {"  "})
                        </div>
                        <div className="text-muted-foreground/70">
                          <span className="mr-2">9</span>
                          {"}"}
                        </div>
                      </div>
                    </CodeBlock>
                  </HeroCard>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 md:py-24">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-[800px] text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Ready to Build Something Amazing?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 md:mb-12">
                  Start building with our components today and create beautiful, accessible user interfaces.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" asChild>
                    <Link to="/components">Browse Components</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/documentation">Read Documentation</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
          
          {/* Footer */}
          <Footer />
        </div>
      </AnimatedGradientBackground>
    </div>
  );
};

export default Index;
