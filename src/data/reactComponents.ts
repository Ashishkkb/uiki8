
import { ComponentItem } from "@/types/component";

const reactComponents: ComponentItem[] = [
  {
    id: 1,
    name: "Button",
    category: "Buttons",
    framework: "React",
    price: "Free",
    description: "A customizable button component with different variants and sizes",
    code: `import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  type = 'button'
}) => {
  const baseClasses = "font-medium rounded focus:outline-none";
  
  const variantClasses = {
    primary: "bg-purple-600 hover:bg-purple-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    outline: "border border-purple-600 text-purple-600 hover:bg-purple-50",
    danger: "bg-red-500 hover:bg-red-600 text-white"
  };
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };
  
  return (
    <button 
      className={\`\${baseClasses} \${variantClasses[variant]} \${sizeClasses[size]} \${className}\`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;`,
    previewBg: "bg-purple-100",
    previewHtml: '<div class="flex space-x-2"><button class="bg-purple-600 text-white font-medium rounded px-4 py-2">Primary</button><button class="bg-gray-200 text-gray-800 font-medium rounded px-4 py-2">Secondary</button><button class="border border-purple-600 text-purple-600 font-medium rounded px-4 py-2">Outline</button></div>',
    tags: ["button", "interactive", "action"]
  },
  {
    id: 2,
    name: "Card",
    category: "Cards",
    framework: "React",
    price: 5,
    description: "A versatile card component for displaying content with optional image, title, and footer",
    code: `import React from 'react';

const Card = ({ 
  title, 
  description, 
  imageUrl, 
  footer,
  className = "" 
}) => {
  return (
    <div className={\`overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm \${className}\`}>
      {imageUrl && (
        <div className="h-48 w-full overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        {title && <h3 className="text-xl font-bold mb-2">{title}</h3>}
        {description && <p className="text-gray-600">{description}</p>}
      </div>
      {footer && (
        <div className="border-t border-gray-100 p-4">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;`,
    previewBg: "bg-blue-100",
    previewHtml: '<div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm" style="width: 300px"><div class="p-6"><h3 class="text-xl font-bold mb-2">Card Title</h3><p class="text-gray-600">This is a sample card description with some content.</p></div><div class="border-t border-gray-100 p-4"><button class="text-purple-600 font-medium">Read More</button></div></div>',
    tags: ["card", "container", "layout"]
  },
  {
    id: 3,
    name: "Alert",
    category: "Feedback",
    framework: "React",
    price: 5,
    description: "Alert component for displaying important messages to users",
    code: `import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const Alert = ({ 
  title,
  message,
  type = 'info', // 'info', 'success', 'warning', 'error'
  dismissible = false,
  onDismiss,
  className = ""
}) => {
  const icons = {
    info: <Info className="h-5 w-5 text-blue-500" />,
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    warning: <AlertCircle className="h-5 w-5 text-amber-500" />,
    error: <XCircle className="h-5 w-5 text-red-500" />
  };
  
  const styles = {
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    success: 'bg-green-50 text-green-800 border-green-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    error: 'bg-red-50 text-red-800 border-red-200'
  };
  
  return (
    <div className={\`rounded-lg border p-4 \${styles[type]} \${className}\`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {icons[type]}
        </div>
        <div className="ml-3">
          {title && <h3 className="text-sm font-medium">{title}</h3>}
          {message && <div className="text-sm mt-1">{message}</div>}
        </div>
        {dismissible && (
          <div className="ml-auto pl-3">
            <button 
              type="button"
              className="inline-flex rounded-md text-gray-400 hover:text-gray-500"
              onClick={onDismiss}
            >
              <span className="sr-only">Dismiss</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;`,
    previewBg: "bg-green-100",
    previewHtml: '<div class="flex flex-col space-y-2"><div class="rounded-lg border p-4 bg-blue-50 text-blue-800 border-blue-200"><div class="flex items-start"><div class="flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-blue-500"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></div><div class="ml-3"><h3 class="text-sm font-medium">Information</h3><div class="text-sm mt-1">This is an informational message.</div></div></div></div><div class="rounded-lg border p-4 bg-green-50 text-green-800 border-green-200"><div class="flex items-start"><div class="flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></div><div class="ml-3"><h3 class="text-sm font-medium">Success</h3><div class="text-sm mt-1">Operation completed successfully.</div></div></div></div></div>',
    tags: ["alert", "notification", "message"]
  },
  {
    id: 4,
    name: "Badge",
    category: "Display",
    framework: "React",
    price: "Free",
    description: "Small status descriptors for UI elements",
    code: `import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  rounded = 'full',
  className = "" 
}) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-purple-100 text-purple-800',
    secondary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-amber-100 text-amber-800',
    info: 'bg-sky-100 text-sky-800'
  };
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-sm'
  };
  
  const roundedClasses = {
    full: 'rounded-full',
    md: 'rounded-md',
    sm: 'rounded-sm',
    none: 'rounded-none'
  };
  
  return (
    <span className={\`inline-flex items-center font-medium \${variantClasses[variant]} \${sizeClasses[size]} \${roundedClasses[rounded]} \${className}\`}>
      {children}
    </span>
  );
};

export default Badge;`,
    previewBg: "bg-gray-100",
    previewHtml: '<div class="flex space-x-2"><span class="inline-flex items-center font-medium bg-gray-100 text-gray-800 px-2.5 py-0.5 text-sm rounded-full">Default</span><span class="inline-flex items-center font-medium bg-purple-100 text-purple-800 px-2.5 py-0.5 text-sm rounded-full">Primary</span><span class="inline-flex items-center font-medium bg-green-100 text-green-800 px-2.5 py-0.5 text-sm rounded-full">Success</span><span class="inline-flex items-center font-medium bg-red-100 text-red-800 px-2.5 py-0.5 text-sm rounded-full">Danger</span></div>',
    tags: ["badge", "tag", "label"]
  },
  {
    id: 5,
    name: "Avatar",
    category: "Display",
    framework: "React",
    price: 10,
    description: "User profile pictures or placeholders",
    code: `import React from 'react';

const Avatar = ({ 
  src, 
  alt, 
  size = 'md', 
  initials,
  status,
  className = ""
}) => {
  const sizeClasses = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl'
  };
  
  const statusClasses = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    busy: 'bg-red-500',
    away: 'bg-amber-500'
  };
  
  const renderInitials = () => {
    if (!initials) return null;
    
    return (
      <div className={\`flex items-center justify-center bg-gray-200 text-gray-600 \${sizeClasses[size]} rounded-full\`}>
        <span>{initials}</span>
      </div>
    );
  };
  
  const renderImage = () => {
    if (!src) return null;
    
    return (
      <img 
        src={src} 
        alt={alt || 'Avatar'} 
        className={\`object-cover rounded-full \${sizeClasses[size]}\`}
      />
    );
  };
  
  return (
    <div className={\`relative inline-block \${className}\`}>
      {src ? renderImage() : renderInitials()}
      
      {status && (
        <span 
          className={\`absolute bottom-0 right-0 block rounded-full ring-2 ring-white \${statusClasses[status]}\`}
          style={{ 
            height: size === 'xs' ? '0.5rem' : size === 'sm' ? '0.75rem' : '1rem',
            width: size === 'xs' ? '0.5rem' : size === 'sm' ? '0.75rem' : '1rem'
          }}
        />
      )}
    </div>
  );
};

export default Avatar;`,
    previewBg: "bg-white",
    previewHtml: '<div class="flex space-x-4"><div class="relative inline-block"><img src="https://randomuser.me/api/portraits/women/17.jpg" alt="Avatar" class="object-cover rounded-full h-10 w-10"></div><div class="relative inline-block"><div class="flex items-center justify-center bg-gray-200 text-gray-600 h-10 w-10 rounded-full"><span>JD</span></div><span class="absolute bottom-0 right-0 block rounded-full ring-2 ring-white bg-green-500" style="height: 1rem; width: 1rem;"></span></div></div>',
    tags: ["avatar", "profile", "user"]
  },
  {
    id: 6,
    name: "Modal",
    category: "Overlay",
    framework: "React",
    price: 15,
    description: "A dialog component for displaying content in a layer above the app",
    code: `import React, { Fragment, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  closeOnOverlayClick = true 
}) => {
  const overlayRef = useRef(null);
  
  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === overlayRef.current) {
      onClose();
    }
  };
  
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };
  
  if (!isOpen) return null;
  
  return createPortal(
    <Fragment>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
        onClick={handleOverlayClick}
        ref={overlayRef}
      >
        <div 
          className={\`relative rounded-lg bg-white shadow-lg w-full \${sizeClasses[size]} animate-fade-in-up\`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="flex items-center justify-between border-b p-4">
            <h3 id="modal-title" className="text-lg font-semibold">
              {title}
            </h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </Fragment>,
    document.body
  );
};

export default Modal;`,
    previewBg: "bg-gray-100",
    previewHtml: '<div class="flex justify-center"><div class="relative rounded-lg bg-white shadow-lg w-full max-w-md" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="flex items-center justify-between border-b p-4"><h3 id="modal-title" class="text-lg font-semibold">Modal Title</h3><button type="button" class="text-gray-400 hover:text-gray-500" aria-label="Close"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div><div class="p-6">Modal content goes here. This is an example of a modal dialog window.</div></div></div>',
    tags: ["modal", "dialog", "overlay"]
  },
  {
    id: 7,
    name: "Tooltip",
    category: "Overlay",
    framework: "React",
    price: 8,
    description: "Display additional information on hover",
    code: `import React, { useState, useRef, useEffect } from 'react';

const Tooltip = ({ 
  children, 
  content, 
  position = 'top', 
  delay = 0,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyles, setTooltipStyles] = useState({});
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  let timeoutId = null;
  
  const positionMap = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 translate-y-2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 -translate-x-2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 translate-x-2 ml-2'
  };
  
  const arrowMap = {
    top: 'bottom-[-6px] left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'top-[-6px] left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent',
    left: 'right-[-6px] top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent',
    right: 'left-[-6px] top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent'
  };
  
  const handleShowTooltip = () => {
    if (delay > 0) {
      timeoutId = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    } else {
      setIsVisible(true);
    }
  };
  
  const handleHideTooltip = () => {
    clearTimeout(timeoutId);
    setIsVisible(false);
  };
  
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);
  
  return (
    <div 
      className={\`relative inline-block \${className}\`}
      onMouseEnter={handleShowTooltip}
      onMouseLeave={handleHideTooltip}
      onFocus={handleShowTooltip}
      onBlur={handleHideTooltip}
      ref={triggerRef}
    >
      {children}
      
      {isVisible && (
        <div
          className={\`absolute z-50 px-2 py-1 text-sm font-medium text-white bg-gray-900 rounded-md shadow-sm max-w-xs \${positionMap[position]}\`}
          ref={tooltipRef}
          role="tooltip"
        >
          {content}
          <div 
            className={\`absolute border-4 border-gray-900 w-0 h-0 \${arrowMap[position]}\`}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;`,
    previewBg: "bg-white",
    previewHtml: '<div class="flex justify-center items-center h-24 relative"><button class="px-4 py-2 bg-blue-500 text-white rounded">Hover me</button><div class="absolute z-50 px-2 py-1 text-sm font-medium text-white bg-gray-900 rounded-md shadow-sm max-w-xs bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 mb-2">This is a tooltip<div class="absolute border-4 border-gray-900 w-0 h-0 bottom-[-6px] left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent"></div></div></div>',
    tags: ["tooltip", "popover", "information"]
  },
  {
    id: 8,
    name: "Tabs",
    category: "Navigation",
    framework: "React",
    price: 12,
    description: "Switch between different content sections",
    code: `import React, { useState } from 'react';

const Tabs = ({ 
  tabs, 
  defaultIndex = 0,
  variant = 'default',
  className = ""
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  
  const variantStyles = {
    default: {
      tabs: 'border-b border-gray-200',
      tab: 'py-2 px-4 text-sm font-medium',
      active: 'text-purple-600 border-b-2 border-purple-600',
      inactive: 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
    },
    pills: {
      tabs: 'space-x-2',
      tab: 'py-2 px-4 text-sm font-medium rounded-md',
      active: 'bg-purple-100 text-purple-700',
      inactive: 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
    },
    underline: {
      tabs: 'border-b border-gray-200',
      tab: 'py-2 px-4 text-sm font-medium',
      active: 'text-gray-900 border-b-2 border-gray-900',
      inactive: 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
    }
  };
  
  const currentStyle = variantStyles[variant];
  
  return (
    <div className={className}>
      <div className={\`flex \${currentStyle.tabs}\`}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={\`\${currentStyle.tab} \${
              index === activeIndex ? currentStyle.active : currentStyle.inactive
            }\`}
            onClick={() => setActiveIndex(index)}
            aria-selected={index === activeIndex}
            role="tab"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="py-4">
        {tabs[activeIndex]?.content}
      </div>
    </div>
  );
};

export default Tabs;`,
    previewBg: "bg-white",
    previewHtml: '<div><div class="flex border-b border-gray-200"><button class="py-2 px-4 text-sm font-medium text-purple-600 border-b-2 border-purple-600" aria-selected="true" role="tab">Tab 1</button><button class="py-2 px-4 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300" aria-selected="false" role="tab">Tab 2</button><button class="py-2 px-4 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300" aria-selected="false" role="tab">Tab 3</button></div><div class="py-4">This is the content for Tab 1</div></div>',
    tags: ["tabs", "navigation", "interface"]
  },
  {
    id: 9,
    name: "Dropdown",
    category: "Navigation",
    framework: "React",
    price: 10,
    description: "Display a list of actions or options in a contextual overlay",
    code: `import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const Dropdown = ({ 
  trigger, 
  children, 
  align = 'left', 
  width = 'auto',
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const alignmentClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 transform -translate-x-1/2'
  };
  
  const widthClasses = {
    auto: 'min-w-[10rem]',
    sm: 'w-48',
    md: 'w-56',
    lg: 'w-64',
    full: 'w-full'
  };
  
  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  return (
    <div className={\`relative inline-block \${className}\`} ref={dropdownRef}>
      <div onClick={toggleDropdown}>
        {typeof trigger === 'string' ? (
          <button
            type="button"
            className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            {trigger}
            <ChevronDown className="-mr-1 h-4 w-4 text-gray-400" aria-hidden="true" />
          </button>
        ) : (
          trigger
        )}
      </div>
      
      {isOpen && (
        <div 
          className={\`absolute z-10 mt-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 \${alignmentClasses[align]} \${widthClasses[width]}\`}
        >
          <div className="py-1" role="menu" aria-orientation="vertical">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

// Dropdown item component
export const DropdownItem = ({ onClick, children, disabled = false, className = "" }) => {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={\`block w-full px-4 py-2 text-left text-sm \${
        disabled 
          ? 'text-gray-400 cursor-not-allowed' 
          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
      } \${className}\`}
      role="menuitem"
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Dropdown divider component
export const DropdownDivider = ({ className = "" }) => {
  return <div className={\`my-1 h-px bg-gray-200 \${className}\`} />;
};

export default Dropdown;`,
    previewBg: "bg-white",
    previewHtml: '<div class="relative inline-block"><button type="button" class="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Options<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="-mr-1 h-4 w-4 text-gray-400" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg></button><div class="absolute z-10 mt-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 left-0 min-w-[10rem]"><div class="py-1" role="menu" aria-orientation="vertical"><button class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Edit</button><button class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Duplicate</button><div class="my-1 h-px bg-gray-200"></div><button class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Archive</button><button class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Delete</button></div></div></div>',
    tags: ["dropdown", "menu", "select"]
  },
  {
    id: 10,
    name: "Progress Bar",
    category: "Feedback",
    framework: "React",
    price: 8,
    description: "Display progress of an operation or task",
    code: `import React from 'react';

const ProgressBar = ({ 
  value = 0, 
  max = 100, 
  label, 
  showValue = false,
  size = 'md',
  color = 'primary',
  animated = false,
  className = ""
}) => {
  const percentage = (value / max) * 100;
  
  const colorClasses = {
    primary: 'bg-purple-600',
    secondary: 'bg-blue-600',
    success: 'bg-green-500',
    danger: 'bg-red-500',
    warning: 'bg-amber-500',
    info: 'bg-sky-500',
    gray: 'bg-gray-500'
  };
  
  const sizeClasses = {
    xs: 'h-1',
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
    xl: 'h-6'
  };
  
  const labelSizeClasses = {
    xs: 'text-xs',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-sm',
    xl: 'text-base'
  };
  
  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1">
          {label && <div className={labelSizeClasses[size]}>{label}</div>}
          {showValue && (
            <div className={\`\${labelSizeClasses[size]} text-gray-500\`}>
              {Math.round(percentage)}%
            </div>
          )}
        </div>
      )}
      
      <div className={\`w-full bg-gray-200 rounded-full overflow-hidden \${sizeClasses[size]}\`}>
        <div
          className={\`\${colorClasses[color]} rounded-full \${animated ? 'animate-progress' : ''}\`}
          style={{ width: \`\${percentage}%\` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
};

export default ProgressBar;`,
    previewBg: "bg-white",
    previewHtml: '<div class="space-y-4"><div><div class="flex justify-between items-center mb-1"><div class="text-sm">Loading...</div><div class="text-sm text-gray-500">65%</div></div><div class="w-full bg-gray-200 rounded-full overflow-hidden h-2.5"><div class="bg-purple-600 rounded-full" style="width: 65%" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div></div></div><div><div class="w-full bg-gray-200 rounded-full overflow-hidden h-2.5"><div class="bg-green-500 rounded-full" style="width: 40%" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div></div></div><div><div class="w-full bg-gray-200 rounded-full overflow-hidden h-2.5"><div class="bg-blue-600 rounded-full" style="width: 75%" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div></div></div></div>',
    tags: ["progress", "loading", "indicator"]
  },
  // Adding new components below
  {
    id: 11,
    name: "Toggle Switch",
    category: "Forms",
    framework: "React",
    price: 5,
    description: "A toggle switch component for boolean inputs",
    code: `import React from 'react';

const ToggleSwitch = ({ 
  checked, 
  onChange, 
  disabled = false,
  label,
  size = 'md',
  className = "" 
}) => {
  const sizeClasses = {
    sm: {
      switch: 'w-8 h-4',
      dot: 'h-3 w-3',
      translate: 'translate-x-4'
    },
    md: {
      switch: 'w-11 h-6',
      dot: 'h-5 w-5',
      translate: 'translate-x-5'
    },
    lg: {
      switch: 'w-14 h-7',
      dot: 'h-6 w-6',
      translate: 'translate-x-7'
    }
  };
  
  const currentSize = sizeClasses[size];
  
  return (
    <label className={\`inline-flex items-center cursor-pointer \${disabled ? 'opacity-50 cursor-not-allowed' : ''} \${className}\`}>
      {label && <span className="mr-3 text-sm font-medium text-gray-900">{label}</span>}
      <div className="relative">
        <input 
          type="checkbox" 
          value="" 
          className="sr-only peer" 
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <div 
          className={\`\${currentSize.switch} bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:\${currentSize.translate} peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:\${currentSize.dot} after:bg-white after:rounded-full after:transition-all\`}
        ></div>
      </div>
    </label>
  );
};

export default ToggleSwitch;`,
    previewBg: "bg-gray-100",
    previewHtml: '<div class="flex space-x-6"><label class="inline-flex items-center cursor-pointer"><span class="mr-3 text-sm font-medium text-gray-900">Off</span><div class="relative"><input type="checkbox" value="" class="sr-only peer"><div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer after:content-[\'\'] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:bg-white after:rounded-full after:transition-all"></div></div></label><label class="inline-flex items-center cursor-pointer"><span class="mr-3 text-sm font-medium text-gray-900">On</span><div class="relative"><input type="checkbox" value="" class="sr-only peer" checked><div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-5 peer-checked:bg-blue-600 after:content-[\'\'] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:bg-white after:rounded-full after:transition-all"></div></div></label></div>',
    tags: ["toggle", "switch", "input", "form"]
  },
  {
    id: 12,
    name: "Accordion",
    category: "Display",
    framework: "React",
    price: 12,
    description: "Expandable content sections for organizing information",
    code: `import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const AccordionItem = ({ 
  title, 
  children, 
  isOpen, 
  onToggle,
  className = "" 
}) => {
  return (
    <div className={\`border-b \${className}\`}>
      <button
        className="flex justify-between items-center w-full py-4 px-5 text-left font-medium text-gray-900"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <ChevronDown 
          className={\`w-5 h-5 text-gray-500 transition-transform \${isOpen ? 'rotate-180' : ''}\`}
        />
      </button>
      <div 
        className={\`overflow-hidden transition-all duration-300 \${isOpen ? 'max-h-96 pb-4' : 'max-h-0'}\`}
      >
        <div className="px-5">{children}</div>
      </div>
    </div>
  );
};

const Accordion = ({ 
  items, 
  allowMultiple = false,
  className = "" 
}) => {
  const [openIndices, setOpenIndices] = useState([]);
  
  const handleToggle = (index) => {
    if (allowMultiple) {
      // Toggle the index in the array
      setOpenIndices(
        openIndices.includes(index)
          ? openIndices.filter(i => i !== index)
          : [...openIndices, index]
      );
    } else {
      // Set the clicked index as the only open one, or close it if already open
      setOpenIndices(
        openIndices.includes(index) ? [] : [index]
      );
    }
  };
  
  return (
    <div className={\`border border-gray-200 rounded-md \${className}\`}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openIndices.includes(index)}
          onToggle={() => handleToggle(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;`,
    previewBg: "bg-white",
    previewHtml: '<div class="border border-gray-200 rounded-md"><div class="border-b"><button class="flex justify-between items-center w-full py-4 px-5 text-left font-medium text-gray-900" aria-expanded="true"><span>What is React?</span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-gray-500 transition-transform rotate-180"><polyline points="6 9 12 15 18 9"></polyline></svg></button><div class="overflow-hidden transition-all duration-300 max-h-96 pb-4"><div class="px-5">React is a free and open-source front-end JavaScript library for building user interfaces based on components. It is maintained by Meta and a community of individual developers and companies.</div></div></div><div class="border-b"><button class="flex justify-between items-center w-full py-4 px-5 text-left font-medium text-gray-900" aria-expanded="false"><span>How do I install React?</span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-gray-500 transition-transform"><polyline points="6 9 12 15 18 9"></polyline></svg></button><div class="overflow-hidden transition-all duration-300 max-h-0"><div class="px-5">You can install React using npm or Yarn: `npm install react react-dom` or `yarn add react react-dom`.</div></div></div></div>',
    tags: ["accordion", "collapse", "expandable"]
  },
  {
    id: 13,
    name: "Breadcrumbs",
    category: "Navigation",
    framework: "React",
    price: "Free",
    description: "Navigation aid showing the user's location in a website hierarchy",
    code: `import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = ({ 
  items, 
  separator = <ChevronRight className="w-4 h-4 text-gray-400" />,
  homeIcon = <Home className="w-4 h-4" />,
  className = "" 
}) => {
  return (
    <nav className={\`flex \${className}\`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="inline-flex items-center">
              {index > 0 && (
                <div className="flex items-center">
                  {separator}
                </div>
              )}
              
              {isLast ? (
                <span className={\`\${isFirst ? 'ml-0' : 'ml-1'} text-sm font-medium text-gray-500\`}>
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href || '#'}
                  className={\`\${isFirst ? 'inline-flex items-center' : 'ml-1'} text-sm font-medium text-gray-700 hover:text-blue-600\`}
                >
                  {isFirst && homeIcon ? homeIcon : item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;`,
    previewBg: "bg-white",
    previewHtml: '<nav class="flex" aria-label="Breadcrumb"><ol class="inline-flex items-center space-x-1 md:space-x-3"><li class="inline-flex items-center"><a href="#" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></a></li><li class="inline-flex items-center"><div class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-gray-400"><polyline points="9 18 15 12 9 6"></polyline></svg></div><a href="#" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600">Projects</a></li><li class="inline-flex items-center"><div class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-gray-400"><polyline points="9 18 15 12 9 6"></polyline></svg></div><span class="ml-1 text-sm font-medium text-gray-500">Current Page</span></li></ol></nav>',
    tags: ["breadcrumbs", "navigation", "path"]
  },
  {
    id: 14,
    name: "Tag Input",
    category: "Forms",
    framework: "React",
    price: 10,
    description: "Input field for adding and managing multiple tags or keywords",
    code: `import React, { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';

const TagInput = ({ 
  tags = [], 
  onAddTag, 
  onRemoveTag,
  placeholder = 'Add a tag...',
  maxTags,
  className = ""
}) => {
  const [inputValue, setInputValue] = useState('');
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  const handleKeyDown = (e) => {
    // Add tag on Enter or comma
    if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
      e.preventDefault();
      
      // Check if we've reached the maximum number of tags
      if (maxTags && tags.length >= maxTags) {
        return;
      }
      
      // Don't add duplicate tags
      if (!tags.includes(inputValue.trim())) {
        onAddTag(inputValue.trim());
      }
      
      setInputValue('');
    }
    
    // Remove last tag on Backspace if input is empty
    if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      onRemoveTag(tags.length - 1);
    }
  };
  
  return (
    <div className={\`flex flex-wrap border border-gray-300 rounded-md p-1.5 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 \${className}\`}>
      {tags.map((tag, index) => (
        <div 
          key={index} 
          className="flex items-center bg-gray-100 text-gray-800 rounded px-2 py-1 m-0.5"
        >
          <span className="text-sm">{tag}</span>
          <button 
            type="button" 
            className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => onRemoveTag(index)}
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}
      <input
        type="text"
        className="flex-1 border-none outline-none text-sm min-w-[120px] p-1.5"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={maxTags && tags.length >= maxTags ? 'Max tags reached' : placeholder}
        disabled={maxTags && tags.length >= maxTags}
      />
    </div>
  );
};

export default TagInput;`,
    previewBg: "bg-white",
    previewHtml: '<div class="flex flex-wrap border border-gray-300 rounded-md p-1.5 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"><div class="flex items-center bg-gray-100 text-gray-800 rounded px-2 py-1 m-0.5"><span class="text-sm">React</span><button type="button" class="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div><div class="flex items-center bg-gray-100 text-gray-800 rounded px-2 py-1 m-0.5"><span class="text-sm">TypeScript</span><button type="button" class="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div><input type="text" class="flex-1 border-none outline-none text-sm min-w-[120px] p-1.5" placeholder="Add a tag..."></div>',
    tags: ["tags", "input", "multivalue", "form"]
  },
  {
    id: 15,
    name: "Stepper",
    category: "Navigation",
    framework: "React",
    price: 15,
    description: "Multi-step process indicator for wizards and forms",
    code: `import React from 'react';
import { Check } from 'lucide-react';

const Stepper = ({ 
  steps, 
  currentStep = 0,
  onStepClick,
  orientation = 'horizontal',
  className = "" 
}) => {
  const isStepActive = (index) => currentStep === index;
  const isStepCompleted = (index) => currentStep > index;
  const isClickable = (index) => onStepClick && (isStepCompleted(index) || index === currentStep + 1);
  
  return (
    <div 
      className={\`\${
        orientation === 'vertical' ? 'flex flex-col' : 'flex'
      } \${className}\`}
    >
      {steps.map((step, index) => (
        <div 
          key={index} 
          className={\`\${orientation === 'vertical' ? 'flex mb-8 last:mb-0' : 'flex flex-col items-center'} \${
            orientation === 'horizontal' ? 'flex-1' : ''
          }\`}
        >
          <div className={orientation === 'vertical' ? 'flex flex-col items-center mr-4' : ''}>
            <div 
              className={\`\${isStepActive(index) 
                ? 'bg-blue-600 text-white' 
                : isStepCompleted(index) 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-500'
              } flex items-center justify-center w-8 h-8 rounded-full \${
                isClickable(index) ? 'cursor-pointer' : ''
              }\`}
              onClick={isClickable(index) ? () => onStepClick(index) : undefined}
            >
              {isStepCompleted(index) ? (
                <Check className="w-5 h-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            
            {index < steps.length - 1 && orientation === 'vertical' && (
              <div className={\`w-0.5 h-full mt-2 mb-2 \${
                isStepCompleted(index) ? 'bg-green-500' : 'bg-gray-200'
              }\`}></div>
            )}
          </div>
          
          <div className={orientation === 'vertical' ? 'pt-1' : 'text-center mt-2'}>
            <div className={\`font-medium \${
              isStepActive(index) 
                ? 'text-blue-600' 
                : isStepCompleted(index) 
                  ? 'text-green-500' 
                  : 'text-gray-500'
            }\`}>
              {step.label}
            </div>
            {step.description && (
              <div className="text-sm text-gray-500 mt-1">{step.description}</div>
            )}
          </div>
          
          {index < steps.length - 1 && orientation === 'horizontal' && (
            <div 
              className={\`hidden sm:block w-full \${
                isStepCompleted(index + 1) ? 'bg-green-500' : 'bg-gray-200'
              } h-0.5 absolute top-4 left-0 -translate-y-1/2\`}
              style={{ left: 'calc(50% + 1.5rem)', right: 'calc(-50% + 1.5rem)' }}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;`,
    previewBg: "bg-white",
    previewHtml: '<div class="flex"><div class="flex flex-col items-center flex-1"><div class="bg-green-500 text-white flex items-center justify-center w-8 h-8 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><polyline points="20 6 9 17 4 12"></polyline></svg></div><div class="text-center mt-2"><div class="font-medium text-green-500">Details</div></div></div><div class="flex flex-col items-center flex-1"><div class="bg-blue-600 text-white flex items-center justify-center w-8 h-8 rounded-full"><span>2</span></div><div class="text-center mt-2"><div class="font-medium text-blue-600">Address</div></div></div><div class="flex flex-col items-center flex-1"><div class="bg-gray-200 text-gray-500 flex items-center justify-center w-8 h-8 rounded-full"><span>3</span></div><div class="text-center mt-2"><div class="font-medium text-gray-500">Payment</div></div></div><div class="flex flex-col items-center flex-1"><div class="bg-gray-200 text-gray-500 flex items-center justify-center w-8 h-8 rounded-full"><span>4</span></div><div class="text-center mt-2"><div class="font-medium text-gray-500">Confirm</div></div></div></div>',
    tags: ["stepper", "wizard", "steps", "navigation"]
  },
  {
    id: 16,
    name: "Rating",
    category: "Forms",
    framework: "React",
    price: 8,
    description: "Star rating input for user reviews and feedback",
    code: `import React, { useState } from 'react';
import { Star } from 'lucide-react';

const Rating = ({ 
  count = 5, 
  initialValue = 0, 
  onChange,
  readOnly = false,
  size = 'md',
  className = "" 
}) => {
  const [rating, setRating] = useState(initialValue);
  const [hoverRating, setHoverRating] = useState(0);
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };
  
  const handleClick = (value) => {
    if (readOnly) return;
    
    setRating(value);
    if (onChange) {
      onChange(value);
    }
  };
  
  const handleMouseEnter = (value) => {
    if (readOnly) return;
    setHoverRating(value);
  };
  
  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverRating(0);
  };
  
  return (
    <div className={\`flex \${className}\`}>
      {[...Array(count)].map((_, index) => {
        const value = index + 1;
        
        return (
          <div
            key={index}
            className={\`\${readOnly ? '' : 'cursor-pointer'} p-0.5\`}
            onClick={() => handleClick(value)}
            onMouseEnter={() => handleMouseEnter(value)}
            onMouseLeave={handleMouseLeave}
          >
            <Star 
              className={\`\${
                (hoverRating || rating) >= value 
                  ? 'text-yellow-400 fill-yellow-400' 
                  : 'text-gray-300'
              } \${sizeClasses[size]}\`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Rating;`,
    previewBg: "bg-white",
    previewHtml: '<div class="space-y-4"><div class="flex"><div class="p-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-400 fill-yellow-400 w-6 h-6"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div><div class="p-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-400 fill-yellow-400 w-6 h-6"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div><div class="p-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-400 fill-yellow-400 w-6 h-6"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div><div class="p-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-300 w-6 h-6"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div><div class="p-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-300 w-6 h-6"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div></div></div>',
    tags: ["rating", "stars", "feedback", "review"]
  },
  {
    id: 17,
    name: "File Upload",
    category: "Forms",
    framework: "React",
    price: 15,
    description: "Drag and drop file uploader with preview",
    code: `import React, { useState, useRef } from 'react';
import { Upload, X, File, Image as ImageIcon } from 'lucide-react';

const FileUpload = ({ 
  accept = '*/*', 
  maxFiles = 5, 
  maxSize = 5242880, // 5MB
  onChange,
  className = "" 
}) => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState([]);
  const fileInputRef = useRef(null);
  
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    validateAndAddFiles(selectedFiles);
  };
  
  const validateAndAddFiles = (selectedFiles) => {
    const validFiles = [];
    const errorMessages = [];
    
    // Check if adding these files would exceed the max number of files
    if (files.length + selectedFiles.length > maxFiles) {
      errorMessages.push(\`You can only upload a maximum of \${maxFiles} files.\`);
      return;
    }
    
    selectedFiles.forEach((file) => {
      // Check file size
      if (file.size > maxSize) {
        errorMessages.push(\`\${file.name} is too large. Maximum size is \${maxSize / 1048576}MB.\`);
        return;
      }
      
      // Check file type if accept is specified
      if (accept !== '*/*') {
        const acceptedTypes = accept.split(',');
        const fileType = file.type;
        
        const isAccepted = acceptedTypes.some(type => {
          // Handle wildcard types like 'image/*'
          if (type.endsWith('/*')) {
            const category = type.split('/')[0];
            return fileType.startsWith(category);
          }
          return type === fileType;
        });
        
        if (!isAccepted) {
          errorMessages.push(\`\${file.name} is not an accepted file type.\`);
          return;
        }
      }
      
      validFiles.push(file);
    });
    
    // Update the files and errors state
    if (validFiles.length > 0) {
      const newFiles = [...files, ...validFiles];
      setFiles(newFiles);
      
      if (onChange) {
        onChange(newFiles);
      }
    }
    
    setErrors(errorMessages);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    validateAndAddFiles(droppedFiles);
  };
  
  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    
    if (onChange) {
      onChange(newFiles);
    }
  };
  
  const isImage = (file) => {
    return file.type.startsWith('image/');
  };
  
  const renderPreview = (file, index) => {
    if (isImage(file)) {
      return (
        <div key={index} className="relative">
          <img 
            src={URL.createObjectURL(file)} 
            alt={file.name}
            className="h-20 w-20 object-cover rounded border"
          />
          <button
            type="button"
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5 transform translate-x-1/3 -translate-y-1/3"
            onClick={() => removeFile(index)}
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      );
    }
    
    return (
      <div key={index} className="relative flex items-center p-2 border rounded">
        <File className="h-5 w-5 text-blue-500 mr-2" />
        <span className="text-sm truncate max-w-xs">{file.name}</span>
        <button
          type="button"
          className="ml-2 text-red-500"
          onClick={() => removeFile(index)}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  };
  
  return (
    <div className={className}>
      <div
        className={\`border-2 border-dashed rounded-lg p-6 text-center \${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }\`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept={accept}
          multiple={maxFiles > 1}
          onChange={handleFileChange}
        />
        
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-10 w-10 text-gray-400" />
          <div className="text-gray-700">
            <span className="font-medium">Click to upload</span> or drag and drop
          </div>
          <p className="text-xs text-gray-500">
            {accept === '*/*' 
              ? 'Upload any file type' 
              : \`Accepted formats: \${accept}\`}
          </p>
          <p className="text-xs text-gray-500">
            Max {maxFiles} file{maxFiles > 1 ? 's' : ''}, up to {maxSize / 1048576}MB each
          </p>
        </div>
      </div>
      
      {errors.length > 0 && (
        <div className="mt-2 text-sm text-red-500">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      
      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Uploaded Files ({files.length})</h4>
          <div className="flex flex-wrap gap-2">
            {files.map((file, index) => renderPreview(file, index))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;`,
    previewBg: "bg-white",
    previewHtml: '<div><div class="border-2 border-dashed rounded-lg p-6 text-center border-gray-300"><div class="flex flex-col items-center justify-center space-y-2"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-10 w-10 text-gray-400"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg><div class="text-gray-700"><span class="font-medium">Click to upload</span> or drag and drop</div><p class="text-xs text-gray-500">Accepted formats: image/*</p><p class="text-xs text-gray-500">Max 5 files, up to 5MB each</p></div></div><div class="mt-4"><h4 class="text-sm font-medium mb-2">Uploaded Files (2)</h4><div class="flex flex-wrap gap-2"><div class="relative"><img src="#" alt="example.jpg" class="h-20 w-20 object-cover rounded border"><button type="button" class="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5 transform translate-x-1/3 -translate-y-1/3"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div><div class="relative flex items-center p-2 border rounded"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-blue-500 mr-2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg><span class="text-sm truncate max-w-xs">document.pdf</span><button type="button" class="ml-2 text-red-500"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div></div></div></div>',
    tags: ["upload", "file", "drag", "drop", "form"]
  },
  {
    id: 18,
    name: "Timeline",
    category: "Display",
    framework: "React",
    price: 12,
    description: "Vertical or horizontal timeline for displaying chronological events",
    code: `import React from 'react';

const Timeline = ({
  items,
  orientation = 'vertical',
  className = ""
}) => {
  return (
    <div className={\`\${orientation === 'horizontal' ? 'flex' : ''} \${className}\`}>
      {items.map((item, index) => (
        <div
          key={index}
          className={\`\${
            orientation === 'horizontal'
              ? 'flex-1 px-2 first:pl-0 last:pr-0'
              : 'relative pl-10 pb-10 last:pb-0'
          }\`}
        >
          {orientation === 'vertical' && (
            <>
              <div className="absolute top-0 left-0 h-full w-0.5 bg-gray-200" />
              <div className="absolute top-0 left-0 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-2 border-blue-500 z-10" />
            </>
          )}
          
          {orientation === 'horizontal' && (
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gray-200 translate-y-3" />
              <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-white border-2 border-blue-500 mx-auto" />
            </div>
          )}
          
          <div className={\`\${orientation === 'horizontal' ? 'mt-5 text-center' : 'mt-0'}\`}>
            {item.date && (
              <div className="text-sm font-medium text-blue-600">{item.date}</div>
            )}
            <h3 className="text-base font-semibold mt-1">{item.title}</h3>
            {item.description && (
              <p className="mt-1 text-sm text-gray-600">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;`,
    previewBg: "bg-white",
    previewHtml: '<div><div class="relative pl-10 pb-10"><div class="absolute top-0 left-0 h-full w-0.5 bg-gray-200"></div><div class="absolute top-0 left-0 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-2 border-blue-500 z-10"></div><div class="mt-0"><div class="text-sm font-medium text-blue-600">January 2023</div><h3 class="text-base font-semibold mt-1">Project Start</h3><p class="mt-1 text-sm text-gray-600">Initial planning and team formation.</p></div></div><div class="relative pl-10 pb-10"><div class="absolute top-0 left-0 h-full w-0.5 bg-gray-200"></div><div class="absolute top-0 left-0 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-2 border-blue-500 z-10"></div><div class="mt-0"><div class="text-sm font-medium text-blue-600">March 2023</div><h3 class="text-base font-semibold mt-1">Development Phase</h3><p class="mt-1 text-sm text-gray-600">Building core features and architecture.</p></div></div><div class="relative pl-10 pb-0"><div class="absolute top-0 left-0 h-full w-0.5 bg-gray-200"></div><div class="absolute top-0 left-0 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-2 border-blue-500 z-10"></div><div class="mt-0"><div class="text-sm font-medium text-blue-600">June 2023</div><h3 class="text-base font-semibold mt-1">Product Launch</h3><p class="mt-1 text-sm text-gray-600">Successfully released product to market.</p></div></div></div>',
    tags: ["timeline", "history", "events", "chronological"]
  },
  {
    id: 19,
    name: "Image Carousel",
    category: "Media",
    framework: "React",
    price: 18,
    description: "Responsive image slideshow with navigation controls",
    code: `import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageCarousel = ({ 
  images, 
  autoPlay = false,
  interval = 3000,
  showControls = true,
  showIndicators = true,
  className = "" 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const next = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);
  
  const prev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };
  
  // Set up automatic sliding if autoPlay is true
  useEffect(() => {
    if (!autoPlay) return;
    
    const slideInterval = setInterval(next, interval);
    
    return () => clearInterval(slideInterval);
  }, [autoPlay, interval, next]);
  
  return (
    <div className={\`relative \${className}\`}>
      <div className="overflow-hidden relative rounded-lg">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: \`translateX(-\${currentIndex * 100}%)\` }}
        >
          {images.map((image, index) => (
            <div key={index} className="min-w-full">
              <img 
                src={image.src} 
                alt={image.alt || \`Slide \${index + 1}\`} 
                className="w-full h-64 sm:h-96 object-cover"
              />
              
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                  <p className="text-sm sm:text-base">{image.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {showControls && (
        <>
          <button
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            onClick={prev}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            onClick={next}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}
      
      {showIndicators && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button 
              key={index}
              className={\`w-2 h-2 rounded-full \${
                currentIndex === index ? 'bg-white' : 'bg-white bg-opacity-50'
              }\`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;`,
    previewBg: "bg-gray-100",
    previewHtml: '<div class="relative"><div class="overflow-hidden relative rounded-lg"><div class="flex transition-transform duration-500 ease-out" style="transform: translateX(0%)"><div class="min-w-full"><img src="https://source.unsplash.com/random/800x600/?nature" alt="Slide 1" class="w-full h-64 sm:h-96 object-cover"><div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4"><p class="text-sm sm:text-base">Beautiful mountain landscape</p></div></div></div></div><button class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><polyline points="15 18 9 12 15 6"></polyline></svg></button><button class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><polyline points="9 18 15 12 9 6"></polyline></svg></button><div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"><button class="w-2 h-2 rounded-full bg-white"></button><button class="w-2 h-2 rounded-full bg-white bg-opacity-50"></button><button class="w-2 h-2 rounded-full bg-white bg-opacity-50"></button></div></div>',
    tags: ["carousel", "slider", "gallery", "images"]
  },
  {
    id: 20,
    name: "Notification",
    category: "Feedback",
    framework: "React",
    price: 10,
    description: "Customizable notification component with different types and positions",
    code: `import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const Notification = ({ 
  title,
  message,
  type = 'info',
  position = 'top-right',
  duration = 5000,
  onClose,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />
  };
  
  const styles = {
    success: 'bg-green-50 border-green-500',
    error: 'bg-red-50 border-red-500',
    warning: 'bg-yellow-50 border-yellow-500',
    info: 'bg-blue-50 border-blue-500'
  };
  
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
  };
  
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, 300); // Allow time for fade-out animation
  };
  
  // Auto-dismiss after duration
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration]);
  
  if (!isVisible) return null;
  
  return (
    <div 
      className={\`fixed \${positionClasses[position]} z-50 w-72 sm:w-96 transition-opacity duration-300 \${isVisible ? 'opacity-100' : 'opacity-0'} \${className}\`}
    >
      <div className={\`flex items-start p-4 rounded-lg shadow-lg border-l-4 \${styles[type]}\`}>
        <div className="flex-shrink-0">
          {icons[type]}
        </div>
        <div className="ml-3 w-0 flex-1">
          {title && <h3 className="text-sm font-medium text-gray-900">{title}</h3>}
          {message && <div className="mt-1 text-sm text-gray-500">{message}</div>}
        </div>
        <button
          type="button"
          className="ml-4 inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
          onClick={handleClose}
        >
          <span className="sr-only">Close</span>
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

const NotificationContainer = ({ notifications = [], onDismiss }) => {
  return (
    <>
      {notifications.map((notification) => (
        <Notification 
          key={notification.id}
          {...notification}
          onClose={() => onDismiss(notification.id)}
        />
      ))}
    </>
  );
};

export { Notification, NotificationContainer };`,
    previewBg: "bg-gray-100",
    previewHtml: '<div class="fixed top-4 right-4 z-50 w-72 sm:w-96 transition-opacity duration-300 opacity-100"><div class="flex items-start p-4 rounded-lg shadow-lg border-l-4 bg-green-50 border-green-500"><div class="flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></div><div class="ml-3 w-0 flex-1"><h3 class="text-sm font-medium text-gray-900">Success</h3><div class="mt-1 text-sm text-gray-500">Your changes have been saved successfully.</div></div><button type="button" class="ml-4 inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"><span class="sr-only">Close</span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div></div>',
    tags: ["notification", "toast", "alert", "message"]
  },
  {
    id: 21,
    name: "Search Input",
    category: "Forms",
    framework: "React",
    price: "Free",
    description: "A search input field with magnifying glass icon and clear button",
    code: `import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchInput = ({ 
  value, 
  onChange, 
  onSubmit, 
  placeholder = 'Search...',
  size = 'md',
  className = ""
}) => {
  const [inputValue, setInputValue] = useState(value || '');
  
  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };
  
  const handleClear = () => {
    setInputValue('');
    if (onChange) {
      onChange('');
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(inputValue);
    }
  };
  
  const sizeClasses = {
    sm: 'h-8 text-xs',
    md: 'h-10 text-sm',
    lg: 'h-12 text-base'
  };
  
  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className={size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} stroke="currentColor" />
        </div>
        <input
          type="search"
          className={\`block w-full border border-gray-300 rounded-lg \${
            sizeClasses[size]
          } pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500\`}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
        />
        {inputValue && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={handleClear}
          >
            <X className={size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} stroke="currentColor" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchInput;`,
    previewBg: "bg-white",
    previewHtml: '<div class="relative"><div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div><input type="search" class="block w-full border border-gray-300 rounded-lg h-10 text-sm pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Search..." value="React"><button type="button" class="absolute inset-y-0 right-0 flex items-center pr-3"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div>',
    tags: ["search", "input", "form", "filter"]
  },
  {
    id: 22,
    name: "Comment Section",
    category: "Social",
    framework: "React",
    price: 20,
    description: "Comment section with nested replies and user avatars",
    code: `import React, { useState } from 'react';
import { Reply, ThumbsUp, MoreHorizontal } from 'lucide-react';

const CommentForm = ({ onSubmit, placeholder = 'Add a comment...', buttonText = 'Post', initialValue = '' }) => {
  const [comment, setComment] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment);
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        rows="3"
        placeholder={placeholder}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <div className="mt-2 flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
          disabled={!comment.trim()}
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

const Comment = ({ comment, onReply, onLike, onDeleteComment }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReply = (content) => {
    onReply(comment.id, content);
    setShowReplyForm(false);
  };

  const handleLike = () => {
    onLike(comment.id);
  };

  return (
    <div className="mb-4">
      <div className="flex items-start space-x-3">
        <img
          src={comment.author.avatar || 'https://via.placeholder.com/40'}
          alt={comment.author.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">{comment.author.name}</h4>
              <p className="text-xs text-gray-500">{comment.date}</p>
            </div>
            <button className="text-gray-500">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <p className="mt-2 text-gray-800">{comment.content}</p>
          <div className="mt-3 flex items-center space-x-4 text-xs">
            <button
              className={\`flex items-center text-gray-500 hover:text-blue-600 \${comment.liked ? 'text-blue-600' : ''}\`}
              onClick={handleLike}
            >
              <ThumbsUp className="w-4 h-4 mr-1" />
              {comment.likes > 0 && <span>{comment.likes}</span>}
              <span className="ml-1">Like</span>
            </button>
            <button
              className="flex items-center text-gray-500 hover:text-blue-600"
              onClick={() => setShowReplyForm(!showReplyForm)}
            >
              <Reply className="w-4 h-4 mr-1" />
              <span>Reply</span>
            </button>
            {comment.canDelete && (
              <button
                className="flex items-center text-gray-500 hover:text-red-600"
                onClick={() => onDeleteComment(comment.id)}
              >
                <span>Delete</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {showReplyForm && (
        <div className="ml-12 mt-3">
          <CommentForm onSubmit={handleReply} placeholder="Write a reply..." buttonText="Reply" />
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-12 mt-3 space-y-3">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onLike={onLike}
              onDeleteComment={onDeleteComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CommentSection = ({
  comments = [],
  currentUser,
  onAddComment,
  onReply,
  onLike,
  onDeleteComment,
  className = ""
}) => {
  return (
    <div className={className}>
      <h3 className="text-lg font-medium mb-4">Comments ({comments.length})</h3>
      
      <CommentForm onSubmit={onAddComment} />
      
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onReply={onReply}
          onLike={onLike}
          onDeleteComment={onDeleteComment}
        />
      ))}
      
      {comments.length === 0 && (
        <p className="text-center text-gray-500 my-6">No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
};

export default CommentSection;`,
    previewBg: "bg-white",
    previewHtml: '<div><h3 class="text-lg font-medium mb-4">Comments (2)</h3><form class="mb-4"><textarea class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" rows="3" placeholder="Add a comment..."></textarea><div class="mt-2 flex justify-end"><button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium" disabled>Post</button></div></form><div class="mb-4"><div class="flex items-start space-x-3"><img src="https://via.placeholder.com/40" alt="John Doe" class="w-10 h-10 rounded-full"><div class="flex-1 bg-gray-50 rounded-lg p-4"><div class="flex items-center justify-between"><div><h4 class="font-medium text-gray-900">John Doe</h4><p class="text-xs text-gray-500">2 hours ago</p></div><button class="text-gray-500"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></button></div><p class="mt-2 text-gray-800">This component is really useful! Thank you for sharing.</p><div class="mt-3 flex items-center space-x-4 text-xs"><button class="flex items-center text-blue-600"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 mr-1"></svg><span>3</span><span class="ml-1">Like</span></button><button class="flex items-center text-gray-500 hover:text-blue-600"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 mr-1"></svg><span>Reply</span></button></div></div></div></div></div>',
    tags: ["comments", "discussion", "replies", "social"]
  },
  {
    id: 23,
    name: "Pricing Table",
    category: "Marketing",
    framework: "React",
    price: 15,
    description: "Subscription pricing table with multiple tiers and feature comparison",
    code: `import React from 'react';
import { Check, X } from 'lucide-react';

const PricingFeature = ({ feature, included }) => {
  return (
    <li className="flex items-start py-2">
      <div className="flex-shrink-0 mt-0.5">
        {included ? (
          <Check className="h-5 w-5 text-green-500" />
        ) : (
          <X className="h-5 w-5 text-gray-400" />
        )}
      </div>
      <span className={\`ml-2 text-sm \${included ? 'text-gray-800' : 'text-gray-500'}\`}>
        {feature}
      </span>
    </li>
  );
};

const PricingTier = ({
  name,
  price,
  billing = 'monthly',
  description,
  features = [],
  buttonText = 'Get started',
  buttonVariant = 'primary',
  popular = false,
  onButtonClick,
  className = ""
}) => {
  const buttonStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400',
    outline: 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-blue-600'
  };

  return (
    <div className={\`flex flex-col overflow-hidden rounded-lg border bg-white \${popular ? 'shadow-lg border-blue-500' : 'shadow-sm border-gray-200'} \${className}\`}>
      {popular && (
        <div className="bg-blue-500 py-1 text-center text-xs font-medium text-white">
          Popular choice
        </div>
      )}
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900">{name}</h3>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
        <div className="mt-4">
          <span className="text-3xl font-extrabold text-gray-900">{price}</span>
          <span className="text-sm font-medium text-gray-500">/{billing}</span>
        </div>
        
        <ul className="mt-6 space-y-2">
          {features.map((feature, index) => (
            <PricingFeature 
              key={index} 
              feature={feature.name} 
              included={feature.included} 
            />
          ))}
        </ul>
        
        <button
          type="button"
          className={\`mt-8 w-full rounded-md px-4 py-2 text-sm font-medium \${buttonStyles[buttonVariant]} focus:outline-none focus:ring-2 focus:ring-offset-2\`}
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

const PricingTable = ({ 
  tiers, 
  columns = 3,
  className = "" 
}) => {
  const gridCols = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4'
  };
  
  return (
    <div className={className}>
      <div className={\`grid grid-cols-1 gap-6 \${gridCols[columns]}\`}>
        {tiers.map((tier, index) => (
          <PricingTier key={index} {...tier} />
        ))}
      </div>
    </div>
  );
};

export default PricingTable;`,
    previewBg: "bg-gray-50",
    previewHtml: '<div><div class="grid grid-cols-1 gap-6 md:grid-cols-3"><div class="flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm border-gray-200"><div class="p-6"><h3 class="text-lg font-medium text-gray-900">Basic</h3><p class="mt-2 text-sm text-gray-500">All the basics to get started.</p><div class="mt-4"><span class="text-3xl font-extrabold text-gray-900">$9</span><span class="text-sm font-medium text-gray-500">/monthly</span></div><ul class="mt-6 space-y-2"><li class="flex items-start py-2"><div class="flex-shrink-0 mt-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg></div><span class="ml-2 text-sm text-gray-800">5 products</span></li><li class="flex items-start py-2"><div class="flex-shrink-0 mt-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg></div><span class="ml-2 text-sm text-gray-800">Basic analytics</span></li><li class="flex items-start py-2"><div class="flex-shrink-0 mt-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-gray-400"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div><span class="ml-2 text-sm text-gray-500">Priority support</span></li></ul><button type="button" class="mt-8 w-full rounded-md px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2">Get started</button></div></div><div class="flex flex-col overflow-hidden rounded-lg border bg-white shadow-lg border-blue-500"><div class="bg-blue-500 py-1 text-center text-xs font-medium text-white">Popular choice</div><div class="p-6"><h3 class="text-lg font-medium text-gray-900">Pro</h3><p class="mt-2 text-sm text-gray-500">Perfect for growing businesses.</p><div class="mt-4"><span class="text-3xl font-extrabold text-gray-900">$29</span><span class="text-sm font-medium text-gray-500">/monthly</span></div><ul class="mt-6 space-y-2"><li class="flex items-start py-2"><div class="flex-shrink-0 mt-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg></div><span class="ml-2 text-sm text-gray-800">25 products</span></li><li class="flex items-start py-2"><div class="flex-shrink-0 mt-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg></div><span class="ml-2 text-sm text-gray-800">Advanced analytics</span></li><li class="flex items-start py-2"><div class="flex-shrink-0 mt-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg></div><span class="ml-2 text-sm text-gray-800">Priority support</span></li></ul><button type="button" class="mt-8 w-full rounded-md px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2">Get started</button></div></div></div></div>',
    tags: ["pricing", "subscription", "payment", "marketing"]
  },
  {
    id: 24,
    name: "Feature Comparison Table",
    category: "Marketing",
    framework: "React",
    price: 12,
    description: "Compare features across different plans or products",
    code: `import React from 'react';
import { Check, X, Minus } from 'lucide-react';

const ComparisonTable = ({ 
  headers, 
  features,
  className = "" 
}) => {
  // Render feature value based on its type
  const renderValue = (value) => {
    if (value === true) {
      return <Check className="h-5 w-5 text-green-500 mx-auto" />;
    } else if (value === false) {
      return <X className="h-5 w-5 text-gray-400 mx-auto" />;
    } else if (value === null) {
      return <Minus className="h-5 w-5 text-gray-400 mx-auto" />;
    } else {
      return <span>{value}</span>;
    }
  };
  
  return (
    <div className={\`overflow-x-auto \${className}\`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900">
              Features
            </th>
            {headers.map((header, index) => (
              <th 
                key={index} 
                scope="col" 
                className={\`px-3 py-3.5 text-center text-sm font-semibold text-gray-900 \${header.highlight ? 'bg-blue-50' : ''}\`}
              >
                {header.name}
                {header.description && (
                  <div className="font-normal text-gray-500">{header.description}</div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {features.map((feature, featureIndex) => (
            <tr key={featureIndex} className={featureIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <th 
                scope="row" 
                className="py-4 pl-6 pr-3 text-left text-sm font-medium text-gray-900"
              >
                {feature.name}
                {feature.description && (
                  <div className="font-normal text-gray-500">{feature.description}</div>
                )}
              </th>
              {headers.map((header, headerIndex) => (
                <td 
                  key={headerIndex} 
                  className={\`px-3 py-4 text-center text-sm \${header.highlight ? 'bg-blue-50' : ''}\`}
                >
                  {renderValue(feature.values[headerIndex])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;`,
    previewBg: "bg-gray-100",
    previewHtml: '<div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th scope="col" class="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900">Features</th><th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 ">Basic<div class="font-normal text-gray-500">$9/month</div></th><th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 bg-blue-50">Pro<div class="font-normal text-gray-500">$29/month</div></th><th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 ">Enterprise<div class="font-normal text-gray-500">$99/month</div></th></tr></thead><tbody class="divide-y divide-gray-200 bg-white"><tr class="bg-white"><th scope="row" class="py-4 pl-6 pr-3 text-left text-sm font-medium text-gray-900">Number of users<div class="font-normal text-gray-500">How many users can access</div></th><td class="px-3 py-4 text-center text-sm "><span>1</span></td><td class="px-3 py-4 text-center text-sm bg-blue-50"><span>10</span></td><td class="px-3 py-4 text-center text-sm "><span>Unlimited</span></td></tr><tr class="bg-gray-50"><th scope="row" class="py-4 pl-6 pr-3 text-left text-sm font-medium text-gray-900">Customer support</th><td class="px-3 py-4 text-center text-sm "><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-gray-400 mx-auto"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></td><td class="px-3 py-4 text-center text-sm bg-blue-50"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-green-500 mx-auto"><polyline points="20 6 9 17 4 12"></polyline></svg></td><td class="px-3 py-4 text-center text-sm "><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-green-500 mx-auto"><polyline points="20 6 9 17 4 12"></polyline></svg></td></tr><tr class="bg-white"><th scope="row" class="py-4 pl-6 pr-3 text-left text-sm font-medium text-gray-900">API access</th><td class="px-3 py-4 text-center text-sm "><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-gray-400 mx-auto"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></td><td class="px-3 py-4 text-center text-sm bg-blue-50"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-green-500 mx-auto"><polyline points="20 6 9 17 4 12"></polyline></svg></td><td class="px-3 py-4 text-center text-sm "><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-green-500 mx-auto"><polyline points="20 6 9 17 4 12"></polyline></svg></td></tr></tbody></table></div>',
    tags: ["comparison", "table", "features", "pricing"]
  },
  {
    id: 25,
    name: "Statistic Card",
    category: "Display",
    framework: "React",
    price: 5,
    description: "Card for displaying key metrics and statistics",
    code: `import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const StatisticCard = ({ 
  title, 
  value, 
  icon,
  change,
  changeType = 'neutral', // 'positive', 'negative', 'neutral'
  formatter,
  description,
  className = "" 
}) => {
  // Format the displayed value if a formatter function is provided
  const formattedValue = formatter ? formatter(value) : value;
  
  // Determine change indicator style based on change type
  const getChangeStyle = () => {
    if (changeType === 'positive') {
      return {
        color: 'text-green-600',
        bg: 'bg-green-100',
        icon: <ArrowUp className="h-3 w-3" />
      };
    } else if (changeType === 'negative') {
      return {
        color: 'text-red-600',
        bg: 'bg-red-100',
        icon: <ArrowDown className="h-3 w-3" />
      };
    } else {
      return {
        color: 'text-gray-600',
        bg: 'bg-gray-100',
        icon: null
      };
    }
  };
  
  const changeStyle = getChangeStyle();
  
  return (
    <div className={\`bg-white rounded-lg border border-gray-200 p-5 shadow-sm \${className}\`}>
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {icon && (
          <div className="p-2 bg-gray-100 rounded-md">
            {icon}
          </div>
        )}
      </div>
      
      <div className="mt-2">
        <div className="text-2xl font-bold text-gray-900">{formattedValue}</div>
        
        {change && (
          <div className="flex items-center mt-2">
            <span className={\`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium \${changeStyle.color} \${changeStyle.bg}\`}>
              {changeStyle.icon}
              <span className="ml-1">{change}</span>
            </span>
            {description && (
              <span className="ml-2 text-xs text-gray-500">{description}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatisticCard;`,
    previewBg: "bg-gray-100",
    previewHtml: '<div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div class="bg-white rounded-lg border border-gray-200 p-5 shadow-sm"><div class="flex justify-between items-center"><h3 class="text-sm font-medium text-gray-500">Total Revenue</h3><div class="p-2 bg-gray-100 rounded-md"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></div></div><div class="mt-2"><div class="text-2xl font-bold text-gray-900">$35,256</div><div class="flex items-center mt-2"><span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-green-600 bg-green-100"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg><span class="ml-1">12%</span></span><span class="ml-2 text-xs text-gray-500">vs previous month</span></div></div></div><div class="bg-white rounded-lg border border-gray-200 p-5 shadow-sm"><div class="flex justify-between items-center"><h3 class="text-sm font-medium text-gray-500">New Customers</h3><div class="p-2 bg-gray-100 rounded-md"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div></div><div class="mt-2"><div class="text-2xl font-bold text-gray-900">573</div><div class="flex items-center mt-2"><span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-green-600 bg-green-100"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg><span class="ml-1">8.2%</span></span><span class="ml-2 text-xs text-gray-500">vs previous month</span></div></div></div><div class="bg-white rounded-lg border border-gray-200 p-5 shadow-sm"><div class="flex justify-between items-center"><h3 class="text-sm font-medium text-gray-500">Conversion Rate</h3><div class="p-2 bg-gray-100 rounded-md"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg></div></div><div class="mt-2"><div class="text-2xl font-bold text-gray-900">3.2%</div><div class="flex items-center mt-2"><span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-red-600 bg-red-100"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg><span class="ml-1">1.1%</span></span><span class="ml-2 text-xs text-gray-500">vs previous month</span></div></div></div></div>',
    tags: ["statistics", "metrics", "analytics", "dashboard"]
  },
  {
    id: 26,
    name: "Testimonial",
    category: "Marketing",
    framework: "React",
    price: "Free",
    description: "Customer testimonial component with quote and rating",
    code: `import React from 'react';
import { Star } from 'lucide-react';

const Testimonial = ({ 
  quote, 
  author = {}, 
  rating,
  variant = 'card',
  className = "" 
}) => {
  // Render stars for rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star 
        key={index} 
        size={16} 
        className={\`\${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }\`} 
      />
    ));
  };
  
  // Card variant for testimonial
  const CardTestimonial = () => (
    <div className={\`bg-white p-6 rounded-lg shadow-sm border border-gray-200 \${className}\`}>
      {rating && (
        <div className="flex items-center mb-4">
          {renderStars(rating)}
        </div>
      )}
      
      <blockquote>
        <p className="text-gray-800 font-medium">{quote}</p>
      </blockquote>
      
      <div className="mt-4 flex items-center">
        {author.avatar && (
          <img 
            src={author.avatar} 
            alt={author.name} 
            className="h-10 w-10 rounded-full mr-3"
          />
        )}
        <div>
          <div className="font-medium text-gray-900">{author.name}</div>
          {author.title && (
            <div className="text-sm text-gray-500">{author.title}</div>
          )}
        </div>
      </div>
    </div>
  );
  
  // Simple variant for testimonial
  const SimpleTestimonial = () => (
    <div className={\`\${className}\`}>
      <div className="relative">
        <svg 
          className="absolute top-0 left-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-gray-100"
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          aria-hidden="true"
        >
          <path 
            d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.68978 8.45999C7.16018 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9164 8.45999C14.3868 8.93999 14.6242 9.55333 14.6242 10.3Z" 
            fill="currentColor"
          />
        </svg>
        
        <blockquote className="relative">
          <p className="text-lg font-medium text-gray-900">{quote}</p>
        </blockquote>
      </div>
      
      <footer className="mt-4">
        <div className="flex items-center">
          {author.avatar && (
            <img 
              src={author.avatar} 
              alt={author.name} 
              className="h-10 w-10 rounded-full mr-3"
            />
          )}
          <div>
            <div className="font-medium text-gray-900">{author.name}</div>
            {author.title && (
              <div className="text-sm text-gray-500">{author.title}</div>
            )}
          </div>
        </div>
        
        {rating && (
          <div className="flex items-center mt-2">
            {renderStars(rating)}
          </div>
        )}
      </footer>
    </div>
  );
  
  return variant === 'card' ? <CardTestimonial /> : <SimpleTestimonial />;
};

export default Testimonial;`,
    previewBg: "bg-gray-100",
    previewHtml: '<div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"><div class="flex items-center mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-400 fill-yellow-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-400 fill-yellow-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-400 fill-yellow-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-400 fill-yellow-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-400 fill-yellow-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div><blockquote><p class="text-gray-800 font-medium">This component library has completely transformed our development workflow. The components are beautifully designed, highly flexible, and exceptionally easy to integrate.</p></blockquote><div class="mt-4 flex items-center"><img src="https://randomuser.me/api/portraits/women/48.jpg" alt="Sarah Johnson" class="h-10 w-10 rounded-full mr-3"><div><div class="font-medium text-gray-900">Sarah Johnson</div><div class="text-sm text-gray-500">Product Manager, Acme Inc.</div></div></div></div>',
    tags: ["testimonial", "review", "quote", "customer"]
  },
  {
    id: 27,
    name: "Data Table",
    category: "Display",
    framework: "React",
    price: 25,
    description: "Sortable, filterable, and paginated data table",
    code: `import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const DataTable = ({
  columns,
  data,
  initialSort = { field: null, direction: 'asc' },
  searchable = true,
  pagination = true,
  pageSize = 10,
  className = ""
}) => {
  const [sortConfig, setSortConfig] = useState(initialSort);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Sort the data
  const sortedData = useMemo(() => {
    let sortableData = [...data];
    
    if (sortConfig.field) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.field] < b[sortConfig.field]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.field] > b[sortConfig.field]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return sortableData;
  }, [data, sortConfig]);
  
  // Filter the sorted data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return sortedData;
    
    return sortedData.filter(item => 
      columns.some(column => {
        if (!column.searchable) return false;
        
        const value = item[column.field]?.toString().toLowerCase();
        return value?.includes(searchTerm.toLowerCase());
      })
    );
  }, [sortedData, searchTerm, columns]);
  
  // Paginate the filtered data
  const paginatedData = useMemo(() => {
    if (!pagination) return filteredData;
    
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize, pagination]);
  
  const totalPages = useMemo(() => {
    return Math.ceil(filteredData.length / pageSize);
  }, [filteredData, pageSize]);
  
  // Request sort for a column
  const requestSort = (field) => {
    let direction = 'asc';
    
    if (sortConfig.field === field) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        field = null; // Clear sort
      }
    }
    
    setSortConfig({ field, direction });
  };
  
  // Get the appropriate sort indicator
  const getSortIndicator = (field) => {
    if (sortConfig.field !== field) {
      return null;
    }
    
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="h-4 w-4" />
      : <ChevronDown className="h-4 w-4" />;
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };
  
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };
  
  return (
    <div className={className}>
      {searchable && (
        <div className="mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearch}
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search..."
            />
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto relative rounded-md border border-gray-200">
        <table className="w-full text-sm text-left text-gray-900">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.field}
                  scope="col"
                  className="px-6 py-3 cursor-pointer select-none"
                  onClick={() => requestSort(column.field)}
                >
                  <div className="flex items-center">
                    {column.label}
                    {getSortIndicator(column.field)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className="bg-white border-b hover:bg-gray-50"
              >
                {columns.map((column) => (
                  <td 
                    key={column.field} 
                    className="px-6 py-4 whitespace-nowrap"
                  >
                    {column.render 
                      ? column.render(row[column.field], row) 
                      : row[column.field]}
                  </td>
                ))}
              </tr>
            ))}
            
            {paginatedData.length === 0 && (
              <tr className="bg-white">
                <td
                  colSpan={columns.length}
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-700">
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} entries
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={\`px-3 py-1 rounded-md \${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }\`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            {[...Array(Math.min(5, totalPages))].map((_, index) => {
              let pageNum = currentPage;
              if (totalPages <= 5) {
                pageNum = index + 1;
              } else if (currentPage <= 3) {
                pageNum = index + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + index;
              } else {
                pageNum = currentPage - 2 + index;
              }
              
              return (
                <button
                  key={index}
                  onClick={() => goToPage(pageNum)}
                  className={\`px-3 py-1 rounded-md \${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }\`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={\`px-3 py-1 rounded-md \${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }\`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;`,
    previewBg: "bg-white",
    previewHtml: '<div><div class="mb-4"><div class="relative"><div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div><input type="search" value="" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Search..."></div></div><div class="overflow-x-auto relative rounded-md border border-gray-200"><table class="w-full text-sm text-left text-gray-900"><thead class="text-xs text-gray-700 uppercase bg-gray-50"><tr><th scope="col" class="px-6 py-3 cursor-pointer select-none"><div class="flex items-center">Name<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><polyline points="18 15 12 9 6 15"></polyline></svg></div></th><th scope="col" class="px-6 py-3 cursor-pointer select-none"><div class="flex items-center">Email</div></th><th scope="col" class="px-6 py-3 cursor-pointer select-none"><div class="flex items-center">Status</div></th><th scope="col" class="px-6 py-3 cursor-pointer select-none"><div class="flex items-center">Role</div></th></tr></thead><tbody><tr class="bg-white border-b hover:bg-gray-50"><td class="px-6 py-4 whitespace-nowrap">John Smith</td><td class="px-6 py-4 whitespace-nowrap">john@example.com</td><td class="px-6 py-4 whitespace-nowrap"><span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span></td><td class="px-6 py-4 whitespace-nowrap">Admin</td></tr><tr class="bg-white border-b hover:bg-gray-50"><td class="px-6 py-4 whitespace-nowrap">Alice Johnson</td><td class="px-6 py-4 whitespace-nowrap">alice@example.com</td><td class="px-6 py-4 whitespace-nowrap"><span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span></td><td class="px-6 py-4 whitespace-nowrap">User</td></tr><tr class="bg-white border-b hover:bg-gray-50"><td class="px-6 py-4 whitespace-nowrap">Robert Davis</td><td class="px-6 py-4 whitespace-nowrap">robert@example.com</td><td class="px-6 py-4 whitespace-nowrap"><span class="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Inactive</span></td><td class="px-6 py-4 whitespace-nowrap">User</td></tr></tbody></table></div><div class="flex items-center justify-between mt-4"><div class="text-sm text-gray-700">Showing 1 to 3 of 3 entries</div></div></div>',
    tags: ["table", "data", "sort", "filter", "pagination"]
  },
  {
    id: 28,
    name: "Select Menu",
    category: "Forms",
    framework: "React",
    price: 10,
    description: "Customizable dropdown select menu with search and multi-select options",
    code: `import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Check, Search } from 'lucide-react';

const SelectMenu = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  isSearchable = false,
  isMulti = false,
  isClearable = false,
  className = "",
  menuClassName = "",
  disabled = false,
  error
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const selectRef = useRef(null);
  const searchInputRef = useRef(null);
  
  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && isSearchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, isSearchable]);
  
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setSearchTerm('');
    }
  };
  
  const handleSelect = (option) => {
    if (isMulti) {
      const isSelected = Array.isArray(value) && value.some(item => item.value === option.value);
      
      if (isSelected) {
        // Remove the option
        onChange(value.filter(item => item.value !== option.value));
      } else {
        // Add the option
        onChange([...(Array.isArray(value) ? value : []), option]);
      }
    } else {
      onChange(option);
      setIsOpen(false);
    }
  };
  
  const handleClear = (e) => {
    e.stopPropagation();
    onChange(isMulti ? [] : null);
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const removeOption = (e, optionToRemove) => {
    e.stopPropagation();
    onChange(value.filter(item => item.value !== optionToRemove.value));
  };
  
  const filteredOptions = options.filter(option => 
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const isOptionSelected = (option) => {
    if (isMulti) {
      return Array.isArray(value) && value.some(item => item.value === option.value);
    }
    return value && value.value === option.value;
  };
  
  const displayValue = () => {
    if (!value) {
      return <span className="text-gray-400">{placeholder}</span>;
    }
    
    if (isMulti) {
      if (!Array.isArray(value) || value.length === 0) {
        return <span className="text-gray-400">{placeholder}</span>;
      }
      
      if (value.length === 1) {
        return value[0].label;
      }
      
      return (
        <div className="flex flex-wrap -m-1">
          {value.map(option => (
            <div
              key={option.value}
              className="inline-flex items-center m-1 bg-blue-100 text-blue-800 text-xs rounded px-2 py-1"
            >
              <span>{option.label}</span>
              <button
                type="button"
                onClick={(e) => removeOption(e, option)}
                className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      );
    }
    
    return value.label;
  };
  
  return (
    <div className={className} ref={selectRef}>
      <div
        className={\`relative flex items-center border rounded-md px-3 py-2 cursor-pointer bg-white \${
          disabled 
            ? 'bg-gray-100 cursor-not-allowed' 
            : 'hover:border-gray-400'
        } \${
          isOpen ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300'
        } \${
          error ? 'border-red-500' : ''
        }\`}
        onClick={toggleDropdown}
      >
        <div className="flex-grow truncate">{displayValue()}</div>
        <div className="flex items-center">
          {isClearable && value && (
            <button
              type="button"
              onClick={handleClear}
              className="mr-1 p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <X size={16} />
            </button>
          )}
          <ChevronDown 
            size={16} 
            className={\`text-gray-400 transition-transform \${isOpen ? 'transform rotate-180' : ''}\`} 
          />
        </div>
      </div>
      
      {error && (
        <div className="text-red-500 text-xs mt-1">{error}</div>
      )}
      
      {isOpen && (
        <div className={\`absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg \${menuClassName}\`}>
          {isSearchable && (
            <div className="p-2 border-b border-gray-200">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md"
                  placeholder="Search..."
                />
              </div>
            </div>
          )}
          
          <div className="max-h-60 overflow-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500">No options found</div>
            ) : (
              filteredOptions.map(option => (
                <div
                  key={option.value}
                  className={\`px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer flex items-center \${
                    isOptionSelected(option) ? 'bg-blue-50 font-medium' : ''
                  }\`}
                  onClick={() => handleSelect(option)}
                >
                  {isMulti && (
                    <div className="mr-2">
                      <div 
                        className={\`w-4 h-4 rounded border \${
                          isOptionSelected(option) 
                            ? 'bg-blue-500 border-blue-500' 
                            : 'border-gray-300'
                        }\`}
                      >
                        {isOptionSelected(option) && (
                          <Check size={16} className="text-white" />
                        )}
                      </div>
                    </div>
                  )}
                  {option.label}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectMenu;`,
    previewBg: "bg-white",
    previewHtml: '<div class="relative"><div class="relative flex items-center border rounded-md px-3 py-2 cursor-pointer bg-white border-blue-500 ring-1 ring-blue-500"><div class="flex-grow truncate"><div class="flex flex-wrap -m-1"><div class="inline-flex items-center m-1 bg-blue-100 text-blue-800 text-xs rounded px-2 py-1"><span>React</span><button type="button" class="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div><div class="inline-flex items-center m-1 bg-blue-100 text-blue-800 text-xs rounded px-2 py-1"><span>TypeScript</span><button type="button" class="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div></div></div><div class="flex items-center"><button type="button" class="mr-1 p-1 text-gray-400 hover:text-gray-600 focus:outline-none"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400 transition-transform transform rotate-180"><polyline points="6 9 12 15 18 9"></polyline></svg></div></div><div class="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg"><div class="p-2 border-b border-gray-200"><div class="relative"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div><input type="text" value="" class="block w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md" placeholder="Search..."></div></div><div class="max-h-60 overflow-auto"><div class="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer flex items-center bg-blue-50 font-medium"><div class="mr-2"><div class="w-4 h-4 rounded border bg-blue-500 border-blue-500"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><polyline points="20 6 9 17 4 12"></polyline></svg></div></div>React</div><div class="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer flex items-center bg-blue-50 font-medium"><div class="mr-2"><div class="w-4 h-4 rounded border bg-blue-500 border-blue-500"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><polyline points="20 6 9 17 4 12"></polyline></svg></div></div>TypeScript</div><div class="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer flex items-center"><div class="mr-2"><div class="w-4 h-4 rounded border border-gray-300"></div></div>JavaScript</div><div class="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer flex items-center"><div class="mr-2"><div class="w-4 h-4 rounded border border-gray-300"></div></div>Vue</div><div class="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer flex items-center"><div class="mr-2"><div class="w-4 h-4 rounded border border-gray-300"></div></div>Angular</div></div></div></div>',
    tags: ["select", "dropdown", "menu", "form", "multi-select"]
  },
  {
    id: 29,
    name: "Radio Group",
    category: "Forms",
    framework: "React",
    price: "Free",
    description: "Radio button group for single selection from multiple options",
    code: `import React from 'react';

const RadioGroup = ({
  options,
  value,
  onChange,
  name,
  direction = 'vertical',
  size = 'md',
  disabled = false,
  error,
  className = ""
}) => {
  const handleChange = (e) => {
    if (!disabled) {
      onChange(e.target.value);
    }
  };
  
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };
  
  const labelSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };
  
  return (
    <div className={className}>
      <div 
        className={\`\${
          direction === 'horizontal' ? 'flex flex-wrap gap-x-6' : 'space-y-2'
        }\`}
      >
        {options.map((option) => (
          <label 
            key={option.value} 
            className={\`flex items-center \${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}\`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={handleChange}
              disabled={disabled}
              className={\`\${sizeClasses[size]} text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2\`}
            />
            <span className={\`ml-2 \${labelSizeClasses[size]} text-gray-900\`}>
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default RadioGroup;`,
    previewBg: "bg-white",
    previewHtml: '<div><div class="space-y-2"><label class="flex items-center cursor-pointer"><input type="radio" name="plan" value="basic" checked class="h-5 w-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"><span class="ml-2 text-base text-gray-900">Basic Plan - $9/month</span></label><label class="flex items-center cursor-pointer"><input type="radio" name="plan" value="pro" class="h-5 w-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"><span class="ml-2 text-base text-gray-900">Pro Plan - $19/month</span></label><label class="flex items-center cursor-pointer"><input type="radio" name="plan" value="enterprise" class="h-5 w-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"><span class="ml-2 text-base text-gray-900">Enterprise - $49/month</span></label></div></div>',
    tags: ["radio", "input", "form", "selection"]
  },
  {
    id: 30,
    name: "Checkbox Group",
    category: "Forms",
    framework: "React",
    price: "Free",
    description: "Group of checkboxes for multiple selections",
    code: `import React from 'react';

const CheckboxGroup = ({
  options,
  value = [],
  onChange,
  direction = 'vertical',
  size = 'md',
  disabled = false,
  error,
  className = ""
}) => {
  const handleChange = (option) => {
    if (disabled) return;
    
    const newValue = [...value];
    const index = newValue.indexOf(option.value);
    
    if (index > -1) {
      newValue.splice(index, 1);
    } else {
      newValue.push(option.value);
    }
    
    onChange(newValue);
  };
  
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };
  
  const labelSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };
  
  return (
    <div className={className}>
      <div 
        className={\`\${
          direction === 'horizontal' ? 'flex flex-wrap gap-x-6' : 'space-y-2'
        }\`}
      >
        {options.map((option) => (
          <label 
            key={option.value} 
            className={\`flex items-center \${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}\`}
          >
            <input
              type="checkbox"
              checked={value.includes(option.value)}
              onChange={() => handleChange(option)}
              disabled={disabled}
              className={\`\${sizeClasses[size]} rounded text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2\`}
            />
            <span className={\`ml-2 \${labelSizeClasses[size]} text-gray-900\`}>
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default CheckboxGroup;`,
    previewBg: "bg-white",
    previewHtml: '<div><div class="space-y-2"><label class="flex items-center cursor-pointer"><input type="checkbox" checked class="h-5 w-5 rounded text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"><span class="ml-2 text-base text-gray-900">Email notifications</span></label><label class="flex items-center cursor-pointer"><input type="checkbox" class="h-5 w-5 rounded text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"><span class="ml-2 text-base text-gray-900">SMS notifications</span></label><label class="flex items-center cursor-pointer"><input type="checkbox" checked class="h-5 w-5 rounded text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"><span class="ml-2 text-base text-gray-900">Browser notifications</span></label></div></div>',
    tags: ["checkbox", "input", "form", "multiple selection"]
  },
  {
    id: 31,
    name: "Date Picker",
    category: "Forms",
    framework: "React",
    price: 20,
    description: "Calendar component for selecting dates",
    code: `import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const DatePicker = ({
  value,
  onChange,
  placeholder = 'Select date',
  format = 'MM/DD/YYYY',
  min,
  max,
  disabled = false,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (value) return new Date(value);
    return new Date();
  });
  
  const datePickerRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Format date as string
  const formatDate = (date) => {
    if (!date) return '';
    
    const d = new Date(date);
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const year = d.getFullYear();
    
    if (format === 'MM/DD/YYYY') {
      return \`\${month.toString().padStart(2, '0')}/\${day.toString().padStart(2, '0')}/\${year}\`;
    } else if (format === 'DD/MM/YYYY') {
      return \`\${day.toString().padStart(2, '0')}/\${month.toString().padStart(2, '0')}/\${year}\`;
    } else if (format === 'YYYY-MM-DD') {
      return \`\${year}-\${month.toString().padStart(2, '0')}-\${day.toString().padStart(2, '0')}\`;
    }
    
    return \`\${month.toString().padStart(2, '0')}/\${day.toString().padStart(2, '0')}/\${year}\`;
  };
  
  const toggleCalendar = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };
  
  const handleDateSelect = (date) => {
    onChange(date);
    setIsOpen(false);
  };
  
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  // Generate month days
  const generateDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get first day of month and last day
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Get the day of the week for the first day (0-6)
    let firstDayOfWeek = firstDay.getDay();
    if (firstDayOfWeek === 0) firstDayOfWeek = 7; // Make Sunday the 7th day
    
    const daysInMonth = lastDay.getDate();
    const days = [];
    
    // Previous month days to fill first week
    const prevMonthDays = firstDayOfWeek - 1;
    for (let i = 0; i < prevMonthDays; i++) {
      const prevDate = new Date(year, month, -i);
      days.unshift({
        date: prevDate,
        isCurrentMonth: false,
        isToday: isSameDay(prevDate, new Date()),
        isSelected: value && isSameDay(prevDate, new Date(value)),
        isDisabled: isDateDisabled(prevDate)
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: isSameDay(date, new Date()),
        isSelected: value && isSameDay(date, new Date(value)),
        isDisabled: isDateDisabled(date)
      });
    }
    
    // Next month days to fill last week
    const totalDaysNeeded = 42; // 6 rows of 7 days
    const nextMonthDays = totalDaysNeeded - days.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        isToday: isSameDay(nextDate, new Date()),
        isSelected: value && isSameDay(nextDate, new Date(value)),
        isDisabled: isDateDisabled(nextDate)
      });
    }
    
    return days;
  };
  
  // Check if two dates are the same day
  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };
  
  // Check if a date is disabled
  const isDateDisabled = (date) => {
    if (min && date < new Date(min)) return true;
    if (max && date > new Date(max)) return true;
    return false;
  };
  
  // Get month name
  const getMonthName = (date) => {
    return date.toLocaleString('default', { month: 'long' });
  };
  
  const days = generateDays();
  
  return (
    <div className={\`relative \${className}\`} ref={datePickerRef}>
      <div 
        className={\`flex items-center border rounded-md px-3 py-2 cursor-pointer bg-white \${
          disabled 
            ? 'bg-gray-100 cursor-not-allowed' 
            : 'hover:border-gray-400'
        } \${
          isOpen ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300'
        }\`}
        onClick={toggleCalendar}
      >
        <Calendar size={16} className="text-gray-400 mr-2" />
        <input 
          type="text" 
          className={\`flex-grow border-none focus:outline-none bg-transparent \${
            disabled ? 'cursor-not-allowed' : ''
          }\`}
          value={formatDate(value)}
          placeholder={placeholder}
          readOnly
          disabled={disabled}
        />
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <button 
              type="button" 
              className="p-1 rounded-md hover:bg-gray-100"
              onClick={handlePrevMonth}
            >
              <ChevronLeft size={16} />
            </button>
            <div className="font-medium">
              {getMonthName(currentMonth)} {currentMonth.getFullYear()}
            </div>
            <button 
              type="button" 
              className="p-1 rounded-md hover:bg-gray-100"
              onClick={handleNextMonth}
            >
              <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                {day}
              </div>
            ))}
            
            {days.map((day, index) => (
              <button
                key={index}
                type="button"
                className={\`p-1 text-sm rounded-md text-center \${
                  day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                } \${
                  day.isToday ? 'bg-gray-100' : ''
                } \${
                  day.isSelected ? 'bg-blue-500 text-white hover:bg-blue-600' : 'hover:bg-gray-100'
                } \${
                  day.isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                }\`}
                onClick={() => !day.isDisabled && handleDateSelect(day.date)}
                disabled={day.isDisabled}
              >
                {day.date.getDate()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;`,
    previewBg: "bg-white",
    previewHtml: '<div class="relative"><div class="flex items-center border rounded-md px-3 py-2 cursor-pointer bg-white hover:border-gray-400 border-blue-500 ring-1 ring-blue-500"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400 mr-2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg><input type="text" class="flex-grow border-none focus:outline-none bg-transparent" value="05/15/2023" placeholder="Select date" readonly=""></div><div class="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-3"><div class="flex justify-between items-center mb-2"><button type="button" class="p-1 rounded-md hover:bg-gray-100"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button><div class="font-medium">May 2023</div><button type="button" class="p-1 rounded-md hover:bg-gray-100"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button></div><div class="grid grid-cols-7 gap-1"><div class="text-center text-xs font-medium text-gray-500 py-1">Mo</div><div class="text-center text-xs font-medium text-gray-500 py-1">Tu</div><div class="text-center text-xs font-medium text-gray-500 py-1">We</div><div class="text-center text-xs font-medium text-gray-500 py-1">Th</div><div class="text-center text-xs font-medium text-gray-500 py-1">Fr</div><div class="text-center text-xs font-medium text-gray-500 py-1">Sa</div><div class="text-center text-xs font-medium text-gray-500 py-1">Su</div><button type="button" class="p-1 text-sm rounded-md text-center text-gray-400 hover:bg-gray-100 cursor-pointer">24</button><button type="button" class="p-1 text-sm rounded-md text-center text-gray-400 hover:bg-gray-100 cursor-pointer">25</button><button type="button" class="p-1 text-sm rounded-md text-center text-gray-400 hover:bg-gray-100 cursor-pointer">26</button><button type="button" class="p-1 text-sm rounded-md text-center text-gray-400 hover:bg-gray-100 cursor-pointer">27</button><button type="button" class="p-1 text-sm rounded-md text-center text-gray-400 hover:bg-gray-100 cursor-pointer">28</button><button type="button" class="p-1 text-sm rounded-md text-center text-gray-400 hover:bg-gray-100 cursor-pointer">29</button><button type="button" class="p-1 text-sm rounded-md text-center text-gray-400 hover:bg-gray-100 cursor-pointer">30</button><button type="button" class="p-1 text-sm rounded-md text-center text-gray-900 hover:bg-gray-100 cursor-pointer">1</button><button type="button" class="p-1 text-sm rounded-md text-center text-gray-900 hover:bg-gray-100 cursor-pointer">2</button><button type="button" class="p-1 text-sm rounded-md text-center text-gray-900 hover:bg-gray-100 cursor-pointer">3</button><button type="button" class="p-1 text-sm rounded-md text-center text-gray-900 hover:bg-gray-100 cursor-pointer">4</button><button type="button" class="p-1 text-sm rounded-md text-center text-gray-900 hover:bg-gray-100 cursor-pointer">5</button><button type="button" class="p-1 text-sm rounded-md text-center text-gray-900 hover:bg-gray-100 cursor-pointer">6</button><button type="button" class="p-1 text-sm rounded-md text-center text-gray-900 hover:bg-gray-100 cursor-pointer">7</button><button type="button" class="p-1 text-sm rounded-md text-center text-gray-900 hover:bg-gray-100 cursor-pointer">8</button><button type="button" class="p-1 text-sm rounded-md text-center text-gray-900 hover:bg-gray-100 cursor-pointer">9</button><button type="button" class="p-1 text-sm rounded-md text-center text-gray-900 hover:bg-gray-100 cursor-pointer">10</button><button type="button" class="p-1 text-sm rounded-md text-center text-gray-900 hover:bg-gray-100 cursor-pointer">11</button><button type="button" class="p-1 text-sm rounded-md text-center text-gray-900 hover:bg-gray-100 cursor-pointer">12</button><button type="button" class="p-1 text-sm rounded-md text-center text-gray-900 hover:bg-gray-100 cursor-pointer">13</button><button type="button" class="p-1 text-sm rounded-md text-center text-gray-900 hover:bg-gray-100 cursor-pointer">14</button><button type="button" class="p-1 text-sm rounded-md text-center text-gray-900 bg-blue-500 text-white hover:bg-blue-600 cursor-pointer">15</button></div></div></div>',
    tags: ["date", "picker", "calendar", "input", "form"]
  },
  {
    id: 32,
    name: "Sidebar",
    category: "Navigation",
    framework: "React",
    price: 15,
    description: "Responsive sidebar navigation with collapsible sections",
    code: `import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

const SidebarItem = ({ 
  item, 
  isActive, 
  onClick, 
  depth = 0, 
  expanded, 
  onToggleExpand 
}) => {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expanded[item.id];
  const indentClasses = \`pl-\${depth * 4}\`;
  
  return (
    <div>
      <div 
        className={\`flex items-center justify-between p-2 cursor-pointer \${indentClasses} \${
          isActive === item.id 
            ? 'bg-blue-50 text-blue-600 font-medium' 
            : 'hover:bg-gray-100'
        }\`}
        onClick={() => {
          onClick(item);
          if (hasChildren) {
            onToggleExpand(item.id);
          }
        }}
      >
        <div className="flex items-center">
          {item.icon && <div className="mr-3">{item.icon}</div>}
          <span>{item.label}</span>
        </div>
        {hasChildren && (
          <ChevronDown 
            className={\`transform transition-transform h-4 w-4 \${isExpanded ? 'rotate-180' : ''}\`} 
          />
        )}
      </div>
      
      {hasChildren && isExpanded && (
        <div className="mt-1">
          {item.children.map((child) => (
            <SidebarItem
              key={child.id}
              item={child}
              isActive={isActive}
              onClick={onClick}
              depth={depth + 1}
              expanded={expanded}
              onToggleExpand={onToggleExpand}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ 
  items = [], 
  onItemClick,
  initialActive = null,
  initialExpanded = {},
  showMobileMenu = true,
  header,
  footer,
  className = ""
}) => {
  const [activeItem, setActiveItem] = useState(initialActive);
  const [expanded, setExpanded] = useState(initialExpanded);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Handle window resize to close mobile menu when screen gets larger
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleItemClick = (item) => {
    setActiveItem(item.id);
    if (onItemClick) {
      onItemClick(item);
    }
    
    // Close mobile menu when item clicked
    if (window.innerWidth < 1024) {
      setMobileOpen(false);
    }
  };
  
  const toggleExpand = (itemId) => {
    setExpanded((prev) => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };
  
  return (
    <>
      {/* Mobile menu button */}
      {showMobileMenu && (
        <div className="lg:hidden p-4">
          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <Menu size={24} />
          </button>
        </div>
      )}
      
      {/* Sidebar for mobile (overlay) */}
      <div 
        className={\`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity duration-200 \${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }\`}
        onClick={() => setMobileOpen(false)}
      />
      
      {/* Sidebar */}
      <aside 
        className={\`fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-30 transition-transform duration-300 transform lg:translate-x-0 lg:relative lg:inset-auto lg:block \${
          mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'
        } \${className}\`}
      >
        {/* Close button for mobile */}
        {mobileOpen && (
          <button 
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <X size={24} />
          </button>
        )}
        
        {/* Header */}
        {header && (
          <div className="p-4 border-b border-gray-200">
            {header}
          </div>
        )}
        
        {/* Navigation Items */}
        <nav className="p-2 flex-grow overflow-y-auto">
          {items.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              isActive={activeItem}
              onClick={handleItemClick}
              expanded={expanded}
              onToggleExpand={toggleExpand}
            />
          ))}
        </nav>
        
        {/* Footer */}
        {footer && (
          <div className="p-4 border-t border-gray-200">
            {footer}
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;`,
    previewBg: "bg-gray-50",
    previewHtml: '<div class="flex"><aside class="fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-30 transition-transform duration-300 transform lg:translate-x-0 lg:relative lg:inset-auto lg:block translate-x-0 w-64"><div class="p-4 border-b border-gray-200"><div class="flex items-center space-x-2"><div class="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">A</div><span class="text-xl font-semibold">AppName</span></div></div><nav class="p-2 flex-grow overflow-y-auto"><div><div class="flex items-center justify-between p-2 cursor-pointer pl-0 bg-blue-50 text-blue-600 font-medium"><div class="flex items-center"><div class="mr-3"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></div><span>Dashboard</span></div></div></div><div><div class="flex items-center justify-between p-2 cursor-pointer pl-0 hover:bg-gray-100"><div class="flex items-center"><div class="mr-3"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div><span>Users</span></div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transform transition-transform h-4 w-4"><polyline points="6 9 12 15 18 9"></polyline></svg></div></div><div><div class="flex items-center justify-between p-2 cursor-pointer pl-0 hover:bg-gray-100"><div class="flex items-center"><div class="mr-3"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg></div><span>Settings</span></div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transform transition-transform h-4 w-4"><polyline points="6 9 12 15 18 9"></polyline></svg></div></div></nav><div class="p-4 border-t border-gray-200"><div class="flex items-center space-x-3"><img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" class="w-10 h-10 rounded-full"><div><div class="font-medium">John Doe</div><div class="text-sm text-gray-500">johndoe@example.com</div></div></div></div></aside></div>',
    tags: ["sidebar", "navigation", "menu", "collapse"]
  },
  {
    id: 33,
    name: "Code Block",
    category: "Display",
    framework: "React",
    price: 12,
    description: "Syntax highlighted code block with copy button",
    code: `import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

// This component assumes you are using a syntax highlighting library
// like Prism.js or highlight.js in your application for actual syntax highlighting
const CodeBlock = ({
  code,
  language = 'javascript',
  showLineNumbers = true,
  highlightLines = [],
  className = ""
}) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Split code into lines for line numbers and line highlighting
  const codeLines = code.split('\\n');
  
  return (
    <div className={\`relative rounded-lg overflow-hidden \${className}\`}>
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white">
        <div className="text-xs font-mono">{language}</div>
        <button
          onClick={handleCopy}
          className="flex items-center text-xs px-2 py-1 rounded-md hover:bg-gray-700 focus:outline-none"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-1" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      
      <div className="relative overflow-auto">
        <pre className="p-4 bg-gray-900 text-gray-50 text-sm font-mono">
          {showLineNumbers && (
            <div 
              className="absolute left-0 top-0 bottom-0 px-3 py-4 border-r border-gray-700 bg-gray-800 text-gray-500 select-none"
              style={{ width: '3rem' }}
            >
              {codeLines.map((_, i) => (
                <div 
                  key={i}
                  className="leading-relaxed text-right text-xs"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          )}
          
          <code className={\`language-\${language} block pl-\${showLineNumbers ? '14' : '0'}\`}>
            {codeLines.map((line, i) => {
              const isHighlighted = highlightLines.includes(i + 1);
              return (
                <div 
                  key={i} 
                  className={\`leading-relaxed \${isHighlighted ? 'bg-blue-900 bg-opacity-30 -mx-4 px-4' : ''}\`}
                >
                  {line === '' ? ' ' : line}
                </div>
              );
            })}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;`,
    previewBg: "bg-white",
    previewHtml: '<div class="relative rounded-lg overflow-hidden"><div class="flex items-center justify-between px-4 py-2 bg-gray-800 text-white"><div class="text-xs font-mono">javascript</div><button class="flex items-center text-xs px-2 py-1 rounded-md hover:bg-gray-700 focus:outline-none"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 mr-1"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg><span>Copy</span></button></div><div class="relative overflow-auto"><pre class="p-4 bg-gray-900 text-gray-50 text-sm font-mono"><div class="absolute left-0 top-0 bottom-0 px-3 py-4 border-r border-gray-700 bg-gray-800 text-gray-500 select-none" style="width: 3rem;"><div class="leading-relaxed text-right text-xs">1</div><div class="leading-relaxed text-right text-xs">2</div><div class="leading-relaxed text-right text-xs">3</div><div class="leading-relaxed text-right text-xs">4</div><div class="leading-relaxed text-right text-xs">5</div><div class="leading-relaxed text-right text-xs">6</div></div><code class="language-javascript block pl-14"><div class="leading-relaxed bg-blue-900 bg-opacity-30 -mx-4 px-4">// Example function</div><div class="leading-relaxed">function add(a, b) {</div><div class="leading-relaxed">  return a + b;</div><div class="leading-relaxed">}</div><div class="leading-relaxed"> </div><div class="leading-relaxed">console.log(add(2, 3)); // Output: 5</div></code></pre></div></div>',
    tags: ["code", "syntax", "programming", "highlight"]
  },
  {
    id: 34,
    name: "Image Upload",
    category: "Forms",
    framework: "React",
    price: 15,
    description: "Image upload component with preview and crop functionality",
    code: `import React, { useState, useRef } from 'react';
import { Upload, X, Image, Crop, Edit2 } from 'lucide-react';

const ImageUpload = ({
  value,
  onChange,
  maxSize = 5242880, // 5MB
  accept = 'image/*',
  aspectRatio,
  withCropping = false,
  placeholder = 'Drag & drop image or click to browse',
  className = ""
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(value ? URL.createObjectURL(value) : null);
  
  const fileInputRef = useRef(null);
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleClick = () => {
    fileInputRef.current.click();
  };
  
  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  
  const handleFile = (file) => {
    setError(null);
    
    // Check file type
    if (!file.type.match('image.*')) {
      setError('Please select an image file');
      return;
    }
    
    // Check file size
    if (file.size > maxSize) {
      setError(\`File size should not exceed \${maxSize / 1048576}MB\`);
      return;
    }
    
    // Create preview
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    
    setPreview(URL.createObjectURL(file));
    
    if (onChange) {
      onChange(file);
    }
  };
  
  const handleRemove = (e) => {
    e.stopPropagation();
    
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    
    setPreview(null);
    if (onChange) {
      onChange(null);
    }
  };
  
  // Cropping would require an actual cropping library like react-image-crop
  // This is a placeholder for the cropping functionality
  const handleCrop = () => {
    console.log('Image cropping would be implemented here with a library like react-image-crop');
  };
  
  return (
    <div className={className}>
      <div
        className={\`relative border-2 border-dashed rounded-lg p-4 text-center \${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }\`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept={accept}
          onChange={handleChange}
        />
        
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className={\`max-h-64 mx-auto rounded \${aspectRatio ? 'object-cover' : 'object-contain'}\`}
              style={aspectRatio ? { aspectRatio } : {}}
            />
            
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded">
              <button
                type="button"
                onClick={handleRemove}
                className="p-2 bg-red-500 text-white rounded-full mr-2"
              >
                <X size={16} />
              </button>
              
              {withCropping && (
                <button
                  type="button"
                  onClick={handleCrop}
                  className="p-2 bg-blue-500 text-white rounded-full"
                >
                  <Crop size={16} />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="py-6">
            <div className="mb-3">
              <Upload className="h-10 w-10 text-gray-400 mx-auto" />
            </div>
            <p className="text-sm text-gray-600 mb-2">{placeholder}</p>
            <p className="text-xs text-gray-500">
              Supported formats: JPG, PNG, GIF
              <br />
              Max file size: {maxSize / 1048576}MB
            </p>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default ImageUpload;`,
    previewBg: "bg-white",
    previewHtml: '<div><div class="relative border-2 border-dashed rounded-lg p-4 text-center border-gray-300 hover:border-gray-400"><input type="file" class="hidden"><div class="relative"><img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&amp;w=1000&amp;q=80" alt="Preview" class="max-h-64 mx-auto rounded object-contain"><div class="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded"><button type="button" class="p-2 bg-red-500 text-white rounded-full mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button><button type="button" class="p-2 bg-blue-500 text-white rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.13 1L6 16a2 2 0 0 0 2 2h15"></path><path d="M1 6.13L16 6a2 2 0 0 1 2 2v15"></path></svg></button></div></div></div></div>',
    tags: ["upload", "image", "preview", "crop", "form"]
  },
  {
    id: 35,
    name: "Range Slider",
    category: "Forms",
    framework: "React",
    price: 10,
    description: "Customizable range slider with min/max values and step control",
    code: `import React, { useState, useRef, useEffect } from 'react';

const RangeSlider = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  label,
  showValue = true,
  showMinMax = true,
  disabled = false,
  marks = [],
  className = ""
}) => {
  const [internalValue, setInternalValue] = useState(value || min);
  const sliderRef = useRef(null);
  
  // Sync internal state with prop value
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);
  
  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setInternalValue(newValue);
    
    if (onChange) {
      onChange(newValue);
    }
  };
  
  const calculateProgress = () => {
    return ((internalValue - min) / (max - min)) * 100;
  };
  
  const renderMarks = () => {
    if (!marks || marks.length === 0) return null;
    
    return (
      <div className="relative w-full h-6 mt-1">
        {marks.map((mark) => {
          const position = ((mark.value - min) / (max - min)) * 100;
          
          return (
            <div
              key={mark.value}
              className="absolute transform -translate-x-1/2"
              style={{ left: \`\${position}%\` }}
            >
              <div className="w-1 h-2 bg-gray-400"></div>
              {mark.label && (
                <div className="text-xs text-gray-500 mt-1">{mark.label}</div>
              )}
            </div>
          );
        })}
      </div>
    );
  };
  
  const progressPercent = calculateProgress();
  
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      )}
      
      <div className="flex items-center">
        <div className="relative flex-grow">
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="absolute h-2 bg-blue-500 rounded-full"
              style={{ width: \`\${progressPercent}%\` }}
            ></div>
          </div>
          
          <input
            ref={sliderRef}
            type="range"
            min={min}
            max={max}
            step={step}
            value={internalValue}
            onChange={handleChange}
            disabled={disabled}
            className={\`absolute inset-0 w-full h-2 opacity-0 cursor-pointer \${
              disabled ? 'cursor-not-allowed' : ''
            }\`}
          />
        </div>
        
        {showValue && (
          <div className="ml-4 w-12 text-right text-sm font-medium text-gray-900">
            {internalValue}
          </div>
        )}
      </div>
      
      {renderMarks()}
      
      {showMinMax && (
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
};

export default RangeSlider;`,
    previewBg: "bg-white",
    previewHtml: '<div><label class="block text-sm font-medium text-gray-700 mb-1">Volume</label><div class="flex items-center"><div class="relative flex-grow"><div class="h-2 bg-gray-200 rounded-full"><div class="absolute h-2 bg-blue-500 rounded-full" style="width: 75%;"></div></div><input type="range" min="0" max="100" step="1" value="75" class="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"></div><div class="ml-4 w-12 text-right text-sm font-medium text-gray-900">75</div></div><div class="relative w-full h-6 mt-1"><div class="absolute transform -translate-x-1/2" style="left: 0%;"><div class="w-1 h-2 bg-gray-400"></div><div class="text-xs text-gray-500 mt-1">Min</div></div><div class="absolute transform -translate-x-1/2" style="left: 50%;"><div class="w-1 h-2 bg-gray-400"></div><div class="text-xs text-gray-500 mt-1">Mid</div></div><div class="absolute transform -translate-x-1/2" style="left: 100%;"><div class="w-1 h-2 bg-gray-400"></div><div class="text-xs text-gray-500 mt-1">Max</div></div></div><div class="flex justify-between mt-1 text-xs text-gray-500"><span>0</span><span>100</span></div></div>',
    tags: ["slider", "range", "input", "form"]
  },
  {
    id: 36,
    name: "Feature Callout",
    category: "Marketing",
    framework: "React",
    price: "Free",
    description: "Highlight key features or benefits with icons and details",
    code: `import React from 'react';

const FeatureCallout = ({
  title,
  description,
  icon,
  orientation = 'vertical',
  align = 'center',
  color = 'blue',
  className = ""
}) => {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-100',
    green: 'text-green-600 bg-green-100',
    purple: 'text-purple-600 bg-purple-100',
    red: 'text-red-600 bg-red-100',
    yellow: 'text-yellow-600 bg-yellow-100',
    indigo: 'text-indigo-600 bg-indigo-100',
    pink: 'text-pink-600 bg-pink-100'
  };
  
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };
  
  return (
    <div 
      className={\`\${
        orientation === 'horizontal' ? 'flex items-center' : ''
      } \${alignClasses[align]} \${className}\`}
    >
      {icon && (
        <div 
          className={\`\${
            orientation === 'horizontal' ? 'mr-4 flex-shrink-0' : \`mx-auto mb-4 \${align === 'left' ? 'ml-0' : ''} \${align === 'right' ? 'mr-0' : ''}\`
          }\`}
        >
          <div 
            className={\`inline-flex items-center justify-center p-3 rounded-full \${colorClasses[color]}\`}
          >
            {icon}
          </div>
        </div>
      )}
      <div>
        {title && (
          <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
        )}
        {description && (
          <p className="text-base text-gray-600">{description}</p>
        )}
      </div>
    </div>
  );
};

const FeatureGrid = ({
  features,
  columns = 3,
  gap = 8,
  color = 'blue',
  className = ""
}) => {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  };
  
  const gapClasses = {
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
    10: 'gap-10'
  };
  
  return (
    <div className={\`grid \${columnClasses[columns]} \${gapClasses[gap]} \${className}\`}>
      {features.map((feature, index) => (
        <FeatureCallout
          key={index}
          {...feature}
          color={feature.color || color}
        />
      ))}
    </div>
  );
};

export { FeatureCallout, FeatureGrid };`,
    previewBg: "bg-white",
    previewHtml: '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"><div class="text-center"><div class="mx-auto mb-4"><div class="inline-flex items-center justify-center p-3 rounded-full text-blue-600 bg-blue-100"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></div></div><div><h3 class="text-lg font-medium text-gray-900 mb-1">Easy Integration</h3><p class="text-base text-gray-600">Our components are designed to integrate seamlessly with your existing projects.</p></div></div><div class="text-center"><div class="mx-auto mb-4"><div class="inline-flex items-center justify-center p-3 rounded-full text-green-600 bg-green-100"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg></div></div><div><h3 class="text-lg font-medium text-gray-900 mb-1">Customizable</h3><p class="text-base text-gray-600">Easily customize components to match your brand and design requirements.</p></div></div><div class="text-center"><div class="mx-auto mb-4"><div class="inline-flex items-center justify-center p-3 rounded-full text-purple-600 bg-purple-100"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg></div></div><div><h3 class="text-lg font-medium text-gray-900 mb-1">Responsive</h3><p class="text-base text-gray-600">All components are fully responsive and work great on any device size.</p></div></div></div>',
    tags: ["feature", "callout", "marketing", "benefit"]
  },
  {
    id: 37,
    name: "OTP Input",
    category: "Forms",
    framework: "React",
    price: 10,
    description: "One-time password input field for verification codes",
    code: `import React, { useState, useRef, useEffect } from 'react';

const OTPInput = ({
  length = 6,
  value = '',
  onChange,
  autoFocus = true,
  disabled = false,
  error,
  className = ""
}) => {
  const [otp, setOtp] = useState(value.split(''));
  const inputRefs = useRef([]);
  
  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);
  
  // Focus first input on mount if autoFocus is true
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);
  
  // Update internal state when value prop changes
  useEffect(() => {
    setOtp(value.padEnd(length, '').split('').slice(0, length));
  }, [value, length]);
  
  const handleChange = (e, index) => {
    const target = e.target;
    let value = target.value;
    
    // Only allow digits
    value = value.replace(/[^0-9]/g, '');
    
    // Take last character if pasted value has multiple characters
    if (value.length > 1) {
      value = value[value.length - 1];
    }
    
    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Call onChange with the new OTP string
    if (onChange) {
      onChange(newOtp.join(''));
    }
    
    // Move to next input if current one is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };
  
  const handleKeyDown = (e, index) => {
    // Move to previous input on backspace if current is empty
    if (
      e.key === 'Backspace' &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
    
    // Move to next input on right arrow
    if (
      e.key === 'ArrowRight' &&
      index < length - 1 &&
      inputRefs.current[index + 1]
    ) {
      inputRefs.current[index + 1].focus();
    }
    
    // Move to previous input on left arrow
    if (
      e.key === 'ArrowLeft' &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };
  
  const handlePaste = (e) => {
    e.preventDefault();
    
    // Get pasted text and remove non-digits
    const pastedData = e.clipboardData
      .getData('text/plain')
      .replace(/[^0-9]/g, '')
      .slice(0, length);
    
    // Fill the OTP array with pasted data
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      if (i < length) {
        newOtp[i] = pastedData[i];
      }
    }
    
    setOtp(newOtp);
    
    // Call onChange with the new OTP string
    if (onChange) {
      onChange(newOtp.join(''));
    }
    
    // Focus the last filled input or the first empty one
    const lastIndex = Math.min(pastedData.length, length) - 1;
    if (lastIndex >= 0 && inputRefs.current[lastIndex]) {
      inputRefs.current[lastIndex].focus();
    }
  };
  
  return (
    <div className={className}>
      <div className="flex space-x-2 justify-center">
        {[...Array(length)].map((_, index) => (
          <input
            key={index}
            type="text"
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            value={otp[index] || ''}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={index === 0 ? handlePaste : undefined}
            className={\`w-12 h-12 text-center text-xl font-semibold border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 \${
              error ? 'border-red-500' : 'border-gray-300'
            } \${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}\`}
            maxLength={1}
            disabled={disabled}
            aria-label={\`digit \${index + 1}\`}
          />
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default OTPInput;`,
    previewBg: "bg-white",
    previewHtml: '<div><div class="flex space-x-2 justify-center"><input type="text" value="1" class="w-12 h-12 text-center text-xl font-semibold border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300" maxlength="1" aria-label="digit 1"><input type="text" value="2" class="w-12 h-12 text-center text-xl font-semibold border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300" maxlength="1" aria-label="digit 2"><input type="text" value="3" class="w-12 h-12 text-center text-xl font-semibold border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300" maxlength="1" aria-label="digit 3"><input type="text" value="4" class="w-12 h-12 text-center text-xl font-semibold border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300" maxlength="1" aria-label="digit 4"><input type="text" value="" class="w-12 h-12 text-center text-xl font-semibold border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300" maxlength="1" aria-label="digit 5"><input type="text" value="" class="w-12 h-12 text-center text-xl font-semibold border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300" maxlength="1" aria-label="digit 6"></div></div>',
    tags: ["otp", "verification", "input", "form"]
  },
  {
    id: 38,
    name: "Skeleton Loader",
    category: "Feedback",
    framework: "React",
    price: "Free",
    description: "Loading placeholders for content that is still loading",
    code: `import React from 'react';

const Skeleton = ({ 
  variant = 'text',
  width,
  height,
  circle = false,
  className = "",
  animation = 'pulse',
  count = 1
}) => {
  const baseClasses = "bg-gray-200 rounded";
  const animationClasses = animation === 'pulse' 
    ? 'animate-pulse' 
    : animation === 'wave' 
      ? 'skeleton-wave' 
      : '';
  
  const renderSkeleton = (index) => {
    switch (variant) {
      case 'text':
        return (
          <div
            key={index}
            className={\`\${baseClasses} \${animationClasses} \${className}\`}
            style={{ 
              width: width || '100%', 
              height: height || '1rem',
              borderRadius: circle ? '50%' : undefined
            }}
          />
        );
      case 'rectangular':
        return (
          <div
            key={index}
            className={\`\${baseClasses} \${animationClasses} \${className}\`}
            style={{ 
              width: width || '100%', 
              height: height || '100px',
              borderRadius: circle ? '50%' : undefined
            }}
          />
        );
      case 'circular':
        return (
          <div
            key={index}
            className={\`\${baseClasses} \${animationClasses} rounded-full \${className}\`}
            style={{ 
              width: width || '40px', 
              height: height || '40px'
            }}
          />
        );
      case 'avatar':
        return (
          <div 
            key={index}
            className={\`\${baseClasses} \${animationClasses} rounded-full \${className}\`}
            style={{ 
              width: width || '40px', 
              height: height || '40px'
            }}
          />
        );
      case 'button':
        return (
          <div
            key={index}
            className={\`\${baseClasses} \${animationClasses} \${className}\`}
            style={{ 
              width: width || '80px', 
              height: height || '36px',
              borderRadius: '0.375rem'
            }}
          />
        );
      case 'card':
        return (
          <div 
            key={index}
            className={\`\${baseClasses} \${animationClasses} p-4 \${className}\`}
            style={{ 
              width: width || '100%', 
              height: height || '200px'
            }}
          />
        );
      default:
        return (
          <div
            key={index}
            className={\`\${baseClasses} \${animationClasses} \${className}\`}
            style={{ 
              width: width || '100%', 
              height: height || '1rem',
              borderRadius: circle ? '50%' : undefined
            }}
          />
        );
    }
  };
  
  if (count === 1) {
    return renderSkeleton(0);
  }
  
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div key={index} className={index > 0 ? 'mt-2' : ''}>
          {renderSkeleton(index)}
        </div>
      ))}
    </>
  );
};

// Preset skeletons for common UI patterns
const SkeletonText = (props) => <Skeleton variant="text" {...props} />;
const SkeletonButton = (props) => <Skeleton variant="button" {...props} />;
const SkeletonCircular = (props) => <Skeleton variant="circular" {...props} />;
const SkeletonRectangular = (props) => <Skeleton variant="rectangular" {...props} />;
const SkeletonAvatar = (props) => <Skeleton variant="avatar" {...props} />;
const SkeletonCard = (props) => <Skeleton variant="card" {...props} />;

// Compound skeletons for common patterns
const SkeletonListItem = ({ avatar = true, lines = 2, className = "" }) => (
  <div className={\`flex items-start space-x-4 \${className}\`}>
    {avatar && <SkeletonAvatar />}
    <div className="flex-1 space-y-2">
      <SkeletonText width="60%" />
      {lines > 1 && <SkeletonText width="100%" />}
      {lines > 2 && <SkeletonText width="40%" />}
    </div>
  </div>
);

const SkeletonCardContent = ({ 
  image = true, 
  imageHeight = '150px',
  title = true,
  titleWidth = '80%',
  description = true,
  descriptionLines = 3,
  button = true,
  className = ""
}) => (
  <div className={\`space-y-4 \${className}\`}>
    {image && <SkeletonRectangular height={imageHeight} />}
    <div className="space-y-2 p-4">
      {title && <SkeletonText width={titleWidth} height="1.5rem" />}
      {description && (
        <div className="space-y-2 mt-2">
          {[...Array(descriptionLines)].map((_, i) => (
            <SkeletonText key={i} width={i === descriptionLines - 1 ? '60%' : '100%'} />
          ))}
        </div>
      )}
      {button && <SkeletonButton width="120px" className="mt-4" />}
    </div>
  </div>
);

export { 
  Skeleton, 
  SkeletonText, 
  SkeletonButton, 
  SkeletonCircular, 
  SkeletonRectangular,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonListItem,
  SkeletonCardContent
};`,
    previewBg: "bg-white",
    previewHtml: '<div class="space-y-8"><div class="space-y-2 p-4 border rounded"><div class="bg-gray-200 rounded animate-pulse" style="width: 40%; height: 1.5rem;"></div><div class="space-y-2 mt-2"><div class="bg-gray-200 rounded animate-pulse" style="width: 100%; height: 1rem;"></div><div class="bg-gray-200 rounded animate-pulse" style="width: 100%; height: 1rem;"></div><div class="bg-gray-200 rounded animate-pulse" style="width: 100%; height: 1rem;"></div><div class="bg-gray-200 rounded animate-pulse" style="width: 60%; height: 1rem;"></div></div></div><div class="flex items-start space-x-4"><div class="bg-gray-200 rounded animate-pulse rounded-full" style="width: 40px; height: 40px;"></div><div class="flex-1 space-y-2"><div class="bg-gray-200 rounded animate-pulse" style="width: 60%; height: 1rem;"></div><div class="bg-gray-200 rounded animate-pulse" style="width: 100%; height: 1rem;"></div></div></div><div class="flex items-start space-x-4"><div class="bg-gray-200 rounded animate-pulse rounded-full" style="width: 40px; height: 40px;"></div><div class="flex-1 space-y-2"><div class="bg-gray-200 rounded animate-pulse" style="width: 60%; height: 1rem;"></div><div class="bg-gray-200 rounded animate-pulse" style="width: 100%; height: 1rem;"></div></div></div><div class="flex items-start space-x-4"><div class="bg-gray-200 rounded animate-pulse rounded-full" style="width: 40px; height: 40px;"></div><div class="flex-1 space-y-2"><div class="bg-gray-200 rounded animate-pulse" style="width: 60%; height: 1rem;"></div><div class="bg-gray-200 rounded animate-pulse" style="width: 100%; height: 1rem;"></div></div></div></div>',
    tags: ["skeleton", "loading", "placeholder", "feedback"]
  },
  {
    id: 39,
    name: "Color Picker",
    category: "Forms",
    framework: "React",
    price: 15,
    description: "Color selection component with palettes and custom input",
    code: `import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Copy, Check } from 'lucide-react';

const ColorPicker = ({
  value = '#3B82F6',
  onChange,
  presetColors = [
    '#EF4444', '#F97316', '#F59E0B', '#84CC16', 
    '#10B981', '#06B6D4', '#3B82F6', '#8B5CF6', 
    '#EC4899', '#6B7280', '#000000', '#FFFFFF'
  ],
  showPresets = true,
  showInput = true,
  showHex = true,
  showRgb = false,
  showHsl = false,
  disabled = false,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState(value);
  const [copied, setCopied] = useState(false);
  const pickerRef = useRef(null);
  
  // Update internal state when value prop changes
  useEffect(() => {
    setColor(value);
  }, [value]);
  
  // Handle click outside to close the picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    
    if (onChange) {
      onChange(newColor);
    }
  };
  
  const handlePresetClick = (presetColor) => {
    setColor(presetColor);
    
    if (onChange) {
      onChange(presetColor);
    }
  };
  
  const togglePicker = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };
  
  const hexToRgb = (hex) => {
    // Remove the hash if it exists
    hex = hex.replace('#', '');
    
    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return { r, g, b };
  };
  
  const hexToHsl = (hex) => {
    const { r, g, b } = hexToRgb(hex);
    
    // Convert RGB to HSL
    const rNormalized = r / 255;
    const gNormalized = g / 255;
    const bNormalized = b / 255;
    
    const max = Math.max(rNormalized, gNormalized, bNormalized);
    const min = Math.min(rNormalized, gNormalized, bNormalized);
    
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case rNormalized:
          h = (gNormalized - bNormalized) / d + (gNormalized < bNormalized ? 6 : 0);
          break;
        case gNormalized:
          h = (bNormalized - rNormalized) / d + 2;
          break;
        case bNormalized:
          h = (rNormalized - gNormalized) / d + 4;
          break;
        default:
          break;
      }
      
      h /= 6;
    }
    
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const rgb = hexToRgb(color);
  const hsl = hexToHsl(color);
  
  return (
    <div className={className} ref={pickerRef}>
      <div
        className={\`relative flex items-center border rounded-md px-3 py-2 cursor-pointer bg-white \${
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'hover:border-gray-400'
        } \${isOpen ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300'}\`}
        onClick={togglePicker}
      >
        <div 
          className="w-6 h-6 rounded-sm mr-3 border border-gray-200"
          style={{ backgroundColor: color }}
        />
        <div className="flex-grow font-mono text-sm">{color}</div>
        <ChevronDown 
          size={16} 
          className={\`text-gray-400 transition-transform \${isOpen ? 'transform rotate-180' : ''}\`} 
        />
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-60 p-3 bg-white border border-gray-300 rounded-md shadow-lg">
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
            className="w-full h-10 mb-3 cursor-pointer"
          />
          
          {showInput && (
            <div className="mb-3">
              <label className="text-xs font-medium text-gray-500 mb-1 block">Hex</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={color}
                  onChange={handleColorChange}
                  className="flex-1 border border-gray-300 rounded-md text-sm py-1 px-2"
                />
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          )}
          
          {showRgb && (
            <div className="mb-3">
              <label className="text-xs font-medium text-gray-500 mb-1 block">RGB</label>
              <div className="text-sm font-mono">
                rgb({rgb.r}, {rgb.g}, {rgb.b})
              </div>
            </div>
          )}
          
          {showHsl && (
            <div className="mb-3">
              <label className="text-xs font-medium text-gray-500 mb-1 block">HSL</label>
              <div className="text-sm font-mono">
                hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
              </div>
            </div>
          )}
          
          {showPresets && (
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Presets</label>
              <div className="grid grid-cols-6 gap-1">
                {presetColors.map((presetColor) => (
                  <button
                    key={presetColor}
                    type="button"
                    className={\`w-6 h-6 rounded-sm border border-gray-200 \${
                      presetColor === color ? 'ring-2 ring-blue-500' : ''
                    }\`}
                    style={{ backgroundColor: presetColor }}
                    onClick={() => handlePresetClick(presetColor)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;`,
    previewBg: "bg-white",
    previewHtml: '<div><div class="relative flex items-center border rounded-md px-3 py-2 cursor-pointer bg-white hover:border-gray-400 border-blue-500 ring-1 ring-blue-500"><div class="w-6 h-6 rounded-sm mr-3 border border-gray-200" style="background-color: rgb(59, 130, 246);"></div><div class="flex-grow font-mono text-sm">#3B82F6</div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400 transition-transform transform rotate-180"><polyline points="6 9 12 15 18 9"></polyline></svg></div><div class="absolute z-10 mt-1 w-60 p-3 bg-white border border-gray-300 rounded-md shadow-lg"><input type="color" value="#3B82F6" class="w-full h-10 mb-3 cursor-pointer"><div class="mb-3"><label class="text-xs font-medium text-gray-500 mb-1 block">Hex</label><div class="flex items-center"><input type="text" value="#3B82F6" class="flex-1 border border-gray-300 rounded-md text-sm py-1 px-2"><button type="button" class="ml-2 text-gray-500 hover:text-gray-700"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button></div></div><div><label class="text-xs font-medium text-gray-500 mb-1 block">Presets</label><div class="grid grid-cols-6 gap-1"><button type="button" class="w-6 h-6 rounded-sm border border-gray-200" style="background-color: rgb(239, 68, 68);"></button><button type="button" class="w-6 h-6 rounded-sm border border-gray-200" style="background-color: rgb(249, 115, 22);"></button><button type="button" class="w-6 h-6 rounded-sm border border-gray-200" style="background-color: rgb(245, 158, 11);"></button><button type="button" class="w-6 h-6 rounded-sm border border-gray-200" style="background-color: rgb(132, 204, 22);"></button><button type="button" class="w-6 h-6 rounded-sm border border-gray-200" style="background-color: rgb(16, 185, 129);"></button><button type="button" class="w-6 h-6 rounded-sm border border-gray-200" style="background-color: rgb(6, 182, 212);"></button><button type="button" class="w-6 h-6 rounded-sm border border-gray-200 ring-2 ring-blue-500" style="background-color: rgb(59, 130, 246);"></button><button type="button" class="w-6 h-6 rounded-sm border border-gray-200" style="background-color: rgb(139, 92, 246);"></button><button type="button" class="w-6 h-6 rounded-sm border border-gray-200" style="background-color: rgb(236, 72, 153);"></button><button type="button" class="w-6 h-6 rounded-sm border border-gray-200" style="background-color: rgb(107, 114, 128);"></button><button type="button" class="w-6 h-6 rounded-sm border border-gray-200" style="background-color: rgb(0, 0, 0);"></button><button type="button" class="w-6 h-6 rounded-sm border border-gray-200" style="background-color: rgb(255, 255, 255);"></button></div></div></div></div>',
    tags: ["color", "picker", "hex", "rgb", "form"]
  },
  {
    id: 40,
    name: "Rich Text Editor",
    category: "Forms",
    framework: "React",
    price: 25,
    description: "WYSIWYG editor for formatted text entry",
    code: `import React, { useState, useRef, useEffect } from 'react';
import { 
  Bold, Italic, Underline, List, Link, AlignLeft, 
  AlignCenter, AlignRight, Image, Code, Type, 
  Heading1, Heading2, Trash2
} from 'lucide-react';

// Note: This is a simple implementation. For production, consider libraries like DraftJS, Slate, etc.
const RichTextEditor = ({
  value = '',
  onChange,
  placeholder = 'Start typing...',
  className = "",
  toolbar = 'full',
  height = '300px',
  disabled = false
}) => {
  const [content, setContent] = useState(value);
  const editorRef = useRef(null);
  
  // Sync content with external value
  useEffect(() => {
    if (editorRef.current && value !== content) {
      editorRef.current.innerHTML = value;
      setContent(value);
    }
  }, [value]);
  
  // Listen for input changes in the contentEditable div
  useEffect(() => {
    const handleInput = () => {
      if (editorRef.current) {
        const newContent = editorRef.current.innerHTML;
        setContent(newContent);
        
        if (onChange) {
          onChange(newContent);
        }
      }
    };
    
    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener('input', handleInput);
    }
    
    return () => {
      if (editor) {
        editor.removeEventListener('input', handleInput);
      }
    };
  }, [onChange]);
  
  // Execute command on the document (Bold, Italic, etc.)
  const execCommand = (command, value = null) => {
    if (disabled) return;
    
    document.execCommand(command, false, value);
    editorRef.current.focus();
    
    // Update content state
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      
      if (onChange) {
        onChange(newContent);
      }
    }
  };
  
  // Handle special commands
  const handleCommand = (command) => {
    if (disabled) return;
    
    switch (command) {
      case 'bold':
        execCommand('bold');
        break;
      case 'italic':
        execCommand('italic');
        break;
      case 'underline':
        execCommand('underline');
        break;
      case 'ul':
        execCommand('insertUnorderedList');
        break;
      case 'ol':
        execCommand('insertOrderedList');
        break;
      case 'link':
        const url = prompt('Enter the URL', 'http://');
        if (url) execCommand('createLink', url);
        break;
      case 'image':
        const imgUrl = prompt('Enter the image URL', 'http://');
        if (imgUrl) execCommand('insertImage', imgUrl);
        break;
      case 'alignLeft':
        execCommand('justifyLeft');
        break;
      case 'alignCenter':
        execCommand('justifyCenter');
        break;
      case 'alignRight':
        execCommand('justifyRight');
        break;
      case 'code':
        // Wrap selection in code tag
        const selection = window.getSelection();
        if (selection.rangeCount) {
          const range = selection.getRangeAt(0);
          const selectedText = range.toString();
          
          if (selectedText) {
            execCommand('insertHTML', \`<code>\${selectedText}</code>\`);
          } else {
            execCommand('insertHTML', '<code></code>');
          }
        }
        break;
      case 'h1':
        execCommand('formatBlock', '<h1>');
        break;
      case 'h2':
        execCommand('formatBlock', '<h2>');
        break;
      case 'p':
        execCommand('formatBlock', '<p>');
        break;
      case 'clear':
        if (confirm('Are you sure you want to clear the editor content?')) {
          editorRef.current.innerHTML = '';
          setContent('');
          
          if (onChange) {
            onChange('');
          }
        }
        break;
      default:
        break;
    }
  };
  
  // Toolbar button rendering
  const renderToolbarButton = (command, icon, title) => (
    <button
      type="button"
      className={\`p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded \${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }\`}
      onClick={() => handleCommand(command)}
      disabled={disabled}
      title={title}
    >
      {icon}
    </button>
  );
  
  // Toolbar configurations
  const toolbarConfigs = {
    basic: [
      { command: 'bold', icon: <Bold size={18} />, title: 'Bold' },
      { command: 'italic', icon: <Italic size={18} />, title: 'Italic' },
      { command: 'underline', icon: <Underline size={18} />, title: 'Underline' },
      { command: 'link', icon: <Link size={18} />, title: 'Insert Link' }
    ],
    full: [
      { command: 'bold', icon: <Bold size={18} />, title: 'Bold' },
      { command: 'italic', icon: <Italic size={18} />, title: 'Italic' },
      { command: 'underline', icon: <Underline size={18} />, title: 'Underline' },
      { command: 'h1', icon: <Heading1 size={18} />, title: 'Heading 1' },
      { command: 'h2', icon: <Heading2 size={18} />, title: 'Heading 2' },
      { command: 'p', icon: <Type size={18} />, title: 'Paragraph' },
      { command: 'ul', icon: <List size={18} />, title: 'Bullet List' },
      { command: 'link', icon: <Link size={18} />, title: 'Insert Link' },
      { command: 'image', icon: <Image size={18} />, title: 'Insert Image' },
      { command: 'code', icon: <Code size={18} />, title: 'Code' },
      { command: 'alignLeft', icon: <AlignLeft size={18} />, title: 'Align Left' },
      { command: 'alignCenter', icon: <AlignCenter size={18} />, title: 'Align Center' },
      { command: 'alignRight', icon: <AlignRight size={18} />, title: 'Align Right' },
      { command: 'clear', icon: <Trash2 size={18} />, title: 'Clear Content' }
    ]
  };
  
  const currentToolbar = toolbarConfigs[toolbar] || toolbarConfigs.basic;
  
  return (
    <div className={\`border border-gray-300 rounded-md \${className}\`}>
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b bg-gray-50">
        {currentToolbar.map((item) => (
          <React.Fragment key={item.command}>
            {renderToolbarButton(item.command, item.icon, item.title)}
          </React.Fragment>
        ))}
      </div>
      
      <div
        ref={editorRef}
        contentEditable={!disabled}
        className={\`p-3 outline-none overflow-auto \${
          disabled ? 'bg-gray-100 cursor-not-allowed' : ''
        }\`}
        style={{ minHeight: height }}
        dangerouslySetInnerHTML={{ __html: content }}
        placeholder={placeholder}
        onFocus={(e) => {
          if (!e.currentTarget.innerHTML && placeholder) {
            e.currentTarget.dataset.empty = true;
          } else {
            delete e.currentTarget.dataset.empty;
          }
        }}
        onBlur={(e) => {
          delete e.currentTarget.dataset.empty;
        }}
      />
      
      <style jsx global>{\`
        [contenteditable][placeholder]:empty:before {
          content: attr(placeholder);
          color: #9ca3af;
          cursor: text;
        }
        
        [contenteditable][data-empty=true]:before {
          content: attr(placeholder);
          color: #9ca3af;
          cursor: text;
        }
      \`}</style>
    </div>
  );
};

export default RichTextEditor;`,
    previewBg: "bg-white",
    previewHtml: '<div class="border border-gray-300 rounded-md"><div class="flex flex-wrap items-center gap-0.5 p-2 border-b bg-gray-50"><button type="button" class="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded" title="Bold"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg></button><button type="button" class="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded" title="Italic"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg></button><button type="button" class="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded" title="Underline"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path><line x1="4" y1="21" x2="20" y2="21"></line></svg></button><button type="button" class="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded" title="Heading 1"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h8"></path><path d="M4 18V6"></path><path d="M12 18V6"></path><path d="m17 12 3-2v8"></path></svg></button><button type="button" class="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded" title="Heading 2"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h8"></path><path d="M4 18V6"></path><path d="M12 18V6"></path><path d="M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1"></path></svg></button></div><div class="p-3 outline-none overflow-auto" style="min-height: 300px;"><h1>Welcome to the Rich Text Editor</h1><p>This is a <strong>WYSIWYG</strong> editor where you can format your text with various styles.</p><p>Features include:</p><ul><li>Bold, italic, and underline formatting</li><li>Headings and paragraph styles</li><li>Links and images</li><li>Lists and alignment options</li></ul><p>Feel free to start editing!</p></div></div>',
    tags: ["editor", "wysiwyg", "rich text", "content", "form"]
  },
];

export default reactComponents;
