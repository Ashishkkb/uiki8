
import React, { useState, Suspense } from "react";
import { Copy, Check, Eye, Code, Download, Boxes } from "lucide-react";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import CodeSnippet from "./CodeSnippet";
import { ComponentItem } from "@/types/component";
import ComponentPreview from "./ComponentPreview";

interface ComponentCardProps {
  component: ComponentItem;
}

const ComponentCard = ({ component }: ComponentCardProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");
  const { toast } = useToast();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(component.code);
    setIsCopied(true);
    toast({
      title: "Code copied!",
      description: `${component.name} code copied to clipboard`,
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([component.code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${component.name.toLowerCase().replace(/\s+/g, "-")}.tsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Component downloaded!",
      description: `${component.name} has been downloaded`,
    });
  };

  return (
    <Card className="overflow-hidden border border-[#9b87f5]/30 shadow-lg hover:shadow-[#9b87f5]/10 transition-all flex flex-col bg-[#1A1F2C]/80 backdrop-blur-sm text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2 border-b border-[#9b87f5]/20">
        <div>
          <h3 className="font-medium text-lg text-[#F1F0FB]">{component.name}</h3>
          <div className="flex items-center mt-1">
            <Badge variant="outline" className="text-xs bg-[#2D3748] text-[#D6BCFA] border-[#9b87f5]/30">
              {component.category}
            </Badge>
            {component.isNew && (
              <Badge className="ml-2 text-xs bg-gradient-to-r from-[#9b87f5] to-[#7C3AED] text-white">
                New
              </Badge>
            )}
            {component.is3D && (
              <Badge className="ml-2 text-xs bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white flex items-center gap-1">
                <Boxes className="h-3 w-3" /> 3D
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <div className="p-4 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-gray-300 line-clamp-2">{component.description}</p>
          <div className="flex gap-1 ml-2">
            <Button
              size="sm"
              variant={viewMode === "preview" ? "default" : "outline"}
              className={`px-2 py-1 h-8 ${viewMode === "preview" ? "bg-[#9b87f5] hover:bg-[#8874e0]" : "border-[#9b87f5]/30 text-gray-300"}`}
              onClick={() => setViewMode("preview")}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === "code" ? "default" : "outline"}
              className={`px-2 py-1 h-8 ${viewMode === "code" ? "bg-[#9b87f5] hover:bg-[#8874e0]" : "border-[#9b87f5]/30 text-gray-300"}`}
              onClick={() => setViewMode("code")}
            >
              <Code className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className={`${viewMode === "preview" ? "flex" : "hidden"} rounded-lg border border-[#9b87f5]/20 ${component.previewBg || "bg-[#2D3748]"} flex-grow h-[300px] overflow-hidden`}>
          <ScrollArea className="w-full h-full">
            <div className="w-full h-full p-3">
              <Suspense fallback={<div className="flex items-center justify-center w-full h-full"><p className="text-gray-300">Loading...</p></div>}>
                <ComponentPreview component={component} />
              </Suspense>
            </div>
          </ScrollArea>
        </div>

        <div className={`${viewMode === "code" ? "block" : "hidden"} h-[300px] overflow-hidden rounded-lg border border-[#9b87f5]/20 flex-grow bg-[#1A1F2C]`}>
          <ScrollArea className="w-full h-full">
            <CodeSnippet code={component.code} language={component.language || "tsx"} />
          </ScrollArea>
        </div>

        {component.tags && component.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {component.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs bg-[#2D3748] text-gray-300 border-[#9b87f5]/20">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <CardFooter className="flex justify-between items-center p-4 bg-[#1A1F2C] border-t border-[#9b87f5]/20 mt-auto">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-xs text-gray-400 flex items-center">
                {component.fileSize && <span>{component.fileSize}</span>}
                {component.price && (
                  <Badge className="ml-2 bg-[#2D3748] text-[#D6BCFA] hover:bg-[#2D3748]/80 border border-[#9b87f5]/20">
                    ${component.price}
                  </Badge>
                )}
              </span>
            </TooltipTrigger>
            <TooltipContent className="bg-[#1A1F2C] text-white border border-[#9b87f5]/30">
              {component.fileSize ? `File size: ${component.fileSize}` : "Free component"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopyCode}
            className="h-8 border-[#9b87f5]/30 hover:bg-[#9b87f5]/20 hover:border-[#9b87f5]/50 text-white"
          >
            {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
          <Button
            size="sm"
            onClick={handleDownload}
            className="h-8 bg-gradient-to-r from-[#9b87f5] to-[#7C3AED] hover:opacity-90 transition-opacity"
          >
            <Download className="h-4 w-4 mr-1" /> Download
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ComponentCard;
