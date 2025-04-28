
import React from 'react';
import { cn } from "@/lib/utils";
import { Check, Minus, X } from "lucide-react";

export interface Feature {
  id: string;
  name: string;
  description?: string;
  category?: string;
}

export interface ComparisonPlan {
  id: string;
  name: string;
  price: string;
  description?: string;
  isPopular?: boolean;
  features: Record<string, boolean | string | null>;
}

interface FeatureComparisonProps {
  features: Feature[];
  plans: ComparisonPlan[];
  className?: string;
  categorized?: boolean;
  hideEmptyRows?: boolean;
  renderCheck?: (value: boolean | string | null) => React.ReactNode;
  renderPlanHeader?: (plan: ComparisonPlan) => React.ReactNode;
}

const FeatureComparisonComponent: React.FC<FeatureComparisonProps> = ({
  features = [],
  plans = [],
  className,
  categorized = false,
  hideEmptyRows = false,
  renderCheck,
  renderPlanHeader
}) => {
  // Early return if there are no features or plans
  if (!features?.length || !plans?.length) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No comparison data available
      </div>
    );
  }

  const renderFeatureValue = (value: boolean | string | null) => {
    if (renderCheck) {
      return renderCheck(value);
    }
    
    if (value === true) {
      return <Check className="h-5 w-5 text-green-500" />;
    }
    
    if (value === false) {
      return <X className="h-5 w-5 text-red-500" />;
    }
    
    if (value === null) {
      return <Minus className="h-5 w-5 text-muted-foreground" />;
    }
    
    return <span className="text-sm">{value}</span>;
  };

  const categories = categorized && features.length > 0
    ? Array.from(new Set(features.map(f => f.category || 'General').filter(Boolean)))
    : ['Features'];

  const renderFeatureRow = (feature: Feature) => {
    // Check if row should be hidden (when all plans have false for this feature)
    if (hideEmptyRows) {
      const hasValue = plans.some(plan => {
        const value = plan.features[feature.id];
        return value !== false && value !== null;
      });
      
      if (!hasValue) return null;
    }
    
    return (
      <tr key={feature.id} className="border-b border-border/50">
        <td className="py-4 px-4 text-sm">
          <div className="font-medium">{feature.name}</div>
          {feature.description && (
            <div className="text-xs text-muted-foreground mt-0.5">{feature.description}</div>
          )}
        </td>
        
        {plans.map((plan) => (
          <td 
            key={`${feature.id}-${plan.id}`} 
            className={cn(
              "py-4 px-4 text-center",
              plan.isPopular ? "bg-primary/5" : ""
            )}
          >
            {renderFeatureValue(plan.features[feature.id])}
          </td>
        ))}
      </tr>
    );
  };

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted/30">
            <th className="p-4 text-left"></th>
            
            {plans.map((plan) => (
              <th 
                key={plan.id} 
                className={cn(
                  "p-4 relative",
                  plan.isPopular ? "bg-primary/5" : ""
                )}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 inset-x-0 mx-auto w-max px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                    Popular
                  </div>
                )}
                
                {renderPlanHeader ? (
                  renderPlanHeader(plan)
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="font-bold text-lg">{plan.name}</div>
                    <div className="font-bold text-2xl mt-1">{plan.price}</div>
                    {plan.description && (
                      <div className="text-xs text-muted-foreground mt-1">{plan.description}</div>
                    )}
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        
        <tbody>
          {categories.map((category) => (
            <React.Fragment key={category}>
              {categorized && (
                <tr className="bg-muted/20">
                  <td 
                    colSpan={plans.length + 1} 
                    className="py-2 px-4 font-semibold text-sm text-muted-foreground"
                  >
                    {category}
                  </td>
                </tr>
              )}
              
              {features
                .filter(f => categorized ? (f.category || 'General') === category : true)
                .map(renderFeatureRow)}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeatureComparisonComponent;
