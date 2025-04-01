
import React from 'react';
import { ComponentItem } from "@/types/component";

const TextFieldPreview = () => {
  return (
    <div className="w-full max-w-xs">
      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
      <input 
        type="email" 
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter your email"
      />
      <p className="mt-1 text-xs text-gray-500">We'll never share your email with anyone else.</p>
    </div>
  );
};

const TextFieldComponent: ComponentItem = {
  id: 41,
  name: "TextField",
  category: "Form",
  framework: "React",
  description: "A customizable text input field with label, helper text and validation capabilities",
  code: `import React from 'react';

type TextFieldProps = {
  id?: string;
  name?: string;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  helperText?: string;
  error?: boolean;
  errorText?: string;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  className?: string;
};

const TextField = ({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  value,
  disabled = false,
  readOnly = false,
  required = false,
  autoFocus = false,
  helperText,
  error = false,
  errorText,
  fullWidth = false,
  size = 'md',
  onChange,
  onBlur,
  onFocus,
  startAdornment,
  endAdornment,
  className = ''
}: TextFieldProps) => {
  // Unique ID for the field
  const fieldId = id || \`field-\${name || Math.random().toString(36).substr(2, 9)}\`;
  
  // Size styles
  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2',
    lg: 'px-4 py-3 text-lg'
  };
  
  // Base classes
  const baseClasses = "border rounded-md shadow-sm focus:outline-none focus:ring-2";
  
  // State classes
  const stateClasses = error 
    ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500";
  
  // Width class
  const widthClass = fullWidth ? "w-full" : "";
  
  // Disabled and readOnly classes
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed bg-gray-100" : "";
  const readOnlyClasses = readOnly ? "cursor-default bg-gray-50" : "";
  
  return (
    <div className={\`\${fullWidth ? 'w-full' : ''} \${className}\`}>
      {label && (
        <label 
          htmlFor={fieldId} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {startAdornment && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {startAdornment}
          </div>
        )}
        
        <input
          id={fieldId}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          autoFocus={autoFocus}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          className={\`
            \${baseClasses}
            \${stateClasses}
            \${sizeClasses[size]}
            \${widthClass}
            \${disabledClasses}
            \${readOnlyClasses}
            \${startAdornment ? 'pl-10' : ''}
            \${endAdornment ? 'pr-10' : ''}
          \`}
        />
        
        {endAdornment && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {endAdornment}
          </div>
        )}
      </div>
      
      {(helperText || (error && errorText)) && (
        <p className={\`mt-1 text-xs \${error ? 'text-red-500' : 'text-gray-500'}\`}>
          {error ? errorText : helperText}
        </p>
      )}
    </div>
  );
};

export default TextField;`,
  component: TextFieldPreview,
  tags: ["form", "input", "text", "validation"],
  fileSize: "2.8 KB",
  price: "0",
  complexity: "medium",
  lastUpdated: "2023-12-05",
  license: "MIT"
};

export default TextFieldComponent;
