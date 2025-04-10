
import { ComponentItem } from "@/types/component";
import PricingCardComponent from "./PricingCardComponent";

const PricingCardComponentItem: ComponentItem = {
  id: 207,
  name: "Pricing Card",
  description: "A pricing card component for displaying subscription tiers",
  category: "UI",
  component: PricingCardComponent,
  code: `import React from 'react';
import { Check, X, Info } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const PricingCard = ({
  title = "Basic",
  description = "All the basics for starting a new business",
  price = {
    monthly: 29,
    annually: 290,
    currency: "$",
    suffix: "/mo"
  },
  features = [
    { name: "Up to 5 users", included: true },
    { name: "Basic analytics", included: true },
    { name: "24/7 support", included: true },
    { name: "Custom branding", included: false, tooltip: "Available on higher tiers" },
    { name: "Advanced security", included: false }
  ],
  popular = false,
  buttonText = "Get Started",
  onButtonClick,
  className,
  interval = 'monthly'
}) => {
  const currentPrice = interval === 'monthly' ? price.monthly : (price.annually || price.monthly);
  const formattedPrice = \`\${price.currency || '$'}\${currentPrice}\`;

  return (
    <Card className={cn(
      "flex flex-col",
      popular && "border-primary shadow-md",
      className
    )}>
      {popular && (
        <div className="absolute -top-3 left-0 right-0 flex justify-center">
          <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}
      
      <CardHeader className={popular && "pt-8"}>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      
      <CardContent className="flex-1">
        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">{formattedPrice}</span>
            <span className="text-sm text-muted-foreground ml-1.5">{price.suffix}</span>
          </div>
        </div>
        
        <ul className="space-y-2.5">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              {feature.included ? (
                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
              ) : (
                <X className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
              )}
              
              <span className={!feature.included ? "text-muted-foreground" : ""}>
                {feature.name}
              </span>
              
              {feature.tooltip && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="ml-1">
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-xs">{feature.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button
          className="w-full"
          variant={popular ? "default" : "outline"}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};`,
  framework: "React",
  isNew: true,
  tags: ["pricing", "card", "subscription", "commerce"]
};

export default PricingCardComponentItem;
