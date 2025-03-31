
import { useState } from "react";
import { Eye, Code, Download, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { ComponentItem } from "@/types/component";
import CodeSnippet from "@/components/CodeSnippet";

interface ComponentCardProps {
  component: ComponentItem;
}

const ComponentCard = ({ component }: ComponentCardProps) => {
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(component.code);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: `${component.name} code copied successfully.`,
    });
    setTimeout(() => setCopied(false), 2000);
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
      title: "Component downloaded",
      description: `${component.name} has been downloaded successfully.`,
    });
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <div>
          <h3 className="font-medium">{component.name}</h3>
          <div className="flex gap-2 mt-1 items-center">
            <Badge variant="outline" className="capitalize">{component.category}</Badge>
            <span className="text-xs text-gray-500">{component.framework}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "preview" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("preview")}
            className={viewMode === "preview" ? "bg-purple-600" : ""}
          >
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
          <Button
            variant={viewMode === "code" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("code")}
            className={viewMode === "code" ? "bg-purple-600" : ""}
          >
            <Code className="h-4 w-4 mr-1" />
            Code
          </Button>
        </div>
      </div>

      <div className="p-5">
        {viewMode === "preview" ? (
          <div className="flex items-center justify-center min-h-[200px] border border-dashed border-gray-200 rounded-lg overflow-hidden">
            <div className={`${component.previewBg || "bg-gray-50"} p-6 rounded-lg w-full h-full flex items-center justify-center`}>
              <div dangerouslySetInnerHTML={{ __html: component.previewHtml || '<p class="text-gray-500">Preview not available</p>' }} />
            </div>
          </div>
        ) : (
          <div className="min-h-[200px]">
            <CodeSnippet code={component.code} language={component.language || "tsx"} />
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
        <p className="text-sm text-gray-600 line-clamp-1">{component.description}</p>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="outline" onClick={handleCopy}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copied ? "Copied!" : "Copy code"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="outline" onClick={handleDownload}>
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download component</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default ComponentCard;
