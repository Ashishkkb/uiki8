
import React, { useState } from 'react';

type TabProps = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

const TabsPreview = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const tabs: TabProps[] = [
    { 
      id: "tab1", 
      label: "Dashboard",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
        </svg>
      )
    },
    { 
      id: "tab2", 
      label: "Profile",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
        </svg>
      )
    },
    { 
      id: "tab3", 
      label: "Settings",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path>
        </svg>
      )
    },
    { 
      id: "tab4", 
      label: "Disabled",
      disabled: true
    }
  ];

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "tab1":
        return (
          <div className="p-4 bg-white rounded-lg border-gray-200">
            <h3 className="text-lg font-medium mb-2">Dashboard Content</h3>
            <p className="text-gray-500">
              This is your main dashboard with an overview of all important metrics.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="border rounded-lg p-4 bg-blue-50">
                <div className="text-xl font-bold">248</div>
                <div className="text-sm text-gray-500">New Users</div>
              </div>
              <div className="border rounded-lg p-4 bg-green-50">
                <div className="text-xl font-bold">$12,400</div>
                <div className="text-sm text-gray-500">Revenue</div>
              </div>
              <div className="border rounded-lg p-4 bg-yellow-50">
                <div className="text-xl font-bold">74%</div>
                <div className="text-sm text-gray-500">Conversion Rate</div>
              </div>
            </div>
          </div>
        );
      case "tab2":
        return (
          <div className="p-4 bg-white rounded-lg border-gray-200">
            <h3 className="text-lg font-medium mb-2">User Profile</h3>
            <p className="text-gray-500">
              Manage your account settings and preferences here.
            </p>
            <div className="flex items-center mt-4 space-x-4">
              <div className="h-16 w-16 rounded-full bg-blue-200 flex items-center justify-center text-xl font-bold text-blue-800">
                JD
              </div>
              <div>
                <div className="font-medium">John Doe</div>
                <div className="text-sm text-gray-500">john.doe@example.com</div>
              </div>
            </div>
          </div>
        );
      case "tab3":
        return (
          <div className="p-4 bg-white rounded-lg border-gray-200">
            <h3 className="text-lg font-medium mb-2">Settings</h3>
            <p className="text-gray-500">
              Configure your application settings and preferences.
            </p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span>Enable Notifications</span>
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </div>
              <div className="flex items-center justify-between">
                <span>Dark Mode</span>
                <div className="w-11 h-6 bg-blue-600 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </div>
              <div className="flex items-center justify-between">
                <span>Save Activity History</span>
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Tab content not found</div>;
    }
  };

  return (
    <div className="w-full">
      <div className="border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px">
          {tabs.map((tab) => (
            <li key={tab.id} className="mr-2">
              <button
                onClick={() => !tab.disabled && setActiveTab(tab.id)}
                disabled={tab.disabled}
                className={`
                  inline-flex items-center px-4 py-2 text-sm font-medium border-b-2 rounded-t-lg
                  ${tab.id === activeTab 
                    ? 'text-blue-600 border-blue-600 active' 
                    : 'border-transparent hover:text-gray-600 hover:border-gray-300'}
                  ${tab.disabled ? 'cursor-not-allowed text-gray-400' : ''}
                `}
                aria-selected={tab.id === activeTab}
                role="tab"
              >
                {tab.icon && <span className="mr-2">{tab.icon}</span>}
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default TabsPreview;
