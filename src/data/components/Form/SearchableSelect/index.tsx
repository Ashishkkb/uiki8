import React from 'react';
import { ComponentItem } from "@/types/component";
import SearchableSelect from "@/components/form/SearchableSelect";
import { useState } from "react";

const SearchableSelectComponent: ComponentItem = {
  id: 404,
  name: "Searchable Select",
  category: "Form",
  framework: "React",
  description: "An enhanced select component with search functionality and multi-select support",
  code: `import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Search, ChevronDown, ChevronUp, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface SearchableSelectProps {
  options: SelectOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  maxHeight?: number;
  noOptionsMessage?: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select option",
  label,
  error,
  required = false,
  disabled = false,
  id,
  className,
  multiple = false,
  searchable = true,
  clearable = true,
  maxHeight = 300,
  noOptionsMessage = "No options found"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedValues, setSelectedValues] = useState<string[]>(() => {
    if (multiple) {
      return Array.isArray(value) ? value : value ? [value] : [];
    } else {
      return value ? (typeof value === 'string' ? [value] : value) : [];
    }
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const uniqueId = id || \`select-\${Math.random().toString(36).substring(2, 9)}\`;

  useEffect(() => {
    if (multiple) {
      setSelectedValues(Array.isArray(value) ? value : value ? [value as string] : []);
    } else {
      setSelectedValues(value ? (typeof value === 'string' ? [value] : value) : []);
    }
  }, [value, multiple]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      if (searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    } else {
      setSearchQuery("");
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, searchable]);

  const filteredOptions = searchQuery
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  const handleToggleOption = (optionValue: string) => {
    if (disabled) return;
    
    let newSelectedValues: string[];

    if (multiple) {
      if (selectedValues.includes(optionValue)) {
        newSelectedValues = selectedValues.filter((val) => val !== optionValue);
      } else {
        newSelectedValues = [...selectedValues, optionValue];
      }
    } else {
      newSelectedValues = [optionValue];
      setIsOpen(false);
    }

    setSelectedValues(newSelectedValues);
    
    if (onChange) {
      onChange(multiple ? newSelectedValues : newSelectedValues[0] || "");
    }
  };

  const handleClearAll = () => {
    if (disabled) return;
    
    setSelectedValues([]);
    if (onChange) {
      onChange(multiple ? [] : "");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const getSelectionText = () => {
    if (selectedValues.length === 0) return placeholder;

    if (multiple) {
      if (selectedValues.length === 1) {
        const option = options.find((opt) => opt.value === selectedValues[0]);
        return option ? option.label : placeholder;
      }
      return \`\${selectedValues.length} item\${selectedValues.length > 1 ? "s" : ""} selected\`;
    } else {
      const option = options.find((opt) => opt.value === selectedValues[0]);
      return option ? option.label : placeholder;
    }
  };

  return (
    <div className={cn("space-y-2 w-full", className)} ref={containerRef}>
      {label && (
        <Label htmlFor={uniqueId} className="flex items-center gap-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </Label>
      )}

      <div className="relative">
        <Button
          id={uniqueId}
          type="button"
          variant="outline"
          className={cn(
            "w-full flex justify-between items-center font-normal",
            disabled && "opacity-50 cursor-not-allowed",
            error && "border-red-500 focus-visible:ring-red-500",
            isOpen && "border-primary"
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <span className="truncate text-left">
            {getSelectionText()}
          </span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>

        {isOpen && (
          <div
            className="absolute z-50 w-full mt-1 bg-popover rounded-md border shadow-md overflow-hidden"
            onKeyDown={handleKeyDown}
          >
            {searchable && (
              <div className="p-2 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-full focus-visible:ring-1"
                  />
                  {searchQuery && (
                    <X
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground"
                      onClick={() => setSearchQuery("")}
                    />
                  )}
                </div>
              </div>
            )}

            <div
              className="overflow-auto"
              style={{ maxHeight: \`\${maxHeight}px\` }}
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => {
                  const isSelected = selectedValues.includes(option.value);
                  
                  return (
                    <div
                      key={option.value}
                      className={cn(
                        "px-3 py-2 cursor-pointer flex items-center hover:bg-accent/50",
                        option.disabled && "opacity-50 cursor-not-allowed",
                        isSelected && "bg-accent"
                      )}
                      onClick={() => !option.disabled && handleToggleOption(option.value)}
                    >
                      {multiple && (
                        <div
                          className={cn(
                            "mr-2 h-4 w-4 rounded border flex items-center justify-center",
                            isSelected
                              ? "bg-primary border-primary text-primary-foreground"
                              : "border-input"
                          )}
                        >
                          {isSelected && <Check className="h-3 w-3" />}
                        </div>
                      )}
                      
                      <div className="flex flex-col">
                        <span>{option.label}</span>
                        {option.description && (
                          <span className="text-xs text-muted-foreground">
                            {option.description}
                          </span>
                        )}
                      </div>

                      {!multiple && isSelected && (
                        <Check className="ml-auto h-4 w-4" />
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="px-3 py-4 text-center text-muted-foreground">
                  {noOptionsMessage}
                </div>
              )}
            </div>

            {multiple && clearable && selectedValues.length > 0 && (
              <div className="p-2 border-t bg-muted/20">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs h-8"
                  onClick={handleClearAll}
                >
                  Clear All
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export default SearchableSelect;`,
  component: () => {
    const [value, setValue] = useState<string>("");
    const [multiValue, setMultiValue] = useState<string[]>([]);
    
    const handleChange = (val: string) => {
      setValue(val);
    };
    
    const handleMultiChange = (vals: string[]) => {
      setMultiValue(vals);
    };
    
    const countries = [
      { value: "us", label: "United States", description: "North America" },
      { value: "ca", label: "Canada", description: "North America" },
      { value: "mx", label: "Mexico", description: "North America" },
      { value: "uk", label: "United Kingdom", description: "Europe" },
      { value: "fr", label: "France", description: "Europe" },
      { value: "de", label: "Germany", description: "Europe" },
      { value: "jp", label: "Japan", description: "Asia" },
      { value: "cn", label: "China", description: "Asia" },
      { value: "in", label: "India", description: "Asia" },
      { value: "au", label: "Australia", description: "Oceania" },
      { value: "br", label: "Brazil", description: "South America" },
      { value: "za", label: "South Africa", description: "Africa" }
    ];
    
    return (
      <div className="max-w-md space-y-8">
        <div>
          <h3 className="text-sm font-medium mb-2">Single Select</h3>
          <SearchableSelect
            options={countries}
            value={value}
            onChange={val => handleChange(val as string)}
            label="Select a country"
            placeholder="Choose a country"
            required
          />
          <div className="text-sm mt-2">
            Selected: <span className="font-medium">{value || "None"}</span>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Multi Select</h3>
          <SearchableSelect
            options={countries}
            value={multiValue}
            onChange={vals => handleMultiChange(vals as string[])}
            label="Select multiple countries"
            placeholder="Choose countries"
            multiple
            required
          />
          <div className="text-sm mt-2">
            Selected: <span className="font-medium">{multiValue.length ? multiValue.join(", ") : "None"}</span>
          </div>
        </div>
      </div>
    );
  },
  tags: ["form", "select", "dropdown", "search", "filter", "multi-select"],
  fileSize: "8.2 KB",
  price: "Free",
  isNew: true
};

export default SearchableSelectComponent;
