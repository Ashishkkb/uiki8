
import React from 'react';
import { ComponentItem } from "@/types/component";
import PricingTable from './PricingTableComponent';

const PricingTableComponentItem: ComponentItem = {
  id: 107,
  name: "Animated Pricing Table",
  description: "Interactive pricing table with animations, billing toggle, and feature comparison",
  category: "UI",
  framework: "React",
  language: "TypeScript",
  tags: ["Pricing", "Table", "Comparison", "Animation", "Conversion"],
  isNew: true,
  component: () => <PricingTable />,
  code: `import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, X, CreditCard, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export interface PricingFeature {
  id: string;
  name: string;
  tiers?: {
    [key: string]: boolean | string | number;
  };
}

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  isMostPopular?: boolean;
  buttonText?: string;
  buttonVariant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  badge?: string;
  features?: {
    [key: string]: boolean | string | number;
  };
  cta?: {
    text: string;
    href: string;
  };
}

interface PricingTableProps {
  tiers: PricingTier[];
  features?: PricingFeature[];
  className?: string;
  includeToggle?: boolean;
  showFeaturesList?: boolean;
  animate?: boolean;
  compact?: boolean;
  currency?: string;
  yearlyDiscountPercentage?: number;
}

const PricingTable = ({
  tiers,
  features,
  className,
  includeToggle = true,
  showFeaturesList = true,
  animate = true,
  compact = false,
  currency = "$",
  yearlyDiscountPercentage = 20,
}: PricingTableProps) => {
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly');

  const toggleBillingInterval = () => {
    setBillingInterval(prev => prev === 'monthly' ? 'yearly' : 'monthly');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const checkmarkVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
  };

  const calculateYearlySavings = (monthlyPrice: number, yearlyPrice: number) => {
    const monthlyTotal = monthlyPrice * 12;
    const yearlyTotal = yearlyPrice;
    const savingsAmount = monthlyTotal - yearlyTotal;
    const savingsPercentage = (savingsAmount / monthlyTotal) * 100;
    return {
      amount: savingsAmount,
      percentage: savingsPercentage.toFixed(0)
    };
  };

  return (
    <div className={cn("w-full", className)}>
      {includeToggle && (
        <div className="flex justify-center items-center mb-8">
          <span className={cn(
            "mr-2 text-sm font-medium transition-colors",
            billingInterval === 'monthly' ? 'text-foreground' : 'text-muted-foreground'
          )}>
            Monthly
          </span>
          <Switch
            checked={billingInterval === 'yearly'}
            onCheckedChange={toggleBillingInterval}
          />
          <span className={cn(
            "ml-2 text-sm font-medium transition-colors",
            billingInterval === 'yearly' ? 'text-foreground' : 'text-muted-foreground'
          )}>
            Yearly
          </span>
          {billingInterval === 'yearly' && (
            <Badge variant="outline" className="ml-2 bg-green-500/10 text-green-600 border-green-200 dark:border-green-800">
              Save {yearlyDiscountPercentage}%
            </Badge>
          )}
        </div>
      )}

      <motion.div
        className={cn(
          "grid gap-6",
          compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-" + tiers.length
        )}
        variants={animate ? containerVariants : undefined}
        initial={animate ? "hidden" : undefined}
        animate={animate ? "visible" : undefined}
      >
        {tiers.map((tier) => {
          const price = billingInterval === 'monthly' ? tier.price.monthly : tier.price.yearly;
          const savings = calculateYearlySavings(tier.price.monthly, tier.price.yearly);
          
          return (
            <motion.div
              key={tier.id}
              className={cn(
                "relative flex flex-col rounded-xl border p-6",
                tier.isMostPopular ? "border-primary shadow-lg shadow-primary/10" : "border-border"
              )}
              variants={animate ? itemVariants : undefined}
            >
              {tier.isMostPopular && (
                <div className="absolute top-0 right-6 transform -translate-y-1/2">
                  <span className="bg-primary px-3 py-1 text-xs font-medium text-primary-foreground rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {tier.badge && (
                <Badge className="absolute top-6 right-6 bg-primary/10 text-primary">
                  {tier.badge}
                </Badge>
              )}

              <div className="mb-4">
                <h3 className="text-xl font-bold">{tier.name}</h3>
                <p className="mt-1 text-muted-foreground text-sm">{tier.description}</p>
              </div>

              <div className="mt-2 mb-6">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">{currency}{price}</span>
                  <span className="ml-1 text-muted-foreground">/{billingInterval === 'monthly' ? 'mo' : 'yr'}</span>
                </div>
                
                {billingInterval === 'yearly' && (
                  <p className="mt-1 text-xs text-green-600 dark:text-green-400">
                    Save {currency}{savings.amount} ({savings.percentage}%) with yearly billing
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-2 mt-2 mb-6">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-xs text-muted-foreground">
                    {billingInterval === 'monthly' ? 'Monthly' : 'Annual'} billing
                  </span>
                </div>
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-xs text-muted-foreground">
                    All major credit cards accepted
                  </span>
                </div>
              </div>

              {!compact && showFeaturesList && features && (
                <ul className="space-y-3 mt-6 mb-6 text-sm">
                  {features.map((feature) => {
                    const value = tier.features?.[feature.id];
                    const showValue = value !== undefined && value !== false;
                    
                    return (
                      <motion.li 
                        key={feature.id} 
                        className="flex items-start"
                        variants={checkmarkVariants}
                      >
                        {showValue ? (
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground mr-2 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={showValue ? "" : "text-muted-foreground"}>
                          {typeof value === 'string' || typeof value === 'number'
                            ? \`\${feature.name}: \${value}\`
                            : feature.name}
                        </span>
                      </motion.li>
                    );
                  })}
                </ul>
              )}

              <div className="mt-auto pt-6">
                <Button 
                  className="w-full"
                  variant={tier.buttonVariant || (tier.isMostPopular ? 'default' : 'outline')}
                >
                  {tier.buttonText || 'Choose plan'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                {tier.cta && (
                  <a 
                    href={tier.cta.href} 
                    className="mt-3 block text-center text-xs text-muted-foreground hover:underline"
                  >
                    {tier.cta.text}
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {compact && showFeaturesList && features && (
        <div className="mt-10 rounded-xl border border-border overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Feature</th>
                {tiers.map((tier) => (
                  <th key={tier.id} className="py-3 px-4 text-center font-medium">
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, idx) => (
                <tr key={feature.id} className={idx % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                  <td className="py-3 px-4 text-sm">{feature.name}</td>
                  {tiers.map((tier) => {
                    const value = tier.features?.[feature.id];
                    return (
                      <td key={tier.id} className="py-3 px-4 text-center">
                        {typeof value === 'boolean' ? (
                          value ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground mx-auto" />
                          )
                        ) : (
                          <span>{value}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const PricingTableDemo = () => {
  const tiers = [
    {
      id: 'basic',
      name: 'Basic',
      description: 'Essential features for individuals',
      price: {
        monthly: 15,
        yearly: 144,
      },
      isMostPopular: false,
      buttonText: 'Start with Basic',
      buttonVariant: 'outline' as const,
      features: {
        'storage': '10 GB',
        'users': 1,
        'support': true,
        'analytics': false,
        'custom-domain': false,
        'api-access': false,
      },
    },
    {
      id: 'pro',
      name: 'Professional',
      description: 'Ideal for small teams',
      price: {
        monthly: 30,
        yearly: 288,
      },
      isMostPopular: true,
      buttonText: 'Start with Pro',
      buttonVariant: 'default' as const,
      badge: 'Popular',
      features: {
        'storage': '100 GB',
        'users': 5,
        'support': true,
        'analytics': true,
        'custom-domain': true,
        'api-access': false,
      },
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Advanced features for larger teams',
      price: {
        monthly: 60,
        yearly: 576,
      },
      isMostPopular: false,
      buttonText: 'Contact Sales',
      buttonVariant: 'secondary' as const,
      features: {
        'storage': 'Unlimited',
        'users': 'Unlimited',
        'support': true,
        'analytics': true,
        'custom-domain': true,
        'api-access': true,
      },
      cta: {
        text: 'Need a custom plan? Contact us',
        href: '#',
      },
    },
  ];

  const features = [
    { id: 'storage', name: 'Storage' },
    { id: 'users', name: 'Team members' },
    { id: 'support', name: 'Priority support' },
    { id: 'analytics', name: 'Advanced analytics' },
    { id: 'custom-domain', name: 'Custom domain' },
    { id: 'api-access', name: 'API access' },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-sm text-muted-foreground mb-3">Card Layout</h3>
        <PricingTable 
          tiers={tiers} 
          features={features}
          animate={true}
          compact={false}
        />
      </div>
      
      <div>
        <h3 className="text-sm text-muted-foreground mb-3">Compact Table Layout</h3>
        <PricingTable 
          tiers={tiers} 
          features={features}
          animate={true}
          compact={true}
        />
      </div>
    </div>
  );
};

export default PricingTableDemo;`
};

export default PricingTableComponentItem;
