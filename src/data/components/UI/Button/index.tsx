
import React from 'react';
import { ComponentItem } from "@/types/component";
import ButtonPreview from "@/components/ui/ButtonPreview";

const ButtonComponent: ComponentItem = {
  id: 1,
  name: "Button",
  category: "UI",
  framework: "React",
  description: "A simple, versatile button component with multiple variants and sizes",
  code: `import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  disabled = false,
  onClick 
}: ButtonProps) => {
  // Base styles
  const baseStyles = "font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  // Variant styles
  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500",
    outline: "border border-gray-300 hover:bg-gray-100 focus:ring-gray-500",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500"
  };
  
  // Size styles
  const sizeStyles = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg"
  };
  
  // Width style
  const widthStyle = fullWidth ? "w-full" : "";
  
  // Disabled style
  const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  return (
    <button
      className={\`\${baseStyles} \${variantStyles[variant]} \${sizeStyles[size]} \${widthStyle} \${disabledStyle}\`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;`,
  component: ButtonPreview,
  tags: ["UI", "interactive", "form"],
  isNew: false,
  fileSize: "1.2 KB",
  price: "0",
  complexity: "simple",
  lastUpdated: "2023-12-15",
  license: "MIT"
};

export default ButtonComponent;
