
import React, { useState } from "react";
import { ComponentItem } from "@/types/component";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CodeSnippet from "./CodeSnippet";
import { Code, X } from "lucide-react";

interface ComponentCardProps {
  component: ComponentItem;
}

const ComponentCard: React.FC<ComponentCardProps> = ({ component }) => {
  const [showCode, setShowCode] = useState(false);
  const ComponentPreview = component.component;
  
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{component.name}</CardTitle>
            <CardDescription className="text-sm line-clamp-2 mt-1">
              {component.description}
            </CardDescription>
          </div>
          
          {component.isNew && (
            <Badge variant="default" className="ml-2">New</Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="bg-muted/40 rounded-md p-4 min-h-24 flex items-center justify-center">
          <ComponentPreview />
        </div>
        
        {showCode && (
          <div className="mt-4">
            <CodeSnippet code={component.code} />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex items-center justify-between pt-0 pb-3 px-6">
        <div className="flex items-center gap-2">
          {component.tags?.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowCode(!showCode)}
        >
          {showCode ? (
            <>
              <X className="mr-1 h-3 w-3" /> Hide Code
            </>
          ) : (
            <>
              <Code className="mr-1 h-3 w-3" /> View Code
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ComponentCard;
