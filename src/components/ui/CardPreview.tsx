
import React from 'react';

type CardProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  hover?: boolean;
};

const CardPreview = ({ children = "Card content goes here", title = "Card Title", subtitle = "Card Subtitle", footer, hover = false }: CardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${hover ? 'transition-all hover:shadow-md' : ''}`}>
      {(title || subtitle) && (
        <div className="p-4 border-b border-gray-200">
          {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}
      <div className="p-4">{children}</div>
      {footer && <div className="p-4 bg-gray-50 border-t border-gray-200">{footer}</div>}
    </div>
  );
};

export default CardPreview;
