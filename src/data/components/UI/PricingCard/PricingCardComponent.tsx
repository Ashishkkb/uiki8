
import React from 'react';
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

interface PricingFeature {
  name: string;
  included: boolean;
  tooltip?: string;
}

interface PricingCardProps {
  title: string;
  description?: string;
  price: {
    monthly: number | string;
    annually?: number | string;
    currency?: string;
    suffix?: string;
  };
  features: PricingFeature[];
  popular?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
  interval?: 'monthly' | 'annually';
}

const PricingCardComponent: React.FC<PricingCardProps> = ({
  title,
  description,
  price = { monthly: 0, currency: '$', suffix: '/mo' }, // Provide default price object
  features = [], // Provide default empty array for features
  popular = false,
  buttonText = "Get Started",
  onButtonClick,
  className,
  interval = 'monthly'
}) => {
  // Add null check for price
  const currentPrice = price && interval === 'monthly' ? price.monthly : (price?.annually || price?.monthly);
  const currency = price?.currency || '$';
  const suffix = price?.suffix || (interval === 'monthly' ? '/mo' : '/yr');

  // Format price to handle string or number
  const formattedPrice = typeof currentPrice === 'number' 
    ? `${currency}${currentPrice}` 
    : currentPrice;

  return (
    <Card className={cn(
      "flex flex-col",
      popular && "border-primary shadow-md shadow-primary/10",
      className
    )}>
      {popular && (
        <div className="absolute -top-3 left-0 right-0 flex justify-center">
          <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}
      
      <CardHeader className={cn(
        popular && "pt-8"
      )}>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      
      <CardContent className="flex-1">
        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">{formattedPrice}</span>
            <span className="text-sm text-muted-foreground ml-1.5">{suffix}</span>
          </div>
        </div>
        
        <ul className="space-y-2.5">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              {feature.included ? (
                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              ) : (
                <X className="h-4 w-4 text-muted-foreground mr-2 mt-0.5 flex-shrink-0" />
              )}
              
              <span className={cn(
                "text-sm",
                !feature.included && "text-muted-foreground"
              )}>
                {feature.name}
              </span>
              
              {feature.tooltip && (
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="ml-1 inline-flex">
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
          className={cn("w-full", popular ? 'bg-primary' : '')}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCardComponent;
