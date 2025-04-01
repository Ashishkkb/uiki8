
import React from 'react';
import { ComponentItem } from "@/types/component";

const ContainerPreview = () => {
  return (
    <div className="w-full max-w-md mx-auto bg-white p-4 border border-gray-200 rounded-md">
      <p className="text-gray-800">Container content</p>
    </div>
  );
};

const ContainerComponent: ComponentItem = {
  id: 19,
  name: "Container",
  category: "Layout",
  framework: "React",
  description: "A responsive container component with configurable max-width and padding",
  code: `import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'none';
  className?: string;
  padding?: string;
  centered?: boolean;
};

const Container = ({ 
  children, 
  maxWidth = 'lg',
  padding = 'px-4 sm:px-6 lg:px-8', 
  centered = true,
  className = '' 
}: ContainerProps) => {
  const maxWidthClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
    none: ''
  };

  return (
    <div
      className={\`\${padding} \${maxWidthClasses[maxWidth]} \${centered ? 'mx-auto' : ''} \${className}\`}
    >
      {children}
    </div>
  );
};

export default Container;`,
  component: ContainerPreview,
  tags: ["layout", "responsive", "container"],
  fileSize: "0.8 KB",
  price: "0",
  complexity: "simple",
  lastUpdated: "2023-11-10",
  license: "MIT"
};

export default ContainerComponent;
