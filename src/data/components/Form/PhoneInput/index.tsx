
import React from 'react';
import { ComponentItem } from "@/types/component";
import PhoneInputComponent from "./PhoneInputComponent";

const PhoneInputComponentItem: ComponentItem = {
  id: 161,
  name: "Phone Input",
  category: "Form",
  framework: "React",
  description: "A specialized input for phone numbers with formatting and validation.",
  component: PhoneInputComponent,
  tags: ["form", "input", "phone", "validation", "formatting"],
  isNew: true,
  fileSize: "2.3 KB",
  complexity: "medium",
  code: `import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface PhoneInputProps {
  value?: string;
  onChange?: (value: string, isValid: boolean) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  format?: "international" | "national";
  countryCode?: string;
  errorMessage?: string;
  id?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value = "",
  onChange,
  label,
  placeholder = "Enter phone number",
  className,
  required = false,
  disabled = false,
  format = "national",
  countryCode = "+1",
  errorMessage = "Please enter a valid phone number",
  id = "phone-input",
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
      validatePhoneNumber(value);
    }
  }, [value]);

  // Basic phone number validation
  const validatePhoneNumber = (phone: string) => {
    // Remove all non-digit characters for validation
    const digitsOnly = phone.replace(/\\D/g, "");
    
    // Simple validation - adjust as needed based on country or format requirements
    const valid = format === "international" 
      ? digitsOnly.length >= 8 && digitsOnly.length <= 15
      : digitsOnly.length === 10;
    
    setIsValid(valid);
    return valid;
  };

  const formatPhoneNumber = (phone: string) => {
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\\D/g, "");
    
    if (format === "national" && digitsOnly.length <= 10) {
      // Format as (123) 456-7890
      if (digitsOnly.length <= 3) {
        return digitsOnly;
      } else if (digitsOnly.length <= 6) {
        return \`(\${digitsOnly.slice(0, 3)}) \${digitsOnly.slice(3)}\`;
      } else {
        return \`(\${digitsOnly.slice(0, 3)}) \${digitsOnly.slice(3, 6)}-\${digitsOnly.slice(6, 10)}\`;
      }
    } else if (format === "international") {
      // Just prepend country code
      return digitsOnly ? \`\${countryCode} \${digitsOnly}\` : "";
    }
    
    return phone;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formatted = formatPhoneNumber(rawValue);
    const valid = validatePhoneNumber(rawValue);
    
    setInputValue(formatted);
    
    if (onChange) {
      onChange(formatted, valid);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={id}>
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Input
        id={id}
        type="tel"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(!isValid && inputValue !== "" && "border-red-500")}
      />
      {!isValid && inputValue !== "" && (
        <p className="text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default PhoneInput;`
};

export default PhoneInputComponentItem;
