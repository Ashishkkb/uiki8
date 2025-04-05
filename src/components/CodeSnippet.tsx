
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

// Enhanced syntax highlighting function with improved language support
function formatCodeLine(line: string, language: string): React.ReactNode {
  // For JSX/TSX
  if (language === 'jsx' || language === 'tsx' || language === 'js' || language === 'ts') {
    // Break down the line into tokens for precise formatting
    const tokens: React.ReactNode[] = [];
    
    // Keywords for different languages
    const keywords = [
      "import", "export", "from", "const", "let", "var", "function", "return", 
      "if", "else", "switch", "case", "default", "for", "while", "do", "break", 
      "continue", "class", "extends", "implements", "interface", "type", "enum", 
      "namespace", "module", "declare", "require", "new", "try", "catch", "finally", 
      "throw", "async", "await", "static", "public", "private", "protected", "get", 
      "set", "true", "false", "null", "undefined", "this", "super"
    ];
    
    // Regular expression patterns for different token types
    const patterns = {
      keyword: new RegExp(`\\b(${keywords.join('|')})\\b`, 'g'),
      string: /("([^"\\]|\\.)*"|'([^'\\]|\\.)*'|`([^`\\]|\\.)*`)/g,
      comment: /(\/\/.*$|\/\*[\s\S]*?\*\/)/g,
      number: /\b\d+\b/g,
      tag: /<\/?([a-zA-Z][a-zA-Z0-9]*)|\/>/g,
      attr: /\b([a-zA-Z][a-zA-Z0-9]*)(?=\s*=\s*["'{])/g,
      function: /\b([a-zA-Z][a-zA-Z0-9]*)(?=\s*\()/g,
      punctuation: /[{}[\]()=>;:.,?!|&]/g,
      jsx: /(<\/?[a-zA-Z][a-zA-Z0-9]*|\/?>)/g
    };
    
    // Special color mappings
    const colorMap = {
      import: 'text-[#C678DD]',
      from: 'text-[#C678DD]',
      const: 'text-[#C678DD]',
      let: 'text-[#C678DD]',
      var: 'text-[#C678DD]',
      return: 'text-[#C678DD]',
      if: 'text-[#C678DD]',
      else: 'text-[#C678DD]',
      function: 'text-[#C678DD]',
      interface: 'text-[#C678DD]',
      export: 'text-[#C678DD]',
    };
    
    // Complex parsing for better token separation
    let remaining = line;
    let currentPosition = 0;
    
    // Parse different parts of the line
    
    // Handle jsx tags
    const jsxTagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)|\/>/g;
    let jsxMatch;
    while ((jsxMatch = jsxTagRegex.exec(remaining)) !== null) {
      const beforeTag = remaining.substring(currentPosition, jsxMatch.index);
      if (beforeTag) {
        processTextFragment(beforeTag);
      }
      
      tokens.push(<CodeToken key={tokens.length} type="tag">{jsxMatch[0]}</CodeToken>);
      currentPosition = jsxMatch.index + jsxMatch[0].length;
    }
    
    // Process any remaining text
    if (currentPosition < remaining.length) {
      processTextFragment(remaining.substring(currentPosition));
    }
    
    // Helper function to process text fragments
    function processTextFragment(text: string) {
      // Check for strings
      const stringRegex = /("([^"\\]|\\.)*"|'([^'\\]|\\.)*'|`([^`\\]|\\.)*`)/g;
      let stringMatch;
      let lastStringEnd = 0;
      
      while ((stringMatch = stringRegex.exec(text)) !== null) {
        const beforeString = text.substring(lastStringEnd, stringMatch.index);
        if (beforeString) {
          processNonStringFragment(beforeString);
        }
        
        tokens.push(<CodeToken key={tokens.length} type="string">{stringMatch[0]}</CodeToken>);
        lastStringEnd = stringMatch.index + stringMatch[0].length;
      }
      
      // Process any remaining non-string text
      if (lastStringEnd < text.length) {
        processNonStringFragment(text.substring(lastStringEnd));
      }
    }
    
    // Process non-string text fragments
    function processNonStringFragment(text: string) {
      // Split by keywords, ensuring word boundaries
      const keywordPattern = new RegExp(`\\b(${keywords.join('|')})\\b`);
      const parts = text.split(keywordPattern);
      
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (!part) continue;
        
        // Check if this part is a keyword
        if (i % 2 === 1 && keywords.includes(part)) {
          const colorClass = colorMap[part as keyof typeof colorMap] || 'text-[#C678DD]';
          tokens.push(
            <span key={tokens.length} className={colorClass}>{part}</span>
          );
        } else {
          // Further process this non-keyword part
          processRemainingToken(part);
        }
      }
    }
    
    // Process remaining tokens that aren't keywords or strings
    function processRemainingToken(text: string) {
      // Check for JSX attributes (simplified)
      const attrRegex = /\b([a-zA-Z][a-zA-Z0-9]*)(=)({|"|')/g;
      let attrMatch;
      let lastAttrEnd = 0;
      
      while ((attrMatch = attrRegex.exec(text)) !== null) {
        // Text before attribute
        if (attrMatch.index > lastAttrEnd) {
          tokens.push(<span key={tokens.length}>{text.substring(lastAttrEnd, attrMatch.index)}</span>);
        }
        
        // The attribute name (group 1)
        tokens.push(<CodeToken key={tokens.length} type="attr-name">{attrMatch[1]}</CodeToken>);
        
        // The equals sign (group 2)
        tokens.push(<span key={tokens.length}>{attrMatch[2]}</span>);
        
        // The opening quote or brace (group 3)
        tokens.push(<span key={tokens.length}>{attrMatch[3]}</span>);
        
        lastAttrEnd = attrMatch.index + attrMatch[0].length;
      }
      
      // Add any remaining text
      if (lastAttrEnd < text.length) {
        // Check for numeric literals
        const numericRegex = /\b(\d+)\b/g;
        let numMatch;
        let lastNumEnd = lastAttrEnd;
        
        while ((numMatch = numericRegex.exec(text.substring(lastAttrEnd))) !== null) {
          const absIndex = lastAttrEnd + numMatch.index;
          
          // Text before number
          if (absIndex > lastNumEnd) {
            tokens.push(<span key={tokens.length}>{text.substring(lastNumEnd, absIndex)}</span>);
          }
          
          // The number
          tokens.push(<CodeToken key={tokens.length} type="number">{numMatch[0]}</CodeToken>);
          
          lastNumEnd = absIndex + numMatch[0].length;
        }
        
        // Add any final remaining text
        if (lastNumEnd < text.length) {
          tokens.push(<span key={tokens.length}>{text.substring(lastNumEnd)}</span>);
        }
      }
    }
    
    return tokens.length > 0 ? <>{tokens}</> : <span>{line}</span>;
  }
  
  // Default fallback for other languages
  return <span>{line}</span>;
}

export default CodeSnippet;
