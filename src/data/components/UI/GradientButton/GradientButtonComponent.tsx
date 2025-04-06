
import React from 'react';
import { cn } from "@/lib/utils";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  gradientDirection?: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-tr' | 'to-tl' | 'to-br' | 'to-bl';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  pill?: boolean;
  outline?: boolean;
  animated?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const GradientButtonComponent: React.FC<GradientButtonProps> = ({
  children,
  className,
  variant = 'primary',
  gradientDirection = 'to-r',
  size = 'md',
  fullWidth = false,
  pill = false,
  outline = false,
  animated = false,
  loading = false,
  icon,
  iconPosition = 'left',
  disabled,
  ...props
}) => {
  const gradientVariants = {
    primary: "from-blue-500 to-indigo-600",
    secondary: "from-purple-500 to-pink-600",
    success: "from-green-500 to-emerald-600",
    warning: "from-yellow-500 to-amber-600",
    danger: "from-red-500 to-pink-600"
  };

  const outlineColors = {
    primary: "text-blue-500",
    secondary: "text-purple-500",
    success: "text-green-500",
    warning: "text-yellow-500",
    danger: "text-red-500"
  };

  const sizeClasses = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3"
  };

  const baseClasses = cn(
    "relative inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none",
    sizeClasses[size],
    pill ? "rounded-full" : "rounded-md",
    fullWidth && "w-full",
    loading && "cursor-not-allowed"
  );

  const outlineClasses = cn(
    baseClasses,
    outlineColors[variant],
    "border-2 bg-transparent hover:text-white",
    animated ? "hover:border-transparent" : "",
    variant === 'primary' && "border-blue-500 focus:ring-blue-500",
    variant === 'secondary' && "border-purple-500 focus:ring-purple-500",
    variant === 'success' && "border-green-500 focus:ring-green-500",
    variant === 'warning' && "border-yellow-500 focus:ring-yellow-500",
    variant === 'danger' && "border-red-500 focus:ring-red-500"
  );

  const gradientClasses = cn(
    baseClasses,
    "text-white",
    `bg-gradient-${gradientDirection} ${gradientVariants[variant]}`,
    animated ? "hover:shadow-lg hover:scale-105" : "hover:shadow-md",
    variant === 'primary' && "focus:ring-blue-500",
    variant === 'secondary' && "focus:ring-purple-500",
    variant === 'success' && "focus:ring-green-500",
    variant === 'warning' && "focus:ring-yellow-500",
    variant === 'danger' && "focus:ring-red-500"
  );

  // Loading spinner component
  const LoadingSpinner = () => (
    <svg
      className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  // For animated outlines, we need a gradient background that's initially hidden
  const AnimatedOutlineGradient = () => (
    <span 
      className={cn(
        "absolute inset-0 w-full h-full rounded-md opacity-0 group-hover:opacity-100 transition-opacity",
        pill && "rounded-full",
        `bg-gradient-${gradientDirection} ${gradientVariants[variant]}`
      )} 
      aria-hidden="true"
    />
  );

  return (
    <button
      className={cn(
        outline ? outlineClasses : gradientClasses,
        animated && outline && "group overflow-hidden",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {outline && animated && <AnimatedOutlineGradient />}
      
      <span className={cn(
        "flex items-center justify-center gap-2 z-10", 
        outline && animated && "group-hover:text-white transition-colors duration-300"
      )}>
        {loading && <LoadingSpinner />}
        {icon && iconPosition === 'left' && !loading && <span>{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span>{icon}</span>}
      </span>
    </button>
  );
};

export default GradientButtonComponent;
