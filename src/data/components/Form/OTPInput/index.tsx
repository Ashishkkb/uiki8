
import React from 'react';
import { ComponentItem } from "@/types/component";
import OTPInputComponent from "./OTPInputComponent";

const OTPInputComponentItem: ComponentItem = {
  id: "otp-input",
  name: "OTP Input",
  category: "Form",
  framework: "React",
  description: "A secure one-time password input component for verification codes with customizable layout",
  code: `import React, { useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";

interface OTPInputProps {
  length?: number;
  onComplete?: (value: string) => void;
  disabled?: boolean;
}

const OTPInput: React.FC<OTPInputProps> = ({ 
  length = 6, 
  onComplete,
  disabled = false
}) => {
  const [value, setValue] = useState("");
  
  const handleChange = (newValue: string) => {
    setValue(newValue);
    
    if (newValue.length === length && onComplete) {
      onComplete(newValue);
    }
  };
  
  return (
    <InputOTP
      maxLength={length}
      value={value}
      onChange={handleChange}
      disabled={disabled}
      render={({ slots }) => (
        <>
          <InputOTPGroup>
            {slots.slice(0, 3).map((slot, index) => (
              <InputOTPSlot key={index} {...slot} />
            ))}
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            {slots.slice(3, 6).map((slot, index) => (
              <InputOTPSlot key={index + 3} {...slot} />
            ))}
          </InputOTPGroup>
        </>
      )}
    />
  );
};

export default OTPInput;`,
  component: OTPInputComponent,
  tags: ["form", "input", "verification", "security"],
  isNew: true,
  fileSize: "2.5 KB",
  price: "0"
};

export default OTPInputComponentItem;
