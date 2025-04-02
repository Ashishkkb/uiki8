
import React from 'react';

type ButtonProps = {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

const ButtonPreview = ({ 
  children = "Click me", 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  disabled = false,
  onClick 
}: ButtonProps) => {
  // Base styles with improved focus styles
  const baseStyles = "font-medium rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 font-medium";
  
  // Enhanced variant styles with improved colors
  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-sm hover:shadow",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800 focus:ring-gray-400 border border-gray-200",
    outline: "border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-gray-400",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-300"
  };
  
  // Size styles with better padding
  const sizeStyles = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-2.5 px-6 text-lg"
  };
  
  // Width style
  const widthStyle = fullWidth ? "w-full" : "";
  
  // Disabled style with improved visuals
  const disabledStyle = disabled ? "opacity-60 cursor-not-allowed pointer-events-none" : "cursor-pointer";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${disabledStyle}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonPreview;
