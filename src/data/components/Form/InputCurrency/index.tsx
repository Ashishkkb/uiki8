
import React from 'react';
import { ComponentItem } from "@/types/component";
import InputCurrencyComponent from "./InputCurrencyComponent";

const InputCurrencyComponentItem: ComponentItem = {
  id: 129,
  name: "Input Currency",
  category: "Form",
  framework: "React",
  description: "A specialized input component for handling currency values with formatting and validation.",
  code: `import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface InputCurrencyProps {
  value: number | string;
  onChange: (value: number) => void;
  currency?: string;
  locale?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  required?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  precision?: number;
  min?: number;
  max?: number;
}

const InputCurrency: React.FC<InputCurrencyProps> = ({
  value,
  onChange,
  currency = 'USD',
  locale = 'en-US',
  placeholder = '0.00',
  className,
  disabled = false,
  id,
  name,
  required = false,
  prefix,
  suffix,
  precision = 2,
  min,
  max
}) => {
  const [displayValue, setDisplayValue] = useState<string>('');
  
  // Format number for display
  useEffect(() => {
    if (value === '' || value === undefined) {
      setDisplayValue('');
      return;
    }

    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) {
      setDisplayValue('');
      return;
    }

    const formatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision
    });
    
    setDisplayValue(formatter.format(numValue));
  }, [value, locale, precision]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strip non-numeric characters except decimal point
    const inputValue = e.target.value.replace(/[^\\d.]/g, '');
    
    // Parse the cleaned input as a float
    const numValue = inputValue === '' ? 0 : parseFloat(inputValue);
    
    // Handle min/max constraints
    let constrainedValue = numValue;
    if (min !== undefined && numValue < min) constrainedValue = min;
    if (max !== undefined && numValue > max) constrainedValue = max;
    
    // Update with the parsed value
    onChange(constrainedValue);
  };

  const getCurrencySymbol = () => {
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
        .format(0)
        .replace(/\\d/g, '')
        .trim();
    } catch (e) {
      return currency;
    }
  };

  return (
    <div className="relative">
      {prefix && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          {prefix}
        </div>
      )}
      
      {!prefix && currency && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
          {getCurrencySymbol()}
        </div>
      )}
      
      <input
        type="text"
        id={id}
        name={name}
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          (prefix || currency) && "pl-9", 
          suffix && "pr-9",
          className
        )}
      />
      
      {suffix && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {suffix}
        </div>
      )}
    </div>
  );
};

export default InputCurrency;`,
  component: InputCurrencyComponent,
  tags: ["Form", "input", "currency", "money", "number"],
  isNew: true,
  fileSize: "3.2 KB",
  complexity: "medium"
};

export default InputCurrencyComponentItem;
