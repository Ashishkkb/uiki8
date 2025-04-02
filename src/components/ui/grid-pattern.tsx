
import React from "react";
import { cn } from "@/lib/utils";

export function GridPattern({
  width = 100,
  height = 100,
  className,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  width?: number;
  height?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      width={width}
      height={height}
      className={cn("absolute inset-0 z-0", className)}
      {...props}
    >
      <defs>
        <pattern
          id="grid-pattern"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
          x="50%"
          y="50%"
          patternTransform="translate(-12 -12)"
        >
          <path
            d="M.5 0v24M24 .5H0"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  );
}
