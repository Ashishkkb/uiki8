
import React, { useState, useMemo } from "react";
import { ClipboardCopy, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CodeBlock, CodeLine, CodeToken } from "@/components/ui/code-highlight";

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

  // Format the code with enhanced syntax highlighting
  const formattedCode = useMemo(() => {
    return code.split('\n').map((line, index) => {
      // Apply syntax highlighting based on language
      const highlightedLine = formatCodeLine(line, language);
      return <CodeLine key={index}>{highlightedLine}</CodeLine>;
    });
  }, [code, language]);

  return (
    <div className={cn(
      "rounded-xl overflow-hidden border border-[#30363d]/80 shadow-md bg-[#0d1117]", 
      className
    )}>
      {/* Window style top bar with circles */}
      <div className="flex items-center justify-between bg-[#161b22] px-4 py-2 border-b border-[#30363d]/80">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
          <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
          {language && (
            <span className="ml-2 text-xs text-[#8b949e]">
              {language.toUpperCase()}
            </span>
          )}
        </div>
        
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
            {code.split('\n').map((line, index) => {
              const highlightedLine = formatCodeLine(line, language);
              return (
                <div key={index} className="table-row group">
                  <span 
                    className="table-cell pr-4 text-right select-none opacity-40 text-[#6e7681] w-[1%] whitespace-nowrap"
                  >
                    {index + 1}
                  </span>
                  <span className="table-cell">{highlightedLine}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <pre className="text-[#e6edf3]">
            {formattedCode}
          </pre>
        )}
      </div>
    </div>
  );
};

// Enhanced syntax highlighting function
function formatCodeLine(line: string, language: string): React.ReactNode {
  // For JSX/TSX
  if (language === 'jsx' || language === 'tsx') {
    // Break down the line into parts for formatting
    const parts: React.ReactNode[] = [];
    
    // Match different code elements
    let remaining = line;
    let lastIndex = 0;
    
    // Handle JSX tags
    const tagPattern = /<\/?[a-zA-Z][a-zA-Z0-9]*|\/>/g;
    let tagMatch = tagPattern.exec(remaining);
    
    // Handle keywords
    const keywords = ["import", "export", "from", "const", "let", "var", "function", "return", "if", "else", "switch", "case", "default", "for", "while", "do", "break", "continue", "class", "extends", "implements", "interface", "type", "enum", "namespace", "module", "declare", "require", "new", "try", "catch", "finally", "throw", "async", "await", "static", "public", "private", "protected", "get", "set", "true", "false", "null", "undefined", "this", "super"];
    
    // Special pattern for quotes/strings
    const stringPattern = /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'|`([^`\\]|\\.)*`/g;
    let stringMatch = stringPattern.exec(remaining);
    
    // Pattern for attribute names
    const attrPattern = /\s[a-zA-Z][a-zA-Z0-9]*(?=\s*=)/g;
    let attrMatch = attrPattern.exec(remaining);
    
    // Pattern for functions
    const funcPattern = /\b[a-zA-Z][a-zA-Z0-9]*(?=\()/g;
    let funcMatch = funcPattern.exec(remaining);
    
    // Pattern for comments
    const commentPattern = /\/\/.*$|\/\*[\s\S]*?\*\//g;
    let commentMatch = commentPattern.exec(remaining);
    
    // Simple tokenization of the line
    return remaining.split(/\b/).map((part, index) => {
      // Check if part is a keyword
      if (keywords.includes(part)) {
        return <CodeToken key={index} type="keyword">{part}</CodeToken>;
      }
      
      // Check for strings/quotes
      if (part.startsWith('"') || part.startsWith("'") || part.startsWith("`")) {
        return <CodeToken key={index} type="string">{part}</CodeToken>;
      }
      
      // Check for numbers
      if (/^\d+$/.test(part)) {
        return <CodeToken key={index} type="number">{part}</CodeToken>;
      }
      
      // Check for JSX tags
      if (part.startsWith('<') || part.startsWith('</') || part.startsWith('/>')) {
        return <CodeToken key={index} type="punctuation">{part}</CodeToken>;
      }
      
      // Check for tag names (simplified)
      if (part && (line.includes('<' + part) || line.includes('</' + part))) {
        return <CodeToken key={index} type="tag">{part}</CodeToken>;
      }
      
      // Check for attribute names (simplified)
      if (part && line.match(new RegExp(`\\s${part}\\s*=`))) {
        return <CodeToken key={index} type="attr-name">{part}</CodeToken>;
      }
      
      // Check for function calls - Fixed the invalid regex here
      if (part && line.match(new RegExp(`${part}\\(`))) {
        return <CodeToken key={index} type="function">{part}</CodeToken>;
      }
      
      // Default token type
      return <CodeToken key={index} type="plain">{part}</CodeToken>;
    });
  }
  
  // For other languages, provide basic highlighting
  // This is a simplified version - in a real app, you'd use a proper syntax highlighter library
  return (
    <span>{line}</span>
  );
}

export default CodeSnippet;
