
import React from "react";
import { cn } from "@/lib/utils";

export function HeroCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border/50 bg-background p-8 shadow-md",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-50" />
      <div className="absolute inset-0 grid grid-cols-12 gap-2 opacity-10 p-2">
        {Array.from({ length: 96 }).map((_, i) => (
          <div
            key={i}
            className="col-span-1 row-span-1 bg-foreground/5 rounded-full"
          ></div>
        ))}
      </div>
    </div>
  );
}
