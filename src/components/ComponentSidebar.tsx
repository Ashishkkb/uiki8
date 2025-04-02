
import React from "react";
import { Badge } from "@/components/ui/badge";
import { getAllComponents } from "@/data/components/registry";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Github, Package, Twitter } from "lucide-react";
import { Button } from "./ui/button";

interface ComponentSidebarProps {
  onCategorySelect: (category: string | null) => void;
  selectedCategory: string | null;
  filterBySearch: (query: string) => void;
}

const ComponentSidebar: React.FC<ComponentSidebarProps> = ({
  onCategorySelect,
  selectedCategory,
  filterBySearch,
}) => {
  const allComponents = getAllComponents();
  const categories = Array.from(
    new Set(allComponents.map((component) => component.category))
  ).sort();

  // Get component count for each category
  const categoryComponentCount = categories.reduce((acc, category) => {
    acc[category] = allComponents.filter(comp => comp.category === category).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-4 py-2">
          <h2 className="text-lg font-semibold">ModernKit UI</h2>
          <p className="text-sm text-muted-foreground">Beautiful UI components</p>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Installation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => filterBySearch("install")}>
                  <Package className="h-4 w-4" />
                  <span>Install dependencies</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => filterBySearch("tailwind")}>
                  <Package className="h-4 w-4" />
                  <span>Install Tailwind CSS</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => filterBySearch("utils")}>
                  <Package className="h-4 w-4" />
                  <span>Add utilities</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>All Components</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => onCategorySelect(null)}
                  isActive={selectedCategory === null}
                >
                  <span>All Components</span>
                  <Badge variant="outline" className="ml-auto">
                    {allComponents.length}
                  </Badge>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {categories.map((category) => (
                <SidebarMenuItem key={category}>
                  <SidebarMenuButton 
                    onClick={() => onCategorySelect(category)}
                    isActive={selectedCategory === category}
                  >
                    <span>{category}</span>
                    <Badge variant="outline" className="ml-auto">
                      {categoryComponentCount[category]}
                    </Badge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-4 space-y-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Follow for updates</p>
            <Button variant="outline" size="sm" className="w-full justify-start gap-2">
              <Twitter className="h-4 w-4" />
              <span>Twitter</span>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start gap-2">
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default ComponentSidebar;
