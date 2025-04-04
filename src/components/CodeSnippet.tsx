
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
  className?: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({
  code,
  language = "jsx",
  showLineNumbers = true,
  showCopyButton = true,
  className,
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

  // Calculate maximum line number width for padding
  const lineCount = code.split('\n').length;
  const maxLineNumberWidth = lineCount.toString().length;

  // Format code with line numbers and syntax highlighting
  const formattedCode = showLineNumbers 
    ? code.split('\n').map((line, index) => {
        // Process line for syntax highlighting
        const processedLine = highlightSyntax(line, language);
        
        return (
          <div key={index} className="table-row group">
            <span 
              className="table-cell pr-4 text-right select-none opacity-40 text-[#6e7681] w-[1%] whitespace-nowrap"
              style={{ minWidth: `${maxLineNumberWidth + 1}ch` }}
            >
              {index + 1}
            </span>
            <span className="table-cell">{processedLine}</span>
          </div>
        );
      })
    : <pre className="text-[#e6edf3]" dangerouslySetInnerHTML={{ __html: highlightSyntax(code, language) }} />;

  return (
    <div className={cn(
      "rounded-xl overflow-hidden border border-[#30363d]/80 shadow-md bg-[#0d1117]", 
      className
    )}>
      {/* Window style top bar with circles */}
      <div className="flex items-center bg-[#161b22] px-4 py-2 border-b border-[#30363d]/80">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
          <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
        </div>
        
        <div className="flex-1"></div>
        
        {showCopyButton && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-[#8b949e] hover:bg-[#30363d]/50 hover:text-[#c9d1d9]"
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
        "p-4 overflow-x-auto font-mono text-sm text-[#e6edf3] bg-[#0d1117]",
        "scrollbar-thin scrollbar-thumb-[#30363d] scrollbar-track-transparent"
      )}>
        {showLineNumbers ? (
          <div className="table w-full">
            {formattedCode}
          </div>
        ) : (
          formattedCode
        )}
      </div>
    </div>
  );
};

// Helper function to add syntax highlighting similar to the image
// This is a simplified version - in a real application, you might want to use a library like Prism.js
function highlightSyntax(code: string, language: string): string | React.ReactNode {
  if (typeof code !== 'string') return code;

  // For JSX/HTML highlighting
  if (language === 'jsx' || language === 'html') {
    // Simple regex-based highlighting
    let highlighted = code
      // HTML tags
      .replace(/(&lt;|<)(\/?)([\w\-]+)(?=[\s>])/g, '<span style="color: #ff7b72;">$1$2</span><span style="color: #7ee787;">$3</span>')
      // Attributes
      .replace(/(\s+)([\w\-:]+)(\s*=\s*)/g, '$1<span style="color: #79c0ff;">$2</span>$3')
      // Attribute values
      .replace(/(".*?"|'.*?')/g, '<span style="color: #a5d6ff;">$1</span>')
      // Class names specifically
      .replace(/(class|className)(\s*=\s*)(".*?"|'.*?')/g, '<span style="color: #79c0ff;">$1</span>$2<span style="color: #a5d6ff;">$3</span>')
      // Special characters
      .replace(/(&gt;|>|\/&gt;|\/>)/g, '<span style="color: #ff7b72;">$1</span>');
    
    return highlighted;
  }
  
  // For CSS
  if (language === 'css') {
    // Simple implementation - would be more complex in reality
    return code;
  }
  
  // For JS/TS
  if (language === 'js' || language === 'javascript' || language === 'ts' || language === 'typescript') {
    // Simple implementation - would be more complex in reality
    return code;
  }
  
  // Default - no highlighting
  return code;
}

export default CodeSnippet;
