
import React from "react";
import { cn } from "@/lib/utils";
import { GridPattern } from "./grid-pattern";

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
      <GridPattern
        className="absolute inset-0 opacity-50"
        stroke="currentColor"
      />
    </div>
  );
}
