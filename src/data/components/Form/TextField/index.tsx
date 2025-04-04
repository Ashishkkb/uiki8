
import React from 'react';
import { ComponentItem } from "@/types/component";
import TextFieldComponent from "@/components/form/TextFieldComponent";
import { Mail } from "lucide-react";

const TextFieldComponentData: ComponentItem = {
  id: 401,
  name: "Text Field",
  category: "Form",
  framework: "React",
  description: "A customizable text field component with validation support, icons, and helper text",
  code: `import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface TextFieldComponentProps {
  label?: string;
  placeholder?: string;
  type?: "text" | "password" | "email" | "number" | "tel";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  id?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const TextFieldComponent = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  className = "",
  id,
  helperText,
  startIcon,
  endIcon,
}) => {
  const inputId = id || \`input-\${Math.random().toString(36).substring(2, 9)}\`;
  
  return (
    <div className={\`space-y-2 w-full \${className}\`}>
      {label && (
        <Label htmlFor={inputId} className="flex items-center gap-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      
      <div className="relative">
        {startIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {startIcon}
          </div>
        )}
        
        <Input
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={\`
            w-full 
            \${startIcon ? 'pl-10' : ''} 
            \${endIcon ? 'pr-10' : ''}
            \${error ? 'border-red-500 focus-visible:ring-red-500' : ''}
          \`}
        />
        
        {endIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {endIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-gray-500 text-xs mt-1">{helperText}</p>
      )}
    </div>
  );
};

export default TextFieldComponent;`,
  component: () => (
    <div className="max-w-sm">
      <TextFieldComponent 
        label="Email" 
        placeholder="Enter your email" 
        type="email" 
        required={true}
        startIcon={<Mail size={16} />}
        helperText="We'll never share your email with anyone else."
      />
    </div>
  ),
  tags: ["form", "input", "text field", "UI"],
  fileSize: "1.5 KB",
  price: "Free"
};

export default TextFieldComponentData;
