
import React, { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface VerificationCodeProps {
  length?: number;
  onComplete?: (code: string) => void;
  className?: string;
  fieldClassName?: string;
  variant?: 'default' | 'underline' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  autoFocus?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const VerificationCodeComponent: React.FC<VerificationCodeProps> = ({
  length = 6,
  onComplete,
  className,
  fieldClassName,
  variant = 'default',
  size = 'md',
  autoFocus = true,
  disabled = false,
  loading = false
}) => {
  const [code, setCode] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    // Only take the last character if multiple characters are pasted
    const char = value.slice(-1);
    
    const newCode = [...code];
    newCode[index] = char;
    setCode(newCode);
    
    // If we have a value, move to the next input
    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    
    // Check if the code is complete
    const codeString = newCode.join('');
    if (codeString.length === length && onComplete) {
      onComplete(codeString);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (code[index] === '') {
        // Move focus to previous input when backspace is pressed on an empty input
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
          
          // Clear the previous value
          const newCode = [...code];
          newCode[index - 1] = '';
          setCode(newCode);
        }
      } else {
        // Clear current input
        const newCode = [...code];
        newCode[index] = '';
        setCode(newCode);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    if (!pastedData || !/^\d+$/.test(pastedData)) return;

    const chars = pastedData.split('');
    const newCode = [...code];
    
    // Fill as many positions as we have characters for
    for (let i = 0; i < Math.min(chars.length, length - index); i++) {
      newCode[index + i] = chars[i];
    }
    
    setCode(newCode);
    
    // Focus the next available input or the last one if filled
    const nextIndex = Math.min(index + chars.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
    
    // Check if the code is complete
    const codeString = newCode.join('');
    if (codeString.length === length && onComplete) {
      onComplete(codeString);
    }
  };

  const variantClasses = {
    default: "border rounded-md bg-background",
    underline: "border-b-2 border-t-0 border-x-0 rounded-none bg-transparent",
    outline: "border-2 rounded-md bg-transparent"
  };
  
  const sizeClasses = {
    sm: "w-8 h-8 text-base",
    md: "w-10 h-10 text-lg",
    lg: "w-12 h-12 text-xl"
  };

  return (
    <div 
      className={cn(
        "flex items-center justify-center gap-2",
        loading && "opacity-70 pointer-events-none",
        className
      )}
    >
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={code[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={(e) => handlePaste(e, index)}
          disabled={disabled || loading}
          className={cn(
            "text-center font-mono focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 transition-all",
            variantClasses[variant],
            sizeClasses[size],
            disabled ? "opacity-50 cursor-not-allowed" : "",
            fieldClassName
          )}
          aria-label={`Code digit ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default VerificationCodeComponent;
