
import React, { useState } from 'react';

type ModalPreviewProps = {
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
};

const ModalPreview = ({ 
  title = "Modal Title", 
  children = "Modal content goes here", 
  footer = (
    <div className="flex justify-end space-x-2">
      <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Cancel</button>
      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Confirm</button>
    </div>
  ), 
  size = 'md'
}: ModalPreviewProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-full mx-4"
  };

  return (
    <div className="flex flex-col items-center">
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Open Modal
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>
          
          {/* Modal */}
          <div 
            className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} z-10`}
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
      )}
    </div>
  );
};

export default ModalPreview;
