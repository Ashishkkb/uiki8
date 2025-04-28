
import React from 'react';
import { ComponentItem } from "@/types/component";
import OTPInputComponent from "./OTPInputComponent";

const OTPInputComponentItem: ComponentItem = {
  id: 151,
  name: "OTP Input",
  category: "Form",
  framework: "React",
  description: "A specialized input for one-time passwords and verification codes.",
  component: OTPInputComponent,
  tags: ["form", "input", "verification", "otp"],
  isNew: true,
  fileSize: "1.8 KB",
  complexity: "medium",
  code: `import React, { useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "./input-otp";

interface OTPInputProps {
  length?: number;
  onComplete?: (value: string) => void;
}

export const OTPInput = ({ 
  length = 6, 
  onComplete 
}) => {
  const [value, setValue] = useState("");
  
  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    if (newValue.length === length && onComplete) {
      onComplete(newValue);
    }
  };
  
  return (
    <InputOTP
      maxLength={length}
      value={value}
      onChange={handleValueChange}
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
};`
};

export default OTPInputComponentItem;
