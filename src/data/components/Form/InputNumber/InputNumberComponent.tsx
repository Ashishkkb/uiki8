
import React from 'react';
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown } from "lucide-react";

interface InputNumberProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  controls?: boolean;
  label?: string;
  id?: string;
  name?: string;
  required?: boolean;
  formatter?: (value: number) => string;
  parser?: (value: string) => number;
}

const InputNumberComponent: React.FC<InputNumberProps> = ({
  value = 0, // Provide default value to prevent undefined
  onChange,
  min,
  max,
  step = 1,
  disabled = false,
  className,
  inputClassName,
  placeholder,
  controls = true,
  label,
  id,
  name,
  required = false,
  formatter = (val) => val?.toString() || "0", // Add null check
  parser = (val) => parseFloat(val)
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    
    if (rawValue === '') {
      onChange(0);
      return;
    }
    
    const parsedValue = parser(rawValue);
    
    if (isNaN(parsedValue)) {
      return;
    }
    
    setValue(parsedValue);
  };
  
  const handleIncrement = () => {
    setValue(value + step);
  };
  
  const handleDecrement = () => {
    setValue(value - step);
  };
  
  const setValue = (newValue: number) => {
    let finalValue = newValue;
    
    if (min !== undefined && finalValue < min) {
      finalValue = min;
    }
    
    if (max !== undefined && finalValue > max) {
      finalValue = max;
    }
    
    onChange(finalValue);
  };

  return (
    <div className={cn("relative", className)}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium mb-2">
          {label} {required && <span className="text-destructive">*</span>}
        </label>
      )}
      
      <div className="flex">
        <input
          type="text"
          id={id}
          name={name}
          value={formatter(value)}
          onChange={handleChange}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            controls && "rounded-r-none",
            inputClassName
          )}
        />
        
        {controls && (
          <div className="inline-flex flex-col border border-l-0 border-input rounded-r-md">
            <button
              type="button"
              onClick={handleIncrement}
              disabled={disabled || (max !== undefined && value >= max)}
              className="flex items-center justify-center h-5 w-6 bg-muted/50 hover:bg-muted text-muted-foreground border-b border-input rounded-tr-md disabled:opacity-50"
              title="Increase value"
            >
              <ChevronUp className="h-3 w-3" />
            <button
              type="button"
              onClick={handleDecrement}
              disabled={disabled || (min !== undefined && value <= min)}
              className="flex items-center justify-center h-5 w-6 bg-muted/50 hover:bg-muted text-muted-foreground rounded-br-md disabled:opacity-50"
              title="Decrease value"
            >
              <ChevronDown className="h-3 w-3" />
            </button>
            </button>
          </div>
        )}
      </div>
      
      {min !== undefined && max !== undefined && (
        <div className="mt-1 text-xs text-muted-foreground">
          Range: {min} - {max}
        </div>
      )}
    </div>
  );
};

export default InputNumberComponent;
