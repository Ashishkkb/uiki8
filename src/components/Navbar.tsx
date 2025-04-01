
import React, { useState } from "react";
import { Menu, X, Github, ChevronDown } from "lucide-react";
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
    <nav className="bg-white border-b border-github-gray-200 py-4 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-github-blue flex items-center justify-center">
            <span className="text-white font-bold">U</span>
          </div>
          <span className="text-xl font-semibold text-github-gray-900">UIKits Galaxy</span>
        </Link>

        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={cn(
                    "px-4 py-2 text-sm font-medium text-github-gray-700 hover:text-github-gray-900",
                    isActive("/") ? "text-github-blue" : ""
                  )}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium text-github-gray-700 hover:text-github-gray-900">
                  Products
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] md:w-[500px] lg:w-[600px] p-4">
                    <div className="grid gap-4 grid-cols-2">
                      <Link to="/components" className="block rounded-md p-3 hover:bg-github-gray-50">
                        <div className="text-sm font-medium text-github-gray-900 mb-1">Components</div>
                        <p className="text-sm text-github-gray-600">
                          Explore our beautiful UI components ready for your next project.
                        </p>
                      </Link>
                      
                      <Link to="/ui-kit" className="block rounded-md p-3 hover:bg-github-gray-50">
                        <div className="text-sm font-medium text-github-gray-900 mb-1">UI Kits</div>
                        <p className="text-sm text-github-gray-600">
                          Complete design systems for modern web applications
                        </p>
                      </Link>
                      
                      <Link to="/documentation" className="block rounded-md p-3 hover:bg-github-gray-50">
                        <div className="text-sm font-medium text-github-gray-900 mb-1">Documentation</div>
                        <p className="text-sm text-github-gray-600">
                          Learn how to use and customize our UI components
                        </p>
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="#features">
                  <NavigationMenuLink className="px-4 py-2 text-sm font-medium text-github-gray-700 hover:text-github-gray-900">
                    Features
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="#pricing">
                  <NavigationMenuLink className="px-4 py-2 text-sm font-medium text-github-gray-700 hover:text-github-gray-900">
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" className="border-github-gray-200 text-github-gray-700 hover:bg-github-gray-50">
            Log in
          </Button>
          <Button className="bg-github-blue text-white hover:bg-github-blue/90">
            Sign up
          </Button>
        </div>

        <button
          className="md:hidden text-github-gray-700"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden pt-2 pb-4 px-4">
          <div className="flex flex-col space-y-3">
            <Link
              to="/"
              className={`py-2 text-base ${isActive("/") ? "text-github-blue font-medium" : "text-github-gray-700"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/components"
              className={`py-2 text-base ${isActive("/components") ? "text-github-blue font-medium" : "text-github-gray-700"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Components
            </Link>
            <Link
              to="/ui-kit"
              className={`py-2 text-base ${isActive("/ui-kit") ? "text-github-blue font-medium" : "text-github-gray-700"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              UI Kits
            </Link>
            <Link
              to="#features"
              className="py-2 text-base text-github-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              to="#pricing"
              className="py-2 text-base text-github-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <div className="flex flex-col space-y-3 pt-3 border-t border-github-gray-200">
              <Button variant="outline" className="w-full justify-center border-github-gray-200 text-github-gray-700 hover:bg-github-gray-50">
                Log in
              </Button>
              <Button className="w-full justify-center bg-github-blue text-white hover:bg-github-blue/90">
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
