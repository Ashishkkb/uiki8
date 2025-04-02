
"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function AnimatedGradientBackground({
  className,
  containerClassName,
  children,
}: {
  className?: string;
  containerClassName?: string;
  children?: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      container.style.setProperty("--x-pos", `${x * 100}%`);
      container.style.setProperty("--y-pos", `${y * 100}%`);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-background",
        containerClassName
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-0 transition-opacity duration-300",
          "bg-[radial-gradient(circle_at_var(--x-pos,_25%)_var(--y-pos,_25%),rgba(120,_119,_198,_0.15)_10%,rgba(255,_255,_255,_0)_50%)]",
          "dark:bg-[radial-gradient(circle_at_var(--x-pos,_25%)_var(--y-pos,_25%),rgba(120,_119,_198,_0.15)_10%,rgba(0,_0,_0,_0)_50%)]",
          className
        )}
      />
      {children}
    </div>
  );
}
