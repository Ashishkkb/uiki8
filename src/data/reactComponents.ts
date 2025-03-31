
import { ComponentItem } from "@/types/component";

export const reactComponents: ComponentItem[] = [
  {
    id: 1,
    name: "Button",
    category: "Buttons",
    framework: "React",
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
  }
];

export default reactComponents;
