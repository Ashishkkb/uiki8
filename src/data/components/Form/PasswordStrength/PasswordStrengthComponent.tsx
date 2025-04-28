
import React from 'react';
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface PasswordRule {
  id: string;
  label: string;
  validator: (password: string) => boolean;
}

interface PasswordStrengthProps {
  password: string;
  className?: string;
  strengthMeterClassName?: string;
  ruleListClassName?: string;
  showRules?: boolean;
  rules?: PasswordRule[];
  strengthLabels?: string[];
  showLabels?: boolean;
  minLength?: number;
}

const defaultRules: PasswordRule[] = [
  {
    id: 'length',
    label: 'At least 8 characters',
    validator: (password: string) => password.length >= 8
  },
  {
    id: 'lowercase',
    label: 'Contains lowercase letter',
    validator: (password: string) => /[a-z]/.test(password)
  },
  {
    id: 'uppercase',
    label: 'Contains uppercase letter',
    validator: (password: string) => /[A-Z]/.test(password)
  },
  {
    id: 'number',
    label: 'Contains number',
    validator: (password: string) => /[0-9]/.test(password)
  },
  {
    id: 'special',
    label: 'Contains special character',
    validator: (password: string) => /[^A-Za-z0-9]/.test(password)
  }
];

const defaultStrengthLabels = ['Very weak', 'Weak', 'Medium', 'Strong', 'Very strong'];

const PasswordStrengthComponent: React.FC<PasswordStrengthProps> = ({
  password = "", // Provide default empty string to prevent undefined
  className,
  strengthMeterClassName,
  ruleListClassName,
  showRules = true,
  rules = defaultRules,
  strengthLabels = defaultStrengthLabels,
  showLabels = true,
  minLength = 0
}) => {
  // Skip strength calculation for very short passwords
  // Ensure password is a string before checking length
  if (!password || (typeof password === 'string' && password.length < minLength)) {
    return null;
  }

  // Calculate how many rules are met
  const ruleResults = rules.map(rule => ({
    ...rule,
    isMet: rule.validator(password)
  }));
  
  const passedRulesCount = ruleResults.filter(rule => rule.isMet).length;
  
  // Calculate the strength percentage based on rules passed
  const strengthPercentage = (passedRulesCount / rules.length) * 100;
  
  // Determine the strength level (0-4)
  let strengthLevel = 0;
  if (strengthPercentage >= 20) strengthLevel = 1;
  if (strengthPercentage >= 40) strengthLevel = 2;
  if (strengthPercentage >= 60) strengthLevel = 3;
  if (strengthPercentage >= 80) strengthLevel = 4;
  
  // Get the strength color based on level
  const getStrengthColor = (level: number) => {
    switch (level) {
      case 0: return "bg-red-500";
      case 1: return "bg-red-400";
      case 2: return "bg-yellow-500";
      case 3: return "bg-green-400";
      case 4: return "bg-green-500";
      default: return "bg-red-500";
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      {/* Strength meter */}
      <div className={cn("w-full space-y-2", strengthMeterClassName)}>
        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
          <div 
            className={cn("h-full transition-all duration-300", getStrengthColor(strengthLevel))}
            style={{ width: `${strengthPercentage}%` }}
          />
        </div>
        
        {showLabels && (
          <p className={cn(
            "text-xs font-medium",
            strengthLevel <= 1 ? "text-red-500" : 
            strengthLevel === 2 ? "text-yellow-500" : 
            "text-green-500"
          )}>
            {strengthLabels[strengthLevel]}
          </p>
        )}
      </div>
      
      {/* Password rules */}
      {showRules && (
        <ul className={cn("space-y-1 text-sm", ruleListClassName)}>
          {ruleResults.map(rule => (
            <li key={rule.id} className="flex items-center gap-2">
              {rule.isMet ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <X className="h-4 w-4 text-muted-foreground" />
              )}
              <span className={rule.isMet ? "text-foreground" : "text-muted-foreground"}>
                {rule.label}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PasswordStrengthComponent;
