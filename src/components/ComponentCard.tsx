
import { useState } from "react";
import { Eye, Code, Download, Copy, Check, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { ComponentItem } from "@/types/component";
import CodeSnippet from "@/components/CodeSnippet";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

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
    <Card className="overflow-hidden bg-white border shadow-sm transition-all hover:shadow-md h-[480px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2 border-b">
        <div>
          <h3 className="font-medium text-lg">{component.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="capitalize text-xs">{component.category}</Badge>
            <span className="text-xs text-gray-500">{component.framework}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Tag className="h-3 w-3" />
            <span>${component.price || "Free"}</span>
          </Badge>
        </div>
      </CardHeader>

      <div className="p-4 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-gray-600 line-clamp-2">{component.description}</p>
          <div className="flex gap-1 ml-2">
            <Button
              variant={viewMode === "preview" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("preview")}
              className="h-8 px-2 text-xs"
            >
              <Eye className="h-3 w-3 mr-1" />
              Preview
            </Button>
            <Button
              variant={viewMode === "code" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("code")}
              className="h-8 px-2 text-xs"
            >
              <Code className="h-3 w-3 mr-1" />
              Code
            </Button>
          </div>
        </div>

        <div className={`${viewMode === "preview" ? "flex" : "hidden"} rounded-lg border ${component.previewBg || "bg-gray-50"} flex-grow items-center justify-center h-[220px]`}>
          <div className="flex items-center justify-center w-full h-full overflow-hidden p-3">
            {component.previewHtml ? (
              <div dangerouslySetInnerHTML={{ __html: component.previewHtml }} className="max-w-full max-h-full" />
            ) : (
              <p className="text-gray-500">Preview not available</p>
            )}
          </div>
        </div>

        <div className={`${viewMode === "code" ? "block" : "hidden"} h-[220px] overflow-auto rounded-lg border flex-grow`}>
          <CodeSnippet code={component.code} language={component.language || "tsx"} />
        </div>

        {component.tags && component.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {component.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs bg-gray-100">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <CardFooter className="flex justify-between items-center p-4 bg-gray-50 border-t mt-auto">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm" variant="outline" onClick={handleCopy} className="h-8 w-8 p-0">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{copied ? "Copied!" : "Copy code"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <Button size="sm" onClick={handleDownload} className="gap-1">
          <Download className="h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ComponentCard;
