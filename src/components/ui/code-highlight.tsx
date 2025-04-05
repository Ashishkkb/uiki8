
import { cn } from "@/lib/utils";
import React from "react";

type TokenType = 
  | "keyword" 
  | "string" 
  | "number" 
  | "comment" 
  | "tag" 
  | "attr-name"
  | "function"
  | "punctuation"
  | "plain";

interface CodeTokenProps {
  children: React.ReactNode;
  type: TokenType;
  className?: string;
}

export function CodeToken({ children, type, className }: CodeTokenProps) {
  const getTokenColor = () => {
    switch (type) {
      case "keyword":
        return "text-[#C678DD]"; // Purple
      case "string":
        return "text-[#98C379]"; // Green
      case "number":
        return "text-[#D19A66]"; // Orange
      case "comment":
        return "text-[#5C6370] italic"; // Grey italic
      case "tag":
        return "text-[#E06C75]"; // Red
      case "attr-name":
        return "text-[#D19A66]"; // Orange
      case "function":
        return "text-[#61AFEF]"; // Blue
      case "punctuation":
        return "text-[#ABB2BF]"; // Light grey
      case "plain":
      default:
        return "text-[#ABB2BF]"; // Default text color
    }
  };

  return (
    <span className={cn(getTokenColor(), className)}>
      {children}
    </span>
  );
}

export function CodeLine({ 
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-h-[1.5em] leading-[1.5]", className)}>
      {children}
    </div>
  );
}

export function CodeBlock({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <pre className={cn("overflow-x-auto font-mono text-sm leading-[1.5]", className)}>
      {children}
    </pre>
  );
}
