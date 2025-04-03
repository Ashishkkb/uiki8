
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
}: {
  className?: string;
  children: React.ReactNode;
  language?: string;
}) {
  // Generate a VSCode-style filename tab
  const fileName = `Example.${language}`;

  return (
    <div
      className={cn(
        "relative rounded-lg border border-border/30 shadow-sm overflow-hidden",
        className
      )}
    >
      {/* VSCode-style top bar */}
      <div className="flex items-center bg-[#252526] px-4 py-2 border-b border-border/20">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium text-[#d4d4d4] opacity-80">{fileName}</span>
        </div>
      </div>
      
      {/* Code content */}
      <div className="bg-[#1e1e1e] p-4 font-mono text-sm text-[#d4d4d4] overflow-x-auto">
        {children}
      </div>
    </div>
  );
}
