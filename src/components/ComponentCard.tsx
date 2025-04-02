
import React from "react";
import { ComponentItem } from "@/types/component";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Code } from "lucide-react";

interface ComponentCardProps {
  component: ComponentItem;
  className?: string;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  component,
  className
}) => {
  const { name, description, tags, component: ComponentPreview, isNew } = component;

  return (
    <div className={cn(
      "group overflow-hidden rounded-xl border border-border/40 bg-card transition-all hover:shadow-md",
      className
    )}>
      {/* Preview area */}
      <div className="aspect-[16/9] relative flex items-center justify-center overflow-hidden bg-muted/40 p-6">
        <div className="w-full">
          {ComponentPreview && <ComponentPreview />}
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-foreground/5 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-foreground/10 px-2 py-1 text-xs font-medium backdrop-blur">
              View Component
            </span>
          </div>
        </div>
        {isNew && (
          <Badge className="absolute right-2 top-2 gap-1 bg-primary px-2">
            <Sparkles className="h-3 w-3" />
            NEW
          </Badge>
        )}
      </div>

      {/* Component info */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg">{name}</h3>
          <Code className="h-4 w-4 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{description}</p>

        {tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag, index) => (
              <div
                key={index}
                className="inline-flex items-center rounded-full border border-border/50 px-2 py-0.5 text-xs font-medium text-muted-foreground"
              >
                {tag}
              </div>
            ))}
            {tags.length > 3 && (
              <div className="inline-flex items-center rounded-full border border-border/50 px-2 py-0.5 text-xs font-medium text-muted-foreground">
                +{tags.length - 3} more
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentCard;
