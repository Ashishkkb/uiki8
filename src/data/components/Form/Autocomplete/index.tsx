
import React from 'react';
import { ComponentItem } from "@/types/component";
import AutocompleteComponent from "./AutocompleteComponent";

const AutocompleteComponentItem: ComponentItem = {
  id: 159,
  name: "Autocomplete",
  category: "Form",
  framework: "React",
  description: "An autocomplete input field with suggestions and filtering.",
  component: AutocompleteComponent,
  tags: ["form", "input", "autocomplete", "search", "filter"],
  isNew: true,
  fileSize: "2.5 KB",
  complexity: "medium",
  code: `import React, { useState, useRef, useEffect } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface AutocompleteOption {
  value: string;
  label: string;
}

interface AutocompleteProps {
  options: AutocompleteOption[];
  placeholder?: string;
  emptyMessage?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
  maxHeight?: number;
}

export const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  placeholder = "Search...",
  emptyMessage = "No results found.",
  value: externalValue,
  onValueChange,
  className,
  disabled = false,
  maxHeight = 300,
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState(externalValue || "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (externalValue !== undefined) {
      setValue(externalValue);
      const selectedOption = options.find(option => option.value === externalValue);
      if (selectedOption) {
        setInputValue(selectedOption.label);
      }
    }
  }, [externalValue, options]);

  const handleSelect = (currentValue: string) => {
    const selectedOption = options.find(option => option.value === currentValue);
    
    if (selectedOption) {
      setValue(currentValue);
      setInputValue(selectedOption.label);
      
      if (onValueChange) {
        onValueChange(currentValue);
      }
      
      setOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setOpen(true);
  };

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className={cn("relative", className)}>
      <Command
        className={cn(
          "border rounded-lg overflow-hidden", 
          open && "border-primary"
        )}
      >
        <CommandInput
          value={inputValue}
          onValueChange={setInputValue}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
          placeholder={placeholder}
          disabled={disabled}
          ref={inputRef}
        />

        {open && !disabled && (
          <div className="relative">
            <div 
              className="absolute top-0 left-0 right-0 z-50 bg-popover border rounded-b-lg shadow-md"
              style={{ maxHeight: maxHeight, overflowY: 'auto' }}
            >
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {filteredOptions.map(option => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={handleSelect}
                    className={cn(
                      "cursor-pointer",
                      value === option.value && "bg-primary/10"
                    )}
                  >
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          </div>
        )}
      </Command>
    </div>
  );
};

export default Autocomplete;`
};

export default AutocompleteComponentItem;
