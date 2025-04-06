
import React from 'react';
import { ComponentItem } from "@/types/component";
import OTPInputComponent from "./OTPInputComponent";

const OTPInputComponentItem: ComponentItem = {
  id: 111,
  name: "OTP Input",
  category: "Form",
  framework: "React",
  description: "A one-time password input component for verification codes with support for auto-tabbing and pasting.",
  code: `import React, { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface OTPInputProps {
  length?: number;
  onComplete?: (code: string) => void;
  onChange?: (code: string) => void;
  className?: string;
  containerClassName?: string;
  inputClassName?: string;
  isNumberInput?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  value?: string;
  placeholder?: string;
  inputType?: 'text' | 'password';
  renderSeparator?: React.ReactNode;
  disableAutoTab?: boolean;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  onComplete,
  onChange,
  className,
  containerClassName,
  inputClassName,
  isNumberInput = true,
  autoFocus = true,
  disabled = false,
  value = "",
  placeholder = "",
  inputType = "text",
  renderSeparator,
  disableAutoTab = false
}) => {
  const [activeInput, setActiveInput] = useState(0);
  const [otpValues, setOTPValues] = useState(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Set initial value if provided
  useEffect(() => {
    if (value) {
      const valueArray = value.split("").slice(0, length);
      setOTPValues([...valueArray, ...Array(length - valueArray.length).fill("")]);
    }
  }, [value, length]);

  // Focus on first input when component mounts
  useEffect(() => {
    if (autoFocus && !disabled && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus, disabled]);

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    let newValue = val;
    
    if (isNumberInput) {
      newValue = val.replace(/\\D/g, "");
    }

    // Take only the last character if multiple characters are pasted
    if (newValue.length > 1) {
      newValue = newValue.charAt(newValue.length - 1);
    }

    // Update OTP values
    const newOTPValues = [...otpValues];
    newOTPValues[index] = newValue;
    setOTPValues(newOTPValues);

    // Notify about change
    const otpValue = newOTPValues.join("");
    if (onChange) {
      onChange(otpValue);
    }

    // Check if we filled all inputs
    if (otpValue.length === length && onComplete) {
      onComplete(otpValue);
    }

    // Auto-move to next input if we have a value and autotab is enabled
    if (newValue && index < length - 1 && !disableAutoTab) {
      setActiveInput(index + 1);
      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleFocus = (index: number) => {
    setActiveInput(index);
    inputRefs.current[index]?.select();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    switch (e.key) {
      case "Backspace":
        if (!otpValues[index] && index > 0) {
          // Move to previous input on backspace if current is empty
          setActiveInput(index - 1);
          inputRefs.current[index - 1]?.focus();
          
          // Clear previous value
          const newOTPValues = [...otpValues];
          newOTPValues[index - 1] = "";
          setOTPValues(newOTPValues);
          
          // Notify about change
          if (onChange) {
            onChange(newOTPValues.join(""));
          }
        }
        break;
      
      case "ArrowLeft":
        if (index > 0) {
          setActiveInput(index - 1);
          inputRefs.current[index - 1]?.focus();
        }
        break;
      
      case "ArrowRight":
        if (index < length - 1) {
          setActiveInput(index + 1);
          inputRefs.current[index + 1]?.focus();
        }
        break;
      
      default:
        break;
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();
    
    const pasteData = e.clipboardData.getData("text/plain");
    if (!pasteData) return;
    
    let filteredData = isNumberInput ? pasteData.replace(/\\D/g, "") : pasteData;
    filteredData = filteredData.substring(0, length - index);
    
    if (!filteredData) return;
    
    // Distribute the pasted characters across the inputs
    const newOTPValues = [...otpValues];
    
    for (let i = 0; i < filteredData.length; i++) {
      if (index + i < length) {
        newOTPValues[index + i] = filteredData[i];
      }
    }
    
    setOTPValues(newOTPValues);
    
    // Focus the next empty input or the last one
    const nextIndex = Math.min(index + filteredData.length, length - 1);
    setActiveInput(nextIndex);
    inputRefs.current[nextIndex]?.focus();
    
    // Notify about change
    const otpValue = newOTPValues.join("");
    if (onChange) {
      onChange(otpValue);
    }
    
    // Check if we filled all inputs
    if (otpValue.length === length && onComplete) {
      onComplete(otpValue);
    }
  };

  return (
    <div className={cn("flex items-center justify-center", containerClassName)}>
      {Array(length)
        .fill(null)
        .map((_, index) => (
          <React.Fragment key={index}>
            <input
              ref={(ref) => (inputRefs.current[index] = ref)}
              type={inputType}
              inputMode={isNumberInput ? "numeric" : "text"}
              pattern={isNumberInput ? "[0-9]*" : undefined}
              autoComplete="one-time-code"
              maxLength={1}
              value={otpValues[index]}
              onChange={(e) => handleOTPChange(e, index)}
              onFocus={() => handleFocus(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={(e) => handlePaste(e, index)}
              placeholder={placeholder}
              disabled={disabled}
              className={cn(
                "w-10 h-12 border rounded-md text-center font-mono text-lg mx-1",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
                activeInput === index ? "border-primary" : "border-border",
                "transition-all duration-200",
                disabled ? "bg-muted opacity-50 cursor-not-allowed" : "bg-background",
                inputClassName
              )}
              aria-label={\`Digit \${index + 1}\`}
            />
            
            {index < length - 1 && renderSeparator}
          </React.Fragment>
        ))}
    </div>
  );
};

export default OTPInput;`,
  component: OTPInputComponent,
  tags: ["form", "verification", "authentication", "OTP"],
  isNew: true,
  fileSize: "4.5 KB",
  complexity: "medium"
};

export default OTPInputComponentItem;
