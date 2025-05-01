
import React, { useState } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'br', label: 'Brazil' },
  { value: 'in', label: 'India' },
  { value: 'cn', label: 'China' },
];

const AutocompleteComponent = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleSelect = (currentValue: string) => {
    const selectedOption = countries.find(option => option.value === currentValue);
    
    if (selectedOption) {
      setValue(currentValue);
      setInputValue(selectedOption.label);
      setOpen(false);
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setOpen(true);
  };

  const filteredOptions = countries.filter(option =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="w-[280px]">
      <Command 
        className={cn(
          "border rounded-lg overflow-visible", 
          open && "border-primary"
        )}
      >
        <CommandInput
          value={inputValue}
          onValueChange={handleInputChange}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
          placeholder="Search countries..."
        />

        {open && (
          <div className="relative">
            <div className="absolute top-0 left-0 right-0 z-50 bg-popover border rounded-b-lg shadow-md" style={{ maxHeight: 300, overflowY: 'auto' }}>
              <CommandEmpty>No country found.</CommandEmpty>
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

export default AutocompleteComponent;
