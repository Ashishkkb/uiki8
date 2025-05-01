import React, { forwardRef } from 'react';
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from 'lucide-react';
import { Select as UISelect, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator } from "@/components/ui/select";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
  icon?: React.ReactNode;
}

export interface SelectGroup {
  label: string;
  options: SelectOption[];
}

interface SelectProps {
  options: (SelectOption | SelectGroup)[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  label?: string;
  helperText?: string;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  position?: 'item-aligned' | 'popper';
  onChange?: (value: string) => void;
}

const SIZE_STYLES = {
  sm: "h-8 text-sm",
  md: "h-10 text-base",
  lg: "h-12 text-lg"
} as const;

const Select = forwardRef<HTMLButtonElement, SelectProps>(({
  options,
  value,
  defaultValue,
  placeholder = "Select an option",
  disabled,
  required,
  error,
  label,
  helperText,
  className,
  triggerClassName,
  contentClassName,
  size = 'md',
  fullWidth = false,
  position = 'item-aligned',
  onChange
}, ref) => {
  const isGrouped = options.length > 0 && 'options' in options[0];

  return (
    <div className={cn("space-y-2", fullWidth && "w-full", className)}>
      {label && (
        <label className="text-sm font-medium flex items-center gap-1">
          {label}
          {required && <span className="text-destructive">*</span>}
        </label>
      )}

      <UISelect
        value={value}
        defaultValue={defaultValue}
        onValueChange={onChange}
        disabled={disabled}
        required={required}
      >
        <SelectTrigger 
          ref={ref}
          className={cn(
            SIZE_STYLES[size],
            error && "border-destructive focus:ring-destructive",
            fullWidth && "w-full",
            triggerClassName
          )}
        >
          <SelectValue placeholder={placeholder} />
          <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectTrigger>

        <SelectContent
          position={position}
          className={cn("min-w-[200px]", contentClassName)}
        >
          {isGrouped ? (
            (options as SelectGroup[]).map((group, index) => (
              <React.Fragment key={group.label}>
                {index > 0 && <SelectSeparator />}
                <SelectGroup>
                  <SelectLabel>{group.label}</SelectLabel>
                  {group.options.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                      className="flex items-center gap-2"
                    >
                      {option.icon}
                      <div>
                        <div>{option.label}</div>
                        {option.description && (
                          <div className="text-xs text-muted-foreground">
                            {option.description}
                          </div>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </React.Fragment>
            ))
          ) : (
            (options as SelectOption[]).map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="flex items-center gap-2"
              >
                {option.icon}
                <div>
                  <div>{option.label}</div>
                  {option.description && (
                    <div className="text-xs text-muted-foreground">
                      {option.description}
                    </div>
                  )}
                </div>
              </SelectItem>
            ))
          )}
        </SelectContent>
      </UISelect>

      {(error || helperText) && (
        <p className={cn(
          "text-sm",
          error ? "text-destructive" : "text-muted-foreground"
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Select.displayName = "Select";

export default Select;