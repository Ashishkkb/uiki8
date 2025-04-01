import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ChevronRight,
  Copy,
  FileCode,
  FileText,
  Github,
  Package,
} from "lucide-react";
import { toast } from "sonner";

const Documentation = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard", {
      description: "You can now paste the code in your project."
    });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-16">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar Navigation */}
          <aside className="md:w-64 shrink-0">
            <div className="space-y-6 sticky top-24">
              <div>
                <h3 className="font-medium mb-2 text-sm text-gray-500 uppercase tracking-wider">Getting Started</h3>
                <ul className="space-y-1">
                  <li>
                    <a href="#" className="block text-primary font-medium py-1 px-2 rounded-md bg-primary/5">
                      Installation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block text-gray-700 hover:text-primary py-1 px-2 rounded-md hover:bg-gray-50">
                      Usage
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block text-gray-700 hover:text-primary py-1 px-2 rounded-md hover:bg-gray-50">
                      Theming
                    </a>
                  </li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-2 text-sm text-gray-500 uppercase tracking-wider">Components</h3>
                <ul className="space-y-1">
                  <li>
                    <a href="#" className="block text-gray-700 hover:text-primary py-1 px-2 rounded-md hover:bg-gray-50">
                      Button
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block text-gray-700 hover:text-primary py-1 px-2 rounded-md hover:bg-gray-50">
                      Card
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block text-gray-700 hover:text-primary py-1 px-2 rounded-md hover:bg-gray-50">
                      Dialog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block text-gray-700 hover:text-primary py-1 px-2 rounded-md hover:bg-gray-50">
                      Form Components
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block text-gray-700 hover:text-primary py-1 px-2 rounded-md hover:bg-gray-50">
                      Navigation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center text-gray-500 py-1 px-2">
                      View all
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </a>
                  </li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-2 text-sm text-gray-500 uppercase tracking-wider">Resources</h3>
                <ul className="space-y-1">
                  <li>
                    <a href="#" className="block text-gray-700 hover:text-primary py-1 px-2 rounded-md hover:bg-gray-50 flex items-center">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub Repository
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block text-gray-700 hover:text-primary py-1 px-2 rounded-md hover:bg-gray-50 flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      API Reference
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block text-gray-700 hover:text-primary py-1 px-2 rounded-md hover:bg-gray-50 flex items-center">
                      <FileCode className="mr-2 h-4 w-4" />
                      Examples
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
          
          {/* Main Content */}
          <main className="flex-1">
            <div className="prose max-w-none">
              <h1>Enchant UI Documentation</h1>
              
              <p className="lead">
                Welcome to the Enchant UI documentation. This guide will help you get started with our UI component library and provide detailed information about each component.
              </p>
              
              <h2>Installation</h2>
              
              <p>
                Install Enchant UI using your favorite package manager:
              </p>
              
              <Tabs defaultValue="npm" className="w-full">
                <TabsList>
                  <TabsTrigger value="npm">npm</TabsTrigger>
                  <TabsTrigger value="yarn">yarn</TabsTrigger>
                  <TabsTrigger value="pnpm">pnpm</TabsTrigger>
                </TabsList>
                <TabsContent value="npm" className="mt-2">
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                      <code>npm install enchant-ui</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard("npm install enchant-ui")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="yarn" className="mt-2">
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                      <code>yarn add enchant-ui</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm" 
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard("yarn add enchant-ui")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="pnpm" className="mt-2">
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                      <code>pnpm add enchant-ui</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard("pnpm add enchant-ui")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
              
              <h2>Basic Usage</h2>
              
              <p>
                After installation, you can import components directly from the package:
              </p>
              
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                  <code>{`import { Button } from 'enchant-ui';

function App() {
  return (
    <Button>Click me</Button>
  );
}`}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(`import { Button } from 'enchant-ui';

function App() {
  return (
    <Button>Click me</Button>
  );
}`)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              
              <h2>Theming</h2>
              
              <p>
                Enchant UI supports theming out of the box. You can customize the colors, spacing, and other design tokens to match your brand.
              </p>
              
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                  <code>{`import { ThemeProvider } from 'enchant-ui';

const theme = {
  colors: {
    primary: '#6A9D80',
    secondary: '#FDE1D3',
    // Add more colors...
  },
  // Add more theme options...
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Your app components */}
    </ThemeProvider>
  );
}`}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(`import { ThemeProvider } from 'enchant-ui';

const theme = {
  colors: {
    primary: '#6A9D80',
    secondary: '#FDE1D3',
    // Add more colors...
  },
  // Add more theme options...
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Your app components */}
    </ThemeProvider>
  );
}`)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-md">
                <h3 className="text-lg font-medium text-blue-700">Pro Tip</h3>
                <p className="mt-2">
                  You can use our Figma theme editor to create and export your custom theme directly to code. Available in the Pro version.
                </p>
                <div className="mt-4">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Package className="mr-2 h-4 w-4" />
                    Upgrade to Pro
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Documentation;
