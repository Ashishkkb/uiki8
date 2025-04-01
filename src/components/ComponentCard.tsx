
import { useState } from "react";
import { Copy, Check, Eye, Code, Download } from "lucide-react";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import CodeSnippet from "./CodeSnippet";
import { ComponentItem } from "@/types/component";

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
    <Card className="overflow-hidden border border-[#D3E4FD] shadow-sm transition-all hover:shadow-md flex flex-col bg-white/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2 border-b border-[#F1F0FB]">
        <div>
          <h3 className="font-medium text-lg text-[#555]">{component.name}</h3>
          <div className="flex items-center mt-1">
            <Badge variant="outline" className="text-xs bg-[#FDE1D3]/30 text-[#666] border-[#FDE1D3]">
              {component.category}
            </Badge>
            {component.isNew && (
              <Badge className="ml-2 text-xs bg-gradient-to-r from-[#6A9D80] to-[#87B5A2] text-white">
                New
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <div className="p-4 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-[#666] line-clamp-2">{component.description}</p>
          <div className="flex gap-1 ml-2">
            <Button
              size="sm"
              variant={viewMode === "preview" ? "default" : "outline"}
              className={`px-2 py-1 h-8 ${viewMode === "preview" ? "bg-[#6A9D80] hover:bg-[#87B5A2]" : "border-[#ccc]"}`}
              onClick={() => setViewMode("preview")}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === "code" ? "default" : "outline"}
              className={`px-2 py-1 h-8 ${viewMode === "code" ? "bg-[#6A9D80] hover:bg-[#87B5A2]" : "border-[#ccc]"}`}
              onClick={() => setViewMode("code")}
            >
              <Code className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className={`${viewMode === "preview" ? "flex" : "hidden"} rounded-lg border border-[#F1F0FB] ${component.previewBg || "bg-[#f3f3f3]"} flex-grow h-[300px] overflow-hidden`}>
          <ScrollArea className="w-full h-full">
            <div className="flex items-center justify-center w-full h-full p-3">
              {component.previewHtml ? (
                <div dangerouslySetInnerHTML={{ __html: component.previewHtml }} className="max-w-full" />
              ) : (
                <p className="text-[#8A898C]">Preview not available</p>
              )}
            </div>
          </ScrollArea>
        </div>

        <div className={`${viewMode === "code" ? "block" : "hidden"} h-[300px] overflow-hidden rounded-lg border border-[#F1F0FB] flex-grow`}>
          <ScrollArea className="w-full h-full">
            <CodeSnippet code={component.code} language={component.language || "tsx"} />
          </ScrollArea>
        </div>

        {component.tags && component.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {component.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs bg-[#F1F0FB]/50 text-[#8A898C] border-[#F1F0FB]">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <CardFooter className="flex justify-between items-center p-4 bg-[#F1F0FB]/30 border-t border-[#F1F0FB] mt-auto">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-xs text-[#8A898C] flex items-center">
                {component.fileSize && <span>{component.fileSize}</span>}
                {component.price && (
                  <Badge className="ml-2 bg-[#FDE1D3] text-[#555] hover:bg-[#FDE1D3]/80">
                    ${component.price}
                  </Badge>
                )}
              </span>
            </TooltipTrigger>
            <TooltipContent>{component.fileSize ? `File size: ${component.fileSize}` : "Free component"}</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopyCode}
            className="h-8 border-[#D3E4FD] hover:bg-[#D3E4FD]/20 hover:border-[#D3E4FD]"
          >
            {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
          <Button
            size="sm"
            onClick={handleDownload}
            className="h-8 bg-gradient-to-r from-[#6A9D80] to-[#87B5A2] hover:opacity-90 transition-opacity"
          >
            <Download className="h-4 w-4 mr-1" /> Download
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ComponentCard;
