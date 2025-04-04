
import React from 'react';
import { ComponentItem } from "@/types/component";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonComponentData: ComponentItem = {
  id: 405,
  name: "Skeleton",
  category: "UI",
  framework: "React",
  description: "Used to show a placeholder while content is loading",
  code: `import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }`,
  component: () => (
    <div className="flex flex-col space-y-3">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </div>
  ),
  tags: ["ui", "skeleton", "loading", "placeholder"],
  fileSize: "0.3 KB",
  price: "Free",
  complexity: "simple",
  lastUpdated: "2023-12-09"
};

export default SkeletonComponentData;
