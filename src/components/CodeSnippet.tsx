
import React from "react";
import { ClipboardCopy, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useState } from "react";

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

  return (
    <div className="relative rounded-lg border overflow-hidden bg-card text-card-foreground shadow-sm">
      {showCopyButton && (
        <button
          className="absolute top-2 right-2 p-1.5 rounded-md bg-muted/80 hover:bg-muted transition-colors text-muted-foreground"
          onClick={handleCopyCode}
          aria-label="Copy code"
        >
          {copied ? (
            <Check size={14} className="text-green-500" />
          ) : (
            <ClipboardCopy size={14} />
          )}
        </button>
      )}
      
      <pre className={cn(
        "p-4 overflow-x-auto font-mono text-sm",
        showCopyButton && "pr-10"
      )}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeSnippet;
