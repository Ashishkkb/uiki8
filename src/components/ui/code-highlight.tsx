
import React from "react";
import { cn } from "@/lib/utils";

export function LineHighlight({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("relative z-10", className)}>
      <div className="absolute inset-y-0 left-0 w-full bg-[#2a2d2e] rounded-md" />
      <div className="relative">{children}</div>
    </div>
  );
}

export function CodeBlock({
  className,
  children,
  language = "tsx",
  showLineNumbers = true,
}: {
  className?: string;
  children: React.ReactNode;
  language?: string;
  showLineNumbers?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden border border-[#30363d]/80 shadow-md bg-[#0d1117]",
        className
      )}
    >
      {/* Window style top bar with circles */}
      <div className="flex items-center bg-[#161b22] px-4 py-2 border-b border-[#30363d]/80">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
          <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
        </div>
        <div className="ml-4 text-xs text-[#8b949e]">
          {language && language.toUpperCase()}
        </div>
      </div>
      
      {/* Code content */}
      <div className="bg-[#0d1117] p-4 font-mono text-sm text-[#e6edf3] overflow-x-auto">
        {showLineNumbers ? (
          <div className="table w-full">
            {React.Children.map(children, (child, index) => (
              <div key={index} className="table-row group">
                <span className="table-cell pr-4 text-right select-none opacity-40 text-[#6e7681] w-[1%] whitespace-nowrap">
                  {index + 1}
                </span>
                <span className="table-cell">{child}</span>
              </div>
            ))}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

export function CodeLine({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("", className)}>{children}</div>;
}

export function CodeToken({
  type,
  children,
}: {
  type:
    | "keyword"
    | "string"
    | "number"
    | "comment"
    | "punctuation"
    | "tag"
    | "attr-name"
    | "attr-value"
    | "function"
    | "operator"
    | "property"
    | "plain";
  children: React.ReactNode;
}) {
  const colorMap = {
    keyword: "text-[#ff7b72]",
    string: "text-[#a5d6ff]",
    number: "text-[#79c0ff]",
    comment: "text-[#8b949e]",
    punctuation: "text-[#c9d1d9]",
    tag: "text-[#7ee787]",
    "attr-name": "text-[#79c0ff]",
    "attr-value": "text-[#a5d6ff]",
    function: "text-[#d2a8ff]",
    operator: "text-[#ff7b72]",
    property: "text-[#79c0ff]",
    plain: "text-[#c9d1d9]",
  };

  return <span className={colorMap[type]}>{children}</span>;
}
