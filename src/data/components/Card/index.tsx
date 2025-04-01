
import React from 'react';
import { ComponentItem } from "@/types/component";

const CardComponent: ComponentItem = {
  id: 2,
  name: "Card",
  category: "UI",
  framework: "React",
  description: "A versatile card component for displaying content in a contained format",
  code: `import React from 'react';

type CardProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  hover?: boolean;
};

const Card = ({ children, title, subtitle, footer, hover = false }: CardProps) => {
  return (
    <div className={\`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden \${hover ? 'transition-all hover:shadow-md' : ''}\`}>
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

export default Card;`,
  tags: ["UI", "container", "layout"],
  isNew: false,
  fileSize: "0.9 KB",
  price: "0"
};

export default CardComponent;
