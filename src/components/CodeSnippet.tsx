
import React, { useState, useMemo } from "react";
import { ClipboardCopy, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CodeBlock, CodeLine, CodeToken, LineHighlight } from "@/components/ui/code-highlight";

interface CodeSnippetProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  className?: string;
  highlightLines?: number[];
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({
  code,
  language = "jsx",
  showLineNumbers = true,
  showCopyButton = true,
  className,
  highlightLines = [],
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
    if (!code) return []; // Check if code is undefined or empty
    
    return code.split('\n').map((line, index) => {
      // Apply syntax highlighting based on language
      const highlightedLine = formatCodeLine(line, language);
      
      const shouldHighlight = highlightLines.includes(index + 1);
      
      if (shouldHighlight) {
        return (
          <LineHighlight key={index}>
            {highlightedLine}
          </LineHighlight>
        );
      }
      
      return <CodeLine key={index}>{highlightedLine}</CodeLine>;
    });
  }, [code, language, highlightLines]);

  if (!code) {
    return <div className="p-4 text-red-500">No code provided</div>;
  }

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
              const shouldHighlight = highlightLines.includes(index + 1);
              
              return (
                <div key={index} className={cn(
                  "table-row group",
                  shouldHighlight && "bg-primary/10"
                )}>
                  <span 
                    className="table-cell pr-4 text-right select-none opacity-40 text-[#6e7681] w-[1%] whitespace-nowrap"
                  >
                    {index + 1}
                  </span>
                  <span className="table-cell whitespace-pre overflow-visible">{highlightedLine}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <pre className="text-[#e6edf3] whitespace-pre overflow-x-auto">
            {formattedCode}
          </pre>
        )}
      </div>
    </div>
  );
};

// Enhanced syntax highlighting function with improved whitespace handling
function formatCodeLine(line: string, language: string): React.ReactNode {
  if (!line) return <span className="whitespace-pre"></span>;
  
  // Preserve exact whitespace at the beginning
  const leadingSpaces = line.match(/^(\s*)/)?.[0] || '';
  const contentAfterSpaces = line.substring(leadingSpaces.length);
  
  if (!contentAfterSpaces) {
    return <span className="whitespace-pre">{leadingSpaces}</span>; // Return just the spaces if line is empty
  }
  
  // For JSX/TSX/JS/TS
  if (language === 'jsx' || language === 'tsx' || language === 'js' || language === 'ts') {
    // Break down the line into tokens for precise formatting
    const tokens: React.ReactNode[] = [];
    
    // Add leading spaces
    if (leadingSpaces) {
      tokens.push(<span key="leading-space" className="whitespace-pre">{leadingSpaces}</span>);
    }
    
    // Keywords for different languages
    const keywords = [
      "import", "export", "from", "const", "let", "var", "function", "return", 
      "if", "else", "switch", "case", "default", "for", "while", "do", "break", 
      "continue", "class", "extends", "implements", "interface", "type", "enum", 
      "namespace", "module", "declare", "require", "new", "try", "catch", "finally", 
      "throw", "async", "await", "static", "public", "private", "protected", "get", 
      "set", "true", "false", "null", "undefined", "this", "super"
    ];
    
    // Special color mappings
    const colorMap: {[key: string]: string} = {
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
    
    // Process the line with proper whitespace preservation
    let remaining = contentAfterSpaces;
    let currentPosition = 0;
    
    // Process JSX tags first
    const jsxTagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)|\/>/g;
    let jsxMatch;
    let matchFound = false;
    
    while ((jsxMatch = jsxTagRegex.exec(remaining)) !== null) {
      matchFound = true;
      const beforeTag = remaining.substring(currentPosition, jsxMatch.index);
      if (beforeTag) {
        processTextFragment(beforeTag);
      }
      
      tokens.push(<CodeToken key={`tag-${tokens.length}`} type="tag">{jsxMatch[0]}</CodeToken>);
      currentPosition = jsxMatch.index + jsxMatch[0].length;
    }
    
    // Process any remaining text
    if (!matchFound || currentPosition < remaining.length) {
      processTextFragment(remaining.substring(currentPosition));
    }
    
    // Helper function to process text fragments
    function processTextFragment(text: string) {
      // Check for strings
      const stringRegex = /("([^"\\]|\\.)*"|'([^'\\]|\\.)*'|`([^`\\]|\\.)*`)/g;
      let stringMatch;
      let lastStringEnd = 0;
      let stringMatchFound = false;
      
      while ((stringMatch = stringRegex.exec(text)) !== null) {
        stringMatchFound = true;
        const beforeString = text.substring(lastStringEnd, stringMatch.index);
        if (beforeString) {
          processNonStringFragment(beforeString);
        }
        
        tokens.push(<CodeToken key={`string-${tokens.length}`} type="string">{stringMatch[0]}</CodeToken>);
        lastStringEnd = stringMatch.index + stringMatch[0].length;
      }
      
      // Process any remaining non-string text
      if (!stringMatchFound || lastStringEnd < text.length) {
        processNonStringFragment(text.substring(lastStringEnd));
      }
    }
    
    // Process non-string text fragments
    function processNonStringFragment(text: string) {
      // Split by keywords, ensuring word boundaries
      let parts: string[] = [];
      let currentText = text;
      
      // Find all keyword matches
      for (const keyword of keywords) {
        const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
        let match;
        let lastIndex = 0;
        let tempParts: string[] = [];
        
        while ((match = regex.exec(currentText)) !== null) {
          // Add text before keyword
          if (match.index > lastIndex) {
            tempParts.push(currentText.substring(lastIndex, match.index));
          }
          
          // Add the keyword with special marking
          tempParts.push(`__KEYWORD_${keyword}__`);
          
          lastIndex = match.index + keyword.length;
        }
        
        // Add any remaining text
        if (lastIndex < currentText.length) {
          tempParts.push(currentText.substring(lastIndex));
        }
        
        if (tempParts.length > 0) {
          currentText = tempParts.join('');
          parts = tempParts;
        }
      }
      
      // If no keywords were found, just use the original text
      if (parts.length === 0) {
        parts = [text];
      }
      
      // Process each part
      for (const part of parts) {
        // Check if this is a keyword
        const keywordMatch = part.match(/__KEYWORD_(.+)__/);
        if (keywordMatch) {
          const keyword = keywordMatch[1];
          const colorClass = colorMap[keyword] || 'text-[#C678DD]';
          tokens.push(
            <span key={`keyword-${tokens.length}`} className={colorClass}>{keyword}</span>
          );
        } else {
          // Further process this non-keyword part
          processRemainingToken(part);
        }
      }
    }
    
    // Process remaining tokens that aren't keywords or strings
    function processRemainingToken(text: string) {
      // Check for JSX attributes
      const attrRegex = /\b([a-zA-Z][a-zA-Z0-9]*)(=)({|"|')/g;
      let attrMatch;
      let lastAttrEnd = 0;
      let attrMatchFound = false;
      
      while ((attrMatch = attrRegex.exec(text)) !== null) {
        attrMatchFound = true;
        // Text before attribute
        if (attrMatch.index > lastAttrEnd) {
          tokens.push(<span key={`text-${tokens.length}`} className="whitespace-pre">{text.substring(lastAttrEnd, attrMatch.index)}</span>);
        }
        
        // The attribute name (group 1)
        tokens.push(<CodeToken key={`attr-${tokens.length}`} type="attr-name">{attrMatch[1]}</CodeToken>);
        
        // The equals sign (group 2)
        tokens.push(<span key={`equals-${tokens.length}`}>{attrMatch[2]}</span>);
        
        // The opening quote or brace (group 3)
        tokens.push(<span key={`bracket-${tokens.length}`}>{attrMatch[3]}</span>);
        
        lastAttrEnd = attrMatch.index + attrMatch[0].length;
      }
      
      // Add any remaining text
      if (!attrMatchFound || lastAttrEnd < text.length) {
        const remainingText = text.substring(lastAttrEnd);
        
        // Check for numeric literals
        const numericRegex = /\b(\d+(\.\d+)?)\b/g;
        let numMatch;
        let lastNumEnd = 0;
        let numMatchFound = false;
        
        while ((numMatch = numericRegex.exec(remainingText)) !== null) {
          numMatchFound = true;
          // Text before number
          if (numMatch.index > lastNumEnd) {
            tokens.push(<span key={`text-num-${tokens.length}`} className="whitespace-pre">{remainingText.substring(lastNumEnd, numMatch.index)}</span>);
          }
          
          // The number
          tokens.push(<CodeToken key={`num-${tokens.length}`} type="number">{numMatch[0]}</CodeToken>);
          
          lastNumEnd = numMatch.index + numMatch[0].length;
        }
        
        // Add any final remaining text
        if (!numMatchFound || lastNumEnd < remainingText.length) {
          tokens.push(<span key={`text-final-${tokens.length}`} className="whitespace-pre">{remainingText.substring(lastNumEnd)}</span>);
        }
      }
    }
    
    return tokens.length > 0 ? <>{tokens}</> : <span className="whitespace-pre">{line}</span>;
  }
  
  // Default fallback for other languages - preserve whitespace
  return <span className="whitespace-pre">{line}</span>;
}

export default CodeSnippet;
