
import React, { useState } from "react";
import { ClipboardCopy, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CodeSnippetProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({
  code,
  language = "jsx",
  showLineNumbers = false,
  showCopyButton = true,
}) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Code copied to clipboard");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // Format code with line numbers if requested
  const formattedCode = showLineNumbers 
    ? code.split('\n').map((line, index) => (
        <div key={index} className="table-row">
          <span className="table-cell text-right pr-4 text-muted-foreground select-none">{index + 1}</span>
          <span className="table-cell">{line}</span>
        </div>
      ))
    : code;

  return (
    <div className="relative rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
      {showCopyButton && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-8 px-2 text-muted-foreground hover:text-foreground"
          onClick={handleCopyCode}
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check size={14} className="mr-1 text-green-500" />
              <span className="text-xs">Copied</span>
            </>
          ) : (
            <>
              <ClipboardCopy size={14} className="mr-1" />
              <span className="text-xs">Copy</span>
            </>
          )}
        </Button>
      )}
      
      <div className={cn(
        "p-4 overflow-x-auto font-mono text-sm bg-muted/50",
        showCopyButton && "pr-24"
      )}>
        {showLineNumbers ? (
          <div className="table w-full">
            {formattedCode}
          </div>
        ) : (
          <pre>{code}</pre>
        )}
      </div>
    </div>
  );
};

export default CodeSnippet;
