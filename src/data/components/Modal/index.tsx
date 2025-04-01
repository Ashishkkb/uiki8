import React from 'react';
import { ComponentItem } from "@/types/component";
import ModalPreview from "@/components/ui/ModalPreview";

const ModalComponent: ComponentItem = {
  id: 4,
  name: "Modal",
  category: "UI",
  framework: "React",
  description: "A customizable modal dialog component for presenting content that requires user interaction",
  code: `import React, { useState, useEffect } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
};

const Modal = ({ isOpen, onClose, title, children, footer, size = 'md' }: ModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (isOpen) {
      setIsVisible(true);
    } else {
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 300); // Match this with the CSS transition duration
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isOpen]);
  
  // If the modal isn't open and isn't in the transition state, don't render anything
  if (!isOpen && !isVisible) return null;
  
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-full mx-4"
  };

  // Handle ESC key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      className={\`fixed inset-0 z-50 flex items-center justify-center p-4 \${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300\`}
      onKeyDown={handleKeyDown}
    >
      {/* Overlay */}
      <div 
        className={\`fixed inset-0 bg-black \${isOpen ? 'opacity-50' : 'opacity-0'} transition-opacity duration-300\`}
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div 
        className={\`bg-white rounded-lg shadow-xl w-full \${sizeClasses[size]} z-10 \${isOpen ? 'scale-100' : 'scale-95'} transition-transform duration-300\`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        {title && (
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 id="modal-title" className="text-lg font-medium text-gray-900">{title}</h3>
          </div>
        )}
        
        {/* Body */}
        <div className="p-6">{children}</div>
        
        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;`,
  component: ModalPreview,
  tags: ["UI", "overlay", "dialog", "popup"],
  isNew: false,
  fileSize: "2.1 KB",
  price: "9.99"
};

export default ModalComponent;
