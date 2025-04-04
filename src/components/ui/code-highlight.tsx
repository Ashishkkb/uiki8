
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
      </div>
      
      {/* Code content */}
      <div className="bg-[#0d1117] p-4 font-mono text-sm text-[#e6edf3] overflow-x-auto">
        {children}
      </div>
    </div>
  );
}
