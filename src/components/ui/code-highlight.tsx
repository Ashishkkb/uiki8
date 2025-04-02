
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
      <div className="absolute inset-y-0 left-0 w-full bg-foreground/10 dark:bg-foreground/5 rounded-md" />
      <div className="relative">{children}</div>
    </div>
  );
}

export function CodeBlock({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative rounded-lg bg-muted p-4 font-mono text-sm text-muted-foreground overflow-x-auto",
        className
      )}
    >
      {children}
    </div>
  );
}
