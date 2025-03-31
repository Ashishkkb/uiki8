
import { useState } from "react";
import { Eye, Code as CodeIcon, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import reactComponents from "@/data/reactComponents";
import ComponentFilters from "./ComponentFilters";
import CodeSnippet from "./CodeSnippet";

const ComponentsShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");

  // Filter components based on category and search query
  const filteredComponents = reactComponents.filter((component) => {
    // Filter by category
    if (selectedCategory && component.category !== selectedCategory) {
      return false;
    }

    // Filter by search query
    if (
      searchQuery &&
      !component.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !component.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !(component.tags && component.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    ) {
      return false;
    }

    return true;
  });

  // Get unique categories
  const categories = Array.from(
    new Set(reactComponents.map((component) => component.category))
  );

  const handleDownload = (component) => {
    // Create a Blob containing the component code
    const blob = new Blob([component.code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor element to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = `${component.name.replace(/\s+/g, "")}.jsx`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    toast.success(`Downloaded ${component.name} component`);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <div className="w-full md:w-auto">
          <Input
            type="search"
            placeholder="Search components..."
            className="max-w-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <ComponentFilters 
          categories={categories} 
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {filteredComponents.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No components found</h3>
          <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComponents.map((component) => (
            <Card key={component.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{component.name}</CardTitle>
                  <Badge>{component.category}</Badge>
                </div>
              </CardHeader>
              
              <div className={`px-6 pb-3 ${component.previewBg || 'bg-white'} rounded-md mx-6`}>
                {component.previewHtml && (
                  <div 
                    className="py-4 flex items-center justify-center" 
                    dangerouslySetInnerHTML={{ __html: component.previewHtml }} 
                  />
                )}
              </div>
              
              <CardContent className="pt-4">
                <p className="text-sm text-gray-500">{component.description}</p>
                
                {component.tags && component.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {component.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs bg-gray-100">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-between pt-2">
                <Tabs defaultValue="preview" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="preview" className="text-xs">
                      <Eye className="h-3 w-3 mr-1" />
                      Preview
                    </TabsTrigger>
                    <TabsTrigger value="code" className="text-xs">
                      <CodeIcon className="h-3 w-3 mr-1" />
                      Code
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="preview" className="mt-4">
                    <Button 
                      onClick={() => handleDownload(component)}
                      className="w-full"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Component
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="code" className="mt-4">
                    <div className="max-h-64 overflow-y-auto rounded border">
                      <CodeSnippet code={component.code} language="jsx" />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComponentsShowcase;
