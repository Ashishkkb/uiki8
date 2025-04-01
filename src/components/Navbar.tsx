
import React, { useState } from "react";
import { Menu, X, Package, ExternalLink } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-6 md:px-12 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
            <span className="text-white font-bold">U</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">UIKits Galaxy</span>
        </Link>

        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={cn(
                    navigationMenuTriggerStyle(),
                    isActive("/") ? "bg-accent text-accent-foreground" : ""
                  )}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
                    <li className="row-span-3">
                      <Link to="/components" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-purple-100 to-blue-100 p-6 no-underline outline-none focus:shadow-md">
                        <div className="mb-2 mt-4 text-lg font-medium text-purple-600">Components</div>
                        <p className="text-sm leading-tight text-gray-600">Explore our beautiful UI components ready for your next project.</p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/ui-kit" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">UI Kits</div>
                        <p className="text-sm leading-snug text-muted-foreground line-clamp-2">
                          Complete design systems for modern web applications
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/documentation" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Documentation</div>
                        <p className="text-sm leading-snug text-muted-foreground line-clamp-2">
                          Learn how to use and customize our UI components
                        </p>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="#features">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Features
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="#pricing">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">Log in</Button>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90 transition-opacity">Sign up</Button>
        </div>

        <button
          className="md:hidden text-gray-600"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 px-4">
          <div className="flex flex-col space-y-4 pb-4">
            <Link
              to="/"
              className={`transition-colors ${isActive("/") ? "text-purple-600 font-medium" : "text-gray-600 hover:text-purple-600"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/components"
              className={`transition-colors ${isActive("/components") ? "text-purple-600 font-medium" : "text-gray-600 hover:text-purple-600"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Components
            </Link>
            <Link
              to="/ui-kit"
              className={`transition-colors ${isActive("/ui-kit") ? "text-purple-600 font-medium" : "text-gray-600 hover:text-purple-600"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              UI Kits
            </Link>
            <Link
              to="#features"
              className="text-gray-600 hover:text-purple-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              to="#pricing"
              className="text-gray-600 hover:text-purple-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <div className="flex flex-col space-y-3 pt-3 border-t border-gray-200">
              <Button variant="outline" className="w-full justify-center border-purple-200 text-purple-700 hover:bg-purple-50">
                Log in
              </Button>
              <Button className="w-full justify-center bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90 transition-opacity">
                Sign up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
