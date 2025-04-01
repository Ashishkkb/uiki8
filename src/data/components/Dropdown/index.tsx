
import React from 'react';
import { ComponentItem } from "@/types/component";

const DropdownComponent: ComponentItem = {
  id: 5,
  name: "Dropdown",
  category: "UI",
  framework: "React",
  description: "A dropdown menu component for displaying a list of actions or options",
  code: `import React, { useState, useRef, useEffect } from 'react';

type DropdownItem = {
  label: string;
  onClick?: () => void;
  href?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

type DropdownProps = {
  trigger: React.ReactNode;
  items: (DropdownItem | 'divider')[];
  align?: 'left' | 'right';
  width?: number;
};

const Dropdown = ({ trigger, items, align = 'left', width = 180 }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const renderItem = (item: DropdownItem | 'divider', index: number) => {
    if (item === 'divider') {
      return <div key={index} className="my-1 border-t border-gray-200"></div>;
    }

    const { label, onClick, href, icon, disabled } = item;
    
    const itemClasses = \`
      flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 
      \${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    \`;

    if (href && !disabled) {
      return (
        <a key={index} href={href} className={itemClasses} onClick={() => setIsOpen(false)}>
          {icon && <span className="mr-2">{icon}</span>}
          {label}
        </a>
      );
    }

    return (
      <button
        key={index}
        className={itemClasses}
        onClick={() => {
          if (!disabled && onClick) {
            onClick();
            setIsOpen(false);
          }
        }}
        disabled={disabled}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </button>
    );
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={toggleDropdown}>
        {trigger}
      </div>

      {isOpen && (
        <div
          className={\`
            origin-top-right absolute z-10 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none
            \${align === 'left' ? 'left-0' : 'right-0'}
          \`}
          style={{ width: \`\${width}px\` }}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="dropdown-button"
        >
          <div className="py-1" role="none">
            {items.map((item, index) => renderItem(item, index))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;`,
  tags: ["UI", "navigation", "menu"],
  isNew: false,
  fileSize: "2.5 KB",
  price: "0"
};

export default DropdownComponent;
