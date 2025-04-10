
import { ComponentItem } from "@/types/component";
import TabCardComponent from "./TabCardComponent";
import { Info, Settings, Users, Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";

const TabCardComponentItem: ComponentItem = {
  id: 215,
  name: "Tab Card",
  description: "A card component with embedded tabs for organizing content",
  category: "UI",
  component: () => (
    <TabCardComponent
      title="Account Settings"
      description="Manage your account settings and preferences."
      tabs={[
        {
          label: "Profile",
          value: "profile",
          icon: <Users className="h-4 w-4" />,
          content: (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>
              <p className="text-muted-foreground">
                Update your personal details, profile image, and contact information.
              </p>
              <div className="grid gap-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">First Name</label>
                    <input 
                      type="text" 
                      className="mt-1 w-full rounded-md border border-input px-3 py-2" 
                      defaultValue="John" 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Last Name</label>
                    <input 
                      type="text" 
                      className="mt-1 w-full rounded-md border border-input px-3 py-2" 
                      defaultValue="Smith" 
                    />
                  </div>
                </div>
              </div>
            </div>
          ),
        },
        {
          label: "Notifications",
          value: "notifications",
          icon: <Bell className="h-4 w-4" />,
          content: (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notification Preferences</h3>
              <p className="text-muted-foreground">
                Control when and how you receive notifications.
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive emails about account activity</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" defaultChecked />
                    <div className="peer h-6 w-11 rounded-full bg-muted after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                  </label>
                </div>
              </div>
            </div>
          ),
        },
        {
          label: "Settings",
          value: "settings",
          icon: <Settings className="h-4 w-4" />,
          content: (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Account Settings</h3>
              <p className="text-muted-foreground">
                Manage your account preferences and settings.
              </p>
              <div className="space-y-4 pt-4">
                <div>
                  <label className="text-sm font-medium">Language</label>
                  <select className="mt-1 w-full rounded-md border border-input px-3 py-2">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
              </div>
            </div>
          ),
        },
        {
          label: "Help",
          value: "help",
          icon: <Info className="h-4 w-4" />,
          content: (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Help & Support</h3>
              <p className="text-muted-foreground">
                Get help with your account and find answers to common questions.
              </p>
              <div className="rounded-lg border p-4 mt-4">
                <h4 className="font-medium">Contact Support</h4>
                <p className="text-sm mt-1 text-muted-foreground">Our support team is available 24/7 to help you.</p>
                <Button size="sm" className="mt-3">Contact Support</Button>
              </div>
            </div>
          ),
        },
      ]}
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      }
    />
  ),
  code: `import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Info, Settings, Users, Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const TabCard = ({
  tabs = [
    {
      label: "Profile",
      value: "profile",
      icon: <Users className="h-4 w-4" />,
      content: <div>Profile content</div>,
    },
    {
      label: "Notifications",
      value: "notifications",
      icon: <Bell className="h-4 w-4" />,
      content: <div>Notifications content</div>,
    },
    {
      label: "Settings",
      value: "settings",
      icon: <Settings className="h-4 w-4" />,
      content: <div>Settings content</div>,
    },
  ],
  defaultValue,
  orientation = 'horizontal', // 'horizontal' or 'vertical'
  title,
  description,
  footer,
  onTabChange,
  className,
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value);

  const handleTabChange = (value) => {
    setActiveTab(value);
    if (onTabChange) {
      onTabChange(value);
    }
  };

  const activeContent = tabs.find(tab => tab.value === activeTab)?.content;

  return (
    <Card className="overflow-hidden">
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      
      <div className={\`flex \${orientation === 'vertical' ? "flex-row" : "flex-col"}\`}>
        <div className={\`\${orientation === 'vertical' ? "w-1/3 border-r" : "border-b"}\`}>
          <div className={\`flex \${orientation === 'vertical' ? "flex-col" : "flex-row"}\`}>
            {tabs.map((tab) => (
              <button
                key={tab.value}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium",
                  orientation === 'vertical' ? "justify-start border-l-2" : "justify-center border-b-2",
                  activeTab === tab.value
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                  tab.disabled && "pointer-events-none opacity-50"
                )}
                onClick={() => !tab.disabled && handleTabChange(tab.value)}
                disabled={tab.disabled}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className={\`flex-1 \${orientation === 'vertical' ? "w-2/3" : "w-full"}\`}>
          <CardContent className="p-6">
            {activeContent}
          </CardContent>
          
          {footer && (
            <CardFooter className="border-t bg-muted/50 px-6 py-4">
              {footer}
            </CardFooter>
          )}
        </div>
      </div>
    </Card>
  );
};

// Example usage
export const ExampleTabCard = () => (
  <TabCard
    title="Account Settings"
    description="Manage your account settings and preferences."
    tabs={[
      {
        label: "Profile",
        value: "profile",
        icon: <Users className="h-4 w-4" />,
        content: (
          <div>
            <h3 className="text-lg font-medium">Personal Information</h3>
            <p className="text-muted-foreground">Update your personal details.</p>
          </div>
        ),
      },
      {
        label: "Notifications",
        value: "notifications",
        icon: <Bell className="h-4 w-4" />,
        content: <div>Notification preferences</div>,
      },
      {
        label: "Settings",
        value: "settings", 
        icon: <Settings className="h-4 w-4" />,
        content: <div>Account settings</div>,
      },
    ]}
    footer={
      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    }
  />
);`,
  framework: "React",
  isNew: true,
  tags: ["tabs", "card", "navigation", "ui", "settings"]
};

export default TabCardComponentItem;
