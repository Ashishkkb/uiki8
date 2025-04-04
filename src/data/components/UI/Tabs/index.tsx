
import React from 'react';
import { ComponentItem } from "@/types/component";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TabsComponentData: ComponentItem = {
  id: 403,
  name: "Tabs",
  category: "UI",
  framework: "React",
  description: "A set of layered sections of content that display one panel at a time",
  code: `import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }`,
  component: () => (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="p-4 border rounded-lg mt-2">
        <h3 className="font-medium">Account Settings</h3>
        <p className="text-sm text-muted-foreground mt-1">Update your account settings.</p>
      </TabsContent>
      <TabsContent value="password" className="p-4 border rounded-lg mt-2">
        <h3 className="font-medium">Password Settings</h3>
        <p className="text-sm text-muted-foreground mt-1">Change your password here.</p>
      </TabsContent>
    </Tabs>
  ),
  tags: ["ui", "tabs", "navigation", "content"],
  fileSize: "1.5 KB",
  price: "Free",
  complexity: "medium",
  lastUpdated: "2023-12-07"
};

export default TabsComponentData;
