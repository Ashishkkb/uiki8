
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const UIKitShowcase = () => {
  return (
    <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Components for Every Need
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our extensive component library that covers everything from basic form elements 
            to complex data visualization tools.
          </p>
        </div>
        
        <Tabs defaultValue="core" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-100 p-1">
              <TabsTrigger value="core" className="px-6 py-2">Core</TabsTrigger>
              <TabsTrigger value="layout" className="px-6 py-2">Layout</TabsTrigger>
              <TabsTrigger value="form" className="px-6 py-2">Form</TabsTrigger>
              <TabsTrigger value="data" className="px-6 py-2">Data</TabsTrigger>
              <TabsTrigger value="pro" className="px-6 py-2 text-purple-600">Pro</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="core" className="border rounded-xl p-6 bg-white shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['Button', 'Badge', 'Card', 'Avatar', 'Alert', 'Toast', 'Tooltip', 'Dropdown'].map((item) => (
                <div key={item} className="border rounded-lg p-4 flex items-center gap-3 bg-gray-50">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline" className="border-[#D3E4FD] hover:bg-[#D3E4FD]/20">
                View All Core Components
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="layout" className="border rounded-xl p-6 bg-white shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['Grid', 'Container', 'Stack', 'Sidebar', 'Tabs', 'Accordion', 'Modal', 'Drawer'].map((item) => (
                <div key={item} className="border rounded-lg p-4 flex items-center gap-3 bg-gray-50">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline" className="border-[#D3E4FD] hover:bg-[#D3E4FD]/20">
                View All Layout Components
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="form" className="border rounded-xl p-6 bg-white shadow-sm">
            {/* Form components */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['Input', 'Select', 'Checkbox', 'Radio', 'Toggle', 'Slider', 'DatePicker', 'Form'].map((item) => (
                <div key={item} className="border rounded-lg p-4 flex items-center gap-3 bg-gray-50">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline" className="border-[#D3E4FD] hover:bg-[#D3E4FD]/20">
                View All Form Components
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="data" className="border rounded-xl p-6 bg-white shadow-sm">
            {/* Data components */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['Table', 'DataGrid', 'Pagination', 'List', 'Tree', 'Chart', 'Progress', 'Skeleton'].map((item) => (
                <div key={item} className="border rounded-lg p-4 flex items-center gap-3 bg-gray-50">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline" className="border-[#D3E4FD] hover:bg-[#D3E4FD]/20">
                View All Data Components
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="pro" className="border rounded-xl p-6 bg-white shadow-sm border-purple-200">
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-medium text-sm mb-4">
                PRO Features
              </div>
              <h3 className="text-2xl font-bold">Unlock Advanced Components</h3>
              <p className="text-gray-600 mt-2">Upgrade to PRO to access premium components and features</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['3D Components', 'Animation Library', 'Advanced Charts', 'Dashboard Templates', 'File Upload', 'Rich Text Editor', 'Kanban Board', 'Video Player'].map((item) => (
                <div key={item} className="border border-purple-100 rounded-lg p-4 flex items-center gap-3 bg-purple-50">
                  <div className="h-5 w-5 rounded-full bg-purple-200 flex items-center justify-center">
                    <Check className="h-3 w-3 text-purple-700" />
                  </div>
                  <span className="text-purple-900">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 transition-opacity">
                Upgrade to PRO
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default UIKitShowcase;
