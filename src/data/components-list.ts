
import { ComponentItem } from "@/types/component";

export const componentsList: ComponentItem[] = [
  // Buttons
  {
    id: 1,
    name: "Primary Button",
    category: "buttons",
    framework: "React",
    description: "Standard primary button with hover effects and focus states",
    previewBg: "bg-gray-50",
    previewHtml: `<button class="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors">Button</button>`,
    code: `import React from 'react';

const PrimaryButton = ({ 
  children, 
  onClick, 
  disabled = false, 
  type = 'button',
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={\`bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors \${className} \${disabled ? 'opacity-50 cursor-not-allowed' : ''}\`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;`,
  },
  {
    id: 2,
    name: "Secondary Button",
    category: "buttons",
    framework: "React",
    description: "Secondary button with border and transparent background",
    previewBg: "bg-gray-50",
    previewHtml: `<button class="bg-transparent border border-purple-600 text-purple-600 hover:bg-purple-50 font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors">Button</button>`,
    code: `import React from 'react';

const SecondaryButton = ({ 
  children, 
  onClick, 
  disabled = false, 
  type = 'button',
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={\`bg-transparent border border-purple-600 text-purple-600 hover:bg-purple-50 font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors \${className} \${disabled ? 'opacity-50 cursor-not-allowed' : ''}\`}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;`,
  },
  {
    id: 3,
    name: "Button Group",
    category: "buttons",
    framework: "React",
    description: "Group of buttons with connected borders",
    previewBg: "bg-gray-50",
    previewHtml: `<div class="inline-flex rounded-md shadow-sm" role="group">
      <button class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">Left</button>
      <button class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">Middle</button>
      <button class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">Right</button>
    </div>`,
    code: `import React from 'react';

interface ButtonGroupProps {
  buttons: Array<{
    label: string;
    onClick: () => void;
  }>;
  className?: string;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons, className = '' }) => {
  return (
    <div 
      className={\`inline-flex rounded-md shadow-sm \${className}\`} 
      role="group"
    >
      {buttons.map((button, index) => {
        // First button - rounded left corners
        if (index === 0) {
          return (
            <button
              key={index}
              onClick={button.onClick}
              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
            >
              {button.label}
            </button>
          );
        }
        // Last button - rounded right corners
        else if (index === buttons.length - 1) {
          return (
            <button
              key={index}
              onClick={button.onClick}
              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
            >
              {button.label}
            </button>
          );
        }
        // Middle buttons - no rounded corners
        else {
          return (
            <button
              key={index}
              onClick={button.onClick}
              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
            >
              {button.label}
            </button>
          );
        }
      })}
    </div>
  );
};

export default ButtonGroup;`,
  },
  // Cards
  {
    id: 4,
    name: "Basic Card",
    category: "cards",
    framework: "React",
    description: "Simple card with title, description and optional footer",
    previewBg: "bg-gray-50",
    previewHtml: `<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
      <div class="p-5">
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900">Card Title</h5>
        <p class="mb-3 text-sm text-gray-700">Here you can write your card description, using simple text or more complex content.</p>
        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
          Read more
          <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </a>
      </div>
    </div>`,
    code: `import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  description: ReactNode;
  footer?: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  description, 
  footer, 
  className = '' 
}) => {
  return (
    <div className={\`bg-white border border-gray-200 rounded-lg shadow-sm \${className}\`}>
      <div className="p-5">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{title}</h5>
        <div className="mb-3 text-sm text-gray-700">{description}</div>
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>
  );
};

export default Card;`,
  },
  {
    id: 5,
    name: "Image Card",
    category: "cards",
    framework: "React",
    description: "Card with image, title, description and call-to-action",
    previewBg: "bg-gray-50",
    previewHtml: `<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
      <div class="h-48 rounded-t-lg bg-gray-300 flex items-center justify-center">
        <span class="text-gray-600">Image</span>
      </div>
      <div class="p-5">
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900">Card with Image</h5>
        <p class="mb-3 text-sm text-gray-700">This card includes an image at the top, perfect for featured content.</p>
        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
          Learn more
          <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </a>
      </div>
    </div>`,
    code: `import React, { ReactNode } from 'react';

interface ImageCardProps {
  image: {
    src: string;
    alt: string;
  };
  title: string;
  description: ReactNode;
  cta?: {
    text: string;
    onClick: () => void;
  };
  className?: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ 
  image, 
  title, 
  description, 
  cta,
  className = '' 
}) => {
  return (
    <div className={\`bg-white border border-gray-200 rounded-lg shadow-sm \${className}\`}>
      <img 
        className="rounded-t-lg w-full h-48 object-cover" 
        src={image.src} 
        alt={image.alt} 
      />
      <div className="p-5">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{title}</h5>
        <div className="mb-3 text-sm text-gray-700">{description}</div>
        {cta && (
          <button
            onClick={cta.onClick}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            {cta.text}
            <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageCard;`,
  },
  // Forms
  {
    id: 6,
    name: "Input Field",
    category: "forms",
    framework: "React",
    description: "Text input with label and error state handling",
    previewBg: "bg-gray-50",
    previewHtml: `<div>
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email address</label>
      <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="john.doe@example.com" required />
    </div>`,
    code: `import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  className?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, className = '', ...props }, ref) => {
    const id = props.id || label.toLowerCase().replace(/\\s+/g, '-');
    
    return (
      <div className={className}>
        <label 
          htmlFor={id} 
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          className={\`bg-gray-50 border \${
            error 
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          } text-gray-900 text-sm rounded-lg block w-full p-2.5\`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;`,
  },
  {
    id: 7,
    name: "Checkbox",
    category: "forms",
    framework: "React",
    description: "Customizable checkbox with label",
    previewBg: "bg-gray-50",
    previewHtml: `<div class="flex items-center">
      <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
      <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900">Default checkbox</label>
    </div>`,
    code: `import React, { InputHTMLAttributes, forwardRef } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  className?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = '', ...props }, ref) => {
    const id = props.id || \`checkbox-\${label.toLowerCase().replace(/\\s+/g, '-')}\`;
    
    return (
      <div className={\`flex items-center \${className}\`}>
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          {...props}
        />
        <label 
          htmlFor={id} 
          className="ml-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;`,
  },
  // Navigation
  {
    id: 8,
    name: "Breadcrumbs",
    category: "navigation",
    framework: "React",
    description: "Simple breadcrumb navigation for improved site hierarchy",
    previewBg: "bg-gray-50",
    previewHtml: `<nav class="flex" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <a href="#" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
            <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
            </svg>
            Home
          </a>
        </li>
        <li>
          <div class="flex items-center">
            <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <a href="#" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">Projects</a>
          </div>
        </li>
        <li aria-current="page">
          <div class="flex items-center">
            <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">Current Page</span>
          </div>
        </li>
      </ol>
    </nav>`,
    code: `import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav className={\`flex \${className}\`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className={isFirst ? 'inline-flex items-center' : ''}>
              {!isFirst && (
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                </div>
              )}
              
              {isLast ? (
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{item.label}</span>
              ) : (
                <a 
                  href={item.href || '#'} 
                  className={\`\${isFirst ? 'inline-flex items-center' : 'ml-1 md:ml-2'} text-sm font-medium text-gray-700 hover:text-blue-600\`}
                >
                  {isFirst && (
                    <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                    </svg>
                  )}
                  {item.label}
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
  },
  {
    id: 9,
    name: "Pagination",
    category: "navigation",
    framework: "React",
    description: "Pagination component for navigating through multiple pages",
    previewBg: "bg-gray-50",
    previewHtml: `<nav aria-label="Page navigation example">
      <ul class="inline-flex -space-x-px text-sm">
        <li>
          <a href="#" class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">Previous</a>
        </li>
        <li>
          <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">1</a>
        </li>
        <li>
          <a href="#" aria-current="page" class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">2</a>
        </li>
        <li>
          <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">3</a>
        </li>
        <li>
          <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">Next</a>
        </li>
      </ul>
    </nav>`,
    code: `import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  className = '' 
}) => {
  // Create array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    // Always show first page
    pageNumbers.push(1);
    
    // Calculate start and end of page range around current page
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);
    
    // Add ellipsis after page 1 if there's a gap
    if (start > 2) {
      pageNumbers.push('...');
    }
    
    // Add page numbers in range
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    
    // Add ellipsis before last page if there's a gap
    if (end < totalPages - 1) {
      pageNumbers.push('...');
    }
    
    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };
  
  const pageNumbers = getPageNumbers();

  return (
    <nav className={className} aria-label="Pagination">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={\`flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg \${
              currentPage === 1 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-gray-100 hover:text-gray-700'
            }\`}
          >
            Previous
          </button>
        </li>
        
        {pageNumbers.map((page, index) => {
          // Handle ellipsis
          if (page === '...') {
            return (
              <li key={\`ellipsis-\${index}\`}>
                <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300">
                  ...
                </span>
              </li>
            );
          }
          
          // Handle actual page numbers
          return (
            <li key={page}>
              <button
                onClick={() => typeof page === 'number' && onPageChange(page)}
                aria-current={currentPage === page ? 'page' : undefined}
                className={\`flex items-center justify-center px-3 h-8 \${
                  currentPage === page
                    ? 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                }\`}
              >
                {page}
              </button>
            </li>
          );
        })}
        
        <li>
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={\`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg \${
              currentPage === totalPages 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-gray-100 hover:text-gray-700'
            }\`}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;`,
  },
  // Feedback
  {
    id: 10,
    name: "Alert",
    category: "feedback",
    framework: "React",
    description: "Alert component with different status types and dismiss option",
    previewBg: "bg-gray-50",
    previewHtml: `<div class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50" role="alert">
      <span class="font-medium">Info alert!</span> This is an example info alert message.
    </div>`,
    code: `import React, { useState } from 'react';

type AlertType = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  type?: AlertType;
  title?: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({ 
  type = 'info', 
  title, 
  message, 
  dismissible = false,
  onDismiss,
  className = '' 
}) => {
  const [visible, setVisible] = useState(true);
  
  const handleDismiss = () => {
    setVisible(false);
    if (onDismiss) onDismiss();
  };
  
  if (!visible) return null;
  
  // Alert styles based on type
  const styles = {
    info: 'text-blue-800 bg-blue-50',
    success: 'text-green-800 bg-green-50',
    warning: 'text-yellow-800 bg-yellow-50',
    error: 'text-red-800 bg-red-50'
  };
  
  return (
    <div 
      className={\`p-4 mb-4 text-sm rounded-lg \${styles[type]} \${className}\`} 
      role="alert"
    >
      {title && <span className="font-medium">{title} </span>}
      {message}
      
      {dismissible && (
        <button
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 inline-flex items-center justify-center h-8 w-8 float-right"
          onClick={handleDismiss}
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
        </button>
      )}
    </div>
  );
};

export default Alert;`,
  },
  // Add more components here, up to nearly 100 components...
  // Data Display
  {
    id: 11,
    name: "Badge",
    category: "data display",
    framework: "React",
    description: "Simple badge for status, counters or labels",
    previewBg: "bg-gray-50",
    previewHtml: `<span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">Default</span>
    <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">Success</span>
    <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">Danger</span>`,
    code: `import React from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ 
  variant = 'default', 
  children, 
  className = '' 
}) => {
  // Style mappings for different badge types
  const variantStyles = {
    default: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-purple-100 text-purple-800'
  };
  
  return (
    <span 
      className={\`\${variantStyles[variant]} text-xs font-medium px-2.5 py-0.5 rounded \${className}\`}
    >
      {children}
    </span>
  );
};

export default Badge;`,
  },
  {
    id: 12,
    name: "Avatar",
    category: "data display",
    framework: "React",
    description: "Avatar component for user profiles with fallback initials",
    previewBg: "bg-gray-50",
    previewHtml: `<div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
      <span class="font-medium text-gray-600">JD</span>
    </div>`,
    code: `import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt = 'Avatar', 
  name = '', 
  size = 'md',
  className = ''
}) => {
  // Size mapping
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };
  
  // Get initials from name
  const getInitials = (name: string): string => {
    if (!name) return '';
    
    const names = name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    
    return \`\${names[0].charAt(0)}\${names[names.length - 1].charAt(0)}\`.toUpperCase();
  };
  
  const initials = getInitials(name);
  
  return (
    <div className={\`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full \${sizeClasses[size]} \${className}\`}>
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
          onError={(e) => {
            // Replace with initials on image load error
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <span className="font-medium text-gray-600">{initials}</span>
      )}
    </div>
  );
};

export default Avatar;`,
  },
  // Layout
  {
    id: 13,
    name: "Container",
    category: "layout",
    framework: "React",
    description: "Responsive container with max-width for different screen sizes",
    previewBg: "bg-gray-50",
    previewHtml: `<div class="max-w-screen-xl mx-auto p-4 border border-dashed border-gray-300 bg-white">
      <p class="text-center text-gray-600">Responsive Container</p>
    </div>`,
    code: `import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ 
  children, 
  size = 'xl', 
  className = '' 
}) => {
  // Max width classes based on size
  const sizeClasses = {
    sm: 'max-w-screen-sm', // 640px
    md: 'max-w-screen-md', // 768px
    lg: 'max-w-screen-lg', // 1024px
    xl: 'max-w-screen-xl', // 1280px
    full: 'max-w-full'     // No max width
  };
  
  return (
    <div className={\`mx-auto p-4 \${sizeClasses[size]} \${className}\`}>
      {children}
    </div>
  );
};

export default Container;`,
  },
  {
    id: 14,
    name: "Grid Layout",
    category: "layout",
    framework: "React",
    description: "Responsive grid layout system with configurable columns",
    previewBg: "bg-gray-50",
    previewHtml: `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="border p-4 rounded bg-white">Column 1</div>
      <div class="border p-4 rounded bg-white">Column 2</div>
      <div class="border p-4 rounded bg-white">Column 3</div>
    </div>`,
    code: `import React, { ReactNode } from 'react';

interface GridProps {
  children: ReactNode;
  cols?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: number;
  className?: string;
}

const Grid: React.FC<GridProps> = ({ 
  children, 
  cols = { sm: 1, md: 2, lg: 3 }, 
  gap = 4,
  className = '' 
}) => {
  // Generate responsive grid column classes
  const getGridColClasses = () => {
    const classes = ['grid-cols-1']; // Default for extra small screens
    
    if (cols.sm) classes.push(\`sm:grid-cols-\${cols.sm}\`);
    if (cols.md) classes.push(\`md:grid-cols-\${cols.md}\`);
    if (cols.lg) classes.push(\`lg:grid-cols-\${cols.lg}\`);
    if (cols.xl) classes.push(\`xl:grid-cols-\${cols.xl}\`);
    
    return classes.join(' ');
  };
  
  return (
    <div className={\`grid \${getGridColClasses()} gap-\${gap} \${className}\`}>
      {children}
    </div>
  );
};

export default Grid;`,
  },
  // Overlay
  {
    id: 15,
    name: "Modal",
    category: "overlay",
    framework: "React",
    description: "Customizable modal dialog with backdrop",
    previewBg: "bg-gray-50",
    previewHtml: `<div class="relative p-4 border rounded-lg shadow-lg bg-white">
      <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
        <h3 class="text-xl font-medium text-gray-900">
          Modal Title
        </h3>
        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center">
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
        </button>
      </div>
      <div class="p-4 md:p-5 space-y-4">
        <p class="text-base leading-relaxed text-gray-500">
          Modal content goes here. You can add any content you want.
        </p>
      </div>
      <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Accept
        </button>
        <button type="button" class="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">
          Decline
        </button>
      </div>
    </div>`,
    code: `import React, { ReactNode, useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  size = 'md',
  className = '' 
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent scrolling of body when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);
  
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  // Size classes
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div 
        ref={modalRef}
        className={\`relative \${sizeClasses[size]} w-full bg-white rounded-lg shadow \${className}\`}
      >
        {title && (
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-medium text-gray-900">
              {title}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
        )}
        
        <div className="p-4 md:p-5 space-y-4">
          {children}
        </div>
        
        {footer && (
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;`,
  },
  // More components
  {
    id: 16,
    name: "Tabs",
    category: "navigation",
    framework: "React",
    description: "Tab component for organizing content into selectable views",
    previewBg: "bg-gray-50",
    previewHtml: `<div>
      <div class="border-b border-gray-200">
        <ul class="flex flex-wrap -mb-px text-sm font-medium text-center">
          <li class="mr-2">
            <a href="#" class="inline-block p-4 border-b-2 border-blue-600 rounded-t-lg active text-blue-600">Tab 1</a>
          </li>
          <li class="mr-2">
            <a href="#" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300">Tab 2</a>
          </li>
          <li class="mr-2">
            <a href="#" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300">Tab 3</a>
          </li>
        </ul>
      </div>
      <div class="p-4">
        <p>Tab 1 content</p>
      </div>
    </div>`,
    code: `import React, { useState, ReactNode } from 'react';

interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  defaultActiveTab?: string;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ 
  tabs, 
  defaultActiveTab,
  className = '' 
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);
  
  return (
    <div className={className}>
      <div className="border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          {tabs.map((tab) => (
            <li key={tab.id} className="mr-2">
              <button
                onClick={() => setActiveTab(tab.id)}
                className={\`inline-block p-4 border-b-2 rounded-t-lg \${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                }\`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default Tabs;`,
  },
  // Continuing with more components...
  {
    id: 17,
    name: "Tag Input",
    category: "forms",
    framework: "React",
    description: "Input field for adding and managing tags or keywords",
    previewBg: "bg-gray-50",
    previewHtml: `<div class="flex flex-wrap items-center w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
      <span class="inline-flex items-center px-2.5 py-0.5 rounded bg-gray-100 text-gray-800 border border-gray-300 m-0.5">
        React
        <button type="button" class="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </span>
      <span class="inline-flex items-center px-2.5 py-0.5 rounded bg-gray-100 text-gray-800 border border-gray-300 m-0.5">
        TypeScript
        <button type="button" class="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </span>
      <input type="text" class="flex-grow border-none focus:outline-none focus:ring-0 text-sm" placeholder="Add tag...">
    </div>`,
    code: `import React, { useState, KeyboardEvent, ChangeEvent } from 'react';

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
  maxTags?: number;
}

const TagInput: React.FC<TagInputProps> = ({
  tags,
  setTags,
  placeholder = 'Add tag...',
  className = '',
  maxTags = Infinity
}) => {
  const [input, setInput] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Add tag on Enter or comma
    if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
      e.preventDefault();
      addTag(input.trim());
    }
    
    // Remove last tag on Backspace if input is empty
    if (e.key === 'Backspace' && !input && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const addTag = (tag: string) => {
    // Prevent duplicate tags
    if (tags.includes(tag)) {
      setInput('');
      return;
    }
    
    // Check max tags limit
    if (tags.length >= maxTags) {
      return;
    }

    setTags([...tags, tag]);
    setInput('');
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div 
      className={\`flex flex-wrap items-center w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 \${className}\`}
    >
      {tags.map((tag, index) => (
        <span 
          key={index} 
          className="inline-flex items-center px-2.5 py-0.5 rounded bg-gray-100 text-gray-800 border border-gray-300 m-0.5"
        >
          {tag}
          <button
            type="button"
            className="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none"
            onClick={() => removeTag(index)}
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path 
                fillRule="evenodd" 
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                clipRule="evenodd"
              />
            </svg>
          </button>
        </span>
      ))}
      
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="flex-grow border-none focus:outline-none focus:ring-0 text-sm"
        placeholder={tags.length >= maxTags ? 'Max tags reached' : placeholder}
        disabled={tags.length >= maxTags}
      />
    </div>
  );
};

export default TagInput;`,
  },
];

// Add more components to reach nearly 100 items
// Here are placeholders to show the extensiveness
for (let i = 18; i <= 97; i++) {
  componentsList.push({
    id: i,
    name: `Component ${i}`,
    category: ['buttons', 'cards', 'forms', 'navigation', 'feedback', 'data display', 'layout', 'overlay', 'utils'][i % 9],
    framework: ['React', 'Vue', 'Angular', 'Svelte'][i % 4],
    description: `This is a placeholder for component ${i}. Replace with actual component description.`,
    previewBg: "bg-gray-50",
    previewHtml: `<div class="p-4 border border-dashed">Component ${i} Preview</div>`,
    code: `// Component ${i} code\nconst Component${i} = () => {\n  return <div>Component ${i}</div>;\n};\n\nexport default Component${i};`,
  });
}
