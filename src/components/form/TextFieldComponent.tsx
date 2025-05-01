import React, { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type HTMLInputType = 
  | "text" | "password" | "email" | "number" 
  | "tel" | "url" | "search" | "date" 
  | "time" | "datetime-local";

interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  type?: HTMLInputType;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  inputClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({
  label,
  type = "text",
  error,
  helperText,
  startIcon,
  endIcon,
  required,
  disabled,
  fullWidth = false,
  className,
  inputClassName,
  labelClassName,
  containerClassName,
  id = `input-${Math.random().toString(36).slice(2)}`,
  ...props
}, ref) => {
  return (
    <div 
      className={cn(
        "space-y-2",
        fullWidth ? "w-full" : "w-auto",
        containerClassName
      )}
    >
      {label && (
        <Label 
          htmlFor={id} 
          className={cn(
            "flex items-center gap-1",
            disabled && "opacity-50",
            labelClassName
          )}
        >
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      
      <div className="relative">
        {startIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {startIcon}
          </div>
        )}
        
        <Input
          ref={ref}
          id={id}
          type={type}
          disabled={disabled}
          required={required}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          className={cn(
            startIcon && "pl-10",
            endIcon && "pr-10",
            error && "border-destructive focus-visible:ring-destructive",
            inputClassName,
            className
          )}
          {...props}
        />
        
        {endIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {endIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p 
          id={`${id}-error`}
          className="text-destructive text-sm"
          role="alert"
        >
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p 
          id={`${id}-helper`}
          className="text-muted-foreground text-sm"
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

TextField.displayName = "TextField";

export default TextField;
