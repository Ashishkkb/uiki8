
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const PhoneInputComponent = () => {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  // Basic phone number validation
  const validatePhoneNumber = (phone: string) => {
    // Remove all non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, "");
    
    // Simple validation for US numbers
    const valid = digitsOnly.length === 10;
    
    setIsValid(valid);
    return valid;
  };

  const formatPhoneNumber = (phone: string) => {
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, "");
    
    // Format as (123) 456-7890
    if (digitsOnly.length <= 3) {
      return digitsOnly;
    } else if (digitsOnly.length <= 6) {
      return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3)}`;
    } else {
      return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6, 10)}`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formatted = formatPhoneNumber(rawValue);
    const valid = validatePhoneNumber(rawValue);
    
    setValue(formatted);
    setIsValid(valid || formatted === '');
  };

  return (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor="phone">Phone Number</Label>
      <Input
        id="phone"
        type="tel"
        value={value}
        onChange={handleChange}
        placeholder="(555) 123-4567"
        className={cn(!isValid && value !== "" && "border-red-500")}
      />
      {!isValid && value !== "" && (
        <p className="text-xs text-red-500">Please enter a valid phone number</p>
      )}
    </div>
  );
};

export default PhoneInputComponent;
