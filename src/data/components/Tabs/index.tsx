
import React from 'react';
import { ComponentItem } from "@/types/component";

const TabsComponent: ComponentItem = {
  id: 8,
  name: "Tabs",
  category: "UI",
  framework: "React",
  description: "A tabbed interface component for organizing content into separate views",
  code: `import React, { useState } from 'react';

type Tab = {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  defaultTabId?: string;
  variant?: 'underline' | 'pills' | 'boxed';
  onChange?: (tabId: string) => void;
  fullWidth?: boolean;
};

const Tabs = ({ tabs, defaultTabId, variant = 'underline', onChange, fullWidth = false }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0]?.id || '');

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (onChange) onChange(tabId);
  };

  // Variant-specific styles
  const getVariantStyles = (isActive: boolean) => {
    switch (variant) {
      case 'pills':
        return isActive
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100';

      case 'boxed':
        return isActive
          ? 'bg-white border-t border-l border-r border-gray-200 text-blue-600'
          : 'bg-gray-100 text-gray-600 hover:text-gray-800 border border-transparent hover:border-gray-200';

      case 'underline':
      default:
        return isActive
          ? 'text-blue-600 border-b-2 border-blue-600'
          : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent';
    }
  };

  // Find the active tab content
  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className="w-full">
      {/* Tab navigation */}
      <div className={\`flex \${variant === 'boxed' ? 'border-b border-gray-200' : ''} \${fullWidth ? 'w-full' : ''}\`}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && handleTabClick(tab.id)}
            disabled={tab.disabled}
            className={
              \`px-4 py-2 font-medium text-sm transition-colors duration-200 focus:outline-none
              \${tab.id === activeTab ? 'cursor-default' : 'cursor-pointer'}
              \${getVariantStyles(tab.id === activeTab)}
              \${tab.disabled ? 'opacity-50 cursor-not-allowed' : ''}
              \${fullWidth ? 'flex-1 text-center' : ''}
              \`
            }
            aria-selected={tab.id === activeTab}
            role="tab"
          >
            <div className="flex items-center justify-center">
              {tab.icon && <span className="mr-2">{tab.icon}</span>}
              {tab.label}
            </div>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-4">{activeTabContent}</div>
    </div>
  );
};

export default Tabs;`,
  tags: ["UI", "navigation", "content"],
  isNew: false,
  fileSize: "2.3 KB",
  price: "0"
};

export default TabsComponent;
