
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
          <span className="table-cell pr-4 text-right opacity-50 select-none text-xs text-[#858585]">{index + 1}</span>
          <span className="table-cell">{line}</span>
        </div>
      ))
    : code;

  // Generate a VSCode-style filename tab
  const fileName = `${language === "jsx" ? "Component" : language}.${language}`;

  return (
    <div className="rounded-lg overflow-hidden border border-border/30 shadow-sm bg-[#1e1e1e] text-[#d4d4d4]">
      {/* VSCode-style top bar */}
      <div className="flex items-center justify-between bg-[#252526] px-4 py-2 border-b border-border/20">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium opacity-80">{fileName}</span>
        </div>
        
        {showCopyButton && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-[#d4d4d4] hover:bg-white/10 hover:text-white"
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
      </div>
      
      {/* Code content */}
      <div className={cn(
        "p-4 overflow-x-auto font-mono text-sm",
        showCopyButton && "pr-4"
      )}>
        {showLineNumbers ? (
          <div className="table w-full">
            {formattedCode}
          </div>
        ) : (
          <pre className="text-[#d4d4d4]">{code}</pre>
        )}
      </div>
    </div>
  );
};

export default CodeSnippet;
